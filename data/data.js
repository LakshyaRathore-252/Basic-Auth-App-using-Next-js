// data.js

// Countries
export const countries = [
  { value: "india", label: "India" }
];

// States with associated country
export const states = [
  { value: "andhra_pradesh", label: "Andhra Pradesh", country: "india" },
  { value: "arunachal_pradesh", label: "Arunachal Pradesh", country: "india" },
  { value: "assam", label: "Assam", country: "india" },
  { value: "bihar", label: "Bihar", country: "india" },
  { value: "chhattisgarh", label: "Chhattisgarh", country: "india" },
  { value: "goa", label: "Goa", country: "india" },
  { value: "gujarat", label: "Gujarat", country: "india" },
  { value: "haryana", label: "Haryana", country: "india" },
  { value: "himachal_pradesh", label: "Himachal Pradesh", country: "india" },
  { value: "jharkhand", label: "Jharkhand", country: "india" },
  { value: "karnataka", label: "Karnataka", country: "india" },
  { value: "kerala", label: "Kerala", country: "india" },
  { value: "madhya_pradesh", label: "Madhya Pradesh", country: "india" },
  { value: "maharashtra", label: "Maharashtra", country: "india" },
  { value: "manipur", label: "Manipur", country: "india" },
  { value: "meghalaya", label: "Meghalaya", country: "india" },
  { value: "mizoram", label: "Mizoram", country: "india" },
  { value: "nagaland", label: "Nagaland", country: "india" },
  { value: "odisha", label: "Odisha", country: "india" },
  { value: "punjab", label: "Punjab", country: "india" },
  { value: "rajasthan", label: "Rajasthan", country: "india" },
  { value: "sikkim", label: "Sikkim", country: "india" },
  { value: "tamil_nadu", label: "Tamil Nadu", country: "india" },
  { value: "telangana", label: "Telangana", country: "india" },
  { value: "tripura", label: "Tripura", country: "india" },
  { value: "uttar_pradesh", label: "Uttar Pradesh", country: "india" },
  { value: "uttarakhand", label: "Uttarakhand", country: "india" },
  { value: "west_bengal", label: "West Bengal", country: "india" }
];

// Cities with associated state
export const cities = [
  { value: "amaravati", label: "Amaravati", state: "andhra_pradesh" },
  { value: "itanagar", label: "Itanagar", state: "arunachal_pradesh" },
  { value: "dispur", label: "Dispur", state: "assam" },
  { value: "patna", label: "Patna", state: "bihar" },
  { value: "raipur", label: "Raipur", state: "chhattisgarh" },
  { value: "panaji", label: "Panaji", state: "goa" },
  { value: "gandhinagar", label: "Gandhinagar", state: "gujarat" },
  { value: "chandigarh", label: "Chandigarh", state: "haryana" },
  { value: "shimla", label: "Shimla", state: "himachal_pradesh" },
  { value: "ranchi", label: "Ranchi", state: "jharkhand" },
  { value: "bengaluru", label: "Bengaluru", state: "karnataka" },
  { value: "thiruvananthapuram", label: "Thiruvananthapuram", state: "kerala" },
  { value: "bhopal", label: "Bhopal", state: "madhya_pradesh" },
  { value: "mumbai", label: "Mumbai", state: "maharashtra" },
  { value: "imphal", label: "Imphal", state: "manipur" },
  { value: "shillong", label: "Shillong", state: "meghalaya" },
  { value: "aizawl", label: "Aizawl", state: "mizoram" },
  { value: "kohima", label: "Kohima", state: "nagaland" },
  { value: "bhubaneswar", label: "Bhubaneswar", state: "odisha" },
  { value: "chandigarh", label: "Chandigarh", state: "punjab" },
  { value: "jaipur", label: "Jaipur", state: "rajasthan" },
  { value: "gangtok", label: "Gangtok", state: "sikkim" },
  { value: "chennai", label: "Chennai", state: "tamil_nadu" },
  { value: "hyderabad", label: "Hyderabad", state: "telangana" },
  { value: "agartala", label: "Agartala", state: "tripura" },
  { value: "lucknow", label: "Lucknow", state: "uttar_pradesh" },
  { value: "dehradun", label: "Dehradun", state: "uttarakhand" },
  { value: "kolkata", label: "Kolkata", state: "west_bengal" }
];

// Combine for easy import
export const data = { countries, states, cities };
