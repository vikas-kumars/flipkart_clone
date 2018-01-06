let filters = {
	page: 1,
	size: 10,
	search: ''
}

let imagesLoadedCounter = 0;
let productList = undefined;
let searchBar = undefined;
const body = document.querySelector('body')

function getQueryParams() {
	let arr = [];
	for(let key in filters){
		let p = key+'='+filters[key];
		arr.push(p);
	}

	return arr.join('&');
}

function handleClick(ev) {
	window.location.href = 'details.html?id=' + this.dataset['productId'];
}

function renderProducts(response) {
	let data = response.data;
	while (productList.firstChild) {
		productList.removeChild(productList.firstChild);
	}

	let count = 0;

	for (let i = 0; i < data.length; i++) {
		let product = data[i];

		let productImage = document.createElement('img');
		imagesLoaded(productImage, function (x) {
			console.log(x, "Image loaded");
			count = count + 1;
			console.log(count);
			if (count == data.length) {
				console.log("All images loaded");
				body.classList.remove('loading');
			}

		})
		productImage.setAttribute('src', product.image_url);

		let name = document.createElement("span");
		name.classList.add('product__name')
		name.innerText = product.name;

		let cartIcon = document.createElement('i');
		cartIcon.classList.add('fa');
		cartIcon.classList.add('fa-cart-plus');
		cartIcon.classList.add('product__cart-icon');


		let productActions = document.createElement('div');
		productActions.classList.add('product__actions');
		productActions.appendChild(name);
		productActions.appendChild(cartIcon);

		let productImageContainer = document.createElement('div');
		productImageContainer.classList.add('product__image-container');
		productImageContainer.appendChild(productImage);
		productImageContainer.addEventListener('click', handleClick);
		productImageContainer.dataset['productId'] = product.id;

		let productDiv = document.createElement("div");
		productDiv.classList.add("product");

		productDiv.appendChild(productImageContainer);
		productDiv.appendChild(productActions);

		productList.appendChild(productDiv);

	}
}

function getPage() {
	body.classList.add('loading');
	let request = new XMLHttpRequest();
	let queryString = getQueryParams();
	let url = "backend/products.php?" + queryString;
	request.open("get", url);
	request.onreadystatechange = function() {
		if (request.readyState == 3) {
			let response = JSON.parse(request.responseText);
			renderProducts(response);
		}
	};
	request.send();
}

function search(ev) {
	if (ev.keyCode == 13) {
		filters.page = 1;
		filters.search = searchBar.value;
		let request = new XMLHttpRequest();
		let queryString = getQueryParams();
		let url = "backend/products.php?" + queryString;

		request.open("get", url);
		request.onreadystatechange = function() {
			if (request.readyState == 3) {
				let response = JSON.parse(request.responseText);
				renderProducts(response);
			}
		};
		request.send();
	}
}
function home(ev) {
	filters.page=1;
	getPage();
}

window.onload = function() {
	productList = document.querySelector(".product_listing");
	searchBar = document.querySelector("input[name='search']");
	let flipkart=document.querySelector(".flip");
	flipkart.addEventListener('click',home);
	searchBar.addEventListener("keydown", search);
	getPage();
};

function getNextPage() {
	filters.page += 1;
	getPage();
}

function getPreviousPage() {
	if (filters.page <= 1) {
		return;
	} else {
		filters.page = filters.page - 1;
	}
	getPage();
}
