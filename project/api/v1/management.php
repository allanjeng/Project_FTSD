<?php
$app->post('/addTeamLeadID', function () use ($app) {
  $response = array();
  $r = json_decode($app->request->getBody());
  $teamleadid = $r->teamleadid;
  $db = new DbHandler();
  $result = $db->getOneRecord("select teamleadid from teamleadid where teamleadid='$teamleadid'");
  if ($result == null) {
    $tabble_name = "teamleadid";
    $column_names  = array('teamleadid');
    $content = array('teamleadid' => $teamleadid);
    $object = json_decode(json_encode($content), FALSE);
    $plz = $db->insertIntoTable($object, $column_names, $tabble_name);
    $response["status"] = "success";
    $response["message"] = "Team Lead ID added.";
    echoResponse(200, $response);
  } else {
    $response["status"] = "error";
    $response["message"] = "Team Lead ID already exists.";
    echoResponse(201, $response);
  }
});

$app->post('/getCompanies', function () use ($app) {
  $db = new DbHandler();
  $result = $db->getRecords("select companyname from users");
  $response["companies"] = $result;
  $response["status"] = "success";
  $response["message"] = "Companies Found";
  echoResponse(200, $response);
});

$app->post('/getUsers', function () use ($app) {
  $response = array();
  $r = json_decode($app->request->getBody());
  $company = $r->company;
  $db = new DbHandler();
  $tl_result = $db->getRecords("select name from users where companyname='$company' and role='team_lead'");
  if ($tl_result == null) {
    $tl_result = 0;
  }
  $tm_result = $db->getRecords("select name from users where companyname='$company' and role='team_member'");
  if ($tm_result == null) {
    $tm_result = 0;
  }
  $response["tl"] = $tl_result;
  $response["tm"] = $tm_result;
  $response["status"] = "success";
  $response["message"] = "Users Found";
  echoResponse(200, $response);
});

$app->post('/promoteTL', function () use ($app) {
  $response = array();
  $r = json_decode($app->request->getBody());
  $tl = $r->tl;
  $db = new DbHandler();
  $db->updateOneRecord("update users set role = 'admin' where name='$tl'");
  $response["status"] = "success";
  $response["message"] = "Promoted '$tl' to Administrator";
  echoResponse(200, $response);
});

$app->post('/promoteTM', function () use ($app) {
  $response = array();
  $r = json_decode($app->request->getBody());
  $tm = $r->tm;
  $db = new DbHandler();
  $db->updateOneRecord("update users set role = 'team_lead' where name='$tm'");
  $response["status"] = "success";
  $response["message"] = "Promoted '$tm' to Team Lead";
  echoResponse(200, $response);
});

$app->post('/getUsersM', function () use ($app) {
  $response = array();
  $r = json_decode($app->request->getBody());
  $company = $r->company;
  $db = new DbHandler();
  $tl_result = $db->getRecords("select name from users where companyname='$company' and role='team_lead'");
  if ($tl_result == null) {
    $tl_result = 0;
  }
  $tm_result = $db->getRecords("select teamname from users where companyname='$company' and role='team_lead'");
  if ($tm_result == null) {
    $tm_result = 0;
  }
  $response["tl"] = $tl_result;
  $response["tm"] = $tm_result;
  $response["status"] = "success";
  $response["message"] = "Users Found";
  echoResponse(200, $response);
});

?>
