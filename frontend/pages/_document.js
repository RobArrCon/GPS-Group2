<<<<<<< HEAD
import * as React from 'react'
import PropTypes from 'prop-types'
import Document, {
  Html, Head, Main, NextScript
} from 'next/document'
import createEmotionServer from '@emotion/server/create-instance'
import theme, { roboto } from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'

export default function MyDocument (props) {
  const { emotionStyleTags } = props

  return (
    <Html lang='es' className={roboto.className}>
      <Head>
        {/* PWA primary color */}
        <meta name='theme-color' content={theme.palette.primary.main} />
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta name='emotion-insertion-point' content='' />
=======
import * as React from 'react';
import PropTypes from 'prop-types';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import theme, { roboto } from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';

export default function MyDocument(props) {
  const { emotionStyleTags } = props;

  return (
    <Html lang="es" className={roboto.className}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
>>>>>>> 5b000b1fdb9f54c51e1c244aa31141c1f8ac6487
        {emotionStyleTags}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
<<<<<<< HEAD
  )
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage

  // You can consider sharing the same Emotion cache between all the SSR requests
  // to speed up
  // performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache()
  const { extractCriticalToChunks } = createEmotionServer(cache)

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: App => function EnhanceApp (props) {
      return <App emotionCache={cache} {...props} />
    }
  })

  const initialProps = await Document.getInitialProps(ctx)
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html)
  const emotionStyleTags = emotionStyles.styles.map(style => (
  <style
    data-emotion={`${style.key} ${style.ids.join(' ')}`}
    key={style.key}

    dangerouslySetInnerHTML={{ __html: style.css }}
  />
  ))

  return {
    ...initialProps,
    emotionStyleTags
  }
}
=======
  );
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
>>>>>>> 5b000b1fdb9f54c51e1c244aa31141c1f8ac6487

MyDocument.propTypes = {
  emotionStyleTags: PropTypes.array.isRequired
}
<<<<<<< HEAD
=======

>>>>>>> 5b000b1fdb9f54c51e1c244aa31141c1f8ac6487
