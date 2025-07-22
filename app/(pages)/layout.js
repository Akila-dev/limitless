import "./globals.css";

import { Logo, GalaxySceneWrapper } from "@/components";

// ! SANITY
import { client } from "@/sanity/lib/client";
import { GET_PLANET_PAGES_LIST } from "@/sanity/lib/queries";
const options = { next: { revalidate: 30 } };

export const metadata = {
  title: "Limitless",
  description: "Official Limitless Website",
};

async function getPageData() {
  const page_data = await client.fetch(GET_PLANET_PAGES_LIST, options);

  return page_data;
}

export default async function RootLayout({ children }) {
  const page_data = await getPageData();

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <GalaxySceneWrapper data={page_data}>{children}</GalaxySceneWrapper>
        <Logo />
      </body>
    </html>
  );
}
