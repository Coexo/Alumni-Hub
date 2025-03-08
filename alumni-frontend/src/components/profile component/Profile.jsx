import * as React from 'react';
import {
  Box, Button, Card as MuiCard, CardActions, CardContent, CardHeader,
  Divider, FormControl, FormLabel, MenuItem, Select, TextField, CssBaseline,
  Checkbox, FormControlLabel, Grid, Avatar, Typography,
  Container
} from '@mui/material';
import { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PeopleIcon from '@mui/icons-material/People';
import { styled } from '@mui/material/styles';
import AppTheme from '../signupcomponent/shared-theme/AppTheme';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import axios from 'axios';




const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
];

const genders = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const roles = [
  { value: 'alumni', label: 'Alumni' },
  { value: 'student', label: 'Student' },
];

const navLinks = [
  { name: 'Alumni Directory', path: '/home' },
  { name: 'Jobs', path: '/internships' },
  { name: 'Events', path: '/events' },
  { name: 'Forums', path: '/forum' }
];


const Card = styled(MuiCard)(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  borderRadius: 14,
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '800px',
  },
}));





export default function Profile(props) {

  const [formData, setFormData] = useState({
    username:"",
    password:"",
    name:"",
    mobileNo:"",
    email:"",
    bio:"",
    gender:"",
    education: [{
      name: "",
      startDate:"",
      endDate:"",
      isCurrentlyStudying:"",
      degree:"",
      fieldOfStudy:"",
      grade:"",
      collegeId:"",
      certificates: [{
        name:"",
        link:"",
        status:""
      }],
      role:""

    }],
    projects: [{
      name:"",
      description:"",
      techStacks:[],
      links:[]
    }],
    skills: [{
      skillId:"",
      level:"",
      certificateImage:""
    }],
    experience: [{
      companyName:"",
      title:"",
      employmentType:"",
      startDate:"",
      endDate:"",
      isCurrentlyWorking:"",
      location:"",
      certificateImage:""
    }],
    links: [{
      name:"",
      link:""
    }]

});

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleEducationChange = (index, e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
          i === index ? { ...edu, [name]: value } : edu
      ),
  }));
};

