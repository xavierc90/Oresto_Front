export type Table = {
    _id: string;
    company_id: string;
    created_by: string;
    number: string;
    capacity: number;
    shape: "rectangle" | "square" | "round";
    status: string;
    index: number;
    position_x: number;
    position_y: number;
    rotate: number;
    created_at: string;
    updated_at: string;
  }