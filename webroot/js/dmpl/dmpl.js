(function(global, $){
	"use strict";

	var modules = {},
	dmpl = function( $ ) {
		return new dmpl.init( $ );
	};

	dmpl = dmpl.prototype = {
			constructor: dmpl,
			fw: $,
			data: {},
			init: function( $ ) {

				this.fw = $;
				this.data.position = {lat: -17.5409859, lng: -57.0640799};

				return this;

			},
			explodeURL: function(url){

				var pieces = url.split('.');

				return {subdomain: pieces[0], domain: pieces[1], tld: pieces[2] + (pieces[3] ? ('.' + pieces[3]) : '')};

			}
	};

	dmpl.$appHeader = $('.app-header');
	dmpl.$appContent = $('.app-content');
	dmpl.version = '0.0.1';
	dmpl.url = dmpl.explodeURL(document.domain);
	dmpl.apiVersion = '1.0';
	dmpl.apiProtocol = 'http://';
	dmpl.apiUrl = dmpl.apiProtocol + 'api.' + dmpl.url.domain + '.' + dmpl.url.tld + '/' + dmpl.apiVersion;
	dmpl.appUrl = dmpl.apiProtocol + 'norman.' + dmpl.url.domain + '.' + dmpl.url.tld;

	/**
	 * Declara os atributos para chamada dos módulos diretamente...
	 * Instancio eles no final do arquivo.
	 */
	dmpl.Util = null;
	dmpl.GUI = null;
	dmpl.Network = null;
	dmpl.Map = null;
	dmpl.Upload = null;
	dmpl.User = null;
	dmpl.Report = null;
	dmpl.App = null;

	/**
	 * Load and dispatch the required module.
	 *
	 * @param String $module Variable module to load.
	 * @return Object Returns the required module.
	 */
	dmpl.require = function (module) {

		if(modules[module]){

			return modules[module];

		}else{

			console.log('O módulo [' + module + '] requisitado não existe ou não foi associado.');
			return false;

		}

	}

	/**
	 * Define a module and attach it to dmpl.
	 *
	 * @param String $module Variable module to define.
	 * @param Function $fn Function that is executed when the module is required.
	 * @return Void Returns nothing yet.
	 */
	dmpl.define = function (module, fn) {

		modules[module] = fn.call(dmpl.prototype, $);

	}

	dmpl.init($);
	global.dmpl = dmpl;

})(window, jQuery);

/*************************************************************************************************************************
 * MODULE: Util
 * Define a set of utilitaries functions.
 *
 * @function getReverseGeocode
 *************************************************************************************************************************/
