import React from 'react';
import { searchSongByTitle } from '../api/spotifyWebApi';
import SearchView from '../views/searchView/searchView';
import SearchResultsView from '../views/searchResultsView/searchResultsView';
import { promiseNoSearchSongs } from '../views/promiseNoData';
import store from '../redux/combineReducers';
import checkTokenErrors from  '../utils/checkTokenErrors';
import '../index.css';


export default function SearchPresenter() {
    const [promise, setPromise]=React.useState(null);     // promise for the API call to get initial songs based on mood
    const [error, setError] = React.useState(null);
    const [searchQuery, setSearchQuery]=React.useState('');
    const [searchResults, setSearchResults] = React.useState(null);
    const [cleared, setCleared] = React.useState(false);

    if (checkTokenErrors() === 'expired') window.location.href = '/';

    React.useEffect(function () {
        setSearchResults(null); setError(null);
        if (promise) {
            const p = promise;
            promise.then(dt => {
                if(promise === p){
                setSearchResults(dt); }})
            .catch(error => {
                if (promise === p)
                    setError(error.message);
                });
        } 
    }, [promise]);

    return (
        <div>
            <SearchView
            onText={query => {setCleared(false); setSearchQuery(query)}}
            onSearch={() => {if (!searchQuery) {setError('Please type a song name.'); setSearchResults('');}
                            else setPromise(searchSongByTitle(searchQuery))}}
            shouldEmpty={cleared}
            />
            <div className={promise && !searchResults && !error ? 'loadingSearchResults' : ''}>
                {promiseNoSearchSongs(promise, searchResults, error) || 
                <SearchResultsView 
                songs={searchResults}
                onAdd={song => {
                    store.dispatch({type: 'ADD_SONG', song: song});
                    store.dispatch({type: 'LIKE_SONG', songID:song.SpotifyTrack.id, userID:store.getState().user.id }) 
                    setSearchResults(searchResults.filter(x=> x.SpotifyTrack.id !== song.SpotifyTrack.id));
                }}
                songsError={error}
                onClear={() => setCleared(true)}
                />}
                
            </div>
        </div>
    );
}