import { RootState } from '../store';

export const ordersInfoDataSelector =
  (number: string | undefined) => (state: RootState) => {
    if (!number) return undefined;
    return state.feed.orders.find(
      (order) => order.number.toString() === number
    );
  };
