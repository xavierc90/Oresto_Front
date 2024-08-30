export type Table = {
    _id: string;
    company_id: string;
    created_by: string;
    table_number: string;
    table_size: number;
    shape: "rectangle" | "square" | "round";
    status: "available" | "reserved" | "unavailable";
    index: number;
    position_x: number;
    position_y: number;
    rotate: number;
    created_at: string;
    updated_at: string;
  }