# MessagingCenterJS

(Very) Simple Messaging module to publish and subscribe to messages across modules.

### Basic Example

Add MessagingCenter.js to project library and require in one or more modules

```html
requirejs(["MessagingCenter"], function(MessagingCenter) {
	
});
```

Subscribe to a message

```html
MessagingCenter.subscribe('hello', function(cData) {
  // Got message
});
```

Publish

```html
MessagingCenter.publish('hello', 999);
```


### Additional Examples

Subscribe to a message once

```html
MessagingCenter.subscribeOne('hello', function(cData) {
  // Got message once
});
```

Subscribe to a message but only execute delegate when preprocessor delegate returns true

```html
MessagingCenter.subscribe('hello', function(cData) {
  // Got Message
}, function(cData) {
  return true; 
});
```

Subscribe to many messages and execute only one delegate

```html
MessagingCenter.subscribe(['hello', 'howareyou', 'goodbye'], function(cData) {
  // Got Message
});
```

Allow late subscription to published messages. Message subscriptions defined AFTER this message is published will be executed immediately to allow catch up.

```html
MessagingCenter.publish('hello', ++nTimes, true);
```
