export class HelloWorld extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.updateContent();
    }

    updateContent() {
        this.textContent = 'Hello, World!';
    }

}

// register <hello-world> with the HelloWorld class
customElements.define('hello-world', HelloWorld);
