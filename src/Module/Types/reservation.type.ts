import { User } from '../Auth/user.type';
import { Table } from './table.type';

export type Reservation = {
  _id: string;
  user_id: User;
  email: string;
  phone_number: string;
  date_selected: Date;
  time_selected: string;
  nbr_persons: number;
  created_at: Date;
  restaurant_id: string;
  table_id: Table;  // Utilisation de Table directement ici
  table_number: string;
  status: string;  // Ajouter JSX.Element ic
  details: string;
  table: Table[];  // Utilisation de Table directement ici
  date: Date;
};
