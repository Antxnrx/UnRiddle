
const canvas = document.getElementById("drawing-board");
const toolbar = document.getElementById("toolbar");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = 1122.519685;

let isPainting = false;
let lineWidth = 1;
let opacity = 1;
let startX;
let startY;

function touchMoved() {
  return false;
}

const draw = (e) => {
  if (!isPainting) {
    return;
  }

  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.globalAlpha = opacity;
  ctx.imageSmoothingQuality = "high";
  ctx.lineTo(e.pageX - canvasOffsetX, e.pageY - canvasOffsetY);
  ctx.stroke();
};

canvas.addEventListener("mousedown", (e) => {
  isPainting = true;
  startX = e.pageX * canvas.width;
  startY = e.pageY * canvas.height;
});

canvas.addEventListener("mouseup", (e) => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);

function onMouseDown(prevent) {
  prevent.preventDefault();
}

//---------------------------

toolbar.addEventListener("click", (e) => {
  if (e.target.id === "clear") {
    document.getElementById("imgPrime").removeAttribute("src");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

toolbar.addEventListener("change", (e) => {
  if (e.target.id === "opacity") {
    opacity = e.target.value;
  }
});

toolbar.addEventListener("change", (e) => {
  if (e.target.id === "stroke") {
    ctx.strokeStyle = e.target.value;
  }

  if (e.target.id === "lineWidth") {
    lineWidth = e.target.value;
  }
});

function png() {
  canvas.toBlob((blob) => {
    const timestamp = Date.now().toString();
    const a = document.createElement("a");
    document.body.append(a);
    a.download = `paper-${timestamp}.png`;
    a.href = URL.createObjectURL(blob);
    a.click();
    a.remove();
  });
}

canvas.addEventListener("mousedown", onMouseDown);
document.querySelector("#png").addEventListener("click", png);

function jpeg() {
  canvas.toBlob((blob) => {
    const timestamp = Date.now().toString();
    const a = document.createElement("a");
    document.body.append(a);
    a.download = `paper-${timestamp}.jpeg`;
    a.href = URL.createObjectURL(blob);
    a.click();
    a.remove();
  });
}

canvas.addEventListener("mousedown", onMouseDown);
document.querySelector("#jpeg").addEventListener("click", jpeg);

document.getElementById("squares").addEventListener("click", squares);

function squares() {
  let element = document.getElementsByClassName("data")[0];
  element.id = "squares";
}

document.getElementById("squares2").addEventListener("click", squares2);

function squares2() {
  let element = document.getElementsByClassName("data")[0];
  element.id = "squares2";
}

document.getElementById("doted").addEventListener("click", doted);

function doted() {
  let element = document.getElementsByClassName("data")[0];
  element.id = "doted";
}

document.getElementById("v-lined").addEventListener("click", vlined);

function vlined() {
  let element = document.getElementsByClassName("data")[0];
  element.id = "v-lined";
}

document.getElementById("h-lined").addEventListener("click", hlined);

function hlined() {
  let element = document.getElementsByClassName("data")[0];
  element.id = "h-lined";
}

document.getElementById("old").addEventListener("click", old);

function old() {
  let element = document.getElementsByClassName("data")[0];
  element.id = "main";
}

document.getElementById("blank").addEventListener("click", blank);

function blank() {
  let element = document.getElementsByClassName("data")[0];
  element.id = " ";
}

let btn = document.querySelector(".record-btn");

btn.addEventListener("click", async function () {
  let stream = await navigator.mediaDevices.getDisplayMedia({
    video: true
  });

  const mime = MediaRecorder.isTypeSupported("video/webm; codecs=vp9")
    ? "video/webm; codecs=vp9"
    : "video/webm";
  let red = document.getElementById("recording");
  red.style.display = "block";
  let mediaRecorder = new MediaRecorder(stream, {
    mimeType: mime
  });

  let chunks = [];
  mediaRecorder.addEventListener("dataavailable", function (e) {
    chunks.push(e.data);
  });

  mediaRecorder.addEventListener("stop", function () {
    let red = document.getElementById("recording");
    red.style.display = "none";
    let blob = new Blob(chunks, {
      type: chunks[0].type
    });
    let url = URL.createObjectURL(blob);

    let video = document.querySelector("video");
    video.src = url;

    let a = document.createElement("a");
    a.href = url;
    a.download = "video.mp4";
    a.click();
  });

  mediaRecorder.start();
});
