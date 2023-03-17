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

export default function Mahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [semester, setSemester] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");
  const [edit, setEdit] = useState(false);
  const [detail, setDetail] = useState(false);
  const [search, setSearch] = useState("");
  const [step, setStep] = useState([]);

  const handleClose = () => {
    setShow(false);
    handleKInput();
    setDetail(false);
  };
  const handleShow = () => setShow(true);

  const handleKInput = () => {
    setEdit(false);
    setNama("");
    setNim("");
    setTanggalLahir("");
    setJurusan("");
    setSemester("");
  };

  const getData = () => {
    axios
      .get(API_URL + "/mahasiswa")
      .then((res) => {
        setMahasiswa(res.data);
        handleKInput();
        console.log("mahasiswa", res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8000/api/mahasiswa");
  //       const data = response.data;
  //       setMahasiswa(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getData();
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Do something with the form data
    const formData = { nama, nim, semester, tanggalLahir, jurusan };
    if (edit === false) {
      axios
        .post(API_URL + "/mahasiswaPost", formData)
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
        .post(API_URL + `/mahasiswaPut/${data.id}?_method=PUT`, formData)
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
      .delete(API_URL + "/mahasiswaDelete/" + id)
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
      .get(API_URL + "/mahasiswaGet/" + id)
      .then((res) => {
        setData(res.data);
        setNama(res.data.nama);
        setNim(res.data.nim);
        setTanggalLahir(res.data.ttl);
        setJurusan(res.data.jurusan);
        setSemester(res.data.semester);
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
    axios.get(API_URL + "/mahasiswaSearch/" + key).then((res) => {
      setMahasiswa(res.data);
      // console.log("search", res.data);
    });
  };

  return (
    <div className="mt-2 container-fluid">
      <h3>
        <i class="fa-solid fa-graduation-cap"></i> DAFTAR MAHASISWA
      </h3>
      <hr />
      <Button variant="primary" onClick={handleShow} className="my-3">
        <i class="fa-solid fa-plus"></i> Tambah Data Mahasiswa
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
            <th scope="col">NAMA MAHASISWA</th>
            <th scope="col" className="hidden">
              NIM
            </th>
            <th scope="col" className="hidden">
              TEMPAT TANGGAL LAHIR
            </th>
            <th scope="col">JURUSAN</th>
            <th colspan="3" scope="col">
              AKSI
            </th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.data
            ? mahasiswa.data.map((mhs, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{mhs.nama}</td>
                    <td className="hidden">{mhs.nim}</td>
                    <td className="hidden">{mhs.ttl}</td>
                    <td>{mhs.jurusan}</td>
                    <td>
                      <p className="p-2 mt-1 text-white bg-success rounded text-center" style={{ cursor: "pointer" }} data-toggle="tooltip" title="Detail" onClick={() => handleDetail(mhs.id)}>
                        Detail
                      </p>
                    </td>
                    <td>
                      <p className="p-2 mt-1 text-white bg-primary rounded text-center" style={{ cursor: "pointer" }} data-toggle="tooltip" title="Edit" onClick={() => getId(mhs.id)}>
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
                            return handleDelete(mhs.id);
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{detail ? "Detail Mahasiswa" : <div>{edit ? "Update Data Mahasiswa" : "Tambah Data Mahasiswa"}</div>}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" defaultValue={nama} onChange={(e) => setNama(e.target.value)} disabled={detail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNIM">
                <Form.Label>NIM</Form.Label>
                <Form.Control type="text" defaultValue={nim} onChange={(e) => setNim(e.target.value)} disabled={detail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTanggalLahir">
                <Form.Label>Tempat Tanggal Lahir</Form.Label>
                <Form.Control type="text" defaultValue={tanggalLahir} onChange={(e) => setTanggalLahir(e.target.value)} disabled={detail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formJurusan">
                <Form.Label>Jurusan</Form.Label>
                <Form.Control type="text" defaultValue={jurusan} onChange={(e) => setJurusan(e.target.value)} disabled={detail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formJurusan">
                <Form.Label>Semester</Form.Label>
                <Form.Control type="text" defaultValue={semester} onChange={(e) => setSemester(e.target.value)} disabled={detail} />
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
      </div>
      <div className="d-flex justify-content-center">
        <PaginationComp data={mahasiswa} setData={setMahasiswa} />
      </div>
    </div>
  );
}
