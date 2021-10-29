import Loader from '../components/loader';

export function promiseNoData(promise, data, error) {
    if (!promise)
        return false;
    else if (promise && !data && !error)
        return <Loader />;
    else if (promise && !data && error)
        return <span>There was an error when calling the Spotify API.</span>;
    else if (promise && data && !error)
        return false;
}

export function partyOrLoading(party) {
    if (!party)
        return <Loader />;
    if (localStorage.getItem('currentPartyId') !== party.id)
        return <Loader />;
    return false;
}

export function promiseNoSearchSongs(promise, data, error) {
    if (promise == null)
        return <div><span></span></div>;
    else if (promise && !data && !error)
        return <Loader />;
    else if (promise && !data && error)
        return false;
    else if (promise && data && !error)
        return false;
}