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
import React, { useContext } from 'react';
import { Editor, RichUtils, getDefaultKeyBinding } from 'draft-js';
import EditorContext from './EditorContext';
import { mergeBlockData, indentSelection, outdentSelection } from './utils';
var EditorDraft = function (_a) {
    var acceptCommands = _a.acceptCommands, rest = __rest(_a, ["acceptCommands"]);
    var _b = useContext(EditorContext) || {}, editorState = _b.editorState, setEditorState = _b.setEditorState;
    var editor = React.useRef(null);
    var focusEditor = function () {
        setTimeout(function () {
            editor.current.focus();
        }, 0);
    };
    React.useEffect(function () {
        focusEditor();
    }, []);
    var handleKeyCommand = function (command, editorState) {
        if (!acceptCommands || acceptCommands.includes(command)) {
            var newState = RichUtils.handleKeyCommand(editorState, command);
            if (newState && setEditorState) {
                setEditorState(newState);
                return 'handled';
            }
        }
        return 'not-handled';
    };
    var handleReturn = function () {
        if (editorState && setEditorState) {
            var contentState = editorState.getCurrentContent();
            var startKey = editorState.getSelection().getStartKey();
            if (contentState) {
                setEditorState(mergeBlockData(editorState, contentState, startKey));
                return "handled";
            }
        }
        return "not-handled";
    };
    var blockStyleFn = function (contentBlock) {
        var _a;
        var textAlign = (_a = contentBlock.getData()) === null || _a === void 0 ? void 0 : _a.get('textAlign');
        if (textAlign) {
            return "align-" + textAlign;
        }
        return '';
    };
    var keyBindingFn = function (e) {
        if (editorState && setEditorState) {
            var contentState = editorState.getCurrentContent();
            if (e.shiftKey) {
                switch (e.key) {
                    case 'Tab':
                        e.preventDefault();
                        setEditorState(outdentSelection(editorState, contentState));
                        return null;
                }
            }
            else {
                switch (e.key) {
                    case 'Tab':
                        e.preventDefault();
                        setEditorState(indentSelection(editorState, contentState));
                        return null;
                }
            }
        }
        return getDefaultKeyBinding(e);
    };
    return (<div onClick={focusEditor}>
            <Editor ref={editor} editorState={editorState} onChange={setEditorState} handleKeyCommand={handleKeyCommand} handleReturn={handleReturn} blockStyleFn={blockStyleFn} keyBindingFn={keyBindingFn} {...rest}/>
        </div>);
};
export default EditorDraft;
