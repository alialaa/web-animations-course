document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".square");
  const squareAnimation = element.animate(
    [
      {
        transform: "translateX(0)",
      },
      {
        backgroundColor: "blue",
        offset: 0.8,
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
      iterations: Infinity,
      easing: "linear",
      composite: "add",
      timeline: document.timeline,
    }
  );
  squareAnimation.pause();
  // const squareAnimationKeyframes = new KeyframeEffect(
  //   element,
  //   [
  //     {
  //       transform: "translateX(0)",
  //     },
  //     {
  //       backgroundColor: "blue",
  //       offset: 0.8,
  //     },
  //     {
  //       transform: "translateX(calc(100vw - 100px)) rotate(360deg)",
  //       backgroundColor: "crimson",
  //     },
  //   ],
  //   {
  //     duration: 3000,
  //     delay: 1000,
  //     direction: "alternate",
  //     fill: "both",
  //     iterations: Infinity,
  //     easing: "linear",
  //     composite: "add",
  //   }
  // );
  // const squareAnimation = new Animation(
  //   squareAnimationKeyframes,
  //   document.timeline
  // );
  // squareAnimation.play();
});
