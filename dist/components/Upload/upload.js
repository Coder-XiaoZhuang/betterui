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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Dragger from './dragger';
import UploadList from './uploadList';
;
;
/**
 * 通过点击或者拖拽上传文件。
 *
 * ~~~js
 * // 这样引用
 * import { BetterUpload } from 'betterui';
 * ~~~
 *
 */
export var Upload = function (props) {
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
    return (React.createElement("div", { className: 'better-upload-component', style: { display: 'inline-block' }, onClick: handleClick },
        drag ? React.createElement(Dragger, { onFile: function (files) { uploadFiles(files); } }, children) : children,
        React.createElement("input", { type: "file", className: "better-file-input", ref: fileInput, style: { display: 'none' }, onChange: handleChange, accept: accept, multiple: multiple }),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {
    name: 'file',
};
export default Upload;
