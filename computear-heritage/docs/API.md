# API Backend

Base URL: `/api`

## Health Check

- `GET /api/health`

Response:

```json
{ "status": "ok" }
```

## Devices

- `GET /api/devices` → list semua perangkat
- `GET /api/devices/:id` → ambil 1 perangkat (pencarian berbasis substring nama)
- `GET /api/devices/era/:era` → filter perangkat berdasarkan `era` (harus match persis, contoh: `1940s`, `1970s`, `2000s`)

Format response (umum):

```json
{
  "status": "success",
  "data": []
}
```
