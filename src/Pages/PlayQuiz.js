import React from "react";
import Utilities from "../Utilities";
import Question from '../Components/PlayQuiz/Question';
import QuestionResult from '../Components/PlayQuiz/QuestionResult';
import QuizResult from '../Components/PlayQuiz/QuizResult';
import { Button, Glyphicon, Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

//Render states.
const LOADING = "LOADING";
const QUESTIONING ="QUESTIONING";
const QUESTIONRESULTING = "QUESTIONRESULTING";
const QUIZRESULTING = "QUIZRESULTING";
const NOQUIZFOUND = "NOQUIZFOUND";
const ERROR = "ERROR";

export default class PlayQuiz extends React.Component {
	constructor() {
		super();
		this.state = {
			playQuizState: LOADING,
			questionPointer: 0
		};
		
		this.quizState = {
			questions: [],
			answerSelected: false,
			answeredQuestions: []
		};
		
		//The current clicked answeres are be saved in here.
		this.currentQuestionState = {
			questionId: 0,
			answers: 0,
			correctness: false
		};
		
		this.renderLoading = this.renderLoading.bind(this);
		this.renderQuestion = this.renderQuestion.bind(this);
		this.renderQuestionResult = this.renderQuestionResult.bind(this);
		this.renderQuizResult = this.renderQuizResult.bind(this);
		this.renderNoQuizFound = this.renderNoQuizFound.bind(this);
		this.renderLoadingError = this.renderLoadingError.bind(this);
		this.setQuestions = this.setQuestions.bind(this);
		this.handleError = this.handleError.bind(this);
		this.checkQuestionAnswers = this.checkQuestionAnswers.bind(this);
		this.submitQuestion = this.submitQuestion.bind(this);
		this.skipQuestion = this.skipQuestion.bind(this);
		this.handleAnswerSelection = this.handleAnswerSelection.bind(this);
		this.checkMultipleAnswer = this.checkMultipleAnswer.bind(this);
		this.playQuizAgain = this.playQuizAgain.bind(this);
	}
	
	//Mount ten random question from a spicific quiz to that component.
	componentDidMount(){
		Utilities.getQuestions(this.props.match.params.id)
			.then(questions => this.setQuestions(questions))
			.catch(error => this.handleError(error));
	}
	
	//Sets the ten questions got from the API request.
	setQuestions(questions){
		if(questions.val === "Quiz not found."){
			this.setState({playQuizState: NOQUIZFOUND});
		}
		else{
			this.quizState.questions = questions;
			this.setState({playQuizState: QUESTIONING});
		}
	}
	
	handleError(error){
		this.setState({playQuizState: ERROR});
	}
	
	//Checks the correctness of the answers and sets the correctness value.
	checkQuestionAnswers(){
		if(typeof this.currentQuestionState.answers === "number"){
			if(this.quizState.questions[this.state.questionPointer].answers[this.currentQuestionState.answers].correctness){
				this.currentQuestionState = {
					questionId: this.quizState.questions[this.state.questionPointer].id, 
					correctness: true,
					answers: this.currentQuestionState.answers
				};
			}
			else {
				this.currentQuestionState ={
					questionId: this.quizState.questions[this.state.questionPointer].id, 
					correctness: false,
					answers: this.currentQuestionState.answers
					};
			}
		}
		else if(typeof this.currentQuestionState.answers === "object"){
			this.currentQuestionState = {
					questionId: this.quizState.questions[this.state.questionPointer].id, 
					correctness: this.checkMultipleAnswer(),
					answers: this.currentQuestionState.answers
				};
		}
	}
	
	//Checks multiple-answer questions.
	checkMultipleAnswer(){
		let correctness = true;
		for(let [index, value] of this.quizState.questions[this.state.questionPointer].answers.entries()){
			if(value.correctness === true){
				if(this.currentQuestionState.answers.includes(index) === false){
					correctness = false;
				}
			}
			
		}
		return correctness;
	}
	
	//Submits a question answer and pushes it in an array.
	submitQuestion(){
		if(this.quizState.answerSelected){
			this.checkQuestionAnswers();
			this.quizState.answeredQuestions.push(this.currentQuestionState);
			this.setState({playQuizState: QUESTIONRESULTING});
			this.quizState.answerSelected = false;
		}
	}
	
	skipQuestion(){
		if(this.state.questionPointer < this.quizState.questions.length-1){
			this.setState({
				questionPointer: this.state.questionPointer+1,
				playQuizState: QUESTIONING
			});
		}
		else if(this.state.questionPointer === this.quizState.questions.length-1){
			this.setState({
				playQuizState: QUIZRESULTING
			});
		}
	}
	
	//Event handler for the answer selection.
	handleAnswerSelection(e){
		this.currentQuestionState.answers = e;
		this.quizState.answerSelected = true;
	}
	
	//Function to play the quiz again with the same questions.
	playQuizAgain(){
		this.setState({
			playQuizState: QUESTIONING,
			questionPointer:0 
			});
		this.quizState.answerSelected = false;
		this.quizState.answeredQuestions.length = 0;
		this.currentQuestionState = {
			questionId: 0,
			answers: 0,
			correctness: false
		};
	}
	
	render() {
		switch(this.state.playQuizState){
			case LOADING:
				return this.renderLoading();
			case QUESTIONING:
				return this.renderQuestion();
			case QUESTIONRESULTING:
				return this.renderQuestionResult();
			case QUIZRESULTING:
				return this.renderQuizResult();
			case NOQUIZFOUND:
				return this.renderNoQuizFound();
			case ERROR:
				return this.renderLoadingError();
			default:
				return (
				<div>
					There is a failure!
				</div>
				);
		}
	}
  
	renderLoading(){
		return (
			<div>
			Loading...
			</div>
		);
	}
  
	renderQuestion(){
		return (
			<Grid>
				<Row>
					<Question 
						questionData={this.quizState.questions[this.state.questionPointer]}
						handleAnswerSelection={this.handleAnswerSelection}
					/>
				</Row>
				<Row>
					<br />
					<br />
				</Row>
				<Row>
				 <Col xs={1} sm={3} md={4}>
					</Col>
					<Col xs={4} sm={2} md={1}>
						<Button bsStyle="primary" onClick={this.submitQuestion}><Glyphicon glyph="ok" /> Submit</Button>
					</Col>
					<Col xs={1} sm={1}md={1}>
					</Col>
					<Col xs={5} sm={2} md={1}>
				<Button onClick={this.skipQuestion}><Glyphicon glyph="arrow-right" /> Skip</Button>
					</Col>
				</Row>
			</Grid>
		);
	}
	
	renderQuestionResult(){
		return (
			<Grid>
				<Row>
				<QuestionResult
					quizId={this.quizState.questions[this.state.questionPointer].id}
					questionData={this.quizState.questions[this.state.questionPointer]}
					answers={this.currentQuestionState}
				/>
				</Row>
				<Row>
				<br />
				</Row>
				<Row>
					<Col xs={3} sm={5}>
					</Col>
					<Col xs={4} sm={2}>
						<Button onClick={this.skipQuestion}><Glyphicon glyph="arrow-right" /> Continue</Button>
					</Col>
					<Col xs={3} sm={5}>
					</Col>
				</Row>
			</Grid>
		);
	}
	
	renderQuizResult(){
		const homeLink = `/${this.props.match.params.id}`;
		return (
			<Grid>
				<Row>
					<QuizResult 
						questions={this.quizState.questions}
						answeredQuestions = {this.quizState.answeredQuestions}
					/>
				</Row>
				<Row>
					<br />
				</Row>
				<Row>
					<Col xs={1} sm={3} md={4}>
					</Col>
					<Col xs={4} sm={2} md={1}>
						<Button bsStyle="info" onClick={this.playQuizAgain}><Glyphicon glyph="play-circle" /> Review Play</Button>
					</Col>
					<Col xs={1} sm={1}md={1}>
					</Col>
					<Col xs={5} sm={2} md={1}>
						<Link to={homeLink}><Button><Glyphicon glyph="share-alt" /> Finish</Button></Link>
					</Col>
					<Col xs={1} sm={3} md={4}>
					</Col>
				</Row>
			</Grid>
		);
	}
	
	renderNoQuizFound(){
		return (
			<div>
				No Quiz or Question found. Please create a Quiz and insert Questions.
			</div>
		);
	}
	
	renderLoadingError(){
		return (
			<div>
				Loading ERROR
			</div>
		);
	}
}