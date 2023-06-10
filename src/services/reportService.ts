import config from "../config";
import { client } from "../dataBase";
import { ReportUpdate, Report, ReportNew } from "../types/report_types";


export const getReports = async (): Promise<Report[] | undefined> => {
    const query = `select * from report;`;
    const result = await client.query(query);

    if (result.rowCount > 0) {
        const reports = result.rows;

        return reports;
    }
    return undefined;
}

export const getReport = async (id: Number): Promise<Report[] | undefined> => {
    const query = `select * from report as rp where rp.pond_id=${id};`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        const report = await result.rows;

        return report;
    }
    return undefined;
};

export const updateReport = async (id: Number,reportUpdate: ReportUpdate) => {
    const query = `UPDATE report
    SET pond_id = ${reportUpdate.pond_id},
        date = '${reportUpdate.date}',
        time = '${reportUpdate.time}',
        illumination = ${reportUpdate.illumination},
        NTU = ${reportUpdate.NTU}
    WHERE id = ${id};
    `;
    const result = await client.query(query);
    console.log(result);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};

export const addReport = async (reportNew: ReportNew) => {
    const query = `INSERT INTO report (pond_id, date, time, illumination, NTU)
    VALUES (${reportNew.pond_id}, '${config.date}', '${config.time}', ${reportNew.illumination}, ${reportNew.NTU});
    
    `;
    try {
        await client.query(query);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const deleteReport = async (id: Number) => {
    const query = ` DELETE FROM report WHERE id = ${id};`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};