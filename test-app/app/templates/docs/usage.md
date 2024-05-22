# Usage


**Usage**: You can now use the `{{basic-dropdown}}` component in your Ember templates. Here's a basic example:
   
<DocsDemo as |demo|>
  <demo.example @name="docs-demo-basic.hbs">
    <BasicDropdown as |dd|>
     <dd.Trigger>Click me</dd.Trigger>
     <dd.Content>Content of the dropdown</dd.Content>
   </BasicDropdown>
   <BasicDropdownWormhole />
  </demo.example>

  <demo.snippet @name="docs-demo-basic.hbs" @label="My Custom Label" @language="markdown"/>
</DocsDemo>

   This creates a dropdown with a trigger ("Click me") and content ("Content of the dropdown").

The `{{dd.Trigger}}` component generates a simple div with some self-explainatory classes and `{{dd.Content}}` doesn't render anything until you open the select.

Out of the box the component already takes care of most things you need.

First of all, the component opens when you click on the trigger and closes when you click anywhere else in the page. If you are reading this on a smartphone you can also see that it opens when you tap on the trigger and it already distinguishes proper taps from taps used for scrolling. The dropdown is rendered not next to the trigger, but in a placeholder div in the root of the application and positioned automatically with inline styles.
