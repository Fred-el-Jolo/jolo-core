import { CustomHtmlElement } from "../core/custom-html-element";

export class HelloUser extends CustomHtmlElement {

    static get observedAttributes(): string[] {
        return ['user'];
    }

    user: string;

    constructor() {
        super();

        this.user = '';
        this.propertyUpdateCallback('user', this.updateContent);
    }

    connectedCallback() {
        this.updateContent();
    }


    updateContent() {
        this.textContent = `Hello, ${this.user}!`;
    }
}

// register <hello-world> with the HelloWorld class
export const register = (tagName = 'hello-user') => {
    customElements.define(tagName, HelloUser);
};
