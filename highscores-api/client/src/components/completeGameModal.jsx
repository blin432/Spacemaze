import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';

class CompleteGameModal extends Component {
    render() {
      return (
        <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter" className="text-center">
          <Modal.Header closeButton>
            <Modal.Title className="text-center" id="contained-modal-title-vcenter">You did it !</Modal.Title>
              </Modal.Header>
                {/* <Modal.Body>
                  <Container>
                  </Container>
                </Modal.Body> */}
              <Modal.Footer>
            <Link to="/"><Button onClick={this.props.onHide}>Noice!</Button></Link>
          </Modal.Footer>
        </Modal>
      );
    }
  }

  export default withRouter(CompleteGameModal);