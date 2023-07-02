//Artist name option 1 - const artistName = recordings[0][`artist-credit`][0].artist.name;
// Artist name option 2 -  const artistName = recordings[0][`artist-credit`][0].name;  
// const songTitle = recordings[0].title
// const albumTitle = recordings[0].releases[0].title
// const explicitOrClean = recordings[0].disambiguation (write in an If statement - if undefined then default to "something")
// const releaseDate = recordings[0][`first-release-date`].slice(0,4)

/* TIME VARIABLES
const songTime = Math.floor(duration / 1000);
const minutes = Math.floor(songTime / 60);
const seconds = songTime % 60;
const formattedTime = `${minutes}:${seconds.toString().padStart(2, `0`)}`; 
*/


/*
FUNCTIONS TO BUILD
1. build a function to add song (details below)
2. build a function to remove song (details below)
3. build a function to add mouseover (details below)
4. think about more functinoality to add (filter/sort list, song counter)
*/

/*
PROCESS
1. comment out current code block and move it elsehwere for late use
2. simplify domcontentloaded with a simple console log
3. begin building the addSong Function
*/



document.addEventListener(`DOMContentLoaded`, () => {
    console.log (`just getting started`)
    addSong();
}
)


function addSong(){
    const  addSongForm = document.getElementById(`submissionForm`)
    console.log('im still working')
    addSongForm.addEventListener(`submit`, () => {
        
    })
}


/* ADD SONG FUNCTION
- find a way to grab the form element and store in in a variable = Submission Form
- listens for a submit on the form (add event listner to form)
- when the submit happens, it follows instructions below:
- takes the song name value AND the Arist Value and stores them in variables = songSub & artistSub
- takes those variables and interpolates them into the fetch url
- receives the fetch back and turns the response into json
- grabs the songTitle, artistName, albumTitle, explicitOrClean, and releaseDate elements stored in variables above
- creates an element (li or paragraph??) that contains the songTitle, artistName, albumTitle. needs  class name = "tracklist item"
- appends it to the dom in the ul container - store the ul contianer to a variable = tracklistContainer
- creates a button with the innertext (remove) and a class of "remove button"
*/


/* ADD REMOVE SONG FUNCTION 
- add an event listener that listents for clicks anywhere in the DOM
- if the event target === class name "remove button"
- then remove the section that contains that songTitle, artistName, albumTitle (maybe this is easier as a P and not a li)
- make sure it targets the specific tracklist item and not all of them. (target the specific p or li )
*/

/* ADD MOUSEOVER FUNCTION
- add an event listener that listens for a mouseover on the image or the song title 
- if event target === image or song title, display song duration, release date, explicit or clean
*/

/* ADD MOUSEOUT FUNCTION
- add event listener that listens for a mousout of an already mousedover element
- when the mouseout happens, it no longer displays the song duration, realease date, explicit or clean


/*
function fetchData (){
    fetch("https://musicbrainz.org/ws/2/recording?query=artist:future%22%20AND%20recording:%22i%27m%20dat%20nigga%22&fmt=json")
    .then((resp) => resp.json())
    .then((data) => {
        const recordings = data.recordings;
        const artistName = recordings[0][`artist-credit`][0].name; 
        const songTitle = recordings[0].title;
        const albumTitle = recordings[0].releases[0].title;
        const explicitOrClean = recordings[0].disambiguation;
        const releaseDate = recordings[0][`first-release-date`].slice(0,4);
        const duration = recordings[0].length;
        const songTime = Math.floor(duration / 1000);
        const minutes = Math.floor(songTime / 60);
        const seconds = songTime % 60;
        const formattedTime = `${minutes}:${seconds.toString().padStart(2, `0`)}`; 
        console.log(data);
        console.log(artistName);
        console.log(songTitle);
        console.log(albumTitle);
        console.log(explicitOrClean);
        console.log(releaseDate);
        console.log(formattedTime)
    })
    .catch(error => console.log("Sorry, this song is not available")); 
}
*/

