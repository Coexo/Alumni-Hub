import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './components/signupcomponent/SignUp';
import SignIn from './components/signupcomponent/SignIn';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Alumni from './components/alumni component/Alumni';
import Profile from './components/profile component/Profile';
import DiscussionForum from './components/forum component/DiscussionForum';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<DiscussionForum/>} />
        {/* Default route is signup */}
        {/* <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} /> */}
      </Routes>
    </Router>
    </>
  )
}

export default App
