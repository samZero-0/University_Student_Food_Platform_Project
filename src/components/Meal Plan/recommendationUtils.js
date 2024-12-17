const baseRecommendations = {
    breakfast: [
      { name: 'Oatmeal with fruits', calories: 300, protein: 10, carbs: 50, fat: 5 },
      { name: 'Panta Bhat (fermented rice) with onion and chili', calories: 350, protein: 8, carbs: 55, fat: 5 },
      { name: 'Whole grain toast with avocado', calories: 350, protein: 8, carbs: 35, fat: 20 },
      { name: 'Vegetable omelette with spinach', calories: 280, protein: 18, carbs: 10, fat: 18 },
      { name: 'Idli with coconut chutney', calories: 300, protein: 10, carbs: 50, fat: 8 },
      { name: 'Boiled eggs with brown bread', calories: 320, protein: 20, carbs: 25, fat: 12 },
      { name: 'Roti with mixed vegetable bharta', calories: 370, protein: 12, carbs: 50, fat: 10 },
      { name: 'Chia seed pudding with banana', calories: 250, protein: 10, carbs: 30, fat: 12 },
      { name: 'Masoor dal with rice', calories: 340, protein: 15, carbs: 60, fat: 5 },
      { name: 'Flattened rice (Chirer Polao) with peanuts', calories: 300, protein: 12, carbs: 45, fat: 10 },
      { name: 'Shemai (sweet vermicelli)', calories: 350, protein: 8, carbs: 55, fat: 12 },
      { name: 'Scrambled eggs with vegetables', calories: 280, protein: 20, carbs: 10, fat: 15 },
      { name: 'Sweet potato mash with black pepper', calories: 320, protein: 5, carbs: 50, fat: 8 },
    ],
    lunch: [
      { name: 'Steamed rice with lentil soup (dal)', calories: 420, protein: 18, carbs: 65, fat: 8 },
      { name: 'Grilled chicken curry with brown rice', calories: 480, protein: 35, carbs: 60, fat: 18 },
      { name: 'Khichuri with mixed vegetables', calories: 430, protein: 15, carbs: 70, fat: 10 },
      { name: 'Shorshe Ilish (Hilsa fish in mustard sauce)', calories: 470, protein: 30, carbs: 60, fat: 15 },
      { name: 'Vegetable biryani with paneer', calories: 450, protein: 15, carbs: 70, fat: 12 },
      { name: 'Grilled fish with sautéed spinach', calories: 420, protein: 30, carbs: 20, fat: 10 },
      { name: 'Bhuna khichuri with egg curry', calories: 470, protein: 20, carbs: 75, fat: 15 },
      { name: 'Beef curry with basmati rice', calories: 500, protein: 35, carbs: 65, fat: 20 },
      { name: 'Mixed vegetable curry with roti', calories: 390, protein: 12, carbs: 55, fat: 10 },
      { name: 'Lentil stew with quinoa', calories: 380, protein: 18, carbs: 50, fat: 8 },
      { name: 'Chicken korma with pilaf', calories: 520, protein: 40, carbs: 65, fat: 22 },
      { name: 'Paneer butter masala with rice', calories: 480, protein: 20, carbs: 65, fat: 20 },
      { name: 'Stir-fried tofu with vegetables', calories: 350, protein: 20, carbs: 40, fat: 12 },
    ],
    dinner: [
      { name: 'Grilled chicken breast with roasted vegetables', calories: 450, protein: 35, carbs: 25, fat: 10 },
      { name: 'Mixed vegetable curry with rice', calories: 390, protein: 12, carbs: 60, fat: 8 },
      { name: 'Lean beef stir-fry with steamed rice', calories: 500, protein: 30, carbs: 60, fat: 15 },
      { name: 'Soft vegetable stew with chicken', calories: 350, protein: 25, carbs: 30, fat: 8 },
      { name: 'Chickpea curry with roti', calories: 430, protein: 18, carbs: 55, fat: 10 },
      { name: 'Shutki machh bhuna (dry fish curry) with rice', calories: 450, protein: 30, carbs: 50, fat: 12 },
      { name: 'Dal makhani with jeera rice', calories: 400, protein: 20, carbs: 60, fat: 15 },
      { name: 'Egg curry with steamed rice', calories: 420, protein: 18, carbs: 50, fat: 20 },
      { name: 'Paneer tikka with sautéed vegetables', calories: 380, protein: 25, carbs: 30, fat: 18 },
      { name: 'Spinach and chickpea stew with quinoa', calories: 400, protein: 20, carbs: 50, fat: 12 },
      { name: 'Grilled tofu with stir-fried greens', calories: 350, protein: 20, carbs: 30, fat: 10 },
      { name: 'Masoor dal with steamed rice and lemon', calories: 380, protein: 20, carbs: 55, fat: 5 },
    ],
  };
 
  const vegetarianRecommendations = {
    breakfast: [
      { name: 'Oatmeal with fruits and nuts', calories: 300, protein: 10, carbs: 50, fat: 8 },
      { name: 'Whole grain toast with avocado and tomato', calories: 350, protein: 8, carbs: 35, fat: 20 },
      { name: 'Vegan protein smoothie', calories: 280, protein: 20, carbs: 35, fat: 8 }
    ],
    lunch: [
      { name: 'Vegan quesadilla with mixed vegetables', calories: 400, protein: 15, carbs: 65, fat: 10 },
      { name: 'Lentil soup with whole grain bread', calories: 350, protein: 18, carbs: 55, fat: 5 },
      { name: 'Vegan sushi rolls with mixed vegetables', calories: 380, protein: 12, carbs: 50, fat: 15 }
    ],
    dinner: [
      { name: 'Vegan curry with mixed vegetables and brown rice', calories: 450, protein: 18, carbs: 60, fat: 15 },
      { name: 'Vegan stir-fry with tofu and mixed vegetables', calories: 400, protein: 20, carbs: 45, fat: 18 },
      { name: 'Vegan chickpea and spinach curry with brown rice', calories: 420, protein: 18, carbs: 60, fat: 12 }
    ]
  };

  
  export const generateRecommendations = (age, goal, diets, allergies, targetCalories) => {
    let recommendations = JSON.parse(JSON.stringify(baseRecommendations));
  
    // Adjust recommendations based on age
    if (age > 40 && age <= 60) {
      recommendations.breakfast.push({ name: 'High-fiber cereal with low-fat milk', calories: 220, protein: 10, carbs: 40, fat: 3 });
      recommendations.lunch.push({ name: 'Grilled fish with mixed salad', calories: 380, protein: 30, carbs: 15, fat: 20 });
      recommendations.dinner.push({ name: 'Lean pork tenderloin with steamed vegetables', calories: 400, protein: 35, carbs: 20, fat: 15 });
    } else if (age > 60) {
      recommendations.breakfast.push({ name: 'Calcium-fortified orange juice', calories: 120, protein: 2, carbs: 28, fat: 0 });
      recommendations.lunch.push({ name: 'Sardine salad on whole grain bread', calories: 350, protein: 25, carbs: 30, fat: 15 });
      recommendations.dinner.push({ name: 'Soft cooked vegetables with lean protein', calories: 380, protein: 30, carbs: 30, fat: 12 });
    }
  
    // Adjust for dietary restrictions
    if (diets.includes('Vegetarian') || diets.includes('Vegan')) {
      recommendations = vegetarianRecommendations;
    }
  
    // Generate more options to meet calorie goals
    const mealTypes = ['breakfast', 'lunch', 'dinner'];
    const expandedRecommendations = {};
  
    mealTypes.forEach(mealType => {
      expandedRecommendations[mealType] = [];
      for (let i = 0; i < 10; i++) {  // Generate 10 options for each meal type
        const baseMeal = recommendations[mealType][Math.floor(Math.random() * recommendations[mealType].length)];
        const calorieAdjustment = ((targetCalories / 3) / baseMeal.calories) * (0.8 + Math.random() * 0.4); // 80% - 120% of target
  
        expandedRecommendations[mealType].push({
          ...baseMeal,
          calories: Math.round(baseMeal.calories * calorieAdjustment),
          protein: Math.round(baseMeal.protein * calorieAdjustment),
          carbs: Math.round(baseMeal.carbs * calorieAdjustment),
          fat: Math.round(baseMeal.fat * calorieAdjustment)
        });
      }
    });
  
    // Filter out allergens
    if (allergies.length > 0) {
      mealTypes.forEach(mealType => {
        expandedRecommendations[mealType] = expandedRecommendations[mealType].filter(item =>
          !allergies.some(allergen => item.name.toLowerCase().includes(allergen.toLowerCase()))
        );
      });
    }
  
    return expandedRecommendations;
  };
  
  
  
  