// pages/post-job.js
import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper, 
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Grid
} from '@mui/material';

export default function PostJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    location: '',
    experience: '',
    pay: '',
    role: '',
    jobDescription: '',
    skillsRequired: [],
    educationRequired: '',
    applyLink: '',
  });

  const [currentSkill, setCurrentSkill] = useState('');
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Experience options
  const experienceOptions = [
    "Internship", 
    "0-1 years", 
    "1-3 years", 
    "3-5 years", 
    "5-10 years", 
    "10+ years"
  ];

  // Education options
  const educationOptions = [
    "High School",
    "Bachelor's in any field",
    "B.Tech/B.E. in Computer Science",
    "B.Tech/B.E. in any Engineering field",
    "Master's in Computer Science",
    "Master's in any field",
    "PhD",
    "No specific education required"
  ];

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

  const handleSkillInputChange = (e) => {
    setCurrentSkill(e.target.value);
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skillsRequired.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, currentSkill.trim()]
      }));
      setCurrentSkill('');
      
      // Clear skill error if it exists
      if (errors.skillsRequired) {
        setErrors(prev => {
          const newErrors = {...prev};
          delete newErrors.skillsRequired;
          return newErrors;
        });
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter(skill => skill !== skillToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['title', 'companyName', 'location', 'role', 'jobDescription', 'educationRequired', 'applyLink'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });
    
    if (formData.skillsRequired.length === 0) {
      newErrors.skillsRequired = 'At least one skill is required';
    }
    
    // Validate URL format for applyLink
    if (formData.applyLink && !formData.applyLink.match(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/)) {
      newErrors.applyLink = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");

        const response = await fetch(
          "http://localhost:4001/api/create/" + username,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`, // Include the token here
            },
            body: JSON.stringify(formData),
          }
        );

        const result = await response.json();

        if (response.ok) {
          setSnackbar({
            open: true,
            message: "Job posted successfully!",
            severity: "success",
          });

          // Reset form
          setFormData({
            title: "",
            companyName: "",
            location: "",
            experience: "",
            pay: "",
            role: "",
            jobDescription: "",
            skillsRequired: [],
            educationRequired: "",
            applyLink: "",
          });
          window.location.href="/internships"
        } else {
          throw new Error(result.message || "Failed to post job");
        }
      } catch (error) {
        console.error("Error posting job:", error);
        setSnackbar({
          open: true,
          message: error.message || "Error posting job. Please try again.",
          severity: "error",
        });
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

  useEffect(()=>{
    document.body.style.backgroundColor = "white"
  },[])

  return (
    <div>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            Post a Job or Internship
          </Typography>
          
          <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
            Share opportunities with fellow alumni and help them advance their careers.
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" component="h2" gutterBottom>
                  Basic Information
                </Typography>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  name="title"
                  label="Job Title"
                  value={formData.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="companyName"
                  name="companyName"
                  label="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  error={!!errors.companyName}
                  helperText={errors.companyName}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="role"
                  name="role"
                  label="Role"
                  placeholder="e.g., Software Engineer, Marketing Specialist"
                  value={formData.role}
                  onChange={handleChange}
                  error={!!errors.role}
                  helperText={errors.role}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  placeholder="e.g., Remote, Bangalore, Mumbai"
                  value={formData.location}
                  onChange={handleChange}
                  error={!!errors.location}
                  helperText={errors.location}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="experience-label">Experience Required</InputLabel>
                  <Select
                    labelId="experience-label"
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    label="Experience Required"
                    onChange={handleChange}
                  >
                    {experienceOptions.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="pay"
                  name="pay"
                  label="Compensation"
                  placeholder="e.g., ₹10,00,000 per annum, $50-70k, Competitive"
                  value={formData.pay}
                  onChange={handleChange}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 2 }}>
                  Job Details
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={6}
                  id="jobDescription"
                  name="jobDescription"
                  label="Job Description"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  error={!!errors.jobDescription}
                  helperText={errors.jobDescription}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 2 }}>
                  Requirements
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    id="currentSkill"
                    label="Add Skills Required"
                    placeholder="Type a skill and press Enter or Add button"
                    value={currentSkill}
                    onChange={handleSkillInputChange}
                    onKeyDown={handleKeyDown}
                    error={!!errors.skillsRequired}
                    helperText={errors.skillsRequired}
                    InputProps={{
                      endAdornment: (
                        <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={addSkill}
                          sx={{ ml: 1 }}
                        >
                          Add
                        </Button>
                      ),
                    }}
                  />
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                  {formData.skillsRequired.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      onDelete={() => removeSkill(skill)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth required error={!!errors.educationRequired}>
                  <InputLabel id="education-label">Education Required</InputLabel>
                  <Select
                    labelId="education-label"
                    id="educationRequired"
                    name="educationRequired"
                    value={formData.educationRequired}
                    label="Education Required"
                    onChange={handleChange}
                  >
                    {educationOptions.map(option => (
                      <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                  </Select>
                  {errors.educationRequired && (
                    <Typography variant="caption" color="error">
                      {errors.educationRequired}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="applyLink"
                  name="applyLink"
                  label="Application Link"
                  placeholder="e.g., https://company.com/careers/job123"
                  value={formData.applyLink}
                  onChange={handleChange}
                  error={!!errors.applyLink}
                  helperText={errors.applyLink || "Link where candidates can apply for this position"}
                />
              </Grid>
              
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  Post Job
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
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
    </div>
  );
}