import React from 'react';
import hasPermission from 'utils/adminPermission/hasPermission';
import NoPermission from './NoPermission';

export default function PermittedRoute({ component: Component, ...rest }) {
    const isPermitted = hasPermission(rest.permissions);
    if (isPermitted) {
        return <Component />;
    }
    return <NoPermission />;
}
