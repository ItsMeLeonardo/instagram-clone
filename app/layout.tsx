import { ReactNode } from "react";

import "styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head lang="en">
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Instagram Clone</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
