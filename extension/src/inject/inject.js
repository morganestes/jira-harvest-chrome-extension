chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
			if (document.readyState === 'complete') {
				clearInterval(readyStateCheckInterval);

				var parentContainer = document.getElementById('viewissuesidebar');
				var widgetContainer = document.createElement('div');
				var widgetTitle =
					'<div id="panel-references_heading" class="mod-header">' +
					'<ul class="ops"></ul>' +
					'<h2 class="toggle-title">Harvest</h2>' +
					'</div>';
				var widget = document.createElement('iframe');
				var widgetSource = 'https://platform.harvestapp.com/platform/timer';
				var projectName = document.getElementById('project-name-val').text;
				var itemID = document.querySelectorAll('a.issue-link')[0].dataset.issueKey;
				var settings = {
					app_name: 'Harvest Integration for ' + projectName,
					external_item_id: itemID,
					external_item_name: document.title,
					permalink: document.URL,
					closable: false,
					chromeless: true,
				};

				//console.log(settings);

				var settingsString = '';
				for (var key in settings) {
					if (settings.hasOwnProperty(key)) {
						//console.log('key: %O, val: %O', key, settings[key]);
						var qs = key + '=' + encodeURIComponent(settings[key]);
						qs += '&';
						settingsString += qs;
					}
				}

				widgetSource += '?' + settingsString.slice(0, -1);
				widget.src = widgetSource;
				//widget.setAttribute('seamless', 'seamless');
				widget.classList.add('mod-content');
				widget.style = 'border: none; width: auto; min-height: 380px';
				widgetContainer.id = 'jira-harvest-widget';
				widgetContainer.classList.add('module');
				widgetContainer.classList.add('toggle-wrap');
				widgetContainer.innerHTML = widgetTitle;
				widgetContainer.appendChild(widget);
				parentContainer.appendChild(widgetContainer);

				console.log('Harvest Widget for JIRA loaded.');
			}
		},
		10);
});
