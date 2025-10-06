import React from 'react';
import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen">
      <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <h1 className="text-3xl font-bold mb-4">Order Placed Successfully! 🎉</h1>
      <p className="text-muted-foreground mb-8">
        Thank you for your purchase. Your order confirmation and receipt have been sent to your email.
      </p>
      <div className="flex justify-center space-x-4">
        <Link 
          to="/collection" 
          className="px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          CONTINUE SHOPPING
        </Link>
        <Link 
          to="/" 
          className="px-6 py-3 border border-border font-medium rounded-md hover:bg-secondary transition-colors"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}