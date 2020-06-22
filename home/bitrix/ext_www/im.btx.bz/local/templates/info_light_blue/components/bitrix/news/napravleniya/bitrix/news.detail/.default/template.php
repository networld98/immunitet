<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
<style> h1{margin:0} .content-inner #main{margin-top:-20px} </style>
<?
$page = $APPLICATION->GetCurPage();
$file = CFile::ResizeImageGet($arResult['~DETAIL_PICTURE'], array('width'=>236, 'height'=>253), BX_RESIZE_IMAGE_PROPORTIONAL, true);
$first_doct = array_shift($arResult['PROPERTIES']['DOCTORS']['VALUE']);
$first_exp = array_shift($arResult['PROPERTIES']['EXPERIENCE']['VALUE']);
$ipropValues = new \Bitrix\Iblock\InheritedProperty\ElementValues($arParams["IBLOCK_ID"], $arResult["ID"]);
$arSEO = $ipropValues->getValues();
$APPLICATION->SetTitle($arSEO['ELEMENT_META_TITLE']);
?>
<style>
    .relative{
        position: relative;
    }
    .flex-right{
        width: 40%;
    }
    .old-content{
        width: 60%;
    }
    .text_under_block-dop {
        padding: 30px 6px 0 15px;
    }
    @media(max-width:991px){
        .flex-right, .old-content{
            width: 100%
        }
        .table-doctors.relative{
            flex-direction: column-reverse;
        }
        .service-desc-body img {
            max-width: 100%;
        }
        .page-service .content {
            padding-right: 19px;
        }
    }
