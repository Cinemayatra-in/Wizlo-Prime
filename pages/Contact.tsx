import React from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 px-8 py-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Get in Touch</h1>
          <p className="text-indigo-100">We'd love to hear from you. Here's how you can reach us.</p>
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 space-y-8">
          
          <div className="flex items-start gap-6 p-6 rounded-xl bg-gray-50 border border-gray-100 transition-transform hover:-translate-y-1 duration-300">
            <div className="p-4 bg-indigo-100 text-indigo-600 rounded-full shrink-0">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Email Us</h3>
              <p className="text-gray-500 text-sm mb-2">For general inquiries, support, or feedback.</p>
              <a href="mailto:wizloorginals@gmail.com" className="text-indigo-600 font-semibold hover:underline">
                wizloorginals@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-6 p-6 rounded-xl bg-gray-50 border border-gray-100 transition-transform hover:-translate-y-1 duration-300">
            <div className="p-4 bg-orange-100 text-orange-600 rounded-full shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Mailing Address</h3>
              <p className="text-gray-500 text-sm mb-2">Reach us via traditional mail.</p>
              <address className="not-italic text-gray-800 font-medium">
                Texas, United States
              </address>
            </div>
          </div>

        </div>

        {/* Footer of card */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 text-center">
          <p className="text-gray-400 text-sm">
            Response time: Usually within 24-48 hours.
          </p>
        </div>

      </div>
    </div>
  );
};