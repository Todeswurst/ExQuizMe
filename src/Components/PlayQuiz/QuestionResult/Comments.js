import React from "react";
import Utilities from "../../../Utilities";
import PropTypes from "prop-types";
import { Button, Panel, FormGroup, FormControl, Glyphicon } from "react-bootstrap";

export default class Comments extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			comments: this.props.comments,
			textValue: ""
		};
		this.setValuesAfterSubmit = this.setValuesAfterSubmit.bind(this);
		this.handleError = this.handleError.bind(this);
		this.renderComments = this.renderComments.bind(this);
		this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
		this.submitComment = this.submitComment.bind(this);
		
	}
	
	//Sets the comments to new value and emtpy the textarea. 
	setValuesAfterSubmit(question){
		this.setState({comments: question.comments, textValue: ""});
	}
	
	handleError(error){
		console.log(error);
	}
	
	//Event handler for the textarea.
	handleTextAreaChange(e){
		this.setState({ textValue: e.target.value });
	}
	
	//Sends the comment to the server and updates the comment section.
	submitComment(){
		const comment = {input: this.state.textValue};
		Utilities.submitComment(
			this.props.quizId, 
			this.props.questionId, 
			comment
		).then(question => this.setValuesAfterSubmit(question))
		.catch(error => this.handleError(error));
	}
	
	//Function to render all comments.
	renderComments(){
		if(this.state.comments.lenght === 0){
			return;
		}
		let key = 0;
		const panelBodyStyle={
			whiteSpace: "normal",
			wordWrap: "break-word",
			borderBottom: "1px solid gray"
		};
		const comments = this.state.comments.map(function(comment){ return <Panel.Body key={key++} style={panelBodyStyle}>{comment}</Panel.Body>});
		return (
			<div>{comments}</div>
		);
	}
	
	render() {
		const style ={
			overflowY: "auto",
			maxHeight: "200px"
		};
		const panelBodyStyle={
			whiteSpace: "normal",
			wordWrap: "break-word",
			borderBottom: "1px solid gray"
		};
		return (
			<div>
				<Panel id="collapsible-panel-example-2" defaultExpanded={false}>
					<Panel.Heading>	
						<Panel.Toggle componentClass="div">Comments <Glyphicon glyph="sort" /></Panel.Toggle>
					</Panel.Heading>
					<Panel.Collapse >
						<div  style={style}>
							{this.renderComments()}
							<Panel.Body style={panelBodyStyle}>
								{this.state.textValue}
							</Panel.Body>
						</div>
						<Panel.Footer>
							<form>
								<FormGroup
								  controlId="formControlsTextarea"
								>
								  <FormControl
									componentClass="textarea"
									type="textarea"
									value={this.state.textValue}
									placeholder="Enter a comment"
									onChange={this.handleTextAreaChange}
								  />
								  <FormControl.Feedback />
								</FormGroup>
								<Button bsStyle="primary" onClick={this.submitComment}><Glyphicon glyph="send" /> Submit</Button>
							</form>
						</Panel.Footer>
					</Panel.Collapse>
				</Panel>
			</div>
		);
	}
	
  
}

Comments.propTypes = {
	quizId: PropTypes.string.isRequired,
	questionId: PropTypes.string.isRequired,
	comments: PropTypes.array.isRequired
}