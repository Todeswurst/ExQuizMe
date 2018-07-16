import React from "react";
import PropTypes from "prop-types";
import { ButtonToolbar, ToggleButtonGroup, ToggleButton, Grid } from "react-bootstrap";

export default class Question extends React.Component {
	
	constructor(props){
		super(props);
		this.buttonStyle={
			whiteSpace: "normal",
			wordWrap: "break-word"
		};
		this.renderTrueFalse = this.renderTrueFalse.bind(this);
		this.renderMultipleChoice = this.renderMultipleChoice.bind(this);
		this.renderMultipleAnswer = this.renderMultipleAnswer.bind(this);
	}
	
	renderTrueFalse(){
		
		return (
			<Grid>
				<h2>True or False</h2>
				<br />
				<h3>{this.props.questionData.name}</h3>
				<br />
				<br />
				<ButtonToolbar>
					<ToggleButtonGroup
					justified
					type="radio" 
					onChange={this.props.handleAnswerSelection}
					name="options"
					>
					  <ToggleButton style={this.buttonStyle} bsSize="large" value={0}>True</ToggleButton>
					  <ToggleButton style={this.buttonStyle} bsSize="large" value={1}>False</ToggleButton>
					</ToggleButtonGroup>
				</ButtonToolbar>
			</Grid>
		);
	}
	
	renderMultipleChoice(){
		
		return (
			<Grid>
				<h2>Multiple Choice</h2>
				<br />
				<h3>{this.props.questionData.name}</h3>
				<br />
				<ButtonToolbar>
					<ToggleButtonGroup 
					vertical
					block
					type="radio" 
					onChange={this.props.handleAnswerSelection}
					name="options" 
					>
					  <ToggleButton style={this.buttonStyle} bsSize="large" value={0}>
						  {this.props.questionData.answers[0].text}
					  </ToggleButton>
					  <ToggleButton style={this.buttonStyle} bsSize="large" value={1}>
						  {this.props.questionData.answers[1].text}
					  </ToggleButton>
					  <ToggleButton style={this.buttonStyle} bsSize="large" value={2}>
						  {this.props.questionData.answers[2].text}
					  </ToggleButton>
					  <ToggleButton style={this.buttonStyle} bsSize="large" value={3}>
						  {this.props.questionData.answers[3].text}
					  </ToggleButton>
					</ToggleButtonGroup>
				</ButtonToolbar>
			</Grid>
		);
	}

	renderMultipleAnswer(){
		
		return (
			<Grid>
				<h2>Multiple Answers</h2>
				<br />
				<h3>{this.props.questionData.name}</h3>
				<br />
				<ButtonToolbar>
					<ToggleButtonGroup
					vertical
					block
					type="checkbox"
					onChange={this.props.handleAnswerSelection}
					>
					  <ToggleButton style={this.buttonStyle} bsSize="large" value={0}>
						  {this.props.questionData.answers[0].text}
					  </ToggleButton>
					  <ToggleButton style={this.buttonStyle} bsSize="large" value={1}>
						  {this.props.questionData.answers[1].text}
					  </ToggleButton>
					  <ToggleButton style={this.buttonStyle} bsSize="large" value={2}>
						  {this.props.questionData.answers[2].text}
					  </ToggleButton>
					  <ToggleButton style={this.buttonStyle} bsSize="large" value={3}>
						  {this.props.questionData.answers[3].text}
					  </ToggleButton>
					</ToggleButtonGroup>
				</ButtonToolbar>
			</Grid>
		);
	}
 
	render() {
		if(this.props.questionData.type === "TrueFalse")
			return this.renderTrueFalse();
		else if(this.props.questionData.type === "MultipleChoice")
			return this.renderMultipleChoice();
		else if(this.props.questionData.type === "MultipleAnswer")
			return this.renderMultipleAnswer();
		else{
			return (
				<div>
					Failuere!!!
				</div>
			);
		}
	}
  
}

Question.propTypes = {
	questionData: PropTypes.object.isRequired,
	handleAnswerSelection: PropTypes.func.isRequired
}