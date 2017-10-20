define([
], function () {
	'use strict';

	function MessagingCenter() { }

	var cDelegates = {}, 
		allowLateSubscriptions = true, 
		cPublished = [];

	MessagingCenter.prototype = {
		/**
		 * Publish a message
		 */
		publish: function (sEvent, cData, bAllowLate) {
			bAllowLate = bAllowLate || false;
			if (cDelegates[sEvent]) {
				Object.keys(cDelegates[sEvent]).forEach(function (sHandle) {
					executeMessage(sEvent, sHandle, cData);
				});
			}

			if (bAllowLate) {
				cPublished.push({ event : sEvent, data : cData });
			}
		},
		/**
		 * Subscribe to a message, optionally only once
		 */
		subscribe: function (cEvent, fFunc, fPreprocessor, bOne) {
			var retVal = {};
			if (cEvent.constructor === Array) {
				cEvent.forEach(function (sEvent) {
					retVal[sEvent] = addDelegate(sEvent, fFunc, fPreprocessor, bOne);
				});
			} else {
				retVal = addDelegate(cEvent, fFunc, fPreprocessor, bOne);
			}

			return retVal;
		},
		/**
		 * Subscribe to a message and action fFunc only once
		 */
		subscribeOne: function (sEvent, fFunc, fPreprocessor) {
			return addDelegate(sEvent, fFunc, fPreprocessor, true);
		},
		/**
		 * Returns an array of unique messages currently listened to
		 */
		getSubscribed: function () {
			var events = [];
			Object.keys(cDelegates).forEach(function (sKey) {
				events.push(sKey);
			});
			return events;
		}
	};

	function executeMessage(sEvent, sHandle, cData) {
		if (cDelegates[sEvent][sHandle] !== undefined) {
			var data = cData;
			if (cDelegates[sEvent][sHandle].preprocessor) {
				if (cDelegates[sEvent][sHandle].preprocessor(data)) {
					cDelegates[sEvent][sHandle].delegate(data);
				}
			} else {
				cDelegates[sEvent][sHandle].delegate(data);
			}

			if (cDelegates[sEvent][sHandle]) {
				if (cDelegates[sEvent][sHandle].once) {
					delete cDelegates[sEvent][sHandle];
				}
			}
		}
	}

	function addDelegate(sEvent, fDelegate, fPreprocessor, bOne) {
		bOne = bOne || false;

		var sHandle = (new Date().getTime() + Math.random()).toString();

		if (cDelegates[sEvent] === undefined) {
			cDelegates[sEvent] = {};
		}

		cDelegates[sEvent][sHandle] = {
			delegate: fDelegate,
			preprocessor: fPreprocessor,
			once: bOne
		};

		// If message allows late subscription execution then execute immediately
		cPublished.forEach(function(cPublishedMessage) {
			if (cPublishedMessage.event === sEvent) {
				executeMessage(sEvent, sHandle, cPublishedMessage.data);
			}
		});

		return {
			// Remove a delegate
			remove: function () {
				delete cDelegates[sEvent][sHandle];
			}
		};
	}

	return new MessagingCenter();
});