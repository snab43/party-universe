"use strict";
const canvasContainer = document.getElementById("partyContainer");
let canvas = document.getElementById("partyCanvas");
let ctx = canvas.getContext("2d");
canvas.width = canvasContainer.offsetWidth + 1;
canvas.height = canvasContainer.offsetHeight + 1;
let partyGoerImage = new Image();
partyGoerImage.src = "./images/sprite-party-goer.gif";
partyGoerImage.onload = function () {
    ctx.drawImage(partyGoerImage, Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.drawImage(partyGoerImage, Math.random() * canvas.width, Math.random() * canvas.height);
    ctx.drawImage(partyGoerImage, Math.random() * canvas.width, Math.random() * canvas.height);
};
addEventListener("resize", event => {
    canvas.width = canvasContainer.offsetWidth + 1;
    canvas.height = canvasContainer.offsetHeight + 1;
});
