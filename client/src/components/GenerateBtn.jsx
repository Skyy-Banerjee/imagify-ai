import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      // Scroll to the top first
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Navigate after a slight delay to ensure smooth scrolling
      setTimeout(() => {
        navigate("/result");
      }, 300); // Delay of 300ms for smooth scroll effect
    } else {
      // Scroll to the top before locking the body
      window.scrollTo({ top: 0, behavior: "smooth" });

      setTimeout(() => {
        setShowLogin(true);
        document.body.style.overflow = "hidden";
      }, 300); // Lock the body after 300ms delay
    }
  };
  return (
    <motion.div
      className="pb-16 text-center"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16">
        See the magic. Try now
      </h1>
      <button
        onClick={onClickHandler}
        className="inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hover:scale-105 transition-all duration-500">
        Generate Images
        <img className="h-6" src={assets.star_group} alt="star_group-image" />
      </button>
    </motion.div>
  );
};

export default GenerateBtn;
