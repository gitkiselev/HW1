<?php

require_once '../config.php';

$data = array();
header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $name = clear_str($_POST['name']);
    $email = clear_str($_POST['email']);
    $message = clear_str($_POST['message']);
    $recaptcha = $_POST['g-recaptcha-response'];
    $ip = $_SERVER['REMOTE_ADDR'];

    // если не прошли проверку капчу
    if(!check_captcha(SECRET_KEY, $recaptcha, $ip)){
        $data['status'] = "NO";
        $data['mes'] = "Капча заполнена не верно";
    } elseif (empty($name) || empty($email) || empty($message)){
        $data['status'] = "NO";
        $data['mes'] = "Заполните все поля";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $data['status'] = "NO";
        $data['mes'] = "Вы указали не валидный email";
    } else{

        $data_send_admin = array(
            'subject' => 'Письмо с сайта портфолио от посетителя '. $name,
            'message' => 'Сообщение от посетителя <a href="mailto:'.$email.'">'.$name.'</a><br /><br />'.$message,
            'email_from' => 'agolomazov@itloft.ru',
            'name_from'  => 'Антон Голомазов',
            'email_to'   => 'cesear@bk.ru',
            'name_to'    => 'Антону Голомазову'
        );

        $data_send_user = array(
            'subject' => 'Спасибо за ваше сообщение!',
            'message' => 'Спасибо вам за ваше письмо, мы скоро с вами свяжемся',
            'email_from' => 'agolomazov@itloft.ru',
            'name_from'  => 'Антон Голомазов',
            'email_to'   => $email,
            'name_to'    => $name
        );

        send_message_to_email($data_send_admin);
        send_message_to_email($data_send_user);


        $data['status'] = "OK";
        $data['mes'] = "Письмо успешно отправлено";



    }



} else {

    $data['status'] = "NO";
    $data['mes'] = "Некорректное обращение к серверу";

}


echo json_encode($data);
exit;