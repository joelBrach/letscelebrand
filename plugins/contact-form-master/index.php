<!--

	All PHP code was added by Ashley Tonkin
	Email: mrashtonka@gmail.com

	Form was build by CodyHouse

	Copyright by Ashley Tonkin 2015


	If you have any questions feel free to email me.
	Twitter: @MrAshTonka
	Facebook: ToNkAsH

-->

<?php
require_once 'core/init.php'; //adding init file to index
$user = new User(); //Calling class file to be used
?>
<!doctype html>
<html lang="en" class="no-js">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,700' rel='stylesheet' type='text/css'>

	<link rel="stylesheet" href="css/reset.css"> <!-- CSS reset -->
	<link rel="stylesheet" href="css/style.css"> <!-- Resource style -->
	<script src="js/modernizr.js"></script> <!-- Modernizr -->
  	
	<title>Contact Form | CodyHouse</title>
</head>
<body>
	<form class="cd-form floating-labels" action="" method="post"> <!-- Added Action and Methos to the form. -->
		<fieldset>
			<legend>Account Info</legend>
			<?php
				if(Input::exists()) { //Checking if there are inputs
			        $validate = new Validate(); //calling Validation class
			        $validation = $validate->check($_POST, array(
			            'Name'  => array( //using name in the input section you can validate your inputs here
			                'required' 	=> true, //something has to be added into the name section
			                'min'   	=> 2, //nothing less then 2
			                'max'   	=> 255 //nothing over 255
			            ),
			            'Company' => array(
			                'required' 	=> false,
			                'min' 		=> 2,
			                'max' 		=> 255
			            ),
			            'Email' => array(
			                'required'  => true
			            ),
			            'Project_Description' => array(
			                'required' 	=> true
			            )
			        ));

			        if($validation->passed()) { //if validation has passed 
			            $user = new User(); //calling class file within the validation if statment
			                
			            try {
			            	if(isset($_POST['Features'])){
			                $user->create(array( //adding items to a database.
			                    'Name' 					=> Input::get('Name'), //getting information form the form to ass to database
			                    'Company'  				=> Input::get('Company'),
			                    'Email'     			=> Input::get('Email'), // Email is the database table name
			                    'Phone'					=> Input::get('Phone'),
			                    'Budget'				=> Input::get('Budget'),
			                    'Project_Type'			=> Input::get('Project_Type'),
			                    'Features'				=> implode(', ', $_POST['Features']), //Imploding Features to display more then one if more then one is selected and spacing them with a comma ',' to look neat
			                    'Project_Description' 	=> Input::get('Project_Description'),
			                    'Sent'    				=> date('Y-m-d H:i:s'),
			                    'IP_Address' 			=> $user->_ip() //Getting users IP address for security reasons
			                ));
			            }else{
			            	$user->create(array( //adding items to a database.
			                    'Name' 					=> Input::get('Name'), //getting information form the form to ass to database
			                    'Company'  				=> Input::get('Company'),
			                    'Email'     			=> Input::get('Email'), // Email is the database table name
			                    'Phone'					=> Input::get('Phone'),
			                    'Budget'				=> Input::get('Budget'),
			                    'Project_Type'			=> Input::get('Project_Type'),
			                    'Project_Description' 	=> Input::get('Project_Description'),
			                    'Sent'    				=> date('Y-m-d H:i:s'),
			                    'IP_Address' 			=> $user->_ip() //Getting users IP address for security reasons
			                ));
			            }

			                //Send email to email address
			                $adminEmail = 'joel@addmins.com'; //Your own email address
			                $subject = "Email from your Contact Form";
			                // Set Message
			                if(isset($_POST['Features'])){
								$message = "Email from: " . Input::get('Name') . "<br />";
								$messgae .= "Company: " . Input::get('Company') . "<br />";
								$message .= "Email address: " . Input::get('Email') . "<br />";
								$message .= "Phone Number" . Input::get('Phone') . "<br />";
								$messgae .= "Budget: " . Input::get('Budget') . "<br />";
								$message .= "Project Type: " . Input::get('Project_Type') . "<br />";
								$message .= "Features: " . implode(', ', $_POST['Features']) . "<br />";
								$message .= "Message: <br />";
								$message .= Input::get('Project_Description');
								$message .= "<br /> ----- <br /> This email was sent from your site's contact form. <br />";
								$message .= "Email sent: " . date('Y-m-d H:i:s') . "<br />";
								$message .=  Input::get('Name') . " IP Addrress: " . $user->_ip() . "<br />";
							}else{
								$message = "Email from: " . Input::get('Name') . "<br />";
								$messgae .= "Company: " . Input::get('Company') . "<br />";
								$message .= "Email address: " . Input::get('Email') . "<br />";
								$message .= "Phone Number" . Input::get('Phone') . "<br />";
								$messgae .= "Budget: " . Input::get('Budget') . "<br />";
								$message .= "Project Type: " . Input::get('Project_Type') . "<br />";
								$message .= "Message: <br />";
								$message .= Input::get('Project_Description');
								$message .= "<br /> ----- <br /> This email was sent from your site's contact form. <br />";
								$message .= "Email sent: " . date('Y-m-d H:i:s') . "<br />";
								$message .=  Input::get('Name') . " IP Addrress: " . $user->_ip() . "<br />";
							}
							// Set From: header
							$from =  Input::get('Name') . " <" . Input::get('Email') . ">";

							// Email Headers
							$headers = "From: " . $from . "\r\n";
							$headers .= "Reply-To: ". Input::get('Email') . "\r\n";
							$headers .= "MIME-Version: 1.0\r\n";
							$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

      						$mail = mail($adminEmail, $subject, $message, $headers);

			            } catch(Exception $e) {
			                die($e->getMessage());
			            }
			        }else{ //If validation fails display errros to screen
			            echo '<div class="error-message">';
			            foreach($validation->errors() as $error) {
			                echo '<p>'. str_replace('_', ' ', $error), '</p><br>'; //removes any '_' in Names
			            }
			            echo '</div>';
			        }
			    }
			?>
			<div class="icon">
				<label class="cd-label" for="cd-name">Name</label>
				<input class="user" type="text" value="<?php echo Input::get('Name'); ?>" name="Name" id="cd-name">
		    </div> 

		    <div class="icon">
		    	<label class="cd-label" for="cd-company">Company</label>
				<input class="company" type="text" value="<?php echo Input::get('Company'); ?>" name="Company" id="cd-company">
		    </div> 

		    <div class="icon">
		    	<label class="cd-label" for="cd-email">Email</label>
				<input class="email" type="email" value="<?php echo Input::get('Email'); ?>" name="Email" id="cd-email">
		    </div>
		    <div class="icon">
		    	<label class="cd-label" for="cd-email">Phone</label>
				<input class="email" type="phone" value="<?php echo Input::get('Phone'); ?>" name="Phone" id="cd-email">
		    </div>
		</fieldset>

		<fieldset>
			<legend>Project Info</legend>

			<div>
				<h4>Budget</h4>

				<p class="cd-select icon">
					<select class="budget" name="Budget">
						<option value="&lt; $5000">&lt; $5000</option> <!-- Removed the default option --> 
						<option value="$5000 - $10000">$5000 - $10000</option>
						<option value="&gt; $10000">&gt; $10000</option>
					</select>
				</p>
			</div> 

			<div>
				<h4>Project type</h4>

				<ul class="cd-form-list">
					<li>
						<input type="radio" name="Project_Type" value="Choice 1" id="cd-radio-1" checked> <!-- Added value to radio buttons -->
						<label for="cd-radio-1">Choice 1</label>
					</li>
						
					<li>
						<input type="radio" name="Project_Type" value="Choice 2" id="cd-radio-2">
						<label for="cd-radio-2">Choice 2</label>
					</li>

					<li>
						<input type="radio" name="Project_Type" value="Choice 3" id="cd-radio-3">
						<label for="cd-radio-3">Choice 3</label>
					</li>
				</ul>
			</div>

			<div>
				<h4>Features</h4>

				<ul class="cd-form-list">
					<li>
						<input type="checkbox" id="cd-checkbox-1" name="Features[]" value="Option_1"> <!-- Added Name and Value to checkboxs Name is an array to display more then one if more then one is seclected -->
						<label for="cd-checkbox-1">Option 1</label>
					</li>

					<li>
						<input type="checkbox" id="cd-checkbox-2" name="Features[]" value="Option_2">
						<label for="cd-checkbox-2">Option 2</label>
					</li>

					<li>
						<input type="checkbox" id="cd-checkbox-3" name="Features[]" value="Option_3">
						<label for="cd-checkbox-3">Option 3</label>
					</li>
				</ul>
			</div>

			<div class="icon">
				<label class="cd-label" for="cd-textarea">Project description</label>
      			<textarea class="message" name="Project_Description" id="cd-textarea"></textarea>
			</div>

			<div>
		      	<input type="submit" value="Send Message">
		    </div>
		</fieldset>
	</form>
<script src="js/jquery-2.1.1.js"></script>
<script src="js/main.js"></script> <!-- Resource jQuery -->
</body>
</html>