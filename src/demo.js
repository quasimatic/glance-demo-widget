import $ from 'jquery';

let alreadySet = false;
let previousSelector = '';
let changeSelector = true;
let elementsToHighlight;

window.glanceDOM = function(reference, config) {
	window.glanceDOMIntervalID = setInterval(function() {
		if (window.glanceDOM.setLogLevel) {
			clearInterval(window.glanceDOMIntervalID);
			glanceDOM(reference, config);
		}
	}, 1000);
};

function isDescendant(parent, child) {
	let node = child.parentNode;
	while (node !== null) {
		if (node === parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
};

function clearHighlighted() {
	elementsToHighlight = null;
	$('#glance-demo-highlights').remove();
}

function highlightElements(elements) {
	elementsToHighlight = elements;
	highlightKnownElements();
}

function highlightKnownElements() {
	$('#glance-demo-highlights').remove();

	let highlights = $('<div id=\'glance-demo-highlights\'></div>').appendTo('body');

	$(elementsToHighlight).each(function() {
		// if(!visible(this)) return;
		let position = getPosition(this);
		let highlight = $('<div></div>').css({
			'position': 'fixed',
			'top': position.top,
			'left': position.left,
			'height': $(this).outerHeight(),
			'width': $(this).outerWidth(),
			'background-color': '#F17537',
			'opacity': '.4'
		});

		highlights.append(highlight);
	});
}

function getPosition(element) {
	var top = $(element).offset().top;
	var left = $(element).offset().left;
	return {top: top - $(window).scrollTop(), left: left - $(window).scrollLeft()};
}

function visible(element, fullyInView) {
	var pageTop = $(window).scrollTop();
	var pageBottom = pageTop + $(window).height();
	var elementTop = $(element).offset().top;
	var elementBottom = elementTop + $(element).height();

	if (fullyInView === true) {
		return ((pageTop < elementTop) && (pageBottom > elementBottom));
	} else {
		return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
	}
}

$(window).scroll(highlightKnownElements)
	.resize(highlightKnownElements)

$(function() {
	$.getScript('https://quasimatic.org/glance-dom/dist/glance-dom.js', function(data, textStatus, jqxhr) {
		glanceDOM.addExtension({
			beforeAll: function({reference}) {
				clearHighlighted();

				if (changeSelector) {
					previousSelector = reference;
					changeSelector = false;
				}
			},

			afterAll: function({elements}) {
				highlightElements(elements);

				// if ($('#glance-dom').val() != previousSelector) {
				// 	$('#glance-dom').val(previousSelector);
				// }

				changeSelector = true;
			},

			afterFilters: function({elements, scope}) {
				var nonDemoElements = elements.filter(function(e) {
					return !isDescendant($('#glance-demo')[0], e);
				});

				return nonDemoElements;
			}
		});

		$('body').css({
			'padding-top': '50px'
		});

		var content = $(`<div id='glance-demo-content'>`)
			.append($('body').children())
			.prependTo('body');

		var toolbar = $(`<div id='glance-demo'></div>`)
			.prependTo('body')
			.addClass('navbar navbar-default navbar-fixed-top')
			.css({
				'font-family': 'Helvetica Neue',
				'font-size': '20px'
			});

		var background = $('<div></div>')
			.appendTo(toolbar)
			.css({
				'position': 'fixed',
				'top': 0,
				'left': 0,
				'right': 0,
				'background-color': '#3E83BE',
				'padding': '10px 6px 10px 4px'
			});

		var label = $(`<svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 584.7 214'><title>white</title><path d='M85.17,103.65c-.09-22.82,18.16-41.38,42.31-41.47,9.61,0,17.63,1.87,25.09,6.3,2.64,1.7,3,4,1.4,6.73L151.91,78c-1.59,2.63-3.76,3-6.63,1.62a33.12,33.12,0,0,0-17.75-4.16c-15.34.06-27.08,12.54-27,28.17.05,14.27,9.83,27.81,28.37,27.74A32.09,32.09,0,0,0,145,127.05l-.05-13.62-16.14.06a4.79,4.79,0,0,1-4.81-4.78v-2.47a4.79,4.79,0,0,1,4.78-4.81l25.42-.09a4.79,4.79,0,0,1,4.81,4.78l.09,23.05c0,2.51-.9,4.57-3.52,6.52a45,45,0,0,1-27.09,8.89C103.06,144.67,85.25,126.13,85.17,103.65Z' transform='translate(0 -1.44)' style='fill:#fcfcfc'/><path d='M173,138.71l-.26-72.49c0-3.06,1.64-4.77,4.63-4.78l5,0c3,0,4.65,1.68,4.66,4.75l.26,72.49c0,3.06-1.64,4.77-4.63,4.78l-5,0C174.68,143.47,173,141.77,173,138.71Z' transform='translate(0 -1.44)' style='fill:#fcfcfc'/><path d='M199,114.7c-.06-16.89,11.41-30.35,28.19-30.35,14.16,0,19.76,9.86,19.76,9.86V90.36a4.91,4.91,0,0,1,4.89-4.93l5.1,0c3.14,0,5,1.81,5,4.89l.18,48.31c0,3.08-1.84,4.8-5,4.82h-5.32s-4.8-1.64-5.88-4.72v-3.88c-3.83,7.09-10.89,10-18.54,10C210.69,144.9,199.11,131.59,199,114.7Zm48.1-.44c-.15-10.38-6.92-18-17.07-18-10.39,0-16.4,8.28-16.37,18.09s6.11,18,16.5,18C240.37,132.32,247.07,124.65,247.15,114.26Z' transform='translate(0 -1.44)' style='fill:#fcfcfc'/><path d='M277,138.67l-.18-48.31c0-3.08,1.74-4.92,4.89-4.93l5.36,0A4.91,4.91,0,0,1,292,90.31l0,5.4c2.59-7.34,9.4-11.6,18.27-11.63C324.4,84,331.94,94.29,332,110.21l.11,28.4c0,3.09-1.8,4.82-4.87,4.83l-5.5,0c-3,0-4.72-1.69-4.73-4.78l-.1-27.62c0-9.93-4.32-14.48-10.26-14.45s-14.69,4.51-14.63,18.66l.09,23.35c0,3.08-1.85,4.8-5,4.82l-5.15,0C278.77,143.47,277,141.76,277,138.67Z' transform='translate(0 -1.44)' style='fill:#fcfcfc'/><path d='M343,114.36c-.06-16.89,12.21-30.74,33-30.82a35.12,35.12,0,0,1,17.82,4.84c2.74,1.59,3.1,4.21,1.17,6.73l-1.36,1.72c-1.82,2.52-3.87,2.64-6.73,1.28a23.11,23.11,0,0,0-10.05-2.24c-11.07,0-19.14,7.49-19.1,18s8.17,18,19.24,18a25,25,0,0,0,10-2.32c2.85-1.38,5-1.27,6.74,1.12l1.38,1.82c1.83,2.5,1.28,5.47-2.48,7.43A34.18,34.18,0,0,1,376.22,144C355.91,144.1,343.08,130.91,343,114.36Z' transform='translate(0 -1.44)' style='fill:#fcfcfc'/><path d='M403,113.71C403,97.16,415.6,83.19,434.43,83.12c15.52-.06,29,9.25,30.23,27.73.24,3-1.69,4.57-4.78,4.58l-42.57.16c-.2,8.79,7.59,15.95,19.57,15.9a26.15,26.15,0,0,0,14.25-4.28c2.5-1.49,4.79-1.27,6.74.89l1,1.25c2.06,2.27,2,5.13-.88,7.31-6.6,5.16-14.47,6.9-21.77,6.93C415.71,143.67,403.11,130.25,403,113.71Zm47.45-7.39c-2.32-9.12-9.63-11.38-15.79-11.35-6.39,0-14,2.68-16.73,11.47Z' transform='translate(0 -1.44)' style='fill:#fcfcfc'/><path d='M99,194.54c6.95,10.1-.12,20.9-9.71,20.9H13a13,13,0,0,1-13-13V14.4a13,13,0,0,1,13-13H89.76a11.74,11.74,0,0,1,10.73,6.73c4.21,9.26-2.44,18.27-11.2,18.27H37.61A12.61,12.61,0,0,0,25,39V180a10.41,10.41,0,0,0,10.41,10.41H91A9.68,9.68,0,0,1,99,194.54Z' transform='translate(0 -1.44)' style='fill:#fcfcfc'/><path d='M478.57,214.65a14,14,0,0,1-9.85-24.06L544.56,116a9.38,9.38,0,0,0,0-13.37L468.72,28.11a14,14,0,1,1,19.69-20L580.5,98.6a14,14,0,0,1,4.2,10q0,.22,0,.43c0,.24,0,.48,0,.72s0,.29,0,.43a14,14,0,0,1-4.2,10l-92.08,90.52A14,14,0,0,1,478.57,214.65Z' transform='translate(0 -1.44)' style='fill:#fcfcfc'/></svg>`)
			.appendTo(background)
			.css({
				'height': '32px',
				'margin-right': '8px',
				'color': 'white',
				'float': 'left',
				'font-size': '20px',
				'line-height': '24px'
			});

		var wrapper = $('<span></span>')
			.appendTo(background)
			.css({
				'display': 'block',
				'overflow': 'hidden'
			});

		$(`<input id='glance-dom'/>`)
			.appendTo(wrapper)
			.css({
				'font-size': '28px',
				'padding': '0px 0px 0px 4px',
				'width': '100%',
				'outline-width': 0,
				'border': 0,
				'color': '#27343E',
				'height': '33px'
			})
			.keyup(function() {
				var selector = $('#glance-dom').val();
				if (previousSelector == selector) return;

				previousSelector = selector;

				if (selector == '')
					clearHighlighted();
				else {
					try {
						glanceDOM(selector, {containerElements: [$('#glance-demo-content')[0]]});
					}
					catch (error) {
						$('#glance-dom').val(previousSelector);
						console.error(error.message);
					}
				}
			});
	});

});

(function setDemoText() {
	if ($('#glance-dom').length === 0) {
		setTimeout(function() {
			setDemoText(previousSelector);
		}, 1);
	}
	else {
		if (!alreadySet) {
			$('#glance-dom').val(previousSelector);
			alreadySet = true;
		}
	}
})();
