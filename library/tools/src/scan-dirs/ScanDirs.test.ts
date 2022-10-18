import { from } from './ScanDirs';
describe('Name of the group', () => {
  it('should Test the project', () => {
    expect(from("./").hasExt('.jpeg')).toBeTruthy();
  });
});
