export class Offer {
  _id?: string;
  name: string;
  url: string;
  img_url: string;
  description: string;
  checks: {
  	check_gender1: {
  		use: boolean;
  		cond: string;
  	},
  	check_gender2: {
  		use: boolean;
  		cond: string;
  	},
  	check_age: {
  		use: boolean;
  		cond: string;
  		val: number;
  	}
  };
  preqst: {
    type: string;
    key: string;
    description: string;
    primaryValue: string;
    values: [
      {
        value: string;
        label: string;
      }
    ]
  };
  cfields: Array<{cfield_id: string;use: boolean;}>;
}