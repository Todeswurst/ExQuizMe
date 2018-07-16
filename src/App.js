import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Navi from './Components/Navi';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import CreateQuiz from './Pages/CreateQuiz';
import PlayQuiz from './Pages/PlayQuiz';
import CreateQuestion from './Pages/CreateQuestion';
import PseudoNav from "./Components/PseudoNav";
class App extends Component {
  render() {
    return (
		<Router>
			<div className="App">
				<Route path="/" exact strict component={PseudoNav} />
				<Route path="/" exact strict component={CreateQuiz} />
				<Route path="/:id" component={Navi} />
				<Route exact path="/:id" exact strict component={Home}/>
				<Route path="/:id/play" exact strict component={PlayQuiz}/>
				<Route path="/:id/create" exact strict component={CreateQuestion}/>
				<Route path="/" component={Footer} />
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"/ >
			</div>
		</Router>
    );
  }
}

export default App;
