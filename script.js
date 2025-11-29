const ideas = [
  "Starbucks",
  "Arcade",
  "Dinner Date",
  "Drive + Music",
  "Coffee Date",
  "Study Date",
];

const stack = document.querySelector(".card-stack");
let currentIndex = 0;

function showCard() {
  if (currentIndex >= ideas.length) {
    stack.innerHTML = "<p>No more ideas!</p>";
    return;
  }

  const card = document.createElement("div");
  card.className = "card";
  card.textContent = ideas(currentIndex);
  stack.innerHTML = "";
  stack.appendChild(card);
}

document.getElementById("skip").onclick = () => {
  currentIndex++;
  showCard();
};

document.getElementById("undo").onclick = () => {
  currentIndex--;
  showCard();
};
document.getElementById("like").onclick = () => {
  // save liked idea to localStorage
  let liked = JSON.parse(localStorage.getItem("liked")) || [];
  liked.push(ideas[currentIndex]);
  localStorage.setItem("liked", JSON.stringify(liked));
  currentIndex++;
  showCard();
};

showCard();
