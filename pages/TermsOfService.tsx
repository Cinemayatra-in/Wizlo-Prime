import React from 'react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using Wizlo (the "Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
            <p>
              Wizlo provides users with language learning tools, games, and daily tasks to assist in learning Spanish. You are responsible for obtaining access to the Service, which may involve third-party fees (such as Internet service provider or airtime charges).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Intellectual Property</h2>
            <p>
              The content, organization, graphics, design, compilation, magnetic translation, digital conversion and other matters related to the Site are protected under applicable copyrights, trademarks, and other proprietary (including but not limited to intellectual property) rights. The copying, redistribution, use or publication by you of any such matters or any part of the Site is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Disclaimer of Warranties</h2>
            <p>
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Wizlo expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to, the implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Limitation of Liability</h2>
            <p>
              You expressly understand and agree that Wizlo shall not be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses resulting from the use or the inability to use the service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};