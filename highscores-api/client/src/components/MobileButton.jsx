import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import '../css/MobileButton.css'
class MobileButton extends Component {
      constructor(props){
        super(props)
        this.state={}
      }

render(){
  return(
    <div className="mobile" style={{opacity : '0.3'}}>
      <Row className="pt-4 d-flex justify-content-center" >
          <img alt="button"
          style={{height:"100px", witdh:"100px"}}
          src="https://www.shareicon.net/data/128x128/2016/11/09/851194_arrows_512x512.png" 
          onClick={(e) => this.props.move({keyCode:38})}></img>
      </Row>
      <Row className="d-flex justify-content-center">
        <img alt="button" 
        className="mr-5" 
        style={{height:"100px", witdh:"100px"}} 
        src="https://www.shareicon.net/data/128x128/2016/11/09/851210_arrows_512x512.png" 
        onClick={(e) => this.props.move({keyCode:37})}></img>
        <img  alt="button" 
        className="ml-5" 
        style={{height:"100px", witdh:"100px"}} 
        src="https://www.shareicon.net/data/128x128/2016/11/09/851191_arrows_512x512.png" 
        onClick={(e) => this.props.move({keyCode:39})}></img>
      </Row>
      <Row className="pb-4 d-flex justify-content-center">
        <img alt="button" 
        style={{height:"100px", witdh:"100px"}} 
        src="https://www.shareicon.net/data/128x128/2016/11/09/851184_multimedia_512x512.png" 
        onClick={(e) => this.props.move({keyCode:40})} ></img>
      </Row>
    </div>
    )
  }
}

export default MobileButton;
