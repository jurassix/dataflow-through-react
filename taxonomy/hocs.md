# HoCs

Higher Order Components (HOC) are functions that return a wrapped component, instrumented with some abstraction.

<link rel="stylesheet" type="text/css" href="/examples/perf/progress-bar.css"></link>

<div id="app"></div>

<script src="/examples/perf/lib/containers/stateless-wrapped-bundle.js"></script>

Example:

```js
import wrapDisplayName from 'recompose/wrapDisplayName';

const Wrap = (WrappedComponent) =>
  class extends React.Component {
    static displayName = wrapDisplayName(WrappedComponent, 'Wrap');
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
```

Usage:

```js
const HelloWorld = ({ sayHello }) =>
  <section>
    <p>{sayHello}</p>
  </section>

const WrappedHelloWorld = Wrap(HelloWorld);
```

Example:

```javascript
const container = (F, actions, nextState) => {
  return (props) =>
    <F {...actions} {...nextState} {...props} >
      {props.children}
    </F>
}
```

```javascript
import container from '../containers/container';
import action from '../actions/action';
import store from '../stores/store';
import HelloWorld from 'HelloWorld';

const actions = { onChange: action.updateText };
const state = { get text() { return store.getText() } };
const HelloWorldContainer = container(HelloWorld, actions, state);
export default HelloWorldContainer;
```

Usage:

```javascript
<HelloWorldContainer />
```

Or:

```javascript
<HelloWorldContainer
  text={'override the container state with props'}
/>
```
