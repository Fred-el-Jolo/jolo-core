import {register} from './hello-user';

register();

describe("Custom elements rendering tests", ()=>{
    test('Hello user rendering', () => {
        document.body.innerHTML = `<h1>Custom element test</h1><hello-user user='fred'/>`;
        expect(document.body.innerHTML).toContain('Hello, fred!');
    })
})
