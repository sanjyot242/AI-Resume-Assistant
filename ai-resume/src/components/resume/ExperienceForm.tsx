// SkillsForm.tsx
import React, { useState, useEffect } from 'react';
import FormSection from '../layout/FormSection';
import TextField from '../ui/TextField';
import SelectField from '../ui/SelectField';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface Skill {
  id: string;
  name: string;
  category: string;
  level?: string;
}

interface SkillsFormProps {
  formData: Record<string, any>;
  onUpdateFormData: (data: Record<string, any>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const SkillsForm: React.FC<SkillsFormProps> = ({
  formData,
  onUpdateFormData,
  onNext,
}) => {
  // Default skill categories
  const defaultCategories = [
    'Technical',
    'Programming',
    'Languages',
    'Soft Skills',
    'Tools',
    'Design',
    'Management',
    'Office Skills',
    'Certifications',
    'Other',
  ];

  // State for skills list
  const [skillsList, setSkillsList] = useState<Skill[]>(formData.skills || []);

  // State for new skill input
  const [newSkill, setNewSkill] = useState<Skill>({
    id: '',
    name: '',
    category: 'Technical',
    level: '',
  });

  // State for custom categories
  const [categories, setCategories] = useState<string[]>(
    formData.skillCategories || defaultCategories
  );

  // State for new category input
  const [newCategory, setNewCategory] = useState('');

  // State for showing add category form
  const [showAddCategory, setShowAddCategory] = useState(false);

  // State for errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update parent form data when local state changes
  useEffect(() => {
    onUpdateFormData({
      skills: skillsList,
      skillCategories: categories,
    });
  }, [skillsList, categories, onUpdateFormData]);

  // Handle changes to new skill input
  const handleNewSkillChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewSkill((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Add a new skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate skill name
    if (!newSkill.name.trim()) {
      setErrors((prev) => ({
        ...prev,
        name: 'Skill name is required',
      }));
      return;
    }

    // Add the skill with a unique ID
    const skillToAdd: Skill = {
      ...newSkill,
      id: Date.now().toString(),
    };

    setSkillsList([...skillsList, skillToAdd]);

    // Reset new skill input
    setNewSkill({
      id: '',
      name: '',
      category: newSkill.category, // Keep the same category for adding multiple skills
      level: '',
    });
  };

  // Remove a skill
  const handleRemoveSkill = (id: string) => {
    setSkillsList(skillsList.filter((skill) => skill.id !== id));
  };

  // Add a new category
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCategory.trim()) {
      setErrors((prev) => ({
        ...prev,
        category: 'Category name is required',
      }));
      return;
    }

    if (categories.includes(newCategory)) {
      setErrors((prev) => ({
        ...prev,
        category: 'This category already exists',
      }));
      return;
    }

    // Add the new category
    setCategories([...categories, newCategory]);

    // Set it as the selected category for new skills
    setNewSkill((prev) => ({
      ...prev,
      category: newCategory,
    }));

    // Reset and hide the form
    setNewCategory('');
    setShowAddCategory(false);
    setErrors((prev) => ({
      ...prev,
      category: '',
    }));
  };

  // Group skills by category
  const skillsByCategory = skillsList.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  // Create category options for select
  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));

  // Create skill level options
  const skillLevelOptions = [
    { value: '', label: 'Select level (optional)' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Expert', label: 'Expert' },
  ];

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that there is at least one skill
    if (skillsList.length === 0) {
      setErrors({
        form: 'Please add at least one skill',
      });
      return;
    }

    onNext();
  };

  return (
    <FormSection
      title='Skills'
      description='Add your technical, professional, and personal skills.'
      icon={
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
          />
        </svg>
      }>
      <form onSubmit={handleSubmit}>
        {/* Add new skill form */}
        <Card className='mb-6'>
          <div className='p-4'>
            <h3 className='text-lg font-medium mb-4'>Add New Skill</h3>

            <div className='grid grid-cols-1 md:grid-cols-12 gap-4'>
              <div className='md:col-span-5'>
                <TextField
                  label='Skill Name'
                  name='name'
                  value={newSkill.name}
                  onChange={handleNewSkillChange}
                  placeholder='React.js, Project Management, Spanish, etc.'
                  error={errors.name}
                />
              </div>

              <div className='md:col-span-4'>
                <SelectField
                  label='Category'
                  name='category'
                  value={newSkill.category}
                  onChange={handleNewSkillChange}
                  options={categoryOptions}
                />

                {!showAddCategory ? (
                  <button
                    type='button'
                    className='text-sm text-blue-600 hover:text-blue-800 mt-1'
                    onClick={() => setShowAddCategory(true)}>
                    + Add new category
                  </button>
                ) : (
                  <div className='mt-2 flex items-center space-x-2'>
                    <TextField
                      label=''
                      name='newCategory'
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder='New category name'
                      error={errors.category}
                      fullWidth={false}
                      className='flex-1'
                    />
                    <div className='flex space-x-1'>
                      <Button
                        type='button'
                        size='sm'
                        variant='outline'
                        onClick={() => {
                          setShowAddCategory(false);
                          setNewCategory('');
                          setErrors((prev) => ({ ...prev, category: '' }));
                        }}>
                        Cancel
                      </Button>
                      <Button
                        type='button'
                        size='sm'
                        onClick={handleAddCategory}>
                        Add
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className='md:col-span-3'>
                <SelectField
                  label='Level (Optional)'
                  name='level'
                  value={newSkill.level || ''}
                  onChange={handleNewSkillChange}
                  options={skillLevelOptions}
                />
              </div>
            </div>

            <div className='mt-4 flex justify-end'>
              <Button
                type='button'
                onClick={handleAddSkill}
                leftIcon={
                  <svg
                    className='w-5 h-5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                }>
                Add Skill
              </Button>
            </div>
          </div>
        </Card>

        {/* Skills list grouped by category */}
        <div className='mb-6'>
          <h3 className='text-lg font-medium mb-4'>Your Skills</h3>

          {errors.form && (
            <p className='text-sm text-red-600 mb-4'>{errors.form}</p>
          )}

          {Object.keys(skillsByCategory).length === 0 ? (
            <p className='text-gray-500 italic'>
              No skills added yet. Use the form above to add skills.
            </p>
          ) : (
            <div className='space-y-4'>
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <Card key={category}>
                  <div className='px-4 py-3 bg-gray-50 border-b'>
                    <h4 className='font-medium'>{category}</h4>
                  </div>
                  <ul className='divide-y divide-gray-200'>
                    {skills.map((skill) => (
                      <li
                        key={skill.id}
                        className='px-4 py-3 flex justify-between items-center'>
                        <div>
                          <span className='font-medium'>{skill.name}</span>
                          {skill.level && (
                            <span className='ml-2 text-sm text-gray-500'>
                              ({skill.level})
                            </span>
                          )}
                        </div>
                        <button
                          type='button'
                          className='text-red-500 hover:text-red-700'
                          onClick={() => handleRemoveSkill(skill.id)}>
                          <svg
                            className='w-5 h-5'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                            />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className='mt-6 text-right'>
          <button type='submit' className='hidden'>
            Save and Continue
          </button>
        </div>
      </form>
    </FormSection>
  );
};

export default SkillsForm;
