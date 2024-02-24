document.addEventListener("DOMContentLoaded", () => {
  const character = document.querySelector(".character");
  const street = document.querySelector(".street");
  const background = document.querySelector(".background");
  const foreground = document.querySelector(".foreground");

  const characterAnimation = character.animate(
    [
      {
        backgroundPosition: "0 0",
      },
      {
        backgroundPosition: "calc(var(--char-width) * -7) 0",
      },
    ],
    {
      duration: 1000,
      iterations: Infinity,
      easing: "steps(8, jump-none)",
    }
  );

  const streetAnimation = street.animate(
    [
      {
        transform: "translateX(0)",
      },
      {
        transform: "translateX(-50%)",
      },
    ],
    {
      easing: "linear",
      duration: 12000,
      iterations: Infinity,
    }
  );

  const backgroundAnimation = background.animate(
    [
      {
        transform: "translateX(100%)",
      },
      {
        transform: "translateX(-100%)",
      },
    ],
    {
      easing: "linear",
      duration: streetAnimation.effect.getComputedTiming().duration * 2,
      iterations: Infinity,
    }
  );

  const foregroundAnimation = foreground.animate(
    [
      {
        transform: "translateX(200%)",
      },
      {
        transform: "translateX(-200%)",
      },
    ],
    {
      easing: "linear",
      duration: streetAnimation.effect.getComputedTiming().duration * 1.5,
      iterations: Infinity,
    }
  );

  async function jump() {
    if (
      streetAnimation.playState !== "running" ||
      character.getAnimations().find((animation) => animation.id === "jump")
    )
      return;
    characterAnimation.pause();
    character.classList.add("jump");
    const jumpAnimation = character.animate(
      [
        {
          transform: "translateY(0)",
        },
        {
          transform: "translateY(-70px)",
        },
      ],
      {
        id: "jump",
        duration: 500,
        iterations: 2,
        direction: "alternate",
        easing: "ease-in-out",
      }
    );
    await jumpAnimation.finished;
    characterAnimation.play();
    character.classList.remove("jump");
  }

  function togglePlayState() {
    document.getAnimations().forEach((animation) => {
      if (animation.playState === "running") {
        animation.pause();
      } else {
        animation.play();
      }
    });
  }

  function runFaster() {
    if (streetAnimation.playbackRate >= 3) return;
    document.getAnimations().forEach((animation) => {
      animation.playbackRate *= 1.1;
    });
  }

  function runSlower() {
    if (streetAnimation.playbackRate <= 0.8) return;
    document.getAnimations().forEach((animation) => {
      animation.playbackRate *= 0.9;
    });
  }

  setInterval(() => {
    if (streetAnimation.playState === "running") {
      runSlower();
    }
  }, 5000);

  document.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "ArrowUp":
        jump();
        break;
      case "ArrowRight":
        runFaster();
        break;
      case "ArrowLeft":
        runSlower();
        break;
      case "Space":
        togglePlayState();
        break;

      default:
        break;
    }
  });
});
