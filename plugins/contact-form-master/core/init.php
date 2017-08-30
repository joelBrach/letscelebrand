<?php

session_start();
date_default_timezone_set('America/New_York');  //Feel free to change to your timezone.

$GLOBALS['config'] = array(
	'mysql' 	=> array(
		'host' 	=> 'localhost',
		'user' 	=> 'root',
		'pass' 	=> '',
		'db' 	=> 'cody'
	)
);

spl_autoload_register(function($class) {
	require_once 'classes/' . $class . '.php';  //Auto load class files when needed
});

require_once 'functions/sanitize.php';
