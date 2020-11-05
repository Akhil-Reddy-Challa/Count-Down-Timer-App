## Introducing Notification triggers

#### What are Notification triggers?

> Notification Triggers allows you to schedule local notifications that don't require a network connection, which makes them ideal for use cases like calendar apps.

This way we can queue our event reminders to the OS scheduler.

Drawbacks:

1. This is currently under development stages and might not be a GA.
2. Not all browsers support this feature yet
3. We use an additional parameter(TimestampTrigger) while creating a notification, React would throw an undefined error,
   so it makes our implementation difficult.

To test this feature you should follow the below steps:

1. Navigate to chrome://flags
2. Search for #enable-experimental-web-platform-features
3. Enable the feature and restart chrome.

References:

Notification triggers: https://web.dev/notification-triggers/

> This app is not yet deployed because of the lack of browser support and the API being in early beta phases.
