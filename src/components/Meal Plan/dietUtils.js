export const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return Number((weight / (heightInMeters * heightInMeters)).toFixed(2));
  };
  
  export const getBMICategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };
  
  export const calculateCalories = (weight, height, age, gender, activityLevel, goal) => {
    // Harris-Benedict Equation
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
  
    const maintenance = Math.round(bmr * activityMultipliers[activityLevel]);
  
    const goalMultipliers = {
      lose: 0.8,
      maintain: 1,
      gain: 1.2
    };
  
    const targetCalories = Math.round(maintenance * goalMultipliers[goal]);
  
    return {
      maintenance,
      target: targetCalories,
      bmr: Math.round(bmr)
    };
  };
  
  export const validateInputs = (inputs) => {
    const { age, weight, height } = inputs;
    const errors = {};
  
    if (age < 20 || age > 100) {
      errors.age = 'Age must be between 20 and 100 years.';
    }
    if (weight < 40 || weight > 200) {
      errors.weight = 'Weight must be between 40 and 200 kg.';
    }
    if (height < 140 || height > 220) {
      errors.height = 'Height must be between 140 and 220 cm.';
    }
  
    return errors;
  };
  
  