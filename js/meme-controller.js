'use strict'
let gElCanvas = document.querySelector('.main-canvas');
let gCtx = gElCanvas.getContext('2d');
let textInsertCount = 0

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
    if (textInsertCount === 0) {
        setTimeout(() => {
            drawText(getMeme().lines.text[0], 60, 30, getMeme().lines.size)
        },300)  
    }
}

function onCloseEditor() {
    document.querySelector('.search').style.display = 'flex'
    document.querySelector('.main-gallery').style.display = 'grid'
    document.querySelector('.editor-container').style.display = 'none'
    textInsertCount = 0;
    onInit()
    getMeme().lines.text = ['Type your text'];
    getMeme().lines.color = 'white';
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
    if (textInsertCount === 0) {
        setTimeout(() => {
            console.log(getMeme().lines.color)
            drawText(getMeme().lines.text[1], 60, 30, getMeme().lines.size)
            setselectedLineIdx(1)
        },300)  
    } else {
        setTimeout(() => {
            console.log(getMeme().lines.color)
            drawText(getMeme().lines.text[1], 60, 30, getMeme().lines.size)
            drawText(getMeme().lines.text[2], 60, 120, getMeme().lines.size)
            setselectedLineIdx(2)
        },300)  
    }
    txt = ''
    textInsertCount++
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

}

// function drewRectangle() {
//     gCtx.beginPath();
//     gCtx.lineWidth = "3";
//     gCtx.strokeStyle = "white";
//     gCtx.rect(30, 5, 200, 35);  
//     gCtx.stroke();
// }
// function drewRectangle(x, y, h, w) {
//     gCtx.beginPath();
//     gCtx.lineWidth = "3";
//     gCtx.strokeStyle = "white";
//     gCtx.rect(x, y, h, w);  
//     gCtx.stroke();
// }

// function drawLine(x, y, xEnd = 250, yEnd = 250) {
//     gCtx.lineWidth = 2;
//     gCtx.moveTo(x, y);
//     gCtx.lineTo(xEnd, yEnd);
//     gCtx.strokeStyle = 'white';
//     gCtx.stroke();
// }

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
        drawText(getMeme().lines.text[1], 60, 30, getMeme().lines.size)
        drawText(getMeme().lines.text[2], 60, 130, getMeme().lines.size)
    },300)
}

function onSelectKeyword(ev) {
    changeKeyWordSize(ev.innerHTML)
    getKeywords().forEach(key => {
        if (key.word === ev.innerHTML) ev.style.fontSize = `${key.size}px`
    })
    
}

function onRemoveText() {
    renderMeme()
    if (textInsertCount === 2) {
        setTimeout(() => {
            drawText(getMeme().lines.text[1], 60, 30, getMeme().lines.size)
            removeText(2)
            textInsertCount--
        },300)
    } else {
        removeText(1)
        textInsertCount--
    }
}