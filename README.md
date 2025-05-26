# Espresso Dialer

A comprehensive React application for tracking and dialing in your espresso shots. Built with TypeScript, this app helps coffee enthusiasts perfect their espresso brewing by tracking equipment, beans, shots, and analyzing performance over time.

## Features

### 🔧 Equipment Management
- **Grinder Registration**: Add your grinders with customizable grind setting ranges
- **Machine Registration**: Track your espresso machines with type classification
- **Equipment Overview**: View all registered equipment with easy management

### ☕ Bean Management
- **Bean Registration**: Track coffee beans with detailed information:
  - Roaster name
  - Origin country/region
  - Roast type (Single Origin, Blend, Decaf)
  - Roast level (Light to Dark)
  - Tasting notes
- **Grind Settings**: Set and adjust grind settings per bean for each grinder
- **Equipment Integration**: See which equipment is available for each bean

### 📊 Shot Tracking
- **Comprehensive Shot Recording**:
  - Bean selection
  - Grinder and machine selection
  - Grind size (dynamic range based on selected grinder)
  - Shot time (seconds)
  - Dose in (grams)
  - Yield out (grams)
  - Temperature (optional)
- **Taste Profile Tracking**:
  - Acidity (1-10 scale)
  - Bitterness (1-10 scale)
  - Sweetness (1-10 scale)
  - Fruitiness (1-10 scale)

### 📈 Analytics & Statistics
- **Equipment Combination Analysis**: Separate stats for each grinder + machine combination
- **Performance Metrics**:
  - Average ratio (dose:yield)
  - Average extraction time
  - Average grind size
  - Average yield
- **Visual Charts**:
  - Time vs Grind Size scatter plots
  - Shot progression over time
  - Average taste profile visualization
- **Recent Shot History**: Quick view of recent shots per equipment combination

### 🎨 Design Features
- **Dark Theme**: Coffee-inspired dark UI with warm accent colors
- **Mobile Responsive**: Fully optimized for mobile devices
- **Modern UI**: Clean, card-based layout with smooth animations
- **Intuitive Navigation**: Easy-to-use navigation between sections

## Technology Stack

- **React 19** with TypeScript
- **React Router** for navigation
- **Recharts** for data visualization
- **Lucide React** for icons
- **CSS Custom Properties** for theming
- **Context API** for state management

## Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd espresso-dialer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## Usage Guide

### Getting Started
1. **Register Equipment**: Start by adding your grinders and espresso machines in the Equipment section
2. **Add Beans**: Register your coffee beans with detailed information
3. **Record Shots**: Begin tracking your espresso shots with all relevant parameters
4. **Analyze Performance**: Use the Stats section to analyze your brewing patterns and improve

### Best Practices
- **Consistent Measurements**: Use a scale for accurate dose and yield measurements
- **Detailed Notes**: Add comprehensive tasting notes for beans
- **Regular Tracking**: Record shots consistently to build meaningful data
- **Equipment Specific**: Set up separate grind settings for different bean types

### Tips for Dialing In
- Use the Time vs Grind Size charts to find optimal extraction parameters
- Monitor ratio consistency across shots
- Track taste profile changes as you adjust grind size
- Compare performance across different equipment combinations

## Features in Detail

### Grind Setting Management
Each bean can have individual grind settings for different grinders. The app automatically shows the appropriate range based on your grinder's minimum and maximum settings.

### Ratio Calculation
The app automatically calculates brew ratios (dose:yield) and tracks averages over time, helping you maintain consistency.

### Equipment Combinations
Statistics are grouped by grinder + machine combinations, allowing you to optimize settings for specific equipment pairings.

### Data Persistence
Currently, data is stored in browser memory. For production use, consider implementing local storage or a backend database.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Inspired by the specialty coffee community
- Built for coffee enthusiasts who love data-driven brewing
- Design influenced by modern coffee shop aesthetics
