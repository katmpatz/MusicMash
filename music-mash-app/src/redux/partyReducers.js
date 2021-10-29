import { getPartyDetails, startListeningToParty, stopListeningToParty } from '../firebase/firebaseModel'
import { getInitialPlaylist } from '../api/spotifyWebApi';
import { isNull, isUndefined } from 'lodash';

export function party(state = null, action) {
    if (action.type === 'SET_PARTY') {
        return action.value;
    }
    if (action.type === 'SET_PARTY_IMAGE') {
        return {
            id: state.id,
            name: state.name,
            mood: state.mood,
            date: state.date,
            users: state.users,
            image: action.value,
        };
    }
    if (action.type === 'ADD_USER_TO_PARTY') {
        if (state.users.some(x => x.id === action.value.id)) {
            console.error('Add user to party error: User already in the list.');
        } else return  {
            id: state.id,
            name: state.name,
            mood: state.mood,
            date: state.date,
            users: [...state.users, action.value],
            image: state.image,
        };
    }
    if (action.type === 'REMOVE_USER_FROM_PARTY') { // receives user Id as value
        if (state.users.some(x => x.id === action.value)) {
            state.users = state.users.filter(x => x.id !== action.value);
            return {
                id: state.id,
                name: state.name,
                mood: state.mood,
                date: state.date,
                users: state.users.filter(x => x.id !== action.value),
                image: state.image, 
            };
        } else console.error('Remove user from party error: User not in the list.');
    }
    return state;
}

export function joinPartyError(state = null, action) {
    if (action.type === 'SET_JOIN_PARTY_ERROR') {
        return action.value;
    }
    return state;
}

export function createPartyAction(party) {
    return function (dispatch, getState) {
        const currentPartyId = localStorage.getItem('currentPartyId');
        if (currentPartyId) {
            stopListeningToParty(currentPartyId);
        }
        localStorage.setItem('currentPartyId', party.id);
        dispatch({type: 'SET_PARTY', value: party});
        getInitialPlaylist(party.mood)
            .then(data => { if (getState().party.id === party.id) {
                dispatch({ type: 'SET_SONGS', value: data.songs });
                dispatch({ type: 'SET_PARTY_IMAGE', value: data.image });
                dispatch({ type: 'REPLACE_PARTY_IN_USER', value: getState().party });
                startListeningToParty(localStorage.getItem('currentPartyId'));
            }})
            .catch(error => { if (getState().party.id === party.id) dispatch({ type: 'SET_INITIAL_SONGS_ERROR', value: error }); });
    };
}

export function joinPartyAction(partyID) {
    return function(dispatch, getState) {
        const currentPartyId = localStorage.getItem('currentPartyId');
        if (currentPartyId !== 'null') {
            stopListeningToParty(currentPartyId);
        }
        localStorage.setItem('currentPartyId', partyID);
        getPartyDetails(partyID).then(party => {
            if (isUndefined(party) || isNull(party)) {
                dispatch({ type: 'SET_JOIN_PARTY_ERROR', value: 'The party you are trying to join has an invalid id.' });
                localStorage.setItem('currentPartyId', currentPartyId); // set local storage back to previous party id
                if (currentPartyId !== 'null') {
                    startListeningToParty(currentPartyId);
                }
            } else {
                if (party.users && party.users.find(u => u.id === getState().user.id)) {
                    dispatch({ type: 'SET_JOIN_PARTY_ERROR', value: 'You have already joined this party!' });
                    localStorage.setItem('currentPartyId', currentPartyId); // set local storage back to previous party id
                    if (currentPartyId !== 'null') {
                        startListeningToParty(currentPartyId);
                    }
                } else {
                    dispatch({ type: 'SET_JOIN_PARTY_ERROR', value: 'Success' });
                    dispatch({ type: "SET_PARTY", value: {id:party.id, name:party.name, mood:party.mood, date:party.date, users:party.users || [],image:party.image || null} });
                    dispatch({ type: "ADD_PARTY_TO_USER", value: {id:party.id, name:party.name, mood:party.mood, date:party.date, users:party.users||[],image:party.image||null} });
                    dispatch({ type: "ADD_USER_TO_PARTY", value: { id: getState().user.id, name: getState().user.name }});
                    if (party.songs) {
                        dispatch({ type: "SET_SONGS", value: party.songs });
                    }
                    startListeningToParty(localStorage.getItem('currentPartyId'));
                }
            }
        });
    }
}

export function selectPartyAction(partyID) {
    return function(dispatch, getState) {
        const currentPartyId = localStorage.getItem('currentPartyId');
        if (currentPartyId === partyID) // the selected party is already the current party in the store
            return;                     // no need to do anything, just return
        if (currentPartyId !== '') {
            stopListeningToParty(currentPartyId);
        }
        localStorage.setItem('currentPartyId', partyID);
        getPartyDetails(partyID).then(party => {
            dispatch({ type: "SET_PARTY", value: {id:party.id||null, name:party.name||null, mood:party.mood||null, date:party.date||null, users:party.users||[],image:party.image||null} });
            if (party.songs) {
                dispatch({ type: "SET_SONGS", value: party.songs });
            }
            startListeningToParty(localStorage.getItem('currentPartyId'));
        });
    }
}

export function removePartyAction(partyID) {
    return function(dispatch, getState) {
        getPartyDetails(partyID).then(party => {
            const currentPartyId = localStorage.getItem('currentPartyId'); // save the current party Id
            localStorage.setItem('currentPartyId', partyID);
            dispatch({ type: "SET_PARTY", value: {id:party.id||null, name:party.name||null, mood:party.mood||null, date:party.date||null, users:party.users||[],image:party.image||null} });
            if (party.songs) {
                dispatch({ type: "SET_SONGS", value: party.songs });
            }
            dispatch({ type: "REMOVE_PARTY_FROM_USER", value: partyID });
            dispatch({ type: "REMOVE_USER_FROM_PARTY", value: getState().user.id });
            if (currentPartyId === '' || currentPartyId === partyID) {   // set back the current party to its previous value or to null
                localStorage.setItem('currentPartyId', '');
                dispatch({ type: "SET_PARTY", value: null });
                dispatch({ type: "SET_SONGS", value: null });
            } else if (currentPartyId !== partyID) {
                dispatch(selectPartyAction(currentPartyId));
            }
        });
    }
}


