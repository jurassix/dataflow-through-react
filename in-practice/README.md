# In practice

Let's look at a component from [Redux](https://github.com/rackt/redux) TodoMVC example. This is pretty typical of most good React code out there.

The good:

* Has _little_ state
* Has no application specific knowledge (actions, store)
* Has sub-render methods to simplify `render()`

```js
renderToggleAll(completedCount) {
  const { todos, actions } = this.props;
  if (todos.length > 0) {
    return (
      <input className="toggle-all"
             type="checkbox"
             checked={completedCount === todos.length}
             onChange={actions.completeAll} />
    );
  }
}
```

```js
renderFooter(completedCount) {
  const { todos } = this.props;
  const { filter } = this.state;
  const activeCount = todos.length - completedCount;

  if (todos.length) {
    return (
      <Footer completedCount={completedCount}
              activeCount={activeCount}
              filter={filter}
              onClearCompleted={this.handleClearCompleted.bind(this)}
              onShow={this.handleShow.bind(this)} />
    );
  }
}
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
      {this.renderToggleAll(completedCount)}
      <ul className="todo-list">
        {filteredTodos.map(todo =>
          <TodoItem key={todo.id} todo={todo} {...actions} />
        )}
      </ul>
      {this.renderFooter(completedCount)}
    </section>
  );
}
```
