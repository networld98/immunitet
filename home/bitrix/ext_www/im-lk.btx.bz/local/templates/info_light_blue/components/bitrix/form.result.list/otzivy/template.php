<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

//echo "<pre>arParams: "; print_r($arParams); echo "</pre>";
//echo "<pre>arResult: "; print_r($arResult); echo "</pre>";

//echo "<pre>"; print_r($arResult["arrFORM_FILTER"]); echo "</pre>";
?>
<script>
function Form_Filter_Click_<?=$arResult["filter_id"]?>()
{
	var sName = "<?=$arResult["tf_name"]?>";
	var filter_id = "form_filter_<?=$arResult["filter_id"]?>";
	var form_handle = document.getElementById(filter_id);

	if (form_handle)
	{
		if (form_handle.className != "form-filter-none")
		{
			form_handle.className = "form-filter-none";
			document.cookie = sName+"="+"none"+"; expires=Fri, 31 Dec 2030 23:59:59 GMT;";
		}
		else
		{
			form_handle.className = "form-filter-inline";
			document.cookie = sName+"="+"inline"+"; expires=Fri, 31 Dec 2030 23:59:59 GMT;";
		}
	}
}
</script>
<?
if (strlen($arResult["FORM_ERROR"]) > 0) ShowError($arResult["FORM_ERROR"]);
if (strlen($arResult["FORM_NOTE"]) > 0) ShowNote($arResult["FORM_NOTE"]);
?>

<form name="rform_<?=$arResult["filter_id"]?>" method="post" action="<?=POST_FORM_ACTION_URI?>#nav_start">
	<?=bitrix_sessid_post()?>
    <div class="g-comment-list g-board__comment-list">
        <?foreach ($arResult["arrResults"] as $arRes) {
            if($arResult["arrAnswers"][$arRes["ID"]][28][67]['ANSWER_TEXT'] == "Y"){?>
            <div class="g-comment">
                <div class="g-comment__panel">
                    <div class="g-comment__author "><?=$arResult["arrAnswers"][$arRes["ID"]][19][58]['USER_TEXT']?></div>
                    <time class="g-comment__date"><?=$arRes['TSX_0']?> <?=$arRes['TSX_1']?>
                    </time>
                </div>
                <div class="g-comment__text">
                    <?=$arResult["arrAnswers"][$arRes["ID"]][18][57]['USER_TEXT']?>
                </div>
            </div>
        <?}}?>
    </div>
</form>