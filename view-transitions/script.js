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

    grid.style.viewTransitionName = "grid";
  }

  function displayGrid() {
    document.documentElement.scrollTop = 0;
    grid.style.viewTransitionName = "none";
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

    const transition = document.startViewTransition(() => {
      expandImage(item);
    });

    transition.skipTransition();

    try {
      await transition.ready;
      console.log(
        "transition.ready ✅ pseudo-element tree is created and the transition animation is about to start."
      );
    } catch (e) {
      console.log("transition.ready error ❌", e);
    }

    try {
      await transition.updateCallbackDone;
      console.log(
        "transition.updateCallbackDone ✅ DOM was updated successfully but that does not guarantee that the transition was successful."
      );
    } catch (e) {
      console.log("transition.updateCallbackDone error ❌", e);
    }

    try {
      await transition.finished;
      console.log(
        "transition.finished ✅ transition animation is finished, and the new page view is visible and interactive to the user."
      );
    } catch (e) {
      console.log("transition.finished error ❌", e);
    }
  });

  gridButton.addEventListener("click", async (e) => {
    if (!document.startViewTransition) {
      displayGrid();
      return;
    }
    document.startViewTransition(() => {
      displayGrid();
    });
  });
});
