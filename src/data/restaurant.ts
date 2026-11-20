const name = "Versato’s Pizza";

const address = {
  street: "12753 50 St NW",
  city: "Edmonton",
  province: "AB",
};

const fullAddress = `${address.street}, ${address.city}, ${address.province}`;

const directionsQuery = new URLSearchParams({
  api: "1",
  destination: fullAddress,
});

const mapQuery = new URLSearchParams({
  q: `${name}, ${fullAddress}`,
  output: "embed",
});

type Hours = { days: string; time: string };

// Phone numbers and regular hours come from the contact image on versatospizza.com.
export const restaurant = {
  name,
  address,
  phones: {
    main: { label: "780-413-3440", href: "tel:+17804133440" },
    alternate: { label: "780-428-3547", href: "tel:+17804283547" },
  },
  hours: [
    { days: "Monday", time: "Closed" },
    { days: "Tuesday–Wednesday", time: "11 am–10 pm" },
    { days: "Thursday–Saturday", time: "11 am–11 pm" },
    { days: "Sunday", time: "3 pm–10 pm" },
  ],
  holidayHours: [] as Hours[],
  googleRating: {
    // Edmonton Local recorded 4.5 from 898 Google reviews on 2026-10-13.
    score: 4.5,
    reviewCount: "900+",
    href: "https://www.google.com/maps/place/@53.58687,-113.416975,17z/data=!4m10!3m9!1s0x53a03ccec8303b45:0xb0a683131c4c2d5e!5m2!4m1!1i2!8m2!3d53.58687!4d-113.416975!9m1!1b1",
  },
  links: {
    doorDash: "https://www.doordash.com/en-CA/store/versatos-pizza-edmonton-38957197/",
    directions: `https://www.google.com/maps/dir/?${directionsQuery}`,
    mapEmbed: `https://www.google.com/maps?${mapQuery}`,
  },
};

export const pizzaSizes = ["10″", "12″", "15″"] as const;

type PizzaPrices = [number | null, number | null, number | null];

type Pizza = {
  name: string;
  toppings: string;
  thick: PizzaPrices;
  thinPair?: PizzaPrices;
};

// In-store prices from the official menu images linked at versatospizza.com (2025-08-30).
const tRex = {
  name: "T-Rex",
  toppings: "Pepperoni, salami, ham, beef, bacon, mozzarella",
  thick: [30.45, 38.45, 47.20],
  thinPair: [42.35, 51.10, 60.80],
} satisfies Pizza;

const versatosSpecial = {
  name: "Versato’s Special",
  toppings: "Pepperoni, salami, ham, mushrooms, onions, green peppers, pineapple, shrimp, mozzarella",
  thick: [30.45, 38.45, 47.20],
  thinPair: [42.35, 51.10, 60.80],
} satisfies Pizza;

const bigOneWeight = "about 7 lb";
const originalThickSpecialtyWeight = "about 4½ lb";

export const bigOne = {
  name: "The Big One",
  toppings: `Choose ${tRex.name} or ${versatosSpecial.name} with extra meat on our Original Thick crust. The Big One weighs ${bigOneWeight}. The Original Thick versions of those pizzas weigh ${originalThickSpecialtyWeight}.`,
  thick: [null, 46.95, 57.75],
  styles: [tRex, versatosSpecial],
  weight: bigOneWeight,
  originalThickWeight: originalThickSpecialtyWeight,
} satisfies Pizza & { styles: Pizza[]; weight: string; originalThickWeight: string };

// Prices in each array follow pizzaSizes. A null price marks an unavailable size.
export const pizzas: Pizza[] = [
  {
    name: "Plain Cheese",
    toppings: "Mozzarella",
    thick: [28.00, 36.05, 44.75],
    thinPair: [39.90, 48.40, 58.35],
  },
  {
    name: "Pepperoni",
    toppings: "Pepperoni, mozzarella",
    thick: [28.00, 36.05, 44.75],
    thinPair: [39.90, 48.40, 58.35],
  },
  {
    name: "Veggy",
    toppings: "Green peppers, onions, mushrooms, pineapple, tomatoes, olives, mozzarella",
    thick: [28.00, 36.05, 44.75],
    thinPair: [39.90, 48.40, 58.35],
  },
  {
    name: "Hawaiian",
    toppings: "Ham, pineapple, mozzarella",
    thick: [28.00, 36.05, 44.75],
    thinPair: [39.90, 48.40, 58.35],
  },
  {
    name: "Oilers Special",
    toppings: "Ham, pepperoni, green peppers, mushrooms, pineapple, mozzarella",
    thick: [28.00, 36.05, 44.75],
    thinPair: [39.90, 48.40, 58.35],
  },
  {
    name: "Greek Special",
    toppings: "Pepperoni, beef, green peppers, onions, tomatoes, olives, mozzarella, feta, parmesan",
    thick: [29.55, 37.25, 46.05],
    thinPair: [41.15, 49.85, 59.60],
  },
  {
    name: "Chicken",
    toppings: "Chicken, green peppers, onions, teriyaki and BBQ sauce mix, mozzarella, cheddar, parmesan",
    thick: [29.55, 37.25, 46.05],
    thinPair: [41.15, 49.85, 59.60],
  },
  {
    name: "Taco",
    toppings: "Beef, green peppers, tomatoes, taco chips, salsa sauce, mozzarella, cheddar",
    thick: [29.55, 37.25, 46.05],
    thinPair: [41.15, 49.85, 59.60],
  },
  {
    name: "Flame Thrower",
    toppings: "Pepperoni, beef, green peppers, onions, hot peppers, mozzarella",
    thick: [29.55, 37.25, 46.05],
    thinPair: [41.15, 49.85, 59.60],
  },
  {
    name: "Big Cheese",
    toppings: "Mozzarella, cheddar, feta, parmesan",
    thick: [29.55, 37.25, 46.05],
    thinPair: [41.15, 49.85, 59.60],
  },
  {
    name: "Guybo Special",
    toppings: "Pepperoni, salami, mushrooms, onions, mozzarella, cheddar",
    thick: [30.45, 38.45, 47.20],
    thinPair: [42.35, 51.10, 60.80],
  },
  tRex,
  {
    name: "Heater",
    toppings: "Pepperoni, double sauce, mozzarella, cheddar",
    thick: [30.45, 38.45, 47.20],
    thinPair: [42.35, 51.10, 60.80],
  },
  versatosSpecial,
  bigOne,
];

