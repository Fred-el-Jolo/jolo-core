import {register} from './hello-world';

register();

describe("Custom elements rendering tests", ()=>{
    test('Hello world rendering', () => {
        document.body.innerHTML = `<h1>Custom element test</h1><hello-world/>`;
        expect(document.body.innerHTML).toBe('<h1>Custom element test</h1><hello-world>Hello, World!</hello-world>');
    })
})
