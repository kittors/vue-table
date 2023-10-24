import { Widget } from './Widget';
import { cssPrefix } from '../constant';

class Layer extends Widget {
	constructor(className = '') {
		super(`${cssPrefix}-layer ${className}`);
	}
}

export { Layer };
