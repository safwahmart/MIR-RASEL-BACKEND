import { useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import useConfig from 'hooks/useConfig';
import LAYOUT_CONST from 'constant';
import { HORIZONTAL_MAX_ITEM } from 'config';
import hasPermission from 'utils/adminPermission/hasPermission';
import { useState } from 'react';
import menuItems from 'menu-items';

// ==============================|| SIDEBAR MENU LIST ||============================== //
const MenuList = () => {
    const theme = useTheme();
    const { layout } = useConfig();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const [updatedMenuItem, setUpdatedMenuItem] = useState([]);
    console.log('menuItems', menuItems.items[1].children[4])
    const handlerMenuItem = async () => {
        let allRoutes = {
            items: menuItems.items.map((group) => {
                console.log('group', group)
                const filteredChildren = group.children.filter((item) => {
                    // return true;
                    // if (item.permission !== undefined) {
                    const childPermission = hasPermission(item);
                    if (item.id === 'User') {
                        console.log('new permission', childPermission)
                    }
                    // return Array.isArray(childPermission) === true && childPermission.filter(res => {
                    //     if (res === true) {
                    //         return true
                    //     } else {
                    //         return false
                    //     }
                    // })
                    return childPermission
                    // return true; // Include items without permission array
                });
                console.log('filteredChildren', filteredChildren)
                return { ...group, children: filteredChildren };
            })
        };
        setUpdatedMenuItem(allRoutes);
    };

    useEffect(() => {
        handlerMenuItem();
    }, []);

    if (updatedMenuItem) {
        // last menu-item to show in horizontal menu bar
        const lastItem = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd ? HORIZONTAL_MAX_ITEM : null;
        let lastItemIndex = updatedMenuItem?.items?.length - 1;
        let remItems = [];
        let lastItemId;

        if (lastItem && lastItem < updatedMenuItem && updatedMenuItem?.items?.length) {
            lastItemId = updatedMenuItem?.items[lastItem - 1].id;
            lastItemIndex = lastItem - 1;
            remItems = updatedMenuItem?.items?.slice(lastItem - 1, updatedMenuItem?.items?.length).map((item) => ({
                title: item.title,
                elements: item.children
            }));
        }

        const navItems = updatedMenuItem?.items?.slice(0, lastItemIndex + 1).map((item) => {
            if (item) {
                return <NavGroup key={item.id} item={item} lastItem={lastItem} remItems={remItems} lastItemId={lastItemId} />;
            }
        });

        return <>{navItems}</>;
    }
};

export default MenuList;
