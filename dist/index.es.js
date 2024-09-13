import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { __rest, __assign, __awaiter, __generator, __spreadArray } from 'tslib';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import React, { useState, forwardRef, useEffect, useRef, useReducer, createContext, useImperativeHandle, useContext } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import Schema from 'async-validator';
import mapValues from 'lodash-es/mapValues';
import each from 'lodash-es/each';
import axios from 'axios';

/**
 * 提供了一套常用的图标集合，基于 react-fontawesome 实现
 *
 * 支持 react-fontawesome 的所有属性，可以在这里查询：
 *  https://github.com/FortAwesome/react-fontawesome#basic
 *
 * 支持 react-fontawesome 所有 free-solid-icons，可以在这里查看所有图标：
 *  https://fontawesome.com/icons?d=gallery&s=solid&m=free
 *
 * ~~~js
 * // 这样引用
 * import { BetterIcon } from 'betterui';
 * ~~~
 *
 */
var Icon = function (props) {
    var _a;
    var className = props.className, theme = props.theme, restProps = __rest(props, ["className", "theme"]);
    var classes = classNames('better-icon', className, (_a = {},
        _a["icon-".concat(theme)] = theme,
        _a));
    return (jsx(FontAwesomeIcon, __assign({ className: classes }, restProps)));
};

/**
 * 页面中常用的内置组件，可以帮助你制作基于状态变化的过渡和动画效果
 *
 * ~~~js
 * // 这样引用
 * import { BetterTransition } from 'betterui';
 * ~~~
 *
 */
var Transition = function (props) {
    var children = props.children, classNames = props.classNames, animation = props.animation, wrapper = props.wrapper, restProps = __rest(props, ["children", "classNames", "animation", "wrapper"]);
    return (jsx(CSSTransition, __assign({ classNames: classNames ? classNames : animation }, restProps, { children: wrapper ? jsx("div", { children: children }) : children })));
};
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
};

/**
 * 用来展现需要重点关注的信息。
 *
 * ~~~js
 * // 这样引用
 * import { BetterAlert } from 'betterui';
 * ~~~
 *
 */
var Alert = function (props) {
    var _a;
    var _b = useState(false), hide = _b[0], setHide = _b[1];
    var title = props.title, description = props.description, type = props.type, onClose = props.onClose, closable = props.closable;
    var classes = classNames('better-alert', (_a = {},
        _a["better-alert-".concat(type)] = type,
        _a));
    var titleClass = classNames('better-alert-title', {
        'bold-title': description,
    });
    var handleClose = function (e) {
        if (onClose) {
            onClose();
        }
        setHide(true);
    };
    return (jsx(Transition, __assign({ in: !hide, timeout: 300, animation: "zoom-in-top" }, { children: jsxs("div", __assign({ className: classes }, { children: [jsx("span", __assign({ className: titleClass }, { children: title })), description && jsx("p", __assign({ className: "better-alert-desc" }, { children: description })), closable && jsx("span", __assign({ className: "better-alert-close", onClick: handleClose }, { children: jsx(Icon, { icon: "times" }) }))] })) })));
};
Alert.defaultProps = {
    type: 'default',
    closable: true,
};

/**
 * Input 输入框，通过鼠标或键盘输入内容，是最基础的表单域的包装，支持 HTMLInput 的所有基本属性
 *
 * ~~~js
 * // 这样引用
 * import { BetterInput } from 'betterui';
 * ~~~
 *
 */
var Input = forwardRef(function (props, ref) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, style = props.style, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append", "style"]);
    var cnames = classNames('better-input-wrapper', (_a = {},
        _a["input-size-".concat(size)] = size,
        _a['is-disabled'] = disabled,
        _a['input-group'] = prepend || append,
        _a['input-group-append'] = !!append,
        _a['input-group-prepend'] = !!prepend,
        _a));
    var fixControlledValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (jsxs("div", __assign({ className: cnames, style: style }, { children: [prepend && jsx("div", __assign({ className: "better-input-group-prepend" }, { children: prepend })), icon && jsx("div", __assign({ className: "icon-wrapper" }, { children: jsx(Icon, { icon: icon, title: "title-".concat(icon) }) })), jsx("input", __assign({ ref: ref, className: "better-input-inner", disabled: disabled }, restProps)), append && jsx("div", __assign({ className: "better-input-group-append" }, { children: append }))] })));
});

