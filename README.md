# SEA Salon App

SEA Salon App adalah aplikasi mobile untuk salon yang memungkinkan pengguna untuk melihat layanan salon, memberikan ulasan, membuat reservasi, dan mengelola akun mereka melalui sistem otentikasi. Aplikasi ini dibangun menggunakan React Native dan Supabase untuk otentikasi dan database real-time.

## Fitur

- [x] Halaman utama yang menampilkan informasi salon dan layanan yang ditawarkan
- [x] Sistem ulasan/rating untuk pelanggan
- [x] Sistem reservasi untuk pelanggan
- [x] Sistem otentikasi menggunakan Supabase
- [x] Integrasi dengan database real-time Supabase untuk menyimpan data ulasan dan reservasi

## Demo

https://github.com/volumeee/SEA-Salon-App/assets/57589007/6cdda083-c3d1-4432-9231-bdfb71b686a9



## Instalasi

Ikuti langkah-langkah di bawah ini untuk menginstal dan menjalankan aplikasi di lingkungan lokal Anda.

### Prasyarat

- Node.js
- npm atau yarn
- Expo CLI atau React Native CLI

### Langkah-langkah

1. **Clone repository ini:**

   ```bash
   https://github.com/volumeee/SEA-Salon-App.git
   cd SEA-Salon-app
   ```

2. **Instal dependensi:**

   ```bash
   npm install
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
   npx expo start
   ```


## Penggunaan

### Halaman Utama

Halaman utama menampilkan informasi tentang SEA Salon, layanan yang ditawarkan, dan detail kontak.

### Sistem Ulasan

Pengguna dapat memberikan ulasan/rating dengan menambahkan nama mereka, rating (1-5), dan komentar. Ulasan ini akan ditampilkan di halaman utama.

### Sistem Reservasi

Pengguna dapat membuat reservasi dengan mengisi nama, nomor telepon, jenis layanan, dan tanggal. Data reservasi disimpan di Supabase.

### Otentikasi Pengguna

Pengguna dapat mendaftar dan masuk menggunakan email dan kata sandi mereka. Otentikasi dilakukan menggunakan Supabase.

## Struktur Proyek

```bash
.
├── src
│   ├── components
│   │   ├── home
│   │   │   ├── CategoriesList.tsx
│   │   │   ├── HairSpecialistList.tsx
│   │   ├── other
│   │   │   ├── CustomAlert.tsx
│   │   ├── profile
│   │   │   ├── Account.tsx
│   │   │   ├── Auth.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── SessionContext.tsx
│   │   ├── reservation
│   │   │   ├── HistoryDetail.tsx
│   │   │   ├── Transaction.tsx
│   │   │   ├── TransactionPayment.tsx
│   ├── Navigation
│   │   ├── BottomStackNavigation.tsx
│   │   ├── MainStackNavigation.tsx
│   ├── screens
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── ReservationScreen.tsx
│   │   ├── SplashScreen.tsx
│   ├── services
│   │   ├── supabase.ts
│   │   types
│   │   ├── env.d.ts
│   │   ├── NavigationTypes.ts
│   └── App.js
├── .env
└── etc..
```


### Kontak

Jika Anda memiliki pertanyaan atau saran, silakan hubungi saya di mr.volumee@gmail.com
