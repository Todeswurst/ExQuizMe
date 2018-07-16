import React from "react";
import PropTypes from "prop-types";
import Comments from "./QuestionResult/Comments";
import Solution from "./QuestionResult/Solution";
import Rating from "./QuestionResult/Rating";
import { Grid, Row, Col } from "react-bootstrap";

export default class QuestionResult extends React.Component {
 
 
  render() {
    return (
	<Grid>
		<Row>
			<Col xs={7} sm={9} md={10}>
			<h2>Question Result</h2>
			</Col>
			<Col xs={5} sm={3} md={2}>
				<Rating
					quizId={this.props.quizId}
					questionId={this.props.questionData._id}
					rating={this.props.questionData.rating}
				/>
			</Col>
		</Row>
		<Row>
			<Solution
				questionData={this.props.questionData}
				answers={this.props.answers}
			/>
		</Row>
		<Row>
			<Comments 
				quizId={this.props.quizId}
				questionId={this.props.questionData._id}
				comments={this.props.questionData.comments}
			/>
		</Row>
	</Grid>
    );
  }
}

QuestionResult.propTypes = {
	quizId: PropTypes.string.isRequired,
	questionData: PropTypes.object.isRequired
}
