// pages/create-course.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  Grid,
  InputAdornment,
  Divider,
  Chip,
  FormHelperText,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import VideocamIcon from '@mui/icons-material/Videocam';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarsIcon from '@mui/icons-material/Stars';
import Head from 'next/head';
import axios from 'axios';

export default function CreateCoursePage() {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  
  let username = localStorage.getItem('username');
  const [formData, setFormData] = useState({
    courseName: "",
    description: "",
    fees: "",
    videoLink: "",
    creditPoints: "",
    thumbnailImage: null,
    createdBy: username,
  });

  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Sample data for preview section
  const [userCreditPoints, setUserCreditPoints] = useState(25); // Sample credit points
  const [sampleCourses, setSampleCourses] = useState([
    { id: 1, name: "Advanced JavaScript", originalPrice: 2000, discountedPrice: 1500 },
    { id: 2, name: "Data Structures & Algorithms", originalPrice: 3000, discountedPrice: 2250 },
    { id: 3, name: "Machine Learning Basics", originalPrice: 5000, discountedPrice: 3750 }
  ]);

  useEffect(()=>{
    document.body.style.backgroundColor="white"
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleThumbnailClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
      return;
    }

    setPreviewURL(URL.createObjectURL(file)); // Set preview
    setUploadedFileName(file.name);

    // Clear previous errors if any
    if (errors.thumbnailImage) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.thumbnailImage;
        return newErrors;
      });
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "study-nex"); // Your Cloudinary preset
      formData.append("cloud_name", "dgu3ljso6");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dgu3ljso6/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.secure_url) {
        setFormData((prev) => ({
          ...prev,
          thumbnailImage: result.secure_url, // Store Cloudinary URL instead of file
        }));
         setSnackbar({
           open: true,
           message: "Thumbnail updated successfully!",
           severity: "success",
         });
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Cloudinary upload error:", error);
    }
  };


  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['courseName', 'description', 'fees', 'videoLink', 'creditPoints'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Validate numeric fields
    if (formData.fees && isNaN(parseFloat(formData.fees))) {
      newErrors.fees = 'Fees must be a number';
    }
    
    if (formData.creditPoints && isNaN(parseInt(formData.creditPoints))) {
      newErrors.creditPoints = 'Credit points must be a number';
    }
    
    // Validate video link URL format
    if (formData.videoLink && !formData.videoLink.match(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/)) {
      newErrors.videoLink = 'Please enter a valid URL';
    }
    
    // Check for thumbnail
    if (!formData.thumbnailImage && !previewURL) {
      newErrors.thumbnailImage = 'Course thumbnail is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);

      try {
        console.log("Submitting Data:", formData);

        let data = {
          courseName: formData.courseName,
          description: formData.description,
          fees: formData.fees,
          videoLink: formData.videoLink,
          points: formData.creditPoints,
          thumbnail: formData.thumbnailImage,
          createdBy: username,
        };

        const response = await axios.post(
          "http://localhost:4001/api/courses",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response:", response.data);

        if (response.data.success) {
          setSnackbar({
            open: true,
            message: "Course created successfully!",
            severity: "success",
          });

          // Reset form
          setFormData({
            courseName: "",
            description: "",
            fees: "",
            videoLink: "",
            creditPoints: "",
            thumbnailImage: null,
          });
          setPreviewURL("");
          setUploadedFileName("");

          setTimeout(() => {
            window.location.href = "/courses";
          }, 1000);
        }
      } catch (error) {
        console.error("Error creating course:", error);
        setSnackbar({
          open: true,
          message: "Error creating course. Please try again.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setSnackbar({
        open: true,
        message: "Please fix the errors in the form.",
        severity: "error",
      });
    }
  };



  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  // Function to simulate a student completing the course
  const simulateCompletion = () => {
    const pointsToAdd = parseInt(formData.creditPoints || 10);
    setUserCreditPoints(prev => prev + pointsToAdd);
    
    // Update discounted prices on other courses
    setSampleCourses(prev => 
      prev.map(course => ({
        ...course,
        discountedPrice: Math.max(0, course.originalPrice - ((userCreditPoints + pointsToAdd) * 30))
      }))
    );
    
    setSnackbar({
      open: true,
      message: `Simulation: Student earned ${pointsToAdd} credit points! Discounts applied.`,
      severity: 'info'
    });
  };

  return (
    <>
      <Head>
        <title>Create Course | Alumni Learning Platform</title>
        <meta name="description" content="Create and share courses with students" />
      </Head>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                Create a Course
              </Typography>
              
              <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
                Share your knowledge with students and help them build their skills.
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      Course Information
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="courseName"
                      name="courseName"
                      label="Course Name"
                      value={formData.courseName}
                      onChange={handleChange}
                      error={!!errors.courseName}
                      helperText={errors.courseName}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      id="description"
                      name="description"
                      label="Course Description"
                      value={formData.description}
                      onChange={handleChange}
                      error={!!errors.description}
                      helperText={errors.description}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      id="fees"
                      name="fees"
                      label="Course Fees"
                      type="number"
                      value={formData.fees}
                      onChange={handleChange}
                      error={!!errors.fees}
                      helperText={errors.fees}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MonetizationOnIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      required
                      fullWidth
                      id="creditPoints"
                      name="creditPoints"
                      label="Credit Points"
                      type="number"
                      value={formData.creditPoints}
                      onChange={handleChange}
                      error={!!errors.creditPoints}
                      helperText={errors.creditPoints || "Points awarded upon course completion"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <StarsIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 2 }}>
                      Course Content
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="videoLink"
                      name="videoLink"
                      label="Video Link"
                      placeholder="e.g., https://example.com/video"
                      value={formData.videoLink}
                      onChange={handleChange}
                      error={!!errors.videoLink}
                      helperText={errors.videoLink || "URL where the course video is hosted"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VideocamIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box 
                      sx={{ 
                        border: `1px dashed ${errors.thumbnailImage ? '#d32f2f' : '#cccccc'}`,
                        borderRadius: 1,
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#f5f5f5'
                        },
                        mt: 2,
                        position: 'relative'
                      }}
                      onClick={handleThumbnailClick}
                    >
                      {previewURL ? (
                        <Box>
                          <img 
                            src={previewURL} 
                            alt="Thumbnail preview" 
                            style={{ maxHeight: '200px', maxWidth: '100%', display: 'block', margin: '0 auto 16px' }} 
                          />
                          <Typography variant="body2" color="textSecondary">
                            {uploadedFileName}
                          </Typography>
                          <Typography variant="body2">
                            Click to change thumbnail
                          </Typography>
                        </Box>
                      ) : (
                        <>
                          <CloudUploadIcon sx={{ fontSize: 48, color: '#757575', mb: 2 }} />
                          <Typography variant="body1" gutterBottom>
                            Upload Course Thumbnail
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Click to browse or drag and drop image file
                          </Typography>
                        </>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                      />
                    </Box>
                    {errors.thumbnailImage && (
                      <FormHelperText error>{errors.thumbnailImage}</FormHelperText>
                    )}
                  </Grid>
                  
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{ py: 1.5 }}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Course'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Credit System Preview
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <StarsIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Current Credit Points: {userCreditPoints}
                </Typography>
              </Box>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                How it works:
              </Typography>
              
              <Typography variant="body2" paragraph>
                1. When a student completes this course, they earn credit points
              </Typography>
              
              <Typography variant="body2" paragraph>
                2. Earned credit points reduce prices of other courses (₹30 discount per point)
              </Typography>
              
              <Typography variant="body2" paragraph>
                3. Students can accumulate points across multiple courses
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2, mb: 2 }}>
                Example discounts with current points:
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {sampleCourses.map(course => (
                  <Card key={course.id} variant="outlined">
                    <CardContent sx={{ p: 2 }}>
                      <Typography variant="subtitle2">{course.name}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                          ₹{course.originalPrice}
                        </Typography>
                        <Typography variant="body1" color="primary" fontWeight="bold">
                          ₹{course.discountedPrice}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
              
              <Button 
                variant="outlined" 
                color="secondary" 
                sx={{ mt: 3 }}
                onClick={simulateCompletion}
                fullWidth
              >
                Simulate Course Completion
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}