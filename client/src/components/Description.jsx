import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
      initial={{ opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-8">Turn your imagination into visuals</p>
      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        {/* --- Right Side --- */}
        <img
          src={assets.cat_rockstar}
          alt="sample-img"
          className="w-80 xl:w-96 rounded-lg "
        />
        {/* --- Left Side --- */}
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="text-gray-600 mb-4">
            Transform your imagination into reality with our AI-powered
            Text-to-Image app. Generate stunning visuals from simple text
            prompts, perfect for creativity, storytelling, and professional
            projects.
          </p>
          <p className="text-gray-600">
            Unleash your creativity with our app. Turn words into captivating
            visuals effortlessly, perfect for designers, content creators, and
            dreamers seeking unique and personalized digital art.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
