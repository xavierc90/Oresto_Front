import { User } from './user.type';
import { Table } from './table.type';

export type Booking = {
  _id: string;
  user_id: User;
  email: string;
  phone_number: string;
  date_selected: Date;
  time_selected: string;
  nbr_persons: number;
  created_at: Date;
  company_id: string;
  table_id: Table;  // Utilisation de Table directement ici
  status: string;
};
