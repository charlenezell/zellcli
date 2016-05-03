/* sufix commander component
 * To use add require('../cmds/sufix.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';
var del=require("del");
module.exports = function(program) {
	program
		.command('rm <glob>')
		.version('0.0.1')
		.description('remove glob')
		.action(function(glob) {
			del.sync(glob);
		});
};
