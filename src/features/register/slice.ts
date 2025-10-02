import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Country } from './schema';

export const StepMap = {
  1: 'Provide your account details',
  2: 'Provide your personal info',
  3: 'You have successfuly been registered',
};

type RegisterDataType = {
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: Country;
};

const initialValues: RegisterDataType = {
  username: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  country: 'Greece',
};

export interface RegisterState {
  step: number;
  data: RegisterDataType;
}

const initialState: RegisterState = {
  step: 1,
  data: initialValues,
};

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<Partial<RegisterDataType>>) => {
      state.data = { ...state.data, ...action.payload };
    },
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    reset: (): RegisterState => registerSlice.getInitialState(),
  },
  selectors: {
    selectData: (formState) => formState.data,
    selectStep: (formState) => formState.step,
  },
});

export const { updateData, setStep, reset } = registerSlice.actions;
export const { selectData, selectStep } = registerSlice.selectors;
