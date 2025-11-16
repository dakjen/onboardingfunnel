'use client';

import { useState } from 'react';
import QuestionRenderer from '../components/QuestionRenderer';
import Image from 'next/image';
import type { Question } from '../components/QuestionRenderer';

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions: Question[] = [
    {
      id: 'name',
      type: 'text',
      question: 'What is your name?',
      placeholder: 'First and Last Name',
    },
    {
      id: 'email',
      type: 'text',
      question: 'What is your email?',
      placeholder: 'Primary method for sending portal link and trip options.',
    },
    {
      id: 'travelType',
      type: 'checkbox',
      question: 'What type of travel are you most interested in right now?',
      options: [
        { label: 'Luxury vacation', value: 'luxury' },
        { label: 'Quick getaway', value: 'getaway' },
        { label: 'Group trip', value: 'group' },
        { label: 'A future trip I’m planning ahead for', value: 'future' },
        { label: 'I want to maximize my credit card points for travel', value: 'points' },
      ],
    },
    {
      id: 'travelTime',
      type: 'radio',
      question: 'When are you hoping to travel next?',
      options: [
        { label: '0–3 months', value: '0-3' },
        { label: '3–6 months', value: '3-6' },
        { label: '6–12 months', value: '6-12' },
        { label: 'Just browsing for now', value: 'browsing' },
      ],
    },
    {
      id: 'destination',
      type: 'text',
      question: 'What destination(s) are you considering?',
      placeholder: 'e.g., Paris, Japan, Caribbean',
    },
    {
      id: 'usePoints',
      type: 'radio',
      question: 'Are you interested in using travel points or rewards for this trip?',
      options: [
        { label: 'Yes, definitely', value: 'yes' },
        { label: 'Maybe', value: 'maybe' },
        { label: 'No', value: 'no' },
        { label: 'I want to learn how', value: 'learn' },
      ],
    },
    {
      id: 'whyElitewise',
      type: 'checkbox',
      question: 'What made you want to explore Elitewise Escapes?',
      options: [
        { label: 'Get the most out of luxury vacations', value: 'luxury_vacations' },
        { label: 'Maximize travel rewards', value: 'maximize_travel_rewards' },
        { label: 'Get expert help for high-end trips', value: 'expert_help_high_end_trips' },
        { label: 'Enjoy stress-free planning', value: 'stress_free_planning' },
        { label: 'Access exclusive experiences', value: 'exclusive_experiences' },
        { label: 'Experience premium travel perks with ease', value: 'premium_travel_perks_ease' },
        { label: 'Stop managing all business travel logistics', value: 'stop_managing_business_travel_logistics' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      id: 'howDidYouHear',
      type: 'checkbox',
      question: 'How did you hear about us?',
      options: [
        { label: 'Referral', value: 'referral' },
        { label: 'Word of Mouth', value: 'word_of_mouth' },
        { label: 'Social media', value: 'social_media' },
        { label: 'Event or conference', value: 'event_conference' },
        { label: 'Other', value: 'other' },
      ],
    },
  ];

  const currentQuestion = questions[step - 1];
  const totalSteps = questions.length;

  const handleNext = () => {
    // Basic validation: ensure an answer is provided for the current question
    if (!formData[currentQuestion.id]) {
      alert('Please answer the current question before proceeding.');
      return;
    }
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form data.');
      }

      const result = await response.json();
      console.log('Form submission successful:', result);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your form. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <main className="flex min-h-screen flex-col items-center pt-12 bg-primary text-light">
        <div className="w-full max-w-xl text-center">
          <h1 className="text-3xl font-bold mb-8">Join Elitewise Escapes</h1>
          <p className="text-lg">Your information has been submitted. We'll be in touch shortly.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center pt-12 bg-primary text-light">
      <div
        className="w-full max-w-2xl p-8 rounded-lg shadow-lg"
        style={{ backgroundColor: '#c07481' }}
      >
        <div className="flex justify-center mb-8">
          <Image src="/logo.png" alt="Elitewise Escapes Logo" width={150} height={150} />
        </div>
        <h1
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: '#23203e' }}
        >
          Join Elitewise Escapes
        </h1>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
          <div
            className="bg-accent h-2.5 rounded-full"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>

        {currentQuestion && (
          <QuestionRenderer
            question={currentQuestion}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        <div className={`flex mt-8 ${step === 1 ? 'justify-center' : 'justify-between'}`}>
          {step > 1 && (
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-300 text-primary rounded-md hover:bg-gray-400 transition-colors cursor-pointer"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className={`px-6 py-3 rounded-md transition-colors bg-light text-accent hover:bg-gray-200 cursor-pointer`}
          >
            {step === totalSteps ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </main>
  );
}
