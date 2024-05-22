# Trigger events

The trigger is the component in charge of opening and closing the dropdown (although it also closes if you click outside it). By default the event that to which the trigger reacts is the click event.

You can change that passing the `eventType="mousedown"` to the trigger.


**Event handlers**

As with any regular HTML element, you can attach events to the trigger using the `{{on}}` element modifier. The events you subscribe to using this approach will aways run before the default events that this component attaches, giving you a chance to prevent the default behavior by calling event.`stopImmediatePropagation()`.

Let's see some examples.

`{{on "keydown"}}`
One real world situation where I found this to be necessary, is when you want to open the dropdown with a key that usually does not open it, like by example the arrow keys.

```hbs
<input type='text' placeholder='Focus me and hit TAB to focus the trigger' />
<br />
<BasicDropdown as |dd|>
  <dd.Trigger
    {{on 'keydown' (fn this.openOnArrowDown dd)}}
    class='trigger-bootstrap-feel'
  >Click me</dd.Trigger>

  <dd.Content class='content-bootstrap-feel width-300'>
    Don't you love those little keys?
  </dd.Content>
</BasicDropdown>```