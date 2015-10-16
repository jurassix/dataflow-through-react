import React, { Component, PropTypes } from 'react';
import pure from 'recompose/pure';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

export const ToggleAll = (props) => {
  const { todos, actions, completedCount } = props;
  if (todos.length > 0) {
    return (
      <input className="toggle-all"
             type="checkbox"
             checked={completedCount === todos.length}
             onChange={actions.completeAll}
             />
    );
  }
}
export const PureToggleAll = pure(ToggleAll);

export const ShowFooter = (props) => {
  const { todos, completedCount, filter, handleShow, actions } = props;
  const activeCount = todos.length - completedCount;

  const handleClearCompleted = () => {
    const atLeastOneCompleted = todos.some(todo => todo.completed);
    if (atLeastOneCompleted) {
      actions.clearCompleted();
    }
  }

  if (todos.length) {
    return (
      <Footer completedCount={completedCount}
              activeCount={activeCount}
              filter={filter}
              onClearCompleted={handleClearCompleted}
              onShow={handleShow}
              />
    );
  }
}
export const PureShowFooter = pure(ShowFooter);

export class MainSection extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleShow(filter) {
    this.setState({ filter });
  }

  render() {
    const { todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    );

    return (
      <section className="main">
        <ToggleAll
          completedCount={completedCount}
          todos={todos}
          actions={actions}
        />
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        <ShowFooter
          completedCount={completedCount}
          todos={todos}
          filter={filter}
          handleShow={this.handleShow.bind(this)}
          actions={actions}
        />
      </section>
    );
  }
}

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default PureMainSection = pure(MainSection);
