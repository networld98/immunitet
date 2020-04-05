<!DOCTYPE html>
<!--[if IE 8]>    <html class="no-js lt-ie10 lt-ie9 ie-8 lang="ru"> <![endif]-->
<!--[if IE 9]>    <html class="no-js lt-ie10 ie-9 lang="ru"> <![endif]-->
<!--[if gt IE 9]><!-->
<html class="no-js" lang="ru"> <!--<![endif]-->
<head>
    <title><?$APPLICATION->ShowTitle()?></title>
    <meta charset="utf-8">
    <meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE">
    <meta name="robots" content="index, follow"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
    <?$APPLICATION->ShowHead();?>
    <div id="panel"><? if ($USER->IsAdmin()){$APPLICATION->ShowPanel();}; ?></div>
    <link href="<?=SITE_TEMPLATE_PATH?>/css/normalize.css" rel="stylesheet">
    <link href="<?=SITE_TEMPLATE_PATH?>/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?=SITE_TEMPLATE_PATH?>/css/styles.css" rel="stylesheet">
    <link href="<?=SITE_TEMPLATE_PATH?>/css/adaptive.css" rel="stylesheet">
    <link href='<?=SITE_TEMPLATE_PATH?>/css/highslide.min.css' rel='stylesheet' type='text/css'/>
    <link href="<?=SITE_TEMPLATE_PATH?>/css/index.scss.css" type="text/css" rel="stylesheet" />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <script src="<?=SITE_TEMPLATE_PATH?>/js/jquery-1.8.3.min.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/bootstrap.min.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/modernizr.2.6.2.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/equalheight.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/jquery-ui.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/notify.min.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/myscript.js" type="text/javascript"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/index.js" type="text/javascript" ></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/scripts.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/custom.js"></script>
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-27952236-16', 'auto');
        ga('send', 'pageview');

    </script>
</head>
<body class="page-main">
<div id="site-wrapper">
    <div class="wrapper-shadow left"></div>
    <div class="wrapper-shadow right"></div>
    <header id="header" role="banner">
        <div class="logo">
            <?$APPLICATION->IncludeFile("/include/infoportal_name.php", Array(), Array(
                "MODE"      => "php",
                "NAME"      => "Редактирование включаемой области раздела",
                "TEMPLATE"  => "section_include_template.php"
            ));?>
        </div>
        <?$APPLICATION->IncludeFile("/include/main_menu.php", Array(), Array(
            "MODE"      => "php",
            "NAME"      => "Редактирование включаемой области раздела",
            "TEMPLATE"  => "section_include_template.php"
        ));?>
        <div class="clear"></div>
    </header>
        <div class="header_line"></div>
         <div class="content-wrapper">
            <main id="main" role="main">
                    <div class="content-inner">