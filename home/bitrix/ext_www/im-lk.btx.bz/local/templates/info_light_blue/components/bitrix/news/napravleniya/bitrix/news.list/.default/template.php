<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<h1>Направления клиники</h1>
<div class="service-buttons">
    <div class="service-buttons-item day-hospital">
        <a href="/informaciya/article_post/day-hospital" class="h1">Дневной стационар</a>
    </div>
    <div class="service-buttons-item labaratory_icon">
        <a href="/informaciya/article_post/laboratoriya" class="h1">Лаборатория</a>
    </div>
</div>
<div class="service-category-text"> <div style="font-size: 18px; font-family: 'Lobster', Arial, Helvetica, sans-serif; text-align: right;"><span style="font-weight: normal;"></span>&nbsp;
        <a href="tel:+74954800101"><span style="color: #ff8e00;">+7(495) </span>480-01-01</a></div> </div>
<div class="service-category">
<?if($arParams["DISPLAY_TOP_PAGER"]):?>
	<?=$arResult["NAV_STRING"]?><br />
<?endif;?>
<?$showHr = false;?>
<?$showHr = false; $q = RandString(5);?>
<?foreach($arResult["ITEMS"] as $arItem):?>
	<?
	$this->AddEditAction($arItem['ID']."_".$q, $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
	$this->AddDeleteAction($arItem['ID']."_".$q, $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"));
	?>
	<?$classPict = '';?>
    <a href="<?=$arItem["DETAIL_PAGE_URL"]?>" class="service-category-item bolnichniy-list"><span class="service-category-item-image"><img class="service-category-item-icon" src="<?=$arItem["PREVIEW_IMG_SMALL"]["SRC"]?>" alt="<?=$arItem["NAME"]?>"></span><span class="service-category-item-text text-shadow"><?=$arItem["NAME"]?></span><span class="vertical-middle-helper"></span></a>
    <?if($arItem["PROPERTIES"]["PARTMAIN"]["VALUE"]):?></div><?endif;?>
<?endforeach;?>
<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
	<?=$arResult["NAV_STRING"]?>
<?endif;?>
</div>
