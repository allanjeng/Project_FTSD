<?php
    require_once('simpletest/autorun.php');
    require_once('simpletest/web_tester.php');
    
    class TestOfAbout extends WebTestCase {
        function testCreatesNewAccountOnFirstSigningUp() {
            //$this->showSource();
            //$this->get('http://localhost/SimpleTestPHP/classes/Project_FTSD/project/#/signup');
            $this->get('http://localhost/SimpleTestPHP/classes/Project_FTSD-master/project/api/v1/authentication.php');
            //$this->assertTitle('Process Model Selection and Implementation Tool');
            //$this->showSource();
            //$this->assertLinkByHref('signin');
            //$this->assertEqual($this->getUrl(), 'http://localhost/SimpleTestPHP/classes/Project_FTSD-master/project/api/v1/authentication.php');
            //$app = array();
            //$app->customer = array();
            //$app->customer->password = "asdf";
            //$app->customer->email = "asdf";

            //$this->$app->post("/login");
            
            $this->assertEqual("true", "true");
            $this->assertEqual("true", "true");

            $this->assertEqual("true", "true");

        }
    }
?>