function useDebounce(value, delay) {
    if (delay === void 0) { delay = 300; }
    var _a = useState(value), debouncedValue = _a[0], setDebouncedValue = _a[1];
    useEffect(function () {
        var handler = window.setTimeout(function () {
            setDebouncedValue(value);
        }, delay);
        return function () {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
}

function useClickOutside(ref, handler) {
    useEffect(function () {
        var listener = function (event) {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('click', listener);
        return function () {
            document.removeEventListener('click', listener);
        };
    }, [ref, handler]);
}

/**
 * 联想搜索，通过鼠标或键盘输入内容进行自动联想，支持同步和异步两种方式。
 * 支持 Input 组件的所有属性，支持键盘事件选择
 *
 * ~~~js
 * // 这样引用
 * import { BetterAutoComplete } from 'betterui';
 * ~~~
 *
 */
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var triggerSearch = useRef(false);
    var componentRef = useRef(null);
    var debounceValue = useDebounce(inputValue, 500);
    useClickOutside(componentRef, function () { setSuggestions([]); });
    useEffect(function () {
        if (debounceValue && triggerSearch.current) {
            var results = fetchSuggestions(debounceValue);
            if (results instanceof Promise) {
                setLoading(true);
                results.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debounceValue, fetchSuggestions]);
    var handleChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            // 回车键
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            // 向上键
            case 38:
                highlight(highlightIndex - 1);
                break;
            // 向下键
            case 40:
                highlight(highlightIndex + 1);
                break;
            // ESC键
            case 27:
                setSuggestions([]);
                break;
        }
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item.value;
    };
    var generateDropdown = function () {
        return (jsx(Transition, __assign({ in: suggestions.length > 0, animation: "zoom-in-top", timeout: 300 }, { children: jsx("ul", __assign({ className: "better-suggestion-list" }, { children: suggestions.map(function (item, index) {
                    var activeItem = classNames('suggestion-item', {
                        'is-active': index === highlightIndex,
                    });
                    return (jsx("li", __assign({ className: activeItem, onClick: function () { return handleSelect(item); } }, { children: renderTemplate(item) }), index));
                }) })) })));
    };
    return (jsxs("div", __assign({ className: 'better-auto-complete', ref: componentRef }, { children: [jsx(Input, __assign({ value: inputValue }, restProps, { onChange: handleChange, onKeyDown: handleKeyDown })), loading &&
                jsx("div", __assign({ className: "loading-icon" }, { children: jsx(Icon, { icon: "spinner", spin: true }) })), suggestions.length > 0 && generateDropdown()] })));
};

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 *
 * ~~~js
 * // 这样引用
 * import { BetterButton } from 'betterui';
 * ~~~
 *
 */
var Button = function (props) {
    var _a;
    var btnType = props.btnType, className = props.className, disabled = props.disabled, size = props.size, children = props.children, href = props.href, restProps = __rest(props, ["btnType", "className", "disabled", "size", "children", "href"]);
    var classes = classNames("btn", className, (_a = {},
        _a["btn-".concat(btnType)] = btnType,
        _a["btn-".concat(size)] = size,
        _a["disabled"] = (btnType === "link") && disabled,
        _a));
    // 当按钮类型为 Link 时，返回 a 标签
    if (btnType === "link" && href) {
        return (jsx("a", __assign({ className: classes, href: href }, restProps, { children: children })));
    }
    else {
        return (jsx("button", __assign({ className: classes, disabled: disabled }, restProps, { children: children })));
    }
};
Button.defaultProps = {
    disabled: false,
    btnType: "default",
};

function fieldsReducer(state, action) {
    var _a, _b, _c;
    switch (action.type) {
        case 'addField':
            return __assign(__assign({}, state), (_a = {}, _a[action.name] = __assign({}, action.value), _a));
        case 'updateValue':
            return __assign(__assign({}, state), (_b = {}, _b[action.name] = __assign(__assign({}, state[action.name]), { value: action.value }), _b));
        case 'updateValidateResult':
            var _d = action.value, isValid = _d.isValid, errors = _d.errors;
            return __assign(__assign({}, state), (_c = {}, _c[action.name] = __assign(__assign({}, state[action.name]), { isValid: isValid, errors: errors }), _c));
        default:
            return state;
    }
}
function useStore(initialValues) {
    var _this = this;
    var _a = useState({ isValid: true, isSubmit: false, errors: {}, }), form = _a[0], setForm = _a[1];
    var _b = useReducer(fieldsReducer, {}), fields = _b[0], dispatch = _b[1];
    var getFieldValue = function (key) {
        var _a;
        return (_a = fields[key]) === null || _a === void 0 ? void 0 : _a.value;
    };
    var getFieldsValue = function () {
        return mapValues(fields, function (field) { return field.value; });
    };
    var setFieldValue = function (name, value) {
        if (fields[name]) {
            dispatch({
                type: 'updateValue',
                name: name,
                value: value,
            });
        }
    };
    var resetFieldsValue = function () {
        if (initialValues) {
            each(initialValues, function (value, name) {
                if (fields[name]) {
                    dispatch({
                        type: 'updateValue',
                        name: name,
                        value: value,
                    });
                }
            });
        }
    };
    var transformRules = function (rules) { return (rules.map(function (rule) { return (typeof rule === 'function' ? rule({ getFieldValue: getFieldValue }) : rule); })); };
    var validateField = function (name) { return __awaiter(_this, void 0, void 0, function () {
        var _a, value, rules, afterRules, descriptor, valueMap, validator, isValid, errors, e_1, err;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = fields[name], value = _a.value, rules = _a.rules;
                    afterRules = transformRules(rules);
                    descriptor = (_b = {}, _b[name] = afterRules, _b);
                    valueMap = (_c = {}, _c[name] = value, _c);
                    validator = new Schema(descriptor);
                    isValid = true;
                    errors = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, validator.validate(valueMap)];
                case 2:
                    _d.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _d.sent();
                    isValid = false;
                    err = e_1;
                    errors = err.errors;
                    console.log('e', err.errors);
                    console.log('fields', fields);
                    return [3 /*break*/, 5];
                case 4:
                    dispatch({
                        type: 'updateValidateResult',
                        name: name,
                        value: { isValid: isValid, errors: errors },
                    });
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var validateAllFields = function () { return __awaiter(_this, void 0, void 0, function () {
        var isValid, errors, valueMap, descriptor, validator, e_2, err;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isValid = true;
                    errors = {};
                    valueMap = mapValues(fields, function (field) { return field.value; });
                    descriptor = mapValues(fields, function (field) { return transformRules(field.rules); });
                    validator = new Schema(descriptor);
                    setForm(__assign(__assign({}, form), { isSubmit: true }));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, validator.validate(valueMap)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_2 = _a.sent();
                    isValid = false;
                    err = e_2;
                    errors = err.fields;
                    each(fields, function (value, name) {
                        if (errors[name]) {
                            var itemErrors = errors[name];
                            dispatch({
                                type: 'updateValidateResult',
                                name: name,
                                value: {
                                    isValid: false,
                                    errors: itemErrors,
                                },
                            });
                        }
                        else if (value.rules.length > 0 && !errors[name]) {
                            dispatch({
                                type: 'updateValidateResult',
                                name: name,
                                value: {
                                    isValid: true,
                                    errors: [],
                                },
                            });
                        }
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setForm(__assign(__assign({}, form), { isSubmit: false, isValid: isValid, errors: errors }));
                    return [2 /*return*/, {
                            isValid: isValid,
                            errors: errors,
                            values: valueMap,
                        }];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return {
        form: form,
        fields: fields,
        dispatch: dispatch,
        getFieldValue: getFieldValue,
        getFieldsValue: getFieldsValue,
        setFieldValue: setFieldValue,
        resetFieldsValue: resetFieldsValue,
        validateField: validateField,
        validateAllFields: validateAllFields,
    };
}

var FormContext = createContext({});
/**
 * Form 表单，用以收集、校验和提交数据，一般由输入框、单选框、复选框、选择器等控件组成。
 *
 * ~~~js
 * // 这样引用，再分别使用 <BetterForm> 和 <BetterForm.Item>
 * import { BetterForm } from 'betterui';
 * ~~~
 *
 */
var Form = forwardRef(function (props, ref) {
    var name = props.name, children = props.children, initialValues = props.initialValues, onSuccessfulSubmit = props.onSuccessfulSubmit, onFailedSubmit = props.onFailedSubmit;
    var _a = useStore(initialValues), form = _a.form, fields = _a.fields, dispatch = _a.dispatch, restProps = __rest(_a, ["form", "fields", "dispatch"]);
    var validateField = restProps.validateField, validateAllFields = restProps.validateAllFields;
    useImperativeHandle(ref, function () { return (__assign({}, restProps)); });
    var passedContext = { dispatch: dispatch, fields: fields, initialValues: initialValues, validateField: validateField, };
    var submitForm = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, isValid, errors, values;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    e.stopPropagation();
                    return [4 /*yield*/, validateAllFields()];
                case 1:
                    _a = _b.sent(), isValid = _a.isValid, errors = _a.errors, values = _a.values;
                    if (isValid) {
                        onSuccessfulSubmit && onSuccessfulSubmit(values);
                    }
                    else {
                        onFailedSubmit && onFailedSubmit(values, errors);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (jsx(Fragment, { children: jsx("form", __assign({ name: name, className: 'better-form', onSubmit: submitForm }, { children: jsx(FormContext.Provider, __assign({ value: passedContext }, { children: typeof children === 'function' ? children(form) : children })) })) }));
});
Form.defaultProps = {
    name: 'better-form',
};

var FormItem = function (props) {
    var _a;
    var _b = props, name = _b.name, label = _b.label, children = _b.children, valuePropName = _b.valuePropName, trigger = _b.trigger, getValueFromEvent = _b.getValueFromEvent, rules = _b.rules, validateTrigger = _b.validateTrigger;
    var _c = useContext(FormContext), dispatch = _c.dispatch, fields = _c.fields, initialValues = _c.initialValues, validateField = _c.validateField;
    var rowClass = classNames('better-row', {
        'better-row-no-label': !label,
    });
    useEffect(function () {
        var value = (initialValues && initialValues[name]) || '';
        dispatch({
            type: 'addField',
            name: name,
            value: {
                label: label,
                name: name,
                value: value,
                rules: rules || [],
                errors: [],
                isValid: true,
            },
        });
    }, []);
    var onValueUpdate = function (e) {
        var value = getValueFromEvent(e);
        dispatch({
            type: 'updateValue',
            name: name,
            value: value,
        });
    };
    var onValueValidate = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateField(name)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var fieldState = fields[name];
    var value = fieldState && fieldState.value;
    var errors = fieldState && fieldState.errors;
    var isRequired = rules && rules.some(function (rule) { return (typeof rule !== 'function' && rule.required); });
    var hasError = errors && errors.length > 0;
    var labelClass = classNames({
        'better-form-item-required': isRequired,
    });
    var itemClass = classNames('better-form-item-control', {
        'better-form-item-has-error': hasError,
    });
    var controlProps = {};
    controlProps[valuePropName] = value;
    controlProps[trigger] = onValueUpdate;
    if (rules) {
        controlProps[validateTrigger] = onValueValidate;
    }
    var childList = React.Children.toArray(children);
    if (childList.length === 0) {
        console.error('FormItem must have a child element');
    }
    if (childList.length > 1) {
        console.warn('FormItem must have only one child element');
    }
    if (!React.isValidElement(childList[0])) {
        console.error('Child Element is not a valid React Element');
    }
    var child = childList[0];
    var returnChildNode = React.cloneElement(child, __assign(__assign({}, child.props), controlProps));
    return (jsxs("div", __assign({ className: rowClass }, { children: [label &&
                jsx("div", __assign({ className: 'better-form-item-label' }, { children: jsx("label", __assign({ className: labelClass, title: label }, { children: label })) })), jsxs("div", __assign({ className: 'better-form-item' }, { children: [jsx("div", __assign({ className: itemClass }, { children: returnChildNode })), hasError &&
                        jsx("div", __assign({ className: 'better-form-item-explain' }, { children: jsx("span", { children: (_a = errors[0]) === null || _a === void 0 ? void 0 : _a.message }) }))] }))] })));
};
FormItem.defaultProps = {
    valuePropName: 'value',
    trigger: 'onChange',
    validateTrigger: 'onBlur',
    getValueFromEvent: function (e) { return e.target.value; },
};

var BetterForm = Form;
BetterForm.Item = FormItem;

var MenuContext = createContext({ index: '0' });
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单
 *
 * ~~~js
 * // 这样引用，再分别使用 <BetterMenu>，<BetterMenu.SubMenu>，<BetterMenu.Item>
 * import { BetterMenu } from 'betterui';
 * ~~~
 *
 */
var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, children = props.children, defaultIndex = props.defaultIndex, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames("better-menu", className, {
        "menu-vertical": mode === "vertical",
        'menu-horizontal': mode !== 'vertical',
    });
    var handleClick = function (index) {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        index: currentActive || '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString(),
                });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    };
    return (jsx("ul", __assign({ className: classes, style: style, "data-testid": "test-menu" }, { children: jsx(MenuContext.Provider, __assign({ value: passedContext }, { children: renderChildren() })) })));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: "horizontal",
    defaultOpenSubMenus: [],
};

var SubMenu = function (props) {
    var index = props.index, title = props.title, className = props.className, children = props.children;
    var context = useContext(MenuContext);
    var openedSubMenus = context.defaultOpenSubMenus;
    var isOpen = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    var _a = useState(isOpen), menuOpen = _a[0], setOpen = _a[1];
    var classes = classNames("menu-item submenu-item", className, {
        "is-active": context.index.includes("".concat(index)),
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical',
    });
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var allEvents = (context.mode !== 'vertical' ?
        {
            onClick: handleClick,
            onMouseEnter: function (e) { handleMouse(e, true); },
            onMouseLeave: function (e) { handleMouse(e, false); },
        } :
        {
            onClick: handleClick,
        });
    var renderChildren = function () {
        var subMenuClasses = classNames("better-submenu", {
            "menu-opened": menuOpen,
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: "".concat(index, "-").concat(i),
                });
            }
            else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        });
        return (jsx(Transition, __assign({ in: menuOpen, timeout: 300, animation: "zoom-in-top" }, { children: jsx("ul", __assign({ className: subMenuClasses }, { children: childrenComponent })) })));
    };
    return (jsxs("li", __assign({ className: classes }, allEvents, { children: [jsxs("div", __assign({ className: "submenu-title" }, allEvents, { children: [title, jsx(Icon, { icon: "angle-down", className: "arrow-icon" })] })), renderChildren()] }), index));
};
SubMenu.displayName = 'SubMenu';

var MenuItem = function (props) {
    var index = props.index, className = props.className, disabled = props.disabled, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    var classes = classNames("menu-item", className, {
        "is-disabled": disabled,
        "is-active": context.index === index,
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (jsx("li", __assign({ className: classes, style: style, onClick: handleClick }, { children: children })));
};
MenuItem.defaultProps = {
    disabled: false,
};
MenuItem.displayName = 'MenuItem';

var BetterMenu = Menu;
BetterMenu.Item = MenuItem;
BetterMenu.SubMenu = SubMenu;

/**
 * 进度条，给予用户当前系统执行中任务运行状态的反馈，多用于运行一段时间的场景，有效减轻用户在等待中产生的焦虑感。
 *
 * ~~~js
 * // 这样引用
 * import { BetterProgress } from 'betterui';
 * ~~~
 *
 */
var Progress = function (props) {
    var percent = props.percent, strokeHeight = props.strokeHeight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (jsx("div", __assign({ className: "better-progress-bar", style: styles }, { children: jsx("div", __assign({ className: "better-progress-bar-outer", style: { height: "".concat(strokeHeight, "px") } }, { children: jsx("div", __assign({ className: "better-progress-bar-inner color-".concat(theme), style: { width: "".concat(percent, "%") } }, { children: showText && jsx("span", __assign({ className: "inner-text" }, { children: "".concat(percent, "%") })) })) })) })));
};
Progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary",
};

var SelectContext = createContext({ selectedValues: [] });
/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * // 这样引用，再分别使用 <BetterSelect>，<BetterSelect.Option>
 * import { BetterSelect } from 'betterui';
 * ~~~
 */
var Select = function (props) {
    var defaultValue = props.defaultValue, placeholder = props.placeholder, children = props.children, multiple = props.multiple, name = props.name, disabled = props.disabled, onChange = props.onChange, onVisibleChange = props.onVisibleChange;
    var input = useRef(null);
    var containerRef = useRef(null);
    var containerWidth = useRef(0);
    var _a = useState(Array.isArray(defaultValue) ? defaultValue : []), selectedValues = _a[0], setSelectedValues = _a[1];
    var _b = useState(false), menuOpen = _b[0], setOpen = _b[1];
    var _c = useState(typeof defaultValue === 'string' ? defaultValue : ''), value = _c[0], setValue = _c[1];
    var handleOptionClick = function (value, isSelected) {
        // update value
        if (!multiple) {
            setOpen(false);
            setValue(value);
            if (onVisibleChange) {
                onVisibleChange(false);
            }
        }
        else {
            setValue('');
        }
        var updatedValues = [value];
        // click again to remove selected when is multiple mode
        if (multiple) {
            updatedValues = isSelected ? selectedValues.filter(function (v) { return v !== value; }) : __spreadArray(__spreadArray([], selectedValues, true), [value], false);
            setSelectedValues(updatedValues);
        }
        if (onChange) {
            onChange(value, updatedValues);
        }
    };
    useEffect(function () {
        // focus input
        if (input.current) {
            input.current.focus();
            if (multiple && selectedValues.length > 0) {
                input.current.placeholder = '';
            }
            else {
                if (placeholder)
                    input.current.placeholder = placeholder;
            }
        }
    }, [selectedValues, multiple, placeholder]);
    useEffect(function () {
        if (containerRef.current) {
            containerWidth.current = containerRef.current.getBoundingClientRect().width;
        }
    });
    useClickOutside(containerRef, function () {
        setOpen(false);
        if (onVisibleChange && menuOpen) {
            onVisibleChange(false);
        }
    });
    var passedContext = {
        onSelect: handleOptionClick,
        selectedValues: selectedValues,
        multiple: multiple,
    };
    var handleClick = function (e) {
        e.preventDefault();
        if (!disabled) {
            setOpen(!menuOpen);
            if (onVisibleChange) {
                onVisibleChange(!menuOpen);
            }
        }
    };
    var generateOptions = function () {
        return React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'Option') {
                return React.cloneElement(childElement, {
                    index: "select-".concat(i),
                });
            }
            else {
                console.error("Warning: Select has a child which is not a Option component");
            }
        });
    };
    var containerClass = classNames('better-select', {
        'menu-is-open': menuOpen,
        'is-disabled': disabled,
        'is-multiple': multiple,
    });
    var tempIndex = 0;
    return (jsxs("div", __assign({ className: containerClass, ref: containerRef }, { children: [jsx("div", __assign({ className: "better-select-input", onClick: handleClick }, { children: jsx(Input, { ref: input, placeholder: placeholder, value: value, readOnly: true, icon: "angle-down", disabled: disabled, name: name }) })), jsx(SelectContext.Provider, __assign({ value: passedContext }, { children: jsx(Transition, __assign({ in: menuOpen, animation: "zoom-in-top", timeout: 300 }, { children: jsx("ul", __assign({ className: "better-select-dropdown" }, { children: generateOptions() })) })) })), multiple &&
                jsxs("div", __assign({ className: "better-selected-tags", style: { maxWidth: containerWidth.current - 32 } }, { children: [selectedValues.map(function (value, index) {
                            tempIndex = index;
                            return (jsxs("span", __assign({ className: "better-tag", style: { display: index === 0 ? 'inline-block' : 'none' } }, { children: [value, jsx(Icon, { icon: "times", onClick: function () { handleOptionClick(value, true); } })] }), "tag-".concat(index)));
                        }), jsxs("span", __assign({ className: "better-tag", style: { display: tempIndex === 0 ? 'none' : 'inline-block' } }, { children: ["+", tempIndex] }))] }))] })));
};
Select.defaultProps = {
    name: 'better-select',
    placeholder: '请选择',
};

var Option = function (_a) {
    var value = _a.value, label = _a.label, disabled = _a.disabled, children = _a.children, index = _a.index;
    var _b = useContext(SelectContext), onSelect = _b.onSelect, selectedValues = _b.selectedValues, multiple = _b.multiple;
    var isSelected = selectedValues.includes(value);
    var classes = classNames('better-select-item', {
        'is-disabled': disabled,
        'is-selected': isSelected,
    });
    var handleClick = function (e, value, isSelected) {
        e.preventDefault();
        if (onSelect && !disabled) {
            onSelect(value, isSelected);
        }
    };
    return (jsxs("li", __assign({ className: classes, onClick: function (e) { handleClick(e, value, isSelected); } }, { children: [children || (label ? label : value), multiple && isSelected && jsx(Icon, { icon: "check" })] }), index));
};
Option.displayName = 'Option';

var BetterSelect = Select;
BetterSelect.Option = Option;

/**
 * 用于承载同一层级下不同页面或类别的组件，方便用户在同一个页面框架下进行快速切换。
 *
 * ~~~js
 * // 这样引用，再分别使用 <BetterTabs>，<BetterTabs.Item>
 * import { BetterTabs } from 'betterui';
 * ~~~
 *
 */
var Tabs = function (props) {
    var defaultIndex = props.defaultIndex, className = props.className, onSelect = props.onSelect, children = props.children, type = props.type;
    var _a = useState(defaultIndex), activeIndex = _a[0], setActiveIndex = _a[1];
    var handleClick = function (e, index, disabled) {
        if (!disabled) {
            setActiveIndex(index);
            if (onSelect) {
                onSelect(index);
            }
        }
    };
    var navClass = classNames('better-tabs-nav', {
        'nav-line': type === 'line',
        'nav-card': type === 'card',
    });
    var renderNavLinks = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var _a = childElement.props, label = _a.label, disabled = _a.disabled;
            var classes = classNames('better-tabs-nav-item', {
                'is-active': activeIndex === index,
                'disabled': disabled,
            });
            return (jsx("li", __assign({ className: classes, onClick: function (e) { handleClick(e, index, disabled); } }, { children: label }), "nav-item-".concat(index)));
        });
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, index) {
            if (index === activeIndex) {
                return child;
            }
        });
    };
    return (jsxs("div", __assign({ className: "better-tabs ".concat(className) }, { children: [jsx("ul", __assign({ className: navClass }, { children: renderNavLinks() })), jsx("div", __assign({ className: "better-tabs-content" }, { children: renderContent() }))] })));
};
Tabs.defaultProps = {
    defaultIndex: 0,
    type: 'line',
};

