document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const header = document.querySelector(".header");
  const gridOuter = document.querySelector(".grid-outer");
  const main = document.querySelector(".main .item");
  const gridButton = document.querySelector(".grid-view-button");

  function expandImage(item) {
    const title = item.querySelector("h3").innerText;
    const largeImage = item.dataset.largeImage;
    main.querySelector("h2").innerText = title;
    main.querySelector("img").src = largeImage;
    gridButton.style.display = "block";
    header.classList.add("expanded");
    gridOuter.classList.add("expanded");

    grid
      .querySelectorAll(".active")
      .forEach((e) => e.classList.remove("active"));
    item.classList.add("active");
  }

  function displayGrid() {
    document.documentElement.scrollTop = 0;
    gridButton.style.display = "none";
    gridOuter.classList.remove("expanded");
    header.classList.remove("expanded");
    grid
      .querySelectorAll(".active")
      .forEach((e) => e.classList.remove("active"));
  }

  grid.addEventListener("click", async (e) => {
    const item = e.target.closest(".grid-item");
    if (!item || item.classList.contains("active")) return;

    if (!document.startViewTransition) {
      expandImage(item);
      return;
    }

    const { top, left, right, bottom } = item.getBoundingClientRect();

    const transition = document.startViewTransition(() => {
      expandImage(item);
    });

    await transition.ready;

    document.documentElement.animate(
      [
        {
          clipPath: `inset(${top}px ${innerWidth - right}px ${
            innerHeight - bottom
          }px ${left}px)`,
          filter: "contrast(0.3)",
        },
        {
          clipPath: "inset(0%)",
          filter: "contrast(1)",
        },
      ],
      {
        duration: 300,
        easing: "ease-in",
        pseudoElement: "::view-transition-new(root)",
      }
    );

    await transition.finished;

    item.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  });

  gridButton.addEventListener("click", async (e) => {
    if (!document.startViewTransition) {
      displayGrid();
      return;
    }

    document.documentElement.classList.add("back");
    const transition = document.startViewTransition(() => {
      displayGrid();
    });
    await transition.finished;
    document.documentElement.classList.remove("back");
  });
});
