// pages/index.js
import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Grid, 
  CssBaseline, 
  ThemeProvider, 
  createTheme,
  Typography, 
  List, 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  IconButton,
  Button,
  InputBase,
  Paper,
  Divider,
  TextField,
  Stack,
  Badge
} from '@mui/material';
import {Icon, Video} from "lucide-react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#4a7bfa',
    },
    secondary: {
      main: '#00d1a1',
    },
    background: {
      default: '#f5f8fe',
    },
  },
});

let userRole = localStorage.getItem("userRole");


// Expanded sample data for contacts (more users added)
const contacts = [
  
  {
    "id": 2,
    "name": userRole == "Alumni" ? "Manav Shah" : "Pooja Varpe",
    "email": userRole == "Alumni" ? "manav@gamil.com" : "pooja@gmail.com",
    "avatar": "",
    "lastActivity": "9:45 AM",
    "hasUnread": false
  },
    {
      "id": 1,
      "name": "Opal Bhonsle",
      "email": "opal.bhonsle@mailbox.com",
      "avatar": "https://i.pinimg.com/474x/83/60/f6/8360f6e8e6167d545b0c34de7490cc1e.jpg",
      "lastActivity": "10:02 AM",
      "hasUnread": true
    },
    {
      "id": 3,
      "name": "Gatha Sagar",
      "email": "gatha.sagar@fastmail.com",
      "avatar": "https://i.pinimg.com/originals/ac/18/50/ac1850ddee8ed3b5864a4a68612a12d3.jpg",
      "lastActivity": "Yesterday",
      "hasUnread": true
    },
    {
      "id": 4,
      "name": "Bhishma Arya",
      "email": "bhishma.arya@postmail.com",
      "avatar": "https://i.pinimg.com/474x/4a/5c/2f/4a5c2f2a828314d79432bb91afeb3ef3.jpg",
      "lastActivity": "Yesterday",
      "hasUnread": false
    },
    {
      "id": 5,
      "name": "Kalkin Goswami",
      "email": "kalkin.goswami@securemail.com",
      "avatar": "https://i.pinimg.com/originals/4c/cd/08/4ccd086a8b7970c7a1ab4961e9bfcafc.jpg",
      "lastActivity": "Mar 5",
      "hasUnread": false
    },  
  {
    id: 6,
    name: 'Brenda H Condon',
    email: 'raymond.martin@redrock.ca',
    avatar: 'https://t4.ftcdn.net/jpg/07/57/61/23/360_F_757612374_09Q9dyxOKbynCiT3hMUyk3iEuoR1RgJy.jpg',
    lastActivity: 'Mar 4',
    hasUnread: false
  },
  {
    id: 7,
    name: 'Billy McCarthy',
    email: 'service_center@howeli.ca',
    avatar: 'https://i.pravatar.cc/150?img=7',
    lastActivity: 'Mar 3',
    hasUnread: true
  },
  {
    id: 8,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
    lastActivity: 'Mar 2',
    hasUnread: false
  },
  {
    id: 9,
    name: 'Michael Thompson',
    email: 'michael.t@example.com',
    avatar: 'https://i.pravatar.cc/150?img=9',
    lastActivity: 'Mar 1',
    hasUnread: false
  },
  {
    id: 10,
    name: 'Emma Wilson',
    email: 'emma.w@example.com',
    avatar: 'https://i.pravatar.cc/150?img=10',
    lastActivity: 'Feb 28',
    hasUnread: true
  }
];


