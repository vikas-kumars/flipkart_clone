window.onload=function () {
	let request= new XMLHttpRequest();
	let search = window.location.search;
	let fetch="backend/details.php" + search;
	request.open("get",fetch);
	request.onreadystatechange=function() {
		if (request.readyState == 3) {
			let response = JSON.parse(request.responseText);
			document.querySelector(".details").innerHTML=response.data[0].name;

		}
	};
	request.send();
}
