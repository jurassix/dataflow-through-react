# React data loading

There are two ways a React component can receive data:

* Top-down
* Sideways

Most applications and Components are a mixture of these two types of components. In modern applications all components should be written as Top-down and then wrapped in a __container__ to be transformed into a sideways data-loaded component.

### Top-down

Top-down data is passed through composition from Parent to Child:

```js
const Parent = (props) =>
  <div className="main">
    <HelloWorld sayHello={props.sayHello} />
  </div>
```

```js
const HelloWorld = (props) =>
  <section>
    <p>{props.sayHello}</p>
  </section>
```

### Sideways

Sideways data is fetched at the Parent Level from a store and then passed all Children WHICH are rendered Top-down:

```js
import actions from '../actions/helloActions';
import store from '../stores/store';

const ParentContainer = () =>
  <Parent sayHello={store.getHello()} onClick={action.onSayHelloClick} />
```

```js
const Parent = (props) =>
  <div className="btn" onClick={props.onSayHelloClick}>
    <HelloWorld sayHello={props.sayHello} />
  </div>
```

```js
const HelloWorld = (props) =>
  <section>
    <p>{props.sayHello}</p>
  </section>
```
