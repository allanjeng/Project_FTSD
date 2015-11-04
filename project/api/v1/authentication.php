<?php
$app->get('/session', function() {
    $db = new DbHandler();
    $session = $db->getSession();
    $response["uid"] = $session['uid'];
    $response["email"] = $session['email'];
    $response["name"] = $session['name'];
    echoResponse(200, $session);
});

$app->post('/login', function() use ($app) {
    $key = $app->request()->params('key');
    if ($key != null) {
      $db = new DbHandler();
      $email = $db->getOneRecord("select email from confirm where validation_key='$key'");
      $uid = $db->getOneRecord("select uid from users where email='$email'");
      $db->updateOneRecord("update users set active = '1' where uid='$uid'");
    }
    require_once 'passwordHash.php';
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'password'),$r->customer);
    $response = array();
    $db = new DbHandler();
    $password = $r->customer->password;
    $email = $r->customer->email;
    $user = $db->getOneRecord("select uid,name,password,email,created from users where email='$email' and active='1'");
    if ($user != NULL) {
        if(passwordHash::check_password($user['password'],$password)){
        $response['status'] = "success";
        $response['message'] = 'Logged in successfully.';
        $response['name'] = $user['name'];
        $response['uid'] = $user['uid'];
        $response['email'] = $user['email'];
        $response['createdAt'] = $user['created'];
        if (!isset($_SESSION)) {
            session_start();
        }
        $_SESSION['uid'] = $user['uid'];
        $_SESSION['email'] = $email;
        $_SESSION['name'] = $user['name'];
        } else {
            $response['status'] = "error";
            $response['message'] = 'Login failed. Incorrect credentials';
        }
    }else {
            $response['status'] = "error";
            $response['message'] = 'User is unregistered or inactive. Check email if registered.';
        }
    echoResponse(200, $response);
});
$app->post('/signUp', function() use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    verifyRequiredParams(array('email', 'name', 'password', 'work_phone', 'DOB', 'role'),$r->customer);
    require_once 'passwordHash.php';
    $db = new DbHandler();
    $work_phone = $r->customer->work_phone;
    $mobile_phone = $r->customer->mobile_phone;
    $DOB = $r->customer->DOB;
    $name = $r->customer->name;
    $email = $r->customer->email;
    $address = $r->customer->address;
    $password = $r->customer->password;
    $companyname = $r->customer->companyname;
    $teamname = $r->customer->teamname;
    $teamleadid = $r->customer->teamleadid;
    $role = $r->customer->role;
    $r->customer->active = "0";
    $isUserExists = $db->getOneRecord("select 1 from users where email='$email'");
    if(!$isUserExists){
        $r->customer->password = passwordHash::hash($password);
        $tabble_name = "users";
        $column_names = array('work_phone', 'mobile_phone', 'name', 'email', 'password', 'address', 'DOB', 'role', 'teamleadid', 'teamname', 'companyname', 'active');
        $result = $db->insertIntoTable($r->customer, $column_names, $tabble_name);
        if ($result != NULL) {
            $db = new DbHandler();
            $key = $name . $email;
            $key = md5($key);
            $confirm_tabble_name = "confirm";
            $confirm_column_names  = array('id', 'validation_key', 'email');
            $content = array('id' => 'NULL', 'validation_key' => $key,'email' => $email);
            $object = json_decode(json_encode($content), FALSE);
            $plz = $db->insertIntoTable($object, $confirm_column_names, $confirm_tabble_name);


            $response["status"] = "success";
            $response["message"] = "User account created successfully. Check email for validation.";
            $response["uid"] = $result;
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['uid'] = $response["uid"];
            $_SESSION['phone'] = $work_phone;
            $_SESSION['name'] = $name;
            $_SESSION['email'] = $email;
            echoResponse(200, $response);
            $mails = new emailConfirmation();
            $mails->sendEmail($email, $name, $key);
        } else {
            $response["status"] = "error";
            $response["message"] = "Failed to create customer. Please try again";
            echoResponse(201, $response);
        }
    }else{
        $response["status"] = "error";
        $response["message"] = "An user with the provided phone or email exists!";
        echoResponse(201, $response);
    }
});

$app->post('/validate', function () use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    $key = $r->key;
    $db = new DbHandler();
    $dbemail = $db->getOneRecord("select email from confirm where validation_key='$key'");
    $email = $dbemail['email'];
    $dbuid = $db->getOneRecord("select uid from users where email='$email'");
    $uid = $dbuid['uid'];
    $db->updateOneRecord("update users set active = '1' where uid='$uid'");
    $response["status"] = "success";
    $response["message"] = "Account activated.";
    echoResponse(200, $response);
});


$app->get('/logout', function() {
    $db = new DbHandler();
    $session = $db->destroySession();
    $response["status"] = "info";
    $response["message"] = "Logged out successfully";
    echoResponse(200, $response);
});

$app->post('/forgotPassword', function () use ($app) {
    $response = array();
    $r = json_decode($app->request->getBody());
    $email = $r->email;
    $db = new DbHandler();
    $result = $db->getOneRecord("select email,active,name from users where email='$email'");
    if ($result == null) {
      $response["status"] = "error";
      $response["message"] = "No email account found.";
      echoResponse(201, $response);
    } elseif ($result['active'] == "0") {
      $response["status"] = "error";
      $response["message"] = "Email account not active yet. Check your email.";
      echoResponse(201, $response);
    } else {
      $email = $result['email'];
      $name = $result['name'];
      $key = $name . $email;
      $key = md5($key);
      $mails = new emailConfirmation();
      $response["status"] = "success";
      $response["message"] = "Account reset link sent to email.";
      echoResponse(200, $response);
      $mails->sendForgotPasswordEmail($email, $name, $key);
    }
});

$app->post('/resetPassword', function () use ($app) {
    require_once 'passwordHash.php';
    $response = array();
    $r = json_decode($app->request->getBody());
    $password_non = $r->password;
    $password = passwordHash::hash($password_non);
    $key = $r->key;
    $db = new DbHandler();
    $dbemail = $db->getOneRecord("select email from confirm where validation_key='$key'");
    $email = $dbemail['email'];
    $dbuid = $db->getOneRecord("select uid from users where email='$email'");
    $uid = $dbuid['uid'];
    $db->updateOneRecord("update users set password = '$password' where uid='$uid'");
    $response["status"] = "success";
    $response["message"] = "Account password sucessfully reset.";
    echoResponse(200, $response);
});

?>
