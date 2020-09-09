import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

const propTypes = {
    /**
     * The color of the component
     *
     * @default 'default'
     * @type {'default' | 'inherit' | 'primary' | 'secondary'}
     */
    color: PropTypes.string,

    /**
     * If true, the button will be disabled.
     * 
     * @default false
     */
    disabled: PropTypes.bool,

    /**
     * If true, the keyboard focus ripple will be disabled.
     * 
     * @default false
     */
    disableFocusRipple: PropTypes.bool,

    /**
     * If true, the ripple effect will be disabled.
     *
     * @default false 
     */
    disableRipple: PropTypes.bool,

    /**
     * If given, uses a negative margin to counteract the padding on one side
     * (this is often helpful for aligning the left or right side of the icon
     * with content above or below, without ruining the border size and shape).
     *
     * @type {'start' | 'end' | false}
     */
    edge: PropTypes.any,

    /**
     * The size of the button. small is equivalent to the dense button styling.
     *
     * @default 'small'
     * @type {'small' | 'medium'}
     */
    size: PropTypes.string,

    /** Element placed before the children. */
    startIcon: PropTypes.node,

    /** Element placed after the children. */
    endIcon: PropTypes.node,

    /**
     * If true, the button will take up the full width of its container.
     * 
     * @default false
     */
    fullWidth: PropTypes.bool,

    /**
     * @default 'text'
     * @type {'contained' | 'outlined' | 'text'}
     */
    variant: PropTypes.string,
};

const defaultProps = {
    color: 'default',
    disabled: false,
    disableFocusRipple: false,
    disableRipple: false,
    size: 'small',
    fullWidth: false,
    variant: 'text',
};

export const EditorButton = ({
    className,
    children,
    startIcon,
    endIcon,
    fullWidth,
    variant,
    ...rest
}) => {
    return (
        <>
            {startIcon || endIcon ?
                <Button
                    className={className}
                    fullWidth={fullWidth}
                    startIcon={startIcon}
                    endIcon={endIcon}
                    variant={variant}
                    {...rest}
                >
                    {children}
                </Button> :
                <IconButton
                    className={className}
                    {...rest}
                >
                    {children}
                </IconButton>
            }
        </>
    );
};

EditorButton.propTypes = propTypes;
EditorButton.defaultProps = defaultProps;
