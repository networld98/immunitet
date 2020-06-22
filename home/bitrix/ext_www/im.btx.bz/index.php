<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php"); ?>
<?$APPLICATION->SetPageProperty("description", "Медицинский центр г. Бронницы - медцентр широкого профиля. Амбулаторно-поликлиническое учреждение, диагностика, анализы, справки."); ?>
<?$APPLICATION->SetPageProperty("title", "Медицинский Центр Иммунитет в Бронницах | Амбулаторно-поликлиническое учреждение"); ?>
    <h1 style="display: none">Медицинский Центр Иммунитет в Бронницах | Амбулаторно-поликлиническое учреждение</h1>
    <div class="content-block-main">
        <div class="content_block_main_in">
            <?$APPLICATION->IncludeFile("/include/slogan_phone_clinic.php", Array(), Array(
                "MODE"      => "php",
                "NAME"      => "Редактирование включаемой области раздела",
                "TEMPLATE"  => "section_include_template.php"
            ));?>
        </div>
    </div>
    <div class="pulse-line middle middle-first">
        &nbsp;
    </div>
    <div class="service-hide main-article small-screen-padding text-center">
        <?$APPLICATION->IncludeComponent(
            "bitrix:news.list",
            "napravleniya",
            array(
                "DISPLAY_DATE" => "Y",
                "DISPLAY_NAME" => "Y",
                "DISPLAY_PICTURE" => "Y",
                "DISPLAY_PREVIEW_TEXT" => "Y",
                "AJAX_MODE" => "Y",
                "IBLOCK_TYPE" => "-",
                "IBLOCK_ID" => "9",
                "NEWS_COUNT" => "50",
                "SORT_BY1" => "ACTIVE_FROM",
                "SORT_ORDER1" => "DESC",
                "SORT_BY2" => "SORT",
                "SORT_ORDER2" => "ASC",
                "FILTER_NAME" => "",
                "FIELD_CODE" => array(
                    0 => "ID",
                    1 => "",
                ),
                "PROPERTY_CODE" => array(
                    0 => "",
                    1 => "DESCRIPTION",
                    2 => "",
                ),
                "CHECK_DATES" => "Y",
                "DETAIL_URL" => "",
                "PREVIEW_TRUNCATE_LEN" => "",
                "ACTIVE_DATE_FORMAT" => "d.m.Y",
                "SET_TITLE" => "Y",
                "SET_BROWSER_TITLE" => "Y",
                "SET_META_KEYWORDS" => "Y",
                "SET_META_DESCRIPTION" => "Y",
                "SET_LAST_MODIFIED" => "Y",
                "INCLUDE_IBLOCK_INTO_CHAIN" => "Y",
                "ADD_SECTIONS_CHAIN" => "Y",
                "HIDE_LINK_WHEN_NO_DETAIL" => "Y",
                "PARENT_SECTION" => "",
                "PARENT_SECTION_CODE" => "",
                "INCLUDE_SUBSECTIONS" => "Y",
                "CACHE_TYPE" => "A",
                "CACHE_TIME" => "3600",
                "CACHE_FILTER" => "Y",
                "CACHE_GROUPS" => "Y",
                "DISPLAY_TOP_PAGER" => "N",
                "DISPLAY_BOTTOM_PAGER" => "Y",
                "PAGER_TITLE" => "Новости",
                "PAGER_SHOW_ALWAYS" => "Y",
                "PAGER_TEMPLATE" => "show_more",
                "PAGER_DESC_NUMBERING" => "N",
                "PAGER_DESC_NUMBERING_CACHE_TIME" => "36000",
                "PAGER_SHOW_ALL" => "Y",
                "PAGER_BASE_LINK_ENABLE" => "Y",
                "SET_STATUS_404" => "Y",
                "SHOW_404" => "Y",
                "MESSAGE_404" => "",
                "PAGER_BASE_LINK" => "",
                "PAGER_PARAMS_NAME" => "arrPager",
                "AJAX_OPTION_JUMP" => "N",
                "AJAX_OPTION_STYLE" => "Y",
                "AJAX_OPTION_HISTORY" => "N",
                "AJAX_OPTION_ADDITIONAL" => "",
                "COMPONENT_TEMPLATE" => "napravleniya",
                "STRICT_SECTION_CHECK" => "N",
                "DISPLAY_IMG_WIDTH" => "80",
                "DISPLAY_IMG_HEIGHT" => "56",
                "USE_RSS" => "Y",
                "TITLE_RSS" => "Новости информационного портала",
                "FILE_404" => ""
            ),
            false
        );?>
        <div class="wrapper_block main-btn">
            <div class="btn_new load_more">Показать ещё</div>
        </div>
        <?$APPLICATION->IncludeFile("/include/uslugi_main.php", Array(), Array(
            "MODE"      => "php",
            "NAME"      => "Редактирование включаемой области раздела",
            "TEMPLATE"  => "section_include_template.php"
        ));?>
        <?$APPLICATION->IncludeFile("/include/google_maps.php", Array(), Array(
            "MODE"      => "php",
            "NAME"      => "Редактирование включаемой области раздела",
            "TEMPLATE"  => "section_include_template.php"
        ));?>
    </div>
    <style>
        .service-hide .service-category.list .service-category-item:nth-child(n+13){display:none;}
    </style>
    <script>
        $(document).ready(function () {
            $('body').on('click', 'div.load_more', function() {
                $('.service-hide').removeClass('service-hide');
                $('.main-btn').hide();
            })
        })
    </script>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>