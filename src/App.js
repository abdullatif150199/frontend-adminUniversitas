import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./partials/Header";
import Sidebar from "./partials/Sidebar";
import Dashboard from "./pages/Dashboard";
import Dosen from "./pages/Dosen";
import Mahasiswa from "./pages/Mahasiswa";
import Nilai from "./pages/Nilai";
import Pegawai from "./pages/Pegawai";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

// import NavbarComp from "./fungsi/NavbarComp";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {localStorage.getItem("user") ? (
          <>
            <Header />
            <div className="row">
              <div className="col-md-2">
                <Sidebar />
              </div>
              <div className="col-md-10">
                <Routes>
                  <Route path="/*" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/home" element={<Dashboard />} />
                  <Route path="/dosen" exact element={<Dosen />} />
                  <Route path="/mahasiswa" element={<Mahasiswa />} />
                  <Route path="/nilai" element={<Nilai />} />
                  <Route path="/pegawai" element={<Pegawai />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/*" element={<Login />} />
          </Routes>
        )}
      </BrowserRouter>
    );
  }
}

export default App;
