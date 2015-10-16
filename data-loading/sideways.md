# sideways

Sideways data flow is _Smart_ components, that understand the application context, reaching out to fetch data from the system that is pertinent to their specific component and child components.

Sideways components have follow traits:

* Self insulating from Parent renders
* Manage render cycles of children

Typical Sideways implementations can also implemented using FLUX based on a single application state, but applied at the subtree level:

_Note: data from each __smart__ subtree renders Top-down_

![Sideways data-loading](/images/dataflow-sideways.png)
