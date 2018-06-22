<?php
require_once 'functions.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE');
header('Content-Type: application/json');

try {
    if (empty($_GET['page'])) {
        http_response_code(404);
        exit('Not found');
    }

    $route = $_GET['page'];
    $data;

    switch($_GET['method']) {
        case 'GET': {
            $data = getData($route, $_GET);
            break;
        }

        case 'POST': {
            $data = postData($route, $_GET);
            break;
        }

        case 'DELETE': {
            $data = deleteData($route, $_GET);
            break;
        }

        case 'OPTIONS': {
            $data = ['auth' => true];
        }
    }

    if (empty($data)) {
        http_response_code(404);
        exit('Not found');
    }

    echo json_encode($data, JSON_UNESCAPED_UNICODE);

} catch (Exception $error) {
    http_response_code(500);
    exit('Internal server error');
}