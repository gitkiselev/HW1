<?php

require_once '../config.php';
$data = array();
header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    $title = clear_str($_POST['projectName']);
    $link = clear_str($_POST['projectUrl']);
    $file = clear_str($_POST['fileurl']);
    $description = clear_str($_POST['text']);

    // Проверяем поля - название, урл, описание, файл
    if(empty($title) || empty($link) || empty($file) || empty($description)){
        $data['status'] = "NO";
        $data['mes'] = "Заполните все поля";
    } else {

        $file_dist = $_SERVER['DOCUMENT_ROOT'].'/img/work/'.$file;
        if(!file_exists($file_dist)){
            $data['status'] = "NO";
            $data['mes'] = "Вы не загрузили миниатюру проекта";
        } else {

            $sql = "INSERT INTO projects(title, link, description, thumb)
                    VALUES('{$title}', '{$link}', '{$description}', '{$file}')";

            $dbcon = connectToDB();
            $dbcon->exec($sql);

            $data['status'] = "OK";
            $data['mes'] = "Проект успешно добавлен в портфолио";

        }

    }


} else {

    $data['status'] = "NO";
    $data['mes'] = "Некорректное обращение к серверу";

}


echo json_encode($data);
exit;