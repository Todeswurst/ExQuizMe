import React from "react";
import PropTypes from "prop-types";
import { Panel, Glyphicon } from "react-bootstrap";
import Colors from "../../../Colors";

export default class Solution extends React.Component {
	
	constructor(props){
		super(props);
		this.renderRightAnswers = this.renderRightAnswers.bind(this);
	}
	
	//Function to render the array of right answers.
	renderRightAnswers(){
		let key = 0;
		const answerStyle={
			whiteSpace: "normal",
			wordWrap: "break-word",
			borderBottom: "1px solid gray"
		};
		const answers = this.props.questionData.answers.map(function(answer){ 
			if(answer.correctness){
				return <Panel.Body key={key++} style={answerStyle}>{answer.text}</Panel.Body>
			}
			return null;
		});
		return (
			<div>{answers}</div>
		);
	}
	
	render() {
		const rightStyle = {
			backgroundColor: Colors.green,
			color: "white"
		};
		const wrongStyle = {
			backgroundColor: Colors.red,
			color: "white"
		};
		const containerStyle ={
			overflowY: "auto",
			maxHeight: "200px"
		};
		const answerStyle={
			whiteSpace: "normal",
			wordWrap: "break-word",
			borderBottom: "1px solid gray"
		};
		
		return (
			<div>
				<h3>{this.props.questionData.name}</h3>
				<br />
				<Panel  defaultExpanded>
					<Panel.Heading>
						<Panel.Toggle componentClass="div">Solution <Glyphicon glyph="sort" /></Panel.Toggle>
					</Panel.Heading>
					<Panel.Collapse >
						<div style={containerStyle}>
						{this.renderRightAnswers()}
						<Panel.Body style={answerStyle}>
						Explanation: {this.props.questionData.explanation}
						</Panel.Body>
						</div>
						<Panel.Footer style={this.props.answers.correctness ? rightStyle : wrongStyle}>
						Your answer was {this.props.answers.correctness ? "right" : "wrong"}.
						</Panel.Footer>
					</Panel.Collapse>
				</Panel>
			</div>
		);
	}
}

Solution.propTypes = {
	questionData: PropTypes.object.isRequired
}