import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Button from './components/Button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon';
import Transition from './components/Transition';
library.add(fas);
function App() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Icon, { icon: "coffee", theme: "primary", size: "10x" }),
            React.createElement(Menu, { defaultIndex: "0", onSelect: function (index) { return alert(index); }, mode: "horizontal" },
                React.createElement(MenuItem, null, "cool link"),
                React.createElement(MenuItem, { disabled: true }, "cool link 2"),
                React.createElement(SubMenu, { title: 'dropdown' },
                    React.createElement(MenuItem, null, "dropdown1"),
                    React.createElement(MenuItem, null, "dropdown2")),
                React.createElement(MenuItem, null, "cool link 3")),
            React.createElement(Button, { size: "lg", btnType: 'primary', onClick: function () { return setShow(!show); } }, show ? 'close' : 'open'),
            React.createElement(Transition, { in: show, timeout: 300, animation: "zoom-in-left" },
                React.createElement("div", null, "hi, I am better")),
            React.createElement(Transition, { in: show, timeout: 300, animation: "zoom-in-left", wrapper: true },
                React.createElement("div", null,
                    React.createElement(Button, { size: "lg", btnType: 'primary' }, "better btn"))))));
}
export default App;
