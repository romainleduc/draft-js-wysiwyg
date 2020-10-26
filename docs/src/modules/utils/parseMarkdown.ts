import marked from 'marked';

const headerRegExp = /---[\r\n]([\s\S]*)[\r\n]---/;
const descriptionRegExp = /<p class="description">(.*)<\/p>/s;
const headerKeyValueRegExp = /(.*?): (.*)/g;

/**
 * Extract title page from the top of the markdown.
 * For instance, the following input:
 *
 * ---
 * title: Backdrop React Component
 * ---
 *
 * # Backdrop
 *
 * should output: 'Backdrop React Component'
 */
const getTitle = (markdown: string): string => {
    const header = markdown.match(headerRegExp);

    if (header && header[1]) {
        const title = headerKeyValueRegExp.exec(header[1])?.[2];

        if (title) {
            return title;
        }
    }

    throw new Error('Missing title in the page');
};

const getDescription = (markdown: string): string => {
    const matches = markdown.match(descriptionRegExp);

    if (!matches || !matches[1]) {
        throw new Error('Missing description in the page');
    }

    return matches[1].trim();
};

export const prepareMarkdown = (
    markdown: string
): {
    title: string;
    description: string;
    md: string;
} => {
    return {
        title: getTitle(markdown),
        description: getDescription(markdown),
        md: marked(markdown),
    };
};
