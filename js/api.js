// ============================
// Komunikasi dengan Apps Script
// ============================
async function apiGet(){
  const res = await fetch(API_URL);
  return res.json();
}
async function apiSend(action, payload){
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" }, // penting: hindari CORS preflight di Apps Script
    body: JSON.stringify(Object.assign({ action }, payload))
  });
  return res.json();
}
async function loadFromServer(){
  if(API_URL.indexOf("GANTI_DENGAN_URL") !== -1){
    document.getElementById('sidePanel').innerHTML =
      '<div class="empty-hint">Dashboard belum tersambung ke Google Sheets. Isi API_URL di bagian atas kode dashboard (setelah Apps Script di-deploy) untuk mulai memuat & menyimpan data dari Sheets.</div>';
    return;
  }
  try{
    const res = await apiGet();
    if(!res.ok){ alert("Gagal memuat data: " + res.error); return; }
    sheetHeaders = res.headers || [];
    features = res.features.map(f => {
      const base = { id: f.id, geomType: f.geomType, props: f.props || {} };
      if(f.geomType === "point") base.point = geometryToInternal("point", f.geometry);
      else base.coords = geometryToInternal("polygon", f.geometry);
      return base;
    });
    renderAll();
  } catch(err){
    alert("Tidak bisa terhubung ke Apps Script. Cek kembali API_URL dan status deployment.\n" + err);
  }
}

async function persistAsset(a){
  if(API_URL.indexOf("GANTI_DENGAN_URL") !== -1) return; // belum tersambung, lewati
  try{
    await apiSend("update", { asset: { id:a.id, geomType:a.geomType, geometry: internalToGeometry(a), props: a.props } });
  } catch(err){
    alert("Gagal menyimpan ke Google Sheets: " + err);
  }
}
async function deleteAssetOnServer(id){
  if(API_URL.indexOf("GANTI_DENGAN_URL") !== -1) return;
  try{
    await apiSend("delete", { id });
  } catch(err){
    alert("Gagal menghapus di Google Sheets: " + err);
  }
}
