import React from 'react';
import pure from 'recompose/pure';
import wrapDisplayName from 'recompose/wrapDisplayName';

export const Tick = ({ data }) => <div className="tick" data-tick={data}></div>
export const PureTick = pure(Tick);

export const Legend = ({title, numTicks, timeElapsed}) =>
  <div className="info">
    <h3>{title}</h3>
    <ul>
      <li>Ticks Rendered: {numTicks}</li>
      <li>Elapsed Time: {timeElapsed}</li>
    </ul>
  </div>

export const PureLegend = pure(Legend);

export const ProgressBar = ({ title, timeElapsed, ticks, children, TickStrategy }) => {
  const mapper = (tick, index) => <TickStrategy key={index} data={index}/>;
  const renderedTicks = ticks.length > 0 ? ticks.map(mapper) : children;
  const numTicks = renderedTicks.length;
  return (
    <div>
      <PureLegend title={title}
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

export const Wrap = (WrappedComponent) =>
  class extends React.Component {
    static displayName = wrapDisplayName(WrappedComponent, 'Wrap');
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
