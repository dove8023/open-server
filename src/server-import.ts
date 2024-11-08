// src/importCSV.ts
import * as fs from "fs";
import csv from "csv-parser";
import "./common/db";
import AppDataSource from "./common/db";
import { Totals } from "./entity";

async function importTotalsCSV() {
	// Read the CSV file
	fs.createReadStream("/Users/hearth/Desktop/total.csv") // Change to your CSV file path
		.pipe(csv())
		.on("data", (row) => {
			console.log("row: ", row);
			const total = new Totals();
			total.date = row.date;
			total.sale = row.sale;
			total.percent = row.percent;
			AppDataSource.manager.save(total);
		})
		.on("end", async () => {
			console.log("CSV file successfully imported");
		})
		.on("error", (error) => {
			console.error("Error reading CSV file:", error);
		});
}

setTimeout(() => {
	importTotalsCSV().catch((error) =>
		console.error("Error during import:", error)
	);
}, 3000);