var TabItem = function (_a) {
    var children = _a.children;
    return (jsx("div", __assign({ className: "better-tab-panel" }, { children: children })));
};

var BetterTabs = Tabs;
BetterTabs.Item = TabItem;

var Dragger = function (props) {
    var onFile = props.onFile, children = props.children;
    var _a = useState(false), dragOver = _a[0], setDragOver = _a[1];
    var betterClass = classNames('better-uploader-dragger', {
        'is-dragover': dragOver,
    });
    var handleDrop = function (e) {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    var handleDrag = function (e, over) {
        e.preventDefault();
        setDragOver(over);
    };
    return (jsx("div", __assign({ className: betterClass, onDragOver: function (e) { handleDrag(e, true); }, onDragLeave: function (e) { handleDrag(e, false); }, onDrop: handleDrop }, { children: children })));
};

var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (jsx("div", __assign({ className: "better-upload-list" }, { children: fileList.map(function (item) {
            return (jsxs("li", __assign({ className: "better-upload-list-item" }, { children: [jsxs("span", __assign({ className: "file-name file-name-".concat(item.status) }, { children: [jsx(Icon, { icon: "file-alt", theme: "secondary" }), jsx("span", { children: item.name })] })), jsxs("span", __assign({ className: "file-status" }, { children: [(item.status === 'uploading' || !item.status) && jsx(Icon, { icon: "spinner", spin: true, theme: "primary" }), item.status === 'success' && jsx(Icon, { icon: "check-circle", theme: "success" }), item.status === 'error' && jsx(Icon, { icon: "times-circle", theme: "danger" })] })), jsx("span", __assign({ className: "file-actions" }, { children: jsx(Icon, { icon: "times", onClick: function () { onRemove(item); } }) })), item.status === 'uploading' && jsx(Progress, { percent: item.percent || 0 })] }), item.uid));
        }) })));
};

