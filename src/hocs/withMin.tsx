import React from 'react';
import useMin from '../hooks/useMin'

function withMin(WrappedComponent: React.ComponentType<any>) {
    return (props: any) => {
        const {ismin} = useMin();

        return <WrappedComponent {...props} ismin={ismin} />;
    };
}

export default withMin;
