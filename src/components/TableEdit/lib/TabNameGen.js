export class TabNameGen {
	static #extract = /sheet(\d+)/;

	#sequence;

	#include;

	constructor() {
		this.#include = [];
		this.#sequence = 0;
	}
	clear() {
		this.#include = [];
		this.#sequence = 0;
	}
}
