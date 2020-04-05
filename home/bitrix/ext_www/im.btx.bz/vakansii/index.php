<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Вакансии");
$APPLICATION->SetPageProperty("description", "Вакансии");
?>
    <h1>Вакансии</h1>
    <p><strong><img alt="вакансия" height="299" src="/thumb/jHo31Vy-VOvBw_4qYcIzQg/580r450/490268/вакансия.jpg" style="border-width: 0px; display: block; margin-left: auto; margin-right: auto;" width="450"></strong></p>
    <p>&nbsp;</p>
    <p>В связи с расширением спектра услуг и объема медицинской помощи в медицинский центр &laquo;Иммунитет&raquo; требуются следующие врачебные специальности:</p>
    <p>гастроэнтеролог, терапевт, детский хирург, эндокринолог, отоларинголог, травматолог, онколог, педиатр, гинеколог, косметолог. &nbsp; &nbsp; &nbsp;&nbsp;</p>
    <p><a name="_GoBack"></a>По условиям труда и другим вопросам обращаться по телефонам:&nbsp;</p>
    <p><a dir="ltr" href="tel:8-903-273-41-31">8-903-273-41-31</a></p>
    <p>&nbsp;</p>
    <p>
    <h2>Связаться с нами</h2>
<?$APPLICATION->IncludeComponent("bitrix:form.result.new","vacansy",Array(
        "SEF_MODE" => "Y",
        "WEB_FORM_ID" => 2,
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
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>