// Sample conversations data with messages for all contacts
const initialConversations = {
  1: [
    {
      id: 1,
      text: 'Hi! All subjects have been removed, please check the document and let me know...',
      timestamp: '10:04 AM',
      sender: 'contact',
    },
  ],
  2: [
    {
      id: 1,
      text: 'Hello!',
      timestamp: "",
      sender: userRole == "Alumni" ? "contact" : 'user',
    },
    {
      id: 1,
      text:userRole == "Alumni" ? "" : 'Hii!',
      timestamp: "",
      sender: userRole == "Alumni" ? "user" : 'contact',
    },
  ],
  3: [
    {
      id: 1,
      text: 'The inspection report is ready. Looks like there are a few minor issues.',
      timestamp: 'Yesterday',
      sender: 'contact',
    },
  ],
  4: [
    {
      id: 1,
      text: 'Can we schedule a call to discuss the offer?',
      timestamp: 'Yesterday',
      sender: 'contact',
    },
    {
      id: 2,
      text: 'How about tomorrow at 2pm?',
      timestamp: 'Yesterday',
      sender: 'user',
    },
    {
      id: 3,
      text: 'That works for me. I\'ll send a calendar invite.',
      timestamp: 'Yesterday',
      sender: 'contact',
    },
  ],
  5: [
    {
      id: 1,
      text: 'We need to update the listing photos. The current ones don\'t show the backyard improvements.',
      timestamp: 'Mar 5',
      sender: 'contact',
    },
    {
      id: 2,
      text: 'I agree. I\'ll arrange for a photographer to visit next week.',
      timestamp: 'Mar 5',
      sender: 'user',
    },
  ],
  6: [
    {
      id: 1,
      text: 'The seller accepted our counteroffer!',
      timestamp: 'Mar 4',
      sender: 'contact',
    },
    {
      id: 2,
      text: 'That\'s excellent news! I\'ll call the clients right away.',
      timestamp: 'Mar 4',
      sender: 'user',
    },
  ],
  7: [
    {
      id: 1,
      text: 'We need to discuss the commission structure for the new listing.',
      timestamp: 'Mar 3',
      sender: 'contact',
    },
  ],
  8: [
    {
      id: 1,
      text: 'I have a new client looking in the downtown area. Budget around $500K.',
      timestamp: 'Mar 2',
      sender: 'contact',
    },
    {
      id: 2,
      text: 'I have a few properties that might work. Let me send you the listings.',
      timestamp: 'Mar 2',
      sender: 'user',
    },
  ],
  9: [
    {
      id: 1,
      text: 'The appraisal came in lower than expected. We might need to renegotiate.',
      timestamp: 'Mar 1',
      sender: 'contact',
    },
    {
      id: 2,
      text: 'By how much? Let me know the details and I\'ll reach out to the seller\'s agent.',
      timestamp: 'Mar 1',
      sender: 'user',
    },
  ],
  10: [
    {
      id: 1,
      text: 'We need to update the closing date. The buyers need an extra week.',
      timestamp: 'Feb 28',
      sender: 'contact',
    },
  ],
  11: [
    {
      id: 1,
      text: 'I have a question about the property tax assessment.',
      timestamp: 'Feb 27',
      sender: 'contact',
    },
    {
      id: 2,
      text: 'What would you like to know?',
      timestamp: 'Feb 27',
      sender: 'user',
    },
    {
      id: 3,
      text: 'Is the current assessment from this year or last year?',
      timestamp: 'Feb 27',
      sender: 'contact',
    },
    {
      id: 4,
      text: 'It\'s from this year. The property was reassessed in January.',
      timestamp: 'Feb 27',
      sender: 'user',
    },
  ],
  12: [
    {
      id: 1,
      text: 'The title search is complete. No issues found.',
      timestamp: 'Feb 26',
      sender: 'contact',
    },
    {
      id: 2,
      text: 'Great! Let\'s move forward with closing.',
      timestamp: 'Feb 26',
      sender: 'user',
    },
  ],
  13: [
    {
      id: 1,
      text: 'Do you have the contact information for that home inspector you recommended?',
      timestamp: 'Feb 25',
      sender: 'contact',
    },
    {
      id: 2,
      text: 'Yes, I\'ll send it over right away.',
      timestamp: 'Feb 25',
      sender: 'user',
    },
  ],
  14: [
    {
      id: 1,
      text: 'We need to discuss the marketing strategy for the new listing.',
      timestamp: 'Feb 24',
      sender: 'contact',
    },
  ],
  15: [
    {
      id: 1,
      text: 'The mortgage has been approved! We can proceed with the final steps.',
      timestamp: 'Feb 23',
      sender: 'contact',
    },
    {
      id: 2,
      text: 'Excellent! I\'ll coordinate with the title company.',
      timestamp: 'Feb 23',
      sender: 'user',
    },
  ],
};

