function getQuestions(quizId){
	return fetch(`/api/questions/${quizId}`)
		.then(res => res.json());
}

function createQuestion(quizId, question){
	return fetch(`/api/questions/${quizId}`, { method: 'POST', 
		body: JSON.stringify(question), 
		headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
}

function getQuiz(quizId){
	return fetch(`/api/quiz/${quizId}`)
		.then(res => res.json());
}

function submitComment(quizId, questionId, comment){
	return fetch(`/api/quiz/${quizId}/questions/${questionId}/feedback/comment`, { method: 'POST', 
      body: JSON.stringify(comment),
      headers: { 'Content-Type': 'application/json' } 
    }).then(res => res.json())
}

function submitRating(quizId, questionId, rating){
	return fetch(`/api/quiz/${quizId}/questions/${questionId}/feedback/rating`, { method: 'POST', 
      body: JSON.stringify(rating),
      headers: { 'Content-Type': 'application/json' } 
    }).then(res => res.json());
}

function createQuiz(name){
	return fetch('/api/quiz', { method: 'POST', 
		body: JSON.stringify(name), 
		headers: { 'Content-Type': 'application/json' } 
		}).then(res => res.json());
}

export default {
	getQuestions,
	createQuestion,
	getQuiz,
	submitComment,
	submitRating,
	createQuiz
}