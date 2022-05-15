import { SymbolPair } from '@/interfaces/atmos';
import { atom } from 'jotai';

export const selectedPair = atom('ETHUSDT');

export const symbolsAtom = atom<SymbolPair[]>([]);
