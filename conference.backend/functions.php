<?php

function getData($route, $params = []) {
    $filePath = makeRoutePath($route);

    if (!file_exists($filePath)) {
        http_response_code(404);
        exit('Not found');    
    }

    $dataJSON = file_get_contents($filePath);
    $data = json_decode($dataJSON, true);

    if (!empty($params['id'])) {
        $id = $params['id'];
        return array_find($data, function ($element) use ($id) {
            return (int) $element['id'] === (int) $id;
        });
    }
    
    return $data;
}

function postData($route, $params = []) {
    $filePath = makeRoutePath($route);
    
    if (!file_exists($filePath)) {
        http_response_code(404);
        exit('Not found');    
    }

    $dataJSON = file_get_contents($filePath);
    $data = json_decode($dataJSON, true);
    $newData;
    
    switch ($route) {
        case 'news': {
            if (empty($params['title']) || empty($params['text']) || empty($params['author'])) {
                http_response_code(400);
                exit('Request error');    
            }

            $newData = [
                'title' => $params['title'],
                'text' => $params['text'],
                'author' => $params['author'],
            ];

            break;
        }

        case 'users': {
            if (empty($params['login']) || empty($params['name']) || empty($params['password'])) {
                http_response_code(400);
                exit('Request error');    
            }
            
            $newData = [
                'login' => $params['login'],
                'name' => $params['name'],
                'password' => $params['password'],
            ];

            break;
        }
    }

    $lastDataId = $data[count($data) - 1]['id'];
    $newData['id'] = ++$lastDataId;
    $data[] = $newData;

    $dataToWriteJSON = json_encode($data, JSON_UNESCAPED_UNICODE);
    $writeReslt = file_put_contents($filePath, $dataToWriteJSON);

    if (!$writeReslt) {
        http_response_code(500);
        echo 'Internal server error';
        exit;
    }

    return $newData;
}

function deleteData($route, $params = []) {
    $filePath = makeRoutePath($route);
    
    if (!file_exists($filePath)) {
        http_response_code(404);
        exit('Not found');    

    } else if (empty($params['id'])) {
        http_response_code(400);
        exit('Request error');    
    }

    $dataJSON = file_get_contents($filePath);
    $data = json_decode($dataJSON, true);
    $deletableId = $params['id'];

    $dataToDelete = array_find($data, function ($element) use ($deletableId) {
        return (int) $element['id'] === (int) $deletableId;
    });

    if (empty($dataToDelete)) {
        http_response_code(404);
        exit('Not found');    
    }

    $resultData = array_filter($data, function ($element) use ($deletableId) {
        return (int) $element['id'] !== (int) $deletableId;
    });

    $dataToWriteJSON = json_encode($resultData, JSON_UNESCAPED_UNICODE);
    $writeReslt = file_put_contents($filePath, $dataToWriteJSON);

    if (!$writeReslt) {
        http_response_code(500);
        echo 'Internal server error';
        exit;
    }

    return $dataToDelete;
}

function makeRoutePath($route) {
    $filenameJson = $route . '.json';
    $dataDirPath = __DIR__ . '/data/';
    return $dataDirPath . $filenameJson;
}

function array_find($haystack, $callback) {
    foreach ($haystack as $element)
        if ($callback($element))
            return $element;
}