import React, {Component} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {NavLink ,Link, withRouter} from 'react-router-dom';
import {navOpts} from '../js/navOpts.js';
import up from '../images/up.png';
import '../css/App.css';
class NavBar extends Component{

    render(){ 
      let navOptions = navOpts.filter(option => option.isLoggedIn === this.props.isLoggedIn)
        
      return(
      <Navbar bg="primary" expand="md">
        <Link to="/" >
          <img alt="rocket"
              src={up}
              width="60"
              height="60"
              style={{cursor : 'pointer'}}/>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {this.props.isLoggedIn ? <p className="m-3" 
              onClick={this.props.logout} 
              style={{color:'white', cursor : 'pointer'}}>Log Out</p> 
              : null}
              {navOptions.map((option,i) => 
              <NavLink key={i} 
              className="m-3" 
              to={option.route} 
              style={{color:'white' , textDecoration : 'none'}}>{option.name}</NavLink>)}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
  }
}

export default withRouter(NavBar);