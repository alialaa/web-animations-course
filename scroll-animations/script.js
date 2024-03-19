document.addEventListener("DOMContentLoaded", () => {
  const container1 = document.querySelector(".c-1");
  const container2 = document.querySelector(".c-2");
  const progress = document.querySelector(".c-1 .progress .progress-inner");

  const timeline = new ScrollTimeline({
    source: container2,
    axis: "block",
  });

  const viewTimeline = new ViewTimeline({
    subject: progress,
    axis: "block",
    // inset: ["auto", CSS.px("100")],
  });

  console.log(viewTimeline);

  progress.animate(
    [
      {
        width: 0,
      },
      {
        width: "100%",
      },
    ],
    {
      fill: "both",
      timeline: viewTimeline,
      rangeStart: {
        rangeName: "cover",
        offset: CSS.percent("30"),
      },
    }
  );

  container1.animate(
    [
      {
        backgroundColor: "salmon",
      },
    ],
    {
      fill: "both",
      // rangeStart: "30%",
      // rangeEnd: "70%",
      timeline: viewTimeline,
    }
  );
});
