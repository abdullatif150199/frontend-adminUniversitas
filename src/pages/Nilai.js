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

export default function Nilai() {
  const [nilai, setnilai] = useState([]);
  const [nama, setNama] = useState("");
  const [codemk, setcodemk] = useState("");
  // const [tanggalLahir, setTanggalLahir] = useState("");
  const [point, setpoint] = useState("");
  const [mk, setmk] = useState("");
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
    setNama("");
    setcodemk("");
    // setTanggalLahir("");
    setmk("");
    setpoint("");
  };

  const getData = () => {
    axios
      .get(API_URL + "/nilai")
      .then((res) => {
        const data = res.data;
        setnilai(data);
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

    // Do something with the form data
    const formData = { nama, codemk, point, mk };
    if (edit === false) {
      axios
        .post(API_URL + "/nilaiPost", formData)
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
        .post(API_URL + `/nilaiPut/${data.id}?_method=PUT`, formData)
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
      .delete(API_URL + "/nilaiDelete/" + id)
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
      .get(API_URL + "/nilaiGet/" + id)
      .then((res) => {
        setData(res.data);
        setNama(res.data.nama);
        setcodemk(res.data.codemk);
        // setTanggalLahir(res.data.ttl);
        setmk(res.data.mk);
        setpoint(res.data.nilai);
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
    axios.get(API_URL + "/nilaiSearch/" + key).then((res) => {
      setnilai(res.data);
    });
  };

  return (
    <div className="mt-3 container-fluid">
      <h3>
        <i class="fa-solid fa-paper-plane"></i> DAFTAR NILAI MAHASISWA
      </h3>
      <hr />
      <Button variant="primary" onClick={handleShow} className="my-3">
        <i class="fa-solid fa-plus"></i> Tambah Data NIlai
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
            <th scope="col">NAMA</th>
            <th scope="col" className="hidden">
              CODE MK
            </th>
            {/* <th scope="col" >
              TEMPAT TANGGAL LAHIR
            </th> */}
            <th scope="col">MATA KULIAH</th>
            <th scope="col">NILAI</th>

            <th colspan="3" scope="col">
              AKSI
            </th>
          </tr>
        </thead>
        <tbody>
          {nilai.data
            ? nilai.data.map((nli, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{nli.nama}</td>
                    <td className="hidden">{nli.codemk}</td>
                    <td>{nli.mk}</td>
                    <td>{nli.nilai}</td>
                    <td>
                      <p className=" p-2 mt-1 text-white bg-success rounded text-center" style={{ cursor: "pointer" }} data-toggle="tooltip" title="Detail" onClick={() => handleDetail(nli.id)}>
                        Detail
                      </p>
                    </td>
                    <td>
                      <p className=" p-2 mt-1 text-white bg-primary rounded text-center" style={{ cursor: "pointer" }} data-toggle="tooltip" title="Edit" onClick={() => getId(nli.id)}>
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
                            return handleDelete(nli.id);
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
            <Modal.Title>{detail ? "Detail nilai" : <div>{edit ? "Update Data nilai" : "Tambah Data nilai"}</div>}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" defaultValue={nama} onChange={(e) => setNama(e.target.value)} disabled={detail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formcodemk">
                <Form.Label>CODE MK</Form.Label>
                <Form.Control type="text" defaultValue={codemk} onChange={(e) => setcodemk(e.target.value)} disabled={detail} />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="formTanggalLahir">
                <Form.Label>Tempat Tanggal Lahir</Form.Label>
                <Form.Control type="text" defaultValue={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} disabled={detail} />
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="formmk">
                <Form.Label>MATA KULIAH</Form.Label>
                <Form.Control type="text" defaultValue={mk} onChange={(e) => setmk(e.target.value)} disabled={detail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formmk">
                <Form.Label>NILAI</Form.Label>
                <Form.Control type="text" defaultValue={point} onChange={(e) => setpoint(e.target.value)} disabled={detail} />
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
          <PaginationComp data={nilai} setData={setnilai} />
        </div>
      </div>
    </div>
  );
}
