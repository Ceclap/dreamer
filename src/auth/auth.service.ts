import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async test() {
	const json = {
		text: 'Hello world',
	};
	return JSON.stringify(json);
  }
}
