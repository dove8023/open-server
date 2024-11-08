import { Entity, Column } from "typeorm";
import { Common } from "./Common";
import { Length } from "class-validator";

@Entity()
export class Totals extends Common {
	@Column({ type: "varchar" })
	date!: string;

	@Column({ type: "varchar" })
	@Length(1, 50)
	sale!: number;

	@Column({ type: "varchar" })
	percent!: string;
}
