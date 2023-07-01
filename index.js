document.addEventListener(`DOMContentLoaded`, () => fetchData())

function fetchData (){
    fetch("https://musicbrainz.org/ws/2/recording?query=artist:%22Future%22%20AND%20recording:%22712PM%22&fmt=json")
    .then((resp) => resp.json())
    .then((data) => console.log(data))
}