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
import React, { useContext, useEffect, forwardRef, } from 'react';
import { ToggleButton, } from '@material-ui/lab';
import EditorContext from './EditorContext';
import { setBlockData, setAllBlocksData, } from './utils';
var TextAlignToggleButton = forwardRef(function (_a, ref) {
    var selected = _a.selected, value = _a.value, children = _a.children, ignoreSelection = _a.ignoreSelection, rest = __rest(_a, ["selected", "value", "children", "ignoreSelection"]);
    var _b = useContext(EditorContext) || {}, editorState = _b.editorState, setEditorState = _b.setEditorState;
    useEffect(function () {
        if (selected) {
            handleClick();
        }
    }, []);
    var handleClick = function () {
        if (editorState && setEditorState) {
            var contentState = editorState.getCurrentContent();
            var selectionState = editorState.getSelection();
            var blockData = { textAlign: value };
            if (ignoreSelection) {
                setEditorState(setAllBlocksData(editorState, contentState, blockData));
            }
            else {
                setEditorState(setBlockData(editorState, contentState, selectionState, blockData));
            }
        }
    };
    return (<ToggleButton ref={ref} selected={selected} onClick={handleClick} value={value} {...rest}>
                {children}
            </ToggleButton>);
});
export default TextAlignToggleButton;
