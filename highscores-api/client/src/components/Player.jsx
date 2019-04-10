import React, {Component} from 'react';
import '../css/App.css';

class Player extends Component{
        state = {
            pointing: this.props.pointing,
        }

    componentDidUpdate(prevProps){
        if(this.props.pointing !== prevProps.pointing){
            this.setState({pointing : this.props.pointing});
        }
    }

    render(){
        return(
            <img src={this.state.pointing} 
            style={{height: 30, width: 30}} 
            alt={'rocket'}/>
        )
    }
}

export default Player;