// pages/index.js
import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Box, 
  IconButton, 
  Chip, 
  TextField, 
  InputAdornment, 
  Divider,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
} from '@mui/material';
import { 
  Search, 
  MoreVert, 
  LocationOn, 
  WorkOutline, 
  AccessTime, 
  Bookmark, 
  Share,
  FiberManualRecord
} from '@mui/icons-material';
import AppTheme from '../signupcomponent/shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';


// Sample job data
const jobData = [
  {
    id: 1,
    title: "Cyber Security Specialist",
    company: "Dronetech Solutions Pvt Ltd",
    location: "Vile Parle, Mumbai, Maharashtra",
    salary: "₹20,000 - ₹30,000 a month",
    type: "Full-time",
    schedule: "Day shift",
    description: [
      "Security Solutions Implementation: Develop, implement, and maintain security protocols, firewalls, and intrusion detection systems to protect against cyber..."
    ],
    postedDays: 3,
    source: "Alumni"
  },
  {
    id: 2,
    title: "Early career Trainee - Cyber and Cloud Security",
    company: "Baker Hughes",
    location: "Mumbai, Maharashtra",
    salary: "₹20,000 - ₹30,000 a month",
    type: "Full-time",
    schedule: "Day shift",
    description: [
      "Responsible for cyber security guidelines implementation for application hosted in Baker cloud infrastructure.",
      "Enforce and execute user policies and procedures."
    ],
    postedDays: 5,
    source: "Alumni"
  },
  {
    id: 3,
    title: "Cyber Security Technical Specialist",
    company: "Wysetek",
    location: "Mumbai, Maharashtra",
    salary: "₹30,000 - ₹40,000 a month",
    type: "Full-time",
    schedule: "Day shift",
    description: [
      "Implement and maintain security solutions across organization networks.",
      "Monitor systems for suspicious activities and respond to security incidents."
    ],
    postedDays: 2,
    source: "Industry Partner"
  },
  {
    id: 4,
    title: "Cybersecurity Intern",
    company: "TechShield Solutions",
    location: "Remote",
    salary: "₹12,000 - ₹15,000 a month",
    type: "Internship",
    schedule: "Flexible",
    description: [
      "Assist in vulnerability assessments and penetration testing.",
      "Learn about security protocols and help document security procedures."
    ],
    postedDays: 1,
    source: "Alumni"
  }
];

export default function HomeComp(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJob, setExpandedJob] = useState(null);
  
  // Filter jobs based on search query
  const filteredJobs = jobData.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description.some(desc => desc.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleJobClick = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const navLinks = [
    { name: 'Alumni Directory', path: '/home' },
    { name: 'Jobs', path: '/internships' },
    { name: 'Events', path: '/events' },
    { name: 'Forums', path: '/forum' },
    { name: 'Courses', path: '/courses' }
  ];

  return (
    <>
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
      
      
      <Container maxWidth="lg" sx={{ py: 4, mt : 7 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
          Alumni Internships & Job Referrals
        </Typography>
        
        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search for jobs, companies, or keywords..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="primary" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {/* Job Listings */}
        <Grid container spacing={3}>
          {filteredJobs.map((job) => (
            <Grid item xs={12} key={job.id}>
              <Card 
                elevation={2} 
                sx={{ 
                  borderRadius: 2,
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 6
                  }
                }}
                onClick={() => handleJobClick(job.id)}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                        {job.title}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom>
                        {job.company}
                      </Typography>
                      <Typography color="textSecondary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOn fontSize="small" />
                        {job.location}
                      </Typography>
                      <Box sx={{ mt: 1, mb: 2 }}>
                        <Chip 
                          label={job.salary} 
                          size="small" 
                          variant="outlined" 
                          sx={{ 
                            borderRadius: 1, 
                            mr: 1, 
                            backgroundColor: '#f5f5f5' 
                          }} 
                        />
                      </Box>
                    </Box>
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </Box>
                  
                  <List dense sx={{ pl: 2 }}>
                    {job.description.map((desc, index) => (
                      <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 20 }}>
                          <FiberManualRecord sx={{ fontSize: 8 }} />
                        </ListItemIcon>
                        <ListItemText primary={desc} />
                      </ListItem>
                    ))}
                  </List>
                  
                  {expandedJob === job.id && (
                    <Box sx={{ mt: 2 }}>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Job details
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <WorkOutline sx={{ mr: 1 }} />
                            <Box>
                              <Typography variant="body2" color="textSecondary">
                                Job type
                              </Typography>
                              <Typography variant="body1">
                                {job.type}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <AccessTime sx={{ mr: 1 }} />
                            <Box>
                              <Typography variant="body2" color="textSecondary">
                                Shift and schedule
                              </Typography>
                              <Typography variant="body1">
                                {job.schedule}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Chip 
                              label={`Posted by ${job.source}`}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </Box>
                        </Grid>
                      </Grid>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" color="primary">
                          Apply now
                        </Button>
                        <Box>
                          <IconButton>
                            <Bookmark />
                          </IconButton>
                          <IconButton>
                            <Share />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, alignItems: 'center' }}>
                    <Typography variant="body2" color="textSecondary">
                      Active {job.postedDays} days ago
                    </Typography>
                    {!expandedJob && (
                      <Typography 
                        variant="body2" 
                        color="primary"
                        sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                        onClick={() => handleJobClick(job.id)}
                      >
                        More...
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      </AppTheme>
    </>
  );
}