document.addEventListener("DOMContentLoaded", () => {
  const sliderTrack = document.querySelector(".project-slider-track");
  const projectCards = document.querySelectorAll(".project-card");
  const leftArrow = document.querySelector(".slider-arrow.left-arrow");
  const rightArrow = document.querySelector(".slider-arrow.right-arrow");

  let currentIndex = 0;
  const totalCards = projectCards.length;

  function updateSlider() {
    const cardsVisibleCount = 1;

    const maxIndex = Math.max(0, totalCards - cardsVisibleCount);
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    projectCards.forEach((card) => {
      card.classList.remove("active");
      card.style.opacity = "";
      card.style.filter = "";
      card.style.zIndex = "";
      card.style.pointerEvents = "";
      card.style.transform = "";
    });

    if (currentIndex === 0) {
      leftArrow.classList.add("hidden");
    } else {
      leftArrow.classList.remove("hidden");
    }

    if (currentIndex >= maxIndex) {
      rightArrow.classList.add("hidden");
    } else {
      rightArrow.classList.remove("hidden");
    }

    const currentCard = projectCards[currentIndex];
    if (currentCard) {
      currentCard.classList.add("active");

      projectCards.forEach((card, index) => {
        if (index !== currentIndex) {
          card.style.opacity = "0";
          card.style.filter = "blur(5px)";
          card.style.pointerEvents = "none";
          card.style.transform = "scale(0.9)";
        } else {
          card.style.zIndex = "10";
          card.style.pointerEvents = "auto";
        }
      });

      const sliderContainer = sliderTrack.parentElement;
      const visibleContentWidth =
        sliderContainer.offsetWidth -
        (parseFloat(getComputedStyle(sliderContainer).paddingLeft) +
          parseFloat(getComputedStyle(sliderContainer).paddingRight));

      const cardWidth =
        currentCard.offsetWidth +
        parseFloat(getComputedStyle(currentCard).marginLeft) +
        parseFloat(getComputedStyle(currentCard).marginRight);
      const currentCardOffsetFromTrackStart = currentCard.offsetLeft;

      const offsetToCenter = (visibleContentWidth - cardWidth) / 2;
      const translateXValue = offsetToCenter - currentCardOffsetFromTrackStart;

      sliderTrack.style.transform = `translateX(${translateXValue}px)`;
    } else {
      sliderTrack.style.transform = `translateX(0px)`;
    }
  }

  leftArrow.addEventListener("click", () => {
    currentIndex--;
    updateSlider();
  });

  rightArrow.addEventListener("click", () => {
    currentIndex++;
    updateSlider();
  });

  window.onload = () => {
    setTimeout(() => {
      updateSlider();
    }, 50);

    window.addEventListener("resize", updateSlider);
  };

  // About Me 'Read More' functionality
  const moreContent = document.querySelector(".about-more-content");
  const toggleButton = document.querySelector(".btn-more-about");

  if (moreContent && toggleButton) {
    toggleButton.addEventListener("click", function () {
      if (moreContent.classList.contains("expanded")) {
        moreContent.classList.remove("expanded");
        toggleButton.textContent = "MORE ABOUT ME";
      } else {
        moreContent.classList.add("expanded");
        toggleButton.textContent = "LESS ABOUT ME";
      }
    });
  }
});
