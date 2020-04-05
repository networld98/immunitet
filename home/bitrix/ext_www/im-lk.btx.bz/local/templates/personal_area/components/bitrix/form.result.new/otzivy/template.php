<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
?>
<?=$arResult["FORM_NOTE"]?>

<?if ($arResult["isFormNote"] != "Y")
{
?>
<?=$arResult["FORM_HEADER"]?>
	<?
	foreach ($arResult["QUESTIONS"] as $FIELD_SID => $arQuestion)
	{
		if ($arQuestion['STRUCTURE'][0]['FIELD_TYPE'] == 'hidden')
		{
			echo $arQuestion["HTML_CODE"];
		}
		elseif(($arQuestion['STRUCTURE'][0]['FIELD_TYPE'] != 'radio'))
		{
	    ?>
            <div class="form-field">
                <label>
                    <?=$arQuestion["CAPTION"]?><?if ($arQuestion["REQUIRED"] == "Y"):?><?=$arResult["REQUIRED_SIGN"];?><?endif;?><br>
                    <?=$arQuestion["HTML_CODE"]?>
                </label>
            </div>
	   <?
		}
	} //endwhile
	?>
<?
if($arResult["isUseCaptcha"] == "Y")
{
?>
<div class="form-field">
    <label>
	<b><?=GetMessage("FORM_CAPTCHA_TABLE_TITLE")?></b><br>
    <input type="hidden" name="captcha_sid" value="<?=htmlspecialcharsbx($arResult["CAPTCHACode"]);?>" /><br>
    <img src="/bitrix/tools/captcha.php?captcha_sid=<?=htmlspecialcharsbx($arResult["CAPTCHACode"]);?>" width="180" height="40" /><br>
    <?=GetMessage("FORM_CAPTCHA_FIELD_TITLE")?><?=$arResult["REQUIRED_SIGN"];?><br>
    <input type="text" name="captcha_word" size="30" maxlength="50" value="" class="inputtext" /><br>
    </label>
</div>
<?
} // isUseCaptcha
?>
    <div class="form-field">
        <input <?=(intval($arResult["F_RIGHT"]) < 10 ? "disabled=\"disabled\"" : "");?> class="fs-submit fs-btn2" type="submit" name="web_form_submit" value="<?=htmlspecialcharsbx(strlen(trim($arResult["arForm"]["BUTTON"])) <= 0 ? GetMessage("FORM_ADD") : $arResult["arForm"]["BUTTON"]);?>" />
    </div>
    <div class="form-field">
        <?if ($arResult["isFormErrors"] == "Y"):?><?=$arResult["FORM_ERRORS_TEXT"];?><?endif;?>
    </div>
    <div class="g-notice g-notice--indents">
        Внимание! Отправленное сообщение появится только после проверки администратором сайта!
    </div>
<?=$arResult["FORM_FOOTER"]?>
<?
} //endif (isFormNote)
?>
<script>
    $(document).ready(function(){
        $('[name=web_form_submit]').click(function(){
            var  $name = $('[name=form_text_1]').val();
            var  $tel = $('[name=form_text_2]').val();
            var  $doctor = $('[name=form_dropdown_SIMPLE_QUESTION_415]').val();
            if ($name !== null && $name !== "" && $tel !== null && $tel !== "" && $doctor !== null && $doctor !== ""){
                $('.fs-wrapper form').hide();
                $('.fs-message').show();
            }
        });
    });
</script>