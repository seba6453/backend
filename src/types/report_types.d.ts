export interface Report {
    id: Number,
    pond_id: Number,
    date: String,
    time: String,
    illumination: Number,
    NTU: Number
}

export type ReportUpdate = Omit<Report, "id">;