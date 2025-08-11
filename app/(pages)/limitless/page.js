import Image from "next/image";

// ! COMPONENTS
import { Text4R3F } from "@/components";

import logo from "@/assets/images/limitless_letters.png";
import metaverse_bg from "@/assets/images/metaverse-x.png";

export default function Limitless() {
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
          <Text4R3F
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent bland"
            center
          />
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
