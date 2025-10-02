import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Country } from './schema';

export const StepMap = {
  1: 'Provide your account details',
  2: 'Provide your personal info',
  3: 'You have successfuly been registered',
};

type RegisterDataType = {
  firstStep: {
    username: string;
    password: string;
    confirmPassword: string;
  };
  secondStep: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    country: Country;
  };
};

const initialValues: RegisterDataType = {
  firstStep: { username: '', password: '', confirmPassword: '' },
  secondStep: {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    country: 'Greece',
  },
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
    updateFirstStepData: (
      state,
      action: PayloadAction<Partial<RegisterDataType['firstStep']>>,
    ) => {
      state.data.firstStep = { ...state.data.firstStep, ...action.payload };
    },
    updateSecondStepData: (
      state,
      action: PayloadAction<Partial<RegisterDataType['secondStep']>>,
    ) => {
      state.data.secondStep = { ...state.data.secondStep, ...action.payload };
    },

    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    reset: (): RegisterState => registerSlice.getInitialState(),
  },
  selectors: {
    selectFirstStepData: (formState) => formState.data.firstStep,
    selectSecondStepData: (formState) => formState.data.secondStep,
    selectStep: (formState) => formState.step,
  },
});

export const { updateFirstStepData, updateSecondStepData, setStep, reset } =
  registerSlice.actions;
export const { selectFirstStepData, selectSecondStepData, selectStep } =
  registerSlice.selectors;
