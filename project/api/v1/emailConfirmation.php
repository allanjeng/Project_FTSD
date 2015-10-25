<?php

class emailConfirmation {

    function __construct() {
    require '../libs/PHPMailer/PHPMailerAutoload.php';

    }

    public function sendEmail($email, $name, $key) {
        $mail = new PHPMailer;

        #$mail->SMTPDebug = 0;                               // Enable verbose debug output

        $mail->isSMTP();                                      // Set mailer to use SMTP
        $mail->Host = 'email.uiowa.edu;email.uiowa.edu';  // Specify main and backup SMTP servers
        $mail->SMTPAuth = true;                               // Enable SMTP authentication
        $mail->Username = 'juwalker';                 // SMTP username
        $mail->Password = 'XXXX';                           // SMTP password
        $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $mail->Port = 587;                                    // TCP port to connect to

        $mail->setFrom('judah-walker@uiowa.edu', 'Judah Walker');
        $mail->addAddress($email, $name);     // Add a recipient
        #$mail->addAddress('judah-walker@uiowa.edu', 'Judah Walker');
        $mail->addReplyTo('noreply@uiowa.edu', 'None');

        $mail->isHTML(true);                                  // Set email format to HTML


        #$mail->Subject = 'Here is the subject';
        #$mail->Body    = 'This is the HTML message body <b>in bold!</b>';
        #$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
        $mail->Subject = 'Validate Email Account';
        $link = 'http://localhost/project/#/login/' . $key;
        $mail->Body    = 'Click this link and login to validate email: <a href=' . $link . '>Click Here!</a>';
        $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

        $mail->send();
    }

}
?>
