# SEA Salon App

SEA Salon App adalah aplikasi mobile untuk salon yang memungkinkan pengguna untuk melihat layanan salon, memberikan ulasan, membuat reservasi, dan mengelola akun mereka melalui sistem otentikasi. Aplikasi ini dibangun menggunakan React Native dan Supabase untuk otentikasi dan database real-time.

## Fitur

- [x] Halaman utama yang menampilkan informasi salon dan layanan yang ditawarkan
- [ ] Sistem ulasan untuk pelanggan
- [ ] Sistem reservasi untuk pelanggan
- [x] Sistem otentikasi menggunakan Supabase
- [x] Integrasi dengan database real-time Supabase untuk menyimpan data ulasan dan reservasi

## Instalasi

Ikuti langkah-langkah di bawah ini untuk menginstal dan menjalankan aplikasi di lingkungan lokal Anda.

### Prasyarat

- Node.js
- npm atau yarn
- Expo CLI atau React Native CLI

### Langkah-langkah

1. **Clone repository ini:**

   ```bash
   git clone https://github.com/username/sea-salon-app.git
   cd sea-salon-app
   ```

2. **Instal dependensi:**

   ```bash
   npm install
   ```

   atau

   ```bash
   yarn install
   ```

3. **Konfigurasi Supabase:**

   Buat akun di [Supabase](https://supabase.io/), buat proyek baru, dan dapatkan URL dan Key API Anda. Buat file `.env` di root proyek dan tambahkan konfigurasi berikut:

   ```env
   SUPABASE_URL=your-supabase-url
   SUPABASE_KEY=your-supabase-key
   ```

4. **Jalankan aplikasi:**

   Untuk menjalankan aplikasi di emulator atau perangkat fisik:

   ```bash
   npm start
   ```

   atau

   ```bash
   yarn start
   ```

## Penggunaan

### Halaman Utama

Halaman utama menampilkan informasi tentang SEA Salon, layanan yang ditawarkan, dan detail kontak.

### Sistem Ulasan

Pengguna dapat memberikan ulasan dengan menambahkan nama mereka, rating (1-5), dan komentar. Ulasan ini akan ditampilkan di halaman utama.

### Sistem Reservasi

Pengguna dapat membuat reservasi dengan mengisi nama, nomor telepon, jenis layanan, dan tanggal. Data reservasi disimpan di Supabase.

### Otentikasi Pengguna

Pengguna dapat mendaftar dan masuk menggunakan email dan kata sandi mereka. Otentikasi dilakukan menggunakan Supabase.

## Struktur Proyek

```bash
.
├── src
│   ├── components
│   │   ├── Account.tsx
│   │   ├── Auth.tsx
│   │   └── Avatar.tsx
│   │   ├── CategoriesList.tsx
│   │   ├── CustomAlert.tsx
│   │   ├── Profile.tsx
│   │   ├── Specialist.tsx
│   ├── Navigation
│   │   ├── BottomStackNavigation.tsx
│   │   ├── MainStackNavigation.tsx
│   ├── screens
│   │   └── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── ReservationScreen.tsx
│   │   └── SavedScreen.tsx
│   │   ├── SplashScreen.tsx
│   ├── services
│   │   ├── supabase.ts
│   │   types
│   │   ├── env.d.ts
│   └── App.js
├── .env
├── package.json
└── README.md
```

### Lisensi

Proyek ini dilisensikan di bawah MIT License.

### Kontak

Jika Anda memiliki pertanyaan atau saran, silakan hubungi kami di mr.volumee@gmail.com
