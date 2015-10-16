# React Render Process

Render is primarily a Javascript intensive process: Execute all the React classes and coalesce each individual component render calls into a UI.

# Component Level

React has a straight forward view on rendering a component. Given _props_ and _state_, what is the result of the render call. This will let React know what has changed between renders.

```js
f(x) = y
```

# Application Level

React has to coalesce all the rendered components in the application tree, and understand which pieces of the UI have changed and which have stayed the same.

```js
[f(x) = y, g(x) = y, ...]
```
