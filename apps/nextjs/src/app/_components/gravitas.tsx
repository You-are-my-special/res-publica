import React, { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";

const GravitasScore = ({ score }: { score: number }) => {
  const value = useMotionValue(score);
  const color = useTransform(value, [0, 10, 30, 100, 1000], ["#2c3e50", "#3498db", "#27ae60", "#d35400", "#8e44ad"]);

  const gradient = useMotionTemplate`linear-gradient(75deg, hsl(var(--background)) 0%, ${color} 100%)`;

  useEffect(() => {
    value.set(score);
  }, [score]);

  return (
    <div className="h-8 w-8 overflow-hidden rounded-full border ">
      <motion.div
        className="h-full w-full "
        style={{
          background: gradient,
        }}
      />
      {/* <div
        className="absolute top-0 z-10 h-full w-full bg-background *:left-0"
        style={{ width: `${score}%` }}
      /> */}
    </div>
  );
};

export default GravitasScore;
