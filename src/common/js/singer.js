export default class Singer {
	constructor({id, name, sex, age, tel, slogan, city, avater, state, images, stories}) {
		this.id = id;
		this.name = name;
		this.sex = sex;
		this.age = age;
		this.tel = tel;
		this.slogan = slogan;
		this.city = city;
		this.avater = avater;
		this.state = state;
		this.images = images;
		this.stories = stories;
	}
}
export function CreateSinger({id, name, sex, age, tel, slogan, city, avater, state, images, stories}) {
	return new Singer({id, name, sex, age, tel, slogan, city, avater, state, images, stories})
}