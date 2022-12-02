import { motion } from "framer-motion";

const colors = ["#22238f", "#6b45fa", "#ca3286", "#fe2b49", "#fe652d"];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const dotVariants = {
  initial: {},
  animate: {
    height: [40, 100, 40],
    transition: {
      repeat: Infinity,
    },
  },
};

const LoadingMotion = ({ count = 5 }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 16,
        height: 100,
        alignItems: "center",
      }}
    >
      {Array(count)
        .fill(null)
        .map((_, index) => {
          return (
            <motion.div
              key={index}
              variants={dotVariants}
              style={{
                height: 20,
                width: 15,
                backgroundColor: colors[index % colors.length],
                borderRadius: 20,
              }}
            />
          );
        })}
    </motion.div>
  );
};

export default LoadingMotion;
