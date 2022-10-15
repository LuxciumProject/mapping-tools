declare module 'sharp-phash';
/** hash returned is 64 characters length string with 0 and 1 only */
declare function phash(image: any): Promise<string>;
