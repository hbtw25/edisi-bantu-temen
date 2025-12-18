# Development

## Frontend

### Struktur penting

- `frontend/index.html`: halaman utama
- `frontend/detail.html`: halaman detail perangkat
- `frontend/ar-viewer.html`: AR viewer (pakai `<model-viewer>`)
- `frontend/js/device-data.js`: sumber data lokal untuk detail & AR
- `frontend/models/`: file `.glb`
- `frontend/images/`: gambar perangkat

### Run lokal (tanpa backend)

```bash
cd frontend
python3 -m http.server 8000
```

Lalu buka `http://localhost:8000`.

## Backend

### Stack

- Go (`backend/go.mod`)
- Gin (HTTP router)
- GORM + SQLite (`backend/computear.db`)

### Run lokal

```bash
cd backend
go run .
```

Server jalan di `http://localhost:8080` dan juga melayani static file dari `frontend/`.

## Update/Tambah Perangkat

Saat ini halaman `detail.html` dan `ar-viewer.html` membaca dari `frontend/js/device-data.js` (bukan dari API).

Kalau kamu menambah perangkat baru:

1. Tambah entry baru di `frontend/js/device-data.js` (ikut pola object yang sudah ada)
2. Tambah gambar ke `frontend/images/`
3. Tambah model `.glb` ke `frontend/models/` (kalau ada)
4. Pastikan `image_url` mengarah ke `/images/<file>.png` dan `modelPath` ke `/models/<file>.glb`
