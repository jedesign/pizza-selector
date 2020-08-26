import Vue from 'vue';
import Axios from 'axios';
const airTableApp = 'appVmn1bbhGZnSf04';
const apiToken = 'keyVYwB7qkm7tus1Z';

new Vue({
	el: '#app',
	data: {
		pizzas: [],
	},
	mounted() {
		this.loadItems();
	},
	methods: {
		loadItems() {
			Axios.get(
				`https://api.airtable.com/v0/${airTableApp}/Pizza`,
				{headers: {Authorization: 'Bearer ' + apiToken}})
				.then((response) => {
					// load the API response into items for datatable
					this.pizzas = response.data.records.map((item) => {
						return {
							id: item.id,
							...item.fields,
						};
					});
				}).catch((error) => {
				console.log(error);
			});
		},
	},
});