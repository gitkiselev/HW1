<?php

header('Content-Type: application/json');

$name = $_POST['name'];
$mail = $_POST['mail'];
$password = $_POST['password'];


//действия с данными

sleep(1);

$result = true;

echo json_encode(array(
	'status' => $result,
));