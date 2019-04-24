import React, {Component} from 'react';
import {Container, Row, Col, Modal, Button} from 'react-bootstrap';
import {items} from '../js/items';

class RulesModal extends Component {
    render() {
      return (
        <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter" className="text-center">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Space Maze tips</Modal.Title>
              </Modal.Header>
                <Modal.Body>
                  <Container>
                    <Row className="show-grid">
                      {items.map((item,i) => <Col key={i} 
                      xs={12} 
                      md={12}>
                        <img className="m-2" 
                        src={item.img} 
                        height="50" 
                        width="50" 
                        alt="img"/>
                      <br></br>{item.description}
                      </Col>)}
                    </Row>
                  </Container>
                </Modal.Body>
              <Modal.Footer>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
  export default RulesModal;