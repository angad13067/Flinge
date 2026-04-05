//date ideas harcoded for now
const cards = [
  {
    id: 1,
    title: "Arcade",
    image: "assets/arcade.webp",
    location: "3350 Blvd. Saint-Martin O, Laval, QC H7T 1A1",
    date: "Sun, Nov 30",
    duration: "1 hour",
  },

  {
    id: 2,
    title: "Sora 45",
    image: "assets/sora45.png",
    location: "1 Pl. Ville-Marie, Montréal, QC H3B 4E8",
    date: "Sun, Nov 30",
    duration: "3 hours",
  },

  {
    id: 3,
    title: "Neotokyo",
    image: "assets/neotokyo.png",
    location: "425 Av. Viger O RC-001, Montreal, Quebec H2Z 1W5",
    date: "Sun, Nov 30",
    duration: "1-2 hours",
  },

  {
    id: 4,
    title: "Kinton Ramen",
    image: "assets/kintonramen.png",
    location: "303A Brunswick Blvd, Pointe-Claire, Quebec H9R 4Y2",
    date: "Sun, Nov 30",
    duration: "1 hour",
  },
];
//GENERATE RANDOM INDEX WITHIN AN ARRAY
const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length);
};

//CARD RENDERING
//START AT RANDOM CARD AND GO FROM THERE
let currentIndex = getRandomIndex(cards); //tracks currently shown card
const renderedCards = []; //array of already rendered cards to undo

function renderCard() {
  if (currentIndex < 0 || currentIndex >= cards.length) {
    currentIndex = 0;
  }

  const currentCard = cards[currentIndex];

  //update title in html
  document.querySelector("#feed-title").textContent = currentCard.title;

  //update image
  document.querySelector(".card-photo").src = currentCard.image;
  document.querySelector(".card-photo").alt = cards.title;

  //update details (assumes that each detail row item is in order in html)
  const detailRows = document.querySelectorAll(".detail-row-item");
  detailRows[0].textContent = currentCard.location;
  detailRows[1].textContent = currentCard.date;
  detailRows[2].textContent = currentCard.duration;
}

//Initialize the card stack with the first card on page load
renderCard();

//footer scroll///////////////////////////////////////////////

const footer = document.querySelector(".site-footer");

let lastScrollY = window.scrollY;
const threshold = 8; //movement needed before reaction
const minHideY = 40; //hide after scroll

function onScroll() {
  const currentY = window.scrollY;

  //Always show at the top
  if (currentY <= 0) {
    footer.classList.remove("site-footer-hidden");
    lastScrollY = currentY;
    return;
  }

  //scrolling down and past minhidey -> hide footer
  if (currentY > lastScrollY + threshold && currentY > minHideY) {
    footer.classList.add("site-footer-hidden");
  }
  //scrolling up -> show footer
  else if (currentY < lastScrollY - threshold) {
    footer.classList.remove("site-footer-hidden");
  }
  lastScrollY = currentY;
}

window.addEventListener("scroll", onScroll, { passive: true });

//LOADER/////////////////////////////////////////////
const loader = document.querySelector(".loader");

function showLoader() {
  loader?.classList.remove("loader-hidden");
}

function hideLoader() {
  loader?.classList.add("loader-hidden");
}

// Hide loader on normal load AND when coming back (Back/Forward cache)
window.addEventListener("load", hideLoader);
window.addEventListener("pageshow", hideLoader);

// helper for delays
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// LIKE, CANCEL AND UNDO BUTTONS

//LIKE BUTTON
document.querySelector("#like-btn")?.addEventListener("click", async () => {
  showLoader();
  renderedCards.push(currentIndex); //push the liked card into the rendered card
  currentIndex++; //move on to next card
  //what happens if you liked the last card in the stack
  if (currentIndex >= cards.length) {
    currentIndex = 0;
  }
  await sleep(1400);
  renderCard();
  hideLoader();
});

//SKIP BUTTON
document.querySelector("#skip-btn")?.addEventListener("click", async () => {
  showLoader();
  renderedCards.push(currentIndex); //push the skipped card into the rendered card
  currentIndex++; //move on to next card
  //what happens if you skipped the last card in the stack
  if (currentIndex >= cards.length) {
    currentIndex = 0;
  }
  await sleep(1400);
  renderCard();
  hideLoader();
});

//UNDO BUTTON
document.querySelector("#undo-btn")?.addEventListener("click", async () => {
  showLoader();
  if (renderedCards.length > 0) {
    currentIndex = renderedCards.pop();
  }
  await sleep(1000);
  renderCard();
  hideLoader();
});

// Footer links (show loader, then navigate)
document.querySelectorAll(".footer-item").forEach((link) => {
  link.addEventListener("click", async (e) => {
    const currentUrl = new URL(window.location.href);
    const targetUrl = new URL(link.href, window.location.href);

    const isSamePage =
      currentUrl.origin === targetUrl.origin &&
      currentUrl.pathname === targetUrl.pathname &&
      currentUrl.search === targetUrl.search;

    if (isSamePage) {
      return;
    }

    e.preventDefault();

    showLoader();
    await sleep(1200);

    window.location.href = link.href;
  });
});
