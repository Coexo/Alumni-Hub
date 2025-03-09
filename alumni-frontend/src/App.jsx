import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUp from './components/signup component/SignUp';
import SignIn from './components/signup component/SignIn';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Alumni from './components/alumni component/Alumni';
import Profile from './components/profile component/Profile';
import Main from './components/main component/Main';
import DiscussionForm from './components/discussion forum/DiscussionForum';
import HomeComp from './components/job component/HomeComp';
import EventsPage from './components/event component/Events';
import Course from './components/course component/Courses';
import Video from './components/course component/Video';

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
        <Route path="/events" element={<EventsPage/>} />
        <Route path="/courses" element={<Course/>} />
        <Route path="/watch/:id" element={<Video />} />
      </Routes>
    </Router>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
