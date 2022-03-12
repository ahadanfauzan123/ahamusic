import React from 'react'
import { ThreeBounce, CubeGrid } from "better-react-spinkit";
import Image from "next/image";

function Loader() {
  return (
    <div className="pt-40 flex flex-col items-center space-y-4">
    <span className="relative w-[400px] h-[250px] lg:w-[550px] lg:h-[240px]">
      <Image
        src="https://rb.gy/y9mwtb"
        layout="fill"
        objectFit="contain"
        className="animate-pulse"
      />
    </span>
    <ThreeBounce size={23} color="#15883e" />
    {/* <CubeGrid size={100} color="#3863f0" /> */}
  </div>
  )
}

export default Loader