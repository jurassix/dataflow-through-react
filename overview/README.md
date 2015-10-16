# Overview

React 14 has separated into two distinct libraries: React, React-DOM. This is important in understanding the modern messaging coming from the React team:

__Virtual DOM is not the magic and allure of React; declarative programming is.__

It feels like the team is messaging this distinction to illustrate that modern frameworks _can_ adopt a Virtual DOM pipeline into their render strategies, but fundamentally that is just an optimization and not what makes React powerful.

__React's power comes from its declarative style of programming:__

```js
f(x) = y
```

## HelloWorld FTW

React just added stateless components to the component ecosystem to encourage developers to focus on component composition over state-full, heavy, component architectures.

Declarative programming in action:

```js
const HelloWorld = ({ sayHello }) =>
  <section>
    <p>{sayHello}</p>
  </section>
```

Usage:

```js
render(<HelloWorld sayHello={'hi'} />, document.body);
```
