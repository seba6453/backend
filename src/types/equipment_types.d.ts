export interface Equipment {
    id: Number,
    pump_state: Boolean,
    start_time: String,
    end_time: String,
    total_time?: string
}

export type EquipmentUpdate = Omit<Equipment, "id">;

export type EquipmentNew = Omit<Equipment, "id" | "pump_state">;