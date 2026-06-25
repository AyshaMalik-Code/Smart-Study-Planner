const API = "https://smart-study-planner-zh3l.onrender.com/api/plans";
let plansData = [];

// LOAD
async function loadPlans() {
  const res = await fetch(API);
  const data = await res.json();

  plansData = data;

  displayPlans(data);
  updateDashboard();
}
loadPlans();

// DISPLAY
function displayPlans(plans) {
  const div = document.getElementById("plans");
  if (!div) return;

  div.innerHTML = "";

  plans.forEach(p => {
    div.innerHTML += `
    <div class="card">
      <h3>${p.title}</h3>
      <p>${p.subject}</p>
      <p>${p.priority}</p>
      <p>${p.status}</p>
      <button onclick="toggle('${p._id}')">✔</button>
      <button onclick="deletePlan('${p._id}')">❌</button>
    </div>`;
  });
}

// ADD
async function addPlan() {
  const data = {
    title: document.getElementById("title").value,
    subject: document.getElementById("subject").value,
    priority: document.getElementById("priority").value,
    reminderTime: document.getElementById("time").value
  };

  await fetch(API, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });

  loadPlans();
}

// DELETE
async function deletePlan(id) {
  await fetch(API + "/" + id, { method: "DELETE" });
  loadPlans();
}

// TOGGLE
async function toggle(id) {
  await fetch(API + "/" + id, { method: "PUT" });
  loadPlans();
}

// SEARCH
function searchPlan() {
  const val = document.getElementById("search").value.toLowerCase();
  const filtered = plansData.filter(p =>
    p.title.toLowerCase().includes(val)
  );
  displayPlans(filtered);
}

//////////////////////////////////////////////////
// 📊 DASHBOARD
//////////////////////////////////////////////////

function updateDashboard() {

  let total = plansData.length;
  let completed = plansData.filter(p => p.status === "Completed").length;
  let pending = total - completed;

  document.getElementById("totalTasks").innerText = total;
  document.getElementById("completedTasks").innerText = completed;
  document.getElementById("pendingTasks").innerText = pending;

  let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("progressBox").innerHTML = `
    <h3>${percent}% Completed</h3>
    <p>${completed}/${total} Tasks Done</p>
    <div style="background:#ddd; border-radius:10px;">
      <div style="width:${percent}%; background:#00ffcc; padding:8px; border-radius:10px;"></div>
    </div>
  `;
}

//////////////////////////////////////////////////
// 🤖 AI PLAN
//////////////////////////////////////////////////

function generateAI() {

  let div = document.getElementById("aiOutput");
  div.innerHTML = "";

  if (plansData.length === 0) {
    div.innerHTML = "<p>No tasks available</p>";
    return;
  }

  let schedule = [];
  let hour = 7;

  schedule.push(`07:00 - Wake up`);
  schedule.push(`08:00 - Breakfast`);

  hour = 9;

  let sorted = [...plansData].sort((a, b) => {
    const order = { High: 1, Medium: 2, Low: 3 };
    return order[a.priority] - order[b.priority];
  });

  sorted.forEach((p, i) => {
    schedule.push(`${hour}:00 - ${hour+1}:00 → ${p.subject}`);
    hour++;

    if ((i + 1) % 2 === 0) {
      schedule.push(`${hour}:00 - ${hour+1}:00 → Break`);
      hour++;
    }
  });

  schedule.push(`20:00 - Dinner`);
  schedule.push(`23:00 - Sleep`);

  schedule.forEach(s => {
    div.innerHTML += `<div class="card">${s}</div>`;
  });
}

//////////////////////////////////////////////////
// 📌 NAVIGATION
//////////////////////////////////////////////////

function showSection(section) {

  document.getElementById("dashboardSection").style.display = "none";
  document.getElementById("tasksSection").style.display = "none";
  document.getElementById("aiSection").style.display = "none";

  if (section === "dashboard") {
    document.getElementById("dashboardSection").style.display = "block";
  }

  if (section === "tasks") {
    document.getElementById("tasksSection").style.display = "block";
  }

  if (section === "ai") {
    document.getElementById("aiSection").style.display = "block";
  }
}