const { Event } = require('klasa');
const { MessageEmbed } = require('discord.js');
const { Colors } = require('../lib/util/constants');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'customCmdDelete' });
	}

	async run(msg, cmdName) {
		if (!msg.guild) return;

		const executor = msg.author;
		if (msg.guild.settings.get('channels.log') && msg.guild.settings.get('logs.events.customCmdDelete')) await this.serverLog(msg, cmdName, executor);

		return;
	}

	async serverLog(msg, cmdName, executor) {
		const embed = new MessageEmbed()
			.setAuthor(`${cmdName}`, msg.guild.iconURL())
			.setColor(Colors.red)
			.setTimestamp()
			.setFooter(msg.guild.language.get('GUILD_LOG_CUSTOMCMDDELETE', executor), executor.displayAvatarURL());

		const logChannel = await this.client.channels.cache.get(msg.guild.settings.get('channels.log'));
		if (logChannel) await logChannel.send('', { embed: embed });

		return;
	}

};
