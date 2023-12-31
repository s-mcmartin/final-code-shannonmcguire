import { AiFillGithub, AiFillLinkedin, AiFillMail } from "react-icons/ai";

import AnimatedText from "../../components/transitions/AnimatedText";
import ClientContactForm from "../../components/client-view/contact/ClientContactForm";
import MainSection from "../../components/MainSection";
import TransitionEffect from "../../components/transitions/TransitionEffect";
import { motion } from "framer-motion";
import useTitle from "../../hooks/useTitle";

const Contact = () => {
  useTitle("SM_Portfolio: Contact Page");
  return (
    <>
      <TransitionEffect />
      <main
        className={`mb-16 flex w-full flex-col items-center justify-center dark:text-light`}
      >
        <MainSection className="pt-16">
          <section className="flex items-start justify-center gap-8 md:flex-col md:justify-center md:items-center">
            <div className="w-1/2 flex-col items-center mx-auto md:w-full">
              <AnimatedText text={"Looking forward to hearing from you!"} className='!text-7xl' />
              <div className="w-[90%] flex items-center justify-evenly text-5xl mt-8 ">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://github.com/s-mcmartin"
                  aria-label="Checkout my github profile"
                >
                  <AiFillGithub className="hover:text-primary dark:hover:text-primaryDark cursor-pointer" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://www.linkedin.com/public-profile/settings?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_self_edit_contact-info%3BuNhQYgqBRzaWSdnIUZ3Kxg%3D%3D"
                  aria-label="Checkout my linkedIn profile"
                >
                  <AiFillLinkedin className="hover:text-primary dark:hover:text-primaryDark cursor-pointer" />
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href="mailto:shannoncmcguire85@gmail.com"
                  aria-label="Email me"
                >
                  <AiFillMail className="hover:text-primary dark:hover:text-primaryDark cursor-pointer" />
                </motion.a>
              </div>
            </div>
            <div className="w-1/2 h-fit shadow-lg p-4 shadow-black rounded-lg  md:w-full md:mx-8 bg-dark/90 text-dark/75 dark:bg-light/90 dark:text-light">
              <ClientContactForm />
            </div>
          </section>
        </MainSection>
      </main>
    </>
  );
};

export default Contact;
