# ComputeAR Heritage

Museum virtual sejarah komputer dengan pengalaman Augmented Reality (AR) dan dukungan PWA.

## Struktur Project

- `frontend/`: Static site (HTML/CSS/JS) + PWA + file model `.glb`
- `backend/`: API + static server (Go + Gin + GORM + SQLite)
- `database/`: (placeholder)

## Menjalankan Lokal

### Opsi A — Frontend saja (tanpa backend)

Jalankan static server di folder `frontend/`:

```bash
cd frontend
python3 -m http.server 8000
```

Buka `http://localhost:8000`.

Catatan: halaman `index.html` akan mencoba memanggil `/api/devices`, tapi akan otomatis fallback ke data lokal `frontend/js/device-data.js` kalau API tidak tersedia.

### Opsi B — Backend + Frontend (via Go server)

```bash
cd backend
go run .
```

Buka `http://localhost:8080`.

## Deploy ke Netlify (Frontend)

Project ini bisa di-host di Netlify sebagai static site.

- Publish directory: `frontend` (sudah diset di `netlify.toml`)
- Build command: tidak ada (sudah diset ke `echo "No build step"`)

Langkah detail ada di `docs/DEPLOYMENT.md`.

## Dokumentasi

- Deployment: `docs/DEPLOYMENT.md`
- Development (lokal + update data): `docs/DEVELOPMENT.md`
- API backend: `docs/API.md`
