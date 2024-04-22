import React from 'react';
import { Header } from './Header';
import './page.css';
export var Page = function () {
    var _a = React.useState(), user = _a[0], setUser = _a[1];
    return (React.createElement("article", null,
        React.createElement(Header, { user: user, onLogin: function () { return setUser({ name: 'Jane Doe' }); }, onLogout: function () { return setUser(undefined); }, onCreateAccount: function () { return setUser({ name: 'Jane Doe' }); } }),
        React.createElement("section", null,
            React.createElement("h2", null, "Pages in Storybook"),
            React.createElement("p", null,
                "We recommend building UIs with a",
                ' ',
                React.createElement("a", { href: "https://componentdriven.org", target: "_blank", rel: "noopener noreferrer" },
                    React.createElement("strong", null, "component-driven")),
                ' ',
                "process starting with atomic components and ending with pages."),
            React.createElement("p", null, "Render pages with mock data. This makes it easy to build and review page states without needing to navigate to them in your app. Here are some handy patterns for managing page data in Storybook:"),
            React.createElement("ul", null,
                React.createElement("li", null, "Use a higher-level connected component. Storybook helps you compose such data from the \"args\" of child component stories"),
                React.createElement("li", null, "Assemble data in the page component from your services. You can mock these services out using Storybook.")),
            React.createElement("p", null,
                "Get a guided tutorial on component-driven development at",
                ' ',
                React.createElement("a", { href: "https://storybook.js.org/tutorials/", target: "_blank", rel: "noopener noreferrer" }, "Storybook tutorials"),
                ". Read more in the",
                ' ',
                React.createElement("a", { href: "https://storybook.js.org/docs", target: "_blank", rel: "noopener noreferrer" }, "docs"),
                "."),
            React.createElement("div", { className: "tip-wrapper" },
                React.createElement("span", { className: "tip" }, "Tip"),
                " Adjust the width of the canvas with the",
                ' ',
                React.createElement("svg", { width: "10", height: "10", viewBox: "0 0 12 12", xmlns: "http://www.w3.org/2000/svg" },
                    React.createElement("g", { fill: "none", fillRule: "evenodd" },
                        React.createElement("path", { d: "M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z", id: "a", fill: "#999" }))),
                "Viewports addon in the toolbar"))));
};
