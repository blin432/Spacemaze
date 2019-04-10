import React, { Component } from 'react';
import axios from 'axios';
import { Button,Form,Container,Row,Col,Alert } from 'react-bootstrap';
import { NavLink, withRouter } from 'react-router-dom';

class SignUp extends Component {
    state={
      username: '',
      password: '',
      errMsg: ''
    }

  signUp(e){
    e.preventDefault()
    let { username, password } = this.state
    if(username < 1 || password < 1){
      this.setState({errMsg:'Please fill in both input fields'})
      return
    }else if(password.length < 8){
      this.setState({errMsg:'Password must be at least 8 characters'})
      return
    }else{
      axios.post('/users/register', { username, password})
      .then((response) => {console.log(response)})
          .then(()=> axios.post('/users/login',{ username, password}))
            .then(() => this.props.signin())
            .catch((err) => console.log(err))
      .catch((err)=> console.log(err));
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
      <Container className="text-center" xs={12} md={{ size: 4, offset: 8 }}  style={{maxWidth: '400px'}}>
        <Row>
          <Col className="mt-5">
            <h3 className="mb-5">Sign Up</h3>
              {errMsg ? <Alert variant="danger">{this.state.errMsg}</Alert> : null }
               <Form onSubmit={(e) => this.signUp(e)}>
                  <Form.Group >
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" value={this.state.username}  onChange={(e) => this.handleUsernameInput(e.target.value)}/>
                  </Form.Group>

                  <Form.Group >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={this.state.password} onChange={(e) => this.handlePasswordInput(e.target.value)} />
                  </Form.Group>

                  <Button className="m-4" type="submit">Register</Button>
                  <p className= "m-1">Already a Member?</p>
                  <NavLink to="/showLogIn"><Button variant="primary">Login</Button></NavLink> 
                </Form> 
         </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SignUp);
