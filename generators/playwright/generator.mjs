import chalk from 'chalk';
import { GeneratorBaseEntities, constants } from 'generator-jhipster';
import { PRIORITY_PREFIX, POST_WRITING_PRIORITY, WRITING_PRIORITY } from 'generator-jhipster/esm/priorities';

export const files = {
  client: [
    {
      templates: [
        'src/test/javascript/playwright/support/selectors.ts',
      ],
    },
  ],
};

export default class extends GeneratorBaseEntities {
  constructor(args, opts, features) {
    super(args, opts, { taskPrefix: PRIORITY_PREFIX, ...features });

    if (this.options.help) return;
  }

  async _postConstruct() {
    await this.dependsOnJHipster('bootstrap-application');
  }

  get [WRITING_PRIORITY]() {
    return {
      async writingTemplateTask({application}) {
        await this.copyTemplateAsync('resources/{**,**/.*}', this.destinationPath());
        await this.writeFiles({
          sections: files,
          rootTemplatesPath: "application",
          context: application
        });
      }
    }
  }
  get [POST_WRITING_PRIORITY]() {
    return {
      async customizePackageJson() {
        this.packageJson.merge({
          devDependencies: {
            "@playwright/test": "^1.23.0",
          },
          scripts: {
            "e2e": "npm run e2e:playwright:headed --",
            "e2e:playwright:headed": "playwright test --headed"
          }
        })
      },
    };
  }
}
