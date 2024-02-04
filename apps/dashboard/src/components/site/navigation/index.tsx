import React from "react";
import Image from "next/image";
type Props = {};

const Navigation = (props: Props) => {
  return (
    <div className="p-4 flex items-center justify-between relative">
      <aside className="flex items-center gap-2">
        <Image src={"./assets/next.svg"} width={40} height={40} alt="logo" />
      </aside>
    </div>
  );
};

export default Navigation;
