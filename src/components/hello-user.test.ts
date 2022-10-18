import HelloUser from "./hello-user";

HelloUser.defineCustomElement('hello-user');

// Disable console.debug display
global.console.debug = jest.fn();

describe("Custom elements rendering tests", ()=>{
    test('Hello user standard rendering without props', () => {
        document.body.innerHTML = `<h1>Custom element test</h1><hello-user/>`;
        expect(document.body.innerHTML).toContain('Hello!!!');
    })

    test('Hello user standard rendering with props', () => {
        document.body.innerHTML = `<h1>Custom element test</h1><hello-user user='fred' age='20'/>`;
        expect(document.body.innerHTML).toContain('Hello fred, you are 20 years old!');
    })

    test('Hello user attribute update', () => {
        document.body.innerHTML = `<h1>Custom element test</h1><hello-user user='fred' age='20'/>`;
        expect(document.body.innerHTML).toContain('Hello fred, you are 20 years old!');
        const helloUserNode = document.body.querySelector('hello-user');
        expect(helloUserNode).not.toBeNull
        helloUserNode?.setAttribute('user', 'john');
        helloUserNode?.setAttribute('age', '30');
        expect(document.body.innerHTML).toContain('Hello john, you are 30 years old!');
    })
})
