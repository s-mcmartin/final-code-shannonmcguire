import React, {useState} from 'react'
import {AiFillGithub, AiFillLinkedin, AiFillMail} from 'react-icons/ai';
import {MoonIcon, SunIcon} from './icons/Icons';
import {Link, useLocation} from 'react-router-dom';
import Logo from './icons/Logo'
import {motion} from 'framer-motion';
import {useThemeSwitch} from '../hooks/useThemeSwitch'

export const CustomLink = ({href, title, className= ''}) => {
  const location = useLocation()

  return <a href={href} className={`${className} rounded relative group lg:text-light lg:dark:text-dark text-xl ${location.pathname === 
  title ? 'underline' : ''}`}>
   {title}
      <span
        className={`
            inline-block h-[1px]  bg-primary dark:bg-primaryDark absolute left-0 -bottom-0.5 
            group-hover:w-full transition-[width] ease duration-300 
            lg:bg-light lg:dark:bg-dark ${location.pathname === title ? 'w-full' : 'w-0'}
            `}
      >
        &nbsp;
      </span></a>
}

const Header = () => {
  const [mode, setMode] = useThemeSwitch();
 
  return (
    <header
      className="w-full flex items-center justify-between px-32 py-8 font-medium z-10 dark:text-light
  lg:px-16 relative z-1 md:px-12 sm:px-8 dark:bg-dark bg-light
  "
    >
    <div className="w-full flex justify-between items-center lg:hidden">
    <nav className="flex items-center justify-center">
      <CustomLink className="mr-4" href="/" title="Home" />
      <CustomLink className="mx-4" href="/about" title="About" />
      <CustomLink className="mx-4" href="/projects" title="Projects" />
      <CustomLink className="ml-4" href="/contact" title="Contact" />
    </nav>
    <nav
      className="flex items-center justify-center flex-wrap lg:mt-2
"
    >
      <motion.a
        target={"_blank"}
        className="w-6 mx-3"
        href="https://github.com/s-mcmartin/s-mcmartin/tree/main"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Checkout my github profile"
      >
        <AiFillGithub className="text-2xl hover:text-primary dark:hover:text-primaryDark" />
      </motion.a>
      <motion.a
        target={"_blank"}
        className="w-8 mx-3"
        href="https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3BuNhQYgqBRzaWSdnIUZ3Kxg%3D%3D"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Checkout my linkedin profile"
      >
        <AiFillLinkedin className="text-2xl hover:text-primary dark:hover:text-primaryDark" />
      </motion.a>
      <motion.a
        target={"_blank"}
        className="w-8 mx-3 rounded-full"
        href="mailto:shannoncmcguire85@gmail.com"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Email me"
      >
        <AiFillMail className="text-2xl hover:text-primary dark:hover:text-primaryDark" />
      </motion.a>

      <button
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
        className={`w-8 h-8 ease ml-3 flex items-center justify-center rounded-full p-1  
      ${mode === "light" ? "bg-dark  text-light" : "bg-light  text-dark"}
      `}
        aria-label="theme-switcher"
      >
        {mode === "light" ? (
          <SunIcon className={"fill-dark"} />
        ) : (
          <MoonIcon className={"fill-dark"} />
        )}
      </button>
    </nav>
  </div>
  </header>
  )
}

export default Header
