// onboarding-funnel/src/app/emails/WelcomeEmail.tsx
'use client'; // This is a client component

import React from 'react';

interface WelcomeEmailProps {
  userName: string;
  // Add other dynamic props here as needed, e.g., form data
}

const WelcomeEmail: React.FC<WelcomeEmailProps> = ({ userName }) => {
  const currentYear = new Date().getFullYear();
  const logoUrl = "https://onboardingfunnel.vercel.app/ewelogo.png";
  const websiteUrl = "https://elitewiseescapes.com"; 

  return (
    // Return only the content that would go inside the <body> tag
    <center style={{ width: '100%', tableLayout: 'fixed', WebkitTextSizeAdjust: '100%', msTextSizeAdjust: '100%', backgroundColor: '#f6f6f6' }}>
      <table style={{ maxWidth: '600px', margin: '0 auto', borderSpacing: 0, fontFamily: "'DM Sans', sans-serif", color: '#23203e', backgroundColor: '#ffffff' }} width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style={{ padding: '20px 0', textAlign: 'center', backgroundColor: '#23203e' }}>
            <div style={{ margin: '0 auto', display: 'table' }}> {/* Use display:table for centering block elements in email clients */}
              <img src={logoUrl} alt="Elitewise Escapes Logo" width="150" style={{ maxWidth: '150px', height: 'auto', border: 0, display: 'block' }} />
            </div>
          </td>
        </tr>
        <tr>
          <td style={{ padding: '20px' }}>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#23203e', marginTop: 0, marginBottom: '20px' }}>Welcome, {userName}!</h1>
                </td>
              </tr>
              <tr>
                <td>
                  <p style={{ fontSize: '16px', lineHeight: '24px', marginTop: 0, marginBottom: '20px' }}>Thank you for joining Elitewise Escapes! We're thrilled to have you on board and excited to take the stress out of planning your next adventure.</p>
                  <p style={{ fontSize: '16px', lineHeight: '24px', marginTop: 0, marginBottom: '20px' }}>You’re officially on my radar, and based on what you shared, I’m confident we can design a trip that feels effortless, elevated, and tailored to your personal travel style.</p>
                  <p style={{ fontSize: '16px', lineHeight: '24px', marginTop: 0, marginBottom: '20px', fontWeight: 'bold' }}>What Happens Next:</p>
                  <p style={{ fontSize: '16px', lineHeight: '24px', marginTop: 0, marginBottom: '20px' }}>To begin crafting your custom recommendations, I’ll need a bit more detail about your travel preferences. Please take a moment to complete your Client Profile in your secure travel portal:</p>
                  <p style={{ fontSize: '20px', lineHeight: '24px', marginTop: 0, marginBottom: '20px', fontWeight: 'bold' }}>👉 Complete Your Client Profile:</p>
                </td>
              </tr>
              <tr>
                <td style={{ paddingBottom: '20px', textAlign: 'center' }}>
                  <a href="https://elitewiseescapes.com/portal" style={{ backgroundColor: '#c07481', color: '#ffffff', padding: '12px 20px', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontWeight: 'bold' }}>Client Intake Form</a>
                </td>
              </tr>
              <tr>
                <td>
                  <p style={{ fontSize: '16px', lineHeight: '24px', marginTop: 0, marginBottom: '30px' }}>This step helps me understand how you like to travel, what matters most to you, and whether you want to maximize credit card rewards or build a premium itinerary.</p>
                  <p style={{ fontSize: '16px', lineHeight: '24px', marginTop: 0, marginBottom: '15px', fontWeight: 'bold' }}>What You Can Expect From Elitewise Escapes</p>
                  <ul style={{ fontSize: '16px', lineHeight: '24px', marginTop: 0, marginBottom: '30px', paddingLeft: '20px' }}>
                    <li>✔ Personalized, luxury-focused travel planning</li>
                    <li>✔ Strategic use of your travel rewards and credit card points (if you opt to use them)</li>
                    <li>✔ A curated itinerary that matches your taste, budget, and timeline</li>
                    <li>✔ Transparent value — premium experiences without overspending</li>
                    <li>✔ A seamless, done-for-you process from planning to takeoff</li>
                  </ul>
                  <p style={{ fontSize: '16px', lineHeight: '24px', marginTop: 0, marginBottom: '20px' }}>Whether you're planning a getaway, a milestone trip, or exploring options for future travel, I’ve got you covered.</p>
                </td>
              </tr>
              <tr>
                <td style={{ paddingBottom: '20px', textAlign: 'center' }}>
                  <a href={websiteUrl} style={{ backgroundColor: '#23203e', color: '#ffffff', padding: '12px 20px', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontWeight: 'bold', marginRight: '10px' }}>Explore The Website</a>
                  <a href="https://elitewiseescapes.com/successes" style={{ backgroundColor: '#23203e', color: '#ffffff', padding: '12px 20px', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontWeight: 'bold' }}>Our Best Travel Stories</a>
                </td>
              </tr>
              <tr>
                <td>
                  <p style={{ fontSize: '16px', lineHeight: '34px', marginTop: 50, marginBottom: '20px', fontWeight: 'bold' }}>Want to Put Me on Your Calendar?</p>
                  <p style={{ fontSize: '16px', lineHeight: '24px', marginTop: 0, marginBottom: '20px' }}>Some clients prefer to hop on a virtual call, learn more, discuss perks, and do their intake form in real time. If you’re ready to move forward quickly, just schedule a brief consultation call and we can go at your pace:</p>
                  <p style={{ fontSize: '16px', lineHeight: '24px', marginTop: 0, marginBottom: '20px', fontWeight: 'bold' }}>Book a Quick Travel Chat:</p>
                </td>
              </tr>
              <tr>
                <td style={{ paddingBottom: '20px', textAlign: 'center' }}>
                  <a href="https://calendly.com/elitewiseescapes" style={{ backgroundColor: '#23203e', color: '#ffffff', padding: '12px 20px', borderRadius: '5px', display: 'inline-block', textDecoration: 'none', fontWeight: 'bold' }}>Schedule a Call</a>
                </td>
              </tr>
              <tr>
                <td>
                  <p style={{ fontSize: '16px', lineHeight: '24px', marginTop: 0, marginBottom: '30px' }}>I’m looking forward to planning your next getaway.</p>
                  <p style={{ fontSize: '16px', lineHeight: '24px', marginTop: 0, marginBottom: '30px' }}>If you have any immediate questions or ideas, feel free to reply directly. I’m here to help bring your trip to life.</p>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', lineHeight: '24px', marginTop: 0, marginBottom: '30px' }}>
Warmly,<br/>Dakotah Jennifer<br/>Chief Travel Officer, Elitewise Escapes<br/>A DakJen Creative Company</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ padding: '20px', textAlign: 'center', fontSize: '12px', color: '#999999', backgroundColor: '#f6f6f6' }}>
            &copy; {currentYear} Elitewise Escapes. All rights reserved.
          </td>
        </tr>
      </table>
    </center>
  );
};

export default WelcomeEmail;