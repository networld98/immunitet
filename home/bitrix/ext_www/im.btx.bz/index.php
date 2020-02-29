<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php"); ?>
    <?$APPLICATION->IncludeFile("/include/main_slider.php", Array(), Array(
        "MODE"      => "php",
        "NAME"      => "Редактирование включаемой области раздела",
        "TEMPLATE"  => "section_include_template.php"
    ));?>
    <div class="content-block-main content-block-main2">
        <div class="content_block_main_in">
            <?$APPLICATION->IncludeFile("/include/slogan_phone.php", Array(), Array(
                "MODE"      => "php",
                "NAME"      => "Редактирование включаемой области раздела",
                "TEMPLATE"  => "section_include_template.php"
            ));?>
        </div>
        <div class="pulse-line top"></div>
    </div>
    <div class="main-article small-screen-padding">
        <div class="main-article-inner">
            <div class="main-article-row">
                <?$APPLICATION->IncludeFile("/include/informaciya.php", Array(), Array(
                    "MODE"      => "php",
                    "NAME"      => "Редактирование включаемой области раздела",
                    "TEMPLATE"  => "section_include_template.php"
                ));?>
            </div>
        </div>
    </div>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>