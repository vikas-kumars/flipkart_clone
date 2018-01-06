<?php 
	header('Content-Type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "flipkart";

	$success = true;
	$data = array();

	if (!isset($_GET['page'])) {
		$page = 1;
	}else{
		$page = $_GET['page'];
	}

	if (!isset($_GET['size'])) {
		$page_size = 10;
	}else{
		$page_size = $_GET['size'];
	}

	if (isset($_GET['search'])) {
		$search_term = $_GET['search'];
	}

	$page = intval($page);
	$page_size = intval($page_size);

	// Create connection
	$db = mysqli_connect($servername, $username, $password, $dbname);

	// Check connection
	if (!$db) {
		$success = false;
	} else {
		$starting_product = (($page - 1) * $page_size);
		$query = "select id, name, image_url from products ";
		if (isset($search_term)) {
			$query .= "where name like '%$search_term%' ";
		}
		$query .= "limit $starting_product,$page_size";
		$products = mysqli_query($db, $query);

		if (mysqli_num_rows($products) > 0) {
			while($product = mysqli_fetch_assoc($products)){
				array_push($data, $product);
			}
		}
	}
	
	$result = array('data' => $data, 'success' => $success);
	echo json_encode($result);
?>
