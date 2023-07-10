export interface Equipment {
    id: Number,
    ligth_duration: String,
    pump_state: Boolean
}

export type EquipmentUpdate = Omit<Equipment, "id">;

export type EquipmentNew = Omit<Equipment, "id" | "pump_state">;