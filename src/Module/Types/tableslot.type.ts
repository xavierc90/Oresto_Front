export type TableSlot = {
    timeslot: [];
    time: string; // Ex: "12:00", "20:00", etc.
    status: "available" | "reserved" | "unavailable";
    booking_id?: string;
    user_id?: string;
  }