import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AppTheme from './shared-theme/AppTheme';
import { GoogleIcon } from './CustomIcons';
import axios from 'axios';
import {
  setCookie,
} from "cookies-next/client";


const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    minWidth: '550px',
    padding: theme.spacing(4),
    gap: theme.spacing(3),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
}));




export default function SignUp(props) {

    const [isSignup, setIsSignup] = useState(true);
    // const [username, setUsername] = useState('');
    // const [name, setName] = useState('');
    // const [password, setPassword] = useState('');
    // const [email, setEmail] = useState('');
    // const [mobileNo, setMobileNo] = useState('');

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        name: "",
        mobileNo: "",
        password: ""
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignin = async (event) => {
        event.preventDefault(); // Prevents the page from refreshing

        console.log("Form Data:", formData);

        if (!formData.username || !formData.name || !formData.password || !formData.email || !formData.mobileNo) {
            setError("Please fill all fields");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4001/api/signin", formData, {
                headers: { "Content-Type": "application/json" },
            });

            console.log("Signup response:", response.data);
            setSuccessMessage(response.data.message || "Signup successful! Please Login");

            setFormData({ username: "", name: "", mobileNo: "", email: "", password: "" });
            setError("");
            setIsSignup(false);
            setCookie("isRegistered",true);
            localStorage.setItem("userId", response.data.user._id);
            window.location.href="/"
        } catch (err) {
            console.error("Signup error:", err);
            setError(err.response?.data?.message || "Signup failed, please try again.");
            setSuccessMessage("");
        }
    };


    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <Stack direction="column" justifyContent="center" alignItems="center" sx={{ height: '100vh', padding: 2 }}>
                <Card variant="outlined">
                    <Typography component="h1" variant="h4" sx={{ textAlign: 'left' }}>
                        Sign up
                    </Typography>
                    <Box onSubmit={handleSignin} component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ textAlign: 'left', paddingLeft: '5px' }}>Username</FormLabel>
                                <TextField
                                    required
                                    name="username"
                                    placeholder="yourusername"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl fullWidth>
                                <FormLabel sx={{ textAlign: 'left', paddingLeft: '5px' }}>Email</FormLabel>
                                <TextField
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <FormControl fullWidth>
                                <FormLabel sx={{ textAlign: 'left', paddingLeft: '5px' }}>Full Name</FormLabel>
                                <TextField
                                    required
                                    name="name"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />                            </FormControl>
                            <FormControl fullWidth>
                                <FormLabel sx={{ textAlign: 'left', paddingLeft: '5px' }}>Mobile Number</FormLabel>
                                <TextField
                                    required
                                    type="tel"
                                    name="mobileNo"  // ✅ Changed from "mobile" to "mobileNo"
                                    placeholder="123-456-7890"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                />
                            </FormControl>
                        </Stack>
                        <FormControl fullWidth>
                            <FormLabel sx={{ textAlign: 'left', paddingLeft: '5px' }}>Password</FormLabel>
                            <TextField
                                required
                                type="password"
                                name="password"
                                placeholder="••••••"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControlLabel control={<Checkbox />} label="I want to receive updates via email." />
                        <Button type="submit" fullWidth variant="contained">
                            Sign up
                        </Button>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                    </Divider>
                    <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>Sign up with Google</Button>
                    <Typography sx={{ textAlign: 'center' }}>
                        Already have an account? <Link to="/signin">Sign in</Link>
                    </Typography>
                </Card>
            </Stack>
        </AppTheme>
    );
}