import React from "react";
import PropTypes from "prop-types";
import { ButtonGroup, Button, Glyphicon, Badge} from "react-bootstrap";
import Utilities from "../../../Utilities";

export default class Rating extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			rating: this.props.rating,
			up: false,
			down: false
		}
		this.thumbsUp = this.thumbsUp.bind(this);
		this.thumbsDown = this.thumbsDown.bind(this);
	}
	
	//Handles the upvoting.
	thumbsUp(){
		if(!this.state.up){
		
		//API request for giving upvote.
		Utilities.submitRating(this.props.quizId, this.props.questionId, {input: 1})
			.then(question => this.setState({rating: question.rating, 
											up: this.state.down ? false : true, 
											down: false}))
			.catch(error => console.log(error));
		}
	}
	
	//Handles the downvoting.
	thumbsDown(){
		if(!this.state.down){
		
		//API request for giving downvote.
		Utilities.submitRating(this.props.quizId, this.props.questionId, {input: -1})
			.then(question => this.setState({rating: question.rating, 
											down: this.state.up ? false : true, 
											up: false}))
			.catch(error => console.log(error));
		}
	}
	
	render() {
		return (
			<div>
				<ButtonGroup>
					<Button onClick={this.thumbsUp} disabled={this.state.up ? true : false} active={this.state.up ? true : false}>
						<Glyphicon glyph="thumbs-up" />
					</Button>
					<Button onClick={this.thumbsDown} disabled={this.state.down ? true : false} active={this.state.down ? true : false}>
						<Glyphicon glyph="thumbs-down" />
					</Button>
				</ButtonGroup>{" "}
				<Badge>{this.state.rating}</Badge>
			</div>
		);
	}
}

Rating.propTypes = {
	quizId: PropTypes.string.isRequired,
	questionId: PropTypes.string.isRequired,
	rating: PropTypes.number.isRequired
}