// Initial request status for each contact
const initialRequestStatus = {
  1: 'pending',
  2: 'pending',
  3: 'pending',
  4: 'pending',
  5: 'pending',
  6: 'pending',
  7: 'pending',
  8: 'pending',
  9: 'pending',
  10: 'pending',
  11: 'pending',
  12: 'pending',
  13: 'pending',
  14: 'pending',
  15: 'pending',
};

// ChatMessage component with support for system messages
function ChatMessage({ message }) {
  const isUser = message.sender === 'user';
  const isSystem = message.sender === 'system';
  
  if (isSystem) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center',
        mb: 1,
      }}>
        <Paper
          sx={{
            p: 1,
            borderRadius: 2,
            bgcolor: '#f0f0f0',
            color: 'text.secondary',
          }}
        >
          <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
            {message.text}
          </Typography>
        </Paper>
      </Box>
    );
  }
  
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 1,
      }}
    >
      {message.text != "" && <Paper
        sx={{
          p: 2,
          borderRadius: 2,
          maxWidth: '70%',
          bgcolor: isUser ? '#4a7bfa' : '#f1f1f1',
          color: isUser ? 'white' : 'inherit',
        }}
      >
        <Typography variant="body2">{message.text}</Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            textAlign: 'right',
            mt: 0.5,
            opacity: 0.8
          }}
        >
          {message.timestamp}
        </Typography>
      </Paper>}
    </Box>
  );
}

// ContactsList component with improved scrolling and visual indicators
function ContactsList({ onSelectContact, selectedContact, contactsRef }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle scroll events to show/hide the scroll indicator
  const handleScroll = (e) => {
    const element = e.target;
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 20;
    setShowScrollIndicator(!atBottom);
  };

  // Scroll to bottom of contacts list
  const scrollToBottom = () => {
    if (contactsRef.current) {
      contactsRef.current.scrollTop = contactsRef.current.scrollHeight;
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #e0e0e0",
          bgcolor: "white",
          zIndex: 2,
        }}
      >
        <IconButton href="/home">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6">Alumnus</Typography>
        <IconButton color="secondary">
          <AddIcon />
        </IconButton>
      </Box>

      <Paper
        sx={{
          m: 2,
          p: 1,
          display: "flex",
          alignItems: "center",
          boxShadow: "none",
          border: "1px solid #e0e0e0",
          borderRadius: 2,
          zIndex: 2,
          bgcolor: "white",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>

      <List
        sx={{ flexGrow: 1, overflowY: "scroll" }}
        ref={contactsRef}
        onScroll={handleScroll}
      >
        {filteredContacts.map((contact) => (
          <ListItem
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            sx={{
              cursor: "pointer",
              bgcolor:
                selectedContact?.id === contact.id ? "#f5f8fe" : "transparent",
              "&:hover": { bgcolor: "#f5f8fe" },
            }}
            secondaryAction={
              contact.hasUnread ? (
                <CheckCircleIcon color="secondary" fontSize="small" />
              ) : (
                <RadioButtonUncheckedIcon color="disabled" fontSize="small" />
              )
            }
          >
            <ListItemAvatar>
              <Badge
                color="secondary"
                variant="dot"
                invisible={!contact.hasUnread}
              >
                <Avatar src={contact.avatar} alt={contact.name} />
              </Badge>
            </ListItemAvatar>
            <ListItemText
              primary={contact.name}
              secondary={contact.email}
              primaryTypographyProps={{ fontWeight: 500 }}
              secondaryTypographyProps={{ fontSize: 12 }}
            />
          </ListItem>
        ))}
      </List>

      {/* Scroll indicator button */}
      {showScrollIndicator && (
        <IconButton
          sx={{
            position: "absolute",
            width: "33px",
            height: "33px",
            bottom: 80,
            right: 19.8,
            bgcolor: "white",
            boxShadow: 2,
            "&:hover": { bgcolor: "#f5f5f5" },
          }}
          onClick={scrollToBottom}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      )}

      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #e0e0e0",
          bgcolor: "white",
          zIndex: 2,
        }}
      >
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2 }}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
}

