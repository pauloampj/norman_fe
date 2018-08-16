<?php

$this->layout = 'session';
$this->assign('title', 'Norman - Login');

$bgImgs = array(
		'bg-img-1.jpg',
		'bg-img-2.jpg',
		'bg-img-3.jpg',
		'bg-img-4.jpg',
		'bg-img-5.jpg',
		'bg-img-6.jpg',
		'bg-img-7.jpg'
);
$randKey = array_rand($bgImgs);

$backgroundImages = $bgImgs[$randKey];

?>
    
		<!-- BACKGROUND IMAGE -->
		<!--===================================================-->
		<div id="bg-overlay" class="bg-img" style="background-image: url(<?php echo $this->Url->image('bg-img/' . $backgroundImages); ?>);"></div>
		
		
		<!-- LOGIN FORM -->
		<!--===================================================-->
		<div class="cls-content">
		    <div class="cls-content-sm panel">
		        <div class="panel-body">
		            <div class="mar-ver pad-btm">
		                <h1 class="h3">Bem-vindo ao Norman</h1>
		                <p>Faça login na sua conta</p>
		            </div>
		            <div id="loginForm">
		            	<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						    <input class="mdl-textfield__input" type="text" id="usernameTxt">
							<label class="mdl-textfield__label" for="username">Usuário</label>
						</div>
						<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
						    <input class="mdl-textfield__input" type="password" id="passwordTxt">
							<label class="mdl-textfield__label" for="password">Senha</label>
						</div>
		                <div class="checkbox pad-btm text-left">
		                    <input id="demo-form-checkbox" class="magic-checkbox" type="checkbox">
		                    <label for="demo-form-checkbox">Lembrar de mim</label>
		                </div>
		                <button id="doLoginBtn" class="btn btn-primary btn-lg btn-block" type="button">Entrar</button>
		            </div>
		        </div>
		
		        <div class="pad-all">
		            <a href="pages-password-reminder.html" class="btn-link mar-rgt">Esqueceu a senha?</a>
		        </div>
		    </div>
		</div>
		<!--===================================================-->
		<script>
			window.csrfToken = "<?php echo $this->request->getParam('_csrfToken'); ?>";
		</script>