const { Event } = require('klasa');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, { event: 'guildMemberWelcome' });
	}

	async run(member) {
		if (!member.guild.settings.get('greetings.welcomeMessage')) return;

		const welcomeChannel = await this.client.channels.cache.get(member.guild.settings.get('greetings.welcomeChannel'));
		let welcomeMsg = member.guild.settings.get('greetings.welcomeMessage');

		if (member.guild.settings.get('greetings.welcomeMessage')) {
			welcomeMsg = welcomeMsg.replace('{user}', `${member.user}`)
				.replace('{server}', `${member.guild.name}`);
			if (welcomeChannel) await welcomeChannel.send(welcomeMsg);
		}
	}

};
