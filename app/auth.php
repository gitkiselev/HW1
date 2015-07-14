<?php
session_start();
require_once '../config.php';
header('Content-Type: application/json');

$data = array();

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $login = clear_str($_POST['login']);
    $password = md5($_POST['password']);

    $sql = "SELECT COUNT(users.id) as cnt FROM users WHERE login = '{$login}' AND password = '{$password}'";
    $dbcon = connectToDB();
    $check_user = getDataAsArray($dbcon, $sql);
    $is_admin = $check_user[0]['cnt'];

    if($is_admin){
        $_SESSION['auth'] = true;
        $data['status'] = "OK";
        $data['mes'] = "Добро пожаловать";
    } else {
        $data['status'] = "NO";
        $data['mes'] = "Нет такого пользователя в системе";
    }

} else {
    $data['status'] = "NO";
    $data['mes'] = "Ошибка при обращении к файлу";
}

echo json_encode($data);
exit;