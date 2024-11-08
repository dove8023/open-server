import "reflect-metadata";
import { DataSource } from "typeorm";
import { Totals } from "../entity";
// console.log("Total: ", Totals);

export const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.MYSQL_HOST,
	port: Number(process.env.MYSQL_PORT) || 3306,
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DBNAME,
	logging: true,
	entities: [Totals],
	// migrations: [Totals],
	synchronize: false,
	subscribers: [],
});

AppDataSource.initialize()
	.then(async () => {
		console.log("Database connect success.");
	})
	.catch((err) => {
		console.log("Error database connect error: ", err);
	});

export default AppDataSource;
