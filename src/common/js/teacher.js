export default class Teacher {
	constructor({id, name, sex, age, tel, slogan, avatar, email, qq, stories}) {
		this.id = id;
		this.name = name;
		this.sex = sex;
		this.age = age;
		this.tel = tel;
		this.slogan = slogan;
		this.avatar = avatar;
		this.qq = qq;
		this.email = email;
		this.stories = stories;
	}
}
export function CreateTeacher({id, name, sex, age, tel, slogan, avatar, email, qq, stories}) {
	return new Teacher({id, name, sex, age, tel, slogan, avatar, email, qq, stories})
}