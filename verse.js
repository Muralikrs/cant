let dataf = [];
let pname = "";
let bname = "";
let ci = 0;

function load() {
    const verseElement = document.getElementById("verse");
    if (verseElement) {
        stopAudio();
        verseElement.innerHTML = dataf[ci]; // Assuming `dataf` is a string or can be converted to a string
    }
}

function getchapNameFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let d = urlParams.get('chap');
    if (d) {
        const indexOfA = d.indexOf('a');
        pname = d.substring(0, indexOfA);
        bname = d.substring(indexOfA + 1);
        dataf = verses[bname] ? verses[bname][pname] : [];
        load();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const headingElement = document.querySelector('.heading');
    if (headingElement) {
        getchapNameFromURL();
        headingElement.textContent = pname;
    } else {
        console.error('Element with class "heading" not found.');
    }

    document.getElementById("r").addEventListener("click", function() {
        if (ci < dataf.length - 1) {
            ci++; // Increment index if not at the end
        } else {
            ci = 0; // Reset to 0 if at the end
        }
        load();   
    });

    document.getElementById("l").addEventListener("click", function() {
        if (ci > 0) {
            ci--; // Decrement index if not at the beginning
        } else {
            ci = dataf.length - 1; // Set to last index if at the beginning
        }
        load();   
    });

    document.getElementById("a+").addEventListener("click", function() {
        const verseElement = document.getElementById("verse");
        if (verseElement) {
            stopAudio();
            let currentFontSize = parseFloat(window.getComputedStyle(verseElement).fontSize);
            verseElement.style.fontSize = (currentFontSize + 1) + 'px';
        }
    });

    document.getElementById("a-").addEventListener("click", function() {
        const verseElement = document.getElementById("verse");
        if (verseElement) {
            stopAudio();
            let currentFontSize = parseFloat(window.getComputedStyle(verseElement).fontSize);
            if (currentFontSize > 1) {
                verseElement.style.fontSize = (currentFontSize - 1) + 'px';
            }
        }
    });

    document.getElementById("m").addEventListener("click", function() {
        const audioAddress = `./audio/${pname}/${ci+1}.mp4`;
        console.log(audioAddress)
        playAudio(audioAddress);
    });

});

let isAudioPlaying = false;
let currentAudio = null;

function playAudio(audioAddress) {
    if (isAudioPlaying && currentAudio) {
        return; // If an audio is already playing, ignore the new request
    }

    currentAudio = new Audio(audioAddress);
    
    currentAudio.addEventListener('playing', () => {
        isAudioPlaying = true;
    });

    currentAudio.addEventListener('ended', () => {
        isAudioPlaying = false;
        currentAudio = null;
    });

    currentAudio.addEventListener('pause', () => {
        isAudioPlaying = false;
    });

    currentAudio.play().catch(error => {
        isAudioPlaying = false;
        currentAudio = null;
    });
}

function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0; 
        isAudioPlaying = false;
        currentAudio = null;
    }
}
