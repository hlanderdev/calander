export default class Calander {
	public title: string;
	public description: string;
	public location: string;
	public startTime: string | Date;
	public endTime: string | Date;

	constructor() {
		this.title = '';
		this.description = '';
		this.location = '';
		this.startTime = new Date();
		this.endTime = new Date();
	}

	public google() {
		const formatDate = (date: string | Date) => new Date(date).toISOString().replaceAll(/[\-:]/g, '').replace(/\.\d+/, '');

		const url = new URL('https://calendar.google.com/calendar/render');
		url.searchParams.set('action', 'TEMPLATE');
		url.searchParams.set('text', this.title);
		url.searchParams.set('details', this.description);
		url.searchParams.set('location', this.location);
		url.searchParams.set('dates', `${formatDate(this.startTime)}/${formatDate(this.endTime)}`);

		return url.toString();
	}

	public outlook() {
		return this.microsoft(new URL('https://outlook.live.com/calendar/0/deeplink/compose?'));
	}

	public office365() {
		return this.microsoft(new URL('https://outlook.office.com/calendar/0/deeplink/compose?'));
	}

	private microsoft(url: URL) {
		const formatDate = (date: string | Date) => new Date(date).toISOString().replace(/\..+/, '+00:00');

		url.searchParams.set('allday', 'false');
		url.searchParams.set('path', '/calendar/action/compose');
		url.searchParams.set('rru', 'addevent');
		url.searchParams.set('subject', this.title);
		url.searchParams.set('body', this.description);
		url.searchParams.set('startdt', formatDate(this.startTime));
		url.searchParams.set('enddt', formatDate(this.endTime));

		return url.toString();
	}

	public yahoo() {
		const formatDate = (date: string | Date) => new Date(date).toISOString().replaceAll(/[\-:]/g, '').replace(/\.\d+/, '');

		const url = new URL('https://calendar.yahoo.com/?');
		url.searchParams.set('title', this.title);
		url.searchParams.set('desc', this.description);
		url.searchParams.set('st', formatDate(this.startTime));
		url.searchParams.set('et', formatDate(this.endTime));
		url.searchParams.set('in_loc', this.location);
		url.searchParams.set('dur', '');
		url.searchParams.set('v', '60');

		return url.toString();
	}
}
