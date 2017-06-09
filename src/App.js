import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Prompt,
  Switch
} from 'react-router-dom'

const Home = () => (
  <h1>Home</h1>
)


const NotFound = () => (
  <h1>NotFound</h1>
)


const About = () => (
  <h1>About</h1>
)

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      isChanged: false
    }
  }

  render() {
    return (
      <div>
        <Prompt when={this.state.isChanged} message="Are you sure you want to leave?"/>
        <input onChange={() => {
          this.setState({
            isChanged: true
          })
        }} type="text"/>
      </div>
    )
  }
}

const Links = () => (
  <div className="list-group">
    <NavLink className="list-group-item" exact activeClassName="active" to="/">Home</NavLink>
    <NavLink className="list-group-item" activeClassName="active" to="/about">About</NavLink>
    <NavLink className="list-group-item" activeClassName="active" to="/content">Content</NavLink>
    <NavLink className="list-group-item" activeClassName="active" to="/form">Form</NavLink>
  </div>
)

const Content = () => (
  <div>
    <NavLink className="list-group-item" activeClassName="active" to="/content/city">City</NavLink>
    <NavLink className="list-group-item" activeClassName="active" to="/content/sports">Sports</NavLink>
    <div> hello before parent route</div>
    <Route path="/content/:contentName" component={ContentDetails}/>
    <div> hello after parent route</div>
  </div>
)

const ContentDetails = (props) => (
  <div>
    { props.match.params.contentName ?
      <div>
        <img src={'http://lorempixel.com/400/200/' + props.match.params.contentName + '/1/'}/>
        <NavLink className="list-group-item" activeClassName="active" to={'/content/' + props.match.params.contentName +'/NewYork'}>NewYork</NavLink>
        <NavLink className="list-group-item" activeClassName="active" to={'/content/' + props.match.params.contentName +'/cricket'}>cricket</NavLink>
        <div> hello before sub route</div>
        <Route path="/content/:contentName/:subContentName" component={SubContentDetails}/>
        <div> hello after sub route</div>

      </div>
      :
      null
    }
  </div>
)

const SubContentDetails = (props) => (
  <div>
    { props.match.params.subContentName ?
      <div>
        <img src={'http://lorempixel.com/400/200/' + props.match.params.contentName + '/2/'}/>
        <div>{props.match.params.contentName } and {props.match.params.subContentName }</div>
      </div>
      :
      null
    }
  </div>
)


const App = () => (
  <Router>
    <div className="row">
      <section className="col-sm-4">
        <Links />
      </section>

      <section className="col-sm-8">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/content" component={Content}/>
          <Route path="/form" component={Form}/>
          <Route render={() => <h1>Not Founddsadasdasd</h1>}/>
        </Switch>
      </section>

    </div>
  </Router>
)

export default App;
