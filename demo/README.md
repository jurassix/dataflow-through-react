# Demo

ProgressBar

```js
export const Tick = ({ data }) =>
  <div className="tick" data-tick={data}></div>

export const pure(Tick);
```

```js
export const Legend = ({title, numTicks, timeElapsed}) =>
  <div className="info">
    <h3>{title}</h3>
    <ul>
      <li>Ticks Rendered: {numTicks}</li>
      <li>Elapsed Time: {timeElapsed}</li>
    </ul>
  </div>

export const pure(Legend);
```

```js
const ProgressBar = ({ title, timeElapsed, ticks, children, TickStrategy }) => {
  const mapper = (tick, index) => <TickStrategy key={index} data={index}/>;
  const renderedTicks = ticks.length > 0 ? ticks.map(mapper) : children;
  const numTicks = renderedTicks.length;
  return (
    <div>
      <Legend title={title}
                  numTicks={numTicks}
                  timeElapsed={timeElapsed}/>
      <div className="bar">
        {renderedTicks}
      </div>
    </div>
  );
}

ProgressBar.defaultProps = {
  ticks: [],
  TickStrategy: Tick
}

export default pure(ProgressBar);
```

```js
const Wrap = (WrappedComponent) =>
  class extends React.Component {
    static displayName = wrapDisplayName(WrappedComponent, 'Wrap');
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
```
