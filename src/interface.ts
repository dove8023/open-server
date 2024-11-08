/*
 * @Author: Hearth
 * @Date: 2022-11-29 17:06:43
 * @Last Modified by: xisen.he
 * @Last Modified time: 2024-11-08 15:43:25
 * @content what is the content of this file. */

import { Request } from "./../node_modules/@types/express-serve-static-core/index.d";
import { type Context } from "koa";

export type CTX = Context & ContextCustomer;

export interface ContextCustomer {
	success<Type>(data: Type): void;
	error(code: number, msg?: string): void;
	logger: {
		info(data: DATA): void;
		warn(data: DATA): void;
		error(data: DATA): void;
	};

	request: Request & {
		body: DATA;
	};
}

export interface DATA {
	[index: string]: string | number | boolean | object;
}
