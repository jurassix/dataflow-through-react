# React testing

Since stateless components are a function of their properties we can easily test the output based on input.

```javascript
renderToStaticMarkup(<Input x={'todo'}/>) === '<input type="text" value="todo"/>';
renderToStaticMarkup(<Input x={'one more time'}/>) === '<input type="text" value="one more time"/>';
```

We can also fully test a component through mock interactions without the need mock external dependencies nested deep inside a component.

```javascript
let value = 'foo';
const mockChange = (event) => value = event.target.value;
const input = renderIntoDocument(<Input value={value} onChange={mockChange}/>);
const field = findDOMNode(input.refs.field);

expect(field).to.equal('foo');

Simulate.change(field, {
  target: {
    value: 'bar'
  }
});

expect(value).to.equal('bar');
```
