import { createStore, combineReducers, applyMiddleware} from 'redux';
import { joinPartyError, party } from './partyReducers';
import { songs, initialSongsError } from './songsReducers';
import { user } from './userReducers';
import thunkMiddleware from 'redux-thunk';

function composeTools(x) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(x) : x;
}

const store = createStore(
    combineReducers({party, songs, user, initialSongsError, joinPartyError}),
    composeTools(applyMiddleware(thunkMiddleware)),
);

export default store;