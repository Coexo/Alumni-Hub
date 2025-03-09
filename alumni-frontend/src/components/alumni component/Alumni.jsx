import React, { useEffect, useMemo, useState } from 'react';
import { 
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Pagination,
  Box,
  Avatar,
  Chip,
  Stack,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  AppBar,
  Toolbar,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AppTheme from '../signupcomponent/shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';

// Mock data for alumni
const mockAlumni = [
  {
    id: 1,
    name: 'Sarah Johnson',
    profilePic: 'https://randomuser.me/api/portraits/women/44.jpg',
    company: 'Google',
    position: 'Senior Product Manager',
    batch: '2015',
    interestedIn: 'AI & ML',
    investment: '$40,000',
    previousInvestments: 'TechStart, DataFlow'
  },
  {
    id: 2,
    name: 'Michael Chen',
    profilePic: 'https://randomuser.me/api/portraits/men/32.jpg',
    company: 'Microsoft',
    position: 'Engineering Director',
    batch: '2012',
    interestedIn: 'Cloud Computing',
    investment: '$25,000',
    previousInvestments: 'ServerLess, CloudNative'
  },
  {
    id: 3,
    name: 'Jessica Williams',
    profilePic: 'https://randomuser.me/api/portraits/women/33.jpg',
    company: 'Amazon',
    position: 'VP of Engineering',
    batch: '2010',
    interestedIn: 'E-commerce',
    investment: '$100,000',
    previousInvestments: 'ShopifyPlus, RetailTech'
  },
  // Add more alumni to have at least 25 for testing pagination
  // ... more alumni objects
];

// Generate more alumni to demonstrate pagination
const generateMoreAlumni = async () => {
  try {
    // Check if data exists in localStorage
    const cachedData = localStorage.getItem("alumniData");

    if (cachedData) {
      console.log("Using cached data...");
      return JSON.parse(cachedData);
    }

    console.log("Fetching from API...");
    let name = localStorage.getItem("name");
    const response = await fetch(
      "http://127.0.0.1:5000/get_recommendations?student_name=" + name
    );

    if (!response.ok) {
      throw new Error("Failed to fetch alumni data");
    }

    const data = await response.json();

    // Store fetched data in localStorage
    localStorage.setItem("alumniData", JSON.stringify(data));

    return data;
  } catch (error) {
    console.error("Error fetching alumni:", error);
    return [];
  }
};


const Alumni = (props) => {
  
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [allAlumni,setAllAlumni] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [connectNote, setConnectNote] = useState("");
   const [selectedAlumni, setSelectedAlumni] = useState(null);
  const alumniPerPage = 20;


  useEffect(()=>{
    const fetchAlumni = async () => {
      setAllAlumni(await generateMoreAlumni());
    };
    fetchAlumni();
  },[])
  
  console.log(allAlumni);
  // Filter alumni based on search term
  const filteredAlumni =
    allAlumni?.length > 0
      ? allAlumni?.filter(
          (alumni) =>
            alumni?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            alumni?.experience[alumni?.experience?.length - 1]?.companyName
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            alumni?.skills[0]?.id
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            alumni?.skills[1]?.id
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())
        )
      : [];

  // Calculate pagination
  const totalPages = Math.ceil(filteredAlumni.length / alumniPerPage);
  const displayedAlumni = filteredAlumni.slice(
    (page - 1) * alumniPerPage,
    page * alumniPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  const navLinks = [
    { name: 'Alumni Directory', path: '/home' },
    { name: 'Chat', path: '/chats' },
    { name: 'Jobs', path: '/internships' },
    { name: 'Events', path: '/events' },
    { name: 'Forums', path: '/forum' },
    { name: 'Courses', path: '/courses' }
  ];

  const handleOpenDialog = (alumni) => {
    setSelectedAlumni(alumni);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setConnectNote("");
  };

  const handleSendRequest = () => {
    if (selectedAlumni) {
      console.log(
        `Sending connection request to ${selectedAlumni.name} with note: ${connectNote}`
      );
      alert(`Connection request sent to ${selectedAlumni.name}`);
      handleCloseDialog();
    }
  };

  return (
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

      <Container maxWidth="lg" sx={{ py: 4, mt: "64px" }}>
        <Box sx={{ mb: 7 }}>
          {/* <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Alumni Directory
        </Typography>
        <Typography variant="h6" component="p" gutterBottom align="center" color="text.secondary">
          Connect with fellow alumni and grow your network
        </Typography> */}

          <Box sx={{ mt: 4, mb: 3 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search for alumni by name, company, position or interests..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: 600, mx: "auto", display: "block" }}
            />
          </Box>
        </Box>

        <Grid container spacing={3}>
          {displayedAlumni.map((alumni) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={alumni.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  width: "100%",
                  flexDirection: "column",
                  transition: "0.3s",
                  transform: "translateY(-4px)",
                  // "&:hover": {
                  //   boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  //   transform: "translateY(-4px)",
                  // },
                }}
              >
                {/* Recommended by AI Tag */}
                {alumni.is_recommended && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      bgcolor: "#ff9800",
                      color: "white",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      boxShadow: "0px 2px 4px rgba(0,0,0,0.2)",
                    }}
                  >
                    Recommended by AI
                  </Box>
                )}

                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      mt: 1,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#89CFF0",
                      color: "white",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      border: "3px solid #f0f0f0",
                    }}
                  >
                    {alumni.name
                      .split(" ")
                      .map((n, i) =>
                        i === 0 ? n[0] : n.length > 1 ? n[1] : ""
                      )
                      .join("")
                      .toUpperCase()}
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    {alumni.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    sx={{ mb: 2 }}
                  >
                    {!alumni?.experience[alumni?.experience?.length - 1]
                      ? alumni.position
                      : "SDE"}{" "}
                    @{" "}
                    {alumni?.experience[alumni?.experience?.length - 1]
                      ?.companyName || alumni.username}
                  </Typography>

                  <Divider sx={{ my: 1.5 }} />

                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        INTERESTED IN:
                      </Typography>
                      <Chip
                        label={
                          alumni?.skills[0]?.id
                            ? alumni?.skills[0]?.id +
                              ", " +
                              alumni?.skills[1]?.id
                            : "Python"
                        }
                        size="small"
                        sx={{ ml: 1, bgcolor: "#e3f2fd", color: "#1976d2" }}
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{ ml: 1, fontWeight: "medium" }}
                      >
                        {alumni.bio}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>

                <CardActions sx={{ p: 0, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<PersonAddIcon />}
                    sx={{
                      mr: 1,
                      bgcolor: "#4caf50",
                      "&:hover": { bgcolor: "#388e3c" },
                      paddingX: 5,
                    }}
                    onClick={() => handleOpenDialog(alumni)}
                  >
                    Connect
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<VisibilityIcon />}
                    sx={{
                      paddingX: 5,
                    }}
                  >
                    Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}

        {/* Display count of results */}
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            Showing {displayedAlumni.length} of {filteredAlumni.length} alumni
          </Typography>
        </Box>

        {/* Connect Request Popup */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          sx={{
            "& .MuiPaper-root": {
              borderRadius: "16px",
              padding: "20px",
              width: "400px",
            },
          }}
        >
          <DialogTitle
            sx={{ fontWeight: "bold", textAlign: "center", fontSize: "1.2rem" }}
          >
            Send Connection Request
          </DialogTitle>

          <DialogContent>
            <Typography sx={{ textAlign: "center", mb: 2 }}>
              Send a request to <strong>{selectedAlumni?.name}</strong>
            </Typography>

            <TextField
              // required
              fullWidth
              type="text"
              name="text"
              placeholder="Add a Note (Optional)"
              value={connectNote}
              onChange={(e) => setConnectNote(e.target.value)}
            />
          </DialogContent>

          <DialogActions
            sx={{ justifyContent: "space-between", padding: "16px" }}
          >
            <Button
              onClick={handleCloseDialog}
              color="secondary"
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendRequest}
              variant="contained"
              sx={{
                bgcolor: "#1A73E8", // Google Blue
                "&:hover": { bgcolor: "#1669C1" },
                paddingX: "16px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Send Request
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </AppTheme>
  );
};

export default Alumni