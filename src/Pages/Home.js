import React from "react";
import Utilities from "../Utilities";
import { Link } from "react-router-dom";
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';

//Render states of this component.
const LOADING = "LOADING";
const SUCCESSFULL = "SUCCESSFULL";
const QUIZNOTFOUND = "QUIZNOTFOUND";
const ERROR = "ERROR";

export default class Home extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			homeState: LOADING
		};
		this.quizState = {
			name: ""
		};
		this.renderLoading = this.renderLoading.bind(this);
		this.renderSuccessful = this.renderSuccessful.bind(this);
		this.renderQuizNotFound = this.renderQuizNotFound.bind(this);
		this.renderError = this.renderError.bind(this);
		this.setQuiz = this.setQuiz.bind(this);
		this.handleError = this.handleError.bind(this);
	}
	
	//Mount the quizname from given url to that component.
	componentDidMount(){
		Utilities.getQuiz(this.props.match.params.id)
			.then(quiz => this.setQuiz(quiz))
			.catch(error => this.handleError(error));
	}
	
	//Sets the quizname and change the render state to SUCCESSFULL if the quiz is found.
	setQuiz(quiz){
		if(quiz.val === "Quiz not found."){
			this.setState({homeState: QUIZNOTFOUND});
		}else{
			this.quizState.name = quiz.quizName;
			this.setState({homeState: SUCCESSFULL});
		}
	}
	
	handleError(error){
		this.setState({homeState: ERROR});
	}
	
	render() {
		switch(this.state.homeState){
			case LOADING:
				return this.renderLoading();
			case SUCCESSFULL:
				return this.renderSuccessful();
			case QUIZNOTFOUND:
				return this.renderQuizNotFound();
			case ERROR:
				return this.renderError();
			default:
				return null;
		}
	}
	
	renderLoading(){
		return(
			<div>
			Is Loading...
			</div>
		);
	}
	
	//Renders the Home-page.
	renderSuccessful(){
		const playLink = `/${this.props.match.params.id}/play`;
		const createLink = `/${this.props.match.params.id}/create`;
		return (	
		<Grid>
			<Row>
				<Col xs={2} sm={3} md={4}>
				</Col>
				<Col xs={8} sm={6} md={4}>
					<h2 >Welcome to {this.quizState.name}</h2>
				</Col>
				<Col xs={1} sm={3} md={4}>
				</Col>
			</Row>
			<Row>
			<br />
			<br />
			</Row>
			<Row>
				<Col xs={3} sm={3} md={4}>
				</Col>
				<Col xs={9} sm={2} md={1}>
				<Link to={playLink}><Button bsStyle="info" bsSize="large" ><Glyphicon glyph="play" /> Play Quiz</Button></Link>
				</Col>
				<Col xs={12} smHidden={true} mdHidden={true} lgHidden={true}>
				<br />
				</Col>
				<Col xs={3} sm={1}md={1}>
				</Col>
				<Col xs={9} sm={2} md={1}>
				<Link to={createLink}><Button bsStyle="warning" bsSize="large"><Glyphicon glyph="plus" /> Create Question</Button></Link>
				</Col>
				<Col xs={0} sm={3} md={4}>
				</Col>
			</Row>
		</Grid>
		);
	}
	
	renderQuizNotFound(){
		return(
			<div>
			Quiz not found. Please use another link or create a new quiz.
			</div>
		);
	}
	
	renderError(){
		return(
			<div>
			Error...
			</div>
		);
	}
}