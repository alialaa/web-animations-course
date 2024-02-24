document.addEventListener("DOMContentLoaded", () => {
  const character = document.querySelector(".character");
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

  async function jump() {
    if (character.getAnimations().find((animation) => animation.id === "jump"))
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

  document.addEventListener("keyup", (event) => {
    switch (event.code) {
      case "ArrowUp":
        jump();
        break;
      case "ArrowRight":
        break;
      case "ArrowLeft":
        break;
      case "Space":
        break;

      default:
        break;
    }
  });
});
