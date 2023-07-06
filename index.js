
/*
NEXT STEPS 
1. build an array iteration 
2. build a function to add mouseover (details below)
3. build a mouseout function?
4. figure out array iteration
5. think about more functinoality to add (filter/sort list, song counter, mouseover & mouseout)
*/


let timeInMsArray = [];

document.addEventListener(`DOMContentLoaded`, () => {
    console.log (`Dom content loaded fetch`)
    addSong(); 
    
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
             console.log(data);
            // console.log(targetArray)
            // console.log(artistName);
            // console.log(songTitle);
            // console.log(albumTitle);
            // console.log(explicitOrClean);
            // console.log(releaseDate);
            // console.log(formattedTime)
            //console.log(releaseId); 

             //build li element for each song 
             const newSong = document.createElement(`li`);
             newSong.setAttribute(`class`, `tracklistItem`);
             newSong.setAttribute(`id`, `${songTitle}-item`);
             
             // create photo element for each song
             const thumbnaiElement = document.createElement(`img`)
             thumbnaiElement.setAttribute(`src`, ``);
             thumbnaiElement.setAttribute(`alt`, `Album Cover`);
             thumbnaiElement.setAttribute(`class`, `albumCover`)
             thumbnaiElement.setAttribute(`id`, `${songTitle}-photo`)

            
             // fetch and set the photo
             fetchPhoto(releaseId, thumbnaiElement); 

                // build song info details for every song
                songInfo = document.createElement(`div`);
                songInfo.setAttribute(`class`, `songInfo`)
                songInfo.innerHTML = `${songTitle}<br>${artistName}<br>${albumTitle}`;

                //append the photo & song info to the newSong element
                newSong.appendChild(thumbnaiElement);
                newSong.appendChild(songInfo); 

                // append every song to the OL 
                const playlistContainer = document.getElementById(`tracklistContainer`)
                playlistContainer.appendChild(newSong);

                // create a remove button for every song and append it to the song info
                const songButton = document.createElement(`button`)
                songButton.setAttribute(`class`, `songButton`)
                songButton.setAttribute(`id`, `${songTitle}-button`)
                songButton.innerText = `Remove`;
                songInfo.appendChild(songButton);

                // add event listener to remove button
                songButton.addEventListener(`click`, (e) => {
                    if (e.target.innerText === `remove`){
                    } newSong.remove()
                      songButton.remove()
                      breakLine.remove()
                })
                

                // add a line between each song
                const breakLine = document.createElement(`hr`);
                breakLine.setAttribute(`class`, `breakLine`); 
                playlistContainer.appendChild(breakLine);

                // clear the song & artist inputs for the next entry 
                songInput.value = ``;
                artistInput.value =``; 

                // push song duration to the time array to help build total palytime 
                timeInMsArray.push(duration);
                console.log(timeInMsArray);

                // reduce the timeInmsArray to a single accumulated number
                let playTimeInMS = timeInMsArray.reduce((acc, currentValue) => acc + currentValue,0)
                console.log(playTimeInMS)
               
            
        })
        .catch(error => alert("Sorry, this song is not available")); 
     }
)}



function fetchPhoto(releaseId, thumbnaiElement){
    fetch (`https://coverartarchive.org/release-group/${releaseId}`) 
    .then((resp) => resp.json())
    .then((data) => {
       // console.log(data);
        const thumbnailPhoto = data.images[0].thumbnails[250];
        thumbnaiElement.src = thumbnailPhoto
    })
    .catch(error => alert(`Sorry, the album photo is not available for this song`));
}





// function hoverOverPhoto (){
//     document.addEventListener(`mouseover`, (e) => {
//         if (e.target.classList.contains(`albumCover`)){
//         }
//     })
// }

/* ADD MOUSEOVER FUNCTION
- add an event listener that listens for a mouseover on the image or the song title 
- if event target === image or song title, display song duration, release date, explicit or clean
*/

/* ADD MOUSEOUT FUNCTION
- add event listener that listens for a mousout of an already mousedover element
- when the mouseout happens, it no longer displays the song duration, realease date, explicit or clean
*/
