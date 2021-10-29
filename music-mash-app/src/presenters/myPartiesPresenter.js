import React from 'react';
import MyPartiesView from '../views/myPartiesView/myPartiesView';
import store from '../redux/combineReducers';
import { promiseNoData } from '../views/promiseNoData';
import { getUser } from '../api/spotifyWebApi';
import { userLoginAction } from '../redux/userReducers';
import { useHistory } from "react-router-dom";
import { joinPartyAction, selectPartyAction, removePartyAction } from '../redux/partyReducers';
import checkTokenErrors from  '../utils/checkTokenErrors';
 
function MyPartiesPresenter() {
    if (checkTokenErrors() === 'expired') window.location.href = '/';

    const [userPromise, setUserPromise] = React.useState(null);
    const [partyID, setPartyID]= React.useState('');
    const [user, setUser] = React.useState(store.getState().user ? store.getState().user : null);
    const [parties, setParties]= React.useState(store.getState().user ? store.getState().user.parties : []);
    const [error, setError] = React.useState(store.getState().joinPartyError);
    const history = useHistory();
    
    React.useEffect(function () {
        if (error === 'Success')
            history.push('/party');
    }, [error]); // eslint-disable-line react-hooks/exhaustive-deps

    React.useEffect(function () {
        if (history.location.state && history.location.state.from === 'login') {
            setUserPromise(getUser().then(user => store.dispatch(userLoginAction(user))));
        }
        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().user);
            setParties(store.getState().user.parties);
            setError(store.getState().joinPartyError);
        });
        return unsubscribe;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

return (
    <div>
        {promiseNoData(userPromise, user, null) ||
        <MyPartiesView
            error={error}
            onDialogClose={() => store.dispatch({ type: 'SET_JOIN_PARTY_ERROR', value: null })}
            partyList={parties}
            removeParty={partyID => {
                store.dispatch(removePartyAction(partyID)); // bring the party we want to remove to the store, remove it, then switch the party out of the store
            }}
            selectParty={partyID => {
                store.dispatch(selectPartyAction(partyID));
                history.push('/party');
            }}
            onText={txt => setPartyID(txt)}
            joinParty={() => {
                if (!partyID.match(/^[0-9a-z][0-9a-z][0-9a-z][0-9a-z][0-9a-z][0-9a-z]$/)) {
                    store.dispatch({ type: 'SET_JOIN_PARTY_ERROR', value: 'The party ID has to contain 6 alphanumeric characters.' });
                } else {
                    store.dispatch(joinPartyAction(partyID));
                }
            }}
            onCreate={() => history.push('/createParty')}
            logOut={() => {
                localStorage.clear();
                sessionStorage.clear();
                history.push('/');
            }}
        />}
    </div>

);

}

export default MyPartiesPresenter;