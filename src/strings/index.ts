import { NotDefinable } from "../models";

export const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export function smartJoin(joiner: string, mixedParts: NotDefinable<string>[]): string;
export function smartJoin(joiner: string, ...mixedPaths: NotDefinable<string>[]): string;
export function smartJoin(joiner: string, ...mixedPaths: NotDefinable<string>[] | NotDefinable<string>[][]): string {
  const parts = mixedPaths.flat();
  const escapedJoiner = escapeRegExp(joiner);
  const trimJoinerRegExp = new RegExp(`^(?:${escapedJoiner})+|(?:${escapedJoiner})+$`, 'g');

  return parts
    .map((part) => part?.replace(trimJoinerRegExp, ''))
    .filter(Boolean)
    .join(joiner);
}