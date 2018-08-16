<!--CONTENT CONTAINER-->
<!--===================================================-->
<div id="content-container">
	<!--Page content-->
	<!--===================================================-->
	<div id="page-content">
		<div class="panel">
			<div class="panel-heading">
				<h3 class="panel-title">Configurar Notificações</h3>
			</div>

			<!--Panel heading-->
			<div class="panel-heading">
				<div class="panel-control">
					<ul class="nav nav-tabs">
						<li class="active"><a href="#user-activities-box" data-toggle="tab">Bacen</a></li>
						<li><a href="#user-basics-box" data-toggle="tab">Receita Federal</a></li>
						<li><a href="#user-company-box" data-toggle="tab">Planalto</a></li>
						<li><a href="#user-company-box" data-toggle="tab">Congresso</a></li>
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
										<i class="demo-pli-smartphone-3 icon-lg"></i> - From Mobile -
										26 min ago
									</p>
								</div>
								<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
									diam nonummy nibh euismod tincidunt</p>
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
										<i class="demo-pli-smartphone-3 icon-lg"></i> - From Mobile -
										26 min ago
									</p>
								</div>
								<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
									diam nonummy nibh euismod tincidunt</p>
							</div>
						</div>
						<!--===================================================-->
						<!-- End Newsfeed Content -->
						<hr class="new-section-md bord-no">
						<button class="btn btn-primary btn-block mar-ver">Carregar mais</button>
					</div>
					<div class="tab-pane fade" id="user-basics-box">Dados básicos</div>
					<div class="tab-pane fade" id="user-company-box">Dados da empresa</div>
				</div>
			</div>
		</div>
	</div>
	<!--===================================================-->
	<!--End page content-->
</div>
<!--===================================================-->
<!--END CONTENT CONTAINER-->