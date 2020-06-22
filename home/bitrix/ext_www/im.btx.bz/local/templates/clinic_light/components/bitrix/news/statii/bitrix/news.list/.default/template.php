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
<section class="news-section padded">
    <div class="padded-inner">
        <h1 class="header">Статьи</h1>
        <div class="list">
        <?foreach($arResult["ITEMS"] as $arItem):?>
            <a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="item">
                <div class="arrow-wrapper href-wrapper">
                <? $img = CFile::ResizeImageGet($arItem["PREVIEW_PICTURE"]["ID"], array('height'=>380), BX_RESIZE_IMAGE_PROPORTIONAL, true); ?>
                    <div class="image" style="background-image: url(<?=$img['src']?>);"></div>
                    <div class="title"><?=$arItem["NAME"]?></div>
                    <div class="text">
                        <?=$arItem["PREVIEW_TEXT"];?>
                    </div>
                    <div class="stretch"></div>
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
                </div>
            </a>
        <?endforeach;?>
        </div>
        <div class="show-more">
            <?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
                <?=$arResult["NAV_STRING"]?>
            <?endif;?>
        </div>
    </div>
</section>
