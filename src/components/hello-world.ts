import JoloHtmlElement from "../core/jolo-html-element";

export default class HelloWorld extends JoloHtmlElement {

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
