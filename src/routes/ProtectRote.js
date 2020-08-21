import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectRoute({component: Component}) {
    return (
      
        <>
            <Route render={() => (
                localStorage.getItem('authToken') !== null
                    ? <Component />
                    : <Redirect to='/' />
            )} />
        </>
    );
}
