
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const FeaturesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const features = [
    {
      icon: "🔐",
      title: "Secure JWT Authentication",
      description: "Advanced user and admin authentication with JWT tokens ensuring your data stays protected and access is controlled.",
      color: "from-excellytics-green-500 to-excellytics-green-600"
    },
    {
      icon: "📊",
      title: "Excel File Processing",
      description: "Upload and process .xls and .xlsx files seamlessly with intelligent parsing and data structure recognition.",
      color: "from-excellytics-blue-500 to-excellytics-blue-600"
    },
    {
      icon: "🎯",
      title: "Dynamic Column Mapping",
      description: "Intuitive interface for selecting X and Y axes with smart suggestions based on your data types and patterns.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: "📈",
      title: "Interactive 2D/3D Charts",
      description: "Generate stunning visualizations including bar charts, line graphs, pie charts, scatter plots, and 3D representations.",
      color: "from-excellytics-green-500 to-excellytics-blue-500"
    },
    {
      icon: "💾",
      title: "Export & Download",
      description: "Save your charts as high-quality PNG or PDF files for presentations, reports, and sharing with stakeholders.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: "🤖",
      title: "AI-Powered Insights",
      description: "Get intelligent summaries and insights from your data with our advanced AI analysis and trend detection.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: "📋",
      title: "Dashboard & History",
      description: "Personal dashboard with visualization history, project management, and quick access to your recent charts.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: "⚡",
      title: "Real-time Processing",
      description: "Lightning-fast data processing and chart generation with real-time preview as you configure your visualizations.",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="features" className="py-20 lg:py-32 bg-white dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-900" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="gradient-text">Powerful Features</span>
            <br />
            <span className="text-gray-800 dark:text-white">for Data Visualization</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Everything you need to transform your Excel data into stunning, interactive visualizations 
            with professional-grade tools and AI-powered insights.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-excellytics-green-200 dark:hover:border-excellytics-green-800"
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className="relative z-10 mb-4">
                <div className="w-12 h-12 flex items-center justify-center text-2xl bg-gray-50 dark:bg-gray-700 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 group-hover:text-excellytics-green-600 dark:group-hover:text-excellytics-green-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-excellytics-green-200 dark:group-hover:border-excellytics-green-800 transition-colors duration-300"
                initial={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
