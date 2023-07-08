# Playlist Builder (Flatiron Phase-1 Project)

### Project Goals & Outcomes

The goal of this project is to build an application using JS/HTML/CSS. 
The application should demonstrate the understanding and application of technical concepts learned in phase-1.
The basic requirements of this application are:

1. Connect to an external API
2. Handle interactions between the client & API asynchronously
3. Make use of at least 3 unique event listeners 
4. Perform some type of array iteration at least once
5. Contain a commit history of at least 30 commits. 
6. **Personal Goal** - Make the application as user friendly/intuitive as possible. 

***

### Application

The Playlist Builder is a single page app where users can add their favorite songs to a playlist. The page contains input fields for *song name* and *artist name*. Once a user searches for a song, if the song is available in the database, the song will be displayed on the page along with other useful information about the song. Users can also expect to see the total listening time of their playlist displayed, as well as remove buttons to delete songs from their playlist. Songs added to the playlist will not actually be playable, this application is soley visual and is meant to practice using JS to interact with an external API to add functionality and content to the webpage. 

***

### Basic HTML Structure

The HTML structure every user begins with is a form that contains inputs for *song name* and *artist name* 

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

An h2 header where the total listening time will later be displayed 


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
This endpoint fetches a thumbnail photo or album cover related to the song a user searches for. You must dynamically insert the release ID number, which is represented by the value releaseId. This unique ID number can be found in the song related data that is accessed from the first url endpoint. 

***

### Features & Functionality

In the javascript file titled `index.js`, there is a `DOMContentLoaded` event listener where the `addSong` function will be called from. This `addSong` function is where most of the functionality for this app lives. The only two  lines of code you will find prior to this `DOMContentLoaded` listener is javascript that:

1. Initializes an empty array called `timeInMsArray`
2. Creates a`h6` element called `listenTimeElement`

Both of these variables will be utilized later to calculate the total length of the playlist and update the DOM.

#### The `addSong` function:

This function is responsible for displaying songs to the DOM on a single click. It also stores valuable data and passes that data to other functions when needed. 

**How it works:**
* Listens for a submission event on the form. 
* Fetches the song-related data from the first API endpoint
* Creates `li` and `img` elements
* Creates a `div` element and builds it's innerHTML to reflect the *song title*, *artist name*, and *album title*. These titles will be stacked on top of each other and not side by side. 
* Appends the `img` and `div` elements to the `li` element
* Appends the `li` element to the `ol` element from the original HTML structure
* Creates a `hr` element, and appends it to the bottom of each added song.
* Creates a `button` element called `songButton` and sets it's inner text to **remove**
* Clears out the form inputs to prepare it for the next submission
* Adds the length of the song in milliseconds to the `timeInMsArray`
* Invokes the `fetchPhoto` function after passing it the songs release ID data, and the newly created `img` element  as arguments
* Invokes the `updateTotalListeningTime` function after passing it the `timeInMsArray` and the `listenTimeElement` as arguments
* Invokes the `removeButton` function after passing it the newly created `button` `li` `hr` elements, the `timeInMsArray`,  a variable to represent the song's length of time, and the `updateTotalListeningTime` function as arguments
* Alerts the user if the fetch returns an error

#### The `fetchPhoto` function:

This function is responsible for fetching the photo or album cover that corresponds to an added song, and updating the DOM with it. 

**How it works:**
* Is invoked from within the `addSong` function
* Takes the `releaseID` and `thumbnaiElement` as arguments 
* Fetches an image from the second API endpoint
* Stores the image into a variable called `thumbnaiPhoto`
* Sets the source of the `thumbnaiElement` equal to `thumbnaiPhoto`
* Alerts the user if the fetch returns an error

#### The `updateTotalListeningTime` function:
This function is responsible for calculating the total length (in time) of the playlist, and updating the DOM with it. 

**How it works:**
* Is invoked from within the `addSong` function
* Takes the `timeInMsArray` and `listenTimeElement` as arguments
* Reduces the `timeInMsArray` to a single aggregated number
* Converts that reduced number from milliseconds to hours, minutes, and seconds; storing each into their own variables 
* Sets the inner text of `listenTimeElement` equal to :
>`Your total listening time is ${playTimeHours} hrs, ${playTimeMinutes % 60} minutes & ${runTimeSeconds} seconds`
* Appends the `listenTimeElement` to the `h2` element from the original HTML structure 

#### The `removeButton` function:

This function is responsible for removing songs from the playlist, updating the total length (in time) of the playlist, and updating the DOM with it. 

**How it works:**
* Is invoked from within the `addSong` function
* Takes the `button` `li` `hr` elements, the `timeInMsArray`, `duration`, and `updateTotalListeningTime` as arguments
* Adds and "click" event listener to the `button` element
* Removes the `li`, `button`, and `hr` elements
* Searches through the `timeInMsArray` to find the index corresponding to the song that was clicked on or removed
* Removes the corresponding array element
* Invokes the `updateTotalListeningTime` function passing in the edited `timeInMsArray` and the `listenTimeElement` as arguments. 

***

### Conclusion 

This app uses JS/HTML/CSS to interact with an external API to display songs, related information, and remove them in two clicks. It was intended to provide a number of features and functionality, without sacrificing the user experience. 

This project sums up the technical concepts and techniques I learned in phase-1 of the Flatiron Software Engineering program. 