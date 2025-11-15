import React from 'react';

interface QuestionOption {
  label: string;
  value: string;
}

interface Question {
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (question.type === 'checkbox') {
      const { value, checked } = e.target as HTMLInputElement;
      const currentValues = formData[question.id] || [];
      if (checked) {
        setFormData((prev) => ({ ...prev, [question.id]: [...currentValues, value] }));
      } else {
        setFormData((prev) => ({ ...prev, [question.id]: currentValues.filter((v: string) => v !== value) }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [question.id]: e.target.value }));
    }
  };

  return (
    <div className="mb-6">
      <label htmlFor={question.id} className="block text-primary text-xl font-bold mb-4">
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
              <label htmlFor={`${question.id}-${option.value}`} className="ml-3 text-primary text-lg">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
      {question.type === 'checkbox' && (
        <div className="space-y-3">
          {question.options?.map((option) => (
            <div key={option.value} className="flex items-center">
              <input
                type="checkbox"
                id={`${question.id}-${option.value}`}
                name={question.id}
                value={option.value}
                checked={(formData[question.id] || []).includes(option.value)}
                onChange={handleChange}
                className="h-5 w-5 text-accent focus:ring-accent border-gray-300 rounded"
              />
              <label htmlFor={`${question.id}-${option.value}`} className="ml-3 text-primary text-lg">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionRenderer;