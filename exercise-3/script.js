document.addEventListener("DOMContentLoaded", () => {
  const logoSVG = document.getElementById("logo");
  const logoSVGPath = document.querySelector(".cls-1");
  logoSVGPath.addEventListener("animationend", () => {
    logoSVG.classList.remove("animate");
    setTimeout(() => {
      logoSVG.classList.add("animate");
    }, 5000);
  });

  const mediaQuery = matchMedia("(prefers-reduced-motion)");
  const checkReducedMotion = () => {
    const video = document.querySelectorAll(".bg-video");
    if (mediaQuery.matches) {
      video.forEach((v) => v.pause());
    } else {
      video.forEach((v) => v.play());
    }
  };
  checkReducedMotion();
  mediaQuery.addEventListener("change", checkReducedMotion);
});
