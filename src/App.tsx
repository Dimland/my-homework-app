import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { UserGreeter } from "./components/UserGreeter";
import { About } from "./components/About";


function App() {
  return (

    <BrowserRouter>
      <nav
        style={{ padding: "10px", background: "#eee", marginBottom: "20px" }}
      >
        {/* 

        */}
        <Link to="/" style={{ marginRight: "15px" }}>
            Home
        </Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UserGreeter />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;