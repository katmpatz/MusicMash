// import logo from './logo.svg';
// import CreatePartyPresenter from './presenters/createPartyPresenter';
// import PartyPresenter from './presenters/partyPresenter';
// import SharePartyPresenter from './presenters/sharePartyPresenter';
// import MyPartiesPresenter from './presenters/myPartiesPresenter';
// import LoginPresenter from './presenters/loginPresenter';
import AppRouter from './routing/AppRouter'


function App() {
  return (
    <div className="App">
      <AppRouter/>
    </div>
  );
}

export default App;

// Here save login inputs: email address + passwords