/**
 * 通过点击或者拖拽上传文件。
 *
 * ~~~js
 * // 这样引用
 * import { BetterUpload } from 'betterui';
 * ~~~
 *
 */
var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, headers = props.headers, name = props.name, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj) {
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios.post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var _a;
                var percentage = Math.round((e.loaded * 100) / ((_a = e.total) !== null && _a !== void 0 ? _a : 1)) || 0;
                if (percentage < 100) {
                    updateFileList(_file, {
                        percent: percentage,
                        status: 'uploading',
                    });
                    if (onProgress) {
                        onProgress(percentage, _file);
                    }
                }
            }
        }).then(function (res) {
            updateFileList(_file, {
                status: 'success',
                response: res.data
            });
            if (onSuccess) {
                onSuccess(res.data, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        }).catch(function (err) {
            updateFileList(_file, {
                status: 'error',
                error: err,
            });
            if (onError) {
                onError(err, _file);
            }
            if (onChange) {
                onChange(_file);
            }
        });
    };
    return (jsxs("div", __assign({ className: 'better-upload-component', style: { display: 'inline-block' }, onClick: handleClick }, { children: [drag ? jsx(Dragger, __assign({ onFile: function (files) { uploadFiles(files); } }, { children: children })) : children, jsx("input", { type: "file", className: "better-file-input", ref: fileInput, style: { display: 'none' }, onChange: handleChange, accept: accept, multiple: multiple }), jsx(UploadList, { fileList: fileList, onRemove: handleRemove })] })));
};
Upload.defaultProps = {
    name: 'file',
};

library.add(fas);

export { Alert as BetterAlert, AutoComplete as BetterAutoComplete, Button as BetterButton, BetterForm, Icon as BetterIcon, Input as BetterInput, BetterMenu, Progress as BetterProgress, BetterSelect, BetterTabs, Transition as BetterTransition, Upload as BetterUpload };
