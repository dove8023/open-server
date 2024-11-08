import AppDataSource from "../common/db";
import { Restful, Router } from "../common/restful";
import { ContextCustomer } from "../interface";
import { Totals } from "../entity";
import { CTX } from "../interface";

@Restful()
export class TotalsController {
	@Router("/ping", "get")
	ping(ctx: ContextCustomer) {
		ctx.success("pong");
	}

	async find(ctx: CTX) {
		const repository = AppDataSource.getRepository(Totals);
		const [sqlResult, count] = await repository.findAndCount({
			order: {
				date: "ASC",
			},
		});

		ctx.success({
			count,
			list: sqlResult,
		});
	}
}
