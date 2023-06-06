export interface Pond {
    id: Number,
    id_equipment: Number,
    id_microalgae_state: Number,
    microalgae_name: String,
    inoculation_date: String,
    harvest_date: String | undefined,
    min_NTU: Number,
    max_NTU: Number
}

export type PondNew = Omit<Pond, "id" | "harvest_date">;

export type PondUpdate = Omit<Pond, "id">;