# container/smart

__Containers are application aware components.__ When we wrap our __dumb__ components in a container, we give that component environment specific details to work in it's current application setting.

Containers load data in the _Sideways_ data flow pattern.

Reusability is key, containers allow us to share a common library of stateless components, proxied for the current application. __The current terminology for these components is _Smart_.__

Containers allow a parent node to control the sub-tree's render lifecycle. A parent controlled sub-tree is any node in a react app that is responsible for rendering it's children and insulating it's children from changes in other parts of the UI.

Containers allows for fine grained control over a complex sub-tree; just ensure all data needed by children is accounted for at the container level. This is a key principal when optimizing a sub-tree.

![Container sideways](/images/dataflow-sideways.png)

## Properties of a Container:

* No, _or very minimal_, props
* Insulated from changes in their parent tree
* Responsible for rendering child components when data changes

#### API has NO props

_Keep props to a minimum and avoid when possible_

```javascript
<HelloWorldContainer />
```

#### Insulated from changes in their parent tree

```javascript
shouldComponentUpdate() {
  return false;
}
```

#### Responsible for rendering child components when data changes

```javascript
componentWillMount() {
  store.attachListener(this.onChange.bind(this));
}  
componentWillUnount() {
  store.removeListener(this.onChange.bind(this));
}
onChange() {
  this.setState({
    text: store.getText()
  });
}
```

## Example

Below is complete container for our _HelloWorld_ component; the container both insulates from parent tree changes and manages connections to application stores and actions.

To build a container we pull in our application specific components and pass them as props to our stateless component. Because we subscribe to all data used by the sub-tree we can safely ignore renders triggered above us by returning __false__ from `shouldComponentUpdate`.

```javascript
import store from '../stores/store';
import action from '../actions/action';
import HelloWorld from 'HelloWorld';

class HelloWorldContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: store.getText(),
      onChange: action.updateText,
    };
  }
  componentWillMount() {
    store.attachListener(this.onChange.bind(this));
  }  
  componentWillUnount() {
    store.removeListener(this.onChange.bind(this));
  }
  shouldComponentUpdate() {
    return false;
  }
  render () {
    return (
      <HelloWorld {...this.state} />
    );
  }
  onChange() {
    this.setState({
      text: store.getText()
    });
  }
}
```

Usage:

```javascript
<HelloWorldContainer />
```
