<!DOCTYPE html>
<!--[if IE 8]>    <html class="no-js lt-ie10 lt-ie9 ie-8 lang="ru"> <![endif]-->
<!--[if IE 9]>    <html class="no-js lt-ie10 ie-9 lang="ru"> <![endif]-->
<!--[if gt IE 9]><!-->
<html class="no-js" lang="ru"> <!--<![endif]-->
<head>
    <title><?$APPLICATION->ShowTitle()?></title>
    <meta charset="utf-8">
    <?$APPLICATION->ShowHead();?>
    <div id="panel"><? if ($USER->IsAdmin()){$APPLICATION->ShowPanel();}; ?></div>

    <link href="<?=SITE_TEMPLATE_PATH?>/css/bootstrap.min.css" rel="stylesheet">
    <link href="<?=SITE_TEMPLATE_PATH?>/css/styles.css" rel="stylesheet">
    <link href="<?=SITE_TEMPLATE_PATH?>/css/index.scss.css" type="text/css" rel="stylesheet" />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <script src="<?=SITE_TEMPLATE_PATH?>/js/jquery-1.8.3.min.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/bootstrap.min.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.maskedinput.min.js"></script>

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