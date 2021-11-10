import { object } from 'prop-types';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { connect } from 'react-redux';
import { SESSION_ACTIONS } from './actions/types';
import { push } from 'connected-react-router';

import AppToolbar from './components/AppToolbar';

import Main from './containers/Main';
import Login from './containers/Login';


function Routes({ history, isLoggedIn, logout, push  }) {
  const handleLogin = () => {
    push('/login');
  };


  return (
    <ConnectedRouter history={history}>
    <AppToolbar
      isLoggedIn={isLoggedIn}
      onLogin={handleLogin}
      onLogout={logout}
    />
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </ConnectedRouter>
  );
}


const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.getIn(['session', 'username'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch({type: SESSION_ACTIONS.LOGOUT}),
    push: path => dispatch(push(path))
  };
};

Routes.propTypes = {
  history: object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
