from flask import Flask, request, jsonify
from pymongo import MongoClient
import numpy as np
import json
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MultiLabelBinarizer

app = Flask(__name__)
CORS(app) 

# Connect to MongoDB
client = MongoClient("mongodb+srv://Vedant:bMhYa18KjBD0rJzV@alumni.twxqi.mongodb.net/")  # Update with your MongoDB URI
db = client["alumni"]  # Database name
collection = db["users"]  # Collection name

# Function to process user data
def process_user_data():
    users = list(collection.find({})) 
    student_df = []
    alumni_df = []

    for user in users:
        for edu in user.get("education", []):
            entry = {
                "_id":user["_id"],
                "Name": user["name"],
                "Institute": edu.get("name", ""),
                "Degree": edu.get("degree", ""),
                "Field of Study": edu.get("fieldOfStudy", ""),
                "Grade": edu.get("grade", ""),
                "Role": edu.get("role", ""),
                "Companies": ", ".join([exp.get("companyName", "") for exp in user.get("experience", [])]),
                "Skills": ", ".join([skill.get("id", "") for skill in user.get("skills", [])])
            }
            if edu.get("role", "").lower() == "student":
                student_df.append(entry)
            elif edu.get("role", "").lower() == "alumni":
                alumni_df.append(entry)

    return student_df, alumni_df

# Function to find skill similarity
def find_sim(student_name, student_df, alumni_df):
    # Find the student details
    student = next((s for s in student_df if s["Name"] == student_name), None)
    if not student:
        return None, None
    
    student_college = student["Institute"]
    filtered_alumni = [a for a in alumni_df if a["Institute"] == student_college]

    # Extract skills
    alumni_features = [a["Skills"].split(", ") if a["Skills"] else [] for a in filtered_alumni]
    student_features = [s["Skills"].split(", ") if s["Skills"] else [] for s in student_df]

    # Binarize skills
    mlb = MultiLabelBinarizer()
    mlb.fit(alumni_features + student_features)
    alumni_binary = mlb.transform(alumni_features)
    student_binary = mlb.transform(student_features)

    # Compute cosine similarity
    cosine_sim = cosine_similarity(alumni_binary, student_binary)
    return cosine_sim, filtered_alumni

def serialize_alumni(alumni):
    """Convert MongoDB document to a serializable format."""
    alumni["_id"] = str(alumni["_id"])  # Convert ObjectId to string
    return alumni

def is_alumni(user):
    """Check if the user's education field contains at least one entry with role as 'alumni'."""
    return any(edu.get("role") == "Alumni" for edu in user.get("education", []))

# API endpoint to get recommendations
@app.route("/get_recommendations", methods=["GET"])
def get_recommendations():
    student_name = request.args.get("student_name")
    print("Student Name : ============== ", student_name)
    if not student_name:
        return jsonify({"error": "Please provide a student name"}), 400

    student_df, alumni_df = process_user_data()
    cosine_sim, filtered_alumni = find_sim(student_name, student_df, alumni_df)

    if cosine_sim is None:
        # alumni_data = list(collection.find({}, {"_id": 0}))  # Exclude _id for clean response
        # return alumni_data


        return jsonify({"error": "Student not found"}), 404

    # Find student index
    student_idx = next((i for i, s in enumerate(student_df) if s["Name"] == student_name), None)

    # Extract similarity scores
    similarities = cosine_sim[:, student_idx]
    
    # Get top 5 similar alumni
    top_indices = similarities.argsort()[::-1][:5]
    recommended_alumni = [filtered_alumni[i] for i in top_indices]

    recommended_data = [
        {**collection.find_one({"_id": s["_id"]}), "is_recommended": True}
        for s in recommended_alumni
    ]

    recommended_ids = [s["_id"] for s in recommended_alumni]
    remaining_alumni = [
        serialize_alumni(alum)
        for alum in collection.find({"_id": {"$nin": recommended_ids}})
        if is_alumni(alum)
    ]

    # Combine both lists (recommended first, remaining at the end)
    final_alumni_data = recommended_data + remaining_alumni
    return final_alumni_data

if __name__ == "__main__":
    app.run(debug=True)
