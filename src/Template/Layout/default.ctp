<!DOCTYPE html>
<html lang="en">
<head>
    <?php echo $this->Html->charset() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title><?= $this->fetch('title') ?></title>

    <!--STYLESHEET-->
    <!--=================================================-->

    <!--Open Sans Font [ OPTIONAL ]-->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>

    <!--Bootstrap Stylesheet [ REQUIRED ]-->
    <?php echo $this->Html->css('bootstrap.min'); ?>

    <!--Nifty Stylesheet [ REQUIRED ]-->
    <?php echo $this->Html->css('nifty.min'); ?>

    <!--Nifty Premium Icon [ DEMONSTRATION ]-->
    <?php echo $this->Html->css('demo/nifty-demo-icons.min'); ?>
    <?php echo $this->Html->css('/plugins/pli/premium-line-icons'); ?>

    <!--=================================================-->

    <!--Pace - Page Load Progress Par [OPTIONAL]-->
    <?php echo $this->Html->css('/plugins/pace/pace.min'); ?>
	<?php echo $this->Html->script('/plugins/pace/pace.min'); ?>
	
	<?php echo $this->Html->css('/plugins/switchery/switchery.min'); ?>

    <!--Demo [ DEMONSTRATION ]-->
    <?php echo $this->Html->css('demo/nifty-demo.min'); ?>
    <?php echo $this->Html->css('themes/type-full/theme-light-full.min'); ?>
    
    <?php echo $this->Html->css('dmpl'); ?>
        
</head>

<!--TIPS-->
<!--You may remove all ID or Class names which contain "demo-", they are only used for demonstration. -->
<body>
    <div id="container" class="effect aside-float aside-bright mainnav-sm">
        
		<?php echo $this->element('Menu/top_menu'); ?>        

        <div class="boxed">
			<?php echo $this->fetch('content'); ?>
            <?php echo $this->element('Menu/aux_menu'); ?> 
            <?php echo $this->element('Menu/main_menu'); ?>
        </div>

        <!-- SCROLL PAGE BUTTON -->
        <!--===================================================-->
        <button class="scroll-top btn">
            <i class="pci-chevron chevron-up"></i>
        </button>
        <!--===================================================-->
    </div>
    <!--===================================================-->
    <!-- END OF CONTAINER -->
    
    <!--JAVASCRIPT-->
    <!--=================================================-->

    <!--jQuery [ REQUIRED ]-->
    <?php echo $this->Html->script('jquery.min'); ?>

    <!--BootstrapJS [ RECOMMENDED ]-->
    <?php echo $this->Html->script('bootstrap.min'); ?>

    <!--NiftyJS [ RECOMMENDED ]-->
    <?php echo $this->Html->script('nifty.min'); ?>

    <!--=================================================-->
    
    <!--jQuery Cookie [ RECOMMENDED ]-->
    <?php echo $this->Html->script('/plugins/cookie/js.cookie'); ?>
    
    <!-- Switchery [ OPTIONAL ]-->
    <?php echo $this->Html->script('/plugins/switchery/switchery.min'); ?>
    
    <!--Flot Chart [ OPTIONAL ]-->
    <?php echo $this->Html->script('/plugins/flot-charts/jquery.flot.min'); ?>
    <?php echo $this->Html->script('/plugins/flot-charts/jquery.flot.resize.min'); ?>
    <?php echo $this->Html->script('/plugins/flot-charts/jquery.flot.tooltip.min'); ?>

    <!--Sparkline [ OPTIONAL ]-->
    <?php echo $this->Html->script('/plugins/sparkline/jquery.sparkline.min'); ?>

    <!--Specify page [ SAMPLE ]-->
    <?php echo $this->Html->script('demo/dashboard'); ?>
    
    <?php echo $this->Html->script('dmpl/dmpl'); ?>
</body>
</html>
