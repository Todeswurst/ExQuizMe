import React from "react";
import PropTypes from "prop-types";
import ResultChart from "./QuizResult/ResultChart"

//Render states.
const LOADING = "LOADING";
const RESULTING = "RESULTING";

export default class QuizResult extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			resultState: LOADING
		};
		this.result = {
			right: 0,
			wrong: 0,
			notAnswered: 0	
		};
		this.calculateResult = this.calculateResult.bind(this);
		this.renderLoading = this.renderLoading.bind(this);
		this.renderResulting = this.renderResulting.bind(this);
	}
	
	componentDidMount(){
		this.calculateResult();
	}
	
	//Calculates the right, wrong and not answered questions.
	calculateResult(){
		const questions = this.props.questions;
		const answeredQuestions = this.props.answeredQuestions;
		
		for(let question of answeredQuestions){
			question.correctness ? this.result.right++ : this.result.wrong++;
		}
		
		this.result.notAnswered = questions.length - this.result.right -this.result.wrong;
		
		this.setState({resultState: RESULTING});
	}
 
	render() {
		switch(this.state.resultState){
			case LOADING:
				return this.renderLoading();
			case RESULTING:
				return this.renderResulting();
			default:
				return null;
		}
	}

	renderLoading(){
		return (
			<div>
				Loading result...
			</div>
		);
	}

	renderResulting(){
		return (
			<div>
				<ResultChart result={this.result} />
			</div>
		);
	}

}

QuizResult.propTypes = {
	questions: PropTypes.array.isRequired,
	answeredQuestions: PropTypes.array.isRequired
}
