import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-16 h-16 border-4 border-primary-pink border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-gray-600">Loading...</p>
      </motion.div>
    </div>
  );
};

export default Loader;
