import React from "react";
import CreateTrueFalse from "../Components/CreateQuestion/CreateTrueFalse";
import CreateMultipleChoice from "../Components/CreateQuestion/CreateMultipleChoice";
import CreateMultipleAnswers from "../Components/CreateQuestion/CreateMultipleAnswers";
import { ButtonToolbar, DropdownButton, MenuItem, Button, Grid, Row, Col, Modal, Glyphicon } from "react-bootstrap";
import { Link } from "react-router-dom";
import Utilities from '../Utilities';

const TRUEFALSE = "TrueFalse";
const MULTIPLECHOICE = "MultipleChoice";
const MULTIPLEANSWERS = "MultipleAnswers";

export default class CreateQuestion extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			dropdownState: TRUEFALSE,
			questionText: "",
			questionValidation: null,
			answerContent: [],
			answerValidation: null,
			explanationText: "",
			explanationValidation: null,
			show: false
		}
		this.handleDropdown = this.handleDropdown.bind(this);
		this.renderDropdown = this.renderDropdown.bind(this);
		this.renderTrueFalse = this.renderTrueFalse.bind(this);
		this.renderMultipleChoice = this.renderMultipleChoice.bind(this);
		this.renderMultipleAnswers = this.renderMultipleAnswers.bind(this);
		this.renderPopup = this.renderPopup.bind(this);

		this.question = this.question.bind(this);
		this.explanation = this.explanation.bind(this);
		this.answer = this.answer.bind(this);

		this.submit = this.submit.bind(this);
		this.validator = this.validator.bind(this);
		this.reset = this.reset.bind(this);
		this.handleClose = this.handleClose.bind(this);
		
	}
	
	handleDropdown(e){
		switch(e){
			case TRUEFALSE:
				this.setState({dropdownState: TRUEFALSE});
				break;
			case MULTIPLECHOICE:
				this.setState({dropdownState: MULTIPLECHOICE});
				break;
			case MULTIPLEANSWERS:
				this.setState({dropdownState: MULTIPLEANSWERS});
				break;
			default:
		}
	}

	reset(){
		this.setState({ 
			questionText: "",
			questionValidation: null,
			answerContent: [],
			answerValidation: null,
			explanationText: "",
			explanationValidation: null,
			show: false
		});
		this.state.questionText="";
	}
	
	render() {
		const homeLink = `/${this.props.match.params.id}`;
		this.renderDropdown();
		switch(this.state.dropdownState){
			case TRUEFALSE:
				return this.renderTrueFalse(homeLink);
			case MULTIPLECHOICE:
				return this.renderMultipleChoice(homeLink);
			case MULTIPLEANSWERS:
				return this.renderMultipleAnswers(homeLink);
			default:
				return null;
		}
	}
	
	renderDropdown(){
		return (
			<Grid>
			<Row>
			<Col>
			<ButtonToolbar>
				<DropdownButton   
					onSelect={this.handleDropdown}
					bsStyle={"default"}
					title={this.state.dropdownState}
					key={1}
					id={`dropdown-basic-1`}
				>
					<MenuItem  eventKey={TRUEFALSE} active={this.state.dropdownState === TRUEFALSE ? true : false}>True False</MenuItem>
					<MenuItem eventKey={MULTIPLECHOICE} active={this.state.dropdownState === MULTIPLECHOICE ? true : false}>Multiple Choice</MenuItem>
					<MenuItem eventKey={MULTIPLEANSWERS}active={this.state.dropdownState === MULTIPLEANSWERS ? true : false}>Multiple Answers</MenuItem>
				</DropdownButton>
			</ButtonToolbar>
			</Col>
			</Row>
			</Grid>
		);
	}
	
	renderTrueFalse(homeLink){
		return (
			<Grid>
				<Row>
					{this.renderDropdown()}
				</Row>
				<CreateTrueFalse 
					reset={this.reset} 
					questionValidation={this.state.questionValidation} 
					answerValidation={this.state.answerValidation} 
					explanationValidation={this.state.explanationValidation} 
					question={this.question} 
					explanation={this.explanation} 
					answer={this.answer} 
				/>
				<Row>
					<Col mdPull={6}  md={5}>
					</Col>
					<Col xs={6}  md={1}>
						<Button bsStyle="primary" type="submit" onClick={this.submit}>Submit</Button>
					</Col>
					<Col xs={1} sm={1}md={1}>
						<Link to={homeLink}><Button type="submit">Cancel</Button></Link>
					</Col>
					<Col xs={5} sm={2} md={1}>
					</Col>
					<Col xs={1} sm={3} md={4}>
					</Col>
				</Row>	
				{this.renderPopup(homeLink)}	
			</Grid>
		);
	}
	
	renderMultipleChoice(homeLink){
		return (
			<Grid>
				<Row>
				{this.renderDropdown()}
				</Row>
				<CreateMultipleChoice 
					reset={this.reset} 
					questionValidation={this.state.questionValidation} 
					answerValidation={this.state.answerValidation} 
					explanationValidation={this.state.explanationValidation} 
					question={this.question} 
					explanation={this.explanation} 
					answer={this.answer} 
				/>
				<Row>
					<Col mdPull={6}  md={5}>
					</Col>
					<Col xs={6}  md={1}>
						<Button bsStyle="primary" type="submit" onClick={this.submit}>Submit</Button>
					</Col>
					<Col xs={1} sm={1}md={1}>
						<Link to={homeLink}><Button type="submit">Cancel</Button></Link>
					</Col>
					<Col xs={5} sm={2} md={1}>
					</Col>
					<Col xs={1} sm={3} md={4}>
					</Col>
				</Row>	
				{this.renderPopup(homeLink)}	
			</Grid>
		);
	}
	
	renderMultipleAnswers(homeLink){
		return (
			<Grid>
				<Row>
					{this.renderDropdown()}
				</Row>
				<CreateMultipleAnswers 
					reset={this.reset} 
					questionValidation={this.state.questionValidation} 
					answerValidation={this.state.answerValidation} 
					explanationValidation={this.state.explanationValidation} 
					question={this.question} 
					explanation={this.explanation} 
					answer={this.answer} 
				/>
				<Row>
					<Col mdPull={6}  md={5}>
					</Col>
					<Col xs={6}  md={1}>
						<Button bsStyle="primary" type="submit" onClick={this.submit}>Submit</Button>
					</Col>
					<Col xs={1} sm={1}md={1}>
						<Link to={homeLink}><Button type="submit">Cancel</Button></Link>
					</Col>
					<Col xs={5} sm={2} md={1}>
					</Col>
					<Col xs={1} sm={3} md={4}>
					</Col>
				</Row>
				{this.renderPopup(homeLink)}				 	 
				</Grid>
			);
	}

	renderPopup(homeLink){
		return (
			<Row>
            <Col xs={5} sm={2} md={5} />
            <Col xs={1} sm={1} md={1} />
            <Col xs={5} sm={2} md={1} />
            <Col xs={1} sm={3} md={4} />
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Question Created!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h1>Go and play the quiz to see your question in action!</h1>
              </Modal.Body>
              <Modal.Footer>
			  <Link to={homeLink}><Button bsStyle="primary" type="submit"><Glyphicon glyph="home" /> Home</Button></Link>
              </Modal.Footer>
            </Modal>
          </Row>
		);
	}

	submit(){
		this.setState({
			show: true
		  });
		let error = false;
		this.setState({ 
			questionValidation: null,
			answerValidation: null, 
			explanationValidation: null
		});
		const question = {
			question: this.state.questionText,
			answers: this.state.answerContent,
			explanation: this.state.explanationText
		};
		if(question.question === ""){
			this.setState({ questionValidation: "error" })
			error = true;
		}
		if(question.answers.length === 0){
			this.setState({ answerValidation: "error" })
			error = true;
		} 
		if(question.explanation === ""){
			this.setState({ explanationValidation: "error" })
			error = true;
		}
		if(error === true){
			return;
		}
		const payload = {};
		payload.name = question.question;
		payload.type = this.state.dropdownState;
		payload.explanation = question.explanation;
		payload.answers = question.answers;
		Utilities.createQuestion(this.props.match.params.id, payload).then(res => { console.log(res) }).catch(error => { console.log(error) });
	}

	validator(value, field){
		switch(field){
			case "question":
			this.setState({questionText: value });
			break;
			case "answer":
			this.setState({answerContent: value });
			break;
			case "explanation":
			this.setState({explanationText: value });
			break;
			default:
			console.log("Unknown validation text.");
		}
	}

	question(e){
		const text = e.target.value;
		this.validator(text, "question");
	}
	explanation(e){
		const text = e.target.value;
		this.validator(text, "explanation");
	}
	answer(e){
		let content = [];
		if(this.state.dropdownState === TRUEFALSE){
			if(e.target.labels[0].textContent === "True"){
				content = [
					{
						"text": "True",
						"correctness": true
					},
					{
						"text": "False",
						"correctness": false
					}
				]
			} else {
				content = [
					{
						"text": "True",
						"correctness": false
					},
					{
						"text": "False",
						"correctness": true
					}
				]
			}
		} else {
			content = [
				{
					"text": e["1"].text,
					"correctness": e["1"].correctness
				},
				{
					"text": e["2"].text,
					"correctness": e["2"].correctness
				},
				{
					"text": e["3"].text,
					"correctness": e["3"].correctness
				},
				{
					"text": e["4"].text,
					"correctness": e["4"].correctness
				}
			]
			content.forEach(answer => {
				if(answer.text === ""){
					content = [];
				}
			});
			const checkCorrectness = content.map(answer => { return answer.correctness })
			if(!checkCorrectness.includes(true)){
				content = [];
			}
		}
		this.validator(content, "answer");
	}
	handleClose(homeLink) {
		this.reset();
		// this.setState({ show: false });
		
	}
}
