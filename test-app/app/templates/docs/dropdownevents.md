# Drop down events


***onOpen(dropdown, event?)***

The dropdown argument in the signature is the public API of the component. The event argument will be passed if this event is fired as a consequence of another event (e.g. a click), but will be undefined if it was fired programmatically.


In general when you want to do something outside the component when this loads. By example, you can delay the loading of some data until the dropdown is opened.

   ```hbs
   <BasicDropdown @onOpen={{perform this.loadUsers}} as |dd|>
  <dd.Trigger class='trigger-bootstrap-feel'>Click me</dd.Trigger>

  <dd.Content class='content-bootstrap-feel width-300'>
    {{#if this.loadUsers.isRunning}}
      <div class='circular-loader'></div>
    {{else}}
      {{#each this.loadUsers.lastSuccessful.value as |user|}}
        <p>{{user.name}} - {{user.assignment}}</p>
      {{/each}}
    {{/if}}
  </dd.Content>
</BasicDropdown>
   ```