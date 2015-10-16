import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/todos';

const App = (props) => {
  const { todos, dispatch } = props;
  const actions = bindActionCreators(TodoActions, dispatch);

  return (
    <div>
      <Header addTodo={actions.addTodo} />
      <MainSection todos={todos} actions={actions} />
    </div>
  );
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

export default connect(mapStateToProps)(App);
