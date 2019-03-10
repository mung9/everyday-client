import { validateDate } from './../src/components/common/date';

describe('validateDate', () => {
  it('should not be error', ()=>{
    const date = new Date();
    const {error} = validateDate(date);
    expect(error).notToBe(null);
  });
});


