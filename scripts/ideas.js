const pomyslCards = document.getElementById("pomysl-cards");
const realizacjaCards = document.getElementById("realizacja-cards");
const zrealizowaneCards = document.getElementById("zrealizowane-cards");
const addPomyslBtn = document.getElementById("add-pomysl");

let ideas = JSON.parse(localStorage.getItem("ideasBoard")) || [];

function saveIdeas() {
  localStorage.setItem("ideasBoard", JSON.stringify(ideas));
}

function createCard(text, id, status) {
  const card = document.createElement("div");
  card.className = "card";
  card.draggable = true;
  card.dataset.id = id;
  card.textContent = text;

  card.addEventListener("dragstart", dragStart);
  card.addEventListener("dragend", dragEnd);

  return card;
}

function render() {
  pomyslCards.innerHTML = "";
  realizacjaCards.innerHTML = "";
  zrealizowaneCards.innerHTML = "";

  ideas.forEach(idea => {
    const card = createCard(idea.text, idea.id, idea.status);
    if(idea.status === "pomysl") pomyslCards.appendChild(card);
    else if(idea.status === "realizacja") realizacjaCards.appendChild(card);
    else if(idea.status === "zrealizowane") zrealizowaneCards.appendChild(card);
  });
}

addPomyslBtn.addEventListener("click", () => {
  const text = prompt("Wpisz nowy pomysł:");
  if(text) {
    ideas.push({id: Date.now(), text, status: "pomysl"});
    saveIdeas();
    render();
  }
});

let draggedCard = null;

function dragStart(e) {
  draggedCard = e.target;
  setTimeout(() => {
    e.target.style.display = "none";
  }, 0);
}

function dragEnd(e) {
  draggedCard = null;
  e.target.style.display = "block";
}

[pomyslCards, realizacjaCards, zrealizowaneCards].forEach(container => {
  container.addEventListener("dragover", e => {
    e.preventDefault();
  });
  container.addEventListener("drop", e => {
    e.preventDefault();
    if(draggedCard) {
      const id = parseInt(draggedCard.dataset.id);
      const idea = ideas.find(i => i.id === id);
      if(idea) {
        let newStatus = "";
        if(container.id === "pomysl-cards") newStatus = "pomysl";
        else if(container.id === "realizacja-cards") newStatus = "realizacja";
        else if(container.id === "zrealizowane-cards") newStatus = "zrealizowane";

        idea.status = newStatus;
        saveIdeas();
        render();
      }
    }
  });
});

render();
