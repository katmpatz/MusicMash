import firebase from 'firebase/app';
import 'firebase/database';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from './redux/combineReducers';
import { persistModelRedux } from './firebase/firebaseModel';
import { ThemeProvider } from '@material-ui/styles';
import {THEME} from './customTheme';

if (localStorage.getItem('currentPartyId') === null) localStorage.setItem('currentPartyId', '');
Promise.all([
    firebase.database().ref('musicMash/users/' + localStorage.getItem('userId')).once('value'),
    firebase.database().ref('musicMash/parties/' + localStorage.getItem('currentPartyId')).once('value')
]).then(([user, party]) => {
    if (user.val() && user.val().id) {
        store.dispatch({ type: 'SET_USER', value: {
            id: user.val().id,
            name: user.val().name,
            email: user.val().email,
            premium: user.val().premium,
            parties: user.val().parties || [],
        } });
    }
    if (party.val() && party.val().id) {
        store.dispatch({ type: 'SET_PARTY', value: {
            id: party.val().id,
            name: party.val().name,
            mood: party.val().mood,
            date: party.val().date,
            image: party.val().image,
            users: party.val().users || [],
        }});
        if (party.val().songs) {
            store.dispatch({type: 'SET_SONGS', value: party.val().songs });
        }
    }
    if (sessionStorage.getItem("sessionStarted"))
        persistModelRedux(store);

    ReactDOM.render(
    <ThemeProvider theme={THEME}>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </ThemeProvider>
    , document.getElementById('root'));
});