const cssPrefix = 'Y-sheet';
const Constant = {};
const YSheetVersion = `${cssPrefix} 1.0.0-develop`;

//系统事件类型
Constant.SYSTEM_EVENT_TYPE = {
	MOUSE_MOVE: 'mousemove',
	MOUSE_DOWN: 'mousedown',
	CONTEXT_MENU: 'contextmenu',
	SCROLL: 'scroll',
	RESIZE: 'resize',
	MOUSE_UP: 'mouseup',
	INPUT: 'input',
	KEY_DOWN: 'keydown',
	KEY_UP: 'keyup',
	MOUSE_OVER: 'mouseover',
	MOUSE_LEAVE: 'mouseleave',
	MOUSE_WHEEL: 'wheel',
	MOUSE_ENTER: 'mouseenter',
	CLICK: 'click',
	FOCUS: 'focus',
	BLUR: 'blur',
	DRAG_START: 'dragstart',
	CHANGE: 'change',
	VISIBILITY_CHANGE: 'visibilitychange',
};

export { YSheetVersion, Constant, cssPrefix };
