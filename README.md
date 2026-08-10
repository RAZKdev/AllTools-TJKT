# AllTools TJKT

AllTools TJKT adalah website kumpulan tools praktis untuk membantu siswa TJKT (Teknik Jaringan Komputer dan Telekomunikasi) dalam belajar, latihan, dan troubleshooting dasar jaringan komputer.

## Features

### Networking Tools

- **IP Address Calculator**
  - Network Address
  - Broadcast Address
  - Subnet Mask
  - Wildcard Mask
  - Host Range
  - Total Address
  - Usable Hosts
  - IP Class
  - Binary Representation

- **Subnet Calculator**
  - Network Address
  - Broadcast Address
  - Host Range
  - Number of Hosts
  - Subnet Mask
  - Wildcard Mask
  - CIDR dan Subnet Mask

- **MAC Address Tools**
  - Validasi MAC Address
  - Normalisasi format MAC
  - OUI / Prefix 24-bit
  - Binary Representation
  - Unicast / Multicast / Broadcast
  - Locally / Universally Administered

### Calculator & Converter

- **Bandwidth & Transfer Time Calculator**
  - Estimasi waktu transfer file
  - KB, MB, GB, TB
  - Mbps, Gbps, KB/s, MB/s

- **Data Unit & Base Converter**

### Learning

- **TJKT Quiz**
- **Network Reference**
  - OSI Model
  - TCP/IP Model
  - Common Network Ports
  - Network Protocols

### Feedback System

- Feedback Form
- Bug / Saran / Feedback
- Character Counter
- Feedback Validation
- Feedback Inbox
- Feedback Filtering
- Local Storage Prototype

> Feedback System saat ini merupakan prototype frontend dan menggunakan `localStorage`. Belum menggunakan backend, API, atau database.

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Termux untuk development dan testing lokal

## Menjalankan Project

Project ini menggunakan static HTML, CSS, dan JavaScript sehingga tidak membutuhkan backend.

Jalankan server lokal:

```bash
python3 -m http.server 8000
```

Kemudian buka di browser:

```text
http://localhost:8000
```
