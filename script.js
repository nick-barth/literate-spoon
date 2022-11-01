// canvas related stuff
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let WIDTH = canvas.width;
let HEIGHT = canvas.height;
const FRAME_WIDTH = 600;

let images = [];

window.onload = function (e) {
  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });

  const imageUrls = [
    "https://images.unsplash.com/photo-1666085575722-bdf8a510c2c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1011&q=80",
    "https://images.unsplash.com/photo-1607788156334-50076e4c7624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1666786881194-7ecf6f620375?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
    "https://images.unsplash.com/photo-1535136072409-ff0c7a947733?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2049&q=80",
  ];
  Promise.all(imageUrls.map(loadImage)).then((completedImages) => {
    images = completedImages;
    renderImages();

    const container = document.querySelector("#container");
    let isDown = false;
    let startX;
    let scrollLeft;

    container.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      container.classList.add("active");
    });
    window.addEventListener("mouseup", () => {
      isDown = false;
      container.classList.remove("active");
    });
    window.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = x - startX;
      container.scrollLeft = scrollLeft - walk;
    });
    window.addEventListener("resize", (e) => {
      renderImages();
    });
  });
};

function renderImages() {
  canvas.width = images.length * FRAME_WIDTH;
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    const ratio = image.width / image.height;
    let newWidth = canvas.width;
    let newHeight = newWidth / ratio;
    if (newHeight > canvas.height) {
      newHeight = canvas.height;
      newWidth = newHeight * ratio;
    }
    const xOffset = FRAME_WIDTH * i + (FRAME_WIDTH - newWidth) / 2;
    const yOffset =
      newHeight < canvas.height ? (canvas.height - newHeight) / 2 : 0;

    ctx.drawImage(image, xOffset, yOffset, newWidth, newHeight);
  }
}
