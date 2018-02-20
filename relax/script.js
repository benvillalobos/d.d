var player;

window.onload = function () {

}

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('video', {
        height: '390',
        width: '640',
        playerVars:
        {
            listType: "playlist",
            list: "PLWSPIDr63LmyH4dwEwT1klALr8R4aWVyP",
            index: randomNumber(60),
            autoplay: false
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {

}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {

}

function shuffle() {
    player.setShuffle(true);
    player.playVideoAt(0);
}