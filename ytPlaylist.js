function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function getElementByXPath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

async function save_playlist(playlistName) {
    var expandPlaylistPath = "/html/body/ytd-app/ytd-miniplayer/div[1]/yt-draggable/ytd-miniplayer-info-bar/div[2]/button/yt-touch-feedback-shape/div[2]"
    var newPlaylistPath = "/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[3]/yt-panel-footer-view-model/div/div[2]/button-view-model/button"
    var playlistNamePath = "/html/body/ytd-app/ytd-popup-container/tp-yt-paper-dialog/yt-dialog-view-model/dialog-layout/div[2]/div[1]/div/yt-create-playlist-dialog-form-view-model/div[1]/text-field-view-model/textarea-shape/div/textarea"
    var createPlayListXpath = "/html/body/ytd-app/ytd-popup-container/tp-yt-paper-dialog/yt-dialog-view-model/dialog-layout/div[2]/div[2]/yt-form-footer-view-model/yt-panel-footer-view-model/div/div[2]/button-view-model/button"
    var reallyClosePlayerPath = "/html/body/ytd-app/ytd-popup-container/tp-yt-paper-dialog[2]/yt-confirm-dialog-renderer/div[2]/div[2]/yt-button-renderer[3]/yt-button-shape/button/yt-touch-feedback-shape"


    getElementByXPath(expandPlaylistPath).click()
    await sleep(2000)
    document.getElementById("playlist-actions").getElementsByClassName("ytSpecButtonShapeNextHost")[0].click()
    await sleep(2000)
    getElementByXPath(newPlaylistPath).click()
    await sleep(2000)
    var inpElem = getElementByXPath(playlistNamePath)
    inpElem.value = playlistName
    var inpEvent = new InputEvent('input')
    inpElem.dispatchEvent(inpEvent)
    await sleep(1000)
    getElementByXPath(createPlayListXpath).click()
    await sleep(500)
    document.getElementsByClassName("ytp-miniplayer-close-button")[0].click() // close player
    await sleep(1000)
    getElementByXPath(reallyClosePlayerPath).click()
}

// create playlist 
async function createPlaylists(startIndex, endIndex = 0, playlistSize = 100, playlistNamePrefix = "siiva ") {
    var nd = new Date();
    playlistNamePrefix += nd.getDate() + "/" + nd.getMonth()+1 + " "

    var loopIndex = 1
    var hoverEvent = new MouseEvent('mouseover');
    var playlist = document.querySelectorAll('.ytLockupViewModelWrapper');

    // args check
    endIndex = Math.max(0, endIndex)
    if (playlist.length < startIndex) {
        return console.log("your start index is too big. scoll further to load more videos!")
    }
    if (startIndex <= endIndex) {
        return console.log("startIndex must be bigger than EndIndex (chrnological order)")
    }

    var i = startIndex;
    while (i >= 0 && i >= endIndex) {
        for (var u = i; u >= 0 && u >= endIndex && u >= (i - playlistSize + 1); u--) {
            playlist[u].getElementsByClassName("ytLockupViewModelHost")[0].dispatchEvent(hoverEvent)
            await sleep(100)
            playlist[u].getElementsByClassName("ytSpecButtonShapeNextHost")[1].click()
        }
        await sleep(2000)
        var pName = playlistNamePrefix + loopIndex;
        await save_playlist(pName)
        i -= playlistSize
        loopIndex += 1
        var randomWaitTime = 60 + Math.floor(Math.random() * 60);
        var percentProgress = Math.floor((startIndex - i) / (startIndex - endIndex) * 100)
        console.log("created playlist '" + pName + "' , progress: " + percentProgress + "%")
        if (i < 0 || i < endIndex) {
            console.log("script finished!")
        }
        else {
            console.log("waiting " + randomWaitTime + "s to maybe avoid Youtube bot/rate limiting wrath")
            await sleep(randomWaitTime * 1000)
        }
    }
}

