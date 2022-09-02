export abstract class CustomHtmlElement extends HTMLElement {

    /**
     * Dynamic props callbacks map
     */
    #propsCallbacks: Map<string, Array<Function>>;

    /**
     * Define attributes that can be updated once the component is initialized
     * @see https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
     */
    static get observedAttributes(): string[] {
        throw new Error (`static get observedAttributes() method must be implemented on the class ${this.name}`)
    }

    constructor() {
        super();

        this.#propsCallbacks = new Map();
    }

    /**
     * Helper that initialize the shadow DOM for a Web Component
     * @see https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM
     * @param template 
     * @param shadowOptions 
     */
    initShadowDom(template: HTMLTemplateElement, shadowOptions: ShadowRootInit = { mode: 'open' }) {
        this.attachShadow(shadowOptions);
        this.shadowRoot?.appendChild(template.content.cloneNode(true));
    }

    /**
     * Lifecycle hook that is invoked when one of the custom element's attributes is added, removed, or changed
     * @see https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
     * @param property 
     * @param oldValue 
     * @param newValue 
     * @returns 
     */
    attributeChangedCallback(property: string, oldValue: any, newValue: any): void {
        if (oldValue === newValue) return;
        console.debug(`Class ${this.constructor.name}, property ${property} set with value ${newValue}`);
        this[property as keyof this] = newValue;

        if (this.#propsCallbacks.has(property)) {
            console.debug(`Class ${this.constructor.name}, property ${property}, calling ${this.#propsCallbacks.get(property)?.length} update callback${this.#propsCallbacks.get(property)?.length === 1 ? '' : 's'}`);
            this.#propsCallbacks.get(property)?.forEach(callback => callback());
        }
    }

    /**
     * Add a callback to be invoked when the key prop is updated
     * @param property 
     * @param callback 
     */
    propertyUpdateCallback(property: string, callback: Function): void {
        let callbacks = this.#propsCallbacks.get(property);
        if (!callbacks) {
            callbacks = [];
        }
        callbacks.push(callback.bind(this));
        this.#propsCallbacks.set(property, callbacks);
    }
}
