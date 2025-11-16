import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

    return NextResponse.json({ message: 'Form submitted successfully!', data }, { status: 200 });
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
