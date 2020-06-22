<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
$this->setFrameMode(true);
?>
<div class="service-buttons">
    <div class="service-buttons-item day-hospital">
        <a href="/informaciya/article_post/day-hospital" class="h1">Дневной стационар</a>
    </div>
    <div class="service-buttons-item labaratory_icon">
        <a href="/informaciya/article_post/laboratoriya" class="h1">Медицинские анализы</a>
    </div>
</div>
<h1>Направления клиники</h1>
<?if($arParams["DISPLAY_TOP_PAGER"]):?>
	<?=$arResult["NAV_STRING"]?><br />
<?endif;?>
<?if(count($arResult["ITEMS"]) > 0):?>
    <div class="service-category list">
<?foreach($arResult["ITEMS"] as $arItem):?>
	<?
	$this->AddEditAction($arItem['ID'], $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
	$this->AddDeleteAction($arItem['ID'], $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"));
	?>
        <a id="<?=$this->GetEditAreaId($arItem['ID']);?>" href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="service-category-item"><span class="service-category-item-image"><img class="service-category-item-icon" src="<?=$arItem["PREVIEW_IMG_SMALL"]["SRC"]?>" alt="<?=$arItem["NAME"]?>"></span><span class="service-category-item-text text-shadow"><?=$arItem["NAME"]?></span><span class="vertical-middle-helper"></span></a>
<?endforeach;?>
</div>
<?endif;?>
<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
	<?=$arResult["NAV_STRING"]?>
<?endif;?>
