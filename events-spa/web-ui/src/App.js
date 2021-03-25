import "./App.scss";

import { Container } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import Nav from './Nav';
import Feed from './Events/Feed';
import NewEvent from './Events/New';
import NewUser from './Users/New'

function App() {

  return (
    <Container>
      <Nav />
      <Switch>
        <Route path="/" exact>
          <Feed />
        </Route>
        <Route path="/register" exact>
          <NewUser />
        </Route>
        <Route path="/new" exact>
          <NewEvent />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
