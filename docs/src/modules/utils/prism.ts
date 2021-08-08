import * as Prism from 'prismjs';

// Prism.plugins.customClass.add(
//   ({ content, language }: { content: string; language: string }) => {
//     if (
//       /^(import|export|from|return|default|if|else)$/g.test(content) &&
//       /^(js|jsx)$/g.test(language)
//     ) {
//       return 'special';
//     }
//   }
// );

const highlight = (code: string, language: string): string => {
  return Prism.highlight(code, Prism.languages[language], language);
};

export default highlight;
