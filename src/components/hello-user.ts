import DynamicHtmlElement from "../core/dynamic-html-element";

export default class HelloUser extends DynamicHtmlElement {

    static get observedAttributes(): string[] {
        return ['user', 'age'];
    }

    user: string;
    age: number | null;

    constructor() {
        super();

        this.user = '';
        this.age = null;
        this.propertyUpdateCallback('user', this.updateContent);
        this.propertyUpdateCallback('age', this.updateContent);
    }

    connectedCallback() {
        this.updateContent();
    }

    userTemplate() {
        return this.user ? ` ${this.user}` : '!!!';
    }

    ageTemplate() {
        return this.age ? `, you are ${this.age} years old!` : '';
    }

    updateContent() {
        this.textContent = `Hello${this.userTemplate()}${this.ageTemplate()}`;
    }
}
