import Menu from './menu';
import SubMenu from './subMenu';
import MenuItem from './menuItem';
var BetterMenu = Menu;
BetterMenu.Item = MenuItem;
BetterMenu.SubMenu = SubMenu;
export default BetterMenu;
