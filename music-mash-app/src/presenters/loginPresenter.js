import LoginView from '../views/loginView/loginView'

export default function LoginPresenter() {
    
    //const for developement
    // const {
    //     REACT_APP_CLIENT_ID,
    //     REACT_APP_AUTHORIZE_URL,
    //     REACT_APP_REDIRECT_URL
    //   } = process.env;
    
    //const for deployment
     const REACT_APP_CLIENT_ID="494e7ee649e64124bdaf328804b3567e"
     const REACT_APP_AUTHORIZE_URL="https://accounts.spotify.com/authorize"
     const REACT_APP_REDIRECT_URL="https://musicmash-cb17d.web.app/redirect"

      const scopes = [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "playlist-modify-public",
        "user-modify-playback-state",
        "user-read-private",
        "user-library-read",
        "user-library-modify",
        "streaming",
        "user-read-email",
    ];
    
    function handleLogin() {
        window.location = `${REACT_APP_AUTHORIZE_URL}?client_id=${REACT_APP_CLIENT_ID}&redirect_uri=${REACT_APP_REDIRECT_URL}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;
    };

    return(
        <div>
            <LoginView
             handleLogin={()=> handleLogin()}
            />
        </div>
    );
}