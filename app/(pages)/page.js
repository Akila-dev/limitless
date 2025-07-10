import Image from "next/image";

import { HomeCanvas } from "@/containers";

export default function Home() {
  return (
    <div className="">
      <div className="w-full h-screen relative overflow-hidden">
        <div className="w-screen h-screen absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <HomeCanvas />
        </div>
      </div>
    </div>
  );
}
