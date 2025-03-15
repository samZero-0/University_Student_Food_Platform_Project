/* eslint-disable react/prop-types */
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function DietPlannerForm({ formData, setFormData, selectedDiets, setSelectedDiets, selectedAllergies, setSelectedAllergies, handleGenerate, isGenerating, errors }) {
  const dietaryRestrictions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free',
    'Keto', 'Low-Carb', 'Halal', 'Kosher'
  ];

  const allergies = [
    'Peanuts', 'Tree Nuts', 'Milk', 'Egg',
    'Soy', 'Wheat', 'Fish', 'Shellfish'
  ];

  const toggleItem = (item, setter) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
        <CardTitle className="text-3xl font-bold">Diet Planner</CardTitle>
        <CardDescription className="text-purple-100">Get your personalized meal plan</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField label="Age" value={formData.age} onChange={(value) => setFormData({...formData, age: value})} placeholder="Years" error={errors.age} />
          <InputField label="Weight" value={formData.weight} onChange={(value) => setFormData({...formData, weight: value})} placeholder="kg" error={errors.weight} />
          <InputField label="Height" value={formData.height} onChange={(value) => setFormData({...formData, height: value})} placeholder="cm" error={errors.height} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SelectField
            label="Gender"
            value={formData.gender}
            onChange={(value) => setFormData({...formData, gender: value})}
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' }
            ]}
          />
          <SelectField
            label="Activity Level"
            value={formData.activityLevel}
            onChange={(value) => setFormData({...formData, activityLevel: value})}
            options={[
              { value: 'sedentary', label: 'Sedentary' },
              { value: 'light', label: 'Light Exercise' },
              { value: 'moderate', label: 'Moderate Exercise' },
              { value: 'active', label: 'Very Active' }
            ]}
          />
          <SelectField
            label="Goal"
            value={formData.goal}
            onChange={(value) => setFormData({...formData, goal: value})}
            options={[
              { value: 'lose', label: 'Lose Weight' },
              { value: 'maintain', label: 'Maintain Weight' },
              { value: 'gain', label: 'Gain Weight' }
            ]}
          />
        </div>

        <ToggleSection
          label="Dietary Restrictions"
          items={dietaryRestrictions}
          selectedItems={selectedDiets}
          toggleItem={(item) => toggleItem(item, setSelectedDiets)}
        />

        <ToggleSection
          label="Allergies"
          items={allergies}
          selectedItems={selectedAllergies}
          toggleItem={(item) => toggleItem(item, setSelectedAllergies)}
        />
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          size="lg"
          onClick={handleGenerate}
         
        >
          {isGenerating ? (
            <>
              <span className="loading loading-spinner loading-sm mr-2"></span>
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Generate  Diet Recommendation
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

function InputField({ label, value, onChange, placeholder, error }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <Input
        id={label.toLowerCase()}
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? 'border-red-500' : ''}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase().replace(' ', '-')}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={label.toLowerCase().replace(' ', '-')}>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function ToggleSection({ label, items, selectedItems, toggleItem }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Badge
                variant={selectedItems.includes(item) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleItem(item)}
              >
                {item}
                {selectedItems.includes(item) && (
                  <X className="w-3 h-3 ml-1 inline" />
                )}
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default DietPlannerForm;
