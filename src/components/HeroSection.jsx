import ParticleBackground from './ParticleBackground';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-excellytics-green-50 to-excellytics-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden pt-20">
      <ParticleBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between py-24">
        {/* Left Side: Hero Text */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Unlock the Power of Your Data with Excellytics
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Transform your spreadsheets into actionable insights with our AI-powered analytics platform.
          </motion.p>
          <motion.div
            className="space-x-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <button className="bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 text-white font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-200">
              Get Started
            </button>
            <button className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold py-3 px-8 rounded-full hover:shadow-lg transition-all duration-200">
              Learn More
            </button>
          </motion.div>
        </div>

        {/* Right Side: Hero Image */}
        <div className="md:w-1/2 flex justify-center">
          <motion.img
            src="/hero-image.svg"
            alt="Excellytics Dashboard"
            className="w-full max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
