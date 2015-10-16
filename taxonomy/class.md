# class

Basic form of a React Component. Class gives you access to the full React Lifecycles and is more powerful that a stateless component.

<link rel="stylesheet" type="text/css" href="/examples/perf/progress-bar.css"></link>

<div id="app"></div>

<script src="/examples/perf/lib/containers/class-bundle.js"></script>


### Simple

```js
class HelloWorld extends Component {
  render() {
    <section>
      <p>{this.props.sayHello}</p>
    </section>
  }
}
```

### Redux TodoMVC

```js
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
```
