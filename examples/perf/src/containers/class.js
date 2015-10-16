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
  name: 'Render as Class',
  defer: true,
  fn: deferred => renderClass(() => deferred.resolve())
}).on('cycle', function(event) {
  console.log(String(event.target));
  ticks = [];
  start = Date.now();
}).run({
  'async': false
});

const renderClass = callback => {
 ticks.push(0);
 const element = (
   <WrappedProgressBar key={'bar'}
                       title={'Class'}
                       timeElapsed={Date.now() - start}
                       ticks={ticks}
                       TickStrategy={WrappedTick}
                       />
 );
 render(element, document.getElementById('app'), callback);
};
