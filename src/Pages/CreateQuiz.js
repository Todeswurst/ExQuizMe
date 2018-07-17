import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Grid,Row,Col } from "react-bootstrap";

import $ from "jquery";
import utilities from "../Utilities";

const baseURL = "https://cryptic-bastion-19060.herokuapp.com/";
const HOME = 1;
const CREATION = 2;

export default class CreateQuiz extends React.Component {
  constructor() {
    super();

    this.state = {
      creation: HOME,
      show: false,
      url: ""
    };

    this.home = this.home.bind(this);
    this.creation = this.creation.bind(this);
    this.naming = this.naming.bind(this);
    this.sendQuery = this.sendQuery.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    switch (this.state.creation) {
      case HOME:
        return this.home();
      case CREATION:
        return this.creation();
      default:
        return <div>Unknown State</div>;
    }
  }

  home() {
	const panelBodyStyle={
		whiteSpace: "normal",
		wordWrap: "break-word",
		borderBottom: "1px solid gray"
	};
	
    return (
	<Grid>
        <div>
          <Row>
            <Col xs={2} sm={3} md={4} />
            <Col xs={8} sm={8}>
              <h1>Welcome to ExQuizMe!</h1>
            </Col>
            <Col xs={2} sm={3} md={4} />
          </Row>
		  <br />
          <Row>
            <Col xs={3} sm={5} />
            <Col xs={7} sm={2} >
              <Button bsStyle="primary" bsSize="large" onClick={this.naming}>
                Create Quiz
              </Button>
            </Col>
			<Col xs={2} sm={5} />
            <Col xs={1} sm={1} md={1} />
            <Col xs={5} sm={2} md={1} />
            <Col xs={1} sm={3} md={4} />
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Quiz Created</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h1 style={panelBodyStyle}>{this.state.url}</h1>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>
          </Row>
        </div>
      </Grid>
    
    );
  }

  creation() {
    return (
       
        <Grid>
              <Row>
                <Col xs={2} sm={3} md={4} />
                <Col xs={8} sm={6}>
                  <h1>Choose a Quizname</h1> <br />
                </Col>
                <Col xs={2} sm={3} md={4} />
              </Row>
              <form>
                <Row>
                  <Col xs={12} sm={8} smOffset={2}  md={6} mdOffset={3} >
                    <label htmlFor="quiz">Name:</label>
                    <input type="text" className="form-control" id="quiz" />
                  </Col>
                </Row>
				<br />
                <Row>
				<Col xs={3} />
                  <Col xs={7} md={12} className="text-center">
                    <Button bsStyle="primary" bsSize="large" onClick={this.sendQuery}>Submit</Button>
                  </Col>
                </Row>
              </form>
        </Grid>
       
    );
  }

  naming() {
    this.setState({ creation: CREATION });
  }

  sendQuery() {
    const input = {
      quizName: $("#quiz").val()
    };
    utilities.createQuiz(input).then(val => {
      this.setState({
        show: true,
        url: baseURL + val._id,
        creation: HOME
      });
    });
  }

  handleClose() {
    this.setState({ show: false });
  }
}
