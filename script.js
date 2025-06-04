const locoscroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

var timeout;

function customcursorWithSkew() {
  var xscale = 1;
  var yscale = 1;
  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", (dets) => {
    clearTimeout(timeout);

    const scrollY = locoscroll.scroll.instance.scroll.y;

    // Calculate the difference from the previous mouse position
    var dx = dets.clientX - xprev;
    var dy = dets.clientY - yprev;

    // Clamp values to avoid extreme scaling
    xscale = gsap.utils.clamp(0.8, 1.2, 1 + dx * 0.05);
    yscale = gsap.utils.clamp(0.8, 1.2, 1 + dy * 0.05);

    // Apply transform
    document.querySelector(".cursor").style.transform = `translate(${
      dets.clientX
    }px, ${dets.clientY + scrollY}px) scale(${yscale}, ${xscale})`;

    // Update previous positions
    xprev = dets.clientX;
    yprev = dets.clientY;

    timeout = setTimeout(() => {
      document.querySelector(".cursor").style.transform = `translate(${
        dets.clientX
      }px, ${dets.clientY + scrollY}px) scale(1, 1)`;
    }, 100);
  });
}

document.querySelectorAll(".elem").forEach((elem) => {
  var rotdif = 0;
  var rotate = 0;

  elem.addEventListener("mouseenter", (dets) => {
    var cursor = document.querySelector(".cursor");
    cursor.innerHTML = `VIEW`;
    
    gsap.to(cursor, {
      width: "50px",
      height: "50px",
      duration: 0.3,
      ease: Power3,
    });

    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      duration: 0.5,
      ease: Power3,
    });
    gsap.to(elem.querySelector(".elemhead"), {
      x: 80,
      color: "rgba(255, 255, 255, 0.2)",
    });
    gsap.to(elem.querySelector(".year"), {
      color: "rgba(255, 255, 255, 0.2)",
    });
  });

  elem.addEventListener("mousemove", (dets) => {
    rotdif = dets.clientX - rotate;
    rotate = dets.clientX;
    var img = elem.querySelector("img");

    const bounds = elem.getBoundingClientRect();
    const relX = dets.clientX - bounds.left;
    const relY = dets.clientY - bounds.top;

    gsap.to(img, {
      x: relX - img.offsetWidth / 2,
      y: relY - img.offsetHeight / 3,
      rotate: gsap.utils.clamp(-20, 20, rotdif),
      duration: 0.8,
      ease: Linear,
    });
  });

  elem.addEventListener("mouseleave", (dets) => {
    var cursor = document.querySelector(".cursor");
    cursor.innerHTML = ``;
    
    gsap.to(cursor, {
      width: "15px",
      height: "15px",
      duration: 0.3,
      ease: Power3,
    });

    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      duration: 0.5,
      ease: Power3,
    });

    gsap.to(elem.querySelector(".elemhead"), {
      x: 0,
      color: "rgba(255, 255, 255, 0.6)",
    });
    gsap.to(elem.querySelector(".year"), {
      color: "rgb(255, 255, 255)",
    });
  });
});

customcursorWithSkew();
