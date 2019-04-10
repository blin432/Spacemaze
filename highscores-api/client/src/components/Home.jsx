import React, {Component} from 'react';
import '../css/App.css';
import { Button,Jumbotron } from 'react-bootstrap';
import background from '../images/spaceBackground.gif';
import RulesModal from './RulesModal.jsx';

class Home extends Component{
  state={ modalShow : false }

    render(){    
        
         let modalClose = () => this.setState({ modalShow: false });

        return (
            <Jumbotron className="mb-0" style={{backgroundImage : `url(${background})`,backgroundSize:'cover',backgroundPosition:'center', height: '100%', marginTop: '-10px'}}>
              <h1 style={{color:'white'}}>Space Maze</h1>
              <p style={{color:'white'}}>See how fast you can beat each level and climb your way up the leaderboard</p>
              <Button variant="primary" 
              onClick={() => this.setState({ modalShow: true })}>Rules</Button>
              <RulesModal show={this.state.modalShow} 
              onHide={modalClose}/>
          </Jumbotron>
          );
        }
      }

export default Home;