import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "../css/sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar mt-2">
      <h3 className="ms-2 mmt-2">Daftar List</h3>
      <hr />
      <div className="sidebara">
        <ListGroup>
          <Link to="/dashboard" className="text-dark text-decoration-none">
            <ListGroup.Item>
              <i class="fa-solid fa-table-columns"></i> Dashboard
            </ListGroup.Item>
          </Link>
          <Link to="/mahasiswa" className="text-dark text-decoration-none">
            <ListGroup.Item>
              <i class="fa-solid fa-graduation-cap"></i> Daftar Mahasiswa
            </ListGroup.Item>
          </Link>
          <Link to="/dosen" className="text-dark text-decoration-none">
            <ListGroup.Item>
              <i class="fa-solid fa-chalkboard-user"></i> Daftar Dosen
            </ListGroup.Item>
          </Link>
          <Link to="/pegawai" className="text-dark text-decoration-none">
            <ListGroup.Item>
              <i class="fa-solid fa-user-large"></i> Daftar Pegawai
            </ListGroup.Item>
          </Link>
          <Link to="/nilai" className="text-dark text-decoration-none">
            <ListGroup.Item>
              <i class="fa-solid fa-paper-plane"></i> Nilai Mahasiswa
            </ListGroup.Item>
          </Link>
        </ListGroup>
      </div>
    </div>
  );
}
