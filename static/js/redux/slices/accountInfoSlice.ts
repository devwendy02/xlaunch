import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AccountType,
  SetTokenDataActionType,
  SetTransactionsActionType
} from '../types';

export interface AccountStateType {
  [address: string]: AccountType;
}

const initialState: AccountStateType = {};

const preventEmptyAccount = (state: AccountStateType, address: string) => {
  if (!state[address]) {
    state[address] = {} as AccountType;
  }
};

export const accountInfoSlice = createSlice({
  name: 'accountInfoSlice',
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
    setTokenData: (
      state: AccountStateType,
      action: PayloadAction<SetTokenDataActionType>
    ) => {
      const { tokenData, address } = action.payload;

      preventEmptyAccount(state, address);

      state[address].tokenData = tokenData;
    },
    setTransactions: (
      state: AccountStateType,
      action: PayloadAction<SetTransactionsActionType>
    ) => {
      const { transactions, transactionsFetched, address } = action.payload;

      preventEmptyAccount(state, address);

      state[address].transactions = transactions;
      state[address].transactionsFetched = transactionsFetched;
    }
  }
});

export const { resetState, setTokenData, setTransactions } =
  accountInfoSlice.actions;

export default accountInfoSlice.reducer;
