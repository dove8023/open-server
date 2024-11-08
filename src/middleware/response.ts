import { Next, Context } from "koa";
import errorMsg from "../common/errorMsg";

export async function response(ctx: Context, next: Next) {
	ctx.success = function <Type>(data: Type) {
		ctx.body = {
			code: 0,
			msg: "ok",
			data,
		};
	};

	ctx.error = function (code: number, msg?: string) {
		ctx.body = {
			code,
			msg: msg || errorMsg[code],
		};
	};

	await next();
}
