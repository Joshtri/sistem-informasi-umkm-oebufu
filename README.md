# Sistem Informasi UMKM Kelurahan Oetete-v1.3 
## 📕Table of Contents

- [Introduction](#introduction)
    - [Built With](#%EF%B8%8F--built-with)
    - [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
- [Roadmap](#roadmap)
- [Under Construction](#under-construction)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

**Sistem Informasi UMKM Kelurahan Oetete-v1.3** adalah proyek berbasis Node.js yang memanfaatkan berbagai paket untuk pengembangan web, termasuk Express untuk penanganan sisi server, Mongoose untuk interaksi dengan MongoDB, dan Sequelize untuk interaksi dengan database SQL. Sistem ini bertujuan untuk membantu usaha mikro, kecil, dan menengah (UMKM) di Kelurahan Oetete dalam mengelola informasi dan operasi mereka secara efektif.


## ⚙️  Built With

- **pnpm**: pnpm adalah pengelola paket yang khusus dirancang untuk project Node.js. Fungsinya mirip dengan npm (Node Package Manager).
- **Express**: web Framework yang digunakan dalam pengembangan project Node.Js.
- **Mongoose**: digunakan sebagai penyimpanan data.
- **EJS**: Embedded JavaScript Templating atau "Effective JavaScript Templating" tergantung interpretasi merupakan sebuah bahasa templating yang simpel untuk Node.js
- **Session Management**: Menggunakan `express-session` and `connect-mongo`
- **Method Override**: Memungkinkan penggunaan metode PUT atau DELETE di tempat yang tidak didukung oleh klien.
- **dotenv**: Mengelola env variable yang digunakan dalam projetc web dengan `dotenv`

###  Prerequisites
Pastikan Anda sudah menginstall software berikut:
- ![Node.js](https://img.shields.io/badge/Node.js-20.13.1-green)  (versi 20.13.1 atau lebih baru)
- ![MongoDB](https://img.shields.io/badge/MongoDB-9.3.0-green) (mongodb.com)
- ![pnpm](https://img.shields.io/badge/pnpm-9.3.0-orange) (versi 9.3.0 atau lebih baru)
##  Setup & Installation:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/admin-fontein-v1.3.git
   cd admin-fontein-v1.3
   
1. **Install Packages:**
   ```bash
   $ pnpm install
   
1. **Setup env files:**
Siapkan file `.env.development` jika dalam lingkup pengembangan dan file `.env.production` dalam lingkup produksi.

4. **Run Program**
jalankan perintah `pnpm run start` atau `pnpm run dev` jika dalam development
   ```bash
   $ pnpm run dev
   

## Roadmap:
Properly implement reusable configs
- [ ] integrasi eslint untuk code linting.
## 🚧 Under Construction
Terdapat beberapa kemungkinan penambahan fitur dan perbaikan di masa mendatang. Berikut adalah beberapa fitur dan perbaikan yang mungkin akan ditambahkan:
- [ ] export data into CSV
## Contributing:
Kontribusi Anda adalah yang membuat komunitas open-source menjadi tempat yang luar biasa untuk belajar, berinspirasi, dan berkarya. Kontribusi apa pun yang Anda berikan akan sangat kami hargai.

1. **Fork Repository (Pisahkan Repositori)**
2. **Buat Branch Fitur Anda**
   ```bash
   git checkout -b fitur/FiturKeren
3. **Commit Perubahan Anda**
   ```bash
   git commit -m 'Tambah FiturKeren'
3. **Push ke Branch**
   ```bash
   git push origin fitur/FiturKeren
3. **Buka Pull Request (permintaan penggabungan)**


## License:
Distributed under the MIT License. See `LICENSE.txt` for more information.
- ![License](https://img.shields.io/badge/License-MIT-yellow)

## Contact:
- 📧 E-Mail - stuffofyos1516@gmail.com
- Project Link: https://github.com/Joshtri/fontein-si-umkm-1.3
