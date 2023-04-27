/**
 * @depracated
 * @beta
 */
export type SettledIso<T = any> = {
  fulfilled: T | null;
  rejected: any;
  value?: T | undefined;
  reason?: any;
  index: number;
} & (
  | {
      status: 'fulfilled';
      value: T;
    }
  | {
      status: 'rejected';
      reason: any;
    }
);

// TASK LIST: [TODO: Types] (Review Documentation) -------------------
