import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Homepage from "./components/HomePage";

const App = () => {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                </Routes>

                {/* Add more routes as needed */}
            </div>
        </Router>
    );
};

export default App;
