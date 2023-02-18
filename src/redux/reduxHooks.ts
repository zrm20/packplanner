import { TypedUseSelectorHook, useDispatch as ogUseDispatch, useSelector as ogUseSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch: () => AppDispatch = ogUseDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = ogUseSelector;