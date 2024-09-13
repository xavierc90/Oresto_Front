import { Table } from "./table.type"; 
import { TableSlot } from "./tableslot.type";

export type TablePlan = {
  _id: string;
  date: string;
  company_id: string;
  tables: {
    table_id: Table;
    number: string;  // Correctif : c'est un string (ou number si besoin)
    capacity: number;
    shape: "rectangle" | "square" | "round";
    position_x: number;
    position_y: number;
    time_slots: TableSlot[];
  }[];
};
