import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-routerdom";
import React from "react";
import { Home, CreateLobby, JoinLobby, Game } from "./pages/Home";


function App() {
  return (
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="game/:id" element={<Game />} />
          <Route path="create" element={<CreateLobby />} />
          <Route path="join" element={<JoinLobby />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
