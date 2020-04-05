<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Личный кабинет");
?>
<div class="row">
    <div class="col-sm-12 text-center">
        <h1>Личный кабинет</h1>
    </div>
    <div class="<?if (!$USER->IsAuthorized()){?>col-sm-12<?}else{?>col-sm-3<?}?> text-center">
        <?if ($USER->IsAuthorized()){?>
            <div class="btn-group-vertical">
                <button type="button" class="btn btn-default">Иванов Иван Иванович</button>
                <button type="button" class="btn btn-default">Иванов Рита Ивановна</button>
                <button type="button" class="btn btn-default">Иванов Андрец Иванович</button>
            </div>
        <?}?>
        <?$APPLICATION->IncludeComponent("bitrix:system.auth.form","clinic",Array(
                "REGISTER_URL" => "register.php",
                "FORGOT_PASSWORD_URL" => "",
                "PROFILE_URL" => "profile.php",
                "SHOW_ERRORS" => "Y"
            )
        );?>
    </div>
    <?if ($USER->IsAuthorized()){?>
    <div class="col-sm-9 personal-content">
        <ul class="nav nav-pills">
            <li class="active"><a data-toggle="tab" href="#home">Home</a></li>
            <li><a data-toggle="tab" href="#menu1">Menu 1</a></li>
            <li><a data-toggle="tab" href="#menu2">Menu 2</a></li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active container" id="home">1</div>
            <div class="tab-pane container" id="menu1">2</div>
            <div class="tab-pane container" id="menu2">3</div>
        </div>
    </div>
    <?}?>
</div>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>