<?php

namespace App\Controller\Component;

use Cake\Controller\Component;
use Cake\Core\Configure;

class DMPLApiComponent extends Component {
	
	private function _formatUrl($aController = '', $aMethod = '', $aConfig = array()){
		$url = Configure::read('API.URL');
		$url .= Configure::read('API.SEPARATOR') . Configure::read('API.VERSION');
		$url .= Configure::read('API.SEPARATOR') . $aController;
		$url .= Configure::read('API.SEPARATOR') . $aMethod;
		
		$reqMethod = (isset($aConfig['RequestMethod']) ? $aConfig['RequestMethod'] : Configure::read('API.DEFAULT_REQUEST_METHOD'));
		$params = '';
		
		if(strtoupper($reqMethod) == 'GET'){
			if(isset($aConfig['Params'])){
				$url = sprintf("%s?%s", $url, http_build_query($aConfig['Params']));
			}
		}
		
		return $url;
	}
	
    public function call($aController = null, $aMethod = null, $aConfig = array()){
		if(isset($aController) && isset($aMethod)){
			$aConfig['RequestMethod'] = strtoupper((isset($aConfig['RequestMethod']) ? $aConfig['RequestMethod'] : Configure::read('API.DEFAULT_REQUEST_METHOD')));
			$url = $this->_formatUrl($aController, $aMethod, $aConfig);
			$curl = curl_init();
			
			switch ($aConfig['RequestMethod']) {
				case "POST":
					curl_setopt($curl, CURLOPT_POST, 1);
					
					if (isset($aConfig['Params'])){
						curl_setopt($curl, CURLOPT_POSTFIELDS, $aConfig['Params']);
					}
					
					break;
				case "PUT":
					curl_setopt($curl, CURLOPT_PUT, 1);
					
					break;
				default:
					break;
			}
			
			curl_setopt($curl, CURLOPT_URL, $url);
			curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
			$result = curl_exec($curl);
			
			curl_close($curl);
			
			return json_decode($result, true);
		}else{
			return null;
		}
    }
}