import React from 'react';

const WysiwygEditorToolbar = ({
    itemsProps,
    ...props
}) => (
    <div className='toolbar'>
        {itemsProps &&
            itemsProps.map((item, itemKey) =>
                <div key={`items-wrapper-${itemKey}`} className={item.className}>
                    {item.components.map((component, componentKey) =>
                        React.cloneElement(
                            component,
                            {
                                key: `component-${componentKey}`,
                                ...props,
                            }
                        )
                    )}
                </div>
            )}
    </div>
);

export default WysiwygEditorToolbar;
