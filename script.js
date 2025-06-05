var timeout;
function customcursorWithSkew() {
  var xscale = 1;
  var yscale = 1;
  var xprev = 0;
  var yprev = 0;

  function makenegative(x) {
    return x > 0 ? -x : x;
  }

  window.addEventListener("mousemove", (dets) => {
    clearTimeout(timeout);

    const scrollY = locoscroll.scroll.instance.scroll.y;

    // Calculate the difference from the previous mouse position
    var dx = dets.clientX - xprev;
    var dy = dets.clientY - yprev;

    // Clamp values to avoid extreme scaling
    xscale = gsap.utils.clamp(0.8, 1.4, 1 + makenegative(dx) * 0.05);
    yscale = gsap.utils.clamp(0.8, 1.4, 1 + makenegative(dy) * 0.05);

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
function page2animations() {
  document.querySelectorAll(".elem").forEach((elem) => {
    var rotdif = 0;
    var rotate = 0;

    elem.addEventListener("mouseenter", (dets) => {
      var cursor = document.querySelector(".cursor");
      cursor.innerHTML = `VIEW`;

      gsap.to(cursor, {
        width: "80px",
        height: "80px",
        opacity: 0.8,
        duration: 0.1,
        ease: Power3,
      });

      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        duration: 0.5,
        ease: Power3,
      });
      gsap.to(elem.querySelector(".elemhead"), {
        x: 50,
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
        opacity: 1,
        duration: 0.1,
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
}
function getTime() {
  const options = {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const nowET = new Date().toLocaleString("en-US", options);
  document.querySelector(".time").innerHTML = nowET + " ET";
}

function hovereffect() {
  document.querySelectorAll(".link").forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link.querySelector(".line"), {
        x: 0,
        duration: 0.2,
        ease: Power3,
      });
      if (
        !(link.parentElement.classList.contains("urls") &&
        link.parentElement == "nav")
      ) {
        gsap.to(link.querySelector("i"), {
          transform: "rotate(42deg)",
          duration: 0.2,
          ease: Power3,
        });
      }
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(link.querySelector(".line"), {
        x: "100%",
        duration: 0.2,
        ease: Power3,
        onComplete: () => {
          gsap.set(link.querySelector(".line"), { x: "-100%" });
        },
      });
      if (
        !(link.parentElement.classList.contains("urls") &&
        link.parentElement == "nav")
      ) {
        gsap.to(link.querySelector("i"), {
          transform: "rotate(20deg)",
          duration: 0.2,
          ease: Power3,
        });
      }
    });
  });
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        color: "black",
        backgroundColor: "white",
        duration: 0.2,
        ease: Power3,
      });
      if (btn.parentElement.id == "page2") {
        gsap.to(btn.querySelector("sup"), {
          color: "black",
          duration: 0.2,
          ease: Power3,
        });
      }
    });
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        color: "white",
        backgroundColor: "black",
        duration: 0.2,
        ease: Power3,
      });
      if (btn.parentElement.id === "page2") {
        gsap.to(btn.querySelector("sup"), {
          color: "rgba(255, 255, 255,0.6)",
          duration: 0.2,
          ease: Power3,
        });
      }
    });
  });
}

function loadingAnimation() {
  window.addEventListener("load", () => {
    let tl = gsap.timeline();
    tl.to(".loading .loaded", {
      transform: "translate(0,0)",
      duration: 0.4,
      ease: Power3,
    });
    document.querySelector(".percent").innerHTML = `100%`;
    tl.to("#loader", {
      transform: "translate(0,-100%)",
      duration: 0.7,
      ease: Linear,
      onComplete: () => {
        gsap.set("#loader", { display: "none" });
      },
    });
    tl.from(".content-anim", {
      y: "100%",
      duration: 0.5,
      ease: Power3,
    });
    tl.from(".subhead", {
      y: "-100%",
      duration: 0.5,
      delay: -0.2,
      ease: Power3,
    });
    tl.from(".navtext", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: Power3,
      delay: -0.2,
    });
    tl.from(".avail", {
      y: "-100%",
      duration: 0.5,
      delay: -0.2,
      ease: Power3,
    });
    tl.from("#hero-footer", {
      opacity: 0,
      y: "-10%",
      duration: 0.5,
      ease: Power3,
    });
  });
}

const locoscroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

loadingAnimation();
hovereffect();
getTime();
page2animations();
customcursorWithSkew();
