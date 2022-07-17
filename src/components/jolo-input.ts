import { CustomHtmlElement } from "../core/custom-html-element";

const template = document.createElement('template');
template.innerHTML = `
<input />
`;

export class JoloInput extends CustomHtmlElement {

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




}

customElements.define('jolo-input', JoloInput);
