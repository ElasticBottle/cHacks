import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";

export default class extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
    
        return initialProps
      }
  render() {
    const { styles } = this.props;

    return (
      <Html lang="en">
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="application-name" content="App" />
        
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}