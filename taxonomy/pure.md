# pure

Pure components are functions that rely completely on props to define their rendered output. Because of this all pure components should implement `shouldComponentUpdate` to insulate themselves from unnecessary renders.

<link rel="stylesheet" type="text/css" href="/examples/perf/progress-bar.css"></link>

<div id="app"></div>

<script src="/examples/perf/lib/containers/pure-bundle.js"></script>

```js
shouldComponentUpdate(nextProps) {
  return !shallowEqual(this.props, nextProps);
}
```

If `shouldComponentUpdate` returns __false__ the previous render fragment will be used by the diffing algorithm to determine changes to apply to the UI. No javascript processing is required to build a new render fragment.

_Note: previous render fragments of all children of this component will also be used._

![Pure component](/images/dataflow-pure.png)

### HoCs to the rescue

We can wrap our component in a Higher Order Component that will implement `shouldComponentUpdate` for us.

```js
import pure from 'recompose/pure';

export const HelloWorld = ({ sayHello }) =>
  <section>
    <p>{sayHello}</p>
  </section>

export default PureHelloWorld = pure(HelloWorld);
```
