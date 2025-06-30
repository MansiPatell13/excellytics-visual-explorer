import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FloatingElements from '../components/FloatingElements';
import Navigation from '../components/Navigation';
const SignUp = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: ''
  });
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
  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log('Sign up attempted with:', formData);
    // Handle sign up logic here
  };
  const handleGoogleSignUp = () => {
    console.log('Google sign up clicked');
    // Handle Google OAuth
  };
  const handleGithubSignUp = () => {
    console.log('GitHub sign up clicked');
    // Handle GitHub OAuth
  };
  return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Background Elements */}
      <FloatingElements />
      
      <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-40 dark:opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2322c55e' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        </div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="relative z-10 w-full max-w-md">
          {/* Sign Up Card */}
          <div className="glass-card p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-white/10">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div initial={{
              scale: 0.8,
              opacity: 0
            }} animate={{
              scale: 1,
              opacity: 1
            }} transition={{
              delay: 0.2,
              duration: 0.5
            }} className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="text-2xl font-bold gradient-text">Excellytics</span>
              </motion.div>
              
              <motion.h1 initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3,
              duration: 0.5
            }} className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Create Your Account
              </motion.h1>
              
              <motion.p initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4,
              duration: 0.5
            }} className="text-gray-600 dark:text-gray-300">
                Join us and start your analytics journey
              </motion.p>
            </div>

            {/* Social Sign Up Buttons */}
            <motion.div initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5,
            duration: 0.5
          }} className="space-y-3 mb-6">
              <Button onClick={handleGoogleSignUp} variant="outline" className="w-full h-12 border-2 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-200">
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign up with Google
              </Button>
              
              <Button onClick={handleGithubSignUp} variant="outline" className="w-full h-12 border-2 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-200">
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Sign up with GitHub
              </Button>
            </motion.div>

            {/* Divider */}
            <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.6,
            duration: 0.5
          }} className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-gray-500">Or create account with email</span>
              </div>
            </motion.div>

            {/* Sign Up Form */}
            <motion.form initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.7,
            duration: 0.5
          }} onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Username
                </Label>
                <Input id="username" name="username" type="text" value={formData.username} onChange={handleInputChange} placeholder="Enter your username" className="h-12 border-2 focus:border-excellytics-green-500 dark:focus:border-excellytics-green-400 transition-all duration-200" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" className="h-12 border-2 focus:border-excellytics-green-500 dark:focus:border-excellytics-green-400 transition-all duration-200" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="Create a password" className="h-12 border-2 focus:border-excellytics-green-500 dark:focus:border-excellytics-green-400 transition-all duration-200" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Confirm Password
                </Label>
                <Input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm your password" required className="h-12 border-2 focus:border-excellytics-green-500 dark:focus:border-excellytics-green-400 transition-all duration-200 px-[8px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityQuestion" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Security Question
                </Label>
                <Input id="securityQuestion" name="securityQuestion" type="text" value={formData.securityQuestion} onChange={handleInputChange} placeholder="Enter a security question" required className="h-12 border-2 focus:border-excellytics-green-500 dark:focus:border-excellytics-green-400 transition-all duration-200 px-[8px]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityAnswer" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Security Answer
                </Label>
                <Input id="securityAnswer" name="securityAnswer" type="text" value={formData.securityAnswer} onChange={handleInputChange} placeholder="Enter your answer" className="h-12 border-2 focus:border-excellytics-green-500 dark:focus:border-excellytics-green-400 transition-all duration-200" required />
              </div>

              <div className="flex items-start space-x-2 text-sm">
                <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-excellytics-green-500 focus:ring-excellytics-green-500" required />
                <span className="text-gray-600 dark:text-gray-300">
                  I agree to the{' '}
                  <Link to="/terms" className="text-excellytics-green-600 dark:text-excellytics-green-400 hover:text-excellytics-green-700 dark:hover:text-excellytics-green-300 transition-colors duration-200 font-medium">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-excellytics-green-600 dark:text-excellytics-green-400 hover:text-excellytics-green-700 dark:hover:text-excellytics-green-300 transition-colors duration-200 font-medium">
                    Privacy Policy
                  </Link>
                </span>
              </div>

              <Button type="submit" className="w-full h-12 bg-gradient-to-r from-excellytics-green-500 to-excellytics-blue-500 hover:from-excellytics-green-600 hover:to-excellytics-blue-600 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
                Create Account
              </Button>
            </motion.form>

            {/* Sign In Link */}
            <motion.div initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.8,
            duration: 0.5
          }} className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Already have an account?{' '}
                <Link to="/signin" className="text-excellytics-green-600 dark:text-excellytics-green-400 hover:text-excellytics-green-700 dark:hover:text-excellytics-green-300 transition-colors duration-200 font-medium">
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>;
};
export default SignUp;