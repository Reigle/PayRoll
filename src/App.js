import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'
import DataInput from './View/DataInput';
import Result from './View/Result';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path='/' component={DataInput}/>
            <Route path='/Result' component={Result}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;