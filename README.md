# Playlist Builder (Flatiron Phase-1 Project)

### Project Goals & Outcomes

The goal of this project is to build an application using JS/HTML/CSS. 
The application should demonstrate the understanding and application of technical concepts learned in phase-1
The basic requirements of this application are:

1. Connect to data from an external API
2. Handle interactions between th client & API asynchonously
3. Make use of at least 3 unique event listeners 
4. perform sometype of array iteration at least once
5. contain a commit history of at least 30 commits. 
6. **Personal Goal** - make the application as user friendly/intuitive as possible. 

***

### Application

The Playlist Builder is a single page app where users can add their favorite songs to their playlist. The page contains input fields for *song name* and *artist name*. Once a user searches for a song, if the song is available in the database, the song will be displayed on the page along with other useful information about the song. Users can also expect to see the total listening time of their playlist displayed, as well as remove buttons to delete songs from their playlist. 

***
### Basic HTML Structure

The HTML features every user begins with is a form that contains inputs for *song name* and *artist name* 

```
   <div >
     <form id="submissionForm">
         <label for = "songName"> Song Name</label>
         <input id="searchBySong" type="text" placeholder="Enter song name here"/>
        <label for = "ArtistName"> Artist</label>
         <input id="searchByArtist" type="text" placeholder="Enter artist name here"/>
         <input type="submit" value="Add Song">
     </form>
    </div>
```
A h2 header where the total listening time will later be displayed 

```
 <h2>Track List</h2>
```
And an ordered list that will contain added songs
```
  <ol id="tracklistContainer">

   </ol>
```

***
### External API
This application fetches data from two different endpoints supplied by the [MusicBrainz API](https://musicbrainz.org/doc/About). MusicBrainz is an open-source encyclopedia of music information that does not require Authentication or an API key.

The first endpoint where the music data will be fetched from is: 
```
https://musicbrainz.org/ws/2/recording?query=artist:${encodeURIComponent(artistValue)}%20AND%20recording:${encodeURIComponent(songValue)}&fmt=json
```
This endpoint fetches data related to a specific song. When using this url, you must dynamically insert the artist name and song name into the url. You can see them represented by variables artistValue and songValue .

The second endpoint used in this application is:
```
https://coverartarchive.org/release-group/${releaseId}
```
This endpoint fetches a thumbnail photo or album cover related to the song a user searches for. You must dynamically insert the release ID number, which is represented by the value releaseId. This unique ID number can be found in the song related data that is accessed from the first url. 
***
### Features & Functionality
