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
  CircularProgress,
  Tab,
  Tabs
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
  CalendarToday,
  School
} from '@mui/icons-material';
import AppTheme from "../signupcomponent/shared-theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import axios from 'axios';

export default function OpportunitiesComp(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItem, setExpandedItem] = useState(null);
  const [jobData, setJobData] = useState([]);
  const [internshipData, setInternshipData] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch jobs and internships from API
  useEffect(() => {
    setLoading(true);
    Promise.all([
      axios.get("http://localhost:4001/api/get-jobs-list"),
      axios.get("http://localhost:4001/api/get-internships-list")
    ])
      .then(([jobsResponse, internshipsResponse]) => {
        const jobs = jobsResponse.data.data || [];
        const internships = internshipsResponse.data.data || [];
        setJobData(jobs.reverse());
        setInternshipData(internships.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching opportunities:", error);
        setLoading(false);
      });
  }, []);

  // Combined data based on selected tab
  const combinedData = tabValue === 0 
    ? [...jobData, ...internshipData]
    : tabValue === 1 
      ? jobData 
      : internshipData;

  // Filter opportunities based on search query
  const filteredItems = combinedData.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemClick = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const navLinks = [
    { name: "Alumni Directory", path: "/home" },
    { name: "Chat", path: "/chats" },
    { name: "Opportunities", path: "/opportunities" },
    { name: "Events", path: "/events" },
    { name: "Forums", path: "/forum" },
    { name: 'Courses', path: '/courses' }
  ];

  // Determines if an item is an internship or job
  const getItemType = (item) => {
    return item.duration ? "internship" : "job";
  };

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
              <div
                style={{ flex: 1, display: "flex", justifyContent: "start" }}
              >
                <img
                  src="./image.png"
                  alt=""
                  width={90}
                  style={{ marginTop: 10 }}
                />
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
            Jobs & Internship Opportunities
          </Typography>

          {/* Tab Navigation */}
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            centered
            sx={{ mb: 3 }}
          >
            <Tab label="All Opportunities" />
            <Tab label="Jobs" />
            <Tab label="Internships" />
          </Tabs>

          {/* Search Bar */}
          <Box sx={{ mb: 4, display: "flex" }}>
            <TextField
              fullWidth
              placeholder="Search for jobs, internships, companies, or keywords..."
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

            <Button
              href="/create-opportunity"
              sx={{
                backgroundColor: "#1976d2",
                color: "white",
                py: 2,
                width: "200px",
                ml: "10px",
              }}
            >
              Add Opportunity
            </Button>
          </Box>

          {/* Loading Indicator */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {/* No Results Message */}
          {!loading && filteredItems.length === 0 && (
            <Box sx={{ textAlign: 'center', my: 4 }}>
              <Typography variant="h6" color="textSecondary">
                No opportunities found. Try adjusting your search.
              </Typography>
            </Box>
          )}

          {/* Opportunity Listings */}
          <Grid container spacing={3}>
            {filteredItems.map((item) => {
              const itemType = getItemType(item);
              return (
                <Grid item xs={12} key={item._id}>
                  <Card
                    elevation={2}
                    sx={{
                      borderRadius: 2,
                      cursor: "pointer",
                      "&:hover": { boxShadow: 6 },
                      borderLeft: itemType === "internship" ? "4px solid #4caf50" : "4px solid #1976d2"
                    }}
                    onClick={() => handleItemClick(item._id)}
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
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", textAlign:"left" }}>
                              {item.title}
                            </Typography>
                            <Chip 
                              label={itemType === "internship" ? "Internship" : "Job"} 
                              size="small" 
                              color={itemType === "internship" ? "success" : "primary"}
                              sx={{ height: 20 }}
                            />
                          </Box>
                          <Typography
                            color="textSecondary"
                            sx={{ textAlign: "left" }}
                          >
                            {item.company ?? item.companyName}
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
                            {item.location}
                          </Typography>
                          <Box sx={{ mt: 1, mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                            {itemType === "internship" ? (
                              <>
                                <Chip
                                  icon={<MonetizationOn fontSize="small" />}
                                  label={item.stipend}
                                  size="small"
                                  variant="outlined"
                                  sx={{ borderRadius: 1, backgroundColor: "#f5f5f5" }}
                                />
                                <Chip
                                  icon={<CalendarToday fontSize="small" />}
                                  label={item.duration}
                                  size="small"
                                  variant="outlined"
                                  sx={{ borderRadius: 1, backgroundColor: "#f5f5f5" }}
                                />
                                <Chip
                                  label={item.workType || "N/A"}
                                  size="small"
                                  variant="outlined"
                                  sx={{ borderRadius: 1, backgroundColor: "#f5f5f5" }}
                                />
                              </>
                            ) : (
                              <Chip
                                icon={<MonetizationOn fontSize="small" />}
                                label={item.salary ?? item.pay}
                                size="small"
                                variant="outlined"
                                sx={{ borderRadius: 1, backgroundColor: "#f5f5f5" }}
                              />
                            )}
                          </Box>
                        </Box>
                        <IconButton>
                          <MoreVert />
                        </IconButton>
                      </Box>

                      <List dense sx={{ pl: 2 }}>
                        {(item?.skills || item?.skillsRequired) && 
                          (item?.skills || item?.skillsRequired).map((skill, index) => (
                            <ListItem key={index} disablePadding sx={{ mb: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 20 }}>
                                <FiberManualRecord sx={{ fontSize: 8 }} />
                              </ListItemIcon>
                              <ListItemText primary={skill} />
                            </ListItem>
                          ))
                        }
                      </List>

                      {expandedItem === item._id && (
                        <Box sx={{ mt: 2 }}>
                          <Divider sx={{ my: 2 }} />
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold", mb: 1 }}
                          >
                            {itemType === "internship" ? "Internship details" : "Job details"}
                          </Typography>

                          <Grid container spacing={2}>
                            {itemType === "internship" ? (
                              <>
                                <Grid item xs={12} sm={4}>
                                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <AccessTime sx={{ mr: 1 }} />
                                    <Box>
                                      <Typography variant="body2" color="textSecondary">
                                        Duration
                                      </Typography>
                                      <Typography variant="body1" sx={{ textAlign: "left" }}>
                                        {item.duration}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <WorkOutline sx={{ mr: 1 }} />
                                    <Box>
                                      <Typography variant="body2" color="textSecondary">
                                        Work Type
                                      </Typography>
                                      <Typography variant="body1" sx={{ textAlign: "left" }}>
                                        {item.workType || "N/A"}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <MonetizationOn sx={{ mr: 1 }} />
                                    <Box>
                                      <Typography variant="body2" color="textSecondary">
                                        Stipend
                                      </Typography>
                                      <Typography variant="body1" sx={{ textAlign: "left" }}>
                                        {item.stipend}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Grid>
                              </>
                            ) : (
                              <>
                                <Grid item xs={12} sm={4}>
                                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <WorkOutline sx={{ mr: 1 }} />
                                    <Box>
                                      <Typography variant="body2" color="textSecondary">
                                        Experience Required
                                      </Typography>
                                      <Typography variant="body1" sx={{ textAlign: "left" }}>
                                        {item?.experience ?? item?.educationRequired ?? "N/A"}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <AccessTime sx={{ mr: 1 }} />
                                    <Box>
                                      <Typography variant="body2" color="textSecondary" sx={{ textAlign: "left" }}>
                                        Shift and schedule
                                      </Typography>
                                      <Typography variant="body1">
                                        {item.workType || "Full Time & Day shift"}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                    <MonetizationOn sx={{ mr: 1 }} />
                                    <Box>
                                      <Typography variant="body2" color="textSecondary">
                                        Compensation
                                      </Typography>
                                      <Typography variant="body1" sx={{ textAlign: "left" }}>
                                        {item.salary ?? item.pay ?? "N/A"}
                                      </Typography>
                                    </Box>
                                  </Box>
                                </Grid>
                              </>
                            )}
                            
                            {item.description && (
                              <Grid item xs={12}>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                                  Description
                                </Typography>
                                <Typography variant="body2" sx={{ textAlign: "left" }}>
                                  {item.description}
                                </Typography>
                              </Grid>
                            )}
                          </Grid>

                          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                            <Button
                              variant="contained"
                              color={itemType === "internship" ? "success" : "primary"}
                              href={item.link ?? item.applyLink}
                              target="_blank"
                              sx={{
                                "&:hover": {
                                  color: "white",
                                },
                              }}
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
                          {item.postedDate 
                            ? `Posted ${Math.floor((new Date() - new Date(item.postedDate)) / (1000 * 60 * 60 * 24))} days ago`
                            : item.posted 
                              ? `Active ${item.posted}` 
                              : "Recently posted"}
                        </Typography>
                        {!expandedItem && (
                          <Typography
                            variant="body2"
                            color="primary"
                            sx={{ cursor: "pointer", fontWeight: "bold" }}
                            onClick={() => handleItemClick(item._id)}
                          >
                            More...
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </AppTheme>
    </>
  );
}