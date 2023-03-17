import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";
import "../css/dashboard.css";
import { API_URL } from "../config/API_URL";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [jumlah, setJumlah] = useState([]);

  useEffect(() => {
    axios.get(API_URL + "/dashboard").then((res) => {
      const data = res.data;
      setJumlah(data);
    });
  }, []);

  return (
    <div className="row mt-3">
      <h3>
        <i class="fa-solid fa-table-columns"></i> DASHBOARD
      </h3>
      <hr />
      <div className="row cardParent justify-content-center">
        <div className="col-md-3 col-8 mt-3 mb-5">
          <Card className="bg-info text-white">
            <Card.Body>
              <Card.Title className="">Jumlah Mahasiswa</Card.Title>
              <Card.Text>
                <p className="display-4">{jumlah.mahasiswa}</p>
              </Card.Text>
              <i class="fa-solid fa-graduation-cap icon"></i>
              <Link to="/mahasiswa" className="text-white text-decoration-none text">
                Detail <i class="fa-solid fa-angles-right ml-2"></i>
              </Link>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 col-8 mt-3">
          <Card className="bg-success text-white">
            <Card.Body>
              <Card.Title className="">Jumlah Dosen</Card.Title>
              <Card.Text>
                <p className="display-4">{jumlah.dosen}</p>
              </Card.Text>
              <i class="fa-solid fa-chalkboard-user icon"></i>
              <Link to="/dosen" className="text-white text-decoration-none text">
                Detail <i class="fa-solid fa-angles-right ml-2"></i>
              </Link>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 col-8 mt-3">
          <Card className="bg-danger text-white">
            <Card.Body>
              <Card.Title className="">Jumlah Pegawai</Card.Title>
              <Card.Text>
                <p className="display-4">{jumlah.pegawai}</p>
              </Card.Text>
              <i class="fa-solid fa-user-large icon"></i>
              <Link to="/pegawai" className="text-white text-decoration-none text">
                Detail <i class="fa-solid fa-angles-right ml-2"></i>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-3 col-8 mt-3">
          <Card className="text-white ">
            <Card.Header className="bg-primary text-center">
              <i class="fa-brands fa-facebook display-3"></i>
            </Card.Header>
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <Card.Title className="text-center text-primary">FACEBOOK</Card.Title>
              <Card.Text></Card.Text>
              <a className="btn btn-primary"> LIKE</a>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 col-8 mt-3">
          <Card className="text-white ">
            <Card.Header className="bg-info text-center">
              <i class="fa-brands fa-twitter display-3"></i>
            </Card.Header>
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <Card.Title className="text-center text-info">TWITTER</Card.Title>
              <Card.Text></Card.Text>
              <a className="btn btn-info text-white"> Follow</a>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 col-8 mt-3">
          <Card className="text-white ">
            <Card.Header className="bg-danger text-center">
              <i class="fa-brands fa-instagram display-3"></i>
            </Card.Header>
            <Card.Body className="d-flex flex-column align-items-center justify-content-center">
              <Card.Title className="text-center text-danger">INSTAGRAM</Card.Title>
              <Card.Text></Card.Text>
              <a className="btn btn-danger"> Follow</a>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}
