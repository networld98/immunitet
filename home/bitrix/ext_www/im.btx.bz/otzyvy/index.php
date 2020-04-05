<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Отзывы");
$APPLICATION->SetPageProperty("description", "Отзывы");
?>
    <h1>Отзывы</h1>
<div class="g-page g-page-board">
    <div class="g-board">
        <div class="g-board__text">
            <p>На этой странице вы можете задать свой вопрос или оставить свой отзыв о нашей клинике.</p>
        </div>
        <a href="#g-board__form" class="g-button">Оставить отзыв</a>

        <?$APPLICATION->IncludeComponent(
	"bitrix:form.result.list", 
	"otzivy", 
	array(
		"SEF_MODE" => "Y",
		"WEB_FORM_ID" => "3",
		"VIEW_URL" => "result_view.php",
		"EDIT_URL" => "result_edit.php",
		"NEW_URL" => "result_new.php",
		"SHOW_ADDITIONAL" => "N",
		"SHOW_ANSWER_VALUE" => "N",
		"SHOW_STATUS" => "Y",
		"NOT_SHOW_FILTER" => array(
			0 => "",
			1 => "",
		),
		"NOT_SHOW_TABLE" => array(
			0 => "",
			1 => "",
		),
		"CHAIN_ITEM_TEXT" => "",
		"CHAIN_ITEM_LINK" => "",
		"SEF_FOLDER" => "/",
		"COMPONENT_TEMPLATE" => "otzivy"
	),
	false
);?>
        <a name="g-board__form"></a>
        <div class="g-header g-header--h2">Оставить отзыв</div>
        <?$APPLICATION->IncludeComponent(
            "bitrix:form.result.new",
            "otzivy",
            array(
                "SEF_MODE" => "Y",
                "WEB_FORM_ID" => "3",
                "SUCCESS_URL" => "",
                "CHAIN_ITEM_TEXT" => "",
                "CHAIN_ITEM_LINK" => "",
                "IGNORE_CUSTOM_TEMPLATE" => "Y",
                "USE_EXTENDED_ERRORS" => "Y",
                "CACHE_TYPE" => "A",
                "CACHE_TIME" => "3600",
                "SEF_FOLDER" => "/",
                "COMPONENT_TEMPLATE" => "otzivy",
                "LIST_URL" => "index.php",
                "EDIT_URL" => "result_edit.php"
            ),
            false
        );?>
    </div>
</div>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>