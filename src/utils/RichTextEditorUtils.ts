import { EditorState } from "draft-js";
import { setBlockData, setBlocksData } from "./blockUtils";

const RichTextEditorUtils = {
  toggleTextAlign(editorState: EditorState,
    value: string,
    ignoreSelection = false) {
      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();
      const blockData = { textAlign: value };
    
      if (ignoreSelection) {
        const contentBlocks = contentState.getBlocksAsArray();
    
        if (!contentBlocks.length) {
          return null;
        }
    
        return setBlocksData(
          editorState,
          contentState,
          contentBlocks[0].getKey(),
          contentBlocks[contentBlocks.length - 1].getKey(),
          blockData
        );
      } else {
        return setBlockData(editorState, contentState, selectionState, blockData);
      }
  },

  getCurrentTextAlign (editorState: EditorState): Immutable.Map<any, any> {
    return editorState
      .getCurrentContent()
      .getBlockForKey(editorState.getSelection().getStartKey())
      .getData();
  }
};

export default RichTextEditorUtils;