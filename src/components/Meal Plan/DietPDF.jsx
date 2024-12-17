/* eslint-disable react/prop-types */
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { getBMICategory } from './dietUtils';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#f4f7f9', // Soft, professional blue-gray background
    padding: 40,
    fontFamily: 'Helvetica', // Clean, modern font
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 12, // More pronounced rounded corners
    boxShadow: '2 2 15 rgba(0, 0, 0, 0.1)', // Subtle, modern shadow
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#2c3e50', // Deep navy blue
    color: 'white',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'ultrabold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495e', // Soft dark gray
    borderBottomWidth: 2,
    borderBottomColor: '#3498db', // Bright blue accent
    paddingBottom: 10,
    marginTop: 20,
    marginBottom: 15,
    marginHorizontal: 30,
  },
  sectionContent: {
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  text: {
    fontSize: 14,
    color: '#2c3e50',
    marginBottom: 8,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2980b9', // Vibrant blue for emphasis
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: '100%',
    marginTop: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ecf0f1',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    backgroundColor: '#f1f4f7', // Light gray background
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
    paddingVertical: 10,
  },
  tableHeaderCell: {
    width: '25%',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    paddingVertical: 8,
  },
  tableCell: {
    width: '25%',
    textAlign: 'center',
    fontSize: 14,
    color: '#34495e',
  },
  chart: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 8,
    boxShadow: '1 1 10 rgba(0, 0, 0, 0.1)',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: 10,
    fontStyle: 'italic',
  },
});

export const DietPDF = ({ results, selectedMeals, macroChartUrl }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Personalized Nutrition Plan</Text>
        </View>

        <View style={styles.sectionContent}>
          <Text style={styles.subtitle}>Body Composition Analysis</Text>
          <Text style={styles.boldText}>BMI: {results.bmi} kg/m²</Text>
          <Text style={styles.text}>Category: {getBMICategory(results.bmi)}</Text>

          <Text style={styles.subtitle}>Metabolic Insights</Text>
          <Text style={styles.text}>Basal Metabolic Rate: {results.calories.bmr} calories/day</Text>
          <Text style={styles.text}>Maintenance Calories: {results.calories.maintenance} calories/day</Text>
          <Text style={styles.boldText}>Daily Calorie Target: {results.calories.target} calories/day</Text>

          <Text style={styles.subtitle}>Customized Meal Plan</Text>
          {Object.entries(selectedMeals).map(([meal, data]) => (
            <View key={meal}>
              <Text style={styles.boldText}>{meal.charAt(0).toUpperCase() + meal.slice(1)}: {data.name}</Text>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <View style={styles.tableHeaderCell}><Text>Calories</Text></View>
                  <View style={styles.tableHeaderCell}><Text>Protein</Text></View>
                  <View style={styles.tableHeaderCell}><Text>Carbs</Text></View>
                  <View style={styles.tableHeaderCell}><Text>Fat</Text></View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCell}><Text>{data.calories}</Text></View>
                  <View style={styles.tableCell}><Text>{data.protein}g</Text></View>
                  <View style={styles.tableCell}><Text>{data.carbs}g</Text></View>
                  <View style={styles.tableCell}><Text>{data.fat}g</Text></View>
                </View>
              </View>
            </View>
          ))}

          <Text style={styles.subtitle}>Macronutrient Composition</Text>
          <Image style={styles.chart} src={macroChartUrl} />
        </View>

        <Text style={styles.footer}>Personalized nutrition guidance - Consult a healthcare professional for tailored advice</Text>
      </View>
    </Page>
  </Document>
);