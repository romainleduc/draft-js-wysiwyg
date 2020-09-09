import { RichUtils } from 'draft-js';

export const toggleInlineStyle = (editorState, setEditorState, inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
}