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

export default function Pegawai() {
  const [pegawai, setpegawai] = useState([]);
  const [nama, setnama] = useState("");
  const [nohp, setnohp] = useState("");
  const [alamat, setalamat] = useState("");
  const [posisi, setposisi] = useState("");
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
    setnohp("");
    setalamat("");
    setjam("");
    setposisi("");
  };

  const getData = () => {
    axios
      .get(API_URL + "/pegawai")
      .then((res) => {
        const data = res.data;
        setpegawai(data);
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
    const formData = { nama, nohp, posisi, alamat, jam };
    if (edit === false) {
      axios
        .post(API_URL + "/pegawaiPost", formData)
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
        .post(API_URL + `/pegawaiPut/${data.id}?_method=PUT`, formData)
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
      .delete(API_URL + "/pegawaiDelete/" + id)
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
      .get(API_URL + "/pegawaiGet/" + id)
      .then((res) => {
        setData(res.data);
        setnama(res.data.nama);
        setnohp(res.data.nohp);
        setalamat(res.data.alamat);
        setjam(res.data.jam);
        setposisi(res.data.posisi);
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
    axios.get(API_URL + "/pegawaiSearch/" + key).then((res) => {
      setpegawai(res.data);
    });
  };

  return (
    <div className="mt-3 container-fluid">
      <h3>
        <i class="fa-solid fa-user-large"></i> DAFTAR pegawai
      </h3>
      <hr />
      <Button variant="primary" onClick={handleShow} className="my-3">
        <i class="fa-solid fa-plus"></i> Tambah Data pegawai
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
            <th scope="col">NAMA PEGAWAI</th>
            <th scope="col" className="hidden">
              NO HP
            </th>
            <th scope="col" className="hidden">
              ALAMAT
            </th>
            <th scope="col">POSISI</th>
            <th colspan="3" scope="col">
              AKSI
            </th>
          </tr>
        </thead>
        <tbody>
          {pegawai.data
            ? pegawai.data.map((pgw, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{pgw.nama}</td>
                    <td className="hidden">{pgw.nohp}</td>
                    <td className="hidden">{pgw.alamat}</td>
                    <td>{pgw.posisi}</td>
                    <td>
                      <p className=" p-2 mt-1 text-white bg-success rounded text-center" style={{ cursor: "pointer" }} data-toggle="tooltip" title="Detail" onClick={() => handleDetail(pgw.id)}>
                        Detail
                      </p>
                    </td>
                    <td>
                      <p className=" p-2 mt-1 text-white bg-primary rounded text-center" style={{ cursor: "pointer" }} data-toggle="tooltip" title="Edit" onClick={() => getId(pgw.id)}>
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
                            return handleDelete(pgw.id);
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
            : "data tidak ditemukan...!"}
        </tbody>
      </table>

      {/* modal */}
      <div>
        <Modal show={show} onHide={handleClose} style={{ maxWidth: "90vw" }}>
          <Modal.Header closeButton>
            <Modal.Title>{detail ? "Detail pegawai" : <div>{edit ? "Update Data pegawai" : "Tambah Data pegawai"}</div>}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" defaultValue={nama} onChange={(e) => setnama(e.target.value)} disabled={detail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formnohp">
                <Form.Label>NO Hp</Form.Label>
                <Form.Control type="text" defaultValue={nohp} onChange={(e) => setnohp(e.target.value)} disabled={detail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formalamat">
                <Form.Label>ALAMAT</Form.Label>
                <Form.Control type="text" defaultValue={alamat} onChange={(e) => setalamat(e.target.value)} disabled={detail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formjam">
                <Form.Label>JAM KERJA</Form.Label>
                <Form.Control type="text" defaultValue={jam} onChange={(e) => setjam(e.target.value)} disabled={detail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formjam">
                <Form.Label>POSISI</Form.Label>
                <Form.Control type="text" defaultValue={posisi} onChange={(e) => setposisi(e.target.value)} disabled={detail} />
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
          <PaginationComp data={pegawai} setData={setpegawai} />
        </div>
      </div>
    </div>
  );
}
