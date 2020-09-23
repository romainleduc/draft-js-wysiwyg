import React from 'react';
import { ToggleButtonGroup } from '@material-ui/lab';
import { InlineToggleButton } from './InlineToggleButton';
import { BlockTypeToggleButton } from './BlockTypeToggleButton';
import { TextAlignToggleButton } from './TextAlignToggleButton';
import defaultToolbar from './defaultToolbar';

export const PrefabToggleButton = ({
    type,
    options,
    toggleButtonGroupProps,
    customOptions,
}) => {
    const components = {
        inline: <InlineToggleButton />,
        blockType: <BlockTypeToggleButton />,
        textAlign: <TextAlignToggleButton />,
    };

    const customProps = (name) => {
        return customOptions
            ?.find(option => option.name === name)
            ?.toggleButtonProps;
    }

    const customDefault = (name) => {
        return customOptions
            ?.find(option => option.name === name)
            ?.default;
    }

    return (
        <ToggleButtonGroup {...toggleButtonGroupProps}>
            {options.map(option => {
                return React.cloneElement(
                    components[type],
                    {
                        value: option,
                        ...customProps(option)
                    },
                    [customDefault(option) || defaultToolbar.getDefault(type, option)]
                );
            })}
        </ToggleButtonGroup>
    );
};
