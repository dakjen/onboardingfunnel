// onboarding-funnel/src/app/email-preview/page.tsx
'use client'; // This is a client component

import React from 'react';
import WelcomeEmail from '../emails/WelcomeEmail';

export default function EmailPreviewPage() {
  // You can pass dummy data here for preview purposes
  const dummyUserName = "Traveler"; // Example dynamic data

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      {/* Add Google Fonts import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap');
          body { font-family: 'DM Sans', sans-serif; }
        `}
      </style>
      <h1>Email Preview</h1>
      <p>This is a preview of your welcome email. It's rendered as a React component.</p>
      <div style={{ border: '1px solid #ccc', marginTop: '20px', maxWidth: '600px', margin: '20px auto' }}>
        {/* Render the WelcomeEmail component */}
        <WelcomeEmail userName={dummyUserName} />
      </div>
      <p>
        **Note:** The actual email sent will be rendered to a static HTML string.
        This preview shows how the React component looks.
        Remember to replace placeholder URLs in WelcomeEmail.tsx (logo, website).
      </p>
    </div>
  );
}