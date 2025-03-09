import User from "../models/User.model.js";
import mongoose from "mongoose";
import UserModel from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import ENV from 'dotenv';
import Job from "../models/Job.model.js";
import EventModel from "../models/Event.model.js";

export async function verifyUser(req, res, next) {
    try {
        const { email } = req.method == "GET" ? req.query : req.body;


        let exist = await UserModel.findOne({ email });
        if (!exist) return res.status(404).send({ error: "Can't find the User!" });
        next();

    } catch (error) {
        return res.status(404).send({ error: "Authentication Error" });
    }
};

export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    const split = token.split(" ");
    const bearer = split[1];
    console.log(bearer);
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const verified = jwt.verify(bearer, process.env.JWT_SECRET);
        console.log(verified);
        req.user = verified; // Add user data to request object
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
    }
};

export async function signin(req, res, next) {
    console.log('Signin endpoint hit');
    const { username, name, password, email, mobileNo } = req.body;
    console.log(req.body);

    if (!username || !name || !password || !email || !mobileNo) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    if (password) {
        bcrypt.hash(password, 10)
            .then(hashedPassword => {

                const user = new UserModel({
                    username,
                    name,
                    password: hashedPassword,
                    email,
                    mobileNo
                })

                user.save()
                    .then(result => res.status(201).send({ msg: "User registered Successfully" }))
                    .catch(error => res.status(500).send(console.log(error)))

            })
            .catch((error) => {
                return res.status(500).send({
                    error: "Enable to hashed password"
                })
            })
    }


};




export async function login(req, res, next) {
    const { email, password } = req.body;

    try {
        // ✅ Find user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ error: "Email Not Found" });
        }

        // ✅ Compare password using bcrypt
        const passwordCheck = await bcrypt.compare(password, user.password);
        
        console.log("Entered Password:", password);
        console.log("Stored Hashed Password:", user.password);
        console.log("Password Match:", passwordCheck);

        if (!passwordCheck) {
            return res.status(400).send({ error: "Password not match!!" });
        }

        // ✅ Generate JWT Token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                userRole: user.education.length > 0 ? user.education[0].role : "Student" // Ensure role exists
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token); // ✅ Set token in cookie

        // ✅ Send successful response
        return res.status(200).json({
            message: "Login Successful",
            access_token: token,
            userId: user._id,
            userEmail: user.email,
            userRole: user.education.length > 0 ? user.education[0].role : "Student"
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};


export const updateEducation = async (req, res) => {
    console.log("Req.user = ",req.user);
    try {
        console.log("REQ",req.body.education[0]);
        const userId = req.user.userId;
        // const userId = "67cc5515bc70d9f07e4ea85c"; // Get user ID from authenticated request
        const education = req.body;

        if (!education) {
            return res.status(400).json({ message: "Education details are required" });
        }

        // if (!Array.isArray(educationData)) {
        //     educationData = [educationData]; // ✅ Convert object to array if needed
        // }
        console.log("Edu", education)

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { education: { $each: education } } }, // ✅ Push each entry into the array
            { new: true, runValidators: true }
        );
        

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Education details updated successfully", user: updatedUser });
    } catch (error) {
        // console.log(error.message);
        
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const updateProjects = async (req, res) => {
    try {
        // const userId = req.user.id;
        const userId = "67c5b5ae599ccb511c93abb7"; // Get user ID from authenticated request
        console.log("Req Body:", req.body.projects);
        const project = req.body.projects; // Extract education details from request
        console.log(project);

        if (!project) {
            return res.status(400).json({ message: "Education details are required" });
        }

        let projectData = req.body.projects;

        if (!Array.isArray(projectData)) {
            projectData = [projectData]; // ✅ Convert object to array if needed
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { projects: projectData } }, // ✅ Only update education field
            { new: true, runValidators: true } // Return updated user & validate data
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Project details updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};





export const updateExperience = async (req, res) => {
    try {
        // const userId = req.user.id;
        const userId = "67c5b5ae599ccb511c93abb7"; // Get user ID from authenticated request
        console.log("Req Body:", req.body.experience);
        const exp = req.body.experience; // Extract education details from request
        console.log(exp);

        if (!exp) {
            return res.status(400).json({ message: "Education details are required" });
        }

        let expData = req.body.experience;

        if (!Array.isArray(expData)) {
            expData = [expData]; // ✅ Convert object to array if needed
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { experience: expData } }, // ✅ Only update education field
            { new: true, runValidators: true } // Return updated user & validate data
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Experience details updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const createJob = async (req, res) => {
    try {
        console.log("Req User:", req.user);
        const { title, companyName, location, experience, pay, role, jobDescription, skillsRequired, educationRequired, applyLink } = req.body;
        const userId = req.user.userId; // Get user ID from token
        const userRole = req.user.userRole; // Get user role from token

        if (userRole !== "Alumni") {
            return res.status(403).json({ message: "Only alumni can post jobs." });
        }

        const job = new Job({
            createdBy: userId,
            title,
            companyName,
            location,
            experience,
            pay,
            role,
            jobDescription,
            skillsRequired,
            educationRequired,
            applyLink,
        });

        await job.save();
        res.status(201).json({ message: "Job posted successfully", job });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deleteJob = async (req, res) => {
    console.log(req.user);
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ message: "Job not found" });

        if (job.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: "You are not authorized to delete this job." });
        }

        await job.deleteOne();
        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const jobsList = async (req, res) => {
    try {
        const job = await Job.find();
        if (!job) return res.status(404).json({ message: "Job not found" });
        res.status(200).json({ data:job });
    } catch (error) {
                res
                  .status(500)
                  .json({ message: "Server error", error: error.message });
    }
}
export const createEvent = async (req, res) => {
    try {
        const { title, description, date, time, location, eventType, college, registrationLink, bannerImage } = req.body;

        // Ensure required fields are provided
        if (!title || !description || !date || !time || !location || !eventType || !college) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        // Create new event
        const newEvent = new EventModel({
            title,
            description,
            date,
            time,
            location,
            eventType,
            college,
            registrationLink,
            bannerImage
        });

        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: newEvent });

    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



/////////////////////////////////////// GET REQUESTS /////////////////////////////////////////////

export const getAllEvents = async (req, res) => {
    try {
        const events = await EventModel.find().sort({ date: 1 }); // ✅ Sort by event date
        res.status(200).json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getUserData = async (req, res) => {
    console.log(req.params.id);
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
