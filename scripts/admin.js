
document.getElementById("postForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const date = new Date().toISOString().split("T")[0];

  const newPost = { title, date, content };
  let posts = JSON.parse(localStorage.getItem("krzysiu_posts")) || [];
  posts.unshift(newPost);
  localStorage.setItem("krzysiu_posts", JSON.stringify(posts));
  document.getElementById("status").innerText = "Wpis dodany lokalnie ✅";
  this.reset();
});
