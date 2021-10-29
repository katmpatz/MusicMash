import SharePartyView from '../views/sharePartyView/sharePartyView';
import store from '../redux/combineReducers';
import { useHistory } from 'react-router-dom';

export default function SharePartyPresenter() {
    const history = useHistory();

    const partyId = store.getState().party.id; // get the current party id from the store

    return (
        <div>
            <SharePartyView partyId={partyId} onGoToParty={() => { history.push('/party'); }} />
        </div>
    );
}