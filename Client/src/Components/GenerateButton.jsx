import { motion } from "motion/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

const GenerateButton = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const onClickHandler = () => {
    if (user) {
      navigate("/result/");
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div className="pb-16 text-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16">
        See the magic. Try Now
      </h1>
      <motion.button
        whileHover={{scale:1.05}}
        whileTap={{scale:0.95}}
        transition={{default:{duration:0.1}, opacity:{delay:0.4, duration:0.11}}}
        onClick={() => onClickHandler()}
        className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500"
      >
        Generate Image
        <img src={assets.star_group} alt="" className="h-6" />
      </motion.button>
    </div>
  );
};

export default GenerateButton;
