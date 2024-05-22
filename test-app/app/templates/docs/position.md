# Position
The number one thing that you will want to customize in a dropdown is where the floating content will be positioned in relation to the trigger.

>`horizontalPosition / verticalPosition`

Ember Basic Dropdown comes with a nice set of defaults. The rules are as follow:

-The `<dd.Content>` has not pre-defined size, so it will adapt to the size its childs.

-The dropdown's content is positioned below the trigger, unless there is not enough space to fit it, in which case it is positioned above it.

-The content's left border will be aligned with the trigger's left border and content will flow towards the right.

-If there isn't enough size towards the right to fit the content but there is enough room to the left, the right border of the content will align with the right border of the trigger and it will grow towards the left.

-All the rules above are re-checked every time the content of the dropdown changes, the browser is resized or the orientation of the device changes.