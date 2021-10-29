import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MyPartiesPresenter from '../presenters/myPartiesPresenter';
import LoginPresenter from '../presenters/loginPresenter';
import RedirectPage from '../components/RedirectPage';
import CreatePartyPresenter from '../presenters/createPartyPresenter';
import PartyPresenter from '../presenters/partyPresenter';
import SearchPresenter from '../presenters/searchPresenter';

// import TestPresenter from '../presenters/testPresenter';

class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main">
          <Switch>
            <Route path="/" component={LoginPresenter} exact={true} />
            <Route path="/myParties" component={MyPartiesPresenter} />
            <Route path="/redirect" component={RedirectPage} />
            <Route path='/createParty' component={CreatePartyPresenter} />
            <Route path='/party' component={PartyPresenter} />
            <Route path='/search' component={SearchPresenter} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
  
}
export default AppRouter;