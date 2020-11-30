import {
  RawDraftContentState,
  RawDraftContentBlock,
  RawDraftInlineStyleRange,
  DraftInlineStyleType,
} from 'draft-js';

export interface InlineStyleRanges {
  index: number;
  inlineStyle: DraftInlineStyleType;
}

type TagType = 'opening' | 'closing';

export const draftToHtml = (
  rawDraftContentState: RawDraftContentState
): string => {
  // const html = rawDraftContentState.blocks.map(block => {
  //     if (!!block.inlineStyleRanges.length) {
  //         return addInline(block);
  //     }
  // });

  //return html.join('');
  console.log(rawDraftContentState);
  console.log(addInlineStyles(rawDraftContentState.blocks[0]));
  return '';
};

export const getInlineStyleRanges = (
  inlineStyleRanges: Array<RawDraftInlineStyleRange>,
  tagType: TagType
): InlineStyleRanges[] => {
  return inlineStyleRanges
    .map(({ offset, style, length }) => {
      const index = tagType === 'opening' ? offset : offset + (length - 1);

      return {
        index,
        inlineStyle: style,
      };
    })
    .sort((a, b) => a.index - b.index);
};

export const addInlineStyles = (block: RawDraftContentBlock): void => {
  const openingTags = getInlineStyleRanges(block.inlineStyleRanges, 'opening');
  const closingTags = getInlineStyleRanges(block.inlineStyleRanges, 'closing');
  const textArray = Array.from(block.text);
  let decale = 1;

  openingTags.forEach(({ index, inlineStyle }, key) => {
    textArray.splice(index + key, 0, getInlineStyleTag(inlineStyle, 'opening'));
  });

  closingTags.forEach(({ index, inlineStyle }, key) => {
    textArray.splice(
      index + key + decale + 1,
      0,
      getInlineStyleTag(inlineStyle, 'closing')
    );
    decale += 2;
  });

  console.log(textArray);
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
