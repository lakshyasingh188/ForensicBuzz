function login() {
  const pin = document.getElementById("pin").value;
  const err = document.getElementById("err");

  if (pin === "7860") {
    localStorage.setItem("adminLoggedIn", "yes");
    location.href = "admin-dashboard.html";
  } else {
    err.innerText = "Invalid PIN";
  }
}
