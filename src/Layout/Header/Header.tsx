import { ImagePath } from "@/Constant";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import MainHeader from "./MainHeader/MainHeader";
import CloseButton from "./CloseButton/CloseButton";

const Header = () => {
  return (
    <header className="page-header row">
      <div className="logo-wrapper d-flex align-items-center col-auto">
        <Link href={`/dashboard/default`}>
          <Image width={126} height={47} className="for-dark" src={`${ImagePath}/logo/light-logo.png`} alt="logo" />
          <Image width={126} height={47} className="for-light" src={`${ImagePath}/logo/dark-logo.png`} alt="logo" />
        </Link>
        <CloseButton />
      </div>
      <MainHeader />
    </header>
  );
};

export default Header;
