import HelloWorld from './hello-world';

HelloWorld.defineCustomElement('hello-world');

describe("Custom elements rendering tests", ()=>{
    test('Hello world standard rendering', () => {
        document.body.innerHTML = `<h1>Custom element test</h1><hello-world/>`;
        expect(document.body.innerHTML).toBe('<h1>Custom element test</h1><hello-world>Hello, World!</hello-world>');
    });
})
