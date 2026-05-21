const API = "http://localhost:5000/api/plans";

async function loadAnalytics() {
  const res = await fetch(API);
  const data = await res.json();

  let total = data.length;
  let completed = data.filter(p => p.status === "Completed").length;
  let pending = total - completed;

  document.getElementById("total").innerText = total;
  document.getElementById("completed").innerText = completed;
  document.getElementById("pending").innerText = pending;

  let percent = total === 0 ? 0 : (completed/total)*100;
  document.getElementById("progress").style.width = percent + "%";
}

window.onload = loadAnalytics;