import { existsSync } from "node:fs";
import dotenv from "dotenv";

let envPath: string;
if(existsSync("/opt/config/.env")){
	envPath = "/opt/config/.env";
}else{
	envPath = "./.env";
}

dotenv.config({
	path: envPath,
});

import "./src/main";
