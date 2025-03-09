import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  AppBar,
  CssBaseline,
  Toolbar,
} from "@mui/material";
import {
  Edit as EditIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  School as SchoolIcon,
  Add as AddIcon,
  Work as WorkIcon,
  Code as CodeIcon,
  Person as PersonIcon
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { deleteCookie } from "cookies-next/client";
import { CloudUploadIcon } from "lucide-react";

const Profile = () => {
  // const [userData, setUserData] = useState({
  //   username: "vedantkale",
  //   password: "************",
  //   name: "Vedant Mahendra Kale",
  //   mobileNo: "+91 9876543210",
  //   email: "vedant.kale@vjti.ac.in",
  //   bio: "I'm Vedant Kale from Mumbai, India, currently pursuing a B.Tech degree at Veermata Jijabai Technological Institute. Passionate about continuous learning, exploring new coding languages, and diving into the world of programming. I want to become strong, skillful web developer to create best, user-friendly and creative web pages. Proficient in developing databases, creating user interfaces, writing codes, troubleshooting simple/complex issues. Apart from coding, I enjoy watching anime, drawing, sketching, and playing BGMI.",
  //   gender: "Male",
  //   education: [
  //     {
  //       name: "Veermata Jijabai Technological Institute, Mumbai",
  //       startDate: new Date("2023-06-01"),
  //       endDate: new Date("2026-05-31"),
  //       isCurrentlyStudying: true,
  //       degree: "B.Tech",
  //       fieldOfStudy: "Computer Engineering",
  //       grade: "8.49 CGPA (77.4%)",
  //       collegeId: "/api/placeholder/100/100", // Placeholder for college ID
  //       certificates: [
  //         {
  //           name: "First Year Excellence Certificate",
  //           link: "/api/placeholder/100/100",
  //           status: "Verified",
  //         },
  //       ],
  //       role: "Student",
  //     },
  //     {
  //       name: "Government Polytechnic, Mumbai",
  //       startDate: new Date("2020-06-01"),
  //       endDate: new Date("2023-05-31"),
  //       isCurrentlyStudying: false,
  //       degree: "Diploma",
  //       fieldOfStudy: "Computer Engineering",
  //       grade: "92.83%",
  //       collegeId: "/api/placeholder/100/100", // Placeholder for college ID
  //       certificates: [],
  //       role: "Alumni",
  //     },
  //   ],
  //   projects: [
  //     {
  //       name: "Student Portfolio Platform",
  //       description:
  //         "A web platform for students to showcase their projects, skills, and educational background to potential employers.",
  //       techStacks: ["React", "Node.js", "MongoDB", "Express"],
  //       links: [
  //         "https://github.com/vedantkale/portfolio-platform",
  //         "https://portfolio-platform.vercel.app",
  //       ],
  //     },
  //   ],
  //   experience: [
  //     {
  //       companyName: "Medisage",
  //       title: "MERN Stack web developer intern",
  //       employmentType: "Internship",
  //       startDate: new Date("2023-01-01"),
  //       endDate: new Date("2023-07-31"),
  //       isCurrentlyWorking: false,
  //       location: "Powai, Mumbai, Maharashtra",
  //       certificateImage: "/api/placeholder/100/100",
  //       description: [
  //         "Learnt a lot of new languages and got new friends. I learned NextJs, VueJs, TailwindCSS, Laravel, MySQL and even ventured into Clevertap integration, etc.",
  //         "Redesigned and built an important section where doctors can post their cases, with features like liking, sharing, commenting, searching, and filtering. Used Vue.js for the frontend and Laravel for the backend.",
  //         "Created eight live event pages that allow medical users to register and join live events organized by clients.",
  //         "Redesigned the live event section of the website, using Next.js and Tailwind CSS for the frontend, and Laravel to develop the APIs.",
  //       ],
  //     },
  //   ],
  // });

  const [userData, setUserData] = useState(null);
  let username = localStorage.getItem("username");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4001/api/profile/${username}`
        );
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserData();
  }, []);

  console.log(userData);
  

  const [openDialog, setOpenDialog] = useState(false);
  const [editSection, setEditSection] = useState("");
  const [formData, setFormData] = useState({});
  const [editIndex, setEditIndex] = useState(0);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const handleEdit = (section, index = 0) => {
    setEditSection(section);
    setEditIndex(index);

    if (section === "basic") {
      setFormData({
        name: userData.name,
        mobileNo: userData.mobileNo,
        email: userData.email,
        gender: userData.gender,
      });
    } else if (section === "bio") {
      setFormData({
        bio: userData.bio,
      });
    } else if (section === "education") {
      const edu = userData.education[index];
      setFormData({
        name: edu.name,
        startDate: edu.startDate.toISOString().split("T")[0],
        endDate: edu.endDate ? edu.endDate.toISOString().split("T")[0] : "",
        isCurrentlyStudying: edu.isCurrentlyStudying,
        degree: edu.degree,
        fieldOfStudy: edu.fieldOfStudy,
        grade: edu.grade,
        role: edu.role,
      });
    } else if (section === "experience") {
      const exp = userData.experience[index];
      setFormData({
        companyName: exp.companyName,
        title: exp.title,
        employmentType: exp.employmentType,
        startDate: exp.startDate.toISOString().split("T")[0],
        endDate: exp.endDate ? exp.endDate.toISOString().split("T")[0] : "",
        isCurrentlyWorking: exp.isCurrentlyWorking,
        location: exp.location,
      });
    } else if (section === "project") {
      const proj = userData.projects[index];
      setFormData({
        name: proj.name,
        description: proj.description,
        techStacks: proj.techStacks.join(", "),
        links: proj.links.join(", "),
      });
    }

    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    if (editSection === "basic") {
      setUserData({
        ...userData,
        name: formData.name,
        mobileNo: formData.mobileNo,
        email: formData.email,
        gender: formData.gender,
      });
    } else if (editSection === "bio") {
      setUserData({
        ...userData,
        bio: formData.bio,
      });
    } else if (editSection === "education") {
      const updatedEducation = [...userData.education];
      updatedEducation[editIndex] = {
        ...userData.education[editIndex],
        name: formData.name,
        startDate: new Date(formData.startDate),
        endDate: formData.isCurrentlyStudying
          ? null
          : new Date(formData.endDate),
        isCurrentlyStudying: formData.isCurrentlyStudying,
        degree: formData.degree,
        fieldOfStudy: formData.fieldOfStudy,
        grade: formData.grade,
        role: formData.role,
      };

      setUserData({
        ...userData,
        education: updatedEducation,
      });
    } else if (editSection === "experience") {
      const updatedExperience = [...userData.experience];
      updatedExperience[editIndex] = {
        ...userData.experience[editIndex],
        companyName: formData.companyName,
        title: formData.title,
        employmentType: formData.employmentType,
        startDate: new Date(formData.startDate),
        endDate: formData.isCurrentlyWorking
          ? null
          : new Date(formData.endDate),
        isCurrentlyWorking: formData.isCurrentlyWorking,
        location: formData.location,
      };

      setUserData({
        ...userData,
        experience: updatedExperience,
      });
    } else if (editSection === "project") {
      const updatedProjects = [...userData.projects];
      updatedProjects[editIndex] = {
        ...userData.projects[editIndex],
        name: formData.name,
        description: formData.description,
        techStacks: formData.techStacks.split(",").map((tech) => tech.trim()),
        links: formData.links.split(",").map((link) => link.trim()),
      };

      setUserData({
        ...userData,
        projects: updatedProjects,
      });
    }

    setOpenDialog(false);
  };

  const handleAddNew = (section) => {
    if (section === "education") {
      setEditSection("education");
      setEditIndex(userData.education.length);
      setFormData({
        name: "",
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
        isCurrentlyStudying: true,
        degree: "",
        fieldOfStudy: "",
        grade: "",
        role: "Student",
      });
    } else if (section === "experience") {
      setEditSection("experience");
      setEditIndex(userData.experience.length);
      setFormData({
        companyName: "",
        title: "",
        employmentType: "Internship",
        startDate: new Date().toISOString().split("T")[0],
        endDate: "",
        isCurrentlyWorking: true,
        location: "",
      });
    } else if (section === "project") {
      setEditSection("project");
      setEditIndex(userData.projects.length);
      setFormData({
        name: "",
        description: "",
        techStacks: "",
        links: "",
      });
    }

    setOpenDialog(true);
  };

  const handleDelete = (section, index) => {
    if (section === "education") {
      const updatedEducation = userData.education.filter((_, i) => i !== index);
      setUserData({
        ...userData,
        education: updatedEducation,
      });
    } else if (section === "experience") {
      const updatedExperience = userData.experience.filter(
        (_, i) => i !== index
      );
      setUserData({
        ...userData,
        experience: updatedExperience,
      });
    } else if (section === "project") {
      const updatedProjects = userData.projects.filter((_, i) => i !== index);
      setUserData({
        ...userData,
        projects: updatedProjects,
      });
    }
  };

  const navLinks = [
    { name: "Alumni Directory", path: "/home" },
    { name: "Chat", path: "/chats" },
    { name: "Jobs", path: "/internships" },
    { name: "Events", path: "/events" },
    { name: "Forums", path: "/forum" },
    { name: "Courses", path: "/courses" },
  ];

  return userData ? (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", py: 4, mt: "64px" }}>
      <CssBaseline enableColorScheme />

      <AppBar
        position="fixed"
        color="default"
        // elevation={1}
        sx={{
          backgroundColor: "white",
          width: "100%",
          top: 0,
          left: 0,
        }}
      >
        <Container maxWidth={false} sx={{ width: "100%" }}>
          <Toolbar disableGutters sx={{ display: "flex" }}>
            <div style={{ flex: 1, display: "flex", justifyContent: "start" }}>
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
              <Link
                onClick={() => {
                  deleteCookie("isRegistered");
                  localStorage.clear();
                  window.location.href = "/";
                }}
                style={{ textDecoration: "none" }}
              >
                <Button
                  variant="contained"
                  color="error"
                  sx={{
                    borderRadius: 1,
                    textTransform: "none",
                    fontWeight: 500,
                  }}
                >
                  Log out
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent sx={{ textAlign: "center" }}>
                <Avatar
                  src="/api/placeholder/100/100"
                  alt="profile"
                  sx={{ width: 96, height: 96, mx: "auto", mb: 2 }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {userData.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  @{userData.username}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <List component="nav" disablePadding>
                  <ListItem button>
                    <ListItemIcon>
                      <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Basic Details" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <SchoolIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Education" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <WorkIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Experience" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <CodeIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Projects" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            {/* Basic Details */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Basic Details
                </Typography>
                <IconButton color="primary" onClick={() => handleEdit("basic")}>
                  <EditIcon />
                </IconButton>
              </Box>

              <Grid container spacing={2} sx={{ textAlign: "left" }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">
                    Full Name:
                  </Typography>
                  <Typography variant="body1">{userData.name}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">
                    Email:
                  </Typography>
                  <Typography variant="body1">{userData.email}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">
                    Mobile Number:
                  </Typography>
                  <Typography variant="body1">{userData.mobileNo}</Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" color="text.secondary">
                    Gender:
                  </Typography>
                  <Typography variant="body1">{userData.gender}</Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Bio */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Bio
                </Typography>
                <IconButton color="primary" onClick={() => handleEdit("bio")}>
                  <EditIcon />
                </IconButton>
              </Box>
              <Typography variant="body2">{userData.bio}</Typography>
            </Paper>

            {/* Education */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Education
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddNew("education")}
                >
                  Add new
                </Button>
              </Box>

              {userData.education.map((edu, index) => (
                <Paper
                  key={index}
                  variant="outlined"
                  sx={{ p: 2, mb: 2, borderRadius: 2 }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: "primary.lighter",
                          color: "primary.dark",
                        }}
                      >
                        <SchoolIcon />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ textAlign: "left" }}
                        >
                          {edu.name}
                          <Chip
                            label={edu.role}
                            size="small"
                            color={edu.role == "Alumni" ? "error" : "warning"}
                            variant="outlined"
                            sx={{ ml: 1 }}
                          />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDate(edu.startDate)} -{" "}
                          {edu.isCurrentlyStudying
                            ? "Present"
                            : formatDate(edu.endDate)}{" "}
                          | <strong>{edu.role}</strong>
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit("education", index)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete("education", index)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box
                    sx={{ mt: 2, pl: 7, textAlign: "left", borderRadius: 2 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Degree:
                        </Typography>
                        <Typography variant="body2">
                          {edu.degree} in {edu.fieldOfStudy}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Grade:
                        </Typography>
                        <Typography variant="body2">{edu.grade}</Typography>
                      </Grid>
                    </Grid>

                    {edu.certificates.length > 0 && (
                      <Box sx={{ textAlign: "left" }}>
                        <Typography variant="body2" color="text.secondary">
                          {/* Certificates: */}
                        </Typography>
                        {edu.certificates.map((cert, i) => (
                          <Chip
                            key={i}
                            label={cert.Name}
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ mr: 1, mt: 1 }}
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                </Paper>
              ))}
            </Paper>

            {/* Experience */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Work Experience
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddNew("experience")}
                >
                  Add new
                </Button>
              </Box>

              {userData.experience.map((exp, index) => (
                <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "grey.200", color: "grey.700" }}>
                        {exp.companyName.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ textAlign: "left" }}
                          fontWeight="bold"
                        >
                          {exp.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {exp.companyName} | {formatDate(exp.startDate)} -{" "}
                          {exp.isCurrentlyWorking
                            ? "Present"
                            : formatDate(exp.endDate)}{" "}
                          | {exp.location}
                        </Typography>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit("experience", index)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete("experience", index)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  {exp.description && (
                    <Box sx={{ mt: 2, pl: 7 }}>
                      {exp.description.map((desc, i) => (
                        <Typography key={i} variant="body2" paragraph>
                          {desc}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Paper>
              ))}
            </Paper>

            {/* Projects */}
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 3,
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Projects
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddNew("project")}
                >
                  Add new
                </Button>
              </Box>

              {userData.projects.map((project, index) => (
                <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar
                        sx={{ bgcolor: "info.lighter", color: "info.dark" }}
                      >
                        <CodeIcon />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ textAlign: "left" }}
                        >
                          {project.name}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          {project.techStacks.map((tech, i) => (
                            <Chip
                              key={i}
                              label={tech}
                              size="small"
                              color="primary"
                              variant="outlined"
                              sx={{ mr: 1, mb: 1 }}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit("project", index)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete("project", index)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2, pl: 7 }}>
                    <Typography
                      variant="body2"
                      paragraph
                      sx={{ textAlign: "left" }}
                    >
                      {project.description}
                    </Typography>

                    {project.links.length > 0 && (
                      <Box sx={{ textAlign: "left" }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          gutterBottom
                        >
                          Project Links:
                        </Typography>
                        {project.links.map((link, i) => (
                          <Button
                            key={i}
                            variant="outlined"
                            size="small"
                            color="primary"
                            href={link}
                            target="_blank"
                            sx={{ mr: 2, mb: 1 }}
                          >
                            {link.includes("github") ? "GitHub" : "Demo"}
                          </Button>
                        ))}
                      </Box>
                    )}
                  </Box>
                </Paper>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Edit Dialog */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">
              {editIndex >=
              (editSection === "education"
                ? userData.education.length
                : editSection === "experience"
                ? userData.experience.length
                : editSection === "project"
                ? userData.projects.length
                : 0)
                ? `Add New ${
                    editSection.charAt(0).toUpperCase() + editSection.slice(1)
                  }`
                : `Edit ${
                    editSection.charAt(0).toUpperCase() + editSection.slice(1)
                  }`}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ maxHeight: 500 }}>
          {editSection === "basic" && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Mobile Number"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    label="Gender"
                    onChange={handleChange}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}

          {editSection === "bio" && (
            <TextField
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              fullWidth
              multiline
              rows={5}
              margin="dense"
            />
          )}

          {editSection === "education" && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Institution Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.isCurrentlyStudying}
                      onChange={handleChange}
                      name="isCurrentlyStudying"
                    />
                  }
                  label="Currently Studying"
                />
              </Grid>
              {!formData.isCurrentlyStudying && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Field of Study"
                  name="fieldOfStudy"
                  value={formData.fieldOfStudy}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    label="Role"
                    onChange={handleChange}
                  >
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Alumni">Alumni</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Box
                  sx={{
                    border: `1px dashed ${
                      false ? "#d32f2f" : "#cccccc"
                    }`,
                    borderRadius: 1,
                    p: 3,
                    textAlign: "center",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                    mt: 2,
                    position: "relative",
                  }}
                  // onClick={handleThumbnailClick}
                >
                  {false ? (
                    <Box>
                      <img
                        // src={previewURL}
                        alt="Thumbnail preview"
                        style={{
                          maxHeight: "200px",
                          maxWidth: "100%",
                          display: "block",
                          margin: "0 auto 16px",
                        }}
                      />
                      <Typography variant="body2" color="textSecondary">
                        {/* {uploadedFileName} */}
                      </Typography>
                      <Typography variant="body2">
                        Click to change thumbnail
                      </Typography>
                    </Box>
                  ) : (
                    <>
                      <CloudUploadIcon
                        sx={{ fontSize: 48, color: "#757575", mb: 2 }}
                      />
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
                    // ref={fileInputRef}
                    // onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </Box>
              </Grid>
            </Grid>
          )}

          {editSection === "experience" && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Job Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel>Employment Type</InputLabel>
                  <Select
                    name="employmentType"
                    value={formData.employmentType}
                    label="Employment Type"
                    onChange={handleChange}
                  >
                    <MenuItem value="Full-time">Full-time</MenuItem>
                    <MenuItem value="Part-time">Part-time</MenuItem>
                    <MenuItem value="Internship">Internship</MenuItem>
                    <MenuItem value="Freelance">Freelance</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.isCurrentlyWorking}
                      onChange={handleChange}
                      name="isCurrentlyWorking"
                    />
                  }
                  label="Currently Working"
                />
              </Grid>
              {!formData.isCurrentlyWorking && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid>
            </Grid>
          )}

          {editSection === "project" && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Project Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                  margin="dense"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Tech Stacks (comma separated)"
                  name="techStacks"
                  value={formData.techStacks}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  helperText="E.g. React, Node.js, MongoDB"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Project Links (comma separated)"
                  name="links"
                  value={formData.links}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  helperText="E.g. https://github.com/username/project, https://project-demo.com"
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" startIcon={<SaveIcon />}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  ) : (
    <p>Loading</p>
  );
};

export default Profile;