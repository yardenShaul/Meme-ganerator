'use strict'
let gElCanvas = document.querySelector('.main-canvas');
let gCtx = gElCanvas.getContext('2d');
let textInsertCount

function onInit() {
    renderGallery()
    renderKeyWords()
}

function renderGallery() {
    const gallery =  document.querySelector('.gallery');
    let strHtml = '';
    getgImgs().forEach(meme => strHtml += `<div class"item"><img onclick="onSelectImg(this.id)" id="${meme.id}" class=img-gallery src="${meme.url}"></div>`)
    gallery.innerHTML = strHtml
}

function renderKeyWords() {
    const keywordsBox = document.querySelector('.keywords')
    let strHtml = ''
    getKeywords().forEach(keyword => strHtml += `<span onclick="onSelectKeyword(this)" href="#"  style="font-size: ${keyword.size}px">${keyword.word}</span>`)
    keywordsBox.innerHTML = strHtml
}

function onSelectImg(id) {
    document.querySelector('.main-gallery').style.display = 'none'
    document.querySelector('.search').style.display = 'none'
    document.querySelector('.editor-container').style.display = 'flex'
    renderMeme(id)
    addImg(id)
}

function onCloseEditor() {
    document.querySelector('.search').style.display = 'flex'
    document.querySelector('.main-gallery').style.display = 'grid'
    document.querySelector('.editor-container').style.display = 'none'
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


function onSubmitText() {
    let txt = document.querySelector('#insert-text').value
    console.log()
    addText(txt)
    renderMeme()
    setTimeout(() => {
        console.log(getMeme().lines.color)
        drawText(getMeme().lines.text[1], 60, 30, getMeme().lines.size)
    },300)  
    txt = ''
    
}

function onChooseColor(value) {
    console.log(value)
    changeColor(value)
}

function drawText(txt, x, y, fontsize) {
    gCtx.font = `${fontsize}px impact`;
    gCtx.fillStyle = `${getMeme().lines.color}`;
    gCtx.lineWidth = '1px'
    gCtx.strokeStyle = '#000000';
    gCtx.textAling = 'center'
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    // drewRectangle()
}

function drewRectangle() {
    gCtx.beginPath();
    gCtx.lineWidth = "6";
    gCtx.strokeStyle = "white";
    gCtx.rect(30, 5, 200, 35);  
    gCtx.stroke();
}

function onChangeFontSize(ev) {
    let diff = (ev.innerText === 'A+')? 5 : -5
    changeFontSize(diff)
    clearCanvas()
    renderMeme(getMeme().selectedImgId)
    console.log(getMeme().lines.text[0])
    setTimeout(() => {
        drawText(getMeme().lines.text[1], 60, 30, getMeme().lines.size)
    },300)
}

function onSwicthText(){
    swicthText()
    renderMeme(getMeme().selectedImgId)
    setTimeout(() => {
        drawText(getMeme().lines.text[0], 60, 30, getMeme().lines.size)
        drawText(getMeme().lines.text[1], 60, 130, getMeme().lines.size)
    },300)
}

function onSelectKeyword(ev) {
    changeKeyWordSize(ev.innerHTML)
    console.log(ev.innerHTML)
    getKeywords().forEach(key => {
        console.log(key.size)

        if (key.word === ev.innerHTML) ev.style.fontSize = `${key.size}px`
    })
    
}