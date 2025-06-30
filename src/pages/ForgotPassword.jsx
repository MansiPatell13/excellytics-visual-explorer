
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FloatingElements from '../components/FloatingElements';
import Navigation from '../components/Navigation';

const ForgotPassword = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  
  const [email, setEmail] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [step, setStep] = useState('email'); // 'email', 'security', 'success'
  const [securityQuestion, setSecurityQuestion] = useState('');

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Simulate fetching security question based on email
    setSecurityQuestion('What was the name of your first pet?');
    setStep('security');
  };

  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    console.log('Security answer submitted:', securityAnswer);
    setStep('success');
    // Handle security question verification and password reset logic here
  };

  const resetForm = () => {
    setStep('email');
    setEmail('');
    setSecurityAnswer('');
    setSecurityQuestion('');
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Background Elements */}
      <FloatingElements />
      
      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 opacity-40 dark:opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Forgot Password Card */}
          <div className="glass-card p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center justify-center space-x-2 mb-4"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-2xl font-bold gradient-text">Excellytics</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
              >
                {step === 'email' && 'Forgot Password?'}
                {step === 'security' && 'Security Question'}
                {step === 'success' && 'Check Your Email'}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-600 dark:text-gray-300"
              >
                {step === 'email' && 'Enter your email address and we\'ll send you a link to reset your password.'}
                {step === 'security' && 'Please answer your security question to verify your identity.'}
                {step === 'success' && 'We\'ve sent a password reset link to your email address.'}
              </motion.p>
            </div>

            {/* Email Step */}
            {step === 'email' && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onSubmit={handleEmailSubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-12 border-2 focus:border-excellytics-green-500 dark:focus:border-excellytics-green-400 transition-all duration-200"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 hover:from-excellytics-green-600 hover:to-excellytics-blue-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Continue
                </Button>
              </motion.form>
            )}

            {/* Security Question Step */}
            {step === 'security' && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                onSubmit={handleSecuritySubmit}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Security Question
                  </Label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700">
                    <p className="text-gray-800 dark:text-gray-200">{securityQuestion}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="securityAnswer" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Answer
                  </Label>
                  <Input
                    id="securityAnswer"
                    name="securityAnswer"
                    type="text"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    placeholder="Enter your answer"
                    className="h-12 border-2 focus:border-excellytics-green-500 dark:focus:border-excellytics-green-400 transition-all duration-200"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={resetForm}
                    variant="outline"
                    className="flex-1 h-12 border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-12 bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 hover:from-excellytics-green-600 hover:to-excellytics-blue-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Verify
                  </Button>
                </div>
              </motion.form>
            )}

            {/* Success Step */}
            {step === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-excellytics-green-100 dark:bg-excellytics-green-900/20 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-excellytics-green-600 dark:text-excellytics-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    onClick={resetForm}
                    className="text-excellytics-green-600 dark:text-excellytics-green-400 hover:text-excellytics-green-700 dark:hover:text-excellytics-green-300 transition-colors duration-200 font-medium"
                  >
                    try again
                  </button>
                </p>
              </motion.div>
            )}

            {/* Back to Sign In Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-6 text-center"
            >
              <Link
                to="/signin"
                className="text-gray-600 dark:text-gray-300 hover:text-excellytics-green-600 dark:hover:text-excellytics-green-400 transition-colors duration-200 font-medium"
              >
                ← Back to Sign In
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
