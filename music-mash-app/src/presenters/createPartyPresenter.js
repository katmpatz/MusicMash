import React from 'react';
import CreatePartyView from '../views/createPartyView/createPartyView';
import { createPartyAction } from '../redux/partyReducers';
import ID from '../utils/id';
import store from '../redux/combineReducers';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useHistory } from 'react-router-dom';
import checkTokenErrors from  '../utils/checkTokenErrors';

export default function CreatePartyPresenter() {
    const history = useHistory();
    if (checkTokenErrors() === 'expired') window.location.href = '/';

    return (
        <div>
            <CreatePartyView
            onCreate={(params) => {                                          // the Create button has been pressed
                const user = store.getState().user;
                const party = {
                    id: ID(),                                                // unique ID
                    name: params.name,
                    mood: params.mood,
                    date: firebase.firestore.Timestamp.fromDate(new Date()), // save the party creation date
                    users: [{id: user.id, name: user.name}],                 // save the user Id and name in the party
                    image: null,
                };
                store.dispatch({type: 'ADD_PARTY_TO_USER', value: party})    // save the party in the user
                store.dispatch(createPartyAction(party));                    // save the new party to the store and initiate API call to get initial songs
                }}
            onGoBack={() => { history.push('/myParties'); }}
            />
        </div>
    );
}