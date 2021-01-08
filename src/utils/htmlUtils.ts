import {
  RawDraftInlineStyleRange,
  DraftInlineStyleType,
  ContentState,
  convertToRaw,
} from 'draft-js';

export interface InlineStyleRanges {
  start: number;
  end: number;
  length: number;
  tag: string;
  inlineStyle: DraftInlineStyleType;
}

type TagType = 'opening' | 'closing';

export const draftToHtml = (contentState: ContentState): string => {
  let html = '';

  convertToRaw(contentState).blocks.forEach(({ text, inlineStyleRanges }) => {
    if (text.length) {
      html += `<p>${insertInlineStyleTags(text, inlineStyleRanges)}</p>`;
    }
  });

  return html;
};

export const insertInlineStyleTags = (
  text: string,
  inlineStyleRanges: RawDraftInlineStyleRange[]
): string => {
  const textToArray = Array.from(text);
  const styleSorted = inlineStyleRanges.sort((a, b) => a.offset - b.offset);

  let depth = 1;

  styleSorted.forEach(({ offset, style }, key) => {
    depth += 1;
    textToArray.splice(offset + key, 0, getInlineStyleTag(style, 'opening'));
  });

  styleSorted.forEach(({ offset, length, style }, key) => {
    textToArray.splice(
      offset + (length - 1) + key + depth,
      0,
      getInlineStyleTag(style, 'closing')
    );
  });

  return textToArray.join('');
};

export const getInlineStyleTag = (
  inlineStyle: string,
  tagType: TagType
): string => {
  let tag = '';

  switch (inlineStyle) {
    case 'BOLD':
      tag = 'strong';
      break;
    case 'ITALIC':
      tag = 'em';
      break;
    case 'STRIKETHROUGH':
      tag = 'del';
      break;
    case 'UNDERLINE':
      tag = 'ins';
      break;
    case 'CODE':
      tag = 'code';
      break;
    case 'SUPERSCRIPT':
      tag = 'sup';
      break;
    case 'SUBSCRIPT':
      tag = 'sub';
      break;
    default:
      break;
  }

  return tagType === 'opening' ? `<${tag}>` : `</${tag}>`;
};
