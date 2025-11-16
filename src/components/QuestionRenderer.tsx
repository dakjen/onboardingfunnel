import React, { useState, useEffect } from 'react';

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  type: 'text' | 'radio' | 'textarea' | 'checkbox';
  question: string;
  options?: QuestionOption[];
  placeholder?: string;
}

interface QuestionRendererProps {
  question: Question;
  formData: { [key: string]: any };
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const QuestionRenderer: React.FC<QuestionRendererProps> = ({ question, formData, setFormData }) => {
  const [otherValue, setOtherValue] = useState('');

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const currentValues = Array.isArray(formData[question.id]) ? formData[question.id] : [];

    if (checked) {
      setFormData((prev) => ({ ...prev, [question.id]: [...currentValues, value] }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [question.id]: currentValues.filter((v: string) => v !== value && !v.startsWith('other:')),
      }));
      if (value === 'other') {
        setOtherValue('');
      }
    }
  };

  const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherValue(e.target.value);
  };

  useEffect(() => {
    const currentFormDataValues = Array.isArray(formData[question.id]) ? formData[question.id] : [];
    const otherIsSelected = currentFormDataValues.includes('other') || currentFormDataValues.some((v: string) => v.startsWith('other:'));

    if (otherIsSelected) {
      const otherIndex = currentFormDataValues.findIndex((v: string) => v === 'other' || v.startsWith('other:'));
      const newValues = [...currentFormDataValues];
      
      if (otherIndex !== -1) {
        newValues[otherIndex] = `other: ${otherValue}`;
      } else {
        newValues.push(`other: ${otherValue}`);
      }
      
      if (JSON.stringify(newValues) !== JSON.stringify(formData[question.id])) {
        setFormData((prev) => ({ ...prev, [question.id]: newValues }));
      }
    }
  }, [otherValue, question.id, formData, setFormData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (question.type === 'checkbox') {
      handleCheckboxChange(e as React.ChangeEvent<HTMLInputElement>);
    } else {
      setFormData((prev) => ({ ...prev, [question.id]: e.target.value }));
    }
  };

  return (
    <div className="mb-6">
      <label
        htmlFor={question.id}
        className="block text-xl font-bold mb-4"
        style={{ color: '#23203e' }}
      >
        {question.question}
      </label>
      {question.type === 'text' && (
        <input
          type="text"
          id={question.id}
          name={question.id}
          value={formData[question.id] || ''}
          onChange={handleChange}
          placeholder={question.placeholder}
          className="w-full p-3 rounded-md bg-white text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
        />
      )}
      {question.type === 'textarea' && (
        <textarea
          id={question.id}
          name={question.id}
          value={formData[question.id] || ''}
          onChange={handleChange}
          placeholder={question.placeholder}
          rows={4}
          className="w-full p-3 rounded-md bg-white text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
        ></textarea>
      )}
      {question.type === 'radio' && (
        <div className="space-y-3">
          {question.options?.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={`${question.id}-${option.value}`}
                name={question.id}
                value={option.value}
                checked={formData[question.id] === option.value}
                onChange={handleChange}
                className="h-5 w-5 text-accent focus:ring-accent border-gray-300"
              />
              <label
                htmlFor={`${question.id}-${option.value}`}
                className="ml-3 text-lg"
                style={{ color: '#23203e' }}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
      {question.type === 'checkbox' && (
        <div className="space-y-3">
          {question.options?.map((option) => (
            <div key={option.value}>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`${question.id}-${option.value}`}
                  name={question.id}
                  value={option.value}
                  checked={(Array.isArray(formData[question.id]) ? formData[question.id] : []).includes(option.value) || ((Array.isArray(formData[question.id]) ? formData[question.id] : []).some((v: string) => v.startsWith('other:')) && option.value === 'other')}
                  onChange={handleChange}
                  className="h-5 w-5 text-accent focus:ring-accent border-gray-300 rounded"
                />
                <label
                  htmlFor={`${question.id}-${option.value}`}
                  className="ml-3 text-lg"
                  style={{ color: '#23203e' }}
                >
                  {option.label}
                </label>
              </div>
              {option.value === 'other' && ((formData[question.id] || []).includes('other') || (formData[question.id] || []).some((v: string) => v.startsWith('other:'))) && (
                <input
                  type="text"
                  value={otherValue}
                  onChange={handleOtherInputChange}
                  placeholder="Please specify"
                  className="mt-2 w-full p-2 rounded-md bg-white text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionRenderer;