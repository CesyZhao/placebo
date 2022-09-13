export interface UserSignInEntity {
	phone: string;
	password: string;
}

export interface QRKeyResponse {
	code: number;
	unikey: string;
}

export interface QRCodeResponse {
	qrurl: string;
	qrimg: string;
}


export enum QRCodeStatus {
	Overdue = 800,
	WaitScan = 801,
	WaitConfirm = 802,
	Authorized = 803,
}

export interface QRCodeStatusResponse {
	code: QRCodeStatus
}

export interface Account {
	id: string;
	createTime: number;
	status: number;
	userName: string;
}

export enum Gender {
	Male,
	Female
}

export interface Profile {
	accountStatus: number;
	authority: number;
	avatarImgId: number;
	avatarUrl: string;
	backgroundImgId: number;
	backgroundUrl: string;
	birthday: number;
	city: number;
	province: number;
	createTime: number;
	description: string;
	followed: boolean;
	gender: Gender;
	nickname: string;
	userName: string;
	shortUserName: string;
	signature: string;
	userId: number;
}

export interface UnionProfile extends Profile {
	level: number;
}

export interface AccountResponse {
	account: Account;
	profile: Profile;
	code: number;
}

export interface UserDetailResponse {
	level: number;
	profile: Profile;
}

export const QRCodeStatusMap = new Map(
	[
		[QRCodeStatus.Overdue, 'Refresh the QR code'],
		[QRCodeStatus.WaitConfirm, 'Confirm sign in on you app'],
		[QRCodeStatus.Authorized, 'Authorized'],
	]
);