const handleSubmitEdu = async () => {
  try {
      const response = await fetch("http://localhost:4001/api/education-details", {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ education: formData.education }),
      });

      const data = await response.json();
      console.log("Response from backend:", data);  // Debugging

      if (data.message === "Education details updated successfully") {
          console.log("Updated Education Data:", formData.education);
      } else {
          console.error("Failed to update education details:", data);
      }
  } catch (error) {
      console.error("Error updating education details:", error);
  }
};
  useEffect(() => {
    // Fetch user data when the component loads
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/profile/${userId}`);
            setFormData(response.data); // Populate fields with user data
        } catch (error) {
            console.error("Error fetching user data", error);
        }
    };
    fetchUserData();
  }, [userId]);


  
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />



    <AppBar 
          position="fixed" 
          color="default" 
          elevation={1} 
          sx={{ 
            backgroundColor: 'white',
            width: '100%',
            top: 0,
            left: 0
          }}
        >
          <Container maxWidth={false} sx={{ width: '100%' }}>
            <Toolbar disableGutters>
              {/* Logo */}
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  flexGrow: 1, 
                  fontWeight: 'bold', 
                  color: '#1976d2',
                  fontSize: '1.5rem',
                  display: 'flex',
                alignItems: 'center'
                }}
              >
                AlumniHub
              </Typography>
              
              {/* Navigation Links */}
              {/* <Box sx={{ display: 'flex', mr: 4 }}>
                {['Directory', 'Mentorship', 'Jobs', 'Events', 'Forums'].map((page) => (
                  <Button
                    key={page}
                    sx={{ 
                      my: 2, 
                      color: 'rgba(0, 0, 0, 0.87)', 
                      display: 'block',
                      mx: 1,
                      textTransform: 'none',
                      fontSize: '0.95rem'
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box> */}

              <Box sx={{ display: 'flex', mr: 4 }}>
            {navLinks.map((link) => (
              <Button
                key={link.name}
                component={Link}
                to={link.path}
                sx={{ 
                  my: 2, 
                  color: location.pathname === link.path ? '#1976d2' : 'rgba(0, 0, 0, 0.87)', 
                  display: 'block',
                  mx: 1,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === link.path ? 'bold' : 'normal',
                  borderBottom: location.pathname === link.path ? '2px solid #1976d2' : 'none'
                }}
              >
                {link.name}
              </Button>
            ))}
          </Box>
              
              {/* Auth Buttons */}
              <Box>
                {/* <Link to="/signin" style={{ textDecoration: 'none' }}>
                <Button 
                  color="primary" 
                  sx={{ 
                    mr: 2, 
                    textTransform: 'none',
                    fontWeight: 500 
                  }}
                >
                  Sign In
                </Button>
                </Link> */}
                <Link to="/profile" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ 
                    borderRadius: 1,
                    textTransform: 'none',
                    fontWeight: 500
                  }}
                >
                  Profile
                </Button>
                </Link>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>

      <Container maxWidth="lg" sx={{ mt: 10, mb: 5, display:'flex', flexDirection:"row"}}>
      <Grid container spacing={12}>
      <Grid item xs={12} md={4}>
      <Box sx={{ top: '100px'}}>
          <Card 
            sx={{ 
              mb: 3, 
              backgroundColor: 'white', 
              color: 'white',
              borderRadius: 2 
              , maxWidth: '400px'
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2}}>
                <Avatar
                  sx={{ width: 100, height: 100, mb: 2 }}
                  alt="Manthan Nanaware"
                  src="/api/placeholder/260/260"
                />
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'black' }}>
                  Manthan Nanaware
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ color: 'black' }}>
                  Manthan-23
                </Typography>
              </Box>
              
              <Typography variant="body1" sx={{ mb: 2, color: 'grey'}}>
                Hello, I am currently a student pursuing a degree in computer engineering. I am an intermediate full-stack developer with experience in various technologies.
              </Typography>
              
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                  mb: 3, 
                 
                }}
              >
                Edit profile
              </Button>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PeopleIcon sx={{ fontSize: 20, mr: 1, color: '#8b949e' }} />
                <Typography variant="body2" sx={{ color: '#8b949e' }}>
                  <Box component="span" sx={{ fontWeight: 'bold', color: '#c9d1d9' }}>3</Box> followers · <Box component="span" sx={{ fontWeight: 'bold', color: '#c9d1d9' }}>1</Box> following
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOnIcon sx={{ fontSize: 20, mr: 1, color: '#8b949e' }} />
                <Typography variant="body2" sx={{ color: '#c9d1d9' }}>
                  Mumbai
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LinkIcon sx={{ fontSize: 20, mr: 1, color: '#8b949e' }} />
                <Link href="https://codingeazy.blogspot.com/" target="_blank" rel="noopener" sx={{ color: '#58a6ff', textDecoration: 'none' }}>
                  https://codingeazy.blogspot.com/
                </Link>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LinkedInIcon sx={{ fontSize: 20, mr: 1, color: '#8b949e' }} />
                <Link href="https://linkedin.com/in/manthan-nanaware" target="_blank" rel="noopener" sx={{ color: '#58a6ff', textDecoration: 'none' }}>
                  in/manthan-nanaware
                </Link>
              </Box>
              
             
              
              {/* Add organization logos here if needed */}
            </CardContent>
          </Card>
          </Box>
        </Grid>


      <Grid  item xs={12} md={8}>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 3, paddingTop: 0}}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmitEdu(event);
          }}
        >
          {/* Profile Details Card */}
          <Card variant="outlined" sx={{ textAlign: "left" }}>
            <CardHeader title="Profile details" />
            <Divider sx={{ marginBottom: 3, marginTop: 1.5 }}/>
            <CardContent>
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2.5}>
                <FormControl fullWidth>
                  <FormLabel>First Name</FormLabel>
                  <TextField name="firstName" onChange={handleChange} />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Last Name</FormLabel>
                  <TextField name="lastName" onChange={handleChange}/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Email Address</FormLabel>
                  <TextField name="email" type="email" onChange={handleChange}/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Phone Number</FormLabel>
                  <TextField name="phone" type="tel" onChange={handleChange}/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>State</FormLabel>
                  <Select name="state">
                    {states.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>City</FormLabel>
                  <TextField name="city" onChange={handleChange}/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Gender</FormLabel>
                  <Select name="gender">
                    {genders.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              
              <FormControl fullWidth sx={{marginTop: 3}}>
                <FormLabel>Bio</FormLabel>
                <TextField name="bio" onChange={handleChange}/>
              </FormControl>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end', marginTop: 2}}>
              <Button variant="contained">Save Info</Button>
            </CardActions>
          </Card>

          {/* Education Details Card */}
          <Card variant="outlined" sx={{ textAlign: "left", marginTop: 3 }}>
            <CardHeader title="Education" />
            <Divider sx={{ marginBottom: 3, marginTop: 1.5 }}/>
            <CardContent>
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2.5}>
                <FormControl fullWidth>
                  <FormLabel>Name</FormLabel>
                  <TextField name="name" onChange={(e) => handleEducationChange(0, e)} value={formData.education[0].name}/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Start Date</FormLabel>
                  <TextField name="startDate" type="date" onChange={(e) => handleEducationChange(0, e)} value={formData.education[0].startDate}/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>End Date</FormLabel>
                  <TextField name="endDate" type="date" onChange={(e) => handleEducationChange(0, e)} value={formData.education[0].endDate}/>
                </FormControl>
                
                <FormControlLabel control={<Checkbox />} label="Currently Studying"  sx={{marginTop: 3, paddingLeft: 0.5}}/>
                
                <FormControl fullWidth>
                  <FormLabel>Degree</FormLabel>
                  <TextField name="degree" onChange={(e) => handleEducationChange(0, e)} value={formData.education[0].degree}/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Field of Study</FormLabel>
                  <TextField name="fieldOfStudy" onChange={(e) => handleEducationChange(0, e)} value={formData.education[0].fieldOfStudy}/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Grade</FormLabel>
                  <TextField name="grade" onChange={(e) => handleEducationChange(0, e)} value={formData.education[0].grade}/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>College ID (Image Link)</FormLabel>
                  <TextField name="collegeId"/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Role</FormLabel>
                  <Select name="role">
                    {roles.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', marginTop: 2, paddingTop: 2}}>
              <Button type="submit" variant="contained">Save Education</Button>
            </CardActions>
          </Card>

          {/* Projects Card */}
          <Card variant="outlined" sx={{ textAlign: "left", marginTop: 3 }}>
            <CardHeader title="Projects" />
            <Divider sx={{ marginBottom: 3, marginTop: 1.5 }}/>
            <CardContent>
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2.5}>
                <FormControl fullWidth>
                  <FormLabel>Name</FormLabel>
                  <TextField name="projectName" onChange={handleChange} value={formData.projects[0].name}/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Description</FormLabel>
                  <TextField name="projectDescription" onChange={handleChange} value={formData.projects[0].description}/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Tech Stacks (comma-separated)</FormLabel>
                  <TextField name="techStacks" onChange={handleChange} value={formData.projects[0].techStacks}/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Links (comma-separated)</FormLabel>
                  <TextField name="projectLinks" onChange={handleChange} value={formData.projects[0].links}/>
                </FormControl>
              </Box>
            </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', marginTop: 2 }}>
              <Button variant="contained">Save Project</Button>
            </CardActions>
          </Card>

          {/* Skills Card */}
          <Card variant="outlined" sx={{ textAlign: "left", marginTop: 3 }}>
            <CardHeader title="Skills" />
            <Divider sx={{ marginBottom: 3, marginTop: 1.5 }}/>
            <CardContent>
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2.5}>
                <FormControl fullWidth>
                  <FormLabel>Skill ID</FormLabel>
                  <TextField name="skills_id" onChange={handleChange} value={formData.skills[0].skillId}/>
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel>Skill Level</FormLabel>
                  <TextField name="level" onChange={handleChange} value={formData.skills[0].level}/>
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel>Certificate Image (URL)</FormLabel>
                  <TextField name="certificateImage" type="url"/>
                </FormControl>
              </Box>
            </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', marginTop: 2 }}>
              <Button variant="contained">Save Skill</Button>
            </CardActions>
          </Card>

          {/* Experience Card */}
          <Card variant="outlined" sx={{ textAlign: "left", marginTop: 3 }}>
            <CardHeader title="Experience" />
            <Divider sx={{ marginBottom: 3, marginTop: 1.5 }}/>
            <CardContent>
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2.5}>
                <FormControl fullWidth>
                  <FormLabel>Company Name</FormLabel>
                  <TextField name="companyName" onChange={handleChange} value={formData.experience[0].companyName}/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Title</FormLabel>
                  <TextField name="title" onChange={handleChange} value={formData.experience[0].title}/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Employment Type</FormLabel>
                  <TextField name="employmentType" onChange={handleChange} value={formData.experience[0].employmentType}/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Start Date</FormLabel>
                  <TextField name="startDate" type="date" value={formData.experience[0].startDate}/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>End Date</FormLabel>
                  <TextField name="endDate" type="date" value={formData.experience[0].endDate}/>
                </FormControl>
                
                <FormControlLabel control={<Checkbox />} label="Currently Working"  sx={{marginTop: 3, paddingLeft: 0.5}} value={formData.experience[0].isCurrentlyWorking}/>
                
                <FormControl fullWidth>
                  <FormLabel>Location</FormLabel>
                  <TextField name="location" onChange={handleChange} value={formData.experience[0].location}/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Certificate Image</FormLabel>
                  <TextField name="certificateImage" />
                </FormControl>
              </Box>
            </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', marginTop: 2 }}>
              <Button variant="contained">Save Experience</Button>
            </CardActions>
          </Card>

          {/* Links Card */}
          <Card variant="outlined" sx={{ textAlign: "left", marginTop: 3 }}>
            <CardHeader title="Links" />
            <Divider sx={{ marginBottom: 3, marginTop: 1.5 }}/>
            <CardContent>
              <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2.5}>
                <FormControl fullWidth>
                  <FormLabel>Name</FormLabel>
                  <TextField name="linkName" onChange={handleChange} value={formData.links[0].name}/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Link</FormLabel>
                  <TextField name="link" onChange={handleChange} value={formData.links[0].link}/>
                </FormControl>
              </Box>
            </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', marginTop: 2 }}>
              <Button variant="contained">Save Link</Button>
            </CardActions>
          </Card>
        </form>
      </Box>
      </Grid>
      </Grid>
      </Container>
    </AppTheme>
  );
}
