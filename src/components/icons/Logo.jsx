
import React from "react";
import { motion } from "framer-motion";



const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-2">
      <motion.a
        href="/"
        className="flex items-center justify-center rounded-full w-16 h-16  bg-dark text-white dark:border-2 dark:border-solid dark:border-light
   text-2xl font-bold"
        whileHover={{
          backgroundColor: [
            "#121212",
            "rgba(131,58,180,1)",
            "rgba(253,29,29,1)",
            "rgba(252,176,69,1)",
            "rgba(131,58,180,1)",
            "#121212",
          ],
          transition: { duration: 1, repeat: Infinity },
        }}
      >
        SM
      </motion.a>
    </div>
  );
};

export default Logo;
