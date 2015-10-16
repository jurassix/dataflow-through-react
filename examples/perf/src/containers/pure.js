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
  name: 'Render pure',
  defer: true,
  fn: deferred => renderPure(() => deferred.resolve())
}).on('cycle', function(event) {
  console.log(String(event.target));
  ticks = [];
  start = Date.now();
}).run({
  'async': false
});

const renderPure = callback => {
 ticks.push(0);
 const element = (
   <ProgressBar key={'bar'}
                title={'Pure'}
                timeElapsed={Date.now() - start}
                ticks={ticks}
                TickStrategy={PureTick}
                />
 );
 render(element, document.getElementById('app'), callback);
};
