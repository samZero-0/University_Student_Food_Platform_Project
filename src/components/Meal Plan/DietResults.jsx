/* eslint-disable react/prop-types */
import  { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Check, Download } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { DietPDF } from './DietPDF';
import { getBMICategory } from './dietUtils';




const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function DietResults({ results }) {
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: results.recommendations.breakfast[0],
    lunch: results.recommendations.lunch[0],
    dinner: results.recommendations.dinner[0],
  });

  const bmiCategory = getBMICategory(results.bmi);

  const calorieData = [
    { name: 'BMR', calories: results.calories.bmr },
    { name: 'Maintenance', calories: results.calories.maintenance },
    { name: 'Target', calories: results.calories.target },
  ];

  const macroData = [
    { name: 'Protein', value: selectedMeals.breakfast.protein + selectedMeals.lunch.protein + selectedMeals.dinner.protein },
    { name: 'Carbs', value: selectedMeals.breakfast.carbs + selectedMeals.lunch.carbs + selectedMeals.dinner.carbs },
    { name: 'Fat', value: selectedMeals.breakfast.fat + selectedMeals.lunch.fat + selectedMeals.dinner.fat },
  ];

  const macroChartRef = useRef(null);
  const [macroChartUrl, setMacroChartUrl] = useState('');

  const captureMacroChart = () => {
    if (macroChartRef.current) {
      const svgElement = macroChartRef.current.container.children[0];
      const svgData = new XMLSerializer().serializeToString(svgElement);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      setMacroChartUrl(url);
    }
  };

  useEffect(() => {
    captureMacroChart();
  }, [selectedMeals]);

  return (
    <div className="space-y-6 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Body Mass Index (BMI)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-4xl font-bold">{results.bmi} kg/m²</div>
            <div className="text-xl mt-2">{bmiCategory}</div>
            <div className="text-sm text-muted-foreground mt-2">
              Healthy BMI range: 18.5 kg/m² - 25 kg/m²
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Calories Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={calorieData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calories" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Diet Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(results.recommendations).map(([meal, options]) => (
              <div key={meal} className="space-y-2">
                <Label>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</Label>
                <Select
                  value={selectedMeals[meal].name}
                  onValueChange={(value) => 
                    setSelectedMeals(prev => ({ ...prev, [meal]: options.find(o => o.name === value) }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option, index) => (
                      <SelectItem key={index} value={option.name}>
                        {option.name} ({option.calories} cal)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-sm">
                  <p>Calories: {selectedMeals[meal].calories}</p>
                  <p>Protein: {selectedMeals[meal].protein}g</p>
                  <p>Carbs: {selectedMeals[meal].carbs}g</p>
                  <p>Fat: {selectedMeals[meal].fat}g</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <div className="font-medium mb-4">Macronutrient Distribution:</div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart ref={macroChartRef}>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {macroData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center text-green-600 gap-2 pt-4">
            <Check className="w-5 h-5" />
            <span>Recommendation Generated Successfully!</span>
          </div>

          <div className="flex justify-center mt-4">
            <PDFDownloadLink
              document={<DietPDF results={results} selectedMeals={selectedMeals} macroChartUrl={macroChartUrl} />}
              fileName="diet_recommendation.pdf"
            >
              {({ blob, url, loading, error }) => (
                <Button
                  onClick={captureMacroChart}
                  disabled={loading}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {loading ? 'Generating PDF...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



