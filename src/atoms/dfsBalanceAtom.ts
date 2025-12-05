"use client";

import { atom } from "jotai";

export type DFSBalanceAtom = number | null;

const dfsBalanceAtom = atom<DFSBalanceAtom>(null);

export default dfsBalanceAtom;
