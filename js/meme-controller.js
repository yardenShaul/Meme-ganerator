'use strict'
let gElCanvas = document.querySelector('.main-canvas');
let gCtx = gElCanvas.getContext('2d');
let textInsertCount = 0

function onInit() {
    renderGallery()
    renderKeyWords()
}

function getCoords(ev) {
    console.log('ev.offsetX', ev.offsetX)
    console.log('ev.offsetY', ev.offsetY)
    console.log(ev)
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
    if (getMeme().selectedLineIdx === 0) {
        setTimeout(() => {
            drawText(getMeme().lines.text[0], gElCanvas.width / 2, 20, getMeme().lines.size)
        },100)  
    }
}

function onCloseEditor() {
    document.querySelector('.search').style.display = 'flex'
    document.querySelector('.main-gallery').style.display = 'grid'
    document.querySelector('.editor-container').style.display = 'none'
    getMeme().selectedLineIdx = 0
    getMeme().lines.text = ['Type your text'];
    getMeme().lines.color = 'white';
    onInit()
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
    if (getMeme().selectedLineIdx === 0) {
        setTimeout(() => {
            drawText(getMeme().lines.text[1], gElCanvas.width / 2, 20, getMeme().lines.size)
            setselectedLineIdx(1)
            drawText ('_'.repeat(getMeme().lines.text[1].length),gElCanvas.width / 2,20,getMeme().lines.size, true)
        },100)  
    } else if (getMeme().selectedLineIdx === 1) {
        setTimeout(() => {
            drawText(getMeme().lines.text[1], gElCanvas.width / 2, 20, getMeme().lines.size)
            drawText(getMeme().lines.text[2], gElCanvas.width / 2, 130, getMeme().lines.size)
            setselectedLineIdx(2)
            drawText ('_'.repeat(getMeme().lines.text[2].length),gElCanvas.width / 2,130,getMeme().lines.size, true)
        },100)  
    }
    txt = ''
}

function onChooseColor(value) {
    console.log(value)
    changeColor(value)
}

function drawText(txt, x, y, fontsize, isUnderLine = false) {
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.lineWidth = '1px'
    gCtx.fillStyle = `${getMeme().lines.color}`;
    gCtx.font = `${fontsize}px impact`;
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle = '#000000';
    if (isUnderLine) gCtx.strokeStyle = 'white';
    gCtx.strokeText(txt, x, y);

}

// function drawRect(x, y) {
//     gCtx.rect(x, y, 270, 20);
//     // gCtx.fillStyle = 'green';
//     // gCtx.fillRect(x, y, 200, 200);
//     gCtx.strokeStyle = 'white';
//     gCtx.stroke();
// }

function onChangeFontSize(ev) {
    let diff = (ev.innerText === 'A+')? 5 : -5
    changeFontSize(diff)
    renderMeme()
    if (getMeme().selectedLineIdx === 1) {
        setTimeout(() => {
            drawText(getMeme().lines.text[0], gElCanvas.width / 2, 20, getMeme().lines.size)
        },100)
    } else if (getMeme().selectedLineIdx === 1) {
        setTimeout(() => {
            drawText(getMeme().lines.text[1], gElCanvas.width / 2, 20, getMeme().lines.size)
            if (gMeme().lines.text[2]) {
                drawText(getMeme().lines.text[2], gElCanvas.width / 2, 130, getMeme().lines.size)
            }
            drawText ('_'.repeat(getMeme().lines.text[1].length),gElCanvas.width / 2,20,getMeme().lines.size, true)       
        },100)  
    } else if (getMeme().selectedLineIdx === 2) {
        setTimeout(() => {
            drawText(getMeme().lines.text[1], gElCanvas.width / 2, 20, getMeme().lines.size)
            drawText(getMeme().lines.text[2], gElCanvas.width / 2, 130, getMeme().lines.size)
            drawText ('_'.repeat(getMeme().lines.text[2].length),gElCanvas.width / 2,130,getMeme().lines.size, true)
        },100)
    }
}

//Not is use:
// function onSwicthTextPosition(){
//     swicthTextPosition()
//     renderMeme(getMeme().selectedImgId)
//     setTimeout(() => {
//         drawText(getMeme().lines.text[1], gElCanvas.width / 2, 20, getMeme().lines.size, true)
//         drawText(getMeme().lines.text[2], gElCanvas.width / 2, 130, getMeme().lines.size)
//     },100)
// }

function onSwicthSelectedText() {
    if (!getMeme().lines.text[1]) return
    renderMeme()
    if (getMeme().selectedLineIdx === 2) {
        setTimeout(() => {
            drawText(getMeme().lines.text[1], gElCanvas.width / 2, 20, getMeme().lines.size)
            drawText(getMeme().lines.text[2], gElCanvas.width / 2, 130, getMeme().lines.size)
            drawText ('_'.repeat(getMeme().lines.text[1].length),gElCanvas.width / 2,20,getMeme().lines.size, true)
            setselectedLineIdx(1)
        },100)  
    } else if ((getMeme().selectedLineIdx === 1)) {
        setTimeout(() => {
            drawText(getMeme().lines.text[1], gElCanvas.width / 2, 20, getMeme().lines.size)
            drawText(getMeme().lines.text[2], gElCanvas.width / 2, 130, getMeme().lines.size)
            drawText ('_'.repeat(getMeme().lines.text[1].length),gElCanvas.width / 2,130,getMeme().lines.size, true)
            setselectedLineIdx(2)
        },100)  
    }
}

function onSelectKeyword(ev) {
    changeKeyWordSize(ev.innerHTML)
    getKeywords().forEach(key => {
        if (key.word === ev.innerHTML) ev.style.fontSize = `${key.size}px`
    })
    
}

function onRemoveText() {
    if (getMeme().selectedLineIdx === 0) return
    renderMeme()
    if (getMeme().selectedLineIdx === 1 && getMeme().lines.text[2]) {
        setTimeout(() => {
            drawText(getMeme().lines.text[2], gElCanvas.width / 2, 130, getMeme().lines.size)
            drawText ('_'.repeat(getMeme().lines.text[2].length),gElCanvas.width / 2, 130 ,getMeme().lines.size, true)
            removeText()
        },100)
    } else if (getMeme().selectedLineIdx === 2) {
        setTimeout(() => {
            drawText(getMeme().lines.text[1], gElCanvas.width / 2, 20, getMeme().lines.size)
            drawText ('_'.repeat(getMeme().lines.text[2].length),gElCanvas.width / 2,20,getMeme().lines.size, true)
            removeText()
        },100)
    }
}

function downloadCanvas(elLink) {
    renderMeme()
    if (getMeme().lines.text.length === 1) return
    // remove the underline's before downloading the Meme:
    else if (getMeme().lines.text.length === 2) {
        setTimeout(() => {
            drawText(getMeme().lines.text[1], gElCanvas.width / 2, 20, getMeme().lines.size)

        },100)  
    } else if (getMeme().lines.text.length === 3) {
        setTimeout(() => {
            drawText(getMeme().lines.text[1], gElCanvas.width / 2, 20, getMeme().lines.size)
            drawText(getMeme().lines.text[2], gElCanvas.width / 2, 130, getMeme().lines.size)
        }, 100)
    }
    setTimeout(() => {
        const data = gElCanvas.toDataURL()
        elLink.href = data
        elLink.download = 'supercoolmeme.jpg'
    },100)
}