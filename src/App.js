import './App.css';
import React from 'react';
import Toolbar from './Components/Toolbar';
import { Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/HomePage"
import Courses from './Pages/Courses';
import ReikiCourse from './Components/Courses/ReikiCourse';
import Book from './Pages/Book';
import { auth } from "./Config Files/firebaseConfig";
import MyProfile from './Pages/MyProfile';
import Footer from "./Components/Footer";
import Experience from './Pages/Experience';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: ""
    }
  }
  componentDidMount() {
    localStorage.setItem("lang", "en")
    auth.onAuthStateChanged((user) => {
      if (user) {
        localStorage.setItem("uid", user.uid)
        this.setState({ user: user }, () => { console.log(this.state.user) })
      }
    })
  }
  render() {
    return (
      <div>
        <Toolbar />
        <Routes>
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/reiki" element={<ReikiCourse />} />
          <Route path="/book/" element={<Book />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route exact path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    )
  }
}

export default App;

