import React from 'react';

const WysiwygEditorToolbar = ({
    itemsProps,
    ...props
}) => {
    return (
        <div className='toolbar'>
            {itemsProps &&
                itemsProps.map((item, itemKey) =>
                    <div key={`items-wrapper-${itemKey}`} className={item.className}>
                        {item.components.map((component, componentKey) =>
                            React.cloneElement(component, { key: `component-${componentKey}`, ...props })
                        )}
                    </div>
                )}
        </div>
    );
}

WysiwygEditorToolbar.propTypes = propTypes;
export default WysiwygEditorToolbar;
