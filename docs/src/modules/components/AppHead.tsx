import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface AppHeadProps {
    title: string;
    description: string;
    largeCard: boolean;
    card: string;
}

const AppHead = ({ title, description, card = 'https://material-ui.com/static/logo.png', largeCard = false }: AppHeadProps): JSX.Element => {
    const router = useRouter();

    return (
        <Head>
            <meta name='viewport' content='initial-scale=1, width=device-width' />
            <title>{`${title} - Draft-js-wysiwyg`}</title>
            <meta name='description' content={description} />
            {/* Twitter */}
            <meta name="twitter:card" content={largeCard ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:site" content="Draft-js-wysiwyg" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={card} />
            {/* Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:url" content={`https://draft-js-wysiwyg.com${router.asPath}`} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={card} />
            <meta property="og:ttl" content="604800" />
            {/* Algolia */}
            <meta name="docsearch:version" content="next" />
        </Head>
    );
};

export default AppHead;