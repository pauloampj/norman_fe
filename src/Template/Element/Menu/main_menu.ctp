<?php
function buildMenu($aMenu = null) {
	$menuStr = '';
	
	if (isset ( $aMenu )) {
		// Constroi o menu... e, provavelmente, abre a tag dele...
		if (! isset ( $aMenu ['type_id'] )) {
			$aMenu ['type_id'] = '';
		}

		$link = (isset($aMenu ['web_link']) ? $aMenu ['web_link'] : '#');
		
		switch (strtoupper ( $aMenu ['type_id'] )) {
			case 'LBL' :
				$openTag = '<li class="list-header ' . (isset($aMenu ['class']) ? $aMenu ['class'] : '') . '">';
				$openChildTag = '';
				$closeChildTag = '';
				$content = $aMenu ['name'];
				$closeTag = '</li>';
				break;
			case 'MN_1' :
				$openTag = '<li class="mn-1 ' . (isset($aMenu ['class']) ? $aMenu ['class'] : '') . '">';
				$openChildTag = '<ul class="collapse">';
				$closeChildTag = '</ul>';
				$content = '<a href="' . $link . '">';
				$content .= '<i class="' . $aMenu ['icon'] . '"></i>';
				$content .= '<span class="menu-title">' . $aMenu ['name'] . '</span><i class="arrow"></i>';
				$content .= '</a>';
				$closeTag = '</li>';
				break;
			case 'MN_2' :
				$openTag = '<li class="mn-2 ' . (isset($aMenu ['class']) ? $aMenu ['class'] : '') . '"><a href="' . $link . '">';
				$openChildTag = '<ul class="collapse">';
				$closeChildTag = '</ul>';
				$content = $aMenu ['name'];
				$closeTag = '</a></li>';
				break;
			default :
				$openTag = '';
				$openChildTag = '';
				$closeChildTag = '';
				$content = '';
				$closeTag = '';
				break;
		}
		
		$menuStr .= $openTag;
		$menuStr .= $content;
		
		// verifica se tem filhos e constroi os filhos
		if (isset ( $aMenu ['children'] ) && count($aMenu ['children']) > 0) {
			$menuStr .= $openChildTag;
			
			foreach ( $aMenu ['children'] as $k => $child ) {
				$menuStr .= buildMenu ( $child );
			}
			
			$menuStr .= $closeChildTag;
		}
		
		$menuStr .= $closeTag;
		// Provavelmente fecha a tag do menu
	}
	
	return $menuStr;
}

