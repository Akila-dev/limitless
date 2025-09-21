import Image from "next/image";

// ! SANITY
import { client } from "@/sanity/lib/client";
const options = { next: { revalidate: 30 } };

// ! COMPONENTS
import { Text4R3F } from "@/components";

import logo from "@/assets/images/limitless_letters.png";
import metaverse_bg from "@/assets/images/metaverse-x.png";

export default async function Limitless() {
  const textData = await client.fetch(
    `*[_type=="nonPlanetPageText" && defined(slug.current) && slug.current == "limitless-paragraph"]{
      text_content
    }`,
    options
  );

  return (
    <div className="pt-[35vh]">
      {/* Sphere Logo */}
      <div className="absolute top-0 left-0 w-full h-[22.5vh] lg:h-[20vh] flex-center !items-end">
        <div className="w-[60vw] md:w-[40vw] lg:w-[35vh]">
          <Image
            src={logo}
            alt="Limitless"
            width={450}
            height={70}
            className="object-contain h-auto w-full"
          />
        </div>
      </div>
      <div id="sphere-trigger" className="container flex-center !pb-1">
        <div className="max-w">
          <Text4R3F paragraph={textData[0]?.text_content?.paragraph} center />
        </div>
      </div>
      <div className="w-full min-h-screen pb-5">
        <Image
          src={metaverse_bg}
          alt="Metaverse"
          width={"auto"}
          height={"auto"}
          className="object-cover w-full h-[70vh] lg:h-auto"
          priority
        />
      </div>
    </div>
  );
}
