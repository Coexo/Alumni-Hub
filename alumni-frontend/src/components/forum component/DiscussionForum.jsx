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
  Divider,
  Paper
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import AppTheme from '../signupcomponent/shared-theme/AppTheme';

const DiscussionForm = (props) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  // Load comments from localStorage on component mount
  useEffect(() => {
    const storedComments = localStorage.getItem('discussionComments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  }, []);

  // Save comments to localStorage whenever comments change
  useEffect(() => {
    localStorage.setItem('discussionComments', JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    const timestamp = new Date().toLocaleString();
    const commentAuthor = isAnonymous ? 'Anonymous' : userName.trim() || 'Guest';
    
    const comment = {
      id: Date.now(),
      text: newComment,
      author: commentAuthor,
      isAnonymous,
      timestamp
    };
    
    setComments([...comments, comment]);
    setNewComment('');
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

  return (
    <AppTheme {...props}>
    <Box sx={{ minWidth: 800, mx: 'auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <ChatIcon sx={{ mr: 1 }} />
          Discussion Forum
        </Typography>
        
        <form onSubmit={handleSubmit}>
       
          <TextField
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            fullWidth
            margin="normal"
            disabled={isAnonymous}
            placeholder={isAnonymous ? "Posting anonymously" : "Your Name"}
            sx={inputStyles} // Apply custom styles
          />
          
          <TextField
            placeholder="Enter your comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            fullWidth
            margin="normal"
            required
            sx={inputStyles} // Apply custom styles
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
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
          disabled={!newComment.trim()}
          sx={{
            '&.Mui-disabled': {
              color: 'white', // Keep text black when disabled
            },
          }}
          >
            Post Comment
          </Button>

          </Box>
        </form>
      </Paper>
      
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Comments ({comments.length})
      </Typography>
      
      {comments.length === 0 ? (
        <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
          Be the first to comment!
        </Typography>
      ) : (
        <Stack spacing={2}>
          {comments.map((comment) => (
            <Card key={comment.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ bgcolor: comment.isAnonymous ? 'grey.500' : 'primary.main', mr: 1 }}>
                    <PersonIcon />
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {comment.author}
                  </Typography>
                </Box>
                
                <Typography variant="body1" sx={{ mt: 1, mb: 2, ml: 6.2, textAlign: 'left' }}>
                  {comment.text}
                </Typography>
                
                <Divider sx={{ my: 1 }} />
                
                <Typography variant="caption" color="textSecondary">
                  Posted on {comment.timestamp}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
      
     
    </Box>
    </AppTheme>
  );
};

export default DiscussionForm;