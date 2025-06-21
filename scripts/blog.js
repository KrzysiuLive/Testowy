
let posts = [];

fetch("blog-posts.json")
  .then(response => response.json())
  .then(jsonPosts => {
    const localPosts = JSON.parse(localStorage.getItem("krzysiu_posts")) || [];
    posts = [...localPosts, ...jsonPosts];
    renderPosts(posts);
  });

function renderPosts(posts) {
  const container = document.getElementById("blog-container");
  posts.forEach(post => {
    const div = document.createElement("div");
    div.className = "blog-post";
    div.innerHTML = `
      <h2>${post.title}</h2>
      <p><em>${post.date}</em></p>
      <p>${post.content}</p>
    `;
    container.appendChild(div);
  });
}
