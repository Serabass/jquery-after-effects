var global = this;

if (String.prototype.trim === void 0) {
	String.prototype.trim = function () {
		return this.replace(/(?:^s+)|(?:\s+$)/, '');
	};
}

if (Array.prototype.map === void 0) {
	Array.prototype.map = function (callback) {
		var result = [];
		
		for (var i = 0; i < this.length; i++) {
			result.push(callback(this[i]));
		}

		return result;
	};
}

if (JQueryBuilder === void 0 || true) {
	JQueryBuilder = (function () {
		function initjQuery (initCallback) {
			return (function () {
				var Parent = Array.prototype,
					jQuery = function () {
						// Íàéäåíî íà ïðîñòîðàõ ãóãëà, ñèëüíî íå ïèíàòü.
						var JQuery = function () {}, // Temp === JQuery
							inst,
							ret,
							Constructor = jQuery.fn.init;
						JQuery.prototype = Constructor.prototype; // Temp === JQuery
						inst = new JQuery();

						ret = Constructor.apply(inst, arguments);
						inst.constructor = Constructor;

						return Object(ret) === ret ? ret : inst;
					};

				
				// Íàñëåäóåì îò ìàññèâà
				jQuery.fn = jQuery.prototype = [];

				/**
				 * Ìàññèâ àðãóìåíòîâ, êîòîðûå áóäóò ïåðåäàíû â init()
				 * @type {Array}
				 */
				jQuery.fn.arguments = [];

				/**
				 * Ñîáñòâåííî, êîíñòðóêòîð
				 * @type {Function}
				 */
				jQuery.fn.constructor = jQuery;

				jQuery.fn.name = 'jQuery';
				/**
				 * Òî÷êà âõîäà. Ôóíêöèÿ, èíèöèàëèçèðóþùàÿ íàøó âûáîðêó
				 * @type {Function}
				 */
				jQuery.fn.init = function () {
					// this.arguments = arguments; íåëüçÿ, ïîòîìó ÷òî arguments - íå ìàññèâ, à îáúåêò,
					// ïîýòîìó íóæíî ïåðåãíàòü åãî â ìàññèâ, [].slice.call ýòî è äåëàåò â ýòîì ñëó÷àå
					this.arguments = [].slice.call(arguments);
					return initCallback.apply(this, this.arguments);
				};
				
				/**
				 * [].push();
				 * @param obj Îáúåêò, êîòîðûé íóæíî äîáàâèòü â ìàññèâ
				 * @returns {jQuery.fn}
				 */
				jQuery.fn.push = function (obj) {
					Parent.push.call(this, obj);
					return this;
				};

				
				/**
				 * [].join();
				 * @param delimiter Ðàçäåëèòåëü. Íåîáÿçàòåëüíûé àðãóìåíò. Ïî óìîë÷àíèþ ýòî áóäåò çàïÿòàÿ
				 * @returns {jQuery.fn|string}
				 */
				jQuery.fn.join = function (delimiter) {
					var result = Parent.join.call(this, delimiter);
					return result;
				};

				
				/**
				 * [].pop();
				 * @returns {*}
				 */
				jQuery.fn.pop = function () {
					return Parent.pop.call(this);
				};

				jQuery.fn.some = function (selector) {
					var result = false;
					this.each(function (i) {
						if (jQuery.is(this, selector)) {
							result = true;
							return false;
						}
					});
					return result;
				};
				
				jQuery.fn.every = function (selector) {
					var result = false;
					this.each(function (i) {
						if ( ! jQuery.is(this, selector)) {
							result = false;
							return result;
						}
					});
					return result;
				};
			
				/**
				 * [].map(callback);
				 * @param callback
				 * @returns {*}
				 */
				jQuery.fn.map = function (callback) {
					var self = this;
					return this.each(function (i) {
						self[i] = callback.call(this, i);
					});
				};
                 
				/**
				 * Âîçâðàùàåò ðàçìåð ìàññèâà, àëèàñ äëÿ arr.length
				 * @returns {jQuery.fn|Number}
				 */
				jQuery.fn.size = function() {
					return this.length;
				};

				
				/**
				 * Âîçâðàùàåò êîëè÷åñòâî ýëåìåíòîâ, ïîäõîäÿùèõ ïîä âûáîðêó
				 * @returns {Number}
				 */
				jQuery.fn.count = function(filter) {
					var result = 0;
					if (typeof filter === 'function') {
						this.each(function () {
							if (filter.call(this)) {
								result++;
							}
						});
					} else {
						result = this.size();
					}
					return result;
				};

				
				/**
				 * Ôóíêöèÿ äëÿ ïðîõîäà ïî âñåìó ìàññèâó ÷åðåç çàìûêàíèå, àíàëîã [].forEach()
				 * @param callback
				 * @returns {jQuery.fn}
				 */
				jQuery.fn.each = function ( callback ) {
					for(var i = 0; i < this.length; i++) {
						var result = callback.call(this[i], i);
						if (result === false)
							break;
					}
					return this;
				};

				
				/**
				 * Âîçâðàùàåò ïåðâûé ýëåìåíò èç âûáîðêè
				 * @returns {*}
				 */
				jQuery.fn.first = function () {
					return this.get(0);
				};

				
				/**
				 * Âîçâðàùàåò ïîñëåäíèé ýëåìåíò èç âûáîðêè
				 * @returns {*}
				 */
				jQuery.fn.last = function () {
					return this.get(this.length-1);
				};

				
				/**
				 * Âîçâðàùàåò ýëåìåíò èç âûáîðêè, íàõîäÿùèéñÿ ïî óêàçàííîìó èíäåêñó
				 * @param i Èíäåêñ
				 * @returns {*}
				 */
				jQuery.fn.get = function (i) {
					return this[i];
				};

				
				/**
				 * Óñòàíàâëèâàåò çíà÷åíèå ýëåìåíòó, íàõîäÿùåìóñÿ ïî óêàçàííîìó èíäåêñó
				 * @param index Èíäåêñ
				 * @param value Íîâîå çíà÷åíèå
				 * @returns {jQuery.fn}
				 */
				jQuery.fn.set = function (index, value) {
					this[index] = value;
					return this;
				};

				
				/**
				 * Ãåòòåð-ñåòòåð, àíàëîã get è set â jQuery-style
				 * @param index Èíäåêñ
				 * @param value Çíà÷åíèå. Åñëè ïåðåäàíî, òî âûçîâåòñÿ set, èíà÷å get
				 * @returns {*}
				 */
				jQuery.fn.el = function (index, value) {
					if (typeof value === 'undefined') {
						return this.get(index);
					}
					return this.set(index, value);
				};

				
				/**
				 * Óäàëÿåò ýëåìåíò ïî óêàçàííîìó èíäåêñó
				 * TODO Ïðèäóìàòü ìåíåå èçîùð¸ííûé ñïîñîá
				 * @param index
				 * @returns {*}
				 */
				jQuery.fn.unset = function (index, count) {
					if ( ! jQuery.defined(count)) {
						count = 1;
					}
					this.splice(index, count);
					return this;
				};

				
				jQuery.toArray = function (obj) {
					return Array.prototype.slice.call(obj);
				};
				
				/**
				 * Ôîðìèðóåò íàñòîÿùèé íàòèâíûé ìàññèâ èç òåêóùåé âûáîðêè
				 * @returns {jQuery.fn|Array}
				 */
				jQuery.fn.toArray = function () {
					return jQuery.toArray(this);
				};

				/**
				 * @returns {*}
				 */
				jQuery.fn.toString = function () {
					return 'jQuery (' + this.length + ' item' + (this.length === 1 ? '' : 's') + ')';
				};

				/**
				 * Ðàñøèðÿåò òåêóùèé ôóíêöèîíàë
				 * @param name
				 * @param fn
				 * @returns {jQuery.fn}
				 */
				jQuery.fn.extend = function (name, fn) {
					var fns;
					if (typeof name === 'object') {
						fns = name;
						for(var prop in fns) {
							if (fns.hasOwnProperty(prop)) {
								this[prop] = fns[prop];
								this.extend(prop, fns[prop]);
							}
						}
						return this;
					}
					this[name] = fn;
					return this;
				};

				/**
				 * Åñëè îáúåêò ÿâëÿåòñÿ ñêàëÿðíûì, òî âîçâðàùàåò åãî çíà÷åíèå, èíà÷å âîçâðàùàåò ñàì îáúåêò
				 * @param obj Îáúåêò
				 * @returns {XMLList|XML|Namespace|*|Array|boolean}
				 */
				jQuery.value = function (obj) {
					return obj.valueOf();
				};

				
				/**
				 *  Ñòàðûé äîáðûé jQuery.extend
				 */
				jQuery.extend = function() {
					var src, copyIsArray, copy, name, options, clone,
						target = arguments[0] || {},
						i = 1,
						length = arguments.length,
						deep = false;

					// Handle a deep copy situation
					if ( typeof target === "boolean" ) {
						deep = target;

						// skip the boolean and the target
						target = arguments[ i ] || {};
						i++;
					}

					// Handle case when target is a string or something (possible in deep copy)
					if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
						target = {};
					}

					// extend jQuery itself if only one argument is passed
					if ( i === length ) {
						target = this;
						i--;
					}

					for ( ; i < length; i++ ) {
						// Only deal with non-null/undefined values
						if ( (options = arguments[ i ]) != null ) {
							// Extend the base object
							for ( name in options ) {
								src = target[ name ];
								copy = options[ name ];

								// Prevent never-ending loop
								if ( target === copy ) {
									continue;
								}

								// Recurse if we're merging plain objects or arrays
								if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
									if ( copyIsArray ) {
										copyIsArray = false;
										clone = src && jQuery.isArray(src) ? src : [];

									} else {
										clone = src && jQuery.isPlainObject(src) ? src : {};
									}

									// Never move original objects, clone them
									target[ name ] = jQuery.extend( deep, clone, copy );

								// Don't bring in undefined values
								} else if ( copy !== undefined ) {
									target[ name ] = copy;
								}
							}
						}
					}

					// Return the modified object
					return target;
				};

				jQuery.fn.init.prototype = jQuery.fn;
				JQueryBuilder.jQuery = jQuery;
				return jQuery;
			})();
		}

		/**
		 * Ñàì êîíñòðóêòîð
		 */
		function JQueryBuilder(initCallback) {
			this.jQuery = initjQuery(initCallback);
		}

		
		/**
		 * Ôîðìèðóåò íîâóþ âûáîðêó èç ïåðåäàííûõ àðãóìåíòîâ
		 * @returns {JQueryBuilder}
		 */
		JQueryBuilder.from = function () {
			return new JQueryBuilder(function () {
				for(var i = 0; i < arguments.length; i++) {
					this.push(arguments[i]);
				}
			});
		};

		
		/**
		 * Ôîðìèðóåò íîâóþ âûáîðêó èç ïåðåäàííîãî ìàññèâà â êîíñòðóêòîð, ëèáî â ðåçóëüòèðóþùóþ ôóíêöèþ
		 * @param array Ñàì ìàññèâ, íåîáÿçàòåëüíûé àðãóìåíò
		 * @returns {JQueryBuilder}
		 */
		JQueryBuilder.fromArray = function (array) {
			return new JQueryBuilder(function (anotherArray) {
				if (typeof array === 'undefined') {
					array = anotherArray;
				}
				for(var i = 0; i < array.length; i++) {
					this.push(array[i]);
				}
			});
		};

		/**
		 * # Íàïèñàòü äîêó
		 */
		JQueryBuilder.simple = function (array) {
			var builder = new JQueryBuilder(function (selector, context) {
				if (selector instanceof JQueryBuilder.jQuery) {
					var self = this;
					selector.each(function () {
						self.push(this);
					});
					return;
				}
				if (typeof context === 'undefined') {
					if (typeof array !== 'undefined') {
						context = array;
					} else {
						throw 'Unknown source';
					}
				}

				for(var i = 0; i < context.length; i++) {
					var el = context[i];
					if (builder.is(selector, el, i)) {
						this.push(el);
					}
				}
			});

			/**
			 * # Íàïèñàòü äîêó
			 */
			builder.is = function (selector, el, i) {
				switch (typeof selector) {
					case 'undefined' :
						return true;

					case 'string' :
						switch (selector) {
							case 'even-index' :
								return i % 2 === 0;

							case 'odd-index' :
								return i % 2 !== 0;

							case 'even-value' :
								return el % 2 === 0;

							case 'odd-value' :
								return el % 2 !== 0;
						}
						return false;
					case 'object' :
						if (selector instanceof RegExp) {
							return selector.test(el);
						}

						if (selector instanceof Array) {
							var matches = [];
							for (var _i = 0; _i < selector.length; _i++) {
								matches.push(arguments.callee.call(this, selector[_i]));
							}
							return matches.indexOf(true);
						}

						return true;
					case 'function' :
						return selector.call(this, i);
				}
				return false;
			};
			return builder;
		};

		return JQueryBuilder;
	}());
}

