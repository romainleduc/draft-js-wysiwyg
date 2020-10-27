import React from 'react';

const Demo = ({ component, raw }: { component: any, raw: string}): JSX.Element => {
    const Component = component;

    return (
        <div className='test'>
            <p>ici le test</p>
            {<Component />}
            <p>{raw}</p>
        </div>
    );
}

export default Demo;