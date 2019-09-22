$(document).ready(function(){
	$('#doLoginBtn').click(function(){
		dmpl.User.login($('#loginForm'));
	});
	$('#usernameTxt,#passwordTxt').keypress(function( event ) {
		if ( event.which == 13 ) {
			dmpl.User.login($('#loginForm'));
		}
	});
		
});