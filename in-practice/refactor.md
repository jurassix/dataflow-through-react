# redux/todomvc refactor

We can easily refactor all sub-render calls into separate _stateless_ components, wrap them inside a _pure_ HoC and increase testability and performance. We can wrap the MainSection component in a _pure_ HoC on export.

* Separate components is better for testing

```js
import pure from 'recompose/pure';
export const ToggleAll = (props) => {
  const { todos, actions, completedCount } = props;
  if (todos.length > 0) {
    return (
      <input className="toggle-all"
             type="checkbox"
             checked={completedCount === todos.length}
             onChange={actions.completeAll}/>
    );
  }
  return <div></div>;
}
const PureToggleAll = pure(ToggleAll);
export default PureToggleAll;
```

```js
import pure from 'recompose/pure';
import Footer from './Footer';
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
  return <div></div>;
}
const PureShowFooter = pure(ShowFooter);
export default PureShowFooter;
```

```js
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
```
