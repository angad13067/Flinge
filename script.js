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

///////////////////////////////////////////////
