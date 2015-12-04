<?php

$app->post('/createP',function() use ($app){
	$db = new DbHandler();
});
$app->post('/projectManage',function() use ($app){
	$response["status"] = "success";
});
?>