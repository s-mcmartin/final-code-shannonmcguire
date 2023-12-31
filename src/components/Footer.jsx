
import React from "react";
import MainSection from './MainSection'
import { SiTailwindcss, SiMongodb } from "react-icons/si";
import { TbBrandFramer } from "react-icons/tb";
import {FaReact} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer
      className="w-full border-t-2 border-solid border-dark
   font-medium text-lg dark:text-light dark:border-light sm:text-base
   "
    >
      <MainSection className="py-8 flex items-center justify-between lg:flex-col lg:py-6">
        <span>{new Date().getFullYear()} &copy; Shannon McGuire</span>

        <a
          href="/contact"
          target="_blank"
          className="underline underline-offset-2"
        >
          Contact Me
        </a>
        <p className="flex gap-2">
          Created with:
          <span className="flex justify-between items-center gap-2">
            <FaReact />
            <SiTailwindcss />
            <SiMongodb />
            <TbBrandFramer />
          </span>
        </p>
      </MainSection>
    </footer>
  );
};

export default Footer;
