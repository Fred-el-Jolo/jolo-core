import DynamicHtmlElement from "../core/dynamic-html-element";

const template = document.createElement('template');
template.innerHTML = `<input />`;

export default class JoloInput extends DynamicHtmlElement {

    static get observedAttributes() {
        return ['value'];
    }

    value: string;
    #inputField!: HTMLInputElement;
    #inputEventListener: EventListener;

    constructor() {
        super();

        this.initShadowDom(template);

        this.value = '';
        this.propertyUpdateCallback('value', this.setInputValue);

        this.#inputField = this.shadowRoot?.querySelector('input') as HTMLInputElement;

        this.#inputEventListener = (event: Event) => {
            this.value = (event.target as HTMLInputElement).value;
        }
    }

    connectedCallback() {
        this.#inputField?.addEventListener('input', this.#inputEventListener);
        this.setInputValue();
    }

    disconnectedCallback() {
       this.#inputField?.removeEventListener('input', this.#inputEventListener);
    }

    setInputValue() {
        if (this.#inputField) {
            this.#inputField.value = this.value;
        }
    }

    getValue() {
        return this.value;
    }

}
