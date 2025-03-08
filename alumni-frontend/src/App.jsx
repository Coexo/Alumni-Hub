import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './components/signupcomponent/SignUp';
import SignIn from './components/signupcomponent/SignIn';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Alumni from './components/alumni component/Alumni';
import Profile from './components/profile component/Profile';
import Main from './components/main component/Main';
import DiscussionForm from './components/discussion forum/DiscussionForum';
import HomeComp from './components/job component/HomeComp';
import Events from './components/event component/Events';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Main/>} />
        {/* Default route is signup */}
        {/* <Route path="/" element={<Navigate to="/signup" />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Alumni />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forum" element={<DiscussionForm/>} />
        <Route path="/internships" element={<HomeComp/>} />
        <Route path="/events" element={<Events/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
