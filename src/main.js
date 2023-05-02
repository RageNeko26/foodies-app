// Static
import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import 'bootstrap/dist/js/bootstrap.bundle.js';

// Axios as HTTP Request
import axios from 'axios';

// Components
import './components/AppBar.js';
import './components/SearchBar.js';
import './components/SectionTitle.js';
import './components/FoodContainer.js';
import './components/FoodContent.js';
import './components/SpinnerComponent.js';
import './components/MessageComponent.js';

/* 
Todo:
1. Making section for data menu (Done).
2. Logic input and search data API (Done).
3. Adding Error message.
*/

// API URL for search data https://www.themealdb.com/api/json/v1/1/search.php?s=

const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?';


const foodItem = document.getElementById('foodItem');
const spinner = document.createElement('spinner-component');


const someMenus = async() => {
	foodItem.append(spinner);
	const response = await axios.get('https://www.themealdb.com/api/json/v1/1/search.php?f=c');
	const meals = await response.data.meals;
	meals.forEach(result => {
		spinner.remove();
		const foodContent = document.createElement('food-content');
		foodContent.content = result;

		foodContent.classList.add('col-md-4')
		foodContent.classList.add('my-3')
		foodContent.setAttribute('food-data', result.idMeal);

		foodItem.append(foodContent);
	})
}

const searchAction = () => {
	const searchInput = document.getElementById('searchInput');
	const searchButton = document.getElementById('searchBtn')
	const message = document.querySelector('message-component');

	/*
		Suppose adding spinner and delete DOM if input value is not empty.
		If value input is empty then it will call API again.

 	*/
	searchInput.addEventListener('input', (e) => {
		if(e.target.value !== '') {
			foodItem.innerHTML = '';
			foodItem.append(spinner);
			
			message.querySelector('#cardMsg').classList.remove('visually-hidden');
			message.setAttribute('message', '');
			
		} else {
			someMenus();
		}
	})

	searchButton.addEventListener('click', (e) => {

		axios.get(`${API_URL}s=${searchInput.value}`)
			.then(res => {
				
				if(res.data.meals) {
					const response = res.data.meals;
					response.forEach(result => {
					const foodContent = document.createElement('food-content');
					foodContent.content = result;

					foodContent.classList.add('col-md-4')
					foodContent.classList.add('my-3')
					foodContent.setAttribute('food-data', result.idMeal);

					foodItem.append(foodContent);
				})
				} else {
					// alert("The food or drink that you looking for is not available")
					message.setAttribute('message', 'The food or drink that you looking for is not available');
					message.querySelector('#cardMsg').classList.toggle('visually-hidden');
				}
			}).catch(err => {
				alert(err);
			}).finally(() => {
				spinner.remove();
			})
	})


}



searchAction();
someMenus();



