const { rules, packages } = await import('@eslint-stylistic/metadata');

rules.map(
  r =>
    r.meta.fixable &&
    console.log(
      `//% Description: ${r.meta.docs?.description} Fixable: ${r.meta.fixable}\n`,
      `"${r.ruleId}": "off",`
    )
);
rules.map(
  r =>
    r.meta.fixable ||
    console.log(
      `//& Description: ${r.meta.docs?.description}\n`,
      `"${r.ruleId}": "off",`
    )
);
// rules.map(r => console.log(r.meta.docs?.description));
export {};
