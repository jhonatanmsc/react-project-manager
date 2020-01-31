import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Home from './components/Home';
import Project from './components/Project';
import NewProject from './components/NewProject';
import EditProject from './components/EditProject';
import Activity from './components/Activity';
import NewActivity from './components/NewActivity';
import EditActivity from './components/EditActivity';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/projeto/:projectId" component={Project} />
            <Route path="/atividade/:activityId" component={Activity} />
            <Route path="/novo-projeto" component={NewProject} />
            <Route path="/nova-atividade/:projectId" component={NewActivity} />
            <Route path="/editar-projeto/:projectId" component={EditProject} />
            <Route path="/editar-atividade/:activityId" component={EditActivity} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
