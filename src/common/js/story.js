export default class Story {
	constructor({id, title, content, cover, category, teacher, audio, data}) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.cover = cover;
		this.category = category;
		this.teacher = teacher;
		this.audio = audio;
		this.data = data;
	}
}
export function CreateStory({id, title, content, cover, category, teacher, audio, data}) {
	return new Story({id, title, content, cover, category, teacher, audio, data})
}