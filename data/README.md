# React data

There are only few ways a pure React component can receive data:

* props
* state
* context

All versions of FLUX use a combination of the above to achieve data flow and react to changes over time.

_As you move away from props and towards state and context you increase component complexity._

### Props

```js
const Collapsible = (props) => {
  const { isOpen, toggle, children } = props;
  const classes = classnames({
    'collapsible': true,
    'collapsible-open': isOpen,
    'collapsible-closed': !isOpen
  });
  return (
    <div className={classes} onClick={toggle}>
      {children}
    </div>
  );
}
```

### State

```js
class CollapsibleStateful extends React.Component {
  static defaultProps = { isInitiallyOpen: true };
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isInitiallyOpen,
    };
  }
  render() {
    const { isOpen } = this.state;
    const { children } = this.props;
    return (
      <Collapsible isOpen={isOpen} toggle={::this.toggle}>
        {children}
      </Collapsible>
    );
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
}
```

### Context

_Note: keep collapsible dumb and add the context to the parent._

```js
const { shape, object } = React.PropTypes;
class Collapsible extends React.Component {
  static contextTypes = {
    css: shape({
      collapsible: shape({
        open: object,
        closed: object,
      })
    })
  };
  static defaultProps = { isInitiallyOpen: true };
  constructor(props, context) {
    super(props, context);
    this.state = {
      isOpen: props.isInitiallyOpen,
    };
  }
  render() {
    const { isOpen } = this.state;
    const { children } = this.props;
    const { open, closed } = this.context.css.collapsible;
    const styles = isOpen ? open : closed;
    return (
      <div styles={styles} onClick={::this.toggle}>
        {children}
      </div>
    );
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }
}
```
