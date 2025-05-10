export default class Course {
    constructor(group, number, credits, completed = false) {
        this.group = group;
        this.number = number;
        this.credits = credits;
        this.completed = completed;
    }
    render() {
        let title = `${this.group} ${this.number}`;
        return `
            <div class="course ${this.completed ? 'completed' : ''}">${title}</div>
        `;
    }
}
