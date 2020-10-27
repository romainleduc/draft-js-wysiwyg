import * as Prism from 'prismjs';

Prism.plugins.customClass.add(
    ({
        content,
        type,
        language,
    }: {
        content: string;
        type: string;
        language: string;
    }) => {
        console.log(type);
        if (
            /^(import|export|from|return)$/g.test(content) &&
            /^(js|jsx)$/g.test(language)
        ) {
            return 'special-import';
        }
    }
);

const highlight = (code: string, language: string): string => {
    return Prism.highlight(code, Prism.languages[language], language);
};

export default highlight;