?>
 <!--MAIN NAVIGATION-->
            <!--===================================================-->
            <nav id="mainnav-container">
                <div id="mainnav">


                    <!--OPTIONAL : ADD YOUR LOGO TO THE NAVIGATION-->
                    <!--It will only appear on small screen devices.-->
                    <!--================================
                    <div class="mainnav-brand">
                        <a href="index.html" class="brand">
                            <img src="img/logo.png" alt="Nifty Logo" class="brand-icon">
                            <span class="brand-text">Nifty</span>
                        </a>
                        <a href="#" class="mainnav-toggle"><i class="pci-cross pci-circle icon-lg"></i></a>
                    </div>
                    -->



                    <!--Menu-->
                    <!--================================-->
                    <div id="mainnav-menu-wrap">
                        <div class="nano">
                            <div class="nano-content">

                                <!--Profile Widget-->
                                <!--================================-->
                                <div id="mainnav-profile" class="mainnav-profile">
                                    <div class="profile-wrap text-center">
                                        <div class="pad-btm">
                                            <img class="img-circle img-md" src="<?php echo $this->Url->build('/img/profile-photos/1.png');?>" alt="Profile Picture">
                                        </div>
                                        <a href="#profile-nav" class="box-block" data-toggle="collapse" aria-expanded="false">
                                            <span class="pull-right dropdown-toggle">
                                                <i class="dropdown-caret"></i>
                                            </span>
                                            <p class="mnp-name">Paulo Jr</p>
                                            <span class="mnp-desc">pauloampj@gmail.com</span>
                                        </a>
                                    </div>
                                    <div id="profile-nav" class="collapse list-group bg-trans">
                                        <a href="<?php echo $this->Url->build(['controller' => 'users', 'action' => 'view', '1']);?>" class="list-group-item">
                                            <i class="demo-pli-male icon-lg icon-fw"></i> Meu Perfil
                                        </a>
                                        <a href="#" class="list-group-item">
                                            <i class="demo-pli-information icon-lg icon-fw"></i> Ajuda
                                        </a>
                                        <a href="<?php echo $this->Url->build(['controller' => 'session', 'action' => 'logout']);?>" class="list-group-item">
                                            <i class="demo-pli-unlock icon-lg icon-fw"></i> Sair
                                        </a>
                                    </div>
                                </div>


                                <!--Shortcut buttons-->
                                <!--================================-->
                                <div id="mainnav-shortcut" class="hidden">
                                    <ul class="list-unstyled shortcut-wrap">
                                        <li class="col-xs-3" data-content="Meu Perfil">
                                            <a class="shortcut-grid" href="#">
                                                <div class="icon-wrap icon-wrap-sm icon-circle bg-mint">
                                                <i class="demo-pli-male"></i>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="col-xs-3" data-content="Mensagens">
                                            <a class="shortcut-grid" href="#">
                                                <div class="icon-wrap icon-wrap-sm icon-circle bg-warning">
                                                <i class="demo-pli-speech-bubble-3"></i>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="col-xs-3" data-content="Atividade">
                                            <a class="shortcut-grid" href="#">
                                                <div class="icon-wrap icon-wrap-sm icon-circle bg-success">
                                                <i class="demo-pli-thunder"></i>
                                                </div>
                                            </a>
                                        </li>
                                        <li class="col-xs-3" data-content="Bloquear Tela">
                                            <a class="shortcut-grid" href="#">
                                                <div class="icon-wrap icon-wrap-sm icon-circle bg-purple">
                                                <i class="demo-pli-lock-2"></i>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <!--================================-->
                                <!--End shortcut buttons-->


                                <ul id="mainnav-menu" class="list-group">
									
									<?php 
									if(isset($menus) && isset($menus['menu_tree']) && isset($menus['menu_tree']['root'])){
										echo buildMenu($menus['menu_tree']['root']);
									}
									?>
										
        			</ul>


                                <!--Widget-->
                                <!--================================-->
                                <div class="mainnav-widget">

                                    <!-- Show the button on collapsed navigation -->
                                    <div class="show-small">
                                        <a href="#" data-toggle="menu-widget" data-target="#demo-wg-server">
                                            <i class="demo-pli-monitor-2"></i>
                                        </a>
                                    </div>

                                    <!-- Hide the content on collapsed navigation -->
                                    <div id="demo-wg-server" class="hide-small mainnav-widget-content">
                                        <ul class="list-group">
                                            <li class="list-header pad-no mar-ver">Server Status</li>
                                            <li class="mar-btm">
                                                <span class="label label-primary pull-right">15%</span>
                                                <p>CPU Usage</p>
                                                <div class="progress progress-sm">
                                                    <div class="progress-bar progress-bar-primary" style="width: 15%;">
                                                        <span class="sr-only">15%</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="mar-btm">
                                                <span class="label label-purple pull-right">75%</span>
                                                <p>Bandwidth</p>
                                                <div class="progress progress-sm">
                                                    <div class="progress-bar progress-bar-purple" style="width: 75%;">
                                                        <span class="sr-only">75%</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li class="pad-ver"><a href="#" class="btn btn-success btn-bock">View Details</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <!--================================-->
                                <!--End widget-->

                            </div>
                        </div>
                    </div>
                    <!--================================-->
                    <!--End menu-->

                </div>
            </nav>
            <!--===================================================-->
            <!--END MAIN NAVIGATION-->
