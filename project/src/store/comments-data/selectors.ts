import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Comments} from '../../types/offer';

export const getComments = (state: State): Comments => state[NameSpace.Comments].comments;
