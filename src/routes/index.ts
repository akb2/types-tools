import { smartJoin } from "../strings";
import { URL_PATH_JOINER } from "./data";

export const normalizeUrl = (url: string): string =>
  url
    .replace(/\\/g, "/")
    .replace(/\/+/g, "/")
    .replace(/^([a-z][a-z\d+.-]*):\//i, "$1://");

export function createUrlFromPaths(mixedPaths: string[]): string;
export function createUrlFromPaths(...mixedPaths: string[]): string;
export function createUrlFromPaths(...mixedPaths: string[] | string[][]): string {
  const paths = mixedPaths.flat();
  const joiner = URL_PATH_JOINER;
  const url = smartJoin(joiner, ...paths);

  if (/((ht|f)tp(s)|ws)?:\//i.test(url)) {
    return normalizeUrl(url).replace(/^(http(s)?:)\/+/i, '$1//');
  }

  return normalizeUrl(URL_PATH_JOINER + url);
}