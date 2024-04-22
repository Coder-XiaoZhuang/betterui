import React from 'react';
import './header.css';
type User = {
    name: string;
};
interface HeaderProps {
    user?: User;
    onLogin: () => void;
    onLogout: () => void;
    onCreateAccount: () => void;
}
export declare const Header: ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => React.JSX.Element;
export {};
