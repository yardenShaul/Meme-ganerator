'use strict'
let gElCanvas = document.querySelector('.main-canvas');
let gCtx = gElCanvas.getContext('2d');


function onInit() {
    renderGallery()

}

function renderGallery() {
    const gallery =  document.querySelector('.gallery');
    let strHtml = '';
    getgImgs().forEach(meme => strHtml += `<div class"item"><img onclick="onSelectImg(this.id)" id="${meme.id}" class=img-gallery src="${meme.url}"></div>`)
    // console.log(strHtml)
    gallery.innerHTML = strHtml
}

function onSelectImg(id) {
    renderMeme(id)
    addImg(id)
    setTimeout(() => {
        drawText('Type your text', 60, 30, 25)
        drawText('Type your text', 60, 130, 25)
    },300)
}

function renderMeme(id = getMeme().selectedImgId) {
    var img = new Image()
    img.src = `img/${id}.jpg`;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height) 
    }
}


function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}


function onSubmitText(ev) {
    let firstTxt = document.querySelector('#first-text').value
    let secTxt = document.querySelector('#second-text').value
    console.log(ev)
    addText([firstTxt, secTxt])
    if (ev === 'first-text') {
        renderMeme()
        setTimeout(() => {
            drawText(getMeme().lines.text[0], 60, 30, getMeme().lines.size)
        },300)     
    } else {
        renderMeme()
        setTimeout(() => {
            drawText(getMeme().lines.text[1], 60, 130, getMeme().lines.size)
        },300)
    }
    firstTxt = ''
    secTxt = ''
}



function onChooseColor(value) {
    console.log(value)
    changeColor(value)
}

function drawText(txt, x, y, fontsize) {
    gCtx.font = `${fontsize}px impact`;
    gCtx.fillStyle = `${getMeme().lines.color}`;
    gCtx.strokeStyle = '#000000';
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function onChangeFontSize(ev) {
    let diff = (ev.innerText === 'increase')? 5 : -5
    changeFontSize(diff)
    clearCanvas()
    renderMeme(getMeme().selectedImgId)
    console.log(getMeme().lines.text[0])
    console.log(getMeme().lines.text[1])
    setTimeout(() => {
        drawText(getMeme().lines.text[0], 60, 30, getMeme().lines.size)
        drawText(getMeme().lines.text[1], 60, 130, getMeme().lines.size)
    },300)
}

function onSwicthText(){
    console.log('switch')
}
