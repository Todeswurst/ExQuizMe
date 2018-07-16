import React from "react";
import PropTypes from "prop-types";
import ReactHighcharts from "react-highcharts";
import Colors from "../../../Colors"

export default class ResultChart extends React.Component {
	
	render() {
		//The highcharts config with number of right, wrong and skiped answeres.
		const config = {
			chart: {
				type: 'bar'
			},
			title: {
				text: 'Quiz Result'
			},
			xAxis: {
				type: 'category'
			},
			yAxis: {
				title: {
					text: 'Nuber of Questions'
				},
				tickInterval: 1
			},
			legend: {
				enabled: false
			},
			credits: {
				enabled: false
			},
			"series": [
				{
					"name": "Questions",
					"colorByPoint": false,
					"data": [
						{
							"name": "Right",
							"y": this.props.result.right,
							"drilldown": "Right",
							"color": Colors.green
						},
						{
							"name": "Wrong",
							"y": this.props.result.wrong,
							"drilldown": "Wrong",
							"color": Colors.red
						},
						{
							"name": "Not answered",
							"y": this.props.result.notAnswered,
							"drilldown": "Not answered",
							"color": Colors.blue
						}
					]
				}
			]
		};

		return (
			<div>
				<ReactHighcharts config={config} />
			</div>
		);
	}
}

ResultChart.propTypes = {
	result: PropTypes.object.isRequired
}