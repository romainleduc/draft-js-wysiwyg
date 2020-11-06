import React from 'react';
import prism from '../utils/prism';

interface HighlightedCodeProps {
  code: string;
  language: string;
}

const HighlightedCode = ({
  code,
  language,
}: HighlightedCodeProps): JSX.Element => {
  return (
    <div>
      <pre>
        <code
          className={`language-${language}`}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: prism(code, language) }}
        />
      </pre>
    </div>
  );
};

export default HighlightedCode;
