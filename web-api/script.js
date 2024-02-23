document.addEventListener("DOMContentLoaded", async () => {
  const element = document.querySelector(".square");
  const element2 = document.querySelector(".square-3");

  element2.animate(
    [
      {
        backgroundColor: "red",
      },
      {
        backgroundColor: "yellow",
      },
    ],
    {
      duration: 2000,
      direction: "alternate",
      iterations: Infinity,
    }
  );

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
      iterations: 2,
      easing: "linear",
      composite: "add",
      iterationComposite: "accumulate",
      timeline: document.timeline,
    }
  );

  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("play")) {
        squareAnimation.play();
        console.log("pending", squareAnimation.pending);
        squareAnimation.ready.then(() => {
          console.log("playState after play()", squareAnimation.playState);
          console.log("pending", squareAnimation.pending);
        });
      }
      if (button.classList.contains("pause")) {
        squareAnimation.pause();
        squareAnimation.ready.then(() => {
          console.log("playState after pause()", squareAnimation.playState);
        });
      }
      if (button.classList.contains("cancel")) {
        squareAnimation.cancel();
        squareAnimation.ready.then(() => {
          console.log("playState after cancel()", squareAnimation.playState);
        });
      }
      if (button.classList.contains("reverse")) {
        squareAnimation.reverse();
      }
      if (button.classList.contains("finish")) {
        squareAnimation.finish();
      }
      if (button.classList.contains("changeAnimation")) {
        squareAnimation.effect.setKeyframes([
          {
            transform: "translateY(0)",
          },
          {
            backgroundColor: "greenyellow",
            offset: 0.8,
          },
          {
            transform: "translateY(calc(100vh - 100px)) rotate(360deg)",
            backgroundColor: "purple",
          },
        ]);
      }
      if (button.classList.contains("logInfo")) {
        console.log("currentTime", squareAnimation.currentTime);
        console.log("startTime", squareAnimation.startTime);
        console.log("playbackRate", squareAnimation.playbackRate);
        console.log("playState", squareAnimation.playState);
        console.log("Keyframes", squareAnimation.effect.getKeyframes());
        console.log("Timing", squareAnimation.effect.getTiming());
        console.log(
          "Computed Timing",
          squareAnimation.effect.getComputedTiming()
        );
      }
    });
  });

  const playbackRateInput = document.getElementById("playbackRateInput");
  const playbackRateInputValue = document.getElementById(
    "playbackRateInputValue"
  );
  playbackRateInput.value = squareAnimation.playbackRate;
  playbackRateInputValue.value = squareAnimation.playbackRate;

  playbackRateInput.addEventListener("input", (e) => {
    squareAnimation.updatePlaybackRate(e.target.value);
    playbackRateInputValue.value = e.target.value;
  });

  const durationInput = document.getElementById("durationInput");
  const durationInputValue = document.getElementById("durationInputValue");
  durationInput.value = squareAnimation.effect.getComputedTiming().duration;
  durationInputValue.value =
    squareAnimation.effect.getComputedTiming().duration;
  durationInput.addEventListener("input", (e) => {
    squareAnimation.effect.updateTiming({
      duration: +e.target.value,
    });
    durationInputValue.value = e.target.value;
  });

  const infiniteInput = document.getElementById("infiniteInput");
  infiniteInput.checked =
    squareAnimation.effect.getComputedTiming().iterations === Infinity;
  infiniteInput.addEventListener("change", (e) => {
    squareAnimation.effect.updateTiming({
      iterations: e.target.checked ? Infinity : 2,
    });
  });

  const currentTimeInput = document.getElementById("currentTimeInput");
  currentTimeInput.value = squareAnimation.currentTime;
  currentTimeInput.addEventListener("input", (e) => {
    squareAnimation.currentTime = e.target.value;
  });

  const startTimeInput = document.getElementById("startTimeInput");
  startTimeInput.value = squareAnimation.startTime;
  startTimeInput.addEventListener("input", (e) => {
    squareAnimation.startTime = e.target.value;
  });

  // squareAnimation.pause();
  // console.log("playState after pause(): ", squareAnimation.playState);
  // console.log("pending after pause(): ", squareAnimation.pending);
  // squareAnimation.ready.then(() => {
  //   console.log("Animation Ready");
  //   console.log("playState after ready: ", squareAnimation.playState);
  //   console.log("pending after ready: ", squareAnimation.pending);
  // });
  // squareAnimation.play();
  // console.log("playState after play(): ", squareAnimation.playState);
  // console.log("pending after play(): ", squareAnimation.pending);

  // await squareAnimation.finished;
  // element.remove();
  // console.log("Finished");
  squareAnimation.addEventListener("finish", (e) => {
    console.log(e);
  });
  squareAnimation.addEventListener("cancel", (e) => {
    console.log(e);
  });

  // console.log(document.getAnimations());
  // console.log(element.getAnimations({ subtree: true }));
  // console.log(element2.getAnimations());

  const speedButtons = document.querySelectorAll(".speedButton");
  speedButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("decrease")) {
        document.getAnimations().forEach((animation) => {
          animation.updatePlaybackRate(animation.playbackRate * 0.9);
        });
      }
      if (button.classList.contains("increase")) {
        document.getAnimations().forEach((animation) => {
          animation.updatePlaybackRate(animation.playbackRate / 0.9);
        });
      }
    });
  });
});
