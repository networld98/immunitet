<div class="slider-wrap slider_wrap_newww">
    <div class="slider-wrap-centred">
        <ul class="slider" id="carousel">
        <?php
        CModule::IncludeModule('iblock');
        $arFilter = Array("IBLOCK_ID"=>"9","ACTIVE"=>"Y");
        $arSelect = Array("ID","DETAIL_PICTURE","PROPERTY_DOCTORS", "PROPERTY_DIRECTION","DETAIL_PAGE_URL");
        $res = CIBlockElement::GetList(Array("SORT"=>"ASC"), $arFilter,false, false, $arSelect);
        $ids = [];
        while($ob = $res->GetNextElement()){
            $arFields = $ob->GetFields();
            if(!in_array($arFields['ID'],$ids)){
                $file = CFile::ResizeImageGet($arFields['DETAIL_PICTURE'], array('width'=>236,'height'=>253), BX_RESIZE_IMAGE_PROPORTIONAL, true);
                $ids[] = $arFields['ID'];?>
                <li data-postid="<?=$arFields['ID']?>">
                    <a href="<?=$arFields['DETAIL_PAGE_URL']?>">
                        <img src="<?=$file['src']?>" alt="<?=$arFields['PROPERTY_DIRECTION_VALUE']?>">
                        <span class="doctorData">
                      <span class="doctorData-name"><?=$arFields['PROPERTY_DOCTORS_VALUE']?></span>
                      <span class="doctorData-spec"><?=$arFields['PROPERTY_DIRECTION_VALUE']?></span>
                    </span>
                    </a>
                </li>
          <?}}?>
        </ul>
        <div class="slider-arrow left"></div>
        <div class="slider-arrow right"></div>
    </div>
</div>
