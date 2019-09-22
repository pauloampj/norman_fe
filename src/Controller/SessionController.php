<?php
/**
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link      https://cakephp.org CakePHP(tm) Project
 * @since     0.2.9
 * @license   https://opensource.org/licenses/mit-license.php MIT License
 */
namespace App\Controller;

Use Cake\Event\Event;

class SessionController extends AppController
{

	public function initialize() {
		parent::initialize();
		$this->loadComponent('RequestHandler');
	}
	
    public function login($username = null) {

    }
    
    public function logout() {
    	$this->autoRender = false;
    	
    	if($this->DMPLSession->logout()){
    		return $this->redirect(array(
    				'controller' => 'Session',
    				'action' => 'login'
    				
    		));
    	}
    }
    
    public function beforeFilter(Event $event) {
    	parent::beforeFilter($event);
    	
    	if($this->action == 'save' || $this->action == 'login') {
    		//$this->eventManager()->off($this->Csrf);
    		$this->Security->csrfUseOnce = false; // We will use CSRF token for more than one time
    		$this->Security->validatePost = false; // Disabling form POST validation
    	}
    }
}
