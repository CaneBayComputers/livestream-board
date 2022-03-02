Eta = require('eta');
_ = require('lodash');
Vue = require("vue");
$ = require("jquery");

var loaded_widgets = [];

// Init
// I don't care about your opinion of jQuery. It is still useful in many situations.
$(function() {

	var $body = $('body');

	setInterval(function() {

		fetch('widgets.json')
			.then(response => response.text())
			.then(json => {

				var widgets = JSON.parse(json).widgets;

				_.forEach(widgets, function(w) {

					if( typeof loaded_widgets[w.id] === 'undefined' ) {

						loaded_widgets[w.id] = w;

						fetch('widgets/'+w.name+'/screen.html', {cache: "no-store"})
							.then(response => response.text())
							.then(screen_html => {

								var html = '<div id="widget-'+w.id+'" style="position:absolute;top:'+w.y+'px;left:'+w.x+'px">';
								html += Eta.render(screen_html, { Widget: w });
								html += '</div>';

								$body.append(html);
							});
					}
				});
			});

	}, 1000);

});
