# expose simple components along side your wrapped components

When exporting your components it's easy to export multiple version of the same component each one wrapped in different HoCs. This is a usful strategy for testing.

```js
import pure from 'recompose/pure';

export const Legend = ({title, numTicks, timeElapsed}) =>
  <div className="info">
    <h3>{title}</h3>
    <ul>
      <li>Ticks Rendered: {numTicks}</li>
      <li>Elapsed Time: {timeElapsed}</li>
    </ul>
  </div>

const PureLegend = pure(Legend);
export default PureLegend;
```

And import when testing the base component:

```js
import { Legend } from './components/Lengend';
```
