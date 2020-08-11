const abstract_command_1 = require("./abstract.command");

class BuildCommand extends abstract_command_1.AbstractCommand {
  load(program) {
    program
      .command('build [packages]')
      // .option('--packages [packages]', '指定打包编译哪些子应用,逗号分隔多个应用')
      .option('--all', '指定所有子应用')
      .option('--no-packages', '未指定子应用, 可动态交互式选择子应用')
      .description(
        'Build Hips vue application,[packages] 指定打包编译哪些子应用,逗号分隔多个应用'
      )
      .action(async (packages, command) => {
        const options = [];
        options.push({ name: 'all', value: !!command.all });
        options.push({
          name: 'packages',
          value: packages,
        });
        const inputs = [];
        // inputs.push({ name: 'app', value: app });
        await this.action.handle(inputs, options);
      });
  }
}
exports.BuildCommand = BuildCommand;

