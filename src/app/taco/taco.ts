export type Meat = 'Chicken' | 'Beef' | 'Steak' | 'Veggie';
export type Toppings =
  | 'Lettuce'
  | 'Sour Cream'
  | 'Cheese'
  | 'Guacamole'
  | 'Tomatoes';
export type TacoType = 'Hard' | 'Soft' | 'Salad';

export interface Taco {
  meat: Meat;
  toppings: Toppings;
  type: TacoType;
}
