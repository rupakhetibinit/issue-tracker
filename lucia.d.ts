/// <reference types="lucia-auth" />
declare namespace Lucia {
	type Auth = import('@/lib/lucia.ts').Auth;
	type UserAttributes = {
		username: string;
		email: string;
	};
}
