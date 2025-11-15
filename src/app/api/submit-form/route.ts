import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    const { data, error } = await supabase.from('submissions').insert([
      {
        name: formData.name,
        email: formData.email,
        travel_type: formData.travelType,
        travel_time: formData.travelTime,
        destination: formData.destination,
        use_points: formData.usePoints,
        why_elitewise: formData.whyElitewise,
        how_did_you_hear: formData.howDidYouHear,
      },
    ]);

    if (error) {
      console.error('Error inserting data:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: process.env.GMAIL_EMAIL, // Send to yourself
      subject: 'New Onboarding Form Submission',
      html: `
        <h1>New Onboarding Form Submission</h1>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Travel Type:</strong> ${Array.isArray(formData.travelType) ? formData.travelType.join(', ') : formData.travelType}</p>
        <p><strong>Travel Time:</strong> ${formData.travelTime}</p>
        <p><strong>Destination:</strong> ${formData.destination}</p>
        <p><strong>Use Points:</strong> ${formData.usePoints}</p>
        <p><strong>Why Elitewise:</strong> ${Array.isArray(formData.whyElitewise) ? formData.whyElitewise.join(', ') : formData.whyElitewise}</p>
        <p><strong>How did you hear:</strong> ${Array.isArray(formData.howDidYouHear) ? formData.howDidYouHear.join(', ') : formData.howDidYouHear}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully.');
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
    }

    return NextResponse.json({ message: 'Form submitted successfully!', data }, { status: 200 });
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
