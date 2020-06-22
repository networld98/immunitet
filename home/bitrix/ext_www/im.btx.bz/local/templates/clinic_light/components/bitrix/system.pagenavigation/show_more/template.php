<?
if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
$this->createFrame()->begin("Загрузка навигации");
?>
<?if($arResult["NavPageCount"] > 1):?>
    <?if ($arResult["NavPageNomer"]+1 <= $arResult["nEndPage"]):?>
        <?
        $plus = $arResult["NavPageNomer"]+1;
        $url = $arResult["sUrlPathParams"] . "PAGEN_".$arResult["NavNum"]."=".$plus;
        ?>
        <div class="button">
            <div></div>
            <div class="load_more" data-url="<?=$url?>">Показать ещё</div>
        </div>
    <?endif?>
<?endif?>
<script>
    $('body').on('click', 'div.load_more', function() {
        var targetContainer = $('.list'),          //  Контейнер, в котором хранятся элементы
            url =  $('.load_more').attr('data-url');    //  URL, из которого будем брать элементы
        if (url !== undefined) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data){
                    //  Удаляем старую навигацию
                    $('.load_more').remove();
                    var elements = $(data).find('.item'),  //  Ищем элементы
                        pagination = $(data).find('.load_more');//  Ищем навигацию
                    targetContainer.append(elements);   //  Добавляем посты в конец контейнера
                    targetContainer.append(pagination); //  добавляем навигацию следом
                }
            })
        }
    });
</script>
