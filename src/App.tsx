import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Main } from './components/main/Main'
import { Login } from './components/Login'
import { Profile } from './components/Profile';
import { NavBar } from './components/NavBar';
import { CreatePost } from './components/create-post/CreatePost';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="createpost" element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
