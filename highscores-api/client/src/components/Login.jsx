import React, { Component } from 'react';
import axios from 'axios';
import { Button,Form,Container,Row,Col,Alert } from 'react-bootstrap';
import {withRouter } from 'react-router-dom';
class Login extends Component {
    state={
      username: '',
      password: '',
      errMsg: ''
    }

  login(e){
    e.preventDefault()
    let { username, password } = this.state
    if(username < 1 || password < 1){
      this.setState({errMsg : 'Please fill in both input fields'})
      return
    }else{
      axios.post('/users/login', { username, password})
      .then(() => this.props.signin())
      .catch(() => this.setState({errMsg:'user not found'}))
    }
  }

  handleUsernameInput(input){
    this.setState({username: input})
  }

  handlePasswordInput(input){
    this.setState({password: input})
  }


  render() {

  let {errMsg} = this.state

  return (
    <Container className="text-center" style={{maxWidth: '400px'}}>
      <Row>
        <Col>
          <h3 className="mt-5">Log In</h3>
          {errMsg ? <Alert variant="danger">{errMsg}</Alert> : null }

          <Form onSubmit={(e) => this.login(e)}>

            <Form.Group >
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" value={this.state.username}  onChange={(e) => this.handleUsernameInput(e.target.value)}/>
            </Form.Group>

            <Form.Group >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={this.state.password} onChange={(e) => this.handlePasswordInput(e.target.value)} />
            </Form.Group>

            <div className="d-flex justify-content-center" >
              <Button style={{display:"block"}} className = "m-2" variant="primary" type="submit"> Log In</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    );
  }
}

export default withRouter(Login);

