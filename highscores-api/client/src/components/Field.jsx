import React,{Component} from 'react';
import {Container, Row, Col,} from 'react-bootstrap';
import Player from './Player.jsx';
import '../css/App.css';
import finish from '../images/finishline.gif';
import up from '../images/up.png'
import down from '../images/down.png'
import left from '../images/left.png'
import right from '../images/right.png'
import {levels} from '../js/maps.js';
import Tile from './Tile.jsx';
import rock from '../images/Boundary.png';
import space from '../images/space.jpg';
import axios from 'axios';
import Highscores from './Highscores.jsx';
import MobileButton from './MobileButton.jsx';
import '../css/MobileButton.css'
import Tips from './Tips.jsx';
import ms from 'pretty-ms';
import {createStore } from 'redux';
import {mainReducer} from '../reducers/main-reducer.js'
import clock from '../images/clock.png'
import wormhole from '../images/wormhole.gif'
import CompleteGameModal from './completeGameModal.jsx';

let store = createStore(mainReducer);
class Field extends Component {
    constructor(props){
        super(props)
        this.state = {...store.getState()}
        this.startTimer = this.startTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
    }  
              
    componentDidMount(){
        document.addEventListener("keydown", (e) => this.move(e));
        store.dispatch({type:"START_GAME"})  
        this.setState({...store.getState()})  
    }
    
    componentWillUnmount() {
        document.removeEventListener("keydown", (e) => this.move(e));
    }

    postHighScore(){
        let {username} = this.state;
        let time = this.state.time/1000;
        let currentLevel = levels.indexOf(this.state.level)+1;
        axios.post('/scores/record',{points:time,username:username,level:currentLevel})
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
    }

    startTimer() {
        this.setState({
          isOn: true,
          time: this.state.time,
          start: Date.now() - this.state.time
        })
        this.timer = setInterval(() => this.setState({
          time: Date.now() - this.state.start
        }), 1);
      }

    stopTimer() {
        this.setState({isOn: false})
        clearInterval(this.timer)
      }

    resetTimer() {
        this.setState({time: 0, isOn: false})
      }


    calculateNewPosition(movement,pointTo){
        let updatedGrid = [...this.state.grid]
        let endPosition = this.state.myPosition+movement;
        switch(updatedGrid[endPosition]){
            case rock :
                return
            case space :
                if(this.state.grid.indexOf(Player) === this.state.level.indexOf(Player)){
                    this.startTimer()
                }
                return store.dispatch({type:"MOVE", movement , pointTo})
            case wormhole:
                store.dispatch({type:"TELEPORT"})
                this.setState({...store.getState()})  
                return
            case clock:
                store.dispatch({type:"SAVE_TIME" , 
                clockTile : endPosition, 
                currentPosition: this.state.myPosition,
                currentTime: this.state.time})
                this.setState({...store.getState()})  
                return
            case finish :
                let currentLevel = levels.indexOf(this.state.level);
                if(currentLevel === 4){
                    this.stopTimer()
                    store.dispatch({type: "BEAT_GAME"})
                    this.setState({...store.getState()})
                }else{
                    this.postHighScore()
                    clearInterval(this.timer);
                    store.dispatch({type: "LEVEL_UP"})
                    // this.setState({hasFetched:false})
                    this.setState({...store.getState()}) }
                return 
                default:
                    return
            }
        }

    
    move({keyCode}){
        switch( keyCode ) {
            case 37:
                if(this.state.myPosition % 5 === 0){
                    return
                }
                this.calculateNewPosition(-1,left);
                this.setState({...store.getState()})  
                break;
            case 38:
                if(this.state.myPosition -5 < 0 ){
                    return
                }
                this.calculateNewPosition(-5,up)
                this.setState({...store.getState()})  
                break;
            case 39:
                for(let i = this.state.myPosition; i >= 4; i-=5){
                    if(i === 4 ){ 
                        return
                    }
                }
                this.calculateNewPosition(+1,right)
                this.setState({...store.getState()})  
                break;
            case 40:
                if(this.state.myPosition + 5 > this.state.grid.length){
                    return
                }
                this.calculateNewPosition(+5,down)
                this.setState({...store.getState()})  
                break;
            default: 
                break;
        }
    }
    
    render(){

            let level= levels.indexOf(this.state.level)+1;
            let modalClose = () => this.setState({ modalShow: false });
            let field = this.state.grid.map((tile,i) => 
            <Col key={i} style={{margin : '5px'}}>
            {tile === Player ? <Player pointing={this.state.pointing}/> : <Tile type={tile}/>}</Col>)
                
        return(
        <Container>
            <div className="text-center m-3">
                <h3>Your Time: {ms(this.state.time)}</h3>
            </div>
                <Row style={{margin : 0, padding: 0}}>
                    <Col className="justify-content-center mt-3" 
                        sm={12} 
                        md={{size:3}} 
                        style={{ margin : 0, padding: 0}}>
                        <div className="d-none d-md-block" >
                            <h3 className="text-center">Tips</h3>
                        </div>
                        
                        <Tips/>

                        <div className="d-md-none">
                            {/* <Highscores level={level}/> */}
                        </div>
                    </Col>

                    <Container style={{maxWidth: 400, backgroundColor : 'black'}}>
                        <Row>{field}</Row >
                    </Container>
                
                    <Col sm={12} md={3}>
                        <div className="d-none d-md-block" >
                            <Highscores level={level} hasFetched={this.state.hasFetched}/>
                        </div>
                    </Col>
                </Row>
                <CompleteGameModal show={this.state.modalShow} onHide={modalClose}/>
            <div className="d-md-none" style={{marginTop : '-800px'}}>
                <MobileButton move={this.move.bind(this)}/>
            </div>
        </Container>
        )
    }
}

export default Field;

    
            
        



