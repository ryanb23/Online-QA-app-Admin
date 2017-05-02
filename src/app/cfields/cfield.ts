export class Cfield {
	_id?: string;
	name: string;
	description: string;
	type: string;
	key: string;
	values: [
		{
			value: string;
			label: string;
		}
	]
}