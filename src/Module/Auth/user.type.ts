export type User = {
    _id: string;
    table_id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    phone_number: string;
    allergens: string;
    created_at: string;
    restaurant_id: string;
    token?: string;
    status?: string;
    reservationCount?: number;  // Ajoutez ce champ pour stocker le nombre de réservations  
};
