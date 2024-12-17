import  { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import DietPlannerForm from './DietPlannerForm';
import { DietResults } from './DietResults';
import { generateRecommendations } from './recommendationUtils';
import { calculateBMI, calculateCalories, validateInputs } from './dietUtils';


export default function DietPlanner() {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
    activityLevel: 'moderate',
    goal: 'maintain'
  });
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  const handleGenerate = async ()=> {
    const validationErrors = validateInputs(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsGenerating(true);
      
      const bmi = calculateBMI(Number(formData.weight), Number(formData.height));
      const calories = calculateCalories(
        Number(formData.weight),
        Number(formData.height),
        Number(formData.age),
        formData.gender,
        formData.activityLevel,
        formData.goal
      );

      await new Promise(resolve => setTimeout(resolve, 2000));

      const recommendations = generateRecommendations(
        Number(formData.age),
        formData.goal,
        selectedDiets,
        selectedAllergies,
        calories.target
      );

      setResults({
        bmi,
        calories,
        recommendations
      });
      setIsGenerating(false);
      toast.success('Diet plan generated successfully!');
    } else {
      toast.error('Please correct the errors in the form.');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <DietPlannerForm 
        formData={formData}
        setFormData={setFormData}
        selectedDiets={selectedDiets}
        setSelectedDiets={setSelectedDiets}
        selectedAllergies={selectedAllergies}
        setSelectedAllergies={setSelectedAllergies}
        handleGenerate={handleGenerate}
        isGenerating={isGenerating}
        errors={errors}
      />
      {results && <DietResults results={results} />}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
