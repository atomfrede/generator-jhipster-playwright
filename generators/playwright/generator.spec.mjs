import expect from 'expect';

import { helpers, lookups } from '#test-utils';

const SUB_GENERATOR = 'playwright';
const SUB_GENERATOR_NAMESPACE = `jhipster-playwright:${SUB_GENERATOR}`;

describe('SubGenerator playwright of playwright JHipster blueprint', () => {
  describe('run', () => {
    let result;
    before(async function () {
      result = await helpers
        .create(SUB_GENERATOR_NAMESPACE)
        .withOptions({
          reproducible: true,
          defaults: true,
        })
        .withLookups(lookups)
        .run();
    });

    it('should succeed', () => {
      expect(result.getStateSnapshot()).toMatchSnapshot();
    });
  });
});
