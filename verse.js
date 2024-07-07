let dataf = [];
let pname = "";
let bname = "";
let ci = 0;

function load() {
    const verseElement = document.getElementById("verse");
    if (verseElement) {
        stopAudio();
        ismarked(pname,ci)
        verseElement.innerHTML = dataf[ci];

    }
}

function getchapNameFromURL() {
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let d = urlParams.get('chap');
    if (d) {
        if(!d.includes('n')){
            console.log(d)
        const indexOfA = d.indexOf('a');
        pname = d.substring(0, indexOfA);
        bname = d.substring(indexOfA + 1);}
        else{
            console.log(d)
            bname = d.substring(0, d.indexOf('a'));
            pname = d.substring(d.indexOf('a') + 1,d.indexOf('n'));
            ci=Number(d.substring(d.indexOf('n')+1))
            console.log(pname+"\n"+bname)
        }
        dataf = verses[bname] ? verses[bname][pname] : [];}
        console.log(dataf)
        load();
    }


document.addEventListener('DOMContentLoaded', () => {
    const headingElement = document.querySelector('.heading');
    if (headingElement) {
        getchapNameFromURL();

        headingElement.textContent = pname;
        console.log(  ismarked(bname+"a"+pname,ci))

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


// Function to toggle the dropdown visibility
function toggleDropdown() {
    const dropdown = document.getElementById('myDropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Add event listeners to dropdown sections
document.getElementById("fu").addEventListener("click",function(){

});
document.getElementById('user').addEventListener('click', function() {
    var confirmed = window.confirm("Are you sure you want restart ?");

    // If user confirms (clicks OK), remove 'hist'
    if (confirmed) {
        // Check and remove 'hist' from localStorage
        if (localStorage.getItem('hist')) {
            localStorage.removeItem('hist');
        }

        // Check and remove 'hist' from sessionStorage
        if (sessionStorage.getItem('hist')) {
            sessionStorage.removeItem('hist');
        }
    } else {
    }

});

// Function to handle section click
function handleSectionClick(sectionName) {
    alert(`Clicked ${sectionName}`);
    // Perform actions based on which section was clicked
    // For example, navigate to a different page, load content, etc.
}










    document.getElementById("fu").addEventListener("click", function() {
        const verseElement = document.getElementById("verse");
        if (verseElement) {
            stopAudio();
            let currentFontSize = parseFloat(window.getComputedStyle(verseElement).fontSize);
            verseElement.style.fontSize = (currentFontSize + 1) + 'px';
        }
    });

    document.getElementById("fd").addEventListener("click", function() {
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
        const audioAddress = `./audio/${pname}/${ci+1}.mp3`;
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
  document.getElementById("bookmark").addEventListener("click",function(){
    const verseUrl = `bookmark.html`;
    window.location.href = verseUrl;
  });
 
