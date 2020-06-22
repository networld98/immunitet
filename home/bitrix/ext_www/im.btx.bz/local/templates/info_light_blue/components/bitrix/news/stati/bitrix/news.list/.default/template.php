<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<h1>Статьи</h1>
<div class="g-article-list">
<?if($arParams["DISPLAY_TOP_PAGER"]):?>
	<?=$arResult["NAV_STRING"]?><br />
<?endif;?>
<?$showHr = false;?>
<?$showHr = false; $q = RandString(5);?>
<?foreach($arResult["ITEMS"] as $arItem):?>
    <?$file = CFile::ResizeImageGet($arItem['PREVIEW_PICTURE']['ID'], array('width'=>90, 'height'=>59), BX_RESIZE_IMAGE_PROPORTIONAL, true);?>
	<?
	$this->AddEditAction($arItem['ID']."_".$q, $arItem['EDIT_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_EDIT"));
	$this->AddDeleteAction($arItem['ID']."_".$q, $arItem['DELETE_LINK'], CIBlock::GetArrayByID($arItem["IBLOCK_ID"], "ELEMENT_DELETE"));
	?>
	<?$classPict = '';?>
	<?if(!$arItem["PROPERTIES"]["PARTMAIN"]["VALUE"] && $showHr): $showHr = false;?><div class="hr"></div><?endif;?>
	<?if($arItem["PROPERTIES"]["PARTMAIN"]["VALUE"]): $showHr = true;?><div class="g-article-list"><?endif;?>
	<article class="g-article g-article--simple-view" id="<?=$this->GetEditAreaId($arItem['ID']."_".$q);?>">

        <?if($arParams["DISPLAY_DATE"]!="N" && $arItem["DISPLAY_ACTIVE_FROM"]):?>
        <time class="g-article__date"><?echo $arItem["DISPLAY_ACTIVE_FROM"]?>  <?if(count($arItem["FIELDS"]) > 0 || count($arItem["DISPLAY_PROPERTIES"]) > 0 ):?>/<?endif;?></time>
        <?endif?>
        <?if($arParams["DISPLAY_NAME"]!="N" && $arItem["NAME"]):?>
            <?if(!$arParams["HIDE_LINK_WHEN_NO_DETAIL"] || ($arItem["DETAIL_TEXT"] && $arResult["USER_HAVE_ACCESS"])):?>
                <a class="g-article__name" href="<?echo $arItem["DETAIL_PAGE_URL"]?>"><?echo $arItem["NAME"]?></a>
            <?else:?>
                <?echo $arItem["NAME"]?>
            <?endif;?>
        <?endif;?>
        <div class="g-article__body g-clear-self">
		<?if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arItem["PREVIEW_IMG_SMALL"])):?>
			<?$classPict = 'news-text-pict';?>
			<div class="g-article__image"><?if(!$arParams["HIDE_LINK_WHEN_NO_DETAIL"] || ($arItem["DETAIL_TEXT"] && $arResult["USER_HAVE_ACCESS"])):?>
				<a href="<?=$arItem["DETAIL_PAGE_URL"]?>"><img class="preview_picture" border="0" src="<?=$file["src"]?>" width="<?=$file["width"]?>" height="<?=$file["height"]?>" alt="<?=$arItem["NAME"]?>" title="<?=$arItem["NAME"]?>" /></a>
			<?else:?>
				<img class="preview_picture" border="0" src="<<?=$file["src"]?>" width="<?=$file["width"]?>" height="<?=$file["height"]?>" alt="<?=$arItem["NAME"]?>" title="<?=$arItem["NAME"]?>" />
			<?endif;?>
			</div>
		<?endif?>
		<?if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arItem["PREVIEW_IMG_MEDIUM"])):?>
			<?$classPict = 'news-text-pict';?>
			<div class="news-picture"><?if(!$arParams["HIDE_LINK_WHEN_NO_DETAIL"] || ($arItem["DETAIL_TEXT"] && $arResult["USER_HAVE_ACCESS"])):?>
				<a href="<?=$arItem["DETAIL_PAGE_URL"]?>"><img class="preview_picture" border="0" src="<?=$file["src"]?>" width="<?=$file["height"]?>" height="<?=$arItem["PREVIEW_IMG_MEDIUM"]["HEIGHT"]?>" alt="<?=$arItem["NAME"]?>" title="<?=$arItem["NAME"]?>" /></a>
			<?else:?>
				<img class="preview_picture" border="0" src="<?=$file["src"]?>" width="<?=$file["width"]?>" height="<?=$file["height"]?>" alt="<?=$arItem["NAME"]?>" title="<?=$arItem["NAME"]?>" />
			<?endif;?>
			</div>
		<?endif?>
		<?foreach($arItem["FIELDS"] as $code=>$value):?>
			<?if($code == 'SHOW_COUNTER' && empty($value)) $value = 0; ?>
			<span class="news-show-property"><?if($code == 'SHOW_COUNTER'):?><?=GetMessage("IBLOCK_REVIEWS")?><?else:?><?=GetMessage("IBLOCK_FIELD_".$code)?><?endif;?>:&nbsp;<?=$value;?></span>
		<?endforeach;?>
		
		<?foreach($arItem["DISPLAY_PROPERTIES"] as $pid=>$arProperty):?>
		
			<span class="news-show-property"><?if($pid == 'FORUM_MESSAGE_CNT'):?><?=GetMessage("IBLOCK_COMMENT")?><?else:?><?=$arProperty["NAME"]?><?endif;?>:&nbsp;
			<?if(is_array($arProperty["DISPLAY_VALUE"])):?>
				<?=implode("&nbsp;/&nbsp;", $arProperty["DISPLAY_VALUE"]);?>
			<?else:?>
				<?=$arProperty["DISPLAY_VALUE"];?>
			<?endif?>
			</span>
		<?endforeach;?>
		<?if($arParams["DISPLAY_PREVIEW_TEXT"]!="N" && $arItem["PREVIEW_TEXT"]):?>
			<p class="g-article__text"><?echo $arItem["PREVIEW_TEXT"];?></p>
		<?endif;?>
		
		
		<?if($arParams["DISPLAY_PICTURE"]!="N" && is_array($arItem["PREVIEW_PICTURE"])):?>
			<div style="clear:both"></div>
		<?endif?>
        </div>
	</article>
	<?if($arItem["PROPERTIES"]["PARTMAIN"]["VALUE"]):?></div><?endif;?>
<?endforeach;?>
<?if($arParams["DISPLAY_BOTTOM_PAGER"]):?>
	<?=$arResult["NAV_STRING"]?>
<?endif;?>
</div>
