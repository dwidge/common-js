// Copyright DWJ 2023.
// Distributed under the Boost Software License, Version 1.0.
// https://www.boost.org/LICENSE_1_0.txt

export type Seconds = number;
export const now = (): Seconds => (Date.now() / 1000) | 0;
export const secondsDate = (date: Date): Seconds => (date.getTime() / 1000) | 0;
export const secondsString = (date: string): Seconds =>
  secondsDate(new Date(date));
export const dateSeconds = (seconds: Seconds): Date => new Date(seconds * 1000);
