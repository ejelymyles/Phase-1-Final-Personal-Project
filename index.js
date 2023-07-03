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
1. build a function to add & remove songs (details below) - DONE
3. build a function to add mouseover (details below)
4. think about more functinoality to add (filter/sort list, song counter)
*/


document.addEventListener(`DOMContentLoaded`, () => {
    console.log (`Dom content loaded fetch`)
    addSong();
   // practiceFetch();
   //fetchPhoto();
}
)


function addSong(){
    const  addSongForm = document.getElementById(`submissionForm`);
    const songInput = document.getElementById(`searchBySong`);
    const artistInput = document.getElementById(`searchByArtist`);
    
    addSongForm.addEventListener(`submit`, (e) => {
        e.preventDefault()
        const songValue = songInput.value;
        const artistValue = artistInput.value;
      
        fetch(`https://musicbrainz.org/ws/2/recording?query=artist:${encodeURIComponent(artistValue)}%20AND%20recording:${encodeURIComponent(songValue)}&fmt=json`)
        .then((resp) => resp.json())
        .then((data) => {
            const recordings = data.recordings;
            const targetArray = recordings[0]
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
            const releaseId = recordings[0].releases[0]["release-group"].id
            // console.log(data);
            // console.log(targetArray)
            // console.log(artistName);
            // console.log(songTitle);
            // console.log(albumTitle);
            // console.log(explicitOrClean);
            // console.log(releaseDate);
            // console.log(formattedTime)
             //console.log(releaseId); 
             fetchPhoto(releaseId); 
           
                const newSong = document.createElement(`li`);
                newSong.setAttribute(`class`, `tracklistItem`);
                newSong.setAttribute(`id`, `${songTitle}-item`);
                songInfo = document.createElement(`div`);
                songInfo.innerHTML = `${songTitle}<br>${artistName}<br>${albumTitle}`;
                newSong.appendChild(songInfo); 
                
                const playlistContainer = document.getElementById(`tracklistContainer`)
                playlistContainer.appendChild(newSong);
                
                const songButton = document.createElement(`button`)
                songButton.setAttribute(`class`, `songButton`)
                songButton.setAttribute(`id`, `${songTitle}-button`)
                songButton.innerText = `Remove`;
                songInfo.appendChild(songButton);

                songButton.addEventListener(`click`, (e) => {
                    if (e.target.innerText === `remove`){
                    } newSong.remove()
                      songButton.remove()
                      breakLine.remove()
                })

                const breakLine = document.createElement(`hr`);
                breakLine.setAttribute(`class`, `breakLine`); 
                playlistContainer.appendChild(breakLine);

                songInput.value = ``;
                artistInput.value =``; 
        })
        .catch(error => alert("Sorry, this song is not available")); 
     }
)}






function fetchPhoto(releaseId){
    fetch (`https://coverartarchive.org/release-group/${releaseId}`) 
    .then((resp) => resp.json())
    .then((data) => {
       // console.log(data);
        const thumbnailPhoto = data.images[0].thumbnails[250]
        console.log(thumbnailPhoto)
    })
    .catch(error => console.log(`the photo fetch did not work`));
}


// function practiceFetch() {
//     fetch(`https://musicbrainz.org/ws/2/recording?query=artist:future%22%20AND%20recording:%22712PM%22&fmt=json`)
//     .then((resp) => resp.json())
//     .then((data) => console.log(data))
// }

/* ADD MOUSEOVER FUNCTION
- add an event listener that listens for a mouseover on the image or the song title 
- if event target === image or song title, display song duration, release date, explicit or clean
*/

/* ADD MOUSEOUT FUNCTION
- add event listener that listens for a mousout of an already mousedover element
- when the mouseout happens, it no longer displays the song duration, realease date, explicit or clean
*/
