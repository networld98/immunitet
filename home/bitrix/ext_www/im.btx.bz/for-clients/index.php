<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Для обращений и предложений");
$APPLICATION->SetPageProperty("description", "Для обращений и предложений");
?>
    <h1>Для обращений и предложений</h1>
    <div class="content-inner">
        <div class="g-page g-page-anketa">
            <?$APPLICATION->IncludeComponent("bitrix:form.result.new","vacansy",Array(
                    "SEF_MODE" => "Y",
                    "WEB_FORM_ID" => 4,
                    "SUCCESS_URL" => "",
                    "CHAIN_ITEM_TEXT" => "",
                    "CHAIN_ITEM_LINK" => "",
                    "IGNORE_CUSTOM_TEMPLATE" => "Y",
                    "USE_EXTENDED_ERRORS" => "Y",
                    "CACHE_TYPE" => "A",
                    "CACHE_TIME" => "3600",
                    "SEF_FOLDER" => "/",
                    "VARIABLE_ALIASES" => Array(
                    )
                )
            );?>
        </div>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>