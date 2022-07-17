export abstract class CustomHtmlElement extends HTMLElement {

    #propsCallbacks: Map<string, Array<Function>>;

    static get observedAttributes(): string[] {
        throw new Error (`static get observedAttributes() method must be implemented on the class ${this.name}`)
    }

    constructor() {
        super();

        this.#propsCallbacks = new Map();
    }

    initShadowDom(template: HTMLTemplateElement, shadowOptions: ShadowRootInit = { mode: 'open' }) {
        this.attachShadow(shadowOptions);
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
    }

    attributeChangedCallback(property: string, oldValue: any, newValue: any): void {
        if (oldValue === newValue) return;
        console.debug(`Class ${this.constructor.name}, property ${property} set with value ${newValue}`);
        this[property as keyof this] = newValue;

        if (this.#propsCallbacks.has(property)) {
            console.debug(`Class ${this.constructor.name}, property ${property}, calling ${this.#propsCallbacks.get(property)?.length} update callback${this.#propsCallbacks.get(property)?.length === 1 ? '' : 's'}`);
            this.#propsCallbacks.get(property)?.forEach(callback => callback());
        }
    }

    propertyUpdateCallback(property: string, callback: Function): void {
        let callbacks = this.#propsCallbacks.get(property);
        if (!callbacks) {
            callbacks = [];
        }
        callbacks.push(callback.bind(this));
        this.#propsCallbacks.set(property, callbacks);
    }
}
