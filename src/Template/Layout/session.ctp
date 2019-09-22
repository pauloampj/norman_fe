<!DOCTYPE html>
<html>
<head>
    <?php echo $this->Html->charset() ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title><?= $this->fetch('title') ?></title>


    <!--STYLESHEET-->
    <!--=================================================-->

    <!--Open Sans Font [ OPTIONAL ]-->
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700' rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">


    <!--Bootstrap Stylesheet [ REQUIRED ]-->
    <?php echo $this->Html->css('bootstrap.min'); ?>

    <!--Nifty Stylesheet [ REQUIRED ]-->
    <?php echo $this->Html->css('nifty.min'); ?>

	<!--Material Design Lite [ REQUIRED ]-->
    <?php echo $this->Html->css('material.min'); ?>

    <!--Nifty Premium Icon [ DEMONSTRATION ]-->
    <?php echo $this->Html->css('demo/nifty-demo-icons.min'); ?>

    <!--=================================================-->


    <!--Pace - Page Load Progress Par [OPTIONAL]-->
    <?php echo $this->Html->css('/plugins/pace/pace.min'); ?>
	<?php echo $this->Html->script('/plugins/pace/pace.min'); ?>


    <!--Demo [ DEMONSTRATION ]-->
    <?php echo $this->Html->css('demo/nifty-demo.min'); ?>
    <?php echo $this->Html->css('themes/type-full/theme-light-full.min'); ?>


	<!--Soluciona os conflitos de libs de CSS [ REQUIRED ]-->
    <?php echo $this->Html->css('conflicts'); ?>
            
    <!--=================================================

    REQUIRED
    You must include this in your project.


    RECOMMENDED
    This category must be included but you may modify which plugins or components which should be included in your project.


    OPTIONAL
    Optional plugins. You may choose whether to include it in your project or not.


    DEMONSTRATION
    This is to be removed, used for demonstration purposes only. This category must not be included in your project.


    SAMPLE
    Some script samples which explain how to initialize plugins or components. This category should not be included in your project.


    Detailed information and more samples can be found in the document.

    =================================================-->
        
</head>

<!--TIPS-->
<!--You may remove all ID or Class names which contain "demo-", they are only used for demonstration. -->
<body>
    <div id="container" class="cls-container">
    	<?= $this->fetch('content') ?>
    </div>
    
    <!--JAVASCRIPT-->
    <!--=================================================-->

    <!--jQuery [ REQUIRED ]-->
    <?php echo $this->Html->script('jquery.min'); ?>

    <!--BootstrapJS [ RECOMMENDED ]-->
    <?php echo $this->Html->script('bootstrap.min'); ?>

	<!-- Material Design Lite [ REQUIRED ]-->
    <?php echo $this->Html->script('material.min'); ?>	

    <!--NiftyJS [ RECOMMENDED ]-->
    <?php echo $this->Html->script('nifty.min'); ?>
    
    <!-- Damaplan [ REQUIRED ]-->
    <?php echo $this->Html->script('dmpl/dmpl'); ?>
    
    <!-- Damaplan [ REQUIRED ]-->
    <?php echo $this->Html->script('dmpl/session'); ?>


    <!--=================================================-->
    
    <!--jQuery Cookie [ RECOMMENDED ]-->
    <?php echo $this->Html->script('/plugins/cookie/js.cookie'); ?>
    
    <!--Demo script [ DEMONSTRATION ]-->
    <?php echo $this->Html->script('demo/nifty-demo'); ?>


    <!--Background Image [ DEMONSTRATION ]-->
    <?php echo $this->Html->script('demo/bg-images'); ?>

</body>
</html>
