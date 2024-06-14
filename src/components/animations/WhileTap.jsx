import * as React from "react";
import { motion } from "framer-motion";

const WhileTap = ({ children }) => {
	return (
		<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }}>
			{children}
		</motion.div>
	);
};

export default WhileTap;
