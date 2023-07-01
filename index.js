// Artist name option 1 - const artistName = recordings[0][`artist-credit`][0].artist.name;
// Artist name option 2 -  const artistName = recordings[0][`artist-credit`][0].name;  
// const songTitle = recordings[0].title
// const albumTitle = recordings[0].releases[0].title
// const explicitOrClean = recordings[0].disambiguation
// const releaseDate = recordings[0][`first-release-date`].slice(0,4)


document.addEventListener(`DOMContentLoaded`, () => fetchData())

function fetchData (){
    fetch("https://musicbrainz.org/ws/2/recording?query=artist:%22Future%22%20AND%20recording:%22712PM%22&fmt=json")
    .then((resp) => resp.json())
    .then((data) => {
        const recordings = data.recordings;
        const artistName = recordings[0][`artist-credit`][0].name; 
        const songTitle = recordings[0].title
        const albumTitle = recordings[0].releases[0].title
        const explicitOrClean = recordings[0].disambiguation
        const releaseDate = recordings[0][`first-release-date`].slice(0,4)
        const duration = recordings[0].length
        const songTime = Math.floor(duration / 1000)
        console.log(data)
        console.log(artistName);
        console.log(songTitle)
        console.log(albumTitle)
        console.log(explicitOrClean)
        console.log(releaseDate)
        console.log(songTime)
    })
    .catch(error => console.log("oops, this is an error")); 
}