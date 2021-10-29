import { getUserParties, persistModelRedux } from '../firebase/firebaseModel';
import store from './combineReducers';
import firebase from 'firebase/app';
import 'firebase/auth';

export function user(state = null, action) {
    if (action.type === "SET_USER") {
        return action.value;
    }
    if (action.type === 'SET_PARTIES') { // set the user's existing parties after being fetched from Firebase
        return {
            id: state.id,
            name: state.name,
            email: state.email,
            premium: state.premium,
            parties: action.value,
        };
    }
    if (action.type === 'REPLACE_PARTY_IN_USER') { // replace the party in the user once we got the party image from the API
        let partiesCopy = [...state.parties];
        const indexOfParty = partiesCopy.findIndex(party => party.id === action.value.id);
        partiesCopy[indexOfParty] = action.value;
        return {
            id: state.id,
            name: state.name,
            email: state.email,
            premium: state.premium,
            parties: partiesCopy,
        };
    }
    if (action.type === "ADD_PARTY_TO_USER") {
        if (state.parties.some(x => x.id === action.value.id)) {
            console.error('Add party to user error: Party already in the list.');
        } else return {
            id: state.id,
            name: state.name,
            email: state.email,
            premium: state.premium,
            parties: [...state.parties, action.value],
        }; 
    }
    if (action.type === "REMOVE_PARTY_FROM_USER") {
        if (state.parties.some(x => x.id === action.value)) {
            return {
                id: state.id,
                name: state.name,
                email: state.email,
                premium: state.premium,
                parties: state.parties.filter(x => x.id !== action.value),
            }
        } else console.error('Remove party error: Party not in the list');
    }
    return state; 
}

export function userLoginAction(user) { // after the user logs in, we call firebase to check if the user has logged in before and has any previous parties saved
    return function(dispatch, getState) {
        if(!sessionStorage.getItem("sessionStarted")){
            firebase.auth().createUserWithEmailAndPassword(user.email, 'password')
                .then(function(userCredentials) {
                    localStorage.setItem('userId', userCredentials.user.uid); // put the user id in the local storage
                    dispatch({type: 'SET_USER', value: {
                        id: userCredentials.user.uid,
                        name: user.name,
                        email: user.email,
                        premium: user.premium,
                        parties: user.parties,
                    }});
                    persistModelRedux(store);
                    getUserParties(userCredentials.user.uid).then(parties => { dispatch({type: 'SET_PARTIES', value: parties}); });
                })
                .catch(function(error) {
                    let errorCode = error.code;
                    if (errorCode === 'auth/weak-password') {
                        alert('The password is too weak.');
                    } else if (errorCode === 'auth/email-already-in-use') {
                        firebase.auth().signInWithEmailAndPassword(user.email, 'password')
                            .then(function(userCredentials) {
                                localStorage.setItem('userId', userCredentials.user.uid); // put the user id in the local storage
                                dispatch({type: 'SET_USER', value: {
                                    id: userCredentials.user.uid,
                                    name: user.name,
                                    email: user.email,
                                    premium: user.premium,
                                    parties: user.parties,
                                }});
                                persistModelRedux(store);
                                getUserParties(userCredentials.user.uid).then(parties => { dispatch({type: 'SET_PARTIES', value: parties}); });
                            })
                            .catch(function(error) {
                                let errorCode = error.code;
                                let errorMessage = error.message;
                                if (errorCode === 'auth/wrong-password') {
                                    alert('Wrong password.');
                                } else {
                                    alert(errorMessage);
                                }
                                console.error(error);
                            });
                    } else {
                        console.error(error);
                    }
                })
                .finally(function() {
                    sessionStorage.setItem("sessionStarted", true);
                });
        }
    }
}

