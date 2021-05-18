const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
const { Colors } = require('../lib/util/constants');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'customCmdUpdate' });
	}

	async run(msg, cmdName, cmdContent, oldCmd) {
		if (!msg.guild) return;

		const executor = msg.author;
		if (msg.guild.settings.get('channels.log') && msg.guild.settings.get('logs.events.customCmdUpdate')) await this.serverLog(msg, cmdName, cmdContent, oldCmd, executor);

		return;
	}

	async serverLog(msg, cmdName, cmdContent, oldCmd, executor) {
		const embed = new MessageEmbed()
			.setAuthor(`${cmdName}`, msg.guild.iconURL())
			.setColor(Colors.blue)
			.addField(msg.language.get('GUILD_LOG_BEFORE'), oldCmd.content)
			.addField(msg.language.get('GUILD_LOG_AFTER'), cmdContent)
			.setTimestamp()
			.setFooter(msg.guild.language.get('GUILD_LOG_CUSTOMCMDUPDATE', executor), executor.displayAvatarURL());

		const logChannel = await this.client.channels.cache.get(msg.guild.settings.get('channels.log'));
		if (logChannel) await logChannel.send('', { embed: embed });

		return;
	}

};
