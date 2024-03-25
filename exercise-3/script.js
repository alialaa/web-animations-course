document.addEventListener("DOMContentLoaded", () => {
  const logoSVG = document.getElementById("logo");
  const logoSVGPath = document.querySelector(".cls-1");
  logoSVGPath.addEventListener("animationend", () => {
    logoSVG.classList.remove("animate");
    setTimeout(() => {
      logoSVG.classList.add("animate");
    }, 5000);
  });
});
