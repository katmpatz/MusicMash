import axios from 'axios';

const setAuthHeader = () => {
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error setting auth:', error);
    }
  };

const spotifyAPI = async (url, params) => {
    setAuthHeader();
    const result = await axios.get(url, params);
    return result.data;
};

export function getUser(){
    return spotifyAPI("https://api.spotify.com/v1/me")
    .then(data => {
         return {
           'id': data.id,
           'name': data.display_name,
           'email': data.email,
           'premium': (data.product === 'premium'),
           'parties': []
          };})
    .catch(error => { 
      console.error('Error getting user from Spotify:', error);
    });
}


export function getInitialPlaylist(genre) {
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }  
  return spotifyAPI(`https://api.spotify.com/v1/browse/categories/${genre}/playlists?limit=10`)
    .then(data => {
      let idx = getRandomNumber(0, 9);
      const playlistImage = data.playlists.items[idx].images[0].url;
      return spotifyAPI(`https://api.spotify.com/v1/playlists/${data.playlists.items[idx].id}/tracks`)
      .then(data => {
        const songsList = [];
        for (let i = 0; i < data.items.length; i++) {
          const songId = data.items[i].track.id;
          const songName = data.items[i].track.name;
          const artist = data.items[i].track.artists[0].name;
          const uri = data.items[i].track.uri;
          const songImage = data.items[i].track.album.images[0].url;
          songsList.push({'SpotifyTrack' : {'id': songId, 'name': songName, 'artist': artist, 'pictUrl':songImage, 'uri':uri}, 'likes': []})
        }
        return {
          'image': playlistImage,
          'songs': songsList
        };})})
    .catch(error => { 
      console.error('Error getting inital playlist from Spotify:', error);
    });
}

export function searchSongByTitle(songName){
    return spotifyAPI(`https://api.spotify.com/v1/search?q=${songName}&type=track`)
    .then(data=> {
      if (data.tracks.items.length>0) {
        const songsList = [];
        const maxResults = 10;
        for (let i = 0; i < maxResults; i++) {
          const songId = data.tracks.items[i].id;
          const songName = data.tracks.items[i].name;
          const artist = data.tracks.items[i].artists[0].name;
          const uri = data.tracks.items[i].uri;
          const songImage = data.tracks.items[i].album.images[0].url;
          songsList.push({'SpotifyTrack' : {'id': songId, 'name': songName, 'artist': artist, 'pictUrl':songImage, 'uri':uri}, 'likes': []})
        }
        return songsList;
      }
      else
        throw new Error('No songs found.');
    });
}