# stateless / microcomponentization / dumb

<link rel="stylesheet" type="text/css" href="/examples/perf/progress-bar.css"></link>

<div id="app"></div>

<script src="/examples/perf/lib/containers/stateless-bundle.js"></script>

Components in this category have the following benefits:

* No application specific dependencies _(action/stores)_
* Intuitive API - _easy to reason about_
* Self insulating
* Highly testable
* Portable - _reusable across entire enterprise_

# Stateless and Microcomponents

A stateless component defines their behavior as a function of props alone. Stateless components are easily reusable since they __rely on no internal state or logic.__

Examples:

```javascript
const F = (props) => <div>{props.x}</div>;
```

```javascript
const Layout = (props) =>
  <div>        
    <Header title={props.title}>
      <Nav />
    </Header>
    <Main />
    <Footer />
  </div>
```

```javascript
const Collapsible = (props) => {
  const classes = classnames({
    'collapsible': true,
    'collapsible-open': this.props.isOpen,
    'collapsible-closed': !this.props.isOpen
  });
  return (
    <div className={classes} onClick={this.props.toggle}>
      {this.props.children}
    </div>
  );
}

<Collapsible isOpen={true} toggle={this.handleToggle}>
  <div>Content that can be hidden</div>
</Collapsible>
```

## Dumb

A Dump component should also define itself based on props, but can use state and all the react lifecycle methods available. Dumb components get their name from _not knowing_ about the actions/store/application specific details; __dumb components are self-describing.__

#### Intuitive API

A Dumb components API exposes data and data handlers to alter application specific behavior.

Examples:

```javascript
<Input value={this.props.value}
       onChange={this.props.onChange} />

<Collapsible title={'Demo'}
             isOpen={this.props.isOpen}
             toggle={this.props.toggle}>
  <p>I can be hidden ;)</p>
</Collapsible>

<Login providers={[FACEBOOK, GOOGLE, GITHUB, LOCAL]}
       onSuccess={this.props.setUserPrincipal} />
```

#### Self insulating

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
}
```

#### Highly Testable

Since stateless components are a function of their properties we can easily test the output based on input.

```javascript
renderToStaticMarkup(<Input x={'todo'}/>) === '<input type="text" value="todo"/>';
renderToStaticMarkup(<Input x={'one more time'}/>) === '<input type="text" value="one more time"/>';
```

We can also fully test a component through mock interactions without the need mock external dependencies nested deep inside a component.

```javascript
let value = 'foo';
const mockChange = (event) => value = event.target.value;
const input = renderIntoDocument(<Input value={value} onChange={mockChange}/>);
const field = findDOMNode(input.refs.field);

expect(field).to.equal('foo');

Simulate.change(field, {
  target: {
    value: 'bar'
  }
});

expect(value).to.equal('bar');
```

#### Portable

Stateless and Dump components have no references to external actions or stores, making them easily defined as independent projects. And as independent projects they can safely specify their own internal dependencies. Consumers of stateless/dumb components can safely wrap them into project specific containers and compose new UI's.

This design pattern keeps a clean separation between reusable library code and domain specific application code.
