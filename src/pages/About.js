import React from "react";

export default function About() {
  return (
    <div className="">
      <h1 className="text-center">Halaman About</h1>
      <p>
        Website ini dibuat hanya untuk latihan pengembangan aplikasi menggunakan data palsu. Penggunaan data palsu sangat penting dalam pengembangan aplikasi karena memungkinkan pengembang untuk menguji fungsionalitas aplikasi tanpa harus
        menggunakan data asli. Selain itu, dengan menggunakan data palsu, pengembang dapat memastikan bahwa data pribadi dan sensitif tidak dipaparkan ke publik.
      </p>
      <br />
      <p>
        Website ini dibuat menggunakan ReactJS dan Laravel, dimana ReactJS digunakan untuk membangun bagian frontend dan Laravel digunakan untuk membangun bagian backend. Tujuan dari pembuatan website ini adalah untuk melatih pengembangan
        dan penggunaan API. ReactJS adalah salah satu framework JavaScript yang populer untuk membangun tampilan aplikasi web yang interaktif dan dinamis, sedangkan Laravel adalah framework PHP yang populer untuk membangun aplikasi web yang
        dapat diintegrasikan dengan basis data. Kombinasi dari keduanya memungkinkan pembuatan aplikasi web yang efisien dan mudah dikembangkan. Dalam pengembangan website ini, pembuat aplikasi ini belajar mengiplementasikan bagaimana
        membuat dan mengintegrasikan API, yang akan memberikan pengalaman belajar yang bermanfaat untuk pengembangan aplikasi web di masa depan.
      </p>
      <br />
      <br />
      <br />
      <p>
        repository dari website ini. frontend(reactJS){" "}
        <a href="https://github.com/abdullatif150199/frontend-adminUniversitas" className="text-decoration-none">
          di sini
        </a>
        . dan laravel(backend){" "}
        <a href="https://github.com/abdullatif150199/backend-adminUniversitas" className="text-decoration-none">
          di sini
        </a>
      </p>

      <div style={{ backgroundColor: "#006400" }}>
        {" "}
        <p className="text-light text-center">Created By Abdul Latif</p>
      </div>
    </div>
  );
}
