export default class Singer {
	constructor({id, name, sex, age, tel, slogan, city, avatar, state, images, stories}) {
		this.id = id;
		this.name = name;
		this.sex = sex;
		this.age = age;
		this.tel = tel;
		this.slogan = slogan;
		this.city = city;
		this.avatar = avatar;
		this.state = state;
		this.images = images;
		this.stories = stories;
	}
}
export function CreateSinger({id, name, sex, age, tel, slogan, city, avatar, state, images, stories}) {
	return new Singer({id, name, sex, age, tel, slogan, city, avatar, state, images, stories})
}