</style>
<h1><?=$arResult['NAME']?></h1>
<div class="table-doctors relative">

    <div class="old-content">

        <div class="content-inner">
            <? echo htmlspecialchars_decode($arResult['PROPERTIES']['RECORD']['VALUE']['TEXT']);?>
            <div class="service-desc">
                <div class="service-desc-title h1">Описание</div>
                <div class="service-desc-body">
                    <?=$arResult['DETAIL_TEXT']?>
                    <?if($arResult['PROPERTIES']['PRICE']['VALUE']['TEXT'] != NULL){?>
                        <div class="my_button" wfd-id="<?=$arResult['ID']?>">Узнать цены...</div>

                        <div class="my_cont" wfd-id="<?=$arResult['ID']?>" style="display: none;">
                            <table class="table2 price-list-uslugi-page" style="width: 100%;">
                                <tbody>
                                    <tr>
                                        <th>
                                            <div class="zagalovok2" wfd-id="<?=$arResult['ID']+1?>"><a name="<?=$arResult['CODE']?>"></a>
                                                <img alt="<?=$arResult['NAME']?>" src="<?=$arResult['PREVIEW_PICTURE']['SRC']?>" style="border-width: 0;"><?=$arResult['NAME']?></div>
                                            </th>
                                            <th>&nbsp;</th>
                                        </tr>
                                        <? echo htmlspecialchars_decode($arResult['PROPERTIES']['PRICE']['VALUE']['TEXT']);?>
                                    </tbody>
                                </table>
                            </div>
                            <?}?>
                        </div>
                    </div>
                </div>

        <div class="news-detail">
                    <div class="news-detail-back"><a href="<?=$arResult["SECTION_URL"]?>"><?=GetMessage("T_NEWS_DETAIL_BACK")?></a></div>
                    <?
                    if(array_key_exists("USE_SHARE", $arParams) && $arParams["USE_SHARE"] == "Y")
                    {
                        ?>
                        <div class="news-detail-share">
                            <noindex>
                                <?
                                $APPLICATION->IncludeComponent("bitrix:main.share", "", array(
                                    "HANDLERS" => $arParams["SHARE_HANDLERS"],
                                    "PAGE_URL" => $arResult["~DETAIL_PAGE_URL"],
                                    "PAGE_TITLE" => $arResult["~NAME"],
                                    "SHORTEN_URL_LOGIN" => $arParams["SHARE_SHORTEN_URL_LOGIN"],
                                    "SHORTEN_URL_KEY" => $arParams["SHARE_SHORTEN_URL_KEY"],
                                    "HIDE" => $arParams["SHARE_HIDE"],
                                ),
                                $component,
                                array("HIDE_ICONS" => "Y")
                            );
                            ?>
                        </noindex>
                    </div>
                    <?
                }
                ?>
                <?foreach($arResult["DISPLAY_PROPERTIES"] as $pid=>$arProperty):?>
                <?if($pid == "THEME" && count($arResult["ITEMS_THEME"]) > 0 ):?>
                <div class="news-detail-theme">
                    <div class="news-theme-title"><?=GetMessage("T_NEWS_DETAIL_THEME")?>:&nbsp;
                        <?if(is_array($arProperty["DISPLAY_VALUE"])):?>
                        <?=implode(",&nbsp;", $arProperty["DISPLAY_VALUE"]);?>
                        <?else:?>
                        <?=$arProperty["DISPLAY_VALUE"];?>
                        <?endif?>
                    </div>
                    <?foreach($arResult["ITEMS_THEME"] as $pid=>$arProperty):?>
                    <div class="news-theme-item"><div class="news-theme-date"><?=$arProperty["ACTIVE_FROM"]?></div><div class="news-theme-url"><a href="<?=$arProperty["DETAIL_PAGE_URL"]?>"><?=$arProperty["NAME"]?></a></div></div>
                    <?endforeach;?>
                    <div class="br"></div>
                </div>
                <?endif?>
                <?endforeach;?>


            </div>

    </div>
    <div class="flex-right" >

        <div class="service-name">
            <img src="<?=$file['src']?>" alt="<?=$arResult['NAME']?>">
            <span class="doctorData">
                  <span class="doctorData-name" style="margin-top:41px"><?=$first_doct?></span>
            </span>
        </div>
        <div class="text_under_block">
            <div class="text_under_block_right">
                <div class="text_under_block_right_tit"></div>
                <div class="text_under_block_right_body"></div>
            </div>
        </div>
        <div class="service-anonce">
            <p><?=$first_exp?></p>
            <?=$arResult['PREVIEW_TEXT']?>
        </div>
        <div class="service-phone">
            <a href="tel:<?=trim($arResult['PROPERTIES']['PHONE']['VALUE'])?>" style="text-decoration: none;"><span style="color: #ff8e00;"><?=substr(trim($arResult['PROPERTIES']['PHONE']['VALUE']), 0, 7)?></span><?=substr(trim($arResult['PROPERTIES']['PHONE']['VALUE']), 7)?></a>
        </div>
        <div class="b-doctors-list">
            <div class="b-doctor">
                <? foreach ($arResult['PROPERTIES']['DOCTORS']['VALUE'] as $key => $item) {?>
                    <div class="b-doctor__fio"><?=$item?></div>
                    <div calss="b-doctor__skill"><?=$arResult['PROPERTIES']['EXPERIENCE']['VALUE'][$key]?></div>
                <?}?>
            </div>
        </div>
        <div class="text_under_block-dop">
            <? echo htmlspecialchars_decode($arResult['PROPERTIES']['DOP_INFO']['VALUE']['TEXT']);?>
        </div>
        <span class="button-wrap button service-button"><div class="button-bg-helper"></div><div class="button-wrap-inner"><span class="button-text">Отправить заявку</span><a href="/request?d[4]=Акушер-гинеколог" class="button-target">Отправить заявку</a></div></span>

    </div>
</div>
<script>
    if(document.querySelector('h1').innerText == "Эндокринология") {
        if($(window).width() > 991) {
            $(".old-content").css("display", "flex");
            $(".old-content").css("width", "100%");
            $(".table-doctors .content-inner").css("width", "60%");
        } else {
            $(".old-content").css("display", "flex");
            $(".old-content").css("flex-direction", "column-reverse");
            $(".old-content").css("width", "100%");
            $(".table-doctors .content-inner").css("width", "100%");
        }
    }
    $(window).resize(function() {
    var windowsize = $(window).width();
    if (windowsize < 991) {
        $(".old-content").css("flex-direction", "column-reverse");
        $(".table-doctors .content-inner").css("width", "100%");
    }
    else {
        $(".old-content").css("flex-direction", "");
        $(".table-doctors .content-inner").css("width", "60%");
    }
    });
</script>