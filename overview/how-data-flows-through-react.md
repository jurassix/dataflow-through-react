# how data flows through react

When you start talking about data flow within react there is a natural progression:

* Understand how React will render your component
* How data is accessible from your component
* How to architect React components to leverage data flow

## Composition

Composition is the foundation of data flow through React. Passing data from _Parent_ to _Child._

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
