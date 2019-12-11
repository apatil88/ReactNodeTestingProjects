import moxios from 'moxios'
import {getSecretWord} from "./hookActions";

describe('moxios tests', () => {
    beforeEach(()=> {
        //We do this so that moxios gets all HTTP requests sent by axios
        moxios.install();
    });

    afterEach(()=> {
        //Sets axios back to its HTTP state
        moxios.uninstall();
    });

    test('calls the getSecretWord callback on axios response', async ()=>{
        const secretWord = 'party';
        moxios.wait(()=>{
           const request = moxios.requests.mostRecent();
           request.respondWith({
               status: 200,
               response: secretWord
           });
        });

        // create mock for callback arg
        const mockSetSecretWord = jest.fn();

        await getSecretWord(mockSetSecretWord);

        //see whether mock was run
        expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
    });
});