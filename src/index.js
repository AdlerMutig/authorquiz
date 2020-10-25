import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import {BrowserRouter, Route, withRouter} from 'react-router-dom'
import AddAuthorForm from "./AddAuthorForm"

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
		books: ['Mistborn, Stormlight Archive']
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

function resetState() {
	return  {
		turnData: getTurnData(authors),
		highlight: ''
	  }
}
let state = resetState();

function onAnswerSelected(answer) {
	const isCorrect = state.turnData.author.books.some((book) => book === answer);
	state.highlight = isCorrect ? 'correct':'wrong';
	render();

}

function App() {
	return <AuthorQuiz {...state}
	onAnswerSelected={onAnswerSelected}
	onContinue={() => {
		state = resetState();
		render();
	}}/>
}

const AuthorWrapper = withRouter(({history}) =>
	<AddAuthorForm onAddAuthor={(author) => {
		authors.push(author);
		history.push("/")
	}}/>
);

function render() {
	ReactDOM.render(
		<React.StrictMode>
			<React.Fragment>
				<BrowserRouter>
					<Route exact path="/" component={App}/>
					<Route path="/add" component={AuthorWrapper}/>
				</BrowserRouter>
			</React.Fragment>
		</React.StrictMode>,
		document.getElementById('root')
	  );
}

render();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
