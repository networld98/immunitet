!function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = "function" == typeof require && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {exports: {}};
            t[o][0].call(f.exports, function (e) {
                var n = t[o][1][e];
                return s(n || e)
            }, f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }

    for (var i = "function" == typeof require && require, o = 0; o < r.length; o++) s(r[o]);
    return s
}({
    1: [function (require, module, exports) {
        "use strict";

        function _defineProperty(obj, key, value) {
            return key in obj ? Object.defineProperty(obj, key, {
                value: value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : obj[key] = value, obj
        }

        var $;
        ($ = jQuery).fn.formsteps = function (options) {
            var settings = $.extend({
                    uri: "",
                    tpl: "",
                    mode: "inline",
                    parentPopup: "body",
                    tariff: {},
                    prefix: "fs-",
                    agreement: "",
                    upload: function (data) {
                        newSWFU(data.position, data.required, data.count, data.url, data.field, data.maxsize, data.filetypes1, data.filetypes2, data.name)
                    },
                    maskInput: function (data) {
                        delete $.mask.definitions[9], $.mask.definitions["*"] = "[0-9]", data.input.mask(data.mask)
                    },
                    calendar: function (data) {
                        data.input.datetimepicker({format: "Y.m.d", timepicker: !1})
                    },
                    calendarInterval: function (data) {
                        var from = data.from, before = data.before;
                        from.datetimepicker({
                            format: "Y.m.d", onShow: function (ct) {
                                this.setOptions({maxDate: !!before.val() && before.val()})
                            }, timepicker: !1
                        }), before.datetimepicker({
                            format: "Y.m.d", onShow: function (ct) {
                                this.setOptions({minDate: !!from.val() && from.val()})
                            }, timepicker: !1
                        })
                    },
                    callback: {
                        stepBefore: function (data) {
                        }, stepAfter: function (data) {
                        }, submitBefore: function (data) {
                        }, submitSuccess: function (data) {
                        }, submitDone: function (data) {
                        }, submitFail: function (data) {
                        }, hideBefore: function (data) {
                        }, showBefore: function (data) {
                        }, hideAfter: function (data) {
                        }, showAfter: function (data) {
                        }
                    }
                }, options), key_words = [{error: "Ошибка", words: ["слова"], wholePhrases: ["слова"]}],
                list_site = [{error: "Ошибка", words: ["слова"]}];
            return this.each(function () {
                var $this = $(this), amountSteps = 0, activeStep = 0, ui = {}, isSubmited = !1, jsonForm = {},
                    localJsonForm = {}, tariff = {}, price = null, bonusStep = [], countStep = 0, discount = "",
                    lastTitle = "";

                function createLastStep() {
                    var lastStep = ui.steps[activeStep], hint = ui.hint.clone(), tempHint = [],
                        lastStepHeader = lastStep.find("." + settings.prefix + "header");
                    if (ui.form.children("." + settings.prefix + "hint").css("display", "none"), ui.progressWrapper.css("display", "none"), ui.controls.css("display", "none"), ui.form.addClass("_form-padding-top"), ui.stepsWrapper.addClass("_final-step"), lastStep.addClass("_last-step"), "" != lastTitle && lastStepHeader.text(lastTitle), "" != discount) {
                        var blockDiscount = ui.discount.text(discount);
                        hint.append(blockDiscount)
                    }
                    if ($.each(jsonForm.step[activeStep].fields, function (index, id) {
                        var jsonField = jsonForm.dictionaries[id].json;
                        if (null != jsonField && null != jsonField.hint_image) {
                            var bonus = getBonus(jsonField.hint_image);
                            tempHint.push(bonus.desktopWrapper, bonus.tabletWrapper, bonus.mobileWrapper)
                        }
                    }), 0 < tempHint.length ? hint.append(tempHint) : 0 < bonusStep.length && localJsonForm.isBonusAllSteps && hint.append(bonusStep), 0 < hint.children().length && lastStepHeader.after(hint), 0 < price) {
                        var textPrice = $("<span>").text(price + " " + localJsonForm.currency);
                        ui.price.text(localJsonForm.from + " ").append(textPrice), lastStepHeader.after(ui.price)
                    }
                    lastStep.find("." + settings.prefix + "inner-wrapper").append(ui.textConfidentiality, ui.captcha), lastStep.append(ui.submitWrapper, ui.final), ui.overlay.fadeIn(10, function () {
                        var $ctx, count, duration, callback, del;
                        ui.main.addClass("_start-animate"), $ctx = ui.overlayPercent.find("span"), count = 100, duration = 3100, callback = function () {
                            setTimeout(function () {
                                ui.overlay.fadeOut(), ui.main.removeClass("_start-animate")
                            }, 500)
                        }, del = 500, $ctx.prop("Counter", 0).delay(del).animate({Counter: count || 100}, {
                            duration: duration || 4e3,
                            easing: "swing",
                            step: function (now) {
                                $(this).text(Math.ceil(now))
                            },
                            complete: function () {
                                callback()
                            }
                        })
                    })
                }

                function clickPopupWrapper(event) {
                    $(this).hasClass(event.target.className) && closePopup()
                }

                function clickDocument(event) {
                    var classElement = event.target.className.toString() || "span",
                        classTooltip = settings.prefix + "tooltip__text", classSelect = settings.prefix + "selectbox";
                    classElement != classTooltip && closeTooltip(), classElement.indexOf(classSelect) < 0 && classElement.indexOf("_multiselect-item") < 0 && $("." + settings.prefix + "selectbox._opened").selectFormToggle()
                }

                function clickCheckboxOrRadio(event) {
                    var $this = $(this), $this_parents = $this.parents(".js-data-field"),
                        this_id = $this_parents.data("idField");
                    if ($this.is('[type="radio"]')) $this_parents.find("input[type=radio]").each(function (index, element) {
                        var dependence = $(this).data("dependence"), checked = $(this).prop("checked"),
                            data_field_r = jsonForm.dictionaries[this_id];
                        dependence && setDependence(dependence, this_id, index, checked), checked && null != data_field_r.json && null != data_field_r.json.tariff && getPriceTariff(this_id, index)
                    }); else {
                        var this_index = $this.data("index"), dependence = $this.data("dependence"),
                            checked = $this.prop("checked");
                        dependence && setDependence(dependence, this_id, this_index, checked)
                    }
                    $this.prop("disabled") || $this.parents("." + settings.prefix + "checkbox, ." + settings.prefix + "radio").removeClass("_error")
                }

                function clickSelectItem(event) {
                    var $this = $(this), $select = $this.parents(".js-data-field"), this_id = $select.data("idField"),
                        isMultiselect = $select.hasClass("_multiselect"),
                        $list = $this.closest("." + settings.prefix + "selectbox__list"),
                        $input = $select.find("input"),
                        $text_wrapper = $select.find("." + settings.prefix + "selectbox__text");
                    if (isMultiselect) {
                        var this_index = $this.data("index"), dependence = $this.data("dependence"),
                            checked = !$this.hasClass("_active"),
                            $amount = $select.find("." + settings.prefix + "selectbox__amount");
                        dependence && setDependence(dependence, this_id, this_index, checked), $this.toggleClass("_active"), $amount.text($list.find("._active").length), $input.val($list.selectFormValue())
                    } else {
                        var $active_select = $this.text(), text = $this.text();
                        $select.find("." + settings.prefix + "selectbox__item").each(function (index, element) {
                            var dependence = $(this).data("dependence"), checked = $(this).text() == $active_select,
                                data_fields_s = jsonForm.dictionaries[this_id];
                            dependence && setDependence(dependence, this_id, index, checked), checked && null != data_fields_s.json && null != data_fields_s.json.tariff && getPriceTariff(this_id, index)
                        }), $text_wrapper.text(text), $input.val(text), $list.slideUp(function () {
                            $select.removeClass("_opened")
                        }), $this.closest("." + settings.prefix + "selectbox__wrapper").blur()
                    }
                    $input.trigger("blur")
                }

                function clickSelected(event) {
                    event.preventDefault(), event.stopPropagation();
                    var $select = $(this).closest("." + settings.prefix + "selectbox"),
                        $otherSelects = $("." + settings.prefix + "selectbox._opened").not($select);
                    $otherSelects.length && $otherSelects.find("." + settings.prefix + "selectbox__list").slideUp(function () {
                        $otherSelects.removeClass("_opened")
                    }), $select.selectFormToggle()
                }

                function addDublicator(event) {
                    var $this = $(this), field_id = $this.parents(".js-dublicate").data("idField"),
                        limit = (jsonForm.dictionaries[field_id].dublicate_params.remove_text, jsonForm.dictionaries[field_id].dublicate_params.limit),
                        limit_this = $this.data("limit") || 0;
                    if (limit <= limit_this) return !1;
                    $this.data("limit", ++limit_this), limit == limit_this && $this.css("display", "none");
                    var $btnRemove = ui.dublicatorRemove.clone(), $cols = $this.parents("." + settings.prefix + "cols"),
                        remove_id = field_id + "_" + String(limit_this), jsonParent = jsonForm.dictionaries[field_id],
                        group_id = jsonParent.structure_params.group_id,
                        attr_row = "[data-dublicate=" + remove_id + "]", isField = !1;
                    if (jsonForm.dictionaries[remove_id] = {
                        dictionary_id: jsonParent.dictionary_id,
                        dublicate_params: jsonParent.dublicate_params,
                        step_name: jsonParent.step_name,
                        type_code: jsonParent.type_code,
                        number: limit_this,
                        structure_params: {
                            col: jsonParent.structure_params.col,
                            dictionary_id: remove_id,
                            group_id: group_id,
                            index: jsonParent.structure_params.index,
                            row: jsonParent.structure_params.row,
                            sub_row: limit_this,
                            type_code: jsonParent.structure_params.type_code,
                            type_id: jsonParent.structure_params.type_id
                        }
                    }, $.each(jsonForm.groups[group_id], function (index, id) {
                        var sourse_field = jsonForm.dictionaries[id];
                        if ("UPLOAD" != sourse_field.type_code) {
                            var field_id_new = String(id) + "_dublicate_" + String(limit_this),
                                structure_params = sourse_field.structure_params;
                            isField = !0, jsonForm.dictionaries[field_id_new] = {}, jsonForm.dictionaries[field_id_new].type_code = sourse_field.type_code, jsonForm.dictionaries[field_id_new].structure_params = {
                                col: structure_params.col,
                                group_id: structure_params.group_id,
                                index: structure_params.index,
                                row: structure_params.row,
                                sub_row: limit_this
                            };
                            var callback, $data_fields = ui.form.find("[data-id-field=" + id + "]"),
                                $col = $data_fields.parents("." + settings.prefix + "cols"), $row = ui.rows.clone(),
                                $fields = ui.fields.clone(), $copy_field = $data_fields.clone(),
                                $temp_row = $col.find(attr_row);
                            if (0 < $temp_row.length ? $row = $temp_row : $row.attr("data-dublicate", remove_id), $copy_field.attr({
                                "data-id-field": field_id_new,
                                "data-id-parent": id
                            }).data("idField", field_id_new).data("required", 0).removeClass("_required _error"), $copy_field.find("input, textarea").each(function (index, el) {
                                var $this = $(this),
                                    attrName = "field_" + String(id) + "_dublicate_" + String(limit_this);
                                ($this.is('input[type="radio"]') || $this.is('input[type="checkbox"]')) && (attrName += "[]"), $this.attr("name", attrName).val("")
                            }), $fields.append($copy_field), $row.append($fields), $col.append($row), "CALENDAR" == jsonForm.dictionaries[field_id_new].type_code && (callback = settings.calendar) && "function" == typeof callback) {
                                var param = {
                                    input: $copy_field.find("input"),
                                    form: ui.form,
                                    formWrapper: ui.main,
                                    jsonField: jsonForm.dictionaries[field_id_new]
                                };
                                try {
                                    callback(param)
                                } catch (err) {
                                    console.warn('Ошибка в функции callback "calendar".', err)
                                }
                            }
                            if ("CALENDAR_INTERVAL" == jsonForm.dictionaries[field_id_new].type_code && (callback = settings.calendarInterval) && "function" == typeof callback) {
                                param = {
                                    from: $copy_field.find(".js-from"),
                                    before: $copy_field.find(".js-before"),
                                    form: ui.form,
                                    formWrapper: ui.main,
                                    jsonField: jsonForm.dictionaries[field_id_new]
                                };
                                try {
                                    callback(param)
                                } catch (err) {
                                    console.warn('Ошибка в функции callback "calendarInterval".', err)
                                }
                            }
                        }
                    }), isField) {
                        var $temp_rows = $cols.find(attr_row), $rows = ui.rows.clone(), $fields = ui.fields.clone(),
                            $dataFields = ui.dublicatorRemoveData.clone();
                        0 < $temp_rows.length ? $rows = $temp_rows : $rows.attr("data-dublicate", remove_id), $rows.addClass("_dublicate-rows"), $fields.addClass("_dublicate-fields"), jsonForm.dictionaries[remove_id].dublicate_params.dublicator_padding_remove && $btnRemove.addClass(settings.prefix + "padding-top-none"), $dataFields.append($btnRemove), $dataFields.data({
                            idField: remove_id,
                            idParent: field_id
                        }).attr({
                            "data-id-field": remove_id,
                            "data-id-parent": field_id
                        }), $fields.append($dataFields), $rows.append($fields), $cols.append($rows)
                    }
                }

                function removeDublicator(event) {
                    var $this = $(this), parent_dd = $this.parents(".js-dublicate"),
                        field_id = parent_dd.data("idField"), btn_parent_id = parent_dd.data("idParent"),
                        $btnAdd = ui.form.find("[data-id-field=" + btn_parent_id + "]").find(".dublicator-btn-add"),
                        $row = $this.parents("." + settings.prefix + "rows"), limit = $btnAdd.data("limit"),
                        remove_id = btn_parent_id + "_" + String(limit),
                        group_id = jsonForm.dictionaries[btn_parent_id].structure_params.group_id,
                        delete_number = jsonForm.dictionaries[field_id].number;
                    delete jsonForm.dictionaries[remove_id], $row.remove(), $.each(jsonForm.groups[group_id], function (index, id) {
                        var field_id_new = id + "_dublicate_" + limit,
                            feild_delete_id = id + "_dublicate_" + delete_number;
                        ui.form.find("[data-id-field=" + feild_delete_id + "]").parents("." + settings.prefix + "rows").remove(), delete jsonForm.dictionaries[field_id_new]
                    }), $btnAdd.css("display", "inline-block").data("limit", --limit), $.each(jsonForm.groups[group_id], function (indexGroup, id) {
                        ui.form.find("[data-id-parent=" + id + "]").each(function (index, el) {
                            var $this = $(this),
                                element_id = String($this.data("idParent")) + "_dublicate_" + String(index + 1);
                            $this.attr("data-id-field", element_id).data("idField", element_id), $this.find("input, textarea").each(function (indexInput, elInput) {
                                var $this_input = $(this),
                                    attrName = "field_" + String(id) + "_dublicate_" + String(index + 1);
                                ($this_input.is('input[type="radio"]') || $this_input.is('input[type="checkbox"]')) && (attrName += "[]"), $this_input.attr("name", attrName)
                            })
                        })
                    }), ui.form.find("[data-id-parent=" + btn_parent_id + "]").each(function (index, el) {
                        var remove_id = btn_parent_id + "_" + String(index + 1);
                        $(this).attr("data-id-field", remove_id).data("idField", remove_id), $(this).parents("._dublicate-rows").attr("data-dublicate", remove_id).data("dublicate", remove_id)
                    })
                }

                function keydownPopupClose(event) {
                    "27" == event.keyCode && closePopup()
                }

                function openPopup(event) {
                    event.preventDefault();
                    var beforeCallback = settings.callback.showBefore, afterCallback = settings.callback.showAfter,
                        eventBlock = $this;
                    if (0 < amountSteps) {
                        if (beforeCallback && "function" == typeof beforeCallback) try {
                            beforeCallback(getDataCallback(activeStep))
                        } catch (err) {
                            console.warn('Ошибка в функции callback "callback.showBefore".', err)
                        }
                        eventBlock.trigger("showBefore", getDataCallback(activeStep))
                    }
                    ui.popupWrap.fadeIn(10, function () {
                        if (ui.popupOverlay.css("display", "block"), top = $(document).scrollTop(), heightBlock = ui.main.height(), heightWindows = $(window).height(), 0 == heightBlock && (heightBlock = 300), result = heightWindows < heightBlock ? top + 30 : (heightWindows - heightBlock) / 2 + top, ui.popupWrapInner.css("top", result), 0 < amountSteps && afterCallback && "function" == typeof afterCallback) {
                            try {
                                afterCallback(getDataCallback(activeStep))
                            } catch (err) {
                                console.warn('Ошибка в функции callback "callback.showAfter".', err)
                            }
                            eventBlock.trigger("showAfter", getDataCallback(activeStep))
                        }
                        var result, top, heightBlock, heightWindows
                    })
                }

                function openTooltip(event) {
                    event.preventDefault(), event.stopPropagation(), $(this).parent().addClass("_active")
                }

                function closePopup() {
                    var beforeCallback = settings.callback.hideBefore, afterCallback = settings.callback.hideAfter,
                        eventBlock = $this;
                    if (0 < amountSteps) {
                        if (beforeCallback && "function" == typeof beforeCallback) try {
                            beforeCallback(getDataCallback(activeStep))
                        } catch (err) {
                            console.warn('Ошибка в функции callback "callback.hideBefore".', err)
                        }
                        eventBlock.trigger("hideBefore", getDataCallback(activeStep))
                    }
                    ui.popupWrap.fadeOut(0, function () {
                        if (ui.popupOverlay.css("display", "none"), 0 < amountSteps && afterCallback && "function" == typeof afterCallback) {
                            try {
                                afterCallback(getDataCallback(activeStep))
                            } catch (err) {
                                console.warn('Ошибка в функции callback "callback.hideAfter".', err)
                            }
                            eventBlock.trigger("hideAfter", getDataCallback(activeStep))
                        }
                    })
                }

                function closeTooltip() {
                    $("." + settings.prefix + "tooltip").removeClass("_active")
                }

                function onBlur(event) {
                    isValid($(this).parents(".js-data-field"))
                }

                function onFocus(event) {
                    $(this).parents(".js-data-field").removeClass("_error")
                }

                function prevBntForm(event) {
                    event.preventDefault();
                    var prevStep = setStep(activeStep, -1);
                    -1 != prevStep && stepTo(activeStep, prevStep)
                }

                function nextBtnForm(event) {
                    event.preventDefault();
                    var nextStep = setStep(activeStep, 1);
                    -1 != nextStep && stepTo(activeStep, nextStep)
                }

                function formSubmit(event) {
                    if (event.preventDefault(), event.stopPropagation(), isSubmited) return !1;
                    var $current = ui.steps[activeStep], formBlock = $(this), eventBlock = $this;
                    if (!1 === inputAllIsValid($current)) return !1;
                    var element, formResult, formStructure, $field, callbackBefore = settings.callback.submitBefore,
                        callbackDone = settings.callback.submitDone, callbackFail = settings.callback.submitFail,
                        callbackSuccess = settings.callback.submitSuccess;
                    if (callbackBefore && "function" == typeof callbackBefore) try {
                        callbackBefore(getDataCallback(activeStep))
                    } catch (err) {
                        console.warn('Ошибка в функции callback "callback.submitBefore".', err)
                    }
                    eventBlock.trigger("submitBefore", getDataCallback(activeStep)), formResult = {}, formStructure = {}, $field = (element = formBlock).find(".js-data-field"), $.each($field, function () {
                        var $field_input = $(this).find("textarea, input"), field_id = $(this).data("idField"),
                            field_hide = jsonForm.dictionaries[field_id].hide,
                            field_required = jsonForm.dictionaries[field_id].required;
                        $.each($field_input, function () {
                            var $this = $(this), field_value = $this.val();
                            if (field_hide && field_required) formResult[field_id] = localJsonForm.textEmptyField; else if ("" != field_value) if ($this.is('input[type="radio"]') || $this.is('input[type="checkbox"]')) 1 == $this.prop("checked") && (formResult[field_id] && "" != formResult[field_id] ? formResult[field_id] += "," + field_value : formResult[field_id] = field_value); else if ($this.hasClass(settings.prefix + "input-data-interval")) {
                                if ($this.hasClass(settings.prefix + "calendar-from")) {
                                    var inputBeforeValue = $this.parent().find("." + settings.prefix + "calendar-before").val();
                                    formResult[field_id] = "От " + field_value + " до " + inputBeforeValue
                                }
                            } else formResult[field_id] = field_value
                        })
                    }), formStructure.rows = {}, formStructure.fields = {}, formStructure.dublicators = {}, $.each(jsonForm.dictionaries, function (index, el) {
                        "DUBLICATOR" == el.type_code ? formStructure.dublicators[index] = el.structure_params : formStructure.fields[index] = el.structure_params
                    }), $.each(jsonForm.step, function (stepIndex, stepElement) {
                        formStructure.rows[stepIndex] = {cols: {}}, $.each(stepElement.cols, function (colsIndex, colsElement) {
                            formStructure.rows[stepIndex].cols[colsIndex] = {
                                width: colsElement.width,
                                sub_rows: {}
                            }, $.each(colsElement.rows, function (rowsIndex, rowsElement) {
                                formStructure.rows[stepIndex].cols[colsIndex].sub_rows[rowsIndex] = {fields: {}}
                            })
                        })
                    }), element.find("input[name='anketa_results']").val(JSON.stringify(formResult)), element.find("input[name='anketa_structure']").val(JSON.stringify(formStructure));
                    var data = $(this).serialize();
                    formBlock.find("input[name='anketa_results']").val(""), formBlock.find("input[name='anketa_structure']").val(""), $.post(jsonForm.postform_api_uri, data).done(function (res) {
                        ui.final.css("display", "block"), ui.form.addClass("_open-last-step"), ui.steps[activeStep].find("." + settings.prefix + "inner-wrapper").css("display", "none"), ui.submitWrapper.css("display", "none"), callbackSuccess && "function" == typeof callbackSuccess && callbackSubmit(res, callbackSuccess, "submitSuccess"), "" != jsonForm.redirect_url && (document.location.href = jsonForm.redirect_url)
                    }).fail(function (res) {
                        console.warn("Ошибка: Невозможно получить форму.", res.error), callbackFail && "function" == typeof callbackFail && callbackSubmit(res, callbackFail, "submitFail")
                    }).always(function (res) {
                        callbackDone && "function" == typeof callbackDone && callbackSubmit(res, callbackDone, "submitDone")
                    }), isSubmited = !0
                }

                function callbackSubmit(answer, callback, event) {
                    var param = getDataCallback(activeStep);
                    param.answer = answer;
                    try {
                        callback(param)
                    } catch (err) {
                        console.warn('Ошибка в функции callback "callback.' + event + '".', err)
                    }
                    $this.trigger(event, param)
                }

                function hintTo(step) {
                    var hint = ui.form.children("." + settings.prefix + "hint"), hintAlign = localJsonForm.hintPosition,
                        tempHint = [], textHint = "", isNewBonus = !1;
                    $.each(jsonForm.step[step].fields, function (index, id) {
                        var jsonField = jsonForm.dictionaries[id].json;
                        if (null != jsonField) {
                            if (null != jsonField.hint_image) {
                                var bonus = getBonus(jsonField.hint_image);
                                isNewBonus = !0, tempHint.push(bonus.desktopWrapper, bonus.tabletWrapper, bonus.mobileWrapper)
                            }
                            if (null != jsonField.hint) {
                                var blockTextHint = ui.hintText.clone();
                                textHint = jsonField.hint, blockTextHint.text(textHint), tempHint.push(blockTextHint)
                            }
                            null != jsonField.hint_position && (hintAlign = jsonField.hint_position)
                        }
                    }), hint.css("display", "none"), localJsonForm.isBonusAllSteps && !isNewBonus ? hint.find("." + settings.prefix + "hint-text").text(textHint) : (hint.text(""), hint.append(tempHint)), 0 < hint.children().length && ("right" == hintAlign ? ui.hintRight.css("display", "block") : ui.hintLeft.css("display", "block"))
                }

                function stepTo(prevNum, num) {
                    if (prevNum == num) return !1;
                    var isNext = prevNum < num, eventBlock = $this;
                    if (isNext) {
                        if (!1 === inputAllIsValid(ui.steps[prevNum])) return !1;
                        countStep++
                    } else countStep--;
                    var beforeCallback = settings.callback.stepBefore, afterCallback = settings.callback.stepAfter;
                    if (beforeCallback && "function" == typeof beforeCallback) try {
                        beforeCallback(getDataStep(activeStep, isNext))
                    } catch (err) {
                        console.warn('Ошибка в функции callback "callback.stepBefore".', err)
                    }
                    eventBlock.trigger("stepBefore", getDataStep(activeStep, isNext)), $.each(jsonForm.step[num].fields, function (index, el) {
                        toggleField(el)
                    }), activeStep = num, ui.stepsCurrent.text(num + 1), ui.steps[prevNum].css("display", "none"), activeStep == amountSteps - 1 && createLastStep(), activeStep < amountSteps - 1 && hintTo(activeStep), 0 == activeStep && ui.prevBtn.css("display", "none"), 0 < activeStep && ui.prevBtn.css("display", "inline-block"), ui.steps[num].show(0, function () {
                        var progressHeight = 100 * num / (amountSteps - 1);
                        if (ui.progressLine.width(progressHeight + "%"), afterCallback && "function" == typeof afterCallback) try {
                            afterCallback(getDataStep(activeStep, isNext))
                        } catch (err) {
                            console.warn('Ошибка в функции callback "callback.stepAfter".', err)
                        }
                        eventBlock.trigger("stepAfter", getDataStep(activeStep, isNext))
                    })
                }

                function toggleField(field_id) {
                    jsonForm.dictionaries[field_id].hide ? ui.form.find('[data-id-field="' + field_id + '"]').hide() : ui.form.find('[data-id-field="' + field_id + '"]').show()
                }

                function inputAllIsValid(current) {
                    var tmpValid = !0;
                    return current.find(".js-data-field").each(function () {
                        isValid($(this)) && (tmpValid = !1)
                    }), tmpValid
                }

                function isValid($element) {
                    var typeValid = $element.data("valid"), required = $element.data("required"),
                        regex = $element.data("regex"), error = $element.data("error"),
                        $input = $element.find("input, textarea"), value = $input.val(),
                        $message = $element.find("." + settings.prefix + "field__error");
                    if (1 == required || "" != value && "" != typeValid) {
                        if ($input.eq(0).is('input[type="radio"]') || $input.eq(0).is('input[type="checkbox"]')) if (0 == $element.find("input:checked").length) var tmp = {
                            valid: !1,
                            message: "Заполните поле"
                        }; else tmp = {
                            valid: !0,
                            message: "Заполните поле"
                        }; else tmp = $element.hasClass(settings.prefix + "upload") ? 0 == $element.find(".upload-progress").children().length ? {
                            valid: !1,
                            message: "Выберите файл"
                        } : {valid: !0, message: "Выберите файл"} : function validInputText(value, type, canBeEmpty) {
                            var messages = {
                                EMPTY_FIELD: "Заполните поле",
                                WRONG_EMAIL: "Некорректный E-mail",
                                WRONG_EMAIL_OR_PHONE: "Некорректный E-mail или номер",
                                WRONG_SITE: "Некорректный адрес сайта",
                                WRONG_PHONE: "Некорректный номер",
                                TOO_SHORT_PHONE: "Короткий номер",
                                WRONG_WORD: "Неподходящяя тема",
                                WRONG_ANTAGONIST: "Технически невозможно"
                            }, reg = null, response = {valid: !0, message: "", empty: !1};
                            switch (canBeEmpty = canBeEmpty || !1, value = $.trim(value), type) {
                                case"__phone__":
                                    reg = /^[\+\-\d\s\(\)]+$/i, response.message = messages.WRONG_PHONE;
                                    break;
                                case"__email__":
                                    reg = /^.+@.+\..+$/i, response.message = messages.WRONG_EMAIL;
                                    break;
                                case"__email_or_phone__":
                                    reg = /^(.+@.+\..+|[\+\-\d\s\(\)]+)$/i, response.message = messages.WRONG_EMAIL_OR_PHONE;
                                    break;
                                case"__regex__":
                                    reg = new RegExp(arguments.length <= 3 ? void 0 : arguments[3], "i"), response.message = arguments.length <= 4 ? void 0 : arguments[4];
                                    break;
                                case"site":
                                    reg = /^.+\..{2,}$/i, response.message = messages.WRONG_SITE;
                                    break;
                                case"word":
                                    response.valid = !0, $.each(key_words, function (index, el) {
                                        var words = el.words.join("|"), wholePhrases = el.wholePhrases.join("|");
                                        if ((reg = new RegExp("((^|\\s)(" + words + ")(\\s|[,.!?]|$)|^(" + wholePhrases + ")$)", "i")).test(value)) {
                                            var tooltip = getTooltip(el.error);
                                            response.valid = !1, response.message = messages.WRONG_WORD + tooltip
                                        }
                                    });
                                    break;
                                case"antagonist":
                                    response.valid = !0, $.each(list_site, function (index, el) {
                                        var words = el.words.join("|");
                                        if ((reg = new RegExp("(^|\\s)(" + words + ")(\\s|[,.!?]|$)", "i")).test(value)) {
                                            var tooltip = getTooltip(el.error);
                                            response.valid = !1, response.message = messages.WRONG_ANTAGONIST + tooltip
                                        }
                                    });
                                    break;
                                default:
                                    reg = /.+/, response.message = messages.EMPTY_FIELD
                            }
                            if (response.empty = 0 == value.length, response.empty) return canBeEmpty ? response.valid = !0 : (response.valid = !1, response.message = messages.EMPTY_FIELD), response;
                            if ("word" != type && "antagonist" != type && (response.valid = reg.test(value), response.valid && "__phone__" === type)) {
                                var tmp = value.match(/\d/g);
                                (!tmp || tmp.length < 7) && (response.valid = !1, response.message = messages.TOO_SHORT_PHONE)
                            }
                            return response.valid && "antagonist" == type && (response = validInputText(value, "site", canBeEmpty, arguments.length <= 3 ? void 0 : arguments[3], arguments.length <= 4 ? void 0 : arguments[4])), response
                        }(value, typeValid, "", regex, error);
                        if (!1 === tmp.valid) return $element.addClass("_error"), $message.html(tmp.message), !0;
                        $message.text(""), $element.removeClass("_error")
                    } else "" != $message.text() && ($message.text(""), $element.removeClass("_error"));
                    return !1
                }

                function isEmptyStep(stepIndex) {
                    var flag = !0;
                    return $.each(jsonForm.step[stepIndex].fields, function (indexField, elField) {
                        jsonForm.dictionaries[elField].hide || (flag = !1)
                    }), flag
                }

                function setDependence(dependence, this_id, this_index, checked) {
                    $.each(dependence, function (index, el) {
                        var field_id = el.field_id, type = el.type;
                        jsonForm.dictionaries[field_id].fields_checked[this_id].options[this_index] = checked, setParamHide(field_id, type), -1 != jsonForm.step[activeStep].fields.indexOf(field_id) && toggleField(field_id)
                    })
                }

                function setParamHide(field_id, type) {
                    var flag = !1;
                    for (var indexField in 1 == type && (flag = !0), jsonForm.dictionaries[field_id].fields_checked) {
                        var elField = jsonForm.dictionaries[field_id].fields_checked[indexField];
                        for (var indexOptions in elField.options) {
                            var elOptions = elField.options[indexOptions];
                            1 == type && elOptions && (flag = !1), 2 == type && elOptions && (flag = !0)
                        }
                    }
                    jsonForm.dictionaries[field_id].hide = flag
                }

                function setStep(current, size_step) {
                    for (var result = current + size_step; isEmptyStep(result);) if (amountSteps - 1 < (result += size_step) || result < 0) return -1;
                    return result
                }

                function formError(error) {
                    ui.preloader.find("svg").remove(), ui.preloader.html("Потеряно соединение с сервером. Перезагрузите страницу."), console.log(error)
                }

                function getPriceTariff(id, index) {
                    var jsonField = jsonForm.dictionaries[id], keyTariff = jsonField.json.tariff[index],
                        langTariff = localJsonForm.langTariff, arrayKeyTariff = keyTariff.split("."),
                        tempPrice = tariff;
                    $.each(arrayKeyTariff, function (ind, el) {
                        tempPrice = tempPrice[el]
                    }), price = tempPrice[langTariff], null != jsonField.json && (null != jsonField.json.discount && (discount = jsonField.json.discount[index]), null != jsonField.json.last_title && (lastTitle = jsonField.json.last_title[index]))
                }

                function getBonus(json) {
                    var desktopWrapper = ui.hintImageDesktop.clone(), desktopImg = $("<img>"),
                        tabletWrapper = ui.hintImageTablet.clone(), tabletImg = $("<img>"),
                        mobileWrapper = ui.hintImageMobile.clone(), mobileImg = $("<img>");
                    return desktopImg.attr({alt: "", src: json[0] || ""}), tabletImg.attr({
                        alt: "",
                        src: json[1] || ""
                    }), mobileImg.attr({
                        alt: "",
                        src: json[2] || ""
                    }), desktopWrapper.append(desktopImg), tabletWrapper.append(tabletImg), mobileWrapper.append(mobileImg), (bonusStep = []).push(desktopWrapper, tabletWrapper, mobileWrapper), {
                        desktopWrapper: desktopWrapper,
                        tabletWrapper: tabletWrapper,
                        mobileWrapper: mobileWrapper
                    }
                }

                function getDataStep(num, isNext) {
                    var data = getDataCallback(num);
                    return data.is_next = isNext, data
                }

                function getDataCallback(numberStep) {
                    return {
                        index: numberStep,
                        this: $this,
                        form: ui.form,
                        form_wrapper: ui.main,
                        step_this: countStep,
                        json: jsonForm,
                        next_btn: ui.nextBtn,
                        prev_btn: ui.prevBtn,
                        submit_btn: ui.submit,
                        amount_steps: amountSteps,
                        step: {
                            ui: ui.steps[numberStep],
                            title: ui.steps[numberStep].find("." + settings.prefix + "header"),
                            json: jsonForm.step[numberStep]
                        }
                    }
                }

                function getTooltip(text) {
                    return '\n                    <span class="' + settings.prefix + 'tooltip">\n                        <span class="' + settings.prefix + 'tooltip__ico">\n                            <svg width="20px" height="20px" viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M13,23.75c-5.937,0 -10.75,-4.813 -10.75,-10.75c0,-5.937 4.813,-10.75 10.75,-10.75c5.937,0 10.75,4.813 10.75,10.75c0,5.937 -4.813,10.75 -10.75,10.75Zm0,-1.5c5.109,0 9.25,-4.141 9.25,-9.25c0,-5.109 -4.141,-9.25 -9.25,-9.25c-5.109,0 -9.25,4.141 -9.25,9.25c0,5.109 4.141,9.25 9.25,9.25Zm-1.736,-13.672c-0.8,0.35 -1.243,0.945 -1.263,1.968c0.007,0.034 0.017,0.072 0.027,0.112c0.037,0.14 0.083,0.278 0.136,0.402c0.044,0.104 0.091,0.19 0.135,0.251c0.243,0.336 0.168,0.805 -0.168,1.047c-0.336,0.243 -0.805,0.168 -1.047,-0.168c-0.116,-0.16 -0.214,-0.341 -0.299,-0.54c-0.085,-0.198 -0.153,-0.403 -0.207,-0.608c-0.019,-0.071 -0.035,-0.138 -0.048,-0.199c-0.007,-0.034 -0.007,-0.034 -0.018,-0.087l-0.012,-0.136c0,-1.694 0.821,-2.83 2.165,-3.416c0.471,-0.206 0.979,-0.332 1.509,-0.398c0.348,-0.044 0.612,-0.055 0.945,-0.055c0.295,0 0.511,0.008 0.799,0.039c0.431,0.046 0.85,0.136 1.25,0.281c1.455,0.53 2.374,1.696 2.402,3.538c0.024,1.603 -0.602,2.324 -2.127,3.154c-0.1,0.055 -0.1,0.055 -0.198,0.108c-1.123,0.615 -1.489,1.047 -1.541,2.164c-0.019,0.414 -0.371,0.734 -0.784,0.714c-0.414,-0.019 -0.734,-0.37 -0.714,-0.784c0.081,-1.739 0.784,-2.569 2.318,-3.409c0.103,-0.056 0.103,-0.056 0.202,-0.11c1.088,-0.592 1.357,-0.903 1.344,-1.814c-0.018,-1.189 -0.52,-1.825 -1.415,-2.151c-0.494,-0.18 -0.957,-0.23 -1.536,-0.23c-0.276,0 -0.485,0.009 -0.759,0.043c-0.397,0.05 -0.769,0.142 -1.096,0.284Zm1.736,11.672c-0.69,0 -1.25,-0.56 -1.25,-1.25c0,-0.69 0.56,-1.25 1.25,-1.25c0.69,0 1.25,0.56 1.25,1.25c0,0.69 -0.56,1.25 -1.25,1.25Z" style="fill:#dd4434;fill-rule:nonzero;"></path></svg>\n                        </span>\n                        <span class="' + settings.prefix + 'tooltip__text">\n                            <span class="' + settings.prefix + 'tooltip__close">\n                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><path fill="#212121" d="M7.53 6.47a.75.75 0 0 0-1.06 1.06l12 12a.75.75 0 0 0 1.06-1.06zm2.627 8.312L6.47 18.47a.75.75 0 1 0 1.06 1.06l3.688-3.687a.75.75 0 0 0-1.06-1.06zm5.108-3.297a.747.747 0 0 0 .53-.22L19.53 7.53a.75.75 0 0 0-1.06-1.06l-3.736 3.735a.75.75 0 0 0 .53 1.28z"></path></svg>\n                            </span>\n                            ' + text + "\n                        </span>\n                    </span>\n                "
                }

                !function (formsteps) {
                    var url, formsteps_uri = formsteps.attr("data-uri") || settings.uri,
                        formsteps_tpl = formsteps.attr("data-tpl") || settings.tpl;
                    if (localJsonForm.agreement = formsteps.attr("data-agreement") || settings.agreement, tariff = formsteps.data("tariff") || settings.tariff, formsteps.removeAttr("data-tariff"), "" == formsteps_uri || "" == formsteps_tpl) return console.warn("Ошибка: Форма пустая. Проверьте, указаны ли uri и tpl");
                    url = formsteps_uri + "&param[tpl]=" + formsteps_tpl, ui.main = $("<div>").addClass(settings.prefix + "wrapper"), ui.close = $("<div>").addClass(settings.prefix + "close"), ui.popupWrap = $("<div>").addClass(settings.prefix + "popup"), ui.popupWrapInner = $("<div>").addClass(settings.prefix + "popup__inner"), ui.popupOverlay = $("<div>").addClass(settings.prefix + "popup__overlay"), ui.preloader = $("<div>").addClass(settings.prefix + "preloader"), ui.preloaderIco = '\n                    <svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" width="64px" height="64px" viewBox="0 0 128 128" xml:space="preserve" fill="#13ab41">\n                        <g transform="rotate(45 64 64)">\n                            <circle cx="16" cy="64" r="16" fill-opacity="1"/>\n                            <circle cx="16" cy="64" r="14.344" fill-opacity="1" transform="rotate(45 64 64)"/>\n                            <circle cx="16" cy="64" r="12.531" fill-opacity="1" transform="rotate(90 64 64)"/>\n                            <circle cx="16" cy="64" r="10.75" fill-opacity="1" transform="rotate(135 64 64)"/>\n                            <circle cx="16" cy="64" r="10.063" fill-opacity="1" transform="rotate(180 64 64)"/>\n                            <circle cx="16" cy="64" r="8.063" fill-opacity="1" transform="rotate(225 64 64)"/>\n                            <circle cx="16" cy="64" r="6.438" fill-opacity="1" transform="rotate(270 64 64)"/>\n                            <circle cx="16" cy="64" r="5.375" fill-opacity="1" transform="rotate(315 64 64)"/>\n                            <animateTransform attributeName="transform" type="rotate" values="0 64 64;315 64 64;270 64 64;225 64 64;180 64 64;135 64 64;90 64 64;45 64 64" calcMode="discrete" dur="960ms" repeatCount="indefinite"/>\n                        </g>\n                    </svg>\n                ', "inline" == settings.mode ? $this.append(ui.main) : (ui.close.html('\n                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><path  d="M7.53 6.47a.75.75 0 0 0-1.06 1.06l12 12a.75.75 0 0 0 1.06-1.06zm2.627 8.312L6.47 18.47a.75.75 0 1 0 1.06 1.06l3.688-3.687a.75.75 0 0 0-1.06-1.06zm5.108-3.297a.747.747 0 0 0 .53-.22L19.53 7.53a.75.75 0 0 0-1.06-1.06l-3.736 3.735a.75.75 0 0 0 .53 1.28z"/></svg>\n                    '), ui.main.append(ui.close), ui.popupWrapInner.append(ui.main), ui.popupWrap.append(ui.popupWrapInner), $(settings.parentPopup).eq(0).append(ui.popupOverlay, ui.popupWrap), $(settings.parentPopup).eq(0).css("position", "relative"), $this.on("click", openPopup), ui.popupWrap.on("click", clickPopupWrapper), ui.popupWrapInner.on("click", clickPopupWrapper), ui.close.on("click", closePopup), $(document).on("keydown", keydownPopupClose)), ui.preloader.html(ui.preloaderIco), ui.main.append(ui.preloader), $.getJSON(url).done(function (data) {
                        try {
                            var resultJson = $.trim(String(data.result.html));
                            if (jsonForm = function (source) {
                                if ("string" == typeof source) {
                                    if ("" == source) return !1;
                                    source = JSON.parse(source)
                                }
                                var jsonInput = source.form_json;
                                if (jsonForm.captcha = source.captcha, jsonForm.anketa_id = jsonInput.anketa_id, jsonForm.postform_api_uri = jsonInput.postform_api_uri, jsonForm.name = jsonInput.name, jsonForm.redirect_url = jsonInput.redirect_url, jsonForm.submit_name = jsonInput.submit_name, jsonForm.success_note = jsonInput.success_note, jsonForm.step = [], jsonForm.dictionaries = {}, jsonForm.groups = {}, $.each(jsonInput.dictionaries, function (dIndex, dElement) {
                                    if ("SUBMIT_BUTTON" != dElement.type_code) {
                                        var _jsonForm$dictionarie;
                                        "DUBLICATOR" == dElement.type_code ? (jsonForm.dictionaries[dIndex] = {
                                            type_code: dElement.type_code || "",
                                            dictionary_id: dElement.dictionary_id || "",
                                            dublicate_params: dElement.group_params.dublicate_params || ""
                                        }, jsonForm.dictionaries[dIndex].structure_params = {
                                            col: dElement.col,
                                            dictionary_id: dElement.dictionary_id,
                                            group_id: dElement.group_id,
                                            index: dElement.index,
                                            row: dElement.row,
                                            sub_row: dElement.sub_row,
                                            type_code: dElement.type_code,
                                            type_id: dElement.type_id
                                        }) : jsonForm.dictionaries[dIndex] = (_defineProperty(_jsonForm$dictionarie = {
                                            structure_params: dElement.structure_params || "",
                                            name: dElement.name || "",
                                            note: dElement.note || "",
                                            type_code: dElement.type_code || "",
                                            type_id: dElement.type_id || "",
                                            maxlength: dElement.maxlength || "",
                                            regex: dElement.regex || "",
                                            regex_error: dElement.regex_error || "",
                                            required: dElement.required || "",
                                            size: dElement.size || "",
                                            validator: dElement.validator || "",
                                            title_position: dElement.title_position || "",
                                            dictionary_id: dElement.dictionary_id || "",
                                            dictionary_position: dElement.dictionary_position || "",
                                            variants_position: dElement.variants_position || "",
                                            alias: dElement.alias || "",
                                            mask: dElement.mask || "",
                                            html: dElement.html || ""
                                        }, "regex", dElement.regex || ""), _defineProperty(_jsonForm$dictionarie, "regex_error", dElement.regex_error || ""), _defineProperty(_jsonForm$dictionarie, "placeholder", dElement.placeholder || ""), _jsonForm$dictionarie);
                                        try {
                                            jsonForm.dictionaries[dIndex].json = dElement.json
                                        } catch (err) {
                                            jsonForm.dictionaries[dIndex].json = null
                                        }
                                        "UPLOAD" == dElement.type_code && (jsonForm.dictionaries[dIndex].count = dElement.count, jsonForm.dictionaries[dIndex].filetypes = dElement.filetypes, jsonForm.dictionaries[dIndex].upload_field = dElement.upload_field, jsonForm.dictionaries[dIndex].upload_url = dElement.upload_url, jsonForm.dictionaries[dIndex].maxsize = dElement.maxsize), jsonForm.dictionaries[dIndex].step_name = dElement.group_params ? dElement.group_params.name : "", null != dElement.dependence && (jsonForm.dictionaries[dIndex].dependence_type = dElement.dependence.type), null != dElement.options && (jsonForm.dictionaries[dIndex].options = [], $.each(dElement.options, function (index, el) {
                                            jsonForm.dictionaries[dIndex].options[index] = {
                                                name: el.name,
                                                selected: el.selected
                                            }
                                        }))
                                    }
                                }), $.each(jsonInput.dictionaries, function (dIndex, dElement) {
                                    if (null != dElement.group_params) {
                                        var this_group = jsonForm.groups, group_id = dElement.group_params.group_id,
                                            this_dictionaries = jsonForm.dictionaries[dIndex];
                                        null == this_group[group_id] && (this_group[group_id] = []), "DUBLICATOR" != this_dictionaries.type_code && this_group[group_id].push(dIndex), $.each(dElement.group_params.attach_params.fields, function (fIndex, fElement) {
                                            if (null == this_dictionaries.fields_checked && (this_dictionaries.fields_checked = {}), "" != fElement.field_options) $.each(fElement.field_options, function (oIndex, oElement) {
                                                var this_options = jsonForm.dictionaries[fIndex].options[oIndex];
                                                null == this_options.dependence && (this_options.dependence = []);
                                                var dependence = {
                                                    field_id: dIndex,
                                                    type: dElement.group_params.attach_params.dependence
                                                };
                                                this_options.dependence.push(dependence), null == this_dictionaries.fields_checked[fIndex] && (this_dictionaries.fields_checked[fIndex] = {options: {}}), this_dictionaries.fields_checked[fIndex].options[oIndex] = this_options.selected
                                            }); else {
                                                null == dependence_field.dependence && (dependence_field.dependence = []);
                                                var dependence = {
                                                    field_id: dIndex,
                                                    type: dElement.group_params.attach_params.dependence
                                                };
                                                jsonForm.dictionaries[fElement.field_id].dependence.push(dependence), null == this_dictionaries.fields_checked[fIndex] && (this_dictionaries.fields_checked[fIndex] = {options: {}}), this_dictionaries.fields_checked[fIndex].options[0] = dependence_field.options[0].selected
                                            }
                                        })
                                    }
                                }), $.each(jsonForm.dictionaries, function (index, el) {
                                    null != el.dependence_type && setParamHide(index, el.dependence_type)
                                }), $.each(jsonInput.anketa_structure.rows, function (stepIndex, stepElement) {
                                    jsonForm.step[stepIndex] = {
                                        cols: [],
                                        fields: []
                                    }, $.each(stepElement.cols, function (colsIndex, colsElement) {
                                        jsonForm.step[stepIndex].cols[colsIndex] = {
                                            width: colsElement.width,
                                            rows: []
                                        }, $.each(colsElement.sub_rows, function (rowsIndex, rowsElement) {
                                            jsonForm.step[stepIndex].cols[colsIndex].rows[rowsIndex] = {fields: []}, $.each(rowsElement.fields, function (fieldsIndex, fieldsElement) {
                                                "SUBMIT_BUTTON" != fieldsElement.type_code && (jsonForm.step[stepIndex].cols[colsIndex].rows[rowsIndex].fields[fieldsIndex] = fieldsElement.dictionary_id, jsonForm.step[stepIndex].fields.push(fieldsElement.dictionary_id))
                                            })
                                        })
                                    })
                                }), localJsonForm.textPrivacyPolicy = jsonInput.json.text_privacy_policy || '\n    \t        \tОставляя заявку, Вы принимаете \n    \t        \t<a href="' + localJsonForm.agreement + '" target="_blank">политику конфиденциальности</a>\n    \t        ', localJsonForm.textEmptyField = jsonInput.json.text_empty_field || "-", localJsonForm.textAmountStep = jsonInput.json.text_amount_step || "из", localJsonForm.textPrevStep = jsonInput.json.text_prev_step || "Назад", localJsonForm.textNextStep = jsonInput.json.text_next_step || "Далее", localJsonForm.textCalculationTitle = jsonInput.json.text_calculation_title || "Идет расчет …", localJsonForm.textBeforeSubmitForm = jsonInput.json.text_after_submit_form || "Спасибо за обращение!", localJsonForm.imageBeforeSubmitForm = jsonInput.json.image_after_submit_form || "", localJsonForm.hideProgressBar = jsonInput.json.hide_progressbar || !1, localJsonForm.langTariff = jsonInput.json.lang_tariff || "ru", localJsonForm.currency = jsonInput.json.currency || "₽", localJsonForm.from = jsonInput.json.text_before_price || "", localJsonForm.isBonusAllSteps = jsonInput.json.bonus_all_steps || !1, localJsonForm.hintPosition = jsonInput.json.hint_position || "left", localJsonForm.tariff = jsonInput.json.tariff || "", "" != localJsonForm.tariff) {
                                    var arrayKeyTariff = localJsonForm.tariff.split("."),
                                        langTariff = localJsonForm.langTariff, tempPrice = tariff;
                                    $.each(arrayKeyTariff, function (ind, el) {
                                        tempPrice = tempPrice[el]
                                    }), price = tempPrice[langTariff]
                                }
                                return jsonForm
                            }(resultJson)) amountSteps = jsonForm.step.length; else if (0 == amountSteps) return console.warn("Форма пустая или json неверный!"), !1
                        } catch (err) {
                            formError(err)
                        }
                        var $progressIco, $svgBG;
                        ui.preloader.remove(), ui.progressWrapper = $("<div>").addClass(settings.prefix + "progress"), ui.progressLine = $("<div>").addClass(settings.prefix + "progress__line"), ui.progressLineWrap = $("<div>").addClass(settings.prefix + "progress__line-wrapper"), ui.overlay = $("<div>").addClass(settings.prefix + "calculation"), ui.overlayTitle = $("<div>").addClass(settings.prefix + "calculation__title"), ui.overlayPercent = $("<div>").addClass(settings.prefix + "calculation__percent"), ui.overlayProgress = $("<div>").addClass(settings.prefix + "calculation__progress"), ui.overlayBg = $("<div>").addClass(settings.prefix + "calculation__bg"), ui.stepsCounter = $("<div>").addClass(settings.prefix + "progress__number"), ui.stepsCurrent = $("<span>").addClass(settings.prefix + "progress__current"), ui.stepsTotal = $("<span>").addClass(settings.prefix + "progress__total"), ui.form = $("<form>").addClass(settings.prefix + "form"), ui.submit = $("<input>").addClass(settings.prefix + "submit " + settings.prefix + "btn2"), ui.submitWrapper = $("<div>").addClass(settings.prefix + "submit__wrapper"), ui.controls = $("<div>").addClass(settings.prefix + "controls"), ui.prevBtn = $("<span>").addClass(settings.prefix + "btn2 _secondary _icon-left " + settings.prefix + "prev"), ui.nextBtn = $("<span>").addClass(settings.prefix + "btn2  _icon-right " + settings.prefix + "next"), ui.btnSvg = '\n                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><path  d="M20.03 9.97a.75.75 0 0 0-1.06 0l-6.47 6.47-6.47-6.47a.75.75 0 0 0-1.06 1.06l7 7a.75.75 0 0 0 1.06 0l7-7a.75.75 0 0 0 0-1.06z"/></svg>\n                ', ui.captcha = $("<div>").addClass(settings.prefix + "captcha"), ui.content = $("<div>").addClass(settings.prefix + "main"), ui.price = $("<div>").addClass(settings.prefix + "price"), ui.discount = $("<div>").addClass(settings.prefix + "discount"), ui.hint = $("<div>").addClass(settings.prefix + "hint"), ui.hintText = $("<div>").addClass(settings.prefix + "hint-text"), ui.hintImageDesktop = $("<div>").addClass(settings.prefix + "hint-image-desktop"), ui.hintImageTablet = $("<div>").addClass(settings.prefix + "hint-image-tablet"), ui.hintImageMobile = $("<div>").addClass(settings.prefix + "hint-image-mobile"), ui.hintLeft = ui.hint.clone(), ui.hintRight = ui.hint.clone(), ui.final = $("<div>").addClass(settings.prefix + "message"), ui.finalText = $("<div>").addClass(settings.prefix + "thanks"), ui.finalSvgWrapper = $("<div>").addClass(settings.prefix + "message__svg"), ui.finalSvg = '\n                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 26 26">\n                        <path  d="M13 23.75C7.063 23.75 2.25 18.937 2.25 13S7.063 2.25 13 2.25 23.75 7.063 23.75 13 18.937 23.75 13 23.75zm0-1.5A9.25 9.25 0 0 0 22.25 13 9.25 9.25 0 0 0 13 3.75 9.25 9.25 0 0 0 3.75 13 9.25 9.25 0 0 0 13 22.25zm-4.025-9.225l3.019 2.937 6.413-6.384a.751.751 0 0 1 1.059 1.063l-6.937 6.905a.75.75 0 0 1-1.052.006L7.929 14.1a.75.75 0 1 1 1.046-1.075z"/>\n                    </svg>\n                ', ui.steps = [], ui.stepsWrapper = $("<div>").addClass(settings.prefix + "steps"), ui.step = $("<div>").addClass(settings.prefix + "step"), ui.stepTitle = $("<div>").addClass(settings.prefix + "header"), ui.stepBody = $("<div>").addClass(settings.prefix + "inputs"), ui.stepInnerWrap = $("<div>").addClass(settings.prefix + "inner-wrapper"), ui.cols = $("<div>").addClass(settings.prefix + "cols"), ui.rows = $("<div>").addClass(settings.prefix + "rows"), ui.fields = $("<div>").addClass(settings.prefix + "fields"), ui.textConfidentiality = '\n                    <div class="' + settings.prefix + 'text">\n                        ' + localJsonForm.textPrivacyPolicy + '\n                    </div>\n                    <input type="hidden" name="anketa_results" value=\'\'>\n                    <input type="hidden" name="anketa_structure" value=\'\'>\n                ', ui.fieldData = $("<div>").addClass(settings.prefix + "field js-data-field"), ui.fieldText = $("<span>").addClass(settings.prefix + "field__text"), ui.fieldTitle = $("<span>").addClass(settings.prefix + "field__label"), ui.fieldError = $("<span>").addClass(settings.prefix + "field__error"), ui.h2 = $("<div>").addClass(settings.prefix + "h2"), ui.imageWrapper = $("<div>").addClass(settings.prefix + "image__wrapper"), ui.image = $("<img>").addClass(settings.prefix + "image"), ui.inputText = $("<input>").addClass(settings.prefix + "input__field"), ui.inputTextWrapper = $("<span>").addClass(settings.prefix + "input__wrapper"), ui.textarea = $("<textarea>").addClass(settings.prefix + "textarea__field"), ui.textareaWrapper = $("<span>").addClass(settings.prefix + "textarea__wrapper"), ui.checkbox = $('\n                    <label class="' + settings.prefix + 'checkbox__label">\n                        <input type="checkbox">\n                        <span class="' + settings.prefix + 'checkbox__pseudo-wr">\n                            <span class="' + settings.prefix + 'checkbox__pseudo">\n                                <svg class="' + settings.prefix + 'checkbox__indeterminate" xmlns="http://www.w3.org/2000/svg" version="1.1" width="8.5" height="7.5" viewBox="0 0 8.5 7.5">\n                                    <path d="M13.5 8H8V13" fill-opacity="0" stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="50" stroke-width="2.5" transform="matrix(1,0,0,1,-6.75,-6.75)"></path>\n                                </svg>\n                                <svg class="' + settings.prefix + 'checkbox__check" xmlns="http://www.w3.org/2000/svg" version="1.1" width="16" height="14" viewBox="0 0 14.5 11.5">\n                                    <path d="M20 7L12 16L8 12" fill-opacity="0" stroke-linejoin="round" stroke-linecap="round" stroke-opacity="1" stroke-miterlimit="50" stroke-width="2.5" transform="matrix(1,0,0,1,-6.75,-5.75)"></path>\n                                </svg>\n                            </span>\n                        </span>\n                        <span class="' + settings.prefix + 'checkbox__text"></span>\n                    </label>\n                '), ui.checkboxWrapper = $("<span>").addClass(settings.prefix + "checkbox__wrapper"), ui.radio = $('\n                    <label class="' + settings.prefix + 'radio__label">\n                        <input type="radio" class="' + settings.prefix + 'hidden">\n                        <span class="' + settings.prefix + 'radio__pseudo-wr">\n                            <span class="' + settings.prefix + 'radio__pseudo"></span>\n                        </span>\n                        <span class="' + settings.prefix + 'radio__text"></span>\n                    </label>\n                '), ui.radioWrapper = $("<span>").addClass(settings.prefix + "radio__wrapper"), ui.dublicator = $('\n                    <div class="' + settings.prefix + 'dublicator">\n                        <div class="' + settings.prefix + 'btn2 dublicator-btn-add _small"></div>\n                    </div>\n                '), ui.dublicatorRemove = $('\n                    <div class="' + settings.prefix + 'dublicator">\n                        <div class="' + settings.prefix + 'btn _secondary dublicator-btn-remove _small"></div>\n                    </div>\n                '), ui.dublicatorRemoveData = $("<div>").addClass("js-dublicate"), ui.select = $('\n                    <input type="hidden" class="js-selectbox" value="">\n                    <span class="' + settings.prefix + 'selectbox__select">\n                        <span class="' + settings.prefix + 'selectbox__selected">\n                            <span class="' + settings.prefix + 'selectbox__arrows">\n                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 26 26"><path fill="#333" d="M20.03 9.97a.75.75 0 0 0-1.06 0l-6.47 6.47-6.47-6.47a.75.75 0 0 0-1.06 1.06l7 7a.75.75 0 0 0 1.06 0l7-7a.75.75 0 0 0 0-1.06z"></path></svg>\n                            </span>\n                            <span class="' + settings.prefix + 'selectbox__text"></span>\n                        </span>\n                        <span class="' + settings.prefix + 'selectbox__list" style="display: none;"></span>\n                    </span>\n                '), ui.selectOption = $("<span>").addClass(settings.prefix + "selectbox__item"), ui.selectAmount = $("<span>").addClass(settings.prefix + "selectbox__amount"), ui.selectWrapper = $("<span>").addClass(settings.prefix + "selectbox__wrapper"), ui.inputDateFrom = $("<input>").addClass(settings.prefix + "input__field " + settings.prefix + "calendar-from " + settings.prefix + "input-data-interval js-from"), ui.inputDateBefore = $("<input>").addClass(settings.prefix + "input__field " + settings.prefix + "calendar-before " + settings.prefix + "input-data-interval js-before"), ui.inputDateWrapper = $("<span>").addClass(settings.prefix + "date__wrapper"), $progressIco = '\n                    <svg xmlns="//www.w3.org/2000/svg" width="270" height="270" viewBox="0 0 70 64" class="' + settings.prefix + 'calculation__svg">\n                        <circle class="bottom" cx="35" cy="32" r="27" fill="none"></circle>\n                        <circle class="top" cx="35" cy="32" r="27" stroke-linejoin="round" stroke-linecap="round" fill="none" stroke-width="3"></circle>\n                    </svg>', $svgBG = '\n                    <svg xmlns="http://www.w3.org/2000/svg" width="737" height="107" fill-rule="evenodd" stroke-miterlimit="1.414" clip-rule="evenodd" stroke-linejoin="round"><path d="M28.395 106.5c.053-.242.099-.491.14-.748.786-4.9-.907-7.677-5.079-8.33a9.436 9.436 0 0 0-2.626-.044c-.873.108-1.86.365-2.96.771l-7.049-1.102 3.808-23.745 13.23 2.069.62-4.046L0 66.87l1.662-10.361 26.181-40.614 12.599 7.028-22.287 34.851 12.391 1.938 4.231-15.523 13.59 2.126-1.318 8.218 22.429-9.032 7.26 1.136a57.826 57.826 0 0 1-.333-6.601c.066-8.675 2.17-16.228 6.312-22.657 4.142-6.43 10.152-11.217 18.032-14.36C108.366-.02 115.903-.765 123.361.785l-2.629 15.23c-4.86-.676-9.347-.193-13.462 1.448-4.99 1.992-8.169 5.673-9.535 11.046-1.367 5.372-.8 11.985 1.7 19.838 3.148-7.491 8.311-12.669 15.49-15.533a31.94 31.94 0 0 1 1.353-.506 7.132 7.132 0 0 0 1.216-2.975c.179-1.121-.007-2.049-.559-2.785s-1.371-1.188-2.457-1.358c-.962-.151-1.839-.082-2.632.206-.792.289-1.657.834-2.595 1.636l-2.523-2.717c2.527-2.352 5.431-3.272 8.712-2.758 1.678.262 3.079.793 4.202 1.593 1.124.8 1.923 1.775 2.396 2.923.474 1.148.607 2.367.4 3.659a9.568 9.568 0 0 1-.265 1.172 25.802 25.802 0 0 1 7.291.107c4.789.754 9.172 2.877 13.147 6.37s7.201 8.265 9.677 14.317c2.44 5.966 3.347 11.915 2.719 17.847a31.843 31.843 0 0 1-1.209 5.976c2.655-.781 5.227-1.133 7.716-1.054l-.066-.038 1.856-3.72c1.241.571 2.379.903 3.413.995 1.034.093 2.086-.054 3.156-.438 1.446-.52 2.454-1.339 3.027-2.457.573-1.119.606-2.365.099-3.739-.565-1.533-1.377-2.483-2.437-2.85-1.059-.368-2.392-.263-3.998.314l-2.127.765-.727-3.824 1.445-.519c1.311-.471 2.23-1.206 2.756-2.203.527-.997.556-2.13.089-3.398-.4-1.084-1.075-1.806-2.027-2.168-.951-.361-2.029-.325-3.233.108-1.044.375-1.923.908-2.638 1.599s-1.355 1.587-1.919 2.687l-3.646-1.876c1.597-3.148 4.001-5.299 7.213-6.454 1.793-.644 3.45-.896 4.972-.754 1.522.141 2.801.609 3.836 1.404a6.689 6.689 0 0 1 2.24 3.056c.594 1.612.62 3.121.078 4.528s-1.552 2.615-3.028 3.625c1.851-.486 3.557-.381 5.117.315 1.559.697 2.7 2.022 3.42 3.978.565 1.533.682 3.062.35 4.588-.331 1.525-1.099 2.916-2.303 4.172s-2.81 2.244-4.817 2.966a14.313 14.313 0 0 1-3.139.761 23.341 23.341 0 0 1 3.885 1.957c1.83 1.141 3.577 2.549 5.239 4.225.082-.876.266-1.67.552-2.381.401-1 .977-1.776 1.726-2.326.75-.551 1.628-.826 2.635-.826.996 0 1.877.254 2.644.763l-.863 1.403a3.434 3.434 0 0 0-1.745-.479c-.767 0-1.382.34-1.843 1.021-.462.681-.723 1.619-.783 2.815.732-.876 1.637-1.314 2.716-1.314.636 0 1.214.151 1.736.453s.932.746 1.232 1.332.45 1.288.45 2.105c0 .829-.174 1.572-.522 2.229s-.836 1.172-1.466 1.545a3.927 3.927 0 0 1-1.107.444c2.024 3.149 3.888 6.806 5.591 10.971a77.767 77.767 0 0 1 1.978 5.362c1.498.414 2.98.851 4.444 1.311H95.896l.372-.116c.716-.886 1.16-1.728 1.332-2.526.195-.911.133-1.914-.185-3.01-.319-1.097-.909-1.881-1.77-2.352-.862-.472-1.929-.527-3.203-.167-1.241.352-2.135.954-2.682 1.807-.548.853-.648 1.876-.302 3.069.318 1.097.897 1.902 1.735 2.415.634.387 1.477.681 2.531.88h-36.43l5.762-35.925-19.887 8.151-1.512 9.428-15.389-2.407.462-3.017-3.332-.521-1.482 9.238a15.72 15.72 0 0 1 6.817-.401c2.46.384 4.565 1.292 6.317 2.721 1.751 1.43 3.002 3.315 3.752 5.655.584 1.821.797 3.826.641 6.014 1.069-.812 1.95-1.499 2.643-2.06 1.613-1.309 2.797-2.46 3.551-3.454.753-.993 1.224-2.075 1.412-3.244.179-1.121-.007-2.049-.559-2.785s-1.371-1.189-2.457-1.358c-.962-.151-1.839-.082-2.632.206-.792.288-1.657.834-2.595 1.636l-2.524-2.717c2.527-2.353 5.432-3.272 8.713-2.759 1.678.263 3.079.794 4.202 1.594 1.124.8 1.922 1.774 2.396 2.922.473 1.148.607 2.368.399 3.659a9.385 9.385 0 0 1-1.548 3.86c-.81 1.185-2.043 2.447-3.699 3.786a67.482 67.482 0 0 1-2.313 1.778H28.395zm167.512 0a36.843 36.843 0 0 1-1.602-2.605c-1.353-2.411-2.341-4.755-2.964-7.033l-2.488-.389 1.662-10.362 20.703-32.116a4.748 4.748 0 0 0-1.198.263c-.792.289-1.658.834-2.596 1.636l-2.523-2.717c2.506-2.333 5.383-3.256 8.63-2.771l3.165-4.909 12.599 7.028-12.92 20.204 2.476.388-1.11 3.61-3.566-.558-5.78 9.039 11.628 1.819 3.607-13.235 13.59 2.125-2.159 13.462.191.03-.381 1.152-.183 1.144 2.672.418a183.003 183.003 0 0 0 4.495-3.502c2.678-2.172 4.643-4.083 5.894-5.732 1.251-1.65 2.033-3.445 2.344-5.386.298-1.861-.011-3.402-.928-4.623-.916-1.221-2.276-1.973-4.078-2.255-1.597-.25-3.053-.135-4.369.343-1.315.478-2.751 1.383-4.308 2.715l-4.189-4.511c2.318-2.157 4.828-3.589 7.528-4.294l-9.441-14.063c11.958-8.106 25.084-11.041 39.38-8.805 7.689 1.202 14.071 3.461 19.145 6.776 5.075 3.316 8.713 7.283 10.914 11.903 1.453 3.051 2.247 6.214 2.382 9.49l11.784-2.052.065 3.558-9.3 1.619 1.087 6.086c1.122-.822 2.322-1.344 3.601-1.567 1.378-.239 2.664-.138 3.86.305 1.195.444 2.2 1.208 3.015 2.293.816 1.086 1.369 2.442 1.659 4.07.3 1.676.183 3.224-.35 4.645-.533 1.42-1.436 2.611-2.71 3.572-1.275.96-2.834 1.602-4.679 1.923-1.172.204-2.273.241-3.306.111l.092.573.754.28-.522 1.177.902 5.657-3.974 1.275-1.239 2.796h-4.804l.447-1.001-3.119 1.001h-31.921c-2.189-1.01-4.832-1.757-7.93-2.242l-.738-.115-.725 2.357h-11.83l-9.69-1.516-.243 1.516h-36.408zm130.4-18.026v2.966a4.1 4.1 0 0 1 1.834-.444c.672 0 1.271.154 1.799.462s.938.752 1.232 1.332c.247.489.391 1.053.43 1.692 5.46-1.323 11.369-1.635 17.729-.937v-3.463h-10.717v-3.257l7.345-16.429 4.084 1.517-6.445 14.542h5.771l.487-6.253h.174v-.891c2.894-2.903 4.968-5.052 6.223-6.447 1.255-1.396 2.148-2.59 2.679-3.584a6.476 6.476 0 0 0 .797-3.098c0-1.027-.299-1.831-.898-2.411-.6-.581-1.397-.871-2.391-.871-.882 0-1.657.184-2.324.553-.667.368-1.362.976-2.085 1.825l-2.646-2.077c1.922-2.456 4.387-3.684 7.394-3.684 1.537 0 2.866.28 3.985.838s1.973 1.317 2.56 2.277c.588.96.882 2.032.882 3.215a8.489 8.489 0 0 1-.831 3.668c-.554 1.172-1.475 2.472-2.764 3.901s-3.176 3.316-5.664 5.66h9.768l-.204 1.451 2.068-3.208 12.599 7.028-5.631 8.806c.289.097.567.208.833.333 1.212.567 2.124 1.332 2.736 2.294s.918 2.023.918 3.182c0 1.505-.437 2.757-1.312 3.756a6.02 6.02 0 0 1-.837.789c1.2.935 2.342 1.933 3.429 2.993H307.31l.204-2.616h4.159v1.744c3.575-3.465 7.473-6.206 11.693-8.223l-.081-.086 1.313-1.207c.173.188.354.353.542.495a41.559 41.559 0 0 1 4.09-1.478c.006-.09.009-.183.009-.279 0-1.48-.648-2.22-1.943-2.22-.276 0-.533.033-.773.098s-.504.169-.792.311h-1.636v-6.252h1.945l-2.757-15.445-4.943 4.28-2.626-2.774 7.209-6.29 4.17-.726 3.742 20.955h.274l-.13.811.493 2.758-4.65.81-.48-2.692zm66.373-31.502v5.932c1.199-.592 2.422-.888 3.669-.888 1.343 0 2.542.308 3.597.923 1.055.616 1.877 1.504 2.464 2.665.588 1.16.881 2.534.881 4.12 0 1.212-.204 2.32-.613 3.323a39.143 39.143 0 0 1 5.52-1.815c6.201-1.556 12.992-1.758 20.371-.604 3.427.536 6.625 1.277 9.594 2.221l.637-.603c.543.537 1.079.928 1.607 1.173a4.117 4.117 0 0 0 1.75.367c.864 0 1.555-.241 2.075-.723.519-.481.779-1.132.779-1.953 0-.916-.244-1.571-.731-1.966-.488-.395-1.212-.592-2.171-.592h-1.271l.36-2.155h.863c.784 0 1.411-.213 1.883-.639.471-.427.707-1.019.707-1.777 0-.647-.216-1.156-.647-1.527-.432-.371-1.007-.557-1.727-.557-.623 0-1.191.115-1.703.344-.511.229-1.023.58-1.534 1.054l-1.559-1.682c1.455-1.358 3.141-2.036 5.06-2.036 1.071 0 1.994.181 2.77.544.775.363 1.359.853 1.75 1.469.392.615.588 1.294.588 2.036 0 .963-.28 1.764-.839 2.404-.56.639-1.327 1.085-2.303 1.338 1.072.095 1.951.474 2.638 1.137.688.663 1.032 1.578 1.032 2.747 0 .915-.236 1.744-.708 2.486s-1.147 1.33-2.026 1.765c-.103.05-.207.098-.314.142 3.689 1.834 6.913 4.084 9.671 6.749 2.885 2.787 4.965 5.844 6.239 9.171 2.343-.57 4.673-1.077 6.99-1.521l7.59-11.773a13.731 13.731 0 0 1-2.564-1.602c-1.665-1.325-2.823-2.858-3.474-4.598-.652-1.74-.743-3.54-.273-5.399.99-3.921 3.906-6.255 8.748-7.001-2.988-2.711-4.038-5.824-3.15-9.339.452-1.792 1.356-3.248 2.711-4.368 1.356-1.12 2.989-1.831 4.902-2.132 1.912-.301 3.895-.199 5.948.307 2.088.514 3.903 1.319 5.444 2.417 1.54 1.097 2.649 2.43 3.326 3.996.677 1.567.785 3.263.324 5.089-.484 1.917-1.587 3.438-3.309 4.564l7.459 4.161-9.321 14.577c2.22.124 3.929 1.052 5.127 2.783.797 1.153 1.348 2.618 1.653 4.395l10.467 1.637-.249 1.55c.616.113 1.229.232 1.84.356l4.286-6.649c-.706.135-1.453.202-2.242.202-1.607 0-3.027-.29-4.262-.87-1.236-.581-2.357-1.415-3.364-2.505l2.626-2.415c1.391 1.515 3.022 2.273 4.892 2.273 1.367 0 2.44-.414 3.22-1.243.779-.829 1.169-2.013 1.169-3.552 0-2.961-1.295-4.441-3.885-4.441-.552 0-1.067.065-1.547.196a8.913 8.913 0 0 0-1.583.621h-3.273V58.777h14.029l-.54 3.375h-9.065v5.932c1.199-.592 2.423-.888 3.67-.888 1.343 0 2.542.308 3.597.924s1.876 1.504 2.464 2.664a7.85 7.85 0 0 1 .683 2.009l1.854-2.874 12.598 7.028-10.873 17.003a83.403 83.403 0 0 1 7.363 3.338 77.278 77.278 0 0 1 3.259 1.772l8.177 1.279-.594 3.703a75.892 75.892 0 0 1 3.116 2.458H421.735a211.952 211.952 0 0 1 12.144-5.713c.995-1.03 2.116-1.775 3.363-2.234-.147-2.212-.85-4.174-2.111-5.888-1.873-2.545-4.925-4.148-9.158-4.81-1.587-.249-3.076-.319-4.465-.21.293.224.563.477.811.76 1.189 1.357 1.783 3.189 1.783 5.498 0 2.636-.399 4.796-1.198 6.48-.799 1.683-2.027 3.025-3.683 4.026-1.357.82-3.073 1.517-5.15 2.091h-1.535l-.68-2.264c2.572-.674 4.525-1.544 5.86-2.612s2.129-2.526 2.382-4.373c-1.072 1.347-2.474 2.021-4.209 2.021a5.314 5.314 0 0 1-2.791-.765c-.847-.51-1.515-1.246-2.002-2.208a6.623 6.623 0 0 1-.145-.307c-.196.67-.354 1.379-.474 2.127-.51 3.177-.133 5.971 1.129 8.381H386.34c-1.193-3.948-1.432-8.147-.718-12.598.928-5.787 3.372-10.623 7.333-14.507.479-.471.975-.924 1.487-1.36l-.18.001c-1.606 0-3.027-.29-4.262-.87s-2.356-1.415-3.364-2.504l2.626-2.416c1.391 1.516 3.022 2.274 4.893 2.274 1.367 0 2.44-.415 3.219-1.244.779-.828 1.169-2.012 1.169-3.552 0-2.96-1.295-4.44-3.885-4.44a5.9 5.9 0 0 0-1.547.195 8.916 8.916 0 0 0-1.582.622h-3.274V53.597h14.029l-.539 3.375zM556.099 106.5c1.354-2.418 2.888-4.17 4.602-5.255 2.293-1.451 4.796-1.607 7.509-.47 1.682.705 2.945 1.698 3.79 2.978l5.549-8.64c-1.653-.866-3.616-1.477-5.891-1.833-7.117-1.113-14.2.772-21.251 5.656l-9.703-14.454c11.067-7.503 23.215-10.219 36.446-8.15 3.936.616 7.502 1.531 10.698 2.745l4.844-7.543-55.165-8.628 3.808-23.747 39.814 6.228a3.115 3.115 0 0 0-.786-.959c-.891-.721-2.212-1.081-3.964-1.081h-2.321l.657-3.936h1.577c1.431 0 2.577-.389 3.438-1.168.861-.778 1.292-1.859 1.292-3.243 0-1.183-.394-2.112-1.183-2.79-.788-.678-1.839-1.016-3.153-1.016-1.139 0-2.175.209-3.11.627-.934.418-1.868 1.059-2.803 1.924l-2.846-3.07c2.657-2.48 5.737-3.72 9.241-3.72 1.956 0 3.642.332 5.058.995s2.482 1.557 3.197 2.681a6.789 6.789 0 0 1 1.074 3.72c0 1.759-.511 3.222-1.533 4.39-1.022 1.167-2.424 1.982-4.205 2.443 1.956.173 3.562.865 4.818 2.076.848.818 1.409 1.847 1.685 3.086l41.832 6.543a26.653 26.653 0 0 1-.026-1.179c0-2.46.332-4.651.995-6.573l-12.843 5.264-8.761-19.151 21.511-8.662.547-.517c.074.073.148.142.221.208l4.359-1.755c-.086-.336-.243-.596-.47-.78-.366-.296-.908-.444-1.628-.444h-.953l.27-1.616h.647c.588 0 1.058-.16 1.412-.48s.531-.764.531-1.332c0-.485-.162-.867-.486-1.146-.324-.278-.755-.417-1.295-.417-.468 0-.893.086-1.277.258-.384.171-.767.435-1.151.79l-1.169-1.261c1.091-1.018 2.356-1.528 3.795-1.528.803 0 1.496.137 2.077.409.582.272 1.019.639 1.313 1.101s.441.971.441 1.528c0 .722-.21 1.323-.63 1.802-.419.48-.995.814-1.726 1.004.803.071 1.463.355 1.978.852.138.133.257.28.358.439l13.122-5.284 23.587 3.689-6.736 41.996 16.406 2.566-1.429-8.003-4.943 4.28-2.626-2.774 7.209-6.29 4.17-.726 3.412 19.105a8.885 8.885 0 0 0 1.622.994c.964.447 2.029.67 3.197.67 1.577 0 2.84-.439 3.789-1.319.949-.879 1.423-2.069 1.423-3.568 0-1.672-.445-2.869-1.336-3.59-.89-.721-2.211-1.081-3.963-1.081h-2.321l.656-3.936h1.577c1.431 0 2.577-.389 3.438-1.167.862-.779 1.292-1.86 1.292-3.244 0-1.182-.394-2.112-1.182-2.79-.789-.677-1.84-1.016-3.154-1.016-1.138 0-2.175.209-3.109.627-.935.418-1.869 1.06-2.803 1.925l-2.847-3.071c2.657-2.48 5.737-3.72 9.241-3.72 1.956 0 3.643.332 5.059.995s2.482 1.557 3.197 2.682a6.79 6.79 0 0 1 1.073 3.719c0 1.759-.511 3.222-1.533 4.39s-2.423 1.982-4.205 2.444c1.957.173 3.563.864 4.818 2.075.12.116.233.235.341.359l.221-.342 12.598 7.028-22.286 34.851 12.391 1.938 4.231-15.522 13.59 2.125-2.532 15.782H568.746c-.208-1.155-.86-1.962-1.956-2.421-1.311-.549-2.545-.297-3.705.758-.443.404-.9.958-1.369 1.663zm-353.933-7.945c-.428.922-.72 1.939-.876 3.051 1.151 1.964 2.247 3.538 3.29 4.724l1.158-7.217zm-98.718-2.942c.596.77 1.045 1.679 1.349 2.725.422 1.452.385 2.937-.111 4.455a8.35 8.35 0 0 1-.642 1.463c6.463-1.556 13.37-2.716 20.721-3.48l.378-1.125 1.332.209c1.209.189 2.23.011 3.064-.533.62-.405 1.062-.984 1.324-1.736-10.327 3.546-19.465 2.886-27.415-1.978zm267.924.941l-1.83 2.862a43.783 43.783 0 0 1 3.392 1.988c.277-.531.416-1.16.416-1.887 0-1.011-.337-1.807-1.012-2.386a3.34 3.34 0 0 0-.966-.577zm-200.122 4.727c-1.549-3.432-2.997-6.195-4.344-8.286-1.909-2.965-3.761-4.85-5.556-5.654-1.794-.803-3.762-.778-5.904.077-2.142.854-3.563 2.217-4.263 4.089-.7 1.871-.701 4.513-.001 7.924l.064.304c6.932.161 13.6.676 20.004 1.546zm79.388-11.295a54.06 54.06 0 0 1-1.05.871c-1.998 1.615-4.639 3.579-7.924 5.891l-.529 3.297 5.917.925zm427.212 10.593c-.075.086-.151.171-.228.255l.051.02zm-541.928-5.038l-.07.034c.029.444.006.897-.068 1.357-.201 1.256-.682 2.284-1.442 3.087.471-.026.944-.051 1.419-.074a31.392 31.392 0 0 1 .178-4.412zM301.01 78.97c-1.374 4.828-3.85 8.773-7.426 11.834-4.439 3.801-10.225 6.13-17.357 6.988 1.455.381 2.842.829 4.163 1.342l21.573-6.922 2.008-2.628c1.704 1.306 3.516 1.793 5.435 1.458 1.402-.244 2.427-.861 3.075-1.85.647-.99.83-2.274.548-3.853-.542-3.037-2.142-4.324-4.798-3.861a6.098 6.098 0 0 0-1.551.477 9.163 9.163 0 0 0-1.51.92l-3.358.585zm318.784 5.512l-8.934 14.133c7.746-1.975 15.353-3.258 22.819-3.847.443-.035.884-.068 1.325-.098l1.615-10.068c-1.848-.108-3.581.154-5.202.785-2.04.793-4.287 2.246-6.743 4.357zm46.836 12.762c.483-.205.933-.47 1.349-.797 1.467-1.148 2.403-2.98 2.806-5.496.786-4.9-.907-7.677-5.079-8.33a9.515 9.515 0 0 0-2.176-.089l-1.495 9.318a18.586 18.586 0 0 1-.287 4.303c1.647.32 3.275.684 4.882 1.091zm15.157-27.312l-15.839-2.477-1.46 9.102a15.73 15.73 0 0 1 6.495-.312c2.46.384 4.565 1.292 6.316 2.721 1.752 1.43 3.003 3.315 3.753 5.655.75 2.341.889 4.985.416 7.934-.259 1.616-.699 3.102-1.319 4.459l14.675-22.767a15.27 15.27 0 0 1-.372.004c-1.505 0-2.893-.195-4.161-.585l.002.015-4.649.81-1.882-10.541zM415.233 89.778a2.7 2.7 0 0 0-.308.315c-.546.655-.819 1.588-.819 2.8 0 1.27.259 2.203.775 2.8.516.596 1.193.894 2.031.894 1.325 0 2.446-.663 3.361-1.991.02-1.982-.209-3.391-.686-4.228-.478-.837-1.272-1.256-2.382-1.256-.512 0-.965.09-1.358.271l-.238.146c-.128.081-.253.164-.376.249zM88.195 79.553l-2.589 16.143c1.466-1.103 3.227-1.947 5.284-2.529 3.364-.952 6.333-.982 8.908-.088l.033.012c-4.333-3.407-8.212-7.919-11.636-13.538zm275.071 2.906h-9.251v3.996h3.035v3.627h-3.035v4.146c.498.09.991.185 1.48.286zm131.981 5.344c-.101-1.837-.357-3.199-.768-4.087-.545-1.181-1.416-1.772-2.612-1.772-.725 0-1.33.219-1.816.656l-.931 1.456c-.33.881-.54 2.122-.631 3.722 2.284-.061 4.537-.053 6.758.025zm-288.239-.427l.597.094.22-1.371zm-25.099-.092h.011c.599 0 1.052-.234 1.358-.701.306-.468.458-1.105.458-1.91 0-.817-.14-1.4-.422-1.749-.282-.35-.693-.524-1.232-.524a2.22 2.22 0 0 0-1.16.328 3.48 3.48 0 0 0-.981.897c.008.416.03.794.067 1.135a43.056 43.056 0 0 1 1.901 2.524zm72.595-1.112l3.841.601c4.874.762 8.915.134 12.126-1.886 3.21-2.019 5.175-5.275 5.896-9.766.634-3.957-.172-7.235-2.42-9.834-2.247-2.599-5.645-4.254-10.194-4.966-6.589-1.03-13.152.318-19.689 4.046.857.012 1.73.087 2.62.227 2.786.435 5.111 1.317 6.976 2.645 1.865 1.329 3.191 2.946 3.977 4.851.786 1.906 1.007 3.931.663 6.074a15.612 15.612 0 0 1-2.571 6.408 19.543 19.543 0 0 1-1.225 1.6zm214.203-2.647h-7.537v-1.67c1.535-1.539 2.635-2.679 3.301-3.419.665-.74 1.139-1.373 1.421-1.9s.422-1.075.422-1.643c0-.545-.158-.971-.476-1.279s-.741-.462-1.268-.462c-.468 0-.879.098-1.232.293-.354.196-.723.518-1.106.968l-1.403-1.101c1.019-1.303 2.326-1.954 3.921-1.954.815 0 1.519.148 2.113.444s1.046.699 1.358 1.208.468 1.078.468 1.705c0 .675-.147 1.323-.441 1.945s-.783 1.311-1.466 2.069-1.684 1.758-3.004 3.002h5.18zM121.472 48.497c-1.999-.437-4.18-.185-6.542.758-4.728 1.886-8.124 5.906-10.189 12.06 3.96 9.181 7.655 15.35 11.086 18.507 3.43 3.157 7.334 3.862 11.711 2.116 1.484-.592 2.719-1.375 3.706-2.35h-5.831v-27.38l-7.645 4.58-2.854-4.328zm614.776 32.808h-7.536v-1.67c1.535-1.539 2.635-2.679 3.3-3.419.666-.74 1.14-1.374 1.421-1.9a3.439 3.439 0 0 0 .423-1.643c0-.545-.159-.971-.477-1.279-.317-.308-.74-.462-1.268-.462-.467 0-.878.098-1.232.293-.353.195-.722.518-1.106.968l-1.403-1.101c1.02-1.303 2.327-1.954 3.921-1.954.816 0 1.52.148 2.114.444.593.296 1.046.699 1.358 1.208.311.509.467 1.077.467 1.705 0 .675-.147 1.323-.44 1.945-.294.621-.783 1.311-1.466 2.069-.684.758-1.685 1.758-3.004 3.002h5.18zm-192.326-6.738c1.655.734 2.483 1.8 2.483 3.197 0 .651-.186 1.24-.558 1.767s-.896.945-1.574 1.253c-.677.307-1.466.461-2.365.461-.887 0-1.661-.151-2.32-.453-.66-.302-1.169-.713-1.529-1.234s-.54-1.107-.54-1.758c0-1.374.768-2.38 2.303-3.02-1.211-.651-1.817-1.592-1.817-2.824 0-.627.177-1.181.531-1.66.353-.48.833-.847 1.439-1.102a5.085 5.085 0 0 1 1.987-.382c.731 0 1.397.119 1.996.356.6.237 1.077.586 1.43 1.048.354.461.531 1.012.531 1.651 0 1.125-.666 2.025-1.997 2.7zm-1.96 4.991c.659 0 1.175-.166 1.547-.497.371-.332.557-.764.557-1.297 0-.545-.162-.974-.485-1.288-.324-.313-.9-.618-1.727-.914l-.557-.196c-.972.51-1.457 1.297-1.457 2.363 0 .568.191 1.015.575 1.341.384.325.899.488 1.547.488zM131.835 60.709v18.237c1.119-1.338 1.838-2.985 2.159-4.939.608-3.708-.112-8.14-2.159-13.298zm246.534 14.462h-2.266v-9.662l-2.698 1.616-1.007-1.527 3.938-2.38h2.033zm247.847-.849l-.341.54a30.6 30.6 0 0 1 2.081-.789c3.325-1.126 6.847-1.573 10.567-1.341l1.462-9.12a9.725 9.725 0 0 1-1.791.161c-3.098 0-5.39-1.073-6.876-3.22-1.017-1.467-1.686-3.31-2.007-5.528zm-84.254-3.911c-.54 0-.962.136-1.268.408-.306.273-.459.664-.459 1.173 0 .473.144.849.432 1.128.288.278.749.529 1.385.754l.342.125c.467-.284.8-.583.998-.897s.297-.69.297-1.128c0-.485-.15-.867-.45-1.146-.3-.278-.725-.417-1.277-.417zm-57.321-6.136c-.412-.307-.86-.622-1.346-.945l-1.451-.95c-3.14.771-5.094 2.678-5.862 5.72-.409 1.623-.184 3.033.677 4.233a5.652 5.652 0 0 0 1.767 1.583zm-146.433-.069c1.654.735 2.482 1.8 2.482 3.197 0 .652-.186 1.241-.558 1.768s-.896.944-1.574 1.252c-.677.308-1.465.462-2.365.462-.887 0-1.66-.151-2.32-.453-.659-.302-1.169-.714-1.529-1.235s-.539-1.107-.539-1.758c0-1.374.767-2.38 2.302-3.019-1.211-.652-1.817-1.593-1.817-2.825 0-.627.177-1.181.531-1.66.354-.48.833-.847 1.439-1.101a5.067 5.067 0 0 1 1.987-.382c.732 0 1.397.118 1.997.355.599.237 1.076.586 1.43 1.048.353.462.53 1.012.53 1.652 0 1.125-.665 2.024-1.996 2.699zm-1.961 4.991c.66 0 1.175-.165 1.547-.497s.558-.764.558-1.297c0-.544-.162-.973-.486-1.287s-.899-.619-1.727-.915l-.557-.195c-.972.509-1.457 1.296-1.457 2.362 0 .568.192 1.015.575 1.341.384.325.9.488 1.547.488zM191.258 41.449l-10.116 3.636 2.44 6.619c1.094-1.141 2.338-1.962 3.729-2.462 1.499-.539 2.963-.676 4.394-.412 1.431.263 2.712.925 3.845 1.984s2.026 2.474 2.679 4.245c.672 1.823.851 3.584.538 5.283-.314 1.699-1.089 3.212-2.327 4.54s-2.861 2.352-4.868 3.074c-1.793.644-3.498.89-5.115.738-1.616-.152-3.211-.634-4.783-1.445l1.937-3.749c2.176 1.133 4.307 1.325 6.394.575 1.526-.548 2.553-1.441 3.081-2.679.529-1.237.477-2.715-.156-4.433-1.217-3.303-3.271-4.435-6.161-3.396-.616.221-1.164.5-1.646.838s-.985.781-1.511 1.329l-3.652 1.312-5.143-13.953 15.655-5.626zM336.247 60.05c-.539 0-.962.136-1.268.409-.306.272-.458.663-.458 1.172 0 .474.143.85.431 1.128s.75.53 1.385.755l.342.124c.467-.284.8-.583.998-.897s.297-.69.297-1.128c0-.485-.15-.867-.45-1.145-.3-.279-.725-.418-1.277-.418zm305.504-7.448c-.147-.594-.364-1.071-.653-1.429-.587-.727-1.443-1.091-2.567-1.091-.849 0-1.655.228-2.417.684-.762.457-1.443 1.08-2.042 1.869.05 2.689.393 4.631 1.03 5.828.637 1.196 1.668 1.794 3.092 1.794 1.046 0 1.877-.341 2.494-1.024zm-152.388 4.875l.095-.088c.791-.757 1.344-1.761 1.66-3.012.35-1.385.197-2.581-.458-3.586s-1.77-1.701-3.345-2.089c-1.54-.379-2.845-.288-3.914.275-1.069.562-1.787 1.57-2.154 3.024-.342 1.352-.202 2.526.419 3.523s1.758 2.039 3.41 3.128l.886.595c1.095-.343 2.001-.756 2.718-1.238l.433-.671zm42.295-1.334h-7.537v-1.67c1.535-1.539 2.635-2.679 3.301-3.419.665-.74 1.139-1.373 1.421-1.9a3.45 3.45 0 0 0 .422-1.643c0-.545-.159-.971-.476-1.279-.318-.308-.741-.462-1.268-.462-.468 0-.879.098-1.232.293-.354.196-.723.518-1.106.968l-1.403-1.101c1.019-1.302 2.326-1.954 3.921-1.954.815 0 1.519.148 2.113.444.593.296 1.046.699 1.358 1.208s.468 1.078.468 1.705c0 .675-.147 1.323-.441 1.945s-.783 1.311-1.466 2.069-1.684 1.758-3.004 3.002h5.18zm-107.167-2.96h-7.536v-1.67c1.535-1.539 2.635-2.679 3.3-3.419.666-.74 1.139-1.374 1.421-1.9a3.439 3.439 0 0 0 .423-1.643c0-.545-.159-.971-.477-1.279s-.74-.462-1.268-.462c-.467 0-.878.098-1.232.293s-.722.518-1.106.968l-1.403-1.101c1.019-1.303 2.326-1.954 3.921-1.954.815 0 1.52.148 2.113.444.594.296 1.047.699 1.358 1.208.312.509.468 1.077.468 1.705 0 .675-.147 1.323-.441 1.945-.293.621-.782 1.311-1.466 2.069-.683.758-1.684 1.758-3.003 3.002h5.18zm82.452-25.488c1.406 0 2.618.238 3.636.715 1.017.477 1.783 1.119 2.297 1.927s.772 1.699.772 2.673c0 1.264-.368 2.316-1.102 3.155-.735.839-1.742 1.425-3.022 1.756 1.406.125 2.56.622 3.463 1.492.902.87 1.353 2.072 1.353 3.606 0 1.202-.31 2.289-.929 3.263s-1.505 1.746-2.659 2.316-2.518.855-4.092.855c-2.896 0-5.183-1.005-6.862-3.015l2.235-2.114c.714.705 1.416 1.218 2.109 1.539.692.321 1.458.481 2.298.481 1.133 0 2.04-.316 2.722-.948s1.023-1.486 1.023-2.564c0-1.202-.32-2.062-.96-2.58s-1.589-.777-2.848-.777h-1.669l.473-2.828h1.133c1.028 0 1.852-.28 2.471-.839.619-.56.928-1.337.928-2.332 0-.849-.283-1.517-.85-2.004-.566-.487-1.322-.731-2.266-.731-.818 0-1.563.15-2.235.451-.671.3-1.343.761-2.014 1.383l-2.046-2.207c1.909-1.782 4.123-2.673 6.641-2.673zm136.535 14.141l-.338.549c-1.149-.666-2.361-.999-3.635-.999-.098 0-.195.003-.291.008l-2.663 1.092a5.519 5.519 0 0 0-.887 1.028c-.961 1.418-1.505 3.373-1.63 5.865 1.524-1.826 3.41-2.738 5.659-2.738 1.047 0 2.02.196 2.92.59zm-36.37 1.503l-4.65.81-3.539-19.824-4.943 4.28-2.626-2.774 7.209-6.29 4.17-.726zM157.724 32.97h-4.532v2.966a4.1 4.1 0 0 1 1.834-.444c.672 0 1.271.154 1.799.462.527.308.938.752 1.232 1.332s.441 1.267.441 2.061c0 .817-.186 1.539-.558 2.166a3.808 3.808 0 0 1-1.583 1.466c-.683.349-1.475.524-2.374.524-.803 0-1.514-.145-2.131-.435a5.444 5.444 0 0 1-1.682-1.253l1.313-1.207c.696.757 1.511 1.136 2.446 1.136.684 0 1.22-.207 1.61-.621.39-.415.584-1.007.584-1.776 0-1.481-.647-2.221-1.942-2.221-.276 0-.534.033-.773.098a4.45 4.45 0 0 0-.792.311h-1.637v-6.252h7.015zm-81.927 8.786h-15.7v-3.478c3.197-3.207 5.489-5.581 6.876-7.123 1.386-1.542 2.373-2.862 2.96-3.959.587-1.098.881-2.239.881-3.423 0-1.135-.331-2.023-.993-2.664-.662-.642-1.543-.962-2.642-.962-.974 0-1.83.203-2.567.61s-1.505 1.079-2.304 2.017l-2.923-2.294c2.123-2.714 4.846-4.071 8.169-4.071 1.698 0 3.166.309 4.402.925 1.237.617 2.18 1.456 2.83 2.517.649 1.06.974 2.244.974 3.552 0 1.406-.306 2.757-.918 4.052s-1.63 2.732-3.054 4.31c-1.424 1.579-3.51 3.663-6.258 6.254h10.792zm130.956 0h-2.267v-9.662l-2.698 1.616-1.007-1.527 3.939-2.38h2.033zm-150.709 0h-4.721V21.627l-5.621 3.367-2.098-3.182 8.206-4.959h4.234zm493.6-6.335h-7.537v-1.669c1.535-1.54 2.635-2.679 3.301-3.419.665-.74 1.139-1.374 1.421-1.901a3.446 3.446 0 0 0 .422-1.643c0-.544-.159-.971-.476-1.278-.318-.308-.741-.462-1.268-.462-.468 0-.879.097-1.232.293-.354.195-.723.518-1.106.968l-1.403-1.101c1.019-1.303 2.326-1.954 3.921-1.954.815 0 1.519.148 2.113.444.593.296 1.046.698 1.358 1.208.312.509.468 1.077.468 1.705 0 .675-.147 1.323-.441 1.945-.294.621-.783 1.311-1.466 2.069s-1.684 1.758-3.004 3.001h5.18z"/></svg>\n                ', ui.overlayBg.html($svgBG), ui.overlayProgress.html($progressIco).append(ui.overlayPercent.html("<span>0</span> %")), ui.overlay.append(ui.overlayTitle.text(localJsonForm.textCalculationTitle), ui.overlayProgress, ui.overlayBg), ui.stepsCounter.text(" " + localJsonForm.textAmountStep + " ").prepend(ui.stepsCurrent.text("1")).append(ui.stepsTotal.text(amountSteps)), ui.progressLineWrap.append(ui.progressLine), ui.progressWrapper.append(ui.progressLineWrap, ui.stepsCounter), localJsonForm.hideProgressBar && (ui.progressWrapper.css("display", "none"), ui.form.addClass("_form-padding-top")), function () {
                            var icoEnd = !1;
                            ui.captcha.append(jsonForm.captcha), ui.submit.val(jsonForm.submit_name).attr("type", "submit"), ui.submitWrapper.append(ui.submit), ui.finalText.text(jsonForm.success_note), "" !== localJsonForm.imageBeforeSubmitForm && (icoEnd = $("<img>").addClass(settings.prefix + "message__ico").attr({
                                alt: "",
                                src: localJsonForm.imageBeforeSubmitForm || ""
                            })), ui.finalSvgWrapper.html(icoEnd || ui.finalSvg), ui.final.append(ui.finalSvgWrapper, ui.finalText), $.each(jsonForm.step, function (indexStep, elementStep) {
                                ui.steps[indexStep] = function (indexStep, elementStep) {
                                    var $item = ui.step.clone(), $itemTitle = ui.stepTitle.clone(),
                                        $itemBody = ui.stepBody.clone(), $itemWrapper = ui.stepInnerWrap.clone(),
                                        titleStep = null;
                                    return $.each(elementStep.cols, function (indexCols, elementCols) {
                                        var $cols = ui.cols.clone(), amount_fields = 0;
                                        1 == indexCols && $itemBody.addClass("_" + settings.prefix + "column"), $.each(elementCols.rows, function (indexRows, elementRows) {
                                            var $rows = ui.rows.clone();
                                            $.each(elementRows.fields, function (indexFields, elementFields) {
                                                var jsonField = jsonForm.dictionaries[elementFields],
                                                    $field = ui.fields.clone(), $elementItemText = ui.fieldText.clone(),
                                                    $elementItemTitle = ui.fieldTitle.clone(),
                                                    $elementItemError = ui.fieldError.clone();
                                                if ("HTML_BLOCK" == jsonField.type_code || "DIV" == jsonField.type_code || "DUBLICATOR" == jsonField.type_code) var $elementItem = $("<div>"); else $elementItem = ui.fieldData.clone(), 4 != jsonField.title_position && "CHECKBOX" != jsonField.type_code && ($elementItemTitle.text(jsonField.name.replace(/\&\#34\;/g, '"')), $elementItemText.append($elementItemTitle)), 1 == jsonField.required && $elementItem.addClass("_required"), $elementItemText.append($elementItemError), $elementItem.append($elementItemText), $elementItem.data("required", jsonField.required), $elementItem.data("valid", jsonField.validator || ""), $elementItem.data("regex", jsonField.regex), $elementItem.data("error", jsonField.regex_error);
                                                switch ($elementItem.attr("data-id-field", jsonField.dictionary_id), $elementItem.data("idField", jsonField.dictionary_id), jsonField.type_code) {
                                                    case"HTML_BLOCK":
                                                        $elementItem.html(jsonField.html);
                                                        break;
                                                    case"DIV":
                                                        ($elementItemWrapper = ui.h2.clone()).text(jsonField.name), $elementItem.append($elementItemWrapper);
                                                        break;
                                                    case"TEXT":
                                                        var $elementItemWrapper = ui.inputTextWrapper.clone();
                                                        if (($input = ui.inputText.clone()).attr({
                                                            type: "text",
                                                            name: "" + jsonField.alias,
                                                            placeholder: jsonField.placeholder || "",
                                                            maxlength: jsonField.maxlength || "",
                                                            size: jsonField.size || ""
                                                        }), $elementItem.addClass(settings.prefix + "input"), $elementItemWrapper.append($input), null != jsonField.json && null != jsonField.json.valid && $elementItem.data("valid", jsonField.json.valid), "" != jsonField.mask) {
                                                            var _callback = settings.maskInput, _param = {
                                                                input: $input,
                                                                mask: jsonField.mask,
                                                                placeholder: jsonField.placeholder
                                                            };
                                                            if (_callback && "function" == typeof _callback) try {
                                                                _callback(_param)
                                                            } catch (err) {
                                                                console.warn('Ошибка в функции callback "maskInput".', err)
                                                            }
                                                        }
                                                        break;
                                                    case"PHONE":
                                                        $elementItemWrapper = ui.inputTextWrapper.clone(), ($input = ui.inputText.clone()).attr({
                                                            type: "tel",
                                                            name: "" + jsonField.alias,
                                                            placeholder: jsonField.placeholder || "",
                                                            maxlength: jsonField.maxlength || "",
                                                            size: jsonField.size || ""
                                                        }), $elementItem.addClass(settings.prefix + "input"), $elementItemWrapper.append($input);
                                                        break;
                                                    case"EMAIL":
                                                        $elementItemWrapper = ui.inputTextWrapper.clone(), ($input = ui.inputText.clone()).attr({
                                                            type: "email",
                                                            name: "" + jsonField.alias,
                                                            placeholder: jsonField.placeholder || "",
                                                            maxlength: jsonField.maxlength || "",
                                                            size: jsonField.size || ""
                                                        }), $elementItem.addClass(settings.prefix + "input"), $elementItemWrapper.append($input);
                                                        break;
                                                    case"TEXTAREA":
                                                        $elementItemWrapper = ui.textareaWrapper.clone();
                                                        var $textarea = ui.textarea.clone();
                                                        $textarea.attr({
                                                            name: "" + jsonField.alias,
                                                            placeholder: jsonField.placeholder || ""
                                                        }), $elementItem.addClass(settings.prefix + "textarea"), $elementItemWrapper.append($textarea);
                                                        break;
                                                    case"CHECKBOX":
                                                        $elementItemWrapper = ui.checkboxWrapper.clone();
                                                        var $checkbox = ui.checkbox.clone();
                                                        $checkbox.find("." + settings.prefix + "checkbox__text").text(jsonField.name), ($input = $checkbox.find("input")).attr("name", "" + jsonField.alias).val(jsonField.name).data("index", 0), jsonField.dependence && $input.data("dependence", jsonField.dependence), $checkbox.attr("tabindex", "0"), $elementItem.addClass(settings.prefix + "checkbox"), $elementItemWrapper.append($checkbox);
                                                        break;
                                                    case"MULTI_CHECKBOX":
                                                        $elementItemWrapper = ui.checkboxWrapper.clone();
                                                        var jsonImage = null, hide_title = !1;
                                                        null != jsonField.json && (null != jsonField.json.image && (jsonImage = jsonField.json.image), null != jsonField.json.hide_title && (hide_title = jsonField.json.hide_title)), $.each(jsonField.options, function (index, el) {
                                                            var $checkbox = ui.checkbox.clone();
                                                            "0" == jsonField.variants_position && null === jsonImage && $elementItemWrapper.addClass("_column");
                                                            var $input = $checkbox.find("input"),
                                                                textHTML = $("<div>").html(el.name).text();
                                                            if ($input.attr("name", jsonField.alias + "[]").val(el.name).prop("checked", el.selected), el.dependence && $input.data("dependence", el.dependence), hide_title ? $elementItemWrapper.addClass("_title_none") : $checkbox.find("." + settings.prefix + "checkbox__text").html(textHTML), null !== jsonImage && null != jsonImage[index]) {
                                                                var $imageWrapper = ui.imageWrapper.clone(),
                                                                    $image = ui.image.clone();
                                                                $image.attr({
                                                                    src: jsonImage[index],
                                                                    alt: ""
                                                                }), $imageWrapper.append($image), $input.after($imageWrapper)
                                                            }
                                                            $checkbox.attr("tabindex", "0"), $elementItemWrapper.append($checkbox)
                                                        }), $elementItemWrapper.addClass(settings.prefix + "multi-checkbox"), $elementItem.addClass(settings.prefix + "checkbox"), null !== jsonImage && $elementItemWrapper.addClass("_checkbox-image");
                                                        break;
                                                    case"RADIO_GROUP":
                                                        $elementItemWrapper = ui.radioWrapper.clone(), hide_title = !1, (jsonImage = null) != jsonField.json && (null != jsonField.json.image && (jsonImage = jsonField.json.image), null != jsonField.json.hide_title && (hide_title = jsonField.json.hide_title)), $.each(jsonField.options, function (index, el) {
                                                            var $radio = ui.radio.clone();
                                                            "0" == jsonField.variants_position && null === jsonImage && $elementItemWrapper.addClass("_column");
                                                            var $input = $radio.find("input"),
                                                                textHTML = $("<div>").html(el.name).text();
                                                            if ($input.attr("name", jsonField.alias + "[]").val(el.name).prop("checked", el.selected), el.dependence && $input.data("dependence", el.dependence), hide_title ? $elementItemWrapper.addClass("_title_none") : $radio.find("." + settings.prefix + "radio__text").html(textHTML), null !== jsonImage && null != jsonImage[index]) {
                                                                var $imageWrapper = ui.imageWrapper.clone(),
                                                                    $image = ui.image.clone();
                                                                $image.attr({
                                                                    src: jsonImage[index],
                                                                    alt: ""
                                                                }), $imageWrapper.append($image), $input.after($imageWrapper)
                                                            }
                                                            $radio.attr("tabindex", "0"), $elementItemWrapper.append($radio)
                                                        }), $elementItem.addClass(settings.prefix + "radio"), null !== jsonImage && $elementItemWrapper.addClass("_radio-image");
                                                        break;
                                                    case"SELECT":
                                                        $elementItemWrapper = ui.selectWrapper.clone();
                                                        var $selectDefault = ($select = ui.select.clone()).find(settings.prefix + "selectbox__text"),
                                                            $selectList = $select.find("." + settings.prefix + "selectbox__list");
                                                        $selectDefault.text("Не выбрано"), $.each(jsonField.options, function (index, el) {
                                                            var $options = ui.selectOption.clone();
                                                            $options.text(el.name), el.selected && $selectDefault.text(el.name), el.dependence && $options.data("dependence", el.dependence), $selectList.append($options)
                                                        }), $elementItem.addClass(settings.prefix + "selectbox"), $elementItemWrapper.attr("tabindex", "0"), $elementItemWrapper.append($select), $elementItemWrapper.find("input").attr("name", jsonField.alias);
                                                        break;
                                                    case"MULTI_SELECT":
                                                        $elementItemWrapper = ui.selectWrapper.clone(), $selectDefault = ($select = ui.select.clone()).find("." + settings.prefix + "selectbox__text"), $selectList = $select.find("." + settings.prefix + "selectbox__list");
                                                        var $select, $selectAmount = ui.selectAmount.clone(),
                                                            countActive = 0, valueInput = [];
                                                        $selectDefault.text("Выбрано"), $.each(jsonField.options, function (index, el) {
                                                            var $options = ui.selectOption.clone();
                                                            $options.addClass("_multiselect-item").text(el.name), el.selected && ($options.addClass("_active"), countActive++, valueInput.push(el.name)), el.dependence && $options.data("dependence", el.dependence).data("index", index), $selectList.append($options)
                                                        }), $selectAmount.text(countActive), $select.find("." + settings.prefix + "selectbox__selected").prepend($selectAmount), $elementItem.addClass(settings.prefix + "selectbox _multiselect"), $elementItemWrapper.attr("tabindex", "0"), $elementItemWrapper.append($select), $elementItemWrapper.find("input").attr("name", jsonField.alias).val(valueInput.join(", "));
                                                        break;
                                                    case"UPLOAD":
                                                        for (var required_UPLOAD = 1 == jsonField.required, id_upload = Number(jsonField.dictionary_position); 0 < $("#fsUploadProgress" + id_upload).length;) id_upload += 10;
                                                        if ($elementItemWrapper = '\n                                        <div class="anketa-flash-upload">\n                                            <div class="upload-progress" id="fsUploadProgress' + id_upload + '"></div>\n                                            <div class="upload-button"><span id="spanButtonPlaceHolder' + id_upload + '"></span><span class="upload-count">Не больше: ' + jsonField.count + '</span></div>\n                                            <input type="hidden" name="' + jsonField.alias + '" id="hidUploadField' + id_upload + '" value="" />\n                                        </div>\n                                    ', (callback = settings.upload) && "function" == typeof callback) try {
                                                            callback({
                                                                position: id_upload,
                                                                required: required_UPLOAD,
                                                                count: jsonField.count,
                                                                url: jsonField.upload_url,
                                                                field: jsonField.upload_field,
                                                                maxsize: jsonField.maxsize + " MB",
                                                                filetypes1: jsonField.filetypes[1],
                                                                filetypes2: jsonField.filetypes[0],
                                                                name: jsonField.name
                                                            })
                                                        } catch (err) {
                                                            console.warn('Ошибка в функции callback "upload".', err)
                                                        }
                                                        $elementItem.addClass(settings.prefix + "upload");
                                                        break;
                                                    case"DUBLICATOR":
                                                        ($elementItemWrapper = ui.dublicator.clone()).find("." + settings.prefix + "btn2").text(jsonField.dublicate_params.text), $elementItem.attr("data-id-field", jsonField.dictionary_id), $elementItem.data("idField", jsonField.dictionary_id), $elementItem.addClass("js-dublicate"), jsonField.dublicate_params.dublicator_padding_remove && $elementItemWrapper.addClass(settings.prefix + "padding-top-none"), $rows.addClass("_dublicate-rows"), $field.addClass("_dublicate-fields");
                                                        break;
                                                    case"CALENDAR":
                                                        $elementItemWrapper = ui.inputTextWrapper.clone();
                                                        var $input = ui.inputText.clone(), callback = settings.calendar;
                                                        if ($input.addClass("init-calendar").attr({
                                                            name: "" + jsonField.alias,
                                                            placeholder: jsonField.placeholder || "",
                                                            maxlength: jsonField.maxlength || "",
                                                            size: jsonField.size || ""
                                                        }), callback && "function" == typeof callback) {
                                                            var param = {
                                                                input: $input,
                                                                form: ui.form,
                                                                formWrapper: ui.main,
                                                                jsonField: jsonField
                                                            };
                                                            try {
                                                                callback(param)
                                                            } catch (err) {
                                                                console.warn('Ошибка в функции callback "calendar".', err)
                                                            }
                                                        }
                                                        $elementItem.addClass(settings.prefix + "input"), $elementItemWrapper.append($input);
                                                        break;
                                                    case"CALENDAR_INTERVAL":
                                                        $elementItemWrapper = ui.inputDateWrapper.clone();
                                                        var $inputFrom = ui.inputDateFrom.clone(),
                                                            $inputBefore = ui.inputDateBefore.clone();
                                                        if (callback = settings.calendarInterval, $inputFrom.attr({
                                                            name: jsonField.alias + "[0]",
                                                            placeholder: jsonField.placeholder || "От",
                                                            maxlength: jsonField.maxlength || "",
                                                            size: jsonField.size || ""
                                                        }), $inputBefore.attr({
                                                            name: jsonField.alias + "[1]",
                                                            placeholder: jsonField.placeholder || "До",
                                                            maxlength: jsonField.maxlength || "",
                                                            size: jsonField.size || ""
                                                        }), callback && "function" == typeof callback) {
                                                            param = {
                                                                from: $inputFrom,
                                                                before: $inputBefore,
                                                                form: ui.form,
                                                                formWrapper: ui.main,
                                                                jsonField: jsonField
                                                            };
                                                            try {
                                                                callback(param)
                                                            } catch (err) {
                                                                console.warn('Ошибка в функции callback "calendarInterval".', err)
                                                            }
                                                        }
                                                        $elementItem.addClass(settings.prefix + "input"), $elementItemWrapper.append($inputFrom), $elementItemWrapper.append($inputBefore)
                                                }
                                                jsonField.hide && $elementItem.css("display", "none"), null != jsonField.json && null != jsonField.json.title_step && (titleStep = jsonField.json.title_step), $itemTitle.text(titleStep || jsonField.step_name), $elementItem.append($elementItemWrapper), $field.append($elementItem), $rows.append($field), amount_fields++
                                            }), $cols.append($rows)
                                        }), 0 < amount_fields && $itemBody.append($cols)
                                    }), "" != $itemTitle.text && $itemWrapper.append($itemTitle), $itemWrapper.append($itemBody), $item.append($itemWrapper), $item
                                }(0, elementStep), ui.stepsWrapper.append(ui.steps[indexStep])
                            });
                            var svgPrev = ui.btnSvg, svgNext = ui.btnSvg;
                            ui.prevBtn.attr("tabindex", 0).css("display", "none").append(svgPrev, $("<span>").text(localJsonForm.textPrevStep)), ui.nextBtn.attr("tabindex", 0).append($("<span>").text(localJsonForm.textNextStep), svgNext), ui.controls.append(ui.prevBtn, ui.nextBtn), ui.form.attr("data-s3-anketa-id", jsonForm.anketa_id), ui.hintLeft.css("display", "none"), ui.hintRight.css("display", "none"), ui.content.append(ui.stepsWrapper), ui.form.append(ui.hintLeft, ui.content, ui.hintRight), ui.main.append(ui.overlay), 1 < amountSteps ? (ui.content.append(ui.controls), ui.main.append(ui.progressWrapper)) : (ui.submit.css("display", "inline-block"), ui.form.addClass("_form-padding-top"), ui.steps[activeStep].addClass("_final-step"), ui.steps[activeStep].find("." + settings.prefix + "inner-wrapper").append(ui.textConfidentiality, ui.captcha, ui.submitWrapper), ui.steps[activeStep].append(ui.final)), ui.main.append(ui.form), ui.steps[activeStep].css("display", "block"), hintTo(activeStep)
                        }(), ui.prevBtn.on("click", prevBntForm), ui.nextBtn.on("click", nextBtnForm), ui.form.on("submit", formSubmit), ui.form.find('input[type="checkbox"], input[type="radio"]').on("click", clickCheckboxOrRadio), ui.form.find("." + settings.prefix + "selectbox__item").on("click", clickSelectItem), ui.form.find("input").on("blur", onBlur), ui.form.find("input").on("focus", onFocus), ui.form.find(".dublicator-btn-add").on("click", addDublicator), ui.form.find("." + settings.prefix + "selectbox__selected").on("click", clickSelected), ui.form.on("click", ".dublicator-btn-remove", removeDublicator), $(document).on("click", clickDocument), $(document).on("click", "." + settings.prefix + "tooltip__ico", openTooltip), $(document).on("click", "." + settings.prefix + "tooltip__close", closeTooltip)
                    }).fail(function (data) {
                        formError(data.error)
                    })
                }($this), $.fn.selectFormToggle = function () {
                    return this.each(function () {
                        var $select = $(this), $list = $select.find("." + settings.prefix + "selectbox__list");
                        $select.hasClass("_opened") ? $list.slideUp(function () {
                            $select.removeClass("_opened")
                        }) : ($select.addClass("_opened"), $list.slideDown())
                    })
                }, $.fn.selectFormValue = function () {
                    var result = [];
                    return this.find("." + settings.prefix + "selectbox__item").each(function (index, el) {
                        var $this = $(this);
                        $this.hasClass("_active") && result.push($this.text())
                    }), result.join(", ")
                }
            })
        }
    }, {}]
}, {}, [1]);