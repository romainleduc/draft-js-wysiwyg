var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useContext, useEffect, forwardRef } from 'react';
import { ToggleButton } from '@material-ui/lab';
import EditorContext from './EditorContext';
import { EditorState, RichUtils } from 'draft-js';
var InlineToggleButton = forwardRef(function (_a, ref) {
    var value = _a.value, selected = _a.selected, children = _a.children, rest = __rest(_a, ["value", "selected", "children"]);
    var _b = useContext(EditorContext) || {}, editorState = _b.editorState, setEditorState = _b.setEditorState;
    useEffect(function () {
        if (selected) {
            handleClick();
        }
    }, []);
    // Synchronize selection with keyboard shortcuts
    var synchronizeSelection = function () {
        if (editorState && setEditorState) {
            if (editorState.getCurrentContent().hasText()) {
                var hasValue = editorState
                    .getCurrentInlineStyle()
                    .has(value);
                return (hasValue && !selected) || (!hasValue && selected)
                    ? !selected
                    : selected;
            }
        }
        return selected;
    };
    var handleClick = function () {
        if (editorState && setEditorState) {
            setEditorState(RichUtils.toggleInlineStyle(EditorState.forceSelection(editorState, editorState.getSelection()), value));
        }
    };
    return (<ToggleButton ref={ref} onClick={handleClick} selected={synchronizeSelection()} value={value} {...rest}>
                {children}
            </ToggleButton>);
});
export default InlineToggleButton;