if (list === void 0) {
	var list = function () {
		"use strict";

		// Methods to parse list and split it to array
		return {

			// Split string to array by separator symbols with function and inside strings
			// cheching
			split: function split(string, separators, last) {
				var array = [];
				var current = "";
				var split = false;

				var func = 0;
				var quote = false;
				var escape = false;

				for (var i = 0; i < string.length; i++) {
					var letter = string[i];

					if (quote) {
						if (escape) {
							escape = false;
						} else if (letter == "\\") {
							escape = true;
						} else if (letter == quote) {
							quote = false;
						}
					} else if (letter == "\"" || letter == "'") {
						quote = letter;
					} else if (letter == "(") {
						func += 1;
					} else if (letter == ")") {
						if (func > 0) func -= 1;
					} else if (func === 0) {
						for (var j = 0; j < separators.length; j++) {
							if (letter == separators[j]) split = true;
						}
					}

					if (split) {
						if (current !== "") array.push(current.trim());
						current = "";
						split = false;
					} else {
						current += letter;
					}
				}

				if (last || current !== "") array.push(current.trim());
				return array;
			},

			// Split list devided by space:
			//
			//   list.space('a b') #=> ['a', 'b']
			//
			// It check for fuction and strings:
			//
			//   list.space('calc(1px + 1em) "b c"') #=> ['calc(1px + 1em)', '"b c"']
			space: function space(string) {
				return this.split(string, [" ", "\n", "\t"]);
			},

			// Split list devided by comma
			//
			//   list.comma('a, b') #=> ['a', 'b']
			//
			// It check for fuction and strings:
			//
			//   list.comma('rgba(0, 0, 0, 0) white') #=> ['rgba(0, 0, 0, 0)', '"white"']
			comma: function comma(string) {
				return this.split(string, [","], true);
			}

		};
	}();
}
var $j = function () {
	var $ = new JQueryBuilder(function (selector, context) {
		var recurse = arguments.callee,
			i
		;
		
		if (context === void 0) {
			context = app.project.activeItem;
		}
		
		switch (typeof selector) {
			case 'number':
				
				$.eachLayer(context, function (i, jquery) {
					if (this.index === selector) {
						jquery.push(this);
					}
				}, this);
				
				break;
				
			case 'string':
				var parts = list.comma(selector);
				
				if (parts.length === 1) {
					var part = parts[0];
					
					if (part === '*') {
						$.eachLayer(context, function (i, jquery) {
							jquery.push(this);
						}, this);
						break;
					}
					
                     if (part === '')
                         break;
                     
					if (typeof $.expr[part] === 'function') {
						recurse.call(this, $.expr[part], context);
					} else if (/^\d+$/.test(part)) {
						return recurse.call(this, parseInt(part, 10));
					} else {
						   // debugger;
						   var parsed = /^(\w+)(?:\((.+?)\))?$/.exec(part);
						   var fnName = /^(\w+)/.exec(part)[1];
						   var args = parsed[2] !== void 0 ? list.comma(parsed[2]).map(function (el) {
							   if (/^\w+$/.test(el)) {
								   el = '"' + el + '"';
							   }
							   return eval(el); // eval is evil;
						   }) : [];
							var fn;
							
							if ((fn = $.expr[fnName]) === void 0) {
								throw '???';
							}
							
							$.eachLayer(context, function (i, jquery) {
								var result = fn.apply(this, args);
								if (result === true) {
									jquery.push(this);
								}
							}, this);
					}
				} else if (parts.length > 1) {
					for (var i = 0; i < parts.length; i++) {
						recurse.call(this, parts[i], context);
					}
				} else {
					$.cons();
				}
				
				break;
				
			case 'function':
				if (selector instanceof RegExp) {
					$.eachLayer(context, function (i, jquery) {
						if (selector.test(this.name)) {
							jquery.push(this);
						}
					}, this);
					break;
				}
				
				$.eachLayer(context, function (i, jquery) {
					if (selector.call(this) === true) {
						jquery.push(this);
					}
				}, this);
				break;
			
			case 'object':
				if (selector instanceof Array) {
					for (i = 0; i < selector.length; i++) {
						recurse.call(this, selector[i], context);
					}
					break;
				}
                 
                 if (selector instanceof CompItem) {
                     recurse.call(this, '*', selector);
                     break;
                 }
                 
                 if (selector === null) {
                     $.cons();
                 }
                 
                 if (/Layer$/.test(selector.constructor.name)) {
                     this.push(selector);
                     break;
                 }
                 
				$.cons();
				break;
		}
	}).jQuery;

	$.fn.extend({
		_addMethod: function (alias, name) {
			
			var recurse = arguments.callee;
			
			if (name === void 0) {
				name = alias;
			}
			
			var parts = list.comma(alias);
			
			if (parts.length > 1) {
				for (var i = 0; i < parts.length; i++) {
					recurse.call(this, parts[i], name);
				}
				return;
			}
			
             if (typeof name === 'function') {
                 this[alias] = function () {
                     var _args = arguments;
                     return this.each(function () {
                         name.apply(this, _args);
                     });
                 };
             }
         
             if (typeof name === 'string') {
                this[alias] = function () {
                    var _args = arguments;
                    return this.each(function () {
                        this[name].apply(this, _args);
                    });
                };
             }
		},
		_addPropMethod: function (alias, prop) {
			
			var recurse = arguments.callee;
			
			if (prop === void 0) {
				prop = alias;
			}
			
			var parts = list.comma(alias);
			
			if (parts.length > 1) {
				for (var i = 0; i < parts.length; i++) {
					recurse.call(this, parts[i], prop);
				}
				return;
			}
			
			this[alias] = function (value) {
				
				if (value === void 0) {
                     if (typeof prop === 'string')
                        return this.first()[prop];
                        
                     if (typeof prop === 'function')
                       return prop.call(this.first());
                 }
				
				return this.each(function (i) {
					switch (typeof value) {
						case 'function' :
							this[prop] = value.call(this, i);
							break;
						default:
							this[prop] = value;
					}
				});
			};
			
			return this;
		},
		_addReadOnlyPropMethod: function (alias, prop) {
			var recurse = arguments.callee;
			
			if (prop === void 0) {
				prop = alias;
			}
			
			var parts = list.comma(alias);
			
			if (parts.length > 1) {
				for (var i = 0; i < parts.length; i++) {
					recurse.call(this, parts[i], prop);
				}
				return;
			}
			
            if (typeof prop === 'function') {
				this[alias] =  prop;
			} else {
				this[alias] = function (value) {
					return this.first()[prop];
				};
			}
			
			return this;
		},
		_addEnumPropMethod: function (alias, prop, enumObj) {

			var recurse = arguments.callee;
			
			if (typeof prop !== 'string') {
				enumObj = prop;
				prop = alias;
			}
			
			var parts = list.comma(alias);
			
			if (parts.length > 1) {
				for (var i = 0; i < parts.length; i++) {
					recurse.call(this, parts[i], prop, enumObj);
				}
				return;
			}
			
			this[alias] = function (value) {
				if (value === void 0) {
					for (var mode in enumObj) {
						if (enumObj[mode] === this.first()[prop])
							return mode;
					}
					
					throw '???';
				}
				
				value = value.toUpperCase();
				 
				if (enumObj[value] === void 0)
					throw '???';
				
				return this.each(function () {
					if (typeof value === 'string') {
						this[prop] = enumObj[value];
					} else {
						this[prop] = value; // ???
					}
					
				});
			};
			
			return this;
		},
		duplicate: function () {
			var result = $();
			
			this.each(function () {
				result.push(this.duplicate());
			});
			
			return result;
		},
         parent: function (parent) {
             if (parent === void 0)
                 return this.first().parent;
                 
             return this.each(function () {
                 this.setParentWithJump($(parent).first());
             });
         },
         children: function () {
             var thisSet = $('*', this.first().containingComp),
                 result = $(),
                 parent = $(this).first()
             ;
             
             thisSet.each(function () {
                 if (this.parent === parent) {
                     result.push(this);
                 }
             });
             
             return result;
         },
         siblings: function () {
             var thisSet = $('*', this.first().containingComp),
                 result = $(),
                 self = $(this).first()
             ;
             
             thisSet.each(function () {
                 if (this !== self) {
                     result.push(this);
                 }
             });
             
             return result;
         },
         comp: function (comp) {
             if (comp === void 0)
                 return this.first().containingComp;
             
             $.cons();
             var result = $();
             
             this.each(function () {
                 this.copyToComp(comp);
                 result.push(this);
                 this.remove();
             });
         
             return result;
         }
	});

	$.fn._addMethod('copyTo,copy', 'copyToComp');
	$.fn._addMethod('moveAfter,after', 'moveAfter');
	$.fn._addMethod('moveBefore,before', 'moveBefore');
	$.fn._addMethod('moveTo,move', 'moveTo');
	$.fn._addMethod('moveToBeginning,toBeginning', 'moveToBeginning');
	$.fn._addMethod('moveToEnd,toEnd', 'moveToEnd');
	$.fn._addMethod('remove');
	$.fn._addPropMethod('active');
	$.fn._addPropMethod('adjustmentLayer,adjustment', 'adjustmentLayer');
	$.fn._addPropMethod('audioActive');
	$.fn._addPropMethod('audioEnabled');
	$.fn._addPropMethod('autoOrient');
	$.fn._addPropMethod('effectsActive');
	$.fn._addPropMethod('elided');
	$.fn._addPropMethod('enabled');
	$.fn._addPropMethod('frameBlending');
	$.fn._addPropMethod('guideLayer,guide', 'guideLayer');
	$.fn._addPropMethod('hasAudio');
	$.fn._addPropMethod('hasTrackMatte');
	$.fn._addPropMethod('hasVideo');
    
	$.fn._addPropMethod('rect', function (time) {
        // Wrong
		if (time === void 0) {
			time = this.containingComp.time;
		}
		
        return this.sourceRectAtTime(time, true);
    });
	$.fn._addPropMethod('comment');
	$.fn._addPropMethod('inPoint');
	$.fn._addPropMethod('outPoint');
	$.fn._addPropMethod('label');
	$.fn._addPropMethod('matchName');
	$.fn._addPropMethod('name');
	$.fn._addPropMethod('motionBlur');
	$.fn._addPropMethod('nullLayer');
	$.fn._addPropMethod('startTime');
	$.fn._addPropMethod('stretch');
	$.fn._addPropMethod('time');
	$.fn._addReadOnlyPropMethod('isEffect');
	$.fn._addReadOnlyPropMethod('isMask');
	$.fn._addReadOnlyPropMethod('isModified');
	$.fn._addReadOnlyPropMethod('isNameFromSource');
	$.fn._addReadOnlyPropMethod('isNameSet');
	$.fn._addReadOnlyPropMethod('isTrackMatte');
	$.fn._addReadOnlyPropMethod('nullLayer');
	$.fn._addReadOnlyPropMethod('height');
	$.fn._addReadOnlyPropMethod('width');
	$.fn._addReadOnlyPropMethod('index');
	$.fn._addPropMethod('locked');
	$.fn._addPropMethod('motionBlur');
	$.fn._addPropMethod('preserveTransparency');
	$.fn._addPropMethod('selected');
	$.fn._addPropMethod('shy');
	$.fn._addPropMethod('solo');
	$.fn._addPropMethod('threeDLayer,threeD','threeDLayer');
	$.fn._addPropMethod('threeDPerChar');
	$.fn._addPropMethod('timeRemapEnabled,timeRemap', 'timeRemapEnabled');
	$.fn._addEnumPropMethod('blending,blendingMode', 'blendingMode', BlendingMode);
	$.fn._addEnumPropMethod('autoOrient', AutoOrientType);
	$.fn._addEnumPropMethod('frameBlendingType', 'frameBlendingType', FrameBlendingType);
	$.fn._addEnumPropMethod('trackMatte,trackMatteType', 'trackMatteType', TrackMatteType);
	$.fn._addEnumPropMethod('quality', LayerQuality);
	$.fn._addEnumPropMethod('label', {
        RED:1,
        YELLOW:2,
        AQUA:3,
        PINK:4,
        LAVENDER:5,
        PEACH:6,
        SEAFOAM:7,
        BLUE:8,
        GREEN:9,
        PURPLE:10,
        ORANGE:11,
        BROWN:12,
        FUCHSIA:13,
        CYAN:14,
        SANDSTONE:15,
        DARKGREEN:16
    });

	$.eachLayer = function (context, callback, thisObj) {
		for (var i = 1; i <= context.numLayers; i++) {
			callback.call(context.layers[i], i, thisObj);
		}
	};

	$.noop = function () {};

	$.cons = function () { throw "Under construction"; };

	$.expr = {
		_set: function (selector, prop) {
			var recurse = arguments.callee;
			if (prop === void 0) {
				prop = selector;
			}
			
			var parts = list.comma(selector);
			
			if (parts.length > 1) {
				for (var i = 0; i < parts.length; i++) {
					recurse.call(this, parts[i], prop);
				}
				return;
			}
			
            
             switch (typeof prop) {
                 case 'string':
                    this[selector] = function () {
                        return this[prop] === true;
                    };
                    break;
                 case 'function':
                    this[selector] = prop;
                    break;
                 default:
                    throw '???';
             }
			return this;
		}
	};

	$.expr._set('selected,sel');
	$.expr._set('active');
	$.expr._set('locked');
	$.expr._set('motionBlur');
	$.expr._set('shy');
	$.expr._set('solo');
	$.expr._set('3d', 'threeDLayer');
	$.expr._set('timeRemap,timeRemapEnabled', 'timeRemapEnabled');
	$.expr._set('null', 'nullLayer');
	$.expr._set('adjustmentLayer');
	$.expr._set('audio', 'hasAudio');
	$.expr._set('video', 'hasVideo');
	$.expr._set('modified', 'isModified');
	$.expr._set('even', function () {
		return this.index % 2 === 0;
	});
	$.expr._set('odd', function () {
		return this.index % 2 !== 0;
	});
	$.expr._set('is', function (type) {
		// debugger;
		switch (type.toLowerCase()) {
			case 'text' :
				return this instanceof TextLayer;
				
			case 'av' :
				return this instanceof AVLayer;
				
			case 'adj' :
			case 'adjustment' :
				return this instanceof AVLayer && this.adjustmentLayer === true;
				
			case 'shape' :
				return this instanceof ShapeLayer;
				
			case 'light' :
				return this instanceof LightLayer;
				
			case 'cam' :
			case 'camera' :
				return this instanceof CameraLayer;
				
			case 'null':
				return this.nullLayer === true;
		}
		
		if (global[type] instanceof Function)
			return this instanceof global[type];
		
		throw '???';
	});
	$.expr._set('cam, camera', function () {
		return this instanceof CameraLayer;
	});
	$.expr._set('av', function () {
		return this instanceof AVLayer;
	});
	$.expr._set('null', function () {
		return this.nullLayer === true;
	});
	$.expr._set('adj, adjustment', function () {
		return this instanceof AVLayer && this.adjustmentLayer === true;
	});
	$.expr._set('light', function () {
		return this instanceof LightLayer;
	});
	$.expr._set('shape', function () {
		return this instanceof ShapeLayer;
	});
	$.expr._set('at', function (time) {
		
		if (time === void 0) {
			time = this.containingComp.time;
		}
		
		return this.activeAtTime(time);
	});
	$.expr._set('blending,blendingMode', function () {
		
		var criterias = Array.prototype.slice.call(arguments).map(function (mode) {
			return mode.toUpperCase();
		});
		
		for (var i = 0; i < criterias.length; i++) {
			var mode = criterias[i];
			
			if (BlendingMode[mode] === void 0)
				continue;
			
			if (this.blendingMode === BlendingMode[mode])
				return true;
		}
		
		return false;
	});
	$.expr._set('label', function () {
		var Label = {
            RED:1,
            YELLOW:2,
            AQUA:3,
            PINK:4,
            LAVENDER:5,
            PEACH:6,
            SEAFOAM:7,
            BLUE:8,
            GREEN:9,
            PURPLE:10,
            ORANGE:11,
            BROWN:12,
            FUCHSIA:13,
            CYAN:14,
            SANDSTONE:15,
            DARKGREEN:16
        };
		var criterias = Array.prototype.slice.call(arguments).map(function (label) {
			return label.toUpperCase();
		});
		
		for (var i = 0; i < criterias.length; i++) {
			var label = criterias[i];
			
			if (Label[label] === void 0)
				continue;
			
			if (this.label === Label[label])
				return true;
		}
		
		return false;
	});
	
    $.expr._set('nth', function (n) {
        return this.index % n === 0;
    });
	return $;
}();

$j.fn._addMethod('randomLabel', function () {
    this.label = Math.round(16 * Math.random());
});

var a = $j(3);
a.siblings();
