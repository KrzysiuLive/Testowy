
function checkPassword() {
  const password = document.getElementById("password").value;
  if (password === "tajnehaslo") {
    document.getElementById("login").style.display = "none";
    document.getElementById("notepad").style.display = "block";

    // Wczytaj poprzednie dane
    document.getElementById("note-title").value = localStorage.getItem("noteTitle") || "";
    document.getElementById("note-body").value = localStorage.getItem("noteBody") || "";

    document.getElementById("note-title").addEventListener("input", () => {
      localStorage.setItem("noteTitle", document.getElementById("note-title").value);
    });

    document.getElementById("note-body").addEventListener("input", () => {
      localStorage.setItem("noteBody", document.getElementById("note-body").value);
    });
  } else {
    alert("Złe hasło!");
  }
}
