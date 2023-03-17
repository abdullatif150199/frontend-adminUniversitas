import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { API_URL } from "../config/API_URL";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      await axios.post(API_URL + "/login", data).then((res) => {
        swal({
          title: "Login Berhasil",
          text: `Selamat! Anda Berhasil Login`,
          icon: "success",
          button: false,
          timer: 2000,
        }).then(() => {
          localStorage.setItem("user", JSON.stringify(res.config.data));
          window.location.href = "/dashboard";
        });
      });
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  //   const handleEmailPasswordLogin = (e) => {
  //     e.preventDefault();
  //     const auth = getAuth();
  //     signInWithEmailAndPassword(auth, email, password)
  //       .then((result) => {
  //         console.log(result);
  //         swal({
  //           title: "Login Berhasil",
  //           text: `Selamat! Anda Berhasil Login`,
  //           icon: "success",
  //           button: false,
  //           timer: 2000,
  //         });
  //         localStorage.setItem("user", JSON.stringify(result.user));
  //         navigate("/");
  //       })
  //       .catch((err) => {
  //         if (err) {
  //           const errorMessage = err.message.replace("Firebase: ", "");
  //           alert(errorMessage);
  //         }
  //         console.error(err);
  //       });
  //   };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="col-md-4 col-8">
        {show ? (
          <Alert variant="success" onClose={() => setShow(false)} dismissible className="text-center">
            <p>To login as an admin, please contact the developer of this website: Abd.Latif(087824982707/wa) </p>
          </Alert>
        ) : (
          ""
        )}
      </div>
      <div className="col-md-4 col-8 d-flex flex-column   justify-content-center align-items-center text-center py-5" style={{ backgroundColor: "#006400", borderRadius: "20px", padding: "0px" }}>
        <h3 className="text-white">Login As Admin</h3>
        <div className="col-md-8 col-8 mt-5">
          <input className="input w-100 text-white" id="email" name="email" placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} style={{ backgroundColor: "#006400" }} />
          <br />
          <input className="input w-100 mt-2 text-white" id="password" name="password" placeholder="Password" type="Password" onChange={(e) => setPassword(e.target.value)} style={{ backgroundColor: "#006400" }} />
          <br />
          <button className="btn btn-light mt-5 w-100" onClick={handleSubmit}>
            <strong> Login</strong>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
