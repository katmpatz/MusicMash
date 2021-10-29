# 🥳 MusicMash

[![Header](https://64.media.tumblr.com/98d15d33b367b8bf299d958c8985d398/f150c6a5ecd5d894-8e/s2048x3072/b4b60c5fc048e05641bbd34d490a7b4a0ea6c80f.png "Header")](https://some-url.dev/)

**A real-time collaborative playlist -- enjoy your party time!** [website🤏🏻](https://musicmash-cb17d.web.app/)

**Prototype can be accessed from** [here](https://www.figma.com/proto/NVfayXcuLgD7vdjJmggzUW/Spotify-Party-Time?page-id=8%3A0&node-id=739%3A7&viewport=-158%2C117%2C0.20521381497383118&scaling=min-zoom)
## Contents 

* [Overview](https://gits-15.sys.kth.se/bacanu/MusicMash/blob/master/README.md#overview-)
* [Beware](https://gits-15.sys.kth.se/bacanu/MusicMash#beware)
* [Setup](https://gits-15.sys.kth.se/bacanu/MusicMash/blob/master/README.md#setup-)
* [Completed Work](https://gits-15.sys.kth.se/bacanu/MusicMash/blob/master/README.md#completed-work)
* [Files](https://gits-15.sys.kth.se/bacanu/MusicMash/blob/master/README.md#fiels)

## Overview 🦄
Currently Spotify does not offer a solution for people at a party/gathering to customize songs based on the party mood, collaboratively add/remove songs or select the order of the playlist as a group. MusicMash provides a solution for this, where the party/event host can create a collaborative playlist which is automatically populated with music based on the selected mood of the event and then all the participants can get together, decide on the order of the songs by liking them, and play the music. Users can join the virtual party, search, and add their own songs as well. Highest liked songs will move to the top. Changes will be visible in real time across all users in the party.


## Setup 👉🏻

* Download node.js (v14.16.0) and npm (6.14.11) on your computer.

* Clone the project:
```
git clone git@gits-15.sys.kth.se:bacanu/MusicMash.git
```

* If you want to test our application locally, send an email to our group so we can send you the firebase config file.

* Put the firebaseConfig.js file inside the src/firebase folder.

* Rename env.local to .env.local

* Run the following commands from the music-mash-app directory:
```
npm install
``` 
```
npm start
```

## Beware
Before using the app, there are a few things to be aware of:
* Only Spotify Premium users can play songs.
* The player was implemented through [this](https://www.npmjs.com/package/react-spotify-web-playback) third-party component that uses the Spotify Web Playback SDK. The SDK is currently in Beta and was tested on Mac, Linux, and Windows, on Mozilla and Chrome. If you have Spotify Premium and still encounter errors with the player, check [this](https://developer.spotify.com/documentation/web-playback-sdk/) website for the list of supported browsers and functionalities.
* The application state (songs, song likes, party collaborators, the user's parties) is persisted in real time across users, as well as between one user's session in 2 different tabs/browsers. However, the application is meant to be a real-time music collaboration platform, so we recommend testing the persistence by having multiple users join the same party.
* If you encounter any errors or for some reason get stuck, try clearing your browser's local and session storage and logging back in.


## Functionalities

### Login 
```
Log in with Spotify by agreeing that MusicMash can access your Spotify personal data.
Click “LOG IN WITH SPOTIFY” .
Click “Agree”.
``` 
### Create a party
``` 
Create a party, choose a name and mood.
Confirm the information that you filled in and click the “Create” button.
```
### Share your party
```
Once a party is successfully created, a pop-up dialog will appear on your screen which contains the party ID.
Copy the ID and share with your friends.
Click “Go To Your Party” to move to the newly created party.
```
### Check collaborators
```
Click the colorful profile avatar to see all the collaborators.
```
### Play a song
```
Click the play button on each song card. Only Spotify Premium users can play songs.
```
### Like a song
```
Click the heart-shaped button on each song card to like the song. The playlist automatically reorders based on the number of likes. This is visible in real time across all collaborators.
```
### Delete a song
```
Click the bin-shaped button on each song card to delete it.
```
### Search songs
```
Search songs by name, artist or album using the search bar. Perform the search by pressing Enter or by clicking the magnifier icon.
```
### Add a song to the playlist

``` 
Click the white add-shaped button to add the chosen song to the playlist. It will be added with 1 like by default.
```
### Leave the party
```
Click the red “LEAVE THE PARTY” button, and confirm your choice on the pop-up dialog to leave the party.
```
### Join a party
```
Go to your parties page and paste the party ID into the input field under “Join a party”, and click on the Join button to join the party.
```
### Delete a party
```
Go to your parties page, click the bin-shaped button on the chosen party card to delete the party.
```
### Logout
```
Exit from MusicMush by clicking the red Logout button
```

# Completed work✌🏻
**User Authentication**
```sh
   - You can use your Spotify account credentials to log in to the system.
   - After completing user authentication, you successfully log in and will go to My Parties page.
```
**My Parties**
```sh
   - View all the parties you have created or joined. 
   - Select any of the existing parties to enter that party or click the delete button to remove the party from your list. 
   - Create a party by clicking the create button on the right-hand side section and go to Create Party View.
   - Enter the party ID and join a party by clicking the Join button.
   - Exit from MusicMash by clicking the Log out button.
```
**Create a Party**
```sh
   - Select a name and a mood for the party, then create a party with automatically populated songs of the selected mood. 
   - Copy the party ID and send it to your friends to invite them to join your party.
   - Go to your newly created party.
   - Go back to My Parties page.
```
**Join a Party**
```sh
   - Paste the Party ID in the text field under “Join a party” on My Parties page, and click Join button to join the party. 
```
**Party**
```sh
   - See a list of songs generated based on the selected mood in the party.
   - Play or pause songs (if you have Spotify Premium).
   - Search songs from the searching form on the right-hand side section and add songs you like.  
   - Remove any songs from the playlist.
   - Like songs and re-rank them in the playlist by liking songs collectively -- the songs with the highest likes will go to the top. 
   - Check all the collaborators by clicking their profile avatars underneath the party name.
   - Go to My Parties to see all of your parties.
   - Leave the current party. 
```
**Search Songs feature**
 ```sh
   - Add songs to the party list by searching any song you want by name, artist, or album.
 ```
**Play songs feature**
 ```sh
   - Users with Spotify Premium accounts can play the songs.
``` 
**Database security**
 ```sh
   - Added security to the database via changing the access rules.
 ```
**Responsive UI**
 ```sh
   - Visuals optimized wherever needed, both for web and mobile devices.
```
# Files

Folder structure

![Header](https://64.media.tumblr.com/1d142a5a0983505ef49cb8fdaa4f11e1/a0ec5ed5c7c5b83e-90/s1280x1920/f67dfb56b778c53cf17d6ced8c185dac6f2bf35e.png "Header")

