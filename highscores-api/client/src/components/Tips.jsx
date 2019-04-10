import React from 'react';
import {Navbar, Nav, Row} from 'react-bootstrap';
import items from '../js/items';

const Tips = () => (

        <Navbar expand="md">
            <div className="d-md-none d-block">
                <h3 className="text-center">Tips</h3>
            </div>

            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Row className="text-center">
                            {items.map((item,i) => 
                            <div key={i} className="m-2">
                                <img src={item.img} alt="item" 
                                height={60} 
                                width={60}/>
                                <p>{item.description}</p>
                            </div>)}
                        </Row>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
)

export default Tips;


