import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
import { API_URL } from "../config/API_URL";
import InputGroup from "react-bootstrap/InputGroup";
import PaginationComp from "../components/PaginationComp";

export default function Dosen() {
  const [dosen, setDosen] = useState([]);
  const [nama, setnama] = useState("");
  const [nidn, setnidn] = useState("");
  const [alamat, setalamat] = useState("");
  const [mk, setmk] = useState("");
  const [jam, setjam] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");
  const [edit, setEdit] = useState(false);
  const [detail, setDetail] = useState(false);
  const [search, setSearch] = useState("");

  const handleClose = () => {
    setShow(false);
    handleKInput();
    setDetail(false);
  };
  const handleShow = () => setShow(true);

  const handleKInput = () => {
    setEdit(false);
    setnama("");
    setnidn("");
    setalamat("");
    setjam("");
    setmk("");
  };

  const getData = () => {
    axios
      .get(API_URL + "/dosen")
      .then((res) => {
        const data = res.data;
        setDosen(data);
        handleKInput();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { nama, nidn, mk, alamat, jam };
    if (edit === false) {
      axios
        .post(API_URL + "/dosenPost", formData)
        .then((res) => {
          swal({
            title: "Tambah Item!",
            text: `Berhasil Menambah Item`,
            icon: "success",
            button: false,
            timer: 1000,
          });
          getData();
        })
        .catch((error) => {
          console.error(error);
        });

      handleClose();
    } else {
      axios
        .post(API_URL + `/dosenPut/${data.id}?_method=PUT`, formData)
        .then((res) => {
          swal({
            title: "Update Item",
            text: `Berhasil Update Item`,
            icon: "success",
            button: false,
            timer: 1000,
          });
          getData();
        })
        .catch((error) => {
          console.error(error);
        });
      handleClose();
      getData();
      console.log(formData);
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(API_URL + "/dosenDelete/" + id)
      .then(() => {
        swal({
          title: "Hapus Item!",
          text: `sukses hapus item`,
          icon: "error",
          button: false,
          timer: 1000,
        });
        getData();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getId = (id) => {
    axios
      .get(API_URL + "/dosenGet/" + id)
      .then((res) => {
        setData(res.data);
        setnama(res.data.nama);
        setnidn(res.data.nidn);
        setalamat(res.data.alamat);
        setjam(res.data.jam);
        setmk(res.data.mk);
      })
      .catch((error) => console.error(error));
    setEdit(true);
    handleShow();
  };

  const handleDetail = (id) => {
    getId(id);
    setDetail(true);
  };

  const handleSearch = (key) => {
    axios.get(API_URL + "/dosenSearch/" + key).then((res) => {
      setDosen(res.data);
    });
  };

  return (
    <div className="mt-3 container-fluid">
      <h3>
        <i class="fa-solid fa-chalkboard-user"></i> DAFTAR DOSEN
      </h3>
      <hr />
      <Button variant="primary" onClick={handleShow} className="my-3">
        <i class="fa-solid fa-plus"></i> Tambah Data Dosen
      </Button>
      <div className="col-md-3">
        <InputGroup className="my-3">
          <Button style={{ backgroundColor: "#006400", color: "white" }} onClick={() => handleSearch(search)}>
            Search
          </Button>
          <Form.Control placeholder="Type name..." onChange={(e) => setSearch(e.target.value)} />
        </InputGroup>
      </div>
      <table className="table table-striped table-bordered">
        <thead className="text-center">
          <tr>
            <th scope="col">NO</th>
            <th scope="col">NAMA DOSEN</th>
            <th scope="col" className="hidden">
              NIDN
            </th>
            <th scope="col" className="hidden">
              ALAMAT
            </th>
            <th scope="col">MATA KULIAH</th>
            <th colspan="3" scope="col">
              AKSI
            </th>
          </tr>
        </thead>
        <tbody>
          {dosen.data
            ? dosen.data.map((dsn, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{dsn.nama}</td>
                    <td className="hidden">{dsn.nidn}</td>
                    <td className="hidden">{dsn.alamat}</td>
                    <td>{dsn.mk}</td>
                    <td>
                      <p className=" p-2 mt-1 text-white bg-success rounded text-center" style={{ cursor: "pointer" }} data-toggle="tooltip" title="Detail" onClick={() => handleDetail(dsn.id)}>
                        Detail
                      </p>
                    </td>
                    <td>
                      <p className=" p-2 mt-1 text-white bg-primary rounded text-center" style={{ cursor: "pointer" }} data-toggle="tooltip" title="Edit" onClick={() => getId(dsn.id)}>
                        <i className="fa-solid fa-pen-to-square "></i>
                      </p>
                    </td>
                    <td>
                      <p
                        className="p-2 m-1 text-white bg-danger rounded text-center"
                        data-toggle="tooltip"
                        title="Hapus"
                        onClick={() => {
                          const confirm = window.confirm("yakin ingin menghapus item ini?");
                          if (confirm) {
                            return handleDelete(dsn.id);
                          }
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </p>
                    </td>
                  </tr>
                );
              })
            : "data tidak ditemukan"}
        </tbody>
      </table>

      {/* modal */}
      <div>
        <Modal show={show} onHide={handleClose} style={{ maxWidth: "90vw" }}>
          <Modal.Header closeButton>
            <Modal.Title>{detail ? "Detail Dosen" : <div>{edit ? "Update Data Dosen" : "Tambah Data dosen"}</div>}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" defaultValue={nama} onChange={(e) => setnama(e.target.value)} disabled={detail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formnidn">
                <Form.Label>NIDN</Form.Label>
                <Form.Control type="text" defaultValue={nidn} onChange={(e) => setnidn(e.target.value)} disabled={detail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formalamat">
                <Form.Label>ALAMAT</Form.Label>
                <Form.Control type="text" defaultValue={alamat} onChange={(e) => setalamat(e.target.value)} disabled={detail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formjam">
                <Form.Label>JAM</Form.Label>
                <Form.Control type="text" defaultValue={jam} onChange={(e) => setjam(e.target.value)} disabled={detail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formjam">
                <Form.Label>MATA KULIAH</Form.Label>
                <Form.Control type="text" defaultValue={mk} onChange={(e) => setmk(e.target.value)} disabled={detail} />
              </Form.Group>
              {detail ? (
                <div></div>
              ) : (
                <div>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" className="mx-3" onClick={handleSubmit}>
                    Simpan
                  </Button>
                </div>
              )}
            </Form>
          </Modal.Body>
        </Modal>
        <div className="d-flex justify-content-center">
          <PaginationComp data={dosen} setData={setDosen} />
        </div>
      </div>
    </div>
  );
}
