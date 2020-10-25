import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample, object} from 'underscore';
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import AddAuthorForm from "./AddAuthorForm"
import * as Redux from 'redux'
import * as ReactRedux from 'react-redux'


const authors = [
	{
		name: 'Mark Twain',
		imageUrl: 'images/authors/marktwain.jpg',
		imageSource: 'Wikimedia Commons',
		books: [ 'The Adventures of Huckleberry Finn' ]
	},
	{
		name: 'Brandon Sanderson',
		imageUrl: 'images/authors/brandonsanderson.jpeg',
		imageSource: 'Wikimedia Commons',
		books: ['Mistborn', 'Stormlight Archive']
	},
	{
		name: 'Herman Hesse',
		imageUrl: 'images/authors/hermanhesse.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['Steppenwolf']
	},
	{
		name: 'Jim Butcher',
		imageUrl: 'images/authors/jimbutcher.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['Ghost Story', 'Cold case']
	},
	{
		name: 'Charles Dickens',
		imageUrl: 'images/authors/charlesdickens.jpg',
		imageSource: 'Wikimedia Commons',
		books: ['David Copperfield', 'A Tale of Two Cities']
	},
	{
		name: 'Joe Abercrombie',
		imageUrl: 'images/authors/joeabercrombie.jpeg',
		imageSource: 'Wikimedia Commons',
		books: ['The Blade Itself', 'Red Blood', 'Last Argument of Kings']
	},
];

function getTurnData(authors) {
  const allBooks = authors.reduce(function (p, c, i) {
    return p.concat(c.books);
  },[]);
  const fourRandomBooks = shuffle(allBooks).slice(0,4);
  const answer = sample(fourRandomBooks)
  return {
    books: fourRandomBooks,
    author: authors.find((author) => 
      author.books.some((title) => 
        title === answer))
  }
   
}


function reducer(
	state = {authors, turnData: getTurnData(authors), highlight:''},
	action) {
		switch(action.type){
			case 'ANSWER_SELECTED':
				const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
				return Object.assign(
					{},
					state, {
						highlight: isCorrect ? 'correct' : 'wrong'
					});
			case 'CONTINUE':
				return Object.assign({}, state, {
					highlight: '',
					turnData: getTurnData(state.authors)
				})
			case 'ADD_AUTHOR':
				return Object.assign({}, state, {
					authors: state.authors.concat([action.author])
				})
			default:
				return state;
		}
}

let store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
//let state = resetState(); //deleted to be substituted by redux store


/*function onAnswerSelected(answer) {
	const isCorrect = state.turnData.author.books.some((book) => book === answer);
	state.highlight = isCorrect ? 'correct':'wrong';
	render();
}

//Superfluos for wrapping
function App() {
	return <ReactRedux.Provider store={store}>
		<AuthorQuiz />
	</ReactRedux.Provider>
}

//superfluos since routing done elsewhere
/*const AuthorWrapper = withRouter(({history}) =>
	<AddAuthorForm onAddAuthor={(author) => {
		authors.push(author);
		history.push("/")
	}}/>
);*/


ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ReactRedux.Provider store={store}>
				<React.Fragment>
					<Route exact path="/" component={AuthorQuiz}/>
					<Route path="/add" component={AddAuthorForm}/>
				</React.Fragment>
			</ReactRedux.Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
	);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
