<?php

class User {
	private $_db,
			$_data,
			$_location;

	public function __construct($user = null) {
		$this->_db = DB::getInstance();
	}

	public function create($fields = array()) {
		if(!$this->_db->insert('form', $fields)) {
			throw new Exception('There was a problem creating an account');
		}
	}

	public function exists() {
		return (!empty($this->_data)) ? true : false;
	}

	public function data() {
		return $this->_data;
	}

	public function _ip() {

		if(preg_match( "/^([d]{1,3}).([d]{1,3}).([d]{1,3}).([d]{1,3})$/", getenv('HTTP_X_FORWARDED_FOR'))) {
			return getenv('HTTP_X_FORWARDED_FOR');
		}
		return getenv('REMOTE_ADDR');
	}
}