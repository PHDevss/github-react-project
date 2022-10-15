import React from "react";
import { Routes, Route } from 'react-router-dom'
import Dashboard from "../pages/Dashboard";
import Repository from "../pages/Repository";

const Ways = () => (
    <Routes>
        <Route path="/github-react-project/" element={<Dashboard />}/>
        <Route path="/github-react-project/repositories/:owner/:repository"  element={<Repository />}/>
    </Routes>
)

export default Ways;
