Vue.component('search-results', {
	template: `
		<div>
			<ul>
				<li>
					<slot></slot>
				</li>
			</ul>
		</div>
	`,
});

Vue.component('result', {
	template: `
			<div class="result">
				<div>
					<slot name="title"></slot>
				</div>
				<div>
					<slot name="body"></slot>
				</div>
			</div>
	`
})

var app = new Vue({
	el: '#root',
	data: {
		searchTerm: "",
		results: [],
		API: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=bee&limit=5&profile=fuzzy&origin=*"
	},
	methods: {
		getSearchResults: function (requestUrl) {
			var self = this;
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if (this.status == 200 && this.readyState == 4) {
					var data = JSON.parse(this.responseText);
					console.log(data);
					for (var i = 0; i < 5; i++) {
						self.results.push({
							title: data[1][i],
							body: data[2][i],
							link: data[3][i]
						})

					}
				}
			}
			xhr.open('GET', requestUrl);
			xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
			xhr.send();
		},
		handleSubmit: function (event) {
			console.log(event);
			this.results = [];
			this.getSearchResults("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + this.searchTerm + "&limit=5&profile=fuzzy&origin=*");
			event.preventDefault();
		}
	}
})