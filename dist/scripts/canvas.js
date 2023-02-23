"use strict";
const canvasContainer = document.getElementById("partyContainer");
let canvas = document.getElementById("partyCanvas");
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
canvas.width = canvasContainer.offsetWidth + 1;
canvas.height = canvasContainer.offsetHeight + 1;
let partyGoerImage = new Image();
partyGoerImage.src = "./images/sprite-party-goer.gif";
partyGoerImage.onload = function () {
    ctx.drawImage(partyGoerImage, Math.floor(Math.random() * canvas.width + 60), Math.floor(Math.random() * canvas.height - 60));
    ctx.drawImage(partyGoerImage, Math.floor(Math.random() * canvas.width + 60), Math.floor(Math.random() * canvas.height - 60));
    ctx.drawImage(partyGoerImage, Math.floor(Math.random() * canvas.width + 60), Math.floor(Math.random() * canvas.height - 60));
};
addEventListener("resize", event => {
    canvas.width = canvasContainer.offsetWidth + 1;
    canvas.height = canvasContainer.offsetHeight + 1;
});
