import chalk from 'chalk';
import ClientGenerator from 'generator-jhipster/esm/generators/client';
import { PRIORITY_PREFIX, PROMPTING_PRIORITY, COMPOSING_PRIORITY } from 'generator-jhipster/esm/priorities';

export default class extends ClientGenerator {
  constructor(args, opts, features) {
    super(args, opts, { taskPrefix: PRIORITY_PREFIX, ...features });

    if (this.options.help) return;

    if (!this.options.jhipsterContext) {
      throw new Error(`This is a JHipster blueprint and should be used only like ${chalk.yellow('jhipster --blueprints playwright')}`);
    }

    this.sbsBlueprint = true;
  }

  get [PROMPTING_PRIORITY]() {
    return {
      async promptingTemplateTask() {},
    };
  }

  get [COMPOSING_PRIORITY]() {
    return {
      async composingTemplateTask() {
        await this.composeWithJHipster("jhipster-playwright:playwright");
      },
    };
  }
}
