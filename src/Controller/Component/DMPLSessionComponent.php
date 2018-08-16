<?php

namespace App\Controller\Component;

use Cake\Controller\Component;
use Cake\Core\Configure;

class DMPLSessionComponent extends Component {
	public $components = array('DMPLApi');
	
	private $_user = null;
	
	private function _loadUserData() {
		$this->_user = $this->DMPLApi->call ( 'users', 'data', array (
				'RequestMethod' => 'GET',
				'Params' => array (
						'SessionKey' => $this->getId()
				)
			)
		);
	}
	
    public function getId(){
    	if(isset($_COOKIE) && isset($_COOKIE[Configure::read('SESSION.KEY')])){
    		return $_COOKIE[Configure::read('SESSION.KEY')];    		
    	}else{
    		return null;
    	}
    }
    
    public function userData($aParam = null){
    	if(!isset($this->_user)){
    		$this->_loadUserData();
    	}
    	
    	if(isset($aParam) && isset($this->_user) && isset($this->_user[$aParam])){
    		return $this->_user[$aParam];
    	}else{
    		return $this->_user;
		}
	}
	public function logout() {
		if(!isset($this->_user)){
			$this->_loadUserData();
		}

		$user = (isset($this->_user) && $this->_user['Login']) ? $this->_user['Login'] : '';
		$result = $this->DMPLApi->call ( 'users', 'logout', array (
				'RequestMethod' => 'POST',
				'Params' => array (
						'Login' => $user
				)
    		)
    	);

		if(isset($result) && isset($result['code']) && $result['code'] == 'EGEN0005'){
			return true;
		}else{
			return true;
		}
    }
}