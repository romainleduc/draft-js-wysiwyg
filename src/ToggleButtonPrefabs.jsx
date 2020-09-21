import React from 'react';
import { ToggleButtonGroup } from '@material-ui/lab';
import { ToggleButtonInline } from './ToggleButtonInline';
import { ToggleButtonBlockType } from './ToggleButtonBlockType';
import defaultToolbar from './defaultToolbar';

export const ToggleButtonPrefabs = ({
    type,
    options,
    toggleButtonGroupProps,
    customOptions,
}) => {
    const components = {
        inline: <ToggleButtonInline />,
        blockType: <ToggleButtonBlockType />,
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
