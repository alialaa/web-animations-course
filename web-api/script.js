document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".square");
  const squareAnimation = element.animate(
    {
      transform: [
        "translateX(0)",
        "translateX(calc(100vw - 100px)) rotate(360deg)",
      ], // offset [0,1]
      backgroundColor: ["gold", "blue", "crimson"], // offset [0,0.5,1]
      offset: [0, 0.3, 1], // or [0, 0.3]
      easing: ["ease-in", "linear"],
      composite: ["add", "replace", "add"],
    },
    // [
    //   {
    //     transform: "translateX(0)",
    //     easing: "ease-in",
    //   },
    //   {
    //     backgroundColor: "blue",
    //     offset: 0.8,
    //     composite: "replace",
    //   },
    //   {
    //     transform: "translateX(calc(100vw - 100px)) rotate(360deg)",
    //     backgroundColor: "crimson",
    //   },
    // ],
    {
      duration: 3000,
      delay: 1000,
      direction: "alternate",
      fill: "both",
      iterations: Infinity,
      easing: "linear",
      composite: "add",
      timeline: document.timeline,
    }
  );
  // squareAnimation.pause();
});
