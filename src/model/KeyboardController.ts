import { isFunction } from 'lodash'
import { Placebo } from './Placebo'
const { ipcRenderer } = window.require('electron')


class KeyboardController {

	placebo: Placebo;

	constructor(placebo: Placebo) {
		this.placebo = placebo;

		const events = ['next', 'prev', 'switchPlayingStatus'];
		for (const event of events) {
			// @ts-ignore
			ipcRenderer.on(event, () => {
				// @ts-ignore
				isFunction(this.placebo.music[event]) && this.placebo.music[event]()
			})
		}
	}
}

export default KeyboardController
