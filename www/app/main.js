requirejs(["../../MessagingCenter"], function(MessagingCenter) {
	var nTimes = 0;
	
	// Subscribe can be used in any module. The below subscriptions are in this one 
	// module just for demonstration.

	// Demonstrate late subscription. Publish first, subscribe later..
	MessagingCenter.publish('hello', ++nTimes, true);
	setElementText('sender', 'Sent Message ' + nTimes);

	// Send a message with the number of times the button has been clicked
	this.sendMessage = function() {
		MessagingCenter.publish('hello', ++nTimes);
		setElementText('sender', 'Sent Message ' + nTimes);
	}

	// Subscribe to every 'hello' message forever
	MessagingCenter.subscribe('hello', function(nTimes) {
		setElementText('subscriber1', 'Got Message ' + nTimes);
	});

	// Subscribe to only the first message
	MessagingCenter.subscribeOne('hello', function(nTimes) {
		setElementText('subscriber2', 'Got Message ' + nTimes);
	});

	// Subscribe to a message but only execute delegate when preprocessor delegate returns true
	MessagingCenter.subscribe('hello', function(nTimes) {
		setElementText('subscriber3', 'Got Message ' + nTimes);
	}, function(nTimes) {
		return nTimes % 2;
	});

	// Helper to set the innerText on an element
	function setElementText(sId, sText) {
		document.getElementById(sId).innerText = sText;
	}
});