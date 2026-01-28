import { resetStocks } from './data.action';
import { RESET_STOCKS } from './data.types';

describe('Data Actions', () => {
  describe('resetStocks action', () => {
    it('should create an action with type RESET_STOCKS', () => {
      const action = resetStocks();
      expect(action.type).toBe(RESET_STOCKS);
    });

    it('should return correct action object structure', () => {
      const action = resetStocks();
      expect(action).toEqual({
        type: RESET_STOCKS,
      });
    });

    it('should not have payload', () => {
      const action = resetStocks();
      expect(action.payload).toBeUndefined();
    });

    it('should not contain other properties', () => {
      const action = resetStocks();
      const keys = Object.keys(action);
      expect(keys).toEqual(['type']);
    });
  });
});
