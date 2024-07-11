import axios, { HttpStatusCode } from "axios";

interface loginCreds {
	username: string;
	password: string;
}

interface Token {
	access_token: string;
	token_type: string;
}

interface loginResponse {
	token?: Token;
	resCode: HttpStatusCode;
	errorMsg?: string;
}

const login = async (creds: loginCreds): Promise<loginResponse> => {
	try {
		const res = await axios.post("/api/token", {
			username: creds.username,
			password: creds.password,
		});

		if (res.status === 200) {
			return {
				token: res.data as Token,
				resCode: res.status,
			};
		} else {
			return {
				resCode: res.status,
				errorMsg: "Unexpected response status",
			};
		}
	} catch (err: any) {
		return {
			resCode: err.response?.status || 500,
			errorMsg: err.response?.data?.message || "An unknown error occurred",
		};
	}
};

export default login;
