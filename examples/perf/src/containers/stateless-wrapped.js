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
  name: 'Render stateless wrapped',
  defer: true,
  fn: deferred => renderStatlessWrapped(() => deferred.resolve())
}).on('cycle', function(event) {
  console.log(String(event.target));
  ticks = [];
  start = Date.now();
}).run({
  'async': false
});

const renderStatlessWrapped = callback => {
 ticks.push(0);
 const element = (
   <ProgressBar key={'bar'}
                title={'Stateless: ticks wrapped in deeply nested HoCs'}
                timeElapsed={Date.now() - start}
                ticks={ticks}
                TickStrategy={MultiWrappedTick}
                />
 );
 render(element, document.getElementById('app'), callback);
};
