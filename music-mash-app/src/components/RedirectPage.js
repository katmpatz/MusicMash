import React from 'react';
import _ from 'lodash';

  // getParamValues function will store the access_token, token_type and expires_in values in an object
  const getParamValues = (url) => {
    return url
      .slice(1)
      .split('&')
      .reduce((prev, curr) => {
        const [title, value] = curr.split('=');
        prev[title] = value;
        return prev;
      }, {});
  };
 

export default class RedirectPage extends React.Component {

  componentDidMount() {
    
    const { history, location } = this.props;
    try {
      if (_.isEmpty(location.hash)) {
        return history.push('/myParties');
      }
      const params = getParamValues(location.hash);
      
      
      // The expires_in value is in seconds (&expires_in=3600) so we’re converting it to milliseconds 
      // by multiplying it by 1000 and then adding it to the milliseconds at the current time
      const expiryTime = new Date().getTime() +params.expires_in * 1000;
      
      localStorage.setItem('access_token', params.access_token);
      localStorage.setItem('expiry_time', expiryTime);

      history.push({
        pathname: '/myParties',
        state: { from: 'login' },
      });
    } catch (error) {
      history.push('/');
    }
  }
  render() {
    return null;
  }
}