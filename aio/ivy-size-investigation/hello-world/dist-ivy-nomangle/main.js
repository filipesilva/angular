(window.webpackJsonp = window.webpackJsonp || []).push([ [ 0 ], {
    0: function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__("5hKC");
    },
    "5hKC": function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        var extendStatics = function(d, b) {
            return (extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            })(d, b);
        };
        function __extends(d, b) {
            function __() {
                this.constructor = d;
            }
            extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
            new __());
        }
        var __assign = function() {
            return (__assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) for (var p in s = arguments[i]) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
                return t;
            }).apply(this, arguments);
        };
        function __metadata(metadataKey, metadataValue) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(metadataKey, metadataValue);
        }
        function __values(o) {
            var m = "function" == typeof Symbol && o[Symbol.iterator], i = 0;
            return m ? m.call(o) : {
                next: function() {
                    return o && i >= o.length && (o = void 0), {
                        value: o && o[i++],
                        done: !o
                    };
                }
            };
        }
        function __read(o, n) {
            var m = "function" == typeof Symbol && o[Symbol.iterator];
            if (!m) return o;
            var r, e, i = m.call(o), ar = [];
            try {
                for (;(void 0 === n || n-- > 0) && !(r = i.next()).done; ) ar.push(r.value);
            } catch (error) {
                e = {
                    error: error
                };
            } finally {
                try {
                    r && !r.done && (m = i.return) && m.call(i);
                } finally {
                    if (e) throw e.error;
                }
            }
            return ar;
        }
        function __spread() {
            for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
            return ar;
        }
        var isArray = Array.isArray || function(x) {
            return x && "number" == typeof x.length;
        };
        function isObject(x) {
            return null != x && "object" == typeof x;
        }
        function isFunction(x) {
            return "function" == typeof x;
        }
        var tryCatchTarget, errorObject = {
            e: {}
        };
        function tryCatcher() {
            try {
                return tryCatchTarget.apply(this, arguments);
            } catch (e) {
                return errorObject.e = e, errorObject;
            }
        }
        function tryCatch(fn) {
            return tryCatchTarget = fn, tryCatcher;
        }
        function UnsubscriptionErrorImpl(errors) {
            return Error.call(this), this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
                return i + 1 + ") " + err.toString();
            }).join("\n  ") : "", this.name = "UnsubscriptionError", this.errors = errors, this;
        }
        UnsubscriptionErrorImpl.prototype = Object.create(Error.prototype);
        var UnsubscriptionError = UnsubscriptionErrorImpl, Subscription_Subscription = function() {
            function Subscription(unsubscribe) {
                this.closed = !1, this._parent = null, this._parents = null, this._subscriptions = null, 
                unsubscribe && (this._unsubscribe = unsubscribe);
            }
            var empty;
            return Subscription.prototype.unsubscribe = function() {
                var errors, hasErrors = !1;
                if (!this.closed) {
                    var _parent = this._parent, _parents = this._parents, _unsubscribe = this._unsubscribe, _subscriptions = this._subscriptions;
                    this.closed = !0, this._parent = null, this._parents = null, this._subscriptions = null;
                    for (var index = -1, len = _parents ? _parents.length : 0; _parent; ) _parent.remove(this), 
                    _parent = ++index < len && _parents[index] || null;
                    if (isFunction(_unsubscribe) && tryCatch(_unsubscribe).call(this) === errorObject && (hasErrors = !0, 
                    errors = errors || (errorObject.e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(errorObject.e.errors) : [ errorObject.e ])), 
                    isArray(_subscriptions)) for (index = -1, len = _subscriptions.length; ++index < len; ) {
                        var sub = _subscriptions[index];
                        if (isObject(sub) && tryCatch(sub.unsubscribe).call(sub) === errorObject) {
                            hasErrors = !0, errors = errors || [];
                            var err = errorObject.e;
                            err instanceof UnsubscriptionError ? errors = errors.concat(flattenUnsubscriptionErrors(err.errors)) : errors.push(err);
                        }
                    }
                    if (hasErrors) throw new UnsubscriptionError(errors);
                }
            }, Subscription.prototype.add = function(teardown) {
                if (!teardown || teardown === Subscription.EMPTY) return Subscription.EMPTY;
                if (teardown === this) return this;
                var subscription = teardown;
                switch (typeof teardown) {
                  case "function":
                    subscription = new Subscription(teardown);

                  case "object":
                    if (subscription.closed || "function" != typeof subscription.unsubscribe) return subscription;
                    if (this.closed) return subscription.unsubscribe(), subscription;
                    if ("function" != typeof subscription._addParent) {
                        var tmp = subscription;
                        (subscription = new Subscription())._subscriptions = [ tmp ];
                    }
                    break;

                  default:
                    throw new Error("unrecognized teardown " + teardown + " added to Subscription.");
                }
                return (this._subscriptions || (this._subscriptions = [])).push(subscription), subscription._addParent(this), 
                subscription;
            }, Subscription.prototype.remove = function(subscription) {
                var subscriptions = this._subscriptions;
                if (subscriptions) {
                    var subscriptionIndex = subscriptions.indexOf(subscription);
                    -1 !== subscriptionIndex && subscriptions.splice(subscriptionIndex, 1);
                }
            }, Subscription.prototype._addParent = function(parent) {
                var _parent = this._parent, _parents = this._parents;
                _parent && _parent !== parent ? _parents ? -1 === _parents.indexOf(parent) && _parents.push(parent) : this._parents = [ parent ] : this._parent = parent;
            }, Subscription.EMPTY = ((empty = new Subscription()).closed = !0, empty), Subscription;
        }();
        function flattenUnsubscriptionErrors(errors) {
            return errors.reduce(function(errs, err) {
                return errs.concat(err instanceof UnsubscriptionError ? err.errors : err);
            }, []);
        }
        var tslib_es6_extendStatics = function(d, b) {
            return (tslib_es6_extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            })(d, b);
        };
        function tslib_es6_extends(d, b) {
            function __() {
                this.constructor = d;
            }
            tslib_es6_extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
            new __());
        }
        var _enable_super_gross_mode_that_will_cause_bad_things = !1, config = {
            Promise: void 0,
            set useDeprecatedSynchronousErrorHandling(value) {
                _enable_super_gross_mode_that_will_cause_bad_things = value;
            },
            get useDeprecatedSynchronousErrorHandling() {
                return _enable_super_gross_mode_that_will_cause_bad_things;
            }
        };
        function hostReportError(err) {
            setTimeout(function() {
                throw err;
            });
        }
        var empty = {
            closed: !0,
            next: function(value) {},
            error: function(err) {
                if (config.useDeprecatedSynchronousErrorHandling) throw err;
                hostReportError(err);
            },
            complete: function() {}
        }, rxSubscriber = "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random(), Subscriber_Subscriber = function(_super) {
            function Subscriber(destinationOrNext, error, complete) {
                var _this = _super.call(this) || this;
                switch (_this.syncErrorValue = null, _this.syncErrorThrown = !1, _this.syncErrorThrowable = !1, 
                _this.isStopped = !1, _this._parentSubscription = null, arguments.length) {
                  case 0:
                    _this.destination = empty;
                    break;

                  case 1:
                    if (!destinationOrNext) {
                        _this.destination = empty;
                        break;
                    }
                    if ("object" == typeof destinationOrNext) {
                        destinationOrNext instanceof Subscriber ? (_this.syncErrorThrowable = destinationOrNext.syncErrorThrowable, 
                        _this.destination = destinationOrNext, destinationOrNext.add(_this)) : (_this.syncErrorThrowable = !0, 
                        _this.destination = new Subscriber_SafeSubscriber(_this, destinationOrNext));
                        break;
                    }

                  default:
                    _this.syncErrorThrowable = !0, _this.destination = new Subscriber_SafeSubscriber(_this, destinationOrNext, error, complete);
                }
                return _this;
            }
            return tslib_es6_extends(Subscriber, _super), Subscriber.prototype[rxSubscriber] = function() {
                return this;
            }, Subscriber.create = function(next, error, complete) {
                var subscriber = new Subscriber(next, error, complete);
                return subscriber.syncErrorThrowable = !1, subscriber;
            }, Subscriber.prototype.next = function(value) {
                this.isStopped || this._next(value);
            }, Subscriber.prototype.error = function(err) {
                this.isStopped || (this.isStopped = !0, this._error(err));
            }, Subscriber.prototype.complete = function() {
                this.isStopped || (this.isStopped = !0, this._complete());
            }, Subscriber.prototype.unsubscribe = function() {
                this.closed || (this.isStopped = !0, _super.prototype.unsubscribe.call(this));
            }, Subscriber.prototype._next = function(value) {
                this.destination.next(value);
            }, Subscriber.prototype._error = function(err) {
                this.destination.error(err), this.unsubscribe();
            }, Subscriber.prototype._complete = function() {
                this.destination.complete(), this.unsubscribe();
            }, Subscriber.prototype._unsubscribeAndRecycle = function() {
                var _parent = this._parent, _parents = this._parents;
                return this._parent = null, this._parents = null, this.unsubscribe(), this.closed = !1, 
                this.isStopped = !1, this._parent = _parent, this._parents = _parents, this._parentSubscription = null, 
                this;
            }, Subscriber;
        }(Subscription_Subscription), Subscriber_SafeSubscriber = function(_super) {
            function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
                var next, _this = _super.call(this) || this;
                _this._parentSubscriber = _parentSubscriber;
                var context = _this;
                return isFunction(observerOrNext) ? next = observerOrNext : observerOrNext && (next = observerOrNext.next, 
                error = observerOrNext.error, complete = observerOrNext.complete, observerOrNext !== empty && (isFunction((context = Object.create(observerOrNext)).unsubscribe) && _this.add(context.unsubscribe.bind(context)), 
                context.unsubscribe = _this.unsubscribe.bind(_this))), _this._context = context, 
                _this._next = next, _this._error = error, _this._complete = complete, _this;
            }
            return tslib_es6_extends(SafeSubscriber, _super), SafeSubscriber.prototype.next = function(value) {
                if (!this.isStopped && this._next) {
                    var _parentSubscriber = this._parentSubscriber;
                    config.useDeprecatedSynchronousErrorHandling && _parentSubscriber.syncErrorThrowable ? this.__tryOrSetError(_parentSubscriber, this._next, value) && this.unsubscribe() : this.__tryOrUnsub(this._next, value);
                }
            }, SafeSubscriber.prototype.error = function(err) {
                if (!this.isStopped) {
                    var _parentSubscriber = this._parentSubscriber, useDeprecatedSynchronousErrorHandling = config.useDeprecatedSynchronousErrorHandling;
                    if (this._error) useDeprecatedSynchronousErrorHandling && _parentSubscriber.syncErrorThrowable ? (this.__tryOrSetError(_parentSubscriber, this._error, err), 
                    this.unsubscribe()) : (this.__tryOrUnsub(this._error, err), this.unsubscribe()); else if (_parentSubscriber.syncErrorThrowable) useDeprecatedSynchronousErrorHandling ? (_parentSubscriber.syncErrorValue = err, 
                    _parentSubscriber.syncErrorThrown = !0) : hostReportError(err), this.unsubscribe(); else {
                        if (this.unsubscribe(), useDeprecatedSynchronousErrorHandling) throw err;
                        hostReportError(err);
                    }
                }
            }, SafeSubscriber.prototype.complete = function() {
                var _this = this;
                if (!this.isStopped) {
                    var _parentSubscriber = this._parentSubscriber;
                    if (this._complete) {
                        var wrappedComplete = function() {
                            return _this._complete.call(_this._context);
                        };
                        config.useDeprecatedSynchronousErrorHandling && _parentSubscriber.syncErrorThrowable ? (this.__tryOrSetError(_parentSubscriber, wrappedComplete), 
                        this.unsubscribe()) : (this.__tryOrUnsub(wrappedComplete), this.unsubscribe());
                    } else this.unsubscribe();
                }
            }, SafeSubscriber.prototype.__tryOrUnsub = function(fn, value) {
                try {
                    fn.call(this._context, value);
                } catch (err) {
                    if (this.unsubscribe(), config.useDeprecatedSynchronousErrorHandling) throw err;
                    hostReportError(err);
                }
            }, SafeSubscriber.prototype.__tryOrSetError = function(parent, fn, value) {
                if (!config.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
                try {
                    fn.call(this._context, value);
                } catch (err) {
                    return config.useDeprecatedSynchronousErrorHandling ? (parent.syncErrorValue = err, 
                    parent.syncErrorThrown = !0, !0) : (hostReportError(err), !0);
                }
                return !1;
            }, SafeSubscriber.prototype._unsubscribe = function() {
                var _parentSubscriber = this._parentSubscriber;
                this._context = null, this._parentSubscriber = null, _parentSubscriber.unsubscribe();
            }, SafeSubscriber;
        }(Subscriber_Subscriber), observable_observable = "function" == typeof Symbol && Symbol.observable || "@@observable";
        var Observable_Observable = function() {
            function Observable(subscribe) {
                this._isScalar = !1, subscribe && (this._subscribe = subscribe);
            }
            return Observable.prototype.lift = function(operator) {
                var observable = new Observable();
                return observable.source = this, observable.operator = operator, observable;
            }, Observable.prototype.subscribe = function(observerOrNext, error, complete) {
                var operator = this.operator, sink = function(nextOrObserver, error, complete) {
                    if (nextOrObserver) {
                        if (nextOrObserver instanceof Subscriber_Subscriber) return nextOrObserver;
                        if (nextOrObserver[rxSubscriber]) return nextOrObserver[rxSubscriber]();
                    }
                    return nextOrObserver || error || complete ? new Subscriber_Subscriber(nextOrObserver, error, complete) : new Subscriber_Subscriber(empty);
                }(observerOrNext, error, complete);
                if (operator ? operator.call(sink, this.source) : sink.add(this.source || config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink)), 
                config.useDeprecatedSynchronousErrorHandling && sink.syncErrorThrowable && (sink.syncErrorThrowable = !1, 
                sink.syncErrorThrown)) throw sink.syncErrorValue;
                return sink;
            }, Observable.prototype._trySubscribe = function(sink) {
                try {
                    return this._subscribe(sink);
                } catch (err) {
                    config.useDeprecatedSynchronousErrorHandling && (sink.syncErrorThrown = !0, sink.syncErrorValue = err), 
                    function(observer) {
                        for (;observer; ) {
                            var destination = observer.destination;
                            if (observer.closed || observer.isStopped) return !1;
                            observer = destination && destination instanceof Subscriber_Subscriber ? destination : null;
                        }
                        return !0;
                    }(sink) ? sink.error(err) : console.warn(err);
                }
            }, Observable.prototype.forEach = function(next, promiseCtor) {
                var _this = this;
                return new (promiseCtor = getPromiseCtor(promiseCtor))(function(resolve, reject) {
                    var subscription;
                    subscription = _this.subscribe(function(value) {
                        try {
                            next(value);
                        } catch (err) {
                            reject(err), subscription && subscription.unsubscribe();
                        }
                    }, reject, resolve);
                });
            }, Observable.prototype._subscribe = function(subscriber) {
                var source = this.source;
                return source && source.subscribe(subscriber);
            }, Observable.prototype[observable_observable] = function() {
                return this;
            }, Observable.prototype.pipe = function() {
                for (var operations = [], _i = 0; _i < arguments.length; _i++) operations[_i] = arguments[_i];
                return 0 === operations.length ? this : ((fns = operations) ? 1 === fns.length ? fns[0] : function(input) {
                    return fns.reduce(function(prev, fn) {
                        return fn(prev);
                    }, input);
                } : function() {})(this);
                var fns;
            }, Observable.prototype.toPromise = function(promiseCtor) {
                var _this = this;
                return new (promiseCtor = getPromiseCtor(promiseCtor))(function(resolve, reject) {
                    var value;
                    _this.subscribe(function(x) {
                        return value = x;
                    }, function(err) {
                        return reject(err);
                    }, function() {
                        return resolve(value);
                    });
                });
            }, Observable.create = function(subscribe) {
                return new Observable(subscribe);
            }, Observable;
        }();
        function getPromiseCtor(promiseCtor) {
            if (promiseCtor || (promiseCtor = config.Promise || Promise), !promiseCtor) throw new Error("no Promise impl found");
            return promiseCtor;
        }
        function ObjectUnsubscribedErrorImpl() {
            return Error.call(this), this.message = "object unsubscribed", this.name = "ObjectUnsubscribedError", 
            this;
        }
        ObjectUnsubscribedErrorImpl.prototype = Object.create(Error.prototype);
        var ObjectUnsubscribedError = ObjectUnsubscribedErrorImpl, SubjectSubscription_SubjectSubscription = function(_super) {
            function SubjectSubscription(subject, subscriber) {
                var _this = _super.call(this) || this;
                return _this.subject = subject, _this.subscriber = subscriber, _this.closed = !1, 
                _this;
            }
            return tslib_es6_extends(SubjectSubscription, _super), SubjectSubscription.prototype.unsubscribe = function() {
                if (!this.closed) {
                    this.closed = !0;
                    var subject = this.subject, observers = subject.observers;
                    if (this.subject = null, observers && 0 !== observers.length && !subject.isStopped && !subject.closed) {
                        var subscriberIndex = observers.indexOf(this.subscriber);
                        -1 !== subscriberIndex && observers.splice(subscriberIndex, 1);
                    }
                }
            }, SubjectSubscription;
        }(Subscription_Subscription), Subject_SubjectSubscriber = function(_super) {
            function SubjectSubscriber(destination) {
                var _this = _super.call(this, destination) || this;
                return _this.destination = destination, _this;
            }
            return tslib_es6_extends(SubjectSubscriber, _super), SubjectSubscriber;
        }(Subscriber_Subscriber), Subject_Subject = function(_super) {
            function Subject() {
                var _this = _super.call(this) || this;
                return _this.observers = [], _this.closed = !1, _this.isStopped = !1, _this.hasError = !1, 
                _this.thrownError = null, _this;
            }
            return tslib_es6_extends(Subject, _super), Subject.prototype[rxSubscriber] = function() {
                return new Subject_SubjectSubscriber(this);
            }, Subject.prototype.lift = function(operator) {
                var subject = new Subject_AnonymousSubject(this, this);
                return subject.operator = operator, subject;
            }, Subject.prototype.next = function(value) {
                if (this.closed) throw new ObjectUnsubscribedError();
                if (!this.isStopped) for (var observers = this.observers, len = observers.length, copy = observers.slice(), i = 0; i < len; i++) copy[i].next(value);
            }, Subject.prototype.error = function(err) {
                if (this.closed) throw new ObjectUnsubscribedError();
                this.hasError = !0, this.thrownError = err, this.isStopped = !0;
                for (var observers = this.observers, len = observers.length, copy = observers.slice(), i = 0; i < len; i++) copy[i].error(err);
                this.observers.length = 0;
            }, Subject.prototype.complete = function() {
                if (this.closed) throw new ObjectUnsubscribedError();
                this.isStopped = !0;
                for (var observers = this.observers, len = observers.length, copy = observers.slice(), i = 0; i < len; i++) copy[i].complete();
                this.observers.length = 0;
            }, Subject.prototype.unsubscribe = function() {
                this.isStopped = !0, this.closed = !0, this.observers = null;
            }, Subject.prototype._trySubscribe = function(subscriber) {
                if (this.closed) throw new ObjectUnsubscribedError();
                return _super.prototype._trySubscribe.call(this, subscriber);
            }, Subject.prototype._subscribe = function(subscriber) {
                if (this.closed) throw new ObjectUnsubscribedError();
                return this.hasError ? (subscriber.error(this.thrownError), Subscription_Subscription.EMPTY) : this.isStopped ? (subscriber.complete(), 
                Subscription_Subscription.EMPTY) : (this.observers.push(subscriber), new SubjectSubscription_SubjectSubscription(this, subscriber));
            }, Subject.prototype.asObservable = function() {
                var observable = new Observable_Observable();
                return observable.source = this, observable;
            }, Subject.create = function(destination, source) {
                return new Subject_AnonymousSubject(destination, source);
            }, Subject;
        }(Observable_Observable), Subject_AnonymousSubject = function(_super) {
            function AnonymousSubject(destination, source) {
                var _this = _super.call(this) || this;
                return _this.destination = destination, _this.source = source, _this;
            }
            return tslib_es6_extends(AnonymousSubject, _super), AnonymousSubject.prototype.next = function(value) {
                var destination = this.destination;
                destination && destination.next && destination.next(value);
            }, AnonymousSubject.prototype.error = function(err) {
                var destination = this.destination;
                destination && destination.error && this.destination.error(err);
            }, AnonymousSubject.prototype.complete = function() {
                var destination = this.destination;
                destination && destination.complete && this.destination.complete();
            }, AnonymousSubject.prototype._subscribe = function(subscriber) {
                return this.source ? this.source.subscribe(subscriber) : Subscription_Subscription.EMPTY;
            }, AnonymousSubject;
        }(Subject_Subject), InnerSubscriber_InnerSubscriber = function(_super) {
            function InnerSubscriber(parent, outerValue, outerIndex) {
                var _this = _super.call(this) || this;
                return _this.parent = parent, _this.outerValue = outerValue, _this.outerIndex = outerIndex, 
                _this.index = 0, _this;
            }
            return tslib_es6_extends(InnerSubscriber, _super), InnerSubscriber.prototype._next = function(value) {
                this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
            }, InnerSubscriber.prototype._error = function(error) {
                this.parent.notifyError(error, this), this.unsubscribe();
            }, InnerSubscriber.prototype._complete = function() {
                this.parent.notifyComplete(this), this.unsubscribe();
            }, InnerSubscriber;
        }(Subscriber_Subscriber), subscribeToArray = function(array) {
            return function(subscriber) {
                for (var i = 0, len = array.length; i < len && !subscriber.closed; i++) subscriber.next(array[i]);
                subscriber.closed || subscriber.complete();
            };
        }, subscribeToPromise = function(promise) {
            return function(subscriber) {
                return promise.then(function(value) {
                    subscriber.closed || (subscriber.next(value), subscriber.complete());
                }, function(err) {
                    return subscriber.error(err);
                }).then(null, hostReportError), subscriber;
            };
        };
        function getSymbolIterator() {
            return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
        }
        var iterator_iterator = getSymbolIterator(), subscribeToIterable = function(iterable) {
            return function(subscriber) {
                for (var iterator = iterable[iterator_iterator](); ;) {
                    var item = iterator.next();
                    if (item.done) {
                        subscriber.complete();
                        break;
                    }
                    if (subscriber.next(item.value), subscriber.closed) break;
                }
                return "function" == typeof iterator.return && subscriber.add(function() {
                    iterator.return && iterator.return();
                }), subscriber;
            };
        }, subscribeToObservable = function(obj) {
            return function(subscriber) {
                var obs = obj[observable_observable]();
                if ("function" != typeof obs.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
                return obs.subscribe(subscriber);
            };
        }, isArrayLike = function(x) {
            return x && "number" == typeof x.length && "function" != typeof x;
        };
        function isPromise(value) {
            return value && "function" != typeof value.subscribe && "function" == typeof value.then;
        }
        var subscribeTo = function(result) {
            if (result instanceof Observable_Observable) return function(subscriber) {
                return result._isScalar ? (subscriber.next(result.value), void subscriber.complete()) : result.subscribe(subscriber);
            };
            if (result && "function" == typeof result[observable_observable]) return subscribeToObservable(result);
            if (isArrayLike(result)) return subscribeToArray(result);
            if (isPromise(result)) return subscribeToPromise(result);
            if (result && "function" == typeof result[iterator_iterator]) return subscribeToIterable(result);
            var value = isObject(result) ? "an invalid object" : "'" + result + "'";
            throw new TypeError("You provided " + value + " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.");
        }, OuterSubscriber_OuterSubscriber = function(_super) {
            function OuterSubscriber() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return tslib_es6_extends(OuterSubscriber, _super), OuterSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                this.destination.next(innerValue);
            }, OuterSubscriber.prototype.notifyError = function(error, innerSub) {
                this.destination.error(error);
            }, OuterSubscriber.prototype.notifyComplete = function(innerSub) {
                this.destination.complete();
            }, OuterSubscriber;
        }(Subscriber_Subscriber), MapOperator = function() {
            function MapOperator(project, thisArg) {
                this.project = project, this.thisArg = thisArg;
            }
            return MapOperator.prototype.call = function(subscriber, source) {
                return source.subscribe(new map_MapSubscriber(subscriber, this.project, this.thisArg));
            }, MapOperator;
        }(), map_MapSubscriber = function(_super) {
            function MapSubscriber(destination, project, thisArg) {
                var _this = _super.call(this, destination) || this;
                return _this.project = project, _this.count = 0, _this.thisArg = thisArg || _this, 
                _this;
            }
            return tslib_es6_extends(MapSubscriber, _super), MapSubscriber.prototype._next = function(value) {
                var result;
                try {
                    result = this.project.call(this.thisArg, value, this.count++);
                } catch (err) {
                    return void this.destination.error(err);
                }
                this.destination.next(result);
            }, MapSubscriber;
        }(Subscriber_Subscriber);
        function fromArray(input, scheduler) {
            return new Observable_Observable(scheduler ? function(subscriber) {
                var sub = new Subscription_Subscription(), i = 0;
                return sub.add(scheduler.schedule(function() {
                    i !== input.length ? (subscriber.next(input[i++]), subscriber.closed || sub.add(this.schedule())) : subscriber.complete();
                })), sub;
            } : subscribeToArray(input));
        }
        var MergeMapOperator = function() {
            function MergeMapOperator(project, concurrent) {
                void 0 === concurrent && (concurrent = Number.POSITIVE_INFINITY), this.project = project, 
                this.concurrent = concurrent;
            }
            return MergeMapOperator.prototype.call = function(observer, source) {
                return source.subscribe(new mergeMap_MergeMapSubscriber(observer, this.project, this.concurrent));
            }, MergeMapOperator;
        }(), mergeMap_MergeMapSubscriber = function(_super) {
            function MergeMapSubscriber(destination, project, concurrent) {
                void 0 === concurrent && (concurrent = Number.POSITIVE_INFINITY);
                var _this = _super.call(this, destination) || this;
                return _this.project = project, _this.concurrent = concurrent, _this.hasCompleted = !1, 
                _this.buffer = [], _this.active = 0, _this.index = 0, _this;
            }
            return tslib_es6_extends(MergeMapSubscriber, _super), MergeMapSubscriber.prototype._next = function(value) {
                this.active < this.concurrent ? this._tryNext(value) : this.buffer.push(value);
            }, MergeMapSubscriber.prototype._tryNext = function(value) {
                var result, index = this.index++;
                try {
                    result = this.project(value, index);
                } catch (err) {
                    return void this.destination.error(err);
                }
                this.active++, this._innerSub(result, value, index);
            }, MergeMapSubscriber.prototype._innerSub = function(ish, value, index) {
                var result, destination, innerSubscriber = new InnerSubscriber_InnerSubscriber(this, void 0, void 0);
                this.destination.add(innerSubscriber), result = ish, void 0 === (destination = innerSubscriber) && (destination = new InnerSubscriber_InnerSubscriber(this, value, index)), 
                destination.closed || subscribeTo(result)(destination);
            }, MergeMapSubscriber.prototype._complete = function() {
                this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete(), 
                this.unsubscribe();
            }, MergeMapSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                this.destination.next(innerValue);
            }, MergeMapSubscriber.prototype.notifyComplete = function(innerSub) {
                var buffer = this.buffer;
                this.remove(innerSub), this.active--, buffer.length > 0 ? this._next(buffer.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete();
            }, MergeMapSubscriber;
        }(OuterSubscriber_OuterSubscriber);
        function identity(x) {
            return x;
        }
        function refCount() {
            return function(source) {
                return source.lift(new RefCountOperator(source));
            };
        }
        var RefCountOperator = function() {
            function RefCountOperator(connectable) {
                this.connectable = connectable;
            }
            return RefCountOperator.prototype.call = function(subscriber, source) {
                var connectable = this.connectable;
                connectable._refCount++;
                var refCounter = new refCount_RefCountSubscriber(subscriber, connectable), subscription = source.subscribe(refCounter);
                return refCounter.closed || (refCounter.connection = connectable.connect()), subscription;
            }, RefCountOperator;
        }(), refCount_RefCountSubscriber = function(_super) {
            function RefCountSubscriber(destination, connectable) {
                var _this = _super.call(this, destination) || this;
                return _this.connectable = connectable, _this;
            }
            return tslib_es6_extends(RefCountSubscriber, _super), RefCountSubscriber.prototype._unsubscribe = function() {
                var connectable = this.connectable;
                if (connectable) {
                    this.connectable = null;
                    var refCount = connectable._refCount;
                    if (refCount <= 0) this.connection = null; else if (connectable._refCount = refCount - 1, 
                    refCount > 1) this.connection = null; else {
                        var connection = this.connection, sharedConnection = connectable._connection;
                        this.connection = null, !sharedConnection || connection && sharedConnection !== connection || sharedConnection.unsubscribe();
                    }
                } else this.connection = null;
            }, RefCountSubscriber;
        }(Subscriber_Subscriber), connectableProto = function(_super) {
            function ConnectableObservable(source, subjectFactory) {
                var _this = _super.call(this) || this;
                return _this.source = source, _this.subjectFactory = subjectFactory, _this._refCount = 0, 
                _this._isComplete = !1, _this;
            }
            return tslib_es6_extends(ConnectableObservable, _super), ConnectableObservable.prototype._subscribe = function(subscriber) {
                return this.getSubject().subscribe(subscriber);
            }, ConnectableObservable.prototype.getSubject = function() {
                var subject = this._subject;
                return subject && !subject.isStopped || (this._subject = this.subjectFactory()), 
                this._subject;
            }, ConnectableObservable.prototype.connect = function() {
                var connection = this._connection;
                return connection || (this._isComplete = !1, (connection = this._connection = new Subscription_Subscription()).add(this.source.subscribe(new ConnectableObservable_ConnectableSubscriber(this.getSubject(), this))), 
                connection.closed ? (this._connection = null, connection = Subscription_Subscription.EMPTY) : this._connection = connection), 
                connection;
            }, ConnectableObservable.prototype.refCount = function() {
                return refCount()(this);
            }, ConnectableObservable;
        }(Observable_Observable).prototype, connectableObservableDescriptor = {
            operator: {
                value: null
            },
            _refCount: {
                value: 0,
                writable: !0
            },
            _subject: {
                value: null,
                writable: !0
            },
            _connection: {
                value: null,
                writable: !0
            },
            _subscribe: {
                value: connectableProto._subscribe
            },
            _isComplete: {
                value: connectableProto._isComplete,
                writable: !0
            },
            getSubject: {
                value: connectableProto.getSubject
            },
            connect: {
                value: connectableProto.connect
            },
            refCount: {
                value: connectableProto.refCount
            }
        }, ConnectableObservable_ConnectableSubscriber = function(_super) {
            function ConnectableSubscriber(destination, connectable) {
                var _this = _super.call(this, destination) || this;
                return _this.connectable = connectable, _this;
            }
            return tslib_es6_extends(ConnectableSubscriber, _super), ConnectableSubscriber.prototype._error = function(err) {
                this._unsubscribe(), _super.prototype._error.call(this, err);
            }, ConnectableSubscriber.prototype._complete = function() {
                this.connectable._isComplete = !0, this._unsubscribe(), _super.prototype._complete.call(this);
            }, ConnectableSubscriber.prototype._unsubscribe = function() {
                var connectable = this.connectable;
                if (connectable) {
                    this.connectable = null;
                    var connection = connectable._connection;
                    connectable._refCount = 0, connectable._subject = null, connectable._connection = null, 
                    connection && connection.unsubscribe();
                }
            }, ConnectableSubscriber;
        }(Subject_SubjectSubscriber);
        function shareSubjectFactory() {
            return new Subject_Subject();
        }
        var PARAMETERS = "__parameters__";
        function makeParamDecorator(name, props, parentClass) {
            var metaCtor = function(props) {
                return function() {
                    for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                    if (props) {
                        var values = props.apply(void 0, __spread(args));
                        for (var propName in values) this[propName] = values[propName];
                    }
                };
            }(props);
            function ParamDecoratorFactory() {
                for (var _a, args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                if (this instanceof ParamDecoratorFactory) return metaCtor.apply(this, args), this;
                var annotationInstance = new ((_a = ParamDecoratorFactory).bind.apply(_a, __spread([ void 0 ], args)))();
                return ParamDecorator.annotation = annotationInstance, ParamDecorator;
                function ParamDecorator(cls, unusedKey, index) {
                    for (var parameters = cls.hasOwnProperty(PARAMETERS) ? cls[PARAMETERS] : Object.defineProperty(cls, PARAMETERS, {
                        value: []
                    })[PARAMETERS]; parameters.length <= index; ) parameters.push(null);
                    return (parameters[index] = parameters[index] || []).push(annotationInstance), cls;
                }
            }
            return parentClass && (ParamDecoratorFactory.prototype = Object.create(parentClass.prototype)), 
            ParamDecoratorFactory.prototype.ngMetadataName = name, ParamDecoratorFactory.annotationCls = ParamDecoratorFactory, 
            ParamDecoratorFactory;
        }
        var Inject = makeParamDecorator("Inject", function(token) {
            return {
                token: token
            };
        }), Optional = makeParamDecorator("Optional"), Self = makeParamDecorator("Self"), SkipSelf = makeParamDecorator("SkipSelf"), InjectFlags = function(InjectFlags) {
            return InjectFlags[InjectFlags.Default = 0] = "Default", InjectFlags[InjectFlags.Host = 1] = "Host", 
            InjectFlags[InjectFlags.Self = 2] = "Self", InjectFlags[InjectFlags.SkipSelf = 4] = "SkipSelf", 
            InjectFlags[InjectFlags.Optional = 8] = "Optional", InjectFlags;
        }({});
        function getClosureSafeProperty(objWithPropertyToExtract) {
            for (var key in objWithPropertyToExtract) if (objWithPropertyToExtract[key] === getClosureSafeProperty) return key;
            throw Error("Could not find renamed property on target object.");
        }
        function defineInjectable(opts) {
            return {
                providedIn: opts.providedIn || null,
                factory: opts.factory,
                value: void 0
            };
        }
        function defineInjector(options) {
            return {
                factory: options.factory,
                providers: options.providers || [],
                imports: options.imports || []
            };
        }
        function getInjectableDef(type) {
            return type && type.hasOwnProperty(NG_INJECTABLE_DEF) ? type[NG_INJECTABLE_DEF] : null;
        }
        function getInjectorDef(type) {
            return type && type.hasOwnProperty(NG_INJECTOR_DEF) ? type[NG_INJECTOR_DEF] : null;
        }
        var NG_INJECTABLE_DEF = getClosureSafeProperty({
            ngInjectableDef: getClosureSafeProperty
        }), NG_INJECTOR_DEF = getClosureSafeProperty({
            ngInjectorDef: getClosureSafeProperty
        });
        function stringify(token) {
            if ("string" == typeof token) return token;
            if (token instanceof Array) return "[" + token.map(stringify).join(", ") + "]";
            if (null == token) return "" + token;
            if (token.overriddenName) return "" + token.overriddenName;
            if (token.name) return "" + token.name;
            var res = token.toString();
            if (null == res) return "" + res;
            var newLineIndex = res.indexOf("\n");
            return -1 === newLineIndex ? res : res.substring(0, newLineIndex);
        }
        var __forward_ref__ = getClosureSafeProperty({
            __forward_ref__: getClosureSafeProperty
        });
        function forwardRef(forwardRefFn) {
            return forwardRefFn.__forward_ref__ = forwardRef, forwardRefFn.toString = function() {
                return stringify(this());
            }, forwardRefFn;
        }
        function resolveForwardRef(type) {
            var fn = type;
            return "function" == typeof fn && fn.hasOwnProperty(__forward_ref__) && fn.__forward_ref__ === forwardRef ? fn() : type;
        }
        function getGlobal() {
            var __globalThis = "undefined" != typeof globalThis && globalThis, __window = "undefined" != typeof window && window, __self = "undefined" != typeof self && "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self, __global = "undefined" != typeof global && global;
            return __globalThis || __global || __window || __self;
        }
        var _injectImplementation, _global = getGlobal(), _currentInjector = void 0;
        function setCurrentInjector(injector) {
            var former = _currentInjector;
            return _currentInjector = injector, former;
        }
        function setInjectImplementation(impl) {
            var previous = _injectImplementation;
            return _injectImplementation = impl, previous;
        }
        function inject(token, flags) {
            return void 0 === flags && (flags = InjectFlags.Default), (_injectImplementation || function(token, flags) {
                if (void 0 === flags && (flags = InjectFlags.Default), void 0 === _currentInjector) throw new Error("inject() must be called from an injection context");
                return null === _currentInjector ? injectRootLimpMode(token, void 0, flags) : _currentInjector.get(token, flags & InjectFlags.Optional ? null : void 0, flags);
            })(token, flags);
        }
        function injectRootLimpMode(token, notFoundValue, flags) {
            var injectableDef = getInjectableDef(token);
            if (injectableDef && "root" == injectableDef.providedIn) return void 0 === injectableDef.value ? injectableDef.value = injectableDef.factory() : injectableDef.value;
            if (flags & InjectFlags.Optional) return null;
            if (void 0 !== notFoundValue) return notFoundValue;
            throw new Error("Injector: NOT_FOUND [" + stringify(token) + "]");
        }
        function injectArgs(types) {
            for (var args = [], i = 0; i < types.length; i++) {
                var arg = types[i];
                if (Array.isArray(arg)) {
                    if (0 === arg.length) throw new Error("Arguments array must have arguments.");
                    for (var type = void 0, flags = InjectFlags.Default, j = 0; j < arg.length; j++) {
                        var meta = arg[j];
                        meta instanceof Optional || "Optional" === meta.ngMetadataName ? flags |= InjectFlags.Optional : meta instanceof SkipSelf || "SkipSelf" === meta.ngMetadataName ? flags |= InjectFlags.SkipSelf : meta instanceof Self || "Self" === meta.ngMetadataName ? flags |= InjectFlags.Self : type = meta instanceof Inject ? meta.token : meta;
                    }
                    args.push(inject(type, flags));
                } else args.push(inject(arg));
            }
            return args;
        }
        var InjectionToken = function() {
            function InjectionToken(_desc, options) {
                this._desc = _desc, this.ngMetadataName = "InjectionToken", this.ngInjectableDef = void 0, 
                "number" == typeof options ? this.__NG_ELEMENT_ID__ = options : void 0 !== options && (this.ngInjectableDef = defineInjectable({
                    providedIn: options.providedIn || "root",
                    factory: options.factory
                }));
            }
            return InjectionToken.prototype.toString = function() {
                return "InjectionToken " + this._desc;
            }, InjectionToken;
        }(), SOURCE = "__source", _THROW_IF_NOT_FOUND = new Object(), INJECTOR = new InjectionToken("INJECTOR", -1), NullInjector = function() {
            function NullInjector() {}
            return NullInjector.prototype.get = function(token, notFoundValue) {
                if (void 0 === notFoundValue && (notFoundValue = _THROW_IF_NOT_FOUND), notFoundValue === _THROW_IF_NOT_FOUND) {
                    var error = new Error("NullInjectorError: No provider for " + stringify(token) + "!");
                    throw error.name = "NullInjectorError", error;
                }
                return notFoundValue;
            }, NullInjector;
        }(), Injector = function() {
            function Injector() {}
            return Injector.create = function(options, parent) {
                return Array.isArray(options) ? new StaticInjector(options, parent) : new StaticInjector(options.providers, options.parent, options.name || null);
            }, Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND, Injector.NULL = new NullInjector(), 
            Injector.ngInjectableDef = defineInjectable({
                providedIn: "any",
                factory: function() {
                    return inject(INJECTOR);
                }
            }), Injector.__NG_ELEMENT_ID__ = -1, Injector;
        }(), IDENT = function(value) {
            return value;
        }, EMPTY = [], CIRCULAR = IDENT, MULTI_PROVIDER_FN = function() {
            return Array.prototype.slice.call(arguments);
        }, USE_VALUE$2 = getClosureSafeProperty({
            provide: String,
            useValue: getClosureSafeProperty
        }), NG_TOKEN_PATH = "ngTokenPath", NG_TEMP_TOKEN_PATH = "ngTempTokenPath", NULL_INJECTOR = Injector.NULL, NEW_LINE = /\n/gm, NO_NEW_LINE = "\u0275", StaticInjector = function() {
            function StaticInjector(providers, parent, source) {
                void 0 === parent && (parent = NULL_INJECTOR), void 0 === source && (source = null), 
                this.parent = parent, this.source = source;
                var records = this._records = new Map();
                records.set(Injector, {
                    token: Injector,
                    fn: IDENT,
                    deps: EMPTY,
                    value: this,
                    useNew: !1
                }), records.set(INJECTOR, {
                    token: INJECTOR,
                    fn: IDENT,
                    deps: EMPTY,
                    value: this,
                    useNew: !1
                }), function recursivelyProcessProviders(records, provider) {
                    if (provider) if ((provider = resolveForwardRef(provider)) instanceof Array) for (var i = 0; i < provider.length; i++) recursivelyProcessProviders(records, provider[i]); else {
                        if ("function" == typeof provider) throw staticError("Function/Class not supported", provider);
                        if (!provider || "object" != typeof provider || !provider.provide) throw staticError("Unexpected provider", provider);
                        var token = resolveForwardRef(provider.provide), resolvedProvider = function(provider) {
                            var deps = function(provider) {
                                var deps = EMPTY, providerDeps = provider.deps;
                                if (providerDeps && providerDeps.length) {
                                    deps = [];
                                    for (var i = 0; i < providerDeps.length; i++) {
                                        var options = 6;
                                        if ((token = resolveForwardRef(providerDeps[i])) instanceof Array) for (var j = 0, annotations = token; j < annotations.length; j++) {
                                            var annotation = annotations[j];
                                            annotation instanceof Optional || annotation == Optional ? options |= 1 : annotation instanceof SkipSelf || annotation == SkipSelf ? options &= -3 : annotation instanceof Self || annotation == Self ? options &= -5 : token = annotation instanceof Inject ? annotation.token : resolveForwardRef(annotation);
                                        }
                                        deps.push({
                                            token: token,
                                            options: options
                                        });
                                    }
                                } else if (provider.useExisting) {
                                    var token;
                                    deps = [ {
                                        token: token = resolveForwardRef(provider.useExisting),
                                        options: 6
                                    } ];
                                } else if (!(providerDeps || USE_VALUE$2 in provider)) throw staticError("'deps' required", provider);
                                return deps;
                            }(provider), fn = IDENT, value = EMPTY, useNew = !1, provide = resolveForwardRef(provider.provide);
                            if (USE_VALUE$2 in provider) value = provider.useValue; else if (provider.useFactory) fn = provider.useFactory; else if (provider.useExisting) ; else if (provider.useClass) useNew = !0, 
                            fn = resolveForwardRef(provider.useClass); else {
                                if ("function" != typeof provide) throw staticError("StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable", provider);
                                useNew = !0, fn = provide;
                            }
                            return {
                                deps: deps,
                                fn: fn,
                                useNew: useNew,
                                value: value
                            };
                        }(provider);
                        if (!0 === provider.multi) {
                            var multiProvider = records.get(token);
                            if (multiProvider) {
                                if (multiProvider.fn !== MULTI_PROVIDER_FN) throw multiProviderMixError(token);
                            } else records.set(token, multiProvider = {
                                token: provider.provide,
                                deps: [],
                                useNew: !1,
                                fn: MULTI_PROVIDER_FN,
                                value: EMPTY
                            });
                            multiProvider.deps.push({
                                token: token = provider,
                                options: 6
                            });
                        }
                        var record = records.get(token);
                        if (record && record.fn == MULTI_PROVIDER_FN) throw multiProviderMixError(token);
                        records.set(token, resolvedProvider);
                    }
                }(records, providers);
            }
            return StaticInjector.prototype.get = function(token, notFoundValue, flags) {
                void 0 === flags && (flags = InjectFlags.Default);
                var record = this._records.get(token);
                try {
                    return function tryResolveToken(token, record, records, parent, notFoundValue, flags) {
                        try {
                            return function(token, record, records, parent, notFoundValue, flags) {
                                var _a, value;
                                if (!record || flags & InjectFlags.SkipSelf) flags & InjectFlags.Self || (value = parent.get(token, notFoundValue, InjectFlags.Default)); else {
                                    if ((value = record.value) == CIRCULAR) throw Error(NO_NEW_LINE + "Circular dependency");
                                    if (value === EMPTY) {
                                        record.value = CIRCULAR;
                                        var useNew = record.useNew, fn = record.fn, depRecords = record.deps, deps = EMPTY;
                                        if (depRecords.length) {
                                            deps = [];
                                            for (var i = 0; i < depRecords.length; i++) {
                                                var depRecord = depRecords[i], options = depRecord.options, childRecord = 2 & options ? records.get(depRecord.token) : void 0;
                                                deps.push(tryResolveToken(depRecord.token, childRecord, records, childRecord || 4 & options ? parent : NULL_INJECTOR, 1 & options ? null : Injector.THROW_IF_NOT_FOUND, InjectFlags.Default));
                                            }
                                        }
                                        record.value = value = useNew ? new ((_a = fn).bind.apply(_a, __spread([ void 0 ], deps)))() : fn.apply(void 0, deps);
                                    }
                                }
                                return value;
                            }(token, record, records, parent, notFoundValue, flags);
                        } catch (e) {
                            throw e instanceof Error || (e = new Error(e)), (e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || []).unshift(token), 
                            record && record.value == CIRCULAR && (record.value = EMPTY), e;
                        }
                    }(token, record, this._records, this.parent, notFoundValue, flags);
                } catch (e) {
                    return catchInjectorError(e, token, "StaticInjectorError", this.source);
                }
            }, StaticInjector.prototype.toString = function() {
                var tokens = [];
                return this._records.forEach(function(v, token) {
                    return tokens.push(stringify(token));
                }), "StaticInjector[" + tokens.join(", ") + "]";
            }, StaticInjector;
        }();
        function multiProviderMixError(token) {
            return staticError("Cannot mix multi providers and regular providers", token);
        }
        function catchInjectorError(e, token, injectorErrorName, source) {
            var tokenPath = e[NG_TEMP_TOKEN_PATH];
            throw token[SOURCE] && tokenPath.unshift(token[SOURCE]), e.message = formatError("\n" + e.message, tokenPath, injectorErrorName, source), 
            e[NG_TOKEN_PATH] = tokenPath, e[NG_TEMP_TOKEN_PATH] = null, e;
        }
        function formatError(text, obj, injectorErrorName, source) {
            void 0 === source && (source = null), text = text && "\n" === text.charAt(0) && text.charAt(1) == NO_NEW_LINE ? text.substr(2) : text;
            var context = stringify(obj);
            if (obj instanceof Array) context = obj.map(stringify).join(" -> "); else if ("object" == typeof obj) {
                var parts = [];
                for (var key in obj) if (obj.hasOwnProperty(key)) {
                    var value = obj[key];
                    parts.push(key + ":" + ("string" == typeof value ? JSON.stringify(value) : stringify(value)));
                }
                context = "{" + parts.join(", ") + "}";
            }
            return injectorErrorName + (source ? "(" + source + ")" : "") + "[" + context + "]: " + text.replace(NEW_LINE, "\n  ");
        }
        function staticError(text, obj) {
            return new Error(formatError(text, obj, "StaticInjectorError"));
        }
        var ERROR_DEBUG_CONTEXT = "ngDebugContext", ERROR_ORIGINAL_ERROR = "ngOriginalError", ChangeDetectionStrategy = function(ChangeDetectionStrategy) {
            return ChangeDetectionStrategy[ChangeDetectionStrategy.OnPush = 0] = "OnPush", ChangeDetectionStrategy[ChangeDetectionStrategy.Default = 1] = "Default", 
            ChangeDetectionStrategy;
        }({}), NG_COMPONENT_DEF = getClosureSafeProperty({
            ngComponentDef: getClosureSafeProperty
        }), NG_DIRECTIVE_DEF = getClosureSafeProperty({
            ngDirectiveDef: getClosureSafeProperty
        }), NG_PIPE_DEF = getClosureSafeProperty({
            ngPipeDef: getClosureSafeProperty
        }), NG_MODULE_DEF = getClosureSafeProperty({
            ngModuleDef: getClosureSafeProperty
        }), NG_ELEMENT_ID = getClosureSafeProperty({
            __NG_ELEMENT_ID__: getClosureSafeProperty
        }), componentResourceResolutionQueue = new Map(), componentDefPendingResolution = new Set();
        function unwrapResponse(response) {
            return "string" == typeof response ? response : response.text();
        }
        var ViewEncapsulation = function(ViewEncapsulation) {
            return ViewEncapsulation[ViewEncapsulation.Emulated = 0] = "Emulated", ViewEncapsulation[ViewEncapsulation.Native = 1] = "Native", 
            ViewEncapsulation[ViewEncapsulation.None = 2] = "None", ViewEncapsulation[ViewEncapsulation.ShadowDom = 3] = "ShadowDom", 
            ViewEncapsulation;
        }({}), EMPTY_OBJ = {}, EMPTY_ARRAY$1 = [];
        function renderStringify(value) {
            return "function" == typeof value ? value.name || value : "string" == typeof value ? value : null == value ? "" : "object" == typeof value && "function" == typeof value.type ? value.type.name || value.type : "" + value;
        }
        var defaultScheduler = ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(_global), INTERPOLATION_DELIMITER = "\ufffd";
        function isPropMetadataString(str) {
            return str.indexOf(INTERPOLATION_DELIMITER) >= 0;
        }
        function maybeUnwrapFn(value) {
            return value instanceof Function ? value() : value;
        }
        var _renderCompCount = 0;
        function extractDirectiveDef(type) {
            return getComponentDef(type) || function(type) {
                return type[NG_DIRECTIVE_DEF] || null;
            }(type);
        }
        function extractPipeDef(type) {
            return function(type) {
                return type[NG_PIPE_DEF] || null;
            }(type);
        }
        function defineNgModule(def) {
            return {
                type: def.type,
                bootstrap: def.bootstrap || EMPTY_ARRAY$1,
                declarations: def.declarations || EMPTY_ARRAY$1,
                imports: def.imports || EMPTY_ARRAY$1,
                exports: def.exports || EMPTY_ARRAY$1,
                transitiveCompileScopes: null,
                schemas: def.schemas || null
            };
        }
        function invertObject(obj, secondary) {
            if (null == obj) return EMPTY_OBJ;
            var newLookup = {};
            for (var minifiedKey in obj) if (obj.hasOwnProperty(minifiedKey)) {
                var publicName = obj[minifiedKey], declaredName = publicName;
                Array.isArray(publicName) && (declaredName = publicName[1], publicName = publicName[0]), 
                newLookup[publicName] = minifiedKey, secondary && (secondary[publicName] = declaredName);
            }
            return newLookup;
        }
        function getComponentDef(type) {
            return type[NG_COMPONENT_DEF] || null;
        }
        function getNgModuleDef(type, throwNotFound) {
            var ngModuleDef = type[NG_MODULE_DEF] || null;
            if (!ngModuleDef && !0 === throwNotFound) throw new Error("Type " + stringify(type) + " does not have 'ngModuleDef' property.");
            return ngModuleDef;
        }
        var HOST = 0, TVIEW = 1, FLAGS = 2, PARENT = 3, NEXT = 4, QUERIES = 5, T_HOST = 6, BINDING_INDEX = 7, CLEANUP = 8, CONTEXT = 9, INJECTOR$1 = 10, RENDERER_FACTORY = 11, RENDERER = 12, SANITIZER = 13, CHILD_HEAD = 14, DECLARATION_VIEW = 17, PREORDER_HOOK_FLAGS = 18, HEADER_OFFSET = 20, TYPE = 1, ACTIVE_INDEX = 2, NATIVE = 7, VIEWS = 8, MONKEY_PATCH_KEY_NAME = "__ngContext__";
        function unwrapRNode(value) {
            for (;Array.isArray(value); ) value = value[HOST];
            return value;
        }
        function isLView(value) {
            return Array.isArray(value) && "object" == typeof value[TYPE];
        }
        function isLContainer(value) {
            return Array.isArray(value) && !0 === value[TYPE];
        }
        function getNativeByTNode(tNode, hostView) {
            return unwrapRNode(hostView[tNode.index]);
        }
        function getTNode(index, view) {
            return view[TVIEW].data[index + HEADER_OFFSET];
        }
        function getComponentViewByIndex(nodeIndex, hostView) {
            var slotValue = hostView[nodeIndex];
            return isLView(slotValue) ? slotValue : slotValue[HOST];
        }
        function isComponent(tNode) {
            return 1 == (1 & tNode.flags);
        }
        function isComponentDef(def) {
            return null !== def.template;
        }
        function isRootView(target) {
            return 0 != (512 & target[FLAGS]);
        }
        function readPatchedData(target) {
            return target[MONKEY_PATCH_KEY_NAME];
        }
        function readPatchedLView(target) {
            var value = readPatchedData(target);
            return value ? Array.isArray(value) ? value : value.lView : null;
        }
        function resetPreOrderHookFlags(lView) {
            lView[PREORDER_HOOK_FLAGS] = 0;
        }
        var previousOrParentTNode, isParent, core_lView, TNODE = 8, PARENT_INJECTOR = 8, INJECTOR_BLOOM_PARENT_SIZE = 9, NO_PARENT_INJECTOR = -1, NodeInjectorFactory = function() {
            return function(factory, isViewProvider, injectImplementation) {
                this.factory = factory, this.resolving = !1, this.canSeeViewProviders = isViewProvider, 
                this.injectImpl = injectImplementation;
            };
        }(), FactoryPrototype = NodeInjectorFactory.prototype;
        function executeHooks(currentView, firstPassHooks, checkHooks, checkNoChangesMode, initPhaseState, currentNodeIndex) {
            if (!checkNoChangesMode) {
                var hooksToCall = (3 & currentView[FLAGS]) === initPhaseState ? firstPassHooks : checkHooks;
                hooksToCall && function(currentView, arr, initPhase, currentNodeIndex) {
                    for (var nodeIndexLimit = null != currentNodeIndex ? currentNodeIndex : -1, lastNodeIndexFound = 0, i = void 0 !== currentNodeIndex ? 65535 & currentView[PREORDER_HOOK_FLAGS] : 0; i < arr.length; i++) if ("number" == typeof arr[i + 1]) {
                        if (lastNodeIndexFound = arr[i], null != currentNodeIndex && lastNodeIndexFound >= currentNodeIndex) break;
                    } else arr[i] < 0 && (currentView[PREORDER_HOOK_FLAGS] += 65536), (lastNodeIndexFound < nodeIndexLimit || -1 == nodeIndexLimit) && (callHook(currentView, initPhase, arr, i), 
                    currentView[PREORDER_HOOK_FLAGS] = (4294901760 & currentView[PREORDER_HOOK_FLAGS]) + i + 2), 
                    i++;
                }(currentView, hooksToCall, initPhaseState, currentNodeIndex), null == currentNodeIndex && (3 & currentView[FLAGS]) === initPhaseState && 3 !== initPhaseState && (currentView[FLAGS] &= 1023, 
                currentView[FLAGS] += 1);
            }
        }
        function callHook(currentView, initPhase, arr, i) {
            var isInitHook = arr[i] < 0, hook = arr[i + 1], directive = currentView[isInitHook ? -arr[i] : arr[i]];
            isInitHook ? currentView[FLAGS] >> 10 < currentView[PREORDER_HOOK_FLAGS] >> 16 && (3 & currentView[FLAGS]) === initPhase && (currentView[FLAGS] += 1024, 
            hook.call(directive)) : hook.call(directive);
        }
        function getLView() {
            return core_lView;
        }
        function setActiveHost(host, index) {
            void 0 === index && (index = null);
        }
        function getPreviousOrParentTNode() {
            return previousOrParentTNode;
        }
        function setPreviousOrParentTNode(tNode) {
            previousOrParentTNode = tNode;
        }
        function setTNodeAndViewData(tNode, view) {
            previousOrParentTNode = tNode, core_lView = view;
        }
        function getIsParent() {
            return isParent;
        }
        function setIsParent(value) {
            isParent = value;
        }
        function isCreationMode(view) {
            return void 0 === view && (view = core_lView), 4 == (4 & view[FLAGS]);
        }
        var checkNoChangesMode = !1;
        function getCheckNoChangesMode() {
            return checkNoChangesMode;
        }
        function setCheckNoChangesMode(mode) {
            checkNoChangesMode = mode;
        }
        function enterView(newView, hostTNode) {
            var oldView = core_lView;
            return previousOrParentTNode = hostTNode, isParent = !0, core_lView = newView, oldView;
        }
        function leaveView(newView) {
            var tView = core_lView[TVIEW];
            if (isCreationMode(core_lView)) core_lView[FLAGS] &= -5; else try {
                resetPreOrderHookFlags(core_lView), executeHooks(core_lView, tView.viewHooks, tView.viewCheckHooks, checkNoChangesMode, 2, void 0);
            } finally {
                core_lView[FLAGS] &= -73, core_lView[BINDING_INDEX] = tView.bindingStartIndex;
            }
            enterView(newView, null);
        }
        var _currentNamespace = null;
        function namespaceHTML() {
            _currentNamespace = null;
        }
        var RendererStyleFlags3 = function(RendererStyleFlags3) {
            return RendererStyleFlags3[RendererStyleFlags3.Important = 1] = "Important", RendererStyleFlags3[RendererStyleFlags3.DashCase = 2] = "DashCase", 
            RendererStyleFlags3;
        }({});
        function isProceduralRenderer(renderer) {
            return !!renderer.listen;
        }
        var domRendererFactory3 = {
            createRenderer: function(hostElement, rendererType) {
                return document;
            }
        };
        function createLContext(lView, nodeIndex, native) {
            return {
                lView: lView,
                nodeIndex: nodeIndex,
                native: native,
                component: void 0,
                directives: void 0,
                localRefs: void 0
            };
        }
        function attachPatchData(target, data) {
            target[MONKEY_PATCH_KEY_NAME] = data;
        }
        function findViaNativeElement(lView, target) {
            for (var tNode = lView[TVIEW].firstChild; tNode; ) {
                if (getNativeByTNode(tNode, lView) === target) return tNode.index;
                tNode = traverseNextElement(tNode);
            }
            return -1;
        }
        function traverseNextElement(tNode) {
            if (tNode.child) return tNode.child;
            if (tNode.next) return tNode.next;
            for (;tNode.parent && !tNode.parent.next; ) tNode = tNode.parent;
            return tNode.parent && tNode.parent.next;
        }
        function getStylingContext(index, viewData) {
            for (var storageIndex = index, slotValue = viewData[storageIndex], wrapper = viewData; Array.isArray(slotValue); ) wrapper = slotValue, 
            slotValue = slotValue[HOST];
            if (value = wrapper, Array.isArray(value) && "number" == typeof value[TYPE]) return wrapper;
            var value, context, stylingTemplate = getTNode(index - HEADER_OFFSET, viewData).stylingTemplate;
            return wrapper !== viewData && (storageIndex = HOST), wrapper[storageIndex] = stylingTemplate ? function(element, templateStyleContext) {
                for (var context = templateStyleContext.slice(), i = 0; i < 9; i++) {
                    var value = templateStyleContext[i];
                    Array.isArray(value) && (context[i] = value.slice());
                }
                return context[0] = element, context[1] |= 16, context;
            }(slotValue, stylingTemplate) : (function(context, directiveRef) {
                var dirs = context[2], i = dirs.length;
                dirs.push(null, null, null, null), dirs[i + 0] = null, dirs[i + 2] = !1, dirs[i + 3] = null, 
                dirs[i + 1] = -1;
            }(context = [ slotValue || null, 0, [], [ null, null ], [ null, null ], [ 0, 0 ], [ 0 ], [ 0 ], null ]), 
            context);
        }
        function getParentInjectorIndex(parentLocation) {
            return 32767 & parentLocation;
        }
        function getParentInjectorView(location, startView) {
            for (var viewOffset = location >> 16, parentView = startView; viewOffset > 0; ) parentView = parentView[DECLARATION_VIEW], 
            viewOffset--;
            return parentView;
        }
        function getLViewParent(lView) {
            var parent = lView[PARENT];
            return isLContainer(parent) ? parent[PARENT] : parent;
        }
        function findComponentView(lView) {
            for (var rootTNode = lView[T_HOST]; rootTNode && 2 === rootTNode.type; ) rootTNode = (lView = lView[DECLARATION_VIEW])[T_HOST];
            return lView;
        }
        var includeViewProviders = !0;
        function setIncludeViewProviders(v) {
            var oldValue = includeViewProviders;
            return includeViewProviders = v, oldValue;
        }
        var BLOOM_MASK = 255, nextNgElementId = 0;
        function insertBloom(arr, footer) {
            arr.push(0, 0, 0, 0, 0, 0, 0, 0, footer);
        }
        function getInjectorIndex(tNode, hostView) {
            return -1 === tNode.injectorIndex || tNode.parent && tNode.parent.injectorIndex === tNode.injectorIndex || null == hostView[tNode.injectorIndex + PARENT_INJECTOR] ? -1 : tNode.injectorIndex;
        }
        function getParentInjectorLocation(tNode, view) {
            if (tNode.parent && -1 !== tNode.parent.injectorIndex) return tNode.parent.injectorIndex;
            for (var hostTNode = view[T_HOST], viewOffset = 1; hostTNode && -1 === hostTNode.injectorIndex; ) hostTNode = (view = view[DECLARATION_VIEW]) ? view[T_HOST] : null, 
            viewOffset++;
            return hostTNode ? hostTNode.injectorIndex | viewOffset << 16 : -1;
        }
        function getOrCreateInjectable(tNode, lView, token, flags, notFoundValue) {
            if (void 0 === flags && (flags = InjectFlags.Default), tNode) {
                var bloomHash = function(token) {
                    if ("string" == typeof token) return token.charCodeAt(0) || 0;
                    var tokenId = token[NG_ELEMENT_ID];
                    return "number" == typeof tokenId && tokenId > 0 ? tokenId & BLOOM_MASK : tokenId;
                }(token);
                if ("function" == typeof bloomHash) {
                    var savePreviousOrParentTNode = getPreviousOrParentTNode(), saveLView = getLView();
                    setTNodeAndViewData(tNode, lView);
                    try {
                        var value = bloomHash();
                        if (null != value || flags & InjectFlags.Optional) return value;
                        throw new Error("No provider for " + renderStringify(token) + "!");
                    } finally {
                        setTNodeAndViewData(savePreviousOrParentTNode, saveLView);
                    }
                } else if ("number" == typeof bloomHash) {
                    if (-1 === bloomHash) return new NodeInjector(tNode, lView);
                    var previousTView = null, injectorIndex = getInjectorIndex(tNode, lView), parentLocation = NO_PARENT_INJECTOR, hostTElementNode = flags & InjectFlags.Host ? findComponentView(lView)[T_HOST] : null;
                    for ((-1 === injectorIndex || flags & InjectFlags.SkipSelf) && (parentLocation = -1 === injectorIndex ? getParentInjectorLocation(tNode, lView) : lView[injectorIndex + PARENT_INJECTOR], 
                    shouldSearchParent(flags, !1) ? (previousTView = lView[TVIEW], injectorIndex = getParentInjectorIndex(parentLocation), 
                    lView = getParentInjectorView(parentLocation, lView)) : injectorIndex = -1); -1 !== injectorIndex; ) {
                        parentLocation = lView[injectorIndex + PARENT_INJECTOR];
                        var tView = lView[TVIEW];
                        if (bloomHasToken(bloomHash, injectorIndex, tView.data)) {
                            var instance = searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode);
                            if (instance !== NOT_FOUND) return instance;
                        }
                        shouldSearchParent(flags, lView[TVIEW].data[injectorIndex + TNODE] === hostTElementNode) && bloomHasToken(bloomHash, injectorIndex, lView) ? (previousTView = tView, 
                        injectorIndex = getParentInjectorIndex(parentLocation), lView = getParentInjectorView(parentLocation, lView)) : injectorIndex = -1;
                    }
                }
            }
            if (flags & InjectFlags.Optional && void 0 === notFoundValue && (notFoundValue = null), 
            0 == (flags & (InjectFlags.Self | InjectFlags.Host))) {
                var moduleInjector = lView[INJECTOR$1], previousInjectImplementation = setInjectImplementation(void 0);
                try {
                    return moduleInjector ? moduleInjector.get(token, notFoundValue, flags & InjectFlags.Optional) : injectRootLimpMode(token, notFoundValue, flags & InjectFlags.Optional);
                } finally {
                    setInjectImplementation(previousInjectImplementation);
                }
            }
            if (flags & InjectFlags.Optional) return notFoundValue;
            throw new Error("NodeInjector: NOT_FOUND [" + renderStringify(token) + "]");
        }
        var NOT_FOUND = {};
        function searchTokensOnInjector(injectorIndex, lView, token, previousTView, flags, hostTElementNode) {
            var currentTView = lView[TVIEW], tNode = currentTView.data[injectorIndex + TNODE], injectableIdx = function(tNode, lView, token, canAccessViewProviders, isHostSpecialCase) {
                for (var nodeProviderIndexes = tNode.providerIndexes, tInjectables = lView[TVIEW].data, injectablesStart = 65535 & nodeProviderIndexes, directivesStart = tNode.directiveStart, cptViewProvidersCount = nodeProviderIndexes >> 16, endIndex = isHostSpecialCase ? injectablesStart + cptViewProvidersCount : tNode.directiveEnd, i = canAccessViewProviders ? injectablesStart : injectablesStart + cptViewProvidersCount; i < endIndex; i++) {
                    var providerTokenOrDef = tInjectables[i];
                    if (i < directivesStart && token === providerTokenOrDef || i >= directivesStart && providerTokenOrDef.type === token) return i;
                }
                if (isHostSpecialCase) {
                    var dirDef = tInjectables[directivesStart];
                    if (dirDef && isComponentDef(dirDef) && dirDef.type === token) return directivesStart;
                }
                return null;
            }(tNode, lView, token, null == previousTView ? isComponent(tNode) && includeViewProviders : previousTView != currentTView && 3 === tNode.type, flags & InjectFlags.Host && hostTElementNode === tNode);
            return null !== injectableIdx ? getNodeInjectable(currentTView.data, lView, injectableIdx, tNode) : NOT_FOUND;
        }
        function getNodeInjectable(tData, lData, index, tNode) {
            var obj, value = lData[index];
            if (null !== (obj = value) && "object" == typeof obj && Object.getPrototypeOf(obj) == FactoryPrototype) {
                var factory = value;
                if (factory.resolving) throw new Error("Circular dep for " + renderStringify(tData[index]));
                var previousIncludeViewProviders = setIncludeViewProviders(factory.canSeeViewProviders);
                factory.resolving = !0;
                var previousInjectImplementation = void 0;
                factory.injectImpl && (previousInjectImplementation = setInjectImplementation(factory.injectImpl));
                var savePreviousOrParentTNode = getPreviousOrParentTNode(), saveLView = getLView();
                setTNodeAndViewData(tNode, lData);
                try {
                    value = lData[index] = factory.factory(null, tData, lData, tNode);
                } finally {
                    factory.injectImpl && setInjectImplementation(previousInjectImplementation), setIncludeViewProviders(previousIncludeViewProviders), 
                    factory.resolving = !1, setTNodeAndViewData(savePreviousOrParentTNode, saveLView);
                }
            }
            return value;
        }
        function bloomHasToken(bloomHash, injectorIndex, injectorView) {
            var b6 = 64 & bloomHash, b5 = 32 & bloomHash;
            return !!((128 & bloomHash ? b6 ? b5 ? injectorView[injectorIndex + 7] : injectorView[injectorIndex + 6] : b5 ? injectorView[injectorIndex + 5] : injectorView[injectorIndex + 4] : b6 ? b5 ? injectorView[injectorIndex + 3] : injectorView[injectorIndex + 2] : b5 ? injectorView[injectorIndex + 1] : injectorView[injectorIndex]) & 1 << bloomHash);
        }
        function shouldSearchParent(flags, isFirstHostTNode) {
            return !(flags & InjectFlags.Self || flags & InjectFlags.Host && isFirstHostTNode);
        }
        var NodeInjector = function() {
            function NodeInjector(_tNode, _lView) {
                this._tNode = _tNode, this._lView = _lView;
            }
            return NodeInjector.prototype.get = function(token, notFoundValue) {
                return getOrCreateInjectable(this._tNode, this._lView, token, void 0, notFoundValue);
            }, NodeInjector;
        }();
        function getDebugContext(error) {
            return error[ERROR_DEBUG_CONTEXT];
        }
        function getOriginalError(error) {
            return error[ERROR_ORIGINAL_ERROR];
        }
        function defaultErrorLogger(console) {
            for (var values = [], _i = 1; _i < arguments.length; _i++) values[_i - 1] = arguments[_i];
            console.error.apply(console, __spread(values));
        }
        var ErrorHandler = function() {
            function ErrorHandler() {
                this._console = console;
            }
            return ErrorHandler.prototype.handleError = function(error) {
                var originalError = this._findOriginalError(error), context = this._findContext(error), errorLogger = function(error) {
                    return error.ngErrorLogger || defaultErrorLogger;
                }(error);
                errorLogger(this._console, "ERROR", error), originalError && errorLogger(this._console, "ORIGINAL ERROR", originalError), 
                context && errorLogger(this._console, "ERROR CONTEXT", context);
            }, ErrorHandler.prototype._findContext = function(error) {
                return error ? getDebugContext(error) ? getDebugContext(error) : this._findContext(getOriginalError(error)) : null;
            }, ErrorHandler.prototype._findOriginalError = function(error) {
                for (var e = getOriginalError(error); e && getOriginalError(e); ) e = getOriginalError(e);
                return e;
            }, ErrorHandler;
        }(), NO_CHANGE = {};
        function setStyle(native, prop, value, renderer, sanitizer, store, playerBuilder) {
            value = sanitizer && value ? sanitizer(prop, value) : value, store || playerBuilder ? (store && store.setValue(prop, value), 
            playerBuilder && playerBuilder.setValue(prop, value)) : value ? (value = value.toString(), 
            isProceduralRenderer(renderer) ? renderer.setStyle(native, prop, value, RendererStyleFlags3.DashCase) : native.style.setProperty(prop, value)) : isProceduralRenderer(renderer) ? renderer.removeStyle(native, prop, RendererStyleFlags3.DashCase) : native.style.removeProperty(prop);
        }
        function setClass(native, className, add, renderer, store, playerBuilder) {
            store || playerBuilder ? (store && store.setValue(className, add), playerBuilder && playerBuilder.setValue(className, add)) : "" !== className && (add ? isProceduralRenderer(renderer) ? renderer.addClass(native, className) : native.classList.add(className) : isProceduralRenderer(renderer) ? renderer.removeClass(native, className) : native.classList.remove(className));
        }
        function isClassBasedValue(context, index) {
            return 2 == (2 & context[index >= 9 ? index + 0 : index]);
        }
        function getValue(context, index) {
            return context[index + 2];
        }
        function getProp(context, index) {
            return context[index + 1];
        }
        function refreshDescendantViews(lView) {
            var tView = lView[TVIEW], creationMode = isCreationMode(lView);
            if (tView.firstTemplatePass = !1, lView[BINDING_INDEX] = tView.bindingStartIndex, 
            !creationMode) {
                var checkNoChangesMode = getCheckNoChangesMode();
                (function(currentView, tView, checkNoChangesMode, currentNodeIndex) {
                    checkNoChangesMode || executeHooks(lView, tView.preOrderHooks, tView.preOrderCheckHooks, checkNoChangesMode, 0, null);
                })(0, tView, checkNoChangesMode), function(lView) {
                    for (var current = lView[CHILD_HEAD]; null !== current; current = current[NEXT]) if (current.length < HEADER_OFFSET && -1 === current[ACTIVE_INDEX]) for (var container = current, i = 0; i < container[VIEWS].length; i++) {
                        var dynamicViewData = container[VIEWS][i];
                        renderEmbeddedTemplate(dynamicViewData, dynamicViewData[TVIEW], dynamicViewData[CONTEXT]);
                    }
                }(lView), refreshContentQueries(tView, lView), resetPreOrderHookFlags(lView), executeHooks(lView, tView.contentHooks, tView.contentCheckHooks, checkNoChangesMode, 1, void 0), 
                function(tView, viewData) {
                    if (tView.expandoInstructions) for (var bindingRootIndex = viewData[BINDING_INDEX] = tView.expandoStartIndex, currentDirectiveIndex = -1, currentElementIndex = -1, i = 0; i < tView.expandoInstructions.length; i++) {
                        var instruction = tView.expandoInstructions[i];
                        if ("number" == typeof instruction) if (instruction <= 0) {
                            currentElementIndex = -instruction;
                            var providerCount = tView.expandoInstructions[++i];
                            currentDirectiveIndex = bindingRootIndex += INJECTOR_BLOOM_PARENT_SIZE + providerCount;
                        } else bindingRootIndex += instruction; else {
                            if (null !== instruction) {
                                viewData[BINDING_INDEX] = bindingRootIndex;
                                var hostCtx = unwrapRNode(viewData[currentDirectiveIndex]);
                                setActiveHost(0, currentElementIndex), instruction(2, hostCtx, currentElementIndex), 
                                setActiveHost();
                            }
                            currentDirectiveIndex++;
                        }
                    }
                }(tView, lView);
            }
            creationMode && tView.staticContentQueries && refreshContentQueries(tView, lView), 
            function(components) {
                if (null != components) for (var i = 0; i < components.length; i++) void 0, void 0, 
                128 == (128 & (hostView = getComponentViewByIndex(components[i], getLView()))[FLAGS]) && 80 & hostView[FLAGS] && (function(componentView) {
                    for (var componentTView = componentView[TVIEW], i = componentView.length; i < componentTView.blueprint.length; i++) componentView[i] = componentTView.blueprint[i];
                }(hostView), checkView(hostView, hostView[CONTEXT]));
                var hostView;
            }(tView.components);
        }
        function refreshContentQueries(tView, lView) {
            if (null != tView.contentQueries) for (var i = 0; i < tView.contentQueries.length; i++) {
                var directiveDefIdx = tView.contentQueries[i];
                tView.data[directiveDefIdx].contentQueries(2, lView[directiveDefIdx], directiveDefIdx);
            }
        }
        function createLView(parentLView, tView, context, flags, host, tHostNode, rendererFactory, renderer, sanitizer, injector) {
            var lView = tView.blueprint.slice();
            return lView[HOST] = host, lView[FLAGS] = 140 | flags, resetPreOrderHookFlags(lView), 
            lView[PARENT] = lView[DECLARATION_VIEW] = parentLView, lView[CONTEXT] = context, 
            lView[RENDERER_FACTORY] = rendererFactory || parentLView && parentLView[RENDERER_FACTORY], 
            lView[RENDERER] = renderer || parentLView && parentLView[RENDERER], lView[SANITIZER] = sanitizer || parentLView && parentLView[SANITIZER] || null, 
            lView[INJECTOR$1] = injector || parentLView && parentLView[INJECTOR$1] || null, 
            lView[T_HOST] = tHostNode, lView;
        }
        function createNodeAtIndex(index, type, native, name, attrs) {
            var lView = getLView(), tView = lView[TVIEW], adjustedIndex = index + HEADER_OFFSET;
            lView[adjustedIndex] = native;
            var previousOrParentTNode = getPreviousOrParentTNode(), isParent = getIsParent(), tNode = tView.data[adjustedIndex];
            if (null == tNode) {
                var parent_1 = isParent ? previousOrParentTNode : previousOrParentTNode && previousOrParentTNode.parent;
                tNode = tView.data[adjustedIndex] = createTNode(parent_1 && parent_1 !== lView[T_HOST] ? parent_1 : null, type, adjustedIndex, name, attrs);
            }
            return previousOrParentTNode && (!isParent || null != previousOrParentTNode.child || null === tNode.parent && 2 !== previousOrParentTNode.type ? isParent || (previousOrParentTNode.next = tNode) : previousOrParentTNode.child = tNode), 
            null == tView.firstChild && (tView.firstChild = tNode), setPreviousOrParentTNode(tNode), 
            setIsParent(!0), tNode;
        }
        function renderEmbeddedTemplate(viewToRender, tView, context) {
            var oldView, _isParent = getIsParent(), _previousOrParentTNode = getPreviousOrParentTNode();
            if (512 & viewToRender[FLAGS]) tickRootContext(function(componentOrLView) {
                for (var lView = isLView(componentOrLView) ? componentOrLView : readPatchedLView(componentOrLView); lView && !(512 & lView[FLAGS]); ) lView = getLViewParent(lView);
                return lView;
            }(viewToRender)[CONTEXT]); else try {
                setIsParent(!0), setPreviousOrParentTNode(null), oldView = enterView(viewToRender, viewToRender[T_HOST]), 
                resetPreOrderHookFlags(viewToRender), namespaceHTML(), tView.template(getRenderFlags(viewToRender), context), 
                viewToRender[TVIEW].firstTemplatePass = !1, refreshDescendantViews(viewToRender);
            } finally {
                leaveView(oldView), setIsParent(_isParent), setPreviousOrParentTNode(_previousOrParentTNode);
            }
        }
        function renderComponentOrTemplate(hostView, context, templateFn) {
            var rendererFactory = hostView[RENDERER_FACTORY], oldView = enterView(hostView, hostView[T_HOST]), normalExecutionPath = !getCheckNoChangesMode(), creationModeIsActive = isCreationMode(hostView);
            try {
                normalExecutionPath && !creationModeIsActive && rendererFactory.begin && rendererFactory.begin(), 
                creationModeIsActive && (templateFn && (namespaceHTML(), templateFn(1, context)), 
                refreshDescendantViews(hostView), hostView[FLAGS] &= -5), resetPreOrderHookFlags(hostView), 
                templateFn && templateFn(2, context), refreshDescendantViews(hostView);
            } finally {
                normalExecutionPath && !creationModeIsActive && rendererFactory.end && rendererFactory.end(), 
                leaveView(oldView);
            }
        }
        function getRenderFlags(view) {
            return isCreationMode(view) ? 1 : 2;
        }
        function createTView(viewIndex, templateFn, consts, vars, directives, pipes, viewQuery, schemas) {
            var bindingStartIndex = HEADER_OFFSET + consts, initialViewLength = bindingStartIndex + vars, blueprint = function(bindingStartIndex, initialViewLength) {
                var blueprint = new Array(initialViewLength).fill(null, 0, bindingStartIndex).fill(NO_CHANGE, bindingStartIndex);
                return blueprint[BINDING_INDEX] = bindingStartIndex, blueprint;
            }(bindingStartIndex, initialViewLength);
            return blueprint[TVIEW] = {
                id: viewIndex,
                blueprint: blueprint,
                template: templateFn,
                viewQuery: viewQuery,
                node: null,
                data: blueprint.slice().fill(null, bindingStartIndex),
                bindingStartIndex: bindingStartIndex,
                viewQueryStartIndex: initialViewLength,
                expandoStartIndex: initialViewLength,
                expandoInstructions: null,
                firstTemplatePass: !0,
                staticViewQueries: !1,
                staticContentQueries: !1,
                preOrderHooks: null,
                preOrderCheckHooks: null,
                contentHooks: null,
                contentCheckHooks: null,
                viewHooks: null,
                viewCheckHooks: null,
                destroyHooks: null,
                cleanup: null,
                contentQueries: null,
                components: null,
                directiveRegistry: "function" == typeof directives ? directives() : directives,
                pipeRegistry: "function" == typeof pipes ? pipes() : pipes,
                firstChild: null,
                schemas: schemas
            };
        }
        function createTNode(tParent, type, adjustedIndex, tagName, attrs) {
            return {
                type: type,
                index: adjustedIndex,
                injectorIndex: tParent ? tParent.injectorIndex : -1,
                directiveStart: -1,
                directiveEnd: -1,
                propertyMetadataStartIndex: -1,
                propertyMetadataEndIndex: -1,
                flags: 0,
                providerIndexes: 0,
                tagName: tagName,
                attrs: attrs,
                localNames: null,
                initialInputs: void 0,
                inputs: void 0,
                outputs: void 0,
                tViews: null,
                next: null,
                projectionNext: null,
                child: null,
                parent: tParent,
                stylingTemplate: null,
                projection: null,
                onElementCreationFns: null
            };
        }
        function tickRootContext(rootContext) {
            for (var i = 0; i < rootContext.components.length; i++) {
                var rootComponent = rootContext.components[i];
                renderComponentOrTemplate(readPatchedLView(rootComponent), rootComponent);
            }
        }
        function detectChangesInternal(view, context) {
            var rendererFactory = view[RENDERER_FACTORY];
            rendererFactory.begin && rendererFactory.begin();
            try {
                isCreationMode(view) && checkView(view, context), checkView(view, context);
            } catch (error) {
                throw function(lView, error) {
                    var injector = view[INJECTOR$1], errorHandler = injector ? injector.get(ErrorHandler, null) : null;
                    errorHandler && errorHandler.handleError(error);
                }(0, error), error;
            } finally {
                rendererFactory.end && rendererFactory.end();
            }
        }
        function detectChangesInRootView(lView) {
            tickRootContext(lView[CONTEXT]);
        }
        function checkView(hostView, component) {
            var hostTView = hostView[TVIEW], oldView = enterView(hostView, hostView[T_HOST]), templateFn = hostTView.template, creationMode = isCreationMode(hostView);
            try {
                resetPreOrderHookFlags(hostView), namespaceHTML(), creationMode && executeViewQueryFn(1, hostTView, component), 
                templateFn(getRenderFlags(hostView), component), refreshDescendantViews(hostView), 
                creationMode && !hostTView.staticViewQueries || executeViewQueryFn(2, hostTView, component);
            } finally {
                leaveView(oldView);
            }
        }
        function executeViewQueryFn(flags, tView, component) {
            var viewQuery = tView.viewQuery;
            viewQuery && viewQuery(flags, component);
        }
        var CLEAN_PROMISE = Promise.resolve(null);
        function getLContainer(tNode, embeddedView) {
            var container = embeddedView[PARENT];
            return -1 === tNode.index ? isLContainer(container) ? container : null : container;
        }
        var projectionNodeStack = [];
        function walkTNodeTree(viewToWalk, action, renderer, renderParent, beforeNode) {
            for (var e_1, _a, rootTNode = viewToWalk[TVIEW].node, projectionNodeIndex = -1, currentView = viewToWalk, tNode = rootTNode.child; tNode; ) {
                var nextTNode = null;
                if (3 === tNode.type || 4 === tNode.type) {
                    executeNodeAction(action, renderer, renderParent, getNativeByTNode(tNode, currentView), tNode, beforeNode);
                    var nodeOrContainer = currentView[tNode.index];
                    isLContainer(nodeOrContainer) && (executeNodeAction(action, renderer, renderParent, nodeOrContainer[NATIVE], tNode, beforeNode), 
                    nodeOrContainer[VIEWS].length && (nextTNode = (currentView = nodeOrContainer[VIEWS][0])[TVIEW].node, 
                    beforeNode = nodeOrContainer[NATIVE]));
                } else if (0 === tNode.type) {
                    var lContainer = currentView[tNode.index];
                    executeNodeAction(action, renderer, renderParent, lContainer[NATIVE], tNode, beforeNode), 
                    lContainer[VIEWS].length && (nextTNode = (currentView = lContainer[VIEWS][0])[TVIEW].node, 
                    beforeNode = lContainer[NATIVE]);
                } else if (1 === tNode.type) {
                    var componentView = findComponentView(currentView), head = componentView[T_HOST].projection[tNode.projection];
                    if (Array.isArray(head)) try {
                        for (var head_1 = __values(head), head_1_1 = head_1.next(); !head_1_1.done; head_1_1 = head_1.next()) executeNodeAction(action, renderer, renderParent, head_1_1.value, tNode, beforeNode);
                    } catch (e_1_1) {
                        e_1 = {
                            error: e_1_1
                        };
                    } finally {
                        try {
                            head_1_1 && !head_1_1.done && (_a = head_1.return) && _a.call(head_1);
                        } finally {
                            if (e_1) throw e_1.error;
                        }
                    } else projectionNodeStack[++projectionNodeIndex] = tNode, projectionNodeStack[++projectionNodeIndex] = currentView, 
                    head && (nextTNode = (currentView = componentView[PARENT])[TVIEW].data[head.index]);
                } else nextTNode = tNode.child;
                if (null === nextTNode) for (null === tNode.projectionNext && 2 & tNode.flags && (currentView = projectionNodeStack[projectionNodeIndex--], 
                tNode = projectionNodeStack[projectionNodeIndex--]), nextTNode = 2 & tNode.flags ? tNode.projectionNext : 4 === tNode.type && tNode.child || tNode.next; !nextTNode; ) {
                    if (null === (tNode = tNode.parent || currentView[T_HOST]) || tNode === rootTNode) return;
                    if (0 === tNode.type && (beforeNode = (currentView = getLViewParent(currentView))[tNode.index][NATIVE]), 
                    2 === tNode.type) {
                        for (;!currentView[NEXT] && currentView[PARENT] && (!tNode.parent || !tNode.parent.next); ) {
                            if (tNode === rootTNode) return;
                            if (isLContainer(currentView = currentView[PARENT])) {
                                tNode = currentView[T_HOST], beforeNode = (currentView = currentView[PARENT])[tNode.index][NATIVE];
                                break;
                            }
                            tNode = currentView[T_HOST];
                        }
                        nextTNode = currentView[NEXT] ? (currentView = currentView[NEXT])[T_HOST] : 4 === tNode.type && tNode.child || tNode.next;
                    } else nextTNode = tNode.next;
                }
                tNode = nextTNode;
            }
        }
        function executeNodeAction(action, renderer, parent, node, tNode, beforeNode) {
            0 === action ? nativeInsertBefore(renderer, parent, node, beforeNode || null) : 1 === action ? function(renderer, rNode, isHostElement) {
                var nativeParent = nativeParentNode(renderer, rNode);
                nativeParent && function(renderer, parent, child, isHostElement) {
                    isProceduralRenderer(renderer) ? renderer.removeChild(parent, child, isHostElement) : parent.removeChild(child);
                }(renderer, nativeParent, rNode, isHostElement);
            }(renderer, node, isComponent(tNode)) : 2 === action && renderer.destroyNode(node);
        }
        function getParentState(lViewOrLContainer, rootView) {
            var tNode;
            return isLView(lViewOrLContainer) && (tNode = lViewOrLContainer[T_HOST]) && 2 === tNode.type ? getLContainer(tNode, lViewOrLContainer) : lViewOrLContainer[PARENT] === rootView ? null : lViewOrLContainer[PARENT];
        }
        function cleanUpView(view) {
            if (isLView(view) && !(256 & view[FLAGS])) {
                view[FLAGS] &= -129, view[FLAGS] |= 256, function(view) {
                    var destroyHooks, tView = view[TVIEW];
                    if (null != tView && null != (destroyHooks = tView.destroyHooks)) for (var i = 0; i < destroyHooks.length; i += 2) {
                        var context = view[destroyHooks[i]];
                        context instanceof NodeInjectorFactory || destroyHooks[i + 1].call(context);
                    }
                }(view), function(lView) {
                    var tCleanup = lView[TVIEW].cleanup;
                    if (null != tCleanup) {
                        for (var lCleanup = lView[CLEANUP], i = 0; i < tCleanup.length - 1; i += 2) if ("string" == typeof tCleanup[i]) {
                            var idxOrTargetGetter = tCleanup[i + 1], target = "function" == typeof idxOrTargetGetter ? idxOrTargetGetter(lView) : unwrapRNode(lView[idxOrTargetGetter]), useCaptureOrSubIdx = tCleanup[i + 3];
                            "boolean" == typeof useCaptureOrSubIdx ? target.removeEventListener(tCleanup[i], lCleanup[tCleanup[i + 2]], useCaptureOrSubIdx) : useCaptureOrSubIdx >= 0 ? lCleanup[useCaptureOrSubIdx]() : lCleanup[-useCaptureOrSubIdx].unsubscribe(), 
                            i += 2;
                        } else "number" == typeof tCleanup[i] ? (0, lCleanup[tCleanup[i]])() : tCleanup[i].call(lCleanup[tCleanup[i + 1]]);
                        lView[CLEANUP] = null;
                    }
                }(view);
                var hostTNode = view[T_HOST];
                hostTNode && 3 === hostTNode.type && isProceduralRenderer(view[RENDERER]) && view[RENDERER].destroy(), 
                function(view) {
                    return isLContainer(view[PARENT]);
                }(view) && view[QUERIES] && view[QUERIES].removeView();
            }
        }
        function nativeInsertBefore(renderer, parent, child, beforeNode) {
            isProceduralRenderer(renderer) ? renderer.insertBefore(parent, child, beforeNode) : parent.insertBefore(child, beforeNode, !0);
        }
        function nativeAppendOrInsertBefore(renderer, parent, child, beforeNode) {
            beforeNode ? nativeInsertBefore(renderer, parent, child, beforeNode) : function(renderer, parent, child) {
                isProceduralRenderer(renderer) ? renderer.appendChild(parent, child) : parent.appendChild(child);
            }(renderer, parent, child);
        }
        function nativeParentNode(renderer, node) {
            return isProceduralRenderer(renderer) ? renderer.parentNode(node) : node.parentNode;
        }
        function appendChild(childEl, childTNode, currentView) {
            var e_2, _a, renderParent = function(tNode, currentView) {
                if (isRootView(currentView)) return nativeParentNode(currentView[RENDERER], getNativeByTNode(tNode, currentView));
                var view, container, parent = function(tNode) {
                    for (;null != tNode.parent && (4 === tNode.parent.type || 5 === tNode.parent.type); ) tNode = tNode.parent;
                    return tNode;
                }(tNode).parent;
                if (null == parent) {
                    var hostTNode = currentView[T_HOST];
                    return 2 === hostTNode.type ? (container = getLContainer(hostTNode, view = currentView)) ? nativeParentNode(view[RENDERER], container[NATIVE]) : null : function(currentView) {
                        var hostTNode = currentView[T_HOST];
                        return hostTNode && 3 === hostTNode.type ? getNativeByTNode(hostTNode, getLViewParent(currentView)) : null;
                    }(currentView);
                }
                if (1 & parent.flags) {
                    var tData = currentView[TVIEW].data, encapsulation = tData[tData[parent.index].directiveStart].encapsulation;
                    if (encapsulation !== ViewEncapsulation.ShadowDom && encapsulation !== ViewEncapsulation.Native) return null;
                }
                return getNativeByTNode(parent, currentView);
            }(childTNode, currentView);
            if (null != renderParent) {
                var renderer = currentView[RENDERER], anchorNode = function(parentTNode, lView) {
                    if (2 === parentTNode.type) {
                        var lContainer = getLContainer(parentTNode, lView), views = lContainer[VIEWS];
                        return function(index, views, containerNative) {
                            if (index + 1 < views.length) {
                                var view = views[index + 1], viewTNode = view[T_HOST];
                                return viewTNode.child ? getNativeByTNode(viewTNode.child, view) : containerNative;
                            }
                            return containerNative;
                        }(views.indexOf(lView), views, lContainer[NATIVE]);
                    }
                    return 4 === parentTNode.type || 5 === parentTNode.type ? getNativeByTNode(parentTNode, lView) : null;
                }(childTNode.parent || currentView[T_HOST], currentView);
                if (Array.isArray(childEl)) try {
                    for (var childEl_1 = __values(childEl), childEl_1_1 = childEl_1.next(); !childEl_1_1.done; childEl_1_1 = childEl_1.next()) nativeAppendOrInsertBefore(renderer, renderParent, childEl_1_1.value, anchorNode);
                } catch (e_2_1) {
                    e_2 = {
                        error: e_2_1
                    };
                } finally {
                    try {
                        childEl_1_1 && !childEl_1_1.done && (_a = childEl_1.return) && _a.call(childEl_1);
                    } finally {
                        if (e_2) throw e_2.error;
                    }
                } else nativeAppendOrInsertBefore(renderer, renderParent, childEl, anchorNode);
            }
        }
        var _devMode = !0, _runModeLocked = !1;
        function isDevMode() {
            return _runModeLocked = !0, _devMode;
        }
        var InertBodyHelper = function() {
            function InertBodyHelper(defaultDoc) {
                if (this.defaultDoc = defaultDoc, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert"), 
                this.inertBodyElement = this.inertDocument.body, null == this.inertBodyElement) {
                    var inertHtml = this.inertDocument.createElement("html");
                    this.inertDocument.appendChild(inertHtml), this.inertBodyElement = this.inertDocument.createElement("body"), 
                    inertHtml.appendChild(this.inertBodyElement);
                }
                this.inertBodyElement.innerHTML = '<svg><g onload="this.parentNode.remove()"></g></svg>', 
                !this.inertBodyElement.querySelector || this.inertBodyElement.querySelector("svg") ? (this.inertBodyElement.innerHTML = '<svg><p><style><img src="</style><img src=x onerror=alert(1)//">', 
                this.getInertBodyElement = this.inertBodyElement.querySelector && this.inertBodyElement.querySelector("svg img") && function() {
                    try {
                        return !!window.DOMParser;
                    } catch (_a) {
                        return !1;
                    }
                }() ? this.getInertBodyElement_DOMParser : this.getInertBodyElement_InertDocument) : this.getInertBodyElement = this.getInertBodyElement_XHR;
            }
            return InertBodyHelper.prototype.getInertBodyElement_XHR = function(html) {
                html = "<body><remove></remove>" + html + "</body>";
                try {
                    html = encodeURI(html);
                } catch (_a) {
                    return null;
                }
                var xhr = new XMLHttpRequest();
                xhr.responseType = "document", xhr.open("GET", "data:text/html;charset=utf-8," + html, !1), 
                xhr.send(void 0);
                var body = xhr.response.body;
                return body.removeChild(body.firstChild), body;
            }, InertBodyHelper.prototype.getInertBodyElement_DOMParser = function(html) {
                html = "<body><remove></remove>" + html + "</body>";
                try {
                    var body = new window.DOMParser().parseFromString(html, "text/html").body;
                    return body.removeChild(body.firstChild), body;
                } catch (_a) {
                    return null;
                }
            }, InertBodyHelper.prototype.getInertBodyElement_InertDocument = function(html) {
                var templateEl = this.inertDocument.createElement("template");
                return "content" in templateEl ? (templateEl.innerHTML = html, templateEl) : (this.inertBodyElement.innerHTML = html, 
                this.defaultDoc.documentMode && this.stripCustomNsAttrs(this.inertBodyElement), 
                this.inertBodyElement);
            }, InertBodyHelper.prototype.stripCustomNsAttrs = function(el) {
                for (var elAttrs = el.attributes, i = elAttrs.length - 1; 0 < i; i--) {
                    var attrName = elAttrs.item(i).name;
                    "xmlns:ns1" !== attrName && 0 !== attrName.indexOf("ns1:") || el.removeAttribute(attrName);
                }
                for (var childNode = el.firstChild; childNode; ) childNode.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(childNode), 
                childNode = childNode.nextSibling;
            }, InertBodyHelper;
        }(), SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi, DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
        function _sanitizeUrl(url) {
            return (url = String(url)).match(SAFE_URL_PATTERN) || url.match(DATA_URL_PATTERN) ? url : (isDevMode() && console.warn("WARNING: sanitizing unsafe URL value " + url + " (see http://g.co/ng/security#xss)"), 
            "unsafe:" + url);
        }
        function tagSet(tags) {
            var e_1, _a, res = {};
            try {
                for (var _b = __values(tags.split(",")), _c = _b.next(); !_c.done; _c = _b.next()) res[_c.value] = !0;
            } catch (e_1_1) {
                e_1 = {
                    error: e_1_1
                };
            } finally {
                try {
                    _c && !_c.done && (_a = _b.return) && _a.call(_b);
                } finally {
                    if (e_1) throw e_1.error;
                }
            }
            return res;
        }
        function core_merge() {
            for (var e_2, _a, sets = [], _i = 0; _i < arguments.length; _i++) sets[_i] = arguments[_i];
            var res = {};
            try {
                for (var sets_1 = __values(sets), sets_1_1 = sets_1.next(); !sets_1_1.done; sets_1_1 = sets_1.next()) {
                    var s = sets_1_1.value;
                    for (var v in s) s.hasOwnProperty(v) && (res[v] = !0);
                }
            } catch (e_2_1) {
                e_2 = {
                    error: e_2_1
                };
            } finally {
                try {
                    sets_1_1 && !sets_1_1.done && (_a = sets_1.return) && _a.call(sets_1);
                } finally {
                    if (e_2) throw e_2.error;
                }
            }
            return res;
        }
        var inertBodyHelper, VOID_ELEMENTS = tagSet("area,br,col,hr,img,wbr"), OPTIONAL_END_TAG_BLOCK_ELEMENTS = tagSet("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), OPTIONAL_END_TAG_INLINE_ELEMENTS = tagSet("rp,rt"), OPTIONAL_END_TAG_ELEMENTS = core_merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, OPTIONAL_END_TAG_BLOCK_ELEMENTS), VALID_ELEMENTS = core_merge(VOID_ELEMENTS, core_merge(OPTIONAL_END_TAG_BLOCK_ELEMENTS, tagSet("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), core_merge(OPTIONAL_END_TAG_INLINE_ELEMENTS, tagSet("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), OPTIONAL_END_TAG_ELEMENTS), URI_ATTRS = tagSet("background,cite,href,itemtype,longdesc,poster,src,xlink:href"), SRCSET_ATTRS = tagSet("srcset"), VALID_ATTRS = core_merge(URI_ATTRS, SRCSET_ATTRS, tagSet("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width")), SKIP_TRAVERSING_CONTENT_IF_INVALID_ELEMENTS = tagSet("script,style,template"), SanitizingHtmlSerializer = function() {
            function SanitizingHtmlSerializer() {
                this.sanitizedSomething = !1, this.buf = [];
            }
            return SanitizingHtmlSerializer.prototype.sanitizeChildren = function(el) {
                for (var current = el.firstChild, traverseContent = !0; current; ) if (current.nodeType === Node.ELEMENT_NODE ? traverseContent = this.startElement(current) : current.nodeType === Node.TEXT_NODE ? this.chars(current.nodeValue) : this.sanitizedSomething = !0, 
                traverseContent && current.firstChild) current = current.firstChild; else for (;current; ) {
                    current.nodeType === Node.ELEMENT_NODE && this.endElement(current);
                    var next = this.checkClobberedElement(current, current.nextSibling);
                    if (next) {
                        current = next;
                        break;
                    }
                    current = this.checkClobberedElement(current, current.parentNode);
                }
                return this.buf.join("");
            }, SanitizingHtmlSerializer.prototype.startElement = function(element) {
                var srcset, tagName = element.nodeName.toLowerCase();
                if (!VALID_ELEMENTS.hasOwnProperty(tagName)) return this.sanitizedSomething = !0, 
                !SKIP_TRAVERSING_CONTENT_IF_INVALID_ELEMENTS.hasOwnProperty(tagName);
                this.buf.push("<"), this.buf.push(tagName);
                for (var elAttrs = element.attributes, i = 0; i < elAttrs.length; i++) {
                    var elAttr = elAttrs.item(i), attrName = elAttr.name, lower = attrName.toLowerCase();
                    if (VALID_ATTRS.hasOwnProperty(lower)) {
                        var value = elAttr.value;
                        URI_ATTRS[lower] && (value = _sanitizeUrl(value)), SRCSET_ATTRS[lower] && (srcset = value, 
                        value = (srcset = String(srcset)).split(",").map(function(srcset) {
                            return _sanitizeUrl(srcset.trim());
                        }).join(", ")), this.buf.push(" ", attrName, '="', encodeEntities(value), '"');
                    } else this.sanitizedSomething = !0;
                }
                return this.buf.push(">"), !0;
            }, SanitizingHtmlSerializer.prototype.endElement = function(current) {
                var tagName = current.nodeName.toLowerCase();
                VALID_ELEMENTS.hasOwnProperty(tagName) && !VOID_ELEMENTS.hasOwnProperty(tagName) && (this.buf.push("</"), 
                this.buf.push(tagName), this.buf.push(">"));
            }, SanitizingHtmlSerializer.prototype.chars = function(chars) {
                this.buf.push(encodeEntities(chars));
            }, SanitizingHtmlSerializer.prototype.checkClobberedElement = function(node, nextNode) {
                if (nextNode && (node.compareDocumentPosition(nextNode) & Node.DOCUMENT_POSITION_CONTAINED_BY) === Node.DOCUMENT_POSITION_CONTAINED_BY) throw new Error("Failed to sanitize html because the element is clobbered: " + node.outerHTML);
                return nextNode;
            }, SanitizingHtmlSerializer;
        }(), SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g, NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;
        function encodeEntities(value) {
            return value.replace(/&/g, "&amp;").replace(SURROGATE_PAIR_REGEXP, function(match) {
                return "&#" + (1024 * (match.charCodeAt(0) - 55296) + (match.charCodeAt(1) - 56320) + 65536) + ";";
            }).replace(NON_ALPHANUMERIC_REGEXP, function(match) {
                return "&#" + match.charCodeAt(0) + ";";
            }).replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        function getTemplateContent(el) {
            return "content" in el && function(el) {
                return el.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === el.nodeName;
            }(el) ? el.content : null;
        }
        var SecurityContext = function(SecurityContext) {
            return SecurityContext[SecurityContext.NONE = 0] = "NONE", SecurityContext[SecurityContext.HTML = 1] = "HTML", 
            SecurityContext[SecurityContext.STYLE = 2] = "STYLE", SecurityContext[SecurityContext.SCRIPT = 3] = "SCRIPT", 
            SecurityContext[SecurityContext.URL = 4] = "URL", SecurityContext[SecurityContext.RESOURCE_URL = 5] = "RESOURCE_URL", 
            SecurityContext;
        }({}), Sanitizer = function() {
            return function() {};
        }(), SAFE_STYLE_VALUE = new RegExp("^([-,.\"'%_!# a-zA-Z0-9]+|(?:(?:matrix|translate|scale|rotate|skew|perspective)(?:X|Y|3d)?|(?:rgb|hsl)a?|(?:repeating-)?(?:linear|radial)-gradient|(?:calc|attr))\\([-0-9.%, #a-zA-Z]+\\))$", "g"), URL_RE = /^url\(([^)]+)\)$/;
        function core_isPromise(obj) {
            return !!obj && "function" == typeof obj.then;
        }
        var _symbolIterator = null;
        function core_getSymbolIterator() {
            if (!_symbolIterator) {
                var Symbol_1 = _global.Symbol;
                if (Symbol_1 && Symbol_1.iterator) _symbolIterator = Symbol_1.iterator; else for (var keys = Object.getOwnPropertyNames(Map.prototype), i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    "entries" !== key && "size" !== key && Map.prototype[key] === Map.prototype.entries && (_symbolIterator = key);
                }
            }
            return _symbolIterator;
        }
        function looseIdentical(a, b) {
            return a === b || "number" == typeof a && "number" == typeof b && isNaN(a) && isNaN(b);
        }
        function isListLikeIterable(obj) {
            return !!isJsObject(obj) && (Array.isArray(obj) || !(obj instanceof Map) && core_getSymbolIterator() in obj);
        }
        function isJsObject(o) {
            return null !== o && ("function" == typeof o || "object" == typeof o);
        }
        function loadLContext(target, throwOnNotFound) {
            void 0 === throwOnNotFound && (throwOnNotFound = !0);
            var context = function(target) {
                var instance, mpValue = readPatchedData(target);
                if (mpValue) {
                    if (Array.isArray(mpValue)) {
                        var lView = mpValue, nodeIndex = void 0, component = void 0, directives = void 0;
                        if ((instance = target) && instance.constructor && instance.constructor.ngComponentDef) {
                            if (-1 == (nodeIndex = function(lView, componentInstance) {
                                var componentIndices = lView[TVIEW].components;
                                if (componentIndices) for (var i = 0; i < componentIndices.length; i++) {
                                    var elementComponentIndex = componentIndices[i];
                                    if (getComponentViewByIndex(elementComponentIndex, lView)[CONTEXT] === componentInstance) return elementComponentIndex;
                                } else if (getComponentViewByIndex(HEADER_OFFSET, lView)[CONTEXT] === componentInstance) return HEADER_OFFSET;
                                return -1;
                            }(lView, target))) throw new Error("The provided component was not found in the application");
                            component = target;
                        } else if (target && target.constructor && target.constructor.ngDirectiveDef) {
                            if (-1 == (nodeIndex = function(lView, directiveInstance) {
                                for (var tNode = lView[TVIEW].firstChild; tNode; ) {
                                    for (var directiveIndexEnd = tNode.directiveEnd, i = tNode.directiveStart; i < directiveIndexEnd; i++) if (lView[i] === directiveInstance) return tNode.index;
                                    tNode = traverseNextElement(tNode);
                                }
                                return -1;
                            }(lView, target))) throw new Error("The provided directive was not found in the application");
                            directives = function(nodeIndex, lView, includeComponents) {
                                var tNode = lView[TVIEW].data[nodeIndex], directiveStartIndex = tNode.directiveStart;
                                return 0 == directiveStartIndex ? EMPTY_ARRAY$1 : (1 & tNode.flags && directiveStartIndex++, 
                                lView.slice(directiveStartIndex, tNode.directiveEnd));
                            }(nodeIndex, lView);
                        } else if (-1 == (nodeIndex = findViaNativeElement(lView, target))) return null;
                        var existingCtx = readPatchedData(native = unwrapRNode(lView[nodeIndex])), context = existingCtx && !Array.isArray(existingCtx) ? existingCtx : createLContext(lView, nodeIndex, native);
                        if (component && void 0 === context.component && (context.component = component, 
                        attachPatchData(context.component, context)), directives && void 0 === context.directives) {
                            context.directives = directives;
                            for (var i = 0; i < directives.length; i++) attachPatchData(directives[i], context);
                        }
                        attachPatchData(context.native, context), mpValue = context;
                    }
                } else for (var rElement = target, parent_1 = rElement; parent_1 = parent_1.parentNode; ) {
                    var parentContext = readPatchedData(parent_1);
                    if (parentContext) {
                        if (lView = void 0, !(lView = Array.isArray(parentContext) ? parentContext : parentContext.lView)) return null;
                        var index = findViaNativeElement(lView, rElement);
                        if (index >= 0) {
                            var native;
                            attachPatchData(native = unwrapRNode(lView[index]), context = createLContext(lView, index, native)), 
                            mpValue = context;
                            break;
                        }
                    }
                }
                return mpValue || null;
            }(target);
            if (!context && throwOnNotFound) throw new Error("Invalid ng target");
            return context;
        }
        function loadLContextFromNode(node) {
            if (!(node instanceof Node)) throw new Error("Expecting instance of DOM Node");
            return loadLContext(node);
        }
        function isBrowserEvents(listener) {
            return "boolean" == typeof listener.useCapture;
        }
        function sortListeners(a, b) {
            return a.name == b.name ? 0 : a.name < b.name ? -1 : 1;
        }
        function createRootComponentView(rNode, def, rootView, rendererFactory, renderer, sanitizer) {
            isParent = !1, previousOrParentTNode = null;
            var templateFn, tView = rootView[TVIEW], tNode = createNodeAtIndex(0, 3, rNode, null, null), componentView = createLView(rootView, (templateFn = def.template).ngPrivateData || (templateFn.ngPrivateData = createTView(-1, templateFn, def.consts, def.vars, def.directiveDefs, def.pipeDefs, def.viewQuery, def.schemas)), null, def.onPush ? 64 : 16, rootView[HEADER_OFFSET], tNode, rendererFactory, renderer, sanitizer);
            return tView.firstTemplatePass && (function(injectorIndex, tView, type) {
                var id = "string" != typeof type ? type[NG_ELEMENT_ID] : type.charCodeAt(0) || 0;
                null == id && (id = type[NG_ELEMENT_ID] = nextNgElementId++);
                var bloomBit = id & BLOOM_MASK, mask = 1 << bloomBit, b6 = 64 & bloomBit, b5 = 32 & bloomBit, tData = tView.data;
                128 & bloomBit ? b6 ? b5 ? tData[injectorIndex + 7] |= mask : tData[injectorIndex + 6] |= mask : b5 ? tData[injectorIndex + 5] |= mask : tData[injectorIndex + 4] |= mask : b6 ? b5 ? tData[injectorIndex + 3] |= mask : tData[injectorIndex + 2] |= mask : b5 ? tData[injectorIndex + 1] |= mask : tData[injectorIndex] |= mask;
            }(function(tNode, hostView) {
                var existingInjectorIndex = getInjectorIndex(tNode, hostView);
                if (-1 !== existingInjectorIndex) return existingInjectorIndex;
                var tView = hostView[TVIEW];
                tView.firstTemplatePass && (tNode.injectorIndex = hostView.length, insertBloom(tView.data, tNode), 
                insertBloom(hostView, null), insertBloom(tView.blueprint, null));
                var parentLoc = getParentInjectorLocation(tNode, hostView), parentIndex = getParentInjectorIndex(parentLoc), parentLView = getParentInjectorView(parentLoc, hostView), injectorIndex = tNode.injectorIndex;
                if (parentLoc !== NO_PARENT_INJECTOR) for (var parentData = parentLView[TVIEW].data, i = 0; i < 8; i++) hostView[injectorIndex + i] = parentLView[parentIndex + i] | parentData[parentIndex + i];
                return hostView[injectorIndex + PARENT_INJECTOR] = parentLoc, injectorIndex;
            }(tNode, rootView), rootView[TVIEW], def.type), tNode.flags = 1, function(tNode, index, numberOfDirectives) {
                tNode.flags = 1 & tNode.flags, tNode.directiveStart = index, tNode.directiveEnd = index + 1, 
                tNode.providerIndexes = index;
            }(tNode, rootView.length), function(previousOrParentTNode) {
                var tView = getLView()[TVIEW];
                (tView.components || (tView.components = [])).push(previousOrParentTNode.index);
            }(tNode)), rootView[HEADER_OFFSET] = componentView;
        }
        function createRootContext(scheduler, playerHandler) {
            return {
                components: [],
                scheduler: scheduler || defaultScheduler,
                clean: CLEAN_PROMISE,
                playerHandler: playerHandler || null,
                flags: 0
            };
        }
        function LifecycleHooksFeature(component, def) {
            var directiveIndex, directiveDef, tView, onChanges, onInit, doCheck, rootTView = readPatchedLView(component)[TVIEW], dirIndex = rootTView.data.length - 1;
            directiveIndex = dirIndex, tView = rootTView, onChanges = (directiveDef = def).onChanges, 
            onInit = directiveDef.onInit, doCheck = directiveDef.doCheck, -1 >= 0 && (!tView.preOrderHooks || -1 === tView.preOrderHooks.length) && (onChanges || onInit || doCheck) && (tView.preOrderHooks || (tView.preOrderHooks = [])).push(-1), 
            onChanges && ((tView.preOrderHooks || (tView.preOrderHooks = [])).push(directiveIndex, onChanges), 
            (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(directiveIndex, onChanges)), 
            onInit && (tView.preOrderHooks || (tView.preOrderHooks = [])).push(-directiveIndex, onInit), 
            doCheck && ((tView.preOrderHooks || (tView.preOrderHooks = [])).push(directiveIndex, doCheck), 
            (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(directiveIndex, doCheck)), 
            function(tView, tNode) {
                if (tView.firstTemplatePass) for (var i = tNode.directiveStart, end = tNode.directiveEnd; i < end; i++) {
                    var directiveDef = tView.data[i];
                    directiveDef.afterContentInit && (tView.contentHooks || (tView.contentHooks = [])).push(-i, directiveDef.afterContentInit), 
                    directiveDef.afterContentChecked && ((tView.contentHooks || (tView.contentHooks = [])).push(i, directiveDef.afterContentChecked), 
                    (tView.contentCheckHooks || (tView.contentCheckHooks = [])).push(i, directiveDef.afterContentChecked)), 
                    directiveDef.afterViewInit && (tView.viewHooks || (tView.viewHooks = [])).push(-i, directiveDef.afterViewInit), 
                    directiveDef.afterViewChecked && ((tView.viewHooks || (tView.viewHooks = [])).push(i, directiveDef.afterViewChecked), 
                    (tView.viewCheckHooks || (tView.viewCheckHooks = [])).push(i, directiveDef.afterViewChecked)), 
                    null != directiveDef.onDestroy && (tView.destroyHooks || (tView.destroyHooks = [])).push(i, directiveDef.onDestroy);
                }
            }(rootTView, {
                directiveStart: dirIndex,
                directiveEnd: dirIndex + 1
            });
        }
        var APP_ROOT = new InjectionToken("The presence of this token marks an injector as being the root injector."), NOT_YET = {}, CIRCULAR$1 = {}, EMPTY_ARRAY$2 = [], NULL_INJECTOR$1 = void 0;
        function getNullInjector() {
            return void 0 === NULL_INJECTOR$1 && (NULL_INJECTOR$1 = new NullInjector()), NULL_INJECTOR$1;
        }
        var R3Injector = function() {
            function R3Injector(def, additionalProviders, parent, source) {
                void 0 === source && (source = null);
                var _this = this;
                this.parent = parent, this.records = new Map(), this.injectorDefTypes = new Set(), 
                this.onDestroy = new Set(), this._destroyed = !1;
                var dedupStack = [];
                deepForEach([ def ], function(injectorDef) {
                    return _this.processInjectorType(injectorDef, [], dedupStack);
                }), additionalProviders && deepForEach(additionalProviders, function(provider) {
                    return _this.processProvider(provider, def, additionalProviders);
                }), this.records.set(INJECTOR, makeRecord(void 0, this)), this.isRootInjector = this.records.has(APP_ROOT), 
                this.injectorDefTypes.forEach(function(defType) {
                    return _this.get(defType);
                }), this.source = source || (def instanceof Array ? null : stringify(def));
            }
            return Object.defineProperty(R3Injector.prototype, "destroyed", {
                get: function() {
                    return this._destroyed;
                },
                enumerable: !0,
                configurable: !0
            }), R3Injector.prototype.destroy = function() {
                this.assertNotDestroyed(), this._destroyed = !0;
                try {
                    this.onDestroy.forEach(function(service) {
                        return service.ngOnDestroy();
                    });
                } finally {
                    this.records.clear(), this.onDestroy.clear(), this.injectorDefTypes.clear();
                }
            }, R3Injector.prototype.get = function(token, notFoundValue, flags) {
                void 0 === notFoundValue && (notFoundValue = Injector.THROW_IF_NOT_FOUND), void 0 === flags && (flags = InjectFlags.Default), 
                this.assertNotDestroyed();
                var value, previousInjector = setCurrentInjector(this);
                try {
                    if (!(flags & InjectFlags.SkipSelf)) {
                        var record = this.records.get(token);
                        if (void 0 === record) {
                            var def = ("function" == typeof (value = token) || "object" == typeof value && value instanceof InjectionToken) && getInjectableDef(token);
                            def && this.injectableDefInScope(def) && (record = makeRecord(injectableDefOrInjectorDefFactory(token), NOT_YET), 
                            this.records.set(token, record));
                        }
                        if (void 0 !== record) return this.hydrate(token, record);
                    }
                    return (flags & InjectFlags.Self ? getNullInjector() : this.parent).get(token, flags & InjectFlags.Optional ? null : notFoundValue);
                } catch (e) {
                    if ("NullInjectorError" === e.name) {
                        if ((e[NG_TEMP_TOKEN_PATH] = e[NG_TEMP_TOKEN_PATH] || []).unshift(stringify(token)), 
                        previousInjector) throw e;
                        return catchInjectorError(e, token, "R3InjectorError", this.source);
                    }
                    throw e;
                } finally {
                    setCurrentInjector(previousInjector);
                }
            }, R3Injector.prototype.assertNotDestroyed = function() {
                if (this._destroyed) throw new Error("Injector has already been destroyed.");
            }, R3Injector.prototype.processInjectorType = function(defOrWrappedDef, parents, dedupStack) {
                var _this = this;
                if (defOrWrappedDef = resolveForwardRef(defOrWrappedDef)) {
                    var def = getInjectorDef(defOrWrappedDef), ngModule = null == def && defOrWrappedDef.ngModule || void 0, defType = void 0 === ngModule ? defOrWrappedDef : ngModule, isDuplicate = -1 !== dedupStack.indexOf(defType), providers = void 0 !== ngModule && defOrWrappedDef.providers || EMPTY_ARRAY$2;
                    if (void 0 !== ngModule && (def = getInjectorDef(ngModule)), null != def) {
                        if (this.injectorDefTypes.add(defType), this.records.set(defType, makeRecord(def.factory, NOT_YET)), 
                        null != def.imports && !isDuplicate) {
                            dedupStack.push(defType);
                            try {
                                deepForEach(def.imports, function(imported) {
                                    return _this.processInjectorType(imported, parents, dedupStack);
                                });
                            } finally {}
                        }
                        var defProviders = def.providers;
                        if (null != defProviders && !isDuplicate) {
                            var injectorType_1 = defOrWrappedDef;
                            deepForEach(defProviders, function(provider) {
                                return _this.processProvider(provider, injectorType_1, defProviders);
                            });
                        }
                        var ngModuleType = defOrWrappedDef.ngModule;
                        deepForEach(providers, function(provider) {
                            return _this.processProvider(provider, ngModuleType, providers);
                        });
                    }
                }
            }, R3Injector.prototype.processProvider = function(provider, ngModuleType, providers) {
                var token = isTypeProvider(provider = resolveForwardRef(provider)) ? provider : resolveForwardRef(provider && provider.provide), record = function(provider, ngModuleType, providers) {
                    var factory = function(provider, ngModuleType, providers) {
                        var value, factory = void 0;
                        if (isTypeProvider(provider)) return injectableDefOrInjectorDefFactory(resolveForwardRef(provider));
                        if (isValueProvider(provider)) factory = function() {
                            return resolveForwardRef(provider.useValue);
                        }; else if ((value = provider) && value.useExisting) factory = function() {
                            return inject(resolveForwardRef(provider.useExisting));
                        }; else if (provider && provider.useFactory) factory = function() {
                            return provider.useFactory.apply(provider, __spread(injectArgs(provider.deps || [])));
                        }; else {
                            var classRef_1 = resolveForwardRef(provider && (provider.useClass || provider.provide));
                            if (!classRef_1) {
                                var ngModuleDetail = "";
                                throw ngModuleType && providers && (ngModuleDetail = " - only instances of Provider and Type are allowed, got: [" + providers.map(function(v) {
                                    return v == provider ? "?" + provider + "?" : "...";
                                }).join(", ") + "]"), new Error("Invalid provider for the NgModule '" + stringify(ngModuleType) + "'" + ngModuleDetail);
                            }
                            if (!provider.deps) return injectableDefOrInjectorDefFactory(classRef_1);
                            factory = function() {
                                return new (classRef_1.bind.apply(classRef_1, __spread([ void 0 ], injectArgs(provider.deps))))();
                            };
                        }
                        return factory;
                    }(provider, ngModuleType, providers);
                    return isValueProvider(provider) ? makeRecord(void 0, provider.useValue) : makeRecord(factory, NOT_YET);
                }(provider, ngModuleType, providers);
                if (isTypeProvider(provider) || !0 !== provider.multi) {
                    var existing = this.records.get(token);
                    if (existing && void 0 !== existing.multi) throw new Error("Mixed multi-provider for " + stringify(token));
                } else {
                    var multiRecord_1 = this.records.get(token);
                    if (multiRecord_1) {
                        if (void 0 === multiRecord_1.multi) throw new Error("Mixed multi-provider for " + token + ".");
                    } else (multiRecord_1 = makeRecord(void 0, NOT_YET, !0)).factory = function() {
                        return injectArgs(multiRecord_1.multi);
                    }, this.records.set(token, multiRecord_1);
                    token = provider, multiRecord_1.multi.push(provider);
                }
                this.records.set(token, record);
            }, R3Injector.prototype.hydrate = function(token, record) {
                if (record.value === CIRCULAR$1) throw new Error("Cannot instantiate cyclic dependency! " + stringify(token));
                var value;
                return record.value === NOT_YET && (record.value = CIRCULAR$1, record.value = record.factory()), 
                "object" == typeof record.value && record.value && null !== (value = record.value) && "object" == typeof value && "function" == typeof value.ngOnDestroy && this.onDestroy.add(record.value), 
                record.value;
            }, R3Injector.prototype.injectableDefInScope = function(def) {
                return !!def.providedIn && ("string" == typeof def.providedIn ? "any" === def.providedIn || "root" === def.providedIn && this.isRootInjector : this.injectorDefTypes.has(def.providedIn));
            }, R3Injector;
        }();
        function injectableDefOrInjectorDefFactory(token) {
            var injectableDef = getInjectableDef(token);
            if (null === injectableDef) {
                var injectorDef = getInjectorDef(token);
                if (null !== injectorDef) return injectorDef.factory;
                if (token instanceof InjectionToken) throw new Error("Token " + stringify(token) + " is missing an ngInjectableDef definition.");
                if (token instanceof Function) {
                    var paramLength = token.length;
                    if (paramLength > 0) {
                        var args = new Array(paramLength).fill("?");
                        throw new Error("Can't resolve all parameters for " + stringify(token) + ": (" + args.join(", ") + ").");
                    }
                    return function() {
                        return new token();
                    };
                }
                throw new Error("unreachable");
            }
            return injectableDef.factory;
        }
        function makeRecord(factory, value, multi) {
            return void 0 === multi && (multi = !1), {
                factory: factory,
                value: value,
                multi: multi ? [] : void 0
            };
        }
        function deepForEach(input, fn) {
            input.forEach(function(value) {
                return Array.isArray(value) ? deepForEach(value, fn) : fn(value);
            });
        }
        function isValueProvider(value) {
            return null !== value && "object" == typeof value && USE_VALUE$2 in value;
        }
        function isTypeProvider(value) {
            return "function" == typeof value;
        }
        var R3ElementRef, core_ComponentRef = function() {
            return function() {};
        }(), core_ComponentFactory = function() {
            return function() {};
        }(), _NullComponentFactoryResolver = function() {
            function _NullComponentFactoryResolver() {}
            return _NullComponentFactoryResolver.prototype.resolveComponentFactory = function(component) {
                throw function(component) {
                    var error = Error("No component factory found for " + stringify(component) + ". Did you add it to @NgModule.entryComponents?");
                    return error.ngComponent = component, error;
                }(component);
            }, _NullComponentFactoryResolver;
        }(), core_ComponentFactoryResolver = function() {
            function ComponentFactoryResolver() {}
            return ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver(), ComponentFactoryResolver;
        }(), NgModuleRef = function() {
            return function() {};
        }(), core_NgModuleFactory = function() {
            return function() {};
        }(), core_RootViewRef = function(_super) {
            function RootViewRef(_view) {
                var _this = _super.call(this, _view, null, -1) || this;
                return _this._view = _view, _this;
            }
            return __extends(RootViewRef, _super), RootViewRef.prototype.detectChanges = function() {
                detectChangesInRootView(this._view);
            }, RootViewRef.prototype.checkNoChanges = function() {
                !function(lView) {
                    setCheckNoChangesMode(!0);
                    try {
                        detectChangesInRootView(lView);
                    } finally {
                        setCheckNoChangesMode(!1);
                    }
                }(this._view);
            }, Object.defineProperty(RootViewRef.prototype, "context", {
                get: function() {
                    return null;
                },
                enumerable: !0,
                configurable: !0
            }), RootViewRef;
        }(function() {
            function ViewRef(_lView, _context, _componentIndex) {
                this._context = _context, this._componentIndex = _componentIndex, this._appRef = null, 
                this._viewContainerRef = null, this._tViewNode = null, this._lView = _lView;
            }
            return Object.defineProperty(ViewRef.prototype, "rootNodes", {
                get: function() {
                    return null == this._lView[HOST] ? function collectNativeNodes(lView, parentTNode, result) {
                        for (var tNodeChild = parentTNode.child; tNodeChild; ) {
                            var nativeNode = getNativeByTNode(tNodeChild, lView);
                            if (nativeNode && result.push(nativeNode), 4 === tNodeChild.type) collectNativeNodes(lView, tNodeChild, result); else if (1 === tNodeChild.type) for (var componentView = findComponentView(lView), componentHost = componentView[T_HOST], parentView = getLViewParent(componentView), currentProjectedNode = componentHost.projection[tNodeChild.projection]; currentProjectedNode && parentView; ) result.push(getNativeByTNode(currentProjectedNode, parentView)), 
                            currentProjectedNode = currentProjectedNode.next;
                            tNodeChild = tNodeChild.next;
                        }
                        return result;
                    }(this._lView, this._lView[T_HOST], []) : [];
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ViewRef.prototype, "context", {
                get: function() {
                    return this._context ? this._context : this._lookUpContext();
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ViewRef.prototype, "destroyed", {
                get: function() {
                    return 256 == (256 & this._lView[FLAGS]);
                },
                enumerable: !0,
                configurable: !0
            }), ViewRef.prototype.destroy = function() {
                if (this._appRef) this._appRef.detachView(this); else if (this._viewContainerRef) {
                    var index = this._viewContainerRef.indexOf(this);
                    index > -1 && this._viewContainerRef.detach(index), this._viewContainerRef = null;
                }
                !function(view) {
                    if (!(256 & view[FLAGS])) {
                        var renderer = view[RENDERER];
                        isProceduralRenderer(renderer) && renderer.destroyNode && walkTNodeTree(view, 2, renderer, null), 
                        function(rootView) {
                            var lViewOrLContainer = rootView[CHILD_HEAD];
                            if (!lViewOrLContainer) return cleanUpView(rootView);
                            for (;lViewOrLContainer; ) {
                                var next = null;
                                if (isLView(lViewOrLContainer)) next = lViewOrLContainer[CHILD_HEAD]; else {
                                    var views = lViewOrLContainer[VIEWS];
                                    views.length > 0 && (next = views[0]);
                                }
                                if (!next) {
                                    for (;lViewOrLContainer && !lViewOrLContainer[NEXT] && lViewOrLContainer !== rootView; ) cleanUpView(lViewOrLContainer), 
                                    lViewOrLContainer = getParentState(lViewOrLContainer, rootView);
                                    cleanUpView(lViewOrLContainer || rootView), next = lViewOrLContainer && lViewOrLContainer[NEXT];
                                }
                                lViewOrLContainer = next;
                            }
                        }(view);
                    }
                }(this._lView);
            }, ViewRef.prototype.onDestroy = function(callback) {
                var view, cleanupFn;
                cleanupFn = callback, function(view) {
                    return view[CLEANUP] || (view[CLEANUP] = []);
                }(view = this._lView).push(cleanupFn), view[TVIEW].firstTemplatePass && function(view) {
                    return view[TVIEW].cleanup || (view[TVIEW].cleanup = []);
                }(view).push(view[CLEANUP].length - 1, null);
            }, ViewRef.prototype.markForCheck = function() {
                !function(lView) {
                    for (;lView; ) {
                        lView[FLAGS] |= 64;
                        var parent_2 = getLViewParent(lView);
                        if (isRootView(lView) && !parent_2) return lView;
                        lView = parent_2;
                    }
                }(this._lView);
            }, ViewRef.prototype.detach = function() {
                this._lView[FLAGS] &= -129;
            }, ViewRef.prototype.reattach = function() {
                this._lView[FLAGS] |= 128;
            }, ViewRef.prototype.detectChanges = function() {
                detectChangesInternal(this._lView, this.context);
            }, ViewRef.prototype.checkNoChanges = function() {
                !function(view, context) {
                    setCheckNoChangesMode(!0);
                    try {
                        detectChangesInternal(view, context);
                    } finally {
                        setCheckNoChangesMode(!1);
                    }
                }(this._lView, this.context);
            }, ViewRef.prototype.attachToViewContainerRef = function(vcRef) {
                if (this._appRef) throw new Error("This view is already attached directly to the ApplicationRef!");
                this._viewContainerRef = vcRef;
            }, ViewRef.prototype.detachFromAppRef = function() {
                var lView;
                this._appRef = null, walkTNodeTree(lView = this._lView, 1, lView[RENDERER], null);
            }, ViewRef.prototype.attachToAppRef = function(appRef) {
                if (this._viewContainerRef) throw new Error("This view is already attached to a ViewContainer!");
                this._appRef = appRef;
            }, ViewRef.prototype._lookUpContext = function() {
                return this._context = getLViewParent(this._lView)[this._componentIndex];
            }, ViewRef;
        }());
        function createElementRef(ElementRefToken, tNode, view) {
            return R3ElementRef || (R3ElementRef = function(_super) {
                function ElementRef_() {
                    return null !== _super && _super.apply(this, arguments) || this;
                }
                return __extends(ElementRef_, _super), ElementRef_;
            }(ElementRefToken)), new R3ElementRef(getNativeByTNode(tNode, view));
        }
        var ElementRef = function() {
            function ElementRef(nativeElement) {
                this.nativeElement = nativeElement;
            }
            return ElementRef.__NG_ELEMENT_ID__ = function() {
                return SWITCH_ELEMENT_REF_FACTORY(ElementRef);
            }, ElementRef;
        }(), SWITCH_ELEMENT_REF_FACTORY = function(ElementRefToken) {
            return createElementRef(ElementRefToken, getPreviousOrParentTNode(), getLView());
        }, RendererFactory2 = function() {
            return function() {};
        }(), RendererStyleFlags2 = function(RendererStyleFlags2) {
            return RendererStyleFlags2[RendererStyleFlags2.Important = 1] = "Important", RendererStyleFlags2[RendererStyleFlags2.DashCase = 2] = "DashCase", 
            RendererStyleFlags2;
        }({}), VERSION = new (function() {
            return function(full) {
                this.full = full, this.major = full.split(".")[0], this.minor = full.split(".")[1], 
                this.patch = full.split(".").slice(2).join(".");
            };
        }())("8.0.0-beta.10+123.sha-a6809e0.with-local-changes"), DefaultIterableDifferFactory = function() {
            function DefaultIterableDifferFactory() {}
            return DefaultIterableDifferFactory.prototype.supports = function(obj) {
                return isListLikeIterable(obj);
            }, DefaultIterableDifferFactory.prototype.create = function(trackByFn) {
                return new DefaultIterableDiffer(trackByFn);
            }, DefaultIterableDifferFactory;
        }(), trackByIdentity = function(index, item) {
            return item;
        }, DefaultIterableDiffer = function() {
            function DefaultIterableDiffer(trackByFn) {
                this.length = 0, this._linkedRecords = null, this._unlinkedRecords = null, this._previousItHead = null, 
                this._itHead = null, this._itTail = null, this._additionsHead = null, this._additionsTail = null, 
                this._movesHead = null, this._movesTail = null, this._removalsHead = null, this._removalsTail = null, 
                this._identityChangesHead = null, this._identityChangesTail = null, this._trackByFn = trackByFn || trackByIdentity;
            }
            return DefaultIterableDiffer.prototype.forEachItem = function(fn) {
                var record;
                for (record = this._itHead; null !== record; record = record._next) fn(record);
            }, DefaultIterableDiffer.prototype.forEachOperation = function(fn) {
                for (var nextIt = this._itHead, nextRemove = this._removalsHead, addRemoveOffset = 0, moveOffsets = null; nextIt || nextRemove; ) {
                    var record = !nextRemove || nextIt && nextIt.currentIndex < getPreviousIndex(nextRemove, addRemoveOffset, moveOffsets) ? nextIt : nextRemove, adjPreviousIndex = getPreviousIndex(record, addRemoveOffset, moveOffsets), currentIndex = record.currentIndex;
                    if (record === nextRemove) addRemoveOffset--, nextRemove = nextRemove._nextRemoved; else if (nextIt = nextIt._next, 
                    null == record.previousIndex) addRemoveOffset++; else {
                        moveOffsets || (moveOffsets = []);
                        var localMovePreviousIndex = adjPreviousIndex - addRemoveOffset, localCurrentIndex = currentIndex - addRemoveOffset;
                        if (localMovePreviousIndex != localCurrentIndex) {
                            for (var i = 0; i < localMovePreviousIndex; i++) {
                                var offset = i < moveOffsets.length ? moveOffsets[i] : moveOffsets[i] = 0, index = offset + i;
                                localCurrentIndex <= index && index < localMovePreviousIndex && (moveOffsets[i] = offset + 1);
                            }
                            moveOffsets[record.previousIndex] = localCurrentIndex - localMovePreviousIndex;
                        }
                    }
                    adjPreviousIndex !== currentIndex && fn(record, adjPreviousIndex, currentIndex);
                }
            }, DefaultIterableDiffer.prototype.forEachPreviousItem = function(fn) {
                var record;
                for (record = this._previousItHead; null !== record; record = record._nextPrevious) fn(record);
            }, DefaultIterableDiffer.prototype.forEachAddedItem = function(fn) {
                var record;
                for (record = this._additionsHead; null !== record; record = record._nextAdded) fn(record);
            }, DefaultIterableDiffer.prototype.forEachMovedItem = function(fn) {
                var record;
                for (record = this._movesHead; null !== record; record = record._nextMoved) fn(record);
            }, DefaultIterableDiffer.prototype.forEachRemovedItem = function(fn) {
                var record;
                for (record = this._removalsHead; null !== record; record = record._nextRemoved) fn(record);
            }, DefaultIterableDiffer.prototype.forEachIdentityChange = function(fn) {
                var record;
                for (record = this._identityChangesHead; null !== record; record = record._nextIdentityChange) fn(record);
            }, DefaultIterableDiffer.prototype.diff = function(collection) {
                if (null == collection && (collection = []), !isListLikeIterable(collection)) throw new Error("Error trying to diff '" + stringify(collection) + "'. Only arrays and iterables are allowed");
                return this.check(collection) ? this : null;
            }, DefaultIterableDiffer.prototype.onDestroy = function() {}, DefaultIterableDiffer.prototype.check = function(collection) {
                var _this = this;
                this._reset();
                var index, item, itemTrackBy, record = this._itHead, mayBeDirty = !1;
                if (Array.isArray(collection)) {
                    this.length = collection.length;
                    for (var index_1 = 0; index_1 < this.length; index_1++) itemTrackBy = this._trackByFn(index_1, item = collection[index_1]), 
                    null !== record && looseIdentical(record.trackById, itemTrackBy) ? (mayBeDirty && (record = this._verifyReinsertion(record, item, itemTrackBy, index_1)), 
                    looseIdentical(record.item, item) || this._addIdentityChange(record, item)) : (record = this._mismatch(record, item, itemTrackBy, index_1), 
                    mayBeDirty = !0), record = record._next;
                } else index = 0, function(obj, fn) {
                    if (Array.isArray(obj)) for (var i = 0; i < obj.length; i++) fn(obj[i]); else for (var iterator = obj[core_getSymbolIterator()](), item = void 0; !(item = iterator.next()).done; ) fn(item.value);
                }(collection, function(item) {
                    itemTrackBy = _this._trackByFn(index, item), null !== record && looseIdentical(record.trackById, itemTrackBy) ? (mayBeDirty && (record = _this._verifyReinsertion(record, item, itemTrackBy, index)), 
                    looseIdentical(record.item, item) || _this._addIdentityChange(record, item)) : (record = _this._mismatch(record, item, itemTrackBy, index), 
                    mayBeDirty = !0), record = record._next, index++;
                }), this.length = index;
                return this._truncate(record), this.collection = collection, this.isDirty;
            }, Object.defineProperty(DefaultIterableDiffer.prototype, "isDirty", {
                get: function() {
                    return null !== this._additionsHead || null !== this._movesHead || null !== this._removalsHead || null !== this._identityChangesHead;
                },
                enumerable: !0,
                configurable: !0
            }), DefaultIterableDiffer.prototype._reset = function() {
                if (this.isDirty) {
                    var record = void 0, nextRecord = void 0;
                    for (record = this._previousItHead = this._itHead; null !== record; record = record._next) record._nextPrevious = record._next;
                    for (record = this._additionsHead; null !== record; record = record._nextAdded) record.previousIndex = record.currentIndex;
                    for (this._additionsHead = this._additionsTail = null, record = this._movesHead; null !== record; record = nextRecord) record.previousIndex = record.currentIndex, 
                    nextRecord = record._nextMoved;
                    this._movesHead = this._movesTail = null, this._removalsHead = this._removalsTail = null, 
                    this._identityChangesHead = this._identityChangesTail = null;
                }
            }, DefaultIterableDiffer.prototype._mismatch = function(record, item, itemTrackBy, index) {
                var previousRecord;
                return null === record ? previousRecord = this._itTail : (previousRecord = record._prev, 
                this._remove(record)), null !== (record = null === this._linkedRecords ? null : this._linkedRecords.get(itemTrackBy, index)) ? (looseIdentical(record.item, item) || this._addIdentityChange(record, item), 
                this._moveAfter(record, previousRecord, index)) : null !== (record = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(itemTrackBy, null)) ? (looseIdentical(record.item, item) || this._addIdentityChange(record, item), 
                this._reinsertAfter(record, previousRecord, index)) : record = this._addAfter(new IterableChangeRecord_(item, itemTrackBy), previousRecord, index), 
                record;
            }, DefaultIterableDiffer.prototype._verifyReinsertion = function(record, item, itemTrackBy, index) {
                var reinsertRecord = null === this._unlinkedRecords ? null : this._unlinkedRecords.get(itemTrackBy, null);
                return null !== reinsertRecord ? record = this._reinsertAfter(reinsertRecord, record._prev, index) : record.currentIndex != index && (record.currentIndex = index, 
                this._addToMoves(record, index)), record;
            }, DefaultIterableDiffer.prototype._truncate = function(record) {
                for (;null !== record; ) {
                    var nextRecord = record._next;
                    this._addToRemovals(this._unlink(record)), record = nextRecord;
                }
                null !== this._unlinkedRecords && this._unlinkedRecords.clear(), null !== this._additionsTail && (this._additionsTail._nextAdded = null), 
                null !== this._movesTail && (this._movesTail._nextMoved = null), null !== this._itTail && (this._itTail._next = null), 
                null !== this._removalsTail && (this._removalsTail._nextRemoved = null), null !== this._identityChangesTail && (this._identityChangesTail._nextIdentityChange = null);
            }, DefaultIterableDiffer.prototype._reinsertAfter = function(record, prevRecord, index) {
                null !== this._unlinkedRecords && this._unlinkedRecords.remove(record);
                var prev = record._prevRemoved, next = record._nextRemoved;
                return null === prev ? this._removalsHead = next : prev._nextRemoved = next, null === next ? this._removalsTail = prev : next._prevRemoved = prev, 
                this._insertAfter(record, prevRecord, index), this._addToMoves(record, index), record;
            }, DefaultIterableDiffer.prototype._moveAfter = function(record, prevRecord, index) {
                return this._unlink(record), this._insertAfter(record, prevRecord, index), this._addToMoves(record, index), 
                record;
            }, DefaultIterableDiffer.prototype._addAfter = function(record, prevRecord, index) {
                return this._insertAfter(record, prevRecord, index), this._additionsTail = null === this._additionsTail ? this._additionsHead = record : this._additionsTail._nextAdded = record, 
                record;
            }, DefaultIterableDiffer.prototype._insertAfter = function(record, prevRecord, index) {
                var next = null === prevRecord ? this._itHead : prevRecord._next;
                return record._next = next, record._prev = prevRecord, null === next ? this._itTail = record : next._prev = record, 
                null === prevRecord ? this._itHead = record : prevRecord._next = record, null === this._linkedRecords && (this._linkedRecords = new _DuplicateMap()), 
                this._linkedRecords.put(record), record.currentIndex = index, record;
            }, DefaultIterableDiffer.prototype._remove = function(record) {
                return this._addToRemovals(this._unlink(record));
            }, DefaultIterableDiffer.prototype._unlink = function(record) {
                null !== this._linkedRecords && this._linkedRecords.remove(record);
                var prev = record._prev, next = record._next;
                return null === prev ? this._itHead = next : prev._next = next, null === next ? this._itTail = prev : next._prev = prev, 
                record;
            }, DefaultIterableDiffer.prototype._addToMoves = function(record, toIndex) {
                return record.previousIndex === toIndex ? record : (this._movesTail = null === this._movesTail ? this._movesHead = record : this._movesTail._nextMoved = record, 
                record);
            }, DefaultIterableDiffer.prototype._addToRemovals = function(record) {
                return null === this._unlinkedRecords && (this._unlinkedRecords = new _DuplicateMap()), 
                this._unlinkedRecords.put(record), record.currentIndex = null, record._nextRemoved = null, 
                null === this._removalsTail ? (this._removalsTail = this._removalsHead = record, 
                record._prevRemoved = null) : (record._prevRemoved = this._removalsTail, this._removalsTail = this._removalsTail._nextRemoved = record), 
                record;
            }, DefaultIterableDiffer.prototype._addIdentityChange = function(record, item) {
                return record.item = item, this._identityChangesTail = null === this._identityChangesTail ? this._identityChangesHead = record : this._identityChangesTail._nextIdentityChange = record, 
                record;
            }, DefaultIterableDiffer;
        }(), IterableChangeRecord_ = function() {
            return function(item, trackById) {
                this.item = item, this.trackById = trackById, this.currentIndex = null, this.previousIndex = null, 
                this._nextPrevious = null, this._prev = null, this._next = null, this._prevDup = null, 
                this._nextDup = null, this._prevRemoved = null, this._nextRemoved = null, this._nextAdded = null, 
                this._nextMoved = null, this._nextIdentityChange = null;
            };
        }(), _DuplicateItemRecordList = function() {
            function _DuplicateItemRecordList() {
                this._head = null, this._tail = null;
            }
            return _DuplicateItemRecordList.prototype.add = function(record) {
                null === this._head ? (this._head = this._tail = record, record._nextDup = null, 
                record._prevDup = null) : (this._tail._nextDup = record, record._prevDup = this._tail, 
                record._nextDup = null, this._tail = record);
            }, _DuplicateItemRecordList.prototype.get = function(trackById, atOrAfterIndex) {
                var record;
                for (record = this._head; null !== record; record = record._nextDup) if ((null === atOrAfterIndex || atOrAfterIndex <= record.currentIndex) && looseIdentical(record.trackById, trackById)) return record;
                return null;
            }, _DuplicateItemRecordList.prototype.remove = function(record) {
                var prev = record._prevDup, next = record._nextDup;
                return null === prev ? this._head = next : prev._nextDup = next, null === next ? this._tail = prev : next._prevDup = prev, 
                null === this._head;
            }, _DuplicateItemRecordList;
        }(), _DuplicateMap = function() {
            function _DuplicateMap() {
                this.map = new Map();
            }
            return _DuplicateMap.prototype.put = function(record) {
                var key = record.trackById, duplicates = this.map.get(key);
                duplicates || (duplicates = new _DuplicateItemRecordList(), this.map.set(key, duplicates)), 
                duplicates.add(record);
            }, _DuplicateMap.prototype.get = function(trackById, atOrAfterIndex) {
                var recordList = this.map.get(trackById);
                return recordList ? recordList.get(trackById, atOrAfterIndex) : null;
            }, _DuplicateMap.prototype.remove = function(record) {
                var key = record.trackById;
                return this.map.get(key).remove(record) && this.map.delete(key), record;
            }, Object.defineProperty(_DuplicateMap.prototype, "isEmpty", {
                get: function() {
                    return 0 === this.map.size;
                },
                enumerable: !0,
                configurable: !0
            }), _DuplicateMap.prototype.clear = function() {
                this.map.clear();
            }, _DuplicateMap;
        }();
        function getPreviousIndex(item, addRemoveOffset, moveOffsets) {
            var previousIndex = item.previousIndex;
            if (null === previousIndex) return previousIndex;
            var moveOffset = 0;
            return moveOffsets && previousIndex < moveOffsets.length && (moveOffset = moveOffsets[previousIndex]), 
            previousIndex + addRemoveOffset + moveOffset;
        }
        var DefaultKeyValueDifferFactory = function() {
            function DefaultKeyValueDifferFactory() {}
            return DefaultKeyValueDifferFactory.prototype.supports = function(obj) {
                return obj instanceof Map || isJsObject(obj);
            }, DefaultKeyValueDifferFactory.prototype.create = function() {
                return new DefaultKeyValueDiffer();
            }, DefaultKeyValueDifferFactory;
        }(), DefaultKeyValueDiffer = function() {
            function DefaultKeyValueDiffer() {
                this._records = new Map(), this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, 
                this._changesHead = null, this._changesTail = null, this._additionsHead = null, 
                this._additionsTail = null, this._removalsHead = null, this._removalsTail = null;
            }
            return Object.defineProperty(DefaultKeyValueDiffer.prototype, "isDirty", {
                get: function() {
                    return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead;
                },
                enumerable: !0,
                configurable: !0
            }), DefaultKeyValueDiffer.prototype.forEachItem = function(fn) {
                var record;
                for (record = this._mapHead; null !== record; record = record._next) fn(record);
            }, DefaultKeyValueDiffer.prototype.forEachPreviousItem = function(fn) {
                var record;
                for (record = this._previousMapHead; null !== record; record = record._nextPrevious) fn(record);
            }, DefaultKeyValueDiffer.prototype.forEachChangedItem = function(fn) {
                var record;
                for (record = this._changesHead; null !== record; record = record._nextChanged) fn(record);
            }, DefaultKeyValueDiffer.prototype.forEachAddedItem = function(fn) {
                var record;
                for (record = this._additionsHead; null !== record; record = record._nextAdded) fn(record);
            }, DefaultKeyValueDiffer.prototype.forEachRemovedItem = function(fn) {
                var record;
                for (record = this._removalsHead; null !== record; record = record._nextRemoved) fn(record);
            }, DefaultKeyValueDiffer.prototype.diff = function(map) {
                if (map) {
                    if (!(map instanceof Map || isJsObject(map))) throw new Error("Error trying to diff '" + stringify(map) + "'. Only maps and objects are allowed");
                } else map = new Map();
                return this.check(map) ? this : null;
            }, DefaultKeyValueDiffer.prototype.onDestroy = function() {}, DefaultKeyValueDiffer.prototype.check = function(map) {
                var _this = this;
                this._reset();
                var insertBefore = this._mapHead;
                if (this._appendAfter = null, this._forEach(map, function(value, key) {
                    if (insertBefore && insertBefore.key === key) _this._maybeAddToChanges(insertBefore, value), 
                    _this._appendAfter = insertBefore, insertBefore = insertBefore._next; else {
                        var record = _this._getOrCreateRecordForKey(key, value);
                        insertBefore = _this._insertBeforeOrAppend(insertBefore, record);
                    }
                }), insertBefore) {
                    insertBefore._prev && (insertBefore._prev._next = null), this._removalsHead = insertBefore;
                    for (var record = insertBefore; null !== record; record = record._nextRemoved) record === this._mapHead && (this._mapHead = null), 
                    this._records.delete(record.key), record._nextRemoved = record._next, record.previousValue = record.currentValue, 
                    record.currentValue = null, record._prev = null, record._next = null;
                }
                return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), 
                this.isDirty;
            }, DefaultKeyValueDiffer.prototype._insertBeforeOrAppend = function(before, record) {
                if (before) {
                    var prev = before._prev;
                    return record._next = before, record._prev = prev, before._prev = record, prev && (prev._next = record), 
                    before === this._mapHead && (this._mapHead = record), this._appendAfter = before, 
                    before;
                }
                return this._appendAfter ? (this._appendAfter._next = record, record._prev = this._appendAfter) : this._mapHead = record, 
                this._appendAfter = record, null;
            }, DefaultKeyValueDiffer.prototype._getOrCreateRecordForKey = function(key, value) {
                if (this._records.has(key)) {
                    var record_1 = this._records.get(key);
                    this._maybeAddToChanges(record_1, value);
                    var prev = record_1._prev, next = record_1._next;
                    return prev && (prev._next = next), next && (next._prev = prev), record_1._next = null, 
                    record_1._prev = null, record_1;
                }
                var record = new KeyValueChangeRecord_(key);
                return this._records.set(key, record), record.currentValue = value, this._addToAdditions(record), 
                record;
            }, DefaultKeyValueDiffer.prototype._reset = function() {
                if (this.isDirty) {
                    var record = void 0;
                    for (this._previousMapHead = this._mapHead, record = this._previousMapHead; null !== record; record = record._next) record._nextPrevious = record._next;
                    for (record = this._changesHead; null !== record; record = record._nextChanged) record.previousValue = record.currentValue;
                    for (record = this._additionsHead; null != record; record = record._nextAdded) record.previousValue = record.currentValue;
                    this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, 
                    this._removalsHead = null;
                }
            }, DefaultKeyValueDiffer.prototype._maybeAddToChanges = function(record, newValue) {
                looseIdentical(newValue, record.currentValue) || (record.previousValue = record.currentValue, 
                record.currentValue = newValue, this._addToChanges(record));
            }, DefaultKeyValueDiffer.prototype._addToAdditions = function(record) {
                null === this._additionsHead ? this._additionsHead = this._additionsTail = record : (this._additionsTail._nextAdded = record, 
                this._additionsTail = record);
            }, DefaultKeyValueDiffer.prototype._addToChanges = function(record) {
                null === this._changesHead ? this._changesHead = this._changesTail = record : (this._changesTail._nextChanged = record, 
                this._changesTail = record);
            }, DefaultKeyValueDiffer.prototype._forEach = function(obj, fn) {
                obj instanceof Map ? obj.forEach(fn) : Object.keys(obj).forEach(function(k) {
                    return fn(obj[k], k);
                });
            }, DefaultKeyValueDiffer;
        }(), KeyValueChangeRecord_ = function() {
            return function(key) {
                this.key = key, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, 
                this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, 
                this._nextChanged = null;
            };
        }(), IterableDiffers = function() {
            function IterableDiffers(factories) {
                this.factories = factories;
            }
            return IterableDiffers.create = function(factories, parent) {
                if (null != parent) {
                    var copied = parent.factories.slice();
                    factories = factories.concat(copied);
                }
                return new IterableDiffers(factories);
            }, IterableDiffers.extend = function(factories) {
                return {
                    provide: IterableDiffers,
                    useFactory: function(parent) {
                        if (!parent) throw new Error("Cannot extend IterableDiffers without a parent injector");
                        return IterableDiffers.create(factories, parent);
                    },
                    deps: [ [ IterableDiffers, new SkipSelf(), new Optional() ] ]
                };
            }, IterableDiffers.prototype.find = function(iterable) {
                var type, factory = this.factories.find(function(f) {
                    return f.supports(iterable);
                });
                if (null != factory) return factory;
                throw new Error("Cannot find a differ supporting object '" + iterable + "' of type '" + ((type = iterable).name || typeof type) + "'");
            }, IterableDiffers.ngInjectableDef = defineInjectable({
                providedIn: "root",
                factory: function() {
                    return new IterableDiffers([ new DefaultIterableDifferFactory() ]);
                }
            }), IterableDiffers;
        }(), KeyValueDiffers = function() {
            function KeyValueDiffers(factories) {
                this.factories = factories;
            }
            return KeyValueDiffers.create = function(factories, parent) {
                if (parent) {
                    var copied = parent.factories.slice();
                    factories = factories.concat(copied);
                }
                return new KeyValueDiffers(factories);
            }, KeyValueDiffers.extend = function(factories) {
                return {
                    provide: KeyValueDiffers,
                    useFactory: function(parent) {
                        if (!parent) throw new Error("Cannot extend KeyValueDiffers without a parent injector");
                        return KeyValueDiffers.create(factories, parent);
                    },
                    deps: [ [ KeyValueDiffers, new SkipSelf(), new Optional() ] ]
                };
            }, KeyValueDiffers.prototype.find = function(kv) {
                var factory = this.factories.find(function(f) {
                    return f.supports(kv);
                });
                if (factory) return factory;
                throw new Error("Cannot find a differ supporting object '" + kv + "'");
            }, KeyValueDiffers.ngInjectableDef = defineInjectable({
                providedIn: "root",
                factory: function() {
                    return new KeyValueDiffers([ new DefaultKeyValueDifferFactory() ]);
                }
            }), KeyValueDiffers;
        }(), keyValDiff = [ new DefaultKeyValueDifferFactory() ], defaultIterableDiffers = new IterableDiffers([ new DefaultIterableDifferFactory() ]), defaultKeyValueDiffers = new KeyValueDiffers(keyValDiff), NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {}, ComponentFactoryResolver$1 = function(_super) {
            function ComponentFactoryResolver(ngModule) {
                var _this = _super.call(this) || this;
                return _this.ngModule = ngModule, _this;
            }
            return __extends(ComponentFactoryResolver, _super), ComponentFactoryResolver.prototype.resolveComponentFactory = function(component) {
                var componentDef = getComponentDef(component);
                return new ComponentFactory$1(componentDef, this.ngModule);
            }, ComponentFactoryResolver;
        }(core_ComponentFactoryResolver);
        function toRefArray(map) {
            var array = [];
            for (var nonMinified in map) map.hasOwnProperty(nonMinified) && array.push({
                propName: map[nonMinified],
                templateName: nonMinified
            });
            return array;
        }
        var ROOT_CONTEXT = new InjectionToken("ROOT_CONTEXT_TOKEN", {
            providedIn: "root",
            factory: function() {
                return createRootContext(inject(SCHEDULER));
            }
        }), SCHEDULER = new InjectionToken("SCHEDULER_TOKEN", {
            providedIn: "root",
            factory: function() {
                return defaultScheduler;
            }
        }), ComponentFactory$1 = function(_super) {
            function ComponentFactory(componentDef, ngModule) {
                var _this = _super.call(this) || this;
                return _this.componentDef = componentDef, _this.ngModule = ngModule, _this.componentType = componentDef.type, 
                _this.selector = componentDef.selectors[0][0], _this.ngContentSelectors = componentDef.ngContentSelectors ? __spread([ "*" ], componentDef.ngContentSelectors) : [], 
                _this.isBoundToModule = !!ngModule, _this;
            }
            return __extends(ComponentFactory, _super), Object.defineProperty(ComponentFactory.prototype, "inputs", {
                get: function() {
                    return toRefArray(this.componentDef.inputs);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ComponentFactory.prototype, "outputs", {
                get: function() {
                    return toRefArray(this.componentDef.outputs);
                },
                enumerable: !0,
                configurable: !0
            }), ComponentFactory.prototype.create = function(injector, projectableNodes, rootSelectorOrNode, ngModule) {
                var elementOrSelector, defaultRenderer, name, rendererToUse, namespace, isInternalRootView = void 0 === rootSelectorOrNode, rootViewInjector = (ngModule = ngModule || this.ngModule) ? function(rootViewInjector, moduleInjector) {
                    return {
                        get: function(token, notFoundValue, flags) {
                            var value = rootViewInjector.get(token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR, flags);
                            return value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR || notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ? value : moduleInjector.get(token, notFoundValue, flags);
                        }
                    };
                }(injector, ngModule.injector) : injector, rendererFactory = rootViewInjector.get(RendererFactory2, domRendererFactory3), sanitizer = rootViewInjector.get(Sanitizer, null), hostRNode = isInternalRootView ? (name = this.selector, 
                rendererToUse = rendererFactory.createRenderer(null, this.componentDef) || getLView()[RENDERER], 
                namespace = _currentNamespace, isProceduralRenderer(rendererToUse) ? rendererToUse.createElement(name, namespace) : null === namespace ? rendererToUse.createElement(name) : rendererToUse.createElementNS(namespace, name)) : (elementOrSelector = rootSelectorOrNode, 
                defaultRenderer = rendererFactory.createRenderer(null, null), "string" == typeof elementOrSelector ? isProceduralRenderer(defaultRenderer) ? defaultRenderer.selectRootElement(elementOrSelector) : defaultRenderer.querySelector(elementOrSelector) : elementOrSelector), rootFlags = this.componentDef.onPush ? 576 : 528, rootContext = isInternalRootView ? createRootContext() : rootViewInjector.get(ROOT_CONTEXT), renderer = rendererFactory.createRenderer(hostRNode, this.componentDef);
                rootSelectorOrNode && hostRNode && (isProceduralRenderer(renderer) ? renderer.setAttribute(hostRNode, "ng-version", VERSION.full) : hostRNode.setAttribute("ng-version", VERSION.full));
                var component, tElementNode, lView, lViewOrLContainer, rootLView = createLView(null, createTView(-1, null, 1, 0, null, null, null, null), rootContext, rootFlags, null, null, rendererFactory, renderer, sanitizer, rootViewInjector), oldLView = enterView(rootLView, null);
                try {
                    var componentView = createRootComponentView(hostRNode, this.componentDef, rootLView, rendererFactory, renderer);
                    tElementNode = getTNode(0, rootLView), projectableNodes && (tElementNode.projection = projectableNodes.map(function(nodesforSlot) {
                        return Array.from(nodesforSlot);
                    })), component = function(componentView, componentDef, rootView, rootContext, hostFeatures) {
                        var tView = rootView[TVIEW], component = function(tView, viewData, def) {
                            var rootTNode = getPreviousOrParentTNode();
                            tView.firstTemplatePass && (def.providersResolver && def.providersResolver(def), 
                            function(tView, tNode, directiveCount) {
                                var elementIndex = -(rootTNode.index - HEADER_OFFSET), providerCount = tView.data.length - (65535 & rootTNode.providerIndexes);
                                (tView.expandoInstructions || (tView.expandoInstructions = [])).push(elementIndex, providerCount, 1);
                            }(tView), function(tView, viewData, def, directiveFactory) {
                                tView.data.push(def);
                                var nodeInjectorFactory = new NodeInjectorFactory(directiveFactory, isComponentDef(def), null);
                                tView.blueprint.push(nodeInjectorFactory), viewData.push(nodeInjectorFactory);
                            }(tView, viewData, def, def.factory));
                            var directive = getNodeInjectable(tView.data, viewData, viewData.length - 1, rootTNode);
                            return function(lView, previousOrParentTNode, directive) {
                                var native = getNativeByTNode(rootTNode, lView);
                                attachPatchData(directive, lView), native && attachPatchData(native, lView);
                            }(viewData, 0, directive), directive;
                        }(tView, rootView, componentDef);
                        rootContext.components.push(component), componentView[CONTEXT] = component, hostFeatures && hostFeatures.forEach(function(feature) {
                            return feature(component, componentDef);
                        }), componentDef.contentQueries && componentDef.contentQueries(1, component, rootView.length - 1);
                        var def, expando, directive, firstTemplatePass, previousExpandoLength, elementIndex, rootTNode = getPreviousOrParentTNode();
                        if (tView.firstTemplatePass && componentDef.hostBindings && (def = componentDef, 
                        directive = component, firstTemplatePass = tView.firstTemplatePass, previousExpandoLength = (expando = tView.expandoInstructions).length, 
                        setActiveHost(0, elementIndex = rootTNode.index - HEADER_OFFSET), def.hostBindings(1, directive, elementIndex), 
                        setActiveHost(), previousExpandoLength === expando.length && firstTemplatePass && expando.push(def.hostBindings), 
                        rootTNode.onElementCreationFns && function(tNode) {
                            var fns;
                            if (fns = tNode.onElementCreationFns) {
                                for (var i = 0; i < fns.length; i++) fns[i]();
                                tNode.onElementCreationFns = null;
                            }
                        }(rootTNode)), rootTNode.stylingTemplate) {
                            var native = componentView[HOST];
                            (function(element, context, renderer, startIndex) {
                                for (var initialClasses = rootTNode.stylingTemplate[4], i = 2; i < initialClasses.length; ) initialClasses[i + 1] && setClass(element, initialClasses[i + 0], !0, renderer, null), 
                                i += 3;
                            })(native, 0, componentView[RENDERER]), function(element, context, renderer, startIndex) {
                                for (var initialStyles = rootTNode.stylingTemplate[3], i = 2; i < initialStyles.length; ) {
                                    var value = initialStyles[i + 1];
                                    value && setStyle(element, initialStyles[i + 0], value, renderer, null), i += 3;
                                }
                            }(native, 0, componentView[RENDERER]);
                        }
                        return component;
                    }(componentView, this.componentDef, rootLView, rootContext, [ LifecycleHooksFeature ]), 
                    lViewOrLContainer = componentView, (lView = rootLView)[CHILD_HEAD] ? lView[15][NEXT] = lViewOrLContainer : lView[CHILD_HEAD] = lViewOrLContainer, 
                    lView[15] = lViewOrLContainer, refreshDescendantViews(rootLView);
                } finally {
                    leaveView(oldLView);
                }
                var componentRef = new ComponentRef$1(this.componentType, component, createElementRef(ElementRef, tElementNode, rootLView), rootLView, tElementNode);
                return isInternalRootView && (componentRef.hostView._tViewNode.child = tElementNode), 
                componentRef;
            }, ComponentFactory;
        }(core_ComponentFactory), ComponentRef$1 = function(_super) {
            function ComponentRef(componentType, instance, location, _rootLView, _tNode) {
                var tView, lView, tNode, _this = _super.call(this) || this;
                return _this.location = location, _this._rootLView = _rootLView, _this._tNode = _tNode, 
                _this.destroyCbs = [], _this.instance = instance, _this.hostView = _this.changeDetectorRef = new core_RootViewRef(_rootLView), 
                _this.hostView._tViewNode = (null, -1, lView = _rootLView, null == (tNode = (tView = _rootLView[TVIEW]).node) && (tView.node = tNode = createTNode(null, 2, -1, null, null)), 
                lView[T_HOST] = tNode), _this.componentType = componentType, _this;
            }
            return __extends(ComponentRef, _super), Object.defineProperty(ComponentRef.prototype, "injector", {
                get: function() {
                    return new NodeInjector(this._tNode, this._rootLView);
                },
                enumerable: !0,
                configurable: !0
            }), ComponentRef.prototype.destroy = function() {
                this.destroyCbs.forEach(function(fn) {
                    return fn();
                }), this.destroyCbs = null, !this.hostView.destroyed && this.hostView.destroy();
            }, ComponentRef.prototype.onDestroy = function(callback) {
                this.destroyCbs.push(callback);
            }, ComponentRef;
        }(core_ComponentRef), COMPONENT_FACTORY_RESOLVER = {
            provide: core_ComponentFactoryResolver,
            useClass: ComponentFactoryResolver$1,
            deps: [ NgModuleRef ]
        }, core_NgModuleRef$1 = function(_super) {
            function NgModuleRef$1(ngModuleType, _parent) {
                var _this = _super.call(this) || this;
                _this._parent = _parent, _this._bootstrapComponents = [], _this.injector = _this, 
                _this.destroyCbs = [];
                var ngModuleDef = getNgModuleDef(ngModuleType);
                return _this._bootstrapComponents = maybeUnwrapFn(ngModuleDef.bootstrap), _this._r3Injector = function(defType, parent, additionalProviders, name) {
                    return void 0 === parent && (parent = null), void 0 === additionalProviders && (additionalProviders = null), 
                    parent = parent || getNullInjector(), new R3Injector(defType, additionalProviders, parent, name);
                }(ngModuleType, _parent, [ {
                    provide: NgModuleRef,
                    useValue: _this
                }, COMPONENT_FACTORY_RESOLVER ], stringify(ngModuleType)), _this.instance = _this.get(ngModuleType), 
                _this;
            }
            return __extends(NgModuleRef$1, _super), NgModuleRef$1.prototype.get = function(token, notFoundValue, injectFlags) {
                return void 0 === notFoundValue && (notFoundValue = Injector.THROW_IF_NOT_FOUND), 
                void 0 === injectFlags && (injectFlags = InjectFlags.Default), token === Injector || token === NgModuleRef || token === INJECTOR ? this : this._r3Injector.get(token, notFoundValue, injectFlags);
            }, Object.defineProperty(NgModuleRef$1.prototype, "componentFactoryResolver", {
                get: function() {
                    return this.get(core_ComponentFactoryResolver);
                },
                enumerable: !0,
                configurable: !0
            }), NgModuleRef$1.prototype.destroy = function() {
                var injector = this._r3Injector;
                !injector.destroyed && injector.destroy(), this.destroyCbs.forEach(function(fn) {
                    return fn();
                }), this.destroyCbs = null;
            }, NgModuleRef$1.prototype.onDestroy = function(callback) {
                this.destroyCbs.push(callback);
            }, NgModuleRef$1;
        }(NgModuleRef), NgModuleFactory$1 = function(_super) {
            function NgModuleFactory(moduleType) {
                var _this = _super.call(this) || this;
                return _this.moduleType = moduleType, _this;
            }
            return __extends(NgModuleFactory, _super), NgModuleFactory.prototype.create = function(parentInjector) {
                return new core_NgModuleRef$1(this.moduleType, parentInjector);
            }, NgModuleFactory;
        }(core_NgModuleFactory), core_EventEmitter = function(_super) {
            function EventEmitter(isAsync) {
                void 0 === isAsync && (isAsync = !1);
                var _this = _super.call(this) || this;
                return _this.__isAsync = isAsync, _this;
            }
            return __extends(EventEmitter, _super), EventEmitter.prototype.emit = function(value) {
                _super.prototype.next.call(this, value);
            }, EventEmitter.prototype.subscribe = function(generatorOrNext, error, complete) {
                var schedulerFn, errorFn = function(err) {
                    return null;
                }, completeFn = function() {
                    return null;
                };
                generatorOrNext && "object" == typeof generatorOrNext ? (schedulerFn = this.__isAsync ? function(value) {
                    setTimeout(function() {
                        return generatorOrNext.next(value);
                    });
                } : function(value) {
                    generatorOrNext.next(value);
                }, generatorOrNext.error && (errorFn = this.__isAsync ? function(err) {
                    setTimeout(function() {
                        return generatorOrNext.error(err);
                    });
                } : function(err) {
                    generatorOrNext.error(err);
                }), generatorOrNext.complete && (completeFn = this.__isAsync ? function() {
                    setTimeout(function() {
                        return generatorOrNext.complete();
                    });
                } : function() {
                    generatorOrNext.complete();
                })) : (schedulerFn = this.__isAsync ? function(value) {
                    setTimeout(function() {
                        return generatorOrNext(value);
                    });
                } : function(value) {
                    generatorOrNext(value);
                }, error && (errorFn = this.__isAsync ? function(err) {
                    setTimeout(function() {
                        return error(err);
                    });
                } : function(err) {
                    error(err);
                }), complete && (completeFn = this.__isAsync ? function() {
                    setTimeout(function() {
                        return complete();
                    });
                } : function() {
                    complete();
                }));
                var sink = _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
                return generatorOrNext instanceof Subscription_Subscription && generatorOrNext.add(sink), 
                sink;
            }, EventEmitter;
        }(Subject_Subject), APP_INITIALIZER = new InjectionToken("Application Initializer"), ApplicationInitStatus = function() {
            function ApplicationInitStatus(appInits) {
                var _this = this;
                this.appInits = appInits, this.initialized = !1, this.done = !1, this.donePromise = new Promise(function(res, rej) {
                    _this.resolve = res, _this.reject = rej;
                });
            }
            return ApplicationInitStatus.prototype.runInitializers = function() {
                var _this = this;
                if (!this.initialized) {
                    var asyncInitPromises = [], complete = function() {
                        _this.done = !0, _this.resolve();
                    };
                    if (this.appInits) for (var i = 0; i < this.appInits.length; i++) {
                        var initResult = this.appInits[i]();
                        core_isPromise(initResult) && asyncInitPromises.push(initResult);
                    }
                    Promise.all(asyncInitPromises).then(function() {
                        complete();
                    }).catch(function(e) {
                        _this.reject(e);
                    }), 0 === asyncInitPromises.length && complete(), this.initialized = !0;
                }
            }, ApplicationInitStatus.ngInjectableDef = defineInjectable({
                token: ApplicationInitStatus,
                factory: function(t) {
                    return new (t || ApplicationInitStatus)(inject(APP_INITIALIZER, 8));
                },
                providedIn: null
            }), ApplicationInitStatus;
        }(), APP_ID = new InjectionToken("AppId"), APP_ID_RANDOM_PROVIDER = {
            provide: APP_ID,
            useFactory: function() {
                return "" + _randomChar() + _randomChar() + _randomChar();
            },
            deps: []
        };
        function _randomChar() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()));
        }
        var trace, events, PLATFORM_INITIALIZER = new InjectionToken("Platform Initializer"), PLATFORM_ID = new InjectionToken("Platform ID"), APP_BOOTSTRAP_LISTENER = new InjectionToken("appBootstrapListener"), Console = function() {
            function Console() {}
            return Console.prototype.log = function(message) {
                console.log(message);
            }, Console.prototype.warn = function(message) {
                console.warn(message);
            }, Console.ngInjectableDef = defineInjectable({
                token: Console,
                factory: function(t) {
                    return new (t || Console)();
                },
                providedIn: null
            }), Console;
        }(), ModuleWithComponentFactories = function() {
            return function(ngModuleFactory, componentFactories) {
                this.ngModuleFactory = ngModuleFactory, this.componentFactories = componentFactories;
            };
        }(), Compiler_compileModuleSync__POST_R3__ = function(moduleType) {
            return new NgModuleFactory$1(moduleType);
        }, Compiler_compileModuleSync = Compiler_compileModuleSync__POST_R3__, Compiler_compileModuleAsync = function(moduleType) {
            return Promise.resolve(Compiler_compileModuleSync__POST_R3__(moduleType));
        }, Compiler_compileModuleAndAllComponentsSync__POST_R3__ = function(moduleType) {
            var ngModuleFactory = Compiler_compileModuleSync__POST_R3__(moduleType), componentFactories = maybeUnwrapFn(getNgModuleDef(moduleType).declarations).reduce(function(factories, declaration) {
                var componentDef = getComponentDef(declaration);
                return componentDef && factories.push(new ComponentFactory$1(componentDef)), factories;
            }, []);
            return new ModuleWithComponentFactories(ngModuleFactory, componentFactories);
        }, Compiler_compileModuleAndAllComponentsSync = Compiler_compileModuleAndAllComponentsSync__POST_R3__, Compiler_compileModuleAndAllComponentsAsync = function(moduleType) {
            return Promise.resolve(Compiler_compileModuleAndAllComponentsSync__POST_R3__(moduleType));
        }, Compiler = function() {
            function Compiler() {
                this.compileModuleSync = Compiler_compileModuleSync, this.compileModuleAsync = Compiler_compileModuleAsync, 
                this.compileModuleAndAllComponentsSync = Compiler_compileModuleAndAllComponentsSync, 
                this.compileModuleAndAllComponentsAsync = Compiler_compileModuleAndAllComponentsAsync;
            }
            return Compiler.prototype.clearCache = function() {}, Compiler.prototype.clearCacheFor = function(type) {}, 
            Compiler.prototype.getModuleId = function(moduleType) {}, Compiler.ngInjectableDef = defineInjectable({
                token: Compiler,
                factory: function(t) {
                    return new (t || Compiler)();
                },
                providedIn: null
            }), Compiler;
        }(), COMPILER_OPTIONS = new InjectionToken("compilerOptions");
        function detectWTF() {
            var wtf = _global.wtf;
            return !(!wtf || !(trace = wtf.trace) || (events = trace.events, 0));
        }
        var wtfEnabled = detectWTF();
        function noopScope(arg0, arg1) {
            return null;
        }
        var wtfCreateScope = wtfEnabled ? function(signature, flags) {
            return void 0 === flags && (flags = null), events.createScope(signature, flags);
        } : function(signature, flags) {
            return noopScope;
        }, wtfLeave = wtfEnabled ? function(scope, returnValue) {
            return trace.leaveScope(scope, returnValue), returnValue;
        } : function(s, r) {
            return r;
        }, core_promise = Promise.resolve(0);
        function scheduleMicroTask(fn) {
            "undefined" == typeof Zone ? core_promise.then(function() {
                fn && fn.apply(null, null);
            }) : Zone.current.scheduleMicroTask("scheduleMicrotask", fn);
        }
        var NgZone = function() {
            function NgZone(_a) {
                var zone, _b = _a.enableLongStackTrace, enableLongStackTrace = void 0 !== _b && _b;
                if (this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, 
                this.onUnstable = new core_EventEmitter(!1), this.onMicrotaskEmpty = new core_EventEmitter(!1), 
                this.onStable = new core_EventEmitter(!1), this.onError = new core_EventEmitter(!1), 
                "undefined" == typeof Zone) throw new Error("In this configuration Angular requires Zone.js");
                Zone.assertZonePatched(), this._nesting = 0, this._outer = this._inner = Zone.current, 
                Zone.wtfZoneSpec && (this._inner = this._inner.fork(Zone.wtfZoneSpec)), Zone.TaskTrackingZoneSpec && (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())), 
                enableLongStackTrace && Zone.longStackTraceZoneSpec && (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)), 
                (zone = this)._inner = zone._inner.fork({
                    name: "angular",
                    properties: {
                        isAngularZone: !0
                    },
                    onInvokeTask: function(delegate, current, target, task, applyThis, applyArgs) {
                        try {
                            return onEnter(zone), delegate.invokeTask(target, task, applyThis, applyArgs);
                        } finally {
                            onLeave(zone);
                        }
                    },
                    onInvoke: function(delegate, current, target, callback, applyThis, applyArgs, source) {
                        try {
                            return onEnter(zone), delegate.invoke(target, callback, applyThis, applyArgs, source);
                        } finally {
                            onLeave(zone);
                        }
                    },
                    onHasTask: function(delegate, current, target, hasTaskState) {
                        delegate.hasTask(target, hasTaskState), current === target && ("microTask" == hasTaskState.change ? (zone.hasPendingMicrotasks = hasTaskState.microTask, 
                        checkStable(zone)) : "macroTask" == hasTaskState.change && (zone.hasPendingMacrotasks = hasTaskState.macroTask));
                    },
                    onHandleError: function(delegate, current, target, error) {
                        return delegate.handleError(target, error), zone.runOutsideAngular(function() {
                            return zone.onError.emit(error);
                        }), !1;
                    }
                });
            }
            return NgZone.isInAngularZone = function() {
                return !0 === Zone.current.get("isAngularZone");
            }, NgZone.assertInAngularZone = function() {
                if (!NgZone.isInAngularZone()) throw new Error("Expected to be in Angular Zone, but it is not!");
            }, NgZone.assertNotInAngularZone = function() {
                if (NgZone.isInAngularZone()) throw new Error("Expected to not be in Angular Zone, but it is!");
            }, NgZone.prototype.run = function(fn, applyThis, applyArgs) {
                return this._inner.run(fn, applyThis, applyArgs);
            }, NgZone.prototype.runTask = function(fn, applyThis, applyArgs, name) {
                var zone = this._inner, task = zone.scheduleEventTask("NgZoneEvent: " + name, fn, EMPTY_PAYLOAD, noop$1, noop$1);
                try {
                    return zone.runTask(task, applyThis, applyArgs);
                } finally {
                    zone.cancelTask(task);
                }
            }, NgZone.prototype.runGuarded = function(fn, applyThis, applyArgs) {
                return this._inner.runGuarded(fn, applyThis, applyArgs);
            }, NgZone.prototype.runOutsideAngular = function(fn) {
                return this._outer.run(fn);
            }, NgZone;
        }();
        function noop$1() {}
        var EMPTY_PAYLOAD = {};
        function checkStable(zone) {
            if (0 == zone._nesting && !zone.hasPendingMicrotasks && !zone.isStable) try {
                zone._nesting++, zone.onMicrotaskEmpty.emit(null);
            } finally {
                if (zone._nesting--, !zone.hasPendingMicrotasks) try {
                    zone.runOutsideAngular(function() {
                        return zone.onStable.emit(null);
                    });
                } finally {
                    zone.isStable = !0;
                }
            }
        }
        function onEnter(zone) {
            zone._nesting++, zone.isStable && (zone.isStable = !1, zone.onUnstable.emit(null));
        }
        function onLeave(zone) {
            zone._nesting--, checkStable(zone);
        }
        var _platform, NoopNgZone = function() {
            function NoopNgZone() {
                this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, 
                this.onUnstable = new core_EventEmitter(), this.onMicrotaskEmpty = new core_EventEmitter(), 
                this.onStable = new core_EventEmitter(), this.onError = new core_EventEmitter();
            }
            return NoopNgZone.prototype.run = function(fn) {
                return fn();
            }, NoopNgZone.prototype.runGuarded = function(fn) {
                return fn();
            }, NoopNgZone.prototype.runOutsideAngular = function(fn) {
                return fn();
            }, NoopNgZone.prototype.runTask = function(fn) {
                return fn();
            }, NoopNgZone;
        }(), Testability = function() {
            function Testability(_ngZone) {
                var _this = this;
                this._ngZone = _ngZone, this._pendingCount = 0, this._isZoneStable = !0, this._didWork = !1, 
                this._callbacks = [], this.taskTrackingZone = null, this._watchAngularEvents(), 
                _ngZone.run(function() {
                    _this.taskTrackingZone = "undefined" == typeof Zone ? null : Zone.current.get("TaskTrackingZone");
                });
            }
            return Testability.prototype._watchAngularEvents = function() {
                var _this = this;
                this._ngZone.onUnstable.subscribe({
                    next: function() {
                        _this._didWork = !0, _this._isZoneStable = !1;
                    }
                }), this._ngZone.runOutsideAngular(function() {
                    _this._ngZone.onStable.subscribe({
                        next: function() {
                            NgZone.assertNotInAngularZone(), scheduleMicroTask(function() {
                                _this._isZoneStable = !0, _this._runCallbacksIfReady();
                            });
                        }
                    });
                });
            }, Testability.prototype.increasePendingRequestCount = function() {
                return this._pendingCount += 1, this._didWork = !0, this._pendingCount;
            }, Testability.prototype.decreasePendingRequestCount = function() {
                if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                return this._runCallbacksIfReady(), this._pendingCount;
            }, Testability.prototype.isStable = function() {
                return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks;
            }, Testability.prototype._runCallbacksIfReady = function() {
                var _this = this;
                if (this.isStable()) scheduleMicroTask(function() {
                    for (;0 !== _this._callbacks.length; ) {
                        var cb = _this._callbacks.pop();
                        clearTimeout(cb.timeoutId), cb.doneCb(_this._didWork);
                    }
                    _this._didWork = !1;
                }); else {
                    var pending_1 = this.getPendingTasks();
                    this._callbacks = this._callbacks.filter(function(cb) {
                        return !cb.updateCb || !cb.updateCb(pending_1) || (clearTimeout(cb.timeoutId), !1);
                    }), this._didWork = !0;
                }
            }, Testability.prototype.getPendingTasks = function() {
                return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(function(t) {
                    return {
                        source: t.source,
                        creationLocation: t.creationLocation,
                        data: t.data
                    };
                }) : [];
            }, Testability.prototype.addCallback = function(cb, timeout, updateCb) {
                var _this = this, timeoutId = -1;
                timeout && timeout > 0 && (timeoutId = setTimeout(function() {
                    _this._callbacks = _this._callbacks.filter(function(cb) {
                        return cb.timeoutId !== timeoutId;
                    }), cb(_this._didWork, _this.getPendingTasks());
                }, timeout)), this._callbacks.push({
                    doneCb: cb,
                    timeoutId: timeoutId,
                    updateCb: updateCb
                });
            }, Testability.prototype.whenStable = function(doneCb, timeout, updateCb) {
                if (updateCb && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?');
                this.addCallback(doneCb, timeout, updateCb), this._runCallbacksIfReady();
            }, Testability.prototype.getPendingRequestCount = function() {
                return this._pendingCount;
            }, Testability.prototype.findProviders = function(using, provider, exactMatch) {
                return [];
            }, Testability.ngInjectableDef = defineInjectable({
                token: Testability,
                factory: function(t) {
                    return new (t || Testability)(inject(NgZone));
                },
                providedIn: null
            }), Testability;
        }(), core_TestabilityRegistry = function() {
            function TestabilityRegistry() {
                this._applications = new Map(), _testabilityGetter.addToWindow(this);
            }
            return TestabilityRegistry.prototype.registerApplication = function(token, testability) {
                this._applications.set(token, testability);
            }, TestabilityRegistry.prototype.unregisterApplication = function(token) {
                this._applications.delete(token);
            }, TestabilityRegistry.prototype.unregisterAllApplications = function() {
                this._applications.clear();
            }, TestabilityRegistry.prototype.getTestability = function(elem) {
                return this._applications.get(elem) || null;
            }, TestabilityRegistry.prototype.getAllTestabilities = function() {
                return Array.from(this._applications.values());
            }, TestabilityRegistry.prototype.getAllRootElements = function() {
                return Array.from(this._applications.keys());
            }, TestabilityRegistry.prototype.findTestabilityInTree = function(elem, findInAncestors) {
                return void 0 === findInAncestors && (findInAncestors = !0), _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
            }, (TestabilityRegistry = function(decorators, target, key, desc) {
                var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            }([ __metadata("design:paramtypes", []) ], TestabilityRegistry)).ngInjectableDef = defineInjectable({
                token: TestabilityRegistry,
                factory: function(t) {
                    return new (t || TestabilityRegistry)();
                },
                providedIn: null
            }), TestabilityRegistry;
        }(), _testabilityGetter = new (function() {
            function _NoopGetTestability() {}
            return _NoopGetTestability.prototype.addToWindow = function(registry) {}, _NoopGetTestability.prototype.findTestabilityInTree = function(registry, elem, findInAncestors) {
                return null;
            }, _NoopGetTestability;
        }())(), ALLOW_MULTIPLE_PLATFORMS = new InjectionToken("AllowMultipleToken"), NgProbeToken = function() {
            return function(name, token) {
                this.name = name, this.token = token;
            };
        }();
        function createPlatformFactory(parentPlatformFactory, name, providers) {
            void 0 === providers && (providers = []);
            var desc = "Platform: " + name, marker = new InjectionToken(desc);
            return function(extraProviders) {
                void 0 === extraProviders && (extraProviders = []);
                var platform = getPlatform();
                if (!platform || platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, !1)) if (parentPlatformFactory) parentPlatformFactory(providers.concat(extraProviders).concat({
                    provide: marker,
                    useValue: !0
                })); else {
                    var injectedProviders = providers.concat(extraProviders).concat({
                        provide: marker,
                        useValue: !0
                    });
                    !function(injector) {
                        if (_platform && !_platform.destroyed && !_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, !1)) throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                        _platform = injector.get(PlatformRef);
                        var inits = injector.get(PLATFORM_INITIALIZER, null);
                        inits && inits.forEach(function(init) {
                            return init();
                        });
                    }(Injector.create({
                        providers: injectedProviders,
                        name: desc
                    }));
                }
                return function(requiredToken) {
                    var platform = getPlatform();
                    if (!platform) throw new Error("No platform exists!");
                    if (!platform.injector.get(requiredToken, null)) throw new Error("A platform with a different configuration has been created. Please destroy it first.");
                    return platform;
                }(marker);
            };
        }
        function getPlatform() {
            return _platform && !_platform.destroyed ? _platform : null;
        }
        var PlatformRef = function() {
            function PlatformRef(_injector) {
                this._injector = _injector, this._modules = [], this._destroyListeners = [], this._destroyed = !1;
            }
            return PlatformRef.prototype.bootstrapModuleFactory = function(moduleFactory, options) {
                var ngZoneOption, _this = this, ngZone = "noop" === (ngZoneOption = options ? options.ngZone : void 0) ? new NoopNgZone() : ("zone.js" === ngZoneOption ? void 0 : ngZoneOption) || new NgZone({
                    enableLongStackTrace: isDevMode()
                }), providers = [ {
                    provide: NgZone,
                    useValue: ngZone
                } ];
                return ngZone.run(function() {
                    var ngZoneInjector = Injector.create({
                        providers: providers,
                        parent: _this.injector,
                        name: moduleFactory.moduleType.name
                    }), moduleRef = moduleFactory.create(ngZoneInjector), exceptionHandler = moduleRef.injector.get(ErrorHandler, null);
                    if (!exceptionHandler) throw new Error("No ErrorHandler. Is platform module (BrowserModule) included?");
                    return moduleRef.onDestroy(function() {
                        return remove(_this._modules, moduleRef);
                    }), ngZone.runOutsideAngular(function() {
                        return ngZone.onError.subscribe({
                            next: function(error) {
                                exceptionHandler.handleError(error);
                            }
                        });
                    }), function(errorHandler, ngZone, callback) {
                        try {
                            var result = ((initStatus = moduleRef.injector.get(ApplicationInitStatus)).runInitializers(), 
                            initStatus.donePromise.then(function() {
                                return _this._moduleDoBootstrap(moduleRef), moduleRef;
                            }));
                            return core_isPromise(result) ? result.catch(function(e) {
                                throw ngZone.runOutsideAngular(function() {
                                    return errorHandler.handleError(e);
                                }), e;
                            }) : result;
                        } catch (e) {
                            throw ngZone.runOutsideAngular(function() {
                                return errorHandler.handleError(e);
                            }), e;
                        }
                        var initStatus;
                    }(exceptionHandler, ngZone);
                });
            }, PlatformRef.prototype.bootstrapModule = function(moduleType, compilerOptions) {
                var _this = this;
                void 0 === compilerOptions && (compilerOptions = []);
                var options = optionsReducer({}, compilerOptions);
                return function(injector, options, moduleType) {
                    var moduleFactory = new NgModuleFactory$1(moduleType);
                    if (0 === componentResourceResolutionQueue.size) return Promise.resolve(moduleFactory);
                    var parts, result, compilerProviders = (parts = injector.get(COMPILER_OPTIONS, []).concat(options).map(function(o) {
                        return o.providers;
                    }), result = [], parts.forEach(function(part) {
                        return part && result.push.apply(result, __spread(part));
                    }), result);
                    if (0 === compilerProviders.length) return Promise.resolve(moduleFactory);
                    var compiler = function() {
                        var globalNg = _global.ng;
                        if (!globalNg || !globalNg.\u0275compilerFacade) throw new Error("Angular JIT compilation failed: '@angular/compiler' not loaded!\n  - JIT compilation is discouraged for production use-cases! Consider AOT mode instead.\n  - Did you bootstrap using '@angular/platform-browser-dynamic' or '@angular/platform-server'?\n  - Alternatively provide the compiler with 'import \"@angular/compiler\";' before bootstrapping.");
                        return globalNg.\u0275compilerFacade;
                    }(), resourceLoader = Injector.create({
                        providers: compilerProviders
                    }).get(compiler.ResourceLoader);
                    return function(resourceResolver) {
                        var componentResolved = [], urlMap = new Map();
                        function cachedResourceResolve(url) {
                            var promise = urlMap.get(url);
                            if (!promise) {
                                var resp = resourceResolver(url);
                                urlMap.set(url, promise = resp.then(unwrapResponse));
                            }
                            return promise;
                        }
                        return componentResourceResolutionQueue.forEach(function(component, type) {
                            var promises = [];
                            component.templateUrl && promises.push(cachedResourceResolve(component.templateUrl).then(function(template) {
                                component.template = template;
                            }));
                            var styleUrls = component.styleUrls, styles = component.styles || (component.styles = []), styleOffset = component.styles.length;
                            styleUrls && styleUrls.forEach(function(styleUrl, index) {
                                styles.push(""), promises.push(cachedResourceResolve(styleUrl).then(function(style) {
                                    styles[styleOffset + index] = style, styleUrls.splice(styleUrls.indexOf(styleUrl), 1), 
                                    0 == styleUrls.length && (component.styleUrls = void 0);
                                }));
                            });
                            var fullyResolved = Promise.all(promises).then(function() {
                                return function(type) {
                                    componentDefPendingResolution.delete(type);
                                }(type);
                            });
                            componentResolved.push(fullyResolved);
                        }), componentResourceResolutionQueue = new Map(), Promise.all(componentResolved).then(function() {});
                    }(function(url) {
                        return Promise.resolve(resourceLoader.get(url));
                    }).then(function() {
                        return moduleFactory;
                    });
                }(this.injector, options, moduleType).then(function(moduleFactory) {
                    return _this.bootstrapModuleFactory(moduleFactory, options);
                });
            }, PlatformRef.prototype._moduleDoBootstrap = function(moduleRef) {
                var appRef = moduleRef.injector.get(core_ApplicationRef);
                if (moduleRef._bootstrapComponents.length > 0) moduleRef._bootstrapComponents.forEach(function(f) {
                    return appRef.bootstrap(f);
                }); else {
                    if (!moduleRef.instance.ngDoBootstrap) throw new Error("The module " + stringify(moduleRef.instance.constructor) + ' was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.');
                    moduleRef.instance.ngDoBootstrap(appRef);
                }
                this._modules.push(moduleRef);
            }, PlatformRef.prototype.onDestroy = function(callback) {
                this._destroyListeners.push(callback);
            }, Object.defineProperty(PlatformRef.prototype, "injector", {
                get: function() {
                    return this._injector;
                },
                enumerable: !0,
                configurable: !0
            }), PlatformRef.prototype.destroy = function() {
                if (this._destroyed) throw new Error("The platform has already been destroyed!");
                this._modules.slice().forEach(function(module) {
                    return module.destroy();
                }), this._destroyListeners.forEach(function(listener) {
                    return listener();
                }), this._destroyed = !0;
            }, Object.defineProperty(PlatformRef.prototype, "destroyed", {
                get: function() {
                    return this._destroyed;
                },
                enumerable: !0,
                configurable: !0
            }), PlatformRef.ngInjectableDef = defineInjectable({
                token: PlatformRef,
                factory: function(t) {
                    return new (t || PlatformRef)(inject(Injector));
                },
                providedIn: null
            }), PlatformRef;
        }();
        function optionsReducer(dst, objs) {
            return Array.isArray(objs) ? objs.reduce(optionsReducer, dst) : __assign({}, dst, objs);
        }
        var core_ApplicationRef = function() {
            function ApplicationRef(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus) {
                var _this = this;
                this._zone = _zone, this._console = _console, this._injector = _injector, this._exceptionHandler = _exceptionHandler, 
                this._componentFactoryResolver = _componentFactoryResolver, this._initStatus = _initStatus, 
                this._bootstrapListeners = [], this._views = [], this._runningTick = !1, this._enforceNoNewChanges = !1, 
                this._stable = !0, this.componentTypes = [], this.components = [], this._enforceNoNewChanges = isDevMode(), 
                this._zone.onMicrotaskEmpty.subscribe({
                    next: function() {
                        _this._zone.run(function() {
                            _this.tick();
                        });
                    }
                });
                var isCurrentlyStable = new Observable_Observable(function(observer) {
                    _this._stable = _this._zone.isStable && !_this._zone.hasPendingMacrotasks && !_this._zone.hasPendingMicrotasks, 
                    _this._zone.runOutsideAngular(function() {
                        observer.next(_this._stable), observer.complete();
                    });
                }), isStable = new Observable_Observable(function(observer) {
                    var stableSub;
                    _this._zone.runOutsideAngular(function() {
                        stableSub = _this._zone.onStable.subscribe(function() {
                            NgZone.assertNotInAngularZone(), scheduleMicroTask(function() {
                                _this._stable || _this._zone.hasPendingMacrotasks || _this._zone.hasPendingMicrotasks || (_this._stable = !0, 
                                observer.next(!0));
                            });
                        });
                    });
                    var unstableSub = _this._zone.onUnstable.subscribe(function() {
                        NgZone.assertInAngularZone(), _this._stable && (_this._stable = !1, _this._zone.runOutsideAngular(function() {
                            observer.next(!1);
                        }));
                    });
                    return function() {
                        stableSub.unsubscribe(), unstableSub.unsubscribe();
                    };
                });
                this.isStable = function() {
                    for (var observables = [], _i = 0; _i < arguments.length; _i++) observables[_i] = arguments[_i];
                    var value, concurrent = Number.POSITIVE_INFINITY, scheduler = null, last = observables[observables.length - 1];
                    return (value = last) && "function" == typeof value.schedule ? (scheduler = observables.pop(), 
                    observables.length > 1 && "number" == typeof observables[observables.length - 1] && (concurrent = observables.pop())) : "number" == typeof last && (concurrent = observables.pop()), 
                    null === scheduler && 1 === observables.length && observables[0] instanceof Observable_Observable ? observables[0] : function(concurrent) {
                        return void 0 === concurrent && (concurrent = Number.POSITIVE_INFINITY), function mergeMap(project, resultSelector, concurrent) {
                            return void 0 === concurrent && (concurrent = Number.POSITIVE_INFINITY), "function" == typeof resultSelector ? function(source) {
                                return source.pipe(mergeMap(function(a, i) {
                                    return (input = project(a, i), input instanceof Observable_Observable ? input : new Observable_Observable(subscribeTo(input))).pipe(function(project, thisArg) {
                                        return function(source) {
                                            return source.lift(new MapOperator(project, void 0));
                                        };
                                    }(function(b, ii) {
                                        return resultSelector(a, b, i, ii);
                                    }));
                                    var input;
                                }, concurrent));
                            } : ("number" == typeof resultSelector && (concurrent = resultSelector), function(source) {
                                return source.lift(new MergeMapOperator(project, concurrent));
                            });
                        }(identity, concurrent);
                    }(concurrent)(fromArray(observables, scheduler));
                }(isCurrentlyStable, isStable.pipe(function(source) {
                    return refCount()((subjectOrSubjectFactory = shareSubjectFactory, function(source) {
                        var subjectFactory;
                        subjectFactory = "function" == typeof subjectOrSubjectFactory ? subjectOrSubjectFactory : function() {
                            return subjectOrSubjectFactory;
                        };
                        var connectable = Object.create(source, connectableObservableDescriptor);
                        return connectable.source = source, connectable.subjectFactory = subjectFactory, 
                        connectable;
                    })(source));
                    var subjectOrSubjectFactory;
                }));
            }
            var ApplicationRef_1;
            return ApplicationRef_1 = ApplicationRef, ApplicationRef.prototype.bootstrap = function(componentOrFactory, rootSelectorOrNode) {
                var componentFactory, _this = this;
                if (!this._initStatus.done) throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                componentFactory = componentOrFactory instanceof core_ComponentFactory ? componentOrFactory : this._componentFactoryResolver.resolveComponentFactory(componentOrFactory), 
                this.componentTypes.push(componentFactory.componentType);
                var ngModule = componentFactory.isBoundToModule ? null : this._injector.get(NgModuleRef), compRef = componentFactory.create(Injector.NULL, [], rootSelectorOrNode || componentFactory.selector, ngModule);
                compRef.onDestroy(function() {
                    _this._unloadComponent(compRef);
                });
                var testability = compRef.injector.get(Testability, null);
                return testability && compRef.injector.get(core_TestabilityRegistry).registerApplication(compRef.location.nativeElement, testability), 
                this._loadComponent(compRef), isDevMode() && this._console.log("Angular is running in the development mode. Call enableProdMode() to enable the production mode."), 
                compRef;
            }, ApplicationRef.prototype.tick = function() {
                var e_1, _a, e_2, _b, _this = this;
                if (this._runningTick) throw new Error("ApplicationRef.tick is called recursively");
                var scope = ApplicationRef_1._tickScope();
                try {
                    this._runningTick = !0;
                    try {
                        for (var _c = __values(this._views), _d = _c.next(); !_d.done; _d = _c.next()) _d.value.detectChanges();
                    } catch (e_1_1) {
                        e_1 = {
                            error: e_1_1
                        };
                    } finally {
                        try {
                            _d && !_d.done && (_a = _c.return) && _a.call(_c);
                        } finally {
                            if (e_1) throw e_1.error;
                        }
                    }
                    if (this._enforceNoNewChanges) try {
                        for (var _e = __values(this._views), _f = _e.next(); !_f.done; _f = _e.next()) _f.value.checkNoChanges();
                    } catch (e_2_1) {
                        e_2 = {
                            error: e_2_1
                        };
                    } finally {
                        try {
                            _f && !_f.done && (_b = _e.return) && _b.call(_e);
                        } finally {
                            if (e_2) throw e_2.error;
                        }
                    }
                } catch (e) {
                    this._zone.runOutsideAngular(function() {
                        return _this._exceptionHandler.handleError(e);
                    });
                } finally {
                    this._runningTick = !1, wtfLeave(scope);
                }
            }, ApplicationRef.prototype.attachView = function(viewRef) {
                var view = viewRef;
                this._views.push(view), view.attachToAppRef(this);
            }, ApplicationRef.prototype.detachView = function(viewRef) {
                var view = viewRef;
                remove(this._views, view), view.detachFromAppRef();
            }, ApplicationRef.prototype._loadComponent = function(componentRef) {
                this.attachView(componentRef.hostView), this.tick(), this.components.push(componentRef), 
                this._injector.get(APP_BOOTSTRAP_LISTENER, []).concat(this._bootstrapListeners).forEach(function(listener) {
                    return listener(componentRef);
                });
            }, ApplicationRef.prototype._unloadComponent = function(componentRef) {
                this.detachView(componentRef.hostView), remove(this.components, componentRef);
            }, ApplicationRef.prototype.ngOnDestroy = function() {
                this._views.slice().forEach(function(view) {
                    return view.destroy();
                });
            }, Object.defineProperty(ApplicationRef.prototype, "viewCount", {
                get: function() {
                    return this._views.length;
                },
                enumerable: !0,
                configurable: !0
            }), ApplicationRef._tickScope = wtfCreateScope("ApplicationRef#tick()"), ApplicationRef.ngInjectableDef = defineInjectable({
                token: ApplicationRef,
                factory: function(t) {
                    return new (t || ApplicationRef)(inject(NgZone), inject(Console), inject(Injector), inject(ErrorHandler), inject(core_ComponentFactoryResolver), inject(ApplicationInitStatus));
                },
                providedIn: null
            }), ApplicationRef;
        }();
        function remove(list, el) {
            var index = list.indexOf(el);
            index > -1 && list.splice(index, 1);
        }
        var DebugNode__POST_R3__ = function() {
            function DebugNode__POST_R3__(nativeNode) {
                this.nativeNode = nativeNode;
            }
            return Object.defineProperty(DebugNode__POST_R3__.prototype, "parent", {
                get: function() {
                    var parent = this.nativeNode.parentNode;
                    return parent ? new core_DebugElement_POST_R3_(parent) : null;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugNode__POST_R3__.prototype, "injector", {
                get: function() {
                    return context = loadLContext(this.nativeNode), new NodeInjector(context.lView[TVIEW].data[context.nodeIndex], context.lView);
                    var context;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugNode__POST_R3__.prototype, "componentInstance", {
                get: function() {
                    var lView, tNode, context, nativeElement = this.nativeNode;
                    return nativeElement && (void 0 === (context = loadLContextFromNode(nativeElement)).component && (context.component = 1 & (tNode = (lView = context.lView)[TVIEW].data[context.nodeIndex]).flags ? lView[tNode.directiveStart] : null), 
                    context.component || function(element) {
                        for (var parent, lView = loadLContext(nativeElement).lView; null === lView[HOST] && (parent = getLViewParent(lView)); ) lView = parent;
                        return 512 & lView[FLAGS] ? null : lView[CONTEXT];
                    }());
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugNode__POST_R3__.prototype, "context", {
                get: function() {
                    return loadLContextFromNode(this.nativeNode).lView[CONTEXT];
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugNode__POST_R3__.prototype, "listeners", {
                get: function() {
                    return function(element) {
                        var lView = loadLContextFromNode(element).lView, lCleanup = lView[CLEANUP], tCleanup = lView[TVIEW].cleanup, listeners = [];
                        if (tCleanup && lCleanup) for (var i = 0; i < tCleanup.length; ) {
                            var firstParam = tCleanup[i++], secondParam = tCleanup[i++];
                            if ("string" == typeof firstParam) {
                                var name_1 = firstParam, listenerElement = unwrapRNode(lView[secondParam]), callback = lCleanup[tCleanup[i++]], useCaptureOrIndx = tCleanup[i++];
                                element == listenerElement && listeners.push({
                                    element: element,
                                    name: name_1,
                                    callback: callback,
                                    useCapture: "boolean" == typeof useCaptureOrIndx ? useCaptureOrIndx : !(useCaptureOrIndx >= 0) && null
                                });
                            }
                        }
                        return listeners.sort(sortListeners), listeners;
                    }(this.nativeNode).filter(isBrowserEvents);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugNode__POST_R3__.prototype, "references", {
                get: function() {
                    return void 0 === (context = loadLContext(this.nativeNode)).localRefs && (context.localRefs = function(lView, nodeIndex) {
                        var tNode = lView[TVIEW].data[context.nodeIndex];
                        if (tNode && tNode.localNames) {
                            for (var result = {}, localIndex = tNode.index + 1, i = 0; i < tNode.localNames.length; i += 2) result[tNode.localNames[i]] = lView[localIndex], 
                            localIndex++;
                            return result;
                        }
                        return null;
                    }(context.lView)), context.localRefs || {};
                    var context;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugNode__POST_R3__.prototype, "providerTokens", {
                get: function() {
                    return function(element) {
                        var context = loadLContext(element, !1);
                        if (!context) return [];
                        for (var obj, tView = context.lView[TVIEW], tNode = tView.data[context.nodeIndex], providerTokens = [], endIndex = tNode.directiveEnd, i = 65535 & tNode.providerIndexes; i < endIndex; i++) {
                            var value = tView.data[i];
                            void 0 !== (obj = value).type && void 0 !== obj.template && void 0 !== obj.declaredInputs && (value = value.type), 
                            providerTokens.push(value);
                        }
                        return providerTokens;
                    }(this.nativeNode);
                },
                enumerable: !0,
                configurable: !0
            }), DebugNode__POST_R3__;
        }(), core_DebugElement_POST_R3_ = function(_super) {
            function DebugElement__POST_R3__(nativeNode) {
                return _super.call(this, nativeNode) || this;
            }
            return __extends(DebugElement__POST_R3__, _super), Object.defineProperty(DebugElement__POST_R3__.prototype, "nativeElement", {
                get: function() {
                    return this.nativeNode.nodeType == Node.ELEMENT_NODE ? this.nativeNode : null;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugElement__POST_R3__.prototype, "name", {
                get: function() {
                    return this.nativeElement.nodeName;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugElement__POST_R3__.prototype, "properties", {
                get: function() {
                    var context = loadLContext(this.nativeNode), lView = context.lView, tData = lView[TVIEW].data, tNode = tData[context.nodeIndex], properties = function(tNode, lView, tData) {
                        for (var properties = {}, bindingIndex = function(metadataIndex, tData) {
                            for (var currentBindingIndex = tNode.propertyMetadataStartIndex - 1, currentValue = tData[currentBindingIndex]; "string" == typeof currentValue && !isPropMetadataString(currentValue); ) currentValue = tData[--currentBindingIndex];
                            return currentBindingIndex + 1;
                        }(0, tData); bindingIndex < tNode.propertyMetadataEndIndex; ) {
                            for (var value = "", propMetadata = tData[bindingIndex]; !isPropMetadataString(propMetadata); ) value += renderStringify(lView[bindingIndex]) + tData[bindingIndex], 
                            propMetadata = tData[++bindingIndex];
                            value += lView[bindingIndex];
                            var metadataParts = propMetadata.split(INTERPOLATION_DELIMITER), propertyName = metadataParts[0];
                            propertyName && (properties[propertyName] = metadataParts[1] + value + metadataParts[2]), 
                            bindingIndex++;
                        }
                        return properties;
                    }(tNode, lView, tData), hostProperties = function(tNode, lView, tData) {
                        for (var properties = {}, hostPropIndex = tNode.directiveEnd, propMetadata = tData[hostPropIndex]; "string" == typeof propMetadata; ) properties[propMetadata.split(INTERPOLATION_DELIMITER)[0]] = lView[hostPropIndex], 
                        propMetadata = tData[++hostPropIndex];
                        return properties;
                    }(tNode, lView, tData), className = function(debugElement) {
                        var e_2, _a, classes = debugElement.classes, output = "";
                        try {
                            for (var _b = __values(Object.keys(classes)), _c = _b.next(); !_c.done; _c = _b.next()) {
                                var className = _c.value;
                                classes[className] && (output = output ? output + " " + className : className);
                            }
                        } catch (e_2_1) {
                            e_2 = {
                                error: e_2_1
                            };
                        } finally {
                            try {
                                _c && !_c.done && (_a = _b.return) && _a.call(_b);
                            } finally {
                                if (e_2) throw e_2.error;
                            }
                        }
                        return output;
                    }(this), output = __assign({}, properties, hostProperties);
                    return className && (output.className = output.className ? output.className + " " + className : className), 
                    output;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugElement__POST_R3__.prototype, "attributes", {
                get: function() {
                    var attributes = {}, element = this.nativeElement;
                    if (element) for (var eAttrs = element.attributes, i = 0; i < eAttrs.length; i++) {
                        var attr = eAttrs[i];
                        attributes[attr.name] = attr.value;
                    }
                    return attributes;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugElement__POST_R3__.prototype, "classes", {
                get: function() {
                    var classes = {}, element = this.nativeElement;
                    if (element) {
                        var lContext = loadLContextFromNode(element), stylingContext = getStylingContext(lContext.nodeIndex, lContext.lView);
                        if (stylingContext) {
                            for (var i = 9; i < stylingContext.length; i += 4) if (isClassBasedValue(stylingContext, i)) {
                                var className = getProp(stylingContext, i), value = getValue(stylingContext, i);
                                "boolean" == typeof value && (classes[className] = value);
                            }
                        } else {
                            var eClasses = element.classList;
                            for (i = 0; i < eClasses.length; i++) classes[eClasses[i]] = !0;
                        }
                    }
                    return classes;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugElement__POST_R3__.prototype, "styles", {
                get: function() {
                    var styles = {}, element = this.nativeElement;
                    if (element) {
                        var lContext = loadLContextFromNode(element), stylingContext = getStylingContext(lContext.nodeIndex, lContext.lView);
                        if (stylingContext) {
                            for (var i = 9; i < stylingContext.length; i += 4) if (!isClassBasedValue(stylingContext, i)) {
                                var styleName = getProp(stylingContext, i), value = getValue(stylingContext, i);
                                null !== value && (styles[styleName] = value);
                            }
                        } else {
                            var eStyles = element.style;
                            for (i = 0; i < eStyles.length; i++) {
                                var name_1 = eStyles.item(i);
                                styles[name_1] = eStyles.getPropertyValue(name_1);
                            }
                        }
                    }
                    return styles;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugElement__POST_R3__.prototype, "childNodes", {
                get: function() {
                    for (var childNodes = this.nativeNode.childNodes, children = [], i = 0; i < childNodes.length; i++) children.push(getDebugNode__POST_R3__(childNodes[i]));
                    return children;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugElement__POST_R3__.prototype, "children", {
                get: function() {
                    var nativeElement = this.nativeElement;
                    if (!nativeElement) return [];
                    for (var childNodes = nativeElement.children, children = [], i = 0; i < childNodes.length; i++) children.push(getDebugNode__POST_R3__(childNodes[i]));
                    return children;
                },
                enumerable: !0,
                configurable: !0
            }), DebugElement__POST_R3__.prototype.query = function(predicate) {
                return this.queryAll(predicate)[0] || null;
            }, DebugElement__POST_R3__.prototype.queryAll = function(predicate) {
                var matches = [];
                return _queryAllR3(this, predicate, matches, !0), matches;
            }, DebugElement__POST_R3__.prototype.queryAllNodes = function(predicate) {
                var matches = [];
                return _queryAllR3(this, predicate, matches, !1), matches;
            }, DebugElement__POST_R3__.prototype.triggerEventHandler = function(eventName, eventObj) {
                this.listeners.forEach(function(listener) {
                    listener.name === eventName && listener.callback(eventObj);
                });
            }, DebugElement__POST_R3__;
        }(DebugNode__POST_R3__);
        function _queryAllR3(parentElement, predicate, matches, elementsOnly) {
            var context = loadLContext(parentElement.nativeNode);
            _queryNodeChildrenR3(context.lView[TVIEW].data[context.nodeIndex], context.lView, predicate, matches, elementsOnly, parentElement.nativeNode);
        }
        function _queryNodeChildrenR3(tNode, lView, predicate, matches, elementsOnly, rootNativeNode) {
            var e_1, _a;
            if (3 === tNode.type || 4 === tNode.type) {
                _addQueryMatchR3(getNativeByTNode(tNode, lView), predicate, matches, elementsOnly, rootNativeNode), 
                isComponent(tNode) ? (componentView = getComponentViewByIndex(tNode.index, lView)) && componentView[TVIEW].firstChild && _queryNodeChildrenR3(componentView[TVIEW].firstChild, componentView, predicate, matches, elementsOnly, rootNativeNode) : tNode.child && _queryNodeChildrenR3(tNode.child, lView, predicate, matches, elementsOnly, rootNativeNode);
                var nodeOrContainer = lView[tNode.index];
                isLContainer(nodeOrContainer) && _queryNodeChildrenInContainerR3(nodeOrContainer, predicate, matches, elementsOnly, rootNativeNode);
            } else if (0 === tNode.type) {
                var lContainer = lView[tNode.index];
                _addQueryMatchR3(lContainer[NATIVE], predicate, matches, elementsOnly, rootNativeNode), 
                _queryNodeChildrenInContainerR3(lContainer, predicate, matches, elementsOnly, rootNativeNode);
            } else if (1 === tNode.type) {
                var componentView, head = (componentView = findComponentView(lView))[T_HOST].projection[tNode.projection];
                if (Array.isArray(head)) try {
                    for (var head_1 = __values(head), head_1_1 = head_1.next(); !head_1_1.done; head_1_1 = head_1.next()) _addQueryMatchR3(head_1_1.value, predicate, matches, elementsOnly, rootNativeNode);
                } catch (e_1_1) {
                    e_1 = {
                        error: e_1_1
                    };
                } finally {
                    try {
                        head_1_1 && !head_1_1.done && (_a = head_1.return) && _a.call(head_1);
                    } finally {
                        if (e_1) throw e_1.error;
                    }
                } else if (head) {
                    var nextLView = componentView[PARENT];
                    _queryNodeChildrenR3(nextLView[TVIEW].data[head.index], nextLView, predicate, matches, elementsOnly, rootNativeNode);
                }
            } else tNode.child && _queryNodeChildrenR3(tNode.child, lView, predicate, matches, elementsOnly, rootNativeNode);
            var nextTNode = 2 & tNode.flags ? tNode.projectionNext : tNode.next;
            nextTNode && _queryNodeChildrenR3(nextTNode, lView, predicate, matches, elementsOnly, rootNativeNode);
        }
        function _queryNodeChildrenInContainerR3(lContainer, predicate, matches, elementsOnly, rootNativeNode) {
            for (var i = 0; i < lContainer[VIEWS].length; i++) {
                var childView = lContainer[VIEWS][i];
                _queryNodeChildrenR3(childView[TVIEW].node, childView, predicate, matches, elementsOnly, rootNativeNode);
            }
        }
        function _addQueryMatchR3(nativeNode, predicate, matches, elementsOnly, rootNativeNode) {
            if (rootNativeNode !== nativeNode) {
                var debugNode = getDebugNode(nativeNode);
                debugNode && (!elementsOnly || debugNode instanceof core_DebugElement_POST_R3_) && predicate(debugNode) && matches.push(debugNode);
            }
        }
        function getDebugNode__POST_R3__(nativeNode) {
            return nativeNode instanceof Node ? nativeNode.nodeType == Node.ELEMENT_NODE ? new core_DebugElement_POST_R3_(nativeNode) : new DebugNode__POST_R3__(nativeNode) : null;
        }
        var getDebugNode = getDebugNode__POST_R3__, platformCore = createPlatformFactory(null, "core", [ {
            provide: PLATFORM_ID,
            useValue: "unknown"
        }, {
            provide: PlatformRef,
            deps: [ Injector ]
        }, {
            provide: core_TestabilityRegistry,
            deps: []
        }, {
            provide: Console,
            deps: []
        } ]), LOCALE_ID = new InjectionToken("LocaleId"), APPLICATION_MODULE_PROVIDERS = [ {
            provide: core_ApplicationRef,
            useClass: core_ApplicationRef,
            deps: [ NgZone, Console, Injector, ErrorHandler, core_ComponentFactoryResolver, ApplicationInitStatus ]
        }, {
            provide: SCHEDULER,
            deps: [ NgZone ],
            useFactory: function(ngZone) {
                var queue = [];
                return ngZone.onStable.subscribe(function() {
                    for (;queue.length; ) queue.pop()();
                }), function(fn) {
                    queue.push(fn);
                };
            }
        }, {
            provide: ApplicationInitStatus,
            useClass: ApplicationInitStatus,
            deps: [ [ new Optional(), APP_INITIALIZER ] ]
        }, {
            provide: Compiler,
            useClass: Compiler,
            deps: []
        }, APP_ID_RANDOM_PROVIDER, {
            provide: IterableDiffers,
            useFactory: function() {
                return defaultIterableDiffers;
            },
            deps: []
        }, {
            provide: KeyValueDiffers,
            useFactory: function() {
                return defaultKeyValueDiffers;
            },
            deps: []
        }, {
            provide: LOCALE_ID,
            useFactory: function(locale) {
                return locale || "en-US";
            },
            deps: [ [ new Inject(LOCALE_ID), new Optional(), new SkipSelf() ] ]
        } ], ApplicationModule = function() {
            function ApplicationModule(appRef) {}
            return ApplicationModule.ngModuleDef = defineNgModule({
                type: ApplicationModule
            }), ApplicationModule.ngInjectorDef = defineInjector({
                factory: function(t) {
                    return new (t || ApplicationModule)(inject(core_ApplicationRef));
                },
                providers: APPLICATION_MODULE_PROVIDERS
            }), ApplicationModule;
        }(), tslib_tslib_es6_extendStatics = function(d, b) {
            return (tslib_tslib_es6_extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            })(d, b);
        };
        function tslib_tslib_es6_extends(d, b) {
            function __() {
                this.constructor = d;
            }
            tslib_tslib_es6_extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
            new __());
        }
        var tslib_tslib_es6_assign = function() {
            return (tslib_tslib_es6_assign = Object.assign || function(t) {
                for (var s, i = 1, n = arguments.length; i < n; i++) for (var p in s = arguments[i]) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
                return t;
            }).apply(this, arguments);
        };
        function tslib_tslib_es6_metadata(metadataKey, metadataValue) {
            if ("object" == typeof Reflect && "function" == typeof Reflect.metadata) return Reflect.metadata(metadataKey, metadataValue);
        }
        function tslib_tslib_es6_read(o, n) {
            var m = "function" == typeof Symbol && o[Symbol.iterator];
            if (!m) return o;
            var r, e, i = m.call(o), ar = [];
            try {
                for (;(void 0 === n || n-- > 0) && !(r = i.next()).done; ) ar.push(r.value);
            } catch (error) {
                e = {
                    error: error
                };
            } finally {
                try {
                    r && !r.done && (m = i.return) && m.call(i);
                } finally {
                    if (e) throw e.error;
                }
            }
            return ar;
        }
        var node_modules_tslib_tslib_es6_extendStatics = function(d, b) {
            return (node_modules_tslib_tslib_es6_extendStatics = Object.setPrototypeOf || {
                __proto__: []
            } instanceof Array && function(d, b) {
                d.__proto__ = b;
            } || function(d, b) {
                for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
            })(d, b);
        };
        function node_modules_tslib_tslib_es6_read(o, n) {
            var m = "function" == typeof Symbol && o[Symbol.iterator];
            if (!m) return o;
            var r, e, i = m.call(o), ar = [];
            try {
                for (;(void 0 === n || n-- > 0) && !(r = i.next()).done; ) ar.push(r.value);
            } catch (error) {
                e = {
                    error: error
                };
            } finally {
                try {
                    r && !r.done && (m = i.return) && m.call(i);
                } finally {
                    if (e) throw e.error;
                }
            }
            return ar;
        }
        var PlatformLocation = function() {
            return function() {};
        }(), u = void 0, localeEn = [ "en", [ [ "a", "p" ], [ "AM", "PM" ], u ], [ [ "AM", "PM" ], u, u ], [ [ "S", "M", "T", "W", "T", "F", "S" ], [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ], [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ], [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ] ], u, [ [ "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D" ], [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ], [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ] ], u, [ [ "B", "A" ], [ "BC", "AD" ], [ "Before Christ", "Anno Domini" ] ], 0, [ 6, 0 ], [ "M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y" ], [ "h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz" ], [ "{1}, {0}", u, "{1} 'at' {0}", u ], [ ".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":" ], [ "#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0" ], "$", "US Dollar", {}, function(n) {
            var i = Math.floor(Math.abs(n)), v = n.toString().replace(/^[^.]*\.?/, "").length;
            return 1 === i && 0 === v ? 1 : 5;
        } ], LOCALE_DATA = {}, common_Plural = function(Plural) {
            return Plural[Plural.Zero = 0] = "Zero", Plural[Plural.One = 1] = "One", Plural[Plural.Two = 2] = "Two", 
            Plural[Plural.Few = 3] = "Few", Plural[Plural.Many = 4] = "Many", Plural[Plural.Other = 5] = "Other", 
            Plural;
        }({}), DEPRECATED_PLURAL_FN = new InjectionToken("UseV4Plurals"), NgLocalization = function() {
            return function() {};
        }(), common_NgLocaleLocalization = function(_super) {
            function NgLocaleLocalization(locale, deprecatedPluralFn) {
                var _this = _super.call(this) || this;
                return _this.locale = locale, _this.deprecatedPluralFn = deprecatedPluralFn, _this;
            }
            return function(d, b) {
                function __() {
                    this.constructor = d;
                }
                node_modules_tslib_tslib_es6_extendStatics(d, b), d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, 
                new __());
            }(NgLocaleLocalization, _super), NgLocaleLocalization.prototype.getPluralCategory = function(value, locale) {
                switch (this.deprecatedPluralFn ? this.deprecatedPluralFn(locale || this.locale, value) : function(locale) {
                    return function(locale) {
                        var normalizedLocale = locale.toLowerCase().replace(/_/g, "-"), match = LOCALE_DATA[normalizedLocale];
                        if (match) return match;
                        var parentLocale = normalizedLocale.split("-")[0];
                        if (match = LOCALE_DATA[parentLocale]) return match;
                        if ("en" === parentLocale) return localeEn;
                        throw new Error('Missing locale data for the locale "' + locale + '".');
                    }(locale)[18];
                }(locale || this.locale)(value)) {
                  case common_Plural.Zero:
                    return "zero";

                  case common_Plural.One:
                    return "one";

                  case common_Plural.Two:
                    return "two";

                  case common_Plural.Few:
                    return "few";

                  case common_Plural.Many:
                    return "many";

                  default:
                    return "other";
                }
            }, NgLocaleLocalization.ngInjectableDef = defineInjectable({
                token: NgLocaleLocalization,
                factory: function(t) {
                    return new (t || NgLocaleLocalization)(inject(LOCALE_ID), inject(DEPRECATED_PLURAL_FN, 8));
                },
                providedIn: null
            }), NgLocaleLocalization;
        }(NgLocalization), common_CommonModule = function() {
            function CommonModule() {}
            return CommonModule.ngModuleDef = defineNgModule({
                type: CommonModule
            }), CommonModule.ngInjectorDef = defineInjector({
                factory: function(t) {
                    return new (t || CommonModule)();
                },
                providers: [ {
                    provide: NgLocalization,
                    useClass: common_NgLocaleLocalization
                } ]
            }), CommonModule;
        }(), DOCUMENT = new InjectionToken("DocumentToken"), PLATFORM_SERVER_ID = "server", _DOM = null;
        function getDOM() {
            return _DOM;
        }
        var nodeContains, _attrToPropMap = {
            class: "className",
            innerHtml: "innerHTML",
            readonly: "readOnly",
            tabindex: "tabIndex"
        }, _keyMap = {
            "\b": "Backspace",
            "\t": "Tab",
            "\x7f": "Delete",
            "\x1b": "Escape",
            Del: "Delete",
            Esc: "Escape",
            Left: "ArrowLeft",
            Right: "ArrowRight",
            Up: "ArrowUp",
            Down: "ArrowDown",
            Menu: "ContextMenu",
            Scroll: "ScrollLock",
            Win: "OS"
        }, _chromeNumKeyPadMap = {
            A: "1",
            B: "2",
            C: "3",
            D: "4",
            E: "5",
            F: "6",
            G: "7",
            H: "8",
            I: "9",
            J: "*",
            K: "+",
            M: "-",
            N: ".",
            O: "/",
            "`": "0",
            "\x90": "NumLock"
        };
        _global.Node && (nodeContains = _global.Node.prototype.contains || function(node) {
            return !!(16 & this.compareDocumentPosition(node));
        });
        var urlParsingNode, platform_browser_BrowserDomAdapter = function(_super) {
            function BrowserDomAdapter() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return tslib_tslib_es6_extends(BrowserDomAdapter, _super), BrowserDomAdapter.prototype.parse = function(templateHtml) {
                throw new Error("parse not implemented");
            }, BrowserDomAdapter.makeCurrent = function() {
                var adapter;
                adapter = new BrowserDomAdapter(), _DOM || (_DOM = adapter);
            }, BrowserDomAdapter.prototype.hasProperty = function(element, name) {
                return name in element;
            }, BrowserDomAdapter.prototype.setProperty = function(el, name, value) {
                el[name] = value;
            }, BrowserDomAdapter.prototype.getProperty = function(el, name) {
                return el[name];
            }, BrowserDomAdapter.prototype.invoke = function(el, methodName, args) {
                var _a;
                (_a = el)[methodName].apply(_a, function() {
                    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(tslib_tslib_es6_read(arguments[i]));
                    return ar;
                }(args));
            }, BrowserDomAdapter.prototype.logError = function(error) {
                window.console && (console.error ? console.error(error) : console.log(error));
            }, BrowserDomAdapter.prototype.log = function(error) {
                window.console && window.console.log && window.console.log(error);
            }, BrowserDomAdapter.prototype.logGroup = function(error) {
                window.console && window.console.group && window.console.group(error);
            }, BrowserDomAdapter.prototype.logGroupEnd = function() {
                window.console && window.console.groupEnd && window.console.groupEnd();
            }, Object.defineProperty(BrowserDomAdapter.prototype, "attrToPropMap", {
                get: function() {
                    return _attrToPropMap;
                },
                enumerable: !0,
                configurable: !0
            }), BrowserDomAdapter.prototype.contains = function(nodeA, nodeB) {
                return nodeContains.call(nodeA, nodeB);
            }, BrowserDomAdapter.prototype.querySelector = function(el, selector) {
                return el.querySelector(selector);
            }, BrowserDomAdapter.prototype.querySelectorAll = function(el, selector) {
                return el.querySelectorAll(selector);
            }, BrowserDomAdapter.prototype.on = function(el, evt, listener) {
                el.addEventListener(evt, listener, !1);
            }, BrowserDomAdapter.prototype.onAndCancel = function(el, evt, listener) {
                return el.addEventListener(evt, listener, !1), function() {
                    el.removeEventListener(evt, listener, !1);
                };
            }, BrowserDomAdapter.prototype.dispatchEvent = function(el, evt) {
                el.dispatchEvent(evt);
            }, BrowserDomAdapter.prototype.createMouseEvent = function(eventType) {
                var evt = this.getDefaultDocument().createEvent("MouseEvent");
                return evt.initEvent(eventType, !0, !0), evt;
            }, BrowserDomAdapter.prototype.createEvent = function(eventType) {
                var evt = this.getDefaultDocument().createEvent("Event");
                return evt.initEvent(eventType, !0, !0), evt;
            }, BrowserDomAdapter.prototype.preventDefault = function(evt) {
                evt.preventDefault(), evt.returnValue = !1;
            }, BrowserDomAdapter.prototype.isPrevented = function(evt) {
                return evt.defaultPrevented || null != evt.returnValue && !evt.returnValue;
            }, BrowserDomAdapter.prototype.getInnerHTML = function(el) {
                return el.innerHTML;
            }, BrowserDomAdapter.prototype.getTemplateContent = function(el) {
                return "content" in el && this.isTemplateElement(el) ? el.content : null;
            }, BrowserDomAdapter.prototype.getOuterHTML = function(el) {
                return el.outerHTML;
            }, BrowserDomAdapter.prototype.nodeName = function(node) {
                return node.nodeName;
            }, BrowserDomAdapter.prototype.nodeValue = function(node) {
                return node.nodeValue;
            }, BrowserDomAdapter.prototype.type = function(node) {
                return node.type;
            }, BrowserDomAdapter.prototype.content = function(node) {
                return this.hasProperty(node, "content") ? node.content : node;
            }, BrowserDomAdapter.prototype.firstChild = function(el) {
                return el.firstChild;
            }, BrowserDomAdapter.prototype.nextSibling = function(el) {
                return el.nextSibling;
            }, BrowserDomAdapter.prototype.parentElement = function(el) {
                return el.parentNode;
            }, BrowserDomAdapter.prototype.childNodes = function(el) {
                return el.childNodes;
            }, BrowserDomAdapter.prototype.childNodesAsList = function(el) {
                for (var childNodes = el.childNodes, res = new Array(childNodes.length), i = 0; i < childNodes.length; i++) res[i] = childNodes[i];
                return res;
            }, BrowserDomAdapter.prototype.clearNodes = function(el) {
                for (;el.firstChild; ) el.removeChild(el.firstChild);
            }, BrowserDomAdapter.prototype.appendChild = function(el, node) {
                el.appendChild(node);
            }, BrowserDomAdapter.prototype.removeChild = function(el, node) {
                el.removeChild(node);
            }, BrowserDomAdapter.prototype.replaceChild = function(el, newChild, oldChild) {
                el.replaceChild(newChild, oldChild);
            }, BrowserDomAdapter.prototype.remove = function(node) {
                return node.parentNode && node.parentNode.removeChild(node), node;
            }, BrowserDomAdapter.prototype.insertBefore = function(parent, ref, node) {
                parent.insertBefore(node, ref);
            }, BrowserDomAdapter.prototype.insertAllBefore = function(parent, ref, nodes) {
                nodes.forEach(function(n) {
                    return parent.insertBefore(n, ref);
                });
            }, BrowserDomAdapter.prototype.insertAfter = function(parent, ref, node) {
                parent.insertBefore(node, ref.nextSibling);
            }, BrowserDomAdapter.prototype.setInnerHTML = function(el, value) {
                el.innerHTML = value;
            }, BrowserDomAdapter.prototype.getText = function(el) {
                return el.textContent;
            }, BrowserDomAdapter.prototype.setText = function(el, value) {
                el.textContent = value;
            }, BrowserDomAdapter.prototype.getValue = function(el) {
                return el.value;
            }, BrowserDomAdapter.prototype.setValue = function(el, value) {
                el.value = value;
            }, BrowserDomAdapter.prototype.getChecked = function(el) {
                return el.checked;
            }, BrowserDomAdapter.prototype.setChecked = function(el, value) {
                el.checked = value;
            }, BrowserDomAdapter.prototype.createComment = function(text) {
                return this.getDefaultDocument().createComment(text);
            }, BrowserDomAdapter.prototype.createTemplate = function(html) {
                var t = this.getDefaultDocument().createElement("template");
                return t.innerHTML = html, t;
            }, BrowserDomAdapter.prototype.createElement = function(tagName, doc) {
                return (doc = doc || this.getDefaultDocument()).createElement(tagName);
            }, BrowserDomAdapter.prototype.createElementNS = function(ns, tagName, doc) {
                return (doc = doc || this.getDefaultDocument()).createElementNS(ns, tagName);
            }, BrowserDomAdapter.prototype.createTextNode = function(text, doc) {
                return (doc = doc || this.getDefaultDocument()).createTextNode(text);
            }, BrowserDomAdapter.prototype.createScriptTag = function(attrName, attrValue, doc) {
                var el = (doc = doc || this.getDefaultDocument()).createElement("SCRIPT");
                return el.setAttribute(attrName, attrValue), el;
            }, BrowserDomAdapter.prototype.createStyleElement = function(css, doc) {
                var style = (doc = doc || this.getDefaultDocument()).createElement("style");
                return this.appendChild(style, this.createTextNode(css, doc)), style;
            }, BrowserDomAdapter.prototype.createShadowRoot = function(el) {
                return el.createShadowRoot();
            }, BrowserDomAdapter.prototype.getShadowRoot = function(el) {
                return el.shadowRoot;
            }, BrowserDomAdapter.prototype.getHost = function(el) {
                return el.host;
            }, BrowserDomAdapter.prototype.clone = function(node) {
                return node.cloneNode(!0);
            }, BrowserDomAdapter.prototype.getElementsByClassName = function(element, name) {
                return element.getElementsByClassName(name);
            }, BrowserDomAdapter.prototype.getElementsByTagName = function(element, name) {
                return element.getElementsByTagName(name);
            }, BrowserDomAdapter.prototype.classList = function(element) {
                return Array.prototype.slice.call(element.classList, 0);
            }, BrowserDomAdapter.prototype.addClass = function(element, className) {
                element.classList.add(className);
            }, BrowserDomAdapter.prototype.removeClass = function(element, className) {
                element.classList.remove(className);
            }, BrowserDomAdapter.prototype.hasClass = function(element, className) {
                return element.classList.contains(className);
            }, BrowserDomAdapter.prototype.setStyle = function(element, styleName, styleValue) {
                element.style[styleName] = styleValue;
            }, BrowserDomAdapter.prototype.removeStyle = function(element, stylename) {
                element.style[stylename] = "";
            }, BrowserDomAdapter.prototype.getStyle = function(element, stylename) {
                return element.style[stylename];
            }, BrowserDomAdapter.prototype.hasStyle = function(element, styleName, styleValue) {
                var value = this.getStyle(element, styleName) || "";
                return styleValue ? value == styleValue : value.length > 0;
            }, BrowserDomAdapter.prototype.tagName = function(element) {
                return element.tagName;
            }, BrowserDomAdapter.prototype.attributeMap = function(element) {
                for (var res = new Map(), elAttrs = element.attributes, i = 0; i < elAttrs.length; i++) {
                    var attrib = elAttrs.item(i);
                    res.set(attrib.name, attrib.value);
                }
                return res;
            }, BrowserDomAdapter.prototype.hasAttribute = function(element, attribute) {
                return element.hasAttribute(attribute);
            }, BrowserDomAdapter.prototype.hasAttributeNS = function(element, ns, attribute) {
                return element.hasAttributeNS(ns, attribute);
            }, BrowserDomAdapter.prototype.getAttribute = function(element, attribute) {
                return element.getAttribute(attribute);
            }, BrowserDomAdapter.prototype.getAttributeNS = function(element, ns, name) {
                return element.getAttributeNS(ns, name);
            }, BrowserDomAdapter.prototype.setAttribute = function(element, name, value) {
                element.setAttribute(name, value);
            }, BrowserDomAdapter.prototype.setAttributeNS = function(element, ns, name, value) {
                element.setAttributeNS(ns, name, value);
            }, BrowserDomAdapter.prototype.removeAttribute = function(element, attribute) {
                element.removeAttribute(attribute);
            }, BrowserDomAdapter.prototype.removeAttributeNS = function(element, ns, name) {
                element.removeAttributeNS(ns, name);
            }, BrowserDomAdapter.prototype.templateAwareRoot = function(el) {
                return this.isTemplateElement(el) ? this.content(el) : el;
            }, BrowserDomAdapter.prototype.createHtmlDocument = function() {
                return document.implementation.createHTMLDocument("fakeTitle");
            }, BrowserDomAdapter.prototype.getDefaultDocument = function() {
                return document;
            }, BrowserDomAdapter.prototype.getBoundingClientRect = function(el) {
                try {
                    return el.getBoundingClientRect();
                } catch (_a) {
                    return {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    };
                }
            }, BrowserDomAdapter.prototype.getTitle = function(doc) {
                return doc.title;
            }, BrowserDomAdapter.prototype.setTitle = function(doc, newTitle) {
                doc.title = newTitle || "";
            }, BrowserDomAdapter.prototype.elementMatches = function(n, selector) {
                return !!this.isElementNode(n) && (n.matches && n.matches(selector) || n.msMatchesSelector && n.msMatchesSelector(selector) || n.webkitMatchesSelector && n.webkitMatchesSelector(selector));
            }, BrowserDomAdapter.prototype.isTemplateElement = function(el) {
                return this.isElementNode(el) && "TEMPLATE" === el.nodeName;
            }, BrowserDomAdapter.prototype.isTextNode = function(node) {
                return node.nodeType === Node.TEXT_NODE;
            }, BrowserDomAdapter.prototype.isCommentNode = function(node) {
                return node.nodeType === Node.COMMENT_NODE;
            }, BrowserDomAdapter.prototype.isElementNode = function(node) {
                return node.nodeType === Node.ELEMENT_NODE;
            }, BrowserDomAdapter.prototype.hasShadowRoot = function(node) {
                return null != node.shadowRoot && node instanceof HTMLElement;
            }, BrowserDomAdapter.prototype.isShadowRoot = function(node) {
                return node instanceof DocumentFragment;
            }, BrowserDomAdapter.prototype.importIntoDoc = function(node) {
                return document.importNode(this.templateAwareRoot(node), !0);
            }, BrowserDomAdapter.prototype.adoptNode = function(node) {
                return document.adoptNode(node);
            }, BrowserDomAdapter.prototype.getHref = function(el) {
                return el.getAttribute("href");
            }, BrowserDomAdapter.prototype.getEventKey = function(event) {
                var key = event.key;
                if (null == key) {
                    if (null == (key = event.keyIdentifier)) return "Unidentified";
                    key.startsWith("U+") && (key = String.fromCharCode(parseInt(key.substring(2), 16)), 
                    3 === event.location && _chromeNumKeyPadMap.hasOwnProperty(key) && (key = _chromeNumKeyPadMap[key]));
                }
                return _keyMap[key] || key;
            }, BrowserDomAdapter.prototype.getGlobalEventTarget = function(doc, target) {
                return "window" === target ? window : "document" === target ? doc : "body" === target ? doc.body : null;
            }, BrowserDomAdapter.prototype.getHistory = function() {
                return window.history;
            }, BrowserDomAdapter.prototype.getLocation = function() {
                return window.location;
            }, BrowserDomAdapter.prototype.getBaseHref = function(doc) {
                var url, href = baseElement || (baseElement = document.querySelector("base")) ? baseElement.getAttribute("href") : null;
                return null == href ? null : (url = href, urlParsingNode || (urlParsingNode = document.createElement("a")), 
                urlParsingNode.setAttribute("href", url), "/" === urlParsingNode.pathname.charAt(0) ? urlParsingNode.pathname : "/" + urlParsingNode.pathname);
            }, BrowserDomAdapter.prototype.resetBaseElement = function() {
                baseElement = null;
            }, BrowserDomAdapter.prototype.getUserAgent = function() {
                return window.navigator.userAgent;
            }, BrowserDomAdapter.prototype.setData = function(element, name, value) {
                this.setAttribute(element, "data-" + name, value);
            }, BrowserDomAdapter.prototype.getData = function(element, name) {
                return this.getAttribute(element, "data-" + name);
            }, BrowserDomAdapter.prototype.getComputedStyle = function(element) {
                return getComputedStyle(element);
            }, BrowserDomAdapter.prototype.supportsWebAnimation = function() {
                return "function" == typeof Element.prototype.animate;
            }, BrowserDomAdapter.prototype.performanceNow = function() {
                return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
            }, BrowserDomAdapter.prototype.supportsCookies = function() {
                return !0;
            }, BrowserDomAdapter.prototype.getCookie = function(name) {
                return function(cookieStr, name) {
                    var e_1, _a;
                    name = encodeURIComponent(name);
                    try {
                        for (var _b = function(o) {
                            var m = "function" == typeof Symbol && o[Symbol.iterator], i = 0;
                            return m ? m.call(o) : {
                                next: function() {
                                    return o && i >= o.length && (o = void 0), {
                                        value: o && o[i++],
                                        done: !o
                                    };
                                }
                            };
                        }(cookieStr.split(";")), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var cookie = _c.value, eqIndex = cookie.indexOf("="), _d = node_modules_tslib_tslib_es6_read(-1 == eqIndex ? [ cookie, "" ] : [ cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1) ], 2), cookieValue = _d[1];
                            if (_d[0].trim() === name) return decodeURIComponent(cookieValue);
                        }
                    } catch (e_1_1) {
                        e_1 = {
                            error: e_1_1
                        };
                    } finally {
                        try {
                            _c && !_c.done && (_a = _b.return) && _a.call(_b);
                        } finally {
                            if (e_1) throw e_1.error;
                        }
                    }
                    return null;
                }(document.cookie, name);
            }, BrowserDomAdapter.prototype.setCookie = function(name, value) {
                document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
            }, BrowserDomAdapter;
        }(function(_super) {
            function GenericBrowserDomAdapter() {
                var _this = _super.call(this) || this;
                _this._animationPrefix = null, _this._transitionEnd = null;
                try {
                    var element_1 = _this.createElement("div", document);
                    if (null != _this.getStyle(element_1, "animationName")) _this._animationPrefix = ""; else for (var domPrefixes = [ "Webkit", "Moz", "O", "ms" ], i = 0; i < domPrefixes.length; i++) if (null != _this.getStyle(element_1, domPrefixes[i] + "AnimationName")) {
                        _this._animationPrefix = "-" + domPrefixes[i].toLowerCase() + "-";
                        break;
                    }
                    var transEndEventNames_1 = {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd otransitionend",
                        transition: "transitionend"
                    };
                    Object.keys(transEndEventNames_1).forEach(function(key) {
                        null != _this.getStyle(element_1, key) && (_this._transitionEnd = transEndEventNames_1[key]);
                    });
                } catch (_a) {
                    _this._animationPrefix = null, _this._transitionEnd = null;
                }
                return _this;
            }
            return tslib_tslib_es6_extends(GenericBrowserDomAdapter, _super), GenericBrowserDomAdapter.prototype.getDistributedNodes = function(el) {
                return el.getDistributedNodes();
            }, GenericBrowserDomAdapter.prototype.resolveAndSetHref = function(el, baseUrl, href) {
                el.href = null == href ? baseUrl : baseUrl + "/../" + href;
            }, GenericBrowserDomAdapter.prototype.supportsDOMEvents = function() {
                return !0;
            }, GenericBrowserDomAdapter.prototype.supportsNativeShadowDOM = function() {
                return "function" == typeof document.body.createShadowRoot;
            }, GenericBrowserDomAdapter.prototype.getAnimationPrefix = function() {
                return this._animationPrefix ? this._animationPrefix : "";
            }, GenericBrowserDomAdapter.prototype.getTransitionEnd = function() {
                return this._transitionEnd ? this._transitionEnd : "";
            }, GenericBrowserDomAdapter.prototype.supportsAnimation = function() {
                return null != this._animationPrefix && null != this._transitionEnd;
            }, GenericBrowserDomAdapter;
        }(function() {
            function DomAdapter() {
                this.resourceLoaderType = null;
            }
            return Object.defineProperty(DomAdapter.prototype, "attrToPropMap", {
                get: function() {
                    return this._attrToPropMap;
                },
                set: function(value) {
                    this._attrToPropMap = value;
                },
                enumerable: !0,
                configurable: !0
            }), DomAdapter;
        }())), baseElement = null;
        function supportsState() {
            return !!window.history.pushState;
        }
        var platform_browser_BrowserPlatformLocation = function(_super) {
            function BrowserPlatformLocation(_doc) {
                var _this = _super.call(this) || this;
                return _this._doc = _doc, _this._init(), _this;
            }
            var decorator;
            return tslib_tslib_es6_extends(BrowserPlatformLocation, _super), BrowserPlatformLocation.prototype._init = function() {
                this.location = getDOM().getLocation(), this._history = getDOM().getHistory();
            }, BrowserPlatformLocation.prototype.getBaseHrefFromDOM = function() {
                return getDOM().getBaseHref(this._doc);
            }, BrowserPlatformLocation.prototype.onPopState = function(fn) {
                getDOM().getGlobalEventTarget(this._doc, "window").addEventListener("popstate", fn, !1);
            }, BrowserPlatformLocation.prototype.onHashChange = function(fn) {
                getDOM().getGlobalEventTarget(this._doc, "window").addEventListener("hashchange", fn, !1);
            }, Object.defineProperty(BrowserPlatformLocation.prototype, "pathname", {
                get: function() {
                    return this.location.pathname;
                },
                set: function(newPath) {
                    this.location.pathname = newPath;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(BrowserPlatformLocation.prototype, "search", {
                get: function() {
                    return this.location.search;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(BrowserPlatformLocation.prototype, "hash", {
                get: function() {
                    return this.location.hash;
                },
                enumerable: !0,
                configurable: !0
            }), BrowserPlatformLocation.prototype.pushState = function(state, title, url) {
                supportsState() ? this._history.pushState(state, title, url) : this.location.hash = url;
            }, BrowserPlatformLocation.prototype.replaceState = function(state, title, url) {
                supportsState() ? this._history.replaceState(state, title, url) : this.location.hash = url;
            }, BrowserPlatformLocation.prototype.forward = function() {
                this._history.forward();
            }, BrowserPlatformLocation.prototype.back = function() {
                this._history.back();
            }, (BrowserPlatformLocation = function(decorators, target, key, desc) {
                var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
                return c > 3 && r && Object.defineProperty(target, key, r), r;
            }([ (decorator = Inject(DOCUMENT), function(target, key) {
                decorator(target, key, 0);
            }), tslib_tslib_es6_metadata("design:paramtypes", [ Object ]) ], BrowserPlatformLocation)).ngInjectableDef = defineInjectable({
                token: BrowserPlatformLocation,
                factory: function(t) {
                    return new (t || BrowserPlatformLocation)(inject(DOCUMENT));
                },
                providedIn: null
            }), BrowserPlatformLocation;
        }(PlatformLocation), TRANSITION_ID = new InjectionToken("TRANSITION_ID"), SERVER_TRANSITION_PROVIDERS = [ {
            provide: APP_INITIALIZER,
            useFactory: function(transitionId, document, injector) {
                return function() {
                    injector.get(ApplicationInitStatus).donePromise.then(function() {
                        var dom = getDOM();
                        Array.prototype.slice.apply(dom.querySelectorAll(document, "style[ng-transition]")).filter(function(el) {
                            return dom.getAttribute(el, "ng-transition") === transitionId;
                        }).forEach(function(el) {
                            return dom.remove(el);
                        });
                    });
                };
            },
            deps: [ TRANSITION_ID, DOCUMENT, Injector ],
            multi: !0
        } ], platform_browser_BrowserGetTestability = function() {
            function BrowserGetTestability() {}
            return BrowserGetTestability.init = function() {
                var getter;
                getter = new BrowserGetTestability(), _testabilityGetter = getter;
            }, BrowserGetTestability.prototype.addToWindow = function(registry) {
                _global.getAngularTestability = function(elem, findInAncestors) {
                    void 0 === findInAncestors && (findInAncestors = !0);
                    var testability = registry.findTestabilityInTree(elem, findInAncestors);
                    if (null == testability) throw new Error("Could not find testability for element.");
                    return testability;
                }, _global.getAllAngularTestabilities = function() {
                    return registry.getAllTestabilities();
                }, _global.getAllAngularRootElements = function() {
                    return registry.getAllRootElements();
                }, _global.frameworkStabilizers || (_global.frameworkStabilizers = []), _global.frameworkStabilizers.push(function(callback) {
                    var testabilities = _global.getAllAngularTestabilities(), count = testabilities.length, didWork = !1, decrement = function(didWork_) {
                        didWork = didWork || didWork_, 0 == --count && callback(didWork);
                    };
                    testabilities.forEach(function(testability) {
                        testability.whenStable(decrement);
                    });
                });
            }, BrowserGetTestability.prototype.findTestabilityInTree = function(registry, elem, findInAncestors) {
                if (null == elem) return null;
                var t = registry.getTestability(elem);
                return null != t ? t : findInAncestors ? getDOM().isShadowRoot(elem) ? this.findTestabilityInTree(registry, getDOM().getHost(elem), !0) : this.findTestabilityInTree(registry, getDOM().parentElement(elem), !0) : null;
            }, BrowserGetTestability;
        }();
        function exportNgVar(name, value) {
            "undefined" != typeof COMPILED && COMPILED || ((_global.ng = _global.ng || {})[name] = value);
        }
        var CORE_TOKENS = {
            ApplicationRef: core_ApplicationRef,
            NgZone: NgZone
        };
        function inspectNativeElement(element) {
            return getDebugNode(element);
        }
        var ELEMENT_PROBE_PROVIDERS = [ {
            provide: APP_INITIALIZER,
            useFactory: function(coreTokens) {
                return exportNgVar("probe", inspectNativeElement), exportNgVar("coreTokens", tslib_tslib_es6_assign({}, CORE_TOKENS, (coreTokens || []).reduce(function(prev, t) {
                    return prev[t.name] = t.token, prev;
                }, {}))), function() {
                    return inspectNativeElement;
                };
            },
            deps: [ [ NgProbeToken, new Optional() ] ],
            multi: !0
        } ], EVENT_MANAGER_PLUGINS = new InjectionToken("EventManagerPlugins"), platform_browser_EventManager = function() {
            function EventManager(plugins, _zone) {
                var _this = this;
                this._zone = _zone, this._eventNameToPlugin = new Map(), plugins.forEach(function(p) {
                    return p.manager = _this;
                }), this._plugins = plugins.slice().reverse();
            }
            return EventManager.prototype.addEventListener = function(element, eventName, handler) {
                return this._findPluginFor(eventName).addEventListener(element, eventName, handler);
            }, EventManager.prototype.addGlobalEventListener = function(target, eventName, handler) {
                return this._findPluginFor(eventName).addGlobalEventListener(target, eventName, handler);
            }, EventManager.prototype.getZone = function() {
                return this._zone;
            }, EventManager.prototype._findPluginFor = function(eventName) {
                var plugin = this._eventNameToPlugin.get(eventName);
                if (plugin) return plugin;
                for (var plugins = this._plugins, i = 0; i < plugins.length; i++) {
                    var plugin_1 = plugins[i];
                    if (plugin_1.supports(eventName)) return this._eventNameToPlugin.set(eventName, plugin_1), 
                    plugin_1;
                }
                throw new Error("No event manager plugin found for event " + eventName);
            }, EventManager.ngInjectableDef = defineInjectable({
                token: EventManager,
                factory: function(t) {
                    return new (t || EventManager)(inject(EVENT_MANAGER_PLUGINS), inject(NgZone));
                },
                providedIn: null
            }), EventManager;
        }(), EventManagerPlugin = function() {
            function EventManagerPlugin(_doc) {
                this._doc = _doc;
            }
            return EventManagerPlugin.prototype.addGlobalEventListener = function(element, eventName, handler) {
                var target = getDOM().getGlobalEventTarget(this._doc, element);
                if (!target) throw new Error("Unsupported event target " + target + " for event " + eventName);
                return this.addEventListener(target, eventName, handler);
            }, EventManagerPlugin;
        }(), platform_browser_SharedStylesHost = function() {
            function SharedStylesHost() {
                this._stylesSet = new Set();
            }
            return SharedStylesHost.prototype.addStyles = function(styles) {
                var _this = this, additions = new Set();
                styles.forEach(function(style) {
                    _this._stylesSet.has(style) || (_this._stylesSet.add(style), additions.add(style));
                }), this.onStylesAdded(additions);
            }, SharedStylesHost.prototype.onStylesAdded = function(additions) {}, SharedStylesHost.prototype.getAllStyles = function() {
                return Array.from(this._stylesSet);
            }, SharedStylesHost.ngInjectableDef = defineInjectable({
                token: SharedStylesHost,
                factory: function(t) {
                    return new (t || SharedStylesHost)();
                },
                providedIn: null
            }), SharedStylesHost;
        }(), platform_browser_DomSharedStylesHost = function(_super) {
            function DomSharedStylesHost(_doc) {
                var _this = _super.call(this) || this;
                return _this._doc = _doc, _this._hostNodes = new Set(), _this._styleNodes = new Set(), 
                _this._hostNodes.add(_doc.head), _this;
            }
            return tslib_tslib_es6_extends(DomSharedStylesHost, _super), DomSharedStylesHost.prototype._addStylesToHost = function(styles, host) {
                var _this = this;
                styles.forEach(function(style) {
                    var styleEl = _this._doc.createElement("style");
                    styleEl.textContent = style, _this._styleNodes.add(host.appendChild(styleEl));
                });
            }, DomSharedStylesHost.prototype.addHost = function(hostNode) {
                this._addStylesToHost(this._stylesSet, hostNode), this._hostNodes.add(hostNode);
            }, DomSharedStylesHost.prototype.removeHost = function(hostNode) {
                this._hostNodes.delete(hostNode);
            }, DomSharedStylesHost.prototype.onStylesAdded = function(additions) {
                var _this = this;
                this._hostNodes.forEach(function(hostNode) {
                    return _this._addStylesToHost(additions, hostNode);
                });
            }, DomSharedStylesHost.prototype.ngOnDestroy = function() {
                this._styleNodes.forEach(function(styleNode) {
                    return getDOM().remove(styleNode);
                });
            }, DomSharedStylesHost.ngInjectableDef = defineInjectable({
                token: DomSharedStylesHost,
                factory: function(t) {
                    return new (t || DomSharedStylesHost)(inject(DOCUMENT));
                },
                providedIn: null
            }), DomSharedStylesHost;
        }(platform_browser_SharedStylesHost), NAMESPACE_URIS = {
            svg: "http://www.w3.org/2000/svg",
            xhtml: "http://www.w3.org/1999/xhtml",
            xlink: "http://www.w3.org/1999/xlink",
            xml: "http://www.w3.org/XML/1998/namespace",
            xmlns: "http://www.w3.org/2000/xmlns/"
        }, COMPONENT_REGEX = /%COMP%/g, HOST_ATTR = "_nghost-%COMP%", CONTENT_ATTR = "_ngcontent-%COMP%";
        function flattenStyles(compId, styles, target) {
            for (var i = 0; i < styles.length; i++) {
                var style = styles[i];
                Array.isArray(style) ? flattenStyles(compId, style, target) : (style = style.replace(COMPONENT_REGEX, compId), 
                target.push(style));
            }
            return target;
        }
        function decoratePreventDefault(eventHandler) {
            return function(event) {
                !1 === eventHandler(event) && (event.preventDefault(), event.returnValue = !1);
            };
        }
        var platform_browser_DomRendererFactory2 = function() {
            function DomRendererFactory2(eventManager, sharedStylesHost) {
                this.eventManager = eventManager, this.sharedStylesHost = sharedStylesHost, this.rendererByCompId = new Map(), 
                this.defaultRenderer = new platform_browser_DefaultDomRenderer2(eventManager);
            }
            return DomRendererFactory2.prototype.createRenderer = function(element, type) {
                if (!element || !type) return this.defaultRenderer;
                switch (type.encapsulation) {
                  case ViewEncapsulation.Emulated:
                    var renderer = this.rendererByCompId.get(type.id);
                    return renderer || (renderer = new platform_browser_EmulatedEncapsulationDomRenderer2(this.eventManager, this.sharedStylesHost, type), 
                    this.rendererByCompId.set(type.id, renderer)), renderer.applyToHost(element), renderer;

                  case ViewEncapsulation.Native:
                  case ViewEncapsulation.ShadowDom:
                    return new platform_browser_ShadowDomRenderer(this.eventManager, this.sharedStylesHost, element, type);

                  default:
                    if (!this.rendererByCompId.has(type.id)) {
                        var styles = flattenStyles(type.id, type.styles, []);
                        this.sharedStylesHost.addStyles(styles), this.rendererByCompId.set(type.id, this.defaultRenderer);
                    }
                    return this.defaultRenderer;
                }
            }, DomRendererFactory2.prototype.begin = function() {}, DomRendererFactory2.prototype.end = function() {}, 
            DomRendererFactory2.ngInjectableDef = defineInjectable({
                token: DomRendererFactory2,
                factory: function(t) {
                    return new (t || DomRendererFactory2)(inject(platform_browser_EventManager), inject(platform_browser_DomSharedStylesHost));
                },
                providedIn: null
            }), DomRendererFactory2;
        }(), platform_browser_DefaultDomRenderer2 = function() {
            function DefaultDomRenderer2(eventManager) {
                this.eventManager = eventManager, this.data = Object.create(null);
            }
            return DefaultDomRenderer2.prototype.destroy = function() {}, DefaultDomRenderer2.prototype.createElement = function(name, namespace) {
                return namespace ? document.createElementNS(NAMESPACE_URIS[namespace] || namespace, name) : document.createElement(name);
            }, DefaultDomRenderer2.prototype.createComment = function(value) {
                return document.createComment(value);
            }, DefaultDomRenderer2.prototype.createText = function(value) {
                return document.createTextNode(value);
            }, DefaultDomRenderer2.prototype.appendChild = function(parent, newChild) {
                parent.appendChild(newChild);
            }, DefaultDomRenderer2.prototype.insertBefore = function(parent, newChild, refChild) {
                parent && parent.insertBefore(newChild, refChild);
            }, DefaultDomRenderer2.prototype.removeChild = function(parent, oldChild) {
                parent && parent.removeChild(oldChild);
            }, DefaultDomRenderer2.prototype.selectRootElement = function(selectorOrNode, preserveContent) {
                var el = "string" == typeof selectorOrNode ? document.querySelector(selectorOrNode) : selectorOrNode;
                if (!el) throw new Error('The selector "' + selectorOrNode + '" did not match any elements');
                return preserveContent || (el.textContent = ""), el;
            }, DefaultDomRenderer2.prototype.parentNode = function(node) {
                return node.parentNode;
            }, DefaultDomRenderer2.prototype.nextSibling = function(node) {
                return node.nextSibling;
            }, DefaultDomRenderer2.prototype.setAttribute = function(el, name, value, namespace) {
                if (namespace) {
                    name = namespace + ":" + name;
                    var namespaceUri = NAMESPACE_URIS[namespace];
                    namespaceUri ? el.setAttributeNS(namespaceUri, name, value) : el.setAttribute(name, value);
                } else el.setAttribute(name, value);
            }, DefaultDomRenderer2.prototype.removeAttribute = function(el, name, namespace) {
                if (namespace) {
                    var namespaceUri = NAMESPACE_URIS[namespace];
                    namespaceUri ? el.removeAttributeNS(namespaceUri, name) : el.removeAttribute(namespace + ":" + name);
                } else el.removeAttribute(name);
            }, DefaultDomRenderer2.prototype.addClass = function(el, name) {
                el.classList.add(name);
            }, DefaultDomRenderer2.prototype.removeClass = function(el, name) {
                el.classList.remove(name);
            }, DefaultDomRenderer2.prototype.setStyle = function(el, style, value, flags) {
                flags & RendererStyleFlags2.DashCase ? el.style.setProperty(style, value, flags & RendererStyleFlags2.Important ? "important" : "") : el.style[style] = value;
            }, DefaultDomRenderer2.prototype.removeStyle = function(el, style, flags) {
                flags & RendererStyleFlags2.DashCase ? el.style.removeProperty(style) : el.style[style] = "";
            }, DefaultDomRenderer2.prototype.setProperty = function(el, name, value) {
                checkNoSyntheticProp(name, "property"), el[name] = value;
            }, DefaultDomRenderer2.prototype.setValue = function(node, value) {
                node.nodeValue = value;
            }, DefaultDomRenderer2.prototype.listen = function(target, event, callback) {
                return checkNoSyntheticProp(event, "listener"), "string" == typeof target ? this.eventManager.addGlobalEventListener(target, event, decoratePreventDefault(callback)) : this.eventManager.addEventListener(target, event, decoratePreventDefault(callback));
            }, DefaultDomRenderer2;
        }(), AT_CHARCODE = "@".charCodeAt(0);
        function checkNoSyntheticProp(name, nameKind) {
            if (name.charCodeAt(0) === AT_CHARCODE) throw new Error("Found the synthetic " + nameKind + " " + name + '. Please include either "BrowserAnimationsModule" or "NoopAnimationsModule" in your application.');
        }
        var blackListedMap, platform_browser_EmulatedEncapsulationDomRenderer2 = function(_super) {
            function EmulatedEncapsulationDomRenderer2(eventManager, sharedStylesHost, component) {
                var _this = _super.call(this, eventManager) || this;
                _this.component = component;
                var styles = flattenStyles(component.id, component.styles, []);
                return sharedStylesHost.addStyles(styles), _this.contentAttr = CONTENT_ATTR.replace(COMPONENT_REGEX, component.id), 
                _this.hostAttr = HOST_ATTR.replace(COMPONENT_REGEX, component.id), _this;
            }
            return tslib_tslib_es6_extends(EmulatedEncapsulationDomRenderer2, _super), EmulatedEncapsulationDomRenderer2.prototype.applyToHost = function(element) {
                _super.prototype.setAttribute.call(this, element, this.hostAttr, "");
            }, EmulatedEncapsulationDomRenderer2.prototype.createElement = function(parent, name) {
                var el = _super.prototype.createElement.call(this, parent, name);
                return _super.prototype.setAttribute.call(this, el, this.contentAttr, ""), el;
            }, EmulatedEncapsulationDomRenderer2;
        }(platform_browser_DefaultDomRenderer2), platform_browser_ShadowDomRenderer = function(_super) {
            function ShadowDomRenderer(eventManager, sharedStylesHost, hostEl, component) {
                var _this = _super.call(this, eventManager) || this;
                _this.sharedStylesHost = sharedStylesHost, _this.hostEl = hostEl, _this.component = component, 
                _this.shadowRoot = component.encapsulation === ViewEncapsulation.ShadowDom ? hostEl.attachShadow({
                    mode: "open"
                }) : hostEl.createShadowRoot(), _this.sharedStylesHost.addHost(_this.shadowRoot);
                for (var styles = flattenStyles(component.id, component.styles, []), i = 0; i < styles.length; i++) {
                    var styleEl = document.createElement("style");
                    styleEl.textContent = styles[i], _this.shadowRoot.appendChild(styleEl);
                }
                return _this;
            }
            return tslib_tslib_es6_extends(ShadowDomRenderer, _super), ShadowDomRenderer.prototype.nodeOrShadowRoot = function(node) {
                return node === this.hostEl ? this.shadowRoot : node;
            }, ShadowDomRenderer.prototype.destroy = function() {
                this.sharedStylesHost.removeHost(this.shadowRoot);
            }, ShadowDomRenderer.prototype.appendChild = function(parent, newChild) {
                return _super.prototype.appendChild.call(this, this.nodeOrShadowRoot(parent), newChild);
            }, ShadowDomRenderer.prototype.insertBefore = function(parent, newChild, refChild) {
                return _super.prototype.insertBefore.call(this, this.nodeOrShadowRoot(parent), newChild, refChild);
            }, ShadowDomRenderer.prototype.removeChild = function(parent, oldChild) {
                return _super.prototype.removeChild.call(this, this.nodeOrShadowRoot(parent), oldChild);
            }, ShadowDomRenderer.prototype.parentNode = function(node) {
                return this.nodeOrShadowRoot(_super.prototype.parentNode.call(this, this.nodeOrShadowRoot(node)));
            }, ShadowDomRenderer;
        }(platform_browser_DefaultDomRenderer2), __symbol__ = "undefined" != typeof Zone && Zone.__symbol__ || function(v) {
            return "__zone_symbol__" + v;
        }, ADD_EVENT_LISTENER = __symbol__("addEventListener"), REMOVE_EVENT_LISTENER = __symbol__("removeEventListener"), symbolNames = {}, stopSymbol = "__zone_symbol__propagationStopped";
        "undefined" != typeof Zone && Zone[__symbol__("BLACK_LISTED_EVENTS")] && (blackListedMap = {});
        var isBlackListedEvent = function(eventName) {
            return !!blackListedMap && blackListedMap.hasOwnProperty(eventName);
        }, globalListener = function(event) {
            var symbolName = symbolNames[event.type];
            if (symbolName) {
                var taskDatas = this[symbolName];
                if (taskDatas) {
                    var args = [ event ];
                    if (1 === taskDatas.length) return (taskData = taskDatas[0]).zone !== Zone.current ? taskData.zone.run(taskData.handler, this, args) : taskData.handler.apply(this, args);
                    for (var copiedTasks = taskDatas.slice(), i = 0; i < copiedTasks.length && !0 !== event[stopSymbol]; i++) {
                        var taskData;
                        (taskData = copiedTasks[i]).zone !== Zone.current ? taskData.zone.run(taskData.handler, this, args) : taskData.handler.apply(this, args);
                    }
                }
            }
        }, platform_browser_DomEventsPlugin = function(_super) {
            function DomEventsPlugin(doc, ngZone, platformId) {
                var _this = _super.call(this, doc) || this;
                return _this.ngZone = ngZone, platformId && function(platformId) {
                    return platformId === PLATFORM_SERVER_ID;
                }(platformId) || _this.patchEvent(), _this;
            }
            return tslib_tslib_es6_extends(DomEventsPlugin, _super), DomEventsPlugin.prototype.patchEvent = function() {
                if ("undefined" != typeof Event && Event && Event.prototype && !Event.prototype.__zone_symbol__stopImmediatePropagation) {
                    var delegate = Event.prototype.__zone_symbol__stopImmediatePropagation = Event.prototype.stopImmediatePropagation;
                    Event.prototype.stopImmediatePropagation = function() {
                        this && (this[stopSymbol] = !0), delegate && delegate.apply(this, arguments);
                    };
                }
            }, DomEventsPlugin.prototype.supports = function(eventName) {
                return !0;
            }, DomEventsPlugin.prototype.addEventListener = function(element, eventName, handler) {
                var _this = this, callback = handler;
                if (!element[ADD_EVENT_LISTENER] || NgZone.isInAngularZone() && !isBlackListedEvent(eventName)) element.addEventListener(eventName, callback, !1); else {
                    var symbolName = symbolNames[eventName];
                    symbolName || (symbolName = symbolNames[eventName] = __symbol__("ANGULAR" + eventName + "FALSE"));
                    var taskDatas = element[symbolName], globalListenerRegistered = taskDatas && taskDatas.length > 0;
                    taskDatas || (taskDatas = element[symbolName] = []);
                    var zone = isBlackListedEvent(eventName) ? Zone.root : Zone.current;
                    if (0 === taskDatas.length) taskDatas.push({
                        zone: zone,
                        handler: callback
                    }); else {
                        for (var callbackRegistered = !1, i = 0; i < taskDatas.length; i++) if (taskDatas[i].handler === callback) {
                            callbackRegistered = !0;
                            break;
                        }
                        callbackRegistered || taskDatas.push({
                            zone: zone,
                            handler: callback
                        });
                    }
                    globalListenerRegistered || element[ADD_EVENT_LISTENER](eventName, globalListener, !1);
                }
                return function() {
                    return _this.removeEventListener(element, eventName, callback);
                };
            }, DomEventsPlugin.prototype.removeEventListener = function(target, eventName, callback) {
                var underlyingRemove = target[REMOVE_EVENT_LISTENER];
                if (!underlyingRemove) return target.removeEventListener.apply(target, [ eventName, callback, !1 ]);
                var symbolName = symbolNames[eventName], taskDatas = symbolName && target[symbolName];
                if (!taskDatas) return target.removeEventListener.apply(target, [ eventName, callback, !1 ]);
                for (var found = !1, i = 0; i < taskDatas.length; i++) if (taskDatas[i].handler === callback) {
                    found = !0, taskDatas.splice(i, 1);
                    break;
                }
                found ? 0 === taskDatas.length && underlyingRemove.apply(target, [ eventName, globalListener, !1 ]) : target.removeEventListener.apply(target, [ eventName, callback, !1 ]);
            }, DomEventsPlugin.ngInjectableDef = defineInjectable({
                token: DomEventsPlugin,
                factory: function(t) {
                    return new (t || DomEventsPlugin)(inject(DOCUMENT), inject(NgZone), inject(PLATFORM_ID, 8));
                },
                providedIn: null
            }), DomEventsPlugin;
        }(EventManagerPlugin), EVENT_NAMES = {
            pan: !0,
            panstart: !0,
            panmove: !0,
            panend: !0,
            pancancel: !0,
            panleft: !0,
            panright: !0,
            panup: !0,
            pandown: !0,
            pinch: !0,
            pinchstart: !0,
            pinchmove: !0,
            pinchend: !0,
            pinchcancel: !0,
            pinchin: !0,
            pinchout: !0,
            press: !0,
            pressup: !0,
            rotate: !0,
            rotatestart: !0,
            rotatemove: !0,
            rotateend: !0,
            rotatecancel: !0,
            swipe: !0,
            swipeleft: !0,
            swiperight: !0,
            swipeup: !0,
            swipedown: !0,
            tap: !0
        }, HAMMER_GESTURE_CONFIG = new InjectionToken("HammerGestureConfig"), HAMMER_LOADER = new InjectionToken("HammerLoader"), platform_browser_HammerGestureConfig = function() {
            function HammerGestureConfig() {
                this.events = [], this.overrides = {};
            }
            return HammerGestureConfig.prototype.buildHammer = function(element) {
                var mc = new Hammer(element, this.options);
                for (var eventName in mc.get("pinch").set({
                    enable: !0
                }), mc.get("rotate").set({
                    enable: !0
                }), this.overrides) mc.get(eventName).set(this.overrides[eventName]);
                return mc;
            }, HammerGestureConfig.ngInjectableDef = defineInjectable({
                token: HammerGestureConfig,
                factory: function(t) {
                    return new (t || HammerGestureConfig)();
                },
                providedIn: null
            }), HammerGestureConfig;
        }(), platform_browser_HammerGesturesPlugin = function(_super) {
            function HammerGesturesPlugin(doc, _config, console, loader) {
                var _this = _super.call(this, doc) || this;
                return _this._config = _config, _this.console = console, _this.loader = loader, 
                _this;
            }
            return tslib_tslib_es6_extends(HammerGesturesPlugin, _super), HammerGesturesPlugin.prototype.supports = function(eventName) {
                return !(!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName) || !window.Hammer && !this.loader && (this.console.warn('The "' + eventName + '" event cannot be bound because Hammer.JS is not loaded and no custom loader has been specified.'), 
                1));
            }, HammerGesturesPlugin.prototype.addEventListener = function(element, eventName, handler) {
                var _this = this, zone = this.manager.getZone();
                if (eventName = eventName.toLowerCase(), !window.Hammer && this.loader) {
                    var cancelRegistration_1 = !1, deregister_1 = function() {
                        cancelRegistration_1 = !0;
                    };
                    return this.loader().then(function() {
                        if (!window.Hammer) return _this.console.warn("The custom HAMMER_LOADER completed, but Hammer.JS is not present."), 
                        void (deregister_1 = function() {});
                        cancelRegistration_1 || (deregister_1 = _this.addEventListener(element, eventName, handler));
                    }).catch(function() {
                        _this.console.warn('The "' + eventName + '" event cannot be bound because the custom Hammer.JS loader failed.'), 
                        deregister_1 = function() {};
                    }), function() {
                        deregister_1();
                    };
                }
                return zone.runOutsideAngular(function() {
                    var mc = _this._config.buildHammer(element), callback = function(eventObj) {
                        zone.runGuarded(function() {
                            handler(eventObj);
                        });
                    };
                    return mc.on(eventName, callback), function() {
                        mc.off(eventName, callback), "function" == typeof mc.destroy && mc.destroy();
                    };
                });
            }, HammerGesturesPlugin.prototype.isCustomEvent = function(eventName) {
                return this._config.events.indexOf(eventName) > -1;
            }, HammerGesturesPlugin.ngInjectableDef = defineInjectable({
                token: HammerGesturesPlugin,
                factory: function(t) {
                    return new (t || HammerGesturesPlugin)(inject(DOCUMENT), inject(HAMMER_GESTURE_CONFIG), inject(Console), inject(HAMMER_LOADER, 8));
                },
                providedIn: null
            }), HammerGesturesPlugin;
        }(EventManagerPlugin), MODIFIER_KEYS = [ "alt", "control", "meta", "shift" ], MODIFIER_KEY_GETTERS = {
            alt: function(event) {
                return event.altKey;
            },
            control: function(event) {
                return event.ctrlKey;
            },
            meta: function(event) {
                return event.metaKey;
            },
            shift: function(event) {
                return event.shiftKey;
            }
        }, platform_browser_KeyEventsPlugin = function(_super) {
            function KeyEventsPlugin(doc) {
                return _super.call(this, doc) || this;
            }
            var KeyEventsPlugin_1;
            return tslib_tslib_es6_extends(KeyEventsPlugin, _super), KeyEventsPlugin_1 = KeyEventsPlugin, 
            KeyEventsPlugin.prototype.supports = function(eventName) {
                return null != KeyEventsPlugin_1.parseEventName(eventName);
            }, KeyEventsPlugin.prototype.addEventListener = function(element, eventName, handler) {
                var parsedEvent = KeyEventsPlugin_1.parseEventName(eventName), outsideHandler = KeyEventsPlugin_1.eventCallback(parsedEvent.fullKey, handler, this.manager.getZone());
                return this.manager.getZone().runOutsideAngular(function() {
                    return getDOM().onAndCancel(element, parsedEvent.domEventName, outsideHandler);
                });
            }, KeyEventsPlugin.parseEventName = function(eventName) {
                var parts = eventName.toLowerCase().split("."), domEventName = parts.shift();
                if (0 === parts.length || "keydown" !== domEventName && "keyup" !== domEventName) return null;
                var key = KeyEventsPlugin_1._normalizeKey(parts.pop()), fullKey = "";
                if (MODIFIER_KEYS.forEach(function(modifierName) {
                    var index = parts.indexOf(modifierName);
                    index > -1 && (parts.splice(index, 1), fullKey += modifierName + ".");
                }), fullKey += key, 0 != parts.length || 0 === key.length) return null;
                var result = {};
                return result.domEventName = domEventName, result.fullKey = fullKey, result;
            }, KeyEventsPlugin.getEventFullKey = function(event) {
                var fullKey = "", key = getDOM().getEventKey(event);
                return " " === (key = key.toLowerCase()) ? key = "space" : "." === key && (key = "dot"), 
                MODIFIER_KEYS.forEach(function(modifierName) {
                    modifierName != key && (0, MODIFIER_KEY_GETTERS[modifierName])(event) && (fullKey += modifierName + ".");
                }), fullKey += key;
            }, KeyEventsPlugin.eventCallback = function(fullKey, handler, zone) {
                return function(event) {
                    KeyEventsPlugin_1.getEventFullKey(event) === fullKey && zone.runGuarded(function() {
                        return handler(event);
                    });
                };
            }, KeyEventsPlugin._normalizeKey = function(keyName) {
                switch (keyName) {
                  case "esc":
                    return "escape";

                  default:
                    return keyName;
                }
            }, KeyEventsPlugin.ngInjectableDef = defineInjectable({
                token: KeyEventsPlugin,
                factory: function(t) {
                    return new (t || KeyEventsPlugin)(inject(DOCUMENT));
                },
                providedIn: null
            }), KeyEventsPlugin;
        }(EventManagerPlugin), DomSanitizer = function() {
            return function() {};
        }(), platform_browser_DomSanitizerImpl = function(_super) {
            function DomSanitizerImpl(_doc) {
                var _this = _super.call(this) || this;
                return _this._doc = _doc, _this;
            }
            return tslib_tslib_es6_extends(DomSanitizerImpl, _super), DomSanitizerImpl.prototype.sanitize = function(ctx, value) {
                if (null == value) return null;
                switch (ctx) {
                  case SecurityContext.NONE:
                    return value;

                  case SecurityContext.HTML:
                    return value instanceof platform_browser_SafeHtmlImpl ? value.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(value, "HTML"), 
                    function(defaultDoc, unsafeHtmlInput) {
                        var inertBodyElement = null;
                        try {
                            inertBodyHelper = inertBodyHelper || new InertBodyHelper(defaultDoc);
                            var unsafeHtml = unsafeHtmlInput ? String(unsafeHtmlInput) : "";
                            inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeHtml);
                            var mXSSAttempts = 5, parsedHtml = unsafeHtml;
                            do {
                                if (0 === mXSSAttempts) throw new Error("Failed to sanitize html because the input is unstable");
                                mXSSAttempts--, unsafeHtml = parsedHtml, parsedHtml = inertBodyElement.innerHTML, 
                                inertBodyElement = inertBodyHelper.getInertBodyElement(unsafeHtml);
                            } while (unsafeHtml !== parsedHtml);
                            var sanitizer = new SanitizingHtmlSerializer(), safeHtml = sanitizer.sanitizeChildren(getTemplateContent(inertBodyElement) || inertBodyElement);
                            return isDevMode() && sanitizer.sanitizedSomething && console.warn("WARNING: sanitizing HTML stripped some content, see http://g.co/ng/security#xss"), 
                            safeHtml;
                        } finally {
                            if (inertBodyElement) for (var parent_1 = getTemplateContent(inertBodyElement) || inertBodyElement; parent_1.firstChild; ) parent_1.removeChild(parent_1.firstChild);
                        }
                    }(this._doc, String(value)));

                  case SecurityContext.STYLE:
                    return value instanceof platform_browser_SafeStyleImpl ? value.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(value, "Style"), 
                    function(value) {
                        if (!(value = String(value).trim())) return "";
                        var urlMatch = value.match(URL_RE);
                        return urlMatch && _sanitizeUrl(urlMatch[1]) === urlMatch[1] || value.match(SAFE_STYLE_VALUE) && function(value) {
                            for (var outsideSingle = !0, outsideDouble = !0, i = 0; i < value.length; i++) {
                                var c = value.charAt(i);
                                "'" === c && outsideDouble ? outsideSingle = !outsideSingle : '"' === c && outsideSingle && (outsideDouble = !outsideDouble);
                            }
                            return outsideSingle && outsideDouble;
                        }(value) ? value : (isDevMode() && console.warn("WARNING: sanitizing unsafe style value " + value + " (see http://g.co/ng/security#xss)."), 
                        "unsafe");
                    }(value));

                  case SecurityContext.SCRIPT:
                    if (value instanceof platform_browser_SafeScriptImpl) return value.changingThisBreaksApplicationSecurity;
                    throw this.checkNotSafeValue(value, "Script"), new Error("unsafe value used in a script context");

                  case SecurityContext.URL:
                    return value instanceof platform_browser_SafeResourceUrlImpl || value instanceof platform_browser_SafeUrlImpl ? value.changingThisBreaksApplicationSecurity : (this.checkNotSafeValue(value, "URL"), 
                    _sanitizeUrl(String(value)));

                  case SecurityContext.RESOURCE_URL:
                    if (value instanceof platform_browser_SafeResourceUrlImpl) return value.changingThisBreaksApplicationSecurity;
                    throw this.checkNotSafeValue(value, "ResourceURL"), new Error("unsafe value used in a resource URL context (see http://g.co/ng/security#xss)");

                  default:
                    throw new Error("Unexpected SecurityContext " + ctx + " (see http://g.co/ng/security#xss)");
                }
            }, DomSanitizerImpl.prototype.checkNotSafeValue = function(value, expectedType) {
                if (value instanceof SafeValueImpl) throw new Error("Required a safe " + expectedType + ", got a " + value.getTypeName() + " (see http://g.co/ng/security#xss)");
            }, DomSanitizerImpl.prototype.bypassSecurityTrustHtml = function(value) {
                return new platform_browser_SafeHtmlImpl(value);
            }, DomSanitizerImpl.prototype.bypassSecurityTrustStyle = function(value) {
                return new platform_browser_SafeStyleImpl(value);
            }, DomSanitizerImpl.prototype.bypassSecurityTrustScript = function(value) {
                return new platform_browser_SafeScriptImpl(value);
            }, DomSanitizerImpl.prototype.bypassSecurityTrustUrl = function(value) {
                return new platform_browser_SafeUrlImpl(value);
            }, DomSanitizerImpl.prototype.bypassSecurityTrustResourceUrl = function(value) {
                return new platform_browser_SafeResourceUrlImpl(value);
            }, DomSanitizerImpl.ngInjectableDef = defineInjectable({
                token: DomSanitizerImpl,
                factory: function(t) {
                    return new (t || DomSanitizerImpl)(inject(DOCUMENT));
                },
                providedIn: null
            }), DomSanitizerImpl;
        }(DomSanitizer), SafeValueImpl = function() {
            function SafeValueImpl(changingThisBreaksApplicationSecurity) {
                this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
            }
            return SafeValueImpl.prototype.toString = function() {
                return "SafeValue must use [property]=binding: " + this.changingThisBreaksApplicationSecurity + " (see http://g.co/ng/security#xss)";
            }, SafeValueImpl;
        }(), platform_browser_SafeHtmlImpl = function(_super) {
            function SafeHtmlImpl() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return tslib_tslib_es6_extends(SafeHtmlImpl, _super), SafeHtmlImpl.prototype.getTypeName = function() {
                return "HTML";
            }, SafeHtmlImpl;
        }(SafeValueImpl), platform_browser_SafeStyleImpl = function(_super) {
            function SafeStyleImpl() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return tslib_tslib_es6_extends(SafeStyleImpl, _super), SafeStyleImpl.prototype.getTypeName = function() {
                return "Style";
            }, SafeStyleImpl;
        }(SafeValueImpl), platform_browser_SafeScriptImpl = function(_super) {
            function SafeScriptImpl() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return tslib_tslib_es6_extends(SafeScriptImpl, _super), SafeScriptImpl.prototype.getTypeName = function() {
                return "Script";
            }, SafeScriptImpl;
        }(SafeValueImpl), platform_browser_SafeUrlImpl = function(_super) {
            function SafeUrlImpl() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return tslib_tslib_es6_extends(SafeUrlImpl, _super), SafeUrlImpl.prototype.getTypeName = function() {
                return "URL";
            }, SafeUrlImpl;
        }(SafeValueImpl), platform_browser_SafeResourceUrlImpl = function(_super) {
            function SafeResourceUrlImpl() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return tslib_tslib_es6_extends(SafeResourceUrlImpl, _super), SafeResourceUrlImpl.prototype.getTypeName = function() {
                return "ResourceURL";
            }, SafeResourceUrlImpl;
        }(SafeValueImpl), BROWSER_SANITIZATION_PROVIDERS = [ {
            provide: Sanitizer,
            useExisting: DomSanitizer
        }, {
            provide: DomSanitizer,
            useClass: platform_browser_DomSanitizerImpl,
            deps: [ DOCUMENT ]
        } ], platformBrowser = createPlatformFactory(platformCore, "browser", [ {
            provide: PLATFORM_ID,
            useValue: "browser"
        }, {
            provide: PLATFORM_INITIALIZER,
            useValue: function() {
                platform_browser_BrowserDomAdapter.makeCurrent(), platform_browser_BrowserGetTestability.init();
            },
            multi: !0
        }, {
            provide: PlatformLocation,
            useClass: platform_browser_BrowserPlatformLocation,
            deps: [ DOCUMENT ]
        }, {
            provide: DOCUMENT,
            useFactory: function() {
                return document;
            },
            deps: []
        } ]), BROWSER_MODULE_PROVIDERS = [ BROWSER_SANITIZATION_PROVIDERS, {
            provide: APP_ROOT,
            useValue: !0
        }, {
            provide: ErrorHandler,
            useFactory: function() {
                return new ErrorHandler();
            },
            deps: []
        }, {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: platform_browser_DomEventsPlugin,
            multi: !0,
            deps: [ DOCUMENT, NgZone, PLATFORM_ID ]
        }, {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: platform_browser_KeyEventsPlugin,
            multi: !0,
            deps: [ DOCUMENT ]
        }, {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: platform_browser_HammerGesturesPlugin,
            multi: !0,
            deps: [ DOCUMENT, HAMMER_GESTURE_CONFIG, Console, [ new Optional(), HAMMER_LOADER ] ]
        }, {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: platform_browser_HammerGestureConfig,
            deps: []
        }, {
            provide: platform_browser_DomRendererFactory2,
            useClass: platform_browser_DomRendererFactory2,
            deps: [ platform_browser_EventManager, platform_browser_DomSharedStylesHost ]
        }, {
            provide: RendererFactory2,
            useExisting: platform_browser_DomRendererFactory2
        }, {
            provide: platform_browser_SharedStylesHost,
            useExisting: platform_browser_DomSharedStylesHost
        }, {
            provide: platform_browser_DomSharedStylesHost,
            useClass: platform_browser_DomSharedStylesHost,
            deps: [ DOCUMENT ]
        }, {
            provide: Testability,
            useClass: Testability,
            deps: [ NgZone ]
        }, {
            provide: platform_browser_EventManager,
            useClass: platform_browser_EventManager,
            deps: [ EVENT_MANAGER_PLUGINS, NgZone ]
        }, ELEMENT_PROBE_PROVIDERS ], platform_browser_BrowserModule = function() {
            function BrowserModule(parentModule) {
                if (parentModule) throw new Error("BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead.");
            }
            var BrowserModule_1;
            return BrowserModule_1 = BrowserModule, BrowserModule.withServerTransition = function(params) {
                return {
                    ngModule: BrowserModule_1,
                    providers: [ {
                        provide: APP_ID,
                        useValue: params.appId
                    }, {
                        provide: TRANSITION_ID,
                        useExisting: APP_ID
                    }, SERVER_TRANSITION_PROVIDERS ]
                };
            }, BrowserModule.ngModuleDef = defineNgModule({
                type: BrowserModule
            }), BrowserModule.ngInjectorDef = defineInjector({
                factory: function(t) {
                    return new (t || BrowserModule)(inject(BrowserModule_1, 12));
                },
                providers: BROWSER_MODULE_PROVIDERS,
                imports: [ common_CommonModule, ApplicationModule ]
            }), BrowserModule;
        }();
        "undefined" != typeof window && window;
        var app_module_AppComponent = function() {
            function AppComponent() {}
            return AppComponent.ngComponentDef = ((def = {
                type: type = (componentDefinition = {
                    type: AppComponent,
                    selectors: [ [ "hello-world" ] ],
                    factory: function(t) {
                        return new (t || AppComponent)();
                    },
                    consts: 1,
                    vars: 0,
                    template: function(rf, ctx) {
                        var index, value, lView, textNative, tNode;
                        1 & rf && (index = 0, value = "Hello World!", lView = getLView(), textNative = function(value, renderer) {
                            return isProceduralRenderer(renderer) ? renderer.createText(renderStringify(value)) : renderer.createTextNode(renderStringify(value));
                        }(value, lView[RENDERER]), tNode = createNodeAtIndex(index, 3, textNative, null, null), 
                        setIsParent(!1), appendChild(textNative, tNode, lView));
                    },
                    encapsulation: 2
                }).type,
                providersResolver: null,
                consts: componentDefinition.consts,
                vars: componentDefinition.vars,
                factory: componentDefinition.factory,
                template: componentDefinition.template || null,
                ngContentSelectors: componentDefinition.ngContentSelectors,
                hostBindings: componentDefinition.hostBindings || null,
                contentQueries: componentDefinition.contentQueries || null,
                declaredInputs: declaredInputs = {},
                inputs: null,
                outputs: null,
                exportAs: componentDefinition.exportAs || null,
                onChanges: null,
                onInit: (typePrototype = type.prototype).ngOnInit || null,
                doCheck: typePrototype.ngDoCheck || null,
                afterContentInit: typePrototype.ngAfterContentInit || null,
                afterContentChecked: typePrototype.ngAfterContentChecked || null,
                afterViewInit: typePrototype.ngAfterViewInit || null,
                afterViewChecked: typePrototype.ngAfterViewChecked || null,
                onDestroy: typePrototype.ngOnDestroy || null,
                onPush: componentDefinition.changeDetection === ChangeDetectionStrategy.OnPush,
                directiveDefs: null,
                pipeDefs: null,
                selectors: componentDefinition.selectors,
                viewQuery: componentDefinition.viewQuery || null,
                features: componentDefinition.features || null,
                data: componentDefinition.data || {},
                encapsulation: componentDefinition.encapsulation || ViewEncapsulation.Emulated,
                id: "c",
                styles: componentDefinition.styles || EMPTY_ARRAY$1,
                _: null,
                setInput: null,
                schemas: componentDefinition.schemas || null
            })._ = "" + {
                toString: function() {
                    var directiveTypes = componentDefinition.directives, feature = componentDefinition.features, pipeTypes = componentDefinition.pipes;
                    def.id += _renderCompCount++, def.inputs = invertObject(componentDefinition.inputs, declaredInputs), 
                    def.outputs = invertObject(componentDefinition.outputs), feature && feature.forEach(function(fn) {
                        return fn(def);
                    }), def.directiveDefs = directiveTypes ? function() {
                        return ("function" == typeof directiveTypes ? directiveTypes() : directiveTypes).map(extractDirectiveDef);
                    } : null, def.pipeDefs = pipeTypes ? function() {
                        return ("function" == typeof pipeTypes ? pipeTypes() : pipeTypes).map(extractPipeDef);
                    } : null;
                }
            }, def), AppComponent;
            var componentDefinition, type, typePrototype, declaredInputs, def;
        }(), app_module_AppModule = function() {
            function AppModule() {}
            return AppModule.ngModuleDef = defineNgModule({
                type: AppModule,
                bootstrap: [ app_module_AppComponent ]
            }), AppModule.ngInjectorDef = defineInjector({
                factory: function(t) {
                    return new (t || AppModule)();
                },
                imports: [ [ platform_browser_BrowserModule ] ]
            }), AppModule;
        }();
        !function() {
            if (_runModeLocked) throw new Error("Cannot enable prod mode after platform setup.");
            _devMode = !1;
        }(), platformBrowser().bootstrapModule(app_module_AppModule).catch(function(err) {
            return console.error(err);
        });
    },
    crnd: function(module, exports) {
        function webpackEmptyAsyncContext(req) {
            return Promise.resolve().then(function() {
                var e = new Error("Cannot find module '" + req + "'");
                throw e.code = "MODULE_NOT_FOUND", e;
            });
        }
        webpackEmptyAsyncContext.keys = function() {
            return [];
        }, webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext, module.exports = webpackEmptyAsyncContext, 
        webpackEmptyAsyncContext.id = "crnd";
    }
}, [ [ 0, 1 ] ] ]);
//# sourceMappingURL=main.js.map