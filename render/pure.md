# how react sees a pure component

When you create a _Pure_ component you can shortcut the render process. Using the `shouldComponentUpdate` lifecycle you can determine if the previous render fragment for your subtree can be used instead of producing a new one.

This is only achievable because of React's declaritive nature:

```js
f(x) = y
```

![Basic render flow](/images/dataflow-pure.png)
