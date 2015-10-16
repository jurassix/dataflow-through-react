# top down

Top-down data flow is just component composition passing data and data-handlers down the child tree, as needed. This is the purest way of communicating with components:

Top-down components have follow traits:

* Easily modeled as pure components
* Portable between applications
* Simple to test

Typical Top-down implementations are implemented using FLUX based on a single application state:

_Note: actions are pushed down the tree and each node can trigger re-renders as necessary_

![Top-down data flow](/images/dataflow-top-down.png)
