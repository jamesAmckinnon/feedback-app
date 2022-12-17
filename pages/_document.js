import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html prefix="og: http://ogp.me/ns#">
        <Head>
            <meta 
                name="image"
                property="og:image"
                content="https://prodigy-feedback-app.herokuapp.com/logo.png"
            />
            <title>Feedback App</title>
            <meta 
                name="title"
                property="og:title"
                content="Prodigy Feedback App" 
            />
            <meta 
                property="og:description" 
                content="Prodigy Feedback App"
            />
            <meta 
                property="og:url"
                content="https://prodigy-feedback-app.herokuapp.com/dashboard/home"
            />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument