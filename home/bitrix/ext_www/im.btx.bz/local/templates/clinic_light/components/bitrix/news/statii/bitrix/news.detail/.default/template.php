<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);
?>
<section class="info-section padded">
    <div class="padded-inner">
        <a href="/news/" class="back href gray">К списку статей</a>
        <h1 class="header"><?=$arResult["NAME"]?></h1>
        <div class="contents">
            <div class="text">
                <?=$arResult["PREVIEW_TEXT"];?>
                <? $img = CFile::ResizeImageGet($arResult["PREVIEW_PICTURE"]["ID"], array('width'=>750), BX_RESIZE_IMAGE_PROPORTIONAL, true); ?>
                <img src="<?=$img['src']?>"/>
                <?echo $arResult["DETAIL_TEXT"];?>
            </div>
            <div class="cross">
                <div>
                    <h2 class="caption">Похожие статьи</h2>
                    <div class="list">
                        <?
                        $arFilter = Array("IBLOCK_ID"=>$arResult["IBLOCK_ID"],"ACTIVE"=>"Y");
                        $arSelect = Array('PREVIEW_PICTURE','PREVIEW_TEXT','NAME','DETAIL_PAGE_URL');
                        $res = CIBlockElement::GetList(Array("RAND"=>"RAND"), $arFilter,false,  array('nTopCount' => 2), $arSelect);
                        while($ob = $res->GetNextElement()){
                            $arFields = $ob->GetFields();
                            $img = CFile::ResizeImageGet($arFields['PREVIEW_PICTURE'], array('height'=>105), BX_RESIZE_IMAGE_PROPORTIONAL, true);?>
                            <a href="<?=$arFields['DETAIL_PAGE_URL']?>" class="article arrow-wrapper href-wrapper">
                                <div class="image" style="background-image: url(<?= $img['src']?>);"></div>
                                <div class="title"><?=$arFields['NAME']?></div>
                                <div class="review"><?=$arFields['PREVIEW_TEXT']?></div>
                                <div class="more">
                                    <div class="label href grd-active">
                                        <div>Узнать больше</div>
                                    </div>
                                    <div class="arrow">
                                        <div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        <?}?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>