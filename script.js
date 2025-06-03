const locoscroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function customcursor() {
  window.addEventListener("mousemove", (dets) => {
    let scrollY = locoscroll.scroll.instance.scroll.y;
    document.querySelector(".cursor").style.transform = `translate(${
      dets.pageX
    }px, ${dets.pageY + scrollY}px)`;
  });
}

customcursor();
