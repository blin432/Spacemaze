import React,{Component} from 'react';

class Tile extends Component {
    constructor(props){
        super(props)
        this.state = {
            type : this.props.type,
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.type !== prevProps.type){
            this.setState({type : this.props.type});
        }
    }

    render(){
        let { type, pointing } = this.state
        return(
        <img src={type === 'player' ? pointing : type} 
        style={{height: 30, width: 30, backgroundColor : 'black' }} 
        alt={'tile'}/>
        )
    }
}

export default Tile