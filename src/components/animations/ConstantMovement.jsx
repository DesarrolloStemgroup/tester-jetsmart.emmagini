import React from "react";

import { motion } from "framer-motion";

const ConstantMovement = ({ children }) => {
	return (
		<motion.div
			className="box"
			animate={{
				scale: [1, 1.3, 1.3, 1, 1],
				rotate: [0, 0, 180, 180, 0],
			}}
			transition={{
				duration: 2,
				ease: "easeInOut",
				times: [0, 0.2, 0.5, 0.8, 1],
				repeat: Infinity,
				repeatDelay: 1,
			}}
		>
			{children}
		</motion.div>
	);
};

export default ConstantMovement;
