document.addEventListener("DOMContentLoaded", async () => {
  const element = document.querySelector(".square");
  const animations = [];
  const addNewAnimation = () => {
    const squareAnimation = element.animate(
      [
        {
          transform: "translateX(0)",
          easing: "ease-in",
        },
        {
          backgroundColor: "blue",
          offset: 0.8,
          composite: "replace",
        },
        {
          transform: "translateX(calc(100vw - 100px)) rotate(360deg)",
          backgroundColor: "crimson",
        },
      ],
      {
        duration: 3000,
        // delay: 1000,
        direction: "alternate",
        fill: "both",
        iterations: 1,
        easing: "linear",
        composite: "replace",
        iterationComposite: "accumulate",
        timeline: document.timeline,
      }
    );
    squareAnimation.persist();
    squareAnimation.addEventListener("remove", (e) => {
      console.log("Animation removed by the browser", e);
    });
    animations.push(squareAnimation);
  };

  const addAnimationButton = document.getElementById("add-animation-button");
  addAnimationButton.addEventListener("click", () => {
    addNewAnimation();
  });

  const logAnimationButton = document.getElementById("log-animations-button");
  logAnimationButton.addEventListener("click", () => {
    console.log(animations);
    console.log(element.getAnimations());
  });
});
