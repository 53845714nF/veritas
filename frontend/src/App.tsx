import React from 'react';
import '@picocss/pico'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}