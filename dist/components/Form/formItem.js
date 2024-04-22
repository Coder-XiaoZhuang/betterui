var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { FormContext } from './form';
;
export var FormItem = function (props) {
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
    return (React.createElement("div", { className: rowClass },
        label &&
            React.createElement("div", { className: 'better-form-item-label' },
                React.createElement("label", { className: labelClass, title: label }, label)),
        React.createElement("div", { className: 'better-form-item' },
            React.createElement("div", { className: itemClass }, returnChildNode),
            hasError &&
                React.createElement("div", { className: 'better-form-item-explain' },
                    React.createElement("span", null, (_a = errors[0]) === null || _a === void 0 ? void 0 : _a.message)))));
};
FormItem.defaultProps = {
    valuePropName: 'value',
    trigger: 'onChange',
    validateTrigger: 'onBlur',
    getValueFromEvent: function (e) { return e.target.value; },
};
export default FormItem;
