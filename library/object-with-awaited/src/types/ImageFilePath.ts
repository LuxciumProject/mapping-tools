import type { Stats } from 'node:fs';



export type With<T extends Object> = T

export type ImageFilePath = With<{
  compatibleImagefilePath: string;
}>;

export type WithAwaited<T extends Object> = {
  awaited: T;
};

export type WithAwaitedStats = WithAwaited<{
  stat: Promise<Stats>;
}>;

export type ImageFilePathWithAwaitedStats = WithAwaitedStats & ImageFilePath;
