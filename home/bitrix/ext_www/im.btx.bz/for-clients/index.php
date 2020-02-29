<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Для обращений и предложений");
?>
    <div class="content-inner">

        <div class="g-page g-page-anketa">
            <form data-s3-anketa-id="89137041" method="post" id="form_g-anketa">


                <div class="g-form-field  g-form-field--title-pos-1">

                    <div class="g-form-body"></div>
                </div>


                <div class="g-form-field  g-form-field--title-pos-1 g-form-field--required">

                    <div class="g-form-field__title ">
                        <label for="d[2]">
                            Фамилия
                            <span class="g-form-field__required-mark">*</span>
                        </label>

                    </div>
                    <div class="g-form-field__value">
                        <input required="" class="g-form-control-text g-form-control-value g-form-control--required"
                               type="text" size="30" maxlength="100" value="" name="d[2]" id="d[2]">
                    </div>
                </div>


                <div class="g-form-field  g-form-field--title-pos-1 g-form-field--required">

                    <div class="g-form-field__title ">
                        <label for="d[3]">
                            Имя
                            <span class="g-form-field__required-mark">*</span>
                        </label>

                    </div>
                    <div class="g-form-field__value">
                        <input required="" class="g-form-control-text g-form-control-value g-form-control--required"
                               type="text" size="30" maxlength="100" value="" name="d[3]" id="d[3]">
                    </div>
                </div>


                <div class="g-form-field  g-form-field--title-pos-1">

                    <div class="g-form-field__title ">
                        <label for="d[4]">
                            Отчество
                        </label>

                    </div>
                    <div class="g-form-field__value">
                        <input class="g-form-control-text g-form-control-value" type="text" size="30" maxlength="100"
                               value="" name="d[4]" id="d[4]">
                    </div>
                </div>


                <div class="g-form-field  g-form-field--title-pos-1 g-form-field--required">

                    <div class="g-form-field__title ">
                        <label for="d[5]">
                            Телефон
                            <span class="g-form-field__required-mark">*</span>
                        </label>

                    </div>
                    <div class="g-form-field__value">
                        <input required="" class="g-form-control-text g-form-control-value g-form-control--required"
                               type="text" size="30" maxlength="100" value="" name="d[5]" id="d[5]"
                               data-validator="phone">
                    </div>
                </div>


                <div class="g-form-field  g-form-field--title-pos-1 g-form-field--required">

                    <div class="g-form-field__title ">
                        <label for="d[6]">
                            E-mail
                            <span class="g-form-field__required-mark">*</span>
                        </label>

                    </div>
                    <div class="g-form-field__value">
                        <input required="" class="g-form-control-text g-form-control-value g-form-control--required"
                               type="email" size="30" maxlength="100" value="" name="d[6]" id="d[6]">
                    </div>
                </div>


                <div class="g-form-field  g-form-field--title-pos-1 g-form-field--required">

                    <div class="g-form-field__title ">
                        <label for="d[7]">
                            Ваше обращение
                            <span class="g-form-field__required-mark">*</span>
                        </label>

                    </div>
                    <div class="g-form-field__value">
                        <textarea required=""
                                  class="g-form-control-textarea g-form-control-value g-form-control--required"
                                  cols="50" rows="7" name="d[7]" id="d[7]"></textarea>
                    </div>
                </div>

                <div class="g-form-row g-form-row--submit">
                    <input type="submit" class="g-button" value="Отправить">
                </div>
            </form>
        </div>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>