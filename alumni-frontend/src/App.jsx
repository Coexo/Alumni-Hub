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
import EventsPage from './components/event component/Events';
import { getCookie } from 'cookies-next/client';
import Course from './components/course component/Courses';
import Video from './components/course component/Video';
import Chat from './components/main component/Chat';
import Payment from './components/payment component/Payment';
import PostJobPage from './components/job component/JobPost';

function App() {
  const [count, setCount] = useState(0)
  const isRegistered = getCookie("isRegistered") ?? false;
  console.log(isRegistered);
  

  return (
    <>
      <Router>
        <Routes>
          {!isRegistered ? (
            <Route path="/" element={<Main />} />
          ) : (
            <Route path="/" element={<Alumni />} />
          )}
          {/* Default route is signup */}
          <Route path="/chats" element={<Chat />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Alumni />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forum" element={<DiscussionForm />} />
          <Route path="/internships" element={<HomeComp />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/watch/:id" element={<Video />} />
          <Route path="/create-post" element={<PostJobPage />} />
          <Route path="/payment" element={<Payment/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
