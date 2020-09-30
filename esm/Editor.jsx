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
import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import EditorContext from './EditorContext';
var Editor = function (_a) {
    var className = _a.className, children = _a.children, editorState = _a.editorState, onEditorStateChange = _a.onEditorStateChange, props = __rest(_a, ["className", "children", "editorState", "onEditorStateChange"]);
    var init = function () {
        if (!editorState || !onEditorStateChange) {
            var _a = useState(EditorState.createEmpty()), state = _a[0], setState = _a[1];
            return {
                editorState: state,
                setEditorState: setState
            };
        }
        return {
            editorState: editorState,
            setEditorState: onEditorStateChange,
        };
    };
    return (<EditorContext.Provider value={init()}>
            <div {...props}>
                {children}
                
            </div>
        </EditorContext.Provider>);
};
export default Editor;
