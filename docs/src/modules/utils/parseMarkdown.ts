import marked from 'marked';

const headerRegExp = /---[\r\n]([\s\S]*)[\r\n]---/;
const descriptionRegExp = /<p class="description">(.*)<\/p>/s;
const headerKeyValueRegExp = /(.*?): (.*)/g;
const emptyRegExp = /^\s*$/;

/**
 * Extract information from the top of the markdown.
 * For instance, the following input:
 *
 * ---
 * title: Backdrop React Component
 * components: Backdrop
 * ---
 *
 * # Backdrop
 *
 * should output:
 * { title: 'Backdrop React Component', components: ['Backdrop'] }
 */
const getHeaders = (markdown: string) => {
    const header = markdown.match(headerRegExp);

    if (!header || !header[1]) {
        return undefined;
    }

    let regexMatches;
    const headers = {} as any;

    // eslint-disable-next-line no-cond-assign
    while ((regexMatches = headerKeyValueRegExp.exec(header[1])) !== null) {
        const key = regexMatches[1];
        const value = regexMatches[2].replace(/(.*)/, '$1');

        if (value[0] === '[') {
            // Need double quotes to JSON parse.
            headers[key] = JSON.parse(value.replace(/'/g, '"'));
        } else {
            // Remove trailing single quote yml escaping.
            headers[key] = value.replace(/^'|'$/g, '');
        }
    }

    return headers;
};

const getTitle = (markdown: string): string => {
    const title = getHeaders(markdown)?.title;

    if (!title) {
        throw new Error('Missing title in the page');
    }

    return title;
};

const getDescription = (markdown: string): string => {
    const matches = markdown.match(descriptionRegExp);

    if (!matches || !matches[1]) {
        throw new Error('Missing description in the page');
    }

    return matches[1].trim();
};

export const render = (markdown: string): any[] => {
    return markdown
        .replace(headerRegExp, '')
        .split(/^{{("(?:demo|component)":[^}]*)}}$/gm) // Split markdown into an array, separating demos
        .filter((content) => !emptyRegExp.test(content)) // Remove empty lines
        .map((content) => {
            if (/^"(demo|component)": "(.*)"/.test(content)) {
                return {
                    content: content.substring(9, content.length - 1),
                    isDemo: true,
                };
            }

            return {
                content: marked(content, {
                    headerIds: false,
                    breaks: false,
                    pedantic: false,
                    sanitize: false,
                    smartLists: true,
                    smartypants: false,
                }),
                isDemo: false,
            };
        });
};

export const prepareMarkdown = (
    markdown: string
): {
    title: string;
    description: string;
    markdown: string;
} => {
    return {
        title: getTitle(markdown),
        description: getDescription(markdown),
        markdown: markdown.replace(headerRegExp, ''),
    };
};
