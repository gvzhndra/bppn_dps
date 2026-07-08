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
