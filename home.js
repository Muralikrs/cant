function initializeDictionaryIfNotExists() {
  let hist = localStorage.getItem('hist');
  
  if (hist === null) {
      hist = {};
      localStorage.setItem('hist', JSON.stringify(hist));
  } else {
  }
}
initializeDictionaryIfNotExists()
function ismarked(pname,ci){
        console.log(pname+""+ci)

    let hist = JSON.parse(localStorage.getItem('hist')) || {};
    if(hist[pname] && hist[pname].includes(ci)){
        document.getElementById("bookmarks").src="./photos/tickstar.png"
        return true}
    
    else{
        document.getElementById("bookmarks").src="./photos/untick.png"
        return false}
}
document.getElementById("bookmarks").addEventListener("click",function(){
    updateBookmarkStatus(bname+'a'+pname,ci)
});

function updateBookmarkStatus(bname, ci) {
        let hist = JSON.parse(localStorage.getItem('hist')) || {};
    
        if (!hist[bname]) {
            hist[bname] = [ci];
            document.getElementById("bookmarks").src="./photos/tickstar.png"
            console.log(hist);
        } else {
            const index = hist[bname].indexOf(ci);
            if (index === -1) {
                // ci is not in the list, add it
                hist[bname].push(ci);
                document.getElementById("bookmarks").src="./photos/tickstar.png"
                console.log(hist)
            } else {
                // ci is in the list, remove it
                hist[bname].splice(index, 1);
                console.log(`Removed ${ci} from ${bname}`);
                // If the list is now empty, remove the pnamebname+"a"+pname
                if (hist[bname].length === 0) {
                    delete hist[bname];
                    console.log(hist);
    
                }
                document.getElementById("bookmarks").src="./photos/untick.png"

            }
        }
    
        localStorage.setItem('hist', JSON.stringify(hist));
    }