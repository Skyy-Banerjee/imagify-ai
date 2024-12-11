import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="flex items-end justify-between gap-4 py-3 mt-20">
      <img src={assets.logo} alt="logo-image" width={150} />
      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
        ©️{" "}
        <a href="https://github.com/Skyy-Banerjee" target="_blank">
          soumadip_banerjee👨🏻‍💻
        </a>{" "}
        | All rights reserved.
      </p>
      <div className="flex gap-2.5 cursor-pointer">
        <a href="https://www.facebook.com/" target="_blank">
          <img src={assets.facebook_icon} alt="facebook-icon" width={35} />
        </a>
        <a href="https://x.com/" target="_blank">
          <img src={assets.twitter_icon} alt="twitter-icon" width={35} />
        </a>
        <a target="_blank" href="https://www.instagram.com/skyy_banerjee/">
          <img src={assets.instagram_icon} alt="instagram-icon" width={35} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
