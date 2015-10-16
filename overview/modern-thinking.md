# modern techniques for building react components

Over the last couple years many smart people both from within Facebook and from the community have redefined how to build React applications, and how to structure them. Concepts like __Smart__, __Dumb__, __Pure__, __Containers__, __Higher Order Components (HoCs)__. And libraries like __FLUX__, __Redux__, __Recompose__ have emerged out of this community to handle data flow. Today we will examine the concepts core to each of these.

<!-- <style media="screen">
  .bar {
    height: 100px;
    border: 1px solid blue;
    overflow: hidden;
  }
  .tick {
    float: left;
    height: 100%;
    width: .4px;
    background-color: lightblue;
  }
</style>

<div id="app"></div>
<div id="app0"></div>
<div id="app1"></div>
<div id="app2"></div>
<div id="app3"></div>
<div id="app4"></div>
<div id="app5"></div>
<script src="/examples/perf/lib/containers/bundle.js"></script> -->

## Dumb

Dumb components have also taken a lead role in modern component building. __Dumb components rely on no external application state, action, or logic.__ A Dumb components API is defined by it props.

__Dumb components should be the majority of the nodes in your application tree__

```js
const Collapsible = (props) => {
  const classes = classnames({
    'collapsible': true,
    'collapsible-open': props.isOpen,
    'collapsible-closed': !props.isOpen
  });
  return (
    <div className={classes} onClick={props.toggle}>
      {props.children}
    </div>
  );
}

<Collapsible isOpen={true} toggle={this.handleToggle}>
  <div>Content that can be hidden</div>
</Collapsible>
```

## Smart

Smart components are directly tied the application, they should depend on the actions, stores, and logic needed by the Dumb components. They also should manage the subscriptions and rendering of their children.

__Smart components should just be Dumb components wrapped in an environmental aware container.__
