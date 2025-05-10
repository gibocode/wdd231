export default class Navigation {
    constructor(text, link, is_active = false) {
        this.text = text;
        this.link = link;
        this.is_active = is_active;
    }
    render() {
        return `
            <li class="nav-item">
                <a class="nav-link ${this.is_active ? 'active' : ''}" href="${this.link}">
                    ${this.text}
                </a>
            </li>
        `;
    }
}
