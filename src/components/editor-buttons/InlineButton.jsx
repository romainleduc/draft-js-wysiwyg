import React from 'react';
import PropTypes from 'prop-types';
import { RichUtils } from 'draft-js';
import { EditorButton } from './EditorButton';

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

    /** */
    inlineStyle: PropTypes.string.isRequired,
};

export const InlineButton = ({
    editorState,
    onChange,
    inlineStyle,
    ...rest
}) => {

    const toggleInlineStyle = () => {
        onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }

    return (
        <EditorButton
            onClick={toggleInlineStyle}
            {...rest}
        />
    );
};

InlineButton.propTypes = propTypes;
