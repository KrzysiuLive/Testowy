
function checkPassword() {
  const password = document.getElementById("password").value;
  if (password === "tajnehaslo") {
    document.getElementById("login").style.display = "none";
    document.getElementById("notepad").style.display = "block";
    const saved = localStorage.getItem("notes");
    if (saved) document.getElementById("notes").value = saved;
    document.getElementById("notes").addEventListener("input", () => {
      localStorage.setItem("notes", document.getElementById("notes").value);
    });
  } else {
    alert("Złe hasło!");
  }
}
