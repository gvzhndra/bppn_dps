// ================= KONFIGURASI =================
// Ganti dengan URL Web App hasil deploy Apps Script kamu (lihat Code.gs)
const API_URL = "https://script.google.com/macros/s/AKfycbz_RG7cDsnaTIR-dT4YpiOpcHZFuB5BFGh10E4fS4CyOLSF9YT8uYEyQMipm54J64c0cQ/exec";
// =================================================

const statusColor = {
  "Aktif":"#4C8C3F","Proses lelang":"#B8790F","Terjual":"#6B7280","Bermasalah hukum":"#B23A3A"
};

const RESERVED_COLUMNS = [
  "id",
  "geom_type",
  "geometry_json"
];

let features = [];
let selectedId = null;
let leafletLayers = {};
let sheetHeaders = [];
const CORE_PROPS = ["nama","lokasi","status","luas","nilai","pic","catatan"];
