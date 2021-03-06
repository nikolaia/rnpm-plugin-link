const fs = require('fs');
const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const makeMainActivityPatch = require(
  '../../../../src/android/patches/0.18/makeMainActivityPatch'
);

const config = {
  packageInstance: 'new VectorIconsPackage()',
  packageImportPath: 'import com.oblador.vectoricons.VectorIconsPackage;',
};
const mainActivityPatch = fs.readFileSync(
  path.join(process.cwd(), 'test/fixtures/android/0.18/MainActivity.java'),
  'utf-8'
);
const patchedMainActivity = fs.readFileSync(
  path.join(process.cwd(), 'test/fixtures/android/0.18/patchedMainActivity.java'),
  'utf-8'
);

describe('makeMainActivityPatch@0.18', () => {
  it('should build a patch function', () => {
    expect(makeMainActivityPatch(config)).to.be.a('function');
  });

  it('should make a correct patch', () => {
    const patch = makeMainActivityPatch(config);
    expect(patch(mainActivityPatch)).to.be.equal(patchedMainActivity);
  });
});
