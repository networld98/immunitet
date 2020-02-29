<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Стоимость услуг медицинского центра");
CModule::IncludeModule('iblock');
?>
<div class="content-wrapper">
    <main id="main" role="main">
        <div class="content-inner">
            <p><img alt="медицинский центр цены на услуги" class="seo_img2" height="123" src="/d/490268/d/медицинский_центр_цены_на_услуги.png" width="122"> Существует устойчивое мнение, что платная медицина – только для самых обеспеченных пациентов. «Иммунитет» - медицинский центр, цены на услуги которого держатся на уровне, приемлемом для всех слоев населения, готов опровергнуть это заблуждение.</p>
            <div class="zagalovok1" wfd-id="21">Почему у нас выгодно лечиться<br>
                Чем услуги нашего медцентра отличаются от других</div>
            <p>Мы работаем для всех - взрослых и детей, оказывая услуги по диагностике и лечению заболеваний. Нисколько не умаляя достоинств бесплатной медицины, мы утверждаем, что наш медицинский центр стоимость услуг формирует таким образом, что они доступны всем.</p>
        </div>
        <table class="table2">
            <tbody>
        <?
        $arFilter = Array("IBLOCK_ID"=>"9","ACTIVE"=>"Y");
        $arSelect = Array("ID","NAME","CODE","PREVIEW_PICTURE","PROPERTY_PRICE");
        $res = CIBlockElement::GetList(Array("SORT"=>"ASC"), $arFilter,false, false, $arSelect);
        while($ob = $res->GetNextElement()){
            $arFields = $ob->GetFields();
            $file = CFile::ResizeImageGet($arFields['PREVIEW_PICTURE'], array('height'=>48), BX_RESIZE_IMAGE_PROPORTIONAL, true);
            ?>
            <tr>
                <th style="width: 617px;">
                    <div class="zagalovok2" wfd-id="<?=$arFields['ID']?>"><a id="<?=$arFields['CODE']?>"></a><br>
                        <img alt="16" height="64" src="<?=$file['src']?>" style="border-width: 0;" width="49"><?=$arFields['NAME']?></div>
                </th>
                <th style="width: 65px;text-align: right;">&nbsp;</th>
                <? echo htmlspecialchars_decode($arFields['PROPERTY_PRICE_VALUE']['TEXT']);?>
            </tr>
        <?}?>
            </tbody>
        </table>
        <hr style="height: 1px">
        <p><img alt="медицинский центр стоимость услуг" class="seo_img3" height="158" src="/d/490268/d/медицинский_центр_стоимость_услуг.jpg" width="237"> Комфортность обслуживания в нашем центре гораздо выше, чем в обычной районной поликлинике. Не нужно отстаивать очередь с раннего утра, чтобы записаться к тому или другому специалисту. Достаточно отправить заявку на нашем сайте.</p>

        <h2 class="seo_h2">Стоимость услуг медицинского центра «Иммунитет»</h2>

        <p>Обращайтесь в медицинский центр «Иммунитет»! У нас – высококвалифицированные врачи, современное оборудование, прекрасная организация лечебного процесса, и при этом демократические цены.</p>
    </main>
</div>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>