import { User } from './user.type';

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
    table_id: string;
    table_number: number;
    status: string;
};