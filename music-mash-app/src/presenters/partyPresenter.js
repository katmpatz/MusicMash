import React from 'react'

import PartyView from '../views/partyView/partyView'
import store from '../redux/combineReducers';
import { partyOrLoading, promiseNoData } from '../views/promiseNoData'
import { useHistory } from 'react-router-dom';
import { isNull } from 'lodash';
import checkTokenErrors from  '../utils/checkTokenErrors'

export default function PartyPresenter() {
    if (checkTokenErrors() === 'expired') window.location.href = '/';
    
    const [songs, setSongs]= React.useState(store.getState().songs);
    const [songsError, setError]= React.useState(store.getState().initialSongsError);
    const [users, setUsers] = React.useState(store.getState().party ? store.getState().party.users : null);
    const [party, setParty] = React.useState(store.getState().party);
    const history = useHistory();
    const [playingSong, setPlayingSong] = React.useState(songs ? songs[0] : null);
    const [playingSongNumber, setPlayingSongNumber] = React.useState(0);
    const [isPlaying, setIsPlaying] = React.useState(true);
    const token = localStorage.getItem('access_token');
    const [uris, setUris] = React.useState(returnUris(songs));

    React.useEffect(function () {
        function obs() {
            setParty(store.getState().party);
            setSongs(store.getState().songs);
            setError(store.getState().initialSongsError);
            if (store.getState().party)
                setUsers(store.getState().party.users);    
        }
        store.dispatch({ type: 'SET_JOIN_PARTY_ERROR', value: null });
        obs();
        const unsubscribe = store.subscribe(obs);           // 1. subscribe
        return unsubscribe;                                 // 2. unsubscribe
    }, []);

    React.useEffect(function () {
        setUris(returnUris(songs));
        if(!isNull(songs) && !isNull(playingSong)) {
            let idx = songs.findIndex(s => s.SpotifyTrack.id === playingSong.SpotifyTrack.id);
            if (idx === -1) {
                if (playingSongNumber === songs.length) { // playing song was deleted and it was the last song
                    setPlayingSongNumber(0);
                    setPlayingSong(songs[0]);
                }
            } else if (idx !== playingSongNumber) { // playing song has changed position
                setPlayingSongNumber(idx);
                setPlayingSong(songs[idx]);
            }
        }
    }, [songs]); // eslint-disable-line react-hooks/exhaustive-deps

    function returnUris(songs) {
        if (isNull(songs))
            return [];
        return songs.map((song) => {
            return song.SpotifyTrack.uri;
        });
    }


    function isLikedByTheUser(song){
        if (song.likes)
            return song.likes.some(x => x === store.getState().user.id);
        return false;

    } 

    function findSongById(id){
        let currentSong = songs.find(song => song.SpotifyTrack.id === id);
        if(currentSong !== undefined) {
            //console.log("Player song: " + currentSong.SpotifyTrack.name)
            setPlayingSong(currentSong);
        }
    }

    function chooseSong(songNumber, song) {
        setPlayingSong(song);
        setPlayingSongNumber(songNumber);
    }

    function playSong(isPlaying) {
        setIsPlaying(isPlaying)
    }



    return (
        partyOrLoading(party) ||
        promiseNoData(true, songs, songsError) ||
        <div>
            <PartyView
            token = {token}
            party={party}
            currentUser={store.getState().user.id}
            users={users}
            songlist={songs}
            playingSongNumber = {playingSongNumber}
            playingSong = {playingSong}
            chooseSong = {(songNumber, song) => chooseSong(songNumber, song)}
            findSongById = {(id) => findSongById(id)}
            uris = {uris}
            isPlaying = {isPlaying}
            playSong = {(isPlaying) => playSong(isPlaying)}
            premium = {store.getState().user.premium}
            isLikedByTheUser = {(song) => isLikedByTheUser(song)}
            removeSong={songID=> store.dispatch({ type: 'REMOVE_SONG', songID:songID })}
            onMyParties={() => { history.push('/myParties'); }}
            likeToggle={songID => {
                const songIndex = songs.findIndex(x => x.SpotifyTrack.id === songID);
                let isLiked = false;
                if (songs[songIndex].likes)
                    isLiked = songs[songIndex].likes.some(x => x === store.getState().user.id);
                if (isLiked)
                    store.dispatch({ type: 'UNLIKE_SONG', songID:songID, userID:store.getState().user.id });
                else
                    store.dispatch({ type: 'LIKE_SONG', songID:songID, userID:store.getState().user.id });
            }}
            onLeave={() => { 
                store.dispatch({ type: 'REMOVE_PARTY_FROM_USER', value: party.id });
                store.dispatch({ type: 'REMOVE_USER_FROM_PARTY', value: store.getState().user.id });
                history.push('/myParties');
            }}
            saveToMyParties={()=> store.dispatch({type: 'ADD_PARTY_TO_USER', value:store.getState().party})}// No longer used here to be done in my Party View
            />
        </div>
    );
}


