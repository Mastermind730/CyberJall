"use client";
import { useState, useEffect, ReactHTMLElement } from 'react';
import Head from 'next/head';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const [binaryStrings] = useState(() => {
    return Array.from({ length: 15 }, () => 
      Array.from({ length: 15 }, () => 
        Math.random() > 0.5 ? '1' : '0'
      ).join('')
    );
  });

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Handle login logic here
      console.log('Login attempt with:', email, password);
    }, 1500);
  };

 // Return a simple loading state or null while client-side code isn't ready
 if (!isMounted) {
  return null; // Return nothing during SSR to prevent hydration mismatch
}

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
     

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`grid-h-${i}`} className="absolute h-px bg-red-500 w-full" style={{ top: `${i * 5}%` }} />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`grid-v-${i}`} className="absolute w-px bg-red-500 h-full" style={{ left: `${i * 5}%` }} />
          ))}
        </div>

        <div className="absolute inset-0 overflow-hidden opacity-20">
          {binaryStrings.map((binary, i) => (
            <div 
              key={`binary-${i}`}
              className="absolute text-orange-500 text-xs animate-bounce opacity-80"
              style={{
                left: `${i * 7}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 2}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              {binary}
            </div>
          ))}
        </div>

        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`node-${i}`}
            className="absolute rounded-full border-2 border-red-400 opacity-20 animate-pulse"
            style={{
              width: `${30 + i * 5}px`,
              height: `${30 + i * 5}px`,
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
          />
        ))}

        <div className="absolute top-1/4 left-1/4 w-10 h-12 border-2 border-red-500 opacity-30 animate-pulse" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-10 h-12 border-2 border-orange-500 opacity-30 animate-pulse" style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }} />

        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`dot-${i}`} className="absolute w-2 h-2 bg-red-500 rounded-full opacity-30 animate-ping" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}
        
        <div className="absolute w-full h-px bg-red-500 opacity-50 animate-bounce" 
          style={{
            top: '50%',
            animationDuration: '4s',
          }}
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-32 h-32 rounded-full border border-red-500 opacity-20 animate-ping" style={{ animationDuration: '3s' }} />
          <div className="w-48 h-48 rounded-full border border-orange-500 opacity-10 animate-ping" style={{ animationDuration: '4s' }} />
        </div>
      </div>

      <div className={`z-10 bg-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-md border border-red-600 transition-all duration-1000 transform ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="text-4xl font-bold text-white">
              Cyber<span className="text-red-600">Jall</span>
            </div>
            <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
            <div className="text-xs text-orange-400 text-center mt-1">SECURITY TESTING PLATFORM</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-orange-500 text-sm font-medium mb-1">EMAIL</label>
            <div className="relative group">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                required
                placeholder="Enter your email"
              />
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300" />
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block text-orange-500 text-sm font-medium mb-1">PASSWORD</label>
            <div className="relative group">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                required
                placeholder="Enter your password"
              />
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-600 via-orange-500 to-red-600 transform scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300" />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white font-bold py-3 px-4 rounded focus:outline-none hover:from-red-700 hover:to-red-700 transition-all duration-300 ${isLoading ? 'opacity-90' : 'opacity-100'}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2" />
                AUTHENTICATING...
              </div>
            ) : (
              'SECURE LOGIN'
            )}
          </button>

          <div className="flex justify-between mt-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Forgot Password?</a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">Create Account</a>
          </div>
        </form>

        <div className="mt-6 flex items-center justify-center text-xs text-orange-400">
          <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 animate-pulse"></div>
          SECURE CONNECTION VERIFIED
        </div>

        <div className="absolute -top-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        <div className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        <div className="absolute -left-1 top-0 h-full w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
        <div className="absolute -right-1 top-0 h-full w-px bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
        
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full opacity-70 animate-ping" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-orange-500 rounded-full opacity-70 animate-ping" style={{ animationDuration: '2s' }} />
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-red-500 animate-pulse">SYSTEM SECURE</div>
      <div className="absolute top-4 left-4 text-xs text-orange-500 animate-pulse">FIREWALL ACTIVE</div>
    </div>
  );
}