<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Пациентам");
$APPLICATION->SetPageProperty("description","В данном разделе собрана наиболее полезная информация и сервисы для пациентов медицинского центра \"Иммунитет\"");
?>
    <h1>Пациентам</h1>
    <ul class="g-submenu">
    <li class="g-submenu__item"><a href="/for-clients">Книга обращений</a></li>
    <li class="g-submenu__item"><a href="/video">Видео</a></li>
</ul>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>