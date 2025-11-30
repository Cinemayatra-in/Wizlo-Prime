import React from 'react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Welcome to Wizlo ("we," "our," or "us"). We respect your privacy and are committed to protecting the personal information you may provide us through our website. This Privacy Policy explains what information we collect, how we use it, and under what circumstances we may disclose it to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="mb-2"><strong>Local Storage Data:</strong> We use your browser's local storage to save your learning progress, including learned sentences, XP, streaks, and game scores. This data remains on your device and is not transmitted to our servers unless you explicitly sync your account (feature coming soon).</p>
            <p><strong>Microphone Access:</strong> Our application requires microphone access solely for the purpose of speech recognition exercises. Audio data is processed locally within your browser or temporarily for the specific task and is not stored permanently.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Third-Party Services & Ads</h2>
            <p>
              We use third-party advertising partners, such as Adsterra, to serve ads when you visit our website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Security</h2>
            <p>
              The security of your personal information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us via email at <strong>wizloorginals@gmail.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};