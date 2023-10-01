export default class Unbox<B> {
  _value: B;

  constructor(value: B) {
    this._value = value;
  }

  static of<BVal>(value: BVal) {
    return new Unbox(value);
  }

  static from<BVal>(value: Unbox<BVal>) {
    return new Unbox(value.unbox());
  }
  public unbox() {
    return this._value;
  }

  public get value() {
    return this.unbox();
  }
}
// /imagine prompt:instructional schematics how to use a can opener
