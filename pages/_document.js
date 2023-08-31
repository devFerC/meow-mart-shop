// Importing essential components from Next.js's document module
// These components are used to control the rendering of the HTML document
import { Html, Head, Main, NextScript } from "next/document";

// The main Document component that controls the rendering of the entire HTML document
export default function Document() {
  return (
    // Wrapping the entire document in the Html component and setting the language attribute to English
    <Html lang="en">
      {/* The Head component is a container for all meta tags, link tags, and other head elements */}
      <Head />
      <body>
        {/* The Main component renders the main content of the document (i.e., the page being displayed) */}
        <Main />
        {/* The NextScript component renders essential Next.js scripts needed for the application to work */}
        <NextScript />
      </body>
    </Html>
  );
}
