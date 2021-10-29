import store from '../redux/combineReducers';

import firebase from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import 'firebase/database';

firebase.initializeApp(firebaseConfig);

var loadingFromFirebase = false;

export function persistModelRedux(store){
    
    const unsubscribe = store.subscribe( 
        function () {
            if (loadingFromFirebase)
                return;
            
            const partyInStore = store.getState().party;
            if (partyInStore) {
                firebase.database().ref('musicMash/parties/' + partyInStore.id).set({
                    id: partyInStore.id,
                    name: partyInStore.name,
                    mood: partyInStore.mood,
                    date: partyInStore.date,
                    users: partyInStore.users || [],
                    image: partyInStore.image || null,
                    songs: store.getState().songs || [],
                });
            }

            const userInStore = store.getState().user;
            if (userInStore) {
                firebase.database().ref('musicMash/users/' + userInStore.id).set({
                    id: userInStore.id,
                    name: userInStore.name,
                    email: userInStore.email,
                    premium: userInStore.premium,
                    parties: userInStore.parties || [],
                });
            }
        }
    );
    const userInStore = store.getState().user;
    if (userInStore)
        firebase.database().ref('musicMash/users/' + userInStore.id).on('value', function (data) {
            if (data.val()) {
                loadingFromFirebase = true;
                store.dispatch({ type: 'SET_USER', value: {
                    id: data.val().id,
                    name: data.val().name,
                    email: data.val().email,
                    premium: data.val().premium,
                    parties: data.val().parties || [],
                }});
                loadingFromFirebase = false;
            }
        });
    return unsubscribe;
}

export function stopListeningToParty(partyID) {
    if (partyID === '')
        return;
    firebase.database().ref('musicMash/parties/' + partyID).off('value');
}

export function startListeningToParty(partyID) {
    if (partyID === '')
        return;
    if (localStorage.getItem('currentPartyId') !== partyID) {
        console.error('startListeningToParty: The current party id in local storage does not match with the party id received.');
        return;
    }
    firebase.database().ref('musicMash/parties/' + partyID).on('value', function (data) {
        if (data.val()) {
            loadingFromFirebase = true;
            store.dispatch({ type: 'SET_PARTY', value: {
                id: data.val().id,
                name: data.val().name,
                mood: data.val().mood,
                date: data.val().date,
                image: data.val().image || null,
                users: data.val().users || [],
            }});
            store.dispatch({ type: 'SET_SONGS', value: data.val().songs || null });
            loadingFromFirebase = false;
        }
    });
}

export function getUserParties(userID) { // get a snapshot of the list of users in Firebase and check whether the given user has logged in before and has any existing parties in the database
    if (userID === '')
        return Promise.resolve(null);
    return firebase.database().ref('musicMash/users/' + userID).once('value').then((snapshot) => {
        
        return snapshot.val() ? snapshot.val().parties || [] : [];
    });
}
   
export function getPartyDetails(partyID){ // code to load the specific party when joining from a party id or when changing the party via myPartyView
    if (partyID === '')
        return Promise.resolve(null);
    return firebase.database().ref("musicMash/parties/" + partyID).once("value").then((snapshot) => {
        
        return snapshot.val() ? snapshot.val() || null : null;
    });
}
