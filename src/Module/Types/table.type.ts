export interface Table {
  _id: string;
  restaurant_id: string;
  created_by: string;
  number: string;
  capacity: number;
  shape: 'rectangle' | 'round' | 'square';
  status: 'available' | 'archived' | 'canceled';
  index: number;
  position_x: number;
  position_y: number;
  rotate: number;
  created_at: string;
  __v: number;
}