export const extraToppings = [
  { name: "Meat", prices: [2.10, 2.60, 3.15] },
  { name: "Veggie", prices: [1.50, 2.10, 2.60] },
  { name: "Cheese", prices: [3.15, 3.70, 4.35] },
];

export type MenuItem = {
  name: string;
  description?: string;
  options: { label?: string; price: number }[];
};

export const combos: MenuItem[] = [
  {
    name: "Combo 1",
    description: "Dry garlic ribs, Caesar salad and garlic toast",
    options: [{ label: "For 1", price: 21.35 }, { label: "For 2", price: 36.95 }],
  },
  {
    name: "Combo 2",
    description: "Chicken wings, Caesar salad and garlic toast",
    options: [{ label: "For 1", price: 21.35 }, { label: "For 2", price: 36.95 }],
  },
];

export const sides: MenuItem[] = [
  {
    name: "Bread Sticks",
    options: [{ label: "Regular", price: 8.65 }, { label: "Large", price: 10.95 }],
  },
  {
    name: "Boneless Dry Garlic Ribs",
    options: [{ label: "Regular", price: 17.55 }, { label: "Large", price: 27.10 }],
  },
  {
    name: "Chicken Wings",
    description: "Hot, honey garlic, BBQ, teriyaki, or salt and pepper",
    options: [{ price: 17.55 }],
  },
  {
    name: "Caesar Salad",
    options: [{ label: "Regular", price: 7.80 }, { label: "Large", price: 12.40 }],
  },
  { name: "Cheese Toast", options: [{ price: 3.35 }] },
  {
    name: "Chicken Fingers",
    options: [{ label: "Each", price: 2.90 }, { label: "5 for", price: 12.95 }],
  },
  { name: "Fries", options: [{ price: 4.80 }] },
  { name: "Onion Rings", options: [{ price: 4.80 }] },
  { name: "Garlic Toast", options: [{ price: 2.20 }] },
];

export const lasagna: MenuItem = {
  name: "Lasagna",
  description: "Includes garlic toast",
  options: [
    { label: "Single", price: 14.70 },
    { label: "Family for 6", price: 32.80 },
    { label: "Party size for 12", price: 59.00 },
  ],
};

export const menuNotes = {
  thick: "Prices are for one Original Thick pizza.",
  thinPair: "Prices are for both pizzas. Each has half the meat of an Original Thick, so the pair has the same amount of meat spread across two crusts.",
  flipped: "Ask to have your pizza flipped to keep the crust dry.",
  pricing: "In-store prices in CAD. Prices may change.",
  delivery: "Place delivery orders at least one hour before closing.",
  coupons: "Third-party coupons are excluded.",
};

// Swap examples from versatospizza.com/faq.
export const toppingSwaps = [
  { kind: "Vegetable", from: "Onions", to: "green peppers" },
  { kind: "Meat", from: "Pepperoni", to: "beef" },
  { kind: "Cheese", from: "Cheddar", to: "feta" },
];

export const orderingFaq = [
  {
    question: "How can I order from Versato's Pizza?",
    answer: "Choose how you’d like to order.",
    orderOptions: [
      { intro: "Order online through", label: "DoorDash", href: restaurant.links.doorDash },
      { intro: "Call us directly at", label: restaurant.phones.main.label, href: restaurant.phones.main.href },
      { intro: "Pick up at", label: restaurant.address.street, href: restaurant.links.directions, suffix: `, ${restaurant.address.city}` },
    ],
  },
  {
    question: "What areas do you deliver to?",
    answer: "lorem ipsum dolor sit amet consectetur adipiscing elit culpa minim maxime tempore soluta ex est irure veniam sunt excepturi officia in laborum harum cum distinctio duis aliqua quo cum voluptas excepturi in ut ducimus cupiditate nisi vero ducimus et deserunt iusto dolor et ut facilis officia facere omnis praesentium sint",
  },
  {
    question: "Can I swap a topping?",
    answer: "Yes. Swap it for another of the same kind. For example, trade onions for green peppers, pepperoni for beef, or cheddar for feta. Mention the swap when you call.",
  },
  {
    question: "What are your most popular pizzas?",
    answer: "lorem ipsum dolor sit amet consectetur adipiscing elit culpa minim maxime tempore soluta ex est irure veniam sunt excepturi officia in laborum harum cum distinctio duis aliqua quo cum voluptas excepturi in ut ducimus cupiditate nisi vero ducimus et deserunt iusto dolor et ut facilis officia facere omnis praesentium sint",
  },
];
