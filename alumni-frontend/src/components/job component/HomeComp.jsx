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
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedJob, setExpandedJob] = useState(null);
  const [jobData, setJobData] = useState([]);

  // Fetch jobs from API
  useEffect(() => {
    axios
      .get("http://localhost:4001/api/get-jobs-list")
      .then((response) => {
        setJobData(response.data.data || []);
      })
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  // Filter jobs based on search query
  const filteredJobs = jobData.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJobClick = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const navLinks = [
    { name: "Alumni Directory", path: "/home" },
    { name: "Chat", path: "/chats" },
    { name: "Jobs", path: "/internships" },
    { name: "Events", path: "/events" },
    { name: "Forums", path: "/forum" },
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
            backgroundColor: "white",
            width: "100%",
            top: 0,
            left: 0,
          }}
        >
          <Container maxWidth={false} sx={{ width: "100%" }}>
                    <Toolbar disableGutters sx={{ display: "flex" }}>
                      <div style={{ flex: 1, display:"flex", justifyContent:"start",  }}>
                        <img src="./image.png" alt="" width={90} style={{marginTop:10}}/>
                      </div>
                      <Box sx={{ display: "flex", mr: 4 }}>
                        {navLinks.map((link) => (
                          <Button
                            key={link.name}
                            component={Link}
                            to={link.path}
                            sx={{
                              my: 2,
                              color:
                                location.pathname === link.path
                                  ? "#1976d2"
                                  : "rgba(0, 0, 0, 0.87)",
                              display: "block",
                              mx: 1,
                              textTransform: "none",
                              fontSize: "0.95rem",
                              fontWeight:
                                location.pathname === link.path ? "bold" : "normal",
                              borderBottom:
                                location.pathname === link.path
                                  ? "2px solid #1976d2"
                                  : "none",
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
                        <Link to="/profile" style={{ textDecoration: "none" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{
                              borderRadius: 1,
                              textTransform: "none",
                              fontWeight: 500,
                            }}
                          >
                            Profile
                          </Button>
                        </Link>
                      </Box>
                    </Toolbar>
                  </Container>
        </AppBar>
        <Container maxWidth="lg" sx={{ py: 4, mt: 10 }}>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold", mb: 4 }}
          >
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
              <Grid item xs={12} key={job._id}>
                <Card
                  elevation={2}
                  sx={{
                    borderRadius: 2,
                    cursor: "pointer",
                    "&:hover": { boxShadow: 6 },
                  }}
                  onClick={() => handleJobClick(job._id)}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                          {job.title}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{ textAlign: "left" }}
                        >
                          {job.company}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <LocationOn fontSize="small" />
                          {job.location}
                        </Typography>
                        <Box sx={{ mt: 1, mb: 2 }} sx={{ display: "flex" }}>
                          <Chip
                            label={job.salary}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderRadius: 1,
                              mr: 1,
                              backgroundColor: "#f5f5f5",
                            }}
                          />
                        </Box>
                      </Box>
                      <IconButton>
                        <MoreVert />
                      </IconButton>
                    </Box>

                    <List dense sx={{ pl: 2 }}>
                      {/* {[
                        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, deleniti? Optio odit iusto dignissimos sequi voluptatem!.",
                        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa, deleniti? Optio odit iusto dignissimos sequi voluptatem! Ducimus.",
                        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos sequi voluptatem! Ducimus praesentium explicabo ipsum.",
                      ].map((desc, index) => (
                        <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <FiberManualRecord sx={{ fontSize: 8 }} />
                          </ListItemIcon>
                          <ListItemText primary={desc} />
                        </ListItem>
                      ))} */}
                      {job.skills.map((desc, index) => (
                        <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 20 }}>
                            <FiberManualRecord sx={{ fontSize: 8 }} />
                          </ListItemIcon>
                          <ListItemText primary={desc} />
                        </ListItem>
                      ))}
                    </List>

                    {expandedJob === job._id && (
                      <Box sx={{ mt: 2 }}>
                        <Divider sx={{ my: 2 }} />
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          Job details
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <WorkOutline sx={{ mr: 1 }} />
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                >
                                  Experience Required
                                </Typography>
                                <Typography
                                  variant="body1"
                                  sx={{ textAlign: "left" }}
                                >
                                  {job?.experience}
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={4}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <AccessTime sx={{ mr: 1 }} />
                              <Box>
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  sx={{ textAlign: "left" }}
                                >
                                  Shift and schedule
                                </Typography>
                                <Typography variant="body1">
                                  Full Time & Day shift
                                </Typography>
                              </Box>
                            </Box>
                          </Grid>

                          <Grid item xs={12} sm={4}>
                            <Chip
                              label={`Posted by User 18`}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>

                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 2,
                          }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            href={job.link}
                            target="_blank"
                            sx={{ "&:hover": {
                              color:"white"
                            } }}
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

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: 2,
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body2" color="textSecondary">
                        Active {job.postedDays} days ago
                      </Typography>
                      {!expandedJob && (
                        <Typography
                          variant="body2"
                          color="primary"
                          sx={{ cursor: "pointer", fontWeight: "bold" }}
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
