# Overlays
By default the dropdown renders floating above the rest of your page but it doesn't prevent the user from clicking on any other item. Overlays can fix that and make dropdowns look cooler.



<DocsDemo as |demo|>
  <demo.example @name="docs-demo-overlays.hbs">
    <BasicDropdown as |dd|>
  <dd.Trigger class='trigger-bootstrap-feel'>Click me</dd.Trigger>

  <dd.Content class='content-bootstrap-feel width-300' @overlay={{true}}>
    By default the overlays is black and transparent, but you can change that.
  </dd.Content>
</BasicDropdown>
   <BasicDropdownWormhole />

  </demo.example>

  <demo.snippet @name="docs-demo-overlays.hbs" @label="My Custom Label" @language="markdown"/>
</DocsDemo>


**What do you have to know:**

-By default overlays have a semitransparent black background, but you can change that using the `$ember-basic-dropdown-overlay-background` SASS variable or target the `.ember-basic-dropdown-overlay`

-By default overlays have `pointer-events: none,` so it is transparent to clicks but you can change that using the `$ember-basic-dropdown-overlay-pointer-events` SASS variable or target the same class.