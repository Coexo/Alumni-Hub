import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
  Avatar,
  Stack,
  Paper,
  IconButton,
  Dialog,
  DialogContent,
  Collapse,
  Divider,
  AppBar,
  Container,
  Toolbar
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ReplyIcon from '@mui/icons-material/Reply';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import AppTheme from '../signupcomponent/shared-theme/AppTheme';
import CssBaseline from '@mui/material/CssBaseline';

const DiscussionForm = (props) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [image, setImage] = useState(null);
  const [openImage, setOpenImage] = useState(null); // For Image Popup
  const [replyStates, setReplyStates] = useState({});
  const [replyContents, setReplyContents] = useState({});

  // Load comments from local storage
  useEffect(() => {
    const storedComments = localStorage.getItem('discussionComments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Save comments to local storage
  useEffect(() => {
    localStorage.setItem('discussionComments', JSON.stringify(comments));
  }, [comments]);

  // Handle New Comment Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() && !image) return;
    
    const timestamp = new Date().toLocaleString();
    const commentAuthor = isAnonymous ? 'Anonymous' : userName.trim() || 'Guest';

    const comment = {
      id: Date.now(),
      text: newComment,
      author: commentAuthor,
      isAnonymous,
      timestamp,
      image,
      upvotes: 0,
      downvotes: 0,
      replies: []
    };

    setComments([...comments, comment]);
    setNewComment('');
    setImage(null);
  };

  // Handle Image Upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle upvote functionality
  const handleUpvote = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, upvotes: comment.upvotes + 1 };
      }
      
      // Check if it's a reply within any comment
      if (comment.replies && comment.replies.length > 0) {
        const updatedReplies = comment.replies.map(reply => 
          reply.id === commentId ? { ...reply, upvotes: reply.upvotes + 1 } : reply
        );
        
        if (JSON.stringify(updatedReplies) !== JSON.stringify(comment.replies)) {
          return { ...comment, replies: updatedReplies };
        }
      }
      
      return comment;
    }));
  };

  // Handle downvote functionality
  const handleDownvote = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, downvotes: comment.downvotes + 1 };
      }
      
      // Check if it's a reply within any comment
      if (comment.replies && comment.replies.length > 0) {
        const updatedReplies = comment.replies.map(reply => 
          reply.id === commentId ? { ...reply, downvotes: reply.downvotes + 1 } : reply
        );
        
        if (JSON.stringify(updatedReplies) !== JSON.stringify(comment.replies)) {
          return { ...comment, replies: updatedReplies };
        }
      }
      
      return comment;
    }));
  };

  // Toggle reply form visibility
  const toggleReplyForm = (commentId) => {
    setReplyStates(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  // Handle reply content changes
  const handleReplyChange = (commentId, value) => {
    setReplyContents(prev => ({
      ...prev,
      [commentId]: value
    }));
  };

  // Submit a reply to a comment
  const submitReply = (commentId) => {
    const replyText = replyContents[commentId];
    if (!replyText || !replyText.trim()) return;

    const timestamp = new Date().toLocaleString();
    const replyAuthor = isAnonymous ? 'Anonymous' : userName.trim() || 'Guest';

    const reply = {
      id: Date.now(),
      text: replyText,
      author: replyAuthor,
      isAnonymous,
      timestamp,
      upvotes: 0,
      downvotes: 0
    };

    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));

    // Clear reply input and close reply form
    setReplyContents(prev => ({
      ...prev,
      [commentId]: ''
    }));
    setReplyStates(prev => ({
      ...prev,
      [commentId]: false
    }));
  };

  // Custom styles for input fields to change outline color from blue to black
  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black', // Default outline color
      },
      '&:hover fieldset': {
        borderColor: 'black', // Hover outline color
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black', // Focused outline color
      },
    }
  };

  const navLinks = [
    { name: "Alumni Directory", path: "/home" },
    { name: "Chat", path: "/chats" },
    { name: "Opportunities", path: "/internships" },
    { name: "Events", path: "/events" },
    { name: "Forums", path: "/forum" },
    { name: "Courses", path: "/courses" },
  ];


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
                <Link to="/payment" style={{ textDecoration: "none" }}>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  sx={{
                                    borderRadius: 1,
                                    textTransform: "none",
                                    fontWeight: 500,
                                  }}
                                >
                                  Subscribe
                                </Button>
                              </Link>
                              &nbsp;&nbsp;&nbsp;
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

      <Box sx={{ minWidth: 800, mx: "auto", p: 2 }}>
        {/* Discussion Forum Header */}
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ display: "flex", alignItems: "center" }}
          >
            <ChatIcon sx={{ mr: 1.5 }} />
            Discussion Forum
          </Typography>

          {/* Comment Form */}
          <form onSubmit={handleSubmit}>
            {/* User Name Input */}
            <TextField
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              fullWidth
              margin="normal"
              disabled={isAnonymous}
              placeholder={isAnonymous ? "Posting anonymously" : "Your Name"}
              sx={inputStyles}
            />

            {/* Comment Input */}
            <TextField
              placeholder="Enter your comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
              margin="normal"
              required={!image}
              sx={inputStyles}
            />

            {/* Image Upload Input */}
            <input
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<ImageIcon />}
                sx={{ mt: 1 }}
              >
                Upload Image
              </Button>
            </label>

            {/* Image Preview Before Posting */}
            {image && (
              <Box mt={2} display="flex" alignItems="center">
                <Card
                  sx={{ width: 100, height: 100, cursor: "pointer" }}
                  onClick={() => setOpenImage(image)}
                >
                  <CardContent sx={{ p: 0 }}>
                    <img
                      src={image}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </CardContent>
                </Card>
                <IconButton sx={{ ml: 1 }} onClick={() => setImage(null)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}

            {/* Anonymous Checkbox & Submit Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    color="primary"
                  />
                }
                label="Comment anonymously"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!newComment.trim() && !image}
                sx={{
                  "&.Mui-disabled": {
                    color: "white",
                  },
                }}
              >
                Post Comment
              </Button>
            </Box>
          </form>
        </Paper>

        {/* Comments Section */}
        <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
          Comments ({comments.length})
        </Typography>

        {comments.length === 0 ? (
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ textAlign: "center", py: 4 }}
          >
            Be the first to comment!
          </Typography>
        ) : (
          <Stack spacing={2}>
            {comments.map((comment) => (
              <Card key={comment.id} sx={{ mb: 2 }}>
                <CardContent>
                  {/* Comment Header (Avatar + Name) */}
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar
                      sx={{
                        bgcolor: comment.isAnonymous
                          ? "grey.500"
                          : "primary.main",
                        mr: 1,
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {comment.author}
                    </Typography>
                  </Box>

                  {/* Comment Text */}
                  <Typography
                    variant="body1"
                    sx={{ mt: 1, mb: 2, ml: 6.2, textAlign: "left" }}
                  >
                    {comment.text}
                  </Typography>

                  {/* Comment Image (Small Box) */}
                  {comment.image && (
                    <Box sx={{ ml: 6.2, mb: 2 }}>
                      <Card
                        sx={{ width: 100, height: 100, cursor: "pointer" }}
                        onClick={() => setOpenImage(comment.image)}
                      >
                        <CardContent sx={{ p: 0 }}>
                          <img
                            src={comment.image}
                            alt="User Upload"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </CardContent>
                      </Card>
                    </Box>
                  )}

                  {/* Interaction Buttons (Upvote, Downvote, Reply) */}
                  <Box sx={{ display: "flex", alignItems: "center", ml: 5 }}>
                    <IconButton
                      onClick={() => handleUpvote(comment.id)}
                      size="small"
                      sx={{ border: 0 }}
                    >
                      <ThumbUpIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{ mr: 1, ml: -0.4, zIndex: 0 }}
                    >
                      {comment.upvotes}
                    </Typography>

                    <IconButton
                      onClick={() => handleDownvote(comment.id)}
                      size="small"
                      sx={{ border: 0 }}
                    >
                      <ThumbDownIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      variant="body2"
                      sx={{ mr: 2, ml: -0.4, zIndex: 0 }}
                    >
                      {comment.downvotes}
                    </Typography>

                    <IconButton
                      onClick={() => toggleReplyForm(comment.id)}
                      size="small"
                      sx={{ border: 0 }}
                    >
                      <ReplyIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2">Reply</Typography>
                  </Box>

                  {/* Reply Form */}
                  <Collapse
                    in={replyStates[comment.id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box
                      sx={{
                        mt: 2,
                        ml: 6,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <TextField
                        placeholder="Write a reply..."
                        fullWidth
                        size="small"
                        value={replyContents[comment.id] || ""}
                        onChange={(e) =>
                          handleReplyChange(comment.id, e.target.value)
                        }
                        sx={inputStyles}
                      />
                      <IconButton
                        onClick={() => submitReply(comment.id)}
                        disabled={!replyContents[comment.id]?.trim()}
                        sx={{ ml: 1 }}
                      >
                        <SendIcon />
                      </IconButton>
                    </Box>
                  </Collapse>

                  {/* Replies Section */}
                  {comment.replies && comment.replies.length > 0 && (
                    <Box sx={{ mt: 2, ml: 6 }}>
                      <Typography variant="subtitle2" sx={{ mb: 1 }}>
                        Replies ({comment.replies.length})
                      </Typography>
                      {comment.replies.map((reply) => (
                        <Card
                          key={reply.id}
                          sx={{
                            mb: 1,
                            backgroundColor: "#f5f5f5",
                            maxWidth: "640px",
                          }}
                        >
                          <CardContent sx={{ py: 1 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Avatar
                                sx={{
                                  bgcolor: reply.isAnonymous
                                    ? "grey.500"
                                    : "primary.main",
                                  mr: 1,
                                  width: 24,
                                  height: 24,
                                }}
                              >
                                <PersonIcon fontSize="small" />
                              </Avatar>
                              <Typography variant="subtitle2" fontWeight="bold">
                                {reply.author}
                              </Typography>
                            </Box>

                            <Typography
                              variant="body2"
                              sx={{ ml: 4, textAlign: "left" }}
                            >
                              {reply.text}
                            </Typography>

                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: 1,
                                ml: 3,
                              }}
                            >
                              <IconButton
                                onClick={() => handleUpvote(reply.id)}
                                size="small"
                                sx={{ border: 0 }}
                              >
                                <ThumbUpIcon fontSize="small" />
                              </IconButton>
                              <Typography
                                variant="caption"
                                sx={{ mr: 1, ml: -0.4, zIndex: 0 }}
                              >
                                {reply.upvotes}
                              </Typography>

                              <IconButton
                                onClick={() => handleDownvote(reply.id)}
                                size="small"
                                sx={{ border: 0 }}
                              >
                                <ThumbDownIcon fontSize="small" />
                              </IconButton>
                              <Typography
                                variant="caption"
                                sx={{ ml: -0.4, zIndex: 0 }}
                              >
                                {reply.downvotes}
                              </Typography>
                            </Box>

                            <Typography
                              variant="caption"
                              color="textSecondary"
                              display="block"
                              sx={{ mt: 1 }}
                            >
                              Posted on {reply.timestamp}
                            </Typography>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                  )}

                  <Divider sx={{ my: 1 }} />

                  <Typography variant="caption" color="textSecondary">
                    Posted on {comment.timestamp}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}

        {/* Full Image Dialog (Popup) */}
        <Dialog
          open={Boolean(openImage)}
          onClose={() => setOpenImage(null)}
          maxWidth="md"
        >
          <DialogContent>
            <IconButton
              sx={{ position: "absolute", right: 10, top: 10 }}
              onClick={() => setOpenImage(null)}
            >
              <CloseIcon />
            </IconButton>
            {openImage && (
              <img
                src={openImage}
                alt="Full Preview"
                style={{ width: "100%", maxHeight: "80vh" }}
              />
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </AppTheme>
  );
};

export default DiscussionForm;