// ChatWindow component with fixed input area at bottom
function ChatWindow({ selectedContact, conversations, setConversations, requestStatus, setRequestStatus, chatContainerRef }) {
  const [newMessage, setNewMessage] = useState('');
  
  // Get the current conversation for the selected contact
  const currentConversation = selectedContact ? conversations[selectedContact.id] || [] : [];

  // Scroll to bottom of chat whenever conversation updates or contact changes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [currentConversation, selectedContact, chatContainerRef]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !selectedContact) return;
    
    const message = {
      id: Date.now(),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'user',
    };
    
    const updatedConversation = [...currentConversation, message];
    
    // Update the global conversations state
    setConversations({
      ...conversations,
      [selectedContact.id]: updatedConversation
    });
    
    setNewMessage('');
  };

  const handleAccept = () => {
    if (!selectedContact) return;
    
    const updatedRequestStatus = {
      ...requestStatus,
      [selectedContact.id]: 'accepted'
    };
    setRequestStatus(updatedRequestStatus);
    
    // Add system message indicating the acceptance
    const acceptMessage = {
      id: Date.now(),
      text: "You have accepted the subject removal request.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'system',
    };
    
    const updatedConversation = [...currentConversation, acceptMessage];
    
    // Update the global conversations state
    setConversations({
      ...conversations,
      [selectedContact.id]: updatedConversation
    });
  };

  const handleDecline = () => {
    if (!selectedContact) return;
    
    const updatedRequestStatus = {
      ...requestStatus,
      [selectedContact.id]: 'declined'
    };
    setRequestStatus(updatedRequestStatus);
    
    // Add system message indicating the decline
    const declineMessage = {
      id: Date.now(),
      text: "You have declined the subject removal request.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'system',
    };
    
    const updatedConversation = [...currentConversation, declineMessage];
    
    // Update the global conversations state
    setConversations({
      ...conversations,
      [selectedContact.id]: updatedConversation
    });
  };

  if (!selectedContact) {
    return (
      <Box sx={{ 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        bgcolor: 'white'        
      }}>
        <Typography variant="h6" color="textSecondary">
          Select a contact to start chatting
        </Typography>
      </Box>
    );
  }

  const currentRequestStatus = requestStatus[selectedContact.id] || 'pending';

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "white",
        position: "relative",
      }}
    >
      {/* Header - Fixed at top */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #e0e0e0",
          bgcolor: "white",
          zIndex: 3, // Higher z-index to ensure it stays on top
          position: "sticky",
          top: 0,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ ml: 1 }}>
            {selectedContact.name}
          </Typography>
        </Box>
        <div>
          <IconButton
            href="https://video-streaming-meet-frontend.vercel.app/"
            target="_blank"
          >
            {/* <a
              href="https://video-streaming-meet-frontend.vercel.app/"
              target="_blank"
            > */}
              <Video />
            {/* </a> */}
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </Box>

      {/* Contact info section - Scrolls with content */}
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {currentRequestStatus === "pending"
            ? "Awaiting Response"
            : currentRequestStatus === "accepted"
            ? "Accepted"
            : "Declined"}
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {selectedContact.lastActivity || "10:02 AM"}
        </Typography>
      </Box>

      {/* Show the request notification only if pending */}
      {currentRequestStatus === "pending" && selectedContact.id != 2 && (
        <Paper
          sx={{
            p: 2,
            mx: 2,
            mb: 2,
            bgcolor: "#f8f8f8",
            borderRadius: 2,
            boxShadow: "none",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Subjects Removed
          </Typography>
          <Typography variant="body2">
            {selectedContact.name} has removed all subjects, review and respond
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Subjects
            </Typography>
            <Typography variant="body2">Financing, Inspection (All)</Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Documents
            </Typography>
            <Typography variant="body2" color="primary">
              SubjectRemoval_Legal.pdf
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="inherit"
              sx={{ borderRadius: 2, flex: 1 }}
              onClick={handleDecline}
            >
              Decline
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ borderRadius: 2, flex: 1 }}
              onClick={handleAccept}
            >
              Accept
            </Button>
          </Stack>
        </Paper>
      )}

      {/* Show a declined message if status is declined */}
      {currentRequestStatus === "declined" && (
        <Paper
          sx={{
            p: 2,
            mx: 2,
            mb: 2,
            bgcolor: "#fff4f4",
            borderRadius: 2,
            boxShadow: "none",
            border: "1px solid #ffcdd2",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" color="error">
            Request Declined
          </Typography>
          <Typography variant="body2">
            You have declined the subject removal request.
          </Typography>
        </Paper>
      )}

      {/* Chat messages container - This is the scrollable area */}
      <Box
        ref={chatContainerRef}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          pb: 4, // Add bottom padding to avoid messages being hidden behind input area
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: 0, // This forces the flex item to respect the flex container constraints
        }}
      >
        {currentConversation.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </Box>

      {/* Input area - Fixed at bottom */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #e0e0e0",
          bgcolor: "white",
          zIndex: 3, // Higher z-index to ensure it stays on top
          position: "sticky",
          bottom: 0,
          mt: "auto", // Push to bottom of flex container
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            size="small"
            sx={{ mr: 1 }}
            InputProps={{
              sx: { borderRadius: 4 },
            }}
          />
          <IconButton
            color="secondary"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

// Main App component
export default function Chat() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [conversations, setConversations] = useState(initialConversations);
  const [requestStatus, setRequestStatus] = useState(initialRequestStatus);
  
  // Refs for scroll functionality
  const contactsRef = useRef(null);
  const chatContainerRef = useRef(null);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  // Keyboard navigation for contacts list
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedContact) return;
      
      const currentIndex = contacts.findIndex(c => c.id === selectedContact.id);
      let newIndex;
      
      switch (event.key) {
        case 'ArrowUp':
          newIndex = Math.max(0, currentIndex - 1);
          break;
        case 'ArrowDown':
          newIndex = Math.min(contacts.length - 1, currentIndex + 1);
          break;
        default:
          return;
      }
      
      // Only proceed if we're changing to a different contact
      if (newIndex !== currentIndex) {
        const newContact = contacts[newIndex];
        setSelectedContact(newContact);
        
        // Scroll the contact into view if needed
        if (contactsRef.current) {
          const contactElements = contactsRef.current.querySelectorAll('li');
          if (contactElements[newIndex]) {
            contactElements[newIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedContact]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', overflow:"hidden", display: 'flex' }}>
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={12} md={4} sx={{ borderRight: '1px solid #e0e0e0' }}>
            <ContactsList 
              onSelectContact={handleSelectContact} 
              selectedContact={selectedContact} 
              contactsRef={contactsRef}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <ChatWindow 
              selectedContact={selectedContact} 
              conversations={conversations}
              setConversations={setConversations}
              requestStatus={requestStatus}
              setRequestStatus={setRequestStatus}
              chatContainerRef={chatContainerRef}
            />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}