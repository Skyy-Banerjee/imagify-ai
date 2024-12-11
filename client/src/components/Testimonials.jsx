import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center my-20 py-12"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}>
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customer Testimonials
      </h1>
      <p className="text-gray-500 mb-12">What Our Users Are Saying</p>
      <div className="flex flex-wrap gap-6">
        {testimonialsData.map((item, idx) => {
          return (
            <div
              key={idx}
              className="bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all">
              <div className="flex flex-col items-center">
                <img
                  src={item.image}
                  alt="testimonial-image"
                  className="rounded-full w-14"
                />
                <h2 className="text-xl font-semibold mt-3">{item.name}</h2>
                <p className="text-gray-500 mb-4">{item.role}</p>
                <div className="flex mb-4">
                  {Array(item.stars)
                    .fill()
                    .map((star, idx) => {
                      return (
                        <img
                          key={idx}
                          src={assets.rating_star}
                          alt="star-image/icon"
                        />
                      );
                    })}
                </div>
                <p className="text-center text-sm text-gray-600">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Testimonials;