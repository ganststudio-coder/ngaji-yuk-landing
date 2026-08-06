# AGENTS.md — Proyek Ngaji Yuk Landing

## 🔒 Desain LOCKED: Halaman "Latihan Huruf Sambung"

Halaman ini **WAJIB** tampil sebagai halaman/menu **tersendiri** (jangan pernah dicampur ke dalam halaman "Huruf Sambung").

- Nama: **📝 Latihan Huruf Sambung**
- Menu dashboard: icon **📝**, warna `#E0F7FA`, border `#006064`
- Memakai desain komponen **`LetterConnectorCard`** (dari `components/learning-modules/LetterConnectorCard.tsx` / `ConnectorModule.tsx`):

### Struktur kartu (wajib sama persis)
1. Card putih, `border-radius:12px`, `box-shadow:0 4px 6px rgba(0,0,0,0.1)`, `border-top:4px solid #22c55e`
2. Judul tebal (`font-size:1.25rem; font-weight:700`)
3. Baris tengah (centered): kotak huruf abu-abu (`background:#f3f4f6`, padding 8px, rounded) → panah **→** → **kata sambung** ukuran besar warna hijau (`color:#15803d`, font Arabic `Noto Naskh Arabic`, `font-size:2.25rem`)
4. Deskripsi abu-abu kecil (`color:#4b5563`, `font-size:0.875rem`)

### 3 contoh (data tetap, jangan diubah)
| Judul | Kotak huruf | Hasil sambung | Deskripsi |
|---|---|---|---|
| Contoh 1: Qaf-Tho-Ba | ق ط ب | قَطْبٌ | Analisis: Qaf di awal, Tho di tengah, Ba di akhir. Terdapat hukum Qolqolah pada huruf Tho (sukun). |
| Contoh 2: Mad Dasar | م د ا ر س | مَدَارِسُ | Analisis: Huruf Dal, Alif, Ra tidak dapat disambung ke setelahnya. |
| Contoh 3: Sukun & Mad | ج د ي د | جَدِيْدٌ | Analisis: Penekanan pada Mad Ya dan tanwin di akhir. |

### Lokasi kode
- Halaman: `pageLatihanSambung` di `index.html`
- Render: fungsi `renderLatihanSambung()` di `js/app2.js`
- Komponen React referensi: `components/learning-modules/LetterConnectorCard.tsx`, `ConnectorModule.tsx`

> ⚠️ JANGAN menghapus halaman ini atau menaruh kontennya ke dalam `pageSambung`.
