<!--CONTENT CONTAINER-->
<!--===================================================-->
<div id="content-container">
	<!--Page content-->
	<!--===================================================-->
	<div id="page-content">
		<div class="panel">
			<div class="panel-body">
				<div class="fixed-fluid">
					<div class="fixed-md-200 pull-sm-left fixed-right-border">

						<!-- Simple profile -->
						<div class="text-center">
							<div class="pad-ver">
								<img
									src="<?php echo $this->Url->build('/img/profile-photos/1.png');?>"
									class="img-lg img-circle" alt="Profile Picture">
							</div>
							<h4 class="text-lg text-overflow mar-no"><?php echo $user['Name']; ?></h4>
							<p class="text-sm text-muted">Digital Marketing Director</p>

							<div class="pad-ver btn-groups">
								<a href="#"
									class="btn btn-icon demo-pli-facebook icon-lg add-tooltip"
									data-original-title="Facebook" data-container="body"></a> <a
									href="#"
									class="btn btn-icon demo-pli-twitter icon-lg add-tooltip"
									data-original-title="Twitter" data-container="body"></a> <a
									href="#"
									class="btn btn-icon demo-pli-google-plus icon-lg add-tooltip"
									data-original-title="Google+" data-container="body"></a> <a
									href="#"
									class="btn btn-icon demo-pli-instagram icon-lg add-tooltip"
									data-original-title="Instagram" data-container="body"></a>
							</div>
							<button class="btn btn-block btn-success btn-lg">Editar Perfil</button>
							<button class="btn btn-block btn-success btn-lg">Enviar Mensagem</button>
						</div>
						<hr>

						<!-- Profile Details -->
						<p class="pad-ver text-main text-sm text-uppercase text-bold">Sobre
							</p>
						<p>
							<i class="demo-pli-map-marker-2 icon-lg icon-fw"></i> Porto Alegre,
							RS
						</p>
						<p>
							<a href="#" class="btn-link"><i
								class="demo-pli-internet icon-lg icon-fw"></i>
								www.damaplan.com.br</a>
						</p>
						<p>
							<i class="demo-pli-old-telephone icon-lg icon-fw"></i>(51) 343
							10242
						</p>
					</div>

					<!--Panel with Tabs-->
					<!--===================================================-->
					<div class="fixed-md-400 pull-sm-right">

						<!--Panel heading-->
						<div class="panel-heading">
							<div class="panel-control">
								<ul class="nav nav-tabs">
									<li class="active"><a href="#user-activities-box" data-toggle="tab">Atividades</a></li>
									<li><a href="#user-basics-box" data-toggle="tab">Dados Básicos</a></li>
									<li><a href="#user-company-box" data-toggle="tab">Empresa</a></li>
								</ul>
							</div>
						</div>

						<!--Panel body-->
						<div class="panel-body">
							<div class="tab-content">
								<div class="tab-pane fade in active" id="user-activities-box">
									<!-- Newsfeed Content -->
									<!--===================================================-->
									<div class="comments media-block">
										<a class="media-left" href="#"><img class="img-circle img-sm"
											alt="Profile Picture"
											src="<?php echo $this->Url->build('/img/profile-photos/2.png');?>"></a>
										<div class="media-body">
											<div class="comment-header">
												<a href="#"
													class="media-heading box-inline text-main text-semibold">John
													Doe</a> Share a status of <a href="#"
													class="media-heading box-inline text-main text-semibold">Lucy
													Doe</a>
												<p class="text-muted text-sm">
													<i class="demo-pli-smartphone-3 icon-lg"></i> - From Mobile
													- 26 min ago
												</p>
											</div>
											<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
												sed diam nonummy nibh euismod tincidunt</p>
										</div>
									</div>
									<!--===================================================-->
									<!-- End Newsfeed Content -->

									<!-- Newsfeed Content -->
									<!--===================================================-->
									<div class="comments media-block">
										<a class="media-left" href="#"><img class="img-circle img-sm"
											alt="Profile Picture"
											src="<?php echo $this->Url->build('/img/profile-photos/2.png');?>"></a>
										<div class="media-body">
											<div class="comment-header">
												<a href="#"
													class="media-heading box-inline text-main text-semibold">John
													Doe</a> Share a status of <a href="#"
													class="media-heading box-inline text-main text-semibold">Lucy
													Doe</a>
												<p class="text-muted text-sm">
													<i class="demo-pli-smartphone-3 icon-lg"></i> - From Mobile
													- 26 min ago
												</p>
											</div>
											<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
												sed diam nonummy nibh euismod tincidunt</p>
										</div>
									</div>
									<!--===================================================-->
									<!-- End Newsfeed Content -->
									<hr class="new-section-md bord-no">
									<button class="btn btn-primary btn-block mar-ver">Carregar mais</button>
								</div>
								<div class="tab-pane fade" id="user-basics-box">
									Dados básicos
								</div>
								<div class="tab-pane fade" id="user-company-box">
									Dados da empresa
								</div>
							</div>
						</div>
					</div>
					<!--===================================================-->
					<!--End Panel with Tabs-->
				</div>
			</div>
		</div>
	</div>
	<!--===================================================-->
	<!--End page content-->
</div>
<!--===================================================-->
<!--END CONTENT CONTAINER-->