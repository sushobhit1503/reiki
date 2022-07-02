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

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: ""
    }
  }
  componentDidMount() {
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
          <Route exact path="/" element={<HomePage />} />
        </Routes>
      </div>
    )
  }
}

export default App;
