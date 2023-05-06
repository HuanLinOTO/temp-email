import rEmail from './utils/randomEmail';
import axios from 'axios';

export async function getTempEmail(maxRetries: number): Promise<string> {
	const baseUrl = 'https://www.linshi-email.com/api/v1/refreshmessage';
	const letters = 'abcdefghijklmnopqrstuvwxyz';
	const numbers = '0123456789';
	let email = '';
	let response;
	let retries = 0;

	while (retries < maxRetries) {
		// 生成随机邮箱
		email = rEmail();
		// 发送请求
		response = await axios.get(
			`${baseUrl}/d5657edc4ac154eed8c2cc5dd29871af/${email}?t=${Date.now()}`
		);
		// 检查返回体的 list 是否为空
		if (response.data.list.length === 0) {
			break;
		}
		retries++;
	}

	if (retries === maxRetries) {
		throw new Error(
			`Reached maximum retries (${maxRetries}) without finding an empty inbox.`
		);
	}

	return email;
}

export interface Email {
	address_from: string;
	eid: string;
	e_subject: string;
	e_date: number;
	name_to: string;
	name_from: string;
}

export async function waitForInbox(email: string): Promise<Email> {
	const baseUrl = 'https://www.linshi-email.com/api/v1/refreshmessage';
	let response;

	while (true) {
		// 发送请求
		response = await axios.get(
			`${baseUrl}/d5657edc4ac154eed8c2cc5dd29871af/${email}?t=${Date.now()}`
		);
		// 检查返回体的 list 是否为空
		if (response.data.list.length !== 0) {
			break;
		}
		// 等待 1 秒后再次请求
		await new Promise((resolve) => setTimeout(resolve, 1000));
	}

	// 返回收件箱中的第一封邮件
	return response.data.list[0];
}

export async function getAllEmails(email: string): Promise<Email[]> {
	const baseUrl = 'https://www.linshi-email.com/api/v1/refreshmessage';
	let response;
	let emails: Email[] = [];

	// 发送请求
	response = await axios.get(
		`${baseUrl}/d5657edc4ac154eed8c2cc5dd29871af/${email}?t=${Date.now()}`
	);

	return response.data.list;
}

// export {}
// getAllEmails('h059n6fu4m@iubridge.com').then((result) => console.log(result));
