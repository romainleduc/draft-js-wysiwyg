import marked from 'marked';
import prism from './prism';

const headerRegExp = /---[\r\n]([\s\S]*)[\r\n]---/;
const descriptionRegExp = /<p class="description">(.*)<\/p>/s;
const headerKeyValueRegExp = /(.*?): (.*)/g;
const emptyRegExp = /^\s*$/;

interface MarkdownObject {
  content: string;
  type: 'demo' | 'api' | 'content';
}

const renderer = (src: string): string => {
  return marked(src, {
    highlight: prism,
    headerIds: false,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  });
};

/**
 * Extract information from the top of the markdown.
 * For instance, the following input:
 *
 * ---
 * title: Backdrop React Component
 * ---
 *
 * # Backdrop
 *
 * should output:
 * { title: 'Backdrop React Component' }
 */
const getHeaders = (markdown: string) => {
  const header = markdown.match(headerRegExp);

  if (!header || !header[1]) {
    return undefined;
  }

  let regexMatches;
  const headers: { [key: string]: string } = {};

  // eslint-disable-next-line no-cond-assign
  while ((regexMatches = headerKeyValueRegExp.exec(header[1])) !== null) {
    const key = regexMatches[1];
    const value = regexMatches[2].replace(/(.*)/, '$1');
    // Remove trailing single quote yml escaping.
    headers[key] = value.replace(/^'|'$/g, '');
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

const excludeTitle = (markdown: string): string => {
  return markdown.replace(headerRegExp, '');
};

const getType = (markdown: string) => {
  if (/^("(?:api)":[^}]*)$/gm.test(markdown)) {
    return 'api';
  }

  if (/^("(?:demo)":[^}]*)$/gm.test(markdown)) {
    return 'demo';
  }

  return 'content';
};

export const render = (markdown: string): MarkdownObject[] => {
  return excludeTitle(markdown)
    .split(/^{{("(?:demo|api)":[^}]*)}}$/gm) // Split markdown into an array, separating demos
    .filter((content) => !emptyRegExp.test(content)) // Remove empty lines
    .map((content) => {
      const type = getType(content);

      if (type !== 'content') {
        return {
          content: content.substring(
            type === 'demo' ? 9 : 8,
            content.length - 1
          ),
          type,
        };
      }

      return {
        content: renderer(content),
        type: 'content',
      };
    });
};

export const markedApiDoc = (
  filename: string
): {
  title: string;
  html: string;
} => {
  const markdown = require(`../../examples/api-doc/${filename}`).default;

  return {
    title: getTitle(markdown),
    html: renderer(excludeTitle(markdown)),
  };
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
    markdown: excludeTitle(markdown),
  };
};
