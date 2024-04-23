import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import BetterButton from './components/Button';
import BetterMenu from './components/Menu';
import BetterIcon from './components/Icon';
import BetterTransition from './components/Transition';
library.add(fas);
function App() {
    var _a = useState(false), show = _a[0], setShow = _a[1];
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(BetterIcon, { icon: "coffee", theme: "primary", size: "10x" }),
            React.createElement(BetterMenu, { defaultIndex: "0", onSelect: function (index) { return alert(index); }, mode: "horizontal" },
                React.createElement(BetterMenu.Item, null, "cool link"),
                React.createElement(BetterMenu.Item, { disabled: true }, "cool link 2"),
                React.createElement(BetterMenu.SubMenu, { title: 'dropdown' },
                    React.createElement(BetterMenu.Item, null, "dropdown1"),
                    React.createElement(BetterMenu.Item, null, "dropdown2")),
                React.createElement(BetterMenu.Item, null, "cool link 3")),
            React.createElement(BetterButton, { size: "lg", btnType: 'primary', onClick: function () { return setShow(!show); } }, show ? 'close' : 'open'),
            React.createElement(BetterTransition, { in: show, timeout: 300, animation: "zoom-in-left" },
                React.createElement("div", null, "hi, I am better")),
            React.createElement(BetterTransition, { in: show, timeout: 300, animation: "zoom-in-left", wrapper: true },
                React.createElement("div", null,
                    React.createElement(BetterButton, { size: "lg", btnType: 'primary' }, "better btn"))))));
}
export default App;
