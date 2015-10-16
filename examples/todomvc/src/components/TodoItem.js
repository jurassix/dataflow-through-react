import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';

export const Todo = (props) => {
  const {id, text, completed , completeTodo, deleteTodo, editing, onSave} = props;

  if (editing) {
    return (
      <EditTodo text={text}
                onSave={onSave}
                />
    );
  }
  return (
    <StaticTodo completed={completed}
                id={id}
                text={text}
                completeTodo={completeTodo}
                deleteTodo={deleteTodo}
                />
  );
}

export const EditTodo = ({ text, id, onSave }) =>
  <TodoTextInput text={text}
                 editing
                 onSave={(nextText) => onSave(id, nextText)}
                 />

export const StaticTodo = (props) => {
  const { id, completed, text, deleteTodo, completeTodo, onDoubleClick } = props;
  return (
    <div className="view">
      <input className="toggle"
             type="checkbox"
             checked={completed}
             onChange={() => completeTodo(id)}
             />
      <label onDoubleClick={onDoubleClick}>
        {text}
      </label>
      <button className="destroy"
              onClick={() => deleteTodo(id)}
              />
    </div>
  );
}

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  handleDoubleClick() {
    this.setState({ editing: true });
  }

  handleSave(id, text) {
    if (text.length === 0) {
      this.props.deleteTodo(id);
    } else {
      this.props.editTodo(id, text);
    }
    this.setState({ editing: false });
  }

  render() {
    const {todo: { id, text, completed }, completeTodo, deleteTodo} = this.props;
    return (
      <li className={classnames({
        completed: completed,
        editing: this.state.editing
      })}>
        <Todo id={id}
              text={text}
              completed={completed}
              editing={this.state.editing}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
              onSave={this.handleSave}
              />
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
};

export default TodoItem;
