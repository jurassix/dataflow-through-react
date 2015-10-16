import {render} from 'react-dom';
import React from 'react';
import {Benchmark} from 'benchmark';
import {ProgressBar, Tick, PureTick, Wrap} from '../components/ProgressBar';

const MultiWrappedTick = Wrap(Wrap(Wrap(Wrap(Wrap(Tick)))));
const WrappedTick = Wrap(Tick);
const WrappedProgressBar = Wrap(ProgressBar);

let ticks = [];
let start = Date.now();

const suite = new Benchmark.Suite;

suite.add({
  name: 'Render stateless children wrapped',
  defer: true,
  fn: deferred => renderStatelessWithChildrenWrapped(() => deferred.resolve())
}).on('cycle', function(event) {
  console.log(String(event.target));
  ticks = [];
  start = Date.now();
}).run({
  'async': false
});

const renderStatelessWithChildrenWrapped = callback => {
 ticks.push(<MultiWrappedTick key={ticks.length} data={ticks.length}/>);
 const element = (
   <ProgressBar key={'bar'}
                title={'Stateless: ticks as children wrapped in deeply nested HoCs'}
                timeElapsed={Date.now() - start}>
     {ticks}
  </ProgressBar>
 );
 render(element, document.getElementById('app'), callback);
};
