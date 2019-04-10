import React, { Component } from 'react';
import axios from 'axios';
import { Navbar, Nav, Row, Col} from 'react-bootstrap';
import {createStore } from 'redux';
import {mainReducer} from '../reducers/main-reducer.js'
let store = createStore(mainReducer);
class Highscores extends Component {
  constructor(props){
    super(props)
    this.state = {
      scores : [],
      level : this.props.level+1,
      hasFetched:this.props.hasFetched
    }
   
    // this.levelToRender = levels.indexOf(this.props.level)+1;
}
     

  componentDidMount(e){
    axios.get('/scores/highscores')
    .then( resp => 
    this.setState({scores: resp.data.filter( score => 
    score.level === this.state.level)}))
    .catch(err => console.log(err))
  }

  componentDidUpdate(){
   
    if(this.props.level !== this.state.level){
    console.log("s")
      axios.get('/scores/highscores')
      .then( resp => 
      this.setState({level:this.props.level,
      hasFetched:true,
      scores: resp.data.filter( score => 
      score.level === this.state.level,
      )})).catch(err => console.log(err))
    }
}

// added this lifecycle because time is continuously rerendering


format(s) {
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  return `${mins}:${secs}` 
}

   
render() {
  
    let {scores , level } = this.state
    let players = scores.map((player,i) => <p key={i}>{player.username}</p>)
    let times = scores.reverse().map((score,i) => <p key={i}>{this.format(score.points)}</p>)

  return (
    <Col className="justify-content-center mt-3" style={{ margin : 0, padding: 0 }}>
      <Row className="d-none d-md-block text-center"><h3 className="m-3">Lv {level} Top 10</h3></Row>
        <Navbar expand="md" className="justify-content-between">
          <Row className="d-md-none d-block text-center"><h3 className="m-3">Lv {level} Top 10</h3></Row>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <Row className="justify-content-between text-center">
                    <Col>
                      <h5 style={{textDecoration:'underline'}}>Player</h5>
                      {players}
                    </Col>
                    <Col>
                      <h5 style= {{textDecoration:'underline'}}>Time</h5>
                      {times.slice(0,10)}
                    </Col>
                  </Row>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Col>);
        }
      }

export default Highscores;


