<?php
if(isset($_POST['form']) && !empty($_POST['form'])){
  $form = $_POST['form'];
  foreach( $form as $item){
    $tmp[$item['name']] = $item['value'];
  }
  $form = $tmp;
}

if(isset($form) && !empty($form)) {
  $to = array('joel@bluelabelweb.com', 'joel@addmins.com'); //receiver of the post joel@addmins.com,
  $subject = 'New Inqury for bluelabelweb';
  
  $message = 'Name: ' . $form['formName'] . "\r\n\r\n";
  $message .= 'Comany: ' . $form['formCompany'] . "\r\n\r\n";
  $message .= 'Email: ' . $form['formEmail'] . "\r\n\r\n";
  $message .= 'Phone: ' . $form['formPhone'] . "\r\n\r\n";
  $message .= 'Company Sells: ' . $form['formOffers'] . "\r\n\r\n";
  $message .= 'Project description: ' . $form['formTextarea'];
  
  $headers = "From: no-reply@bluelabelweb.com\r\n";
  $headers .= "Content-Type: text/plain; charset=utf-8";
  
  $email = filter_input(INPUT_POST, 'formEmail', FILTER_VALIDATE_EMAIL);
  if ($email) {
     $headers .= "\r\nReply-To: $email";
  }
  
  $success = @mail(implode(',', $to), $subject, $message, $headers);
}
?>


<?php if(isset($success) && $success) { ?>
    <h1>Thank you!</h1>
    <p>your message has been passed</p>
<?php } else { ?>
             <h1>Oops sorry, something went wrong with your email, please retry</h1>
<?php } ?>
