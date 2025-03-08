import * as React from 'react';
import {
  Box, Button, Card as MuiCard, CardActions, CardContent, CardHeader,
  Divider, FormControl, FormLabel, MenuItem, Select, TextField, CssBaseline,
  Checkbox, FormControlLabel, Grid, Avatar, Typography, Link,
  Container
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PeopleIcon from '@mui/icons-material/People';
import { styled } from '@mui/material/styles';
import AppTheme from '../signupcomponent/shared-theme/AppTheme';

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
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

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
                <Typography variant="subtitle1" color="text.secondary" sx={{color: 'black' }}>
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
                  mb: 3
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
                  <TextField name="firstName"/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Last Name</FormLabel>
                  <TextField name="lastName"/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Email Address</FormLabel>
                  <TextField name="email" type="email" />
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Phone Number</FormLabel>
                  <TextField name="phone" type="tel" />
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
                  <TextField name="city" />
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
                <TextField name="bio"/>
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
                  <TextField name="educationName"/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Start Date</FormLabel>
                  <TextField name="startDate" type="date"/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>End Date</FormLabel>
                  <TextField name="endDate" type="date"/>
                </FormControl>
                
                <FormControlLabel control={<Checkbox />} label="Currently Studying"  sx={{marginTop: 3, paddingLeft: 0.5}}/>
                
                <FormControl fullWidth>
                  <FormLabel>Degree</FormLabel>
                  <TextField name="degree"/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Field of Study</FormLabel>
                  <TextField name="fieldOfStudy"/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Grade</FormLabel>
                  <TextField name="grade"/>
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
              <Button variant="contained">Save Education</Button>
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
                  <TextField name="projectName"/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Description</FormLabel>
                  <TextField name="projectDescription"/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Tech Stacks (comma-separated)</FormLabel>
                  <TextField name="techStacks"/>
                </FormControl>

                <FormControl fullWidth>
                  <FormLabel>Links (comma-separated)</FormLabel>
                  <TextField name="projectLinks"/>
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
                  <TextField name="skills_id"/>
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel>Skill Level</FormLabel>
                  <TextField name="level"/>
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
                  <TextField name="companyName"/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Title</FormLabel>
                  <TextField name="title"/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Employment Type</FormLabel>
                  <TextField name="employmentType"/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Start Date</FormLabel>
                  <TextField name="startDate" type="date"/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>End Date</FormLabel>
                  <TextField name="endDate" type="date"/>
                </FormControl>
                
                <FormControlLabel control={<Checkbox />} label="Currently Working"  sx={{marginTop: 3, paddingLeft: 0.5}}/>
                
                <FormControl fullWidth>
                  <FormLabel>Location</FormLabel>
                  <TextField name="location"/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Certificate Image</FormLabel>
                  <TextField name="certificateImage"/>
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
                  <TextField name="linkName"/>
                </FormControl>
                
                <FormControl fullWidth>
                  <FormLabel>Link</FormLabel>
                  <TextField name="link"/>
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
