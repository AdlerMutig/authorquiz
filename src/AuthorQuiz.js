import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css'
import PropTypes from 'prop-types'

function Hero() {
  return(
    <div className="jumbotron col-10 offset-1">
      <h1>Author quiz</h1>
      <p>Select the boot written by the author shown</p>
    </div>
  )
}

function Book({title, onClick}) {
  return(
    <div className="answer" onClick={()=>{onClick(title);}}>
      <h4>{title}</h4>
    </div>
  )
}
function Turn({author, books, highlight, onAnswerSelected}) {
  function highlightToBgColor(highlight) {
    const mapping = {
      'none':'',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }
  return(
    <div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
      <div className="col-4 offset-1">
        <img src={author.imageUrl} className="authorimage" alt="Author"></img>
      </div>
      <div className="col-6">
        {books.map((title)=> <Book title={title} key={title} onClick={onAnswerSelected}/>)}
      </div>
    </div>
  )
}

Turn.prototype =  {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageSource: PropTypes.string.isRequired,
    books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books:PropTypes.arrayOf(PropTypes.string).isRequired ,
  highlight: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired
}

function Continue({show, onContinue}) {
  return(
    <div className="row continue">
      {show 
      ? <div className="col-11">
          <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
        </div>
        : null}
    </div>
  )
}

function Footer() {
  return(
    <div id="footer" className="row">
      <div className="col-12">
        <p className="text.muted credit">All images are from <a href="http://commons.wikimedia.org">Wikimedia Commons</a> and are in the oublic domain</p>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  };
}
function mapDispatchToProps (dispatch) {
  return{
    onAnswerSelected: (answer) => {
      dispatch({type: 'ANSWER_SELECTED', answer})
    },
    onContinue: () => {
      dispatch({type: 'CONTINUE'});
    }
  };
}

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)(
  function AuthorQuiz({turnData, highlight, onAnswerSelected, onContinue}) {
    return (
      <div className="container-fluid">
        <Hero/>
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
        <Continue show={highlight==='correct'} onContinue={onContinue}/>
        <p><Link to="/add">Add an Author</Link></p>
        <Footer/>
      </div>
    );
});

export default AuthorQuiz;
