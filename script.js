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

//loader/////////////////////////////////////////////
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

// Buttons
document.querySelector("#like-btn")?.addEventListener("click", async () => {
  showLoader();
  await sleep(1400);
  hideLoader();
});

document.querySelector("#skip-btn")?.addEventListener("click", async () => {
  showLoader();
  await sleep(1400);
  hideLoader();
});

document.querySelector("#undo-btn")?.addEventListener("click", async () => {
  showLoader();
  await sleep(1000);
  hideLoader();
});

// Footer links (show loader, then navigate)
document.querySelectorAll(".footer-item").forEach((link) => {
  link.addEventListener("click", async (e) => {
    e.preventDefault();

    showLoader();
    await sleep(1400);

    window.location.href = link.href;
  });
});
