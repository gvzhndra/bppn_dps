// ================= KONFIGURASI =================
// Ganti dengan URL Web App hasil deploy Apps Script kamu (lihat Code.gs)
const API_URL = "GANTI_DENGAN_URL_APPS_SCRIPT_ANDA";
// =================================================

const statusColor = {
  "Aktif":"#4C8C3F","Proses lelang":"#B8790F","Terjual":"#6B7280","Bermasalah hukum":"#B23A3A"
};

let features = [];
let selectedId = null;
let leafletLayers = {};
let sheetHeaders = [];
const CORE_PROPS = ["nama","lokasi","status","luas","nilai","pic","catatan"];
