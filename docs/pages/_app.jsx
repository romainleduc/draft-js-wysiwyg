import React, { useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppFrame from '../src/modules/components/AppFrame';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/modules/components/theme';
import 'draft-js/dist/Draft.css';

const App = (props) => {
  const { Component, pageProps } = props;
  
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <StylesProvider>
    <>
      <Head>
        <title>Draft-js-wysiwyg</title>
        <meta
            name='viewport'
            content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppFrame>
            <Component {...pageProps} />
        </AppFrame>
      </ThemeProvider>
    </>
    </StylesProvider>
  );
}

export default App;
