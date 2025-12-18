# Deployment

## Netlify (Frontend)

### Prasyarat

- Repo sudah ada di GitHub/GitLab/Bitbucket
- Folder `frontend/` berisi site statik (tanpa build step)

### Cara deploy (paling mudah)

1. Buka Netlify → **Add new site** → **Import from Git**.
2. Pilih repository `computear-heritage`.
3. Karena repo sudah punya `netlify.toml`, Netlify akan otomatis pakai:
   - **Publish directory**: `frontend`
   - **Build command**: `echo "No build step"`
4. Klik **Deploy site**.

### Catatan PWA

- `netlify.toml` sudah menambahkan header `Cache-Control: no-cache` untuk `service-worker.js` dan `manifest.json` supaya update PWA tidak “nyangkut” cache.

## Backend API

Netlify tidak menjalankan server Go (long-running) seperti `backend/main.go`. Kalau kamu butuh API `/api/*`, opsi umumnya:

- Hosting backend terpisah (Render/Fly.io/Railway/VPS), lalu proxy lewat Netlify redirects.

### Opsi 1 — Render (disarankan)

1. Push repo ke GitHub.
2. Buka Render → **New** → **Web Service** → pilih repo.
3. Atur:
   - **Root Directory**: `backend`
   - **Build Command**: `go build -o server .`
   - **Start Command**: `./server`
4. (Opsional) Tambah env var:
   - `GIN_MODE=release`
5. Deploy.

Catatan:
- Render akan menyediakan env `PORT`. Backend kamu sudah membaca `PORT` (fallback `8080`).
- Database memakai SQLite file `backend/computear.db` (cocok untuk demo/read-only; kalau kamu butuh data yang bisa berubah dan persist, pertimbangkan DB terpisah).

### Proxy `/api/*` lewat Netlify (opsional)

Di `netlify.toml` sudah ada template redirects. Aktifkan dengan:

1. Buka `netlify.toml`
2. Hapus tanda komentar pada blok `[[redirects]]`
3. Ganti `https://YOUR-BACKEND-DOMAIN.com` dengan URL backend kamu (misal URL dari Render)

Contoh:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://computear-api.example.com/api/:splat"
  status = 200
  force = true
```

Dengan cara ini, frontend tetap cukup memanggil `/api/...` dan Netlify akan meneruskan request ke backend.

### Cara cek sudah terhubung

- Buka: `https://<domain-netlify-kamu>/api/health` → harus balikin `{"status":"ok"}`
- Buka halaman utama → list “Koleksi Komputer” harus ter-load dari API (bisa cek tab Network di DevTools)
