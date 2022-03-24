import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { Home, CreateLobby, JoinLobby, GameWrapper, Health } from "./pages";
import { UserContextProvider } from "./context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="game/:id" element={<GameWrapper p/>} />
            <Route path="create" element={<CreateLobby />} />
            <Route path="join" element={<JoinLobby />} />
            <Route path="health" element={<Health />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
