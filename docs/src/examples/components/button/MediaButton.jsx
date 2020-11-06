import React, { useState } from 'react';
import { MediaButton as MediaButtonDraft, EditorContainer, EditorToolbar, Editor, InlineToggleButton, IndentDraftButton } from 'draft-js-wysiwyg';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    zIndex: 1,
  }
});


const MediaButton = () => {

  return (
    <EditorContainer>
      <EditorToolbar>
        {/* <IndentDraftButton value='increase'>
          zqqzdzqdzq
        </IndentDraftButton> */}
        <InlineToggleButton value='BOLD'>
          ssss
        </InlineToggleButton>
        <MediaButtonDraft
          mediaType='image'
          size='small'
          color='primary'
          variant='contained'
          imgProps={{
            src: '',
          }}
        >
          Add the preloaded image
        </MediaButtonDraft>
      </EditorToolbar>
      <Editor placeholder='Enter some text..' />
    </EditorContainer>
  );
}

export default MediaButton;