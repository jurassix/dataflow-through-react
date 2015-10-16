import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';

const Header = (props) => {
  const { addTodo } = props;
  const handleSave = (text) => {
    if (text.length !== 0) addTodo(text);
  }
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput newTodo
                     onSave={handleSave}
                     placeholder="What needs to be done?"
                     />
    </header>
  );
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
};

export default Header;
