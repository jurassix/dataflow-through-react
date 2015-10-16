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
  name: 'Render stateless-children',
  defer: true,
  fn: deferred => renderStatelessWithChildren(() => deferred.resolve())
}).on('cycle', function(event) {
  console.log(String(event.target));
  ticks = [];
  start = Date.now();
}).run({
  'async': false
});

const renderStatelessWithChildren = callback => {
 ticks.push(<Tick key={ticks.length} data={ticks.length}/>);
 const element = (
   <ProgressBar key={'bar'}
                title={'Stateless: ticks as children'}
                timeElapsed={Date.now() - start}>
     {ticks}
   </ProgressBar>
 );
 render(element, document.getElementById('app'), callback);
};
