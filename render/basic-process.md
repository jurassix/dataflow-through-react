# react render to update queue

Process:
* Call render on entire component tree - Javascript
* Coalesce these framents with the Previous renders fragments
* Find the diff bewteen them
* Create a set of changes to update the UI
* Batch the UI changes

![Basic render flow](/images/dataflow-react-render.png)
