export interface MenuItem {
  name: string;
  description?: string;
  price: string;
  outOfStock?: boolean;
  category?: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  emoji: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    id: 'appetizers',
    title: 'APPETIZERS',
    emoji: '🍽️',
    items: [
      { name: 'Blitz Formation Shrimp', description: 'Rice flour shrimp', price: '$14.00' },
      { name: 'Nachos', description: 'Beans, Nacho cheese, Lettuce, Tomato, Onions, Jalapeño, Sour cream, Guacamole, Scallions', price: '$13.00' },
      { name: 'Poke Nachos', description: 'Ahi Tuna in Ponzu sauce, Black and White sesame seeds, Pineapple, Jalapeño, Green onion, Sriracha', price: '$19.00' },
      { name: 'Edamame', description: 'Deep Fried, Tossed in Lemon juice, Chef\'s Seasoning', price: '$11.00' },
      { name: 'Corn Rib', price: '$12.00' },
      { name: 'Calamari', description: 'Served with Marinara', price: '$15.00' },
      { name: 'Chicharrón with Guacamole', price: '$11.00' },
      { name: 'Chips and Salsa', description: 'Served with Cheese', price: '$11.00' },
      { name: 'Quesadilla', description: 'Shredded Cheese, Nacho Cheese', price: '$10.00' },
      { name: 'Seasoned Fries', description: 'Phantom Fries tossed in Onion Powder, Caldo de tomate, Garlic Powder', price: '$9.00' },
      { name: 'Bacon Wrapped Asparagus', price: '$12.00', outOfStock: true },
      { name: 'Celery & Carrots', price: '$5.00' },
      { name: 'Super Bowl Platter', description: 'Wings, Fries, Chicharron, Corn Rib', price: '$20.00' },
    ],
  },
  {
    id: 'entrees',
    title: 'ENTREES',
    emoji: '🍽️',
    items: [
      { name: 'Wings', description: 'Pineapple Habanero Served with Carrots and Celery', price: '$15.00+' },
      { name: 'Slide Home Pulled Pork Sliders', description: 'Sweet Brioche Bun, Pulled Pork, House made BBQ sauce, Cabbage slaw, Red onions', price: '$17.00' },
      { name: 'Philly Cheese Steak', description: 'Mushrooms, Bell peppers, Onion, Provolone Cheese Served with house fries', price: '$18.00' },
      { name: 'Burrito', price: '$17.00' },
      { name: 'Tacos Hat Trick', price: '$13.00' },
      { name: 'Chicken Tenders', price: '$15.00' },
      { name: 'Home Run Chicken Sandwich', price: '$16.00' },
      { name: 'Chopped Cheese Sandwich', price: '$18.00' },
      { name: 'Pork Ribs', price: '$17.00' },
      { name: 'Gametime Burger', price: '$19.00' },
      { name: 'Caesar Wrap', price: '$16.00' },
      { name: 'Southwest Wrap', price: '$17.00' },
      { name: 'Simple Play Wrap', price: '$15.00' },
      { name: 'Posole', price: '$8.00' },
      { name: 'Leprechaun\'s Feast', price: '$17.00' },
      { name: 'Dodger Dog', price: '$13.00' },
    ],
  },
  {
    id: 'salads',
    title: 'SALADS',
    emoji: '🥗',
    items: [
      { name: 'Caesar Salad', price: '$12.00' },
      { name: 'Southwest Salad', price: '$12.00' },
      { name: 'Simple Play', price: '$10.00' },
      { name: 'Side Salad', price: '$5.00' },
    ],
  },
  {
    id: 'desserts',
    title: 'DESSERTS',
    emoji: '🍰',
    items: [
      { name: 'Churro Fries and Ice Cream', price: '$13.00' },
      { name: 'Creme Brulee', price: '$13.00' },
      { name: 'Deep Fried Oreos and Ice Cream', price: '$13.00' },
      { name: 'Dubai Shamrock Delight', price: '$13.00' },
    ],
  },
  {
    id: 'beer-buckets',
    title: 'BEER BUCKETS',
    emoji: '🍺',
    items: [
      { name: 'Domestic Bucket', price: '$25.00' },
      { name: 'Imported Bucket', price: '$30.00' },
    ],
  },
  {
    id: 'soda',
    title: 'SODA',
    emoji: '🥤',
    items: [
      { name: 'Coke', price: '$3.50' },
      { name: 'Diet Coke', price: '$3.50' },
      { name: 'Coke Zero', price: '$3.50' },
      { name: 'Sprite', price: '$3.50' },
      { name: 'Mr. Pibb', price: '$3.50' },
      { name: 'Powerade', price: '$3.50' },
      { name: 'Unsweetened Tea', price: '$3.50' },
      { name: 'Lemonade', price: '$3.50' },
      { name: 'Red Bull', price: '$5.00' },
      { name: 'Shirley Temple', price: '$3.50' },
      { name: 'Orange Juice', price: '$3.50' },
    ],
  },
  {
    id: 'seltzers',
    title: 'SELTZERS & ALCOHOLIC BEVERAGES',
    emoji: '🍹',
    items: [
      { name: 'Highnoon Black Cherry', price: '$8.00' },
      { name: 'Highnoon Watermelon', price: '$8.00' },
      { name: 'Highnoon Pineapple', price: '$8.00' },
      { name: 'Huckleberry', price: '$7.00' },
      { name: 'Mango White Claw', price: '$6.00' },
      { name: 'Nutrl Pineapple', price: '$6.00' },
      { name: 'Happy Dad', price: '$7.00' },
      { name: 'Twisted Tea', price: '$5.00' },
      { name: '-196 Peach', price: '$8.00' },
      { name: '-196 Strawberry', price: '$8.00' },
    ],
  },
  {
    id: 'merchandise',
    title: 'MERCHANDISE',
    emoji: '🛍️',
    items: [
      { name: 'T-Shirt', price: '$15.00' },
    ],
  },
];
