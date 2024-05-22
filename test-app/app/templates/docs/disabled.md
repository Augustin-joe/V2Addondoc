# Disabled


If you disable the dropdown, it will not open or close by any mean, mouse, keyboard or touch screen.


<DocsDemo as |demo|>
  <demo.example @name="docs-demo-disabled.hbs">
    <BasicDropdown @disabled={{true}} as |dd|>
  <dd.Trigger class='trigger-bootstrap-feel'>Click me</dd.Trigger>

  <dd.Content class='content-bootstrap-feel'>
    You can't see this
  </dd.Content>
</BasicDropdown>
   <BasicDropdownWormhole />

  </demo.example>

  <demo.snippet @name="docs-demo-disabled.hbs" @label="My Custom Label" @language="markdown"/>
</DocsDemo>


Note that being disabled does not prevent the dropdown or any of its sub-components from firing events like `onMouseEnter`.

The component takes care by default of usual good practices, removing the tabindex of the trigger and set   `[aria-disabled="true"]` to assist screen readers.