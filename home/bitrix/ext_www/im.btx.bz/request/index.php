<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Заявка");
?>
    <form method="post" action="/request">
        <div class="form-field"><label>
                <span class="form-field-title">Ваше имя <span style="color:red">*</span> :</span><br>
                <input type="text" size="30" maxlength="100" value="" name="d[0]" id="d[0]" class="">
            </label></div>
        <br><br>
        <div class="form-field"><label>
                <span class="form-field-title">Телефон <span style="color:red">*</span> :</span><br>
                <input type="text" size="30" maxlength="100" value="" name="d[1]" id="d[1]" class="">
            </label></div>
        <br><br>
        <div class="form-field"><label>
                <span class="form-field-title">E-mail  :</span><br>
                <input type="text" size="30" maxlength="100" value="" name="d[2]" id="d[2]" class=" email_check">
            </label></div>
        <br><br>
        <div class="form-field"><label>
                <span class="form-field-title">Услуга <span style="color:red">*</span> :</span><br>
                <select name="d[4]" id="d[4]">
                    <option></option>
                    <option value="Хирург">Хирург</option>
                    <option value="Урология">Урология</option>
                    <option value="Проктология">Проктология</option>
                    <option value="Гинекология">Гинекология</option>
                    <option value="Пластическая хирургия">Пластическая хирургия</option>
                    <option value="Отоларингология">Отоларингология</option>
                    <option value="Флебология">Флебология</option>
                    <option value="Офтальмология">Офтальмология</option>
                    <option value="Травмология">Травмология</option>
                    <option value="Эндокринология">Эндокринология</option>
                    <option value="Терапия">Терапия</option>
                    <option value="Кардиология">Кардиология</option>
                    <option value="Педиатрия">Педиатрия</option>
                    <option value="Неонатология">Неонатология</option>
                    <option value="Дерматовенерология">Дерматовенерология</option>
                    <option value="Психиатрия">Психиатрия</option>
                    <option value="Неврология">Неврология</option>
                    <option value="Детский врач">Детский врач</option>
                    <option value="Больничные листы">Больничные листы</option>
                    <option value="Гастроскопия">Гастроскопия</option>
                </select>
            </label></div>
        <br><br>
        <div class="form-field"><label>
                <span class="form-field-title">Дополнительный комментарий  :</span><br>
                <textarea cols="50" rows="7" name="d[5]" id="d[5]"></textarea>
            </label></div>
        <br><br>
        <br clear="all"><br>
        <input type="submit" value="Отправить" class="button">
    </form>
    <script src="/shared/misc/calendar.gen.js" type="text/javascript" language="javascript" charset="utf-8"></script>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>