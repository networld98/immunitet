<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
IncludeTemplateLangFile(__FILE__);
?>
                </div>
            </div>
        </main>
    </div>
<div class="request">
    <div class="request-inner">
        <div class="request-title-ico" style="float: left;"><br></div>
        <div class="formsteps fs-btn fs-modal-btn"> Запишитесь на прием </div>
        <div class="pulse-line middle"></div>
    </div>
</div>
<footer id="footer" role="contentinfo">
    <div class="footer-centred  small-screen-padding">

        <div class="footer-item left">
            <div class="site-name">
                <?$APPLICATION->IncludeFile("/include/copyright.php", Array(), Array(
                    "MODE"      => "php",
                    "NAME"      => "Редактирование включаемой области раздела",
                    "TEMPLATE"  => "section_include_template.php"
                ));?>
            </div>
        </div>

        <div class="footer-item right">
            <?$APPLICATION->IncludeFile("/include/footer_menu.php", Array(), Array(
                "MODE"      => "php",
                "NAME"      => "Редактирование включаемой области раздела",
                "TEMPLATE"  => "section_include_template.php"
            ));?>
            <div class="footer-info">
                <?$APPLICATION->IncludeFile("/include/footer_info.php", Array(), Array(
                    "MODE"      => "php",
                    "NAME"      => "Редактирование включаемой области раздела",
                    "TEMPLATE"  => "section_include_template.php"
                ));?>
            </div>
        </div>
    </div>
</footer>
<div class="fs-popup__overlay" style="display: none;"></div>
<div class="fs-popup" style="display: none;">
    <div class="fs-popup__inner">
        <div class="fs-wrapper">
            <div class="fs-close"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><path d="M7.53 6.47a.75.75 0 0 0-1.06 1.06l12 12a.75.75 0 0 0 1.06-1.06zm2.627 8.312L6.47 18.47a.75.75 0 1 0 1.06 1.06l3.688-3.687a.75.75 0 0 0-1.06-1.06zm5.108-3.297a.747.747 0 0 0 .53-.22L19.53 7.53a.75.75 0 0 0-1.06-1.06l-3.736 3.735a.75.75 0 0 0 .53 1.28z"></path></svg></div>
            <?$APPLICATION->IncludeComponent("bitrix:form.result.new","doctor",Array(
                    "SEF_MODE" => "Y",
                    "WEB_FORM_ID" => 1,
                    "AJAX_MODE" => "Y",
                    "SUCCESS_URL" => "",
                    "CHAIN_ITEM_TEXT" => "",
                    "CHAIN_ITEM_LINK" => "",
                    "IGNORE_CUSTOM_TEMPLATE" => "Y",
                    "USE_EXTENDED_ERRORS" => "Y",
                    "CACHE_TYPE" => "A",
                    "CACHE_TIME" => "3600",
                    "SEF_FOLDER" => "/",
                    "VARIABLE_ALIASES" => Array(
                    )
                )
            );?>
            <div class="fs-message" style="display: none;"><div class="fs-message__svg"><img class="fs-message__ico" alt="logo" src="<?=SITE_TEMPLATE_PATH?>/images/svg2-logo.svg"></div><div class="fs-thanks">Администратор медицинского центра перезвонит Вам для уточнения даты, времени заявки и вашей контактной информации в течение часа.</div></div>
        </div>
    </div>
</div>
<!-- #footer -->
<!--A.R.-->
<div class="toTop" id="toTop"><div class="button-more">Наверх</div></div>
<script>
	$('#btn-mobile-toggle').toggle(
function() {
            $(this).addClass('expand').next().slideDown();
        },
        function() {
            $(this).removeClass('expand').next().slideUp();
        },

    );
</script>
<script type="text/javascript" src="//callkeeper.ru/modules/widget/db/?callkeeper_code=4fb4114e222e6fab520c433f86710854" charset="UTF-8"></script>
<script type="text/javascript" src="//callkeeper.ru/modules/widget/callkeeper.js" charset="UTF-8"></script>
<!-- Yandex.Metrika counter -->
<script type="text/javascript" >
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(53178457, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true,
        webvisor:true
    });
</script>
<noscript><div><img src="https://mc.yandex.ru/watch/53178457" style="position:absolute; left:-9999px;" alt="andex" /></div></noscript>
<!-- /Yandex.Metrika counter -->
<!--LiveInternet counter--><script type="text/javascript"><!--
    document.write("<a href='//www.liveinternet.ru/click' "+
        "target=_blank><img src='//counter.yadro.ru/hit?t44.1;r"+
        escape(document.referrer)+((typeof(screen)=="undefined")?"":
            ";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
            screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+
        ";"+Math.random()+
        "' alt='LiveInternet' title='LiveInternet' "+
        "border='0' width='31' height='31'><\/a>")
    //--></script><!--/LiveInternet-->
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-120223726-1"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'UA-120223726-1');
</script><!--cms statistics-->
</body>
</html>