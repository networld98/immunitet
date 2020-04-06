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
    <link href="<?=SITE_TEMPLATE_PATH?>/css/styles.css" rel="stylesheet">
    <link href="<?=SITE_TEMPLATE_PATH?>/css/adaptive.css" rel="stylesheet">
    <link href="<?=SITE_TEMPLATE_PATH?>/css/stylesseo.css" rel="stylesheet">
    <link href="<?=SITE_TEMPLATE_PATH?>/css/modules_styles.css" rel="stylesheet">
    <link href="<?=SITE_TEMPLATE_PATH?>/css/articles.css" rel="stylesheet">
    <link href="<?=SITE_TEMPLATE_PATH?>/css/jquery-ui.css" rel="stylesheet" >
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    <script src="<?=SITE_TEMPLATE_PATH?>/js/jquery-1.8.3.min.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/modernizr.2.6.2.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.waterwheelCarousel.min.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.placeholder.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/equalheight.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/jquery-ui.js"></script>
    <link rel='stylesheet' type='text/css' href='<?=SITE_TEMPLATE_PATH?>/css/highslide.min.css'/>
    <script type='text/javascript' src='<?=SITE_TEMPLATE_PATH?>/js/highslide.packed.js'></script>
    <script type='text/javascript'>
        hs.graphicsDir = '<?=SITE_TEMPLATE_PATH?>/graphics/';
        hs.outlineType = null;
        hs.showCredits = false;
        hs.lang={cssDirection:'ltr',loadingText:'Загрузка...',loadingTitle:'Кликните чтобы отменить',focusTitle:'Нажмите чтобы перенести вперёд',fullExpandTitle:'Увеличить',fullExpandText:'Полноэкранный',previousText:'Предыдущий',previousTitle:'Назад (стрелка влево)',nextText:'Далее',nextTitle:'Далее (стрелка вправо)',moveTitle:'Передвинуть',moveText:'Передвинуть',closeText:'Закрыть',closeTitle:'Закрыть (Esc)',resizeTitle:'Восстановить размер',playText:'Слайд-шоу',playTitle:'Слайд-шоу (пробел)',pauseText:'Пауза',pauseTitle:'Приостановить слайд-шоу (пробел)',number:'Изображение %1/%2',restoreTitle:'Нажмите чтобы посмотреть картинку, используйте мышь для перетаскивания. Используйте клавиши вперёд и назад'};</script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/notify.min.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/js/scripts.js"></script>
    <script>
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-27952236-16', 'auto');
        ga('send', 'pageview');

    </script>
    <script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/myscript.js"></script>
    <link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/css/style_bdr.scss.css">
    <link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/css/board.blue.css">

    <link type="text/css" rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/css/index.scss.css"/>
    <link type="text/css" rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/css/jquery.datetimepicker.css"/>
    <script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/jquery.datetimepicker.full.min.js"></script>
    <script type="text/javascript" src="<?=SITE_TEMPLATE_PATH?>/js/index.js"></script>
    <script>
        $(function(){
            $('.formsteps').formsteps({
                mode: "popup"
            });
        });
    </script>
</head>
<body class="<?if ($APPLICATION->GetCurPage() == '/'){?>page-main<?}elseif($APPLICATION->GetCurPage() == '/detskoe-otdelenie1/'){?>page-children<?}elseif($APPLICATION->GetCurPage() =='/napravleniya-kliniki/'){?>page-service-list<?}elseif(CSite::InDir('/napravleniya-kliniki/')){?>page-service<?}?>">
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
    <? if ($APPLICATION->GetCurPage(false) !== '/'): ?>
        <div class="header_line"></div>
        <? if ($APPLICATION->GetCurPage(false) !== '/detskoe-otdelenie1/'): ?>
           <?$APPLICATION->IncludeComponent(
            "bitrix:breadcrumb",
            "",
            Array(
            "START_FROM" => "0",
            "PATH" => "",
            "SITE_ID" => "-"
            ),
            false
            );?>
        <? endif; ?>
        <? if ($APPLICATION->GetCurPage(false) === '/detskoe-otdelenie1/'): ?>
            <div class="children-bg-left"></div>
            <div class="children-bg-right"></div>
        <? endif; ?>
         <div class="content-wrapper">
            <main id="main" role="main">
                <? if ($APPLICATION->GetCurPage(false) !== '/detskoe-otdelenie1/'): ?>
                <div class="content">
                <? endif; ?>
                    <div class="content-inner">
    <? endif; ?>