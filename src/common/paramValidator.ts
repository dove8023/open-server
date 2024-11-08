import { isUUID, isString } from "class-validator";
import { CTX } from "../interface";

export function uuidCheck(key = "id"){
	return function(target: any, propertyKey: string, desc: PropertyDescriptor){
		const $fn = desc.value;
		desc.value = async function(ctx: CTX){
			const value = ctx.request.params[key];
			if(!isUUID(value)){
				return ctx.error(302);
			}

			await $fn(ctx);
		};
	};
}

export function isNatureInt(where: "body"|"query", key: string, defaultVal: number, max?: number){
	return function(target: any, propertyKey: string, desc: PropertyDescriptor){
		const $fn = desc.value;
		desc.value = async function(ctx: CTX){
			let value = Number(ctx.request[where][key]);
			if(!value || value < 0){
				value = defaultVal;
			}

			if(max && value > max){
				value = max;
			}

			ctx.request[where][key] = value;
			await $fn(ctx);
		};
	};
}

/* empty string is ok */
export function isValidString(where: "body"|"query", key: string, maxlen: number, isRequired = true){
	return function(target: any, propertyKey: string, desc: PropertyDescriptor){
		const $fn = desc.value;
		desc.value = async function(ctx: CTX){
			let value = ctx.request[where][key];

			if(value === undefined && !isRequired){
				await $fn(ctx);
				return;
			}

			if(!isString(value)){
				return ctx.error(302, `${key} must be string`);
			}

			value = value.trim();

			if(value.length > maxlen){
				return ctx.error(302, `${key} out limit`);
			}

			await $fn(ctx);
		};
	};
}

export function enumCheck(where: "body"|"query", key: string, enums: string[]){
	return function(target: any, propertyKey: string, desc: PropertyDescriptor){
		const $fn = desc.value;
		desc.value = async function(ctx: CTX){
			const value = ctx.request[where][key];
			if(!value || enums.indexOf(value) < 0){
				return ctx.error(302, `${key} not valid`);
			}

			await $fn(ctx);
		};
	};
}

export function isLegalArray(where: "body"|"query", key: string, maxlen: number){
	return function(target: any, propertyKey: string, desc: PropertyDescriptor){
		const $fn = desc.value;
		desc.value = async function(ctx: CTX){
			const value = ctx.request[where][key];
			if(!Array.isArray(value)){
				return ctx.error(302, `${key} not valid`);
			}

			if(!value.length){
				return ctx.error(302, `${key} cannot empty`);
			}

			if(value.length > maxlen){
				return ctx.error(302, `${key} out size`);
			}

			await $fn(ctx);
		};
	};
}
