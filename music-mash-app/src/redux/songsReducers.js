export function songs(state = null, action) {
    if (action.type === "SET_SONGS") {
        return action.value;
    }
    if (action.type === "ADD_SONG") {
        if (state.some(x => x.SpotifyTrack.id === action.song.SpotifyTrack.id ))
            throw new Error('Song already in the list.');
        return [...state, action.song];
    }
    if (action.type === "REMOVE_SONG") {
        try {
            if (state.some(x => x.SpotifyTrack.id === action.songID)) {
                return state.filter(x => x.SpotifyTrack.id !== action.songID);
            } else throw new Error('Song not in the list.');
        } catch (err) { console.error("Remove song error: ", err.message); }
    }
    if (action.type === "LIKE_SONG"){
        try{
            if (state.some(x => x.SpotifyTrack.id === action.songID)) {
                const songIndex = state.findIndex(x=> x.SpotifyTrack.id===action.songID);
                let newSongs = [...state];
                
                if ((newSongs[songIndex].likes) && newSongs[songIndex].likes.some(x => x === action.userID))
                    throw new Error('User already liked this song.');
                else {
                    newSongs[songIndex] = {
                        SpotifyTrack: newSongs[songIndex].SpotifyTrack,
                        likes: [...newSongs[songIndex].likes || [], action.userID],
                    };
                    newSongs = newSongs.sort(compareLikes);
                }    
                return newSongs;
            } else throw new Error('Song not in the list.');
        }
        catch (err) { console.error("Like song error: ", err.message); }

        return state;
    }
    if (action.type === "UNLIKE_SONG"){
        try{
            if (state.some(x => x.SpotifyTrack.id === action.songID)) {
                const songIndex = state.findIndex(x=> x.SpotifyTrack.id===action.songID);
                let newSongs = [...state];
                newSongs[songIndex].likes= [...newSongs[songIndex].likes].filter(x=> x!==action.userID);
                
                newSongs[songIndex] = {
                    SpotifyTrack: newSongs[songIndex].SpotifyTrack,
                    likes: [...newSongs[songIndex].likes],
                };  
                newSongs = newSongs.sort(compareLikes);
                return newSongs;
            } else throw new Error('Song not in the list.');
        }
        catch (err) { console.error("Like song error: ", err.message); }
    }
    return state;    
}

export function initialSongsError(state=null, action) { // API error when requesting the list of initial songs based on mood
    if (action.type === "SET_INITIAL_SONGS_ERROR"){
        return action.value;
    }
    return state;
}

function compareLikes(a,b){
    if((a.likes||[]).length < (b.likes||[]).length)
       return 1;
    if((a.likes||[]).length > (b.likes||[]).length)
      return -1;
  
  }

