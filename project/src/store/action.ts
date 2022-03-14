import {createAction} from '@reduxjs/toolkit';
import {City} from '../types/offer';

export const changeCity = createAction<City>('city/change');
