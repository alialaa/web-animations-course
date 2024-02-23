document.addEventListener("DOMContentLoaded", async () => {
  const element = document.querySelector(".square");

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
      delay: 1000,
      direction: "alternate",
      fill: "both",
      iterations: 1,
      easing: "linear",
      composite: "replace",
      iterationComposite: "accumulate",
      timeline: document.timeline,
    }
  );
});
