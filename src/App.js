import './App.css';
import React from 'react';
import Toolbar from './Components/Toolbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage"
import Courses from './Pages/Courses';
import ReikiCourse from './Components/Courses/ReikiCourse';
import Register from './Pages/Register';
import { auth } from "./Config Files/firebaseConfig";
import MyProfile from './Pages/MyProfile';
import Footer from "./Components/Footer";
import Experience from './Pages/Experience';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';
import About from './Pages/About';
import Consultation from './Pages/Consultation';
import Feedback from './Pages/Feedback';
import PrivateRoute from './Components/PrivateRoute';
import Refund from './Pages/Refund';
import Login from './Pages/Login';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: ""
    }
  }
  componentDidMount() {
    if (!localStorage.getItem("lang")) {
      localStorage.setItem("lang", "en")
    }
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("uid", user.uid)
        this.setState({ user: user })
      }
    })
  }
  render() {
    return (
      <div>
        <Toolbar />
        <Routes>
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/reiki" element={<PrivateRoute><ReikiCourse /></PrivateRoute>} />
          <Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
          <Route path="/about-reiki" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/login" element={<Login />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/terms" element={<Terms />} />
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/consultation" element={<PrivateRoute><Consultation /></PrivateRoute>} />
          {/* <Route exact path="/paymentsuccess" element={<Courses />} /> */}
        </Routes>
        <Footer />
      </div>
    )
  }
}

export default App;

