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
}).add({
  name: 'Render stateless',
  defer: true,
  fn: deferred => renderStateless(() => deferred.resolve())
}).add({
  name: 'Render pure',
  defer: true,
  fn: deferred => renderPure(() => deferred.resolve())
}).add({
  name: 'Render stateless wrapped',
  defer: true,
  fn: deferred => renderStatlessWrapped(() => deferred.resolve())
}).add({
  name: 'Render stateless-children',
  defer: true,
  fn: deferred => renderStatelessWithChildren(() => deferred.resolve())
}).add({
  name: 'Render pure-children',
  defer: true,
  fn: deferred => renderPureWithChildren(() => deferred.resolve())
}).add({
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

const renderStateless = callback => {
 ticks.push(0);
 const element = (
   <ProgressBar key={'bar'}
                title={'Stateless'}
                timeElapsed={Date.now() - start}
                ticks={ticks}
                />
 );
 render(element, document.getElementById('app0'), callback);
};

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
 render(element, document.getElementById('app1'), callback);
};

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
 render(element, document.getElementById('app2'), callback);
};

const renderStatelessWithChildren = callback => {
 ticks.push(<Tick key={ticks.length} data={ticks.length}/>);
 const element = (
   <ProgressBar key={'bar'}
                title={'Stateless: ticks as children'}
                timeElapsed={Date.now() - start}>
     {ticks}
   </ProgressBar>
 );
 render(element, document.getElementById('app3'), callback);
};

const renderPureWithChildren = callback => {
 ticks.push(<PureTick key={ticks.length} data={ticks.length}/>);
 const element = (
   <ProgressBar key={'bar'}
                title={'Pure: ticks as children'}
                timeElapsed={Date.now() - start}>
    {ticks}
  </ProgressBar>
 );
 render(element, document.getElementById('app4'), callback);
};

const renderStatelessWithChildrenWrapped = callback => {
 ticks.push(<MultiWrappedTick key={ticks.length} data={ticks.length}/>);
 const element = (
   <ProgressBar key={'bar'}
                title={'Stateless: ticks as children wrapped in deeply nested HoCs'}
                timeElapsed={Date.now() - start}>
     {ticks}
  </ProgressBar>
 );
 render(element, document.getElementById('app5'), callback);
};
