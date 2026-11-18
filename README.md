# Tanogaido — Next.js App Router (SSG + ISR) + Payload CMS + MongoDB

Platform web resmi **PT. Tanogaido Fantasi Pratama** dibangun menggunakan **React + Next.js 15 App Router (SSG + ISR)**, **Payload CMS v3**, dan **MongoDB**.

## Fitur Utama Arsitektur

- **SSG + ISR (`revalidate = 60` + On-Demand Revalidation)**:
  - Halaman utama (`/`), katalog layanan (`/services`), seluruh 20+ halaman detail layanan (`/services/[slug]`), toko kurasi Jepang (`/shop` & `/shop/[slug]`), dan halaman profil perusahaan (`/about`) di-*pre-render* secara statis saat build (`generateStaticParams`) serta diperbarui otomatis lewat Incremental Static Regeneration (ISR) dan `afterChange` hooks di Payload CMS.
- **Payload CMS v3 (`/admin`)**:
  - Mendukung login dengan **Username** atau **Email**.
  - Collections: `Users`, `Services` (20+ layanan), `Products` (8 produk kurasi Jepang), `Trips`, `Testimonials`, `Subscribers`, `Orders`, `Media`.
  - Global: `SiteSettings` (NIB, AHU, alamat, WhatsApp, teks & video hero).
- **Fallback Otomatis Saat Tanpa MongoDB**:
  - Jika `MONGODB_URI` belum dikonfigurasi, build maupun preview tetap berjalan normal memakai data fallback lengkap di `src/data/fallback-data.ts`.

---

## Kredensial Admin Payload CMS Default (Setelah Seed)

Login melalui **`/admin`** (contoh: `http://localhost:3000/admin`):

| Field | Nilai Default |
|---|---|
| **Username** | `admin` |
| **Email** | `admin@tanogaido.com` |
| **Password** | `TanogaidoAdmin2026!` |
| **Role** | `admin` |

> Anda bisa mengubah kredensial awal sebelum seeding lewat variabel `.env`: `SEED_ADMIN_USERNAME`, `SEED_ADMIN_EMAIL`, `SEED_ADMIN_PASSWORD`, dan mengubah password setelah login dari menu `/admin`.

---

## Panduan Setup Database MongoDB

### 1. Salin & Isi `.env`

```bash
cp .env.example .env
```

Isi `MONGODB_URI` & `PAYLOAD_SECRET`:

- **Opsi A — MongoDB Atlas (Cloud / Production)**:
  1. Buat cluster gratis/dedicated di [MongoDB Atlas](https://www.mongodb.com/atlas).
  2. Buat Database User (username & password) dan izinkan Network Access (`0.0.0.0/0` untuk Vercel/serverless atau IP server Anda).
  3. Tempel connection string ke `.env`:
     ```env
     MONGODB_URI="mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/tanogaido?retryWrites=true&w=majority"
     PAYLOAD_SECRET="ganti-dengan-random-string-minimal-32-karakter"
     ```
- **Opsi B — MongoDB Lokal (Docker / Local Service)**:
  ```bash
  docker run -d --name tanogaido-mongo -p 27017:27017 mongo:7
  ```
  ```env
  MONGODB_URI="mongodb://127.0.0.1:27017/tanogaido"
  PAYLOAD_SECRET="ganti-dengan-random-string-minimal-32-karakter"
  ```

### 2. Install & Seed Data Awal + User Admin

```bash
npm install
npm run seed
```

Perintah `npm run seed` bersifat **idempoten** (aman dijalankan ulang) untuk mengisi akun admin (`username: admin`), 20 layanan, 8 produk shop, featured trips, testimoni, dan `SiteSettings` ke MongoDB.

### 3. Jalankan Aplikasi

```bash
# Development
npm run dev

# Production build & start
npm run build
npm run start
```
