import { ImagePath } from "@/Constant";
import Image from "next/image";
import React, { useState } from "react";
import UserProfileIcons from "./UserProfileIcons";
import { useSession } from "next-auth/react";

const UserProfile = () => {
  const [show, setShow] = useState(false);
  const { data: session } = useSession();

  return (
    <li className='profile-dropdown custom-dropdown'>
      <div className='d-flex align-items-center' onClick={() => setShow(!show)}>
        <Image width={45} height={49} src={session?.user?.image || `${ImagePath}/profile.png`} alt='avatar' />
        <div className='flex-grow-1'>
          <h5>{session?.user?.email}</h5>
          <span>{session?.user?.name || 'Superadmin'}</span>
        </div>
      </div>
      <div className={`custom-menu overflow-hidden ${show ? "show" : ""}`}>
        <UserProfileIcons />
      </div>
    </li>
  );
};

export default UserProfile;
