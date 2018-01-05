let filters = {
	page: 1,
	size: 10,
	search: ''
}
let productList = undefined;
let searchBar = undefined;

function getQueryParams() {
	let arr = [];
	for(let key in filters){
		let p = key+'='+filters[key];
		arr.push(p);
	}

	return arr.join('&');
}

function printClick(ev) {
	console.log(this.dataset['productName'])
}

function renderProducts(response) {
	let data = response.data;
	while (productList.firstChild) {
		productList.removeChild(productList.firstChild);
	}

	for (let i = 0; i < data.length; i++) {
		let product = data[i];
		let productDiv = document.createElement("div");
		let name = document.createElement("span");
		name.innerText = product.id + ". " + product.name;
		productDiv.appendChild(name);
		productDiv.classList.add("product");
		productDiv.dataset['productName'] = product.name;
		productDiv.addEventListener('click', printClick);
		productList.appendChild(productDiv);

	}
}

function getPage() {
	let request = new XMLHttpRequest();
	let queryString = getQueryParams();
	let url = "products.php?" + queryString;
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
		let url = "products.php?" + queryString;

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
