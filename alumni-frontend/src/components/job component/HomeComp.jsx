// pages/index.js
import { useState, useEffect } from 'react';
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
  CircularProgress
} from '@mui/material';
import { 
  Search, 
  MoreVert, 
  LocationOn, 
  WorkOutline, 
  AccessTime, 
  Bookmark, 
  Share,
  FiberManualRecord,
  MonetizationOn,
  CalendarToday
} from '@mui/icons-material';
import AppTheme from '../signupcomponent/shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';

export default function HomeComp(props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedJob, setExpandedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Fetch jobs from the database using the existing backend connection
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, []);
  
  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.skills && job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleJobClick = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const navLinks = [
    { name: 'Alumni Directory', path: '/home' },
    { name: 'Jobs', path: '/internships' },
    { name: 'Events', path: '/events' },
    { name: 'Forums', path: '/forum' }
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
      
      
      <Container maxWidth="lg" sx={{ py: 4, mt: 7 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
          Alumni Internships & Job Referrals
        </Typography>
        
        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search for jobs, companies, or skills..."
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
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
              <Typography color="error">{error}</Typography>
            </Box>
          ) : filteredJobs.length === 0 ? (
            <Box sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
              <Typography>No jobs found matching your search criteria.</Typography>
            </Box>
          ) : (
            filteredJobs.map((job) => (
              <Grid item xs={12} key={job._id}>
                <Card 
                  elevation={2} 
                  sx={{ 
                    borderRadius: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      boxShadow: 6
                    }
                  }}
                  onClick={() => handleJobClick(job._id)}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        {job.company_logo && (
                          <Box 
                            component="img" 
                            src={job.company_logo} 
                            alt={`${job.company} logo`}
                            sx={{ width: 60, height: 60, objectFit: 'contain', borderRadius: 1 }}
                          />
                        )}
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
                            {job.experience && (
                              <Chip 
                                label={`Experience: ${job.experience}`} 
                                size="small" 
                                variant="outlined" 
                                sx={{ 
                                  borderRadius: 1, 
                                  mr: 1, 
                                  backgroundColor: '#f5f5f5' 
                                }} 
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>
                      <IconButton>
                        <MoreVert />
                      </IconButton>
                    </Box>
                    
                    {/* Skills as bullet points */}
                    {job.skills && job.skills.length > 0 && (
                      <List dense sx={{ pl: 2 }}>
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 20 }}>
                              <FiberManualRecord sx={{ fontSize: 8 }} />
                            </ListItemIcon>
                            <ListItemText primary={skill} />
                          </ListItem>
                        ))}
                        {job.skills.length > 3 && !expandedJob && (
                          <Typography variant="body2" color="primary" sx={{ pl: 2 }}>
                            +{job.skills.length - 3} more skills
                          </Typography>
                        )}
                      </List>
                    )}
                    
                    {expandedJob === job._id && (
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
                                  Experience required
                                </Typography>
                                <Typography variant="body1">
                                  {job.experience || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <MonetizationOn sx={{ mr: 1 }} />
                              <Box>
                                <Typography variant="body2" color="textSecondary">
                                  Salary
                                </Typography>
                                <Typography variant="body1">
                                  {job.salary || 'Not disclosed'}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <CalendarToday sx={{ mr: 1 }} />
                              <Box>
                                <Typography variant="body2" color="textSecondary">
                                  Apply by
                                </Typography>
                                <Typography variant="body1">
                                  {job.apply_by || 'Not specified'}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                        
                        {job.skills && job.skills.length > 0 && (
                          <Box sx={{ mt: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                              Skills & Perks
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {job.skills.map((skill, index) => (
                                <Chip 
                                  key={index}
                                  label={skill}
                                  size="small"
                                  variant="outlined"
                                  sx={{ borderRadius: 1 }}
                                />
                              ))}
                            </Box>
                          </Box>
                        )}
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                          <Button 
                            variant="contained" 
                            color="primary"
                            component="a"
                            href={job.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
                        Posted {job.posted}
                      </Typography>
                      {!expandedJob && (
                        <Typography 
                          variant="body2" 
                          color="primary"
                          sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                          onClick={() => handleJobClick(job._id)}
                        >
                          More...
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
      </AppTheme>
    </>
  );
}