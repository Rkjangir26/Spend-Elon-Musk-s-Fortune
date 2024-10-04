import React, { useState } from 'react';
import { Analytics } from "@vercel/analytics/react"
import {
  Container,
  Grid,
  Typography,
  CssBaseline,
  TextField,
  LinearProgress,
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import SpendingOption from './components/SpendingOption';
import SpendingSummary from './components/SpendingSummary';
import SpendingConfirmation from './components/SpendingConfirmation';
import ElonMuskImage from './assets/elon_musk.jpg'; // Ensure you have the image in your assets folder
import './App.css';

// Initial fortune amount
const INITIAL_FORTUNE = 200_000_000_000;

const spendingOptions = [
  { name: "AirPods Pro", cost: 249, image: "airpods.jpg" },
  { name: "Nintendo Switch", cost: 299, image: "nintendo_switch.jpg" },
  { name: "PS5", cost: 499, image: "ps5.jpg" },
  { name: "Xbox Series X", cost: 499, image: "xbox_series_x.jpg" },
  { name: "iPhone 15 Pro Max Titanium - 1TB", cost: 1599, image: "iphone_15.jpg" },
  { name: "Samsung S24 Ultra - 1TB", cost: 1499, image: "samsung_s24.jpg" },
  { name: "MacBook Pro 14' M3 Max (64GB RAM | 4TB)", cost: 4699, image: "macbook_pro.jpg" },
  { name: "Mac Studio M3 Ultra (128GB RAM | 8TB)", cost: 6999, image: "mac_studio.jpg" },
  { name: "Pro Gaming PC(I9 14900K, RTX 4090, 64GB, 4TB SSD)", cost: 6950, image: "gaming_pc.jpg" },
  { name: "Razer Blade 14 Top spec (2024)", cost: 2799, image: "razer_blade.jpg" },
  { name: "iPad Air M2 Chip (2024) (256GB)", cost: 749, image: "ipad_air.jpg" },
  { name: "Tesla Bot (Available 2026)", cost: 20000, image: "tesla_bot.jpg" },
  { name: "Start your own StartUp", cost: 5000000, image: "startup.jpg" },
  { name: "Open Fast Food Franchise", cost: 1200000, image: "fast_food_franchise.jpg" },
  { name: "Spotify for 80 years", cost: 12600, image: "spotify.jpg" },
  { name: "Entire Steam library (2024 - No discounts)", cost: 828000, image: "steam_library.jpg" },
  { name: "Launch your own satellite with your name", cost: 80000000, image: "satellite.jpg" },
  { name: "Netflix for 80 Years", cost: 18500, image: "netflix.jpg" },
  { name: "Entire production of Nvidia GPUs for 2024", cost: 1100000000, image: "nvidia_gpus.jpg" },
  { name: "Influence 1 high ranking politician", cost: 2000000, image: "politician.jpg" },
  { name: "Private Concert with ANY Super Star", cost: 1000000, image: "concert.jpg" },
  { name: "Give 10,000 USD to 5000 people", cost: 50000000, image: "give_money.jpg" },
  { name: "LG 88' OLED 8K ThinQ®", cost: 19990, image: "lg_oled.jpg" },
  { name: "Fiat 500", cost: 19000, image: "fiat_500.jpg" },
  { name: "Toyota Camry", cost: 29000, image: "toyota_camry.jpg" },
  { name: "Ford F150 Raptor 2024", cost: 65900, image: "ford_raptor.jpg" },
  { name: "Tesla Model S Plaid", cost: 132000, image: "tesla_model_s.jpg" },
  { name: "Cybertruck (Tri Motor)", cost: 70000, image: "cybertruck.jpg" },
  { name: "Tesla Roadster 2024", cost: 200000, image: "tesla_roadster.jpg" },
  { name: "Ferrari F8 Tributo", cost: 276000, image: "ferrari_f8.jpg" },
  { name: "Lamborghini Aventador SVJ", cost: 512000, image: "lamborghini.jpg" },
  { name: "Bugatti La Voiture Noire", cost: 11000000, image: "bugatti.jpg" },
  { name: "1000 Acres of land", cost: 5100000, image: "land.jpg" },
  { name: "Private Island, Central America (medium size)", cost: 4950000, image: "private_island.jpg" },
  { name: "Eating out for 80 years (4 meals/day)", cost: 3100000, image: "eating_out.jpg" },
  { name: "Diamond Ring (Tiffany - 1 carat)", cost: 17000, image: "diamond_ring.jpg" },
  { name: "Whisky Macallan Michael Dillon 1926", cost: 1530000, image: "whisky.jpg" },
  { name: "Rolex Oyster", cost: 14000, image: "rolex.jpg" },
  { name: "Les Femmes d’Alger by Picasso", cost: 179400000, image: "picasso.jpg" },
  { name: "Monalisa by Leonardo da Vinci (estimate)", cost: 869000000, image: "monalisa.jpg" },
  { name: "Helicopter Bell 206", cost: 850000, image: "helicopter.jpg" },
  { name: "10 plastic surgeries", cost: 130000, image: "plastic_surgeries.jpg" },
  { name: "One week in EVERY country of the planet", cost: 1250000, image: "world_trip.jpg" },
  { name: "College Education (USA)", cost: 190000, image: "college_education.jpg" },
  { name: "NFL Team (Average)", cost: 3000000000, image: "nfl_team.jpg" },
  { name: "NBA Team (Average)", cost: 2400000000, image: "nba_team.jpg" },
  { name: "F1 Team (Average)", cost: 700000000, image: "f1_team.jpg" },
  { name: "Jet Gulfstream G450", cost: 18000000, image: "gulfstream.jpg" },
  { name: "M1 Abrams", cost: 8000000, image: "m1_abrams.jpg" },
  { name: "Produce a Hollywood Movie", cost: 90000000, image: "hollywood_movie.jpg" },
  { name: "Regular Modern Apartment (3 bd, 2 ba)", cost: 420000, image: "modern_apartment.jpg" },
  { name: "Paris Luxury Apartment(3 bd, 3 ba)", cost: 3200000, image: "paris_apartment.jpg" },
  { name: "L.A Home (5bd, 6ba)", cost: 6000000, image: "la_home.jpg" },
  { name: "L.A Mega Mansion (8 bd, 20 ba)", cost: 52000000, image: "mega_mansion.jpg" },
  { name: "Modern Building (35 condos + 10 Offices)", cost: 12000000, image: "modern_building.jpg" },
  { name: "Sailboat", cost: 130000, image: "sailboat.jpg" },
  { name: "Mega Yacht", cost: 300000000, image: "mega_yacht.jpg" },
];
<Analytics />
const App = () => {
  const [totalSpent, setTotalSpent] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [currentOption, setCurrentOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false); // State for Privacy Policy modal

  // Filter options based on the search term
  const filteredOptions = spendingOptions.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSpendClick = (option) => {
    setCurrentOption(option);
    setConfirmationOpen(true);
  };

  const handleConfirmSpend = () => {
    const existingOption = selectedOptions.find(o => o.name === currentOption.name);
    if (existingOption) {
      existingOption.quantity += 1; // Increase quantity if already selected
    } else {
      setSelectedOptions([...selectedOptions, { ...currentOption, quantity: 1 }]); // Add new item with quantity
    }
    setTotalSpent(totalSpent + currentOption.cost);
    setConfirmationOpen(false);
  };

  const handleRemove = (option) => {
    setSelectedOptions(selectedOptions.filter(o => o.name !== option.name));
    setTotalSpent(totalSpent - (option.cost * option.quantity));
  };

  const handleChangeQuantity = (option, newQuantity) => {
    if (newQuantity >= 0) {
      const updatedOptions = selectedOptions.map(o => {
        if (o.name === option.name) {
          return { ...o, quantity: newQuantity };
        }
        return o;
      });
      setSelectedOptions(updatedOptions);
      const newTotal = updatedOptions.reduce((total, o) => total + o.cost * o.quantity, 0);
      setTotalSpent(newTotal);
    }
  };

  const remainingBalance = INITIAL_FORTUNE - totalSpent;
  const percentageSpent = ((totalSpent / INITIAL_FORTUNE) * 100).toFixed(6);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      
      <Box sx={{ textAlign: 'center', marginBottom: 4, backgroundColor: '#f7f7f7', padding: 4, borderRadius: 2 }}>
  {/* Elon Musk's Image */}
  <div className="elon-image-container">
    <img 
      src={ElonMuskImage} 
      alt="Elon Musk" 
      className="elon-image"
    />
  </div>
  <Typography variant="h2" color="primary" gutterBottom>
    Spend Elon Musk's Fortune
  </Typography>
  <Typography variant="h5" color="textSecondary">
    Remaining: <strong>${remainingBalance.toLocaleString()} USD</strong>
  </Typography>
  <Typography variant="h5" color="textSecondary">
    You only spent <strong>{percentageSpent} %</strong> of the total!
  </Typography>
  <Grid container justifyContent="center" style={{ margin: '20px 0' }}>
    <Grid item xs={12} sm={6} md={4}>
      <TextField
        label="Search for an item"
        variant="outlined"
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Grid>
  </Grid>
  <LinearProgress variant="determinate" value={(totalSpent / INITIAL_FORTUNE) * 100} />
</Box>

      <Grid container spacing={3}>
        {filteredOptions.map((option, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <SpendingOption 
              option={option} 
              onSpend={handleSpendClick} 
              onRemove={handleRemove} 
              quantity={selectedOptions.find(o => o.name === option.name)?.quantity || 0} 
              onChangeQuantity={handleChangeQuantity} 
            />
          </Grid>
        ))}
      </Grid>

      <Grid container justifyContent="center" style={{ margin: '20px 0' }}>
        <Grid item xs={12} sm={8}>
          <Paper style={{ padding: 16 }}>
            <SpendingSummary 
              totalSpent={totalSpent} 
              selectedOptions={selectedOptions} 
              onChangeQuantity={handleChangeQuantity} 
              onRemove={handleRemove} 
            />
          </Paper>
        </Grid>
      </Grid>

      <SpendingConfirmation
        open={confirmationOpen}
        option={currentOption}
        onClose={() => setConfirmationOpen(false)}
        onConfirm={handleConfirmSpend}
      />

      {/* Privacy Policy Section */}
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Button variant="text" onClick={() => setPrivacyPolicyOpen(true)}>
          Privacy Policy
        </Button>
      </Box>

      {/* Privacy Policy Modal */}
      <Dialog open={privacyPolicyOpen} onClose={() => setPrivacyPolicyOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            This app is for entertainment purposes only. We do not collect any personal data, and all spending is fictional.
          </Typography>
        </DialogContent>
        <Button onClick={() => setPrivacyPolicyOpen(false)}>Close</Button>
      </Dialog>
    </Container>
  );
};

export default App;
