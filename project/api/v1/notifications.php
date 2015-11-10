/*<?php
    $app->post('/addNotification', function () use ($app) {
        $response = array();
        $r = json_decode($app->request->getBody());
        $name = $r->name;
        $db = new DbHandler();
        $result = $db->getOneRecord("select role from users where name='$name'");
        if ($result == 'admin' || $result == 'team_lead') {
            $tabble_name = "notifications";
            $column_names  = array('notifications');
            $content = array('notifications' => $notifications);
            $object = json_decode(json_encode($content), FALSE);
            $plz = $db->insertIntoTable($object, $column_names, $tabble_name);
            $response["status"] = "success";
            $response["message"] = "Notification added.";
            echoResponse(200, $response);
        } else if ($result == '') {
            $tabble_name = "notifications";
            $column_names  = array('notifications');
            $content = array('notifications' => $notifications);
            $object = json_decode(json_encode($content), FALSE);
            $plz = $db->insertIntoTable($object, $column_names, $tabble_name);
            $response["status"] = "success";
            $response["message"] = "Notification added.";
            echoResponse(200, $response);
        }
    });
    $app->post('/getNotifications', function () use ($app) {
        $db = new DbHandler();
        $result = $db->getRecords("select notification from notifications where accepted = '1'");
        $response["notifications"] = $result;
        $response["status"] = "success";
        $response["message"] = "Notifications Found";
        echoResponse(200, $response);
    });
    $app->post('/getNotificationMessage', function () use ($app) {
        $response = array();
        $r = json_decode($app->request->getBody());
        $notification = $r->notification;
        $db = new DbHandler();
        $result = $db->getRecords("select message from notifications where notification = '$notification');
        $response["message"] = $result;
        $response["status"] = "success";
        $response["message"] = "Message Found";
        echoResponse(200, $response);
    });
    $app->post('/getNotificationMessage', function () use ($app) {
        $response = array();
        $r = json_decode($app->request->getBody());
        $notification = $r->tempnotification;
        $db = new DbHandler();
        $result = $db->getRecords("select message from notifications where notification = '$notification');
        $response["message"] = $result;
        $response["status"] = "success";
        $response["message"] = "Message Found";
        echoResponse(200, $response);
    });
    $app->post('/getPendingNotifications', function () use ($app) {
        $db = new DbHandler();
        $result = $db->getRecords("select notification from notifications where accepted = '0'");
        $response["notifications"] = $result;
        $response["status"] = "success";
        $response["message"] = "Notifications Found";
        echoResponse(200, $response);
    });
    $app->post('/approveNotification', function () use ($app) {
        $response = array();
        $r = json_decode($app->request->getBody());
        $notification = $r->notification;
        $db = new DbHandler();
        $db->updateOneRecord("update notifications set accepted = 1 where notification='$notification'");
        $response["status"] = "success";
        $response["message"] = "Accepted '$notification' notification";
        echoResponse(200, $response);
    });
    $app->post('/deleteNotification', function () use ($app) {
        $response = array();
        $r = json_decode($app->request->getBody());
        $notification = $r->notification;
        $db = new DbHandler();
        $db->updateOneRecord("delete from notifications where notification='$notification'");
        $response["status"] = "success";
        $response["message"] = "Accepted '$notification' notification";
        echoResponse(200, $response);
    });
    $app->post('/tempDeleteNotification', function () use ($app) {
        $response = array();
        $r = json_decode($app->request->getBody());
        $notification = $r->notification;
        $db = new DbHandler();
        //make this the comment
        $db->updateOneRecord("delete from notifications where notification='$notification'");
        $response["status"] = "success";
        $response["message"] = "Accepted '$notification' notification";
        echoResponse(200, $response);
    });
?>*/