;dmpl.define('Util', function($){

	function round(value, decimal){

		value = value || 0;
		decimal = decimal || 2;

		var x = Math.pow(10, decimal);

		return (Math.round(value * x) / x);

	}
	
	function filterJSON(string){
		var scapedString = string
		.replace(/\n/g, " ")
		.replace(/\\n/g, " ")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");
		
		return scapedString;
	}
	
	function getHash(token){
		token = token || '';
		return MD5(MD5(MD5(MD5(MD5(token)))));
	}

	function evokeMethod(callback, param){

		if(callback && callback.length){

			if (eval("typeof " + callback + " == 'function'")) { //Se a função foi definida...

				var params = (param && param.length) ? param.split(',') : [];

				if(window[callback]){

					var callbackfunction = window[callback];
					params.unshift(event);

					callbackfunction.apply(this, params);

				}else{

					eval(callback + "(\"" + params.join('","') + "\");"); //Chama ela...

				}

			}else{

				console.log('O método ' + callback + ' não foi encontrado.');

			}

		}

	}

	function serialize (selector, context, fieldAttr){

		var data = {};
		context = context || document;
		fieldAttr = fieldAttr || 'name';

		$(selector, $(context)).each(function(){

			var handler = $(this);

			if(!handler.attr(fieldAttr)){

				return;

			}

			if(handler.is('[type="checkbox"]')){
				data[handler.attr(fieldAttr)] = (handler.is(':checked') ? '1' : '0');
			}else{
				data[handler.attr(fieldAttr)] = handler.val();
			}

		});

		return data;

	}

	function isArray($array){

		return (typeof $array === 'object' && Array.isArray($array));

	}

	/**
	 *
	 *  MD5 (Message-Digest Algorithm)
	 *  http://www.webtoolkit.info/
	 *
	 **/
	var MD5 = function (string) {

		function RotateLeft(lValue, iShiftBits) {
			return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
		}

		function AddUnsigned(lX,lY) {
			var lX4,lY4,lX8,lY8,lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
			if (lX4 & lY4) {
				return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			if (lX4 | lY4) {
				if (lResult & 0x40000000) {
					return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
				} else {
					return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
				}
			} else {
				return (lResult ^ lX8 ^ lY8);
			}
		}

		function F(x,y,z) { return (x & y) | ((~x) & z); }
		function G(x,y,z) { return (x & z) | (y & (~z)); }
		function H(x,y,z) { return (x ^ y ^ z); }
		function I(x,y,z) { return (y ^ (x | (~z))); }

		function FF(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

		function GG(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

		function HH(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

		function II(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
		};

		function ConvertToWordArray(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWords_temp1=lMessageLength + 8;
			var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
			var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
			var lWordArray=Array(lNumberOfWords-1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while ( lByteCount < lMessageLength ) {
				lWordCount = (lByteCount-(lByteCount % 4))/4;
				lBytePosition = (lByteCount % 4)*8;
				lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
				lByteCount++;
			}
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
			lWordArray[lNumberOfWords-2] = lMessageLength<<3;
			lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
			return lWordArray;
		};

		function WordToHex(lValue) {
			var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
			for (lCount = 0;lCount<=3;lCount++) {
				lByte = (lValue>>>(lCount*8)) & 255;
				WordToHexValue_temp = "0" + lByte.toString(16);
				WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
			}
			return WordToHexValue;
		};

		function Utf8Encode(string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";

			for (var n = 0; n < string.length; n++) {

				var c = string.charCodeAt(n);

				if (c < 128) {
					utftext += String.fromCharCode(c);
				}
				else if((c > 127) && (c < 2048)) {
					utftext += String.fromCharCode((c >> 6) | 192);
					utftext += String.fromCharCode((c & 63) | 128);
				}
				else {
					utftext += String.fromCharCode((c >> 12) | 224);
					utftext += String.fromCharCode(((c >> 6) & 63) | 128);
					utftext += String.fromCharCode((c & 63) | 128);
				}

			}

			return utftext;
		};

		var x=Array();
		var k,AA,BB,CC,DD,a,b,c,d;
		var S11=7, S12=12, S13=17, S14=22;
		var S21=5, S22=9 , S23=14, S24=20;
		var S31=4, S32=11, S33=16, S34=23;
		var S41=6, S42=10, S43=15, S44=21;

		string = Utf8Encode(string);

		x = ConvertToWordArray(string);

		a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

		for (k=0;k<x.length;k+=16) {
			AA=a; BB=b; CC=c; DD=d;
			a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
			d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
			c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
			b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
			a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
			d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
			c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
			b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
			a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
			d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
			c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
			b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
			a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
			d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
			c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
			b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
			a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
			d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
			c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
			b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
			a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
			d=GG(d,a,b,c,x[k+10],S22,0x2441453);
			c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
			b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
			a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
			d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
			c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
			b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
			a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
			d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
			c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
			b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
			a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
			d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
			c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
			b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
			a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
			d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
			c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
			b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
			a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
			d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
			c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
			b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
			a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
			d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
			c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
			b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
			a=II(a,b,c,d,x[k+0], S41,0xF4292244);
			d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
			c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
			b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
			a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
			d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
			c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
			b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
			a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
			d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
			c=II(c,d,a,b,x[k+6], S43,0xA3014314);
			b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
			a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
			d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
			c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
			b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
			a=AddUnsigned(a,AA);
			b=AddUnsigned(b,BB);
			c=AddUnsigned(c,CC);
			d=AddUnsigned(d,DD);
		}

		var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

		return temp.toLowerCase();
	}

	function strToHexColor(str){

		str = String(str || Math.random());
		var hexColor = MD5(str).substring(0,6).toUpperCase();

		return ('#' + hexColor);

	}

	function objToArray(obj){

		if(isArray(obj)){

			return obj;

		}

		var array = $.map(obj, function(k, v) {

			return [k];

		});

		return array;

	}

	Array.prototype.swap = function(a, b){

		var tmp= this[a];

		this[a] = this[b];
		this[b] = tmp;

	}

	function _insert(array, begin, end, v){

		/**
		 * Aqui ele também compara o elemento em cada iteração,
		 * assim ele coloca-lo-á imediatamente depois do mais
		 * próximo.
		 */
		while((begin + 1) < end && array[begin + 1] < v) {

			array.swap(begin, begin + 1);
			++begin;

		}

		array[begin]=v;

	}

	function _compare(val1, val2, attr){

		/**
		 * Faz comparação simples de array.
		 */
		if(!attr || !val1[attr] || !val2[attr]){

			return (val1[attr] > val2[attr]);

		}

		/**
		 * Faz comparação por atributo do objeto. 
		 */
		else{

			return (val1 > val2);

		}

	}

	function _merge(array, begin, begin_right, end, attr){

		for(; begin < begin_right; ++begin) {

			/**
			 * Aqui que ele compara se o elemento anterior, do array,
			 * é maior que o próximo elemento. Se for, faz um swap.
			 */
			if(_compare(array[begin], array[begin_right], attr)) {

				var v = array[begin];
				array[begin] = array[begin_right];
				_insert(array, begin_right, end, v);

			}

		}

	}

	/**
	 * Algoritmo merge sort
	 * (http://en.literateprograms.org/Merge_sort_%28JavaScript%29)
	 * Este algoritmo segue o seguinte princípio:
	 * - Divide o array em duas metades; [_sort]
	 * - Ordena cada metade; [_sort e _merge]
	 * - Mescla as metades. [_merge]
	 */
	function _sort(array, begin, end, attr){

		var size = end - begin;

		if(size < 2){

			return;

		}

		var begin_right = begin + Math.floor(size / 2);

		_sort(array, begin, begin_right, attr);
		_sort(array, begin_right, end, attr);
		_merge(array, begin, begin_right, end, attr);

	}

	function orderBy(array, attr, type){

		if(!isArray(array)){

			return [];

		}

		type = type || 'asc';

		_sort(array, 0, array.length, attr);

		if(type === 'desc'){

			array.reverse();

		}

		return array;

	}

	function inArray($value, $array, $strict){

		if(!isArray($array)){

			return false;

		}

		if($array.length === 0){

			return false;

		}

		$strict = $strict === true;

		var len = $array.length;

		while(len--){

			if($strict){

				if($value === $array[len]){

					return true;

				}

			}else{

				if($value == $array[len]){

					return true;

				}

			}

		}

		return false;

	}


	return {
		filterJSON		: filterJSON,
		evokeMethod		: evokeMethod,
		serialize			: serialize,
		isArray				: isArray,
		inArray				: inArray,
		md5						: MD5,
		getHash				: getHash,
		strToHexColor	: strToHexColor,
		objToArray		: objToArray,
		orderBy				: orderBy
	}

});

/*************************************************************************************************************************
 * MODULE: GUI
 * Define a set of utilitaries functions for graphic interface.
 *
 * @function createLoading
 * @function destroyLoading
 *************************************************************************************************************************/
;dmpl.define('GUI', function($){

	var util = dmpl.require('Util'),
	MESSAGE_TYPES = {info: 1, warn: 2, error: 3};

	function attrsObjToAttrsDom($element, obj){

		if(!$element){

			return false;

		}

		obj = obj || {};

		var keys = Object.keys(obj),
		len = keys.length;

		while(len--){

			$element.attr('data-' + keys[len], obj[keys[len]]);

		}

		return true;

	}
	
	function showMessage(opts){
		
		opts = opts || {};
		opts.type = opts.type || MESSAGE_TYPES.info;
		opts.text = opts.text || '';
		opts.time = opts.time || 2000;
		
		_initGritterParams(opts.time);
		
		if(!opts.title){
			switch(opts.type){
				case MESSAGE_TYPES.info: 
					opts.title = '<i class="icon-minus-sign"></i>Yeah! :-D';
					opts.class_name = 'gritter-info';
					break;
				case MESSAGE_TYPES.warn:
					opts.title = '<i class="icon-minus-sign"></i>Cuidado... :-|';
					opts.class_name = 'gritter-warn';
					break;
				case MESSAGE_TYPES.error:
					opts.title = '<i class="icon-minus-sign"></i>Ooops! :-(';
					opts.class_name = 'gritter-error';
					break;
				default: 
					opts.title = '<i class="icon-minus-sign"></i>:-D';
					opts.class_name = 'gritter-info';
					break;
			}
		}
		$.gritter.add({
			title: opts.title,
			text: opts.text,
			class_name: opts.class_name
		});
	}
	
	function hideAllMessages(opts){
		
		opts = opts || {};
		
		if($('.gritter-item').size() > 0){
			$.gritter.removeAll(opts);
		}else{
			if(opts.after_close){
				opts.after_close();
			}
		}
	}
	
	function _initGritterParams(time){

		$.extend($.gritter.options, {
			sticky: false,
			fade_in_speed: 500, // how fast notifications fade in (string or int)
			fade_out_speed: 500, // how fast the notices fade out
			time: time || 2000 // hang on the screen for...
		});

	}
	
	return {
		attrsObjToAttrsDom	: attrsObjToAttrsDom,
		showMessage					: showMessage,
		hideAllMessages			: hideAllMessages,
		MESSAGE_TYPES				: MESSAGE_TYPES
	}

});

/*************************************************************************************************************************
 * MODULE: Network
 * Define a set of utilitaries functions for networking handler.
 *
 * @function ajax
 *************************************************************************************************************************/
;dmpl.define('Network', function($){

	var gui = dmpl.require('GUI');

	function ajax (opts){

		var loadId = Math.random();
		//gui.showLoading({id: loadId, message: opts.loadMessage, container: opts.container ? opts.container : null, callback: function(){

			$.ajax({
				type: opts.ajax.type,
				url: opts.ajax.url,
				data: opts.ajax.data,
				dataType: opts.ajax.dataType,
				complete: function(jqXHR, textStatus){

					try{

						if(jqXHR.status == 200){

							var response = "";

							if(opts.ajax.success){

								if(String(opts.ajax.dataType).toUpperCase() == 'JSON'){
									response = $.parseJSON(jqXHR.responseText);
								}else{
									response = jqXHR.responseText;
								}

								opts.ajax.success(response);

							}

						}else{

							if(opts.ajax.error){

								opts.ajax.error(jqXHR);

							}
							
							/**
							 * Status 403 indica conexão não permitida (Forbidden)
							 * Provavelmente por ser invocado um método que precisa que o usuário
							 * esteja logado e o usuário não está.
							 */
							if(jqXHR.status == 403){
								opts.errorMessage += '<br>Obs.: Você está logado?';
							}
							
							$.gritter.add({
								title: '<i class="icon-minus-sign"></i> Ooops!',
								text: opts.errorMessage,
								class_name: 'error'
							});

						}

						//gui.hideLoading(loadId);

					}catch(e){
						console.log("Erro ao processar retorno do AJAX. ", e);
					}

				}

			});

		//}});

	}

	return {
		ajax	: ajax
	}

});

/*************************************************************************************************************************
 * MODULE: Map
 * Define a set of utilitaries functions of map.
 * It uses the Google Maps API.
 *
 * @function getReverseGeocode
 *************************************************************************************************************************/
;dmpl.define('Map', function($){

	var util = dmpl.require('Util'),
	geocoder = false,
	oneMeterInDegress = 1 / 102059.82251083,
	earthRadius = 6371 * 1000,
	defaults = {
		lastLocation: {}
	};
	
	function setMap($container, options){
		options = options || {};
		var mapOptions = {
				scrollwheel: false,
				center: options.latLng || new google.maps.LatLng(dmpl.data.position.lat,dmpl.data.position.lng),
				zoom: options.zoom || 4,
				mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		var map = new google.maps.Map($container.get(0), mapOptions);
		$container.addClass('map-container');
		
		var markerOptions = {
				position: {
					lat: dmpl.data.position.lat,
					lng: dmpl.data.position.lng
				},
				map: map,
				title: 'Pino do Mapa'
		};
		
		if(options.marker){
			
			var marker = options.marker,
			mOpts = {};
			
			if(Array.isArray(marker)){

				for(var i = 0; i < marker.length; i++){
					mOpts = $.extend({}, markerOptions, marker[i]);
					addMarker(mOpts);
				}
				
			}else{
				mOpts = $.extend({}, markerOptions, marker);
				addMarker(mOpts);
			}
			
		}
		
		if(options.expandCtrl){
			$expBtn = $('<div class="gm-style-mtc" style="z-index: 1; position: absolute;right: 105px;top: 5px;cursor: pointer;"><div draggable="false"	title="Mostrar imagens de satélite" style="direction: ltr; overflow: hidden; text-align: center; position: relative; color: rgb(86, 86, 86); font-family: Roboto, Arial, sans-serif; -webkit-user-select: none; font-size: 11px; padding: 1px 6px; border-bottom-right-radius: 2px; border-top-right-radius: 2px; -webkit-background-clip: padding-box; border-width: 1px 1px 1px 0px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-top-color: rgba(0, 0, 0, 0.14902); border-right-color: rgba(0, 0, 0, 0.14902); border-bottom-color: rgba(0, 0, 0, 0.14902); -webkit-box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px; box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px; min-width: 36px; background-color: rgb(255, 255, 255); background-clip: padding-box;">Expandir</div><div style="z-index: -1; padding-top: 2px; -webkit-background-clip: padding-box; border-width: 0px 1px 1px; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-right-color: rgba(0, 0, 0, 0.14902); border-bottom-color: rgba(0, 0, 0, 0.14902); border-left-color: rgba(0, 0, 0, 0.14902); -webkit-box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px; box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px; position: absolute; right: 0px; top: 32px; text-align: left; display: none; background-color: white; background-clip: padding-box;"	></div></div>');
			$expBtn.click(function(){
						$parent = $(this).parent();
						
						if($parent.is('.expanded')){
							$parent.removeClass('expanded');
							$(this).find('div').html('Expandir');
						}else{
							$parent.addClass('expanded');
							$(this).find('div').html('Diminuir');
						}
						
					});
			$container.append($expBtn);
		}
		
		return map;
		
	}

	function fromLatLngToPoint(latLng, map) {

		var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
		var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
		var scale = Math.pow(2, map.getZoom());
		var worldPoint = map.getProjection().fromLatLngToPoint(latLng);

		return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);

	}

	function reverseGeocode(opts){

		var params = {
				lat: false,
				lng: false,
				complete: false,
				success: false,
				error: false,
				ajax: {
					type: 'GET',
					url: 'http://maps.googleapis.com/maps/api/geocode/json',
					data: {
						latlng: ((opts && opts.lat) ? opts.lat : '40.714224') + ',' + ((opts && opts.lng) ? opts.lng : '-73.961452'),
						sensor: false
					},
					async: true,
					dataType: 'json',
					complete: false,
					success: false,
					error: false
				}
		},

		params = $.extend({}, params, opts || {});

		$.ajax({
			type: params.ajax.type,
			url: params.ajax.url,
			data: params.ajax.data,
			async: params.ajax.async,
			dataType: params.ajax.dataType,
			complete: function(jqXHR, textStatus){

				if(jqXHR.status == 200){

					var response = jQuery.parseJSON(jqXHR.responseText);

					if(response && response.results && response.results[0].address_components && response.results[0].address_components.length){

						var len = response.results[0].address_components.length;

						while(len){

							len -= 1;
							_translateAddressType(response.results[0].address_components[len]);

						}

						defaults.lastLocation.lat = (opts && opts.lat) ? opts.lat : '40.714224';
						defaults.lastLocation.lng = (opts && opts.lng) ? opts.lng : '-73.961452';
						defaults.lastLocation.formatted_address = response.results[0].formatted_address;

					}

					if(params && params.ajax && params.ajax.success){

						params.ajax.success(response, defaults.lastLocation);

					}

					if(params && params.success){

						params.success(response, defaults.lastLocation);

					}

				}else{

					if(params && params.ajax && params.ajax.error){

						params.ajax.error(jqXHR);

					}

					if(params && params.error){

						params.error(jqXHR);

					}

				}

				if(params && params.ajax && params.ajax.complete){

					params.ajax.complete(jqXHR, textStatus, defaults.lastLocation);

				}

				if(params && params.complete){

					params.complete(jqXHR, textStatus, defaults.lastLocation);

				}

			}

		});

		return this;

	};

	function codeAddress(opts) {

		opts = opts || {};
		geocoder = geocoder || new google.maps.Geocoder();

		if(!opts.address){

			if(opts.callback){

				opts.callback(false);

			}

			return false;

		}

		geocoder.geocode( { 'address': opts.address}, function(results, status) {

			if(opts.complete){

				opts.complete(results, status);

			}

			if (status == google.maps.GeocoderStatus.OK) {

				if(opts.success){

					opts.success(results);

				}

			} else {

				if(opts.error){

					opts.error(status);

				}

			}

			return true;

		});

		return true;

	}

	function getZoom(address){
		
		var type = address.types[0];

		switch(type){
		case 'street_address': return 16;
		case 'bus_station': return 15;
		case 'transit_station': return 15;
		case 'establishment': return 15;
		case 'premise': return 15;
		case 'street_number': return 18;
		case 'route': return 12;
		case 'sublocality': return 12;
		case 'locality': return 11;
		case 'administrative_area_level_1': return 7;
		case 'country': return 5;
		case 'neighborhood': return 14;
		case 'postal_code': return 12;
		}

		return 4;
		
	}
	
	function _translateAddressType(address){

		var type = address.types[0];

		switch(type){
		case 'street_number': defaults.lastLocation.number = address.long_name; break;
		case 'route': defaults.lastLocation.street = address.long_name; break;
		case 'sublocality': defaults.lastLocation.neighborhood = address.long_name; break;
		case 'locality': defaults.lastLocation.city = address.long_name; break;
		case 'administrative_area_level_1': defaults.lastLocation.state = address.long_name; break;
		case 'country': defaults.lastLocation.country = address.long_name; break;
		case 'neighborhood': defaults.lastLocation.neighborhood = address.long_name; break;
		case 'postal_code': defaults.lastLocation.postal_code = address.long_name; break;
		}

		return this;

	}

	function getUserLocation(opts){

		opts = opts || {};
		opts.success = opts.success || function(position){ console.log('success', position); };
		opts.error = opts.error || function(error){ console.log('error', error); };

		if (navigator.geolocation) {

			navigator.geolocation.getCurrentPosition(opts.success, opts.error);

		} else {

			opts.error('Erro ao localizar usuário');

		}

	}

	function setUserLocation(position){

		dmpl.data.position = {lat: position.coords.latitude, lng: position.coords.longitude};

	}

	function addMarker(opts){

		opts = opts || {};
		opts.id = opts.id || Math.random();

		if(!opts.map){

			return false;

		}

		/**
		 * Se o mapa não for informado,
		 * apenas retorna o marker e não inclui ele no mapa,
		 * pois, provavelmente, será usada o MarkerClusterer.
		 */
		opts.map.markers = opts.map.markers || [];
		opts.map.markersById = opts.map.markersById || {};

		/**
		 * Se o tipo do objeto marker, nesta chave (opts.id), for exatamente igual a 'object'
		 * retorna true, pois o marker já está no mapa. Não precisa inserí-lo novamente.
		 */
		if(typeof opts.map.markersById[opts.id] === 'object'){

			return true;

		}

		var lat = (opts.position && opts.position.lat) ? opts.position.lat : dmpl.data.position.lat,
				lng = (opts.position && opts.position.lng) ? opts.position.lng : dmpl.data.position.lng;

		var mk = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			draggable: opts.draggable || false,
			map: (opts.scapeMap ? null : (opts.map || null)),
			icon: opts.icon,
			title: opts.title || 'Sem título'
		});

		if(opts.infoWindow){

			var content = '';

			if(typeof opts.infoWindow === 'function'){

				content = opts.infoWindow(opts.station || {});

			}else if(typeof opts.infoWindow === 'string'){

				content = opts.infoWindow;

			}else{

				content = JSON.stringify(opts.infoWindow);

			}

			var infowindow = new google.maps.InfoWindow({
				content: content
			});

			mk.html = content;

			google.maps.event.addListener(mk, 'click', function() {
				infowindow.setContent(this.html);
				infowindow.open(opts.map, this);
			});
			
			if(opts.startOpened){
				infowindow.open(opts.map, mk);
			}

		}
		
		opts.map.markersById[opts.id] = mk;
		opts.map.markers[opts.map.markers.length] = mk;

		return mk;

	}

	function clearMarkers(opts){

		opts = opts || {};

		if(!opts.markers && (!opts.map || !opts.map.markers)){

			return 0;

		}

		var markers = opts.markers || opts.map.markers,
		len = markers.length;

		while(len--){

			markers[len].setMap(null);

		}

	}

	function _deg2rad(deg) {

		return (deg * (Math.PI / 180));

	}

	function getDistance(location1, location2){

		var lat1 = location1.latitude ? location1.latitude : location1.lat,
				lng1 = location1.longitude ? location1.longitude : location1.lng,
						lat2 = location2.latitude ? location2.latitude : location2.lat,
								lng2 = location2.longitude ? location2.longitude : location2.lng,
										dLat = _deg2rad(lat2 - lat1);
		dLng = _deg2rad(lng2 - lng1);
		a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(_deg2rad(lat1)) * Math.cos(_deg2rad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
		c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		d = earthRadius * c;

		return Math.abs(d);

	}

	return {
		reverseGeocode			: reverseGeocode,
		codeAddress				: codeAddress,
		getUserLocation			: getUserLocation,
		setUserLocation			: setUserLocation,
		addMarker				: addMarker,
		clearMarkers			: clearMarkers,
		oneMeterInDegress		: oneMeterInDegress,
		getDistance				: getDistance,
		fromLatLngToPoint		: fromLatLngToPoint,
		setMap						: setMap,
		getZoom						: getZoom
	}

});

/*************************************************************************************************************************
 * MODULE: Upload
 * Define a set of utilitarian functions for uploading hanlder.
 *
 * @function setAvatar
 *************************************************************************************************************************/
;dmpl.define('Upload', function($){

	var util = dmpl.require('Util'),
	fileSelector = '#fileupload';

	function setAvatar (opts){

		opts = opts || {};

		var target = $(opts.selector || '.avatar').addClass('upload-avatar'),
		element = $(fileSelector),
		link = $('<span>').addClass('upload-control-span').html('Escolha a imagem');

		if(!target || target.size() === 0){

			return false;

		}

		if(!opts.controller){

			return false;

		}

		link.click(function(){

			element.trigger('click');

		}).bind('activate', function(event, target){

			$(this).css({

				top: (target.position().top + (target.height() / 2)) + 'px',
				left: '5px',
				width: target.width() + 'px'

			}).addClass('active');

		}).bind('deactivate', function(event, target){

			$(this).removeClass('active');

		}).hover(function(){

			$(this).trigger('activate', [target]);

		}, function(){

			$(this).trigger('deactivate', [target]);

		});

		target.hover(function(){

			link.trigger('activate', [$(this)]);

		}, function(){

			link.trigger('deactivate', [$(this)]);

		}).parent().css('position', 'relative').append(link);

		element.fileupload({
			url: dmpl.apiUrl + '/' + opts.controller + '/setImage/' + (opts.id || ''),
			dataType: 'json',
			done: function (e, data) {

				target.attr('src', data.result.files[0].url);

			},
			progressall: function (e, data) {
				console.log('Progredindo ', data);
			}
		});

	}
	
	function setContainer(containerId){
		'use strict';
		
		$('.upload-form button.delete').hide().next().hide();
    // Initialize the jQuery File Upload widget:
    $(containerId).fileupload({
    	autoUpload: true,
        url: '/uploads/processes'
    }).bind('fileuploadadd', function(e, data){

    	var deleteButton = $('.upload-form button.delete');
    	
    	if(!deleteButton.is(':visible')){
    		deleteButton.fadeIn('slow').next().fadeIn('slow');
    	}
    	
    }).bind('fileuploaddestroyed', function (e, data) {
    	
    	if(!$('.upload-form table tr').size()){

    		$('.upload-form button.delete').fadeOut('fast').next().fadeOut('fast');

    	}
    	
    }).bind('fileuploadfailed', function (e, data) {

    	if(!$('.upload-form table tr').size()){
    		
    		$('.upload-form button.delete').fadeOut('fast').next().fadeOut('fast');
    		
    	}
    	
    }).bind('fileuploadcompleted', function (e, data) {

    	var json = jQuery.parseJSON(data.jqXHR.responseText);
    	var files = json.files;
    	
    	for(var i = 0; i < files.length; i++){
    		console.log(files[i]);
    		_addFileHiddenInput(files[i].id, data.context[0].cells[0]);
    		
    	}
    	
    });

    // Enable iframe cross-domain access via redirect option:
    $(containerId).fileupload(
        'option',
        'redirect',
        window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        )
    );
    
    // Load existing files:
    $(containerId).addClass('fileupload-processing');

    $.ajax({
    	url: $(containerId).fileupload('option', 'url'),
    	dataType: 'json',
    	context: $(containerId)[0]
    }).always(function (result) {
    	$(this).removeClass('fileupload-processing');
    }).done(function (result) {});

	}
	
	function _addFileHiddenInput(id, container){
		
		var input = $('<input type=hidden />').addClass('uploaded-file').attr('data-id', id);
		
		$(container).append(input);
		
	}

	return {
		setAvatar			: setAvatar,
		setContainer 	: setContainer
	}

});

/*************************************************************************************************************************
 * MODULE: User
 * Define a set of utilitarian functions for user/login hanlder.
 *
 * @function showLoginScreen
 *************************************************************************************************************************/
;dmpl.define('User', function($){

	var util = dmpl.require('Util'),
	network = dmpl.require('Network'),
	gui = dmpl.require('GUI'),
	loginHtml = '',
	loginCallback = null;

	function _validateLogin($container){

		var $username = $container.find('#usernameTxt'),
			$password = $container.find('#passwordTxt')
		
		if($username.val().length < 1) {
			alert("usuário inválido");
			/*
			$container.find('.error').fadeOut('fast', function(){
				$(this).css({top: ($username.position().top + topOffset), left: ($username.parent().offset().left + $username.parent().get(0).clientWidth + leftOffset)}).fadeIn('fast', function(){
					$username.focus();
				});
			});
			*/
			return false;
		}
		if($password.val().length < 1) {
			alert("senha inválida");
			/*
			$container.find('.error').fadeOut('fast', function(){
				$(this).css({top: ($password.position().top + topOffset), left: ($password.parent().offset().left + $password.parent().get(0).clientWidth + leftOffset)}).fadeIn('fast', function(){
					$password.focus();
				});
			});
			*/
			return false;
		}
		return true;
	}
	
	function login($container, opts){
		$.ajaxSetup({
			  xhrFields: {
			    withCredentials: true
			  }
		});
		if(_validateLogin($container)){
			var user = $container.find('#usernameTxt').val(),
				pass = $container.find('#passwordTxt').val(),
				ajaxParams = {
					type: 'POST',
					url: dmpl.apiUrl + '/users/login',
					data: {
						Login: user,
						Password: pass
					},
					xhrFields: {
					    withCredentials: true
					},
					dataType: 'json',
					success: function(response){
						if(response.code && response.code == 'EGEN0004'){
							if(opts && opts.callback){
								opts.callback(response);
							}else{
								if(response.redirect_page){
									window.location.replace(response.redirect_page);
								}else{
									location.reload();
								}
							}
						}else{
							gui.showMessage({text: 'Erro ao autenticar usuário. Resposta do sistema: ' + (response.message || 'sem resposta'), type: gui.MESSAGE_TYPES.error});
						}
					}
	
			};
	
			network.ajax({ajax: ajaxParams, errorMessage: 'Ocorreu um erro ao conectar com o servidor!', loadMessage: 'Autenticando usuário...'});
		}
	}
	
	function logout(user, pass){
		
		var ajaxParams = {
				type: 'POST',
				url: dmpl.appUrl + '/users/logout',
				data: {},
				dataType: 'json',
				success: function(response){
					
					if(!response.authenticated){
						location.reload();
					}else{
						gui.showMessage({text: 'Erro ao efetuar o logout. Resposta do sistema: ' + (response.message || 'sem resposta'), type: gui.MESSAGE_TYPES.error});
					}
					
				}

		};

		network.ajax({ajax: ajaxParams, errorMessage: 'Ocorreu um erro ao conectar com o servidor!', loadMessage: 'Efetuando logout...'});
	}
	
	function goHome(){
		location.href = '/';
	}
	
	function goProfile(){
		location.href = '/users/view/' + getId();
	}
	
	function goAccountRemove(){
		location.href = '/users/accountRemove/';
	}
	
	function isLogged(){
		return $('#loggedIn').val();
	}
	
	function changePassword($container){
		gui.hideAllMessages({
			after_close: function(){
					if(_validatePasswordChange($container)){
						_changePassword($container);
					}
			}
		});
	}
	
	function _changePassword($container){

		var data = {
				actPassword: $container.find('#actPassword').val(),
				newPassword: $container.find('#newPassword').val(),
				rePassword: $container.find('#rePassword').val()
				};
		
		var ajaxParams = {
				type: 'POST',
				url: dmpl.appUrl + '/users/changePassword/' + $('#sessionHash').val(),
				data: data,
				dataType: 'json',
				success: function(response){
					
					if(response.status == '1'){
						if(response.redirect){
							location.href = response.redirect;
						}else{
							user.goProfile();
						}
					}else{
						gui.showMessage({text: 'Erro ao salvar trocar a senha do usuário. Resposta do sistema: ' + (response.message || 'sem resposta'), type: gui.MESSAGE_TYPES.error});
					}
					
				}
		};

		network.ajax({ajax: ajaxParams, errorMessage: 'Ocorreu um erro ao conectar com o servidor!', loadMessage: 'Trocando senha do usuário...'});
		
	}
	
	function _validatePasswordChange($container){

		var valid = true;

		if($container.find('#actPassword').size() > 0){
			if($container.find('#actPassword').val().length < 1){
				gui.showMessage({text: 'Você precisa informar a senha atual.', type: gui.MESSAGE_TYPES.error, time: 3600000});
				valid = false;
			}
		}

		if($container.find('#newPassword').val().length < 1){
			gui.showMessage({text: 'Você precisa informar a nova senha.', type: gui.MESSAGE_TYPES.error, time: 3600000});
			valid = false;
		}
		
		if($container.find('#rePassword').val().length < 1){
			gui.showMessage({text: 'Você precisa informar a confirmação da nova senha.', type: gui.MESSAGE_TYPES.error, time: 3600000});
			valid = false;
		}else{
			if($container.find('#newPassword').val() != $container.find('#rePassword').val()){
				gui.showMessage({text: 'A nova senha e sua confirmação precisam ser iguais.', type: gui.MESSAGE_TYPES.error, time: 3600000});
				valid = false;
			}
		}
		
		return valid;

	}
	
	function createPasswordChangeSession(){

		var ajaxParams = {
				type: 'POST',
				url: dmpl.appUrl + '/users/createPasswordChangeSession',
				data: {},
				dataType: 'json',
				success: function(response){
					
					if(response.status == '1'){
						if(response.redirect){
							location.href = response.redirect;
						}else{
							goProfile();
						}
					}else{
						gui.showMessage({text: 'Erro ao criar sessão para a troca de senha. Resposta do sistema: ' + (response.message || 'sem resposta'), type: gui.MESSAGE_TYPES.error});
					}
					
				}
		};

		network.ajax({ajax: ajaxParams, errorMessage: 'Ocorreu um erro ao conectar com o servidor!', loadMessage: 'Criando sessão para a troca de senha...'});
		
	}
	
	function save($container, scapeValidate){
		
		scapeValidate = scapeValidate || false;

		gui.hideAllMessages({
			after_close: function(){
				if(scapeValidate){
					_save($container);
				}else{
					if(_validate($container)){
						_save($container);
					}
				}
			}
		});
		
	}
	
	function getId(){
		return $('#UserId').val();
	}
	
	function getContext(filter){
		var context = _getContext();
		if(filter){
			return (context[filter] ? context[filter] : context);
		}else{
			return context;
		}
	}
	
	function _getContext(){
		var obj = {};
		try{
			if(window.contextStr){
				obj = $.parseJSON(window.contextStr);
			}
		}catch(e){
			console.log('Erro ao fazer parsgin do contexto do usuário [_getContext] ', e);
		}
		return obj;
	}
	
	function _save($container){

		var data = util.serialize('[name^="data["]', $container);
		
		var ajaxParams = {
				type: 'POST',
				url: dmpl.appUrl + '/users/save',
				data: data,
				dataType: 'json',
				success: function(response){
					
					if(response.status == '1'){
						if(response.redirect){
							location.href = response.redirect;
						}else{
							user.goProfile();
						}
					}else{
						gui.showMessage({text: 'Erro ao salvar alterações do usuário. Resposta do sistema: ' + (response.message || 'sem resposta'), type: gui.MESSAGE_TYPES.error});
					}
					
				}
		};

		network.ajax({ajax: ajaxParams, errorMessage: 'Ocorreu um erro ao conectar com o servidor!', loadMessage: 'Salvando alterações do usuário...'});
		
	}
	
	function _validate($container){

		var valid = true;

		if($container.find('#UserPrimaryEmail').size() > 0){
			if($container.find('#UserPrimaryEmail').val().length < 1){
				gui.showMessage({text: 'Você precisa informar o email.', type: gui.MESSAGE_TYPES.error, time: 3600000});
				valid = false;
			}
		}

		return valid;

	}

	return {
		login												: login,
		logout											: logout,
		goHome											: goHome,
		goProfile										: goProfile,
		goAccountRemove							: goAccountRemove,
		isLogged										: isLogged,
		save												: save,
		getContext									: getContext,
		createPasswordChangeSession	: createPasswordChangeSession,
		changePassword							: changePassword
	}

});

/*************************************************************************************************************************
 * MODULE: Report
 * Define a set of utilitarian functions for reports hanlder.
 *
 * 
 *************************************************************************************************************************/
;dmpl.define('Report', function($){

	var util = dmpl.require('Util'),
	network = dmpl.require('Network'),
	gui = dmpl.require('GUI'),
	user = dmpl.require('User'),
	id = null;

	function save($container, scapeValidate){

		$container = $container || $('#report-form');
		scapeValidate = scapeValidate || false;

		gui.hideAllMessages({
			after_close: function(){
				if(scapeValidate){
					_save($container);
				}else{
					if(_validate($container)){
						_save($container);
					}
				}
			}
		});

	}
	
	function _getId(){
		id = $('#ReportId').val();
		return id;
	}
	
	function getId(){
		if(!id){
			return _getId();
		}else{
			return id;
		}
	}
	
	function _save($container){

		$container = $container || $('#report-form');
		
		var reportId = ($container.find('#report-id').size() > 0) ? $container.find('#report-id').val() : false,
				data = util.serialize('[name^="data["]', $container);
		
		data.files = [];
		
		$container.find('input.uploaded-file').each(function(){
			data.files.push($(this).attr('data-id'));
		});
		
		var ajaxParams = {
				type: 'POST',
				url: dmpl.appUrl + '/reports/save' + (reportId ? ('/' + reportId) : ''),
				data: data,
				dataType: 'json',
				success: function(response){
					
					if(response.status == '1'){
						if(response.redirect){
							location.href = response.redirect;
						}else{
							user.goHome();
						}
					}else{
						gui.showMessage({text: 'Erro ao reportar problema. Resposta do sistema: ' + (response.message || 'sem resposta'), type: gui.MESSAGE_TYPES.error});
					}
					
				}
		};

		network.ajax({ajax: ajaxParams, errorMessage: 'Ocorreu um erro ao conectar com o servidor!', loadMessage: 'Autenticando usuário...'});
		
	}
	
	function _validate($container){
		
		var valid = true;
		
		if($container.find('#report-address').val().length < 1){
			gui.showMessage({text: 'Você precisa informar onde é o problema (Etapa 1).', type: gui.MESSAGE_TYPES.error, time: 3600000});
			valid = false;
		}
		
		if($container.find('#report-category').val().length < 1){
			gui.showMessage({text: 'Você precisa informar a categoria do reporte (Etapa 2).', type: gui.MESSAGE_TYPES.error, time: 3600000});
			valid = false;
		}
		
		if($container.find('#new-report-title').val().length < 1){
			gui.showMessage({text: 'Você precisa informar um título para o reporte (Etapa 2).', type: gui.MESSAGE_TYPES.error, time: 3600000});
			valid = false;
		}
		
		if(!$container.find('#usage-policy').is(':checked')){
			gui.showMessage({text: 'Você precisa aceitar a política de uso (Etapa 4).', type: gui.MESSAGE_TYPES.error, time: 3600000});
			valid = false;
		}
		
		if(valid && $container.find('input.uploaded-file').size() < 1){
			bootbox.dialog({
			  message: "Você não anexou arquivos. Tem certeza que quer publicar?",
			  title: "Quase pronto!",
			  buttons: {
			    ok: {
			      label: "Sim! Estou ciente.",
			      className: "btn-success",
			      callback: function() {
			        save($container, true);
			      }
			    },
			    cancel: {
			      label: "Ooops! Cancela.",
			      className: "btn-danger",
			      callback: function() {
			      	
			      }
			    }
			  }
			});
			valid = false;
		}
		
		return valid;
		
	}
	
	function addComment(){

		gui.hideAllMessages({
			after_close: function(){
				var data = _getCommentData() || {};
				
				if(_validateComment(data)){
					_addComment(data);
				}
			}
		});

	}
	
	function addUpdate(){

		gui.hideAllMessages({
			after_close: function(){
				var data = _getUpdateData() || {};
				
				if(_validateUpdate(data)){
					_addUpdate(data);
				}
			}
		});

	}
	
	function ratify(value){

		value = value || true;
		
		var ajaxParams = {
				type: 'POST',
				url: dmpl.appUrl + '/reports/ratify/' + getId(),
				data: {is_real: value},
				dataType: 'json',
				success: function(response){
					
					if(response.status == '1'){
						if(response.redirect){
							location.href = response.redirect;
						}else{
							gui.showMessage({text: 'Obrigado pela participação!', type: gui.MESSAGE_TYPES.info});
							$('.ratify-container').fadeOut('fast', function(){
								$(this).remove();
							});
						}
					}else{
						gui.showMessage({text: 'Erro ao classificar reporte. Resposta do sistema: ' + (response.message || 'sem resposta'), type: gui.MESSAGE_TYPES.error});
						if(response.status == '2'){
							$('.ratify-container').fadeOut('fast', function(){
								$(this).remove();
							});
						}
					}
					
				}
		};

		network.ajax({ajax: ajaxParams, errorMessage: 'Ocorreu um erro ao conectar com o servidor!', loadMessage: 'Classificando reporte...'});

	}
	
	function validateUpdate(value, id){
		
		if(!id){
			return;
		}
		
		value = value || '1';

		var ajaxParams = {
				type: 'POST',
				url: dmpl.appUrl + '/reports/validate_update/' + id,
				data: {
					is_valid: value
				},
				dataType: 'json',
				success: function(response){
					
					if(response.status == '1'){
						if(response.redirect){
							location.href = response.redirect;
						}else{
							gui.showMessage({text: 'Obrigado pela participação!', type: gui.MESSAGE_TYPES.info});
							$('.post-updates .validation-div[data-id="'+id+'"]').fadeOut('fast', function(){
								$(this).remove();
							});
						}
					}else{
						gui.showMessage({text: 'Erro ao validar atualização. Resposta do sistema: ' + (response.message || 'sem resposta'), type: gui.MESSAGE_TYPES.error});
						if(response.status == '2'){
							$('.post-updates .validation-div[data-id="'+id+'"]').fadeOut('fast', function(){
								$(this).remove();
							});
						}
					}
					
				}
		};

		network.ajax({ajax: ajaxParams, errorMessage: 'Ocorreu um erro ao conectar com o servidor!', loadMessage: 'Validando atualização...'});

	}
	
	function validateComment(value, id){
		
		if(!id){
			return;
		}
		
		value = value || '1';

		var ajaxParams = {
				type: 'POST',
				url: dmpl.appUrl + '/reports/validate_comment/' + id,
				data: {
					is_valid: value
				},
				dataType: 'json',
				success: function(response){
					
					if(response.status == '1'){
						if(response.redirect){
							location.href = response.redirect;
						}else{
							gui.showMessage({text: 'Obrigado pela participação!', type: gui.MESSAGE_TYPES.info});
							$('.post-comments .validation-div[data-id="'+id+'"]').fadeOut('fast', function(){
								$(this).remove();
							});
						}
					}else{
						gui.showMessage({text: 'Erro ao validar comentário. Resposta do sistema: ' + (response.message || 'sem resposta'), type: gui.MESSAGE_TYPES.error});
						if(response.status == '2'){
							$('.post-comments .validation-div[data-id="'+id+'"]').fadeOut('fast', function(){
								$(this).remove();
							});
						}
					}
					
				}
		};

		network.ajax({ajax: ajaxParams, errorMessage: 'Ocorreu um erro ao conectar com o servidor!', loadMessage: 'Validando comentários...'});

	}
	
	function validate(value, comment){
		
		value = value || '1';

		gui.hideAllMessages({
			after_close: function(){
				if(_consolidateValidateReport(value, comment)){
					_validateReport(value, comment);
				}
			}
		});
	}
	
	function _consolidateValidateReport(value, comment){
		var valid = true;

		if(value == '0' && (!comment || comment.length < 1)){
			gui.showMessage({text: 'Você precisa informar o motivo da invalidação.', type: gui.MESSAGE_TYPES.error, time: 3600000});
			valid = false;
		}
		
		return valid;
	}
	
	function _validateReport(value, comment){
		
		value = value || '1';
		
		var ajaxParams = {
				type: 'POST',
				url: dmpl.appUrl + '/reports/validate_report/' + getId(),
				data: {
					is_valid: value,
					reason: comment
				},
				dataType: 'json',
				success: function(response){
					
					if(response.status == '1'){
						if(response.redirect){
							location.href = response.redirect;
						}else{
							gui.showMessage({text: 'Obrigado pela participação!', type: gui.MESSAGE_TYPES.info});
							$('.validation-container').fadeOut('fast', function(){
								$(this).remove();
							});
						}
					}else{
						gui.showMessage({text: 'Erro ao validar reporte. Resposta do sistema: ' + (response.message || 'sem resposta'), type: gui.MESSAGE_TYPES.error});
						if(response.status == '2'){
							$('.validation-container').fadeOut('fast', function(){
								$(this).remove();
							});
						}
					}
					
				}
		};

		network.ajax({ajax: ajaxParams, errorMessage: 'Ocorreu um erro ao conectar com o servidor!', loadMessage: 'Validando reporte...'});

	}
	
	function goSearch(q){
		q = q || '';
		location.href = '/reports/bySearch/?q=' + encodeURIComponent(q);
	}
	
	function get(index){
		var items = _get();
		if(index){
			return (items[index] ? items[index] : items);
		}else{
			return items;
		}
	}
	
	function _get(){
		var obj = {};
		try{
			if(window.reportsStr){
				obj = $.parseJSON(window.reportsStr);
			}
		}catch(e){
			console.log('Erro ao fazer parsgin da lista de relatórios [_get] ', e);
		}
		return obj;
	}
	
	function _getCommentData(){
		var data = {Report: {id: getId()}, ReportsComment: {}, User: {}};

		if($('#commentName').size() > 0){
			data.User.name = $('#commentName').val();
		}

		if($('#commentEmail').size() > 0){
			data.User.email = $('#commentEmail').val();
		}

		if($('#commentSite').size() > 0){
			data.User.site = $('#commentSite').val();
		}
		
		if($('#commentReplyTo').size() > 0){
			data.ReportsComment.reply_to = $('#commentReplyTo').val();
		}
		
		data.ReportsComment.description = $('#commentDescription').val();
		
		return data;
	}

	function _validateComment(data){

		var valid = true;
		
		if(!user.isLogged()){
			if(!data.User.name || data.User.name.length < 1){
				gui.showMessage({text: 'Você precisa informar o seu nome.', type: gui.MESSAGE_TYPES.error, time: 3600000});
				valid = false;
			}
			if(!data.User.email || data.User.email.length < 1){
				gui.showMessage({text: 'Você precisa informar o seu email.', type: gui.MESSAGE_TYPES.error, time: 3600000});
				valid = false;
			}
			/**
			 * o site não é obrigatório.
			 */
		}
		
		if(!data.ReportsComment.description || data.ReportsComment.description.length < 1){
			gui.showMessage({text: 'Você precisa escrever um comentário.', type: gui.MESSAGE_TYPES.error, time: 3600000});
			valid = false;
		}
		
		return valid;
		
	}
	
	function _addComment(data){
		
		var ajaxParams = {
				type: 'POST',
				url: dmpl.appUrl + '/reports/addComment/' + getId(),
				data: data,
				dataType: 'json',
				success: function(response){
					
					if(response.status == '1'){
						if(response.redirect){
							location.href = response.redirect;
						}else{
							gui.showMessage({text: 'Comentário enviado com sucesso!', type: gui.MESSAGE_TYPES.info});
							_clearCommentForm();
						}
					}else{
						gui.showMessage({text: 'Erro ao enviar comentário. Resposta do sistema: ' + (response.message || 'sem resposta'), type: gui.MESSAGE_TYPES.error});
					}
					
				}
		};

		network.ajax({ajax: ajaxParams, errorMessage: 'Ocorreu um erro ao conectar com o servidor!', loadMessage: 'Enviando comentário...'});
	}
	
	function _clearCommentForm(){
		$('#commentName,#commentEmail,#commentSite,#commentText').val('');
		$('#commentReplyTo').parent().fadeOut('fast', function(){
			$(this).remove();
		});
	}
	
	function _getUpdateData(){
		var data = {Report: {id: getId()}, ReportsUpdate: {}, User: {}};
		
		data.ReportsUpdate.description = $('#updateDescription').val();
		data.ReportsUpdate.mood_id = $('#ReportsUpdateMoodId').val();
		data.ReportsUpdate.solved = $('#updateSolved').is(':checked');
		data.ReportsUpdate.privacy_policy = $('#updatePrivacyPolicy').is(':checked');
		
		return data;
	}

	function _validateUpdate(data){

		var valid = true;
		
		if(!data.ReportsUpdate.description || data.ReportsUpdate.description.length < 1){
			gui.showMessage({text: 'Você precisa escrever uma descrição para a atualização.', type: gui.MESSAGE_TYPES.error, time: 3600000});
			valid = false;
		}
		
		if(!data.ReportsUpdate.privacy_policy){
			gui.showMessage({text: 'Você precisa concordar com a política de privacidade.', type: gui.MESSAGE_TYPES.error, time: 3600000});
			valid = false;
		}
		
		return valid;
		
	}
	
	function _addUpdate(data){
		
		var ajaxParams = {
				type: 'POST',
				url: dmpl.appUrl + '/reports/addUpdate/' + getId(),
				data: data,
				dataType: 'json',
				success: function(response){
					
					if(response.status == '1'){
						if(response.redirect){
							location.href = response.redirect;
						}else{
							gui.showMessage({text: 'Atualização enviada com sucesso!', type: gui.MESSAGE_TYPES.info});
							_clearCommentForm();
						}
					}else{
						gui.showMessage({text: 'Erro ao enviar atualização. Resposta do sistema: ' + (response.message || 'sem resposta'), type: gui.MESSAGE_TYPES.error});
					}
					
				}
		};

		network.ajax({ajax: ajaxParams, errorMessage: 'Ocorreu um erro ao conectar com o servidor!', loadMessage: 'Enviando atualização...'});
	}
	
	function _clearUpdateForm(){
		$('#updateDescription').val('');
		$('#updateSolved,#updatePrivacyPolicy').attr('checked', false);
	}
	
	return {
		save						: save,
		getId						: getId,
		addComment			: addComment,
		addUpdate				: addUpdate,
		ratify					: ratify,
		validate				: validate,
		validateUpdate	: validateUpdate,
		validateComment	: validateComment,
		get							: get,
		goSearch				: goSearch
	}

});

/*************************************************************************************************************************
 * MODULE: App
 * Define a set of utilitarian functions for application hanlder.
 *
 * 
 *************************************************************************************************************************/
;dmpl.define('App', function($){

	var util = dmpl.require('Util'),
	network = dmpl.require('Network'),
	gui = dmpl.require('GUI'),
	user = dmpl.require('User'),
	context = null;

	function setContext(type, value){
		
		if(!value){
			return false;
		}
		
		type = type || 5;
		
		var ajaxParams = {
				type: 'POST',
				url: dmpl.appUrl + '/users/setContext/',
				data: {type: type, value: value},
				dataType: 'json',
				success: function(response){
					
					if(response.status == '1'){
						if(response.redirect){
							location.href = response.redirect;
						}else{
							gui.showMessage({text: 'Contexto atualizado com sucesso!', type: gui.MESSAGE_TYPES.info});
						}
					}else{
						gui.showMessage({text: 'Erro ao atualizar contexto. Resposta do sistema: ' + (response.message || 'sem resposta'), type: gui.MESSAGE_TYPES.error});
					}
					
				}
		};

		network.ajax({ajax: ajaxParams, errorMessage: 'Ocorreu um erro ao conectar com o servidor!', loadMessage: 'Atualizando contexto...'});
		
	}
	
	function sendMessage(){

		gui.hideAllMessages({
			after_close: function(){
				var data = _getMessageData() || {};
				
				if(_validateMessage(data)){
					_sendMessage(data);
				}
			}
		});

	}
	
	function _getMessageData(){
		var data = {Message: {}, User: {}};

		if($('#name').size() > 0){
			data.User.name = $('#name').val();
		}

		if($('#email').size() > 0){
			data.User.email = $('#email').val();
		}

		if($('#subject').size() > 0){
			data.Message.subject = $('#subject').val();
		}
		
		data.Message.content = $('#msgContent').val();
		
		return data;
	}

	function _validateMessage(data){

		var valid = true;
		
		if(!data.User.name || data.User.name.length < 1){
			gui.showMessage({text: 'Você precisa informar o seu nome.', type: gui.MESSAGE_TYPES.error, time: 3600000});
			valid = false;
		}
		if(!data.User.email || data.User.email.length < 1){
			gui.showMessage({text: 'Você precisa informar o seu email.', type: gui.MESSAGE_TYPES.error, time: 3600000});
			valid = false;
		}

		if(!data.Message.content || data.Message.content.length < 1){
			gui.showMessage({text: 'Você precisa escrever uma mensagem.', type: gui.MESSAGE_TYPES.error, time: 3600000});
			valid = false;
		}
		
		return valid;
		
	}
	
	function _sendMessage(data){
		
		var ajaxParams = {
				type: 'POST',
				url: dmpl.appUrl + '/pages/sendMessage',
				data: data,
				dataType: 'json',
				success: function(response){
					
					if(response.status == '1'){
						if(response.redirect){
							location.href = response.redirect;
						}else{
							gui.showMessage({text: 'Mensagem enviada com sucesso!', type: gui.MESSAGE_TYPES.info});
							_clearMessageForm();
						}
					}else{
						gui.showMessage({text: 'Erro ao enviar mensagem. Resposta do sistema: ' + (response.message || 'sem resposta'), type: gui.MESSAGE_TYPES.error});
					}
					
				}
		};

		network.ajax({ajax: ajaxParams, errorMessage: 'Ocorreu um erro ao conectar com o servidor!', loadMessage: 'Enviando mensagem...'});
	}
	
	function _clearMessageForm(){
		$('#name,#email,#subject,#msgContent').val('');
	}
	
	function moodFormat(mood) {
	  if (!mood.id) return mood.text; // optgroup
	  return "<img class='mood-select-icon' src='/img/moods/" + mood.id.toLowerCase() + ".png'/>" + mood.text;
	}
	
	return {
		setContext	: setContext,
		sendMessage	: sendMessage,
		moodFormat	: moodFormat
	}

});

/**
 * Instancio os módulos (já implementados). 
 */
dmpl.Util = dmpl.require("Util");
dmpl.GUI = dmpl.require("GUI");
dmpl.Network = dmpl.require("Network");
dmpl.Map = dmpl.require("Map");
dmpl.Upload = dmpl.require("Upload");
dmpl.User = dmpl.require("User");
dmpl.Report = dmpl.require("Report");
dmpl.App = dmpl.require("App");