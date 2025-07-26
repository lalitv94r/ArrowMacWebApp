import SVG from "@/CommonComponent/SVG";
import { userProfilesData } from "@/Data/Layout/HeaderData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { Href, Logout } from "@/Constant";
import { LogOut } from "react-feather";
import { signOut } from "next-auth/react";

const UserProfileIcons = () => {  
  const handleClick = () => {
   signOut();
  };
  return (
    <ul>
      {userProfilesData.map((item, i) => (
        <li className="d-flex" key={i}>
          <SVG className="svg-color" iconId={item.icon} />
          <Link className="ms-2" href={item.link} >
            {item.title}
          </Link>
        </li>
      ))}
       <li onClick={handleClick} className="d-flex"><Link href={Href}scroll={false} ><LogOut /><span className="ms-2">{Logout} </span></Link></li>
    </ul>
  );
};

export default UserProfileIcons;
