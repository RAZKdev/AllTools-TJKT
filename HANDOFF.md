# AllTools TJKT — Handoff

## Status

Project sudah mencapai checkpoint release-ready lokal.

- Branch: `main`
- Working tree: clean
- Backend: tidak digunakan
- API: tidak digunakan
- Database: tidak digunakan
- Feedback: frontend prototype menggunakan `localStorage`

## Fitur Selesai

### Networking Tools

- IP Address Calculator
- Subnet Calculator
- MAC Address Tools
- Bandwidth & Transfer Time Calculator
- Data Unit & Base Converter

### Learning

- TJKT Quiz
- Network Reference
  - OSI Model
  - TCP/IP Model
  - Common Network Ports
  - Network Protocols

### UI / UX

- Dashboard
- Global tool search
- Tool navigation
- Responsive layout
- Feedback form
- Feedback Inbox prototype
- Feedback filtering

## Feedback System

Feedback saat ini hanya tersimpan di browser pengguna melalui `localStorage`.

Artinya:

- Feedback antar-user tidak tersinkron.
- User A tidak dapat melihat feedback User B.
- Belum ada backend.
- Belum ada API.
- Belum ada database.

Backend dan API sengaja ditunda untuk project yang lebih besar.

## QA Checkpoint

- JavaScript syntax check: PASS
- `git diff --check`: PASS
- Working tree: CLEAN
- QA backup artifacts: CLEAN
- Tracked artifact check: PASS

## Repository

Branch aktif:

`main`

Remote GitHub:

Belum dikonfigurasi.

Project sengaja belum dipush ke GitHub dari perangkat ini.

## Development Environment

Development dan testing dilakukan menggunakan Termux.

### Menjalankan Local Server

Jalankan command berikut di Termux:

```bash
python3 -m http.server 8000
```

Kemudian buka browser dan akses:

```text
http://localhost:8000
```
