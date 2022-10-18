import JoloInput from "./jolo-input";

JoloInput.defineCustomElement('jolo-input');

// Disable console.debug display
global.console.debug = jest.fn();

describe("Custom elements rendering tests", ()=>{
    test('Hello user standard rendering without props', () => {
        document.body.innerHTML = `<h1>Custom element test</h1><jolo-input/>`;
        const inputNode = document.body.querySelector('jolo-input');
        expect(inputNode?.shadowRoot).not.toBeNull();
        expect(inputNode?.shadowRoot?.querySelector('input')).toBeInstanceOf(HTMLInputElement);
    })

    test('Hello user standard rendering with props', () => {
        document.body.innerHTML = `<h1>Custom element test</h1><jolo-input value='New value !!!'/>`;
        expect(document.body.innerHTML).toContain('<jolo-input value="New value !!!"></jolo-input>');
        const inputNode = document.body.querySelector('jolo-input') as JoloInput;
        expect(inputNode?.getValue()).toBe("New value !!!");
        expect(inputNode?.shadowRoot).not.toBeNull();
        expect(inputNode?.shadowRoot?.querySelector('input')?.value).toBe("New value !!!");
    })
})
