# 🛡️ Guardian — Keamanan Siber Berbasis AI

<div align="center">

![Guardian Banner](https://img.shields.io/badge/Guardian-v2.0-cyan?style=for-the-badge)
![AI Powered](https://img.shields.io/badge/AI-Gemini%20Flash-blue?style=for-the-badge&logo=google)
![License](https://img.shields.io/badge/License-ISC-green?style=for-the-badge)

**Platform deteksi penipuan digital berbasis AI yang membantu individu dan bisnis melindungi diri dari ancaman siber secara real-time.**

[Demo Live](#) · [Laporkan Bug](../../issues) · [Request Fitur](../../issues)

</div>

---

## 📋 Daftar Isi

- [Tentang Proyek](#-tentang-proyek)
- [Fitur AI](#-fitur-ai)
- [Teknologi](#-teknologi)
- [Struktur Folder](#-struktur-folder)
- [Cara Install & Run Lokal](#-cara-install--run-lokal)
- [Konfigurasi API Key](#-konfigurasi-api-key)
- [Kontribusi](#-kontribusi)

---

## 🔍 Tentang Proyek

Guardian adalah aplikasi web keamanan siber yang memanfaatkan kecerdasan buatan (Gemini AI) untuk mendeteksi berbagai bentuk penipuan digital yang marak terjadi di Indonesia, seperti:

- **Vishing** — penipuan melalui telepon
- **Phishing** — situs web palsu yang meniru brand terkenal
- **Smishing** — penipuan melalui SMS/WhatsApp
- **APK Scam** — file berbahaya berkedok undangan atau tagihan

---

## 🤖 Fitur AI

### 1. 🔢 Pemeriksa Nomor Telepon
Menganalisis nomor telepon menggunakan Gemini AI untuk mendeteksi apakah nomor tersebut pernah dilaporkan sebagai penipu, telemarketing agresif, atau vishing. Hasil analisis mencakup:
- Skor risiko (0–100)
- Jenis ancaman yang terdeteksi
- Informasi operator dan lokasi
- Jumlah laporan dari komunitas

### 2. 🔗 Pemeriksa URL / Situs Web
Menganalisis URL yang mencurigakan untuk mendeteksi phishing, malware, dan typosquatting (peniruan domain bank/e-commerce seperti BCA, Shopee, Tokopedia). Hasil analisis mencakup:
- Skor risiko dengan visualisasi lingkaran
- Status SSL dan usia domain
- Hasil pemindaian (domain spoofing, WHOIS, malware, blacklist IP)

### 3. 💬 Analisis Pesan
Menganalisis teks pesan SMS atau WhatsApp untuk mendeteksi pola penipuan yang umum di Indonesia. AI secara khusus mengenali:
- Pancingan file APK (undangan nikah digital, tagihan kurir palsu)
- Penipuan undian berhadiah
- Modus kerja freelance palsu (like & subscribe berbayar)
- Penagihan hutang palsu / ancaman pinjol ilegal

---

## 🛠️ Teknologi

| Teknologi | Kegunaan |
|-----------|----------|
| HTML5 + CSS3 | Struktur dan styling dasar |
| Tailwind CSS (CDN) | Utility-first CSS framework |
| Vanilla JavaScript | Logic aplikasi dan routing |
| Google Gemini Flash | Engine AI untuk deteksi penipuan |
| Google Fonts (Inter) | Tipografi |

---

## 📁 Struktur Folder

```
ScamGuardian-AI/
├── index.html          # Halaman utama (semua page dalam satu file)
├── script.js           # Logic utama, routing, dan integrasi Gemini AI
├── style.css           # Custom styles (glassmorphism, glow effects, dll)
├── config.js           # API key (TIDAK di-upload ke GitHub)
├── .gitignore          # Daftar file yang diabaikan Git
├── package.json        # Konfigurasi project dan Tailwind CLI
├── src/
│   └── input.css       # Source CSS untuk Tailwind compiler
└── dist/
    └── output.css      # Output CSS hasil kompilasi Tailwind
```

> ⚠️ **Penting:** File `config.js` berisi API key dan **tidak boleh** di-push ke repository publik. Pastikan sudah ada di `.gitignore`.

---

## 🚀 Cara Install & Run Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) versi 16 ke atas
- Browser modern (Chrome, Firefox, Edge)
- Extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) untuk VS Code

### Langkah-langkah

**1. Clone repository ini:**
```bash
git clone https://github.com/username/ScamGuardian-AI.git
cd ScamGuardian-AI
```

**2. Install dependencies:**
```bash
npm install
```

**3. Buat file `config.js`** di root folder:
```js
// config.js
const CONFIG = {
  GEMINI_API_KEY: "isi_api_key_kamu_di_sini"
};
```

**4. Jalankan Tailwind compiler** (terminal pertama):
```bash
npm run dev
```

**5. Jalankan Live Server** (terminal kedua atau via VS Code):
- Klik kanan `index.html` di VS Code
- Pilih **"Open with Live Server"**
- Browser akan otomatis membuka `http://127.0.0.1:5500`

---

## 🔑 Konfigurasi API Key

Guardian menggunakan **Google Gemini API** yang bisa didapatkan secara gratis di [Google AI Studio](https://aistudio.google.com).

**Langkah mendapatkan API key:**
1. Buka [aistudio.google.com](https://aistudio.google.com)
2. Login dengan akun Google
3. Klik **"Get API Key"** → **"Create API Key"**
4. Copy API key dan paste ke file `config.js`

> ⚠️ **Jangan pernah** membagikan API key kamu secara publik, termasuk di commit GitHub, chat, atau forum.

---

## 🤝 Kontribusi

Kontribusi sangat disambut! Berikut cara berkontribusi:

**1. Fork repository ini**

**2. Buat branch fitur baru:**
```bash
git checkout -b fitur/nama-fitur-baru
```

**3. Commit perubahan kamu:**
```bash
git commit -m "feat: menambahkan fitur deteksi xyz"
```

**4. Push ke branch:**
```bash
git push origin fitur/nama-fitur-baru
```

**5. Buka Pull Request** ke branch `main`

### Panduan Commit Message
Gunakan format [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` — fitur baru
- `fix:` — perbaikan bug
- `docs:` — perubahan dokumentasi
- `style:` — perubahan tampilan/CSS
- `refactor:` — refaktor kode

---

## 📄 Lisensi

Proyek ini menggunakan lisensi **ISC**. Lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

---

<div align="center">

Dibuat dengan ❤️ untuk melindungi masyarakat Indonesia dari penipuan digital.

**Guardian v2.0 · 2026**

</div>
