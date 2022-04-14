'use strict'

let gKeywordSearch = ['happy','funny', 'sarcastic', 'animal', 'politicians','actors','film']
let gId = 0;
let gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: {text: ['Type youe text','Type youe text'], size: 20, align: 'left', color: 'white'}
}

let gImgs = [
    {id: ++gId, url:'img/1.jpg', keywords:['politicians' ,'funny', 'sarcastic'],},
    {id: ++gId, url:'img/2.jpg', keywords:['animal'],},
    {id: ++gId, url:'img/3.jpg', keywords:['animal','happy'],},
    {id: ++gId, url:'img/4.jpg', keywords:['animal'],},
    {id: ++gId, url:'img/5.jpg', keywords:['funny', 'sarcastic'],},
    {id: ++gId, url:'img/6.jpg', keywords:['funny', 'sarcastic'],},
    {id: ++gId, url:'img/7.jpg', keywords:['funny'],},
    {id: ++gId, url:'img/8.jpg', keywords:['funny'],},
    {id: ++gId, url:'img/9.jpg', keywords:['funny'],},
    {id: ++gId, url:'img/10.jpg', keywords:['politicians' ,'funny', 'sarcastic'],},
    {id: ++gId, url:'img/11.jpg', keywords:['sarcastic'],},
    {id: ++gId, url:'img/12.jpg', keywords:['sarcastic', 'actors'],},
    {id: ++gId, url:'img/13.jpg', keywords:['actors','film'],},
    {id: ++gId, url:'img/14.jpg', keywords:['film'],},
    {id: ++gId, url:'img/15.jpg', keywords:['film'],},
    {id: ++gId, url:'img/16.jpg', keywords:['funny'],},
    {id: ++gId, url:'img/17.jpg', keywords:['politicians'],},
    {id: ++gId, url:'img/18.jpg', keywords:['film'],},
]

function getgImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function getKeywords() {
    return gKeywordSearch
}

function addText(txt) {
    gMeme.lines.text = txt;
}

function addImg(id) {
    gMeme.selectedImgId = id;
}

function changeFontSize(diff) {
    gMeme.lines.size += diff
}

function changeColor(value) {
    gMeme.lines.color = value
}

function swicthText() {
    var temp = gMeme.lines.text[0]
    gMeme.lines.text[0] = gMeme.lines.text[1]
    gMeme.lines.text[1] = temp
}
