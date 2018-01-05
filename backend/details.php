<?php 
	header('Content-Type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "flipkart";

	$success = true;
	$data = array();

	if (isset($_GET['id'])) {
		$id = $_GET['id'];
	}

	$db = mysqli_connect($servername, $username, $password, $dbname);

	// Check connection
	if (!$db || !isset($id)) {
		$success = false;
	} else {
		$query = "select * from products where  id in ($id)";
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
