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

$app->post('/getProjects', function() use ($app){
    $response = array();
    $db = new DbHandler();
    
    $session = $db->getSession();
    $uid = $session['uid'];
     
    
    $result = $db->getRecordsAlt("select project_name, project_id, project_model from project where project_owner='$uid'");
   
    $response["projects"] = $result;
    
    $response["status"] = "success";
    echoResponse(200, $response);
});

$app->post('/changeName', function () use ($app) {
  $response = array();
  $r = json_decode($app->request->getBody());
  $projectId = $r->projectId;
  $projectName = $r->projectName;
  
  if ($projectName == "") {
    $response["status"] = "error";
    $response["message"] = "Project Name cannot be empty.";
    echoResponse(200, $response);
    $app->stop();
  }
  $db = new DbHandler();
  $db->updateOneRecord("update project set project_name = '$projectName' where project_id='$projectId'");
  $response["status"] = "success";
  $response["message"] = "Update Project Name to '$projectName'";
  echoResponse(200, $response);
});
$app->post('/updateModel', function () use ($app) {
  $response = array();
  $r = json_decode($app->request->getBody());
  $projectId = $r->projectId;
  $projectModel = $r->projectModel;
  
  if ($projectModel == "") {
    $response["status"] = "error";
    $response["message"] = "Project Name cannot be empty.";
    echoResponse(200, $response);
    $app->stop();
  }
  $db = new DbHandler();
  $db->updateOneRecord("update project set project_model = '$projectModel' where project_id='$projectId'");
  $response["status"] = "success";
  $response["message"] = "Update Project Model to '$projectModel'";
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

$app->post('/moveTL', function () use ($app) {
  $response = array();
  $r = json_decode($app->request->getBody());
  $tl = $r->tl;
  $tn = $r->tn;
  $r2 = json_encode($app->request->getBody());
  if ($tn == "Move To") {
    $response["status"] = "error";
    $response["message"] = "Cannot move '$tl' to '$tn'. Select valid team.";
    echoResponse(200, $response);
    $app->stop();
  }
  $db = new DbHandler();
  $db->updateOneRecord("update users set teamname = '$tn' where name='$tl'");
  $response["status"] = "success";
  $response["message"] = "Moved '$tl' to '$tn'";
  echoResponse(200, $response);
});

$app->post('/getteammates', function () use ($app) {
  $response = array();
  $r = json_decode($app->request->getBody());
  $role = $r->role;
  $uid = $r->uid;
  $db = new DbHandler();
  if ($role == "admin") {
    $result_teammates = $db->getRecords("select name,teamname from users where teamname != ''");
    $result_free_teammates = $db->getRecords("select name from users where teamname = ''");
    $result_tn = $db->getRecords("select teamname from users where teamname != ''");
    $result_roles = $db->getRecords("SELECT user_roles.name,user_roles.role,user_roles.teamname FROM user_roles LEFT JOIN users ON user_roles.uid = users.uid WHERE users.role = 'team_member'");
    $result_free_roles = $db->getRecords("SELECT users.name,users.teamname FROM users WHERE users.uid NOT IN (SELECT user_roles.uid FROM user_roles) AND users.role = 'team_member'");
    $response["teammates"] = $result_teammates;
    $response["free_teammates"] = $result_free_teammates;
    $response["tn"] = $result_tn;
    $response["roles"] = $result_roles;
    $response["free_roles"] = $result_free_roles;
    $response["status"] = "success";
    $response["message"] = "Users Found";
    echoResponse(200, $response);
  } else {
    $result_tn = $db->getOneRecord("select teamname from users where uid='$uid'");
    $teamname = $result_tn['teamname'];
    $result_teammates = $db->getRecords("select name,teamname from users where teamname = '$teamname'");
    $result_free_teammates = $db->getRecords("select name from users where teamname = ''");
    $result_roles = $db->getRecords("SELECT user_roles.name,user_roles.role,user_roles.teamname FROM user_roles LEFT JOIN users ON user_roles.uid = users.uid WHERE users.role = 'team_member'");
    $result_free_roles = $db->getRecords("SELECT users.name,users.teamname FROM users WHERE users.uid NOT IN (SELECT user_roles.uid FROM user_roles) AND users.role = 'team_member' AND users.teamname = '$teamname'");
    $tm_result = $result_teammates['teamname'];
    $response["teammates"] = $result_teammates;
    $response["free_teammates"] = $result_free_teammates;
    $response["tn"] = $result_tn;
    $response["roles"] = $result_roles;
    $response["free_roles"] = $result_free_roles;
    $response["status"] = "success";
    $response["message"] = "Users Found";
    echoResponse(200, $response);
  }
});

$app->post('/moveTM', function () use ($app) {
  $response = array();
  $r = json_decode($app->request->getBody());
  $tm = $r->tm;
  $tn = $r->tn;
  $r2 = json_encode($app->request->getBody());
  if ($tn == "") {
    $response["status"] = "error";
    $response["message"] = "Cannot move '$tm' to '$tn'. Select valid team.";
    echoResponse(200, $response);
    $app->stop();
  }
  $db = new DbHandler();
  $db->updateOneRecord("update users set teamname = '$tn' where name='$tm'");
  $response["status"] = "success";
  $response["message"] = "Moved '$tm' to '$tn'";
  echoResponse(200, $response);
});

$app->post('/assignRole', function () use ($app) {
  $response = array();
  $r = json_decode($app->request->getBody());
  $fr = $r->fr;
  $rc = $r->rc;
  $db = new DbHandler();
  $result = $db->getOneRecord("select uid,teamname from users where name='$fr'");
  $confirm_tabble_name = "user_roles";
  $confirm_column_names  = array('id', 'name', 'teamname', 'role', 'uid');
  $content = array('id' => 'NULL', 'name' => $fr, 'teamname' => $result['teamname'], 'role' => $rc, 'uid' => $result['uid']);
  $object = json_decode(json_encode($content), FALSE);
  $db->oneRecord("DELETE FROM project.user_roles WHERE name = '$fr'");
  $plz = $db->insertIntoTable($object, $confirm_column_names, $confirm_tabble_name);
  $response["status"] = "success";
  $response["message"] = "Assigned role";
  echoResponse(200, $response);
});

$app->post('/createProject', function () use ($app) {
  $response = array();
  $r = json_decode($app->request->getBody());

  if (!isset($r->projectName) OR $r->projectName=="" OR $r->projectModel==""){
    $response["status"] = "error";
    $response["message"] = "You need to input projectName, and select a model of your choice.";
    echoResponse(200, $response);
    $app->stop();
  }
  $projectName = $r->projectName;
  $projectModel = $r->projectModel;
  $projectOwner = $r->projectOwner;
  $projectDescription = $r->projectDes;
  
  $db = new DbHandler();
  $confirm_tabble_name = "project";
  $confirm_column_names  = array('project_name', 'project_owner', 'project_description', 'project_model');
  $content = array('project_name' => $projectName, 'project_owner' => $projectOwner, 'project_model' => $projectModel, 'project_description' => $projectDescription);
  $object = json_decode(json_encode($content), FALSE);
  $plz = $db->insertIntoTable($object, $confirm_column_names, $confirm_tabble_name);
  $response["status"] = "success";
  $response["message"] = "Project Created.";
  echoResponse(200, $response);
});

?>
