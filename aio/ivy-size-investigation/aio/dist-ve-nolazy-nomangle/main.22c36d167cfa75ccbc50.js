(window.webpackJsonp = window.webpackJsonp || []).push([ [ 1 ], {
    0: function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__("zUnb");
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
    },
    zUnb: function(module, __webpack_exports__, __webpack_require__) {
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
        function __decorate(decorators, target, key, desc) {
            var d, c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc;
            if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
            return c > 3 && r && Object.defineProperty(target, key, r), r;
        }
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
            return null !== x && "object" == typeof x;
        }
        function isFunction(x) {
            return "function" == typeof x;
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
                    if (isFunction(_unsubscribe)) try {
                        _unsubscribe.call(this);
                    } catch (e) {
                        hasErrors = !0, errors = e instanceof UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [ e ];
                    }
                    if (isArray(_subscriptions)) for (index = -1, len = _subscriptions.length; ++index < len; ) {
                        var sub = _subscriptions[index];
                        if (isObject(sub)) try {
                            sub.unsubscribe();
                        } catch (e) {
                            hasErrors = !0, errors = errors || [], e instanceof UnsubscriptionError ? errors = errors.concat(flattenUnsubscriptionErrors(e.errors)) : errors.push(e);
                        }
                    }
                    if (hasErrors) throw new UnsubscriptionError(errors);
                }
            }, Subscription.prototype.add = function(teardown) {
                var subscription = teardown;
                switch (typeof teardown) {
                  case "function":
                    subscription = new Subscription(teardown);

                  case "object":
                    if (subscription === this || subscription.closed || "function" != typeof subscription.unsubscribe) return subscription;
                    if (this.closed) return subscription.unsubscribe(), subscription;
                    if (!(subscription instanceof Subscription)) {
                        var tmp = subscription;
                        (subscription = new Subscription())._subscriptions = [ tmp ];
                    }
                    break;

                  default:
                    if (!teardown) return Subscription.EMPTY;
                    throw new Error("unrecognized teardown " + teardown + " added to Subscription.");
                }
                if (subscription._addParent(this)) {
                    var subscriptions = this._subscriptions;
                    subscriptions ? subscriptions.push(subscription) : this._subscriptions = [ subscription ];
                }
                return subscription;
            }, Subscription.prototype.remove = function(subscription) {
                var subscriptions = this._subscriptions;
                if (subscriptions) {
                    var subscriptionIndex = subscriptions.indexOf(subscription);
                    -1 !== subscriptionIndex && subscriptions.splice(subscriptionIndex, 1);
                }
            }, Subscription.prototype._addParent = function(parent) {
                var _parent = this._parent, _parents = this._parents;
                return _parent !== parent && (_parent ? _parents ? -1 === _parents.indexOf(parent) && (_parents.push(parent), 
                !0) : (this._parents = [ parent ], !0) : (this._parent = parent, !0));
            }, Subscription.EMPTY = ((empty = new Subscription()).closed = !0, empty), Subscription;
        }();
        function flattenUnsubscriptionErrors(errors) {
            return errors.reduce(function(errs, err) {
                return errs.concat(err instanceof UnsubscriptionError ? err.errors : err);
            }, []);
        }
        var _enable_super_gross_mode_that_will_cause_bad_things = !1, config_config = {
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
                if (config_config.useDeprecatedSynchronousErrorHandling) throw err;
                hostReportError(err);
            },
            complete: function() {}
        }, rxSubscriber = "function" == typeof Symbol ? Symbol("rxSubscriber") : "@@rxSubscriber_" + Math.random(), Subscriber_Subscriber = function(_super) {
            function Subscriber(destinationOrNext, error, complete) {
                var _this = _super.call(this) || this;
                switch (_this.syncErrorValue = null, _this.syncErrorThrown = !1, _this.syncErrorThrowable = !1, 
                _this.isStopped = !1, arguments.length) {
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
            return __extends(Subscriber, _super), Subscriber.prototype[rxSubscriber] = function() {
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
                this.isStopped = !1, this._parent = _parent, this._parents = _parents, this;
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
            return __extends(SafeSubscriber, _super), SafeSubscriber.prototype.next = function(value) {
                if (!this.isStopped && this._next) {
                    var _parentSubscriber = this._parentSubscriber;
                    config_config.useDeprecatedSynchronousErrorHandling && _parentSubscriber.syncErrorThrowable ? this.__tryOrSetError(_parentSubscriber, this._next, value) && this.unsubscribe() : this.__tryOrUnsub(this._next, value);
                }
            }, SafeSubscriber.prototype.error = function(err) {
                if (!this.isStopped) {
                    var _parentSubscriber = this._parentSubscriber, useDeprecatedSynchronousErrorHandling = config_config.useDeprecatedSynchronousErrorHandling;
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
                        config_config.useDeprecatedSynchronousErrorHandling && _parentSubscriber.syncErrorThrowable ? (this.__tryOrSetError(_parentSubscriber, wrappedComplete), 
                        this.unsubscribe()) : (this.__tryOrUnsub(wrappedComplete), this.unsubscribe());
                    } else this.unsubscribe();
                }
            }, SafeSubscriber.prototype.__tryOrUnsub = function(fn, value) {
                try {
                    fn.call(this._context, value);
                } catch (err) {
                    if (this.unsubscribe(), config_config.useDeprecatedSynchronousErrorHandling) throw err;
                    hostReportError(err);
                }
            }, SafeSubscriber.prototype.__tryOrSetError = function(parent, fn, value) {
                if (!config_config.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");
                try {
                    fn.call(this._context, value);
                } catch (err) {
                    return config_config.useDeprecatedSynchronousErrorHandling ? (parent.syncErrorValue = err, 
                    parent.syncErrorThrown = !0, !0) : (hostReportError(err), !0);
                }
                return !1;
            }, SafeSubscriber.prototype._unsubscribe = function() {
                var _parentSubscriber = this._parentSubscriber;
                this._context = null, this._parentSubscriber = null, _parentSubscriber.unsubscribe();
            }, SafeSubscriber;
        }(Subscriber_Subscriber), observable_observable = "function" == typeof Symbol && Symbol.observable || "@@observable";
        function noop() {}
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
                if (sink.add(operator ? operator.call(sink, this.source) : this.source || config_config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink)), 
                config_config.useDeprecatedSynchronousErrorHandling && sink.syncErrorThrowable && (sink.syncErrorThrowable = !1, 
                sink.syncErrorThrown)) throw sink.syncErrorValue;
                return sink;
            }, Observable.prototype._trySubscribe = function(sink) {
                try {
                    return this._subscribe(sink);
                } catch (err) {
                    config_config.useDeprecatedSynchronousErrorHandling && (sink.syncErrorThrown = !0, 
                    sink.syncErrorValue = err), function(observer) {
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
                } : noop)(this);
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
            if (promiseCtor || (promiseCtor = config_config.Promise || Promise), !promiseCtor) throw new Error("no Promise impl found");
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
            return __extends(SubjectSubscription, _super), SubjectSubscription.prototype.unsubscribe = function() {
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
            return __extends(SubjectSubscriber, _super), SubjectSubscriber;
        }(Subscriber_Subscriber), Subject_Subject = function(_super) {
            function Subject() {
                var _this = _super.call(this) || this;
                return _this.observers = [], _this.closed = !1, _this.isStopped = !1, _this.hasError = !1, 
                _this.thrownError = null, _this;
            }
            return __extends(Subject, _super), Subject.prototype[rxSubscriber] = function() {
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
            return __extends(AnonymousSubject, _super), AnonymousSubject.prototype.next = function(value) {
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
        }(Subject_Subject);
        function isScheduler(value) {
            return value && "function" == typeof value.schedule;
        }
        var InnerSubscriber_InnerSubscriber = function(_super) {
            function InnerSubscriber(parent, outerValue, outerIndex) {
                var _this = _super.call(this) || this;
                return _this.parent = parent, _this.outerValue = outerValue, _this.outerIndex = outerIndex, 
                _this.index = 0, _this;
            }
            return __extends(InnerSubscriber, _super), InnerSubscriber.prototype._next = function(value) {
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
            return !!value && "function" != typeof value.subscribe && "function" == typeof value.then;
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
        };
        function subscribeToResult(outerSubscriber, result, outerValue, outerIndex, destination) {
            if (void 0 === destination && (destination = new InnerSubscriber_InnerSubscriber(outerSubscriber, outerValue, outerIndex)), 
            !destination.closed) return subscribeTo(result)(destination);
        }
        var OuterSubscriber_OuterSubscriber = function(_super) {
            function OuterSubscriber() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return __extends(OuterSubscriber, _super), OuterSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                this.destination.next(innerValue);
            }, OuterSubscriber.prototype.notifyError = function(error, innerSub) {
                this.destination.error(error);
            }, OuterSubscriber.prototype.notifyComplete = function(innerSub) {
                this.destination.complete();
            }, OuterSubscriber;
        }(Subscriber_Subscriber);
        function map_map(project, thisArg) {
            return function(source) {
                if ("function" != typeof project) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
                return source.lift(new MapOperator(project, thisArg));
            };
        }
        var MapOperator = function() {
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
            return __extends(MapSubscriber, _super), MapSubscriber.prototype._next = function(value) {
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
        function from_from(input, scheduler) {
            if (!scheduler) return input instanceof Observable_Observable ? input : new Observable_Observable(subscribeTo(input));
            if (null != input) {
                if (function(input) {
                    return input && "function" == typeof input[observable_observable];
                }(input)) return function(input, scheduler) {
                    return new Observable_Observable(scheduler ? function(subscriber) {
                        var sub = new Subscription_Subscription();
                        return sub.add(scheduler.schedule(function() {
                            var observable = input[observable_observable]();
                            sub.add(observable.subscribe({
                                next: function(value) {
                                    sub.add(scheduler.schedule(function() {
                                        return subscriber.next(value);
                                    }));
                                },
                                error: function(err) {
                                    sub.add(scheduler.schedule(function() {
                                        return subscriber.error(err);
                                    }));
                                },
                                complete: function() {
                                    sub.add(scheduler.schedule(function() {
                                        return subscriber.complete();
                                    }));
                                }
                            }));
                        })), sub;
                    } : subscribeToObservable(input));
                }(input, scheduler);
                if (isPromise(input)) return function(input, scheduler) {
                    return new Observable_Observable(scheduler ? function(subscriber) {
                        var sub = new Subscription_Subscription();
                        return sub.add(scheduler.schedule(function() {
                            return input.then(function(value) {
                                sub.add(scheduler.schedule(function() {
                                    subscriber.next(value), sub.add(scheduler.schedule(function() {
                                        return subscriber.complete();
                                    }));
                                }));
                            }, function(err) {
                                sub.add(scheduler.schedule(function() {
                                    return subscriber.error(err);
                                }));
                            });
                        })), sub;
                    } : subscribeToPromise(input));
                }(input, scheduler);
                if (isArrayLike(input)) return fromArray(input, scheduler);
                if (function(input) {
                    return input && "function" == typeof input[iterator_iterator];
                }(input) || "string" == typeof input) return function(input, scheduler) {
                    if (!input) throw new Error("Iterable cannot be null");
                    return new Observable_Observable(scheduler ? function(subscriber) {
                        var iterator, sub = new Subscription_Subscription();
                        return sub.add(function() {
                            iterator && "function" == typeof iterator.return && iterator.return();
                        }), sub.add(scheduler.schedule(function() {
                            iterator = input[iterator_iterator](), sub.add(scheduler.schedule(function() {
                                if (!subscriber.closed) {
                                    var value, done;
                                    try {
                                        var result = iterator.next();
                                        value = result.value, done = result.done;
                                    } catch (err) {
                                        return void subscriber.error(err);
                                    }
                                    done ? subscriber.complete() : (subscriber.next(value), this.schedule());
                                }
                            }));
                        })), sub;
                    } : subscribeToIterable(input));
                }(input, scheduler);
            }
            throw new TypeError((null !== input && typeof input || input) + " is not observable");
        }
        function mergeMap(project, resultSelector, concurrent) {
            return void 0 === concurrent && (concurrent = Number.POSITIVE_INFINITY), "function" == typeof resultSelector ? function(source) {
                return source.pipe(mergeMap(function(a, i) {
                    return from_from(project(a, i)).pipe(map_map(function(b, ii) {
                        return resultSelector(a, b, i, ii);
                    }));
                }, concurrent));
            } : ("number" == typeof resultSelector && (concurrent = resultSelector), function(source) {
                return source.lift(new MergeMapOperator(project, concurrent));
            });
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
            return __extends(MergeMapSubscriber, _super), MergeMapSubscriber.prototype._next = function(value) {
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
                var innerSubscriber = new InnerSubscriber_InnerSubscriber(this, void 0, void 0);
                this.destination.add(innerSubscriber), subscribeToResult(this, ish, value, index, innerSubscriber);
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
        function mergeAll(concurrent) {
            return void 0 === concurrent && (concurrent = Number.POSITIVE_INFINITY), mergeMap(identity, concurrent);
        }
        function merge() {
            for (var observables = [], _i = 0; _i < arguments.length; _i++) observables[_i] = arguments[_i];
            var concurrent = Number.POSITIVE_INFINITY, scheduler = null, last = observables[observables.length - 1];
            return isScheduler(last) ? (scheduler = observables.pop(), observables.length > 1 && "number" == typeof observables[observables.length - 1] && (concurrent = observables.pop())) : "number" == typeof last && (concurrent = observables.pop()), 
            null === scheduler && 1 === observables.length && observables[0] instanceof Observable_Observable ? observables[0] : mergeAll(concurrent)(fromArray(observables, scheduler));
        }
        function refCount_refCount() {
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
            return __extends(RefCountSubscriber, _super), RefCountSubscriber.prototype._unsubscribe = function() {
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
            return __extends(ConnectableObservable, _super), ConnectableObservable.prototype._subscribe = function(subscriber) {
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
                return refCount_refCount()(this);
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
            return __extends(ConnectableSubscriber, _super), ConnectableSubscriber.prototype._error = function(err) {
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
        function multicast(subjectOrSubjectFactory, selector) {
            return function(source) {
                var subjectFactory;
                if (subjectFactory = "function" == typeof subjectOrSubjectFactory ? subjectOrSubjectFactory : function() {
                    return subjectOrSubjectFactory;
                }, "function" == typeof selector) return source.lift(new MulticastOperator(subjectFactory, selector));
                var connectable = Object.create(source, connectableObservableDescriptor);
                return connectable.source = source, connectable.subjectFactory = subjectFactory, 
                connectable;
            };
        }
        var MulticastOperator = function() {
            function MulticastOperator(subjectFactory, selector) {
                this.subjectFactory = subjectFactory, this.selector = selector;
            }
            return MulticastOperator.prototype.call = function(subscriber, source) {
                var selector = this.selector, subject = this.subjectFactory(), subscription = selector(subject).subscribe(subscriber);
                return subscription.add(source.subscribe(subject)), subscription;
            }, MulticastOperator;
        }();
        function shareSubjectFactory() {
            return new Subject_Subject();
        }
        function share() {
            return function(source) {
                return refCount_refCount()(multicast(shareSubjectFactory)(source));
            };
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
        function getInjectableDef(type) {
            return type && type.hasOwnProperty(NG_INJECTABLE_DEF) ? type[NG_INJECTABLE_DEF] : null;
        }
        var NG_INJECTABLE_DEF = getClosureSafeProperty({
            ngInjectableDef: getClosureSafeProperty
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
        function inject(token, flags) {
            return void 0 === flags && (flags = InjectFlags.Default), (_injectImplementation || function(token, flags) {
                if (void 0 === flags && (flags = InjectFlags.Default), void 0 === _currentInjector) throw new Error("inject() must be called from an injection context");
                return null === _currentInjector ? function(token, notFoundValue, flags) {
                    var injectableDef = getInjectableDef(token);
                    if (injectableDef && "root" == injectableDef.providedIn) return void 0 === injectableDef.value ? injectableDef.value = injectableDef.factory() : injectableDef.value;
                    if (flags & InjectFlags.Optional) return null;
                    throw new Error("Injector: NOT_FOUND [" + stringify(token) + "]");
                }(token, 0, flags) : _currentInjector.get(token, flags & InjectFlags.Optional ? null : void 0, flags);
            })(token, flags);
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
        }), NULL_INJECTOR = Injector.NULL, NEW_LINE = /\n/gm, NO_NEW_LINE = "\u0275", StaticInjector = function() {
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
                            throw e instanceof Error || (e = new Error(e)), (e.ngTempTokenPath = e.ngTempTokenPath || []).unshift(token), 
                            record && record.value == CIRCULAR && (record.value = EMPTY), e;
                        }
                    }(token, record, this._records, this.parent, notFoundValue, flags);
                } catch (e) {
                    return function(e, token, injectorErrorName, source) {
                        var tokenPath = e.ngTempTokenPath;
                        throw token[SOURCE] && tokenPath.unshift(token[SOURCE]), e.message = formatError("\n" + e.message, tokenPath, "StaticInjectorError", source), 
                        e.ngTokenPath = tokenPath, e.ngTempTokenPath = null, e;
                    }(e, token, 0, this.source);
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
        var ERROR_DEBUG_CONTEXT = "ngDebugContext", ERROR_ORIGINAL_ERROR = "ngOriginalError", ERROR_LOGGER = "ngErrorLogger", ViewEncapsulation = function(ViewEncapsulation) {
            return ViewEncapsulation[ViewEncapsulation.Emulated = 0] = "Emulated", ViewEncapsulation[ViewEncapsulation.Native = 1] = "Native", 
            ViewEncapsulation[ViewEncapsulation.None = 2] = "None", ViewEncapsulation[ViewEncapsulation.ShadowDom = 3] = "ShadowDom", 
            ViewEncapsulation;
        }({}), defaultScheduler = ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(_global);
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
                    return error[ERROR_LOGGER] || defaultErrorLogger;
                }(error);
                errorLogger(this._console, "ERROR", error), originalError && errorLogger(this._console, "ORIGINAL ERROR", originalError), 
                context && errorLogger(this._console, "ERROR CONTEXT", context);
            }, ErrorHandler.prototype._findContext = function(error) {
                return error ? getDebugContext(error) ? getDebugContext(error) : this._findContext(getOriginalError(error)) : null;
            }, ErrorHandler.prototype._findOriginalError = function(error) {
                for (var e = getOriginalError(error); e && getOriginalError(e); ) e = getOriginalError(e);
                return e;
            }, ErrorHandler;
        }(), _devMode = !0, _runModeLocked = !1;
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
        function isObservable(obj) {
            return !!obj && "function" == typeof obj.subscribe;
        }
        var CAMEL_CASE_REGEXP = /([A-Z])/g;
        function normalizeDebugBindingValue(value) {
            try {
                return null != value ? value.toString().slice(0, 30) : value;
            } catch (e) {
                return "[ERROR] Exception while trying to serialize the value";
            }
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
        function devModeEqual(a, b) {
            var isListLikeIterableA = isListLikeIterable(a), isListLikeIterableB = isListLikeIterable(b);
            return isListLikeIterableA && isListLikeIterableB ? function(a, b, comparator) {
                for (var iterator1 = a[core_getSymbolIterator()](), iterator2 = b[core_getSymbolIterator()](); ;) {
                    var item1 = iterator1.next(), item2 = iterator2.next();
                    if (item1.done && item2.done) return !0;
                    if (item1.done || item2.done) return !1;
                    if (!comparator(item1.value, item2.value)) return !1;
                }
            }(a, b, devModeEqual) : !(isListLikeIterableA || !a || "object" != typeof a && "function" != typeof a || isListLikeIterableB || !b || "object" != typeof b && "function" != typeof b) || looseIdentical(a, b);
        }
        var WrappedValue = function() {
            function WrappedValue(value) {
                this.wrapped = value;
            }
            return WrappedValue.wrap = function(value) {
                return new WrappedValue(value);
            }, WrappedValue.unwrap = function(value) {
                return WrappedValue.isWrapped(value) ? value.wrapped : value;
            }, WrappedValue.isWrapped = function(value) {
                return value instanceof WrappedValue;
            }, WrappedValue;
        }();
        function isListLikeIterable(obj) {
            return !!isJsObject(obj) && (Array.isArray(obj) || !(obj instanceof Map) && core_getSymbolIterator() in obj);
        }
        function isJsObject(o) {
            return null !== o && ("function" == typeof o || "object" == typeof o);
        }
        var SimpleChange = function() {
            function SimpleChange(previousValue, currentValue, firstChange) {
                this.previousValue = previousValue, this.currentValue = currentValue, this.firstChange = firstChange;
            }
            return SimpleChange.prototype.isFirstChange = function() {
                return this.firstChange;
            }, SimpleChange;
        }(), APP_ROOT = new InjectionToken("The presence of this token marks an injector as being the root injector."), core_ComponentRef = function() {
            return function() {};
        }(), core_ComponentFactory = function() {
            return function() {};
        }();
        function noComponentFactoryError(component) {
            var error = Error("No component factory found for " + stringify(component) + ". Did you add it to @NgModule.entryComponents?");
            return error[ERROR_COMPONENT] = component, error;
        }
        var ERROR_COMPONENT = "ngComponent", _NullComponentFactoryResolver = function() {
            function _NullComponentFactoryResolver() {}
            return _NullComponentFactoryResolver.prototype.resolveComponentFactory = function(component) {
                throw noComponentFactoryError(component);
            }, _NullComponentFactoryResolver;
        }(), core_ComponentFactoryResolver = function() {
            function ComponentFactoryResolver() {}
            return ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver(), ComponentFactoryResolver;
        }(), CodegenComponentFactoryResolver = function() {
            function CodegenComponentFactoryResolver(factories, _parent, _ngModule) {
                this._parent = _parent, this._ngModule = _ngModule, this._factories = new Map();
                for (var i = 0; i < factories.length; i++) {
                    var factory = factories[i];
                    this._factories.set(factory.componentType, factory);
                }
            }
            return CodegenComponentFactoryResolver.prototype.resolveComponentFactory = function(component) {
                var factory = this._factories.get(component);
                if (!factory && this._parent && (factory = this._parent.resolveComponentFactory(component)), 
                !factory) throw noComponentFactoryError(component);
                return new core_ComponentFactoryBoundToModule(factory, this._ngModule);
            }, CodegenComponentFactoryResolver;
        }(), core_ComponentFactoryBoundToModule = function(_super) {
            function ComponentFactoryBoundToModule(factory, ngModule) {
                var _this = _super.call(this) || this;
                return _this.factory = factory, _this.ngModule = ngModule, _this.selector = factory.selector, 
                _this.componentType = factory.componentType, _this.ngContentSelectors = factory.ngContentSelectors, 
                _this.inputs = factory.inputs, _this.outputs = factory.outputs, _this;
            }
            return __extends(ComponentFactoryBoundToModule, _super), ComponentFactoryBoundToModule.prototype.create = function(injector, projectableNodes, rootSelectorOrNode, ngModule) {
                return this.factory.create(injector, projectableNodes, rootSelectorOrNode, ngModule || this.ngModule);
            }, ComponentFactoryBoundToModule;
        }(core_ComponentFactory), NgModuleRef = function() {
            return function() {};
        }(), core_NgModuleFactory = function() {
            return function() {};
        }();
        function core_noop() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        }
        var ElementRef = function() {
            function ElementRef(nativeElement) {
                this.nativeElement = nativeElement;
            }
            return ElementRef.__NG_ELEMENT_ID__ = function() {
                return SWITCH_ELEMENT_REF_FACTORY(ElementRef);
            }, ElementRef;
        }(), SWITCH_ELEMENT_REF_FACTORY = core_noop, Renderer = function() {
            return function() {};
        }(), RendererFactory2 = function() {
            return function() {};
        }(), RendererStyleFlags2 = function(RendererStyleFlags2) {
            return RendererStyleFlags2[RendererStyleFlags2.Important = 1] = "Important", RendererStyleFlags2[RendererStyleFlags2.DashCase = 2] = "DashCase", 
            RendererStyleFlags2;
        }({}), Renderer2 = function() {
            function Renderer2() {}
            return Renderer2.__NG_ELEMENT_ID__ = function() {
                return SWITCH_RENDERER2_FACTORY();
            }, Renderer2;
        }(), SWITCH_RENDERER2_FACTORY = core_noop, VERSION = new (function() {
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
        }(), ChangeDetectorRef = function() {
            function ChangeDetectorRef() {}
            return ChangeDetectorRef.__NG_ELEMENT_ID__ = function() {
                return SWITCH_CHANGE_DETECTOR_REF_FACTORY();
            }, ChangeDetectorRef;
        }(), SWITCH_CHANGE_DETECTOR_REF_FACTORY = function() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        }, keyValDiff = [ new DefaultKeyValueDifferFactory() ], defaultIterableDiffers = new IterableDiffers([ new DefaultIterableDifferFactory() ]), defaultKeyValueDiffers = new KeyValueDiffers(keyValDiff), TemplateRef = function() {
            function TemplateRef() {}
            return TemplateRef.__NG_ELEMENT_ID__ = function() {
                return SWITCH_TEMPLATE_REF_FACTORY(TemplateRef, ElementRef);
            }, TemplateRef;
        }(), SWITCH_TEMPLATE_REF_FACTORY = core_noop, ViewContainerRef = function() {
            function ViewContainerRef() {}
            return ViewContainerRef.__NG_ELEMENT_ID__ = function() {
                return SWITCH_VIEW_CONTAINER_REF_FACTORY(ViewContainerRef, ElementRef);
            }, ViewContainerRef;
        }(), SWITCH_VIEW_CONTAINER_REF_FACTORY = core_noop;
        function expressionChangedAfterItHasBeenCheckedError(context, oldValue, currValue, isFirstCheck) {
            var msg = "ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: '" + oldValue + "'. Current value: '" + currValue + "'.";
            return isFirstCheck && (msg += " It seems like the view has been created after its parent and its children have been dirty checked. Has it been created in a change detection hook ?"), 
            function(msg, context) {
                var err = new Error(msg);
                return _addDebugContext(err, context), err;
            }(msg, context);
        }
        function _addDebugContext(err, context) {
            err[ERROR_DEBUG_CONTEXT] = context, err[ERROR_LOGGER] = context.logError.bind(context);
        }
        function viewDestroyedError(action) {
            return new Error("ViewDestroyedError: Attempt to use a destroyed view: " + action);
        }
        function shiftInitState(view, priorInitState, newInitState) {
            var state = view.state, initState = 1792 & state;
            return initState === priorInitState ? (view.state = -1793 & state | newInitState, 
            view.initIndex = -1, !0) : initState === newInitState;
        }
        function shouldCallLifecycleInitHook(view, initState, index) {
            return (1792 & view.state) === initState && view.initIndex <= index && (view.initIndex = index + 1, 
            !0);
        }
        function asTextData(view, index) {
            return view.nodes[index];
        }
        function asElementData(view, index) {
            return view.nodes[index];
        }
        function asProviderData(view, index) {
            return view.nodes[index];
        }
        function asPureExpressionData(view, index) {
            return view.nodes[index];
        }
        function asQueryList(view, index) {
            return view.nodes[index];
        }
        var Services = {
            setCurrentNode: void 0,
            createRootView: void 0,
            createEmbeddedView: void 0,
            createComponentView: void 0,
            createNgModuleRef: void 0,
            overrideProvider: void 0,
            overrideComponentView: void 0,
            clearOverrides: void 0,
            checkAndUpdateView: void 0,
            checkNoChangesView: void 0,
            destroyView: void 0,
            resolveDep: void 0,
            createDebugContext: void 0,
            handleEvent: void 0,
            updateDirectives: void 0,
            updateRenderer: void 0,
            dirtyParentQueries: void 0
        }, NOOP = function() {}, _tokenKeyCache = new Map();
        function tokenKey(token) {
            var key = _tokenKeyCache.get(token);
            return key || (key = stringify(token) + "_" + _tokenKeyCache.size, _tokenKeyCache.set(token, key)), 
            key;
        }
        var UNDEFINED_RENDERER_TYPE_ID = "$$undefined", EMPTY_RENDERER_TYPE_ID = "$$empty";
        function createRendererType2(values) {
            return {
                id: UNDEFINED_RENDERER_TYPE_ID,
                styles: values.styles,
                encapsulation: values.encapsulation,
                data: values.data
            };
        }
        var _renderCompCount$1 = 0;
        function checkBinding(view, def, bindingIdx, value) {
            return !(!(2 & view.state) && looseIdentical(view.oldValues[def.bindingIndex + bindingIdx], value));
        }
        function checkAndUpdateBinding(view, def, bindingIdx, value) {
            return !!checkBinding(view, def, bindingIdx, value) && (view.oldValues[def.bindingIndex + bindingIdx] = value, 
            !0);
        }
        function checkBindingNoChanges(view, def, bindingIdx, value) {
            var oldValue = view.oldValues[def.bindingIndex + bindingIdx];
            if (1 & view.state || !devModeEqual(oldValue, value)) {
                var bindingName = def.bindings[bindingIdx].name;
                throw expressionChangedAfterItHasBeenCheckedError(Services.createDebugContext(view, def.nodeIndex), bindingName + ": " + oldValue, bindingName + ": " + value, 0 != (1 & view.state));
            }
        }
        function markParentViewsForCheck(view) {
            for (var currView = view; currView; ) 2 & currView.def.flags && (currView.state |= 8), 
            currView = currView.viewContainerParent || currView.parent;
        }
        function markParentViewsForCheckProjectedViews(view, endView) {
            for (var currView = view; currView && currView !== endView; ) currView.state |= 64, 
            currView = currView.viewContainerParent || currView.parent;
        }
        function dispatchEvent(view, nodeIndex, eventName, event) {
            try {
                return markParentViewsForCheck(33554432 & view.def.nodes[nodeIndex].flags ? asElementData(view, nodeIndex).componentView : view), 
                Services.handleEvent(view, nodeIndex, eventName, event);
            } catch (e) {
                view.root.errorHandler.handleError(e);
            }
        }
        function declaredViewContainer(view) {
            return view.parent ? asElementData(view.parent, view.parentNodeDef.nodeIndex) : null;
        }
        function viewParentEl(view) {
            return view.parent ? view.parentNodeDef.parent : null;
        }
        function renderNode(view, def) {
            switch (201347067 & def.flags) {
              case 1:
                return asElementData(view, def.nodeIndex).renderElement;

              case 2:
                return asTextData(view, def.nodeIndex).renderText;
            }
        }
        function isComponentView(view) {
            return !!view.parent && !!(32768 & view.parentNodeDef.flags);
        }
        function isEmbeddedView(view) {
            return !(!view.parent || 32768 & view.parentNodeDef.flags);
        }
        function filterQueryId(queryId) {
            return 1 << queryId % 32;
        }
        function splitMatchedQueriesDsl(matchedQueriesDsl) {
            var matchedQueries = {}, matchedQueryIds = 0, references = {};
            return matchedQueriesDsl && matchedQueriesDsl.forEach(function(_a) {
                var _b = __read(_a, 2), queryId = _b[0], valueType = _b[1];
                "number" == typeof queryId ? (matchedQueries[queryId] = valueType, matchedQueryIds |= filterQueryId(queryId)) : references[queryId] = valueType;
            }), {
                matchedQueries: matchedQueries,
                references: references,
                matchedQueryIds: matchedQueryIds
            };
        }
        function splitDepsDsl(deps, sourceName) {
            return deps.map(function(value) {
                var _a, token, flags;
                return Array.isArray(value) ? (flags = (_a = __read(value, 2))[0], token = _a[1]) : (flags = 0, 
                token = value), token && ("function" == typeof token || "object" == typeof token) && sourceName && Object.defineProperty(token, SOURCE, {
                    value: sourceName,
                    configurable: !0
                }), {
                    flags: flags,
                    token: token,
                    tokenKey: tokenKey(token)
                };
            });
        }
        function getParentRenderElement(view, renderHost, def) {
            var renderParent = def.renderParent;
            return renderParent ? 0 == (1 & renderParent.flags) || 0 == (33554432 & renderParent.flags) || renderParent.element.componentRendererType && renderParent.element.componentRendererType.encapsulation === ViewEncapsulation.Native ? asElementData(view, def.renderParent.nodeIndex).renderElement : void 0 : renderHost;
        }
        var DEFINITION_CACHE = new WeakMap();
        function resolveDefinition(factory) {
            var value = DEFINITION_CACHE.get(factory);
            return value || ((value = factory(function() {
                return NOOP;
            })).factory = factory, DEFINITION_CACHE.set(factory, value)), value;
        }
        function visitRootRenderNodes(view, action, parentNode, nextSibling, target) {
            3 === action && (parentNode = view.renderer.parentNode(renderNode(view, view.def.lastRenderRootNode))), 
            visitSiblingRenderNodes(view, action, 0, view.def.nodes.length - 1, parentNode, nextSibling, target);
        }
        function visitSiblingRenderNodes(view, action, startIndex, endIndex, parentNode, nextSibling, target) {
            for (var i = startIndex; i <= endIndex; i++) {
                var nodeDef = view.def.nodes[i];
                11 & nodeDef.flags && visitRenderNode(view, nodeDef, action, parentNode, nextSibling, target), 
                i += nodeDef.childCount;
            }
        }
        function visitProjectedRenderNodes(view, ngContentIndex, action, parentNode, nextSibling, target) {
            for (var compView = view; compView && !isComponentView(compView); ) compView = compView.parent;
            for (var hostView = compView.parent, hostElDef = viewParentEl(compView), endIndex = hostElDef.nodeIndex + hostElDef.childCount, i = hostElDef.nodeIndex + 1; i <= endIndex; i++) {
                var nodeDef = hostView.def.nodes[i];
                nodeDef.ngContentIndex === ngContentIndex && visitRenderNode(hostView, nodeDef, action, parentNode, nextSibling, target), 
                i += nodeDef.childCount;
            }
            if (!hostView.parent) {
                var projectedNodes = view.root.projectableNodes[ngContentIndex];
                if (projectedNodes) for (i = 0; i < projectedNodes.length; i++) execRenderNodeAction(view, projectedNodes[i], action, parentNode, nextSibling, target);
            }
        }
        function visitRenderNode(view, nodeDef, action, parentNode, nextSibling, target) {
            if (8 & nodeDef.flags) visitProjectedRenderNodes(view, nodeDef.ngContent.index, action, parentNode, nextSibling, target); else {
                var rn = renderNode(view, nodeDef);
                if (3 === action && 33554432 & nodeDef.flags && 48 & nodeDef.bindingFlags ? (16 & nodeDef.bindingFlags && execRenderNodeAction(view, rn, action, parentNode, nextSibling, target), 
                32 & nodeDef.bindingFlags && execRenderNodeAction(asElementData(view, nodeDef.nodeIndex).componentView, rn, action, parentNode, nextSibling, target)) : execRenderNodeAction(view, rn, action, parentNode, nextSibling, target), 
                16777216 & nodeDef.flags) for (var embeddedViews = asElementData(view, nodeDef.nodeIndex).viewContainer._embeddedViews, k = 0; k < embeddedViews.length; k++) visitRootRenderNodes(embeddedViews[k], action, parentNode, nextSibling, target);
                1 & nodeDef.flags && !nodeDef.element.name && visitSiblingRenderNodes(view, action, nodeDef.nodeIndex + 1, nodeDef.nodeIndex + nodeDef.childCount, parentNode, nextSibling, target);
            }
        }
        function execRenderNodeAction(view, renderNode, action, parentNode, nextSibling, target) {
            var renderer = view.renderer;
            switch (action) {
              case 1:
                renderer.appendChild(parentNode, renderNode);
                break;

              case 2:
                renderer.insertBefore(parentNode, renderNode, nextSibling);
                break;

              case 3:
                renderer.removeChild(parentNode, renderNode);
                break;

              case 0:
                target.push(renderNode);
            }
        }
        var NS_PREFIX_RE = /^:([^:]+):(.+)$/;
        function splitNamespace(name) {
            if (":" === name[0]) {
                var match = name.match(NS_PREFIX_RE);
                return [ match[1], match[2] ];
            }
            return [ "", name ];
        }
        function calcBindingFlags(bindings) {
            for (var flags = 0, i = 0; i < bindings.length; i++) flags |= bindings[i].flags;
            return flags;
        }
        function inlineInterpolate(valueCount, c0, a1, c1, a2, c2, a3, c3, a4, c4, a5, c5, a6, c6, a7, c7, a8, c8, a9, c9) {
            switch (valueCount) {
              case 1:
                return c0 + _toStringWithNull(a1) + c1;

              case 2:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2;

              case 3:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3;

              case 4:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4;

              case 5:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5;

              case 6:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6;

              case 7:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6 + _toStringWithNull(a7) + c7;

              case 8:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8;

              case 9:
                return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8 + _toStringWithNull(a9) + c9;

              default:
                throw new Error("Does not support more than 9 expressions");
            }
        }
        function _toStringWithNull(v) {
            return null != v ? v.toString() : "";
        }
        var UNDEFINED_VALUE = new Object(), InjectorRefTokenKey = tokenKey(Injector), INJECTORRefTokenKey = tokenKey(INJECTOR), NgModuleRefTokenKey = tokenKey(NgModuleRef);
        function moduleProvideDef(flags, token, value, deps) {
            return value = resolveForwardRef(value), {
                index: -1,
                deps: splitDepsDsl(deps, stringify(token)),
                flags: flags,
                token: token,
                value: value
            };
        }
        function resolveNgModuleDep(data, depDef, notFoundValue) {
            void 0 === notFoundValue && (notFoundValue = Injector.THROW_IF_NOT_FOUND);
            var ngModule, def, former = setCurrentInjector(data);
            try {
                if (8 & depDef.flags) return depDef.token;
                if (2 & depDef.flags && (notFoundValue = null), 1 & depDef.flags) return data._parent.get(depDef.token, notFoundValue);
                var tokenKey_1 = depDef.tokenKey;
                switch (tokenKey_1) {
                  case InjectorRefTokenKey:
                  case INJECTORRefTokenKey:
                  case NgModuleRefTokenKey:
                    return data;
                }
                var injectableDef, providerDef = data._def.providersByKey[tokenKey_1];
                if (providerDef) {
                    var providerInstance = data._providers[providerDef.index];
                    return void 0 === providerInstance && (providerInstance = data._providers[providerDef.index] = _createProviderInstance(data, providerDef)), 
                    providerInstance === UNDEFINED_VALUE ? void 0 : providerInstance;
                }
                if ((injectableDef = getInjectableDef(depDef.token)) && (ngModule = data, null != (def = injectableDef).providedIn && (function(ngModule, scope) {
                    return ngModule._def.modules.indexOf(def.providedIn) > -1;
                }(ngModule) || "root" === def.providedIn && ngModule._def.isRoot))) {
                    var index = data._providers.length;
                    return data._def.providersByKey[depDef.tokenKey] = {
                        flags: 5120,
                        value: injectableDef.factory,
                        deps: [],
                        index: index,
                        token: depDef.token
                    }, data._providers[index] = UNDEFINED_VALUE, data._providers[index] = _createProviderInstance(data, data._def.providersByKey[depDef.tokenKey]);
                }
                return 4 & depDef.flags ? notFoundValue : data._parent.get(depDef.token, notFoundValue);
            } finally {
                setCurrentInjector(former);
            }
        }
        function _createProviderInstance(ngModule, providerDef) {
            var injectable;
            switch (201347067 & providerDef.flags) {
              case 512:
                injectable = function(ngModule, ctor, deps) {
                    var len = deps.length;
                    switch (len) {
                      case 0:
                        return new ctor();

                      case 1:
                        return new ctor(resolveNgModuleDep(ngModule, deps[0]));

                      case 2:
                        return new ctor(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]));

                      case 3:
                        return new ctor(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]), resolveNgModuleDep(ngModule, deps[2]));

                      default:
                        for (var depValues = new Array(len), i = 0; i < len; i++) depValues[i] = resolveNgModuleDep(ngModule, deps[i]);
                        return new (ctor.bind.apply(ctor, __spread([ void 0 ], depValues)))();
                    }
                }(ngModule, providerDef.value, providerDef.deps);
                break;

              case 1024:
                injectable = function(ngModule, factory, deps) {
                    var len = deps.length;
                    switch (len) {
                      case 0:
                        return factory();

                      case 1:
                        return factory(resolveNgModuleDep(ngModule, deps[0]));

                      case 2:
                        return factory(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]));

                      case 3:
                        return factory(resolveNgModuleDep(ngModule, deps[0]), resolveNgModuleDep(ngModule, deps[1]), resolveNgModuleDep(ngModule, deps[2]));

                      default:
                        for (var depValues = Array(len), i = 0; i < len; i++) depValues[i] = resolveNgModuleDep(ngModule, deps[i]);
                        return factory.apply(void 0, __spread(depValues));
                    }
                }(ngModule, providerDef.value, providerDef.deps);
                break;

              case 2048:
                injectable = resolveNgModuleDep(ngModule, providerDef.deps[0]);
                break;

              case 256:
                injectable = providerDef.value;
            }
            return injectable === UNDEFINED_VALUE || null === injectable || "object" != typeof injectable || 131072 & providerDef.flags || "function" != typeof injectable.ngOnDestroy || (providerDef.flags |= 131072), 
            void 0 === injectable ? UNDEFINED_VALUE : injectable;
        }
        function detachEmbeddedView(elementData, viewIndex) {
            var embeddedViews = elementData.viewContainer._embeddedViews;
            if ((null == viewIndex || viewIndex >= embeddedViews.length) && (viewIndex = embeddedViews.length - 1), 
            viewIndex < 0) return null;
            var view = embeddedViews[viewIndex];
            return view.viewContainerParent = null, removeFromArray(embeddedViews, viewIndex), 
            Services.dirtyParentQueries(view), renderDetachView$1(view), view;
        }
        function renderAttachEmbeddedView(elementData, prevView, view) {
            var prevRenderNode = prevView ? renderNode(prevView, prevView.def.lastRenderRootNode) : elementData.renderElement, parentNode = view.renderer.parentNode(prevRenderNode), nextSibling = view.renderer.nextSibling(prevRenderNode);
            visitRootRenderNodes(view, 2, parentNode, nextSibling, void 0);
        }
        function renderDetachView$1(view) {
            visitRootRenderNodes(view, 3, null, null, void 0);
        }
        function addToArray(arr, index, value) {
            index >= arr.length ? arr.push(value) : arr.splice(index, 0, value);
        }
        function removeFromArray(arr, index) {
            index >= arr.length - 1 ? arr.pop() : arr.splice(index, 1);
        }
        var EMPTY_CONTEXT = new Object();
        function createComponentFactory(selector, componentType, viewDefFactory, inputs, outputs, ngContentSelectors) {
            return new core_ComponentFactory_(selector, componentType, viewDefFactory, inputs, outputs, ngContentSelectors);
        }
        var core_ComponentFactory_ = function(_super) {
            function ComponentFactory_(selector, componentType, viewDefFactory, _inputs, _outputs, ngContentSelectors) {
                var _this = _super.call(this) || this;
                return _this.selector = selector, _this.componentType = componentType, _this._inputs = _inputs, 
                _this._outputs = _outputs, _this.ngContentSelectors = ngContentSelectors, _this.viewDefFactory = viewDefFactory, 
                _this;
            }
            return __extends(ComponentFactory_, _super), Object.defineProperty(ComponentFactory_.prototype, "inputs", {
                get: function() {
                    var inputsArr = [], inputs = this._inputs;
                    for (var propName in inputs) inputsArr.push({
                        propName: propName,
                        templateName: inputs[propName]
                    });
                    return inputsArr;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ComponentFactory_.prototype, "outputs", {
                get: function() {
                    var outputsArr = [];
                    for (var propName in this._outputs) outputsArr.push({
                        propName: propName,
                        templateName: this._outputs[propName]
                    });
                    return outputsArr;
                },
                enumerable: !0,
                configurable: !0
            }), ComponentFactory_.prototype.create = function(injector, projectableNodes, rootSelectorOrNode, ngModule) {
                if (!ngModule) throw new Error("ngModule should be provided");
                var viewDef = resolveDefinition(this.viewDefFactory), componentNodeIndex = viewDef.nodes[0].element.componentProvider.nodeIndex, view = Services.createRootView(injector, projectableNodes || [], rootSelectorOrNode, viewDef, ngModule, EMPTY_CONTEXT), component = asProviderData(view, componentNodeIndex).instance;
                return rootSelectorOrNode && view.renderer.setAttribute(asElementData(view, 0).renderElement, "ng-version", VERSION.full), 
                new core_ComponentRef_(view, new ViewRef_(view), component);
            }, ComponentFactory_;
        }(core_ComponentFactory), core_ComponentRef_ = function(_super) {
            function ComponentRef_(_view, _viewRef, _component) {
                var _this = _super.call(this) || this;
                return _this._view = _view, _this._viewRef = _viewRef, _this._component = _component, 
                _this._elDef = _this._view.def.nodes[0], _this.hostView = _viewRef, _this.changeDetectorRef = _viewRef, 
                _this.instance = _component, _this;
            }
            return __extends(ComponentRef_, _super), Object.defineProperty(ComponentRef_.prototype, "location", {
                get: function() {
                    return new ElementRef(asElementData(this._view, this._elDef.nodeIndex).renderElement);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ComponentRef_.prototype, "injector", {
                get: function() {
                    return new Injector_(this._view, this._elDef);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ComponentRef_.prototype, "componentType", {
                get: function() {
                    return this._component.constructor;
                },
                enumerable: !0,
                configurable: !0
            }), ComponentRef_.prototype.destroy = function() {
                this._viewRef.destroy();
            }, ComponentRef_.prototype.onDestroy = function(callback) {
                this._viewRef.onDestroy(callback);
            }, ComponentRef_;
        }(core_ComponentRef);
        function createViewContainerData(view, elDef, elData) {
            return new core_ViewContainerRef_(view, elDef, elData);
        }
        var core_ViewContainerRef_ = function() {
            function ViewContainerRef_(_view, _elDef, _data) {
                this._view = _view, this._elDef = _elDef, this._data = _data, this._embeddedViews = [];
            }
            return Object.defineProperty(ViewContainerRef_.prototype, "element", {
                get: function() {
                    return new ElementRef(this._data.renderElement);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ViewContainerRef_.prototype, "injector", {
                get: function() {
                    return new Injector_(this._view, this._elDef);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
                get: function() {
                    for (var view = this._view, elDef = this._elDef.parent; !elDef && view; ) elDef = viewParentEl(view), 
                    view = view.parent;
                    return view ? new Injector_(view, elDef) : new Injector_(this._view, null);
                },
                enumerable: !0,
                configurable: !0
            }), ViewContainerRef_.prototype.clear = function() {
                for (var i = this._embeddedViews.length - 1; i >= 0; i--) {
                    var view = detachEmbeddedView(this._data, i);
                    Services.destroyView(view);
                }
            }, ViewContainerRef_.prototype.get = function(index) {
                var view = this._embeddedViews[index];
                if (view) {
                    var ref = new ViewRef_(view);
                    return ref.attachToViewContainerRef(this), ref;
                }
                return null;
            }, Object.defineProperty(ViewContainerRef_.prototype, "length", {
                get: function() {
                    return this._embeddedViews.length;
                },
                enumerable: !0,
                configurable: !0
            }), ViewContainerRef_.prototype.createEmbeddedView = function(templateRef, context, index) {
                var viewRef = templateRef.createEmbeddedView(context || {});
                return this.insert(viewRef, index), viewRef;
            }, ViewContainerRef_.prototype.createComponent = function(componentFactory, index, injector, projectableNodes, ngModuleRef) {
                var contextInjector = injector || this.parentInjector;
                ngModuleRef || componentFactory instanceof core_ComponentFactoryBoundToModule || (ngModuleRef = contextInjector.get(NgModuleRef));
                var componentRef = componentFactory.create(contextInjector, projectableNodes, void 0, ngModuleRef);
                return this.insert(componentRef.hostView, index), componentRef;
            }, ViewContainerRef_.prototype.insert = function(viewRef, index) {
                if (viewRef.destroyed) throw new Error("Cannot insert a destroyed View in a ViewContainer!");
                var elementData, viewIndex, view, embeddedViews, viewRef_ = viewRef;
                return embeddedViews = (elementData = this._data).viewContainer._embeddedViews, 
                null == (viewIndex = index) && (viewIndex = embeddedViews.length), (view = viewRef_._view).viewContainerParent = this._view, 
                addToArray(embeddedViews, viewIndex, view), function(vcElementData, view) {
                    var dvcElementData = declaredViewContainer(view);
                    if (dvcElementData && dvcElementData !== vcElementData && !(16 & view.state)) {
                        view.state |= 16;
                        var projectedViews = dvcElementData.template._projectedViews;
                        projectedViews || (projectedViews = dvcElementData.template._projectedViews = []), 
                        projectedViews.push(view), function(viewDef, nodeDef) {
                            if (!(4 & nodeDef.flags)) {
                                view.parent.def.nodeFlags |= 4, nodeDef.flags |= 4;
                                for (var parentNodeDef = nodeDef.parent; parentNodeDef; ) parentNodeDef.childFlags |= 4, 
                                parentNodeDef = parentNodeDef.parent;
                            }
                        }(0, view.parentNodeDef);
                    }
                }(elementData, view), Services.dirtyParentQueries(view), renderAttachEmbeddedView(elementData, viewIndex > 0 ? embeddedViews[viewIndex - 1] : null, view), 
                viewRef_.attachToViewContainerRef(this), viewRef;
            }, ViewContainerRef_.prototype.move = function(viewRef, currentIndex) {
                if (viewRef.destroyed) throw new Error("Cannot move a destroyed View in a ViewContainer!");
                var elementData, oldViewIndex, newViewIndex, embeddedViews, view, previousIndex = this._embeddedViews.indexOf(viewRef._view);
                return newViewIndex = currentIndex, view = (embeddedViews = (elementData = this._data).viewContainer._embeddedViews)[oldViewIndex = previousIndex], 
                removeFromArray(embeddedViews, oldViewIndex), null == newViewIndex && (newViewIndex = embeddedViews.length), 
                addToArray(embeddedViews, newViewIndex, view), Services.dirtyParentQueries(view), 
                renderDetachView$1(view), renderAttachEmbeddedView(elementData, newViewIndex > 0 ? embeddedViews[newViewIndex - 1] : null, view), 
                viewRef;
            }, ViewContainerRef_.prototype.indexOf = function(viewRef) {
                return this._embeddedViews.indexOf(viewRef._view);
            }, ViewContainerRef_.prototype.remove = function(index) {
                var viewData = detachEmbeddedView(this._data, index);
                viewData && Services.destroyView(viewData);
            }, ViewContainerRef_.prototype.detach = function(index) {
                var view = detachEmbeddedView(this._data, index);
                return view ? new ViewRef_(view) : null;
            }, ViewContainerRef_;
        }();
        function createChangeDetectorRef(view) {
            return new ViewRef_(view);
        }
        var ViewRef_ = function() {
            function ViewRef_(_view) {
                this._view = _view, this._viewContainerRef = null, this._appRef = null;
            }
            return Object.defineProperty(ViewRef_.prototype, "rootNodes", {
                get: function() {
                    return visitRootRenderNodes(this._view, 0, void 0, void 0, renderNodes = []), renderNodes;
                    var renderNodes;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ViewRef_.prototype, "context", {
                get: function() {
                    return this._view.context;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ViewRef_.prototype, "destroyed", {
                get: function() {
                    return 0 != (128 & this._view.state);
                },
                enumerable: !0,
                configurable: !0
            }), ViewRef_.prototype.markForCheck = function() {
                markParentViewsForCheck(this._view);
            }, ViewRef_.prototype.detach = function() {
                this._view.state &= -5;
            }, ViewRef_.prototype.detectChanges = function() {
                var fs = this._view.root.rendererFactory;
                fs.begin && fs.begin();
                try {
                    Services.checkAndUpdateView(this._view);
                } finally {
                    fs.end && fs.end();
                }
            }, ViewRef_.prototype.checkNoChanges = function() {
                Services.checkNoChangesView(this._view);
            }, ViewRef_.prototype.reattach = function() {
                this._view.state |= 4;
            }, ViewRef_.prototype.onDestroy = function(callback) {
                this._view.disposables || (this._view.disposables = []), this._view.disposables.push(callback);
            }, ViewRef_.prototype.destroy = function() {
                this._appRef ? this._appRef.detachView(this) : this._viewContainerRef && this._viewContainerRef.detach(this._viewContainerRef.indexOf(this)), 
                Services.destroyView(this._view);
            }, ViewRef_.prototype.detachFromAppRef = function() {
                this._appRef = null, renderDetachView$1(this._view), Services.dirtyParentQueries(this._view);
            }, ViewRef_.prototype.attachToAppRef = function(appRef) {
                if (this._viewContainerRef) throw new Error("This view is already attached to a ViewContainer!");
                this._appRef = appRef;
            }, ViewRef_.prototype.attachToViewContainerRef = function(vcRef) {
                if (this._appRef) throw new Error("This view is already attached directly to the ApplicationRef!");
                this._viewContainerRef = vcRef;
            }, ViewRef_;
        }();
        function createTemplateData(view, def) {
            return new core_TemplateRef_(view, def);
        }
        var core_TemplateRef_ = function(_super) {
            function TemplateRef_(_parentView, _def) {
                var _this = _super.call(this) || this;
                return _this._parentView = _parentView, _this._def = _def, _this;
            }
            return __extends(TemplateRef_, _super), TemplateRef_.prototype.createEmbeddedView = function(context) {
                return new ViewRef_(Services.createEmbeddedView(this._parentView, this._def, this._def.element.template, context));
            }, Object.defineProperty(TemplateRef_.prototype, "elementRef", {
                get: function() {
                    return new ElementRef(asElementData(this._parentView, this._def.nodeIndex).renderElement);
                },
                enumerable: !0,
                configurable: !0
            }), TemplateRef_;
        }(TemplateRef);
        function createInjector$1(view, elDef) {
            return new Injector_(view, elDef);
        }
        var Injector_ = function() {
            function Injector_(view, elDef) {
                this.view = view, this.elDef = elDef;
            }
            return Injector_.prototype.get = function(token, notFoundValue) {
                return void 0 === notFoundValue && (notFoundValue = Injector.THROW_IF_NOT_FOUND), 
                Services.resolveDep(this.view, this.elDef, !!this.elDef && 0 != (33554432 & this.elDef.flags), {
                    flags: 0,
                    token: token,
                    tokenKey: tokenKey(token)
                }, notFoundValue);
            }, Injector_;
        }();
        function nodeValue(view, index) {
            var def = view.def.nodes[index];
            if (1 & def.flags) {
                var elData = asElementData(view, def.nodeIndex);
                return def.element.template ? elData.template : elData.renderElement;
            }
            if (2 & def.flags) return asTextData(view, def.nodeIndex).renderText;
            if (20240 & def.flags) return asProviderData(view, def.nodeIndex).instance;
            throw new Error("Illegal state: read nodeValue for node index " + index);
        }
        function createRendererV1(view) {
            return new core_RendererAdapter(view.renderer);
        }
        var core_RendererAdapter = function() {
            function RendererAdapter(delegate) {
                this.delegate = delegate;
            }
            return RendererAdapter.prototype.selectRootElement = function(selectorOrNode) {
                return this.delegate.selectRootElement(selectorOrNode);
            }, RendererAdapter.prototype.createElement = function(parent, namespaceAndName) {
                var _a = __read(splitNamespace(namespaceAndName), 2), el = this.delegate.createElement(_a[1], _a[0]);
                return parent && this.delegate.appendChild(parent, el), el;
            }, RendererAdapter.prototype.createViewRoot = function(hostElement) {
                return hostElement;
            }, RendererAdapter.prototype.createTemplateAnchor = function(parentElement) {
                var comment = this.delegate.createComment("");
                return parentElement && this.delegate.appendChild(parentElement, comment), comment;
            }, RendererAdapter.prototype.createText = function(parentElement, value) {
                var node = this.delegate.createText(value);
                return parentElement && this.delegate.appendChild(parentElement, node), node;
            }, RendererAdapter.prototype.projectNodes = function(parentElement, nodes) {
                for (var i = 0; i < nodes.length; i++) this.delegate.appendChild(parentElement, nodes[i]);
            }, RendererAdapter.prototype.attachViewAfter = function(node, viewRootNodes) {
                for (var parentElement = this.delegate.parentNode(node), nextSibling = this.delegate.nextSibling(node), i = 0; i < viewRootNodes.length; i++) this.delegate.insertBefore(parentElement, viewRootNodes[i], nextSibling);
            }, RendererAdapter.prototype.detachView = function(viewRootNodes) {
                for (var i = 0; i < viewRootNodes.length; i++) {
                    var node = viewRootNodes[i], parentElement = this.delegate.parentNode(node);
                    this.delegate.removeChild(parentElement, node);
                }
            }, RendererAdapter.prototype.destroyView = function(hostElement, viewAllNodes) {
                for (var i = 0; i < viewAllNodes.length; i++) this.delegate.destroyNode(viewAllNodes[i]);
            }, RendererAdapter.prototype.listen = function(renderElement, name, callback) {
                return this.delegate.listen(renderElement, name, callback);
            }, RendererAdapter.prototype.listenGlobal = function(target, name, callback) {
                return this.delegate.listen(target, name, callback);
            }, RendererAdapter.prototype.setElementProperty = function(renderElement, propertyName, propertyValue) {
                this.delegate.setProperty(renderElement, propertyName, propertyValue);
            }, RendererAdapter.prototype.setElementAttribute = function(renderElement, namespaceAndName, attributeValue) {
                var _a = __read(splitNamespace(namespaceAndName), 2), ns = _a[0], name = _a[1];
                null != attributeValue ? this.delegate.setAttribute(renderElement, name, attributeValue, ns) : this.delegate.removeAttribute(renderElement, name, ns);
            }, RendererAdapter.prototype.setBindingDebugInfo = function(renderElement, propertyName, propertyValue) {}, 
            RendererAdapter.prototype.setElementClass = function(renderElement, className, isAdd) {
                isAdd ? this.delegate.addClass(renderElement, className) : this.delegate.removeClass(renderElement, className);
            }, RendererAdapter.prototype.setElementStyle = function(renderElement, styleName, styleValue) {
                null != styleValue ? this.delegate.setStyle(renderElement, styleName, styleValue) : this.delegate.removeStyle(renderElement, styleName);
            }, RendererAdapter.prototype.invokeElementMethod = function(renderElement, methodName, args) {
                renderElement[methodName].apply(renderElement, args);
            }, RendererAdapter.prototype.setText = function(renderNode, text) {
                this.delegate.setValue(renderNode, text);
            }, RendererAdapter.prototype.animate = function() {
                throw new Error("Renderer.animate is no longer supported!");
            }, RendererAdapter;
        }();
        function createNgModuleRef(moduleType, parent, bootstrapComponents, def) {
            return new NgModuleRef_(moduleType, parent, bootstrapComponents, def);
        }
        var NgModuleRef_ = function() {
            function NgModuleRef_(_moduleType, _parent, _bootstrapComponents, _def) {
                this._moduleType = _moduleType, this._parent = _parent, this._bootstrapComponents = _bootstrapComponents, 
                this._def = _def, this._destroyListeners = [], this._destroyed = !1, this.injector = this, 
                function(data) {
                    for (var def = data._def, providers = data._providers = new Array(def.providers.length), i = 0; i < def.providers.length; i++) {
                        var provDef = def.providers[i];
                        4096 & provDef.flags || void 0 === providers[i] && (providers[i] = _createProviderInstance(data, provDef));
                    }
                }(this);
            }
            return NgModuleRef_.prototype.get = function(token, notFoundValue, injectFlags) {
                void 0 === notFoundValue && (notFoundValue = Injector.THROW_IF_NOT_FOUND), void 0 === injectFlags && (injectFlags = InjectFlags.Default);
                var flags = 0;
                return injectFlags & InjectFlags.SkipSelf ? flags |= 1 : injectFlags & InjectFlags.Self && (flags |= 4), 
                resolveNgModuleDep(this, {
                    token: token,
                    tokenKey: tokenKey(token),
                    flags: flags
                }, notFoundValue);
            }, Object.defineProperty(NgModuleRef_.prototype, "instance", {
                get: function() {
                    return this.get(this._moduleType);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(NgModuleRef_.prototype, "componentFactoryResolver", {
                get: function() {
                    return this.get(core_ComponentFactoryResolver);
                },
                enumerable: !0,
                configurable: !0
            }), NgModuleRef_.prototype.destroy = function() {
                if (this._destroyed) throw new Error("The ng module " + stringify(this.instance.constructor) + " has already been destroyed.");
                this._destroyed = !0, function(ngModule, lifecycles) {
                    for (var def = ngModule._def, destroyed = new Set(), i = 0; i < def.providers.length; i++) if (131072 & def.providers[i].flags) {
                        var instance = ngModule._providers[i];
                        if (instance && instance !== UNDEFINED_VALUE) {
                            var onDestroy = instance.ngOnDestroy;
                            "function" != typeof onDestroy || destroyed.has(instance) || (onDestroy.apply(instance), 
                            destroyed.add(instance));
                        }
                    }
                }(this), this._destroyListeners.forEach(function(listener) {
                    return listener();
                });
            }, NgModuleRef_.prototype.onDestroy = function(callback) {
                this._destroyListeners.push(callback);
            }, NgModuleRef_;
        }(), RendererV1TokenKey = tokenKey(Renderer), Renderer2TokenKey = tokenKey(Renderer2), ElementRefTokenKey = tokenKey(ElementRef), ViewContainerRefTokenKey = tokenKey(ViewContainerRef), TemplateRefTokenKey = tokenKey(TemplateRef), ChangeDetectorRefTokenKey = tokenKey(ChangeDetectorRef), InjectorRefTokenKey$1 = tokenKey(Injector), INJECTORRefTokenKey$1 = tokenKey(INJECTOR);
        function directiveDef(checkIndex, flags, matchedQueries, childCount, ctor, deps, props, outputs) {
            var bindings = [];
            if (props) for (var prop in props) {
                var _a = __read(props[prop], 2);
                bindings[_a[0]] = {
                    flags: 8,
                    name: prop,
                    nonMinifiedName: _a[1],
                    ns: null,
                    securityContext: null,
                    suffix: null
                };
            }
            var outputDefs = [];
            if (outputs) for (var propName in outputs) outputDefs.push({
                type: 1,
                propName: propName,
                target: null,
                eventName: outputs[propName]
            });
            return _def(checkIndex, flags |= 16384, matchedQueries, childCount, ctor, ctor, deps, bindings, outputDefs);
        }
        function providerDef(flags, matchedQueries, token, value, deps) {
            return _def(-1, flags, matchedQueries, 0, token, value, deps);
        }
        function _def(checkIndex, flags, matchedQueriesDsl, childCount, token, value, deps, bindings, outputs) {
            var _a = splitMatchedQueriesDsl(matchedQueriesDsl), matchedQueries = _a.matchedQueries, references = _a.references, matchedQueryIds = _a.matchedQueryIds;
            outputs || (outputs = []), bindings || (bindings = []), value = resolveForwardRef(value);
            var depDefs = splitDepsDsl(deps, stringify(token));
            return {
                nodeIndex: -1,
                parent: null,
                renderParent: null,
                bindingIndex: -1,
                outputIndex: -1,
                checkIndex: checkIndex,
                flags: flags,
                childFlags: 0,
                directChildFlags: 0,
                childMatchedQueries: 0,
                matchedQueries: matchedQueries,
                matchedQueryIds: matchedQueryIds,
                references: references,
                ngContentIndex: -1,
                childCount: childCount,
                bindings: bindings,
                bindingFlags: calcBindingFlags(bindings),
                outputs: outputs,
                element: null,
                provider: {
                    token: token,
                    value: value,
                    deps: depDefs
                },
                text: null,
                query: null,
                ngContent: null
            };
        }
        function createProviderInstance(view, def) {
            return _createProviderInstance$1(view, def);
        }
        function createPipeInstance(view, def) {
            for (var compView = view; compView.parent && !isComponentView(compView); ) compView = compView.parent;
            return createClass(compView.parent, viewParentEl(compView), !0, def.provider.value, def.provider.deps);
        }
        function createDirectiveInstance(view, def) {
            var instance = createClass(view, def.parent, (32768 & def.flags) > 0, def.provider.value, def.provider.deps);
            if (def.outputs.length) for (var i = 0; i < def.outputs.length; i++) {
                var output = def.outputs[i], outputObservable = instance[output.propName];
                if (!isObservable(outputObservable)) throw new Error("@Output " + output.propName + " not initialized in '" + instance.constructor.name + "'.");
                var subscription = outputObservable.subscribe(eventHandlerClosure(view, def.parent.nodeIndex, output.eventName));
                view.disposables[def.outputIndex + i] = subscription.unsubscribe.bind(subscription);
            }
            return instance;
        }
        function eventHandlerClosure(view, index, eventName) {
            return function(event) {
                return dispatchEvent(view, index, eventName, event);
            };
        }
        function _createProviderInstance$1(view, def) {
            var allowPrivateServices = (8192 & def.flags) > 0, providerDef = def.provider;
            switch (201347067 & def.flags) {
              case 512:
                return createClass(view, def.parent, allowPrivateServices, providerDef.value, providerDef.deps);

              case 1024:
                return function(view, elDef, allowPrivateServices, factory, deps) {
                    var len = deps.length;
                    switch (len) {
                      case 0:
                        return factory();

                      case 1:
                        return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]));

                      case 2:
                        return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]));

                      case 3:
                        return factory(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]), resolveDep(view, elDef, allowPrivateServices, deps[2]));

                      default:
                        for (var depValues = Array(len), i = 0; i < len; i++) depValues[i] = resolveDep(view, elDef, allowPrivateServices, deps[i]);
                        return factory.apply(void 0, __spread(depValues));
                    }
                }(view, def.parent, allowPrivateServices, providerDef.value, providerDef.deps);

              case 2048:
                return resolveDep(view, def.parent, allowPrivateServices, providerDef.deps[0]);

              case 256:
                return providerDef.value;
            }
        }
        function createClass(view, elDef, allowPrivateServices, ctor, deps) {
            var len = deps.length;
            switch (len) {
              case 0:
                return new ctor();

              case 1:
                return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]));

              case 2:
                return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]));

              case 3:
                return new ctor(resolveDep(view, elDef, allowPrivateServices, deps[0]), resolveDep(view, elDef, allowPrivateServices, deps[1]), resolveDep(view, elDef, allowPrivateServices, deps[2]));

              default:
                for (var depValues = new Array(len), i = 0; i < len; i++) depValues[i] = resolveDep(view, elDef, allowPrivateServices, deps[i]);
                return new (ctor.bind.apply(ctor, __spread([ void 0 ], depValues)))();
            }
        }
        var NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {};
        function resolveDep(view, elDef, allowPrivateServices, depDef, notFoundValue) {
            if (void 0 === notFoundValue && (notFoundValue = Injector.THROW_IF_NOT_FOUND), 8 & depDef.flags) return depDef.token;
            var startView = view;
            2 & depDef.flags && (notFoundValue = null);
            var tokenKey = depDef.tokenKey;
            tokenKey === ChangeDetectorRefTokenKey && (allowPrivateServices = !(!elDef || !elDef.element.componentView)), 
            elDef && 1 & depDef.flags && (allowPrivateServices = !1, elDef = elDef.parent);
            for (var searchView = view; searchView; ) {
                if (elDef) switch (tokenKey) {
                  case RendererV1TokenKey:
                    return createRendererV1(findCompView(searchView, elDef, allowPrivateServices));

                  case Renderer2TokenKey:
                    return findCompView(searchView, elDef, allowPrivateServices).renderer;

                  case ElementRefTokenKey:
                    return new ElementRef(asElementData(searchView, elDef.nodeIndex).renderElement);

                  case ViewContainerRefTokenKey:
                    return asElementData(searchView, elDef.nodeIndex).viewContainer;

                  case TemplateRefTokenKey:
                    if (elDef.element.template) return asElementData(searchView, elDef.nodeIndex).template;
                    break;

                  case ChangeDetectorRefTokenKey:
                    return createChangeDetectorRef(findCompView(searchView, elDef, allowPrivateServices));

                  case InjectorRefTokenKey$1:
                  case INJECTORRefTokenKey$1:
                    return createInjector$1(searchView, elDef);

                  default:
                    var providerDef_1 = (allowPrivateServices ? elDef.element.allProviders : elDef.element.publicProviders)[tokenKey];
                    if (providerDef_1) {
                        var providerData = asProviderData(searchView, providerDef_1.nodeIndex);
                        return providerData || (providerData = {
                            instance: _createProviderInstance$1(searchView, providerDef_1)
                        }, searchView.nodes[providerDef_1.nodeIndex] = providerData), providerData.instance;
                    }
                }
                allowPrivateServices = isComponentView(searchView), elDef = viewParentEl(searchView), 
                searchView = searchView.parent, 4 & depDef.flags && (searchView = null);
            }
            var value = startView.root.injector.get(depDef.token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR);
            return value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR || notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ? value : startView.root.ngModule.injector.get(depDef.token, notFoundValue);
        }
        function findCompView(view, elDef, allowPrivateServices) {
            var compView;
            if (allowPrivateServices) compView = asElementData(view, elDef.nodeIndex).componentView; else for (compView = view; compView.parent && !isComponentView(compView); ) compView = compView.parent;
            return compView;
        }
        function updateProp(view, providerData, def, bindingIdx, value, changes) {
            if (32768 & def.flags) {
                var compView = asElementData(view, def.parent.nodeIndex).componentView;
                2 & compView.def.flags && (compView.state |= 8);
            }
            if (providerData.instance[def.bindings[bindingIdx].name] = value, 524288 & def.flags) {
                changes = changes || {};
                var oldValue = WrappedValue.unwrap(view.oldValues[def.bindingIndex + bindingIdx]);
                changes[def.bindings[bindingIdx].nonMinifiedName] = new SimpleChange(oldValue, value, 0 != (2 & view.state));
            }
            return view.oldValues[def.bindingIndex + bindingIdx] = value, changes;
        }
        function callLifecycleHooksChildrenFirst(view, lifecycles) {
            if (view.def.nodeFlags & lifecycles) for (var nodes = view.def.nodes, initIndex = 0, i = 0; i < nodes.length; i++) {
                var nodeDef = nodes[i], parent_1 = nodeDef.parent;
                for (!parent_1 && nodeDef.flags & lifecycles && callProviderLifecycles(view, i, nodeDef.flags & lifecycles, initIndex++), 
                0 == (nodeDef.childFlags & lifecycles) && (i += nodeDef.childCount); parent_1 && 1 & parent_1.flags && i === parent_1.nodeIndex + parent_1.childCount; ) parent_1.directChildFlags & lifecycles && (initIndex = callElementProvidersLifecycles(view, parent_1, lifecycles, initIndex)), 
                parent_1 = parent_1.parent;
            }
        }
        function callElementProvidersLifecycles(view, elDef, lifecycles, initIndex) {
            for (var i = elDef.nodeIndex + 1; i <= elDef.nodeIndex + elDef.childCount; i++) {
                var nodeDef = view.def.nodes[i];
                nodeDef.flags & lifecycles && callProviderLifecycles(view, i, nodeDef.flags & lifecycles, initIndex++), 
                i += nodeDef.childCount;
            }
            return initIndex;
        }
        function callProviderLifecycles(view, index, lifecycles, initIndex) {
            var providerData = asProviderData(view, index);
            if (providerData) {
                var provider = providerData.instance;
                provider && (Services.setCurrentNode(view, index), 1048576 & lifecycles && shouldCallLifecycleInitHook(view, 512, initIndex) && provider.ngAfterContentInit(), 
                2097152 & lifecycles && provider.ngAfterContentChecked(), 4194304 & lifecycles && shouldCallLifecycleInitHook(view, 768, initIndex) && provider.ngAfterViewInit(), 
                8388608 & lifecycles && provider.ngAfterViewChecked(), 131072 & lifecycles && provider.ngOnDestroy());
            }
        }
        var SCHEDULER = new InjectionToken("SCHEDULER_TOKEN", {
            providedIn: "root",
            factory: function() {
                return defaultScheduler;
            }
        }), core_EventEmitter = function(_super) {
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
        }(Subject_Subject), QueryList = function() {
            function QueryList() {
                this.dirty = !0, this._results = [], this.changes = new core_EventEmitter(), this.length = 0;
            }
            return QueryList.prototype.map = function(fn) {
                return this._results.map(fn);
            }, QueryList.prototype.filter = function(fn) {
                return this._results.filter(fn);
            }, QueryList.prototype.find = function(fn) {
                return this._results.find(fn);
            }, QueryList.prototype.reduce = function(fn, init) {
                return this._results.reduce(fn, init);
            }, QueryList.prototype.forEach = function(fn) {
                this._results.forEach(fn);
            }, QueryList.prototype.some = function(fn) {
                return this._results.some(fn);
            }, QueryList.prototype.toArray = function() {
                return this._results.slice();
            }, QueryList.prototype[core_getSymbolIterator()] = function() {
                return this._results[core_getSymbolIterator()]();
            }, QueryList.prototype.toString = function() {
                return this._results.toString();
            }, QueryList.prototype.reset = function(resultsTree) {
                this._results = function(list) {
                    for (var result = [], i = 0; i < list.length; ) {
                        var item = list[i];
                        Array.isArray(item) ? item.length > 0 ? (list = item.concat(list.slice(i + 1)), 
                        i = 0) : i++ : (result.push(item), i++);
                    }
                    return result;
                }(resultsTree), this.dirty = !1, this.length = this._results.length, this.last = this._results[this.length - 1], 
                this.first = this._results[0];
            }, QueryList.prototype.notifyOnChanges = function() {
                this.changes.emit(this);
            }, QueryList.prototype.setDirty = function() {
                this.dirty = !0;
            }, QueryList.prototype.destroy = function() {
                this.changes.complete(), this.changes.unsubscribe();
            }, QueryList;
        }(), NgModuleFactoryLoader = function() {
            return function() {};
        }(), APP_INITIALIZER = new InjectionToken("Application Initializer"), ApplicationInitStatus = function() {
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
            }, ApplicationInitStatus;
        }(), APP_ID = new InjectionToken("AppId");
        function _appIdRandomProviderFactory() {
            return "" + _randomChar() + _randomChar() + _randomChar();
        }
        function _randomChar() {
            return String.fromCharCode(97 + Math.floor(25 * Math.random()));
        }
        var PLATFORM_INITIALIZER = new InjectionToken("Platform Initializer"), PLATFORM_ID = new InjectionToken("Platform ID"), APP_BOOTSTRAP_LISTENER = new InjectionToken("appBootstrapListener"), Console = function() {
            function Console() {}
            return Console.prototype.log = function(message) {
                console.log(message);
            }, Console.prototype.warn = function(message) {
                console.warn(message);
            }, Console;
        }();
        function _throwError() {
            throw new Error("Runtime compiler is not loaded");
        }
        var trace, core_events, Compiler_compileModuleSync = _throwError, Compiler_compileModuleAsync = _throwError, Compiler_compileModuleAndAllComponentsSync = _throwError, Compiler_compileModuleAndAllComponentsAsync = _throwError, Compiler = function() {
            function Compiler() {
                this.compileModuleSync = Compiler_compileModuleSync, this.compileModuleAsync = Compiler_compileModuleAsync, 
                this.compileModuleAndAllComponentsSync = Compiler_compileModuleAndAllComponentsSync, 
                this.compileModuleAndAllComponentsAsync = Compiler_compileModuleAndAllComponentsAsync;
            }
            return Compiler.prototype.clearCache = function() {}, Compiler.prototype.clearCacheFor = function(type) {}, 
            Compiler.prototype.getModuleId = function(moduleType) {}, Compiler;
        }(), CompilerFactory = function() {
            return function() {};
        }();
        function detectWTF() {
            var wtf = _global.wtf;
            return !(!wtf || !(trace = wtf.trace) || (core_events = trace.events, 0));
        }
        var wtfEnabled = detectWTF();
        function noopScope(arg0, arg1) {
            return null;
        }
        var wtfCreateScope = wtfEnabled ? function(signature, flags) {
            return void 0 === flags && (flags = null), core_events.createScope(signature, flags);
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
        var core_platform, NoopNgZone = function() {
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
            }, Testability;
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
            }, __decorate([ __metadata("design:paramtypes", []) ], TestabilityRegistry);
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
                        if (core_platform && !core_platform.destroyed && !core_platform.injector.get(ALLOW_MULTIPLE_PLATFORMS, !1)) throw new Error("There can be only one platform. Destroy the previous one to create a new one.");
                        core_platform = injector.get(PlatformRef);
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
            return core_platform && !core_platform.destroyed ? core_platform : null;
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
                    return injector.get(CompilerFactory).createCompiler([ options ]).compileModuleAsync(moduleType);
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
                this.isStable = merge(isCurrentlyStable, isStable.pipe(share()));
            }
            var ApplicationRef_1;
            return ApplicationRef_1 = ApplicationRef, ApplicationRef.prototype.bootstrap = function(componentOrFactory, rootSelectorOrNode) {
                var componentFactory, _this = this;
                if (!this._initStatus.done) throw new Error("Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module.");
                componentFactory = componentOrFactory instanceof core_ComponentFactory ? componentOrFactory : this._componentFactoryResolver.resolveComponentFactory(componentOrFactory), 
                this.componentTypes.push(componentFactory.componentType);
                var ngModule = componentFactory instanceof core_ComponentFactoryBoundToModule ? null : this._injector.get(NgModuleRef), compRef = componentFactory.create(Injector.NULL, [], rootSelectorOrNode || componentFactory.selector, ngModule);
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
            }), ApplicationRef._tickScope = wtfCreateScope("ApplicationRef#tick()"), ApplicationRef;
        }();
        function remove(list, el) {
            var index = list.indexOf(el);
            index > -1 && list.splice(index, 1);
        }
        var SystemJsNgModuleLoaderConfig = function() {
            return function() {};
        }(), DEFAULT_CONFIG = {
            factoryPathPrefix: "",
            factoryPathSuffix: ".ngfactory"
        }, core_SystemJsNgModuleLoader = function() {
            function SystemJsNgModuleLoader(_compiler, config) {
                this._compiler = _compiler, this._config = config || DEFAULT_CONFIG;
            }
            return SystemJsNgModuleLoader.prototype.load = function(path) {
                return this._compiler instanceof Compiler ? this.loadFactory(path) : this.loadAndCompile(path);
            }, SystemJsNgModuleLoader.prototype.loadAndCompile = function(path) {
                var _this = this, _a = __read(path.split("#"), 2), module = _a[0], exportName = _a[1];
                return void 0 === exportName && (exportName = "default"), __webpack_require__("crnd")(module).then(function(module) {
                    return module[exportName];
                }).then(function(type) {
                    return checkNotEmpty(type, module, exportName);
                }).then(function(type) {
                    return _this._compiler.compileModuleAsync(type);
                });
            }, SystemJsNgModuleLoader.prototype.loadFactory = function(path) {
                var _a = __read(path.split("#"), 2), module = _a[0], exportName = _a[1], factoryClassSuffix = "NgFactory";
                return void 0 === exportName && (exportName = "default", factoryClassSuffix = ""), 
                __webpack_require__("crnd")(this._config.factoryPathPrefix + module + this._config.factoryPathSuffix).then(function(module) {
                    return module[exportName + factoryClassSuffix];
                }).then(function(factory) {
                    return checkNotEmpty(factory, module, exportName);
                });
            }, SystemJsNgModuleLoader;
        }();
        function checkNotEmpty(value, modulePath, exportName) {
            if (!value) throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
            return value;
        }
        var EventListener = function() {
            return function(name, callback) {
                this.name = name, this.callback = callback;
            };
        }(), DebugNode__PRE_R3__ = function() {
            function DebugNode__PRE_R3__(nativeNode, parent, _debugContext) {
                this.listeners = [], this.parent = null, this._debugContext = _debugContext, this.nativeNode = nativeNode, 
                parent && parent instanceof core_DebugElement_PRE_R3_ && parent.addChild(this);
            }
            return Object.defineProperty(DebugNode__PRE_R3__.prototype, "injector", {
                get: function() {
                    return this._debugContext.injector;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugNode__PRE_R3__.prototype, "componentInstance", {
                get: function() {
                    return this._debugContext.component;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugNode__PRE_R3__.prototype, "context", {
                get: function() {
                    return this._debugContext.context;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugNode__PRE_R3__.prototype, "references", {
                get: function() {
                    return this._debugContext.references;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugNode__PRE_R3__.prototype, "providerTokens", {
                get: function() {
                    return this._debugContext.providerTokens;
                },
                enumerable: !0,
                configurable: !0
            }), DebugNode__PRE_R3__;
        }(), core_DebugElement_PRE_R3_ = function(_super) {
            function DebugElement__PRE_R3__(nativeNode, parent, _debugContext) {
                var _this = _super.call(this, nativeNode, parent, _debugContext) || this;
                return _this.properties = {}, _this.attributes = {}, _this.classes = {}, _this.styles = {}, 
                _this.childNodes = [], _this.nativeElement = nativeNode, _this;
            }
            return __extends(DebugElement__PRE_R3__, _super), DebugElement__PRE_R3__.prototype.addChild = function(child) {
                child && (this.childNodes.push(child), child.parent = this);
            }, DebugElement__PRE_R3__.prototype.removeChild = function(child) {
                var childIndex = this.childNodes.indexOf(child);
                -1 !== childIndex && (child.parent = null, this.childNodes.splice(childIndex, 1));
            }, DebugElement__PRE_R3__.prototype.insertChildrenAfter = function(child, newChildren) {
                var _a, _this = this, siblingIndex = this.childNodes.indexOf(child);
                -1 !== siblingIndex && ((_a = this.childNodes).splice.apply(_a, __spread([ siblingIndex + 1, 0 ], newChildren)), 
                newChildren.forEach(function(c) {
                    c.parent && c.parent.removeChild(c), child.parent = _this;
                }));
            }, DebugElement__PRE_R3__.prototype.insertBefore = function(refChild, newChild) {
                var refIndex = this.childNodes.indexOf(refChild);
                -1 === refIndex ? this.addChild(newChild) : (newChild.parent && newChild.parent.removeChild(newChild), 
                newChild.parent = this, this.childNodes.splice(refIndex, 0, newChild));
            }, DebugElement__PRE_R3__.prototype.query = function(predicate) {
                return this.queryAll(predicate)[0] || null;
            }, DebugElement__PRE_R3__.prototype.queryAll = function(predicate) {
                var matches = [];
                return function _queryElementChildren(element, predicate, matches) {
                    element.childNodes.forEach(function(node) {
                        node instanceof core_DebugElement_PRE_R3_ && (predicate(node) && matches.push(node), 
                        _queryElementChildren(node, predicate, matches));
                    });
                }(this, predicate, matches), matches;
            }, DebugElement__PRE_R3__.prototype.queryAllNodes = function(predicate) {
                var matches = [];
                return function _queryNodeChildren(parentNode, predicate, matches) {
                    parentNode instanceof core_DebugElement_PRE_R3_ && parentNode.childNodes.forEach(function(node) {
                        predicate(node) && matches.push(node), node instanceof core_DebugElement_PRE_R3_ && _queryNodeChildren(node, predicate, matches);
                    });
                }(this, predicate, matches), matches;
            }, Object.defineProperty(DebugElement__PRE_R3__.prototype, "children", {
                get: function() {
                    return this.childNodes.filter(function(node) {
                        return node instanceof DebugElement__PRE_R3__;
                    });
                },
                enumerable: !0,
                configurable: !0
            }), DebugElement__PRE_R3__.prototype.triggerEventHandler = function(eventName, eventObj) {
                this.listeners.forEach(function(listener) {
                    listener.name == eventName && listener.callback(eventObj);
                });
            }, DebugElement__PRE_R3__;
        }(DebugNode__PRE_R3__), _nativeNodeToDebugNode = new Map(), getDebugNode = function(nativeNode) {
            return _nativeNodeToDebugNode.get(nativeNode) || null;
        };
        function indexDebugNode(node) {
            _nativeNodeToDebugNode.set(node.nativeNode, node);
        }
        var platformCore = createPlatformFactory(null, "core", [ {
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
        } ]), LOCALE_ID = new InjectionToken("LocaleId");
        function _iterableDiffersFactory() {
            return defaultIterableDiffers;
        }
        function _keyValueDiffersFactory() {
            return defaultKeyValueDiffers;
        }
        function _localeFactory(locale) {
            return locale || "en-US";
        }
        function zoneSchedulerFactory(ngZone) {
            var queue = [];
            return ngZone.onStable.subscribe(function() {
                for (;queue.length; ) queue.pop()();
            }), function(fn) {
                queue.push(fn);
            };
        }
        var ApplicationModule = function() {
            return function(appRef) {};
        }();
        function anchorDef(flags, matchedQueriesDsl, ngContentIndex, childCount, handleEvent, templateFactory) {
            flags |= 1;
            var _a = splitMatchedQueriesDsl(matchedQueriesDsl);
            return {
                nodeIndex: -1,
                parent: null,
                renderParent: null,
                bindingIndex: -1,
                outputIndex: -1,
                flags: flags,
                checkIndex: -1,
                childFlags: 0,
                directChildFlags: 0,
                childMatchedQueries: 0,
                matchedQueries: _a.matchedQueries,
                matchedQueryIds: _a.matchedQueryIds,
                references: _a.references,
                ngContentIndex: ngContentIndex,
                childCount: childCount,
                bindings: [],
                bindingFlags: 0,
                outputs: [],
                element: {
                    ns: null,
                    name: null,
                    attrs: null,
                    template: templateFactory ? resolveDefinition(templateFactory) : null,
                    componentProvider: null,
                    componentView: null,
                    componentRendererType: null,
                    publicProviders: null,
                    allProviders: null,
                    handleEvent: handleEvent || NOOP
                },
                provider: null,
                text: null,
                query: null,
                ngContent: null
            };
        }
        function elementDef(checkIndex, flags, matchedQueriesDsl, ngContentIndex, childCount, namespaceAndName, fixedAttrs, bindings, outputs, handleEvent, componentView, componentRendererType) {
            var _a;
            void 0 === fixedAttrs && (fixedAttrs = []), handleEvent || (handleEvent = NOOP);
            var _b = splitMatchedQueriesDsl(matchedQueriesDsl), matchedQueries = _b.matchedQueries, references = _b.references, matchedQueryIds = _b.matchedQueryIds, ns = null, name = null;
            namespaceAndName && (ns = (_a = __read(splitNamespace(namespaceAndName), 2))[0], 
            name = _a[1]), bindings = bindings || [];
            for (var bindingDefs = new Array(bindings.length), i = 0; i < bindings.length; i++) {
                var _c = __read(bindings[i], 3), bindingFlags = _c[0], suffixOrSecurityContext = _c[2], _d = __read(splitNamespace(_c[1]), 2), ns_1 = _d[0], name_1 = _d[1], securityContext = void 0, suffix = void 0;
                switch (15 & bindingFlags) {
                  case 4:
                    suffix = suffixOrSecurityContext;
                    break;

                  case 1:
                  case 8:
                    securityContext = suffixOrSecurityContext;
                }
                bindingDefs[i] = {
                    flags: bindingFlags,
                    ns: ns_1,
                    name: name_1,
                    nonMinifiedName: name_1,
                    securityContext: securityContext,
                    suffix: suffix
                };
            }
            outputs = outputs || [];
            var outputDefs = new Array(outputs.length);
            for (i = 0; i < outputs.length; i++) {
                var _e = __read(outputs[i], 2);
                outputDefs[i] = {
                    type: 0,
                    target: _e[0],
                    eventName: _e[1],
                    propName: null
                };
            }
            var attrs = (fixedAttrs = fixedAttrs || []).map(function(_a) {
                var _b = __read(_a, 2), value = _b[1], _c = __read(splitNamespace(_b[0]), 2);
                return [ _c[0], _c[1], value ];
            });
            return componentRendererType = function(type) {
                if (type && type.id === UNDEFINED_RENDERER_TYPE_ID) {
                    var isFilled = null != type.encapsulation && type.encapsulation !== ViewEncapsulation.None || type.styles.length || Object.keys(type.data).length;
                    type.id = isFilled ? "c" + _renderCompCount$1++ : EMPTY_RENDERER_TYPE_ID;
                }
                return type && type.id === EMPTY_RENDERER_TYPE_ID && (type = null), type || null;
            }(componentRendererType), componentView && (flags |= 33554432), {
                nodeIndex: -1,
                parent: null,
                renderParent: null,
                bindingIndex: -1,
                outputIndex: -1,
                checkIndex: checkIndex,
                flags: flags |= 1,
                childFlags: 0,
                directChildFlags: 0,
                childMatchedQueries: 0,
                matchedQueries: matchedQueries,
                matchedQueryIds: matchedQueryIds,
                references: references,
                ngContentIndex: ngContentIndex,
                childCount: childCount,
                bindings: bindingDefs,
                bindingFlags: calcBindingFlags(bindingDefs),
                outputs: outputDefs,
                element: {
                    ns: ns,
                    name: name,
                    attrs: attrs,
                    template: null,
                    componentProvider: null,
                    componentView: componentView || null,
                    componentRendererType: componentRendererType,
                    publicProviders: null,
                    allProviders: null,
                    handleEvent: handleEvent || NOOP
                },
                provider: null,
                text: null,
                query: null,
                ngContent: null
            };
        }
        function createElement(view, renderHost, def) {
            var el, elDef = def.element, rootSelectorOrNode = view.root.selectorOrNode, renderer = view.renderer;
            if (view.parent || !rootSelectorOrNode) {
                el = elDef.name ? renderer.createElement(elDef.name, elDef.ns) : renderer.createComment("");
                var parentEl = getParentRenderElement(view, renderHost, def);
                parentEl && renderer.appendChild(parentEl, el);
            } else el = renderer.selectRootElement(rootSelectorOrNode, !!elDef.componentRendererType && elDef.componentRendererType.encapsulation === ViewEncapsulation.ShadowDom);
            if (elDef.attrs) for (var i = 0; i < elDef.attrs.length; i++) {
                var _a = __read(elDef.attrs[i], 3);
                renderer.setAttribute(el, _a[1], _a[2], _a[0]);
            }
            return el;
        }
        function listenToElementOutputs(view, compView, def, el) {
            for (var i = 0; i < def.outputs.length; i++) {
                var output = def.outputs[i], handleEventClosure = renderEventHandlerClosure(view, def.nodeIndex, (name = output.eventName, 
                (target = output.target) ? target + ":" + name : name)), listenTarget = output.target, listenerView = view;
                "component" === output.target && (listenTarget = null, listenerView = compView);
                var disposable = listenerView.renderer.listen(listenTarget || el, output.eventName, handleEventClosure);
                view.disposables[def.outputIndex + i] = disposable;
            }
            var target, name;
        }
        function renderEventHandlerClosure(view, index, eventName) {
            return function(event) {
                return dispatchEvent(view, index, eventName, event);
            };
        }
        function checkAndUpdateElementValue(view, def, bindingIdx, value) {
            if (!checkAndUpdateBinding(view, def, bindingIdx, value)) return !1;
            var binding = def.bindings[bindingIdx], elData = asElementData(view, def.nodeIndex), renderNode = elData.renderElement, name = binding.name;
            switch (15 & binding.flags) {
              case 1:
                !function(view, binding, renderNode, ns, name, value) {
                    var securityContext = binding.securityContext, renderValue = securityContext ? view.root.sanitizer.sanitize(securityContext, value) : value;
                    renderValue = null != renderValue ? renderValue.toString() : null;
                    var renderer = view.renderer;
                    null != value ? renderer.setAttribute(renderNode, name, renderValue, ns) : renderer.removeAttribute(renderNode, name, ns);
                }(view, binding, renderNode, binding.ns, name, value);
                break;

              case 2:
                !function(view, renderNode, name, value) {
                    var renderer = view.renderer;
                    value ? renderer.addClass(renderNode, name) : renderer.removeClass(renderNode, name);
                }(view, renderNode, name, value);
                break;

              case 4:
                !function(view, binding, renderNode, name, value) {
                    var renderValue = view.root.sanitizer.sanitize(SecurityContext.STYLE, value);
                    if (null != renderValue) {
                        renderValue = renderValue.toString();
                        var unit = binding.suffix;
                        null != unit && (renderValue += unit);
                    } else renderValue = null;
                    var renderer = view.renderer;
                    null != renderValue ? renderer.setStyle(renderNode, name, renderValue) : renderer.removeStyle(renderNode, name);
                }(view, binding, renderNode, name, value);
                break;

              case 8:
                !function(view, binding, renderNode, name, value) {
                    var securityContext = binding.securityContext, renderValue = securityContext ? view.root.sanitizer.sanitize(securityContext, value) : value;
                    view.renderer.setProperty(renderNode, name, renderValue);
                }(33554432 & def.flags && 32 & binding.flags ? elData.componentView : view, binding, renderNode, name, value);
            }
            return !0;
        }
        function queryDef(flags, id, bindings) {
            var bindingDefs = [];
            for (var propName in bindings) bindingDefs.push({
                propName: propName,
                bindingType: bindings[propName]
            });
            return {
                nodeIndex: -1,
                parent: null,
                renderParent: null,
                bindingIndex: -1,
                outputIndex: -1,
                checkIndex: -1,
                flags: flags,
                childFlags: 0,
                directChildFlags: 0,
                childMatchedQueries: 0,
                ngContentIndex: -1,
                matchedQueries: {},
                matchedQueryIds: 0,
                references: {},
                childCount: 0,
                bindings: [],
                bindingFlags: 0,
                outputs: [],
                element: null,
                provider: null,
                text: null,
                query: {
                    id: id,
                    filterId: filterQueryId(id),
                    bindings: bindingDefs
                },
                ngContent: null
            };
        }
        function dirtyParentQueries(view) {
            for (var queryIds = view.def.nodeMatchedQueries; view.parent && isEmbeddedView(view); ) {
                var tplDef = view.parentNodeDef;
                view = view.parent;
                for (var end = tplDef.nodeIndex + tplDef.childCount, i = 0; i <= end; i++) 67108864 & (nodeDef = view.def.nodes[i]).flags && 536870912 & nodeDef.flags && (nodeDef.query.filterId & queryIds) === nodeDef.query.filterId && asQueryList(view, i).setDirty(), 
                !(1 & nodeDef.flags && i + nodeDef.childCount < tplDef.nodeIndex) && 67108864 & nodeDef.childFlags && 536870912 & nodeDef.childFlags || (i += nodeDef.childCount);
            }
            if (134217728 & view.def.nodeFlags) for (i = 0; i < view.def.nodes.length; i++) {
                var nodeDef;
                134217728 & (nodeDef = view.def.nodes[i]).flags && 536870912 & nodeDef.flags && asQueryList(view, i).setDirty(), 
                i += nodeDef.childCount;
            }
        }
        function checkAndUpdateQuery(view, nodeDef) {
            var queryList = asQueryList(view, nodeDef.nodeIndex);
            if (queryList.dirty) {
                var directiveInstance, newValues = void 0;
                if (67108864 & nodeDef.flags) {
                    var elementDef = nodeDef.parent.parent;
                    newValues = calcQueryValues(view, elementDef.nodeIndex, elementDef.nodeIndex + elementDef.childCount, nodeDef.query, []), 
                    directiveInstance = asProviderData(view, nodeDef.parent.nodeIndex).instance;
                } else 134217728 & nodeDef.flags && (newValues = calcQueryValues(view, 0, view.def.nodes.length - 1, nodeDef.query, []), 
                directiveInstance = view.component);
                queryList.reset(newValues);
                for (var bindings = nodeDef.query.bindings, notify = !1, i = 0; i < bindings.length; i++) {
                    var binding = bindings[i], boundValue = void 0;
                    switch (binding.bindingType) {
                      case 0:
                        boundValue = queryList.first;
                        break;

                      case 1:
                        boundValue = queryList, notify = !0;
                    }
                    directiveInstance[binding.propName] = boundValue;
                }
                notify && queryList.notifyOnChanges();
            }
        }
        function calcQueryValues(view, startIndex, endIndex, queryDef, values) {
            for (var i = startIndex; i <= endIndex; i++) {
                var nodeDef = view.def.nodes[i], valueType = nodeDef.matchedQueries[queryDef.id];
                if (null != valueType && values.push(getQueryValue(view, nodeDef, valueType)), 1 & nodeDef.flags && nodeDef.element.template && (nodeDef.element.template.nodeMatchedQueries & queryDef.filterId) === queryDef.filterId) {
                    var elementData = asElementData(view, i);
                    if ((nodeDef.childMatchedQueries & queryDef.filterId) === queryDef.filterId && (calcQueryValues(view, i + 1, i + nodeDef.childCount, queryDef, values), 
                    i += nodeDef.childCount), 16777216 & nodeDef.flags) for (var embeddedViews = elementData.viewContainer._embeddedViews, k = 0; k < embeddedViews.length; k++) {
                        var embeddedView = embeddedViews[k], dvc = declaredViewContainer(embeddedView);
                        dvc && dvc === elementData && calcQueryValues(embeddedView, 0, embeddedView.def.nodes.length - 1, queryDef, values);
                    }
                    var projectedViews = elementData.template._projectedViews;
                    if (projectedViews) for (k = 0; k < projectedViews.length; k++) {
                        var projectedView = projectedViews[k];
                        calcQueryValues(projectedView, 0, projectedView.def.nodes.length - 1, queryDef, values);
                    }
                }
                (nodeDef.childMatchedQueries & queryDef.filterId) !== queryDef.filterId && (i += nodeDef.childCount);
            }
            return values;
        }
        function getQueryValue(view, nodeDef, queryValueType) {
            if (null != queryValueType) switch (queryValueType) {
              case 1:
                return asElementData(view, nodeDef.nodeIndex).renderElement;

              case 0:
                return new ElementRef(asElementData(view, nodeDef.nodeIndex).renderElement);

              case 2:
                return asElementData(view, nodeDef.nodeIndex).template;

              case 3:
                return asElementData(view, nodeDef.nodeIndex).viewContainer;

              case 4:
                return asProviderData(view, nodeDef.nodeIndex).instance;
            }
        }
        function ngContentDef(ngContentIndex, index) {
            return {
                nodeIndex: -1,
                parent: null,
                renderParent: null,
                bindingIndex: -1,
                outputIndex: -1,
                checkIndex: -1,
                flags: 8,
                childFlags: 0,
                directChildFlags: 0,
                childMatchedQueries: 0,
                matchedQueries: {},
                matchedQueryIds: 0,
                references: {},
                ngContentIndex: ngContentIndex,
                childCount: 0,
                bindings: [],
                bindingFlags: 0,
                outputs: [],
                element: null,
                provider: null,
                text: null,
                query: null,
                ngContent: {
                    index: index
                }
            };
        }
        function appendNgContent(view, renderHost, def) {
            var parentEl = getParentRenderElement(view, renderHost, def);
            parentEl && visitProjectedRenderNodes(view, def.ngContent.index, 1, parentEl, null, void 0);
        }
        function pureObjectDef(checkIndex, propToIndex) {
            for (var keys = Object.keys(propToIndex), nbKeys = keys.length, propertyNames = new Array(nbKeys), i = 0; i < nbKeys; i++) {
                var key = keys[i];
                propertyNames[propToIndex[key]] = key;
            }
            return function(flags, checkIndex, propertyNames) {
                for (var bindings = new Array(propertyNames.length), i = 0; i < propertyNames.length; i++) {
                    var prop = propertyNames[i];
                    bindings[i] = {
                        flags: 8,
                        name: prop,
                        ns: null,
                        nonMinifiedName: prop,
                        securityContext: null,
                        suffix: null
                    };
                }
                return {
                    nodeIndex: -1,
                    parent: null,
                    renderParent: null,
                    bindingIndex: -1,
                    outputIndex: -1,
                    checkIndex: checkIndex,
                    flags: 64,
                    childFlags: 0,
                    directChildFlags: 0,
                    childMatchedQueries: 0,
                    matchedQueries: {},
                    matchedQueryIds: 0,
                    references: {},
                    ngContentIndex: -1,
                    childCount: 0,
                    bindings: bindings,
                    bindingFlags: calcBindingFlags(bindings),
                    outputs: [],
                    element: null,
                    provider: null,
                    text: null,
                    query: null,
                    ngContent: null
                };
            }(0, checkIndex, propertyNames);
        }
        function textDef(checkIndex, ngContentIndex, staticText) {
            for (var bindings = new Array(staticText.length - 1), i = 1; i < staticText.length; i++) bindings[i - 1] = {
                flags: 8,
                name: null,
                ns: null,
                nonMinifiedName: null,
                securityContext: null,
                suffix: staticText[i]
            };
            return {
                nodeIndex: -1,
                parent: null,
                renderParent: null,
                bindingIndex: -1,
                outputIndex: -1,
                checkIndex: checkIndex,
                flags: 2,
                childFlags: 0,
                directChildFlags: 0,
                childMatchedQueries: 0,
                matchedQueries: {},
                matchedQueryIds: 0,
                references: {},
                ngContentIndex: ngContentIndex,
                childCount: 0,
                bindings: bindings,
                bindingFlags: 8,
                outputs: [],
                element: null,
                provider: null,
                text: {
                    prefix: staticText[0]
                },
                query: null,
                ngContent: null
            };
        }
        function createText(view, renderHost, def) {
            var renderNode, renderer = view.renderer;
            renderNode = renderer.createText(def.text.prefix);
            var parentEl = getParentRenderElement(view, renderHost, def);
            return parentEl && renderer.appendChild(parentEl, renderNode), {
                renderText: renderNode
            };
        }
        function _addInterpolationPart(value, binding) {
            return (null != value ? value.toString() : "") + binding.suffix;
        }
        function viewDef(flags, nodes, updateDirectives, updateRenderer) {
            for (var viewBindingCount = 0, viewDisposableCount = 0, viewNodeFlags = 0, viewRootNodeFlags = 0, viewMatchedQueries = 0, currentParent = null, currentRenderParent = null, currentElementHasPublicProviders = !1, currentElementHasPrivateProviders = !1, lastRenderRootNode = null, i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                if (node.nodeIndex = i, node.parent = currentParent, node.bindingIndex = viewBindingCount, 
                node.outputIndex = viewDisposableCount, node.renderParent = currentRenderParent, 
                viewNodeFlags |= node.flags, viewMatchedQueries |= node.matchedQueryIds, node.element) {
                    var elDef = node.element;
                    elDef.publicProviders = currentParent ? currentParent.element.publicProviders : Object.create(null), 
                    elDef.allProviders = elDef.publicProviders, currentElementHasPublicProviders = !1, 
                    currentElementHasPrivateProviders = !1, node.element.template && (viewMatchedQueries |= node.element.template.nodeMatchedQueries);
                }
                if (validateNode(currentParent, node, nodes.length), viewBindingCount += node.bindings.length, 
                viewDisposableCount += node.outputs.length, !currentRenderParent && 3 & node.flags && (lastRenderRootNode = node), 
                20224 & node.flags) {
                    currentElementHasPublicProviders || (currentElementHasPublicProviders = !0, currentParent.element.publicProviders = Object.create(currentParent.element.publicProviders), 
                    currentParent.element.allProviders = currentParent.element.publicProviders);
                    var isComponent = 0 != (32768 & node.flags);
                    0 == (8192 & node.flags) || isComponent ? currentParent.element.publicProviders[tokenKey(node.provider.token)] = node : (currentElementHasPrivateProviders || (currentElementHasPrivateProviders = !0, 
                    currentParent.element.allProviders = Object.create(currentParent.element.publicProviders)), 
                    currentParent.element.allProviders[tokenKey(node.provider.token)] = node), isComponent && (currentParent.element.componentProvider = node);
                }
                if (currentParent ? (currentParent.childFlags |= node.flags, currentParent.directChildFlags |= node.flags, 
                currentParent.childMatchedQueries |= node.matchedQueryIds, node.element && node.element.template && (currentParent.childMatchedQueries |= node.element.template.nodeMatchedQueries)) : viewRootNodeFlags |= node.flags, 
                node.childCount > 0) currentParent = node, isNgContainer(node) || (currentRenderParent = node); else for (;currentParent && i === currentParent.nodeIndex + currentParent.childCount; ) {
                    var newParent = currentParent.parent;
                    newParent && (newParent.childFlags |= currentParent.childFlags, newParent.childMatchedQueries |= currentParent.childMatchedQueries), 
                    currentRenderParent = (currentParent = newParent) && isNgContainer(currentParent) ? currentParent.renderParent : currentParent;
                }
            }
            return {
                factory: null,
                nodeFlags: viewNodeFlags,
                rootNodeFlags: viewRootNodeFlags,
                nodeMatchedQueries: viewMatchedQueries,
                flags: flags,
                nodes: nodes,
                updateDirectives: updateDirectives || NOOP,
                updateRenderer: updateRenderer || NOOP,
                handleEvent: function(view, nodeIndex, eventName, event) {
                    return nodes[nodeIndex].element.handleEvent(view, eventName, event);
                },
                bindingCount: viewBindingCount,
                outputCount: viewDisposableCount,
                lastRenderRootNode: lastRenderRootNode
            };
        }
        function isNgContainer(node) {
            return 0 != (1 & node.flags) && null === node.element.name;
        }
        function validateNode(parent, node, nodeCount) {
            var template = node.element && node.element.template;
            if (template) {
                if (!template.lastRenderRootNode) throw new Error("Illegal State: Embedded templates without nodes are not allowed!");
                if (template.lastRenderRootNode && 16777216 & template.lastRenderRootNode.flags) throw new Error("Illegal State: Last root node of a template can't have embedded views, at index " + node.nodeIndex + "!");
            }
            if (20224 & node.flags && 0 == (1 & (parent ? parent.flags : 0))) throw new Error("Illegal State: StaticProvider/Directive nodes need to be children of elements or anchors, at index " + node.nodeIndex + "!");
            if (node.query) {
                if (67108864 & node.flags && (!parent || 0 == (16384 & parent.flags))) throw new Error("Illegal State: Content Query nodes need to be children of directives, at index " + node.nodeIndex + "!");
                if (134217728 & node.flags && parent) throw new Error("Illegal State: View Query nodes have to be top level nodes, at index " + node.nodeIndex + "!");
            }
            if (node.childCount) {
                var parentEnd = parent ? parent.nodeIndex + parent.childCount : nodeCount - 1;
                if (node.nodeIndex <= parentEnd && node.nodeIndex + node.childCount > parentEnd) throw new Error("Illegal State: childCount of node leads outside of parent, at index " + node.nodeIndex + "!");
            }
        }
        function createEmbeddedView(parent, anchorDef, viewDef, context) {
            var view = createView(parent.root, parent.renderer, parent, anchorDef, viewDef);
            return initView(view, parent.component, context), createViewNodes(view), view;
        }
        function createRootView(root, def, context) {
            var view = createView(root, root.renderer, null, null, def);
            return initView(view, context, context), createViewNodes(view), view;
        }
        function createComponentView(parentView, nodeDef, viewDef, hostElement) {
            var compRenderer, rendererType = nodeDef.element.componentRendererType;
            return compRenderer = rendererType ? parentView.root.rendererFactory.createRenderer(hostElement, rendererType) : parentView.root.renderer, 
            createView(parentView.root, compRenderer, parentView, nodeDef.element.componentProvider, viewDef);
        }
        function createView(root, renderer, parent, parentNodeDef, def) {
            var nodes = new Array(def.nodes.length), disposables = def.outputCount ? new Array(def.outputCount) : null;
            return {
                def: def,
                parent: parent,
                viewContainerParent: null,
                parentNodeDef: parentNodeDef,
                context: null,
                component: null,
                nodes: nodes,
                state: 13,
                root: root,
                renderer: renderer,
                oldValues: new Array(def.bindingCount),
                disposables: disposables,
                initIndex: -1
            };
        }
        function initView(view, component, context) {
            view.component = component, view.context = context;
        }
        function createViewNodes(view) {
            var renderHost;
            isComponentView(view) && (renderHost = asElementData(view.parent, view.parentNodeDef.parent.nodeIndex).renderElement);
            for (var def = view.def, nodes = view.nodes, i = 0; i < def.nodes.length; i++) {
                var nodeDef = def.nodes[i];
                Services.setCurrentNode(view, i);
                var nodeData = void 0;
                switch (201347067 & nodeDef.flags) {
                  case 1:
                    var el = createElement(view, renderHost, nodeDef), componentView = void 0;
                    if (33554432 & nodeDef.flags) {
                        var compViewDef = resolveDefinition(nodeDef.element.componentView);
                        componentView = Services.createComponentView(view, nodeDef, compViewDef, el);
                    }
                    listenToElementOutputs(view, componentView, nodeDef, el), nodeData = {
                        renderElement: el,
                        componentView: componentView,
                        viewContainer: null,
                        template: nodeDef.element.template ? createTemplateData(view, nodeDef) : void 0
                    }, 16777216 & nodeDef.flags && (nodeData.viewContainer = createViewContainerData(view, nodeDef, nodeData));
                    break;

                  case 2:
                    nodeData = createText(view, renderHost, nodeDef);
                    break;

                  case 512:
                  case 1024:
                  case 2048:
                  case 256:
                    (nodeData = nodes[i]) || 4096 & nodeDef.flags || (nodeData = {
                        instance: createProviderInstance(view, nodeDef)
                    });
                    break;

                  case 16:
                    nodeData = {
                        instance: createPipeInstance(view, nodeDef)
                    };
                    break;

                  case 16384:
                    (nodeData = nodes[i]) || (nodeData = {
                        instance: createDirectiveInstance(view, nodeDef)
                    }), 32768 & nodeDef.flags && initView(asElementData(view, nodeDef.parent.nodeIndex).componentView, nodeData.instance, nodeData.instance);
                    break;

                  case 32:
                  case 64:
                  case 128:
                    nodeData = {
                        value: void 0
                    };
                    break;

                  case 67108864:
                  case 134217728:
                    nodeData = new QueryList();
                    break;

                  case 8:
                    appendNgContent(view, renderHost, nodeDef), nodeData = void 0;
                }
                nodes[i] = nodeData;
            }
            execComponentViewsAction(view, ViewAction.CreateViewNodes), execQueriesAction(view, 201326592, 268435456, 0);
        }
        function checkNoChangesView(view) {
            markProjectedViewsForCheck(view), Services.updateDirectives(view, 1), execEmbeddedViewsAction(view, ViewAction.CheckNoChanges), 
            Services.updateRenderer(view, 1), execComponentViewsAction(view, ViewAction.CheckNoChanges), 
            view.state &= -97;
        }
        function checkAndUpdateView(view) {
            1 & view.state ? (view.state &= -2, view.state |= 2) : view.state &= -3, shiftInitState(view, 0, 256), 
            markProjectedViewsForCheck(view), Services.updateDirectives(view, 0), execEmbeddedViewsAction(view, ViewAction.CheckAndUpdate), 
            execQueriesAction(view, 67108864, 536870912, 0);
            var callInit = shiftInitState(view, 256, 512);
            callLifecycleHooksChildrenFirst(view, 2097152 | (callInit ? 1048576 : 0)), Services.updateRenderer(view, 0), 
            execComponentViewsAction(view, ViewAction.CheckAndUpdate), execQueriesAction(view, 134217728, 536870912, 0), 
            callLifecycleHooksChildrenFirst(view, 8388608 | ((callInit = shiftInitState(view, 512, 768)) ? 4194304 : 0)), 
            2 & view.def.flags && (view.state &= -9), view.state &= -97, shiftInitState(view, 768, 1024);
        }
        function checkAndUpdateNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
            return 0 === argStyle ? function(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                switch (201347067 & nodeDef.flags) {
                  case 1:
                    return function(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                        var bindLen = def.bindings.length, changed = !1;
                        return bindLen > 0 && checkAndUpdateElementValue(view, def, 0, v0) && (changed = !0), 
                        bindLen > 1 && checkAndUpdateElementValue(view, def, 1, v1) && (changed = !0), bindLen > 2 && checkAndUpdateElementValue(view, def, 2, v2) && (changed = !0), 
                        bindLen > 3 && checkAndUpdateElementValue(view, def, 3, v3) && (changed = !0), bindLen > 4 && checkAndUpdateElementValue(view, def, 4, v4) && (changed = !0), 
                        bindLen > 5 && checkAndUpdateElementValue(view, def, 5, v5) && (changed = !0), bindLen > 6 && checkAndUpdateElementValue(view, def, 6, v6) && (changed = !0), 
                        bindLen > 7 && checkAndUpdateElementValue(view, def, 7, v7) && (changed = !0), bindLen > 8 && checkAndUpdateElementValue(view, def, 8, v8) && (changed = !0), 
                        bindLen > 9 && checkAndUpdateElementValue(view, def, 9, v9) && (changed = !0), changed;
                    }(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);

                  case 2:
                    return function(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                        var changed = !1, bindings = def.bindings, bindLen = bindings.length;
                        if (bindLen > 0 && checkAndUpdateBinding(view, def, 0, v0) && (changed = !0), bindLen > 1 && checkAndUpdateBinding(view, def, 1, v1) && (changed = !0), 
                        bindLen > 2 && checkAndUpdateBinding(view, def, 2, v2) && (changed = !0), bindLen > 3 && checkAndUpdateBinding(view, def, 3, v3) && (changed = !0), 
                        bindLen > 4 && checkAndUpdateBinding(view, def, 4, v4) && (changed = !0), bindLen > 5 && checkAndUpdateBinding(view, def, 5, v5) && (changed = !0), 
                        bindLen > 6 && checkAndUpdateBinding(view, def, 6, v6) && (changed = !0), bindLen > 7 && checkAndUpdateBinding(view, def, 7, v7) && (changed = !0), 
                        bindLen > 8 && checkAndUpdateBinding(view, def, 8, v8) && (changed = !0), bindLen > 9 && checkAndUpdateBinding(view, def, 9, v9) && (changed = !0), 
                        changed) {
                            var value = def.text.prefix;
                            bindLen > 0 && (value += _addInterpolationPart(v0, bindings[0])), bindLen > 1 && (value += _addInterpolationPart(v1, bindings[1])), 
                            bindLen > 2 && (value += _addInterpolationPart(v2, bindings[2])), bindLen > 3 && (value += _addInterpolationPart(v3, bindings[3])), 
                            bindLen > 4 && (value += _addInterpolationPart(v4, bindings[4])), bindLen > 5 && (value += _addInterpolationPart(v5, bindings[5])), 
                            bindLen > 6 && (value += _addInterpolationPart(v6, bindings[6])), bindLen > 7 && (value += _addInterpolationPart(v7, bindings[7])), 
                            bindLen > 8 && (value += _addInterpolationPart(v8, bindings[8])), bindLen > 9 && (value += _addInterpolationPart(v9, bindings[9]));
                            var renderNode = asTextData(view, def.nodeIndex).renderText;
                            view.renderer.setValue(renderNode, value);
                        }
                        return changed;
                    }(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);

                  case 16384:
                    return function(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                        var providerData = asProviderData(view, def.nodeIndex), directive = providerData.instance, changed = !1, changes = void 0, bindLen = def.bindings.length;
                        return bindLen > 0 && checkBinding(view, def, 0, v0) && (changed = !0, changes = updateProp(view, providerData, def, 0, v0, changes)), 
                        bindLen > 1 && checkBinding(view, def, 1, v1) && (changed = !0, changes = updateProp(view, providerData, def, 1, v1, changes)), 
                        bindLen > 2 && checkBinding(view, def, 2, v2) && (changed = !0, changes = updateProp(view, providerData, def, 2, v2, changes)), 
                        bindLen > 3 && checkBinding(view, def, 3, v3) && (changed = !0, changes = updateProp(view, providerData, def, 3, v3, changes)), 
                        bindLen > 4 && checkBinding(view, def, 4, v4) && (changed = !0, changes = updateProp(view, providerData, def, 4, v4, changes)), 
                        bindLen > 5 && checkBinding(view, def, 5, v5) && (changed = !0, changes = updateProp(view, providerData, def, 5, v5, changes)), 
                        bindLen > 6 && checkBinding(view, def, 6, v6) && (changed = !0, changes = updateProp(view, providerData, def, 6, v6, changes)), 
                        bindLen > 7 && checkBinding(view, def, 7, v7) && (changed = !0, changes = updateProp(view, providerData, def, 7, v7, changes)), 
                        bindLen > 8 && checkBinding(view, def, 8, v8) && (changed = !0, changes = updateProp(view, providerData, def, 8, v8, changes)), 
                        bindLen > 9 && checkBinding(view, def, 9, v9) && (changed = !0, changes = updateProp(view, providerData, def, 9, v9, changes)), 
                        changes && directive.ngOnChanges(changes), 65536 & def.flags && shouldCallLifecycleInitHook(view, 256, def.nodeIndex) && directive.ngOnInit(), 
                        262144 & def.flags && directive.ngDoCheck(), changed;
                    }(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);

                  case 32:
                  case 64:
                  case 128:
                    return function(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                        var bindings = def.bindings, changed = !1, bindLen = bindings.length;
                        if (bindLen > 0 && checkAndUpdateBinding(view, def, 0, v0) && (changed = !0), bindLen > 1 && checkAndUpdateBinding(view, def, 1, v1) && (changed = !0), 
                        bindLen > 2 && checkAndUpdateBinding(view, def, 2, v2) && (changed = !0), bindLen > 3 && checkAndUpdateBinding(view, def, 3, v3) && (changed = !0), 
                        bindLen > 4 && checkAndUpdateBinding(view, def, 4, v4) && (changed = !0), bindLen > 5 && checkAndUpdateBinding(view, def, 5, v5) && (changed = !0), 
                        bindLen > 6 && checkAndUpdateBinding(view, def, 6, v6) && (changed = !0), bindLen > 7 && checkAndUpdateBinding(view, def, 7, v7) && (changed = !0), 
                        bindLen > 8 && checkAndUpdateBinding(view, def, 8, v8) && (changed = !0), bindLen > 9 && checkAndUpdateBinding(view, def, 9, v9) && (changed = !0), 
                        changed) {
                            var data = asPureExpressionData(view, def.nodeIndex), value = void 0;
                            switch (201347067 & def.flags) {
                              case 32:
                                value = new Array(bindings.length), bindLen > 0 && (value[0] = v0), bindLen > 1 && (value[1] = v1), 
                                bindLen > 2 && (value[2] = v2), bindLen > 3 && (value[3] = v3), bindLen > 4 && (value[4] = v4), 
                                bindLen > 5 && (value[5] = v5), bindLen > 6 && (value[6] = v6), bindLen > 7 && (value[7] = v7), 
                                bindLen > 8 && (value[8] = v8), bindLen > 9 && (value[9] = v9);
                                break;

                              case 64:
                                value = {}, bindLen > 0 && (value[bindings[0].name] = v0), bindLen > 1 && (value[bindings[1].name] = v1), 
                                bindLen > 2 && (value[bindings[2].name] = v2), bindLen > 3 && (value[bindings[3].name] = v3), 
                                bindLen > 4 && (value[bindings[4].name] = v4), bindLen > 5 && (value[bindings[5].name] = v5), 
                                bindLen > 6 && (value[bindings[6].name] = v6), bindLen > 7 && (value[bindings[7].name] = v7), 
                                bindLen > 8 && (value[bindings[8].name] = v8), bindLen > 9 && (value[bindings[9].name] = v9);
                                break;

                              case 128:
                                var pipe = v0;
                                switch (bindLen) {
                                  case 1:
                                    value = pipe.transform(v0);
                                    break;

                                  case 2:
                                    value = pipe.transform(v1);
                                    break;

                                  case 3:
                                    value = pipe.transform(v1, v2);
                                    break;

                                  case 4:
                                    value = pipe.transform(v1, v2, v3);
                                    break;

                                  case 5:
                                    value = pipe.transform(v1, v2, v3, v4);
                                    break;

                                  case 6:
                                    value = pipe.transform(v1, v2, v3, v4, v5);
                                    break;

                                  case 7:
                                    value = pipe.transform(v1, v2, v3, v4, v5, v6);
                                    break;

                                  case 8:
                                    value = pipe.transform(v1, v2, v3, v4, v5, v6, v7);
                                    break;

                                  case 9:
                                    value = pipe.transform(v1, v2, v3, v4, v5, v6, v7, v8);
                                    break;

                                  case 10:
                                    value = pipe.transform(v1, v2, v3, v4, v5, v6, v7, v8, v9);
                                }
                            }
                            data.value = value;
                        }
                        return changed;
                    }(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);

                  default:
                    throw "unreachable";
                }
            }(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) : function(view, nodeDef, values) {
                switch (201347067 & nodeDef.flags) {
                  case 1:
                    return function(view, def, values) {
                        for (var changed = !1, i = 0; i < values.length; i++) checkAndUpdateElementValue(view, def, i, values[i]) && (changed = !0);
                        return changed;
                    }(view, nodeDef, values);

                  case 2:
                    return function(view, def, values) {
                        for (var bindings = def.bindings, changed = !1, i = 0; i < values.length; i++) checkAndUpdateBinding(view, def, i, values[i]) && (changed = !0);
                        if (changed) {
                            var value = "";
                            for (i = 0; i < values.length; i++) value += _addInterpolationPart(values[i], bindings[i]);
                            value = def.text.prefix + value;
                            var renderNode = asTextData(view, def.nodeIndex).renderText;
                            view.renderer.setValue(renderNode, value);
                        }
                        return changed;
                    }(view, nodeDef, values);

                  case 16384:
                    return function(view, def, values) {
                        for (var providerData = asProviderData(view, def.nodeIndex), directive = providerData.instance, changed = !1, changes = void 0, i = 0; i < values.length; i++) checkBinding(view, def, i, values[i]) && (changed = !0, 
                        changes = updateProp(view, providerData, def, i, values[i], changes));
                        return changes && directive.ngOnChanges(changes), 65536 & def.flags && shouldCallLifecycleInitHook(view, 256, def.nodeIndex) && directive.ngOnInit(), 
                        262144 & def.flags && directive.ngDoCheck(), changed;
                    }(view, nodeDef, values);

                  case 32:
                  case 64:
                  case 128:
                    return function(view, def, values) {
                        for (var bindings = def.bindings, changed = !1, i = 0; i < values.length; i++) checkAndUpdateBinding(view, def, i, values[i]) && (changed = !0);
                        if (changed) {
                            var data = asPureExpressionData(view, def.nodeIndex), value = void 0;
                            switch (201347067 & def.flags) {
                              case 32:
                                value = values;
                                break;

                              case 64:
                                for (value = {}, i = 0; i < values.length; i++) value[bindings[i].name] = values[i];
                                break;

                              case 128:
                                var pipe = values[0], params = values.slice(1);
                                value = pipe.transform.apply(pipe, __spread(params));
                            }
                            data.value = value;
                        }
                        return changed;
                    }(view, nodeDef, values);

                  default:
                    throw "unreachable";
                }
            }(view, nodeDef, v0);
        }
        function markProjectedViewsForCheck(view) {
            var def = view.def;
            if (4 & def.nodeFlags) for (var i = 0; i < def.nodes.length; i++) {
                var nodeDef = def.nodes[i];
                if (4 & nodeDef.flags) {
                    var projectedViews = asElementData(view, i).template._projectedViews;
                    if (projectedViews) for (var i_1 = 0; i_1 < projectedViews.length; i_1++) {
                        var projectedView = projectedViews[i_1];
                        projectedView.state |= 32, markParentViewsForCheckProjectedViews(projectedView, view);
                    }
                } else 0 == (4 & nodeDef.childFlags) && (i += nodeDef.childCount);
            }
        }
        function checkNoChangesNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
            return 0 === argStyle ? function(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
                var bindLen = nodeDef.bindings.length;
                bindLen > 0 && checkBindingNoChanges(view, nodeDef, 0, v0), bindLen > 1 && checkBindingNoChanges(view, nodeDef, 1, v1), 
                bindLen > 2 && checkBindingNoChanges(view, nodeDef, 2, v2), bindLen > 3 && checkBindingNoChanges(view, nodeDef, 3, v3), 
                bindLen > 4 && checkBindingNoChanges(view, nodeDef, 4, v4), bindLen > 5 && checkBindingNoChanges(view, nodeDef, 5, v5), 
                bindLen > 6 && checkBindingNoChanges(view, nodeDef, 6, v6), bindLen > 7 && checkBindingNoChanges(view, nodeDef, 7, v7), 
                bindLen > 8 && checkBindingNoChanges(view, nodeDef, 8, v8), bindLen > 9 && checkBindingNoChanges(view, nodeDef, 9, v9);
            }(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) : function(view, nodeDef, values) {
                for (var i = 0; i < values.length; i++) checkBindingNoChanges(view, nodeDef, i, values[i]);
            }(view, nodeDef, v0), !1;
        }
        function checkNoChangesQuery(view, nodeDef) {
            if (asQueryList(view, nodeDef.nodeIndex).dirty) throw expressionChangedAfterItHasBeenCheckedError(Services.createDebugContext(view, nodeDef.nodeIndex), "Query " + nodeDef.query.id + " not dirty", "Query " + nodeDef.query.id + " dirty", 0 != (1 & view.state));
        }
        function destroyView(view) {
            if (!(128 & view.state)) {
                if (execEmbeddedViewsAction(view, ViewAction.Destroy), execComponentViewsAction(view, ViewAction.Destroy), 
                callLifecycleHooksChildrenFirst(view, 131072), view.disposables) for (var i = 0; i < view.disposables.length; i++) view.disposables[i]();
                !function(view) {
                    if (16 & view.state) {
                        var dvcElementData = declaredViewContainer(view);
                        if (dvcElementData) {
                            var projectedViews = dvcElementData.template._projectedViews;
                            projectedViews && (removeFromArray(projectedViews, projectedViews.indexOf(view)), 
                            Services.dirtyParentQueries(view));
                        }
                    }
                }(view), view.renderer.destroyNode && function(view) {
                    for (var len = view.def.nodes.length, i = 0; i < len; i++) {
                        var def = view.def.nodes[i];
                        1 & def.flags ? view.renderer.destroyNode(asElementData(view, i).renderElement) : 2 & def.flags ? view.renderer.destroyNode(asTextData(view, i).renderText) : (67108864 & def.flags || 134217728 & def.flags) && asQueryList(view, i).destroy();
                    }
                }(view), isComponentView(view) && view.renderer.destroy(), view.state |= 128;
            }
        }
        var ViewAction = function(ViewAction) {
            return ViewAction[ViewAction.CreateViewNodes = 0] = "CreateViewNodes", ViewAction[ViewAction.CheckNoChanges = 1] = "CheckNoChanges", 
            ViewAction[ViewAction.CheckNoChangesProjectedViews = 2] = "CheckNoChangesProjectedViews", 
            ViewAction[ViewAction.CheckAndUpdate = 3] = "CheckAndUpdate", ViewAction[ViewAction.CheckAndUpdateProjectedViews = 4] = "CheckAndUpdateProjectedViews", 
            ViewAction[ViewAction.Destroy = 5] = "Destroy", ViewAction;
        }({});
        function execComponentViewsAction(view, action) {
            var def = view.def;
            if (33554432 & def.nodeFlags) for (var i = 0; i < def.nodes.length; i++) {
                var nodeDef = def.nodes[i];
                33554432 & nodeDef.flags ? callViewAction(asElementData(view, i).componentView, action) : 0 == (33554432 & nodeDef.childFlags) && (i += nodeDef.childCount);
            }
        }
        function execEmbeddedViewsAction(view, action) {
            var def = view.def;
            if (16777216 & def.nodeFlags) for (var i = 0; i < def.nodes.length; i++) {
                var nodeDef = def.nodes[i];
                if (16777216 & nodeDef.flags) for (var embeddedViews = asElementData(view, i).viewContainer._embeddedViews, k = 0; k < embeddedViews.length; k++) callViewAction(embeddedViews[k], action); else 0 == (16777216 & nodeDef.childFlags) && (i += nodeDef.childCount);
            }
        }
        function callViewAction(view, action) {
            var viewState = view.state;
            switch (action) {
              case ViewAction.CheckNoChanges:
                0 == (128 & viewState) && (12 == (12 & viewState) ? checkNoChangesView(view) : 64 & viewState && execProjectedViewsAction(view, ViewAction.CheckNoChangesProjectedViews));
                break;

              case ViewAction.CheckNoChangesProjectedViews:
                0 == (128 & viewState) && (32 & viewState ? checkNoChangesView(view) : 64 & viewState && execProjectedViewsAction(view, action));
                break;

              case ViewAction.CheckAndUpdate:
                0 == (128 & viewState) && (12 == (12 & viewState) ? checkAndUpdateView(view) : 64 & viewState && execProjectedViewsAction(view, ViewAction.CheckAndUpdateProjectedViews));
                break;

              case ViewAction.CheckAndUpdateProjectedViews:
                0 == (128 & viewState) && (32 & viewState ? checkAndUpdateView(view) : 64 & viewState && execProjectedViewsAction(view, action));
                break;

              case ViewAction.Destroy:
                destroyView(view);
                break;

              case ViewAction.CreateViewNodes:
                createViewNodes(view);
            }
        }
        function execProjectedViewsAction(view, action) {
            execEmbeddedViewsAction(view, action), execComponentViewsAction(view, action);
        }
        function execQueriesAction(view, queryFlags, staticDynamicQueryFlag, checkType) {
            if (view.def.nodeFlags & queryFlags && view.def.nodeFlags & staticDynamicQueryFlag) for (var nodeCount = view.def.nodes.length, i = 0; i < nodeCount; i++) {
                var nodeDef = view.def.nodes[i];
                if (nodeDef.flags & queryFlags && nodeDef.flags & staticDynamicQueryFlag) switch (Services.setCurrentNode(view, nodeDef.nodeIndex), 
                checkType) {
                  case 0:
                    checkAndUpdateQuery(view, nodeDef);
                    break;

                  case 1:
                    checkNoChangesQuery(view, nodeDef);
                }
                nodeDef.childFlags & queryFlags && nodeDef.childFlags & staticDynamicQueryFlag || (i += nodeDef.childCount);
            }
        }
        var initialized = !1;
        function createProdRootView(elInjector, projectableNodes, rootSelectorOrNode, def, ngModule, context) {
            var rendererFactory = ngModule.injector.get(RendererFactory2);
            return createRootView(createRootData(elInjector, ngModule, rendererFactory, projectableNodes, rootSelectorOrNode), def, context);
        }
        function debugCreateRootView(elInjector, projectableNodes, rootSelectorOrNode, def, ngModule, context) {
            var rendererFactory = ngModule.injector.get(RendererFactory2), root = createRootData(elInjector, ngModule, new DebugRendererFactory2(rendererFactory), projectableNodes, rootSelectorOrNode), defWithOverride = applyProviderOverridesToView(def);
            return callWithDebugContext(DebugAction.create, createRootView, null, [ root, defWithOverride, context ]);
        }
        function createRootData(elInjector, ngModule, rendererFactory, projectableNodes, rootSelectorOrNode) {
            var sanitizer = ngModule.injector.get(Sanitizer), errorHandler = ngModule.injector.get(ErrorHandler), renderer = rendererFactory.createRenderer(null, null);
            return {
                ngModule: ngModule,
                injector: elInjector,
                projectableNodes: projectableNodes,
                selectorOrNode: rootSelectorOrNode,
                sanitizer: sanitizer,
                rendererFactory: rendererFactory,
                renderer: renderer,
                errorHandler: errorHandler
            };
        }
        function debugCreateEmbeddedView(parentView, anchorDef, viewDef, context) {
            var defWithOverride = applyProviderOverridesToView(viewDef);
            return callWithDebugContext(DebugAction.create, createEmbeddedView, null, [ parentView, anchorDef, defWithOverride, context ]);
        }
        function debugCreateComponentView(parentView, nodeDef, viewDef, hostElement) {
            return viewDef = viewDefOverrides.get(nodeDef.element.componentProvider.provider.token) || applyProviderOverridesToView(viewDef), 
            callWithDebugContext(DebugAction.create, createComponentView, null, [ parentView, nodeDef, viewDef, hostElement ]);
        }
        function debugCreateNgModuleRef(moduleType, parentInjector, bootstrapComponents, def) {
            return createNgModuleRef(moduleType, parentInjector, bootstrapComponents, function(def) {
                var _a = function(def) {
                    var hasOverrides = !1, hasDeprecatedOverrides = !1;
                    return 0 === providerOverrides.size ? {
                        hasOverrides: hasOverrides,
                        hasDeprecatedOverrides: hasDeprecatedOverrides
                    } : (def.providers.forEach(function(node) {
                        var override = providerOverrides.get(node.token);
                        3840 & node.flags && override && (hasOverrides = !0, hasDeprecatedOverrides = hasDeprecatedOverrides || override.deprecatedBehavior);
                    }), def.modules.forEach(function(module) {
                        providerOverridesWithScope.forEach(function(override, token) {
                            getInjectableDef(token).providedIn === module && (hasOverrides = !0, hasDeprecatedOverrides = hasDeprecatedOverrides || override.deprecatedBehavior);
                        });
                    }), {
                        hasOverrides: hasOverrides,
                        hasDeprecatedOverrides: hasDeprecatedOverrides
                    });
                }(def), hasDeprecatedOverrides = _a.hasDeprecatedOverrides;
                return _a.hasOverrides ? (function(def) {
                    for (var i = 0; i < def.providers.length; i++) {
                        var provider = def.providers[i];
                        hasDeprecatedOverrides && (provider.flags |= 4096);
                        var override = providerOverrides.get(provider.token);
                        override && (provider.flags = -3841 & provider.flags | override.flags, provider.deps = splitDepsDsl(override.deps), 
                        provider.value = override.value);
                    }
                    if (providerOverridesWithScope.size > 0) {
                        var moduleSet_1 = new Set(def.modules);
                        providerOverridesWithScope.forEach(function(override, token) {
                            if (moduleSet_1.has(getInjectableDef(token).providedIn)) {
                                var provider = {
                                    token: token,
                                    flags: override.flags | (hasDeprecatedOverrides ? 4096 : 0),
                                    deps: splitDepsDsl(override.deps),
                                    value: override.value,
                                    index: def.providers.length
                                };
                                def.providers.push(provider), def.providersByKey[tokenKey(token)] = provider;
                            }
                        });
                    }
                }(def = def.factory(function() {
                    return NOOP;
                })), def) : def;
            }(def));
        }
        var providerOverrides = new Map(), providerOverridesWithScope = new Map(), viewDefOverrides = new Map();
        function debugOverrideProvider(override) {
            var injectableDef;
            providerOverrides.set(override.token, override), "function" == typeof override.token && (injectableDef = getInjectableDef(override.token)) && "function" == typeof injectableDef.providedIn && providerOverridesWithScope.set(override.token, override);
        }
        function debugOverrideComponentView(comp, compFactory) {
            var hostViewDef = resolveDefinition(compFactory.viewDefFactory), compViewDef = resolveDefinition(hostViewDef.nodes[0].element.componentView);
            viewDefOverrides.set(comp, compViewDef);
        }
        function debugClearOverrides() {
            providerOverrides.clear(), providerOverridesWithScope.clear(), viewDefOverrides.clear();
        }
        function applyProviderOverridesToView(def) {
            if (0 === providerOverrides.size) return def;
            var elementIndicesWithOverwrittenProviders = function(def) {
                for (var elIndicesWithOverwrittenProviders = [], lastElementDef = null, i = 0; i < def.nodes.length; i++) {
                    var nodeDef = def.nodes[i];
                    1 & nodeDef.flags && (lastElementDef = nodeDef), lastElementDef && 3840 & nodeDef.flags && providerOverrides.has(nodeDef.provider.token) && (elIndicesWithOverwrittenProviders.push(lastElementDef.nodeIndex), 
                    lastElementDef = null);
                }
                return elIndicesWithOverwrittenProviders;
            }(def);
            if (0 === elementIndicesWithOverwrittenProviders.length) return def;
            def = def.factory(function() {
                return NOOP;
            });
            for (var i = 0; i < elementIndicesWithOverwrittenProviders.length; i++) applyProviderOverridesToElement(def, elementIndicesWithOverwrittenProviders[i]);
            return def;
            function applyProviderOverridesToElement(viewDef, elIndex) {
                for (var i = elIndex + 1; i < viewDef.nodes.length; i++) {
                    var nodeDef = viewDef.nodes[i];
                    if (1 & nodeDef.flags) return;
                    if (3840 & nodeDef.flags) {
                        var provider = nodeDef.provider, override = providerOverrides.get(provider.token);
                        override && (nodeDef.flags = -3841 & nodeDef.flags | override.flags, provider.deps = splitDepsDsl(override.deps), 
                        provider.value = override.value);
                    }
                }
            }
        }
        function prodCheckAndUpdateNode(view, checkIndex, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
            var nodeDef = view.def.nodes[checkIndex];
            return checkAndUpdateNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9), 
            224 & nodeDef.flags ? asPureExpressionData(view, checkIndex).value : void 0;
        }
        function prodCheckNoChangesNode(view, checkIndex, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
            var nodeDef = view.def.nodes[checkIndex];
            return checkNoChangesNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9), 
            224 & nodeDef.flags ? asPureExpressionData(view, checkIndex).value : void 0;
        }
        function debugCheckAndUpdateView(view) {
            return callWithDebugContext(DebugAction.detectChanges, checkAndUpdateView, null, [ view ]);
        }
        function debugCheckNoChangesView(view) {
            return callWithDebugContext(DebugAction.checkNoChanges, checkNoChangesView, null, [ view ]);
        }
        function debugDestroyView(view) {
            return callWithDebugContext(DebugAction.destroy, destroyView, null, [ view ]);
        }
        var _currentAction, _currentView, _currentNodeIndex, DebugAction = function(DebugAction) {
            return DebugAction[DebugAction.create = 0] = "create", DebugAction[DebugAction.detectChanges = 1] = "detectChanges", 
            DebugAction[DebugAction.checkNoChanges = 2] = "checkNoChanges", DebugAction[DebugAction.destroy = 3] = "destroy", 
            DebugAction[DebugAction.handleEvent = 4] = "handleEvent", DebugAction;
        }({});
        function debugSetCurrentNode(view, nodeIndex) {
            _currentView = view, _currentNodeIndex = nodeIndex;
        }
        function debugHandleEvent(view, nodeIndex, eventName, event) {
            return debugSetCurrentNode(view, nodeIndex), callWithDebugContext(DebugAction.handleEvent, view.def.handleEvent, null, [ view, nodeIndex, eventName, event ]);
        }
        function debugUpdateDirectives(view, checkType) {
            if (128 & view.state) throw viewDestroyedError(DebugAction[_currentAction]);
            return debugSetCurrentNode(view, nextDirectiveWithBinding(view, 0)), view.def.updateDirectives(function(view, nodeIndex, argStyle) {
                for (var values = [], _i = 3; _i < arguments.length; _i++) values[_i - 3] = arguments[_i];
                var nodeDef = view.def.nodes[nodeIndex];
                return 0 === checkType ? debugCheckAndUpdateNode(view, nodeDef, argStyle, values) : debugCheckNoChangesNode(view, nodeDef, argStyle, values), 
                16384 & nodeDef.flags && debugSetCurrentNode(view, nextDirectiveWithBinding(view, nodeIndex)), 
                224 & nodeDef.flags ? asPureExpressionData(view, nodeDef.nodeIndex).value : void 0;
            }, view);
        }
        function debugUpdateRenderer(view, checkType) {
            if (128 & view.state) throw viewDestroyedError(DebugAction[_currentAction]);
            return debugSetCurrentNode(view, nextRenderNodeWithBinding(view, 0)), view.def.updateRenderer(function(view, nodeIndex, argStyle) {
                for (var values = [], _i = 3; _i < arguments.length; _i++) values[_i - 3] = arguments[_i];
                var nodeDef = view.def.nodes[nodeIndex];
                return 0 === checkType ? debugCheckAndUpdateNode(view, nodeDef, argStyle, values) : debugCheckNoChangesNode(view, nodeDef, argStyle, values), 
                3 & nodeDef.flags && debugSetCurrentNode(view, nextRenderNodeWithBinding(view, nodeIndex)), 
                224 & nodeDef.flags ? asPureExpressionData(view, nodeDef.nodeIndex).value : void 0;
            }, view);
        }
        function debugCheckAndUpdateNode(view, nodeDef, argStyle, givenValues) {
            if (checkAndUpdateNode.apply(void 0, __spread([ view, nodeDef, argStyle ], givenValues))) {
                var values = 1 === argStyle ? givenValues[0] : givenValues;
                if (16384 & nodeDef.flags) {
                    for (var bindingValues = {}, i = 0; i < nodeDef.bindings.length; i++) {
                        var binding = nodeDef.bindings[i], value = values[i];
                        8 & binding.flags && (bindingValues[(name = binding.nonMinifiedName, "ng-reflect-" + name.replace(/[$@]/g, "_").replace(CAMEL_CASE_REGEXP, function() {
                            for (var m = [], _i = 0; _i < arguments.length; _i++) m[_i] = arguments[_i];
                            return "-" + m[1].toLowerCase();
                        }))] = normalizeDebugBindingValue(value));
                    }
                    var elDef = nodeDef.parent, el = asElementData(view, elDef.nodeIndex).renderElement;
                    if (elDef.element.name) for (var attr in bindingValues) null != (value = bindingValues[attr]) ? view.renderer.setAttribute(el, attr, value) : view.renderer.removeAttribute(el, attr); else view.renderer.setValue(el, "bindings=" + JSON.stringify(bindingValues, null, 2));
                }
            }
            var name;
        }
        function debugCheckNoChangesNode(view, nodeDef, argStyle, values) {
            checkNoChangesNode.apply(void 0, __spread([ view, nodeDef, argStyle ], values));
        }
        function nextDirectiveWithBinding(view, nodeIndex) {
            for (var i = nodeIndex; i < view.def.nodes.length; i++) {
                var nodeDef = view.def.nodes[i];
                if (16384 & nodeDef.flags && nodeDef.bindings && nodeDef.bindings.length) return i;
            }
            return null;
        }
        function nextRenderNodeWithBinding(view, nodeIndex) {
            for (var i = nodeIndex; i < view.def.nodes.length; i++) {
                var nodeDef = view.def.nodes[i];
                if (3 & nodeDef.flags && nodeDef.bindings && nodeDef.bindings.length) return i;
            }
            return null;
        }
        var core_DebugContext_ = function() {
            function DebugContext_(view, nodeIndex) {
                this.view = view, this.nodeIndex = nodeIndex, null == nodeIndex && (this.nodeIndex = nodeIndex = 0), 
                this.nodeDef = view.def.nodes[nodeIndex];
                for (var elDef = this.nodeDef, elView = view; elDef && 0 == (1 & elDef.flags); ) elDef = elDef.parent;
                if (!elDef) for (;!elDef && elView; ) elDef = viewParentEl(elView), elView = elView.parent;
                this.elDef = elDef, this.elView = elView;
            }
            return Object.defineProperty(DebugContext_.prototype, "elOrCompView", {
                get: function() {
                    return asElementData(this.elView, this.elDef.nodeIndex).componentView || this.view;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugContext_.prototype, "injector", {
                get: function() {
                    return createInjector$1(this.elView, this.elDef);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugContext_.prototype, "component", {
                get: function() {
                    return this.elOrCompView.component;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugContext_.prototype, "context", {
                get: function() {
                    return this.elOrCompView.context;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugContext_.prototype, "providerTokens", {
                get: function() {
                    var tokens = [];
                    if (this.elDef) for (var i = this.elDef.nodeIndex + 1; i <= this.elDef.nodeIndex + this.elDef.childCount; i++) {
                        var childDef = this.elView.def.nodes[i];
                        20224 & childDef.flags && tokens.push(childDef.provider.token), i += childDef.childCount;
                    }
                    return tokens;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugContext_.prototype, "references", {
                get: function() {
                    var references = {};
                    if (this.elDef) {
                        collectReferences(this.elView, this.elDef, references);
                        for (var i = this.elDef.nodeIndex + 1; i <= this.elDef.nodeIndex + this.elDef.childCount; i++) {
                            var childDef = this.elView.def.nodes[i];
                            20224 & childDef.flags && collectReferences(this.elView, childDef, references), 
                            i += childDef.childCount;
                        }
                    }
                    return references;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugContext_.prototype, "componentRenderElement", {
                get: function() {
                    var elData = function(view) {
                        for (;view && !isComponentView(view); ) view = view.parent;
                        return view.parent ? asElementData(view.parent, viewParentEl(view).nodeIndex) : null;
                    }(this.elOrCompView);
                    return elData ? elData.renderElement : void 0;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(DebugContext_.prototype, "renderNode", {
                get: function() {
                    return 2 & this.nodeDef.flags ? renderNode(this.view, this.nodeDef) : renderNode(this.elView, this.elDef);
                },
                enumerable: !0,
                configurable: !0
            }), DebugContext_.prototype.logError = function(console) {
                for (var logViewDef, logNodeIndex, values = [], _i = 1; _i < arguments.length; _i++) values[_i - 1] = arguments[_i];
                2 & this.nodeDef.flags ? (logViewDef = this.view.def, logNodeIndex = this.nodeDef.nodeIndex) : (logViewDef = this.elView.def, 
                logNodeIndex = this.elDef.nodeIndex);
                var renderNodeIndex = function(viewDef, nodeIndex) {
                    for (var renderNodeIndex = -1, i = 0; i <= nodeIndex; i++) 3 & viewDef.nodes[i].flags && renderNodeIndex++;
                    return renderNodeIndex;
                }(logViewDef, logNodeIndex), currRenderNodeIndex = -1;
                logViewDef.factory(function() {
                    var _a;
                    return ++currRenderNodeIndex === renderNodeIndex ? (_a = console.error).bind.apply(_a, __spread([ console ], values)) : NOOP;
                }), currRenderNodeIndex < renderNodeIndex && (console.error("Illegal state: the ViewDefinitionFactory did not call the logger!"), 
                console.error.apply(console, __spread(values)));
            }, DebugContext_;
        }();
        function collectReferences(view, nodeDef, references) {
            for (var refName in nodeDef.references) references[refName] = getQueryValue(view, nodeDef, nodeDef.references[refName]);
        }
        function callWithDebugContext(action, fn, self, args) {
            var oldAction = _currentAction, oldView = _currentView, oldNodeIndex = _currentNodeIndex;
            try {
                _currentAction = action;
                var result = fn.apply(self, args);
                return _currentView = oldView, _currentNodeIndex = oldNodeIndex, _currentAction = oldAction, 
                result;
            } catch (e) {
                if (getDebugContext(e) || !_currentView) throw e;
                throw function(err, context) {
                    return err instanceof Error || (err = new Error(err.toString())), _addDebugContext(err, context), 
                    err;
                }(e, getCurrentDebugContext());
            }
        }
        function getCurrentDebugContext() {
            return _currentView ? new core_DebugContext_(_currentView, _currentNodeIndex) : null;
        }
        var DebugRendererFactory2 = function() {
            function DebugRendererFactory2(delegate) {
                this.delegate = delegate;
            }
            return DebugRendererFactory2.prototype.createRenderer = function(element, renderData) {
                return new DebugRenderer2(this.delegate.createRenderer(element, renderData));
            }, DebugRendererFactory2.prototype.begin = function() {
                this.delegate.begin && this.delegate.begin();
            }, DebugRendererFactory2.prototype.end = function() {
                this.delegate.end && this.delegate.end();
            }, DebugRendererFactory2.prototype.whenRenderingDone = function() {
                return this.delegate.whenRenderingDone ? this.delegate.whenRenderingDone() : Promise.resolve(null);
            }, DebugRendererFactory2;
        }(), DebugRenderer2 = function() {
            function DebugRenderer2(delegate) {
                this.delegate = delegate, this.debugContextFactory = getCurrentDebugContext, this.data = this.delegate.data;
            }
            return DebugRenderer2.prototype.createDebugContext = function(nativeElement) {
                return this.debugContextFactory(nativeElement);
            }, DebugRenderer2.prototype.destroyNode = function(node) {
                !function(node) {
                    _nativeNodeToDebugNode.delete(node.nativeNode);
                }(getDebugNode(node)), this.delegate.destroyNode && this.delegate.destroyNode(node);
            }, DebugRenderer2.prototype.destroy = function() {
                this.delegate.destroy();
            }, DebugRenderer2.prototype.createElement = function(name, namespace) {
                var el = this.delegate.createElement(name, namespace), debugCtx = this.createDebugContext(el);
                if (debugCtx) {
                    var debugEl = new core_DebugElement_PRE_R3_(el, null, debugCtx);
                    debugEl.name = name, indexDebugNode(debugEl);
                }
                return el;
            }, DebugRenderer2.prototype.createComment = function(value) {
                var comment = this.delegate.createComment(value), debugCtx = this.createDebugContext(comment);
                return debugCtx && indexDebugNode(new DebugNode__PRE_R3__(comment, null, debugCtx)), 
                comment;
            }, DebugRenderer2.prototype.createText = function(value) {
                var text = this.delegate.createText(value), debugCtx = this.createDebugContext(text);
                return debugCtx && indexDebugNode(new DebugNode__PRE_R3__(text, null, debugCtx)), 
                text;
            }, DebugRenderer2.prototype.appendChild = function(parent, newChild) {
                var debugEl = getDebugNode(parent), debugChildEl = getDebugNode(newChild);
                debugEl && debugChildEl && debugEl instanceof core_DebugElement_PRE_R3_ && debugEl.addChild(debugChildEl), 
                this.delegate.appendChild(parent, newChild);
            }, DebugRenderer2.prototype.insertBefore = function(parent, newChild, refChild) {
                var debugEl = getDebugNode(parent), debugChildEl = getDebugNode(newChild), debugRefEl = getDebugNode(refChild);
                debugEl && debugChildEl && debugEl instanceof core_DebugElement_PRE_R3_ && debugEl.insertBefore(debugRefEl, debugChildEl), 
                this.delegate.insertBefore(parent, newChild, refChild);
            }, DebugRenderer2.prototype.removeChild = function(parent, oldChild) {
                var debugEl = getDebugNode(parent), debugChildEl = getDebugNode(oldChild);
                debugEl && debugChildEl && debugEl instanceof core_DebugElement_PRE_R3_ && debugEl.removeChild(debugChildEl), 
                this.delegate.removeChild(parent, oldChild);
            }, DebugRenderer2.prototype.selectRootElement = function(selectorOrNode, preserveContent) {
                var el = this.delegate.selectRootElement(selectorOrNode, preserveContent), debugCtx = getCurrentDebugContext();
                return debugCtx && indexDebugNode(new core_DebugElement_PRE_R3_(el, null, debugCtx)), 
                el;
            }, DebugRenderer2.prototype.setAttribute = function(el, name, value, namespace) {
                var debugEl = getDebugNode(el);
                debugEl && debugEl instanceof core_DebugElement_PRE_R3_ && (debugEl.attributes[namespace ? namespace + ":" + name : name] = value), 
                this.delegate.setAttribute(el, name, value, namespace);
            }, DebugRenderer2.prototype.removeAttribute = function(el, name, namespace) {
                var debugEl = getDebugNode(el);
                debugEl && debugEl instanceof core_DebugElement_PRE_R3_ && (debugEl.attributes[namespace ? namespace + ":" + name : name] = null), 
                this.delegate.removeAttribute(el, name, namespace);
            }, DebugRenderer2.prototype.addClass = function(el, name) {
                var debugEl = getDebugNode(el);
                debugEl && debugEl instanceof core_DebugElement_PRE_R3_ && (debugEl.classes[name] = !0), 
                this.delegate.addClass(el, name);
            }, DebugRenderer2.prototype.removeClass = function(el, name) {
                var debugEl = getDebugNode(el);
                debugEl && debugEl instanceof core_DebugElement_PRE_R3_ && (debugEl.classes[name] = !1), 
                this.delegate.removeClass(el, name);
            }, DebugRenderer2.prototype.setStyle = function(el, style, value, flags) {
                var debugEl = getDebugNode(el);
                debugEl && debugEl instanceof core_DebugElement_PRE_R3_ && (debugEl.styles[style] = value), 
                this.delegate.setStyle(el, style, value, flags);
            }, DebugRenderer2.prototype.removeStyle = function(el, style, flags) {
                var debugEl = getDebugNode(el);
                debugEl && debugEl instanceof core_DebugElement_PRE_R3_ && (debugEl.styles[style] = null), 
                this.delegate.removeStyle(el, style, flags);
            }, DebugRenderer2.prototype.setProperty = function(el, name, value) {
                var debugEl = getDebugNode(el);
                debugEl && debugEl instanceof core_DebugElement_PRE_R3_ && (debugEl.properties[name] = value), 
                this.delegate.setProperty(el, name, value);
            }, DebugRenderer2.prototype.listen = function(target, eventName, callback) {
                if ("string" != typeof target) {
                    var debugEl = getDebugNode(target);
                    debugEl && debugEl.listeners.push(new EventListener(eventName, callback));
                }
                return this.delegate.listen(target, eventName, callback);
            }, DebugRenderer2.prototype.parentNode = function(node) {
                return this.delegate.parentNode(node);
            }, DebugRenderer2.prototype.nextSibling = function(node) {
                return this.delegate.nextSibling(node);
            }, DebugRenderer2.prototype.setValue = function(node, value) {
                return this.delegate.setValue(node, value);
            }, DebugRenderer2;
        }();
        function createNgModuleFactory(ngModuleType, bootstrapComponents, defFactory) {
            return new core_NgModuleFactory_(ngModuleType, bootstrapComponents, defFactory);
        }
        var core_NgModuleFactory_ = function(_super) {
            function NgModuleFactory_(moduleType, _bootstrapComponents, _ngModuleDefFactory) {
                var _this = _super.call(this) || this;
                return _this.moduleType = moduleType, _this._bootstrapComponents = _bootstrapComponents, 
                _this._ngModuleDefFactory = _ngModuleDefFactory, _this;
            }
            return __extends(NgModuleFactory_, _super), NgModuleFactory_.prototype.create = function(parentInjector) {
                !function() {
                    if (!initialized) {
                        initialized = !0;
                        var services = isDevMode() ? {
                            setCurrentNode: debugSetCurrentNode,
                            createRootView: debugCreateRootView,
                            createEmbeddedView: debugCreateEmbeddedView,
                            createComponentView: debugCreateComponentView,
                            createNgModuleRef: debugCreateNgModuleRef,
                            overrideProvider: debugOverrideProvider,
                            overrideComponentView: debugOverrideComponentView,
                            clearOverrides: debugClearOverrides,
                            checkAndUpdateView: debugCheckAndUpdateView,
                            checkNoChangesView: debugCheckNoChangesView,
                            destroyView: debugDestroyView,
                            createDebugContext: function(view, nodeIndex) {
                                return new core_DebugContext_(view, nodeIndex);
                            },
                            handleEvent: debugHandleEvent,
                            updateDirectives: debugUpdateDirectives,
                            updateRenderer: debugUpdateRenderer
                        } : {
                            setCurrentNode: function() {},
                            createRootView: createProdRootView,
                            createEmbeddedView: createEmbeddedView,
                            createComponentView: createComponentView,
                            createNgModuleRef: createNgModuleRef,
                            overrideProvider: NOOP,
                            overrideComponentView: NOOP,
                            clearOverrides: NOOP,
                            checkAndUpdateView: checkAndUpdateView,
                            checkNoChangesView: checkNoChangesView,
                            destroyView: destroyView,
                            createDebugContext: function(view, nodeIndex) {
                                return new core_DebugContext_(view, nodeIndex);
                            },
                            handleEvent: function(view, nodeIndex, eventName, event) {
                                return view.def.handleEvent(view, nodeIndex, eventName, event);
                            },
                            updateDirectives: function(view, checkType) {
                                return view.def.updateDirectives(0 === checkType ? prodCheckAndUpdateNode : prodCheckNoChangesNode, view);
                            },
                            updateRenderer: function(view, checkType) {
                                return view.def.updateRenderer(0 === checkType ? prodCheckAndUpdateNode : prodCheckNoChangesNode, view);
                            }
                        };
                        Services.setCurrentNode = services.setCurrentNode, Services.createRootView = services.createRootView, 
                        Services.createEmbeddedView = services.createEmbeddedView, Services.createComponentView = services.createComponentView, 
                        Services.createNgModuleRef = services.createNgModuleRef, Services.overrideProvider = services.overrideProvider, 
                        Services.overrideComponentView = services.overrideComponentView, Services.clearOverrides = services.clearOverrides, 
                        Services.checkAndUpdateView = services.checkAndUpdateView, Services.checkNoChangesView = services.checkNoChangesView, 
                        Services.destroyView = services.destroyView, Services.resolveDep = resolveDep, Services.createDebugContext = services.createDebugContext, 
                        Services.handleEvent = services.handleEvent, Services.updateDirectives = services.updateDirectives, 
                        Services.updateRenderer = services.updateRenderer, Services.dirtyParentQueries = dirtyParentQueries;
                    }
                }();
                var def = function(def) {
                    var providers = Array.from(def.providers), modules = Array.from(def.modules), providersByKey = {};
                    for (var key in def.providersByKey) providersByKey[key] = def.providersByKey[key];
                    return {
                        factory: def.factory,
                        isRoot: def.isRoot,
                        providers: providers,
                        modules: modules,
                        providersByKey: providersByKey
                    };
                }(resolveDefinition(this._ngModuleDefFactory));
                return Services.createNgModuleRef(this.moduleType, parentInjector || Injector.NULL, this._bootstrapComponents, def);
            }, NgModuleFactory_;
        }(core_NgModuleFactory), environment = {
            gaId: "UA-8594346-15",
            production: !0,
            mode: "stable"
        }, empty_EMPTY = new Observable_Observable(function(subscriber) {
            return subscriber.complete();
        });
        function empty_empty(scheduler) {
            return scheduler ? function(scheduler) {
                return new Observable_Observable(function(subscriber) {
                    return scheduler.schedule(function() {
                        return subscriber.complete();
                    });
                });
            }(scheduler) : empty_EMPTY;
        }
        function scalar(value) {
            var result = new Observable_Observable(function(subscriber) {
                subscriber.next(value), subscriber.complete();
            });
            return result._isScalar = !0, result.value = value, result;
        }
        function of() {
            for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
            var scheduler = args[args.length - 1];
            switch (isScheduler(scheduler) ? args.pop() : scheduler = void 0, args.length) {
              case 0:
                return empty_empty(scheduler);

              case 1:
                return scheduler ? fromArray(args, scheduler) : scalar(args[0]);

              default:
                return fromArray(args, scheduler);
            }
        }
        var PlatformLocation = function() {
            return function() {};
        }(), LocationStrategy = function() {
            return function() {};
        }(), APP_BASE_HREF = new InjectionToken("appBaseHref"), common_Location = function() {
            function Location(platformStrategy) {
                var _this = this;
                this._subject = new core_EventEmitter(), this._platformStrategy = platformStrategy;
                var browserBaseHref = this._platformStrategy.getBaseHref();
                this._baseHref = Location_1.stripTrailingSlash(_stripIndexHtml(browserBaseHref)), 
                this._platformStrategy.onPopState(function(ev) {
                    _this._subject.emit({
                        url: _this.path(!0),
                        pop: !0,
                        state: ev.state,
                        type: ev.type
                    });
                });
            }
            var Location_1;
            return Location_1 = Location, Location.prototype.path = function(includeHash) {
                return void 0 === includeHash && (includeHash = !1), this.normalize(this._platformStrategy.path(includeHash));
            }, Location.prototype.isCurrentPathEqualTo = function(path, query) {
                return void 0 === query && (query = ""), this.path() == this.normalize(path + Location_1.normalizeQueryParams(query));
            }, Location.prototype.normalize = function(url) {
                return Location_1.stripTrailingSlash(function(baseHref, url) {
                    return baseHref && url.startsWith(baseHref) ? url.substring(baseHref.length) : url;
                }(this._baseHref, _stripIndexHtml(url)));
            }, Location.prototype.prepareExternalUrl = function(url) {
                return url && "/" !== url[0] && (url = "/" + url), this._platformStrategy.prepareExternalUrl(url);
            }, Location.prototype.go = function(path, query, state) {
                void 0 === query && (query = ""), void 0 === state && (state = null), this._platformStrategy.pushState(state, "", path, query);
            }, Location.prototype.replaceState = function(path, query, state) {
                void 0 === query && (query = ""), void 0 === state && (state = null), this._platformStrategy.replaceState(state, "", path, query);
            }, Location.prototype.forward = function() {
                this._platformStrategy.forward();
            }, Location.prototype.back = function() {
                this._platformStrategy.back();
            }, Location.prototype.subscribe = function(onNext, onThrow, onReturn) {
                return this._subject.subscribe({
                    next: onNext,
                    error: onThrow,
                    complete: onReturn
                });
            }, Location.normalizeQueryParams = function(params) {
                return params && "?" !== params[0] ? "?" + params : params;
            }, Location.joinWithSlash = function(start, end) {
                if (0 == start.length) return end;
                if (0 == end.length) return start;
                var slashes = 0;
                return start.endsWith("/") && slashes++, end.startsWith("/") && slashes++, 2 == slashes ? start + end.substring(1) : 1 == slashes ? start + end : start + "/" + end;
            }, Location.stripTrailingSlash = function(url) {
                var match = url.match(/#|\?|$/), pathEndIdx = match && match.index || url.length;
                return url.slice(0, pathEndIdx - ("/" === url[pathEndIdx - 1] ? 1 : 0)) + url.slice(pathEndIdx);
            }, Location;
        }();
        function _stripIndexHtml(url) {
            return url.replace(/\/index.html$/, "");
        }
        var common_PathLocationStrategy = function(_super) {
            function PathLocationStrategy(_platformLocation, href) {
                var _this = _super.call(this) || this;
                if (_this._platformLocation = _platformLocation, null == href && (href = _this._platformLocation.getBaseHrefFromDOM()), 
                null == href) throw new Error("No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.");
                return _this._baseHref = href, _this;
            }
            return __extends(PathLocationStrategy, _super), PathLocationStrategy.prototype.onPopState = function(fn) {
                this._platformLocation.onPopState(fn), this._platformLocation.onHashChange(fn);
            }, PathLocationStrategy.prototype.getBaseHref = function() {
                return this._baseHref;
            }, PathLocationStrategy.prototype.prepareExternalUrl = function(internal) {
                return common_Location.joinWithSlash(this._baseHref, internal);
            }, PathLocationStrategy.prototype.path = function(includeHash) {
                void 0 === includeHash && (includeHash = !1);
                var pathname = this._platformLocation.pathname + common_Location.normalizeQueryParams(this._platformLocation.search), hash = this._platformLocation.hash;
                return hash && includeHash ? "" + pathname + hash : pathname;
            }, PathLocationStrategy.prototype.pushState = function(state, title, url, queryParams) {
                var externalUrl = this.prepareExternalUrl(url + common_Location.normalizeQueryParams(queryParams));
                this._platformLocation.pushState(state, title, externalUrl);
            }, PathLocationStrategy.prototype.replaceState = function(state, title, url, queryParams) {
                var externalUrl = this.prepareExternalUrl(url + common_Location.normalizeQueryParams(queryParams));
                this._platformLocation.replaceState(state, title, externalUrl);
            }, PathLocationStrategy.prototype.forward = function() {
                this._platformLocation.forward();
            }, PathLocationStrategy.prototype.back = function() {
                this._platformLocation.back();
            }, PathLocationStrategy;
        }(LocationStrategy), u = void 0, localeEn = [ "en", [ [ "a", "p" ], [ "AM", "PM" ], u ], [ [ "AM", "PM" ], u, u ], [ [ "S", "M", "T", "W", "T", "F", "S" ], [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ], [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ], [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ] ], u, [ [ "J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D" ], [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ], [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ] ], u, [ [ "B", "A" ], [ "BC", "AD" ], [ "Before Christ", "Anno Domini" ] ], 0, [ 6, 0 ], [ "M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y" ], [ "h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz" ], [ "{1}, {0}", u, "{1} 'at' {0}", u ], [ ".", ",", ";", "%", "+", "-", "E", "\xd7", "\u2030", "\u221e", "NaN", ":" ], [ "#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0" ], "$", "US Dollar", {}, function(n) {
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
            return __extends(NgLocaleLocalization, _super), NgLocaleLocalization.prototype.getPluralCategory = function(value, locale) {
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
            }, NgLocaleLocalization;
        }(NgLocalization);
        function parseCookieValue(cookieStr, name) {
            var e_1, _a;
            name = encodeURIComponent(name);
            try {
                for (var _b = __values(cookieStr.split(";")), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var cookie = _c.value, eqIndex = cookie.indexOf("="), _d = __read(-1 == eqIndex ? [ cookie, "" ] : [ cookie.slice(0, eqIndex), cookie.slice(eqIndex + 1) ], 2), cookieValue = _d[1];
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
        }
        var NgClassImpl = function() {
            return function() {};
        }(), common_NgClassR2Impl = function() {
            function NgClassR2Impl(_iterableDiffers, _keyValueDiffers, _ngEl, _renderer) {
                this._iterableDiffers = _iterableDiffers, this._keyValueDiffers = _keyValueDiffers, 
                this._ngEl = _ngEl, this._renderer = _renderer, this._initialClasses = [];
            }
            return NgClassR2Impl.prototype.getValue = function() {
                return null;
            }, NgClassR2Impl.prototype.setClass = function(value) {
                this._removeClasses(this._initialClasses), this._initialClasses = "string" == typeof value ? value.split(/\s+/) : [], 
                this._applyClasses(this._initialClasses), this._applyClasses(this._rawClass);
            }, NgClassR2Impl.prototype.setNgClass = function(value) {
                this._removeClasses(this._rawClass), this._applyClasses(this._initialClasses), this._iterableDiffer = null, 
                this._keyValueDiffer = null, this._rawClass = "string" == typeof value ? value.split(/\s+/) : value, 
                this._rawClass && (isListLikeIterable(this._rawClass) ? this._iterableDiffer = this._iterableDiffers.find(this._rawClass).create() : this._keyValueDiffer = this._keyValueDiffers.find(this._rawClass).create());
            }, NgClassR2Impl.prototype.applyChanges = function() {
                if (this._iterableDiffer) {
                    var iterableChanges = this._iterableDiffer.diff(this._rawClass);
                    iterableChanges && this._applyIterableChanges(iterableChanges);
                } else if (this._keyValueDiffer) {
                    var keyValueChanges = this._keyValueDiffer.diff(this._rawClass);
                    keyValueChanges && this._applyKeyValueChanges(keyValueChanges);
                }
            }, NgClassR2Impl.prototype._applyKeyValueChanges = function(changes) {
                var _this = this;
                changes.forEachAddedItem(function(record) {
                    return _this._toggleClass(record.key, record.currentValue);
                }), changes.forEachChangedItem(function(record) {
                    return _this._toggleClass(record.key, record.currentValue);
                }), changes.forEachRemovedItem(function(record) {
                    record.previousValue && _this._toggleClass(record.key, !1);
                });
            }, NgClassR2Impl.prototype._applyIterableChanges = function(changes) {
                var _this = this;
                changes.forEachAddedItem(function(record) {
                    if ("string" != typeof record.item) throw new Error("NgClass can only toggle CSS classes expressed as strings, got " + stringify(record.item));
                    _this._toggleClass(record.item, !0);
                }), changes.forEachRemovedItem(function(record) {
                    return _this._toggleClass(record.item, !1);
                });
            }, NgClassR2Impl.prototype._applyClasses = function(rawClassVal) {
                var _this = this;
                rawClassVal && (Array.isArray(rawClassVal) || rawClassVal instanceof Set ? rawClassVal.forEach(function(klass) {
                    return _this._toggleClass(klass, !0);
                }) : Object.keys(rawClassVal).forEach(function(klass) {
                    return _this._toggleClass(klass, !!rawClassVal[klass]);
                }));
            }, NgClassR2Impl.prototype._removeClasses = function(rawClassVal) {
                var _this = this;
                rawClassVal && (Array.isArray(rawClassVal) || rawClassVal instanceof Set ? rawClassVal.forEach(function(klass) {
                    return _this._toggleClass(klass, !1);
                }) : Object.keys(rawClassVal).forEach(function(klass) {
                    return _this._toggleClass(klass, !1);
                }));
            }, NgClassR2Impl.prototype._toggleClass = function(klass, enabled) {
                var _this = this;
                (klass = klass.trim()) && klass.split(/\s+/g).forEach(function(klass) {
                    enabled ? _this._renderer.addClass(_this._ngEl.nativeElement, klass) : _this._renderer.removeClass(_this._ngEl.nativeElement, klass);
                });
            }, NgClassR2Impl;
        }(), common_NgClass = function(_super) {
            function NgClass(delegate) {
                return _super.call(this, delegate) || this;
            }
            return __extends(NgClass, _super), Object.defineProperty(NgClass.prototype, "klass", {
                set: function(value) {
                    this._delegate.setClass(value);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(NgClass.prototype, "ngClass", {
                set: function(value) {
                    this._delegate.setNgClass(value);
                },
                enumerable: !0,
                configurable: !0
            }), NgClass.prototype.ngDoCheck = function() {
                this._delegate.applyChanges();
            }, NgClass;
        }(function() {
            function NgClassBase(_delegate) {
                this._delegate = _delegate;
            }
            return NgClassBase.prototype.getValue = function() {
                return this._delegate.getValue();
            }, NgClassBase.ngDirectiveDef = void 0, NgClassBase;
        }()), NgForOfContext = function() {
            function NgForOfContext($implicit, ngForOf, index, count) {
                this.$implicit = $implicit, this.ngForOf = ngForOf, this.index = index, this.count = count;
            }
            return Object.defineProperty(NgForOfContext.prototype, "first", {
                get: function() {
                    return 0 === this.index;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(NgForOfContext.prototype, "last", {
                get: function() {
                    return this.index === this.count - 1;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(NgForOfContext.prototype, "even", {
                get: function() {
                    return this.index % 2 == 0;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(NgForOfContext.prototype, "odd", {
                get: function() {
                    return !this.even;
                },
                enumerable: !0,
                configurable: !0
            }), NgForOfContext;
        }(), common_NgForOf = function() {
            function NgForOf(_viewContainer, _template, _differs) {
                this._viewContainer = _viewContainer, this._template = _template, this._differs = _differs, 
                this._ngForOfDirty = !0, this._differ = null;
            }
            return Object.defineProperty(NgForOf.prototype, "ngForOf", {
                set: function(ngForOf) {
                    this._ngForOf = ngForOf, this._ngForOfDirty = !0;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(NgForOf.prototype, "ngForTrackBy", {
                get: function() {
                    return this._trackByFn;
                },
                set: function(fn) {
                    isDevMode() && null != fn && "function" != typeof fn && console && console.warn && console.warn("trackBy must be a function, but received " + JSON.stringify(fn) + ". See https://angular.io/docs/ts/latest/api/common/index/NgFor-directive.html#!#change-propagation for more information."), 
                    this._trackByFn = fn;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(NgForOf.prototype, "ngForTemplate", {
                set: function(value) {
                    value && (this._template = value);
                },
                enumerable: !0,
                configurable: !0
            }), NgForOf.prototype.ngDoCheck = function() {
                if (this._ngForOfDirty) {
                    this._ngForOfDirty = !1;
                    var value = this._ngForOf;
                    if (!this._differ && value) try {
                        this._differ = this._differs.find(value).create(this.ngForTrackBy);
                    } catch (_a) {
                        throw new Error("Cannot find a differ supporting object '" + value + "' of type '" + ((type = value).name || typeof type) + "'. NgFor only supports binding to Iterables such as Arrays.");
                    }
                }
                var type;
                if (this._differ) {
                    var changes = this._differ.diff(this._ngForOf);
                    changes && this._applyChanges(changes);
                }
            }, NgForOf.prototype._applyChanges = function(changes) {
                var _this = this, insertTuples = [];
                changes.forEachOperation(function(item, adjustedPreviousIndex, currentIndex) {
                    if (null == item.previousIndex) {
                        var view = _this._viewContainer.createEmbeddedView(_this._template, new NgForOfContext(null, _this._ngForOf, -1, -1), currentIndex), tuple = new RecordViewTuple(item, view);
                        insertTuples.push(tuple);
                    } else null == currentIndex ? _this._viewContainer.remove(adjustedPreviousIndex) : (view = _this._viewContainer.get(adjustedPreviousIndex), 
                    _this._viewContainer.move(view, currentIndex), tuple = new RecordViewTuple(item, view), 
                    insertTuples.push(tuple));
                });
                for (var i = 0; i < insertTuples.length; i++) this._perViewChange(insertTuples[i].view, insertTuples[i].record);
                i = 0;
                for (var ilen = this._viewContainer.length; i < ilen; i++) {
                    var viewRef = this._viewContainer.get(i);
                    viewRef.context.index = i, viewRef.context.count = ilen, viewRef.context.ngForOf = this._ngForOf;
                }
                changes.forEachIdentityChange(function(record) {
                    _this._viewContainer.get(record.currentIndex).context.$implicit = record.item;
                });
            }, NgForOf.prototype._perViewChange = function(view, record) {
                view.context.$implicit = record.item;
            }, NgForOf.ngTemplateContextGuard = function(dir, ctx) {
                return !0;
            }, NgForOf;
        }(), RecordViewTuple = function() {
            return function(record, view) {
                this.record = record, this.view = view;
            };
        }(), NgIf = function() {
            function NgIf(_viewContainer, templateRef) {
                this._viewContainer = _viewContainer, this._context = new NgIfContext(), this._thenTemplateRef = null, 
                this._elseTemplateRef = null, this._thenViewRef = null, this._elseViewRef = null, 
                this._thenTemplateRef = templateRef;
            }
            return Object.defineProperty(NgIf.prototype, "ngIf", {
                set: function(condition) {
                    this._context.$implicit = this._context.ngIf = condition, this._updateView();
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(NgIf.prototype, "ngIfThen", {
                set: function(templateRef) {
                    assertTemplate("ngIfThen", templateRef), this._thenTemplateRef = templateRef, this._thenViewRef = null, 
                    this._updateView();
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(NgIf.prototype, "ngIfElse", {
                set: function(templateRef) {
                    assertTemplate("ngIfElse", templateRef), this._elseTemplateRef = templateRef, this._elseViewRef = null, 
                    this._updateView();
                },
                enumerable: !0,
                configurable: !0
            }), NgIf.prototype._updateView = function() {
                this._context.$implicit ? this._thenViewRef || (this._viewContainer.clear(), this._elseViewRef = null, 
                this._thenTemplateRef && (this._thenViewRef = this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context))) : this._elseViewRef || (this._viewContainer.clear(), 
                this._thenViewRef = null, this._elseTemplateRef && (this._elseViewRef = this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context)));
            }, NgIf.ngTemplateGuard_ngIf = function(dir, expr) {
                return !0;
            }, NgIf;
        }(), NgIfContext = function() {
            return function() {
                this.$implicit = null, this.ngIf = null;
            };
        }();
        function assertTemplate(property, templateRef) {
            if (templateRef && !templateRef.createEmbeddedView) throw new Error(property + " must be a TemplateRef, but received '" + stringify(templateRef) + "'.");
        }
        var SwitchView = function() {
            function SwitchView(_viewContainerRef, _templateRef) {
                this._viewContainerRef = _viewContainerRef, this._templateRef = _templateRef, this._created = !1;
            }
            return SwitchView.prototype.create = function() {
                this._created = !0, this._viewContainerRef.createEmbeddedView(this._templateRef);
            }, SwitchView.prototype.destroy = function() {
                this._created = !1, this._viewContainerRef.clear();
            }, SwitchView.prototype.enforceState = function(created) {
                created && !this._created ? this.create() : !created && this._created && this.destroy();
            }, SwitchView;
        }(), NgSwitch = function() {
            function NgSwitch() {
                this._defaultUsed = !1, this._caseCount = 0, this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1;
            }
            return Object.defineProperty(NgSwitch.prototype, "ngSwitch", {
                set: function(newValue) {
                    this._ngSwitch = newValue, 0 === this._caseCount && this._updateDefaultCases(!0);
                },
                enumerable: !0,
                configurable: !0
            }), NgSwitch.prototype._addCase = function() {
                return this._caseCount++;
            }, NgSwitch.prototype._addDefault = function(view) {
                this._defaultViews || (this._defaultViews = []), this._defaultViews.push(view);
            }, NgSwitch.prototype._matchCase = function(value) {
                var matched = value == this._ngSwitch;
                return this._lastCasesMatched = this._lastCasesMatched || matched, this._lastCaseCheckIndex++, 
                this._lastCaseCheckIndex === this._caseCount && (this._updateDefaultCases(!this._lastCasesMatched), 
                this._lastCaseCheckIndex = 0, this._lastCasesMatched = !1), matched;
            }, NgSwitch.prototype._updateDefaultCases = function(useDefault) {
                if (this._defaultViews && useDefault !== this._defaultUsed) {
                    this._defaultUsed = useDefault;
                    for (var i = 0; i < this._defaultViews.length; i++) this._defaultViews[i].enforceState(useDefault);
                }
            }, NgSwitch;
        }(), NgSwitchCase = function() {
            function NgSwitchCase(viewContainer, templateRef, ngSwitch) {
                this.ngSwitch = ngSwitch, ngSwitch._addCase(), this._view = new SwitchView(viewContainer, templateRef);
            }
            return NgSwitchCase.prototype.ngDoCheck = function() {
                this._view.enforceState(this.ngSwitch._matchCase(this.ngSwitchCase));
            }, NgSwitchCase;
        }(), NgSwitchDefault = function() {
            return function(viewContainer, templateRef, ngSwitch) {
                ngSwitch._addDefault(new SwitchView(viewContainer, templateRef));
            };
        }(), NgStyleImpl = function() {
            return function() {};
        }(), common_NgStyleR2Impl = function() {
            function NgStyleR2Impl(_ngEl, _differs, _renderer) {
                this._ngEl = _ngEl, this._differs = _differs, this._renderer = _renderer;
            }
            return NgStyleR2Impl.prototype.getValue = function() {
                return null;
            }, NgStyleR2Impl.prototype.setNgStyle = function(values) {
                this._ngStyle = values, !this._differ && values && (this._differ = this._differs.find(values).create());
            }, NgStyleR2Impl.prototype.applyChanges = function() {
                if (this._differ) {
                    var changes = this._differ.diff(this._ngStyle);
                    changes && this._applyChanges(changes);
                }
            }, NgStyleR2Impl.prototype._applyChanges = function(changes) {
                var _this = this;
                changes.forEachRemovedItem(function(record) {
                    return _this._setStyle(record.key, null);
                }), changes.forEachAddedItem(function(record) {
                    return _this._setStyle(record.key, record.currentValue);
                }), changes.forEachChangedItem(function(record) {
                    return _this._setStyle(record.key, record.currentValue);
                });
            }, NgStyleR2Impl.prototype._setStyle = function(nameAndUnit, value) {
                var _a = __read(nameAndUnit.split("."), 2), name = _a[0], unit = _a[1];
                null != (value = null != value && unit ? "" + value + unit : value) ? this._renderer.setStyle(this._ngEl.nativeElement, name, value) : this._renderer.removeStyle(this._ngEl.nativeElement, name);
            }, NgStyleR2Impl;
        }(), common_NgStyle = function(_super) {
            function NgStyle(delegate) {
                return _super.call(this, delegate) || this;
            }
            return __extends(NgStyle, _super), Object.defineProperty(NgStyle.prototype, "ngStyle", {
                set: function(value) {
                    this._delegate.setNgStyle(value);
                },
                enumerable: !0,
                configurable: !0
            }), NgStyle.prototype.ngDoCheck = function() {
                this._delegate.applyChanges();
            }, NgStyle;
        }(function() {
            function NgStyleBase(_delegate) {
                this._delegate = _delegate;
            }
            return NgStyleBase.prototype.getValue = function() {
                return this._delegate.getValue();
            }, NgStyleBase.ngDirectiveDef = void 0, NgStyleBase;
        }()), ObservableStrategy = function() {
            function ObservableStrategy() {}
            return ObservableStrategy.prototype.createSubscription = function(async, updateLatestValue) {
                return async.subscribe({
                    next: updateLatestValue,
                    error: function(e) {
                        throw e;
                    }
                });
            }, ObservableStrategy.prototype.dispose = function(subscription) {
                subscription.unsubscribe();
            }, ObservableStrategy.prototype.onDestroy = function(subscription) {
                subscription.unsubscribe();
            }, ObservableStrategy;
        }(), _promiseStrategy = new (function() {
            function PromiseStrategy() {}
            return PromiseStrategy.prototype.createSubscription = function(async, updateLatestValue) {
                return async.then(updateLatestValue, function(e) {
                    throw e;
                });
            }, PromiseStrategy.prototype.dispose = function(subscription) {}, PromiseStrategy.prototype.onDestroy = function(subscription) {}, 
            PromiseStrategy;
        }())(), _observableStrategy = new ObservableStrategy(), common_AsyncPipe = function() {
            function AsyncPipe(_ref) {
                this._ref = _ref, this._latestValue = null, this._latestReturnedValue = null, this._subscription = null, 
                this._obj = null, this._strategy = null;
            }
            var AsyncPipe_1;
            return AsyncPipe_1 = AsyncPipe, AsyncPipe.prototype.ngOnDestroy = function() {
                this._subscription && this._dispose();
            }, AsyncPipe.prototype.transform = function(obj) {
                return this._obj ? obj !== this._obj ? (this._dispose(), this.transform(obj)) : this._latestValue === this._latestReturnedValue ? this._latestReturnedValue : (this._latestReturnedValue = this._latestValue, 
                WrappedValue.wrap(this._latestValue)) : (obj && this._subscribe(obj), this._latestReturnedValue = this._latestValue, 
                this._latestValue);
            }, AsyncPipe.prototype._subscribe = function(obj) {
                var _this = this;
                this._obj = obj, this._strategy = this._selectStrategy(obj), this._subscription = this._strategy.createSubscription(obj, function(value) {
                    return _this._updateLatestValue(obj, value);
                });
            }, AsyncPipe.prototype._selectStrategy = function(obj) {
                if (core_isPromise(obj)) return _promiseStrategy;
                if (isObservable(obj)) return _observableStrategy;
                throw Error("InvalidPipeArgument: '" + obj + "' for pipe '" + stringify(AsyncPipe_1) + "'");
            }, AsyncPipe.prototype._dispose = function() {
                this._strategy.dispose(this._subscription), this._latestValue = null, this._latestReturnedValue = null, 
                this._subscription = null, this._obj = null;
            }, AsyncPipe.prototype._updateLatestValue = function(async, value) {
                async === this._obj && (this._latestValue = value, this._ref.markForCheck());
            }, AsyncPipe;
        }(), CommonModule = function() {
            return function() {};
        }(), DOCUMENT = new InjectionToken("DocumentToken"), PLATFORM_BROWSER_ID = "browser", PLATFORM_SERVER_ID = "server";
        function isPlatformBrowser(platformId) {
            return platformId === PLATFORM_BROWSER_ID;
        }
        var common_ViewportScroller = function() {
            function ViewportScroller() {}
            return ViewportScroller.ngInjectableDef = defineInjectable({
                providedIn: "root",
                factory: function() {
                    return new BrowserViewportScroller(inject(DOCUMENT), window, inject(ErrorHandler));
                }
            }), ViewportScroller;
        }(), BrowserViewportScroller = function() {
            function BrowserViewportScroller(document, window, errorHandler) {
                this.document = document, this.window = window, this.errorHandler = errorHandler, 
                this.offset = function() {
                    return [ 0, 0 ];
                };
            }
            return BrowserViewportScroller.prototype.setOffset = function(offset) {
                this.offset = Array.isArray(offset) ? function() {
                    return offset;
                } : offset;
            }, BrowserViewportScroller.prototype.getScrollPosition = function() {
                return this.supportScrollRestoration() ? [ this.window.scrollX, this.window.scrollY ] : [ 0, 0 ];
            }, BrowserViewportScroller.prototype.scrollToPosition = function(position) {
                this.supportScrollRestoration() && this.window.scrollTo(position[0], position[1]);
            }, BrowserViewportScroller.prototype.scrollToAnchor = function(anchor) {
                if (this.supportScrollRestoration()) {
                    anchor = this.window.CSS && this.window.CSS.escape ? this.window.CSS.escape(anchor) : anchor.replace(/(\"|\'\ |:|\.|\[|\]|,|=)/g, "\\$1");
                    try {
                        var elSelectedById = this.document.querySelector("#" + anchor);
                        if (elSelectedById) return void this.scrollToElement(elSelectedById);
                        var elSelectedByName = this.document.querySelector("[name='" + anchor + "']");
                        if (elSelectedByName) return void this.scrollToElement(elSelectedByName);
                    } catch (e) {
                        this.errorHandler.handleError(e);
                    }
                }
            }, BrowserViewportScroller.prototype.setHistoryScrollRestoration = function(scrollRestoration) {
                if (this.supportScrollRestoration()) {
                    var history_1 = this.window.history;
                    history_1 && history_1.scrollRestoration && (history_1.scrollRestoration = scrollRestoration);
                }
            }, BrowserViewportScroller.prototype.scrollToElement = function(el) {
                var rect = el.getBoundingClientRect(), left = rect.left + this.window.pageXOffset, top = rect.top + this.window.pageYOffset, offset = this.offset();
                this.window.scrollTo(left - offset[0], top - offset[1]);
            }, BrowserViewportScroller.prototype.supportScrollRestoration = function() {
                try {
                    return !!this.window && !!this.window.scrollTo;
                } catch (_a) {
                    return !1;
                }
            }, BrowserViewportScroller;
        }();
        function concatMap(project, resultSelector) {
            return mergeMap(project, resultSelector, 1);
        }
        function filter(predicate, thisArg) {
            return function(source) {
                return source.lift(new FilterOperator(predicate, thisArg));
            };
        }
        var FilterOperator = function() {
            function FilterOperator(predicate, thisArg) {
                this.predicate = predicate, this.thisArg = thisArg;
            }
            return FilterOperator.prototype.call = function(subscriber, source) {
                return source.subscribe(new filter_FilterSubscriber(subscriber, this.predicate, this.thisArg));
            }, FilterOperator;
        }(), filter_FilterSubscriber = function(_super) {
            function FilterSubscriber(destination, predicate, thisArg) {
                var _this = _super.call(this, destination) || this;
                return _this.predicate = predicate, _this.thisArg = thisArg, _this.count = 0, _this;
            }
            return __extends(FilterSubscriber, _super), FilterSubscriber.prototype._next = function(value) {
                var result;
                try {
                    result = this.predicate.call(this.thisArg, value, this.count++);
                } catch (err) {
                    return void this.destination.error(err);
                }
                result && this.destination.next(value);
            }, FilterSubscriber;
        }(Subscriber_Subscriber), HttpHandler = function() {
            return function() {};
        }(), HttpBackend = function() {
            return function() {};
        }(), http_HttpHeaders = function() {
            function HttpHeaders(headers) {
                var _this = this;
                this.normalizedNames = new Map(), this.lazyUpdate = null, headers ? this.lazyInit = "string" == typeof headers ? function() {
                    _this.headers = new Map(), headers.split("\n").forEach(function(line) {
                        var index = line.indexOf(":");
                        if (index > 0) {
                            var name_1 = line.slice(0, index), key = name_1.toLowerCase(), value = line.slice(index + 1).trim();
                            _this.maybeSetNormalizedName(name_1, key), _this.headers.has(key) ? _this.headers.get(key).push(value) : _this.headers.set(key, [ value ]);
                        }
                    });
                } : function() {
                    _this.headers = new Map(), Object.keys(headers).forEach(function(name) {
                        var values = headers[name], key = name.toLowerCase();
                        "string" == typeof values && (values = [ values ]), values.length > 0 && (_this.headers.set(key, values), 
                        _this.maybeSetNormalizedName(name, key));
                    });
                } : this.headers = new Map();
            }
            return HttpHeaders.prototype.has = function(name) {
                return this.init(), this.headers.has(name.toLowerCase());
            }, HttpHeaders.prototype.get = function(name) {
                this.init();
                var values = this.headers.get(name.toLowerCase());
                return values && values.length > 0 ? values[0] : null;
            }, HttpHeaders.prototype.keys = function() {
                return this.init(), Array.from(this.normalizedNames.values());
            }, HttpHeaders.prototype.getAll = function(name) {
                return this.init(), this.headers.get(name.toLowerCase()) || null;
            }, HttpHeaders.prototype.append = function(name, value) {
                return this.clone({
                    name: name,
                    value: value,
                    op: "a"
                });
            }, HttpHeaders.prototype.set = function(name, value) {
                return this.clone({
                    name: name,
                    value: value,
                    op: "s"
                });
            }, HttpHeaders.prototype.delete = function(name, value) {
                return this.clone({
                    name: name,
                    value: value,
                    op: "d"
                });
            }, HttpHeaders.prototype.maybeSetNormalizedName = function(name, lcName) {
                this.normalizedNames.has(lcName) || this.normalizedNames.set(lcName, name);
            }, HttpHeaders.prototype.init = function() {
                var _this = this;
                this.lazyInit && (this.lazyInit instanceof HttpHeaders ? this.copyFrom(this.lazyInit) : this.lazyInit(), 
                this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(function(update) {
                    return _this.applyUpdate(update);
                }), this.lazyUpdate = null));
            }, HttpHeaders.prototype.copyFrom = function(other) {
                var _this = this;
                other.init(), Array.from(other.headers.keys()).forEach(function(key) {
                    _this.headers.set(key, other.headers.get(key)), _this.normalizedNames.set(key, other.normalizedNames.get(key));
                });
            }, HttpHeaders.prototype.clone = function(update) {
                var clone = new HttpHeaders();
                return clone.lazyInit = this.lazyInit && this.lazyInit instanceof HttpHeaders ? this.lazyInit : this, 
                clone.lazyUpdate = (this.lazyUpdate || []).concat([ update ]), clone;
            }, HttpHeaders.prototype.applyUpdate = function(update) {
                var key = update.name.toLowerCase();
                switch (update.op) {
                  case "a":
                  case "s":
                    var value = update.value;
                    if ("string" == typeof value && (value = [ value ]), 0 === value.length) return;
                    this.maybeSetNormalizedName(update.name, key);
                    var base = ("a" === update.op ? this.headers.get(key) : void 0) || [];
                    base.push.apply(base, __spread(value)), this.headers.set(key, base);
                    break;

                  case "d":
                    var toDelete_1 = update.value;
                    if (toDelete_1) {
                        var existing = this.headers.get(key);
                        if (!existing) return;
                        0 === (existing = existing.filter(function(value) {
                            return -1 === toDelete_1.indexOf(value);
                        })).length ? (this.headers.delete(key), this.normalizedNames.delete(key)) : this.headers.set(key, existing);
                    } else this.headers.delete(key), this.normalizedNames.delete(key);
                }
            }, HttpHeaders.prototype.forEach = function(fn) {
                var _this = this;
                this.init(), Array.from(this.normalizedNames.keys()).forEach(function(key) {
                    return fn(_this.normalizedNames.get(key), _this.headers.get(key));
                });
            }, HttpHeaders;
        }(), HttpUrlEncodingCodec = function() {
            function HttpUrlEncodingCodec() {}
            return HttpUrlEncodingCodec.prototype.encodeKey = function(key) {
                return standardEncoding(key);
            }, HttpUrlEncodingCodec.prototype.encodeValue = function(value) {
                return standardEncoding(value);
            }, HttpUrlEncodingCodec.prototype.decodeKey = function(key) {
                return decodeURIComponent(key);
            }, HttpUrlEncodingCodec.prototype.decodeValue = function(value) {
                return decodeURIComponent(value);
            }, HttpUrlEncodingCodec;
        }();
        function standardEncoding(v) {
            return encodeURIComponent(v).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/gi, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%2B/gi, "+").replace(/%3D/gi, "=").replace(/%3F/gi, "?").replace(/%2F/gi, "/");
        }
        var HttpParams = function() {
            function HttpParams(options) {
                void 0 === options && (options = {});
                var rawParams, codec, map, _this = this;
                if (this.updates = null, this.cloneFrom = null, this.encoder = options.encoder || new HttpUrlEncodingCodec(), 
                options.fromString) {
                    if (options.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
                    this.map = (rawParams = options.fromString, codec = this.encoder, map = new Map(), 
                    rawParams.length > 0 && rawParams.split("&").forEach(function(param) {
                        var eqIdx = param.indexOf("="), _a = __read(-1 == eqIdx ? [ codec.decodeKey(param), "" ] : [ codec.decodeKey(param.slice(0, eqIdx)), codec.decodeValue(param.slice(eqIdx + 1)) ], 2), key = _a[0], val = _a[1], list = map.get(key) || [];
                        list.push(val), map.set(key, list);
                    }), map);
                } else options.fromObject ? (this.map = new Map(), Object.keys(options.fromObject).forEach(function(key) {
                    var value = options.fromObject[key];
                    _this.map.set(key, Array.isArray(value) ? value : [ value ]);
                })) : this.map = null;
            }
            return HttpParams.prototype.has = function(param) {
                return this.init(), this.map.has(param);
            }, HttpParams.prototype.get = function(param) {
                this.init();
                var res = this.map.get(param);
                return res ? res[0] : null;
            }, HttpParams.prototype.getAll = function(param) {
                return this.init(), this.map.get(param) || null;
            }, HttpParams.prototype.keys = function() {
                return this.init(), Array.from(this.map.keys());
            }, HttpParams.prototype.append = function(param, value) {
                return this.clone({
                    param: param,
                    value: value,
                    op: "a"
                });
            }, HttpParams.prototype.set = function(param, value) {
                return this.clone({
                    param: param,
                    value: value,
                    op: "s"
                });
            }, HttpParams.prototype.delete = function(param, value) {
                return this.clone({
                    param: param,
                    value: value,
                    op: "d"
                });
            }, HttpParams.prototype.toString = function() {
                var _this = this;
                return this.init(), this.keys().map(function(key) {
                    var eKey = _this.encoder.encodeKey(key);
                    return _this.map.get(key).map(function(value) {
                        return eKey + "=" + _this.encoder.encodeValue(value);
                    }).join("&");
                }).join("&");
            }, HttpParams.prototype.clone = function(update) {
                var clone = new HttpParams({
                    encoder: this.encoder
                });
                return clone.cloneFrom = this.cloneFrom || this, clone.updates = (this.updates || []).concat([ update ]), 
                clone;
            }, HttpParams.prototype.init = function() {
                var _this = this;
                null === this.map && (this.map = new Map()), null !== this.cloneFrom && (this.cloneFrom.init(), 
                this.cloneFrom.keys().forEach(function(key) {
                    return _this.map.set(key, _this.cloneFrom.map.get(key));
                }), this.updates.forEach(function(update) {
                    switch (update.op) {
                      case "a":
                      case "s":
                        var base = ("a" === update.op ? _this.map.get(update.param) : void 0) || [];
                        base.push(update.value), _this.map.set(update.param, base);
                        break;

                      case "d":
                        if (void 0 === update.value) {
                            _this.map.delete(update.param);
                            break;
                        }
                        var base_1 = _this.map.get(update.param) || [], idx = base_1.indexOf(update.value);
                        -1 !== idx && base_1.splice(idx, 1), base_1.length > 0 ? _this.map.set(update.param, base_1) : _this.map.delete(update.param);
                    }
                }), this.cloneFrom = null);
            }, HttpParams;
        }();
        function isArrayBuffer(value) {
            return "undefined" != typeof ArrayBuffer && value instanceof ArrayBuffer;
        }
        function isBlob(value) {
            return "undefined" != typeof Blob && value instanceof Blob;
        }
        function isFormData(value) {
            return "undefined" != typeof FormData && value instanceof FormData;
        }
        var HttpRequest = function() {
            function HttpRequest(method, url, third, fourth) {
                var options;
                if (this.url = url, this.body = null, this.reportProgress = !1, this.withCredentials = !1, 
                this.responseType = "json", this.method = method.toUpperCase(), function(method) {
                    switch (method) {
                      case "DELETE":
                      case "GET":
                      case "HEAD":
                      case "OPTIONS":
                      case "JSONP":
                        return !1;

                      default:
                        return !0;
                    }
                }(this.method) || fourth ? (this.body = void 0 !== third ? third : null, options = fourth) : options = third, 
                options && (this.reportProgress = !!options.reportProgress, this.withCredentials = !!options.withCredentials, 
                options.responseType && (this.responseType = options.responseType), options.headers && (this.headers = options.headers), 
                options.params && (this.params = options.params)), this.headers || (this.headers = new http_HttpHeaders()), 
                this.params) {
                    var params = this.params.toString();
                    if (0 === params.length) this.urlWithParams = url; else {
                        var qIdx = url.indexOf("?");
                        this.urlWithParams = url + (-1 === qIdx ? "?" : qIdx < url.length - 1 ? "&" : "") + params;
                    }
                } else this.params = new HttpParams(), this.urlWithParams = url;
            }
            return HttpRequest.prototype.serializeBody = function() {
                return null === this.body ? null : isArrayBuffer(this.body) || isBlob(this.body) || isFormData(this.body) || "string" == typeof this.body ? this.body : this.body instanceof HttpParams ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString();
            }, HttpRequest.prototype.detectContentTypeHeader = function() {
                return null === this.body ? null : isFormData(this.body) ? null : isBlob(this.body) ? this.body.type || null : isArrayBuffer(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof HttpParams ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || Array.isArray(this.body) ? "application/json" : null;
            }, HttpRequest.prototype.clone = function(update) {
                void 0 === update && (update = {});
                var method = update.method || this.method, url = update.url || this.url, responseType = update.responseType || this.responseType, body = void 0 !== update.body ? update.body : this.body, withCredentials = void 0 !== update.withCredentials ? update.withCredentials : this.withCredentials, reportProgress = void 0 !== update.reportProgress ? update.reportProgress : this.reportProgress, headers = update.headers || this.headers, params = update.params || this.params;
                return void 0 !== update.setHeaders && (headers = Object.keys(update.setHeaders).reduce(function(headers, name) {
                    return headers.set(name, update.setHeaders[name]);
                }, headers)), update.setParams && (params = Object.keys(update.setParams).reduce(function(params, param) {
                    return params.set(param, update.setParams[param]);
                }, params)), new HttpRequest(method, url, body, {
                    params: params,
                    headers: headers,
                    reportProgress: reportProgress,
                    responseType: responseType,
                    withCredentials: withCredentials
                });
            }, HttpRequest;
        }(), HttpEventType = function(HttpEventType) {
            return HttpEventType[HttpEventType.Sent = 0] = "Sent", HttpEventType[HttpEventType.UploadProgress = 1] = "UploadProgress", 
            HttpEventType[HttpEventType.ResponseHeader = 2] = "ResponseHeader", HttpEventType[HttpEventType.DownloadProgress = 3] = "DownloadProgress", 
            HttpEventType[HttpEventType.Response = 4] = "Response", HttpEventType[HttpEventType.User = 5] = "User", 
            HttpEventType;
        }({}), HttpResponseBase = function() {
            return function(init, defaultStatus, defaultStatusText) {
                void 0 === defaultStatus && (defaultStatus = 200), void 0 === defaultStatusText && (defaultStatusText = "OK"), 
                this.headers = init.headers || new http_HttpHeaders(), this.status = void 0 !== init.status ? init.status : defaultStatus, 
                this.statusText = init.statusText || defaultStatusText, this.url = init.url || null, 
                this.ok = this.status >= 200 && this.status < 300;
            };
        }(), http_HttpHeaderResponse = function(_super) {
            function HttpHeaderResponse(init) {
                void 0 === init && (init = {});
                var _this = _super.call(this, init) || this;
                return _this.type = HttpEventType.ResponseHeader, _this;
            }
            return __extends(HttpHeaderResponse, _super), HttpHeaderResponse.prototype.clone = function(update) {
                return void 0 === update && (update = {}), new HttpHeaderResponse({
                    headers: update.headers || this.headers,
                    status: void 0 !== update.status ? update.status : this.status,
                    statusText: update.statusText || this.statusText,
                    url: update.url || this.url || void 0
                });
            }, HttpHeaderResponse;
        }(HttpResponseBase), http_HttpResponse = function(_super) {
            function HttpResponse(init) {
                void 0 === init && (init = {});
                var _this = _super.call(this, init) || this;
                return _this.type = HttpEventType.Response, _this.body = void 0 !== init.body ? init.body : null, 
                _this;
            }
            return __extends(HttpResponse, _super), HttpResponse.prototype.clone = function(update) {
                return void 0 === update && (update = {}), new HttpResponse({
                    body: void 0 !== update.body ? update.body : this.body,
                    headers: update.headers || this.headers,
                    status: void 0 !== update.status ? update.status : this.status,
                    statusText: update.statusText || this.statusText,
                    url: update.url || this.url || void 0
                });
            }, HttpResponse;
        }(HttpResponseBase), http_HttpErrorResponse = function(_super) {
            function HttpErrorResponse(init) {
                var _this = _super.call(this, init, 0, "Unknown Error") || this;
                return _this.name = "HttpErrorResponse", _this.ok = !1, _this.message = _this.status >= 200 && _this.status < 300 ? "Http failure during parsing for " + (init.url || "(unknown url)") : "Http failure response for " + (init.url || "(unknown url)") + ": " + init.status + " " + init.statusText, 
                _this.error = init.error || null, _this;
            }
            return __extends(HttpErrorResponse, _super), HttpErrorResponse;
        }(HttpResponseBase);
        function addBody(options, body) {
            return {
                body: body,
                headers: options.headers,
                observe: options.observe,
                params: options.params,
                reportProgress: options.reportProgress,
                responseType: options.responseType,
                withCredentials: options.withCredentials
            };
        }
        var http_HttpClient = function() {
            function HttpClient(handler) {
                this.handler = handler;
            }
            return HttpClient.prototype.request = function(first, url, options) {
                var req, _this = this;
                if (void 0 === options && (options = {}), first instanceof HttpRequest) req = first; else {
                    var headers;
                    headers = options.headers instanceof http_HttpHeaders ? options.headers : new http_HttpHeaders(options.headers);
                    var params = void 0;
                    options.params && (params = options.params instanceof HttpParams ? options.params : new HttpParams({
                        fromObject: options.params
                    })), req = new HttpRequest(first, url, void 0 !== options.body ? options.body : null, {
                        headers: headers,
                        params: params,
                        reportProgress: options.reportProgress,
                        responseType: options.responseType || "json",
                        withCredentials: options.withCredentials
                    });
                }
                var events$ = of(req).pipe(concatMap(function(req) {
                    return _this.handler.handle(req);
                }));
                if (first instanceof HttpRequest || "events" === options.observe) return events$;
                var res$ = events$.pipe(filter(function(event) {
                    return event instanceof http_HttpResponse;
                }));
                switch (options.observe || "body") {
                  case "body":
                    switch (req.responseType) {
                      case "arraybuffer":
                        return res$.pipe(map_map(function(res) {
                            if (null !== res.body && !(res.body instanceof ArrayBuffer)) throw new Error("Response is not an ArrayBuffer.");
                            return res.body;
                        }));

                      case "blob":
                        return res$.pipe(map_map(function(res) {
                            if (null !== res.body && !(res.body instanceof Blob)) throw new Error("Response is not a Blob.");
                            return res.body;
                        }));

                      case "text":
                        return res$.pipe(map_map(function(res) {
                            if (null !== res.body && "string" != typeof res.body) throw new Error("Response is not a string.");
                            return res.body;
                        }));

                      case "json":
                      default:
                        return res$.pipe(map_map(function(res) {
                            return res.body;
                        }));
                    }

                  case "response":
                    return res$;

                  default:
                    throw new Error("Unreachable: unhandled observe type " + options.observe + "}");
                }
            }, HttpClient.prototype.delete = function(url, options) {
                return void 0 === options && (options = {}), this.request("DELETE", url, options);
            }, HttpClient.prototype.get = function(url, options) {
                return void 0 === options && (options = {}), this.request("GET", url, options);
            }, HttpClient.prototype.head = function(url, options) {
                return void 0 === options && (options = {}), this.request("HEAD", url, options);
            }, HttpClient.prototype.jsonp = function(url, callbackParam) {
                return this.request("JSONP", url, {
                    params: new HttpParams().append(callbackParam, "JSONP_CALLBACK"),
                    observe: "body",
                    responseType: "json"
                });
            }, HttpClient.prototype.options = function(url, options) {
                return void 0 === options && (options = {}), this.request("OPTIONS", url, options);
            }, HttpClient.prototype.patch = function(url, body, options) {
                return void 0 === options && (options = {}), this.request("PATCH", url, addBody(options, body));
            }, HttpClient.prototype.post = function(url, body, options) {
                return void 0 === options && (options = {}), this.request("POST", url, addBody(options, body));
            }, HttpClient.prototype.put = function(url, body, options) {
                return void 0 === options && (options = {}), this.request("PUT", url, addBody(options, body));
            }, HttpClient;
        }(), HttpInterceptorHandler = function() {
            function HttpInterceptorHandler(next, interceptor) {
                this.next = next, this.interceptor = interceptor;
            }
            return HttpInterceptorHandler.prototype.handle = function(req) {
                return this.interceptor.intercept(req, this.next);
            }, HttpInterceptorHandler;
        }(), HTTP_INTERCEPTORS = new InjectionToken("HTTP_INTERCEPTORS"), NoopInterceptor = function() {
            function NoopInterceptor() {}
            return NoopInterceptor.prototype.intercept = function(req, next) {
                return next.handle(req);
            }, NoopInterceptor;
        }(), XSSI_PREFIX = /^\)\]\}',?\n/, XhrFactory = function() {
            return function() {};
        }(), BrowserXhr = function() {
            function BrowserXhr() {}
            return BrowserXhr.prototype.build = function() {
                return new XMLHttpRequest();
            }, BrowserXhr;
        }(), http_HttpXhrBackend = function() {
            function HttpXhrBackend(xhrFactory) {
                this.xhrFactory = xhrFactory;
            }
            return HttpXhrBackend.prototype.handle = function(req) {
                var _this = this;
                if ("JSONP" === req.method) throw new Error("Attempted to construct Jsonp request without JsonpClientModule installed.");
                return new Observable_Observable(function(observer) {
                    var xhr = _this.xhrFactory.build();
                    if (xhr.open(req.method, req.urlWithParams), req.withCredentials && (xhr.withCredentials = !0), 
                    req.headers.forEach(function(name, values) {
                        return xhr.setRequestHeader(name, values.join(","));
                    }), req.headers.has("Accept") || xhr.setRequestHeader("Accept", "application/json, text/plain, */*"), 
                    !req.headers.has("Content-Type")) {
                        var detectedType = req.detectContentTypeHeader();
                        null !== detectedType && xhr.setRequestHeader("Content-Type", detectedType);
                    }
                    if (req.responseType) {
                        var responseType = req.responseType.toLowerCase();
                        xhr.responseType = "json" !== responseType ? responseType : "text";
                    }
                    var reqBody = req.serializeBody(), headerResponse = null, partialFromXhr = function() {
                        if (null !== headerResponse) return headerResponse;
                        var status = 1223 === xhr.status ? 204 : xhr.status, statusText = xhr.statusText || "OK", headers = new http_HttpHeaders(xhr.getAllResponseHeaders()), url = function(xhr) {
                            return "responseURL" in xhr && xhr.responseURL ? xhr.responseURL : /^X-Request-URL:/m.test(xhr.getAllResponseHeaders()) ? xhr.getResponseHeader("X-Request-URL") : null;
                        }(xhr) || req.url;
                        return headerResponse = new http_HttpHeaderResponse({
                            headers: headers,
                            status: status,
                            statusText: statusText,
                            url: url
                        });
                    }, onLoad = function() {
                        var _a = partialFromXhr(), headers = _a.headers, status = _a.status, statusText = _a.statusText, url = _a.url, body = null;
                        204 !== status && (body = void 0 === xhr.response ? xhr.responseText : xhr.response), 
                        0 === status && (status = body ? 200 : 0);
                        var ok = status >= 200 && status < 300;
                        if ("json" === req.responseType && "string" == typeof body) {
                            var originalBody = body;
                            body = body.replace(XSSI_PREFIX, "");
                            try {
                                body = "" !== body ? JSON.parse(body) : null;
                            } catch (error) {
                                body = originalBody, ok && (ok = !1, body = {
                                    error: error,
                                    text: body
                                });
                            }
                        }
                        ok ? (observer.next(new http_HttpResponse({
                            body: body,
                            headers: headers,
                            status: status,
                            statusText: statusText,
                            url: url || void 0
                        })), observer.complete()) : observer.error(new http_HttpErrorResponse({
                            error: body,
                            headers: headers,
                            status: status,
                            statusText: statusText,
                            url: url || void 0
                        }));
                    }, onError = function(error) {
                        var url = partialFromXhr().url, res = new http_HttpErrorResponse({
                            error: error,
                            status: xhr.status || 0,
                            statusText: xhr.statusText || "Unknown Error",
                            url: url || void 0
                        });
                        observer.error(res);
                    }, sentHeaders = !1, onDownProgress = function(event) {
                        sentHeaders || (observer.next(partialFromXhr()), sentHeaders = !0);
                        var progressEvent = {
                            type: HttpEventType.DownloadProgress,
                            loaded: event.loaded
                        };
                        event.lengthComputable && (progressEvent.total = event.total), "text" === req.responseType && xhr.responseText && (progressEvent.partialText = xhr.responseText), 
                        observer.next(progressEvent);
                    }, onUpProgress = function(event) {
                        var progress = {
                            type: HttpEventType.UploadProgress,
                            loaded: event.loaded
                        };
                        event.lengthComputable && (progress.total = event.total), observer.next(progress);
                    };
                    return xhr.addEventListener("load", onLoad), xhr.addEventListener("error", onError), 
                    req.reportProgress && (xhr.addEventListener("progress", onDownProgress), null !== reqBody && xhr.upload && xhr.upload.addEventListener("progress", onUpProgress)), 
                    xhr.send(reqBody), observer.next({
                        type: HttpEventType.Sent
                    }), function() {
                        xhr.removeEventListener("error", onError), xhr.removeEventListener("load", onLoad), 
                        req.reportProgress && (xhr.removeEventListener("progress", onDownProgress), null !== reqBody && xhr.upload && xhr.upload.removeEventListener("progress", onUpProgress)), 
                        xhr.abort();
                    };
                });
            }, HttpXhrBackend;
        }(), XSRF_COOKIE_NAME = new InjectionToken("XSRF_COOKIE_NAME"), XSRF_HEADER_NAME = new InjectionToken("XSRF_HEADER_NAME"), HttpXsrfTokenExtractor = function() {
            return function() {};
        }(), http_HttpXsrfCookieExtractor = function() {
            function HttpXsrfCookieExtractor(doc, platform, cookieName) {
                this.doc = doc, this.platform = platform, this.cookieName = cookieName, this.lastCookieString = "", 
                this.lastToken = null, this.parseCount = 0;
            }
            return HttpXsrfCookieExtractor.prototype.getToken = function() {
                if ("server" === this.platform) return null;
                var cookieString = this.doc.cookie || "";
                return cookieString !== this.lastCookieString && (this.parseCount++, this.lastToken = parseCookieValue(cookieString, this.cookieName), 
                this.lastCookieString = cookieString), this.lastToken;
            }, HttpXsrfCookieExtractor;
        }(), HttpXsrfInterceptor = function() {
            function HttpXsrfInterceptor(tokenService, headerName) {
                this.tokenService = tokenService, this.headerName = headerName;
            }
            return HttpXsrfInterceptor.prototype.intercept = function(req, next) {
                var lcUrl = req.url.toLowerCase();
                if ("GET" === req.method || "HEAD" === req.method || lcUrl.startsWith("http://") || lcUrl.startsWith("https://")) return next.handle(req);
                var token = this.tokenService.getToken();
                return null === token || req.headers.has(this.headerName) || (req = req.clone({
                    headers: req.headers.set(this.headerName, token)
                })), next.handle(req);
            }, HttpXsrfInterceptor;
        }(), HttpInterceptingHandler = function() {
            function HttpInterceptingHandler(backend, injector) {
                this.backend = backend, this.injector = injector, this.chain = null;
            }
            return HttpInterceptingHandler.prototype.handle = function(req) {
                if (null === this.chain) {
                    var interceptors = this.injector.get(HTTP_INTERCEPTORS, []);
                    this.chain = interceptors.reduceRight(function(next, interceptor) {
                        return new HttpInterceptorHandler(next, interceptor);
                    }, this.backend);
                }
                return this.chain.handle(req);
            }, HttpInterceptingHandler;
        }(), HttpClientXsrfModule = function() {
            function HttpClientXsrfModule() {}
            var HttpClientXsrfModule_1;
            return HttpClientXsrfModule_1 = HttpClientXsrfModule, HttpClientXsrfModule.disable = function() {
                return {
                    ngModule: HttpClientXsrfModule_1,
                    providers: [ {
                        provide: HttpXsrfInterceptor,
                        useClass: NoopInterceptor
                    } ]
                };
            }, HttpClientXsrfModule.withOptions = function(options) {
                return void 0 === options && (options = {}), {
                    ngModule: HttpClientXsrfModule_1,
                    providers: [ options.cookieName ? {
                        provide: XSRF_COOKIE_NAME,
                        useValue: options.cookieName
                    } : [], options.headerName ? {
                        provide: XSRF_HEADER_NAME,
                        useValue: options.headerName
                    } : [] ]
                };
            }, HttpClientXsrfModule;
        }(), HttpClientModule = function() {
            return function() {};
        }(), _DOM = null;
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
            return __extends(BrowserDomAdapter, _super), BrowserDomAdapter.prototype.parse = function(templateHtml) {
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
                (_a = el)[methodName].apply(_a, __spread(args));
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
                return parseCookieValue(document.cookie, name);
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
            return __extends(GenericBrowserDomAdapter, _super), GenericBrowserDomAdapter.prototype.getDistributedNodes = function(el) {
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
            return __extends(BrowserPlatformLocation, _super), BrowserPlatformLocation.prototype._init = function() {
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
            }, __decorate([ (decorator = Inject(DOCUMENT), function(target, key) {
                decorator(target, key, 0);
            }), __metadata("design:paramtypes", [ Object ]) ], BrowserPlatformLocation);
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
        var EVENT_MANAGER_PLUGINS = new InjectionToken("EventManagerPlugins"), EventManager = function() {
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
            }, EventManager;
        }(), EventManagerPlugin = function() {
            function EventManagerPlugin(_doc) {
                this._doc = _doc;
            }
            return EventManagerPlugin.prototype.addGlobalEventListener = function(element, eventName, handler) {
                var target = getDOM().getGlobalEventTarget(this._doc, element);
                if (!target) throw new Error("Unsupported event target " + target + " for event " + eventName);
                return this.addEventListener(target, eventName, handler);
            }, EventManagerPlugin;
        }(), SharedStylesHost = function() {
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
            }, SharedStylesHost;
        }(), platform_browser_DomSharedStylesHost = function(_super) {
            function DomSharedStylesHost(_doc) {
                var _this = _super.call(this) || this;
                return _this._doc = _doc, _this._hostNodes = new Set(), _this._styleNodes = new Set(), 
                _this._hostNodes.add(_doc.head), _this;
            }
            return __extends(DomSharedStylesHost, _super), DomSharedStylesHost.prototype._addStylesToHost = function(styles, host) {
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
            }, DomSharedStylesHost;
        }(SharedStylesHost), NAMESPACE_URIS = {
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
            DomRendererFactory2;
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
            return __extends(EmulatedEncapsulationDomRenderer2, _super), EmulatedEncapsulationDomRenderer2.prototype.applyToHost = function(element) {
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
            return __extends(ShadowDomRenderer, _super), ShadowDomRenderer.prototype.nodeOrShadowRoot = function(node) {
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
            return __extends(DomEventsPlugin, _super), DomEventsPlugin.prototype.patchEvent = function() {
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
            }, DomEventsPlugin;
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
        }, HAMMER_GESTURE_CONFIG = new InjectionToken("HammerGestureConfig"), HAMMER_LOADER = new InjectionToken("HammerLoader"), HammerGestureConfig = function() {
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
            }, HammerGestureConfig;
        }(), platform_browser_HammerGesturesPlugin = function(_super) {
            function HammerGesturesPlugin(doc, _config, console, loader) {
                var _this = _super.call(this, doc) || this;
                return _this._config = _config, _this.console = console, _this.loader = loader, 
                _this;
            }
            return __extends(HammerGesturesPlugin, _super), HammerGesturesPlugin.prototype.supports = function(eventName) {
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
            }, HammerGesturesPlugin;
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
            return __extends(KeyEventsPlugin, _super), KeyEventsPlugin_1 = KeyEventsPlugin, 
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
            }, KeyEventsPlugin;
        }(EventManagerPlugin), DomSanitizer = function() {
            return function() {};
        }(), platform_browser_DomSanitizerImpl = function(_super) {
            function DomSanitizerImpl(_doc) {
                var _this = _super.call(this) || this;
                return _this._doc = _doc, _this;
            }
            return __extends(DomSanitizerImpl, _super), DomSanitizerImpl.prototype.sanitize = function(ctx, value) {
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
            }, DomSanitizerImpl;
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
            return __extends(SafeHtmlImpl, _super), SafeHtmlImpl.prototype.getTypeName = function() {
                return "HTML";
            }, SafeHtmlImpl;
        }(SafeValueImpl), platform_browser_SafeStyleImpl = function(_super) {
            function SafeStyleImpl() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return __extends(SafeStyleImpl, _super), SafeStyleImpl.prototype.getTypeName = function() {
                return "Style";
            }, SafeStyleImpl;
        }(SafeValueImpl), platform_browser_SafeScriptImpl = function(_super) {
            function SafeScriptImpl() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return __extends(SafeScriptImpl, _super), SafeScriptImpl.prototype.getTypeName = function() {
                return "Script";
            }, SafeScriptImpl;
        }(SafeValueImpl), platform_browser_SafeUrlImpl = function(_super) {
            function SafeUrlImpl() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return __extends(SafeUrlImpl, _super), SafeUrlImpl.prototype.getTypeName = function() {
                return "URL";
            }, SafeUrlImpl;
        }(SafeValueImpl), platform_browser_SafeResourceUrlImpl = function(_super) {
            function SafeResourceUrlImpl() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return __extends(SafeResourceUrlImpl, _super), SafeResourceUrlImpl.prototype.getTypeName = function() {
                return "ResourceURL";
            }, SafeResourceUrlImpl;
        }(SafeValueImpl), platformBrowser = createPlatformFactory(platformCore, "browser", [ {
            provide: PLATFORM_ID,
            useValue: PLATFORM_BROWSER_ID
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
        } ]), platform_browser_BrowserModule = function() {
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
            }, BrowserModule;
        }();
        function createMeta() {
            return new platform_browser_Meta(inject(DOCUMENT));
        }
        var platform_browser_Meta = function() {
            function Meta(_doc) {
                this._doc = _doc, this._dom = getDOM();
            }
            return Meta.prototype.addTag = function(tag, forceCreation) {
                return void 0 === forceCreation && (forceCreation = !1), tag ? this._getOrCreateElement(tag, forceCreation) : null;
            }, Meta.prototype.addTags = function(tags, forceCreation) {
                var _this = this;
                return void 0 === forceCreation && (forceCreation = !1), tags ? tags.reduce(function(result, tag) {
                    return tag && result.push(_this._getOrCreateElement(tag, forceCreation)), result;
                }, []) : [];
            }, Meta.prototype.getTag = function(attrSelector) {
                return attrSelector && this._dom.querySelector(this._doc, "meta[" + attrSelector + "]") || null;
            }, Meta.prototype.getTags = function(attrSelector) {
                if (!attrSelector) return [];
                var list = this._dom.querySelectorAll(this._doc, "meta[" + attrSelector + "]");
                return list ? [].slice.call(list) : [];
            }, Meta.prototype.updateTag = function(tag, selector) {
                if (!tag) return null;
                selector = selector || this._parseSelector(tag);
                var meta = this.getTag(selector);
                return meta ? this._setMetaElementAttributes(tag, meta) : this._getOrCreateElement(tag, !0);
            }, Meta.prototype.removeTag = function(attrSelector) {
                this.removeTagElement(this.getTag(attrSelector));
            }, Meta.prototype.removeTagElement = function(meta) {
                meta && this._dom.remove(meta);
            }, Meta.prototype._getOrCreateElement = function(meta, forceCreation) {
                if (void 0 === forceCreation && (forceCreation = !1), !forceCreation) {
                    var selector = this._parseSelector(meta), elem = this.getTag(selector);
                    if (elem && this._containsAttributes(meta, elem)) return elem;
                }
                var element = this._dom.createElement("meta");
                this._setMetaElementAttributes(meta, element);
                var head = this._dom.getElementsByTagName(this._doc, "head")[0];
                return this._dom.appendChild(head, element), element;
            }, Meta.prototype._setMetaElementAttributes = function(tag, el) {
                var _this = this;
                return Object.keys(tag).forEach(function(prop) {
                    return _this._dom.setAttribute(el, prop, tag[prop]);
                }), el;
            }, Meta.prototype._parseSelector = function(tag) {
                var attr = tag.name ? "name" : "property";
                return attr + '="' + tag[attr] + '"';
            }, Meta.prototype._containsAttributes = function(tag, elem) {
                var _this = this;
                return Object.keys(tag).every(function(key) {
                    return _this._dom.getAttribute(elem, key) === tag[key];
                });
            }, Meta.ngInjectableDef = defineInjectable({
                factory: createMeta,
                token: Meta,
                providedIn: "root"
            }), Meta;
        }();
        function createTitle() {
            return new platform_browser_Title(inject(DOCUMENT));
        }
        var platform_browser_Title = function() {
            function Title(_doc) {
                this._doc = _doc;
            }
            return Title.prototype.getTitle = function() {
                return getDOM().getTitle(this._doc);
            }, Title.prototype.setTitle = function(newTitle) {
                getDOM().setTitle(this._doc, newTitle);
            }, Title.ngInjectableDef = defineInjectable({
                factory: createTitle,
                token: Title,
                providedIn: "root"
            }), Title;
        }();
        function throwError_throwError(error, scheduler) {
            return new Observable_Observable(scheduler ? function(subscriber) {
                return scheduler.schedule(dispatch, 0, {
                    error: error,
                    subscriber: subscriber
                });
            } : function(subscriber) {
                return subscriber.error(error);
            });
        }
        function dispatch(_a) {
            _a.subscriber.error(_a.error);
        }
        "undefined" != typeof window && window;
        var forkJoin_ForkJoinSubscriber = function(_super) {
            function ForkJoinSubscriber(destination, sources) {
                var _this = _super.call(this, destination) || this;
                _this.sources = sources, _this.completed = 0, _this.haveValues = 0;
                var len = sources.length;
                _this.values = new Array(len);
                for (var i = 0; i < len; i++) {
                    var innerSubscription = subscribeToResult(_this, sources[i], null, i);
                    innerSubscription && _this.add(innerSubscription);
                }
                return _this;
            }
            return __extends(ForkJoinSubscriber, _super), ForkJoinSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                this.values[outerIndex] = innerValue, innerSub._hasValue || (innerSub._hasValue = !0, 
                this.haveValues++);
            }, ForkJoinSubscriber.prototype.notifyComplete = function(innerSub) {
                var destination = this.destination, haveValues = this.haveValues, values = this.values, len = values.length;
                innerSub._hasValue ? (this.completed++, this.completed === len && (haveValues === len && destination.next(values), 
                destination.complete())) : destination.complete();
            }, ForkJoinSubscriber;
        }(OuterSubscriber_OuterSubscriber);
        function tap(nextOrObserver, error, complete) {
            return function(source) {
                return source.lift(new DoOperator(nextOrObserver, error, complete));
            };
        }
        var DoOperator = function() {
            function DoOperator(nextOrObserver, error, complete) {
                this.nextOrObserver = nextOrObserver, this.error = error, this.complete = complete;
            }
            return DoOperator.prototype.call = function(subscriber, source) {
                return source.subscribe(new tap_TapSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
            }, DoOperator;
        }(), tap_TapSubscriber = function(_super) {
            function TapSubscriber(destination, observerOrNext, error, complete) {
                var _this = _super.call(this, destination) || this;
                return _this._tapNext = noop, _this._tapError = noop, _this._tapComplete = noop, 
                _this._tapError = error || noop, _this._tapComplete = complete || noop, isFunction(observerOrNext) ? (_this._context = _this, 
                _this._tapNext = observerOrNext) : observerOrNext && (_this._context = observerOrNext, 
                _this._tapNext = observerOrNext.next || noop, _this._tapError = observerOrNext.error || noop, 
                _this._tapComplete = observerOrNext.complete || noop), _this;
            }
            return __extends(TapSubscriber, _super), TapSubscriber.prototype._next = function(value) {
                try {
                    this._tapNext.call(this._context, value);
                } catch (err) {
                    return void this.destination.error(err);
                }
                this.destination.next(value);
            }, TapSubscriber.prototype._error = function(err) {
                try {
                    this._tapError.call(this._context, err);
                } catch (err) {
                    return void this.destination.error(err);
                }
                this.destination.error(err);
            }, TapSubscriber.prototype._complete = function() {
                try {
                    this._tapComplete.call(this._context);
                } catch (err) {
                    return void this.destination.error(err);
                }
                return this.destination.complete();
            }, TapSubscriber;
        }(Subscriber_Subscriber);
        function catchError(selector) {
            return function(source) {
                var operator = new CatchOperator(selector), caught = source.lift(operator);
                return operator.caught = caught;
            };
        }
        var CatchOperator = function() {
            function CatchOperator(selector) {
                this.selector = selector;
            }
            return CatchOperator.prototype.call = function(subscriber, source) {
                return source.subscribe(new catchError_CatchSubscriber(subscriber, this.selector, this.caught));
            }, CatchOperator;
        }(), catchError_CatchSubscriber = function(_super) {
            function CatchSubscriber(destination, selector, caught) {
                var _this = _super.call(this, destination) || this;
                return _this.selector = selector, _this.caught = caught, _this;
            }
            return __extends(CatchSubscriber, _super), CatchSubscriber.prototype.error = function(err) {
                if (!this.isStopped) {
                    var result = void 0;
                    try {
                        result = this.selector(err, this.caught);
                    } catch (err2) {
                        return void _super.prototype.error.call(this, err2);
                    }
                    this._unsubscribeAndRecycle();
                    var innerSubscriber = new InnerSubscriber_InnerSubscriber(this, void 0, void 0);
                    this.add(innerSubscriber), subscribeToResult(this, result, void 0, void 0, innerSubscriber);
                }
            }, CatchSubscriber;
        }(OuterSubscriber_OuterSubscriber), FinallyOperator = function() {
            function FinallyOperator(callback) {
                this.callback = callback;
            }
            return FinallyOperator.prototype.call = function(subscriber, source) {
                return source.subscribe(new finalize_FinallySubscriber(subscriber, this.callback));
            }, FinallyOperator;
        }(), finalize_FinallySubscriber = function(_super) {
            function FinallySubscriber(destination, callback) {
                var _this = _super.call(this, destination) || this;
                return _this.add(new Subscription_Subscription(callback)), _this;
            }
            return __extends(FinallySubscriber, _super), FinallySubscriber;
        }(Subscriber_Subscriber);
        function ArgumentOutOfRangeErrorImpl() {
            return Error.call(this), this.message = "argument out of range", this.name = "ArgumentOutOfRangeError", 
            this;
        }
        ArgumentOutOfRangeErrorImpl.prototype = Object.create(Error.prototype);
        var ArgumentOutOfRangeError = ArgumentOutOfRangeErrorImpl;
        function take(count) {
            return function(source) {
                return 0 === count ? empty_empty() : source.lift(new take_TakeOperator(count));
            };
        }
        var take_TakeOperator = function() {
            function TakeOperator(total) {
                if (this.total = total, this.total < 0) throw new ArgumentOutOfRangeError();
            }
            return TakeOperator.prototype.call = function(subscriber, source) {
                return source.subscribe(new take_TakeSubscriber(subscriber, this.total));
            }, TakeOperator;
        }(), take_TakeSubscriber = function(_super) {
            function TakeSubscriber(destination, total) {
                var _this = _super.call(this, destination) || this;
                return _this.total = total, _this.count = 0, _this;
            }
            return __extends(TakeSubscriber, _super), TakeSubscriber.prototype._next = function(value) {
                var total = this.total, count = ++this.count;
                count <= total && (this.destination.next(value), count === total && (this.destination.complete(), 
                this.unsubscribe()));
            }, TakeSubscriber;
        }(Subscriber_Subscriber);
        function coerceBooleanProperty(value) {
            return null != value && "" + value != "false";
        }
        function coerceNumberProperty(value, fallbackValue) {
            return void 0 === fallbackValue && (fallbackValue = 0), function(value) {
                return !isNaN(parseFloat(value)) && !isNaN(Number(value));
            }(value) ? Number(value) : fallbackValue;
        }
        var supportsPassiveEvents, hasV8BreakIterator = "undefined" != typeof Intl && Intl.v8BreakIterator, platform_es5_Platform = function() {
            function Platform(_platformId) {
                this._platformId = _platformId, this.isBrowser = this._platformId ? isPlatformBrowser(this._platformId) : "object" == typeof document && !!document, 
                this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent), this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent), 
                this.BLINK = this.isBrowser && !(!window.chrome && !hasV8BreakIterator) && "undefined" != typeof CSS && !this.EDGE && !this.TRIDENT, 
                this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT, 
                this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window), 
                this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent), 
                this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT, 
                this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
            }
            return Platform.ngInjectableDef = defineInjectable({
                factory: function() {
                    return new Platform(inject(PLATFORM_ID, 8));
                },
                token: Platform,
                providedIn: "root"
            }), Platform;
        }(), PlatformModule = function() {
            return function() {};
        }();
        function supportsPassiveEventListeners() {
            if (null == supportsPassiveEvents && "undefined" != typeof window) try {
                window.addEventListener("test", null, Object.defineProperty({}, "passive", {
                    get: function() {
                        return supportsPassiveEvents = !0;
                    }
                }));
            } finally {
                supportsPassiveEvents = supportsPassiveEvents || !1;
            }
            return supportsPassiveEvents;
        }
        var rtlScrollAxisType, RtlScrollAxisType = function() {
            var RtlScrollAxisType = {
                NORMAL: 0,
                NEGATED: 1,
                INVERTED: 2
            };
            return RtlScrollAxisType[RtlScrollAxisType.NORMAL] = "NORMAL", RtlScrollAxisType[RtlScrollAxisType.NEGATED] = "NEGATED", 
            RtlScrollAxisType[RtlScrollAxisType.INVERTED] = "INVERTED", RtlScrollAxisType;
        }();
        function getRtlScrollAxisType() {
            if ("object" != typeof document || !document) return RtlScrollAxisType.NORMAL;
            if (!rtlScrollAxisType) {
                var scrollContainer = document.createElement("div"), containerStyle = scrollContainer.style;
                scrollContainer.dir = "rtl", containerStyle.height = "1px", containerStyle.width = "1px", 
                containerStyle.overflow = "auto", containerStyle.visibility = "hidden", containerStyle.pointerEvents = "none", 
                containerStyle.position = "absolute";
                var content = document.createElement("div"), contentStyle = content.style;
                contentStyle.width = "2px", contentStyle.height = "1px", scrollContainer.appendChild(content), 
                document.body.appendChild(scrollContainer), rtlScrollAxisType = RtlScrollAxisType.NORMAL, 
                0 === scrollContainer.scrollLeft && (scrollContainer.scrollLeft = 1, rtlScrollAxisType = 0 === scrollContainer.scrollLeft ? RtlScrollAxisType.NEGATED : RtlScrollAxisType.INVERTED), 
                scrollContainer.parentNode.removeChild(scrollContainer);
            }
            return rtlScrollAxisType;
        }
        var ESCAPE = 27, AsyncAction_AsyncAction = function(_super) {
            function AsyncAction(scheduler, work) {
                var _this = _super.call(this, scheduler, work) || this;
                return _this.scheduler = scheduler, _this.work = work, _this.pending = !1, _this;
            }
            return __extends(AsyncAction, _super), AsyncAction.prototype.schedule = function(state, delay) {
                if (void 0 === delay && (delay = 0), this.closed) return this;
                this.state = state;
                var id = this.id, scheduler = this.scheduler;
                return null != id && (this.id = this.recycleAsyncId(scheduler, id, delay)), this.pending = !0, 
                this.delay = delay, this.id = this.id || this.requestAsyncId(scheduler, this.id, delay), 
                this;
            }, AsyncAction.prototype.requestAsyncId = function(scheduler, id, delay) {
                return void 0 === delay && (delay = 0), setInterval(scheduler.flush.bind(scheduler, this), delay);
            }, AsyncAction.prototype.recycleAsyncId = function(scheduler, id, delay) {
                if (void 0 === delay && (delay = 0), null !== delay && this.delay === delay && !1 === this.pending) return id;
                clearInterval(id);
            }, AsyncAction.prototype.execute = function(state, delay) {
                if (this.closed) return new Error("executing a cancelled action");
                this.pending = !1;
                var error = this._execute(state, delay);
                if (error) return error;
                !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
            }, AsyncAction.prototype._execute = function(state, delay) {
                var errored = !1, errorValue = void 0;
                try {
                    this.work(state);
                } catch (e) {
                    errored = !0, errorValue = !!e && e || new Error(e);
                }
                if (errored) return this.unsubscribe(), errorValue;
            }, AsyncAction.prototype._unsubscribe = function() {
                var id = this.id, scheduler = this.scheduler, actions = scheduler.actions, index = actions.indexOf(this);
                this.work = null, this.state = null, this.pending = !1, this.scheduler = null, -1 !== index && actions.splice(index, 1), 
                null != id && (this.id = this.recycleAsyncId(scheduler, id, null)), this.delay = null;
            }, AsyncAction;
        }(function(_super) {
            function Action(scheduler, work) {
                return _super.call(this) || this;
            }
            return __extends(Action, _super), Action.prototype.schedule = function(state, delay) {
                return void 0 === delay && (delay = 0), this;
            }, Action;
        }(Subscription_Subscription)), Scheduler = function() {
            function Scheduler(SchedulerAction, now) {
                void 0 === now && (now = Scheduler.now), this.SchedulerAction = SchedulerAction, 
                this.now = now;
            }
            return Scheduler.prototype.schedule = function(work, delay, state) {
                return void 0 === delay && (delay = 0), new this.SchedulerAction(this, work).schedule(state, delay);
            }, Scheduler.now = function() {
                return Date.now();
            }, Scheduler;
        }(), AsyncScheduler_AsyncScheduler = function(_super) {
            function AsyncScheduler(SchedulerAction, now) {
                void 0 === now && (now = Scheduler.now);
                var _this = _super.call(this, SchedulerAction, function() {
                    return AsyncScheduler.delegate && AsyncScheduler.delegate !== _this ? AsyncScheduler.delegate.now() : now();
                }) || this;
                return _this.actions = [], _this.active = !1, _this.scheduled = void 0, _this;
            }
            return __extends(AsyncScheduler, _super), AsyncScheduler.prototype.schedule = function(work, delay, state) {
                return void 0 === delay && (delay = 0), AsyncScheduler.delegate && AsyncScheduler.delegate !== this ? AsyncScheduler.delegate.schedule(work, delay, state) : _super.prototype.schedule.call(this, work, delay, state);
            }, AsyncScheduler.prototype.flush = function(action) {
                var actions = this.actions;
                if (this.active) actions.push(action); else {
                    var error;
                    this.active = !0;
                    do {
                        if (error = action.execute(action.state, action.delay)) break;
                    } while (action = actions.shift());
                    if (this.active = !1, error) {
                        for (;action = actions.shift(); ) action.unsubscribe();
                        throw error;
                    }
                }
            }, AsyncScheduler;
        }(Scheduler), async_async = new AsyncScheduler_AsyncScheduler(AsyncAction_AsyncAction);
        function debounceTime(dueTime, scheduler) {
            return void 0 === scheduler && (scheduler = async_async), function(source) {
                return source.lift(new DebounceTimeOperator(dueTime, scheduler));
            };
        }
        var DebounceTimeOperator = function() {
            function DebounceTimeOperator(dueTime, scheduler) {
                this.dueTime = dueTime, this.scheduler = scheduler;
            }
            return DebounceTimeOperator.prototype.call = function(subscriber, source) {
                return source.subscribe(new debounceTime_DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
            }, DebounceTimeOperator;
        }(), debounceTime_DebounceTimeSubscriber = function(_super) {
            function DebounceTimeSubscriber(destination, dueTime, scheduler) {
                var _this = _super.call(this, destination) || this;
                return _this.dueTime = dueTime, _this.scheduler = scheduler, _this.debouncedSubscription = null, 
                _this.lastValue = null, _this.hasValue = !1, _this;
            }
            return __extends(DebounceTimeSubscriber, _super), DebounceTimeSubscriber.prototype._next = function(value) {
                this.clearDebounce(), this.lastValue = value, this.hasValue = !0, this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext, this.dueTime, this));
            }, DebounceTimeSubscriber.prototype._complete = function() {
                this.debouncedNext(), this.destination.complete();
            }, DebounceTimeSubscriber.prototype.debouncedNext = function() {
                if (this.clearDebounce(), this.hasValue) {
                    var lastValue = this.lastValue;
                    this.lastValue = null, this.hasValue = !1, this.destination.next(lastValue);
                }
            }, DebounceTimeSubscriber.prototype.clearDebounce = function() {
                var debouncedSubscription = this.debouncedSubscription;
                null !== debouncedSubscription && (this.remove(debouncedSubscription), debouncedSubscription.unsubscribe(), 
                this.debouncedSubscription = null);
            }, DebounceTimeSubscriber;
        }(Subscriber_Subscriber);
        function dispatchNext(subscriber) {
            subscriber.debouncedNext();
        }
        var a11y_es5_InteractivityChecker = function() {
            function InteractivityChecker(_platform) {
                this._platform = _platform;
            }
            return InteractivityChecker.prototype.isDisabled = function(element) {
                return element.hasAttribute("disabled");
            }, InteractivityChecker.prototype.isVisible = function(element) {
                return function(element) {
                    return !!(element.offsetWidth || element.offsetHeight || "function" == typeof element.getClientRects && element.getClientRects().length);
                }(element) && "visible" === getComputedStyle(element).visibility;
            }, InteractivityChecker.prototype.isTabbable = function(element) {
                if (!this._platform.isBrowser) return !1;
                var node, frameElement = function(window) {
                    try {
                        return window.frameElement;
                    } catch (e) {
                        return null;
                    }
                }((node = element).ownerDocument && node.ownerDocument.defaultView || window);
                if (frameElement) {
                    var frameType = frameElement && frameElement.nodeName.toLowerCase();
                    if (-1 === getTabIndexValue(frameElement)) return !1;
                    if ((this._platform.BLINK || this._platform.WEBKIT) && "object" === frameType) return !1;
                    if ((this._platform.BLINK || this._platform.WEBKIT) && !this.isVisible(frameElement)) return !1;
                }
                var nodeName = element.nodeName.toLowerCase(), tabIndexValue = getTabIndexValue(element);
                if (element.hasAttribute("contenteditable")) return -1 !== tabIndexValue;
                if ("iframe" === nodeName) return !1;
                if ("audio" === nodeName) {
                    if (!element.hasAttribute("controls")) return !1;
                    if (this._platform.BLINK) return !0;
                }
                if ("video" === nodeName) {
                    if (!element.hasAttribute("controls") && this._platform.TRIDENT) return !1;
                    if (this._platform.BLINK || this._platform.FIREFOX) return !0;
                }
                return ("object" !== nodeName || !this._platform.BLINK && !this._platform.WEBKIT) && !(this._platform.WEBKIT && this._platform.IOS && !function(element) {
                    var nodeName = element.nodeName.toLowerCase(), inputType = "input" === nodeName && element.type;
                    return "text" === inputType || "password" === inputType || "select" === nodeName || "textarea" === nodeName;
                }(element)) && element.tabIndex >= 0;
            }, InteractivityChecker.prototype.isFocusable = function(element) {
                return function(element) {
                    return !function(element) {
                        return function(element) {
                            return "input" == element.nodeName.toLowerCase();
                        }(element) && "hidden" == element.type;
                    }(element) && (function(element) {
                        var nodeName = element.nodeName.toLowerCase();
                        return "input" === nodeName || "select" === nodeName || "button" === nodeName || "textarea" === nodeName;
                    }(element) || function(element) {
                        return function(element) {
                            return "a" == element.nodeName.toLowerCase();
                        }(element) && element.hasAttribute("href");
                    }(element) || element.hasAttribute("contenteditable") || hasValidTabIndex(element));
                }(element) && !this.isDisabled(element) && this.isVisible(element);
            }, InteractivityChecker.ngInjectableDef = defineInjectable({
                factory: function() {
                    return new InteractivityChecker(inject(platform_es5_Platform));
                },
                token: InteractivityChecker,
                providedIn: "root"
            }), InteractivityChecker;
        }();
        function hasValidTabIndex(element) {
            if (!element.hasAttribute("tabindex") || void 0 === element.tabIndex) return !1;
            var tabIndex = element.getAttribute("tabindex");
            return "-32768" != tabIndex && !(!tabIndex || isNaN(parseInt(tabIndex, 10)));
        }
        function getTabIndexValue(element) {
            if (!hasValidTabIndex(element)) return null;
            var tabIndex = parseInt(element.getAttribute("tabindex") || "", 10);
            return isNaN(tabIndex) ? -1 : tabIndex;
        }
        var a11y_es5_FocusTrap = function() {
            function FocusTrap(_element, _checker, _ngZone, _document, deferAnchors) {
                void 0 === deferAnchors && (deferAnchors = !1), this._element = _element, this._checker = _checker, 
                this._ngZone = _ngZone, this._document = _document, this._hasAttached = !1, this._enabled = !0, 
                deferAnchors || this.attachAnchors();
            }
            return Object.defineProperty(FocusTrap.prototype, "enabled", {
                get: function() {
                    return this._enabled;
                },
                set: function(value) {
                    this._enabled = value, this._startAnchor && this._endAnchor && (this._toggleAnchorTabIndex(value, this._startAnchor), 
                    this._toggleAnchorTabIndex(value, this._endAnchor));
                },
                enumerable: !0,
                configurable: !0
            }), FocusTrap.prototype.destroy = function() {
                this._startAnchor && this._startAnchor.parentNode && this._startAnchor.parentNode.removeChild(this._startAnchor), 
                this._endAnchor && this._endAnchor.parentNode && this._endAnchor.parentNode.removeChild(this._endAnchor), 
                this._startAnchor = this._endAnchor = null;
            }, FocusTrap.prototype.attachAnchors = function() {
                var _this = this;
                return !!this._hasAttached || (this._ngZone.runOutsideAngular(function() {
                    _this._startAnchor || (_this._startAnchor = _this._createAnchor(), _this._startAnchor.addEventListener("focus", function() {
                        return _this.focusLastTabbableElement();
                    })), _this._endAnchor || (_this._endAnchor = _this._createAnchor(), _this._endAnchor.addEventListener("focus", function() {
                        return _this.focusFirstTabbableElement();
                    }));
                }), this._element.parentNode && (this._element.parentNode.insertBefore(this._startAnchor, this._element), 
                this._element.parentNode.insertBefore(this._endAnchor, this._element.nextSibling), 
                this._hasAttached = !0), this._hasAttached);
            }, FocusTrap.prototype.focusInitialElementWhenReady = function() {
                var _this = this;
                return new Promise(function(resolve) {
                    _this._executeOnStable(function() {
                        return resolve(_this.focusInitialElement());
                    });
                });
            }, FocusTrap.prototype.focusFirstTabbableElementWhenReady = function() {
                var _this = this;
                return new Promise(function(resolve) {
                    _this._executeOnStable(function() {
                        return resolve(_this.focusFirstTabbableElement());
                    });
                });
            }, FocusTrap.prototype.focusLastTabbableElementWhenReady = function() {
                var _this = this;
                return new Promise(function(resolve) {
                    _this._executeOnStable(function() {
                        return resolve(_this.focusLastTabbableElement());
                    });
                });
            }, FocusTrap.prototype._getRegionBoundary = function(bound) {
                for (var markers = this._element.querySelectorAll("[cdk-focus-region-" + bound + "], [cdkFocusRegion" + bound + "], [cdk-focus-" + bound + "]"), i = 0; i < markers.length; i++) markers[i].hasAttribute("cdk-focus-" + bound) ? console.warn("Found use of deprecated attribute 'cdk-focus-" + bound + "', use 'cdkFocusRegion" + bound + "' instead. The deprecated attribute will be removed in 8.0.0.", markers[i]) : markers[i].hasAttribute("cdk-focus-region-" + bound) && console.warn("Found use of deprecated attribute 'cdk-focus-region-" + bound + "', use 'cdkFocusRegion" + bound + "' instead. The deprecated attribute will be removed in 8.0.0.", markers[i]);
                return "start" == bound ? markers.length ? markers[0] : this._getFirstTabbableElement(this._element) : markers.length ? markers[markers.length - 1] : this._getLastTabbableElement(this._element);
            }, FocusTrap.prototype.focusInitialElement = function() {
                var redirectToElement = this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");
                return redirectToElement ? (redirectToElement.hasAttribute("cdk-focus-initial") && console.warn("Found use of deprecated attribute 'cdk-focus-initial', use 'cdkFocusInitial' instead. The deprecated attribute will be removed in 8.0.0", redirectToElement), 
                redirectToElement.focus(), !0) : this.focusFirstTabbableElement();
            }, FocusTrap.prototype.focusFirstTabbableElement = function() {
                var redirectToElement = this._getRegionBoundary("start");
                return redirectToElement && redirectToElement.focus(), !!redirectToElement;
            }, FocusTrap.prototype.focusLastTabbableElement = function() {
                var redirectToElement = this._getRegionBoundary("end");
                return redirectToElement && redirectToElement.focus(), !!redirectToElement;
            }, FocusTrap.prototype.hasAttached = function() {
                return this._hasAttached;
            }, FocusTrap.prototype._getFirstTabbableElement = function(root) {
                if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) return root;
                for (var children = root.children || root.childNodes, i = 0; i < children.length; i++) {
                    var tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ? this._getFirstTabbableElement(children[i]) : null;
                    if (tabbableChild) return tabbableChild;
                }
                return null;
            }, FocusTrap.prototype._getLastTabbableElement = function(root) {
                if (this._checker.isFocusable(root) && this._checker.isTabbable(root)) return root;
                for (var children = root.children || root.childNodes, i = children.length - 1; i >= 0; i--) {
                    var tabbableChild = children[i].nodeType === this._document.ELEMENT_NODE ? this._getLastTabbableElement(children[i]) : null;
                    if (tabbableChild) return tabbableChild;
                }
                return null;
            }, FocusTrap.prototype._createAnchor = function() {
                var anchor = this._document.createElement("div");
                return this._toggleAnchorTabIndex(this._enabled, anchor), anchor.classList.add("cdk-visually-hidden"), 
                anchor.classList.add("cdk-focus-trap-anchor"), anchor;
            }, FocusTrap.prototype._toggleAnchorTabIndex = function(isEnabled, anchor) {
                isEnabled ? anchor.setAttribute("tabindex", "0") : anchor.removeAttribute("tabindex");
            }, FocusTrap.prototype._executeOnStable = function(fn) {
                this._ngZone.isStable ? fn() : this._ngZone.onStable.asObservable().pipe(take(1)).subscribe(fn);
            }, FocusTrap;
        }(), a11y_es5_FocusTrapFactory = function() {
            function FocusTrapFactory(_checker, _ngZone, _document) {
                this._checker = _checker, this._ngZone = _ngZone, this._document = _document;
            }
            return FocusTrapFactory.prototype.create = function(element, deferCaptureElements) {
                return void 0 === deferCaptureElements && (deferCaptureElements = !1), new a11y_es5_FocusTrap(element, this._checker, this._ngZone, this._document, deferCaptureElements);
            }, FocusTrapFactory.ngInjectableDef = defineInjectable({
                factory: function() {
                    return new FocusTrapFactory(inject(a11y_es5_InteractivityChecker), inject(NgZone), inject(DOCUMENT));
                },
                token: FocusTrapFactory,
                providedIn: "root"
            }), FocusTrapFactory;
        }(), a11y_es5_FocusMonitor = function() {
            function FocusMonitor(_ngZone, _platform) {
                this._ngZone = _ngZone, this._platform = _platform, this._origin = null, this._windowFocused = !1, 
                this._elementInfo = new Map(), this._unregisterGlobalListeners = function() {}, 
                this._monitoredElementCount = 0;
            }
            return FocusMonitor.prototype.monitor = function(element, checkChildren) {
                var _this = this;
                if (void 0 === checkChildren && (checkChildren = !1), !this._platform.isBrowser) return of(null);
                var nativeElement = this._getNativeElement(element);
                if (this._elementInfo.has(nativeElement)) {
                    var cachedInfo = this._elementInfo.get(nativeElement);
                    return cachedInfo.checkChildren = checkChildren, cachedInfo.subject.asObservable();
                }
                var info = {
                    unlisten: function() {},
                    checkChildren: checkChildren,
                    subject: new Subject_Subject()
                };
                this._elementInfo.set(nativeElement, info), this._incrementMonitoredElementCount();
                var focusListener = function(event) {
                    return _this._onFocus(event, nativeElement);
                }, blurListener = function(event) {
                    return _this._onBlur(event, nativeElement);
                };
                return this._ngZone.runOutsideAngular(function() {
                    nativeElement.addEventListener("focus", focusListener, !0), nativeElement.addEventListener("blur", blurListener, !0);
                }), info.unlisten = function() {
                    nativeElement.removeEventListener("focus", focusListener, !0), nativeElement.removeEventListener("blur", blurListener, !0);
                }, info.subject.asObservable();
            }, FocusMonitor.prototype.stopMonitoring = function(element) {
                var nativeElement = this._getNativeElement(element), elementInfo = this._elementInfo.get(nativeElement);
                elementInfo && (elementInfo.unlisten(), elementInfo.subject.complete(), this._setClasses(nativeElement), 
                this._elementInfo.delete(nativeElement), this._decrementMonitoredElementCount());
            }, FocusMonitor.prototype.focusVia = function(element, origin, options) {
                var nativeElement = this._getNativeElement(element);
                this._setOriginForCurrentEventQueue(origin), "function" == typeof nativeElement.focus && nativeElement.focus(options);
            }, FocusMonitor.prototype.ngOnDestroy = function() {
                var _this = this;
                this._elementInfo.forEach(function(_info, element) {
                    return _this.stopMonitoring(element);
                });
            }, FocusMonitor.prototype._registerGlobalListeners = function() {
                var _this = this;
                if (this._platform.isBrowser) {
                    var documentKeydownListener = function() {
                        _this._lastTouchTarget = null, _this._setOriginForCurrentEventQueue("keyboard");
                    }, documentMousedownListener = function() {
                        _this._lastTouchTarget || _this._setOriginForCurrentEventQueue("mouse");
                    }, documentTouchstartListener = function(event) {
                        null != _this._touchTimeoutId && clearTimeout(_this._touchTimeoutId), _this._lastTouchTarget = event.target, 
                        _this._touchTimeoutId = setTimeout(function() {
                            return _this._lastTouchTarget = null;
                        }, 650);
                    }, windowFocusListener = function() {
                        _this._windowFocused = !0, _this._windowFocusTimeoutId = setTimeout(function() {
                            return _this._windowFocused = !1;
                        });
                    };
                    this._ngZone.runOutsideAngular(function() {
                        document.addEventListener("keydown", documentKeydownListener, !0), document.addEventListener("mousedown", documentMousedownListener, !0), 
                        document.addEventListener("touchstart", documentTouchstartListener, !supportsPassiveEventListeners() || {
                            passive: !0,
                            capture: !0
                        }), window.addEventListener("focus", windowFocusListener);
                    }), this._unregisterGlobalListeners = function() {
                        document.removeEventListener("keydown", documentKeydownListener, !0), document.removeEventListener("mousedown", documentMousedownListener, !0), 
                        document.removeEventListener("touchstart", documentTouchstartListener, !supportsPassiveEventListeners() || {
                            passive: !0,
                            capture: !0
                        }), window.removeEventListener("focus", windowFocusListener), clearTimeout(_this._windowFocusTimeoutId), 
                        clearTimeout(_this._touchTimeoutId), clearTimeout(_this._originTimeoutId);
                    };
                }
            }, FocusMonitor.prototype._toggleClass = function(element, className, shouldSet) {
                shouldSet ? element.classList.add(className) : element.classList.remove(className);
            }, FocusMonitor.prototype._setClasses = function(element, origin) {
                this._elementInfo.get(element) && (this._toggleClass(element, "cdk-focused", !!origin), 
                this._toggleClass(element, "cdk-touch-focused", "touch" === origin), this._toggleClass(element, "cdk-keyboard-focused", "keyboard" === origin), 
                this._toggleClass(element, "cdk-mouse-focused", "mouse" === origin), this._toggleClass(element, "cdk-program-focused", "program" === origin));
            }, FocusMonitor.prototype._setOriginForCurrentEventQueue = function(origin) {
                var _this = this;
                this._ngZone.runOutsideAngular(function() {
                    _this._origin = origin, _this._originTimeoutId = setTimeout(function() {
                        return _this._origin = null;
                    }, 1);
                });
            }, FocusMonitor.prototype._wasCausedByTouch = function(event) {
                var focusTarget = event.target;
                return this._lastTouchTarget instanceof Node && focusTarget instanceof Node && (focusTarget === this._lastTouchTarget || focusTarget.contains(this._lastTouchTarget));
            }, FocusMonitor.prototype._onFocus = function(event, element) {
                var elementInfo = this._elementInfo.get(element);
                if (elementInfo && (elementInfo.checkChildren || element === event.target)) {
                    var origin = this._origin;
                    origin || (origin = this._windowFocused && this._lastFocusOrigin ? this._lastFocusOrigin : this._wasCausedByTouch(event) ? "touch" : "program"), 
                    this._setClasses(element, origin), this._emitOrigin(elementInfo.subject, origin), 
                    this._lastFocusOrigin = origin;
                }
            }, FocusMonitor.prototype._onBlur = function(event, element) {
                var elementInfo = this._elementInfo.get(element);
                !elementInfo || elementInfo.checkChildren && event.relatedTarget instanceof Node && element.contains(event.relatedTarget) || (this._setClasses(element), 
                this._emitOrigin(elementInfo.subject, null));
            }, FocusMonitor.prototype._emitOrigin = function(subject, origin) {
                this._ngZone.run(function() {
                    return subject.next(origin);
                });
            }, FocusMonitor.prototype._incrementMonitoredElementCount = function() {
                1 == ++this._monitoredElementCount && this._registerGlobalListeners();
            }, FocusMonitor.prototype._decrementMonitoredElementCount = function() {
                --this._monitoredElementCount || (this._unregisterGlobalListeners(), this._unregisterGlobalListeners = function() {});
            }, FocusMonitor.prototype._getNativeElement = function(element) {
                return element instanceof ElementRef ? element.nativeElement : element;
            }, FocusMonitor.ngInjectableDef = defineInjectable({
                factory: function() {
                    return new FocusMonitor(inject(NgZone), inject(platform_es5_Platform));
                },
                token: FocusMonitor,
                providedIn: "root"
            }), FocusMonitor;
        }(), MATERIAL_SANITY_CHECKS = new InjectionToken("mat-sanity-checks", {
            providedIn: "root",
            factory: function() {
                return !0;
            }
        }), core_es5_MatCommonModule = function() {
            function MatCommonModule(_sanityChecksEnabled, _hammerLoader) {
                this._sanityChecksEnabled = _sanityChecksEnabled, this._hammerLoader = _hammerLoader, 
                this._hasDoneGlobalChecks = !1, this._hasCheckedHammer = !1, this._document = "object" == typeof document && document ? document : null, 
                this._window = "object" == typeof window && window ? window : null, this._areChecksEnabled() && !this._hasDoneGlobalChecks && (this._checkDoctypeIsDefined(), 
                this._checkThemeIsPresent(), this._hasDoneGlobalChecks = !0);
            }
            return MatCommonModule.prototype._areChecksEnabled = function() {
                return this._sanityChecksEnabled && isDevMode() && !this._isTestEnv();
            }, MatCommonModule.prototype._isTestEnv = function() {
                var window = this._window;
                return window && (window.__karma__ || window.jasmine);
            }, MatCommonModule.prototype._checkDoctypeIsDefined = function() {
                this._document && !this._document.doctype && console.warn("Current document does not have a doctype. This may cause some Angular Material components not to behave as expected.");
            }, MatCommonModule.prototype._checkThemeIsPresent = function() {
                if (this._document && this._document.body && "function" == typeof getComputedStyle) {
                    var testElement = this._document.createElement("div");
                    testElement.classList.add("mat-theme-loaded-marker"), this._document.body.appendChild(testElement);
                    var computedStyle = getComputedStyle(testElement);
                    computedStyle && "none" !== computedStyle.display && console.warn("Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"), 
                    this._document.body.removeChild(testElement);
                }
            }, MatCommonModule.prototype._checkHammerIsAvailable = function() {
                !this._hasCheckedHammer && this._window && (!this._areChecksEnabled() || this._window.Hammer || this._hammerLoader || console.warn("Could not find HammerJS. Certain Angular Material components may not work correctly."), 
                this._hasCheckedHammer = !0);
            }, MatCommonModule;
        }();
        function mixinDisabled(base) {
            return function(_super) {
                function class_1() {
                    for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                    var _this = _super.apply(this, args) || this;
                    return _this._disabled = !1, _this;
                }
                return __extends(class_1, _super), Object.defineProperty(class_1.prototype, "disabled", {
                    get: function() {
                        return this._disabled;
                    },
                    set: function(value) {
                        this._disabled = coerceBooleanProperty(value);
                    },
                    enumerable: !0,
                    configurable: !0
                }), class_1;
            }(base);
        }
        function mixinColor(base, defaultColor) {
            return function(_super) {
                function class_1() {
                    for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                    var _this = _super.apply(this, args) || this;
                    return _this.color = defaultColor, _this;
                }
                return __extends(class_1, _super), Object.defineProperty(class_1.prototype, "color", {
                    get: function() {
                        return this._color;
                    },
                    set: function(value) {
                        var colorPalette = value || defaultColor;
                        colorPalette !== this._color && (this._color && this._elementRef.nativeElement.classList.remove("mat-" + this._color), 
                        colorPalette && this._elementRef.nativeElement.classList.add("mat-" + colorPalette), 
                        this._color = colorPalette);
                    },
                    enumerable: !0,
                    configurable: !0
                }), class_1;
            }(base);
        }
        function mixinDisableRipple(base) {
            return function(_super) {
                function class_1() {
                    for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                    var _this = _super.apply(this, args) || this;
                    return _this._disableRipple = !1, _this;
                }
                return __extends(class_1, _super), Object.defineProperty(class_1.prototype, "disableRipple", {
                    get: function() {
                        return this._disableRipple;
                    },
                    set: function(value) {
                        this._disableRipple = coerceBooleanProperty(value);
                    },
                    enumerable: !0,
                    configurable: !0
                }), class_1;
            }(base);
        }
        var RippleState = function() {
            var RippleState = {
                FADING_IN: 0,
                VISIBLE: 1,
                FADING_OUT: 2,
                HIDDEN: 3
            };
            return RippleState[RippleState.FADING_IN] = "FADING_IN", RippleState[RippleState.VISIBLE] = "VISIBLE", 
            RippleState[RippleState.FADING_OUT] = "FADING_OUT", RippleState[RippleState.HIDDEN] = "HIDDEN", 
            RippleState;
        }(), RippleRef = function() {
            function RippleRef(_renderer, element, config) {
                this._renderer = _renderer, this.element = element, this.config = config, this.state = RippleState.HIDDEN;
            }
            return RippleRef.prototype.fadeOut = function() {
                this._renderer.fadeOutRipple(this);
            }, RippleRef;
        }(), defaultRippleAnimationConfig = {
            enterDuration: 450,
            exitDuration: 400
        }, ignoreMouseEventsTimeout = 800, core_es5_RippleRenderer = function() {
            function RippleRenderer(_target, _ngZone, elementRef, platform) {
                var _this = this;
                this._target = _target, this._ngZone = _ngZone, this._isPointerDown = !1, this._triggerEvents = new Map(), 
                this._activeRipples = new Set(), this._eventOptions = !!supportsPassiveEventListeners() && {
                    passive: !0
                }, this.onMousedown = function(event) {
                    var isFakeMousedown = function(event) {
                        return 0 === event.buttons;
                    }(event), isSyntheticEvent = _this._lastTouchStartEvent && Date.now() < _this._lastTouchStartEvent + ignoreMouseEventsTimeout;
                    _this._target.rippleDisabled || isFakeMousedown || isSyntheticEvent || (_this._isPointerDown = !0, 
                    _this.fadeInRipple(event.clientX, event.clientY, _this._target.rippleConfig));
                }, this.onTouchStart = function(event) {
                    if (!_this._target.rippleDisabled) {
                        _this._lastTouchStartEvent = Date.now(), _this._isPointerDown = !0;
                        for (var touches = event.changedTouches, i = 0; i < touches.length; i++) _this.fadeInRipple(touches[i].clientX, touches[i].clientY, _this._target.rippleConfig);
                    }
                }, this.onPointerUp = function() {
                    _this._isPointerDown && (_this._isPointerDown = !1, _this._activeRipples.forEach(function(ripple) {
                        !ripple.config.persistent && (ripple.state === RippleState.VISIBLE || ripple.config.terminateOnPointerUp && ripple.state === RippleState.FADING_IN) && ripple.fadeOut();
                    }));
                }, platform.isBrowser && (this._containerElement = elementRef.nativeElement, this._triggerEvents.set("mousedown", this.onMousedown).set("mouseup", this.onPointerUp).set("mouseleave", this.onPointerUp).set("touchstart", this.onTouchStart).set("touchend", this.onPointerUp).set("touchcancel", this.onPointerUp));
            }
            return RippleRenderer.prototype.fadeInRipple = function(x, y, config) {
                var _this = this;
                void 0 === config && (config = {});
                var containerRect = this._containerRect = this._containerRect || this._containerElement.getBoundingClientRect(), animationConfig = __assign({}, defaultRippleAnimationConfig, config.animation);
                config.centered && (x = containerRect.left + containerRect.width / 2, y = containerRect.top + containerRect.height / 2);
                var radius = config.radius || function(x, y, rect) {
                    var distX = Math.max(Math.abs(x - rect.left), Math.abs(x - rect.right)), distY = Math.max(Math.abs(y - rect.top), Math.abs(y - rect.bottom));
                    return Math.sqrt(distX * distX + distY * distY);
                }(x, y, containerRect), offsetX = x - containerRect.left, offsetY = y - containerRect.top, duration = animationConfig.enterDuration, ripple = document.createElement("div");
                ripple.classList.add("mat-ripple-element"), ripple.style.left = offsetX - radius + "px", 
                ripple.style.top = offsetY - radius + "px", ripple.style.height = 2 * radius + "px", 
                ripple.style.width = 2 * radius + "px", ripple.style.backgroundColor = config.color || null, 
                ripple.style.transitionDuration = duration + "ms", this._containerElement.appendChild(ripple), 
                window.getComputedStyle(ripple).getPropertyValue("opacity"), ripple.style.transform = "scale(1)";
                var rippleRef = new RippleRef(this, ripple, config);
                return rippleRef.state = RippleState.FADING_IN, this._activeRipples.add(rippleRef), 
                config.persistent || (this._mostRecentTransientRipple = rippleRef), this.runTimeoutOutsideZone(function() {
                    var isMostRecentTransientRipple = rippleRef === _this._mostRecentTransientRipple;
                    rippleRef.state = RippleState.VISIBLE, config.persistent || isMostRecentTransientRipple && _this._isPointerDown || rippleRef.fadeOut();
                }, duration), rippleRef;
            }, RippleRenderer.prototype.fadeOutRipple = function(rippleRef) {
                var wasActive = this._activeRipples.delete(rippleRef);
                if (rippleRef === this._mostRecentTransientRipple && (this._mostRecentTransientRipple = null), 
                this._activeRipples.size || (this._containerRect = null), wasActive) {
                    var rippleEl = rippleRef.element, animationConfig = __assign({}, defaultRippleAnimationConfig, rippleRef.config.animation);
                    rippleEl.style.transitionDuration = animationConfig.exitDuration + "ms", rippleEl.style.opacity = "0", 
                    rippleRef.state = RippleState.FADING_OUT, this.runTimeoutOutsideZone(function() {
                        rippleRef.state = RippleState.HIDDEN, rippleEl.parentNode.removeChild(rippleEl);
                    }, animationConfig.exitDuration);
                }
            }, RippleRenderer.prototype.fadeOutAll = function() {
                this._activeRipples.forEach(function(ripple) {
                    return ripple.fadeOut();
                });
            }, RippleRenderer.prototype.setupTriggerEvents = function(element) {
                var _this = this;
                element && element !== this._triggerElement && (this._removeTriggerEvents(), this._ngZone.runOutsideAngular(function() {
                    _this._triggerEvents.forEach(function(fn, type) {
                        return element.addEventListener(type, fn, _this._eventOptions);
                    });
                }), this._triggerElement = element);
            }, RippleRenderer.prototype.runTimeoutOutsideZone = function(fn, delay) {
                void 0 === delay && (delay = 0), this._ngZone.runOutsideAngular(function() {
                    return setTimeout(fn, delay);
                });
            }, RippleRenderer.prototype._removeTriggerEvents = function() {
                var _this = this;
                this._triggerElement && this._triggerEvents.forEach(function(fn, type) {
                    _this._triggerElement.removeEventListener(type, fn, _this._eventOptions);
                });
            }, RippleRenderer;
        }(), MAT_RIPPLE_GLOBAL_OPTIONS = new InjectionToken("mat-ripple-global-options"), core_es5_MatRipple = function() {
            function MatRipple(_elementRef, ngZone, platform, globalOptions, animationMode) {
                this._elementRef = _elementRef, this.radius = 0, this._disabled = !1, this._isInitialized = !1, 
                this._globalOptions = globalOptions || {}, this._rippleRenderer = new core_es5_RippleRenderer(this, ngZone, _elementRef, platform), 
                "NoopAnimations" === animationMode && (this._globalOptions.animation = {
                    enterDuration: 0,
                    exitDuration: 0
                });
            }
            return Object.defineProperty(MatRipple.prototype, "disabled", {
                get: function() {
                    return this._disabled;
                },
                set: function(value) {
                    this._disabled = value, this._setupTriggerEventsIfEnabled();
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatRipple.prototype, "trigger", {
                get: function() {
                    return this._trigger || this._elementRef.nativeElement;
                },
                set: function(trigger) {
                    this._trigger = trigger, this._setupTriggerEventsIfEnabled();
                },
                enumerable: !0,
                configurable: !0
            }), MatRipple.prototype.ngOnInit = function() {
                this._isInitialized = !0, this._setupTriggerEventsIfEnabled();
            }, MatRipple.prototype.ngOnDestroy = function() {
                this._rippleRenderer._removeTriggerEvents();
            }, MatRipple.prototype.fadeOutAll = function() {
                this._rippleRenderer.fadeOutAll();
            }, Object.defineProperty(MatRipple.prototype, "rippleConfig", {
                get: function() {
                    return {
                        centered: this.centered,
                        radius: this.radius,
                        color: this.color,
                        animation: __assign({}, this._globalOptions.animation, this.animation),
                        terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
                    };
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatRipple.prototype, "rippleDisabled", {
                get: function() {
                    return this.disabled || !!this._globalOptions.disabled;
                },
                enumerable: !0,
                configurable: !0
            }), MatRipple.prototype._setupTriggerEventsIfEnabled = function() {
                !this.disabled && this._isInitialized && this._rippleRenderer.setupTriggerEvents(this.trigger);
            }, MatRipple.prototype.launch = function(configOrX, y, config) {
                return void 0 === y && (y = 0), "number" == typeof configOrX ? this._rippleRenderer.fadeInRipple(configOrX, y, __assign({}, this.rippleConfig, config)) : this._rippleRenderer.fadeInRipple(0, 0, __assign({}, this.rippleConfig, configOrX));
            }, MatRipple;
        }(), MatRippleModule = function() {
            return function() {};
        }();
        function getMatIconNameNotFoundError(iconName) {
            return Error('Unable to find icon with the name "' + iconName + '"');
        }
        function getMatIconFailedToSanitizeUrlError(url) {
            return Error("The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was \"" + url + '".');
        }
        function getMatIconFailedToSanitizeLiteralError(literal) {
            return Error("The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was \"" + literal + '".');
        }
        var SvgIconConfig = function() {
            return function(data) {
                data.nodeName ? this.svgElement = data : this.url = data;
            };
        }(), icon_es5_MatIconRegistry = function() {
            function MatIconRegistry(_httpClient, _sanitizer, document) {
                this._httpClient = _httpClient, this._sanitizer = _sanitizer, this._svgIconConfigs = new Map(), 
                this._iconSetConfigs = new Map(), this._cachedIconsByUrl = new Map(), this._inProgressUrlFetches = new Map(), 
                this._fontCssClassesByAlias = new Map(), this._defaultFontSetClass = "material-icons", 
                this._document = document;
            }
            return MatIconRegistry.prototype.addSvgIcon = function(iconName, url) {
                return this.addSvgIconInNamespace("", iconName, url);
            }, MatIconRegistry.prototype.addSvgIconLiteral = function(iconName, literal) {
                return this.addSvgIconLiteralInNamespace("", iconName, literal);
            }, MatIconRegistry.prototype.addSvgIconInNamespace = function(namespace, iconName, url) {
                return this._addSvgIconConfig(namespace, iconName, new SvgIconConfig(url));
            }, MatIconRegistry.prototype.addSvgIconLiteralInNamespace = function(namespace, iconName, literal) {
                var sanitizedLiteral = this._sanitizer.sanitize(SecurityContext.HTML, literal);
                if (!sanitizedLiteral) throw getMatIconFailedToSanitizeLiteralError(literal);
                var svgElement = this._createSvgElementForSingleIcon(sanitizedLiteral);
                return this._addSvgIconConfig(namespace, iconName, new SvgIconConfig(svgElement));
            }, MatIconRegistry.prototype.addSvgIconSet = function(url) {
                return this.addSvgIconSetInNamespace("", url);
            }, MatIconRegistry.prototype.addSvgIconSetLiteral = function(literal) {
                return this.addSvgIconSetLiteralInNamespace("", literal);
            }, MatIconRegistry.prototype.addSvgIconSetInNamespace = function(namespace, url) {
                return this._addSvgIconSetConfig(namespace, new SvgIconConfig(url));
            }, MatIconRegistry.prototype.addSvgIconSetLiteralInNamespace = function(namespace, literal) {
                var sanitizedLiteral = this._sanitizer.sanitize(SecurityContext.HTML, literal);
                if (!sanitizedLiteral) throw getMatIconFailedToSanitizeLiteralError(literal);
                var svgElement = this._svgElementFromString(sanitizedLiteral);
                return this._addSvgIconSetConfig(namespace, new SvgIconConfig(svgElement));
            }, MatIconRegistry.prototype.registerFontClassAlias = function(alias, className) {
                return void 0 === className && (className = alias), this._fontCssClassesByAlias.set(alias, className), 
                this;
            }, MatIconRegistry.prototype.classNameForFontAlias = function(alias) {
                return this._fontCssClassesByAlias.get(alias) || alias;
            }, MatIconRegistry.prototype.setDefaultFontSetClass = function(className) {
                return this._defaultFontSetClass = className, this;
            }, MatIconRegistry.prototype.getDefaultFontSetClass = function() {
                return this._defaultFontSetClass;
            }, MatIconRegistry.prototype.getSvgIconFromUrl = function(safeUrl) {
                var _this = this, url = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
                if (!url) throw getMatIconFailedToSanitizeUrlError(safeUrl);
                var cachedIcon = this._cachedIconsByUrl.get(url);
                return cachedIcon ? of(cloneSvg(cachedIcon)) : this._loadSvgIconFromConfig(new SvgIconConfig(safeUrl)).pipe(tap(function(svg) {
                    return _this._cachedIconsByUrl.set(url, svg);
                }), map_map(function(svg) {
                    return cloneSvg(svg);
                }));
            }, MatIconRegistry.prototype.getNamedSvgIcon = function(name, namespace) {
                void 0 === namespace && (namespace = "");
                var key = iconKey(namespace, name), config = this._svgIconConfigs.get(key);
                if (config) return this._getSvgFromConfig(config);
                var iconSetConfigs = this._iconSetConfigs.get(namespace);
                return iconSetConfigs ? this._getSvgFromIconSetConfigs(name, iconSetConfigs) : throwError_throwError(getMatIconNameNotFoundError(key));
            }, MatIconRegistry.prototype._getSvgFromConfig = function(config) {
                return config.svgElement ? of(cloneSvg(config.svgElement)) : this._loadSvgIconFromConfig(config).pipe(tap(function(svg) {
                    return config.svgElement = svg;
                }), map_map(function(svg) {
                    return cloneSvg(svg);
                }));
            }, MatIconRegistry.prototype._getSvgFromIconSetConfigs = function(name, iconSetConfigs) {
                var _this = this, namedIcon = this._extractIconWithNameFromAnySet(name, iconSetConfigs);
                return namedIcon ? of(namedIcon) : function forkJoin() {
                    for (var resultSelector, sources = [], _i = 0; _i < arguments.length; _i++) sources[_i] = arguments[_i];
                    return "function" == typeof sources[sources.length - 1] && (resultSelector = sources.pop()), 
                    1 === sources.length && isArray(sources[0]) && (sources = sources[0]), 0 === sources.length ? empty_EMPTY : resultSelector ? forkJoin(sources).pipe(map_map(function(args) {
                        return resultSelector.apply(void 0, args);
                    })) : new Observable_Observable(function(subscriber) {
                        return new forkJoin_ForkJoinSubscriber(subscriber, sources);
                    });
                }(iconSetConfigs.filter(function(iconSetConfig) {
                    return !iconSetConfig.svgElement;
                }).map(function(iconSetConfig) {
                    return _this._loadSvgIconSetFromConfig(iconSetConfig).pipe(catchError(function(err) {
                        var url = _this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, iconSetConfig.url);
                        return console.error("Loading icon set URL: " + url + " failed: " + err.message), 
                        of(null);
                    }));
                })).pipe(map_map(function() {
                    var foundIcon = _this._extractIconWithNameFromAnySet(name, iconSetConfigs);
                    if (!foundIcon) throw getMatIconNameNotFoundError(name);
                    return foundIcon;
                }));
            }, MatIconRegistry.prototype._extractIconWithNameFromAnySet = function(iconName, iconSetConfigs) {
                for (var i = iconSetConfigs.length - 1; i >= 0; i--) {
                    var config = iconSetConfigs[i];
                    if (config.svgElement) {
                        var foundIcon = this._extractSvgIconFromSet(config.svgElement, iconName);
                        if (foundIcon) return foundIcon;
                    }
                }
                return null;
            }, MatIconRegistry.prototype._loadSvgIconFromConfig = function(config) {
                var _this = this;
                return this._fetchUrl(config.url).pipe(map_map(function(svgText) {
                    return _this._createSvgElementForSingleIcon(svgText);
                }));
            }, MatIconRegistry.prototype._loadSvgIconSetFromConfig = function(config) {
                var _this = this;
                return config.svgElement ? of(config.svgElement) : this._fetchUrl(config.url).pipe(map_map(function(svgText) {
                    return config.svgElement || (config.svgElement = _this._svgElementFromString(svgText)), 
                    config.svgElement;
                }));
            }, MatIconRegistry.prototype._createSvgElementForSingleIcon = function(responseText) {
                var svg = this._svgElementFromString(responseText);
                return this._setSvgAttributes(svg), svg;
            }, MatIconRegistry.prototype._extractSvgIconFromSet = function(iconSet, iconName) {
                var iconSource = iconSet.querySelector("#" + iconName);
                if (!iconSource) return null;
                var iconElement = iconSource.cloneNode(!0);
                if (iconElement.removeAttribute("id"), "svg" === iconElement.nodeName.toLowerCase()) return this._setSvgAttributes(iconElement);
                if ("symbol" === iconElement.nodeName.toLowerCase()) return this._setSvgAttributes(this._toSvgElement(iconElement));
                var svg = this._svgElementFromString("<svg></svg>");
                return svg.appendChild(iconElement), this._setSvgAttributes(svg);
            }, MatIconRegistry.prototype._svgElementFromString = function(str) {
                var div = this._document.createElement("DIV");
                div.innerHTML = str;
                var svg = div.querySelector("svg");
                if (!svg) throw Error("<svg> tag not found");
                return svg;
            }, MatIconRegistry.prototype._toSvgElement = function(element) {
                for (var svg = this._svgElementFromString("<svg></svg>"), i = 0; i < element.childNodes.length; i++) element.childNodes[i].nodeType === this._document.ELEMENT_NODE && svg.appendChild(element.childNodes[i].cloneNode(!0));
                return svg;
            }, MatIconRegistry.prototype._setSvgAttributes = function(svg) {
                return svg.setAttribute("fit", ""), svg.setAttribute("height", "100%"), svg.setAttribute("width", "100%"), 
                svg.setAttribute("preserveAspectRatio", "xMidYMid meet"), svg.setAttribute("focusable", "false"), 
                svg;
            }, MatIconRegistry.prototype._fetchUrl = function(safeUrl) {
                var _this = this;
                if (!this._httpClient) throw Error("Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports.");
                if (null == safeUrl) throw Error('Cannot fetch icon from URL "' + safeUrl + '".');
                var url = this._sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
                if (!url) throw getMatIconFailedToSanitizeUrlError(safeUrl);
                var inProgressFetch = this._inProgressUrlFetches.get(url);
                if (inProgressFetch) return inProgressFetch;
                var callback, req = this._httpClient.get(url, {
                    responseType: "text"
                }).pipe((callback = function() {
                    return _this._inProgressUrlFetches.delete(url);
                }, function(source) {
                    return source.lift(new FinallyOperator(callback));
                }), share());
                return this._inProgressUrlFetches.set(url, req), req;
            }, MatIconRegistry.prototype._addSvgIconConfig = function(namespace, iconName, config) {
                return this._svgIconConfigs.set(iconKey(namespace, iconName), config), this;
            }, MatIconRegistry.prototype._addSvgIconSetConfig = function(namespace, config) {
                var configNamespace = this._iconSetConfigs.get(namespace);
                return configNamespace ? configNamespace.push(config) : this._iconSetConfigs.set(namespace, [ config ]), 
                this;
            }, MatIconRegistry.ngInjectableDef = defineInjectable({
                factory: function() {
                    return new MatIconRegistry(inject(http_HttpClient, 8), inject(DomSanitizer), inject(DOCUMENT, 8));
                },
                token: MatIconRegistry,
                providedIn: "root"
            }), MatIconRegistry;
        }();
        function cloneSvg(svg) {
            return svg.cloneNode(!0);
        }
        function iconKey(namespace, name) {
            return namespace + ":" + name;
        }
        var _MatIconMixinBase = mixinColor(function() {
            return function(_elementRef) {
                this._elementRef = _elementRef;
            };
        }()), MAT_ICON_LOCATION = new InjectionToken("mat-icon-location", {
            providedIn: "root",
            factory: function() {
                var _document = inject(DOCUMENT);
                return {
                    getPathname: function() {
                        return _document && _document.location && _document.location.pathname || "";
                    }
                };
            }
        }), funcIriAttributes = [ "clip-path", "color-profile", "src", "cursor", "fill", "filter", "marker", "marker-start", "marker-mid", "marker-end", "mask", "stroke" ], funcIriAttributeSelector = funcIriAttributes.map(function(attr) {
            return "[" + attr + "]";
        }).join(", "), funcIriPattern = /^url\(['"]?#(.*?)['"]?\)$/, icon_es5_MatIcon = function(_super) {
            function MatIcon(elementRef, _iconRegistry, ariaHidden, _location) {
                var _this = _super.call(this, elementRef) || this;
                return _this._iconRegistry = _iconRegistry, _this._location = _location, _this._inline = !1, 
                ariaHidden || elementRef.nativeElement.setAttribute("aria-hidden", "true"), _this;
            }
            return __extends(MatIcon, _super), Object.defineProperty(MatIcon.prototype, "inline", {
                get: function() {
                    return this._inline;
                },
                set: function(inline) {
                    this._inline = coerceBooleanProperty(inline);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatIcon.prototype, "fontSet", {
                get: function() {
                    return this._fontSet;
                },
                set: function(value) {
                    this._fontSet = this._cleanupFontValue(value);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatIcon.prototype, "fontIcon", {
                get: function() {
                    return this._fontIcon;
                },
                set: function(value) {
                    this._fontIcon = this._cleanupFontValue(value);
                },
                enumerable: !0,
                configurable: !0
            }), MatIcon.prototype._splitIconName = function(iconName) {
                if (!iconName) return [ "", "" ];
                var parts = iconName.split(":");
                switch (parts.length) {
                  case 1:
                    return [ "", parts[0] ];

                  case 2:
                    return parts;

                  default:
                    throw Error('Invalid icon name: "' + iconName + '"');
                }
            }, MatIcon.prototype.ngOnChanges = function(changes) {
                var _this = this;
                if (changes.svgIcon) if (this.svgIcon) {
                    var _a = this._splitIconName(this.svgIcon);
                    this._iconRegistry.getNamedSvgIcon(_a[1], _a[0]).pipe(take(1)).subscribe(function(svg) {
                        return _this._setSvgElement(svg);
                    }, function(err) {
                        return console.log("Error retrieving icon: " + err.message);
                    });
                } else this._clearSvgElement();
                this._usingFontIcon() && this._updateFontIconClasses();
            }, MatIcon.prototype.ngOnInit = function() {
                this._usingFontIcon() && this._updateFontIconClasses();
            }, MatIcon.prototype.ngAfterViewChecked = function() {
                var cachedElements = this._elementsWithExternalReferences;
                if (cachedElements && this._location && cachedElements.size) {
                    var newPath = this._location.getPathname();
                    newPath !== this._previousPath && (this._previousPath = newPath, this._prependPathToReferences(newPath));
                }
            }, MatIcon.prototype.ngOnDestroy = function() {
                this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear();
            }, MatIcon.prototype._usingFontIcon = function() {
                return !this.svgIcon;
            }, MatIcon.prototype._setSvgElement = function(svg) {
                this._clearSvgElement();
                for (var styleTags = svg.querySelectorAll("style"), i = 0; i < styleTags.length; i++) styleTags[i].textContent += " ";
                if (this._location) {
                    var path = this._location.getPathname();
                    this._previousPath = path, this._cacheChildrenWithExternalReferences(svg), this._prependPathToReferences(path);
                }
                this._elementRef.nativeElement.appendChild(svg);
            }, MatIcon.prototype._clearSvgElement = function() {
                var layoutElement = this._elementRef.nativeElement, childCount = layoutElement.childNodes.length;
                for (this._elementsWithExternalReferences && this._elementsWithExternalReferences.clear(); childCount--; ) {
                    var child = layoutElement.childNodes[childCount];
                    1 === child.nodeType && "svg" !== child.nodeName.toLowerCase() || layoutElement.removeChild(child);
                }
            }, MatIcon.prototype._updateFontIconClasses = function() {
                if (this._usingFontIcon()) {
                    var elem = this._elementRef.nativeElement, fontSetClass = this.fontSet ? this._iconRegistry.classNameForFontAlias(this.fontSet) : this._iconRegistry.getDefaultFontSetClass();
                    fontSetClass != this._previousFontSetClass && (this._previousFontSetClass && elem.classList.remove(this._previousFontSetClass), 
                    fontSetClass && elem.classList.add(fontSetClass), this._previousFontSetClass = fontSetClass), 
                    this.fontIcon != this._previousFontIconClass && (this._previousFontIconClass && elem.classList.remove(this._previousFontIconClass), 
                    this.fontIcon && elem.classList.add(this.fontIcon), this._previousFontIconClass = this.fontIcon);
                }
            }, MatIcon.prototype._cleanupFontValue = function(value) {
                return "string" == typeof value ? value.trim().split(" ")[0] : value;
            }, MatIcon.prototype._prependPathToReferences = function(path) {
                var elements = this._elementsWithExternalReferences;
                elements && elements.forEach(function(attrs, element) {
                    attrs.forEach(function(attr) {
                        element.setAttribute(attr.name, "url('" + path + "#" + attr.value + "')");
                    });
                });
            }, MatIcon.prototype._cacheChildrenWithExternalReferences = function(element) {
                for (var elementsWithFuncIri = element.querySelectorAll(funcIriAttributeSelector), elements = this._elementsWithExternalReferences = this._elementsWithExternalReferences || new Map(), _loop_1 = function(i) {
                    funcIriAttributes.forEach(function(attr) {
                        var elementWithReference = elementsWithFuncIri[i], value = elementWithReference.getAttribute(attr), match = value ? value.match(funcIriPattern) : null;
                        if (match) {
                            var attributes = elements.get(elementWithReference);
                            attributes || elements.set(elementWithReference, attributes = []), attributes.push({
                                name: attr,
                                value: match[1]
                            });
                        }
                    });
                }, i = 0; i < elementsWithFuncIri.length; i++) _loop_1(i);
            }, MatIcon;
        }(_MatIconMixinBase), MatIconModule = function() {
            return function() {};
        }(), SVG_ICONS = new InjectionToken("SvgIcons"), DEFAULT_NS = "$$default", custom_icon_registry_CustomIconRegistry = function(_super) {
            function CustomIconRegistry(http, sanitizer, document, svgIcons) {
                var _a, _this = _super.call(this, http, sanitizer, document) || this;
                return _this.preloadedSvgElements = ((_a = {})[DEFAULT_NS] = {}, _a), _this.loadSvgElements(svgIcons), 
                _this;
            }
            return __extends(CustomIconRegistry, _super), CustomIconRegistry.prototype.getNamedSvgIcon = function(iconName, namespace) {
                var nsIconMap = this.preloadedSvgElements[namespace || DEFAULT_NS], preloadedElement = nsIconMap && nsIconMap[iconName];
                return preloadedElement ? of(preloadedElement.cloneNode(!0)) : _super.prototype.getNamedSvgIcon.call(this, iconName, namespace);
            }, CustomIconRegistry.prototype.loadSvgElements = function(svgIcons) {
                var _this = this, div = document.createElement("DIV");
                svgIcons.forEach(function(icon) {
                    var ns = icon.namespace || DEFAULT_NS, nsIconMap = _this.preloadedSvgElements[ns] || (_this.preloadedSvgElements[ns] = {});
                    div.innerHTML = icon.svgSource, nsIconMap[icon.name] = div.querySelector("svg");
                });
            }, CustomIconRegistry;
        }(icon_es5_MatIconRegistry), CurrentDateToken = new InjectionToken("CurrentDate"), WindowToken = new InjectionToken("Window"), app_module_0 = function() {
            return new Date();
        }, app_module_1 = function() {
            return window;
        }, AppModule = function() {
            return function() {};
        }(), BehaviorSubject_BehaviorSubject = function(_super) {
            function BehaviorSubject(_value) {
                var _this = _super.call(this) || this;
                return _this._value = _value, _this;
            }
            return __extends(BehaviorSubject, _super), Object.defineProperty(BehaviorSubject.prototype, "value", {
                get: function() {
                    return this.getValue();
                },
                enumerable: !0,
                configurable: !0
            }), BehaviorSubject.prototype._subscribe = function(subscriber) {
                var subscription = _super.prototype._subscribe.call(this, subscriber);
                return subscription && !subscription.closed && subscriber.next(this._value), subscription;
            }, BehaviorSubject.prototype.getValue = function() {
                if (this.hasError) throw this.thrownError;
                if (this.closed) throw new ObjectUnsubscribedError();
                return this._value;
            }, BehaviorSubject.prototype.next = function(value) {
                _super.prototype.next.call(this, this._value = value);
            }, BehaviorSubject;
        }(Subject_Subject), NONE = {};
        function combineLatest() {
            for (var observables = [], _i = 0; _i < arguments.length; _i++) observables[_i] = arguments[_i];
            var resultSelector = null, scheduler = null;
            return isScheduler(observables[observables.length - 1]) && (scheduler = observables.pop()), 
            "function" == typeof observables[observables.length - 1] && (resultSelector = observables.pop()), 
            1 === observables.length && isArray(observables[0]) && (observables = observables[0]), 
            fromArray(observables, scheduler).lift(new CombineLatestOperator(resultSelector));
        }
        var CombineLatestOperator = function() {
            function CombineLatestOperator(resultSelector) {
                this.resultSelector = resultSelector;
            }
            return CombineLatestOperator.prototype.call = function(subscriber, source) {
                return source.subscribe(new combineLatest_CombineLatestSubscriber(subscriber, this.resultSelector));
            }, CombineLatestOperator;
        }(), combineLatest_CombineLatestSubscriber = function(_super) {
            function CombineLatestSubscriber(destination, resultSelector) {
                var _this = _super.call(this, destination) || this;
                return _this.resultSelector = resultSelector, _this.active = 0, _this.values = [], 
                _this.observables = [], _this;
            }
            return __extends(CombineLatestSubscriber, _super), CombineLatestSubscriber.prototype._next = function(observable) {
                this.values.push(NONE), this.observables.push(observable);
            }, CombineLatestSubscriber.prototype._complete = function() {
                var observables = this.observables, len = observables.length;
                if (0 === len) this.destination.complete(); else {
                    this.active = len, this.toRespond = len;
                    for (var i = 0; i < len; i++) {
                        var observable = observables[i];
                        this.add(subscribeToResult(this, observable, observable, i));
                    }
                }
            }, CombineLatestSubscriber.prototype.notifyComplete = function(unused) {
                0 == (this.active -= 1) && this.destination.complete();
            }, CombineLatestSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                var values = this.values, toRespond = this.toRespond ? values[outerIndex] === NONE ? --this.toRespond : this.toRespond : 0;
                values[outerIndex] = innerValue, 0 === toRespond && (this.resultSelector ? this._tryResultSelector(values) : this.destination.next(values.slice()));
            }, CombineLatestSubscriber.prototype._tryResultSelector = function(values) {
                var result;
                try {
                    result = this.resultSelector.apply(this, values);
                } catch (err) {
                    return void this.destination.error(err);
                }
                this.destination.next(result);
            }, CombineLatestSubscriber;
        }(OuterSubscriber_OuterSubscriber);
        function EmptyErrorImpl() {
            return Error.call(this), this.message = "no elements in sequence", this.name = "EmptyError", 
            this;
        }
        EmptyErrorImpl.prototype = Object.create(Error.prototype);
        var EmptyError = EmptyErrorImpl, DefaultIfEmptyOperator = function() {
            function DefaultIfEmptyOperator(defaultValue) {
                this.defaultValue = defaultValue;
            }
            return DefaultIfEmptyOperator.prototype.call = function(subscriber, source) {
                return source.subscribe(new defaultIfEmpty_DefaultIfEmptySubscriber(subscriber, this.defaultValue));
            }, DefaultIfEmptyOperator;
        }(), defaultIfEmpty_DefaultIfEmptySubscriber = function(_super) {
            function DefaultIfEmptySubscriber(destination, defaultValue) {
                var _this = _super.call(this, destination) || this;
                return _this.defaultValue = defaultValue, _this.isEmpty = !0, _this;
            }
            return __extends(DefaultIfEmptySubscriber, _super), DefaultIfEmptySubscriber.prototype._next = function(value) {
                this.isEmpty = !1, this.destination.next(value);
            }, DefaultIfEmptySubscriber.prototype._complete = function() {
                this.isEmpty && this.destination.next(this.defaultValue), this.destination.complete();
            }, DefaultIfEmptySubscriber;
        }(Subscriber_Subscriber), throwIfEmpty = function(errorFactory) {
            return void 0 === errorFactory && (errorFactory = defaultErrorFactory), tap({
                hasValue: !1,
                next: function() {
                    this.hasValue = !0;
                },
                complete: function() {
                    if (!this.hasValue) throw errorFactory();
                }
            });
        };
        function defaultErrorFactory() {
            return new EmptyError();
        }
        function first_first(predicate, defaultValue) {
            var hasDefaultValue = arguments.length >= 2;
            return function(source) {
                return source.pipe(predicate ? filter(function(v, i) {
                    return predicate(v, i, source);
                }) : identity, take(1), hasDefaultValue ? function(defaultValue) {
                    return void 0 === defaultValue && (defaultValue = null), function(source) {
                        return source.lift(new DefaultIfEmptyOperator(defaultValue));
                    };
                }(defaultValue) : throwIfEmpty(function() {
                    return new EmptyError();
                }));
            };
        }
        var app_component_AppComponent = function() {
            function AppComponent(deployment, documentService, hostElement, locationService, navigationService, scrollService, searchService, tocService) {
                this.deployment = deployment, this.documentService = documentService, this.hostElement = hostElement, 
                this.locationService = locationService, this.navigationService = navigationService, 
                this.scrollService = scrollService, this.searchService = searchService, this.tocService = tocService, 
                this.currentNodes = {}, this.dtOn = !1, this.hostClasses = "", this.isStarting = !0, 
                this.isTransitioning = !0, this.isFetching = !1, this.isSideBySide = !1, this.isSideNavDoc = !1, 
                this.sideBySideWidth = 992, this.hasFloatingToc = !1, this.showFloatingToc = new BehaviorSubject_BehaviorSubject(!1), 
                this.showFloatingTocWidth = 800, this.tocMaxHeightOffset = 0, this.showSearchResults = !1, 
                this.notificationAnimating = !1;
            }
            return Object.defineProperty(AppComponent.prototype, "isOpened", {
                get: function() {
                    return this.isSideBySide && this.isSideNavDoc;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(AppComponent.prototype, "mode", {
                get: function() {
                    return this.isSideBySide ? "side" : "over";
                },
                enumerable: !0,
                configurable: !0
            }), AppComponent.prototype.ngOnInit = function() {
                var _this = this;
                "Worker" in window && this.searchService.initWorker("app/search/search-worker.js", 2e3), 
                this.onResize(window.innerWidth), this.documentService.currentDocument.subscribe(function(doc) {
                    return _this.currentDocument = doc;
                }), this.locationService.currentPath.subscribe(function(path) {
                    "archive" !== _this.deployment.mode || /^(docs$|api|guide|tutorial)/.test(path) || _this.locationService.replace("docs"), 
                    path === _this.currentPath ? _this.scrollService.scroll() : (_this.currentPath = path, 
                    clearTimeout(_this.isFetchingTimeout), _this.isFetchingTimeout = setTimeout(function() {
                        return _this.isFetching = !0;
                    }, 200));
                }), this.navigationService.currentNodes.subscribe(function(currentNodes) {
                    return _this.currentNodes = currentNodes;
                }), combineLatest(this.navigationService.versionInfo, this.navigationService.navigationViews.pipe(map_map(function(views) {
                    return views.docVersions;
                }))).subscribe(function(_a) {
                    var versionInfo = _a[0], versions = _a[1], computedVersions = [ {
                        title: "next",
                        url: "https://next.angular.io"
                    }, {
                        title: "stable",
                        url: "https://angular.io"
                    } ];
                    "archive" === _this.deployment.mode && computedVersions.push({
                        title: "v" + versionInfo.major
                    }), _this.docVersions = computedVersions.concat(versions), _this.currentDocVersion = _this.docVersions.find(function(version) {
                        return version.title === _this.deployment.mode || version.title === "v" + versionInfo.major;
                    }), _this.currentDocVersion.title += " (v" + versionInfo.raw + ")";
                }), this.navigationService.navigationViews.subscribe(function(views) {
                    _this.footerNodes = views.Footer || [], _this.sideNavNodes = views.SideNav || [], 
                    _this.topMenuNodes = views.TopBar || [], _this.topMenuNarrowNodes = views.TopBarNarrow || _this.topMenuNodes;
                }), this.navigationService.versionInfo.subscribe(function(vi) {
                    return _this.versionInfo = vi;
                }), combineLatest(this.tocService.tocList.pipe(map_map(function(tocList) {
                    return tocList.length > 0;
                })), this.showFloatingToc).subscribe(function(_a) {
                    return _this.hasFloatingToc = _a[0] && _a[1];
                }), combineLatest(this.documentService.currentDocument, this.navigationService.currentNodes).pipe(first_first()).subscribe(function() {
                    return _this.updateShell();
                });
            }, AppComponent.prototype.onDocReady = function() {
                var _this = this;
                this.isTransitioning = !0, clearTimeout(this.isFetchingTimeout), setTimeout(function() {
                    return _this.isFetching = !1;
                }, 500);
            }, AppComponent.prototype.onDocRemoved = function() {
                this.scrollService.removeStoredScrollPosition();
            }, AppComponent.prototype.onDocInserted = function() {
                var _this = this;
                setTimeout(function() {
                    return _this.updateShell();
                }), this.scrollService.scrollAfterRender(500);
            }, AppComponent.prototype.onDocRendered = function() {
                var _this = this;
                this.isStarting && setTimeout(function() {
                    return _this.isStarting = !1;
                }, 100), this.isTransitioning = !1;
            }, AppComponent.prototype.onDocVersionChange = function(versionIndex) {
                var version = this.docVersions[versionIndex];
                version.url && this.locationService.go(version.url);
            }, AppComponent.prototype.onResize = function(width) {
                this.isSideBySide = width >= this.sideBySideWidth, this.showFloatingToc.next(width > this.showFloatingTocWidth), 
                this.isSideBySide && !this.isSideNavDoc && this.sidenav.toggle(!1);
            }, AppComponent.prototype.onClick = function(eventTarget, button, ctrlKey, metaKey, altKey) {
                if (this.searchElements.some(function(element) {
                    return element.nativeElement.contains(eventTarget);
                }) || this.hideSearchResults(), "FOOTER" === eventTarget.tagName && metaKey && altKey) return this.dtOn = !this.dtOn, 
                !1;
                for (var target = eventTarget; target && !(target instanceof HTMLAnchorElement); ) target = target.parentElement;
                return !(target instanceof HTMLAnchorElement) || this.locationService.handleAnchorClick(target, button, ctrlKey, metaKey);
            }, AppComponent.prototype.setPageId = function(id) {
                this.pageId = "index" === id ? "home" : id.replace("/", "-");
            }, AppComponent.prototype.setFolderId = function(id) {
                this.folderId = "index" === id ? "home" : id.split("/", 1)[0];
            }, AppComponent.prototype.notificationDismissed = function() {
                var _this = this;
                this.notificationAnimating = !0, setTimeout(function() {
                    return _this.notificationAnimating = !1;
                }, 250), this.updateHostClasses();
            }, AppComponent.prototype.updateHostClasses = function() {
                var mode = "mode-" + this.deployment.mode, sideNavOpen = "sidenav-" + (this.sidenav.opened ? "open" : "closed"), pageClass = "page-" + this.pageId, folderClass = "folder-" + this.folderId, viewClasses = Object.keys(this.currentNodes).map(function(view) {
                    return "view-" + view;
                }).join(" ");
                this.hostClasses = [ mode, sideNavOpen, pageClass, folderClass, viewClasses, "aio-notification-" + this.notification.showNotification, this.notificationAnimating ? "aio-notification-animating" : "" ].join(" ");
            }, AppComponent.prototype.updateShell = function() {
                this.updateSideNav(), this.setPageId(this.currentDocument.id), this.setFolderId(this.currentDocument.id), 
                this.updateHostClasses();
            }, AppComponent.prototype.updateSideNav = function() {
                var openSideNav = this.sidenav.opened, isSideNavDoc = !!this.currentNodes.SideNav;
                this.isSideNavDoc !== isSideNavDoc && (openSideNav = this.isSideNavDoc = isSideNavDoc), 
                this.sidenav.toggle(this.isSideBySide && openSideNav);
            }, AppComponent.prototype.onScroll = function() {
                if (!this.tocMaxHeightOffset) {
                    var el = this.hostElement.nativeElement, headerEl = el.querySelector(".app-toolbar"), footerEl = el.querySelector("footer");
                    headerEl && footerEl && (this.tocMaxHeightOffset = headerEl.clientHeight + footerEl.clientHeight + 24);
                }
                this.tocMaxHeight = (document.body.scrollHeight - window.pageYOffset - this.tocMaxHeightOffset).toFixed(2);
            }, AppComponent.prototype.restrainScrolling = function(evt) {
                var elem = evt.currentTarget, scrollTop = elem.scrollTop;
                evt.deltaY < 0 ? scrollTop < 1 && evt.preventDefault() : elem.scrollHeight - elem.clientHeight - scrollTop < 1 && evt.preventDefault();
            }, AppComponent.prototype.hideSearchResults = function() {
                this.showSearchResults = !1;
                var oldSearch = this.locationService.search();
                void 0 !== oldSearch.search && this.locationService.setSearch("", __assign({}, oldSearch, {
                    search: void 0
                }));
            }, AppComponent.prototype.focusSearchBox = function() {
                this.searchBox && this.searchBox.focus();
            }, AppComponent.prototype.doSearch = function(query) {
                this.searchResults = this.searchService.search(query), this.showSearchResults = !!query;
            }, AppComponent.prototype.onKeyUp = function(key, keyCode) {
                "/" !== key && 191 !== keyCode || this.focusSearchBox(), "Escape" !== key && 27 !== keyCode || this.showSearchResults && (this.hideSearchResults(), 
                this.focusSearchBox());
            }, AppComponent;
        }();
        function fromEvent(target, eventName, options, resultSelector) {
            return isFunction(options) && (resultSelector = options, options = void 0), resultSelector ? fromEvent(target, eventName, options).pipe(map_map(function(args) {
                return isArray(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
            })) : new Observable_Observable(function(subscriber) {
                !function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
                    var unsubscribe;
                    if (function(sourceObj) {
                        return sourceObj && "function" == typeof sourceObj.addEventListener && "function" == typeof sourceObj.removeEventListener;
                    }(sourceObj)) {
                        var source_1 = sourceObj;
                        sourceObj.addEventListener(eventName, handler, options), unsubscribe = function() {
                            return source_1.removeEventListener(eventName, handler, options);
                        };
                    } else if (function(sourceObj) {
                        return sourceObj && "function" == typeof sourceObj.on && "function" == typeof sourceObj.off;
                    }(sourceObj)) {
                        var source_2 = sourceObj;
                        sourceObj.on(eventName, handler), unsubscribe = function() {
                            return source_2.off(eventName, handler);
                        };
                    } else if (function(sourceObj) {
                        return sourceObj && "function" == typeof sourceObj.addListener && "function" == typeof sourceObj.removeListener;
                    }(sourceObj)) {
                        var source_3 = sourceObj;
                        sourceObj.addListener(eventName, handler), unsubscribe = function() {
                            return source_3.removeListener(eventName, handler);
                        };
                    } else {
                        if (!sourceObj || !sourceObj.length) throw new TypeError("Invalid event target");
                        for (var i = 0, len = sourceObj.length; i < len; i++) setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
                    }
                    subscriber.add(unsubscribe);
                }(target, eventName, function(e) {
                    subscriber.next(arguments.length > 1 ? Array.prototype.slice.call(arguments) : e);
                }, subscriber, options);
            });
        }
        var _MatProgressBarMixinBase = mixinColor(function() {
            return function(_elementRef) {
                this._elementRef = _elementRef;
            };
        }(), "primary"), MAT_PROGRESS_BAR_LOCATION = new InjectionToken("mat-progress-bar-location", {
            providedIn: "root",
            factory: function() {
                var _document = inject(DOCUMENT);
                return {
                    pathname: _document && _document.location && _document.location.pathname || ""
                };
            }
        }), progressbarId = 0, progress_bar_es5_MatProgressBar = function(_super) {
            function MatProgressBar(_elementRef, _ngZone, _animationMode, location) {
                var _this = _super.call(this, _elementRef) || this;
                _this._elementRef = _elementRef, _this._ngZone = _ngZone, _this._animationMode = _animationMode, 
                _this._isNoopAnimation = !1, _this._value = 0, _this._bufferValue = 0, _this.animationEnd = new core_EventEmitter(), 
                _this._animationEndSubscription = Subscription_Subscription.EMPTY, _this.mode = "determinate", 
                _this.progressbarId = "mat-progress-bar-" + progressbarId++;
                var path = location && location.pathname ? location.pathname.split("#")[0] : "";
                return _this._rectangleFillValue = "url('" + path + "#" + _this.progressbarId + "')", 
                _this._isNoopAnimation = "NoopAnimations" === _animationMode, _this;
            }
            return __extends(MatProgressBar, _super), Object.defineProperty(MatProgressBar.prototype, "value", {
                get: function() {
                    return this._value;
                },
                set: function(v) {
                    this._value = clamp(v || 0), this._isNoopAnimation && this.emitAnimationEnd();
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatProgressBar.prototype, "bufferValue", {
                get: function() {
                    return this._bufferValue;
                },
                set: function(v) {
                    this._bufferValue = clamp(v || 0);
                },
                enumerable: !0,
                configurable: !0
            }), MatProgressBar.prototype._primaryTransform = function() {
                return {
                    transform: "scaleX(" + this.value / 100 + ")"
                };
            }, MatProgressBar.prototype._bufferTransform = function() {
                if ("buffer" === this.mode) return {
                    transform: "scaleX(" + this.bufferValue / 100 + ")"
                };
            }, MatProgressBar.prototype.ngAfterViewInit = function() {
                var _this = this;
                this._isNoopAnimation || this._ngZone.runOutsideAngular(function() {
                    _this._animationEndSubscription = fromEvent(_this._primaryValueBar.nativeElement, "transitionend").pipe(filter(function(e) {
                        return e.target === _this._primaryValueBar.nativeElement;
                    })).subscribe(function(_) {
                        return _this._ngZone.run(function() {
                            return _this.emitAnimationEnd();
                        });
                    });
                });
            }, MatProgressBar.prototype.ngOnDestroy = function() {
                this._animationEndSubscription.unsubscribe();
            }, MatProgressBar.prototype.emitAnimationEnd = function() {
                "determinate" !== this.mode && "buffer" !== this.mode || this.animationEnd.next({
                    value: this.value
                });
            }, MatProgressBar;
        }(_MatProgressBarMixinBase);
        function clamp(v, min, max) {
            return void 0 === min && (min = 0), void 0 === max && (max = 100), Math.max(min, Math.min(max, v));
        }
        var MatProgressBarModule = function() {
            return function() {};
        }(), DIR_DOCUMENT = new InjectionToken("cdk-dir-doc", {
            providedIn: "root",
            factory: function() {
                return inject(DOCUMENT);
            }
        }), bidi_es5_Directionality = function() {
            function Directionality(_document) {
                if (this.value = "ltr", this.change = new core_EventEmitter(), _document) {
                    var value = (_document.body ? _document.body.dir : null) || (_document.documentElement ? _document.documentElement.dir : null);
                    this.value = "ltr" === value || "rtl" === value ? value : "ltr";
                }
            }
            return Directionality.prototype.ngOnDestroy = function() {
                this.change.complete();
            }, Directionality.ngInjectableDef = defineInjectable({
                factory: function() {
                    return new Directionality(inject(DIR_DOCUMENT, 8));
                },
                token: Directionality,
                providedIn: "root"
            }), Directionality;
        }(), BidiModule = function() {
            return function() {};
        }(), AnimationBuilder = function() {
            return function() {};
        }(), AnimationFactory = function() {
            return function() {};
        }(), AUTO_STYLE = "*";
        function sequence(steps, options) {
            return void 0 === options && (options = null), {
                type: 2,
                steps: steps,
                options: options
            };
        }
        function animations_style(tokens) {
            return {
                type: 6,
                styles: tokens,
                offset: null
            };
        }
        function animations_scheduleMicroTask(cb) {
            Promise.resolve(null).then(cb);
        }
        var NoopAnimationPlayer = function() {
            function NoopAnimationPlayer(duration, delay) {
                void 0 === duration && (duration = 0), void 0 === delay && (delay = 0), this._onDoneFns = [], 
                this._onStartFns = [], this._onDestroyFns = [], this._started = !1, this._destroyed = !1, 
                this._finished = !1, this.parentPlayer = null, this.totalTime = duration + delay;
            }
            return NoopAnimationPlayer.prototype._onFinish = function() {
                this._finished || (this._finished = !0, this._onDoneFns.forEach(function(fn) {
                    return fn();
                }), this._onDoneFns = []);
            }, NoopAnimationPlayer.prototype.onStart = function(fn) {
                this._onStartFns.push(fn);
            }, NoopAnimationPlayer.prototype.onDone = function(fn) {
                this._onDoneFns.push(fn);
            }, NoopAnimationPlayer.prototype.onDestroy = function(fn) {
                this._onDestroyFns.push(fn);
            }, NoopAnimationPlayer.prototype.hasStarted = function() {
                return this._started;
            }, NoopAnimationPlayer.prototype.init = function() {}, NoopAnimationPlayer.prototype.play = function() {
                this.hasStarted() || (this._onStart(), this.triggerMicrotask()), this._started = !0;
            }, NoopAnimationPlayer.prototype.triggerMicrotask = function() {
                var _this = this;
                animations_scheduleMicroTask(function() {
                    return _this._onFinish();
                });
            }, NoopAnimationPlayer.prototype._onStart = function() {
                this._onStartFns.forEach(function(fn) {
                    return fn();
                }), this._onStartFns = [];
            }, NoopAnimationPlayer.prototype.pause = function() {}, NoopAnimationPlayer.prototype.restart = function() {}, 
            NoopAnimationPlayer.prototype.finish = function() {
                this._onFinish();
            }, NoopAnimationPlayer.prototype.destroy = function() {
                this._destroyed || (this._destroyed = !0, this.hasStarted() || this._onStart(), 
                this.finish(), this._onDestroyFns.forEach(function(fn) {
                    return fn();
                }), this._onDestroyFns = []);
            }, NoopAnimationPlayer.prototype.reset = function() {}, NoopAnimationPlayer.prototype.setPosition = function(position) {}, 
            NoopAnimationPlayer.prototype.getPosition = function() {
                return 0;
            }, NoopAnimationPlayer.prototype.triggerCallback = function(phaseName) {
                var methods = "start" == phaseName ? this._onStartFns : this._onDoneFns;
                methods.forEach(function(fn) {
                    return fn();
                }), methods.length = 0;
            }, NoopAnimationPlayer;
        }(), AnimationGroupPlayer = function() {
            function AnimationGroupPlayer(_players) {
                var _this = this;
                this._onDoneFns = [], this._onStartFns = [], this._finished = !1, this._started = !1, 
                this._destroyed = !1, this._onDestroyFns = [], this.parentPlayer = null, this.totalTime = 0, 
                this.players = _players;
                var doneCount = 0, destroyCount = 0, startCount = 0, total = this.players.length;
                0 == total ? animations_scheduleMicroTask(function() {
                    return _this._onFinish();
                }) : this.players.forEach(function(player) {
                    player.onDone(function() {
                        ++doneCount == total && _this._onFinish();
                    }), player.onDestroy(function() {
                        ++destroyCount == total && _this._onDestroy();
                    }), player.onStart(function() {
                        ++startCount == total && _this._onStart();
                    });
                }), this.totalTime = this.players.reduce(function(time, player) {
                    return Math.max(time, player.totalTime);
                }, 0);
            }
            return AnimationGroupPlayer.prototype._onFinish = function() {
                this._finished || (this._finished = !0, this._onDoneFns.forEach(function(fn) {
                    return fn();
                }), this._onDoneFns = []);
            }, AnimationGroupPlayer.prototype.init = function() {
                this.players.forEach(function(player) {
                    return player.init();
                });
            }, AnimationGroupPlayer.prototype.onStart = function(fn) {
                this._onStartFns.push(fn);
            }, AnimationGroupPlayer.prototype._onStart = function() {
                this.hasStarted() || (this._started = !0, this._onStartFns.forEach(function(fn) {
                    return fn();
                }), this._onStartFns = []);
            }, AnimationGroupPlayer.prototype.onDone = function(fn) {
                this._onDoneFns.push(fn);
            }, AnimationGroupPlayer.prototype.onDestroy = function(fn) {
                this._onDestroyFns.push(fn);
            }, AnimationGroupPlayer.prototype.hasStarted = function() {
                return this._started;
            }, AnimationGroupPlayer.prototype.play = function() {
                this.parentPlayer || this.init(), this._onStart(), this.players.forEach(function(player) {
                    return player.play();
                });
            }, AnimationGroupPlayer.prototype.pause = function() {
                this.players.forEach(function(player) {
                    return player.pause();
                });
            }, AnimationGroupPlayer.prototype.restart = function() {
                this.players.forEach(function(player) {
                    return player.restart();
                });
            }, AnimationGroupPlayer.prototype.finish = function() {
                this._onFinish(), this.players.forEach(function(player) {
                    return player.finish();
                });
            }, AnimationGroupPlayer.prototype.destroy = function() {
                this._onDestroy();
            }, AnimationGroupPlayer.prototype._onDestroy = function() {
                this._destroyed || (this._destroyed = !0, this._onFinish(), this.players.forEach(function(player) {
                    return player.destroy();
                }), this._onDestroyFns.forEach(function(fn) {
                    return fn();
                }), this._onDestroyFns = []);
            }, AnimationGroupPlayer.prototype.reset = function() {
                this.players.forEach(function(player) {
                    return player.reset();
                }), this._destroyed = !1, this._finished = !1, this._started = !1;
            }, AnimationGroupPlayer.prototype.setPosition = function(p) {
                var timeAtPosition = p * this.totalTime;
                this.players.forEach(function(player) {
                    var position = player.totalTime ? Math.min(1, timeAtPosition / player.totalTime) : 1;
                    player.setPosition(position);
                });
            }, AnimationGroupPlayer.prototype.getPosition = function() {
                var min = 0;
                return this.players.forEach(function(player) {
                    var p = player.getPosition();
                    min = Math.min(p, min);
                }), min;
            }, AnimationGroupPlayer.prototype.beforeDestroy = function() {
                this.players.forEach(function(player) {
                    player.beforeDestroy && player.beforeDestroy();
                });
            }, AnimationGroupPlayer.prototype.triggerCallback = function(phaseName) {
                var methods = "start" == phaseName ? this._onStartFns : this._onDoneFns;
                methods.forEach(function(fn) {
                    return fn();
                }), methods.length = 0;
            }, AnimationGroupPlayer;
        }(), \u0275PRE_STYLE = "!";
        function isNode() {
            return "undefined" != typeof process;
        }
        function optimizeGroupPlayer(players) {
            switch (players.length) {
              case 0:
                return new NoopAnimationPlayer();

              case 1:
                return players[0];

              default:
                return new AnimationGroupPlayer(players);
            }
        }
        function normalizeKeyframes(driver, normalizer, element, keyframes, preStyles, postStyles) {
            void 0 === preStyles && (preStyles = {}), void 0 === postStyles && (postStyles = {});
            var errors = [], normalizedKeyframes = [], previousOffset = -1, previousKeyframe = null;
            if (keyframes.forEach(function(kf) {
                var offset = kf.offset, isSameOffset = offset == previousOffset, normalizedKeyframe = isSameOffset && previousKeyframe || {};
                Object.keys(kf).forEach(function(prop) {
                    var normalizedProp = prop, normalizedValue = kf[prop];
                    if ("offset" !== prop) switch (normalizedProp = normalizer.normalizePropertyName(normalizedProp, errors), 
                    normalizedValue) {
                      case \u0275PRE_STYLE:
                        normalizedValue = preStyles[prop];
                        break;

                      case AUTO_STYLE:
                        normalizedValue = postStyles[prop];
                        break;

                      default:
                        normalizedValue = normalizer.normalizeStyleValue(prop, normalizedProp, normalizedValue, errors);
                    }
                    normalizedKeyframe[normalizedProp] = normalizedValue;
                }), isSameOffset || normalizedKeyframes.push(normalizedKeyframe), previousKeyframe = normalizedKeyframe, 
                previousOffset = offset;
            }), errors.length) throw new Error("Unable to animate due to the following errors:\n - " + errors.join("\n - "));
            return normalizedKeyframes;
        }
        function listenOnPlayer(player, eventName, event, callback) {
            switch (eventName) {
              case "start":
                player.onStart(function() {
                    return callback(event && copyAnimationEvent(event, "start", player));
                });
                break;

              case "done":
                player.onDone(function() {
                    return callback(event && copyAnimationEvent(event, "done", player));
                });
                break;

              case "destroy":
                player.onDestroy(function() {
                    return callback(event && copyAnimationEvent(event, "destroy", player));
                });
            }
        }
        function copyAnimationEvent(e, phaseName, player) {
            var totalTime = player.totalTime, event = makeAnimationEvent(e.element, e.triggerName, e.fromState, e.toState, phaseName || e.phaseName, null == totalTime ? e.totalTime : totalTime, !!player.disabled), data = e._data;
            return null != data && (event._data = data), event;
        }
        function makeAnimationEvent(element, triggerName, fromState, toState, phaseName, totalTime, disabled) {
            return void 0 === phaseName && (phaseName = ""), void 0 === totalTime && (totalTime = 0), 
            {
                element: element,
                triggerName: triggerName,
                fromState: fromState,
                toState: toState,
                phaseName: phaseName,
                totalTime: totalTime,
                disabled: !!disabled
            };
        }
        function getOrSetAsInMap(map, key, defaultValue) {
            var value;
            return map instanceof Map ? (value = map.get(key)) || map.set(key, value = defaultValue) : (value = map[key]) || (value = map[key] = defaultValue), 
            value;
        }
        function parseTimelineCommand(command) {
            var separatorPos = command.indexOf(":");
            return [ command.substring(1, separatorPos), command.substr(separatorPos + 1) ];
        }
        var _contains = function(elm1, elm2) {
            return !1;
        }, _matches = function(element, selector) {
            return !1;
        }, _query = function(element, selector, multi) {
            return [];
        }, _isNode = isNode();
        if (_isNode || "undefined" != typeof Element) {
            if (_contains = function(elm1, elm2) {
                return elm1.contains(elm2);
            }, _isNode || Element.prototype.matches) _matches = function(element, selector) {
                return element.matches(selector);
            }; else {
                var proto = Element.prototype, fn_1 = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
                fn_1 && (_matches = function(element, selector) {
                    return fn_1.apply(element, [ selector ]);
                });
            }
            _query = function(element, selector, multi) {
                var results = [];
                if (multi) results.push.apply(results, __spread(element.querySelectorAll(selector))); else {
                    var elm = element.querySelector(selector);
                    elm && results.push(elm);
                }
                return results;
            };
        }
        var _CACHED_BODY = null, _IS_WEBKIT = !1;
        function validateStyleProperty(prop) {
            _CACHED_BODY || (_CACHED_BODY = ("undefined" != typeof document ? document.body : null) || {}, 
            _IS_WEBKIT = !!_CACHED_BODY.style && "WebkitAppearance" in _CACHED_BODY.style);
            var result = !0;
            return _CACHED_BODY.style && !function(prop) {
                return "ebkit" == prop.substring(1, 6);
            }(prop) && !(result = prop in _CACHED_BODY.style) && _IS_WEBKIT && (result = "Webkit" + prop.charAt(0).toUpperCase() + prop.substr(1) in _CACHED_BODY.style), 
            result;
        }
        var matchesElement = _matches, containsElement = _contains, invokeQuery = _query;
        function hypenatePropsObject(object) {
            var newObj = {};
            return Object.keys(object).forEach(function(prop) {
                var newProp = prop.replace(/([a-z])([A-Z])/g, "$1-$2");
                newObj[newProp] = object[prop];
            }), newObj;
        }
        var browser_NoopAnimationDriver = function() {
            function NoopAnimationDriver() {}
            return NoopAnimationDriver.prototype.validateStyleProperty = function(prop) {
                return validateStyleProperty(prop);
            }, NoopAnimationDriver.prototype.matchesElement = function(element, selector) {
                return matchesElement(element, selector);
            }, NoopAnimationDriver.prototype.containsElement = function(elm1, elm2) {
                return containsElement(elm1, elm2);
            }, NoopAnimationDriver.prototype.query = function(element, selector, multi) {
                return invokeQuery(element, selector, multi);
            }, NoopAnimationDriver.prototype.computeStyle = function(element, prop, defaultValue) {
                return defaultValue || "";
            }, NoopAnimationDriver.prototype.animate = function(element, keyframes, duration, delay, easing, previousPlayers, scrubberAccessRequested) {
                return void 0 === previousPlayers && (previousPlayers = []), new NoopAnimationPlayer(duration, delay);
            }, NoopAnimationDriver;
        }(), AnimationDriver = function() {
            function AnimationDriver() {}
            return AnimationDriver.NOOP = new browser_NoopAnimationDriver(), AnimationDriver;
        }(), ONE_SECOND = 1e3;
        function resolveTimingValue(value) {
            if ("number" == typeof value) return value;
            var matches = value.match(/^(-?[\.\d]+)(m?s)/);
            return !matches || matches.length < 2 ? 0 : _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
        }
        function _convertTimeValueToMS(value, unit) {
            switch (unit) {
              case "s":
                return value * ONE_SECOND;

              default:
                return value;
            }
        }
        function resolveTiming(timings, errors, allowNegativeValues) {
            return timings.hasOwnProperty("duration") ? timings : function(exp, errors, allowNegativeValues) {
                var duration, delay = 0, easing = "";
                if ("string" == typeof exp) {
                    var matches = exp.match(/^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i);
                    if (null === matches) return errors.push('The provided timing value "' + exp + '" is invalid.'), 
                    {
                        duration: 0,
                        delay: 0,
                        easing: ""
                    };
                    duration = _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
                    var delayMatch = matches[3];
                    null != delayMatch && (delay = _convertTimeValueToMS(parseFloat(delayMatch), matches[4]));
                    var easingVal = matches[5];
                    easingVal && (easing = easingVal);
                } else duration = exp;
                if (!allowNegativeValues) {
                    var containsErrors = !1, startIndex = errors.length;
                    duration < 0 && (errors.push("Duration values below 0 are not allowed for this animation step."), 
                    containsErrors = !0), delay < 0 && (errors.push("Delay values below 0 are not allowed for this animation step."), 
                    containsErrors = !0), containsErrors && errors.splice(startIndex, 0, 'The provided timing value "' + exp + '" is invalid.');
                }
                return {
                    duration: duration,
                    delay: delay,
                    easing: easing
                };
            }(timings, errors, allowNegativeValues);
        }
        function copyObj(obj, destination) {
            return void 0 === destination && (destination = {}), Object.keys(obj).forEach(function(prop) {
                destination[prop] = obj[prop];
            }), destination;
        }
        function copyStyles(styles, readPrototype, destination) {
            if (void 0 === destination && (destination = {}), readPrototype) for (var prop in styles) destination[prop] = styles[prop]; else copyObj(styles, destination);
            return destination;
        }
        function getStyleAttributeString(element, key, value) {
            return value ? key + ":" + value + ";" : "";
        }
        function writeStyleAttribute(element) {
            for (var styleAttrValue = "", i = 0; i < element.style.length; i++) styleAttrValue += getStyleAttributeString(0, key = element.style.item(i), element.style.getPropertyValue(key));
            for (var key in element.style) element.style.hasOwnProperty(key) && !key.startsWith("_") && (styleAttrValue += getStyleAttributeString(0, key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), element.style[key]));
            element.setAttribute("style", styleAttrValue);
        }
        function setStyles(element, styles, formerStyles) {
            element.style && (Object.keys(styles).forEach(function(prop) {
                var camelProp = dashCaseToCamelCase(prop);
                formerStyles && !formerStyles.hasOwnProperty(prop) && (formerStyles[prop] = element.style[camelProp]), 
                element.style[camelProp] = styles[prop];
            }), isNode() && writeStyleAttribute(element));
        }
        function eraseStyles(element, styles) {
            element.style && (Object.keys(styles).forEach(function(prop) {
                var camelProp = dashCaseToCamelCase(prop);
                element.style[camelProp] = "";
            }), isNode() && writeStyleAttribute(element));
        }
        function normalizeAnimationEntry(steps) {
            return Array.isArray(steps) ? 1 == steps.length ? steps[0] : sequence(steps) : steps;
        }
        var PARAM_REGEX = new RegExp("{{\\s*(.+?)\\s*}}", "g");
        function extractStyleParams(value) {
            var params = [];
            if ("string" == typeof value) {
                for (var val = value.toString(), match = void 0; match = PARAM_REGEX.exec(val); ) params.push(match[1]);
                PARAM_REGEX.lastIndex = 0;
            }
            return params;
        }
        function interpolateParams(value, params, errors) {
            var original = value.toString(), str = original.replace(PARAM_REGEX, function(_, varName) {
                var localVal = params[varName];
                return params.hasOwnProperty(varName) || (errors.push("Please provide a value for the animation param " + varName), 
                localVal = ""), localVal.toString();
            });
            return str == original ? value : str;
        }
        function iteratorToArray(iterator) {
            for (var arr = [], item = iterator.next(); !item.done; ) arr.push(item.value), item = iterator.next();
            return arr;
        }
        var DASH_CASE_REGEXP = /-+([a-z0-9])/g;
        function dashCaseToCamelCase(input) {
            return input.replace(DASH_CASE_REGEXP, function() {
                for (var m = [], _i = 0; _i < arguments.length; _i++) m[_i] = arguments[_i];
                return m[1].toUpperCase();
            });
        }
        function allowPreviousPlayerStylesMerge(duration, delay) {
            return 0 === duration || 0 === delay;
        }
        function balancePreviousStylesIntoKeyframes(element, keyframes, previousStyles) {
            var previousStyleProps = Object.keys(previousStyles);
            if (previousStyleProps.length && keyframes.length) {
                var startingKeyframe_1 = keyframes[0], missingStyleProps_1 = [];
                if (previousStyleProps.forEach(function(prop) {
                    startingKeyframe_1.hasOwnProperty(prop) || missingStyleProps_1.push(prop), startingKeyframe_1[prop] = previousStyles[prop];
                }), missingStyleProps_1.length) for (var _loop_1 = function() {
                    var kf = keyframes[i];
                    missingStyleProps_1.forEach(function(prop) {
                        kf[prop] = computeStyle(element, prop);
                    });
                }, i = 1; i < keyframes.length; i++) _loop_1();
            }
            return keyframes;
        }
        function visitDslNode(visitor, node, context) {
            switch (node.type) {
              case 7:
                return visitor.visitTrigger(node, context);

              case 0:
                return visitor.visitState(node, context);

              case 1:
                return visitor.visitTransition(node, context);

              case 2:
                return visitor.visitSequence(node, context);

              case 3:
                return visitor.visitGroup(node, context);

              case 4:
                return visitor.visitAnimate(node, context);

              case 5:
                return visitor.visitKeyframes(node, context);

              case 6:
                return visitor.visitStyle(node, context);

              case 8:
                return visitor.visitReference(node, context);

              case 9:
                return visitor.visitAnimateChild(node, context);

              case 10:
                return visitor.visitAnimateRef(node, context);

              case 11:
                return visitor.visitQuery(node, context);

              case 12:
                return visitor.visitStagger(node, context);

              default:
                throw new Error("Unable to resolve animation metadata node #" + node.type);
            }
        }
        function computeStyle(element, prop) {
            return window.getComputedStyle(element)[prop];
        }
        var ANY_STATE = "*", TRUE_BOOLEAN_VALUES = new Set([ "true", "1" ]), FALSE_BOOLEAN_VALUES = new Set([ "false", "0" ]);
        function makeLambdaFromStates(lhs, rhs) {
            var LHS_MATCH_BOOLEAN = TRUE_BOOLEAN_VALUES.has(lhs) || FALSE_BOOLEAN_VALUES.has(lhs), RHS_MATCH_BOOLEAN = TRUE_BOOLEAN_VALUES.has(rhs) || FALSE_BOOLEAN_VALUES.has(rhs);
            return function(fromState, toState) {
                var lhsMatch = lhs == ANY_STATE || lhs == fromState, rhsMatch = rhs == ANY_STATE || rhs == toState;
                return !lhsMatch && LHS_MATCH_BOOLEAN && "boolean" == typeof fromState && (lhsMatch = fromState ? TRUE_BOOLEAN_VALUES.has(lhs) : FALSE_BOOLEAN_VALUES.has(lhs)), 
                !rhsMatch && RHS_MATCH_BOOLEAN && "boolean" == typeof toState && (rhsMatch = toState ? TRUE_BOOLEAN_VALUES.has(rhs) : FALSE_BOOLEAN_VALUES.has(rhs)), 
                lhsMatch && rhsMatch;
            };
        }
        var SELF_TOKEN_REGEX = new RegExp("s*:selfs*,?", "g");
        function buildAnimationAst(driver, metadata, errors) {
            return new browser_AnimationAstBuilderVisitor(driver).build(metadata, errors);
        }
        var browser_AnimationAstBuilderVisitor = function() {
            function AnimationAstBuilderVisitor(_driver) {
                this._driver = _driver;
            }
            return AnimationAstBuilderVisitor.prototype.build = function(metadata, errors) {
                var context = new AnimationAstBuilderContext(errors);
                return this._resetContextStyleTimingState(context), visitDslNode(this, normalizeAnimationEntry(metadata), context);
            }, AnimationAstBuilderVisitor.prototype._resetContextStyleTimingState = function(context) {
                context.currentQuerySelector = "", context.collectedStyles = {}, context.collectedStyles[""] = {}, 
                context.currentTime = 0;
            }, AnimationAstBuilderVisitor.prototype.visitTrigger = function(metadata, context) {
                var _this = this, queryCount = context.queryCount = 0, depCount = context.depCount = 0, states = [], transitions = [];
                return "@" == metadata.name.charAt(0) && context.errors.push("animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"), 
                metadata.definitions.forEach(function(def) {
                    if (_this._resetContextStyleTimingState(context), 0 == def.type) {
                        var stateDef_1 = def, name_1 = stateDef_1.name;
                        name_1.toString().split(/\s*,\s*/).forEach(function(n) {
                            stateDef_1.name = n, states.push(_this.visitState(stateDef_1, context));
                        }), stateDef_1.name = name_1;
                    } else if (1 == def.type) {
                        var transition = _this.visitTransition(def, context);
                        queryCount += transition.queryCount, depCount += transition.depCount, transitions.push(transition);
                    } else context.errors.push("only state() and transition() definitions can sit inside of a trigger()");
                }), {
                    type: 7,
                    name: metadata.name,
                    states: states,
                    transitions: transitions,
                    queryCount: queryCount,
                    depCount: depCount,
                    options: null
                };
            }, AnimationAstBuilderVisitor.prototype.visitState = function(metadata, context) {
                var styleAst = this.visitStyle(metadata.styles, context), astParams = metadata.options && metadata.options.params || null;
                if (styleAst.containsDynamicStyles) {
                    var missingSubs_1 = new Set(), params_1 = astParams || {};
                    if (styleAst.styles.forEach(function(value) {
                        if (browser_isObject(value)) {
                            var stylesObj_1 = value;
                            Object.keys(stylesObj_1).forEach(function(prop) {
                                extractStyleParams(stylesObj_1[prop]).forEach(function(sub) {
                                    params_1.hasOwnProperty(sub) || missingSubs_1.add(sub);
                                });
                            });
                        }
                    }), missingSubs_1.size) {
                        var missingSubsArr = iteratorToArray(missingSubs_1.values());
                        context.errors.push('state("' + metadata.name + '", ...) must define default values for all the following style substitutions: ' + missingSubsArr.join(", "));
                    }
                }
                return {
                    type: 0,
                    name: metadata.name,
                    style: styleAst,
                    options: astParams ? {
                        params: astParams
                    } : null
                };
            }, AnimationAstBuilderVisitor.prototype.visitTransition = function(metadata, context) {
                context.queryCount = 0, context.depCount = 0;
                var transitionValue, errors, expressions, animation = visitDslNode(this, normalizeAnimationEntry(metadata.animation), context);
                return {
                    type: 1,
                    matchers: (transitionValue = metadata.expr, errors = context.errors, expressions = [], 
                    "string" == typeof transitionValue ? transitionValue.split(/\s*,\s*/).forEach(function(str) {
                        return function(eventStr, expressions, errors) {
                            if (":" == eventStr[0]) {
                                var result = function(alias, errors) {
                                    switch (alias) {
                                      case ":enter":
                                        return "void => *";

                                      case ":leave":
                                        return "* => void";

                                      case ":increment":
                                        return function(fromState, toState) {
                                            return parseFloat(toState) > parseFloat(fromState);
                                        };

                                      case ":decrement":
                                        return function(fromState, toState) {
                                            return parseFloat(toState) < parseFloat(fromState);
                                        };

                                      default:
                                        return errors.push('The transition alias value "' + alias + '" is not supported'), 
                                        "* => *";
                                    }
                                }(eventStr, errors);
                                if ("function" == typeof result) return void expressions.push(result);
                                eventStr = result;
                            }
                            var match = eventStr.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                            if (null == match || match.length < 4) return errors.push('The provided transition expression "' + eventStr + '" is not supported'), 
                            expressions;
                            var fromState = match[1], separator = match[2], toState = match[3];
                            expressions.push(makeLambdaFromStates(fromState, toState)), "<" != separator[0] || fromState == ANY_STATE && toState == ANY_STATE || expressions.push(makeLambdaFromStates(toState, fromState));
                        }(str, expressions, errors);
                    }) : expressions.push(transitionValue), expressions),
                    animation: animation,
                    queryCount: context.queryCount,
                    depCount: context.depCount,
                    options: normalizeAnimationOptions(metadata.options)
                };
            }, AnimationAstBuilderVisitor.prototype.visitSequence = function(metadata, context) {
                var _this = this;
                return {
                    type: 2,
                    steps: metadata.steps.map(function(s) {
                        return visitDslNode(_this, s, context);
                    }),
                    options: normalizeAnimationOptions(metadata.options)
                };
            }, AnimationAstBuilderVisitor.prototype.visitGroup = function(metadata, context) {
                var _this = this, currentTime = context.currentTime, furthestTime = 0, steps = metadata.steps.map(function(step) {
                    context.currentTime = currentTime;
                    var innerAst = visitDslNode(_this, step, context);
                    return furthestTime = Math.max(furthestTime, context.currentTime), innerAst;
                });
                return context.currentTime = furthestTime, {
                    type: 3,
                    steps: steps,
                    options: normalizeAnimationOptions(metadata.options)
                };
            }, AnimationAstBuilderVisitor.prototype.visitAnimate = function(metadata, context) {
                var styleAst, timingAst = function(value, errors) {
                    var timings = null;
                    if (value.hasOwnProperty("duration")) timings = value; else if ("number" == typeof value) return makeTimingAst(resolveTiming(value, errors).duration, 0, "");
                    var strValue = value;
                    if (strValue.split(/\s+/).some(function(v) {
                        return "{" == v.charAt(0) && "{" == v.charAt(1);
                    })) {
                        var ast = makeTimingAst(0, 0, "");
                        return ast.dynamic = !0, ast.strValue = strValue, ast;
                    }
                    return makeTimingAst((timings = timings || resolveTiming(strValue, errors)).duration, timings.delay, timings.easing);
                }(metadata.timings, context.errors);
                context.currentAnimateTimings = timingAst;
                var styleMetadata = metadata.styles ? metadata.styles : animations_style({});
                if (5 == styleMetadata.type) styleAst = this.visitKeyframes(styleMetadata, context); else {
                    var styleMetadata_1 = metadata.styles, isEmpty = !1;
                    if (!styleMetadata_1) {
                        isEmpty = !0;
                        var newStyleData = {};
                        timingAst.easing && (newStyleData.easing = timingAst.easing), styleMetadata_1 = animations_style(newStyleData);
                    }
                    context.currentTime += timingAst.duration + timingAst.delay;
                    var _styleAst = this.visitStyle(styleMetadata_1, context);
                    _styleAst.isEmptyStep = isEmpty, styleAst = _styleAst;
                }
                return context.currentAnimateTimings = null, {
                    type: 4,
                    timings: timingAst,
                    style: styleAst,
                    options: null
                };
            }, AnimationAstBuilderVisitor.prototype.visitStyle = function(metadata, context) {
                var ast = this._makeStyleAst(metadata, context);
                return this._validateStyleAst(ast, context), ast;
            }, AnimationAstBuilderVisitor.prototype._makeStyleAst = function(metadata, context) {
                var styles = [];
                Array.isArray(metadata.styles) ? metadata.styles.forEach(function(styleTuple) {
                    "string" == typeof styleTuple ? styleTuple == AUTO_STYLE ? styles.push(styleTuple) : context.errors.push("The provided style string value " + styleTuple + " is not allowed.") : styles.push(styleTuple);
                }) : styles.push(metadata.styles);
                var containsDynamicStyles = !1, collectedEasing = null;
                return styles.forEach(function(styleData) {
                    if (browser_isObject(styleData)) {
                        var styleMap = styleData, easing = styleMap.easing;
                        if (easing && (collectedEasing = easing, delete styleMap.easing), !containsDynamicStyles) for (var prop in styleMap) if (styleMap[prop].toString().indexOf("{{") >= 0) {
                            containsDynamicStyles = !0;
                            break;
                        }
                    }
                }), {
                    type: 6,
                    styles: styles,
                    easing: collectedEasing,
                    offset: metadata.offset,
                    containsDynamicStyles: containsDynamicStyles,
                    options: null
                };
            }, AnimationAstBuilderVisitor.prototype._validateStyleAst = function(ast, context) {
                var _this = this, timings = context.currentAnimateTimings, endTime = context.currentTime, startTime = context.currentTime;
                timings && startTime > 0 && (startTime -= timings.duration + timings.delay), ast.styles.forEach(function(tuple) {
                    "string" != typeof tuple && Object.keys(tuple).forEach(function(prop) {
                        if (_this._driver.validateStyleProperty(prop)) {
                            var errors, params, matches, collectedStyles = context.collectedStyles[context.currentQuerySelector], collectedEntry = collectedStyles[prop], updateCollectedStyle = !0;
                            collectedEntry && (startTime != endTime && startTime >= collectedEntry.startTime && endTime <= collectedEntry.endTime && (context.errors.push('The CSS property "' + prop + '" that exists between the times of "' + collectedEntry.startTime + 'ms" and "' + collectedEntry.endTime + 'ms" is also being animated in a parallel animation between the times of "' + startTime + 'ms" and "' + endTime + 'ms"'), 
                            updateCollectedStyle = !1), startTime = collectedEntry.startTime), updateCollectedStyle && (collectedStyles[prop] = {
                                startTime: startTime,
                                endTime: endTime
                            }), context.options && (errors = context.errors, params = context.options.params || {}, 
                            (matches = extractStyleParams(tuple[prop])).length && matches.forEach(function(varName) {
                                params.hasOwnProperty(varName) || errors.push("Unable to resolve the local animation param " + varName + " in the given list of values");
                            }));
                        } else context.errors.push('The provided animation property "' + prop + '" is not a supported CSS property for animations');
                    });
                });
            }, AnimationAstBuilderVisitor.prototype.visitKeyframes = function(metadata, context) {
                var _this = this, ast = {
                    type: 5,
                    styles: [],
                    options: null
                };
                if (!context.currentAnimateTimings) return context.errors.push("keyframes() must be placed inside of a call to animate()"), 
                ast;
                var totalKeyframesWithOffsets = 0, offsets = [], offsetsOutOfOrder = !1, keyframesOutOfRange = !1, previousOffset = 0, keyframes = metadata.steps.map(function(styles) {
                    var style = _this._makeStyleAst(styles, context), offsetVal = null != style.offset ? style.offset : function(styles) {
                        if ("string" == typeof styles) return null;
                        var offset = null;
                        if (Array.isArray(styles)) styles.forEach(function(styleTuple) {
                            if (browser_isObject(styleTuple) && styleTuple.hasOwnProperty("offset")) {
                                var obj = styleTuple;
                                offset = parseFloat(obj.offset), delete obj.offset;
                            }
                        }); else if (browser_isObject(styles) && styles.hasOwnProperty("offset")) {
                            var obj = styles;
                            offset = parseFloat(obj.offset), delete obj.offset;
                        }
                        return offset;
                    }(style.styles), offset = 0;
                    return null != offsetVal && (totalKeyframesWithOffsets++, offset = style.offset = offsetVal), 
                    keyframesOutOfRange = keyframesOutOfRange || offset < 0 || offset > 1, offsetsOutOfOrder = offsetsOutOfOrder || offset < previousOffset, 
                    previousOffset = offset, offsets.push(offset), style;
                });
                keyframesOutOfRange && context.errors.push("Please ensure that all keyframe offsets are between 0 and 1"), 
                offsetsOutOfOrder && context.errors.push("Please ensure that all keyframe offsets are in order");
                var length = metadata.steps.length, generatedOffset = 0;
                totalKeyframesWithOffsets > 0 && totalKeyframesWithOffsets < length ? context.errors.push("Not all style() steps within the declared keyframes() contain offsets") : 0 == totalKeyframesWithOffsets && (generatedOffset = 1 / (length - 1));
                var limit = length - 1, currentTime = context.currentTime, currentAnimateTimings = context.currentAnimateTimings, animateDuration = currentAnimateTimings.duration;
                return keyframes.forEach(function(kf, i) {
                    var offset = generatedOffset > 0 ? i == limit ? 1 : generatedOffset * i : offsets[i], durationUpToThisFrame = offset * animateDuration;
                    context.currentTime = currentTime + currentAnimateTimings.delay + durationUpToThisFrame, 
                    currentAnimateTimings.duration = durationUpToThisFrame, _this._validateStyleAst(kf, context), 
                    kf.offset = offset, ast.styles.push(kf);
                }), ast;
            }, AnimationAstBuilderVisitor.prototype.visitReference = function(metadata, context) {
                return {
                    type: 8,
                    animation: visitDslNode(this, normalizeAnimationEntry(metadata.animation), context),
                    options: normalizeAnimationOptions(metadata.options)
                };
            }, AnimationAstBuilderVisitor.prototype.visitAnimateChild = function(metadata, context) {
                return context.depCount++, {
                    type: 9,
                    options: normalizeAnimationOptions(metadata.options)
                };
            }, AnimationAstBuilderVisitor.prototype.visitAnimateRef = function(metadata, context) {
                return {
                    type: 10,
                    animation: this.visitReference(metadata.animation, context),
                    options: normalizeAnimationOptions(metadata.options)
                };
            }, AnimationAstBuilderVisitor.prototype.visitQuery = function(metadata, context) {
                var parentSelector = context.currentQuerySelector, options = metadata.options || {};
                context.queryCount++, context.currentQuery = metadata;
                var _a = __read(function(selector) {
                    var hasAmpersand = !!selector.split(/\s*,\s*/).find(function(token) {
                        return ":self" == token;
                    });
                    return hasAmpersand && (selector = selector.replace(SELF_TOKEN_REGEX, "")), [ selector = selector.replace(/@\*/g, ".ng-trigger").replace(/@\w+/g, function(match) {
                        return ".ng-trigger-" + match.substr(1);
                    }).replace(/:animating/g, ".ng-animating"), hasAmpersand ];
                }(metadata.selector), 2), selector = _a[0], includeSelf = _a[1];
                context.currentQuerySelector = parentSelector.length ? parentSelector + " " + selector : selector, 
                getOrSetAsInMap(context.collectedStyles, context.currentQuerySelector, {});
                var animation = visitDslNode(this, normalizeAnimationEntry(metadata.animation), context);
                return context.currentQuery = null, context.currentQuerySelector = parentSelector, 
                {
                    type: 11,
                    selector: selector,
                    limit: options.limit || 0,
                    optional: !!options.optional,
                    includeSelf: includeSelf,
                    animation: animation,
                    originalSelector: metadata.selector,
                    options: normalizeAnimationOptions(metadata.options)
                };
            }, AnimationAstBuilderVisitor.prototype.visitStagger = function(metadata, context) {
                context.currentQuery || context.errors.push("stagger() can only be used inside of query()");
                var timings = "full" === metadata.timings ? {
                    duration: 0,
                    delay: 0,
                    easing: "full"
                } : resolveTiming(metadata.timings, context.errors, !0);
                return {
                    type: 12,
                    animation: visitDslNode(this, normalizeAnimationEntry(metadata.animation), context),
                    timings: timings,
                    options: null
                };
            }, AnimationAstBuilderVisitor;
        }(), AnimationAstBuilderContext = function() {
            return function(errors) {
                this.errors = errors, this.queryCount = 0, this.depCount = 0, this.currentTransition = null, 
                this.currentQuery = null, this.currentQuerySelector = null, this.currentAnimateTimings = null, 
                this.currentTime = 0, this.collectedStyles = {}, this.options = null;
            };
        }();
        function browser_isObject(value) {
            return !Array.isArray(value) && "object" == typeof value;
        }
        function normalizeAnimationOptions(options) {
            var obj;
            return options ? (options = copyObj(options)).params && (options.params = (obj = options.params) ? copyObj(obj) : null) : options = {}, 
            options;
        }
        function makeTimingAst(duration, delay, easing) {
            return {
                duration: duration,
                delay: delay,
                easing: easing
            };
        }
        function createTimelineInstruction(element, keyframes, preStyleProps, postStyleProps, duration, delay, easing, subTimeline) {
            return void 0 === easing && (easing = null), void 0 === subTimeline && (subTimeline = !1), 
            {
                type: 1,
                element: element,
                keyframes: keyframes,
                preStyleProps: preStyleProps,
                postStyleProps: postStyleProps,
                duration: duration,
                delay: delay,
                totalTime: duration + delay,
                easing: easing,
                subTimeline: subTimeline
            };
        }
        var browser_ElementInstructionMap = function() {
            function ElementInstructionMap() {
                this._map = new Map();
            }
            return ElementInstructionMap.prototype.consume = function(element) {
                var instructions = this._map.get(element);
                return instructions ? this._map.delete(element) : instructions = [], instructions;
            }, ElementInstructionMap.prototype.append = function(element, instructions) {
                var existingInstructions = this._map.get(element);
                existingInstructions || this._map.set(element, existingInstructions = []), existingInstructions.push.apply(existingInstructions, __spread(instructions));
            }, ElementInstructionMap.prototype.has = function(element) {
                return this._map.has(element);
            }, ElementInstructionMap.prototype.clear = function() {
                this._map.clear();
            }, ElementInstructionMap;
        }(), ENTER_TOKEN_REGEX = new RegExp(":enter", "g"), LEAVE_TOKEN_REGEX = new RegExp(":leave", "g");
        function buildAnimationTimelines(driver, rootElement, ast, enterClassName, leaveClassName, startingStyles, finalStyles, options, subInstructions, errors) {
            return void 0 === startingStyles && (startingStyles = {}), void 0 === finalStyles && (finalStyles = {}), 
            void 0 === errors && (errors = []), new AnimationTimelineBuilderVisitor().buildKeyframes(driver, rootElement, ast, enterClassName, leaveClassName, startingStyles, finalStyles, options, subInstructions, errors);
        }
        var AnimationTimelineBuilderVisitor = function() {
            function AnimationTimelineBuilderVisitor() {}
            return AnimationTimelineBuilderVisitor.prototype.buildKeyframes = function(driver, rootElement, ast, enterClassName, leaveClassName, startingStyles, finalStyles, options, subInstructions, errors) {
                void 0 === errors && (errors = []), subInstructions = subInstructions || new browser_ElementInstructionMap();
                var context = new browser_AnimationTimelineContext(driver, rootElement, subInstructions, enterClassName, leaveClassName, errors, []);
                context.options = options, context.currentTimeline.setStyles([ startingStyles ], null, context.errors, options), 
                visitDslNode(this, ast, context);
                var timelines = context.timelines.filter(function(timeline) {
                    return timeline.containsAnimation();
                });
                if (timelines.length && Object.keys(finalStyles).length) {
                    var tl = timelines[timelines.length - 1];
                    tl.allowOnlyTimelineStyles() || tl.setStyles([ finalStyles ], null, context.errors, options);
                }
                return timelines.length ? timelines.map(function(timeline) {
                    return timeline.buildKeyframes();
                }) : [ createTimelineInstruction(rootElement, [], [], [], 0, 0, "", !1) ];
            }, AnimationTimelineBuilderVisitor.prototype.visitTrigger = function(ast, context) {}, 
            AnimationTimelineBuilderVisitor.prototype.visitState = function(ast, context) {}, 
            AnimationTimelineBuilderVisitor.prototype.visitTransition = function(ast, context) {}, 
            AnimationTimelineBuilderVisitor.prototype.visitAnimateChild = function(ast, context) {
                var elementInstructions = context.subInstructions.consume(context.element);
                if (elementInstructions) {
                    var innerContext = context.createSubContext(ast.options), startTime = context.currentTimeline.currentTime, endTime = this._visitSubInstructions(elementInstructions, innerContext, innerContext.options);
                    startTime != endTime && context.transformIntoNewTimeline(endTime);
                }
                context.previousNode = ast;
            }, AnimationTimelineBuilderVisitor.prototype.visitAnimateRef = function(ast, context) {
                var innerContext = context.createSubContext(ast.options);
                innerContext.transformIntoNewTimeline(), this.visitReference(ast.animation, innerContext), 
                context.transformIntoNewTimeline(innerContext.currentTimeline.currentTime), context.previousNode = ast;
            }, AnimationTimelineBuilderVisitor.prototype._visitSubInstructions = function(instructions, context, options) {
                var furthestTime = context.currentTimeline.currentTime, duration = null != options.duration ? resolveTimingValue(options.duration) : null, delay = null != options.delay ? resolveTimingValue(options.delay) : null;
                return 0 !== duration && instructions.forEach(function(instruction) {
                    var instructionTimings = context.appendInstructionToTimeline(instruction, duration, delay);
                    furthestTime = Math.max(furthestTime, instructionTimings.duration + instructionTimings.delay);
                }), furthestTime;
            }, AnimationTimelineBuilderVisitor.prototype.visitReference = function(ast, context) {
                context.updateOptions(ast.options, !0), visitDslNode(this, ast.animation, context), 
                context.previousNode = ast;
            }, AnimationTimelineBuilderVisitor.prototype.visitSequence = function(ast, context) {
                var _this = this, subContextCount = context.subContextCount, ctx = context, options = ast.options;
                if (options && (options.params || options.delay) && ((ctx = context.createSubContext(options)).transformIntoNewTimeline(), 
                null != options.delay)) {
                    6 == ctx.previousNode.type && (ctx.currentTimeline.snapshotCurrentStyles(), ctx.previousNode = DEFAULT_NOOP_PREVIOUS_NODE);
                    var delay = resolveTimingValue(options.delay);
                    ctx.delayNextStep(delay);
                }
                ast.steps.length && (ast.steps.forEach(function(s) {
                    return visitDslNode(_this, s, ctx);
                }), ctx.currentTimeline.applyStylesToKeyframe(), ctx.subContextCount > subContextCount && ctx.transformIntoNewTimeline()), 
                context.previousNode = ast;
            }, AnimationTimelineBuilderVisitor.prototype.visitGroup = function(ast, context) {
                var _this = this, innerTimelines = [], furthestTime = context.currentTimeline.currentTime, delay = ast.options && ast.options.delay ? resolveTimingValue(ast.options.delay) : 0;
                ast.steps.forEach(function(s) {
                    var innerContext = context.createSubContext(ast.options);
                    delay && innerContext.delayNextStep(delay), visitDslNode(_this, s, innerContext), 
                    furthestTime = Math.max(furthestTime, innerContext.currentTimeline.currentTime), 
                    innerTimelines.push(innerContext.currentTimeline);
                }), innerTimelines.forEach(function(timeline) {
                    return context.currentTimeline.mergeTimelineCollectedStyles(timeline);
                }), context.transformIntoNewTimeline(furthestTime), context.previousNode = ast;
            }, AnimationTimelineBuilderVisitor.prototype._visitTiming = function(ast, context) {
                if (ast.dynamic) {
                    var strValue = ast.strValue;
                    return resolveTiming(context.params ? interpolateParams(strValue, context.params, context.errors) : strValue, context.errors);
                }
                return {
                    duration: ast.duration,
                    delay: ast.delay,
                    easing: ast.easing
                };
            }, AnimationTimelineBuilderVisitor.prototype.visitAnimate = function(ast, context) {
                var timings = context.currentAnimateTimings = this._visitTiming(ast.timings, context), timeline = context.currentTimeline;
                timings.delay && (context.incrementTime(timings.delay), timeline.snapshotCurrentStyles());
                var style = ast.style;
                5 == style.type ? this.visitKeyframes(style, context) : (context.incrementTime(timings.duration), 
                this.visitStyle(style, context), timeline.applyStylesToKeyframe()), context.currentAnimateTimings = null, 
                context.previousNode = ast;
            }, AnimationTimelineBuilderVisitor.prototype.visitStyle = function(ast, context) {
                var timeline = context.currentTimeline, timings = context.currentAnimateTimings;
                !timings && timeline.getCurrentStyleProperties().length && timeline.forwardFrame();
                var easing = timings && timings.easing || ast.easing;
                ast.isEmptyStep ? timeline.applyEmptyStep(easing) : timeline.setStyles(ast.styles, easing, context.errors, context.options), 
                context.previousNode = ast;
            }, AnimationTimelineBuilderVisitor.prototype.visitKeyframes = function(ast, context) {
                var currentAnimateTimings = context.currentAnimateTimings, startTime = context.currentTimeline.duration, duration = currentAnimateTimings.duration, innerTimeline = context.createSubContext().currentTimeline;
                innerTimeline.easing = currentAnimateTimings.easing, ast.styles.forEach(function(step) {
                    innerTimeline.forwardTime((step.offset || 0) * duration), innerTimeline.setStyles(step.styles, step.easing, context.errors, context.options), 
                    innerTimeline.applyStylesToKeyframe();
                }), context.currentTimeline.mergeTimelineCollectedStyles(innerTimeline), context.transformIntoNewTimeline(startTime + duration), 
                context.previousNode = ast;
            }, AnimationTimelineBuilderVisitor.prototype.visitQuery = function(ast, context) {
                var _this = this, startTime = context.currentTimeline.currentTime, options = ast.options || {}, delay = options.delay ? resolveTimingValue(options.delay) : 0;
                delay && (6 === context.previousNode.type || 0 == startTime && context.currentTimeline.getCurrentStyleProperties().length) && (context.currentTimeline.snapshotCurrentStyles(), 
                context.previousNode = DEFAULT_NOOP_PREVIOUS_NODE);
                var furthestTime = startTime, elms = context.invokeQuery(ast.selector, ast.originalSelector, ast.limit, ast.includeSelf, !!options.optional, context.errors);
                context.currentQueryTotal = elms.length;
                var sameElementTimeline = null;
                elms.forEach(function(element, i) {
                    context.currentQueryIndex = i;
                    var innerContext = context.createSubContext(ast.options, element);
                    delay && innerContext.delayNextStep(delay), element === context.element && (sameElementTimeline = innerContext.currentTimeline), 
                    visitDslNode(_this, ast.animation, innerContext), innerContext.currentTimeline.applyStylesToKeyframe(), 
                    furthestTime = Math.max(furthestTime, innerContext.currentTimeline.currentTime);
                }), context.currentQueryIndex = 0, context.currentQueryTotal = 0, context.transformIntoNewTimeline(furthestTime), 
                sameElementTimeline && (context.currentTimeline.mergeTimelineCollectedStyles(sameElementTimeline), 
                context.currentTimeline.snapshotCurrentStyles()), context.previousNode = ast;
            }, AnimationTimelineBuilderVisitor.prototype.visitStagger = function(ast, context) {
                var parentContext = context.parentContext, tl = context.currentTimeline, timings = ast.timings, duration = Math.abs(timings.duration), maxTime = duration * (context.currentQueryTotal - 1), delay = duration * context.currentQueryIndex;
                switch (timings.duration < 0 ? "reverse" : timings.easing) {
                  case "reverse":
                    delay = maxTime - delay;
                    break;

                  case "full":
                    delay = parentContext.currentStaggerTime;
                }
                var timeline = context.currentTimeline;
                delay && timeline.delayNextStep(delay);
                var startingTime = timeline.currentTime;
                visitDslNode(this, ast.animation, context), context.previousNode = ast, parentContext.currentStaggerTime = tl.currentTime - startingTime + (tl.startTime - parentContext.currentTimeline.startTime);
            }, AnimationTimelineBuilderVisitor;
        }(), DEFAULT_NOOP_PREVIOUS_NODE = {}, browser_AnimationTimelineContext = function() {
            function AnimationTimelineContext(_driver, element, subInstructions, _enterClassName, _leaveClassName, errors, timelines, initialTimeline) {
                this._driver = _driver, this.element = element, this.subInstructions = subInstructions, 
                this._enterClassName = _enterClassName, this._leaveClassName = _leaveClassName, 
                this.errors = errors, this.timelines = timelines, this.parentContext = null, this.currentAnimateTimings = null, 
                this.previousNode = DEFAULT_NOOP_PREVIOUS_NODE, this.subContextCount = 0, this.options = {}, 
                this.currentQueryIndex = 0, this.currentQueryTotal = 0, this.currentStaggerTime = 0, 
                this.currentTimeline = initialTimeline || new browser_TimelineBuilder(this._driver, element, 0), 
                timelines.push(this.currentTimeline);
            }
            return Object.defineProperty(AnimationTimelineContext.prototype, "params", {
                get: function() {
                    return this.options.params;
                },
                enumerable: !0,
                configurable: !0
            }), AnimationTimelineContext.prototype.updateOptions = function(options, skipIfExists) {
                var _this = this;
                if (options) {
                    var newOptions = options, optionsToUpdate = this.options;
                    null != newOptions.duration && (optionsToUpdate.duration = resolveTimingValue(newOptions.duration)), 
                    null != newOptions.delay && (optionsToUpdate.delay = resolveTimingValue(newOptions.delay));
                    var newParams = newOptions.params;
                    if (newParams) {
                        var paramsToUpdate_1 = optionsToUpdate.params;
                        paramsToUpdate_1 || (paramsToUpdate_1 = this.options.params = {}), Object.keys(newParams).forEach(function(name) {
                            skipIfExists && paramsToUpdate_1.hasOwnProperty(name) || (paramsToUpdate_1[name] = interpolateParams(newParams[name], paramsToUpdate_1, _this.errors));
                        });
                    }
                }
            }, AnimationTimelineContext.prototype._copyOptions = function() {
                var options = {};
                if (this.options) {
                    var oldParams_1 = this.options.params;
                    if (oldParams_1) {
                        var params_1 = options.params = {};
                        Object.keys(oldParams_1).forEach(function(name) {
                            params_1[name] = oldParams_1[name];
                        });
                    }
                }
                return options;
            }, AnimationTimelineContext.prototype.createSubContext = function(options, element, newTime) {
                void 0 === options && (options = null);
                var target = element || this.element, context = new AnimationTimelineContext(this._driver, target, this.subInstructions, this._enterClassName, this._leaveClassName, this.errors, this.timelines, this.currentTimeline.fork(target, newTime || 0));
                return context.previousNode = this.previousNode, context.currentAnimateTimings = this.currentAnimateTimings, 
                context.options = this._copyOptions(), context.updateOptions(options), context.currentQueryIndex = this.currentQueryIndex, 
                context.currentQueryTotal = this.currentQueryTotal, context.parentContext = this, 
                this.subContextCount++, context;
            }, AnimationTimelineContext.prototype.transformIntoNewTimeline = function(newTime) {
                return this.previousNode = DEFAULT_NOOP_PREVIOUS_NODE, this.currentTimeline = this.currentTimeline.fork(this.element, newTime), 
                this.timelines.push(this.currentTimeline), this.currentTimeline;
            }, AnimationTimelineContext.prototype.appendInstructionToTimeline = function(instruction, duration, delay) {
                var updatedTimings = {
                    duration: null != duration ? duration : instruction.duration,
                    delay: this.currentTimeline.currentTime + (null != delay ? delay : 0) + instruction.delay,
                    easing: ""
                }, builder = new browser_SubTimelineBuilder(this._driver, instruction.element, instruction.keyframes, instruction.preStyleProps, instruction.postStyleProps, updatedTimings, instruction.stretchStartingKeyframe);
                return this.timelines.push(builder), updatedTimings;
            }, AnimationTimelineContext.prototype.incrementTime = function(time) {
                this.currentTimeline.forwardTime(this.currentTimeline.duration + time);
            }, AnimationTimelineContext.prototype.delayNextStep = function(delay) {
                delay > 0 && this.currentTimeline.delayNextStep(delay);
            }, AnimationTimelineContext.prototype.invokeQuery = function(selector, originalSelector, limit, includeSelf, optional, errors) {
                var results = [];
                if (includeSelf && results.push(this.element), selector.length > 0) {
                    selector = (selector = selector.replace(ENTER_TOKEN_REGEX, "." + this._enterClassName)).replace(LEAVE_TOKEN_REGEX, "." + this._leaveClassName);
                    var elements = this._driver.query(this.element, selector, 1 != limit);
                    0 !== limit && (elements = limit < 0 ? elements.slice(elements.length + limit, elements.length) : elements.slice(0, limit)), 
                    results.push.apply(results, __spread(elements));
                }
                return optional || 0 != results.length || errors.push('`query("' + originalSelector + '")` returned zero elements. (Use `query("' + originalSelector + '", { optional: true })` if you wish to allow this.)'), 
                results;
            }, AnimationTimelineContext;
        }(), browser_TimelineBuilder = function() {
            function TimelineBuilder(_driver, element, startTime, _elementTimelineStylesLookup) {
                this._driver = _driver, this.element = element, this.startTime = startTime, this._elementTimelineStylesLookup = _elementTimelineStylesLookup, 
                this.duration = 0, this._previousKeyframe = {}, this._currentKeyframe = {}, this._keyframes = new Map(), 
                this._styleSummary = {}, this._pendingStyles = {}, this._backFill = {}, this._currentEmptyStepKeyframe = null, 
                this._elementTimelineStylesLookup || (this._elementTimelineStylesLookup = new Map()), 
                this._localTimelineStyles = Object.create(this._backFill, {}), this._globalTimelineStyles = this._elementTimelineStylesLookup.get(element), 
                this._globalTimelineStyles || (this._globalTimelineStyles = this._localTimelineStyles, 
                this._elementTimelineStylesLookup.set(element, this._localTimelineStyles)), this._loadKeyframe();
            }
            return TimelineBuilder.prototype.containsAnimation = function() {
                switch (this._keyframes.size) {
                  case 0:
                    return !1;

                  case 1:
                    return this.getCurrentStyleProperties().length > 0;

                  default:
                    return !0;
                }
            }, TimelineBuilder.prototype.getCurrentStyleProperties = function() {
                return Object.keys(this._currentKeyframe);
            }, Object.defineProperty(TimelineBuilder.prototype, "currentTime", {
                get: function() {
                    return this.startTime + this.duration;
                },
                enumerable: !0,
                configurable: !0
            }), TimelineBuilder.prototype.delayNextStep = function(delay) {
                var hasPreStyleStep = 1 == this._keyframes.size && Object.keys(this._pendingStyles).length;
                this.duration || hasPreStyleStep ? (this.forwardTime(this.currentTime + delay), 
                hasPreStyleStep && this.snapshotCurrentStyles()) : this.startTime += delay;
            }, TimelineBuilder.prototype.fork = function(element, currentTime) {
                return this.applyStylesToKeyframe(), new TimelineBuilder(this._driver, element, currentTime || this.currentTime, this._elementTimelineStylesLookup);
            }, TimelineBuilder.prototype._loadKeyframe = function() {
                this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe), this._currentKeyframe = this._keyframes.get(this.duration), 
                this._currentKeyframe || (this._currentKeyframe = Object.create(this._backFill, {}), 
                this._keyframes.set(this.duration, this._currentKeyframe));
            }, TimelineBuilder.prototype.forwardFrame = function() {
                this.duration += 1, this._loadKeyframe();
            }, TimelineBuilder.prototype.forwardTime = function(time) {
                this.applyStylesToKeyframe(), this.duration = time, this._loadKeyframe();
            }, TimelineBuilder.prototype._updateStyle = function(prop, value) {
                this._localTimelineStyles[prop] = value, this._globalTimelineStyles[prop] = value, 
                this._styleSummary[prop] = {
                    time: this.currentTime,
                    value: value
                };
            }, TimelineBuilder.prototype.allowOnlyTimelineStyles = function() {
                return this._currentEmptyStepKeyframe !== this._currentKeyframe;
            }, TimelineBuilder.prototype.applyEmptyStep = function(easing) {
                var _this = this;
                easing && (this._previousKeyframe.easing = easing), Object.keys(this._globalTimelineStyles).forEach(function(prop) {
                    _this._backFill[prop] = _this._globalTimelineStyles[prop] || AUTO_STYLE, _this._currentKeyframe[prop] = AUTO_STYLE;
                }), this._currentEmptyStepKeyframe = this._currentKeyframe;
            }, TimelineBuilder.prototype.setStyles = function(input, easing, errors, options) {
                var _this = this;
                easing && (this._previousKeyframe.easing = easing);
                var params = options && options.params || {}, styles = function(input, allStyles) {
                    var allProperties, styles = {};
                    return input.forEach(function(token) {
                        "*" === token ? (allProperties = allProperties || Object.keys(allStyles)).forEach(function(prop) {
                            styles[prop] = AUTO_STYLE;
                        }) : copyStyles(token, !1, styles);
                    }), styles;
                }(input, this._globalTimelineStyles);
                Object.keys(styles).forEach(function(prop) {
                    var val = interpolateParams(styles[prop], params, errors);
                    _this._pendingStyles[prop] = val, _this._localTimelineStyles.hasOwnProperty(prop) || (_this._backFill[prop] = _this._globalTimelineStyles.hasOwnProperty(prop) ? _this._globalTimelineStyles[prop] : AUTO_STYLE), 
                    _this._updateStyle(prop, val);
                });
            }, TimelineBuilder.prototype.applyStylesToKeyframe = function() {
                var _this = this, styles = this._pendingStyles, props = Object.keys(styles);
                0 != props.length && (this._pendingStyles = {}, props.forEach(function(prop) {
                    _this._currentKeyframe[prop] = styles[prop];
                }), Object.keys(this._localTimelineStyles).forEach(function(prop) {
                    _this._currentKeyframe.hasOwnProperty(prop) || (_this._currentKeyframe[prop] = _this._localTimelineStyles[prop]);
                }));
            }, TimelineBuilder.prototype.snapshotCurrentStyles = function() {
                var _this = this;
                Object.keys(this._localTimelineStyles).forEach(function(prop) {
                    var val = _this._localTimelineStyles[prop];
                    _this._pendingStyles[prop] = val, _this._updateStyle(prop, val);
                });
            }, TimelineBuilder.prototype.getFinalKeyframe = function() {
                return this._keyframes.get(this.duration);
            }, Object.defineProperty(TimelineBuilder.prototype, "properties", {
                get: function() {
                    var properties = [];
                    for (var prop in this._currentKeyframe) properties.push(prop);
                    return properties;
                },
                enumerable: !0,
                configurable: !0
            }), TimelineBuilder.prototype.mergeTimelineCollectedStyles = function(timeline) {
                var _this = this;
                Object.keys(timeline._styleSummary).forEach(function(prop) {
                    var details0 = _this._styleSummary[prop], details1 = timeline._styleSummary[prop];
                    (!details0 || details1.time > details0.time) && _this._updateStyle(prop, details1.value);
                });
            }, TimelineBuilder.prototype.buildKeyframes = function() {
                var _this = this;
                this.applyStylesToKeyframe();
                var preStyleProps = new Set(), postStyleProps = new Set(), isEmpty = 1 === this._keyframes.size && 0 === this.duration, finalKeyframes = [];
                this._keyframes.forEach(function(keyframe, time) {
                    var finalKeyframe = copyStyles(keyframe, !0);
                    Object.keys(finalKeyframe).forEach(function(prop) {
                        var value = finalKeyframe[prop];
                        value == \u0275PRE_STYLE ? preStyleProps.add(prop) : value == AUTO_STYLE && postStyleProps.add(prop);
                    }), isEmpty || (finalKeyframe.offset = time / _this.duration), finalKeyframes.push(finalKeyframe);
                });
                var preProps = preStyleProps.size ? iteratorToArray(preStyleProps.values()) : [], postProps = postStyleProps.size ? iteratorToArray(postStyleProps.values()) : [];
                if (isEmpty) {
                    var kf0 = finalKeyframes[0], kf1 = copyObj(kf0);
                    kf0.offset = 0, kf1.offset = 1, finalKeyframes = [ kf0, kf1 ];
                }
                return createTimelineInstruction(this.element, finalKeyframes, preProps, postProps, this.duration, this.startTime, this.easing, !1);
            }, TimelineBuilder;
        }(), browser_SubTimelineBuilder = function(_super) {
            function SubTimelineBuilder(driver, element, keyframes, preStyleProps, postStyleProps, timings, _stretchStartingKeyframe) {
                void 0 === _stretchStartingKeyframe && (_stretchStartingKeyframe = !1);
                var _this = _super.call(this, driver, element, timings.delay) || this;
                return _this.element = element, _this.keyframes = keyframes, _this.preStyleProps = preStyleProps, 
                _this.postStyleProps = postStyleProps, _this._stretchStartingKeyframe = _stretchStartingKeyframe, 
                _this.timings = {
                    duration: timings.duration,
                    delay: timings.delay,
                    easing: timings.easing
                }, _this;
            }
            return __extends(SubTimelineBuilder, _super), SubTimelineBuilder.prototype.containsAnimation = function() {
                return this.keyframes.length > 1;
            }, SubTimelineBuilder.prototype.buildKeyframes = function() {
                var keyframes = this.keyframes, _a = this.timings, delay = _a.delay, duration = _a.duration, easing = _a.easing;
                if (this._stretchStartingKeyframe && delay) {
                    var newKeyframes = [], totalTime = duration + delay, startingGap = delay / totalTime, newFirstKeyframe = copyStyles(keyframes[0], !1);
                    newFirstKeyframe.offset = 0, newKeyframes.push(newFirstKeyframe);
                    var oldFirstKeyframe = copyStyles(keyframes[0], !1);
                    oldFirstKeyframe.offset = roundOffset(startingGap), newKeyframes.push(oldFirstKeyframe);
                    for (var limit = keyframes.length - 1, i = 1; i <= limit; i++) {
                        var kf = copyStyles(keyframes[i], !1);
                        kf.offset = roundOffset((delay + kf.offset * duration) / totalTime), newKeyframes.push(kf);
                    }
                    duration = totalTime, delay = 0, easing = "", keyframes = newKeyframes;
                }
                return createTimelineInstruction(this.element, keyframes, this.preStyleProps, this.postStyleProps, duration, delay, easing, !0);
            }, SubTimelineBuilder;
        }(browser_TimelineBuilder);
        function roundOffset(offset, decimalPoints) {
            void 0 === decimalPoints && (decimalPoints = 3);
            var mult = Math.pow(10, decimalPoints - 1);
            return Math.round(offset * mult) / mult;
        }
        var AnimationStyleNormalizer = function() {
            return function() {};
        }(), browser_WebAnimationsStyleNormalizer = function(_super) {
            function WebAnimationsStyleNormalizer() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return __extends(WebAnimationsStyleNormalizer, _super), WebAnimationsStyleNormalizer.prototype.normalizePropertyName = function(propertyName, errors) {
                return dashCaseToCamelCase(propertyName);
            }, WebAnimationsStyleNormalizer.prototype.normalizeStyleValue = function(userProvidedProperty, normalizedProperty, value, errors) {
                var unit = "", strVal = value.toString().trim();
                if (DIMENSIONAL_PROP_MAP[normalizedProperty] && 0 !== value && "0" !== value) if ("number" == typeof value) unit = "px"; else {
                    var valAndSuffixMatch = value.match(/^[+-]?[\d\.]+([a-z]*)$/);
                    valAndSuffixMatch && 0 == valAndSuffixMatch[1].length && errors.push("Please provide a CSS unit value for " + userProvidedProperty + ":" + value);
                }
                return strVal + unit;
            }, WebAnimationsStyleNormalizer;
        }(AnimationStyleNormalizer), DIMENSIONAL_PROP_MAP = makeBooleanMap("width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(","));
        function makeBooleanMap(keys) {
            var map = {};
            return keys.forEach(function(key) {
                return map[key] = !0;
            }), map;
        }
        function createTransitionInstruction(element, triggerName, fromState, toState, isRemovalTransition, fromStyles, toStyles, timelines, queriedElements, preStyleProps, postStyleProps, totalTime, errors) {
            return {
                type: 0,
                element: element,
                triggerName: triggerName,
                isRemovalTransition: isRemovalTransition,
                fromState: fromState,
                fromStyles: fromStyles,
                toState: toState,
                toStyles: toStyles,
                timelines: timelines,
                queriedElements: queriedElements,
                preStyleProps: preStyleProps,
                postStyleProps: postStyleProps,
                totalTime: totalTime,
                errors: errors
            };
        }
        var EMPTY_OBJECT = {}, browser_AnimationTransitionFactory = function() {
            function AnimationTransitionFactory(_triggerName, ast, _stateStyles) {
                this._triggerName = _triggerName, this.ast = ast, this._stateStyles = _stateStyles;
            }
            return AnimationTransitionFactory.prototype.match = function(currentState, nextState, element, params) {
                return function(matchFns, currentState, nextState, element, params) {
                    return matchFns.some(function(fn) {
                        return fn(currentState, nextState, element, params);
                    });
                }(this.ast.matchers, currentState, nextState, element, params);
            }, AnimationTransitionFactory.prototype.buildStyles = function(stateName, params, errors) {
                var backupStateStyler = this._stateStyles["*"], stateStyler = this._stateStyles[stateName], backupStyles = backupStateStyler ? backupStateStyler.buildStyles(params, errors) : {};
                return stateStyler ? stateStyler.buildStyles(params, errors) : backupStyles;
            }, AnimationTransitionFactory.prototype.build = function(driver, element, currentState, nextState, enterClassName, leaveClassName, currentOptions, nextOptions, subInstructions, skipAstBuild) {
                var errors = [], transitionAnimationParams = this.ast.options && this.ast.options.params || EMPTY_OBJECT, currentStateStyles = this.buildStyles(currentState, currentOptions && currentOptions.params || EMPTY_OBJECT, errors), nextAnimationParams = nextOptions && nextOptions.params || EMPTY_OBJECT, nextStateStyles = this.buildStyles(nextState, nextAnimationParams, errors), queriedElements = new Set(), preStyleMap = new Map(), postStyleMap = new Map(), isRemoval = "void" === nextState, animationOptions = {
                    params: __assign({}, transitionAnimationParams, nextAnimationParams)
                }, timelines = skipAstBuild ? [] : buildAnimationTimelines(driver, element, this.ast.animation, enterClassName, leaveClassName, currentStateStyles, nextStateStyles, animationOptions, subInstructions, errors), totalTime = 0;
                if (timelines.forEach(function(tl) {
                    totalTime = Math.max(tl.duration + tl.delay, totalTime);
                }), errors.length) return createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, [], [], preStyleMap, postStyleMap, totalTime, errors);
                timelines.forEach(function(tl) {
                    var elm = tl.element, preProps = getOrSetAsInMap(preStyleMap, elm, {});
                    tl.preStyleProps.forEach(function(prop) {
                        return preProps[prop] = !0;
                    });
                    var postProps = getOrSetAsInMap(postStyleMap, elm, {});
                    tl.postStyleProps.forEach(function(prop) {
                        return postProps[prop] = !0;
                    }), elm !== element && queriedElements.add(elm);
                });
                var queriedElementsList = iteratorToArray(queriedElements.values());
                return createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, timelines, queriedElementsList, preStyleMap, postStyleMap, totalTime);
            }, AnimationTransitionFactory;
        }(), AnimationStateStyles = function() {
            function AnimationStateStyles(styles, defaultParams) {
                this.styles = styles, this.defaultParams = defaultParams;
            }
            return AnimationStateStyles.prototype.buildStyles = function(params, errors) {
                var finalStyles = {}, combinedParams = copyObj(this.defaultParams);
                return Object.keys(params).forEach(function(key) {
                    var value = params[key];
                    null != value && (combinedParams[key] = value);
                }), this.styles.styles.forEach(function(value) {
                    if ("string" != typeof value) {
                        var styleObj_1 = value;
                        Object.keys(styleObj_1).forEach(function(prop) {
                            var val = styleObj_1[prop];
                            val.length > 1 && (val = interpolateParams(val, combinedParams, errors)), finalStyles[prop] = val;
                        });
                    }
                }), finalStyles;
            }, AnimationStateStyles;
        }(), AnimationTrigger = function() {
            function AnimationTrigger(name, ast) {
                var _this = this;
                this.name = name, this.ast = ast, this.transitionFactories = [], this.states = {}, 
                ast.states.forEach(function(ast) {
                    _this.states[ast.name] = new AnimationStateStyles(ast.style, ast.options && ast.options.params || {});
                }), balanceProperties(this.states, "true", "1"), balanceProperties(this.states, "false", "0"), 
                ast.transitions.forEach(function(ast) {
                    _this.transitionFactories.push(new browser_AnimationTransitionFactory(name, ast, _this.states));
                }), this.fallbackTransition = new browser_AnimationTransitionFactory(name, {
                    type: 1,
                    animation: {
                        type: 2,
                        steps: [],
                        options: null
                    },
                    matchers: [ function(fromState, toState) {
                        return !0;
                    } ],
                    options: null,
                    queryCount: 0,
                    depCount: 0
                }, this.states);
            }
            return Object.defineProperty(AnimationTrigger.prototype, "containsQueries", {
                get: function() {
                    return this.ast.queryCount > 0;
                },
                enumerable: !0,
                configurable: !0
            }), AnimationTrigger.prototype.matchTransition = function(currentState, nextState, element, params) {
                return this.transitionFactories.find(function(f) {
                    return f.match(currentState, nextState, element, params);
                }) || null;
            }, AnimationTrigger.prototype.matchStyles = function(currentState, params, errors) {
                return this.fallbackTransition.buildStyles(currentState, params, errors);
            }, AnimationTrigger;
        }();
        function balanceProperties(obj, key1, key2) {
            obj.hasOwnProperty(key1) ? obj.hasOwnProperty(key2) || (obj[key2] = obj[key1]) : obj.hasOwnProperty(key2) && (obj[key1] = obj[key2]);
        }
        var EMPTY_INSTRUCTION_MAP = new browser_ElementInstructionMap(), browser_TimelineAnimationEngine = function() {
            function TimelineAnimationEngine(bodyNode, _driver, _normalizer) {
                this.bodyNode = bodyNode, this._driver = _driver, this._normalizer = _normalizer, 
                this._animations = {}, this._playersById = {}, this.players = [];
            }
            return TimelineAnimationEngine.prototype.register = function(id, metadata) {
                var errors = [], ast = buildAnimationAst(this._driver, metadata, errors);
                if (errors.length) throw new Error("Unable to build the animation due to the following errors: " + errors.join("\n"));
                this._animations[id] = ast;
            }, TimelineAnimationEngine.prototype._buildPlayer = function(i, preStyles, postStyles) {
                var element = i.element, keyframes = normalizeKeyframes(0, this._normalizer, 0, i.keyframes, preStyles, postStyles);
                return this._driver.animate(element, keyframes, i.duration, i.delay, i.easing, [], !0);
            }, TimelineAnimationEngine.prototype.create = function(id, element, options) {
                var _this = this;
                void 0 === options && (options = {});
                var instructions, errors = [], ast = this._animations[id], autoStylesMap = new Map();
                if (ast ? (instructions = buildAnimationTimelines(this._driver, element, ast, "ng-enter", "ng-leave", {}, {}, options, EMPTY_INSTRUCTION_MAP, errors)).forEach(function(inst) {
                    var styles = getOrSetAsInMap(autoStylesMap, inst.element, {});
                    inst.postStyleProps.forEach(function(prop) {
                        return styles[prop] = null;
                    });
                }) : (errors.push("The requested animation doesn't exist or has already been destroyed"), 
                instructions = []), errors.length) throw new Error("Unable to create the animation due to the following errors: " + errors.join("\n"));
                autoStylesMap.forEach(function(styles, element) {
                    Object.keys(styles).forEach(function(prop) {
                        styles[prop] = _this._driver.computeStyle(element, prop, AUTO_STYLE);
                    });
                });
                var player = optimizeGroupPlayer(instructions.map(function(i) {
                    var styles = autoStylesMap.get(i.element);
                    return _this._buildPlayer(i, {}, styles);
                }));
                return this._playersById[id] = player, player.onDestroy(function() {
                    return _this.destroy(id);
                }), this.players.push(player), player;
            }, TimelineAnimationEngine.prototype.destroy = function(id) {
                var player = this._getPlayer(id);
                player.destroy(), delete this._playersById[id];
                var index = this.players.indexOf(player);
                index >= 0 && this.players.splice(index, 1);
            }, TimelineAnimationEngine.prototype._getPlayer = function(id) {
                var player = this._playersById[id];
                if (!player) throw new Error("Unable to find the timeline player referenced by " + id);
                return player;
            }, TimelineAnimationEngine.prototype.listen = function(id, element, eventName, callback) {
                var baseEvent = makeAnimationEvent(element, "", "", "");
                return listenOnPlayer(this._getPlayer(id), eventName, baseEvent, callback), function() {};
            }, TimelineAnimationEngine.prototype.command = function(id, element, command, args) {
                if ("register" != command) if ("create" != command) {
                    var player = this._getPlayer(id);
                    switch (command) {
                      case "play":
                        player.play();
                        break;

                      case "pause":
                        player.pause();
                        break;

                      case "reset":
                        player.reset();
                        break;

                      case "restart":
                        player.restart();
                        break;

                      case "finish":
                        player.finish();
                        break;

                      case "init":
                        player.init();
                        break;

                      case "setPosition":
                        player.setPosition(parseFloat(args[0]));
                        break;

                      case "destroy":
                        this.destroy(id);
                    }
                } else this.create(id, element, args[0] || {}); else this.register(id, args[0]);
            }, TimelineAnimationEngine;
        }(), EMPTY_PLAYER_ARRAY = [], NULL_REMOVAL_STATE = {
            namespaceId: "",
            setForRemoval: !1,
            setForMove: !1,
            hasAnimation: !1,
            removedBeforeQueried: !1
        }, NULL_REMOVED_QUERIED_STATE = {
            namespaceId: "",
            setForMove: !1,
            setForRemoval: !1,
            hasAnimation: !1,
            removedBeforeQueried: !0
        }, REMOVAL_FLAG = "__ng_removed", StateValue = function() {
            function StateValue(input, namespaceId) {
                void 0 === namespaceId && (namespaceId = ""), this.namespaceId = namespaceId;
                var isObj = input && input.hasOwnProperty("value");
                if (this.value = function(value) {
                    return null != value ? value : null;
                }(isObj ? input.value : input), isObj) {
                    var options = copyObj(input);
                    delete options.value, this.options = options;
                } else this.options = {};
                this.options.params || (this.options.params = {});
            }
            return Object.defineProperty(StateValue.prototype, "params", {
                get: function() {
                    return this.options.params;
                },
                enumerable: !0,
                configurable: !0
            }), StateValue.prototype.absorbOptions = function(options) {
                var newParams = options.params;
                if (newParams) {
                    var oldParams_1 = this.options.params;
                    Object.keys(newParams).forEach(function(prop) {
                        null == oldParams_1[prop] && (oldParams_1[prop] = newParams[prop]);
                    });
                }
            }, StateValue;
        }(), DEFAULT_STATE_VALUE = new StateValue("void"), AnimationTransitionNamespace = function() {
            function AnimationTransitionNamespace(id, hostElement, _engine) {
                this.id = id, this.hostElement = hostElement, this._engine = _engine, this.players = [], 
                this._triggers = {}, this._queue = [], this._elementListeners = new Map(), this._hostClassName = "ng-tns-" + id, 
                addClass(hostElement, this._hostClassName);
            }
            return AnimationTransitionNamespace.prototype.listen = function(element, name, phase, callback) {
                var eventName, _this = this;
                if (!this._triggers.hasOwnProperty(name)) throw new Error('Unable to listen on the animation trigger event "' + phase + '" because the animation trigger "' + name + "\" doesn't exist!");
                if (null == phase || 0 == phase.length) throw new Error('Unable to listen on the animation trigger "' + name + '" because the provided event is undefined!');
                if ("start" != (eventName = phase) && "done" != eventName) throw new Error('The provided animation trigger event "' + phase + '" for the animation trigger "' + name + '" is not supported!');
                var listeners = getOrSetAsInMap(this._elementListeners, element, []), data = {
                    name: name,
                    phase: phase,
                    callback: callback
                };
                listeners.push(data);
                var triggersWithStates = getOrSetAsInMap(this._engine.statesByElement, element, {});
                return triggersWithStates.hasOwnProperty(name) || (addClass(element, "ng-trigger"), 
                addClass(element, "ng-trigger-" + name), triggersWithStates[name] = DEFAULT_STATE_VALUE), 
                function() {
                    _this._engine.afterFlush(function() {
                        var index = listeners.indexOf(data);
                        index >= 0 && listeners.splice(index, 1), _this._triggers[name] || delete triggersWithStates[name];
                    });
                };
            }, AnimationTransitionNamespace.prototype.register = function(name, ast) {
                return !this._triggers[name] && (this._triggers[name] = ast, !0);
            }, AnimationTransitionNamespace.prototype._getTrigger = function(name) {
                var trigger = this._triggers[name];
                if (!trigger) throw new Error('The provided animation trigger "' + name + '" has not been registered!');
                return trigger;
            }, AnimationTransitionNamespace.prototype.trigger = function(element, triggerName, value, defaultToFallback) {
                var _this = this;
                void 0 === defaultToFallback && (defaultToFallback = !0);
                var trigger = this._getTrigger(triggerName), player = new browser_TransitionAnimationPlayer(this.id, triggerName, element), triggersWithStates = this._engine.statesByElement.get(element);
                triggersWithStates || (addClass(element, "ng-trigger"), addClass(element, "ng-trigger-" + triggerName), 
                this._engine.statesByElement.set(element, triggersWithStates = {}));
                var fromState = triggersWithStates[triggerName], toState = new StateValue(value, this.id);
                if (!(value && value.hasOwnProperty("value")) && fromState && toState.absorbOptions(fromState.options), 
                triggersWithStates[triggerName] = toState, fromState || (fromState = DEFAULT_STATE_VALUE), 
                "void" === toState.value || fromState.value !== toState.value) {
                    var playersOnElement = getOrSetAsInMap(this._engine.playersByElement, element, []);
                    playersOnElement.forEach(function(player) {
                        player.namespaceId == _this.id && player.triggerName == triggerName && player.queued && player.destroy();
                    });
                    var transition = trigger.matchTransition(fromState.value, toState.value, element, toState.params), isFallbackTransition = !1;
                    if (!transition) {
                        if (!defaultToFallback) return;
                        transition = trigger.fallbackTransition, isFallbackTransition = !0;
                    }
                    return this._engine.totalQueuedPlayers++, this._queue.push({
                        element: element,
                        triggerName: triggerName,
                        transition: transition,
                        fromState: fromState,
                        toState: toState,
                        player: player,
                        isFallbackTransition: isFallbackTransition
                    }), isFallbackTransition || (addClass(element, "ng-animate-queued"), player.onStart(function() {
                        removeClass(element, "ng-animate-queued");
                    })), player.onDone(function() {
                        var index = _this.players.indexOf(player);
                        index >= 0 && _this.players.splice(index, 1);
                        var players = _this._engine.playersByElement.get(element);
                        if (players) {
                            var index_1 = players.indexOf(player);
                            index_1 >= 0 && players.splice(index_1, 1);
                        }
                    }), this.players.push(player), playersOnElement.push(player), player;
                }
                if (!function(a, b) {
                    var k1 = Object.keys(a), k2 = Object.keys(b);
                    if (k1.length != k2.length) return !1;
                    for (var i = 0; i < k1.length; i++) {
                        var prop = k1[i];
                        if (!b.hasOwnProperty(prop) || a[prop] !== b[prop]) return !1;
                    }
                    return !0;
                }(fromState.params, toState.params)) {
                    var errors = [], fromStyles_1 = trigger.matchStyles(fromState.value, fromState.params, errors), toStyles_1 = trigger.matchStyles(toState.value, toState.params, errors);
                    errors.length ? this._engine.reportError(errors) : this._engine.afterFlush(function() {
                        eraseStyles(element, fromStyles_1), setStyles(element, toStyles_1);
                    });
                }
            }, AnimationTransitionNamespace.prototype.deregister = function(name) {
                var _this = this;
                delete this._triggers[name], this._engine.statesByElement.forEach(function(stateMap, element) {
                    delete stateMap[name];
                }), this._elementListeners.forEach(function(listeners, element) {
                    _this._elementListeners.set(element, listeners.filter(function(entry) {
                        return entry.name != name;
                    }));
                });
            }, AnimationTransitionNamespace.prototype.clearElementCache = function(element) {
                this._engine.statesByElement.delete(element), this._elementListeners.delete(element);
                var elementPlayers = this._engine.playersByElement.get(element);
                elementPlayers && (elementPlayers.forEach(function(player) {
                    return player.destroy();
                }), this._engine.playersByElement.delete(element));
            }, AnimationTransitionNamespace.prototype._signalRemovalForInnerTriggers = function(rootElement, context, animate) {
                var _this = this;
                void 0 === animate && (animate = !1), this._engine.driver.query(rootElement, ".ng-trigger", !0).forEach(function(elm) {
                    if (!elm[REMOVAL_FLAG]) {
                        var namespaces = _this._engine.fetchNamespacesByElement(elm);
                        namespaces.size ? namespaces.forEach(function(ns) {
                            return ns.triggerLeaveAnimation(elm, context, !1, !0);
                        }) : _this.clearElementCache(elm);
                    }
                });
            }, AnimationTransitionNamespace.prototype.triggerLeaveAnimation = function(element, context, destroyAfterComplete, defaultToFallback) {
                var _this = this, triggerStates = this._engine.statesByElement.get(element);
                if (triggerStates) {
                    var players_1 = [];
                    if (Object.keys(triggerStates).forEach(function(triggerName) {
                        if (_this._triggers[triggerName]) {
                            var player = _this.trigger(element, triggerName, "void", defaultToFallback);
                            player && players_1.push(player);
                        }
                    }), players_1.length) return this._engine.markElementAsRemoved(this.id, element, !0, context), 
                    destroyAfterComplete && optimizeGroupPlayer(players_1).onDone(function() {
                        return _this._engine.processLeaveNode(element);
                    }), !0;
                }
                return !1;
            }, AnimationTransitionNamespace.prototype.prepareLeaveAnimationListeners = function(element) {
                var _this = this, listeners = this._elementListeners.get(element);
                if (listeners) {
                    var visitedTriggers_1 = new Set();
                    listeners.forEach(function(listener) {
                        var triggerName = listener.name;
                        if (!visitedTriggers_1.has(triggerName)) {
                            visitedTriggers_1.add(triggerName);
                            var transition = _this._triggers[triggerName].fallbackTransition, fromState = _this._engine.statesByElement.get(element)[triggerName] || DEFAULT_STATE_VALUE, toState = new StateValue("void"), player = new browser_TransitionAnimationPlayer(_this.id, triggerName, element);
                            _this._engine.totalQueuedPlayers++, _this._queue.push({
                                element: element,
                                triggerName: triggerName,
                                transition: transition,
                                fromState: fromState,
                                toState: toState,
                                player: player,
                                isFallbackTransition: !0
                            });
                        }
                    });
                }
            }, AnimationTransitionNamespace.prototype.removeNode = function(element, context) {
                var _this = this, engine = this._engine;
                if (element.childElementCount && this._signalRemovalForInnerTriggers(element, context, !0), 
                !this.triggerLeaveAnimation(element, context, !0)) {
                    var containsPotentialParentTransition = !1;
                    if (engine.totalAnimations) {
                        var currentPlayers = engine.players.length ? engine.playersByQueriedElement.get(element) : [];
                        if (currentPlayers && currentPlayers.length) containsPotentialParentTransition = !0; else for (var parent_1 = element; parent_1 = parent_1.parentNode; ) if (engine.statesByElement.get(parent_1)) {
                            containsPotentialParentTransition = !0;
                            break;
                        }
                    }
                    this.prepareLeaveAnimationListeners(element), containsPotentialParentTransition ? engine.markElementAsRemoved(this.id, element, !1, context) : (engine.afterFlush(function() {
                        return _this.clearElementCache(element);
                    }), engine.destroyInnerAnimations(element), engine._onRemovalComplete(element, context));
                }
            }, AnimationTransitionNamespace.prototype.insertNode = function(element, parent) {
                addClass(element, this._hostClassName);
            }, AnimationTransitionNamespace.prototype.drainQueuedTransitions = function(microtaskId) {
                var _this = this, instructions = [];
                return this._queue.forEach(function(entry) {
                    var player = entry.player;
                    if (!player.destroyed) {
                        var element = entry.element, listeners = _this._elementListeners.get(element);
                        listeners && listeners.forEach(function(listener) {
                            if (listener.name == entry.triggerName) {
                                var baseEvent = makeAnimationEvent(element, entry.triggerName, entry.fromState.value, entry.toState.value);
                                baseEvent._data = microtaskId, listenOnPlayer(entry.player, listener.phase, baseEvent, listener.callback);
                            }
                        }), player.markedForDestroy ? _this._engine.afterFlush(function() {
                            player.destroy();
                        }) : instructions.push(entry);
                    }
                }), this._queue = [], instructions.sort(function(a, b) {
                    var d0 = a.transition.ast.depCount, d1 = b.transition.ast.depCount;
                    return 0 == d0 || 0 == d1 ? d0 - d1 : _this._engine.driver.containsElement(a.element, b.element) ? 1 : -1;
                });
            }, AnimationTransitionNamespace.prototype.destroy = function(context) {
                this.players.forEach(function(p) {
                    return p.destroy();
                }), this._signalRemovalForInnerTriggers(this.hostElement, context);
            }, AnimationTransitionNamespace.prototype.elementContainsData = function(element) {
                var containsData = !1;
                return this._elementListeners.has(element) && (containsData = !0), !!this._queue.find(function(entry) {
                    return entry.element === element;
                }) || containsData;
            }, AnimationTransitionNamespace;
        }(), browser_TransitionAnimationEngine = function() {
            function TransitionAnimationEngine(bodyNode, driver, _normalizer) {
                this.bodyNode = bodyNode, this.driver = driver, this._normalizer = _normalizer, 
                this.players = [], this.newHostElements = new Map(), this.playersByElement = new Map(), 
                this.playersByQueriedElement = new Map(), this.statesByElement = new Map(), this.disabledNodes = new Set(), 
                this.totalAnimations = 0, this.totalQueuedPlayers = 0, this._namespaceLookup = {}, 
                this._namespaceList = [], this._flushFns = [], this._whenQuietFns = [], this.namespacesByHostElement = new Map(), 
                this.collectedEnterElements = [], this.collectedLeaveElements = [], this.onRemovalComplete = function(element, context) {};
            }
            return TransitionAnimationEngine.prototype._onRemovalComplete = function(element, context) {
                this.onRemovalComplete(element, context);
            }, Object.defineProperty(TransitionAnimationEngine.prototype, "queuedPlayers", {
                get: function() {
                    var players = [];
                    return this._namespaceList.forEach(function(ns) {
                        ns.players.forEach(function(player) {
                            player.queued && players.push(player);
                        });
                    }), players;
                },
                enumerable: !0,
                configurable: !0
            }), TransitionAnimationEngine.prototype.createNamespace = function(namespaceId, hostElement) {
                var ns = new AnimationTransitionNamespace(namespaceId, hostElement, this);
                return hostElement.parentNode ? this._balanceNamespaceList(ns, hostElement) : (this.newHostElements.set(hostElement, ns), 
                this.collectEnterElement(hostElement)), this._namespaceLookup[namespaceId] = ns;
            }, TransitionAnimationEngine.prototype._balanceNamespaceList = function(ns, hostElement) {
                var limit = this._namespaceList.length - 1;
                if (limit >= 0) {
                    for (var found = !1, i = limit; i >= 0; i--) if (this.driver.containsElement(this._namespaceList[i].hostElement, hostElement)) {
                        this._namespaceList.splice(i + 1, 0, ns), found = !0;
                        break;
                    }
                    found || this._namespaceList.splice(0, 0, ns);
                } else this._namespaceList.push(ns);
                return this.namespacesByHostElement.set(hostElement, ns), ns;
            }, TransitionAnimationEngine.prototype.register = function(namespaceId, hostElement) {
                var ns = this._namespaceLookup[namespaceId];
                return ns || (ns = this.createNamespace(namespaceId, hostElement)), ns;
            }, TransitionAnimationEngine.prototype.registerTrigger = function(namespaceId, name, trigger) {
                var ns = this._namespaceLookup[namespaceId];
                ns && ns.register(name, trigger) && this.totalAnimations++;
            }, TransitionAnimationEngine.prototype.destroy = function(namespaceId, context) {
                var _this = this;
                if (namespaceId) {
                    var ns = this._fetchNamespace(namespaceId);
                    this.afterFlush(function() {
                        _this.namespacesByHostElement.delete(ns.hostElement), delete _this._namespaceLookup[namespaceId];
                        var index = _this._namespaceList.indexOf(ns);
                        index >= 0 && _this._namespaceList.splice(index, 1);
                    }), this.afterFlushAnimationsDone(function() {
                        return ns.destroy(context);
                    });
                }
            }, TransitionAnimationEngine.prototype._fetchNamespace = function(id) {
                return this._namespaceLookup[id];
            }, TransitionAnimationEngine.prototype.fetchNamespacesByElement = function(element) {
                var namespaces = new Set(), elementStates = this.statesByElement.get(element);
                if (elementStates) for (var keys = Object.keys(elementStates), i = 0; i < keys.length; i++) {
                    var nsId = elementStates[keys[i]].namespaceId;
                    if (nsId) {
                        var ns = this._fetchNamespace(nsId);
                        ns && namespaces.add(ns);
                    }
                }
                return namespaces;
            }, TransitionAnimationEngine.prototype.trigger = function(namespaceId, element, name, value) {
                if (isElementNode(element)) {
                    var ns = this._fetchNamespace(namespaceId);
                    if (ns) return ns.trigger(element, name, value), !0;
                }
                return !1;
            }, TransitionAnimationEngine.prototype.insertNode = function(namespaceId, element, parent, insertBefore) {
                if (isElementNode(element)) {
                    var details = element[REMOVAL_FLAG];
                    if (details && details.setForRemoval) {
                        details.setForRemoval = !1, details.setForMove = !0;
                        var index = this.collectedLeaveElements.indexOf(element);
                        index >= 0 && this.collectedLeaveElements.splice(index, 1);
                    }
                    if (namespaceId) {
                        var ns = this._fetchNamespace(namespaceId);
                        ns && ns.insertNode(element, parent);
                    }
                    insertBefore && this.collectEnterElement(element);
                }
            }, TransitionAnimationEngine.prototype.collectEnterElement = function(element) {
                this.collectedEnterElements.push(element);
            }, TransitionAnimationEngine.prototype.markElementAsDisabled = function(element, value) {
                value ? this.disabledNodes.has(element) || (this.disabledNodes.add(element), addClass(element, "ng-animate-disabled")) : this.disabledNodes.has(element) && (this.disabledNodes.delete(element), 
                removeClass(element, "ng-animate-disabled"));
            }, TransitionAnimationEngine.prototype.removeNode = function(namespaceId, element, isHostElement, context) {
                if (isElementNode(element)) {
                    var ns = namespaceId ? this._fetchNamespace(namespaceId) : null;
                    if (ns ? ns.removeNode(element, context) : this.markElementAsRemoved(namespaceId, element, !1, context), 
                    isHostElement) {
                        var hostNS = this.namespacesByHostElement.get(element);
                        hostNS && hostNS.id !== namespaceId && hostNS.removeNode(element, context);
                    }
                } else this._onRemovalComplete(element, context);
            }, TransitionAnimationEngine.prototype.markElementAsRemoved = function(namespaceId, element, hasAnimation, context) {
                this.collectedLeaveElements.push(element), element[REMOVAL_FLAG] = {
                    namespaceId: namespaceId,
                    setForRemoval: context,
                    hasAnimation: hasAnimation,
                    removedBeforeQueried: !1
                };
            }, TransitionAnimationEngine.prototype.listen = function(namespaceId, element, name, phase, callback) {
                return isElementNode(element) ? this._fetchNamespace(namespaceId).listen(element, name, phase, callback) : function() {};
            }, TransitionAnimationEngine.prototype._buildInstruction = function(entry, subTimelines, enterClassName, leaveClassName, skipBuildAst) {
                return entry.transition.build(this.driver, entry.element, entry.fromState.value, entry.toState.value, enterClassName, leaveClassName, entry.fromState.options, entry.toState.options, subTimelines, skipBuildAst);
            }, TransitionAnimationEngine.prototype.destroyInnerAnimations = function(containerElement) {
                var _this = this, elements = this.driver.query(containerElement, ".ng-trigger", !0);
                elements.forEach(function(element) {
                    return _this.destroyActiveAnimationsForElement(element);
                }), 0 != this.playersByQueriedElement.size && (elements = this.driver.query(containerElement, ".ng-animating", !0)).forEach(function(element) {
                    return _this.finishActiveQueriedAnimationOnElement(element);
                });
            }, TransitionAnimationEngine.prototype.destroyActiveAnimationsForElement = function(element) {
                var players = this.playersByElement.get(element);
                players && players.forEach(function(player) {
                    player.queued ? player.markedForDestroy = !0 : player.destroy();
                });
            }, TransitionAnimationEngine.prototype.finishActiveQueriedAnimationOnElement = function(element) {
                var players = this.playersByQueriedElement.get(element);
                players && players.forEach(function(player) {
                    return player.finish();
                });
            }, TransitionAnimationEngine.prototype.whenRenderingDone = function() {
                var _this = this;
                return new Promise(function(resolve) {
                    if (_this.players.length) return optimizeGroupPlayer(_this.players).onDone(function() {
                        return resolve();
                    });
                    resolve();
                });
            }, TransitionAnimationEngine.prototype.processLeaveNode = function(element) {
                var _this = this, details = element[REMOVAL_FLAG];
                if (details && details.setForRemoval) {
                    if (element[REMOVAL_FLAG] = NULL_REMOVAL_STATE, details.namespaceId) {
                        this.destroyInnerAnimations(element);
                        var ns = this._fetchNamespace(details.namespaceId);
                        ns && ns.clearElementCache(element);
                    }
                    this._onRemovalComplete(element, details.setForRemoval);
                }
                this.driver.matchesElement(element, ".ng-animate-disabled") && this.markElementAsDisabled(element, !1), 
                this.driver.query(element, ".ng-animate-disabled", !0).forEach(function(node) {
                    _this.markElementAsDisabled(node, !1);
                });
            }, TransitionAnimationEngine.prototype.flush = function(microtaskId) {
                var _this = this;
                void 0 === microtaskId && (microtaskId = -1);
                var players = [];
                if (this.newHostElements.size && (this.newHostElements.forEach(function(ns, element) {
                    return _this._balanceNamespaceList(ns, element);
                }), this.newHostElements.clear()), this.totalAnimations && this.collectedEnterElements.length) for (var i = 0; i < this.collectedEnterElements.length; i++) addClass(this.collectedEnterElements[i], "ng-star-inserted");
                if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
                    var cleanupFns = [];
                    try {
                        players = this._flushAnimations(cleanupFns, microtaskId);
                    } finally {
                        for (i = 0; i < cleanupFns.length; i++) cleanupFns[i]();
                    }
                } else for (i = 0; i < this.collectedLeaveElements.length; i++) this.processLeaveNode(this.collectedLeaveElements[i]);
                if (this.totalQueuedPlayers = 0, this.collectedEnterElements.length = 0, this.collectedLeaveElements.length = 0, 
                this._flushFns.forEach(function(fn) {
                    return fn();
                }), this._flushFns = [], this._whenQuietFns.length) {
                    var quietFns_1 = this._whenQuietFns;
                    this._whenQuietFns = [], players.length ? optimizeGroupPlayer(players).onDone(function() {
                        quietFns_1.forEach(function(fn) {
                            return fn();
                        });
                    }) : quietFns_1.forEach(function(fn) {
                        return fn();
                    });
                }
            }, TransitionAnimationEngine.prototype.reportError = function(errors) {
                throw new Error("Unable to process animations due to the following failed trigger transitions\n " + errors.join("\n"));
            }, TransitionAnimationEngine.prototype._flushAnimations = function(cleanupFns, microtaskId) {
                var _this = this, subTimelines = new browser_ElementInstructionMap(), skippedPlayers = [], skippedPlayersMap = new Map(), queuedInstructions = [], queriedElements = new Map(), allPreStyleElements = new Map(), allPostStyleElements = new Map(), disabledElementsSet = new Set();
                this.disabledNodes.forEach(function(node) {
                    disabledElementsSet.add(node);
                    for (var nodesThatAreDisabled = _this.driver.query(node, ".ng-animate-queued", !0), i_1 = 0; i_1 < nodesThatAreDisabled.length; i_1++) disabledElementsSet.add(nodesThatAreDisabled[i_1]);
                });
                var bodyNode = this.bodyNode, allTriggerElements = Array.from(this.statesByElement.keys()), enterNodeMap = buildRootMap(allTriggerElements, this.collectedEnterElements), enterNodeMapIds = new Map(), i = 0;
                enterNodeMap.forEach(function(nodes, root) {
                    var className = "ng-enter" + i++;
                    enterNodeMapIds.set(root, className), nodes.forEach(function(node) {
                        return addClass(node, className);
                    });
                });
                for (var allLeaveNodes = [], mergedLeaveNodes = new Set(), leaveNodesWithoutAnimations = new Set(), i_2 = 0; i_2 < this.collectedLeaveElements.length; i_2++) (details = (element = this.collectedLeaveElements[i_2])[REMOVAL_FLAG]) && details.setForRemoval && (allLeaveNodes.push(element), 
                mergedLeaveNodes.add(element), details.hasAnimation ? this.driver.query(element, ".ng-star-inserted", !0).forEach(function(elm) {
                    return mergedLeaveNodes.add(elm);
                }) : leaveNodesWithoutAnimations.add(element));
                var leaveNodeMapIds = new Map(), leaveNodeMap = buildRootMap(allTriggerElements, Array.from(mergedLeaveNodes));
                leaveNodeMap.forEach(function(nodes, root) {
                    var className = "ng-leave" + i++;
                    leaveNodeMapIds.set(root, className), nodes.forEach(function(node) {
                        return addClass(node, className);
                    });
                }), cleanupFns.push(function() {
                    enterNodeMap.forEach(function(nodes, root) {
                        var className = enterNodeMapIds.get(root);
                        nodes.forEach(function(node) {
                            return removeClass(node, className);
                        });
                    }), leaveNodeMap.forEach(function(nodes, root) {
                        var className = leaveNodeMapIds.get(root);
                        nodes.forEach(function(node) {
                            return removeClass(node, className);
                        });
                    }), allLeaveNodes.forEach(function(element) {
                        _this.processLeaveNode(element);
                    });
                });
                for (var allPlayers = [], erroneousTransitions = [], i_3 = this._namespaceList.length - 1; i_3 >= 0; i_3--) this._namespaceList[i_3].drainQueuedTransitions(microtaskId).forEach(function(entry) {
                    var player = entry.player, element = entry.element;
                    if (allPlayers.push(player), _this.collectedEnterElements.length) {
                        var details = element[REMOVAL_FLAG];
                        if (details && details.setForMove) return void player.destroy();
                    }
                    var nodeIsOrphaned = !bodyNode || !_this.driver.containsElement(bodyNode, element), leaveClassName = leaveNodeMapIds.get(element), enterClassName = enterNodeMapIds.get(element), instruction = _this._buildInstruction(entry, subTimelines, enterClassName, leaveClassName, nodeIsOrphaned);
                    if (instruction.errors && instruction.errors.length) erroneousTransitions.push(instruction); else {
                        if (nodeIsOrphaned) return player.onStart(function() {
                            return eraseStyles(element, instruction.fromStyles);
                        }), player.onDestroy(function() {
                            return setStyles(element, instruction.toStyles);
                        }), void skippedPlayers.push(player);
                        if (entry.isFallbackTransition) return player.onStart(function() {
                            return eraseStyles(element, instruction.fromStyles);
                        }), player.onDestroy(function() {
                            return setStyles(element, instruction.toStyles);
                        }), void skippedPlayers.push(player);
                        instruction.timelines.forEach(function(tl) {
                            return tl.stretchStartingKeyframe = !0;
                        }), subTimelines.append(element, instruction.timelines), queuedInstructions.push({
                            instruction: instruction,
                            player: player,
                            element: element
                        }), instruction.queriedElements.forEach(function(element) {
                            return getOrSetAsInMap(queriedElements, element, []).push(player);
                        }), instruction.preStyleProps.forEach(function(stringMap, element) {
                            var props = Object.keys(stringMap);
                            if (props.length) {
                                var setVal_1 = allPreStyleElements.get(element);
                                setVal_1 || allPreStyleElements.set(element, setVal_1 = new Set()), props.forEach(function(prop) {
                                    return setVal_1.add(prop);
                                });
                            }
                        }), instruction.postStyleProps.forEach(function(stringMap, element) {
                            var props = Object.keys(stringMap), setVal = allPostStyleElements.get(element);
                            setVal || allPostStyleElements.set(element, setVal = new Set()), props.forEach(function(prop) {
                                return setVal.add(prop);
                            });
                        });
                    }
                });
                if (erroneousTransitions.length) {
                    var errors_1 = [];
                    erroneousTransitions.forEach(function(instruction) {
                        errors_1.push("@" + instruction.triggerName + " has failed due to:\n"), instruction.errors.forEach(function(error) {
                            return errors_1.push("- " + error + "\n");
                        });
                    }), allPlayers.forEach(function(player) {
                        return player.destroy();
                    }), this.reportError(errors_1);
                }
                var allPreviousPlayersMap = new Map(), animationElementMap = new Map();
                queuedInstructions.forEach(function(entry) {
                    var element = entry.element;
                    subTimelines.has(element) && (animationElementMap.set(element, element), _this._beforeAnimationBuild(entry.player.namespaceId, entry.instruction, allPreviousPlayersMap));
                }), skippedPlayers.forEach(function(player) {
                    var element = player.element;
                    _this._getPreviousPlayers(element, !1, player.namespaceId, player.triggerName, null).forEach(function(prevPlayer) {
                        getOrSetAsInMap(allPreviousPlayersMap, element, []).push(prevPlayer), prevPlayer.destroy();
                    });
                });
                var replaceNodes = allLeaveNodes.filter(function(node) {
                    return replacePostStylesAsPre(node, allPreStyleElements, allPostStyleElements);
                }), postStylesMap = new Map();
                cloakAndComputeStyles(postStylesMap, this.driver, leaveNodesWithoutAnimations, allPostStyleElements, AUTO_STYLE).forEach(function(node) {
                    replacePostStylesAsPre(node, allPreStyleElements, allPostStyleElements) && replaceNodes.push(node);
                });
                var preStylesMap = new Map();
                enterNodeMap.forEach(function(nodes, root) {
                    cloakAndComputeStyles(preStylesMap, _this.driver, new Set(nodes), allPreStyleElements, \u0275PRE_STYLE);
                }), replaceNodes.forEach(function(node) {
                    var post = postStylesMap.get(node), pre = preStylesMap.get(node);
                    postStylesMap.set(node, __assign({}, post, pre));
                });
                var rootPlayers = [], subPlayers = [], NO_PARENT_ANIMATION_ELEMENT_DETECTED = {};
                queuedInstructions.forEach(function(entry) {
                    var element = entry.element, player = entry.player, instruction = entry.instruction;
                    if (subTimelines.has(element)) {
                        if (disabledElementsSet.has(element)) return player.onDestroy(function() {
                            return setStyles(element, instruction.toStyles);
                        }), player.disabled = !0, player.overrideTotalTime(instruction.totalTime), void skippedPlayers.push(player);
                        var parentWithAnimation_1 = NO_PARENT_ANIMATION_ELEMENT_DETECTED;
                        if (animationElementMap.size > 1) {
                            for (var elm = element, parentsToAdd = []; elm = elm.parentNode; ) {
                                var detectedParent = animationElementMap.get(elm);
                                if (detectedParent) {
                                    parentWithAnimation_1 = detectedParent;
                                    break;
                                }
                                parentsToAdd.push(elm);
                            }
                            parentsToAdd.forEach(function(parent) {
                                return animationElementMap.set(parent, parentWithAnimation_1);
                            });
                        }
                        var innerPlayer = _this._buildAnimation(player.namespaceId, instruction, allPreviousPlayersMap, skippedPlayersMap, preStylesMap, postStylesMap);
                        if (player.setRealPlayer(innerPlayer), parentWithAnimation_1 === NO_PARENT_ANIMATION_ELEMENT_DETECTED) rootPlayers.push(player); else {
                            var parentPlayers = _this.playersByElement.get(parentWithAnimation_1);
                            parentPlayers && parentPlayers.length && (player.parentPlayer = optimizeGroupPlayer(parentPlayers)), 
                            skippedPlayers.push(player);
                        }
                    } else eraseStyles(element, instruction.fromStyles), player.onDestroy(function() {
                        return setStyles(element, instruction.toStyles);
                    }), subPlayers.push(player), disabledElementsSet.has(element) && skippedPlayers.push(player);
                }), subPlayers.forEach(function(player) {
                    var playersForElement = skippedPlayersMap.get(player.element);
                    if (playersForElement && playersForElement.length) {
                        var innerPlayer = optimizeGroupPlayer(playersForElement);
                        player.setRealPlayer(innerPlayer);
                    }
                }), skippedPlayers.forEach(function(player) {
                    player.parentPlayer ? player.syncPlayerEvents(player.parentPlayer) : player.destroy();
                });
                for (var i_4 = 0; i_4 < allLeaveNodes.length; i_4++) {
                    var element, details = (element = allLeaveNodes[i_4])[REMOVAL_FLAG];
                    if (removeClass(element, "ng-leave"), !details || !details.hasAnimation) {
                        var players = [];
                        if (queriedElements.size) {
                            var queriedPlayerResults = queriedElements.get(element);
                            queriedPlayerResults && queriedPlayerResults.length && players.push.apply(players, __spread(queriedPlayerResults));
                            for (var queriedInnerElements = this.driver.query(element, ".ng-animating", !0), j = 0; j < queriedInnerElements.length; j++) {
                                var queriedPlayers = queriedElements.get(queriedInnerElements[j]);
                                queriedPlayers && queriedPlayers.length && players.push.apply(players, __spread(queriedPlayers));
                            }
                        }
                        var activePlayers = players.filter(function(p) {
                            return !p.destroyed;
                        });
                        activePlayers.length ? removeNodesAfterAnimationDone(this, element, activePlayers) : this.processLeaveNode(element);
                    }
                }
                return allLeaveNodes.length = 0, rootPlayers.forEach(function(player) {
                    _this.players.push(player), player.onDone(function() {
                        player.destroy();
                        var index = _this.players.indexOf(player);
                        _this.players.splice(index, 1);
                    }), player.play();
                }), rootPlayers;
            }, TransitionAnimationEngine.prototype.elementContainsData = function(namespaceId, element) {
                var containsData = !1, details = element[REMOVAL_FLAG];
                return details && details.setForRemoval && (containsData = !0), this.playersByElement.has(element) && (containsData = !0), 
                this.playersByQueriedElement.has(element) && (containsData = !0), this.statesByElement.has(element) && (containsData = !0), 
                this._fetchNamespace(namespaceId).elementContainsData(element) || containsData;
            }, TransitionAnimationEngine.prototype.afterFlush = function(callback) {
                this._flushFns.push(callback);
            }, TransitionAnimationEngine.prototype.afterFlushAnimationsDone = function(callback) {
                this._whenQuietFns.push(callback);
            }, TransitionAnimationEngine.prototype._getPreviousPlayers = function(element, isQueriedElement, namespaceId, triggerName, toStateValue) {
                var players = [];
                if (isQueriedElement) {
                    var queriedElementPlayers = this.playersByQueriedElement.get(element);
                    queriedElementPlayers && (players = queriedElementPlayers);
                } else {
                    var elementPlayers = this.playersByElement.get(element);
                    if (elementPlayers) {
                        var isRemovalAnimation_1 = !toStateValue || "void" == toStateValue;
                        elementPlayers.forEach(function(player) {
                            player.queued || (isRemovalAnimation_1 || player.triggerName == triggerName) && players.push(player);
                        });
                    }
                }
                return (namespaceId || triggerName) && (players = players.filter(function(player) {
                    return !(namespaceId && namespaceId != player.namespaceId || triggerName && triggerName != player.triggerName);
                })), players;
            }, TransitionAnimationEngine.prototype._beforeAnimationBuild = function(namespaceId, instruction, allPreviousPlayersMap) {
                var e_1, _a, rootElement = instruction.element, targetNameSpaceId = instruction.isRemovalTransition ? void 0 : namespaceId, targetTriggerName = instruction.isRemovalTransition ? void 0 : instruction.triggerName, _loop_1 = function(timelineInstruction) {
                    var element = timelineInstruction.element, isQueriedElement = element !== rootElement, players = getOrSetAsInMap(allPreviousPlayersMap, element, []);
                    this_1._getPreviousPlayers(element, isQueriedElement, targetNameSpaceId, targetTriggerName, instruction.toState).forEach(function(player) {
                        var realPlayer = player.getRealPlayer();
                        realPlayer.beforeDestroy && realPlayer.beforeDestroy(), player.destroy(), players.push(player);
                    });
                }, this_1 = this;
                try {
                    for (var _b = __values(instruction.timelines), _c = _b.next(); !_c.done; _c = _b.next()) _loop_1(_c.value);
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
                eraseStyles(rootElement, instruction.fromStyles);
            }, TransitionAnimationEngine.prototype._buildAnimation = function(namespaceId, instruction, allPreviousPlayersMap, skippedPlayersMap, preStylesMap, postStylesMap) {
                var _this = this, triggerName = instruction.triggerName, rootElement = instruction.element, allQueriedPlayers = [], allConsumedElements = new Set(), allSubElements = new Set(), allNewPlayers = instruction.timelines.map(function(timelineInstruction) {
                    var element = timelineInstruction.element;
                    allConsumedElements.add(element);
                    var details = element[REMOVAL_FLAG];
                    if (details && details.removedBeforeQueried) return new NoopAnimationPlayer(timelineInstruction.duration, timelineInstruction.delay);
                    var players, finalPlayers, isQueriedElement = element !== rootElement, previousPlayers = (players = (allPreviousPlayersMap.get(element) || EMPTY_PLAYER_ARRAY).map(function(p) {
                        return p.getRealPlayer();
                    }), finalPlayers = [], function _flattenGroupPlayersRecur(players, finalPlayers) {
                        for (var i = 0; i < players.length; i++) {
                            var player = players[i];
                            player instanceof AnimationGroupPlayer ? _flattenGroupPlayersRecur(player.players, finalPlayers) : finalPlayers.push(player);
                        }
                    }(players, finalPlayers), finalPlayers).filter(function(p) {
                        return !!p.element && p.element === element;
                    }), preStyles = preStylesMap.get(element), postStyles = postStylesMap.get(element), keyframes = normalizeKeyframes(0, _this._normalizer, 0, timelineInstruction.keyframes, preStyles, postStyles), player = _this._buildPlayer(timelineInstruction, keyframes, previousPlayers);
                    if (timelineInstruction.subTimeline && skippedPlayersMap && allSubElements.add(element), 
                    isQueriedElement) {
                        var wrappedPlayer = new browser_TransitionAnimationPlayer(namespaceId, triggerName, element);
                        wrappedPlayer.setRealPlayer(player), allQueriedPlayers.push(wrappedPlayer);
                    }
                    return player;
                });
                allQueriedPlayers.forEach(function(player) {
                    getOrSetAsInMap(_this.playersByQueriedElement, player.element, []).push(player), 
                    player.onDone(function() {
                        return function(map, key, value) {
                            var currentValues;
                            if (map instanceof Map) {
                                if (currentValues = map.get(key)) {
                                    if (currentValues.length) {
                                        var index = currentValues.indexOf(value);
                                        currentValues.splice(index, 1);
                                    }
                                    0 == currentValues.length && map.delete(key);
                                }
                            } else (currentValues = map[key]) && (currentValues.length && (index = currentValues.indexOf(value), 
                            currentValues.splice(index, 1)), 0 == currentValues.length && delete map[key]);
                            return currentValues;
                        }(_this.playersByQueriedElement, player.element, player);
                    });
                }), allConsumedElements.forEach(function(element) {
                    return addClass(element, "ng-animating");
                });
                var player = optimizeGroupPlayer(allNewPlayers);
                return player.onDestroy(function() {
                    allConsumedElements.forEach(function(element) {
                        return removeClass(element, "ng-animating");
                    }), setStyles(rootElement, instruction.toStyles);
                }), allSubElements.forEach(function(element) {
                    getOrSetAsInMap(skippedPlayersMap, element, []).push(player);
                }), player;
            }, TransitionAnimationEngine.prototype._buildPlayer = function(instruction, keyframes, previousPlayers) {
                return keyframes.length > 0 ? this.driver.animate(instruction.element, keyframes, instruction.duration, instruction.delay, instruction.easing, previousPlayers) : new NoopAnimationPlayer(instruction.duration, instruction.delay);
            }, TransitionAnimationEngine;
        }(), browser_TransitionAnimationPlayer = function() {
            function TransitionAnimationPlayer(namespaceId, triggerName, element) {
                this.namespaceId = namespaceId, this.triggerName = triggerName, this.element = element, 
                this._player = new NoopAnimationPlayer(), this._containsRealPlayer = !1, this._queuedCallbacks = {}, 
                this.destroyed = !1, this.markedForDestroy = !1, this.disabled = !1, this.queued = !0, 
                this.totalTime = 0;
            }
            return TransitionAnimationPlayer.prototype.setRealPlayer = function(player) {
                var _this = this;
                this._containsRealPlayer || (this._player = player, Object.keys(this._queuedCallbacks).forEach(function(phase) {
                    _this._queuedCallbacks[phase].forEach(function(callback) {
                        return listenOnPlayer(player, phase, void 0, callback);
                    });
                }), this._queuedCallbacks = {}, this._containsRealPlayer = !0, this.overrideTotalTime(player.totalTime), 
                this.queued = !1);
            }, TransitionAnimationPlayer.prototype.getRealPlayer = function() {
                return this._player;
            }, TransitionAnimationPlayer.prototype.overrideTotalTime = function(totalTime) {
                this.totalTime = totalTime;
            }, TransitionAnimationPlayer.prototype.syncPlayerEvents = function(player) {
                var _this = this, p = this._player;
                p.triggerCallback && player.onStart(function() {
                    return p.triggerCallback("start");
                }), player.onDone(function() {
                    return _this.finish();
                }), player.onDestroy(function() {
                    return _this.destroy();
                });
            }, TransitionAnimationPlayer.prototype._queueEvent = function(name, callback) {
                getOrSetAsInMap(this._queuedCallbacks, name, []).push(callback);
            }, TransitionAnimationPlayer.prototype.onDone = function(fn) {
                this.queued && this._queueEvent("done", fn), this._player.onDone(fn);
            }, TransitionAnimationPlayer.prototype.onStart = function(fn) {
                this.queued && this._queueEvent("start", fn), this._player.onStart(fn);
            }, TransitionAnimationPlayer.prototype.onDestroy = function(fn) {
                this.queued && this._queueEvent("destroy", fn), this._player.onDestroy(fn);
            }, TransitionAnimationPlayer.prototype.init = function() {
                this._player.init();
            }, TransitionAnimationPlayer.prototype.hasStarted = function() {
                return !this.queued && this._player.hasStarted();
            }, TransitionAnimationPlayer.prototype.play = function() {
                !this.queued && this._player.play();
            }, TransitionAnimationPlayer.prototype.pause = function() {
                !this.queued && this._player.pause();
            }, TransitionAnimationPlayer.prototype.restart = function() {
                !this.queued && this._player.restart();
            }, TransitionAnimationPlayer.prototype.finish = function() {
                this._player.finish();
            }, TransitionAnimationPlayer.prototype.destroy = function() {
                this.destroyed = !0, this._player.destroy();
            }, TransitionAnimationPlayer.prototype.reset = function() {
                !this.queued && this._player.reset();
            }, TransitionAnimationPlayer.prototype.setPosition = function(p) {
                this.queued || this._player.setPosition(p);
            }, TransitionAnimationPlayer.prototype.getPosition = function() {
                return this.queued ? 0 : this._player.getPosition();
            }, TransitionAnimationPlayer.prototype.triggerCallback = function(phaseName) {
                var p = this._player;
                p.triggerCallback && p.triggerCallback(phaseName);
            }, TransitionAnimationPlayer;
        }();
        function isElementNode(node) {
            return node && 1 === node.nodeType;
        }
        function cloakElement(element, value) {
            var oldValue = element.style.display;
            return element.style.display = null != value ? value : "none", oldValue;
        }
        function cloakAndComputeStyles(valuesMap, driver, elements, elementPropsMap, defaultStyle) {
            var cloakVals = [];
            elements.forEach(function(element) {
                return cloakVals.push(cloakElement(element));
            });
            var failedElements = [];
            elementPropsMap.forEach(function(props, element) {
                var styles = {};
                props.forEach(function(prop) {
                    var value = styles[prop] = driver.computeStyle(element, prop, defaultStyle);
                    value && 0 != value.length || (element[REMOVAL_FLAG] = NULL_REMOVED_QUERIED_STATE, 
                    failedElements.push(element));
                }), valuesMap.set(element, styles);
            });
            var i = 0;
            return elements.forEach(function(element) {
                return cloakElement(element, cloakVals[i++]);
            }), failedElements;
        }
        function buildRootMap(roots, nodes) {
            var rootMap = new Map();
            if (roots.forEach(function(root) {
                return rootMap.set(root, []);
            }), 0 == nodes.length) return rootMap;
            var nodeSet = new Set(nodes), localRootMap = new Map();
            return nodes.forEach(function(node) {
                var root = function getRoot(node) {
                    if (!node) return 1;
                    var root = localRootMap.get(node);
                    if (root) return root;
                    var parent = node.parentNode;
                    return root = rootMap.has(parent) ? parent : nodeSet.has(parent) ? 1 : getRoot(parent), 
                    localRootMap.set(node, root), root;
                }(node);
                1 !== root && rootMap.get(root).push(node);
            }), rootMap;
        }
        var CLASSES_CACHE_KEY = "$$classes";
        function addClass(element, className) {
            if (element.classList) element.classList.add(className); else {
                var classes = element[CLASSES_CACHE_KEY];
                classes || (classes = element[CLASSES_CACHE_KEY] = {}), classes[className] = !0;
            }
        }
        function removeClass(element, className) {
            if (element.classList) element.classList.remove(className); else {
                var classes = element[CLASSES_CACHE_KEY];
                classes && delete classes[className];
            }
        }
        function removeNodesAfterAnimationDone(engine, element, players) {
            optimizeGroupPlayer(players).onDone(function() {
                return engine.processLeaveNode(element);
            });
        }
        function replacePostStylesAsPre(element, allPreStyleElements, allPostStyleElements) {
            var postEntry = allPostStyleElements.get(element);
            if (!postEntry) return !1;
            var preEntry = allPreStyleElements.get(element);
            return preEntry ? postEntry.forEach(function(data) {
                return preEntry.add(data);
            }) : allPreStyleElements.set(element, postEntry), allPostStyleElements.delete(element), 
            !0;
        }
        var browser_AnimationEngine = function() {
            function AnimationEngine(bodyNode, _driver, normalizer) {
                var _this = this;
                this.bodyNode = bodyNode, this._driver = _driver, this._triggerCache = {}, this.onRemovalComplete = function(element, context) {}, 
                this._transitionEngine = new browser_TransitionAnimationEngine(bodyNode, _driver, normalizer), 
                this._timelineEngine = new browser_TimelineAnimationEngine(bodyNode, _driver, normalizer), 
                this._transitionEngine.onRemovalComplete = function(element, context) {
                    return _this.onRemovalComplete(element, context);
                };
            }
            return AnimationEngine.prototype.registerTrigger = function(componentId, namespaceId, hostElement, name, metadata) {
                var cacheKey = componentId + "-" + name, trigger = this._triggerCache[cacheKey];
                if (!trigger) {
                    var errors = [], ast = buildAnimationAst(this._driver, metadata, errors);
                    if (errors.length) throw new Error('The animation trigger "' + name + '" has failed to build due to the following errors:\n - ' + errors.join("\n - "));
                    trigger = function(name, ast) {
                        return new AnimationTrigger(name, ast);
                    }(name, ast), this._triggerCache[cacheKey] = trigger;
                }
                this._transitionEngine.registerTrigger(namespaceId, name, trigger);
            }, AnimationEngine.prototype.register = function(namespaceId, hostElement) {
                this._transitionEngine.register(namespaceId, hostElement);
            }, AnimationEngine.prototype.destroy = function(namespaceId, context) {
                this._transitionEngine.destroy(namespaceId, context);
            }, AnimationEngine.prototype.onInsert = function(namespaceId, element, parent, insertBefore) {
                this._transitionEngine.insertNode(namespaceId, element, parent, insertBefore);
            }, AnimationEngine.prototype.onRemove = function(namespaceId, element, context, isHostElement) {
                this._transitionEngine.removeNode(namespaceId, element, isHostElement || !1, context);
            }, AnimationEngine.prototype.disableAnimations = function(element, disable) {
                this._transitionEngine.markElementAsDisabled(element, disable);
            }, AnimationEngine.prototype.process = function(namespaceId, element, property, value) {
                if ("@" == property.charAt(0)) {
                    var _a = __read(parseTimelineCommand(property), 2);
                    this._timelineEngine.command(_a[0], element, _a[1], value);
                } else this._transitionEngine.trigger(namespaceId, element, property, value);
            }, AnimationEngine.prototype.listen = function(namespaceId, element, eventName, eventPhase, callback) {
                if ("@" == eventName.charAt(0)) {
                    var _a = __read(parseTimelineCommand(eventName), 2);
                    return this._timelineEngine.listen(_a[0], element, _a[1], callback);
                }
                return this._transitionEngine.listen(namespaceId, element, eventName, eventPhase, callback);
            }, AnimationEngine.prototype.flush = function(microtaskId) {
                void 0 === microtaskId && (microtaskId = -1), this._transitionEngine.flush(microtaskId);
            }, Object.defineProperty(AnimationEngine.prototype, "players", {
                get: function() {
                    return this._transitionEngine.players.concat(this._timelineEngine.players);
                },
                enumerable: !0,
                configurable: !0
            }), AnimationEngine.prototype.whenRenderingDone = function() {
                return this._transitionEngine.whenRenderingDone();
            }, AnimationEngine;
        }();
        function packageNonAnimatableStyles(element, styles) {
            var startStyles = null, endStyles = null;
            return Array.isArray(styles) && styles.length ? (startStyles = filterNonAnimatableStyles(styles[0]), 
            styles.length > 1 && (endStyles = filterNonAnimatableStyles(styles[styles.length - 1]))) : styles && (startStyles = filterNonAnimatableStyles(styles)), 
            startStyles || endStyles ? new SpecialCasedStyles(element, startStyles, endStyles) : null;
        }
        var SpecialCasedStyles = function() {
            function SpecialCasedStyles(_element, _startStyles, _endStyles) {
                this._element = _element, this._startStyles = _startStyles, this._endStyles = _endStyles, 
                this._state = 0;
                var initialStyles = SpecialCasedStyles.initialStylesByElement.get(_element);
                initialStyles || SpecialCasedStyles.initialStylesByElement.set(_element, initialStyles = {}), 
                this._initialStyles = initialStyles;
            }
            return SpecialCasedStyles.prototype.start = function() {
                this._state < 1 && (this._startStyles && setStyles(this._element, this._startStyles, this._initialStyles), 
                this._state = 1);
            }, SpecialCasedStyles.prototype.finish = function() {
                this.start(), this._state < 2 && (setStyles(this._element, this._initialStyles), 
                this._endStyles && (setStyles(this._element, this._endStyles), this._endStyles = null), 
                this._state = 1);
            }, SpecialCasedStyles.prototype.destroy = function() {
                this.finish(), this._state < 3 && (SpecialCasedStyles.initialStylesByElement.delete(this._element), 
                this._startStyles && (eraseStyles(this._element, this._startStyles), this._endStyles = null), 
                this._endStyles && (eraseStyles(this._element, this._endStyles), this._endStyles = null), 
                setStyles(this._element, this._initialStyles), this._state = 3);
            }, SpecialCasedStyles.initialStylesByElement = new WeakMap(), SpecialCasedStyles;
        }();
        function filterNonAnimatableStyles(styles) {
            for (var result = null, props = Object.keys(styles), i = 0; i < props.length; i++) {
                var prop = props[i];
                isNonAnimatableStyle(prop) && ((result = result || {})[prop] = styles[prop]);
            }
            return result;
        }
        function isNonAnimatableStyle(prop) {
            return "display" === prop || "position" === prop;
        }
        var ANIMATION_PROP = "animation", ANIMATIONEND_EVENT = "animationend", ElementAnimationStyleHandler = function() {
            function ElementAnimationStyleHandler(_element, _name, _duration, _delay, _easing, _fillMode, _onDoneFn) {
                var _this = this;
                this._element = _element, this._name = _name, this._duration = _duration, this._delay = _delay, 
                this._easing = _easing, this._fillMode = _fillMode, this._onDoneFn = _onDoneFn, 
                this._finished = !1, this._destroyed = !1, this._startTime = 0, this._position = 0, 
                this._eventFn = function(e) {
                    return _this._handleCallback(e);
                };
            }
            return ElementAnimationStyleHandler.prototype.apply = function() {
                var element, value, anim;
                value = this._duration + "ms " + this._easing + " " + this._delay + "ms 1 normal " + this._fillMode + " " + this._name, 
                (anim = getAnimationStyle(element = this._element, "").trim()).length && (function(value, char) {
                    for (var i = 0; i < value.length; i++) "," === value.charAt(i) && 0;
                }(anim), value = anim + ", " + value), setAnimationStyle(element, "", value), addRemoveAnimationEvent(this._element, this._eventFn, !1), 
                this._startTime = Date.now();
            }, ElementAnimationStyleHandler.prototype.pause = function() {
                playPauseAnimation(this._element, this._name, "paused");
            }, ElementAnimationStyleHandler.prototype.resume = function() {
                playPauseAnimation(this._element, this._name, "running");
            }, ElementAnimationStyleHandler.prototype.setPosition = function(position) {
                var index = findIndexForAnimation(this._element, this._name);
                this._position = position * this._duration, setAnimationStyle(this._element, "Delay", "-" + this._position + "ms", index);
            }, ElementAnimationStyleHandler.prototype.getPosition = function() {
                return this._position;
            }, ElementAnimationStyleHandler.prototype._handleCallback = function(event) {
                var timestamp = event._ngTestManualTimestamp || Date.now(), elapsedTime = 1e3 * parseFloat(event.elapsedTime.toFixed(3));
                event.animationName == this._name && Math.max(timestamp - this._startTime, 0) >= this._delay && elapsedTime >= this._duration && this.finish();
            }, ElementAnimationStyleHandler.prototype.finish = function() {
                this._finished || (this._finished = !0, this._onDoneFn(), addRemoveAnimationEvent(this._element, this._eventFn, !0));
            }, ElementAnimationStyleHandler.prototype.destroy = function() {
                var element, name, tokens, index;
                this._destroyed || (this._destroyed = !0, this.finish(), name = this._name, (index = findMatchingTokenIndex(tokens = getAnimationStyle(element = this._element, "").split(","), name)) >= 0 && (tokens.splice(index, 1), 
                setAnimationStyle(element, "", tokens.join(","))));
            }, ElementAnimationStyleHandler;
        }();
        function playPauseAnimation(element, name, status) {
            setAnimationStyle(element, "PlayState", status, findIndexForAnimation(element, name));
        }
        function findIndexForAnimation(element, value) {
            var anim = getAnimationStyle(element, "");
            return anim.indexOf(",") > 0 ? findMatchingTokenIndex(anim.split(","), value) : findMatchingTokenIndex([ anim ], value);
        }
        function findMatchingTokenIndex(tokens, searchToken) {
            for (var i = 0; i < tokens.length; i++) if (tokens[i].indexOf(searchToken) >= 0) return i;
            return -1;
        }
        function addRemoveAnimationEvent(element, fn, doRemove) {
            doRemove ? element.removeEventListener(ANIMATIONEND_EVENT, fn) : element.addEventListener(ANIMATIONEND_EVENT, fn);
        }
        function setAnimationStyle(element, name, value, index) {
            var prop = ANIMATION_PROP + name;
            if (null != index) {
                var oldValue = element.style[prop];
                if (oldValue.length) {
                    var tokens = oldValue.split(",");
                    tokens[index] = value, value = tokens.join(",");
                }
            }
            element.style[prop] = value;
        }
        function getAnimationStyle(element, name) {
            return element.style[ANIMATION_PROP + name];
        }
        var DEFAULT_EASING = "linear", CssKeyframesPlayer = function() {
            function CssKeyframesPlayer(element, keyframes, animationName, _duration, _delay, easing, _finalStyles, _specialStyles) {
                this.element = element, this.keyframes = keyframes, this.animationName = animationName, 
                this._duration = _duration, this._delay = _delay, this._finalStyles = _finalStyles, 
                this._specialStyles = _specialStyles, this._onDoneFns = [], this._onStartFns = [], 
                this._onDestroyFns = [], this._started = !1, this.currentSnapshot = {}, this._state = 0, 
                this.easing = easing || DEFAULT_EASING, this.totalTime = _duration + _delay, this._buildStyler();
            }
            return CssKeyframesPlayer.prototype.onStart = function(fn) {
                this._onStartFns.push(fn);
            }, CssKeyframesPlayer.prototype.onDone = function(fn) {
                this._onDoneFns.push(fn);
            }, CssKeyframesPlayer.prototype.onDestroy = function(fn) {
                this._onDestroyFns.push(fn);
            }, CssKeyframesPlayer.prototype.destroy = function() {
                this.init(), this._state >= 4 || (this._state = 4, this._styler.destroy(), this._flushStartFns(), 
                this._flushDoneFns(), this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(function(fn) {
                    return fn();
                }), this._onDestroyFns = []);
            }, CssKeyframesPlayer.prototype._flushDoneFns = function() {
                this._onDoneFns.forEach(function(fn) {
                    return fn();
                }), this._onDoneFns = [];
            }, CssKeyframesPlayer.prototype._flushStartFns = function() {
                this._onStartFns.forEach(function(fn) {
                    return fn();
                }), this._onStartFns = [];
            }, CssKeyframesPlayer.prototype.finish = function() {
                this.init(), this._state >= 3 || (this._state = 3, this._styler.finish(), this._flushStartFns(), 
                this._specialStyles && this._specialStyles.finish(), this._flushDoneFns());
            }, CssKeyframesPlayer.prototype.setPosition = function(value) {
                this._styler.setPosition(value);
            }, CssKeyframesPlayer.prototype.getPosition = function() {
                return this._styler.getPosition();
            }, CssKeyframesPlayer.prototype.hasStarted = function() {
                return this._state >= 2;
            }, CssKeyframesPlayer.prototype.init = function() {
                this._state >= 1 || (this._state = 1, this._styler.apply(), this._delay && this._styler.pause());
            }, CssKeyframesPlayer.prototype.play = function() {
                this.init(), this.hasStarted() || (this._flushStartFns(), this._state = 2, this._specialStyles && this._specialStyles.start()), 
                this._styler.resume();
            }, CssKeyframesPlayer.prototype.pause = function() {
                this.init(), this._styler.pause();
            }, CssKeyframesPlayer.prototype.restart = function() {
                this.reset(), this.play();
            }, CssKeyframesPlayer.prototype.reset = function() {
                this._styler.destroy(), this._buildStyler(), this._styler.apply();
            }, CssKeyframesPlayer.prototype._buildStyler = function() {
                var _this = this;
                this._styler = new ElementAnimationStyleHandler(this.element, this.animationName, this._duration, this._delay, this.easing, "forwards", function() {
                    return _this.finish();
                });
            }, CssKeyframesPlayer.prototype.triggerCallback = function(phaseName) {
                var methods = "start" == phaseName ? this._onStartFns : this._onDoneFns;
                methods.forEach(function(fn) {
                    return fn();
                }), methods.length = 0;
            }, CssKeyframesPlayer.prototype.beforeDestroy = function() {
                var _this = this;
                this.init();
                var styles = {};
                if (this.hasStarted()) {
                    var finished_1 = this._state >= 3;
                    Object.keys(this._finalStyles).forEach(function(prop) {
                        "offset" != prop && (styles[prop] = finished_1 ? _this._finalStyles[prop] : computeStyle(_this.element, prop));
                    });
                }
                this.currentSnapshot = styles;
            }, CssKeyframesPlayer;
        }(), browser_DirectStylePlayer = function(_super) {
            function DirectStylePlayer(element, styles) {
                var _this = _super.call(this) || this;
                return _this.element = element, _this._startingStyles = {}, _this.__initialized = !1, 
                _this._styles = hypenatePropsObject(styles), _this;
            }
            return __extends(DirectStylePlayer, _super), DirectStylePlayer.prototype.init = function() {
                var _this = this;
                !this.__initialized && this._startingStyles && (this.__initialized = !0, Object.keys(this._styles).forEach(function(prop) {
                    _this._startingStyles[prop] = _this.element.style[prop];
                }), _super.prototype.init.call(this));
            }, DirectStylePlayer.prototype.play = function() {
                var _this = this;
                this._startingStyles && (this.init(), Object.keys(this._styles).forEach(function(prop) {
                    return _this.element.style.setProperty(prop, _this._styles[prop]);
                }), _super.prototype.play.call(this));
            }, DirectStylePlayer.prototype.destroy = function() {
                var _this = this;
                this._startingStyles && (Object.keys(this._startingStyles).forEach(function(prop) {
                    var value = _this._startingStyles[prop];
                    value ? _this.element.style.setProperty(prop, value) : _this.element.style.removeProperty(prop);
                }), this._startingStyles = null, _super.prototype.destroy.call(this));
            }, DirectStylePlayer;
        }(NoopAnimationPlayer), CssKeyframesDriver = function() {
            function CssKeyframesDriver() {
                this._count = 0, this._head = document.querySelector("head"), this._warningIssued = !1;
            }
            return CssKeyframesDriver.prototype.validateStyleProperty = function(prop) {
                return validateStyleProperty(prop);
            }, CssKeyframesDriver.prototype.matchesElement = function(element, selector) {
                return matchesElement(element, selector);
            }, CssKeyframesDriver.prototype.containsElement = function(elm1, elm2) {
                return containsElement(elm1, elm2);
            }, CssKeyframesDriver.prototype.query = function(element, selector, multi) {
                return invokeQuery(element, selector, multi);
            }, CssKeyframesDriver.prototype.computeStyle = function(element, prop, defaultValue) {
                return window.getComputedStyle(element)[prop];
            }, CssKeyframesDriver.prototype.buildKeyframeElement = function(element, name, keyframes) {
                keyframes = keyframes.map(function(kf) {
                    return hypenatePropsObject(kf);
                });
                var keyframeStr = "@keyframes " + name + " {\n", tab = "";
                keyframes.forEach(function(kf) {
                    tab = " ";
                    var offset = parseFloat(kf.offset);
                    keyframeStr += "" + tab + 100 * offset + "% {\n", tab += " ", Object.keys(kf).forEach(function(prop) {
                        var value = kf[prop];
                        switch (prop) {
                          case "offset":
                            return;

                          case "easing":
                            return void (value && (keyframeStr += tab + "animation-timing-function: " + value + ";\n"));

                          default:
                            return void (keyframeStr += "" + tab + prop + ": " + value + ";\n");
                        }
                    }), keyframeStr += tab + "}\n";
                }), keyframeStr += "}\n";
                var kfElm = document.createElement("style");
                return kfElm.innerHTML = keyframeStr, kfElm;
            }, CssKeyframesDriver.prototype.animate = function(element, keyframes, duration, delay, easing, previousPlayers, scrubberAccessRequested) {
                void 0 === previousPlayers && (previousPlayers = []), scrubberAccessRequested && this._notifyFaultyScrubber();
                var previousCssKeyframePlayers = previousPlayers.filter(function(player) {
                    return player instanceof CssKeyframesPlayer;
                }), previousStyles = {};
                allowPreviousPlayerStylesMerge(duration, delay) && previousCssKeyframePlayers.forEach(function(player) {
                    var styles = player.currentSnapshot;
                    Object.keys(styles).forEach(function(prop) {
                        return previousStyles[prop] = styles[prop];
                    });
                });
                var finalStyles = function(keyframes) {
                    var flatKeyframes = {};
                    return keyframes && (Array.isArray(keyframes) ? keyframes : [ keyframes ]).forEach(function(kf) {
                        Object.keys(kf).forEach(function(prop) {
                            "offset" != prop && "easing" != prop && (flatKeyframes[prop] = kf[prop]);
                        });
                    }), flatKeyframes;
                }(keyframes = balancePreviousStylesIntoKeyframes(element, keyframes, previousStyles));
                if (0 == duration) return new browser_DirectStylePlayer(element, finalStyles);
                var animationName = "gen_css_kf_" + this._count++, kfElm = this.buildKeyframeElement(element, animationName, keyframes);
                document.querySelector("head").appendChild(kfElm);
                var specialStyles = packageNonAnimatableStyles(element, keyframes), player = new CssKeyframesPlayer(element, keyframes, animationName, duration, delay, easing, finalStyles, specialStyles);
                return player.onDestroy(function() {
                    var node;
                    (node = kfElm).parentNode.removeChild(node);
                }), player;
            }, CssKeyframesDriver.prototype._notifyFaultyScrubber = function() {
                this._warningIssued || (console.warn("@angular/animations: please load the web-animations.js polyfill to allow programmatic access...\n", "  visit http://bit.ly/IWukam to learn more about using the web-animation-js polyfill."), 
                this._warningIssued = !0);
            }, CssKeyframesDriver;
        }(), WebAnimationsPlayer = function() {
            function WebAnimationsPlayer(element, keyframes, options, _specialStyles) {
                this.element = element, this.keyframes = keyframes, this.options = options, this._specialStyles = _specialStyles, 
                this._onDoneFns = [], this._onStartFns = [], this._onDestroyFns = [], this._initialized = !1, 
                this._finished = !1, this._started = !1, this._destroyed = !1, this.time = 0, this.parentPlayer = null, 
                this.currentSnapshot = {}, this._duration = options.duration, this._delay = options.delay || 0, 
                this.time = this._duration + this._delay;
            }
            return WebAnimationsPlayer.prototype._onFinish = function() {
                this._finished || (this._finished = !0, this._onDoneFns.forEach(function(fn) {
                    return fn();
                }), this._onDoneFns = []);
            }, WebAnimationsPlayer.prototype.init = function() {
                this._buildPlayer(), this._preparePlayerBeforeStart();
            }, WebAnimationsPlayer.prototype._buildPlayer = function() {
                var _this = this;
                if (!this._initialized) {
                    this._initialized = !0;
                    var keyframes = this.keyframes;
                    this.domPlayer = this._triggerWebAnimation(this.element, keyframes, this.options), 
                    this._finalKeyframe = keyframes.length ? keyframes[keyframes.length - 1] : {}, this.domPlayer.addEventListener("finish", function() {
                        return _this._onFinish();
                    });
                }
            }, WebAnimationsPlayer.prototype._preparePlayerBeforeStart = function() {
                this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
            }, WebAnimationsPlayer.prototype._triggerWebAnimation = function(element, keyframes, options) {
                return element.animate(keyframes, options);
            }, WebAnimationsPlayer.prototype.onStart = function(fn) {
                this._onStartFns.push(fn);
            }, WebAnimationsPlayer.prototype.onDone = function(fn) {
                this._onDoneFns.push(fn);
            }, WebAnimationsPlayer.prototype.onDestroy = function(fn) {
                this._onDestroyFns.push(fn);
            }, WebAnimationsPlayer.prototype.play = function() {
                this._buildPlayer(), this.hasStarted() || (this._onStartFns.forEach(function(fn) {
                    return fn();
                }), this._onStartFns = [], this._started = !0, this._specialStyles && this._specialStyles.start()), 
                this.domPlayer.play();
            }, WebAnimationsPlayer.prototype.pause = function() {
                this.init(), this.domPlayer.pause();
            }, WebAnimationsPlayer.prototype.finish = function() {
                this.init(), this._specialStyles && this._specialStyles.finish(), this._onFinish(), 
                this.domPlayer.finish();
            }, WebAnimationsPlayer.prototype.reset = function() {
                this._resetDomPlayerState(), this._destroyed = !1, this._finished = !1, this._started = !1;
            }, WebAnimationsPlayer.prototype._resetDomPlayerState = function() {
                this.domPlayer && this.domPlayer.cancel();
            }, WebAnimationsPlayer.prototype.restart = function() {
                this.reset(), this.play();
            }, WebAnimationsPlayer.prototype.hasStarted = function() {
                return this._started;
            }, WebAnimationsPlayer.prototype.destroy = function() {
                this._destroyed || (this._destroyed = !0, this._resetDomPlayerState(), this._onFinish(), 
                this._specialStyles && this._specialStyles.destroy(), this._onDestroyFns.forEach(function(fn) {
                    return fn();
                }), this._onDestroyFns = []);
            }, WebAnimationsPlayer.prototype.setPosition = function(p) {
                this.domPlayer.currentTime = p * this.time;
            }, WebAnimationsPlayer.prototype.getPosition = function() {
                return this.domPlayer.currentTime / this.time;
            }, Object.defineProperty(WebAnimationsPlayer.prototype, "totalTime", {
                get: function() {
                    return this._delay + this._duration;
                },
                enumerable: !0,
                configurable: !0
            }), WebAnimationsPlayer.prototype.beforeDestroy = function() {
                var _this = this, styles = {};
                this.hasStarted() && Object.keys(this._finalKeyframe).forEach(function(prop) {
                    "offset" != prop && (styles[prop] = _this._finished ? _this._finalKeyframe[prop] : computeStyle(_this.element, prop));
                }), this.currentSnapshot = styles;
            }, WebAnimationsPlayer.prototype.triggerCallback = function(phaseName) {
                var methods = "start" == phaseName ? this._onStartFns : this._onDoneFns;
                methods.forEach(function(fn) {
                    return fn();
                }), methods.length = 0;
            }, WebAnimationsPlayer;
        }(), WebAnimationsDriver = function() {
            function WebAnimationsDriver() {
                this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(getElementAnimateFn().toString()), 
                this._cssKeyframesDriver = new CssKeyframesDriver();
            }
            return WebAnimationsDriver.prototype.validateStyleProperty = function(prop) {
                return validateStyleProperty(prop);
            }, WebAnimationsDriver.prototype.matchesElement = function(element, selector) {
                return matchesElement(element, selector);
            }, WebAnimationsDriver.prototype.containsElement = function(elm1, elm2) {
                return containsElement(elm1, elm2);
            }, WebAnimationsDriver.prototype.query = function(element, selector, multi) {
                return invokeQuery(element, selector, multi);
            }, WebAnimationsDriver.prototype.computeStyle = function(element, prop, defaultValue) {
                return window.getComputedStyle(element)[prop];
            }, WebAnimationsDriver.prototype.overrideWebAnimationsSupport = function(supported) {
                this._isNativeImpl = supported;
            }, WebAnimationsDriver.prototype.animate = function(element, keyframes, duration, delay, easing, previousPlayers, scrubberAccessRequested) {
                if (void 0 === previousPlayers && (previousPlayers = []), !scrubberAccessRequested && !this._isNativeImpl) return this._cssKeyframesDriver.animate(element, keyframes, duration, delay, easing, previousPlayers);
                var playerOptions = {
                    duration: duration,
                    delay: delay,
                    fill: 0 == delay ? "both" : "forwards"
                };
                easing && (playerOptions.easing = easing);
                var previousStyles = {}, previousWebAnimationPlayers = previousPlayers.filter(function(player) {
                    return player instanceof WebAnimationsPlayer;
                });
                allowPreviousPlayerStylesMerge(duration, delay) && previousWebAnimationPlayers.forEach(function(player) {
                    var styles = player.currentSnapshot;
                    Object.keys(styles).forEach(function(prop) {
                        return previousStyles[prop] = styles[prop];
                    });
                });
                var specialStyles = packageNonAnimatableStyles(element, keyframes = balancePreviousStylesIntoKeyframes(element, keyframes = keyframes.map(function(styles) {
                    return copyStyles(styles, !1);
                }), previousStyles));
                return new WebAnimationsPlayer(element, keyframes, playerOptions, specialStyles);
            }, WebAnimationsDriver;
        }();
        function getElementAnimateFn() {
            return "undefined" != typeof window && void 0 !== window.document && Element.prototype.animate || {};
        }
        var animations_BrowserAnimationBuilder = function(_super) {
            function BrowserAnimationBuilder(rootRenderer, doc) {
                var _this = _super.call(this) || this;
                return _this._nextAnimationId = 0, _this._renderer = rootRenderer.createRenderer(doc.body, {
                    id: "0",
                    encapsulation: ViewEncapsulation.None,
                    styles: [],
                    data: {
                        animation: []
                    }
                }), _this;
            }
            return __extends(BrowserAnimationBuilder, _super), BrowserAnimationBuilder.prototype.build = function(animation) {
                var id = this._nextAnimationId.toString();
                this._nextAnimationId++;
                var entry = Array.isArray(animation) ? sequence(animation) : animation;
                return issueAnimationCommand(this._renderer, null, id, "register", [ entry ]), new animations_BrowserAnimationFactory(id, this._renderer);
            }, BrowserAnimationBuilder;
        }(AnimationBuilder), animations_BrowserAnimationFactory = function(_super) {
            function BrowserAnimationFactory(_id, _renderer) {
                var _this = _super.call(this) || this;
                return _this._id = _id, _this._renderer = _renderer, _this;
            }
            return __extends(BrowserAnimationFactory, _super), BrowserAnimationFactory.prototype.create = function(element, options) {
                return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
            }, BrowserAnimationFactory;
        }(AnimationFactory), RendererAnimationPlayer = function() {
            function RendererAnimationPlayer(id, element, options, _renderer) {
                this.id = id, this.element = element, this._renderer = _renderer, this.parentPlayer = null, 
                this._started = !1, this.totalTime = 0, this._command("create", options);
            }
            return RendererAnimationPlayer.prototype._listen = function(eventName, callback) {
                return this._renderer.listen(this.element, "@@" + this.id + ":" + eventName, callback);
            }, RendererAnimationPlayer.prototype._command = function(command) {
                for (var args = [], _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
                return issueAnimationCommand(this._renderer, this.element, this.id, command, args);
            }, RendererAnimationPlayer.prototype.onDone = function(fn) {
                this._listen("done", fn);
            }, RendererAnimationPlayer.prototype.onStart = function(fn) {
                this._listen("start", fn);
            }, RendererAnimationPlayer.prototype.onDestroy = function(fn) {
                this._listen("destroy", fn);
            }, RendererAnimationPlayer.prototype.init = function() {
                this._command("init");
            }, RendererAnimationPlayer.prototype.hasStarted = function() {
                return this._started;
            }, RendererAnimationPlayer.prototype.play = function() {
                this._command("play"), this._started = !0;
            }, RendererAnimationPlayer.prototype.pause = function() {
                this._command("pause");
            }, RendererAnimationPlayer.prototype.restart = function() {
                this._command("restart");
            }, RendererAnimationPlayer.prototype.finish = function() {
                this._command("finish");
            }, RendererAnimationPlayer.prototype.destroy = function() {
                this._command("destroy");
            }, RendererAnimationPlayer.prototype.reset = function() {
                this._command("reset");
            }, RendererAnimationPlayer.prototype.setPosition = function(p) {
                this._command("setPosition", p);
            }, RendererAnimationPlayer.prototype.getPosition = function() {
                return 0;
            }, RendererAnimationPlayer;
        }();
        function issueAnimationCommand(renderer, element, id, command, args) {
            return renderer.setProperty(element, "@@" + id + ":" + command, args);
        }
        var animations_AnimationRendererFactory = function() {
            function AnimationRendererFactory(delegate, engine, _zone) {
                this.delegate = delegate, this.engine = engine, this._zone = _zone, this._currentId = 0, 
                this._microtaskId = 1, this._animationCallbacksBuffer = [], this._rendererCache = new Map(), 
                this._cdRecurDepth = 0, this.promise = Promise.resolve(0), engine.onRemovalComplete = function(element, delegate) {
                    delegate && delegate.parentNode(element) && delegate.removeChild(element.parentNode, element);
                };
            }
            return AnimationRendererFactory.prototype.createRenderer = function(hostElement, type) {
                var _this = this, delegate = this.delegate.createRenderer(hostElement, type);
                if (!(hostElement && type && type.data && type.data.animation)) {
                    var renderer = this._rendererCache.get(delegate);
                    return renderer || (renderer = new BaseAnimationRenderer("", delegate, this.engine), 
                    this._rendererCache.set(delegate, renderer)), renderer;
                }
                var componentId = type.id, namespaceId = type.id + "-" + this._currentId;
                return this._currentId++, this.engine.register(namespaceId, hostElement), type.data.animation.forEach(function(trigger) {
                    return _this.engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger);
                }), new animations_AnimationRenderer(this, namespaceId, delegate, this.engine);
            }, AnimationRendererFactory.prototype.begin = function() {
                this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
            }, AnimationRendererFactory.prototype._scheduleCountTask = function() {
                var _this = this;
                this.promise.then(function() {
                    _this._microtaskId++;
                });
            }, AnimationRendererFactory.prototype.scheduleListenerCallback = function(count, fn, data) {
                var _this = this;
                count >= 0 && count < this._microtaskId ? this._zone.run(function() {
                    return fn(data);
                }) : (0 == this._animationCallbacksBuffer.length && Promise.resolve(null).then(function() {
                    _this._zone.run(function() {
                        _this._animationCallbacksBuffer.forEach(function(tuple) {
                            var _a = __read(tuple, 2);
                            (0, _a[0])(_a[1]);
                        }), _this._animationCallbacksBuffer = [];
                    });
                }), this._animationCallbacksBuffer.push([ fn, data ]));
            }, AnimationRendererFactory.prototype.end = function() {
                var _this = this;
                this._cdRecurDepth--, 0 == this._cdRecurDepth && this._zone.runOutsideAngular(function() {
                    _this._scheduleCountTask(), _this.engine.flush(_this._microtaskId);
                }), this.delegate.end && this.delegate.end();
            }, AnimationRendererFactory.prototype.whenRenderingDone = function() {
                return this.engine.whenRenderingDone();
            }, AnimationRendererFactory;
        }(), BaseAnimationRenderer = function() {
            function BaseAnimationRenderer(namespaceId, delegate, engine) {
                this.namespaceId = namespaceId, this.delegate = delegate, this.engine = engine, 
                this.destroyNode = this.delegate.destroyNode ? function(n) {
                    return delegate.destroyNode(n);
                } : null;
            }
            return Object.defineProperty(BaseAnimationRenderer.prototype, "data", {
                get: function() {
                    return this.delegate.data;
                },
                enumerable: !0,
                configurable: !0
            }), BaseAnimationRenderer.prototype.destroy = function() {
                this.engine.destroy(this.namespaceId, this.delegate), this.delegate.destroy();
            }, BaseAnimationRenderer.prototype.createElement = function(name, namespace) {
                return this.delegate.createElement(name, namespace);
            }, BaseAnimationRenderer.prototype.createComment = function(value) {
                return this.delegate.createComment(value);
            }, BaseAnimationRenderer.prototype.createText = function(value) {
                return this.delegate.createText(value);
            }, BaseAnimationRenderer.prototype.appendChild = function(parent, newChild) {
                this.delegate.appendChild(parent, newChild), this.engine.onInsert(this.namespaceId, newChild, parent, !1);
            }, BaseAnimationRenderer.prototype.insertBefore = function(parent, newChild, refChild) {
                this.delegate.insertBefore(parent, newChild, refChild), this.engine.onInsert(this.namespaceId, newChild, parent, !0);
            }, BaseAnimationRenderer.prototype.removeChild = function(parent, oldChild, isHostElement) {
                this.engine.onRemove(this.namespaceId, oldChild, this.delegate, isHostElement);
            }, BaseAnimationRenderer.prototype.selectRootElement = function(selectorOrNode, preserveContent) {
                return this.delegate.selectRootElement(selectorOrNode, preserveContent);
            }, BaseAnimationRenderer.prototype.parentNode = function(node) {
                return this.delegate.parentNode(node);
            }, BaseAnimationRenderer.prototype.nextSibling = function(node) {
                return this.delegate.nextSibling(node);
            }, BaseAnimationRenderer.prototype.setAttribute = function(el, name, value, namespace) {
                this.delegate.setAttribute(el, name, value, namespace);
            }, BaseAnimationRenderer.prototype.removeAttribute = function(el, name, namespace) {
                this.delegate.removeAttribute(el, name, namespace);
            }, BaseAnimationRenderer.prototype.addClass = function(el, name) {
                this.delegate.addClass(el, name);
            }, BaseAnimationRenderer.prototype.removeClass = function(el, name) {
                this.delegate.removeClass(el, name);
            }, BaseAnimationRenderer.prototype.setStyle = function(el, style, value, flags) {
                this.delegate.setStyle(el, style, value, flags);
            }, BaseAnimationRenderer.prototype.removeStyle = function(el, style, flags) {
                this.delegate.removeStyle(el, style, flags);
            }, BaseAnimationRenderer.prototype.setProperty = function(el, name, value) {
                "@" == name.charAt(0) && "@.disabled" == name ? this.disableAnimations(el, !!value) : this.delegate.setProperty(el, name, value);
            }, BaseAnimationRenderer.prototype.setValue = function(node, value) {
                this.delegate.setValue(node, value);
            }, BaseAnimationRenderer.prototype.listen = function(target, eventName, callback) {
                return this.delegate.listen(target, eventName, callback);
            }, BaseAnimationRenderer.prototype.disableAnimations = function(element, value) {
                this.engine.disableAnimations(element, value);
            }, BaseAnimationRenderer;
        }(), animations_AnimationRenderer = function(_super) {
            function AnimationRenderer(factory, namespaceId, delegate, engine) {
                var _this = _super.call(this, namespaceId, delegate, engine) || this;
                return _this.factory = factory, _this.namespaceId = namespaceId, _this;
            }
            return __extends(AnimationRenderer, _super), AnimationRenderer.prototype.setProperty = function(el, name, value) {
                "@" == name.charAt(0) ? "." == name.charAt(1) && "@.disabled" == name ? this.disableAnimations(el, value = void 0 === value || !!value) : this.engine.process(this.namespaceId, el, name.substr(1), value) : this.delegate.setProperty(el, name, value);
            }, AnimationRenderer.prototype.listen = function(target, eventName, callback) {
                var _a, triggerName, dotIndex, _this = this;
                if ("@" == eventName.charAt(0)) {
                    var element = function(target) {
                        switch (target) {
                          case "body":
                            return document.body;

                          case "document":
                            return document;

                          case "window":
                            return window;

                          default:
                            return target;
                        }
                    }(target), name_1 = eventName.substr(1), phase = "";
                    return "@" != name_1.charAt(0) && (name_1 = (_a = __read((triggerName = name_1, 
                    dotIndex = triggerName.indexOf("."), [ triggerName.substring(0, dotIndex), triggerName.substr(dotIndex + 1) ]), 2))[0], 
                    phase = _a[1]), this.engine.listen(this.namespaceId, element, name_1, phase, function(event) {
                        _this.factory.scheduleListenerCallback(event._data || -1, callback, event);
                    });
                }
                return this.delegate.listen(target, eventName, callback);
            }, AnimationRenderer;
        }(BaseAnimationRenderer), animations_InjectableAnimationEngine = function(_super) {
            function InjectableAnimationEngine(doc, driver, normalizer) {
                return _super.call(this, doc.body, driver, normalizer) || this;
            }
            return __extends(InjectableAnimationEngine, _super), InjectableAnimationEngine;
        }(browser_AnimationEngine);
        function instantiateSupportedAnimationDriver() {
            return "function" == typeof getElementAnimateFn() ? new WebAnimationsDriver() : new CssKeyframesDriver();
        }
        function instantiateDefaultStyleNormalizer() {
            return new browser_WebAnimationsStyleNormalizer();
        }
        function instantiateRendererFactory(renderer, engine, zone) {
            return new animations_AnimationRendererFactory(renderer, engine, zone);
        }
        var ANIMATION_MODULE_TYPE = new InjectionToken("AnimationModuleType"), BrowserAnimationsModule = function() {
            return function() {};
        }(), RenderType_MatProgressBar = createRendererType2({
            encapsulation: 2,
            styles: [ ".mat-progress-bar{display:block;height:4px;overflow:hidden;position:relative;transition:opacity 250ms linear;width:100%}._mat-animation-noopable.mat-progress-bar{transition:none;animation:none}.mat-progress-bar .mat-progress-bar-element,.mat-progress-bar .mat-progress-bar-fill::after{height:100%;position:absolute;width:100%}.mat-progress-bar .mat-progress-bar-background{width:calc(100% + 10px)}@media screen and (-ms-high-contrast:active){.mat-progress-bar .mat-progress-bar-background{display:none}}.mat-progress-bar .mat-progress-bar-buffer{transform-origin:top left;transition:transform 250ms ease}@media screen and (-ms-high-contrast:active){.mat-progress-bar .mat-progress-bar-buffer{border-top:solid 5px;opacity:.5}}.mat-progress-bar .mat-progress-bar-secondary{display:none}.mat-progress-bar .mat-progress-bar-fill{animation:none;transform-origin:top left;transition:transform 250ms ease}@media screen and (-ms-high-contrast:active){.mat-progress-bar .mat-progress-bar-fill{border-top:solid 4px}}.mat-progress-bar .mat-progress-bar-fill::after{animation:none;content:'';display:inline-block;left:0}.mat-progress-bar[dir=rtl],[dir=rtl] .mat-progress-bar{transform:rotateY(180deg)}.mat-progress-bar[mode=query]{transform:rotateZ(180deg)}.mat-progress-bar[mode=query][dir=rtl],[dir=rtl] .mat-progress-bar[mode=query]{transform:rotateZ(180deg) rotateY(180deg)}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-fill,.mat-progress-bar[mode=query] .mat-progress-bar-fill{transition:none}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-primary,.mat-progress-bar[mode=query] .mat-progress-bar-primary{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-primary-indeterminate-translate 2s infinite linear;left:-145.166611%}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-primary.mat-progress-bar-fill::after,.mat-progress-bar[mode=query] .mat-progress-bar-primary.mat-progress-bar-fill::after{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-primary-indeterminate-scale 2s infinite linear}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-secondary,.mat-progress-bar[mode=query] .mat-progress-bar-secondary{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-secondary-indeterminate-translate 2s infinite linear;left:-54.888891%;display:block}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-secondary.mat-progress-bar-fill::after,.mat-progress-bar[mode=query] .mat-progress-bar-secondary.mat-progress-bar-fill::after{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-secondary-indeterminate-scale 2s infinite linear}.mat-progress-bar[mode=buffer] .mat-progress-bar-background{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-background-scroll 250ms infinite linear;display:block}.mat-progress-bar._mat-animation-noopable .mat-progress-bar-background,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-buffer,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-fill,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-fill::after,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-primary,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-primary.mat-progress-bar-fill::after,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-secondary,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-secondary.mat-progress-bar-fill::after{animation:none;transition:none}@keyframes mat-progress-bar-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(.5,0,.70173,.49582);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(.30244,.38135,.55,.95635);transform:translateX(83.67142%)}100%{transform:translateX(200.61106%)}}@keyframes mat-progress-bar-primary-indeterminate-scale{0%{transform:scaleX(.08)}36.65%{animation-timing-function:cubic-bezier(.33473,.12482,.78584,1);transform:scaleX(.08)}69.15%{animation-timing-function:cubic-bezier(.06,.11,.6,1);transform:scaleX(.66148)}100%{transform:scaleX(.08)}}@keyframes mat-progress-bar-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(.15,0,.51506,.40969);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(.31033,.28406,.8,.73371);transform:translateX(37.65191%)}48.35%{animation-timing-function:cubic-bezier(.4,.62704,.6,.90203);transform:translateX(84.38617%)}100%{transform:translateX(160.27778%)}}@keyframes mat-progress-bar-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(.15,0,.51506,.40969);transform:scaleX(.08)}19.15%{animation-timing-function:cubic-bezier(.31033,.28406,.8,.73371);transform:scaleX(.4571)}44.15%{animation-timing-function:cubic-bezier(.4,.62704,.6,.90203);transform:scaleX(.72796)}100%{transform:scaleX(.08)}}@keyframes mat-progress-bar-background-scroll{to{transform:translateX(-8px)}}" ],
            data: {}
        });
        function View_MatProgressBar_0(_l) {
            return viewDef(2, [ queryDef(402653184, 1, {
                _primaryValueBar: 0
            }), (_l()(), elementDef(1, 0, null, null, 4, ":svg:svg", [ [ "class", "mat-progress-bar-background mat-progress-bar-element" ], [ "focusable", "false" ], [ "height", "4" ], [ "width", "100%" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(2, 0, null, null, 2, ":svg:defs", [], null, null, null, null, null)), (_l()(), 
            elementDef(3, 0, null, null, 1, ":svg:pattern", [ [ "height", "4" ], [ "patternUnits", "userSpaceOnUse" ], [ "width", "8" ], [ "x", "4" ], [ "y", "0" ] ], [ [ 8, "id", 0 ] ], null, null, null, null)), (_l()(), 
            elementDef(4, 0, null, null, 0, ":svg:circle", [ [ "cx", "2" ], [ "cy", "2" ], [ "r", "2" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(5, 0, null, null, 0, ":svg:rect", [ [ "height", "100%" ], [ "width", "100%" ] ], [ [ 1, "fill", 0 ] ], null, null, null, null)), (_l()(), 
            elementDef(6, 0, null, null, 2, "div", [ [ "class", "mat-progress-bar-buffer mat-progress-bar-element" ] ], null, null, null, null, null)), providerDef(512, null, NgStyleImpl, common_NgStyleR2Impl, [ ElementRef, KeyValueDiffers, Renderer2 ]), directiveDef(8, 278528, null, 0, common_NgStyle, [ NgStyleImpl ], {
                ngStyle: [ 0, "ngStyle" ]
            }, null), (_l()(), elementDef(9, 0, [ [ 1, 0 ], [ "primaryValueBar", 1 ] ], null, 2, "div", [ [ "class", "mat-progress-bar-primary mat-progress-bar-fill mat-progress-bar-element" ] ], null, null, null, null, null)), providerDef(512, null, NgStyleImpl, common_NgStyleR2Impl, [ ElementRef, KeyValueDiffers, Renderer2 ]), directiveDef(11, 278528, null, 0, common_NgStyle, [ NgStyleImpl ], {
                ngStyle: [ 0, "ngStyle" ]
            }, null), (_l()(), elementDef(12, 0, null, null, 0, "div", [ [ "class", "mat-progress-bar-secondary mat-progress-bar-fill mat-progress-bar-element" ] ], null, null, null, null, null)) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 8, 0, _co._bufferTransform()), _ck(_v, 11, 0, _co._primaryTransform());
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 3, 0, _co.progressbarId), _ck(_v, 5, 0, _co._rectangleFillValue);
            });
        }
        var TopMenuComponent = function() {
            return function() {};
        }(), RenderType_TopMenuComponent = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_TopMenuComponent_1(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 3, "li", [], null, null, null, null, null)), (_l()(), 
            elementDef(1, 0, null, null, 2, "a", [ [ "class", "nav-link" ] ], [ [ 8, "href", 4 ], [ 8, "title", 0 ] ], null, null, null, null)), (_l()(), 
            elementDef(2, 0, null, null, 1, "span", [ [ "class", "nav-link-inner" ] ], null, null, null, null, null)), (_l()(), 
            textDef(3, null, [ "", "" ])) ], null, function(_ck, _v) {
                _ck(_v, 1, 0, _v.context.$implicit.url, _v.context.$implicit.title), _ck(_v, 3, 0, _v.context.$implicit.title);
            });
        }
        function View_TopMenuComponent_0(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 2, "ul", [ [ "role", "navigation" ] ], null, null, null, null, null)), (_l()(), 
            anchorDef(16777216, null, null, 1, null, View_TopMenuComponent_1)), directiveDef(2, 278528, null, 0, common_NgForOf, [ ViewContainerRef, TemplateRef, IterableDiffers ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 2, 0, _v.component.nodes);
            }, null);
        }
        var search_results_component_SearchResultsComponent = function() {
            function SearchResultsComponent() {
                this.resultSelected = new core_EventEmitter(), this.defaultArea = "other", this.notFoundMessage = "Searching ...", 
                this.topLevelFolders = [ "guide", "tutorial" ], this.searchAreas = [];
            }
            return SearchResultsComponent.prototype.ngOnChanges = function(changes) {
                this.searchAreas = this.processSearchResults(this.searchResults);
            }, SearchResultsComponent.prototype.onResultSelected = function(page, event) {
                0 !== event.button || event.ctrlKey || event.metaKey || this.resultSelected.emit(page);
            }, SearchResultsComponent.prototype.processSearchResults = function(search) {
                var _this = this;
                if (!search) return [];
                this.notFoundMessage = "No results found.";
                var searchAreaMap = {};
                return search.results.forEach(function(result) {
                    if (result.title) {
                        var areaName = _this.computeAreaName(result) || _this.defaultArea;
                        (searchAreaMap[areaName] = searchAreaMap[areaName] || []).push(result);
                    }
                }), Object.keys(searchAreaMap).sort(function(l, r) {
                    return l > r ? 1 : -1;
                }).map(function(name) {
                    var _a = function(allPages) {
                        var priorityPages = [], pages = [], deprecated = [];
                        for (searchAreaMap[name].forEach(function(page) {
                            page.deprecated ? deprecated.push(page) : priorityPages.length < 5 ? priorityPages.push(page) : pages.push(page);
                        }); priorityPages.length < 5 && pages.length; ) priorityPages.push(pages.shift());
                        for (;priorityPages.length < 5 && deprecated.length; ) priorityPages.push(deprecated.shift());
                        return pages.sort(compareResults), {
                            priorityPages: priorityPages,
                            pages: pages,
                            deprecated: deprecated
                        };
                    }();
                    return {
                        name: name,
                        priorityPages: _a.priorityPages,
                        pages: _a.pages.concat(_a.deprecated)
                    };
                });
            }, SearchResultsComponent.prototype.computeAreaName = function(result) {
                if (-1 !== this.topLevelFolders.indexOf(result.path)) return result.path;
                var _a = result.path.split("/", 2);
                return _a[1] && _a[0];
            }, SearchResultsComponent;
        }();
        function compareResults(l, r) {
            return l.title.toUpperCase() > r.title.toUpperCase() ? 1 : -1;
        }
        var RenderType_SearchResultsComponent = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_SearchResultsComponent_1(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 0, "div", [], null, null, null, null, null)) ], null, null);
        }
        function View_SearchResultsComponent_5(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 0, "span", [], [ [ 8, "className", 0 ] ], null, null, null, null)) ], null, function(_ck, _v) {
                _ck(_v, 0, 0, inlineInterpolate(1, "symbol ", _v.parent.context.$implicit.type, ""));
            });
        }
        function View_SearchResultsComponent_4(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 5, "li", [ [ "class", "search-page" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(1, 0, null, null, 4, "a", [ [ "class", "search-result-item" ] ], [ [ 8, "href", 4 ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component.onResultSelected(_v.context.$implicit, $event) && ad), 
                ad;
            }, null, null)), (_l()(), anchorDef(16777216, null, null, 1, null, View_SearchResultsComponent_5)), directiveDef(3, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), elementDef(4, 0, null, null, 1, "span", [], [ [ 2, "deprecated-api-item", null ] ], null, null, null, null)), (_l()(), 
            textDef(5, null, [ "", "" ])) ], function(_ck, _v) {
                _ck(_v, 3, 0, "api" === _v.parent.context.$implicit.name);
            }, function(_ck, _v) {
                _ck(_v, 1, 0, inlineInterpolate(1, "", _v.context.$implicit.path, "")), _ck(_v, 4, 0, _v.context.$implicit.deprecated), 
                _ck(_v, 5, 0, _v.context.$implicit.title);
            });
        }
        function View_SearchResultsComponent_7(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 0, "span", [], [ [ 8, "className", 0 ] ], null, null, null, null)) ], null, function(_ck, _v) {
                _ck(_v, 0, 0, inlineInterpolate(1, "symbol ", _v.parent.context.$implicit.type, ""));
            });
        }
        function View_SearchResultsComponent_6(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 5, "li", [ [ "class", "search-page" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(1, 0, null, null, 4, "a", [ [ "class", "search-result-item" ] ], [ [ 8, "href", 4 ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component.onResultSelected(_v.context.$implicit, $event) && ad), 
                ad;
            }, null, null)), (_l()(), anchorDef(16777216, null, null, 1, null, View_SearchResultsComponent_7)), directiveDef(3, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), elementDef(4, 0, null, null, 1, "span", [], [ [ 2, "deprecated-api-item", null ] ], null, null, null, null)), (_l()(), 
            textDef(5, null, [ "", "" ])) ], function(_ck, _v) {
                _ck(_v, 3, 0, "api" === _v.parent.context.$implicit.name);
            }, function(_ck, _v) {
                _ck(_v, 1, 0, inlineInterpolate(1, "", _v.context.$implicit.path, "")), _ck(_v, 4, 0, _v.context.$implicit.deprecated), 
                _ck(_v, 5, 0, _v.context.$implicit.title);
            });
        }
        function View_SearchResultsComponent_3(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 8, "div", [ [ "class", "search-area" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(1, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), 
            textDef(2, null, [ "", " (", ")" ])), (_l()(), elementDef(3, 0, null, null, 2, "ul", [ [ "class", "priority-pages" ] ], null, null, null, null, null)), (_l()(), 
            anchorDef(16777216, null, null, 1, null, View_SearchResultsComponent_4)), directiveDef(5, 278528, null, 0, common_NgForOf, [ ViewContainerRef, TemplateRef, IterableDiffers ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null), (_l()(), elementDef(6, 0, null, null, 2, "ul", [], null, null, null, null, null)), (_l()(), 
            anchorDef(16777216, null, null, 1, null, View_SearchResultsComponent_6)), directiveDef(8, 278528, null, 0, common_NgForOf, [ ViewContainerRef, TemplateRef, IterableDiffers ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 5, 0, _v.context.$implicit.priorityPages), _ck(_v, 8, 0, _v.context.$implicit.pages);
            }, function(_ck, _v) {
                _ck(_v, 2, 0, _v.context.$implicit.name, _v.context.$implicit.pages.length + _v.context.$implicit.priorityPages.length);
            });
        }
        function View_SearchResultsComponent_2(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 1, "h2", [ [ "class", "visually-hidden" ] ], null, null, null, null, null)), (_l()(), 
            textDef(-1, null, [ "Search Results" ])), (_l()(), anchorDef(16777216, null, null, 1, null, View_SearchResultsComponent_3)), directiveDef(3, 278528, null, 0, common_NgForOf, [ ViewContainerRef, TemplateRef, IterableDiffers ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null), (_l()(), anchorDef(0, null, null, 0)) ], function(_ck, _v) {
                _ck(_v, 3, 0, _v.component.searchAreas);
            }, null);
        }
        function View_SearchResultsComponent_8(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), 
            textDef(1, null, [ "", "" ])) ], null, function(_ck, _v) {
                _ck(_v, 1, 0, _v.component.notFoundMessage);
            });
        }
        function View_SearchResultsComponent_0(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 2, "div", [ [ "class", "search-results" ] ], null, null, null, null, null)), (_l()(), 
            anchorDef(16777216, null, null, 1, null, View_SearchResultsComponent_1)), directiveDef(2, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ],
                ngIfThen: [ 1, "ngIfThen" ],
                ngIfElse: [ 2, "ngIfElse" ]
            }, null), (_l()(), anchorDef(0, [ [ "searchResults", 2 ] ], null, 0, null, View_SearchResultsComponent_2)), (_l()(), 
            anchorDef(0, [ [ "notFound", 2 ] ], null, 0, null, View_SearchResultsComponent_8)) ], function(_ck, _v) {
                _ck(_v, 2, 0, _v.component.searchAreas.length, nodeValue(_v, 3), nodeValue(_v, 4));
            }, null);
        }
        var RenderType_MatIcon = createRendererType2({
            encapsulation: 2,
            styles: [ ".mat-icon{background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1,1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}" ],
            data: {}
        });
        function View_MatIcon_0(_l) {
            return viewDef(2, [ ngContentDef(null, 0) ], null, null);
        }
        var NavItemComponent = function() {
            function NavItemComponent() {
                this.isWide = !1, this.level = 1, this.isParentExpanded = !0, this.isExpanded = !1, 
                this.isSelected = !1;
            }
            return NavItemComponent.prototype.ngOnChanges = function() {
                if (this.nodeChildren = this.node && this.node.children ? this.node.children.filter(function(n) {
                    return !n.hidden;
                }) : [], this.selectedNodes) {
                    var ix = this.selectedNodes.indexOf(this.node);
                    this.isSelected = -1 !== ix, this.isExpanded = this.isParentExpanded && (this.isSelected || this.isWide && this.isExpanded);
                } else this.isSelected = !1;
                this.setClasses();
            }, NavItemComponent.prototype.setClasses = function() {
                var _a;
                this.classes = ((_a = {})["level-" + this.level] = !0, _a.collapsed = !this.isExpanded, 
                _a.expanded = this.isExpanded, _a.selected = this.isSelected, _a);
            }, NavItemComponent.prototype.headerClicked = function() {
                this.isExpanded = !this.isExpanded, this.setClasses();
            }, NavItemComponent;
        }(), RenderType_NavItemComponent = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_NavItemComponent_1(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 4, "div", [], null, null, null, null, null)), (_l()(), 
            elementDef(1, 0, null, null, 3, "a", [ [ "class", "vertical-menu-item" ] ], [ [ 8, "href", 4 ], [ 8, "title", 0 ] ], null, null, null, null)), providerDef(512, null, NgClassImpl, common_NgClassR2Impl, [ IterableDiffers, KeyValueDiffers, ElementRef, Renderer2 ]), directiveDef(3, 278528, null, 0, common_NgClass, [ NgClassImpl ], {
                klass: [ 0, "klass" ],
                ngClass: [ 1, "ngClass" ]
            }, null), (_l()(), textDef(4, null, [ " ", " " ])) ], function(_ck, _v) {
                _ck(_v, 3, 0, "vertical-menu-item", _v.component.classes);
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 1, 0, inlineInterpolate(1, "", _co.node.url, ""), inlineInterpolate(1, "", _co.node.tooltip, "")), 
                _ck(_v, 4, 0, _co.node.title);
            });
        }
        function View_NavItemComponent_3(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 5, "a", [ [ "class", "vertical-menu-item heading" ] ], [ [ 8, "href", 4 ], [ 8, "title", 0 ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component.headerClicked() && ad), ad;
            }, null, null)), providerDef(512, null, NgClassImpl, common_NgClassR2Impl, [ IterableDiffers, KeyValueDiffers, ElementRef, Renderer2 ]), directiveDef(2, 278528, null, 0, common_NgClass, [ NgClassImpl ], {
                klass: [ 0, "klass" ],
                ngClass: [ 1, "ngClass" ]
            }, null), (_l()(), textDef(3, null, [ " ", " " ])), (_l()(), elementDef(4, 0, null, null, 1, "mat-icon", [ [ "class", "rotating-icon mat-icon" ], [ "role", "img" ], [ "svgIcon", "keyboard_arrow_right" ] ], [ [ 2, "mat-icon-inline", null ] ], null, null, View_MatIcon_0, RenderType_MatIcon)), directiveDef(5, 9158656, null, 0, icon_es5_MatIcon, [ ElementRef, icon_es5_MatIconRegistry, [ 8, null ], [ 2, MAT_ICON_LOCATION ] ], {
                svgIcon: [ 0, "svgIcon" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 2, 0, "vertical-menu-item heading", _v.component.classes), _ck(_v, 5, 0, "keyboard_arrow_right");
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 0, 0, inlineInterpolate(1, "", _co.node.url, ""), inlineInterpolate(1, "", _co.node.tooltip, "")), 
                _ck(_v, 3, 0, _co.node.title), _ck(_v, 4, 0, nodeValue(_v, 5).inline);
            });
        }
        function View_NavItemComponent_4(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 5, "button", [ [ "class", "vertical-menu-item heading" ], [ "type", "button" ] ], [ [ 8, "title", 0 ], [ 1, "aria-pressed", 0 ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component.headerClicked() && ad), ad;
            }, null, null)), providerDef(512, null, NgClassImpl, common_NgClassR2Impl, [ IterableDiffers, KeyValueDiffers, ElementRef, Renderer2 ]), directiveDef(2, 278528, null, 0, common_NgClass, [ NgClassImpl ], {
                klass: [ 0, "klass" ],
                ngClass: [ 1, "ngClass" ]
            }, null), (_l()(), textDef(3, null, [ " ", " " ])), (_l()(), elementDef(4, 0, null, null, 1, "mat-icon", [ [ "class", "rotating-icon mat-icon" ], [ "role", "img" ], [ "svgIcon", "keyboard_arrow_right" ] ], [ [ 2, "mat-icon-inline", null ] ], null, null, View_MatIcon_0, RenderType_MatIcon)), directiveDef(5, 9158656, null, 0, icon_es5_MatIcon, [ ElementRef, icon_es5_MatIconRegistry, [ 8, null ], [ 2, MAT_ICON_LOCATION ] ], {
                svgIcon: [ 0, "svgIcon" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 2, 0, "vertical-menu-item heading", _v.component.classes), _ck(_v, 5, 0, "keyboard_arrow_right");
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 0, 0, inlineInterpolate(1, "", _co.node.tooltip, ""), _co.isExpanded), _ck(_v, 3, 0, _co.node.title), 
                _ck(_v, 4, 0, nodeValue(_v, 5).inline);
            });
        }
        function View_NavItemComponent_5(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 1, "aio-nav-item", [], null, null, null, View_NavItemComponent_0, RenderType_NavItemComponent)), directiveDef(1, 573440, null, 0, NavItemComponent, [], {
                isWide: [ 0, "isWide" ],
                level: [ 1, "level" ],
                node: [ 2, "node" ],
                isParentExpanded: [ 3, "isParentExpanded" ],
                selectedNodes: [ 4, "selectedNodes" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 1, 0, _co.isWide, _co.level + 1, _v.context.$implicit, _co.isExpanded, _co.selectedNodes);
            }, null);
        }
        function View_NavItemComponent_2(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 9, "div", [], null, null, null, null, null)), (_l()(), 
            anchorDef(16777216, null, null, 1, null, View_NavItemComponent_3)), directiveDef(2, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), anchorDef(16777216, null, null, 1, null, View_NavItemComponent_4)), directiveDef(4, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), elementDef(5, 0, null, null, 4, "div", [ [ "class", "heading-children" ] ], null, null, null, null, null)), providerDef(512, null, NgClassImpl, common_NgClassR2Impl, [ IterableDiffers, KeyValueDiffers, ElementRef, Renderer2 ]), directiveDef(7, 278528, null, 0, common_NgClass, [ NgClassImpl ], {
                klass: [ 0, "klass" ],
                ngClass: [ 1, "ngClass" ]
            }, null), (_l()(), anchorDef(16777216, null, null, 1, null, View_NavItemComponent_5)), directiveDef(9, 278528, null, 0, common_NgForOf, [ ViewContainerRef, TemplateRef, IterableDiffers ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 2, 0, null != _co.node.url), _ck(_v, 4, 0, null == _co.node.url), _ck(_v, 7, 0, "heading-children", _co.classes), 
                _ck(_v, 9, 0, _co.nodeChildren);
            }, null);
        }
        function View_NavItemComponent_0(_l) {
            return viewDef(0, [ (_l()(), anchorDef(16777216, null, null, 1, null, View_NavItemComponent_1)), directiveDef(1, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), anchorDef(16777216, null, null, 1, null, View_NavItemComponent_2)), directiveDef(3, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 1, 0, !_co.node.children), _ck(_v, 3, 0, _co.node.children);
            }, null);
        }
        var NavMenuComponent = function() {
            function NavMenuComponent() {
                this.isWide = !1;
            }
            return Object.defineProperty(NavMenuComponent.prototype, "filteredNodes", {
                get: function() {
                    return this.nodes ? this.nodes.filter(function(n) {
                        return !n.hidden;
                    }) : [];
                },
                enumerable: !0,
                configurable: !0
            }), NavMenuComponent;
        }(), RenderType_NavMenuComponent = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_NavMenuComponent_1(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 1, "aio-nav-item", [], null, null, null, View_NavItemComponent_0, RenderType_NavItemComponent)), directiveDef(1, 573440, null, 0, NavItemComponent, [], {
                isWide: [ 0, "isWide" ],
                node: [ 1, "node" ],
                selectedNodes: [ 2, "selectedNodes" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 1, 0, _co.isWide, _v.context.$implicit, null == _co.currentNode ? null : _co.currentNode.nodes);
            }, null);
        }
        function View_NavMenuComponent_0(_l) {
            return viewDef(0, [ (_l()(), anchorDef(16777216, null, null, 1, null, View_NavMenuComponent_1)), directiveDef(1, 278528, null, 0, common_NgForOf, [ ViewContainerRef, TemplateRef, IterableDiffers ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 1, 0, _v.component.filteredNodes);
            }, null);
        }
        var dt_component_DtComponent = function() {
            function DtComponent() {
                this.docChange = new core_EventEmitter();
            }
            return Object.defineProperty(DtComponent.prototype, "text", {
                get: function() {
                    return this.doc && this.doc.contents;
                },
                enumerable: !0,
                configurable: !0
            }), DtComponent.prototype.dtextSet = function() {
                this.doc.contents = this.dt.nativeElement.value, this.docChange.emit(__assign({}, this.doc));
            }, DtComponent;
        }(), RenderType_DtComponent = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_DtComponent_0(_l) {
            return viewDef(0, [ queryDef(402653184, 1, {
                dt: 0
            }), (_l()(), elementDef(1, 0, null, null, 5, "div", [], null, null, null, null, null)), (_l()(), 
            elementDef(2, 0, null, null, 0, "hr", [], null, null, null, null, null)), (_l()(), 
            elementDef(3, 0, [ [ 1, 0 ], [ "dt", 1 ] ], null, 0, "textarea", [ [ "cols", "80" ], [ "rows", "10" ] ], [ [ 8, "value", 0 ] ], null, null, null, null)), (_l()(), 
            elementDef(4, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), 
            elementDef(5, 0, null, null, 1, "button", [], null, [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component.dtextSet() && ad), ad;
            }, null, null)), (_l()(), textDef(-1, null, [ "Show change" ])) ], null, function(_ck, _v) {
                _ck(_v, 3, 0, _v.component.text);
            });
        }
        var LazyCustomElementComponent = function() {
            function LazyCustomElementComponent(elementRef, elementsLoader, logger) {
                this.elementRef = elementRef, this.elementsLoader = elementsLoader, this.logger = logger, 
                this.selector = "";
            }
            return LazyCustomElementComponent.prototype.ngOnInit = function() {
                this.selector && !/[^\w-]/.test(this.selector) ? (this.elementRef.nativeElement.innerHTML = "<" + this.selector + "></" + this.selector + ">", 
                this.elementsLoader.loadCustomElement(this.selector)) : this.logger.error(new Error("Invalid selector for 'aio-lazy-ce': " + this.selector));
            }, LazyCustomElementComponent;
        }(), elProto = Element.prototype, elements_matches = elProto.matches || elProto.matchesSelector || elProto.mozMatchesSelector || elProto.msMatchesSelector || elProto.oMatchesSelector || elProto.webkitMatchesSelector, elements_scheduler = {
            schedule: function(taskFn, delay) {
                var id = setTimeout(taskFn, delay);
                return function() {
                    return clearTimeout(id);
                };
            },
            scheduleBeforeRender: function(taskFn) {
                if ("undefined" == typeof window) return elements_scheduler.schedule(taskFn, 0);
                if (void 0 === window.requestAnimationFrame) return elements_scheduler.schedule(taskFn, 16);
                var id = window.requestAnimationFrame(taskFn);
                return function() {
                    return window.cancelAnimationFrame(id);
                };
            }
        };
        function findMatchingIndex(node, selectors, defaultIndex) {
            var matchingIndex = defaultIndex;
            return function(node) {
                return !!node && node.nodeType === Node.ELEMENT_NODE;
            }(node) && selectors.some(function(selector, i) {
                return !("*" === selector || !function(element, selector) {
                    return elements_matches.call(node, selector);
                }(0, selector) || (matchingIndex = i, 0));
            }), matchingIndex;
        }
        var elements_ComponentNgElementStrategyFactory = function() {
            function ComponentNgElementStrategyFactory(component, injector) {
                this.component = component, this.injector = injector, this.componentFactory = injector.get(core_ComponentFactoryResolver).resolveComponentFactory(component);
            }
            return ComponentNgElementStrategyFactory.prototype.create = function(injector) {
                return new elements_ComponentNgElementStrategy(this.componentFactory, injector);
            }, ComponentNgElementStrategyFactory;
        }(), elements_ComponentNgElementStrategy = function() {
            function ComponentNgElementStrategy(componentFactory, injector) {
                this.componentFactory = componentFactory, this.injector = injector, this.inputChanges = null, 
                this.implementsOnChanges = !1, this.scheduledChangeDetectionFn = null, this.scheduledDestroyFn = null, 
                this.initialInputValues = new Map(), this.uninitializedInputs = new Set();
            }
            return ComponentNgElementStrategy.prototype.connect = function(element) {
                if (null !== this.scheduledDestroyFn) return this.scheduledDestroyFn(), void (this.scheduledDestroyFn = null);
                this.componentRef || this.initializeComponent(element);
            }, ComponentNgElementStrategy.prototype.disconnect = function() {
                var _this = this;
                this.componentRef && null === this.scheduledDestroyFn && (this.scheduledDestroyFn = elements_scheduler.schedule(function() {
                    _this.componentRef && (_this.componentRef.destroy(), _this.componentRef = null);
                }, 10));
            }, ComponentNgElementStrategy.prototype.getInputValue = function(property) {
                return this.componentRef ? this.componentRef.instance[property] : this.initialInputValues.get(property);
            }, ComponentNgElementStrategy.prototype.setInputValue = function(property, value) {
                var value1, value2;
                (value1 = value) === (value2 = this.getInputValue(property)) || value1 != value1 && value2 != value2 || (this.componentRef ? (this.recordInputChange(property, value), 
                this.componentRef.instance[property] = value, this.scheduleDetectChanges()) : this.initialInputValues.set(property, value));
            }, ComponentNgElementStrategy.prototype.initializeComponent = function(element) {
                var childInjector = Injector.create({
                    providers: [],
                    parent: this.injector
                }), projectableNodes = function(host, ngContentSelectors) {
                    var nodes = element.childNodes, projectableNodes = ngContentSelectors.map(function() {
                        return [];
                    }), wildcardIndex = -1;
                    ngContentSelectors.some(function(selector, i) {
                        return "*" === selector && (wildcardIndex = i, !0);
                    });
                    for (var i = 0, ii = nodes.length; i < ii; ++i) {
                        var node = nodes[i], ngContentIndex = findMatchingIndex(node, ngContentSelectors, wildcardIndex);
                        -1 !== ngContentIndex && projectableNodes[ngContentIndex].push(node);
                    }
                    return projectableNodes;
                }(0, this.componentFactory.ngContentSelectors);
                this.componentRef = this.componentFactory.create(childInjector, projectableNodes, element), 
                this.implementsOnChanges = "function" == typeof this.componentRef.instance.ngOnChanges, 
                this.initializeInputs(), this.initializeOutputs(), this.detectChanges(), this.injector.get(core_ApplicationRef).attachView(this.componentRef.hostView);
            }, ComponentNgElementStrategy.prototype.initializeInputs = function() {
                var _this = this;
                this.componentFactory.inputs.forEach(function(_a) {
                    var propName = _a.propName, initialValue = _this.initialInputValues.get(propName);
                    initialValue ? _this.setInputValue(propName, initialValue) : _this.uninitializedInputs.add(propName);
                }), this.initialInputValues.clear();
            }, ComponentNgElementStrategy.prototype.initializeOutputs = function() {
                var _this = this, eventEmitters = this.componentFactory.outputs.map(function(_a) {
                    var templateName = _a.templateName;
                    return _this.componentRef.instance[_a.propName].pipe(map_map(function(value) {
                        return {
                            name: templateName,
                            value: value
                        };
                    }));
                });
                this.events = merge.apply(void 0, __spread(eventEmitters));
            }, ComponentNgElementStrategy.prototype.callNgOnChanges = function() {
                if (this.implementsOnChanges && null !== this.inputChanges) {
                    var inputChanges = this.inputChanges;
                    this.inputChanges = null, this.componentRef.instance.ngOnChanges(inputChanges);
                }
            }, ComponentNgElementStrategy.prototype.scheduleDetectChanges = function() {
                var _this = this;
                this.scheduledChangeDetectionFn || (this.scheduledChangeDetectionFn = elements_scheduler.scheduleBeforeRender(function() {
                    _this.scheduledChangeDetectionFn = null, _this.detectChanges();
                }));
            }, ComponentNgElementStrategy.prototype.recordInputChange = function(property, currentValue) {
                if (!this.componentRef || this.implementsOnChanges) {
                    null === this.inputChanges && (this.inputChanges = {});
                    var pendingChange = this.inputChanges[property];
                    if (pendingChange) pendingChange.currentValue = currentValue; else {
                        var isFirstChange = this.uninitializedInputs.has(property);
                        this.uninitializedInputs.delete(property);
                        var previousValue = isFirstChange ? void 0 : this.getInputValue(property);
                        this.inputChanges[property] = new SimpleChange(previousValue, currentValue, isFirstChange);
                    }
                }
            }, ComponentNgElementStrategy.prototype.detectChanges = function() {
                this.componentRef && (this.callNgOnChanges(), this.componentRef.changeDetectorRef.detectChanges());
            }, ComponentNgElementStrategy;
        }(), elements_NgElement = function(_super) {
            function NgElement() {
                var _this = null !== _super && _super.apply(this, arguments) || this;
                return _this.ngElementEventsSubscription = null, _this;
            }
            return __extends(NgElement, _super), NgElement;
        }(HTMLElement), elements_loader_ElementsLoader = function() {
            function ElementsLoader(moduleFactoryLoader, moduleRef, elementModulePaths) {
                this.moduleFactoryLoader = moduleFactoryLoader, this.moduleRef = moduleRef, this.elementsLoading = new Map(), 
                this.elementsToLoad = new Map(elementModulePaths);
            }
            return ElementsLoader.prototype.loadContainedCustomElements = function(element) {
                var _this = this, unregisteredSelectors = Array.from(this.elementsToLoad.keys()).filter(function(s) {
                    return element.querySelector(s);
                });
                return unregisteredSelectors.length ? from_from(Promise.all(unregisteredSelectors.map(function(s) {
                    return _this.loadCustomElement(s);
                })).then(function() {})) : of(void 0);
            }, ElementsLoader.prototype.loadCustomElement = function(selector) {
                var _this = this;
                if (this.elementsLoading.has(selector)) return this.elementsLoading.get(selector);
                if (this.elementsToLoad.has(selector)) {
                    var modulePath = this.elementsToLoad.get(selector), loadedAndRegistered = this.moduleFactoryLoader.load(modulePath).then(function(elementModuleFactory) {
                        var component, config, inputs, strategyFactory, attributeToPropertyInputs, NgElementImpl, elementModuleRef = elementModuleFactory.create(_this.moduleRef.injector), CustomElement = (config = {
                            injector: elementModuleRef.injector
                        }, inputs = function(component, injector) {
                            return config.injector.get(core_ComponentFactoryResolver).resolveComponentFactory(component).inputs;
                        }(component = elementModuleRef.instance.customElementComponent), strategyFactory = config.strategyFactory || new elements_ComponentNgElementStrategyFactory(component, config.injector), 
                        attributeToPropertyInputs = function(inputs) {
                            var attributeToPropertyInputs = {};
                            return inputs.forEach(function(_a) {
                                var input, propName = _a.propName;
                                attributeToPropertyInputs[(input = _a.templateName, input.replace(/[A-Z]/g, function(char) {
                                    return "-" + char.toLowerCase();
                                }))] = propName;
                            }), attributeToPropertyInputs;
                        }(inputs), NgElementImpl = function(_super) {
                            function NgElementImpl(injector) {
                                var _this = _super.call(this) || this;
                                return _this.ngElementStrategy = strategyFactory.create(injector || config.injector), 
                                _this;
                            }
                            return __extends(NgElementImpl, _super), NgElementImpl.prototype.attributeChangedCallback = function(attrName, oldValue, newValue, namespace) {
                                this.ngElementStrategy || (this.ngElementStrategy = strategyFactory.create(config.injector)), 
                                this.ngElementStrategy.setInputValue(attributeToPropertyInputs[attrName], newValue);
                            }, NgElementImpl.prototype.connectedCallback = function() {
                                var _this = this;
                                this.ngElementStrategy || (this.ngElementStrategy = strategyFactory.create(config.injector)), 
                                this.ngElementStrategy.connect(this), this.ngElementEventsSubscription = this.ngElementStrategy.events.subscribe(function(e) {
                                    var customEvent = function(doc, name, detail) {
                                        if ("function" != typeof CustomEvent) {
                                            var event_1 = _this.ownerDocument.createEvent("CustomEvent");
                                            return event_1.initCustomEvent(name, !1, !1, detail), event_1;
                                        }
                                        return new CustomEvent(name, {
                                            bubbles: !1,
                                            cancelable: !1,
                                            detail: detail
                                        });
                                    }(0, e.name, e.value);
                                    _this.dispatchEvent(customEvent);
                                });
                            }, NgElementImpl.prototype.disconnectedCallback = function() {
                                this.ngElementStrategy && this.ngElementStrategy.disconnect(), this.ngElementEventsSubscription && (this.ngElementEventsSubscription.unsubscribe(), 
                                this.ngElementEventsSubscription = null);
                            }, NgElementImpl.observedAttributes = Object.keys(attributeToPropertyInputs), NgElementImpl;
                        }(elements_NgElement), inputs.map(function(_a) {
                            return _a.propName;
                        }).forEach(function(property) {
                            Object.defineProperty(NgElementImpl.prototype, property, {
                                get: function() {
                                    return this.ngElementStrategy.getInputValue(property);
                                },
                                set: function(newValue) {
                                    this.ngElementStrategy.setInputValue(property, newValue);
                                },
                                configurable: !0,
                                enumerable: !0
                            });
                        }), NgElementImpl);
                        return customElements.define(selector, CustomElement), customElements.whenDefined(selector);
                    }).then(function() {
                        _this.elementsLoading.delete(selector), _this.elementsToLoad.delete(selector);
                    }).catch(function(err) {
                        return _this.elementsLoading.delete(selector), Promise.reject(err);
                    });
                    return this.elementsLoading.set(selector, loadedAndRegistered), loadedAndRegistered;
                }
                return Promise.resolve();
            }, ElementsLoader;
        }(), logger_service_Logger = function() {
            function Logger(errorHandler) {
                this.errorHandler = errorHandler;
            }
            return Logger.prototype.log = function(value) {
                for (var rest = [], _i = 1; _i < arguments.length; _i++) rest[_i - 1] = arguments[_i];
                environment.production || console.log.apply(console, [ value ].concat(rest));
            }, Logger.prototype.error = function(error) {
                this.errorHandler.handleError(error);
            }, Logger.prototype.warn = function(value) {
                for (var rest = [], _i = 1; _i < arguments.length; _i++) rest[_i - 1] = arguments[_i];
                console.warn.apply(console, [ value ].concat(rest));
            }, Logger;
        }(), RenderType_LazyCustomElementComponent = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_LazyCustomElementComponent_0(_l) {
            return viewDef(0, [], null, null);
        }
        var _MatToolbarMixinBase = mixinColor(function() {
            return function(_elementRef) {
                this._elementRef = _elementRef;
            };
        }()), MatToolbarRow = function() {
            return function() {};
        }(), toolbar_es5_MatToolbar = function(_super) {
            function MatToolbar(elementRef, _platform, document) {
                var _this = _super.call(this, elementRef) || this;
                return _this._platform = _platform, _this._document = document, _this;
            }
            return __extends(MatToolbar, _super), MatToolbar.prototype.ngAfterViewInit = function() {
                var _this = this;
                isDevMode() && this._platform.isBrowser && (this._checkToolbarMixedModes(), this._toolbarRows.changes.subscribe(function() {
                    return _this._checkToolbarMixedModes();
                }));
            }, MatToolbar.prototype._checkToolbarMixedModes = function() {
                var _this = this;
                this._toolbarRows.length && Array.from(this._elementRef.nativeElement.childNodes).filter(function(node) {
                    return !(node.classList && node.classList.contains("mat-toolbar-row"));
                }).filter(function(node) {
                    return node.nodeType !== (_this._document ? _this._document.COMMENT_NODE : 8);
                }).some(function(node) {
                    return !(!node.textContent || !node.textContent.trim());
                }) && function() {
                    throw Error("MatToolbar: Attempting to combine different toolbar modes. Either specify multiple `<mat-toolbar-row>` elements explicitly or just place content inside of a `<mat-toolbar>` for a single row.");
                }();
            }, MatToolbar;
        }(_MatToolbarMixinBase), MatToolbarModule = function() {
            return function() {};
        }(), RenderType_MatToolbar = createRendererType2({
            encapsulation: 2,
            styles: [ "@media screen and (-ms-high-contrast:active){.mat-toolbar{outline:solid 1px}}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%}.mat-toolbar-multiple-rows{min-height:64px}.mat-toolbar-row,.mat-toolbar-single-row{height:64px}@media (max-width:599px){.mat-toolbar-multiple-rows{min-height:56px}.mat-toolbar-row,.mat-toolbar-single-row{height:56px}}" ],
            data: {}
        });
        function View_MatToolbar_0(_l) {
            return viewDef(2, [ ngContentDef(null, 0), ngContentDef(null, 1) ], null, null);
        }
        var DEFAULT_ROUND_BUTTON_COLOR = "accent", BUTTON_HOST_ATTRIBUTES = [ "mat-button", "mat-flat-button", "mat-icon-button", "mat-raised-button", "mat-stroked-button", "mat-mini-fab", "mat-fab" ], button_es5_MatButton = function(_super) {
            function MatButton(elementRef, _platform, _focusMonitor, _animationMode) {
                var _this = _super.call(this, elementRef) || this;
                _this._platform = _platform, _this._focusMonitor = _focusMonitor, _this._animationMode = _animationMode, 
                _this.isRoundButton = _this._hasHostAttributes("mat-fab", "mat-mini-fab"), _this.isIconButton = _this._hasHostAttributes("mat-icon-button");
                for (var _i = 0, BUTTON_HOST_ATTRIBUTES_1 = BUTTON_HOST_ATTRIBUTES; _i < BUTTON_HOST_ATTRIBUTES_1.length; _i++) {
                    var attr = BUTTON_HOST_ATTRIBUTES_1[_i];
                    _this._hasHostAttributes(attr) && elementRef.nativeElement.classList.add(attr);
                }
                return _this._focusMonitor.monitor(_this._elementRef, !0), _this.isRoundButton && (_this.color = DEFAULT_ROUND_BUTTON_COLOR), 
                _this;
            }
            return __extends(MatButton, _super), MatButton.prototype.ngOnDestroy = function() {
                this._focusMonitor.stopMonitoring(this._elementRef);
            }, MatButton.prototype.focus = function() {
                this._getHostElement().focus();
            }, MatButton.prototype._getHostElement = function() {
                return this._elementRef.nativeElement;
            }, MatButton.prototype._isRippleDisabled = function() {
                return this.disableRipple || this.disabled;
            }, MatButton.prototype._hasHostAttributes = function() {
                for (var _this = this, attributes = [], _i = 0; _i < arguments.length; _i++) attributes[_i] = arguments[_i];
                return attributes.some(function(attribute) {
                    return _this._getHostElement().hasAttribute(attribute);
                });
            }, MatButton;
        }(mixinColor(mixinDisabled(mixinDisableRipple(function() {
            return function(_elementRef) {
                this._elementRef = _elementRef;
            };
        }())))), MatButtonModule = function() {
            return function() {};
        }(), RenderType_MatButton = createRendererType2({
            encapsulation: 2,
            styles: [ ".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover .mat-button-focus-overlay,.mat-stroked-button:hover .mat-button-focus-overlay{opacity:.04}@media (hover:none){.mat-button:hover .mat-button-focus-overlay,.mat-stroked-button:hover .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-flat-button,.mat-icon-button,.mat-stroked-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner{border:0}.mat-button[disabled],.mat-flat-button[disabled],.mat-icon-button[disabled],.mat-stroked-button[disabled]{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button[disabled]{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab[disabled]{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:0;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0,0,0);transition:background .4s cubic-bezier(.25,.8,.25,1),box-shadow 280ms cubic-bezier(.4,0,.2,1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab[disabled]{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button .mat-icon,.mat-icon-button i{line-height:24px}.mat-button-focus-overlay,.mat-button-ripple.mat-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-focus-overlay{border-radius:inherit;opacity:0;transition:opacity .2s cubic-bezier(.35,0,.25,1),background-color .2s cubic-bezier(.35,0,.25,1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}@media screen and (-ms-high-contrast:active){.mat-button-focus-overlay{background-color:rgba(255,255,255,.5)}}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:block;font-size:inherit;width:2.5em;height:2.5em}@media screen and (-ms-high-contrast:active){.mat-button,.mat-fab,.mat-flat-button,.mat-icon-button,.mat-mini-fab,.mat-raised-button{outline:solid 1px}}" ],
            data: {}
        });
        function View_MatButton_0(_l) {
            return viewDef(2, [ queryDef(402653184, 1, {
                ripple: 0
            }), (_l()(), elementDef(1, 0, null, null, 1, "span", [ [ "class", "mat-button-wrapper" ] ], null, null, null, null, null)), ngContentDef(null, 0), (_l()(), 
            elementDef(3, 0, null, null, 1, "div", [ [ "class", "mat-button-ripple mat-ripple" ], [ "matRipple", "" ] ], [ [ 2, "mat-button-ripple-round", null ], [ 2, "mat-ripple-unbounded", null ] ], null, null, null, null)), directiveDef(4, 212992, [ [ 1, 4 ] ], 0, core_es5_MatRipple, [ ElementRef, NgZone, platform_es5_Platform, [ 2, MAT_RIPPLE_GLOBAL_OPTIONS ], [ 2, ANIMATION_MODULE_TYPE ] ], {
                centered: [ 0, "centered" ],
                disabled: [ 1, "disabled" ],
                trigger: [ 2, "trigger" ]
            }, null), (_l()(), elementDef(5, 0, null, null, 0, "div", [ [ "class", "mat-button-focus-overlay" ] ], null, null, null, null, null)) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 4, 0, _co.isIconButton, _co._isRippleDisabled(), _co._getHostElement());
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 3, 0, _co.isRoundButton || _co.isIconButton, nodeValue(_v, 4).unbounded);
            });
        }
        var notification_component_NotificationComponent = function() {
            function NotificationComponent(window, currentDate) {
                this.window = window, this.currentDate = currentDate, this.dismissed = new core_EventEmitter();
            }
            return Object.defineProperty(NotificationComponent.prototype, "localStorage", {
                get: function() {
                    return this.window.localStorage;
                },
                enumerable: !0,
                configurable: !0
            }), NotificationComponent.prototype.ngOnInit = function() {
                var previouslyHidden = "hide" === this.localStorage.getItem("aio-notification/" + this.notificationId), expired = this.currentDate > new Date(this.expirationDate);
                this.showNotification = previouslyHidden || expired ? "hide" : "show";
            }, NotificationComponent.prototype.contentClick = function() {
                this.dismissOnContentClick && this.dismiss();
            }, NotificationComponent.prototype.dismiss = function() {
                this.localStorage.setItem("aio-notification/" + this.notificationId, "hide"), this.showNotification = "hide", 
                this.dismissed.next();
            }, NotificationComponent;
        }(), RenderType_NotificationComponent = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {
                animation: [ {
                    type: 7,
                    name: "hideAnimation",
                    definitions: [ {
                        type: 0,
                        name: "show",
                        styles: {
                            type: 6,
                            styles: {
                                height: "*"
                            },
                            offset: null
                        },
                        options: void 0
                    }, {
                        type: 0,
                        name: "hide",
                        styles: {
                            type: 6,
                            styles: {
                                height: 0
                            },
                            offset: null
                        },
                        options: void 0
                    }, {
                        type: 1,
                        expr: "show => hide",
                        animation: {
                            type: 4,
                            styles: null,
                            timings: 250
                        },
                        options: null
                    } ],
                    options: {}
                } ]
            }
        });
        function View_NotificationComponent_0(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 1, "span", [ [ "class", "content" ] ], null, [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component.contentClick() && ad), ad;
            }, null, null)), ngContentDef(null, 0), (_l()(), elementDef(2, 0, null, null, 3, "button", [ [ "aria-label", "Close" ], [ "class", "close-button" ], [ "mat-icon-button", "" ] ], [ [ 8, "disabled", 0 ], [ 2, "_mat-animation-noopable", null ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component.dismiss() && ad), ad;
            }, View_MatButton_0, RenderType_MatButton)), directiveDef(3, 180224, null, 0, button_es5_MatButton, [ ElementRef, platform_es5_Platform, a11y_es5_FocusMonitor, [ 2, ANIMATION_MODULE_TYPE ] ], null, null), (_l()(), 
            elementDef(4, 0, null, 0, 1, "mat-icon", [ [ "aria-label", "Dismiss notification" ], [ "class", "mat-icon" ], [ "role", "img" ], [ "svgIcon", "close" ] ], [ [ 2, "mat-icon-inline", null ] ], null, null, View_MatIcon_0, RenderType_MatIcon)), directiveDef(5, 9158656, null, 0, icon_es5_MatIcon, [ ElementRef, icon_es5_MatIconRegistry, [ 8, null ], [ 2, MAT_ICON_LOCATION ] ], {
                svgIcon: [ 0, "svgIcon" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 5, 0, "close");
            }, function(_ck, _v) {
                _ck(_v, 2, 0, nodeValue(_v, 3).disabled || null, "NoopAnimations" === nodeValue(_v, 3)._animationMode), 
                _ck(_v, 4, 0, nodeValue(_v, 5).inline);
            });
        }
        function distinctUntilChanged(compare, keySelector) {
            return function(source) {
                return source.lift(new DistinctUntilChangedOperator(compare, keySelector));
            };
        }
        var NotificationKind, DistinctUntilChangedOperator = function() {
            function DistinctUntilChangedOperator(compare, keySelector) {
                this.compare = compare, this.keySelector = keySelector;
            }
            return DistinctUntilChangedOperator.prototype.call = function(subscriber, source) {
                return source.subscribe(new distinctUntilChanged_DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
            }, DistinctUntilChangedOperator;
        }(), distinctUntilChanged_DistinctUntilChangedSubscriber = function(_super) {
            function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
                var _this = _super.call(this, destination) || this;
                return _this.keySelector = keySelector, _this.hasKey = !1, "function" == typeof compare && (_this.compare = compare), 
                _this;
            }
            return __extends(DistinctUntilChangedSubscriber, _super), DistinctUntilChangedSubscriber.prototype.compare = function(x, y) {
                return x === y;
            }, DistinctUntilChangedSubscriber.prototype._next = function(value) {
                var key;
                try {
                    var keySelector = this.keySelector;
                    key = keySelector ? keySelector(value) : value;
                } catch (err) {
                    return this.destination.error(err);
                }
                var result = !1;
                if (this.hasKey) try {
                    result = (0, this.compare)(this.key, key);
                } catch (err) {
                    return this.destination.error(err);
                } else this.hasKey = !0;
                result || (this.key = key, this.destination.next(value));
            }, DistinctUntilChangedSubscriber;
        }(Subscriber_Subscriber), search_box_component_SearchBoxComponent = function() {
            function SearchBoxComponent(locationService) {
                this.locationService = locationService, this.searchDebounce = 300, this.searchSubject = new Subject_Subject(), 
                this.onSearch = this.searchSubject.pipe(distinctUntilChanged(), debounceTime(this.searchDebounce)), 
                this.onFocus = new core_EventEmitter();
            }
            return SearchBoxComponent.prototype.ngOnInit = function() {
                var query = this.locationService.search().search;
                query && (this.query = query, this.doSearch());
            }, SearchBoxComponent.prototype.doSearch = function() {
                this.searchSubject.next(this.query);
            }, SearchBoxComponent.prototype.doFocus = function() {
                this.onFocus.emit(this.query);
            }, SearchBoxComponent.prototype.focus = function() {
                this.searchBox.nativeElement.focus();
            }, Object.defineProperty(SearchBoxComponent.prototype, "query", {
                get: function() {
                    return this.searchBox.nativeElement.value;
                },
                set: function(value) {
                    this.searchBox.nativeElement.value = value;
                },
                enumerable: !0,
                configurable: !0
            }), SearchBoxComponent;
        }(), QueueAction_QueueAction = function(_super) {
            function QueueAction(scheduler, work) {
                var _this = _super.call(this, scheduler, work) || this;
                return _this.scheduler = scheduler, _this.work = work, _this;
            }
            return __extends(QueueAction, _super), QueueAction.prototype.schedule = function(state, delay) {
                return void 0 === delay && (delay = 0), delay > 0 ? _super.prototype.schedule.call(this, state, delay) : (this.delay = delay, 
                this.state = state, this.scheduler.flush(this), this);
            }, QueueAction.prototype.execute = function(state, delay) {
                return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
            }, QueueAction.prototype.requestAsyncId = function(scheduler, id, delay) {
                return void 0 === delay && (delay = 0), null !== delay && delay > 0 || null === delay && this.delay > 0 ? _super.prototype.requestAsyncId.call(this, scheduler, id, delay) : scheduler.flush(this);
            }, QueueAction;
        }(AsyncAction_AsyncAction), queue = new (function(_super) {
            function QueueScheduler() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return __extends(QueueScheduler, _super), QueueScheduler;
        }(AsyncScheduler_AsyncScheduler))(QueueAction_QueueAction);
        NotificationKind || (NotificationKind = {});
        var Notification_Notification = function() {
            function Notification(kind, value, error) {
                this.kind = kind, this.value = value, this.error = error, this.hasValue = "N" === kind;
            }
            return Notification.prototype.observe = function(observer) {
                switch (this.kind) {
                  case "N":
                    return observer.next && observer.next(this.value);

                  case "E":
                    return observer.error && observer.error(this.error);

                  case "C":
                    return observer.complete && observer.complete();
                }
            }, Notification.prototype.do = function(next, error, complete) {
                switch (this.kind) {
                  case "N":
                    return next && next(this.value);

                  case "E":
                    return error && error(this.error);

                  case "C":
                    return complete && complete();
                }
            }, Notification.prototype.accept = function(nextOrObserver, error, complete) {
                return nextOrObserver && "function" == typeof nextOrObserver.next ? this.observe(nextOrObserver) : this.do(nextOrObserver, error, complete);
            }, Notification.prototype.toObservable = function() {
                switch (this.kind) {
                  case "N":
                    return of(this.value);

                  case "E":
                    return throwError_throwError(this.error);

                  case "C":
                    return empty_empty();
                }
                throw new Error("unexpected notification kind value");
            }, Notification.createNext = function(value) {
                return void 0 !== value ? new Notification("N", value) : Notification.undefinedValueNotification;
            }, Notification.createError = function(err) {
                return new Notification("E", void 0, err);
            }, Notification.createComplete = function() {
                return Notification.completeNotification;
            }, Notification.completeNotification = new Notification("C"), Notification.undefinedValueNotification = new Notification("N", void 0), 
            Notification;
        }(), observeOn_ObserveOnSubscriber = function(_super) {
            function ObserveOnSubscriber(destination, scheduler, delay) {
                void 0 === delay && (delay = 0);
                var _this = _super.call(this, destination) || this;
                return _this.scheduler = scheduler, _this.delay = delay, _this;
            }
            return __extends(ObserveOnSubscriber, _super), ObserveOnSubscriber.dispatch = function(arg) {
                arg.notification.observe(arg.destination), this.unsubscribe();
            }, ObserveOnSubscriber.prototype.scheduleMessage = function(notification) {
                this.destination.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
            }, ObserveOnSubscriber.prototype._next = function(value) {
                this.scheduleMessage(Notification_Notification.createNext(value));
            }, ObserveOnSubscriber.prototype._error = function(err) {
                this.scheduleMessage(Notification_Notification.createError(err)), this.unsubscribe();
            }, ObserveOnSubscriber.prototype._complete = function() {
                this.scheduleMessage(Notification_Notification.createComplete()), this.unsubscribe();
            }, ObserveOnSubscriber;
        }(Subscriber_Subscriber), ObserveOnMessage = function() {
            return function(notification, destination) {
                this.notification = notification, this.destination = destination;
            };
        }(), ReplaySubject_ReplaySubject = function(_super) {
            function ReplaySubject(bufferSize, windowTime, scheduler) {
                void 0 === bufferSize && (bufferSize = Number.POSITIVE_INFINITY), void 0 === windowTime && (windowTime = Number.POSITIVE_INFINITY);
                var _this = _super.call(this) || this;
                return _this.scheduler = scheduler, _this._events = [], _this._infiniteTimeWindow = !1, 
                _this._bufferSize = bufferSize < 1 ? 1 : bufferSize, _this._windowTime = windowTime < 1 ? 1 : windowTime, 
                windowTime === Number.POSITIVE_INFINITY ? (_this._infiniteTimeWindow = !0, _this.next = _this.nextInfiniteTimeWindow) : _this.next = _this.nextTimeWindow, 
                _this;
            }
            return __extends(ReplaySubject, _super), ReplaySubject.prototype.nextInfiniteTimeWindow = function(value) {
                var _events = this._events;
                _events.push(value), _events.length > this._bufferSize && _events.shift(), _super.prototype.next.call(this, value);
            }, ReplaySubject.prototype.nextTimeWindow = function(value) {
                this._events.push(new ReplayEvent(this._getNow(), value)), this._trimBufferThenGetEvents(), 
                _super.prototype.next.call(this, value);
            }, ReplaySubject.prototype._subscribe = function(subscriber) {
                var subscription, _infiniteTimeWindow = this._infiniteTimeWindow, _events = _infiniteTimeWindow ? this._events : this._trimBufferThenGetEvents(), scheduler = this.scheduler, len = _events.length;
                if (this.closed) throw new ObjectUnsubscribedError();
                if (this.isStopped || this.hasError ? subscription = Subscription_Subscription.EMPTY : (this.observers.push(subscriber), 
                subscription = new SubjectSubscription_SubjectSubscription(this, subscriber)), scheduler && subscriber.add(subscriber = new observeOn_ObserveOnSubscriber(subscriber, scheduler)), 
                _infiniteTimeWindow) for (var i = 0; i < len && !subscriber.closed; i++) subscriber.next(_events[i]); else for (i = 0; i < len && !subscriber.closed; i++) subscriber.next(_events[i].value);
                return this.hasError ? subscriber.error(this.thrownError) : this.isStopped && subscriber.complete(), 
                subscription;
            }, ReplaySubject.prototype._getNow = function() {
                return (this.scheduler || queue).now();
            }, ReplaySubject.prototype._trimBufferThenGetEvents = function() {
                for (var now = this._getNow(), _bufferSize = this._bufferSize, _windowTime = this._windowTime, _events = this._events, eventsCount = _events.length, spliceCount = 0; spliceCount < eventsCount && !(now - _events[spliceCount].time < _windowTime); ) spliceCount++;
                return eventsCount > _bufferSize && (spliceCount = Math.max(spliceCount, eventsCount - _bufferSize)), 
                spliceCount > 0 && _events.splice(0, spliceCount), _events;
            }, ReplaySubject;
        }(Subject_Subject), ReplayEvent = function() {
            return function(time, value) {
                this.time = time, this.value = value;
            };
        }(), location_service_LocationService = function() {
            function LocationService(gaService, location, platformLocation, swUpdates) {
                var _this = this;
                this.gaService = gaService, this.location = location, this.platformLocation = platformLocation, 
                this.urlParser = document.createElement("a"), this.urlSubject = new ReplaySubject_ReplaySubject(1), 
                this.swUpdateActivated = !1, this.currentUrl = this.urlSubject.pipe(map_map(function(url) {
                    return _this.stripSlashes(url);
                })), this.currentPath = this.currentUrl.pipe(map_map(function(url) {
                    return (url.match(/[^?#]*/) || [])[0];
                }), tap(function(path) {
                    return _this.gaService.locationChanged(path);
                })), this.urlSubject.next(location.path(!0)), this.location.subscribe(function(state) {
                    return _this.urlSubject.next(state.url || "");
                }), swUpdates.updateActivated.subscribe(function() {
                    return _this.swUpdateActivated = !0;
                });
            }
            return LocationService.prototype.go = function(url) {
                url && (url = this.stripSlashes(url), /^http/.test(url) || this.swUpdateActivated ? this.goExternal(url) : (this.location.go(url), 
                this.urlSubject.next(url)));
            }, LocationService.prototype.goExternal = function(url) {
                window.location.assign(url);
            }, LocationService.prototype.replace = function(url) {
                window.location.replace(url);
            }, LocationService.prototype.stripSlashes = function(url) {
                return url.replace(/^\/+/, "").replace(/\/+(\?|#|$)/, "$1");
            }, LocationService.prototype.search = function() {
                var search = {}, path = this.location.path(), q = path.indexOf("?");
                if (q > -1) try {
                    path.substr(q + 1).split("&").forEach(function(p) {
                        var pair = p.split("=");
                        pair[0] && (search[decodeURIComponent(pair[0])] = pair[1] && decodeURIComponent(pair[1]));
                    });
                } catch (e) {}
                return search;
            }, LocationService.prototype.setSearch = function(label, params) {
                var search = Object.keys(params).reduce(function(acc, key) {
                    var value = params[key];
                    return void 0 === value ? acc : acc += (acc ? "&" : "?") + encodeURIComponent(key) + "=" + encodeURIComponent(value);
                }, "");
                this.platformLocation.replaceState({}, label, this.platformLocation.pathname + search);
            }, LocationService.prototype.handleAnchorClick = function(anchor, button, ctrlKey, metaKey) {
                if (void 0 === button && (button = 0), void 0 === ctrlKey && (ctrlKey = !1), void 0 === metaKey && (metaKey = !1), 
                0 !== button || ctrlKey || metaKey) return !0;
                var anchorTarget = anchor.target;
                if (anchorTarget && "_self" !== anchorTarget) return !0;
                if (null != anchor.getAttribute("download")) return !0;
                var pathname = anchor.pathname, relativeUrl = pathname + anchor.search + anchor.hash;
                return this.urlParser.href = relativeUrl, anchor.href !== this.urlParser.href || !/\/[^\/.]*$/.test(pathname) || (this.go(relativeUrl), 
                !1);
            }, LocationService;
        }(), RenderType_SearchBoxComponent = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_SearchBoxComponent_0(_l) {
            return viewDef(0, [ queryDef(402653184, 1, {
                searchBox: 0
            }), (_l()(), elementDef(1, 0, [ [ 1, 0 ], [ "searchBox", 1 ] ], null, 0, "input", [ [ "aria-label", "search" ], [ "placeholder", "Search" ], [ "type", "search" ] ], null, [ [ null, "input" ], [ null, "keyup" ], [ null, "focus" ], [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0, _co = _v.component;
                return "input" === en && (ad = !1 !== _co.doSearch() && ad), "keyup" === en && (ad = !1 !== _co.doSearch() && ad), 
                "focus" === en && (ad = !1 !== _co.doFocus() && ad), "click" === en && (ad = !1 !== _co.doSearch() && ad), 
                ad;
            }, null, null)) ], null, null);
        }
        var AuditOperator = function() {
            function AuditOperator(durationSelector) {
                this.durationSelector = durationSelector;
            }
            return AuditOperator.prototype.call = function(subscriber, source) {
                return source.subscribe(new audit_AuditSubscriber(subscriber, this.durationSelector));
            }, AuditOperator;
        }(), audit_AuditSubscriber = function(_super) {
            function AuditSubscriber(destination, durationSelector) {
                var _this = _super.call(this, destination) || this;
                return _this.durationSelector = durationSelector, _this.hasValue = !1, _this;
            }
            return __extends(AuditSubscriber, _super), AuditSubscriber.prototype._next = function(value) {
                if (this.value = value, this.hasValue = !0, !this.throttled) {
                    var duration = void 0;
                    try {
                        duration = (0, this.durationSelector)(value);
                    } catch (err) {
                        return this.destination.error(err);
                    }
                    var innerSubscription = subscribeToResult(this, duration);
                    !innerSubscription || innerSubscription.closed ? this.clearThrottle() : this.add(this.throttled = innerSubscription);
                }
            }, AuditSubscriber.prototype.clearThrottle = function() {
                var value = this.value, hasValue = this.hasValue, throttled = this.throttled;
                throttled && (this.remove(throttled), this.throttled = null, throttled.unsubscribe()), 
                hasValue && (this.value = null, this.hasValue = !1, this.destination.next(value));
            }, AuditSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex) {
                this.clearThrottle();
            }, AuditSubscriber.prototype.notifyComplete = function() {
                this.clearThrottle();
            }, AuditSubscriber;
        }(OuterSubscriber_OuterSubscriber);
        function isNumeric(val) {
            return !isArray(val) && val - parseFloat(val) + 1 >= 0;
        }
        function timer(dueTime, periodOrScheduler, scheduler) {
            void 0 === dueTime && (dueTime = 0);
            var period = -1;
            return isNumeric(periodOrScheduler) ? period = Number(periodOrScheduler) < 1 ? 1 : Number(periodOrScheduler) : isScheduler(periodOrScheduler) && (scheduler = periodOrScheduler), 
            isScheduler(scheduler) || (scheduler = async_async), new Observable_Observable(function(subscriber) {
                var due = isNumeric(dueTime) ? dueTime : +dueTime - scheduler.now();
                return scheduler.schedule(timer_dispatch, due, {
                    index: 0,
                    period: period,
                    subscriber: subscriber
                });
            });
        }
        function timer_dispatch(state) {
            var index = state.index, period = state.period, subscriber = state.subscriber;
            if (subscriber.next(index), !subscriber.closed) {
                if (-1 === period) return subscriber.complete();
                state.index = index + 1, this.schedule(state, period);
            }
        }
        function auditTime(duration, scheduler) {
            return void 0 === scheduler && (scheduler = async_async), durationSelector = function() {
                return timer(duration, scheduler);
            }, function(source) {
                return source.lift(new AuditOperator(durationSelector));
            };
            var durationSelector;
        }
        function takeUntil(notifier) {
            return function(source) {
                return source.lift(new takeUntil_TakeUntilOperator(notifier));
            };
        }
        var takeUntil_TakeUntilOperator = function() {
            function TakeUntilOperator(notifier) {
                this.notifier = notifier;
            }
            return TakeUntilOperator.prototype.call = function(subscriber, source) {
                var takeUntilSubscriber = new takeUntil_TakeUntilSubscriber(subscriber), notifierSubscription = subscribeToResult(takeUntilSubscriber, this.notifier);
                return notifierSubscription && !takeUntilSubscriber.seenValue ? (takeUntilSubscriber.add(notifierSubscription), 
                source.subscribe(takeUntilSubscriber)) : takeUntilSubscriber;
            }, TakeUntilOperator;
        }(), takeUntil_TakeUntilSubscriber = function(_super) {
            function TakeUntilSubscriber(destination) {
                var _this = _super.call(this, destination) || this;
                return _this.seenValue = !1, _this;
            }
            return __extends(TakeUntilSubscriber, _super), TakeUntilSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                this.seenValue = !0, this.complete();
            }, TakeUntilSubscriber.prototype.notifyComplete = function() {}, TakeUntilSubscriber;
        }(OuterSubscriber_OuterSubscriber);
        function concat() {
            for (var observables = [], _i = 0; _i < arguments.length; _i++) observables[_i] = arguments[_i];
            return mergeAll(1)(of.apply(void 0, observables));
        }
        function switchMap(project, resultSelector) {
            return "function" == typeof resultSelector ? function(source) {
                return source.pipe(switchMap(function(a, i) {
                    return from_from(project(a, i)).pipe(map_map(function(b, ii) {
                        return resultSelector(a, b, i, ii);
                    }));
                }));
            } : function(source) {
                return source.lift(new SwitchMapOperator(project));
            };
        }
        var SwitchMapOperator = function() {
            function SwitchMapOperator(project) {
                this.project = project;
            }
            return SwitchMapOperator.prototype.call = function(subscriber, source) {
                return source.subscribe(new switchMap_SwitchMapSubscriber(subscriber, this.project));
            }, SwitchMapOperator;
        }(), switchMap_SwitchMapSubscriber = function(_super) {
            function SwitchMapSubscriber(destination, project) {
                var _this = _super.call(this, destination) || this;
                return _this.project = project, _this.index = 0, _this;
            }
            return __extends(SwitchMapSubscriber, _super), SwitchMapSubscriber.prototype._next = function(value) {
                var result, index = this.index++;
                try {
                    result = this.project(value, index);
                } catch (error) {
                    return void this.destination.error(error);
                }
                this._innerSub(result, value, index);
            }, SwitchMapSubscriber.prototype._innerSub = function(result, value, index) {
                var innerSubscription = this.innerSubscription;
                innerSubscription && innerSubscription.unsubscribe();
                var innerSubscriber = new InnerSubscriber_InnerSubscriber(this, void 0, void 0);
                this.destination.add(innerSubscriber), this.innerSubscription = subscribeToResult(this, result, value, index, innerSubscriber);
            }, SwitchMapSubscriber.prototype._complete = function() {
                var innerSubscription = this.innerSubscription;
                innerSubscription && !innerSubscription.closed || _super.prototype._complete.call(this), 
                this.unsubscribe();
            }, SwitchMapSubscriber.prototype._unsubscribe = function() {
                this.innerSubscription = null;
            }, SwitchMapSubscriber.prototype.notifyComplete = function(innerSub) {
                this.destination.remove(innerSub), this.innerSubscription = null, this.isStopped && _super.prototype._complete.call(this);
            }, SwitchMapSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                this.destination.next(innerValue);
            }, SwitchMapSubscriber;
        }(OuterSubscriber_OuterSubscriber), scrolling_es5_ScrollDispatcher = function() {
            function ScrollDispatcher(_ngZone, _platform) {
                this._ngZone = _ngZone, this._platform = _platform, this._scrolled = new Subject_Subject(), 
                this._globalSubscription = null, this._scrolledCount = 0, this.scrollContainers = new Map();
            }
            return ScrollDispatcher.prototype.register = function(scrollable) {
                var _this = this, scrollSubscription = scrollable.elementScrolled().subscribe(function() {
                    return _this._scrolled.next(scrollable);
                });
                this.scrollContainers.set(scrollable, scrollSubscription);
            }, ScrollDispatcher.prototype.deregister = function(scrollable) {
                var scrollableReference = this.scrollContainers.get(scrollable);
                scrollableReference && (scrollableReference.unsubscribe(), this.scrollContainers.delete(scrollable));
            }, ScrollDispatcher.prototype.scrolled = function(auditTimeInMs) {
                var _this = this;
                return void 0 === auditTimeInMs && (auditTimeInMs = 20), this._platform.isBrowser ? Observable_Observable.create(function(observer) {
                    _this._globalSubscription || _this._addGlobalListener();
                    var subscription = auditTimeInMs > 0 ? _this._scrolled.pipe(auditTime(auditTimeInMs)).subscribe(observer) : _this._scrolled.subscribe(observer);
                    return _this._scrolledCount++, function() {
                        subscription.unsubscribe(), _this._scrolledCount--, _this._scrolledCount || _this._removeGlobalListener();
                    };
                }) : of();
            }, ScrollDispatcher.prototype.ngOnDestroy = function() {
                var _this = this;
                this._removeGlobalListener(), this.scrollContainers.forEach(function(_, container) {
                    return _this.deregister(container);
                }), this._scrolled.complete();
            }, ScrollDispatcher.prototype.ancestorScrolled = function(elementRef, auditTimeInMs) {
                var ancestors = this.getAncestorScrollContainers(elementRef);
                return this.scrolled(auditTimeInMs).pipe(filter(function(target) {
                    return !target || ancestors.indexOf(target) > -1;
                }));
            }, ScrollDispatcher.prototype.getAncestorScrollContainers = function(elementRef) {
                var _this = this, scrollingContainers = [];
                return this.scrollContainers.forEach(function(_subscription, scrollable) {
                    _this._scrollableContainsElement(scrollable, elementRef) && scrollingContainers.push(scrollable);
                }), scrollingContainers;
            }, ScrollDispatcher.prototype._scrollableContainsElement = function(scrollable, elementRef) {
                var element = elementRef.nativeElement, scrollableElement = scrollable.getElementRef().nativeElement;
                do {
                    if (element == scrollableElement) return !0;
                } while (element = element.parentElement);
                return !1;
            }, ScrollDispatcher.prototype._addGlobalListener = function() {
                var _this = this;
                this._globalSubscription = this._ngZone.runOutsideAngular(function() {
                    return fromEvent(window.document, "scroll").subscribe(function() {
                        return _this._scrolled.next();
                    });
                });
            }, ScrollDispatcher.prototype._removeGlobalListener = function() {
                this._globalSubscription && (this._globalSubscription.unsubscribe(), this._globalSubscription = null);
            }, ScrollDispatcher.ngInjectableDef = defineInjectable({
                factory: function() {
                    return new ScrollDispatcher(inject(NgZone), inject(platform_es5_Platform));
                },
                token: ScrollDispatcher,
                providedIn: "root"
            }), ScrollDispatcher;
        }(), scrolling_es5_CdkScrollable = function() {
            function CdkScrollable(elementRef, scrollDispatcher, ngZone, dir) {
                var _this = this;
                this.elementRef = elementRef, this.scrollDispatcher = scrollDispatcher, this.ngZone = ngZone, 
                this.dir = dir, this._destroyed = new Subject_Subject(), this._elementScrolled = Observable_Observable.create(function(observer) {
                    return _this.ngZone.runOutsideAngular(function() {
                        return fromEvent(_this.elementRef.nativeElement, "scroll").pipe(takeUntil(_this._destroyed)).subscribe(observer);
                    });
                });
            }
            return CdkScrollable.prototype.ngOnInit = function() {
                this.scrollDispatcher.register(this);
            }, CdkScrollable.prototype.ngOnDestroy = function() {
                this.scrollDispatcher.deregister(this), this._destroyed.next(), this._destroyed.complete();
            }, CdkScrollable.prototype.elementScrolled = function() {
                return this._elementScrolled;
            }, CdkScrollable.prototype.getElementRef = function() {
                return this.elementRef;
            }, CdkScrollable.prototype.scrollTo = function(options) {
                var el = this.elementRef.nativeElement, isRtl = this.dir && "rtl" == this.dir.value;
                options.left = null == options.left ? isRtl ? options.end : options.start : options.left, 
                options.right = null == options.right ? isRtl ? options.start : options.end : options.right, 
                null != options.bottom && (options.top = el.scrollHeight - el.clientHeight - options.bottom), 
                isRtl && getRtlScrollAxisType() != RtlScrollAxisType.NORMAL ? (null != options.left && (options.right = el.scrollWidth - el.clientWidth - options.left), 
                getRtlScrollAxisType() == RtlScrollAxisType.INVERTED ? options.left = options.right : getRtlScrollAxisType() == RtlScrollAxisType.NEGATED && (options.left = options.right ? -options.right : options.right)) : null != options.right && (options.left = el.scrollWidth - el.clientWidth - options.right), 
                this._applyScrollToOptions(options);
            }, CdkScrollable.prototype._applyScrollToOptions = function(options) {
                var el = this.elementRef.nativeElement;
                "object" == typeof document && "scrollBehavior" in document.documentElement.style ? el.scrollTo(options) : (null != options.top && (el.scrollTop = options.top), 
                null != options.left && (el.scrollLeft = options.left));
            }, CdkScrollable.prototype.measureScrollOffset = function(from) {
                var el = this.elementRef.nativeElement;
                if ("top" == from) return el.scrollTop;
                if ("bottom" == from) return el.scrollHeight - el.clientHeight - el.scrollTop;
                var isRtl = this.dir && "rtl" == this.dir.value;
                return "start" == from ? from = isRtl ? "right" : "left" : "end" == from && (from = isRtl ? "left" : "right"), 
                isRtl && getRtlScrollAxisType() == RtlScrollAxisType.INVERTED ? "left" == from ? el.scrollWidth - el.clientWidth - el.scrollLeft : el.scrollLeft : isRtl && getRtlScrollAxisType() == RtlScrollAxisType.NEGATED ? "left" == from ? el.scrollLeft + el.scrollWidth - el.clientWidth : -el.scrollLeft : "left" == from ? el.scrollLeft : el.scrollWidth - el.clientWidth - el.scrollLeft;
            }, CdkScrollable;
        }(), ScrollingModule = function() {
            return function() {};
        }();
        function throwMatDuplicatedDrawerError(position) {
            throw Error("A drawer was already declared for 'position=\"" + position + "\"'");
        }
        var MAT_DRAWER_DEFAULT_AUTOSIZE = new InjectionToken("MAT_DRAWER_DEFAULT_AUTOSIZE", {
            providedIn: "root",
            factory: function() {
                return !1;
            }
        }), sidenav_es5_MatDrawerContent = function(_super) {
            function MatDrawerContent(_changeDetectorRef, _container, elementRef, scrollDispatcher, ngZone) {
                var _this = _super.call(this, elementRef, scrollDispatcher, ngZone) || this;
                return _this._changeDetectorRef = _changeDetectorRef, _this._container = _container, 
                _this;
            }
            return __extends(MatDrawerContent, _super), MatDrawerContent.prototype.ngAfterContentInit = function() {
                var _this = this;
                this._container._contentMarginChanges.subscribe(function() {
                    _this._changeDetectorRef.markForCheck();
                });
            }, MatDrawerContent;
        }(scrolling_es5_CdkScrollable), sidenav_es5_MatDrawer = function() {
            function MatDrawer(_elementRef, _focusTrapFactory, _focusMonitor, _platform, _ngZone, _doc) {
                var _this = this;
                this._elementRef = _elementRef, this._focusTrapFactory = _focusTrapFactory, this._focusMonitor = _focusMonitor, 
                this._platform = _platform, this._ngZone = _ngZone, this._doc = _doc, this._elementFocusedBeforeDrawerWasOpened = null, 
                this._enableAnimations = !1, this._position = "start", this._mode = "over", this._disableClose = !1, 
                this._autoFocus = !0, this._animationStarted = new core_EventEmitter(), this._animationState = "void", 
                this.openedChange = new core_EventEmitter(!0), this.onPositionChanged = new core_EventEmitter(), 
                this._modeChanged = new Subject_Subject(), this._opened = !1, this.openedChange.subscribe(function(opened) {
                    opened ? (_this._doc && (_this._elementFocusedBeforeDrawerWasOpened = _this._doc.activeElement), 
                    _this._isFocusTrapEnabled && _this._focusTrap && _this._trapFocus()) : _this._restoreFocus();
                }), this._ngZone.runOutsideAngular(function() {
                    fromEvent(_this._elementRef.nativeElement, "keydown").pipe(filter(function(event) {
                        return event.keyCode === ESCAPE && !_this.disableClose;
                    })).subscribe(function(event) {
                        return _this._ngZone.run(function() {
                            _this.close(), event.stopPropagation();
                        });
                    });
                });
            }
            return Object.defineProperty(MatDrawer.prototype, "position", {
                get: function() {
                    return this._position;
                },
                set: function(value) {
                    (value = "end" === value ? "end" : "start") != this._position && (this._position = value, 
                    this.onPositionChanged.emit());
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatDrawer.prototype, "mode", {
                get: function() {
                    return this._mode;
                },
                set: function(value) {
                    this._mode = value, this._modeChanged.next();
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatDrawer.prototype, "disableClose", {
                get: function() {
                    return this._disableClose;
                },
                set: function(value) {
                    this._disableClose = coerceBooleanProperty(value);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatDrawer.prototype, "autoFocus", {
                get: function() {
                    return this._autoFocus;
                },
                set: function(value) {
                    this._autoFocus = coerceBooleanProperty(value);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatDrawer.prototype, "_openedStream", {
                get: function() {
                    return this.openedChange.pipe(filter(function(o) {
                        return o;
                    }), map_map(function() {}));
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatDrawer.prototype, "openedStart", {
                get: function() {
                    return this._animationStarted.pipe(filter(function(e) {
                        return e.fromState !== e.toState && 0 === e.toState.indexOf("open");
                    }), map_map(function() {}));
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatDrawer.prototype, "_closedStream", {
                get: function() {
                    return this.openedChange.pipe(filter(function(o) {
                        return !o;
                    }), map_map(function() {}));
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatDrawer.prototype, "closedStart", {
                get: function() {
                    return this._animationStarted.pipe(filter(function(e) {
                        return e.fromState !== e.toState && "void" === e.toState;
                    }), map_map(function() {}));
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatDrawer.prototype, "_isFocusTrapEnabled", {
                get: function() {
                    return this.opened && "side" !== this.mode;
                },
                enumerable: !0,
                configurable: !0
            }), MatDrawer.prototype._trapFocus = function() {
                var _this = this;
                this.autoFocus && this._focusTrap.focusInitialElementWhenReady().then(function(hasMovedFocus) {
                    hasMovedFocus || "function" != typeof _this._elementRef.nativeElement.focus || _this._elementRef.nativeElement.focus();
                });
            }, MatDrawer.prototype._restoreFocus = function() {
                if (this.autoFocus) {
                    var activeEl = this._doc && this._doc.activeElement;
                    activeEl && this._elementRef.nativeElement.contains(activeEl) && (this._elementFocusedBeforeDrawerWasOpened instanceof HTMLElement ? this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened, this._openedVia) : this._elementRef.nativeElement.blur()), 
                    this._elementFocusedBeforeDrawerWasOpened = null, this._openedVia = null;
                }
            }, MatDrawer.prototype.ngAfterContentInit = function() {
                this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement), 
                this._focusTrap.enabled = this._isFocusTrapEnabled;
            }, MatDrawer.prototype.ngAfterContentChecked = function() {
                this._platform.isBrowser && (this._enableAnimations = !0);
            }, MatDrawer.prototype.ngOnDestroy = function() {
                this._focusTrap && this._focusTrap.destroy();
            }, Object.defineProperty(MatDrawer.prototype, "opened", {
                get: function() {
                    return this._opened;
                },
                set: function(value) {
                    this.toggle(coerceBooleanProperty(value));
                },
                enumerable: !0,
                configurable: !0
            }), MatDrawer.prototype.open = function(openedVia) {
                return this.toggle(!0, openedVia);
            }, MatDrawer.prototype.close = function() {
                return this.toggle(!1);
            }, MatDrawer.prototype.toggle = function(isOpen, openedVia) {
                var _this = this;
                return void 0 === isOpen && (isOpen = !this.opened), void 0 === openedVia && (openedVia = "program"), 
                this._opened = isOpen, isOpen ? (this._animationState = this._enableAnimations ? "open" : "open-instant", 
                this._openedVia = openedVia) : (this._animationState = "void", this._restoreFocus()), 
                this._focusTrap && (this._focusTrap.enabled = this._isFocusTrapEnabled), new Promise(function(resolve) {
                    _this.openedChange.pipe(take(1)).subscribe(function(open) {
                        return resolve(open ? "open" : "close");
                    });
                });
            }, MatDrawer.prototype._onAnimationStart = function(event) {
                this._animationStarted.emit(event);
            }, MatDrawer.prototype._onAnimationEnd = function(event) {
                var fromState = event.fromState, toState = event.toState;
                (0 === toState.indexOf("open") && "void" === fromState || "void" === toState && 0 === fromState.indexOf("open")) && this.openedChange.emit(this._opened);
            }, Object.defineProperty(MatDrawer.prototype, "_width", {
                get: function() {
                    return this._elementRef.nativeElement && this._elementRef.nativeElement.offsetWidth || 0;
                },
                enumerable: !0,
                configurable: !0
            }), MatDrawer;
        }(), sidenav_es5_MatDrawerContainer = function() {
            function MatDrawerContainer(_dir, _element, _ngZone, _changeDetectorRef, defaultAutosize, _animationMode) {
                void 0 === defaultAutosize && (defaultAutosize = !1);
                var _this = this;
                this._dir = _dir, this._element = _element, this._ngZone = _ngZone, this._changeDetectorRef = _changeDetectorRef, 
                this._animationMode = _animationMode, this.backdropClick = new core_EventEmitter(), 
                this._destroyed = new Subject_Subject(), this._doCheckSubject = new Subject_Subject(), 
                this._contentMargins = {
                    left: null,
                    right: null
                }, this._contentMarginChanges = new Subject_Subject(), _dir && _dir.change.pipe(takeUntil(this._destroyed)).subscribe(function() {
                    _this._validateDrawers(), _this._updateContentMargins();
                }), this._autosize = defaultAutosize;
            }
            return Object.defineProperty(MatDrawerContainer.prototype, "start", {
                get: function() {
                    return this._start;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatDrawerContainer.prototype, "end", {
                get: function() {
                    return this._end;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatDrawerContainer.prototype, "autosize", {
                get: function() {
                    return this._autosize;
                },
                set: function(value) {
                    this._autosize = coerceBooleanProperty(value);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatDrawerContainer.prototype, "hasBackdrop", {
                get: function() {
                    return null == this._backdropOverride ? !this._start || "side" !== this._start.mode || !this._end || "side" !== this._end.mode : this._backdropOverride;
                },
                set: function(value) {
                    this._backdropOverride = null == value ? null : coerceBooleanProperty(value);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatDrawerContainer.prototype, "scrollable", {
                get: function() {
                    return this._userContent || this._content;
                },
                enumerable: !0,
                configurable: !0
            }), MatDrawerContainer.prototype.ngAfterContentInit = function() {
                var _this = this;
                this._drawers.changes.pipe(function() {
                    for (var array = [], _i = 0; _i < arguments.length; _i++) array[_i] = arguments[_i];
                    return function(source) {
                        var scheduler = array[array.length - 1];
                        isScheduler(scheduler) ? array.pop() : scheduler = null;
                        var len = array.length;
                        return concat(1 !== len || scheduler ? len > 0 ? fromArray(array, scheduler) : empty_empty(scheduler) : scalar(array[0]), source);
                    };
                }(null)).subscribe(function() {
                    _this._validateDrawers(), _this._drawers.forEach(function(drawer) {
                        _this._watchDrawerToggle(drawer), _this._watchDrawerPosition(drawer), _this._watchDrawerMode(drawer);
                    }), (!_this._drawers.length || _this._isDrawerOpen(_this._start) || _this._isDrawerOpen(_this._end)) && _this._updateContentMargins(), 
                    _this._changeDetectorRef.markForCheck();
                }), this._doCheckSubject.pipe(debounceTime(10), takeUntil(this._destroyed)).subscribe(function() {
                    return _this._updateContentMargins();
                });
            }, MatDrawerContainer.prototype.ngOnDestroy = function() {
                this._doCheckSubject.complete(), this._destroyed.next(), this._destroyed.complete();
            }, MatDrawerContainer.prototype.open = function() {
                this._drawers.forEach(function(drawer) {
                    return drawer.open();
                });
            }, MatDrawerContainer.prototype.close = function() {
                this._drawers.forEach(function(drawer) {
                    return drawer.close();
                });
            }, MatDrawerContainer.prototype.ngDoCheck = function() {
                var _this = this;
                this._autosize && this._isPushed() && this._ngZone.runOutsideAngular(function() {
                    return _this._doCheckSubject.next();
                });
            }, MatDrawerContainer.prototype._watchDrawerToggle = function(drawer) {
                var _this = this;
                drawer._animationStarted.pipe(takeUntil(this._drawers.changes), filter(function(event) {
                    return event.fromState !== event.toState;
                })).subscribe(function(event) {
                    "open-instant" !== event.toState && "NoopAnimations" !== _this._animationMode && _this._element.nativeElement.classList.add("mat-drawer-transition"), 
                    _this._updateContentMargins(), _this._changeDetectorRef.markForCheck();
                }), "side" !== drawer.mode && drawer.openedChange.pipe(takeUntil(this._drawers.changes)).subscribe(function() {
                    return _this._setContainerClass(drawer.opened);
                });
            }, MatDrawerContainer.prototype._watchDrawerPosition = function(drawer) {
                var _this = this;
                drawer && drawer.onPositionChanged.pipe(takeUntil(this._drawers.changes)).subscribe(function() {
                    _this._ngZone.onMicrotaskEmpty.asObservable().pipe(take(1)).subscribe(function() {
                        _this._validateDrawers();
                    });
                });
            }, MatDrawerContainer.prototype._watchDrawerMode = function(drawer) {
                var _this = this;
                drawer && drawer._modeChanged.pipe(takeUntil(merge(this._drawers.changes, this._destroyed))).subscribe(function() {
                    _this._updateContentMargins(), _this._changeDetectorRef.markForCheck();
                });
            }, MatDrawerContainer.prototype._setContainerClass = function(isAdd) {
                isAdd ? this._element.nativeElement.classList.add("mat-drawer-opened") : this._element.nativeElement.classList.remove("mat-drawer-opened");
            }, MatDrawerContainer.prototype._validateDrawers = function() {
                var _this = this;
                this._start = this._end = null, this._drawers.forEach(function(drawer) {
                    "end" == drawer.position ? (null != _this._end && throwMatDuplicatedDrawerError("end"), 
                    _this._end = drawer) : (null != _this._start && throwMatDuplicatedDrawerError("start"), 
                    _this._start = drawer);
                }), this._right = this._left = null, this._dir && "rtl" === this._dir.value ? (this._left = this._end, 
                this._right = this._start) : (this._left = this._start, this._right = this._end);
            }, MatDrawerContainer.prototype._isPushed = function() {
                return this._isDrawerOpen(this._start) && "over" != this._start.mode || this._isDrawerOpen(this._end) && "over" != this._end.mode;
            }, MatDrawerContainer.prototype._onBackdropClicked = function() {
                this.backdropClick.emit(), this._closeModalDrawer();
            }, MatDrawerContainer.prototype._closeModalDrawer = function() {
                var _this = this;
                [ this._start, this._end ].filter(function(drawer) {
                    return drawer && !drawer.disableClose && _this._canHaveBackdrop(drawer);
                }).forEach(function(drawer) {
                    return drawer.close();
                });
            }, MatDrawerContainer.prototype._isShowingBackdrop = function() {
                return this._isDrawerOpen(this._start) && this._canHaveBackdrop(this._start) || this._isDrawerOpen(this._end) && this._canHaveBackdrop(this._end);
            }, MatDrawerContainer.prototype._canHaveBackdrop = function(drawer) {
                return "side" !== drawer.mode || !!this._backdropOverride;
            }, MatDrawerContainer.prototype._isDrawerOpen = function(drawer) {
                return null != drawer && drawer.opened;
            }, MatDrawerContainer.prototype._updateContentMargins = function() {
                var _this = this, left = 0, right = 0;
                if (this._left && this._left.opened && ("side" == this._left.mode ? left += this._left._width : "push" == this._left.mode && (left += width = this._left._width, 
                right -= width)), this._right && this._right.opened) if ("side" == this._right.mode) right += this._right._width; else if ("push" == this._right.mode) {
                    var width;
                    right += width = this._right._width, left -= width;
                }
                right = right || null, (left = left || null) === this._contentMargins.left && right === this._contentMargins.right || (this._contentMargins = {
                    left: left,
                    right: right
                }, this._ngZone.run(function() {
                    return _this._contentMarginChanges.next(_this._contentMargins);
                }));
            }, MatDrawerContainer;
        }(), sidenav_es5_MatSidenavContent = function(_super) {
            function MatSidenavContent(changeDetectorRef, container, elementRef, scrollDispatcher, ngZone) {
                return _super.call(this, changeDetectorRef, container, elementRef, scrollDispatcher, ngZone) || this;
            }
            return __extends(MatSidenavContent, _super), MatSidenavContent;
        }(sidenav_es5_MatDrawerContent), sidenav_es5_MatSidenav = function(_super) {
            function MatSidenav() {
                var _this = null !== _super && _super.apply(this, arguments) || this;
                return _this._fixedInViewport = !1, _this._fixedTopGap = 0, _this._fixedBottomGap = 0, 
                _this;
            }
            return __extends(MatSidenav, _super), Object.defineProperty(MatSidenav.prototype, "fixedInViewport", {
                get: function() {
                    return this._fixedInViewport;
                },
                set: function(value) {
                    this._fixedInViewport = coerceBooleanProperty(value);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatSidenav.prototype, "fixedTopGap", {
                get: function() {
                    return this._fixedTopGap;
                },
                set: function(value) {
                    this._fixedTopGap = coerceNumberProperty(value);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(MatSidenav.prototype, "fixedBottomGap", {
                get: function() {
                    return this._fixedBottomGap;
                },
                set: function(value) {
                    this._fixedBottomGap = coerceNumberProperty(value);
                },
                enumerable: !0,
                configurable: !0
            }), MatSidenav;
        }(sidenav_es5_MatDrawer), sidenav_es5_MatSidenavContainer = function(_super) {
            function MatSidenavContainer() {
                return null !== _super && _super.apply(this, arguments) || this;
            }
            return __extends(MatSidenavContainer, _super), MatSidenavContainer;
        }(sidenav_es5_MatDrawerContainer), MatSidenavModule = function() {
            return function() {};
        }(), RenderType_MatSidenavContent = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_MatSidenavContent_0(_l) {
            return viewDef(2, [ ngContentDef(null, 0) ], null, null);
        }
        var RenderType_MatSidenav = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {
                animation: [ {
                    type: 7,
                    name: "transform",
                    definitions: [ {
                        type: 0,
                        name: "open, open-instant",
                        styles: {
                            type: 6,
                            styles: {
                                transform: "none",
                                visibility: "visible"
                            },
                            offset: null
                        },
                        options: void 0
                    }, {
                        type: 0,
                        name: "void",
                        styles: {
                            type: 6,
                            styles: {
                                "box-shadow": "none",
                                visibility: "hidden"
                            },
                            offset: null
                        },
                        options: void 0
                    }, {
                        type: 1,
                        expr: "void => open-instant",
                        animation: {
                            type: 4,
                            styles: null,
                            timings: "0ms"
                        },
                        options: null
                    }, {
                        type: 1,
                        expr: "void <=> open, open-instant => void",
                        animation: {
                            type: 4,
                            styles: null,
                            timings: "400ms cubic-bezier(0.25, 0.8, 0.25, 1)"
                        },
                        options: null
                    } ],
                    options: {}
                } ]
            }
        });
        function View_MatSidenav_0(_l) {
            return viewDef(2, [ (_l()(), elementDef(0, 0, null, null, 1, "div", [ [ "class", "mat-drawer-inner-container" ] ], null, null, null, null, null)), ngContentDef(null, 0) ], null, null);
        }
        var RenderType_MatSidenavContainer = createRendererType2({
            encapsulation: 2,
            styles: [ ".mat-drawer-container{position:relative;z-index:1;box-sizing:border-box;-webkit-overflow-scrolling:touch;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-opened{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:background-color,visibility}@media screen and (-ms-high-contrast:active){.mat-drawer-backdrop{opacity:.5}}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-transition .mat-drawer-content{transition-duration:.4s;transition-timing-function:cubic-bezier(.25,.8,.25,1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%,0,0)}@media screen and (-ms-high-contrast:active){.mat-drawer,[dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}}@media screen and (-ms-high-contrast:active){.mat-drawer.mat-drawer-end,[dir=rtl] .mat-drawer{border-left:solid 1px currentColor;border-right:none}}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer{transform:translate3d(100%,0,0)}[dir=rtl] .mat-drawer.mat-drawer-end{left:0;right:auto;transform:translate3d(-100%,0,0)}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto;-webkit-overflow-scrolling:touch}.mat-sidenav-fixed{position:fixed}" ],
            data: {}
        });
        function View_MatSidenavContainer_1(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 0, "div", [ [ "class", "mat-drawer-backdrop" ] ], [ [ 2, "mat-drawer-shown", null ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component._onBackdropClicked() && ad), 
                ad;
            }, null, null)) ], null, function(_ck, _v) {
                _ck(_v, 0, 0, _v.component._isShowingBackdrop());
            });
        }
        function View_MatSidenavContainer_2(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 3, "mat-sidenav-content", [ [ "cdkScrollable", "" ], [ "class", "mat-drawer-content mat-sidenav-content" ] ], [ [ 4, "margin-left", "px" ], [ 4, "margin-right", "px" ] ], null, null, View_MatSidenavContent_0, RenderType_MatSidenavContent)), directiveDef(1, 212992, null, 0, scrolling_es5_CdkScrollable, [ ElementRef, scrolling_es5_ScrollDispatcher, NgZone, [ 2, bidi_es5_Directionality ] ], null, null), directiveDef(2, 1294336, null, 0, sidenav_es5_MatSidenavContent, [ ChangeDetectorRef, sidenav_es5_MatSidenavContainer, ElementRef, scrolling_es5_ScrollDispatcher, NgZone ], null, null), ngContentDef(0, 2) ], function(_ck, _v) {
                _ck(_v, 1, 0), _ck(_v, 2, 0);
            }, function(_ck, _v) {
                _ck(_v, 0, 0, nodeValue(_v, 2)._container._contentMargins.left, nodeValue(_v, 2)._container._contentMargins.right);
            });
        }
        function View_MatSidenavContainer_0(_l) {
            return viewDef(2, [ queryDef(402653184, 1, {
                _userContent: 0
            }), (_l()(), anchorDef(16777216, null, null, 1, null, View_MatSidenavContainer_1)), directiveDef(2, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null), ngContentDef(null, 0), ngContentDef(null, 1), (_l()(), anchorDef(16777216, null, null, 1, null, View_MatSidenavContainer_2)), directiveDef(6, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 2, 0, _co.hasBackdrop), _ck(_v, 6, 0, !_co._content);
            }, null);
        }
        var select_component_SelectComponent = function() {
            function SelectComponent(hostElement) {
                this.hostElement = hostElement, this.change = new core_EventEmitter(), this.showSymbol = !1, 
                this.showOptions = !1;
            }
            return SelectComponent.prototype.ngOnInit = function() {
                this.label = this.label || "";
            }, SelectComponent.prototype.toggleOptions = function() {
                this.showOptions = !this.showOptions;
            }, SelectComponent.prototype.hideOptions = function() {
                this.showOptions = !1;
            }, SelectComponent.prototype.select = function(option, index) {
                this.selected = option, this.change.emit({
                    option: option,
                    index: index
                }), this.hideOptions();
            }, SelectComponent.prototype.onClick = function(eventTarget) {
                this.hostElement.nativeElement.contains(eventTarget) || this.hideOptions();
            }, SelectComponent.prototype.onKeyDown = function() {
                this.hideOptions();
            }, SelectComponent;
        }(), RenderType_SelectComponent = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_SelectComponent_1(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 0, "span", [], [ [ 8, "className", 0 ] ], null, null, null, null)) ], null, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 0, 0, inlineInterpolate(1, "symbol ", null == _co.selected ? null : _co.selected.value, ""));
            });
        }
        function View_SelectComponent_4(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 0, "span", [], [ [ 8, "className", 0 ] ], null, null, null, null)) ], null, function(_ck, _v) {
                _ck(_v, 0, 0, inlineInterpolate(1, "symbol ", _v.parent.context.$implicit.value, ""));
            });
        }
        function View_SelectComponent_3(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 3, "li", [ [ "role", "button" ], [ "tabindex", "0" ] ], [ [ 2, "selected", null ] ], [ [ null, "click" ], [ null, "keydown.enter" ], [ null, "keydown.space" ] ], function(_v, en, $event) {
                var ad = !0, _co = _v.component;
                return "click" === en && (ad = !1 !== _co.select(_v.context.$implicit, _v.context.index) && ad), 
                "keydown.enter" === en && (ad = !1 !== _co.select(_v.context.$implicit, _v.context.index) && ad), 
                "keydown.space" === en && (_co.select(_v.context.$implicit, _v.context.index), ad = !1 !== $event.preventDefault() && ad), 
                ad;
            }, null, null)), (_l()(), anchorDef(16777216, null, null, 1, null, View_SelectComponent_4)), directiveDef(2, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), textDef(3, null, [ "", " " ])) ], function(_ck, _v) {
                _ck(_v, 2, 0, _v.component.showSymbol);
            }, function(_ck, _v) {
                _ck(_v, 0, 0, _v.context.$implicit === _v.component.selected), _ck(_v, 3, 0, _v.context.$implicit.title);
            });
        }
        function View_SelectComponent_2(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 2, "ul", [ [ "class", "form-select-dropdown" ] ], null, null, null, null, null)), (_l()(), 
            anchorDef(16777216, null, null, 1, null, View_SelectComponent_3)), directiveDef(2, 278528, null, 0, common_NgForOf, [ ViewContainerRef, TemplateRef, IterableDiffers ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 2, 0, _v.component.options);
            }, null);
        }
        function View_SelectComponent_0(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 8, "div", [ [ "class", "form-select-menu" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(1, 0, null, null, 5, "button", [ [ "class", "form-select-button" ] ], [ [ 8, "disabled", 0 ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== _v.component.toggleOptions() && ad), ad;
            }, null, null)), (_l()(), elementDef(2, 0, null, null, 1, "strong", [], null, null, null, null, null)), (_l()(), 
            textDef(3, null, [ "", "" ])), (_l()(), anchorDef(16777216, null, null, 1, null, View_SelectComponent_1)), directiveDef(5, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), textDef(6, null, [ "", " " ])), (_l()(), anchorDef(16777216, null, null, 1, null, View_SelectComponent_2)), directiveDef(8, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 5, 0, _co.showSymbol), _ck(_v, 8, 0, _co.showOptions);
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 1, 0, _co.disabled), _ck(_v, 3, 0, _co.label), _ck(_v, 6, 0, null == _co.selected ? null : _co.selected.title);
            });
        }
        var ModeBannerComponent = function() {
            return function() {};
        }(), RenderType_ModeBannerComponent = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_ModeBannerComponent_1(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 7, "div", [ [ "class", "mode-banner" ] ], null, null, null, null, null)), (_l()(), 
            textDef(-1, null, [ " This is the " ])), (_l()(), elementDef(2, 0, null, null, 1, "strong", [], null, null, null, null, null)), (_l()(), 
            textDef(3, null, [ "archived documentation for Angular v", "." ])), (_l()(), textDef(-1, null, [ " Please visit " ])), (_l()(), 
            elementDef(5, 0, null, null, 1, "a", [ [ "href", "https://angular.io/" ] ], null, null, null, null, null)), (_l()(), 
            textDef(-1, null, [ "angular.io" ])), (_l()(), textDef(-1, null, [ " to see documentation for the current version of Angular. " ])) ], null, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 3, 0, null == _co.version ? null : _co.version.major);
            });
        }
        function View_ModeBannerComponent_0(_l) {
            return viewDef(0, [ (_l()(), anchorDef(16777216, null, null, 1, null, View_ModeBannerComponent_1)), directiveDef(1, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 1, 0, "archive" == _v.component.mode);
            }, null);
        }
        var AsyncSubject_AsyncSubject = function(_super) {
            function AsyncSubject() {
                var _this = null !== _super && _super.apply(this, arguments) || this;
                return _this.value = null, _this.hasNext = !1, _this.hasCompleted = !1, _this;
            }
            return __extends(AsyncSubject, _super), AsyncSubject.prototype._subscribe = function(subscriber) {
                return this.hasError ? (subscriber.error(this.thrownError), Subscription_Subscription.EMPTY) : this.hasCompleted && this.hasNext ? (subscriber.next(this.value), 
                subscriber.complete(), Subscription_Subscription.EMPTY) : _super.prototype._subscribe.call(this, subscriber);
            }, AsyncSubject.prototype.next = function(value) {
                this.hasCompleted || (this.value = value, this.hasNext = !0);
            }, AsyncSubject.prototype.error = function(error) {
                this.hasCompleted || _super.prototype.error.call(this, error);
            }, AsyncSubject.prototype.complete = function() {
                this.hasCompleted = !0, this.hasNext && _super.prototype.next.call(this, this.value), 
                _super.prototype.complete.call(this);
            }, AsyncSubject;
        }(Subject_Subject), document_service_DocumentService = function() {
            function DocumentService(logger, http, location) {
                var _this = this;
                this.logger = logger, this.http = http, this.cache = new Map(), this.currentDocument = location.currentPath.pipe(switchMap(function(path) {
                    return _this.getDocument(path);
                }));
            }
            return DocumentService.prototype.getDocument = function(url) {
                var id = url || "index";
                return this.logger.log("getting document", id), this.cache.has(id) || this.cache.set(id, this.fetchDocument(id)), 
                this.cache.get(id);
            }, DocumentService.prototype.fetchDocument = function(id) {
                var _this = this, requestPath = "generated/docs/" + id + ".json", subject = new AsyncSubject_AsyncSubject();
                return this.logger.log("fetching document from", requestPath), this.http.get(requestPath, {
                    responseType: "json"
                }).pipe(tap(function(data) {
                    if (!data || "object" != typeof data) throw _this.logger.log("received invalid data:", data), 
                    Error("Invalid data");
                }), catchError(function(error) {
                    return 404 === error.status ? _this.getFileNotFoundDoc(id) : _this.getErrorDoc(id, error);
                })).subscribe(subject), subject.asObservable();
            }, DocumentService.prototype.getFileNotFoundDoc = function(id) {
                return "file-not-found" !== id ? (this.logger.error(new Error("Document file not found at '" + id + "'")), 
                this.getDocument("file-not-found")) : of({
                    id: "file-not-found",
                    contents: "Document not found"
                });
            }, DocumentService.prototype.getErrorDoc = function(id, error) {
                return this.logger.error(new Error("Error fetching document '" + id + "': (" + error.message + ")")), 
                this.cache.delete(id), of({
                    id: "fetching-error",
                    contents: (path = id, '\n  <div class="nf-container l-flex-wrap flex-center">\n    <div class="nf-icon material-icons">error_outline</div>\n    <div class="nf-response l-flex-wrap">\n      <h1 class="no-toc">Request for document failed.</h1>\n      <p>\n        We are unable to retrieve the "' + path + '" page at this time.\n        Please check your connection and try again later.\n      </p>\n    </div>\n  </div>\n')
                });
                var path;
            }, DocumentService;
        }(), initialDocViewerElement = document.querySelector("aio-doc-viewer"), initialDocViewerContent = initialDocViewerElement ? initialDocViewerElement.innerHTML : "", doc_viewer_component_DocViewerComponent = function() {
            function DocViewerComponent(elementRef, logger, titleService, metaService, tocService, elementsLoader) {
                var _this = this;
                this.logger = logger, this.titleService = titleService, this.metaService = metaService, 
                this.tocService = tocService, this.elementsLoader = elementsLoader, this.void$ = of(void 0), 
                this.onDestroy$ = new core_EventEmitter(), this.docContents$ = new core_EventEmitter(), 
                this.currViewContainer = document.createElement("div"), this.nextViewContainer = document.createElement("div"), 
                this.docReady = new core_EventEmitter(), this.docRemoved = new core_EventEmitter(), 
                this.docInserted = new core_EventEmitter(), this.docRendered = new core_EventEmitter(), 
                this.hostElement = elementRef.nativeElement, this.hostElement.innerHTML = initialDocViewerContent, 
                this.hostElement.firstElementChild && (this.currViewContainer = this.hostElement.firstElementChild), 
                this.docContents$.pipe(switchMap(function(newDoc) {
                    return _this.render(newDoc);
                }), takeUntil(this.onDestroy$)).subscribe();
            }
            return Object.defineProperty(DocViewerComponent.prototype, "doc", {
                set: function(newDoc) {
                    newDoc && this.docContents$.emit(newDoc);
                },
                enumerable: !0,
                configurable: !0
            }), DocViewerComponent.prototype.ngOnDestroy = function() {
                this.onDestroy$.emit();
            }, DocViewerComponent.prototype.prepareTitleAndToc = function(targetElem, docId) {
                var _this = this, titleEl = targetElem.querySelector("h1"), needsToc = !!titleEl && !/no-?toc/i.test(titleEl.className), embeddedToc = targetElem.querySelector("aio-toc.embedded");
                return needsToc && !embeddedToc ? titleEl.insertAdjacentHTML("afterend", '<aio-toc class="embedded"></aio-toc>') : !needsToc && embeddedToc && null !== embeddedToc.parentNode && embeddedToc.parentNode.removeChild(embeddedToc), 
                function() {
                    _this.tocService.reset();
                    var title = "";
                    titleEl && (title = "string" == typeof titleEl.innerText ? titleEl.innerText : titleEl.textContent, 
                    needsToc && _this.tocService.genToc(targetElem, docId)), _this.titleService.setTitle(title ? "Angular - " + title : "Angular");
                };
            }, DocViewerComponent.prototype.render = function(doc) {
                var addTitleAndToc, _this = this;
                return this.setNoIndex("file-not-found" === doc.id || "fetching-error" === doc.id), 
                this.void$.pipe(tap(function() {
                    return _this.nextViewContainer.innerHTML = doc.contents || "";
                }), tap(function() {
                    return addTitleAndToc = _this.prepareTitleAndToc(_this.nextViewContainer, doc.id);
                }), switchMap(function() {
                    return _this.elementsLoader.loadContainedCustomElements(_this.nextViewContainer);
                }), tap(function() {
                    return _this.docReady.emit();
                }), switchMap(function() {
                    return _this.swapViews(addTitleAndToc);
                }), tap(function() {
                    return _this.docRendered.emit();
                }), catchError(function(err) {
                    var errorMessage = err instanceof Error ? err.stack : err;
                    return _this.logger.error(new Error("[DocViewer] Error preparing document '" + doc.id + "': " + errorMessage)), 
                    _this.nextViewContainer.innerHTML = "", _this.setNoIndex(!0), _this.void$;
                }));
            }, DocViewerComponent.prototype.setNoIndex = function(val) {
                val ? this.metaService.addTag({
                    name: "robots",
                    content: "noindex"
                }) : this.metaService.removeTag('name="robots"');
            }, DocViewerComponent.prototype.swapViews = function(onInsertedCb) {
                var _this = this;
                void 0 === onInsertedCb && (onInsertedCb = function() {});
                var raf$ = new Observable_Observable(function(subscriber) {
                    var rafId = requestAnimationFrame(function() {
                        subscriber.next(), subscriber.complete();
                    });
                    return function() {
                        return cancelAnimationFrame(rafId);
                    };
                }), animateProp = function(elem, prop, from, to, duration) {
                    void 0 === duration && (duration = 200);
                    var animationsDisabled = !DocViewerComponent.animationsEnabled || _this.hostElement.classList.contains("no-animations");
                    return "length" === prop || "parentRule" === prop ? _this.void$ : (elem.style.transition = "", 
                    animationsDisabled ? _this.void$.pipe(tap(function() {
                        return elem.style[prop] = to;
                    })) : _this.void$.pipe(switchMap(function() {
                        return raf$;
                    }), tap(function() {
                        return elem.style[prop] = from;
                    }), switchMap(function() {
                        return raf$;
                    }), tap(function() {
                        return elem.style.transition = "all " + duration + "ms ease-in-out";
                    }), switchMap(function() {
                        return raf$;
                    }), tap(function() {
                        return elem.style[prop] = to;
                    }), switchMap(function() {
                        return timer(function(elem) {
                            var cssValue = getComputedStyle(elem).transitionDuration || "";
                            return 1e3 * Number(cssValue.replace(/s$/, ""));
                        }(elem));
                    }), switchMap(function() {
                        return _this.void$;
                    })));
                }, done$ = this.void$;
                return this.currViewContainer.parentElement && (done$ = done$.pipe(switchMap(function() {
                    return animateProp(_this.currViewContainer, "opacity", "1", "0.1");
                }), tap(function() {
                    return _this.currViewContainer.parentElement.removeChild(_this.currViewContainer);
                }), tap(function() {
                    return _this.docRemoved.emit();
                }))), done$.pipe(tap(function() {
                    return _this.hostElement.appendChild(_this.nextViewContainer);
                }), tap(function() {
                    return onInsertedCb();
                }), tap(function() {
                    return _this.docInserted.emit();
                }), switchMap(function() {
                    return animateProp(_this.nextViewContainer, "opacity", "0.1", "1");
                }), tap(function() {
                    var prevViewContainer = _this.currViewContainer;
                    _this.currViewContainer = _this.nextViewContainer, _this.nextViewContainer = prevViewContainer, 
                    _this.nextViewContainer.innerHTML = "";
                }));
            }, DocViewerComponent.animationsEnabled = !0, DocViewerComponent;
        }(), toc_service_TocService = function() {
            function TocService(document, domSanitizer, scrollSpyService) {
                this.document = document, this.domSanitizer = domSanitizer, this.scrollSpyService = scrollSpyService, 
                this.tocList = new ReplaySubject_ReplaySubject(1), this.activeItemIndex = new ReplaySubject_ReplaySubject(1), 
                this.scrollSpyInfo = null;
            }
            return TocService.prototype.genToc = function(docElement, docId) {
                var _this = this;
                if (void 0 === docId && (docId = ""), this.resetScrollSpyInfo(), docElement) {
                    var headings = this.findTocHeadings(docElement), idMap = new Map(), tocList = headings.map(function(heading) {
                        return {
                            content: _this.extractHeadingSafeHtml(heading),
                            href: docId + "#" + _this.getId(heading, idMap),
                            level: heading.tagName.toLowerCase(),
                            title: (heading.textContent || "").trim()
                        };
                    });
                    this.tocList.next(tocList), this.scrollSpyInfo = this.scrollSpyService.spyOn(headings), 
                    this.scrollSpyInfo.active.subscribe(function(item) {
                        return _this.activeItemIndex.next(item && item.index);
                    });
                } else this.tocList.next([]);
            }, TocService.prototype.reset = function() {
                this.resetScrollSpyInfo(), this.tocList.next([]);
            }, TocService.prototype.extractHeadingSafeHtml = function(heading) {
                var div = this.document.createElement("div");
                div.innerHTML = heading.innerHTML;
                for (var anchorLinks = div.querySelectorAll("a"), i = 0; i < anchorLinks.length; i++) {
                    var anchorLink = anchorLinks[i];
                    if (!anchorLink.classList.contains("header-link")) for (var parent_1 = anchorLink.parentNode; anchorLink.childNodes.length; ) parent_1.insertBefore(anchorLink.childNodes[0], anchorLink);
                    null !== anchorLink.parentNode && anchorLink.parentNode.removeChild(anchorLink);
                }
                return this.domSanitizer.bypassSecurityTrustHtml(div.innerHTML.trim());
            }, TocService.prototype.findTocHeadings = function(docElement) {
                var headings = docElement.querySelectorAll("h1,h2,h3");
                return Array.prototype.filter.call(headings, function(heading) {
                    return !/(?:no-toc|notoc)/i.test(heading.className);
                });
            }, TocService.prototype.resetScrollSpyInfo = function() {
                this.scrollSpyInfo && (this.scrollSpyInfo.unspy(), this.scrollSpyInfo = null), this.activeItemIndex.next(null);
            }, TocService.prototype.getId = function(h, idMap) {
                var id = h.id;
                return id ? addToMap(id) : (id = addToMap(id = (h.textContent || "").trim().toLowerCase().replace(/\W+/g, "-")), 
                h.id = id), id;
                function addToMap(key) {
                    var count = (idMap.get(key) || 0) + 1;
                    return idMap.set(key, count), 1 === count ? key : key + "-" + count;
                }
            }, TocService;
        }(), RenderType_DocViewerComponent = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_DocViewerComponent_0(_l) {
            return viewDef(0, [], null, null);
        }
        var FooterComponent = function() {
            return function() {};
        }(), RenderType_FooterComponent = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_FooterComponent_2(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 2, "li", [], null, null, null, null, null)), (_l()(), 
            elementDef(1, 0, null, null, 1, "a", [ [ "class", "link" ] ], [ [ 8, "href", 4 ], [ 8, "title", 0 ] ], null, null, null, null)), (_l()(), 
            textDef(2, null, [ "", "" ])) ], null, function(_ck, _v) {
                _ck(_v, 1, 0, _v.context.$implicit.url, _v.context.$implicit.tooltip || _v.context.$implicit.title), 
                _ck(_v, 2, 0, _v.context.$implicit.title);
            });
        }
        function View_FooterComponent_1(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 5, "div", [ [ "class", "footer-block" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(1, 0, null, null, 1, "h3", [], null, null, null, null, null)), (_l()(), 
            textDef(2, null, [ "", "" ])), (_l()(), elementDef(3, 0, null, null, 2, "ul", [], null, null, null, null, null)), (_l()(), 
            anchorDef(16777216, null, null, 1, null, View_FooterComponent_2)), directiveDef(5, 278528, null, 0, common_NgForOf, [ ViewContainerRef, TemplateRef, IterableDiffers ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 5, 0, _v.context.$implicit.children);
            }, function(_ck, _v) {
                _ck(_v, 2, 0, _v.context.$implicit.title);
            });
        }
        function View_FooterComponent_0(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 2, "div", [ [ "class", "grid-fluid" ] ], null, null, null, null, null)), (_l()(), 
            anchorDef(16777216, null, null, 1, null, View_FooterComponent_1)), directiveDef(2, 278528, null, 0, common_NgForOf, [ ViewContainerRef, TemplateRef, IterableDiffers ], {
                ngForOf: [ 0, "ngForOf" ]
            }, null), (_l()(), elementDef(3, 0, null, null, 7, "p", [], null, null, null, null, null)), (_l()(), 
            textDef(-1, null, [ " Super-powered by Google \xa92010-2019. Code licensed under an " ])), (_l()(), 
            elementDef(5, 0, null, null, 1, "a", [ [ "href", "license" ], [ "title", "License text" ] ], null, null, null, null, null)), (_l()(), 
            textDef(-1, null, [ "MIT-style License" ])), (_l()(), textDef(-1, null, [ ". Documentation licensed under " ])), (_l()(), 
            elementDef(8, 0, null, null, 1, "a", [ [ "href", "http://creativecommons.org/licenses/by/4.0/" ] ], null, null, null, null, null)), (_l()(), 
            textDef(-1, null, [ "CC BY 4.0" ])), (_l()(), textDef(-1, null, [ ".\n" ])), (_l()(), 
            elementDef(11, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), 
            textDef(12, null, [ " Version ", ".\n" ])) ], function(_ck, _v) {
                _ck(_v, 2, 0, _v.component.nodes);
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 12, 0, null == _co.versionInfo ? null : _co.versionInfo.full);
            });
        }
        var deployment_service_Deployment = function() {
            return function(location) {
                this.location = location, this.mode = this.location.search().mode || environment.mode;
            };
        }();
        function publishLast() {
            return function(source) {
                return multicast(new AsyncSubject_AsyncSubject())(source);
            };
        }
        function publishReplay(bufferSize, windowTime, selectorOrScheduler, scheduler) {
            selectorOrScheduler && "function" != typeof selectorOrScheduler && (scheduler = selectorOrScheduler);
            var selector = "function" == typeof selectorOrScheduler ? selectorOrScheduler : void 0, subject = new ReplaySubject_ReplaySubject(bufferSize, windowTime, scheduler);
            return function(source) {
                return multicast(function() {
                    return subject;
                }, selector)(source);
            };
        }
        var navigation_service_NavigationService = function() {
            function NavigationService(http, location) {
                this.http = http, this.location = location;
                var navigationInfo = this.fetchNavigationInfo();
                this.navigationViews = this.getNavigationViews(navigationInfo), this.currentNodes = this.getCurrentNodes(this.navigationViews), 
                this.versionInfo = this.getVersionInfo(navigationInfo);
            }
            return NavigationService.prototype.fetchNavigationInfo = function() {
                var navigationInfo = this.http.get("generated/navigation.json").pipe(publishLast());
                return navigationInfo.connect(), navigationInfo;
            }, NavigationService.prototype.getVersionInfo = function(navigationInfo) {
                var versionInfo = navigationInfo.pipe(map_map(function(response) {
                    return response.__versionInfo;
                }), publishLast());
                return versionInfo.connect(), versionInfo;
            }, NavigationService.prototype.getNavigationViews = function(navigationInfo) {
                var navigationViews = navigationInfo.pipe(map_map(function(response) {
                    var views = Object.assign({}, response);
                    return Object.keys(views).forEach(function(key) {
                        "_" === key[0] && delete views[key];
                    }), views;
                }), publishLast());
                return navigationViews.connect(), navigationViews;
            }, NavigationService.prototype.getCurrentNodes = function(navigationViews) {
                var _this = this, currentNodes = combineLatest(navigationViews.pipe(map_map(function(views) {
                    return _this.computeUrlToNavNodesMap(views);
                })), this.location.currentPath).pipe(map_map(function(result) {
                    return {
                        navMap: result[0],
                        url: result[1]
                    };
                }), map_map(function(result) {
                    var matchSpecialUrls = /^api/.exec(result.url);
                    return matchSpecialUrls && (result.url = matchSpecialUrls[0]), result.navMap.get(result.url) || {
                        "": {
                            view: "",
                            url: result.url,
                            nodes: []
                        }
                    };
                }), publishReplay(1));
                return currentNodes.connect(), currentNodes;
            }, NavigationService.prototype.computeUrlToNavNodesMap = function(navigation) {
                var _this = this, navMap = new Map();
                return Object.keys(navigation).forEach(function(view) {
                    return navigation[view].forEach(function(node) {
                        return _this.walkNodes(view, navMap, node);
                    });
                }), navMap;
            }, NavigationService.prototype.ensureHasTooltip = function(node) {
                var title = node.title;
                null == node.tooltip && title && (node.tooltip = title + (/[a-zA-Z0-9]$/.test(title) ? "." : ""));
            }, NavigationService.prototype.walkNodes = function(view, navMap, node, ancestors) {
                var _this = this;
                void 0 === ancestors && (ancestors = []);
                var nodes = [ node ].concat(ancestors), url = node.url;
                if (this.ensureHasTooltip(node), url) {
                    var cleanedUrl = url.replace(/\/$/, "");
                    navMap.has(cleanedUrl) || navMap.set(cleanedUrl, {}), navMap.get(cleanedUrl)[view] = {
                        url: url,
                        view: view,
                        nodes: nodes
                    };
                }
                node.children && node.children.forEach(function(child) {
                    return _this.walkNodes(view, navMap, child, nodes);
                });
            }, NavigationService;
        }(), scroll_service_ScrollService = function() {
            function ScrollService(document, platformLocation, viewportScroller, location) {
                var _this = this;
                this.document = document, this.platformLocation = platformLocation, this.viewportScroller = viewportScroller, 
                this.location = location, this.poppedStateScrollPosition = null, this.supportManualScrollRestoration = !!window && "scrollTo" in window && "scrollX" in window && "scrollY" in window && !!history && "scrollRestoration" in history, 
                fromEvent(window, "resize").subscribe(function() {
                    return _this._topOffset = null;
                }), fromEvent(window, "scroll").pipe(debounceTime(250)).subscribe(function() {
                    return _this.updateScrollPositionInHistory();
                }), this.supportManualScrollRestoration && (history.scrollRestoration = "manual", 
                this.location.subscribe(function(event) {
                    "hashchange" === event.type ? _this.scrollToPosition() : (_this.removeStoredScrollPosition(), 
                    _this.poppedStateScrollPosition = event.state ? event.state.scrollPosition : null);
                }));
            }
            return Object.defineProperty(ScrollService.prototype, "topOffset", {
                get: function() {
                    if (!this._topOffset) {
                        var toolbar_1 = this.document.querySelector(".app-toolbar");
                        this._topOffset = (toolbar_1 && toolbar_1.clientHeight || 0) + 16;
                    }
                    return this._topOffset;
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ScrollService.prototype, "topOfPageElement", {
                get: function() {
                    return this._topOfPageElement || (this._topOfPageElement = this.document.getElementById("top-of-page") || this.document.body), 
                    this._topOfPageElement;
                },
                enumerable: !0,
                configurable: !0
            }), ScrollService.prototype.scroll = function() {
                var hash = this.getCurrentHash(), element = hash ? this.document.getElementById(hash) : this.topOfPageElement;
                this.scrollToElement(element);
            }, ScrollService.prototype.isLocationWithHash = function() {
                return !!this.getCurrentHash();
            }, ScrollService.prototype.scrollAfterRender = function(delay) {
                var _this = this, storedScrollPosition = this.getStoredScrollPosition();
                storedScrollPosition ? this.viewportScroller.scrollToPosition(storedScrollPosition) : this.needToFixScrollPosition() ? this.scrollToPosition() : this.isLocationWithHash() ? setTimeout(function() {
                    return _this.scroll();
                }, delay) : this.scrollToTop();
            }, ScrollService.prototype.scrollToElement = function(element) {
                element && (element.scrollIntoView(), window && window.scrollBy && (window.scrollBy(0, element.getBoundingClientRect().top - this.topOffset), 
                window.pageYOffset < 20 && window.scrollBy(0, -window.pageYOffset)));
            }, ScrollService.prototype.scrollToTop = function() {
                this.scrollToElement(this.topOfPageElement);
            }, ScrollService.prototype.scrollToPosition = function() {
                this.poppedStateScrollPosition && (this.viewportScroller.scrollToPosition(this.poppedStateScrollPosition), 
                this.poppedStateScrollPosition = null);
            }, ScrollService.prototype.updateScrollPositionInHistory = function() {
                if (this.supportManualScrollRestoration) {
                    var currentScrollPosition = this.viewportScroller.getScrollPosition();
                    this.location.replaceState(this.location.path(!0), void 0, {
                        scrollPosition: currentScrollPosition
                    }), window.sessionStorage.setItem("scrollPosition", currentScrollPosition.join(","));
                }
            }, ScrollService.prototype.getStoredScrollPosition = function() {
                var position = window.sessionStorage.getItem("scrollPosition");
                if (!position) return null;
                var _a = position.split(",");
                return [ +_a[0], +_a[1] ];
            }, ScrollService.prototype.removeStoredScrollPosition = function() {
                window.sessionStorage.removeItem("scrollPosition");
            }, ScrollService.prototype.needToFixScrollPosition = function() {
                return this.supportManualScrollRestoration && !!this.poppedStateScrollPosition;
            }, ScrollService.prototype.getCurrentHash = function() {
                return decodeURIComponent(this.platformLocation.hash.replace(/^#/, ""));
            }, ScrollService;
        }(), RaceOperator = function() {
            function RaceOperator() {}
            return RaceOperator.prototype.call = function(subscriber, source) {
                return source.subscribe(new race_RaceSubscriber(subscriber));
            }, RaceOperator;
        }(), race_RaceSubscriber = function(_super) {
            function RaceSubscriber(destination) {
                var _this = _super.call(this, destination) || this;
                return _this.hasFirst = !1, _this.observables = [], _this.subscriptions = [], _this;
            }
            return __extends(RaceSubscriber, _super), RaceSubscriber.prototype._next = function(observable) {
                this.observables.push(observable);
            }, RaceSubscriber.prototype._complete = function() {
                var observables = this.observables, len = observables.length;
                if (0 === len) this.destination.complete(); else {
                    for (var i = 0; i < len && !this.hasFirst; i++) {
                        var observable = observables[i], subscription = subscribeToResult(this, observable, observable, i);
                        this.subscriptions && this.subscriptions.push(subscription), this.add(subscription);
                    }
                    this.observables = null;
                }
            }, RaceSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                if (!this.hasFirst) {
                    this.hasFirst = !0;
                    for (var i = 0; i < this.subscriptions.length; i++) if (i !== outerIndex) {
                        var subscription = this.subscriptions[i];
                        subscription.unsubscribe(), this.remove(subscription);
                    }
                    this.subscriptions = null;
                }
                this.destination.next(innerValue);
            }, RaceSubscriber;
        }(OuterSubscriber_OuterSubscriber), web_worker_WebWorkerClient = function() {
            function WebWorkerClient(worker, zone) {
                this.worker = worker, this.zone = zone, this.nextId = 0;
            }
            return WebWorkerClient.create = function(workerUrl, zone) {
                return new WebWorkerClient(new Worker(workerUrl), zone);
            }, WebWorkerClient.prototype.sendMessage = function(type, payload) {
                var _this = this;
                return new Observable_Observable(function(subscriber) {
                    var id = _this.nextId++, handleMessage = function(response) {
                        var _a = response.data, responsePayload = _a.payload;
                        type === _a.type && id === _a.id && _this.zone.run(function() {
                            subscriber.next(responsePayload), subscriber.complete();
                        });
                    }, handleError = function(error) {
                        _this.zone.run(function() {
                            return subscriber.error(error);
                        });
                    };
                    return _this.worker.addEventListener("message", handleMessage), _this.worker.addEventListener("error", handleError), 
                    _this.worker.postMessage({
                        type: type,
                        id: id,
                        payload: payload
                    }), function() {
                        _this.worker.removeEventListener("message", handleMessage), _this.worker.removeEventListener("error", handleError);
                    };
                });
            }, WebWorkerClient;
        }(), search_service_SearchService = function() {
            function SearchService(zone) {
                this.zone = zone, this.searchesSubject = new ReplaySubject_ReplaySubject(1);
            }
            return SearchService.prototype.initWorker = function(workerUrl, initDelay) {
                var _this = this, ready = this.ready = function() {
                    for (var observables = [], _i = 0; _i < arguments.length; _i++) observables[_i] = arguments[_i];
                    if (1 === observables.length) {
                        if (!isArray(observables[0])) return observables[0];
                        observables = observables[0];
                    }
                    return fromArray(observables, void 0).lift(new RaceOperator());
                }(timer(initDelay), this.searchesSubject.asObservable().pipe(first_first())).pipe(concatMap(function() {
                    return _this.worker = web_worker_WebWorkerClient.create(workerUrl, _this.zone), 
                    _this.worker.sendMessage("load-index");
                }), publishReplay(1));
                return ready.connect(), ready;
            }, SearchService.prototype.search = function(query) {
                var _this = this;
                return this.searchesSubject.next(query), this.ready.pipe(concatMap(function() {
                    return _this.worker.sendMessage("query-index", query);
                }));
            }, SearchService;
        }(), RenderType_AppComponent = createRendererType2({
            encapsulation: 2,
            styles: [],
            data: {}
        });
        function View_AppComponent_1(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 2, "div", [ [ "class", "progress-bar-container" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(1, 0, null, null, 1, "mat-progress-bar", [ [ "aria-valuemax", "100" ], [ "aria-valuemin", "0" ], [ "class", "mat-progress-bar" ], [ "color", "warn" ], [ "mode", "indeterminate" ], [ "role", "progressbar" ] ], [ [ 1, "aria-valuenow", 0 ], [ 1, "mode", 0 ], [ 2, "_mat-animation-noopable", null ] ], null, null, View_MatProgressBar_0, RenderType_MatProgressBar)), directiveDef(2, 4374528, null, 0, progress_bar_es5_MatProgressBar, [ ElementRef, NgZone, [ 2, ANIMATION_MODULE_TYPE ], [ 2, MAT_PROGRESS_BAR_LOCATION ] ], {
                color: [ 0, "color" ],
                mode: [ 1, "mode" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 2, 0, "warn", "indeterminate");
            }, function(_ck, _v) {
                _ck(_v, 1, 0, nodeValue(_v, 2).value, nodeValue(_v, 2).mode, nodeValue(_v, 2)._isNoopAnimation);
            });
        }
        function View_AppComponent_2(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 0, "img", [ [ "alt", "Home" ], [ "height", "40" ], [ "src", "assets/images/logos/angular/logo-nav@2x.png" ], [ "title", "Home" ], [ "width", "150" ] ], null, null, null, null, null)) ], null, null);
        }
        function View_AppComponent_3(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 0, "img", [ [ "alt", "Home" ], [ "height", "40" ], [ "src", "assets/images/logos/angular/shield-large.svg" ], [ "title", "Home" ], [ "width", "37" ] ], null, null, null, null, null)) ], null, null);
        }
        function View_AppComponent_4(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 1, "aio-top-menu", [], null, null, null, View_TopMenuComponent_0, RenderType_TopMenuComponent)), directiveDef(1, 49152, null, 0, TopMenuComponent, [], {
                nodes: [ 0, "nodes" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 1, 0, _v.component.topMenuNodes);
            }, null);
        }
        function View_AppComponent_5(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, [ [ 1, 0 ] ], null, 2, "aio-search-results", [], null, [ [ null, "resultSelected" ] ], function(_v, en, $event) {
                var ad = !0;
                return "resultSelected" === en && (ad = !1 !== _v.component.hideSearchResults() && ad), 
                ad;
            }, View_SearchResultsComponent_0, RenderType_SearchResultsComponent)), directiveDef(1, 573440, [ [ "searchResultsView", 4 ] ], 0, search_results_component_SearchResultsComponent, [], {
                searchResults: [ 0, "searchResults" ]
            }, {
                resultSelected: "resultSelected"
            }), (flags = 131072, ctor = common_AsyncPipe, deps = [ ChangeDetectorRef ], _def(-1, flags |= 16, null, 0, ctor, ctor, deps)) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 1, 0, function(view, nodeIdx, bindingIdx, value) {
                    if (WrappedValue.isWrapped(value)) {
                        value = WrappedValue.unwrap(value);
                        var globalBindingIdx = view.def.nodes[1].bindingIndex + 0, oldValue = WrappedValue.unwrap(view.oldValues[globalBindingIdx]);
                        view.oldValues[globalBindingIdx] = new WrappedValue(oldValue);
                    }
                    return value;
                }(_v, 0, 0, nodeValue(_v, 2).transform(_co.searchResults)));
            }, null);
            var flags, ctor, deps;
        }
        function View_AppComponent_6(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 1, "aio-nav-menu", [], null, null, null, View_NavMenuComponent_0, RenderType_NavMenuComponent)), directiveDef(1, 49152, null, 0, NavMenuComponent, [], {
                currentNode: [ 0, "currentNode" ],
                isWide: [ 1, "isWide" ],
                nodes: [ 2, "nodes" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 1, 0, null == _co.currentNodes ? null : _co.currentNodes.TopBarNarrow, !1, _co.topMenuNarrowNodes);
            }, null);
        }
        function View_AppComponent_7(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 1, "aio-dt", [], null, [ [ null, "docChange" ] ], function(_v, en, $event) {
                var ad = !0;
                return "docChange" === en && (ad = !1 !== (_v.component.currentDocument = $event) && ad), 
                ad;
            }, View_DtComponent_0, RenderType_DtComponent)), directiveDef(1, 49152, null, 0, dt_component_DtComponent, [], {
                doc: [ 0, "doc" ]
            }, {
                docChange: "docChange"
            }) ], function(_ck, _v) {
                _ck(_v, 1, 0, _v.component.currentDocument);
            }, null);
        }
        function View_AppComponent_8(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 2, "div", [ [ "class", "toc-container no-print" ] ], [ [ 4, "max-height", "px" ] ], [ [ null, "mousewheel" ] ], function(_v, en, $event) {
                var ad = !0;
                return "mousewheel" === en && (ad = !1 !== _v.component.restrainScrolling($event) && ad), 
                ad;
            }, null, null)), (_l()(), elementDef(1, 0, null, null, 1, "aio-lazy-ce", [ [ "selector", "aio-toc" ] ], null, null, null, View_LazyCustomElementComponent_0, RenderType_LazyCustomElementComponent)), directiveDef(2, 114688, null, 0, LazyCustomElementComponent, [ ElementRef, elements_loader_ElementsLoader, logger_service_Logger ], {
                selector: [ 0, "selector" ]
            }, null) ], function(_ck, _v) {
                _ck(_v, 2, 0, "aio-toc");
            }, function(_ck, _v) {
                _ck(_v, 0, 0, _v.component.tocMaxHeight);
            });
        }
        function View_AppComponent_9(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 3, "div", [ [ "class", "cdk-visually-hidden" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(1, 0, null, null, 2, "mat-icon", [ [ "class", "mat-icon" ], [ "role", "img" ] ], [ [ 2, "mat-icon-inline", null ] ], null, null, View_MatIcon_0, RenderType_MatIcon)), directiveDef(2, 9158656, null, 0, icon_es5_MatIcon, [ ElementRef, icon_es5_MatIconRegistry, [ 8, null ], [ 2, MAT_ICON_LOCATION ] ], null, null), (_l()(), 
            textDef(-1, 0, [ "\xa0" ])) ], function(_ck, _v) {
                _ck(_v, 2, 0);
            }, function(_ck, _v) {
                _ck(_v, 1, 0, nodeValue(_v, 2).inline);
            });
        }
        function View_AppComponent_0(_l) {
            return viewDef(0, [ queryDef(671088640, 1, {
                searchElements: 1
            }), queryDef(402653184, 2, {
                searchBox: 0
            }), queryDef(402653184, 3, {
                sidenav: 0
            }), queryDef(402653184, 4, {
                notification: 0
            }), (_l()(), elementDef(4, 0, null, null, 0, "div", [ [ "id", "top-of-page" ] ], null, null, null, null, null)), (_l()(), 
            anchorDef(16777216, null, null, 1, null, View_AppComponent_1)), directiveDef(6, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), elementDef(7, 0, null, null, 39, "mat-toolbar", [ [ "class", "app-toolbar no-print mat-toolbar" ], [ "color", "primary" ] ], [ [ 2, "transitioning", null ], [ 2, "mat-toolbar-multiple-rows", null ], [ 2, "mat-toolbar-single-row", null ] ], null, null, View_MatToolbar_0, RenderType_MatToolbar)), directiveDef(8, 4243456, null, 1, toolbar_es5_MatToolbar, [ ElementRef, platform_es5_Platform, DOCUMENT ], {
                color: [ 0, "color" ]
            }, null), queryDef(603979776, 5, {
                _toolbarRows: 1
            }), (_l()(), elementDef(10, 0, null, 1, 13, "mat-toolbar-row", [ [ "class", "notification-container mat-toolbar-row" ] ], null, null, null, null, null)), directiveDef(11, 16384, [ [ 5, 4 ] ], 0, MatToolbarRow, [], null, null), (_l()(), 
            elementDef(12, 0, null, null, 11, "aio-notification", [ [ "expirationDate", "2019-03-01" ], [ "notificationId", "survey-february-2019" ] ], [ [ 40, "@hideAnimation", 0 ] ], [ [ null, "dismissed" ] ], function(_v, en, $event) {
                var ad = !0;
                return "dismissed" === en && (ad = !1 !== _v.component.notificationDismissed() && ad), 
                ad;
            }, View_NotificationComponent_0, RenderType_NotificationComponent)), directiveDef(13, 114688, [ [ 4, 4 ] ], 0, notification_component_NotificationComponent, [ WindowToken, CurrentDateToken ], {
                dismissOnContentClick: [ 0, "dismissOnContentClick" ],
                notificationId: [ 1, "notificationId" ],
                expirationDate: [ 2, "expirationDate" ]
            }, {
                dismissed: "dismissed"
            }), (_l()(), elementDef(14, 0, null, 0, 9, "a", [ [ "href", "http://bit.ly/angular-survey-2019" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(15, 0, null, null, 1, "mat-icon", [ [ "aria-label", "Announcement" ], [ "class", "icon mat-icon" ], [ "role", "img" ], [ "svgIcon", "insert_comment" ] ], [ [ 2, "mat-icon-inline", null ] ], null, null, View_MatIcon_0, RenderType_MatIcon)), directiveDef(16, 9158656, null, 0, icon_es5_MatIcon, [ ElementRef, icon_es5_MatIconRegistry, [ 8, null ], [ 2, MAT_ICON_LOCATION ] ], {
                svgIcon: [ 0, "svgIcon" ]
            }, null), (_l()(), elementDef(17, 0, null, null, 4, "span", [ [ "class", "message" ] ], null, null, null, null, null)), (_l()(), 
            textDef(-1, null, [ "Help Angular by taking a " ])), (_l()(), elementDef(19, 0, null, null, 1, "b", [], null, null, null, null, null)), (_l()(), 
            textDef(-1, null, [ "1 minute survey" ])), (_l()(), textDef(-1, null, [ "!" ])), (_l()(), 
            elementDef(22, 0, null, null, 1, "span", [ [ "class", "action-button" ] ], null, null, null, null, null)), (_l()(), 
            textDef(-1, null, [ "Go to survey" ])), (_l()(), elementDef(24, 0, null, 1, 22, "mat-toolbar-row", [ [ "class", "mat-toolbar-row" ] ], null, null, null, null, null)), directiveDef(25, 16384, [ [ 5, 4 ] ], 0, MatToolbarRow, [], null, null), (_l()(), 
            elementDef(26, 0, null, null, 3, "button", [ [ "class", "hamburger" ], [ "mat-button", "" ], [ "title", "Docs menu" ] ], [ [ 2, "starting", null ], [ 8, "disabled", 0 ], [ 2, "_mat-animation-noopable", null ] ], [ [ null, "click" ] ], function(_v, en, $event) {
                var ad = !0;
                return "click" === en && (ad = !1 !== nodeValue(_v, 57).toggle() && ad), ad;
            }, View_MatButton_0, RenderType_MatButton)), directiveDef(27, 180224, null, 0, button_es5_MatButton, [ ElementRef, platform_es5_Platform, a11y_es5_FocusMonitor, [ 2, ANIMATION_MODULE_TYPE ] ], null, null), (_l()(), 
            elementDef(28, 0, null, 0, 1, "mat-icon", [ [ "class", "mat-icon" ], [ "role", "img" ], [ "svgIcon", "menu" ] ], [ [ 2, "mat-icon-inline", null ] ], null, null, View_MatIcon_0, RenderType_MatIcon)), directiveDef(29, 9158656, null, 0, icon_es5_MatIcon, [ ElementRef, icon_es5_MatIconRegistry, [ 8, null ], [ 2, MAT_ICON_LOCATION ] ], {
                svgIcon: [ 0, "svgIcon" ]
            }, null), (_l()(), elementDef(30, 0, null, null, 5, "a", [ [ "class", "nav-link home" ], [ "href", "/" ] ], null, null, null, null, null)), directiveDef(31, 16384, null, 0, NgSwitch, [], {
                ngSwitch: [ 0, "ngSwitch" ]
            }, null), (_l()(), anchorDef(16777216, null, null, 1, null, View_AppComponent_2)), directiveDef(33, 278528, null, 0, NgSwitchCase, [ ViewContainerRef, TemplateRef, NgSwitch ], {
                ngSwitchCase: [ 0, "ngSwitchCase" ]
            }, null), (_l()(), anchorDef(16777216, null, null, 1, null, View_AppComponent_3)), directiveDef(35, 16384, null, 0, NgSwitchDefault, [ ViewContainerRef, TemplateRef, NgSwitch ], null, null), (_l()(), 
            anchorDef(16777216, null, null, 1, null, View_AppComponent_4)), directiveDef(37, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), elementDef(38, 0, [ [ 1, 0 ] ], null, 1, "aio-search-box", [ [ "class", "search-container" ] ], null, [ [ null, "onSearch" ], [ null, "onFocus" ] ], function(_v, en, $event) {
                var ad = !0, _co = _v.component;
                return "onSearch" === en && (ad = !1 !== _co.doSearch($event) && ad), "onFocus" === en && (ad = !1 !== _co.doSearch($event) && ad), 
                ad;
            }, View_SearchBoxComponent_0, RenderType_SearchBoxComponent)), directiveDef(39, 114688, [ [ 2, 4 ], [ "searchBox", 4 ] ], 0, search_box_component_SearchBoxComponent, [ location_service_LocationService ], null, {
                onSearch: "onSearch",
                onFocus: "onFocus"
            }), (_l()(), elementDef(40, 0, null, null, 6, "div", [ [ "class", "toolbar-external-icons-container" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(41, 0, null, null, 2, "a", [ [ "aria-label", "Angular on twitter" ], [ "href", "https://twitter.com/angular" ], [ "title", "Twitter" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(42, 0, null, null, 1, "mat-icon", [ [ "class", "mat-icon" ], [ "role", "img" ], [ "svgIcon", "logos:twitter" ] ], [ [ 2, "mat-icon-inline", null ] ], null, null, View_MatIcon_0, RenderType_MatIcon)), directiveDef(43, 9158656, null, 0, icon_es5_MatIcon, [ ElementRef, icon_es5_MatIconRegistry, [ 8, null ], [ 2, MAT_ICON_LOCATION ] ], {
                svgIcon: [ 0, "svgIcon" ]
            }, null), (_l()(), elementDef(44, 0, null, null, 2, "a", [ [ "aria-label", "Angular on github" ], [ "href", "https://github.com/angular/angular" ], [ "title", "GitHub" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(45, 0, null, null, 1, "mat-icon", [ [ "class", "mat-icon" ], [ "role", "img" ], [ "svgIcon", "logos:github" ] ], [ [ 2, "mat-icon-inline", null ] ], null, null, View_MatIcon_0, RenderType_MatIcon)), directiveDef(46, 9158656, null, 0, icon_es5_MatIcon, [ ElementRef, icon_es5_MatIconRegistry, [ 8, null ], [ 2, MAT_ICON_LOCATION ] ], {
                svgIcon: [ 0, "svgIcon" ]
            }, null), (_l()(), anchorDef(16777216, null, null, 1, null, View_AppComponent_5)), directiveDef(48, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), elementDef(49, 0, null, null, 22, "mat-sidenav-container", [ [ "class", "sidenav-container mat-drawer-container mat-sidenav-container" ], [ "role", "main" ] ], [ [ 2, "starting", null ], [ 2, "has-floating-toc", null ], [ 2, "mat-drawer-container-explicit-backdrop", null ] ], null, null, View_MatSidenavContainer_0, RenderType_MatSidenavContainer)), directiveDef(50, 1490944, null, 2, sidenav_es5_MatSidenavContainer, [ [ 2, bidi_es5_Directionality ], ElementRef, NgZone, ChangeDetectorRef, MAT_DRAWER_DEFAULT_AUTOSIZE, [ 2, ANIMATION_MODULE_TYPE ] ], null, null), queryDef(603979776, 6, {
                _drawers: 1
            }), queryDef(335544320, 7, {
                _content: 0
            }), (_l()(), elementDef(53, 0, null, 0, 11, "mat-sidenav", [ [ "class", "sidenav mat-drawer mat-sidenav" ], [ "tabIndex", "-1" ] ], [ [ 40, "@transform", 0 ], [ 1, "align", 0 ], [ 2, "mat-drawer-end", null ], [ 2, "mat-drawer-over", null ], [ 2, "mat-drawer-push", null ], [ 2, "mat-drawer-side", null ], [ 2, "mat-sidenav-fixed", null ], [ 4, "top", "px" ], [ 4, "bottom", "px" ] ], [ [ null, "openedChange" ], [ "component", "@transform.start" ], [ "component", "@transform.done" ] ], function(_v, en, $event) {
                var ad = !0, _co = _v.component;
                return "component:@transform.start" === en && (ad = !1 !== nodeValue(_v, 57)._onAnimationStart($event) && ad), 
                "component:@transform.done" === en && (ad = !1 !== nodeValue(_v, 57)._onAnimationEnd($event) && ad), 
                "openedChange" === en && (ad = !1 !== _co.updateHostClasses() && ad), ad;
            }, View_MatSidenav_0, RenderType_MatSidenav)), providerDef(512, null, NgClassImpl, common_NgClassR2Impl, [ IterableDiffers, KeyValueDiffers, ElementRef, Renderer2 ]), directiveDef(55, 278528, null, 0, common_NgClass, [ NgClassImpl ], {
                klass: [ 0, "klass" ],
                ngClass: [ 1, "ngClass" ]
            }, null), pureObjectDef(56, {
                collapsed: 0
            }), directiveDef(57, 3325952, [ [ 6, 4 ], [ 3, 4 ], [ "sidenav", 4 ] ], 0, sidenav_es5_MatSidenav, [ ElementRef, a11y_es5_FocusTrapFactory, a11y_es5_FocusMonitor, platform_es5_Platform, NgZone, [ 2, DOCUMENT ] ], {
                mode: [ 0, "mode" ],
                opened: [ 1, "opened" ]
            }, {
                openedChange: "openedChange"
            }), (_l()(), anchorDef(16777216, null, 0, 1, null, View_AppComponent_6)), directiveDef(59, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), elementDef(60, 0, null, 0, 1, "aio-nav-menu", [], null, null, null, View_NavMenuComponent_0, RenderType_NavMenuComponent)), directiveDef(61, 49152, null, 0, NavMenuComponent, [], {
                currentNode: [ 0, "currentNode" ],
                isWide: [ 1, "isWide" ],
                nodes: [ 2, "nodes" ]
            }, null), (_l()(), elementDef(62, 0, null, 0, 2, "div", [ [ "class", "doc-version" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(63, 0, null, null, 1, "aio-select", [], null, [ [ null, "change" ], [ "document", "click" ], [ "document", "keydown.escape" ] ], function(_v, en, $event) {
                var ad = !0, _co = _v.component;
                return "document:click" === en && (ad = !1 !== nodeValue(_v, 64).onClick($event.target) && ad), 
                "document:keydown.escape" === en && (ad = !1 !== nodeValue(_v, 64).onKeyDown() && ad), 
                "change" === en && (ad = !1 !== _co.onDocVersionChange($event.index) && ad), ad;
            }, View_SelectComponent_0, RenderType_SelectComponent)), directiveDef(64, 114688, null, 0, select_component_SelectComponent, [ ElementRef ], {
                selected: [ 0, "selected" ],
                options: [ 1, "options" ]
            }, {
                change: "change"
            }), (_l()(), elementDef(65, 0, null, 2, 6, "main", [ [ "class", "sidenav-content" ], [ "role", "main" ] ], [ [ 8, "id", 0 ] ], null, null, null, null)), (_l()(), 
            elementDef(66, 0, null, null, 1, "aio-mode-banner", [], null, null, null, View_ModeBannerComponent_0, RenderType_ModeBannerComponent)), directiveDef(67, 49152, null, 0, ModeBannerComponent, [], {
                mode: [ 0, "mode" ],
                version: [ 1, "version" ]
            }, null), (_l()(), elementDef(68, 0, null, null, 1, "aio-doc-viewer", [], [ [ 2, "no-animations", null ] ], [ [ null, "docReady" ], [ null, "docRemoved" ], [ null, "docInserted" ], [ null, "docRendered" ] ], function(_v, en, $event) {
                var ad = !0, _co = _v.component;
                return "docReady" === en && (ad = !1 !== _co.onDocReady() && ad), "docRemoved" === en && (ad = !1 !== _co.onDocRemoved() && ad), 
                "docInserted" === en && (ad = !1 !== _co.onDocInserted() && ad), "docRendered" === en && (ad = !1 !== _co.onDocRendered() && ad), 
                ad;
            }, View_DocViewerComponent_0, RenderType_DocViewerComponent)), directiveDef(69, 180224, null, 0, doc_viewer_component_DocViewerComponent, [ ElementRef, logger_service_Logger, platform_browser_Title, platform_browser_Meta, toc_service_TocService, elements_loader_ElementsLoader ], {
                doc: [ 0, "doc" ]
            }, {
                docReady: "docReady",
                docRemoved: "docRemoved",
                docInserted: "docInserted",
                docRendered: "docRendered"
            }), (_l()(), anchorDef(16777216, null, null, 1, null, View_AppComponent_7)), directiveDef(71, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), anchorDef(16777216, null, null, 1, null, View_AppComponent_8)), directiveDef(73, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null), (_l()(), elementDef(74, 0, null, null, 2, "footer", [ [ "class", "no-print" ] ], null, null, null, null, null)), (_l()(), 
            elementDef(75, 0, null, null, 1, "aio-footer", [], null, null, null, View_FooterComponent_0, RenderType_FooterComponent)), directiveDef(76, 49152, null, 0, FooterComponent, [], {
                nodes: [ 0, "nodes" ],
                versionInfo: [ 1, "versionInfo" ]
            }, null), (_l()(), anchorDef(16777216, null, null, 1, null, View_AppComponent_9)), directiveDef(78, 16384, null, 0, NgIf, [ ViewContainerRef, TemplateRef ], {
                ngIf: [ 0, "ngIf" ]
            }, null) ], function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 6, 0, _co.isFetching), _ck(_v, 8, 0, "primary"), _ck(_v, 13, 0, !0, "survey-february-2019", "2019-03-01"), 
                _ck(_v, 16, 0, "insert_comment"), _ck(_v, 29, 0, "menu"), _ck(_v, 31, 0, _co.isSideBySide), 
                _ck(_v, 33, 0, !0), _ck(_v, 37, 0, _co.isSideBySide), _ck(_v, 39, 0), _ck(_v, 43, 0, "logos:twitter"), 
                _ck(_v, 46, 0, "logos:github"), _ck(_v, 48, 0, _co.showSearchResults), _ck(_v, 50, 0);
                var currVal_37 = _ck(_v, 56, 0, !_co.isSideBySide);
                _ck(_v, 55, 0, "sidenav", currVal_37), _ck(_v, 57, 0, _co.mode, _co.isOpened), _ck(_v, 59, 0, !_co.isSideBySide), 
                _ck(_v, 61, 0, null == _co.currentNodes ? null : _co.currentNodes.SideNav, _co.isSideBySide, _co.sideNavNodes), 
                _ck(_v, 64, 0, _co.currentDocVersion, _co.docVersions), _ck(_v, 67, 0, _co.deployment.mode, _co.versionInfo), 
                _ck(_v, 69, 0, _co.currentDocument), _ck(_v, 71, 0, _co.dtOn), _ck(_v, 73, 0, _co.hasFloatingToc), 
                _ck(_v, 76, 0, _co.footerNodes, _co.versionInfo), _ck(_v, 78, 0, !_co.isStarting);
            }, function(_ck, _v) {
                var _co = _v.component;
                _ck(_v, 7, 0, _co.isTransitioning, nodeValue(_v, 8)._toolbarRows.length > 0, 0 === nodeValue(_v, 8)._toolbarRows.length), 
                _ck(_v, 12, 0, nodeValue(_v, 13).showNotification), _ck(_v, 15, 0, nodeValue(_v, 16).inline), 
                _ck(_v, 26, 0, _co.isStarting, nodeValue(_v, 27).disabled || null, "NoopAnimations" === nodeValue(_v, 27)._animationMode), 
                _ck(_v, 28, 0, nodeValue(_v, 29).inline), _ck(_v, 42, 0, nodeValue(_v, 43).inline), 
                _ck(_v, 45, 0, nodeValue(_v, 46).inline), _ck(_v, 49, 0, _co.isStarting, _co.hasFloatingToc, nodeValue(_v, 50)._backdropOverride), 
                _ck(_v, 53, 0, nodeValue(_v, 57)._animationState, null, "end" === nodeValue(_v, 57).position, "over" === nodeValue(_v, 57).mode, "push" === nodeValue(_v, 57).mode, "side" === nodeValue(_v, 57).mode, nodeValue(_v, 57).fixedInViewport, nodeValue(_v, 57).fixedInViewport ? nodeValue(_v, 57).fixedTopGap : null, nodeValue(_v, 57).fixedInViewport ? nodeValue(_v, 57).fixedBottomGap : null), 
                _ck(_v, 65, 0, _co.pageId), _ck(_v, 68, 0, _co.isStarting);
            });
        }
        function View_AppComponent_Host_0(_l) {
            return viewDef(0, [ (_l()(), elementDef(0, 0, null, null, 1, "aio-shell", [], [ [ 8, "className", 0 ], [ 40, "@.disabled", 0 ] ], [ [ "window", "resize" ], [ null, "click" ], [ "window", "scroll" ], [ "document", "keyup" ] ], function(_v, en, $event) {
                var ad = !0;
                return "window:resize" === en && (ad = !1 !== nodeValue(_v, 1).onResize($event.target.innerWidth) && ad), 
                "click" === en && (ad = !1 !== nodeValue(_v, 1).onClick($event.target, $event.button, $event.ctrlKey, $event.metaKey, $event.altKey) && ad), 
                "window:scroll" === en && (ad = !1 !== nodeValue(_v, 1).onScroll() && ad), "document:keyup" === en && (ad = !1 !== nodeValue(_v, 1).onKeyUp($event.key, $event.which) && ad), 
                ad;
            }, View_AppComponent_0, RenderType_AppComponent)), directiveDef(1, 114688, null, 0, app_component_AppComponent, [ deployment_service_Deployment, document_service_DocumentService, ElementRef, location_service_LocationService, navigation_service_NavigationService, scroll_service_ScrollService, search_service_SearchService, toc_service_TocService ], null, null) ], function(_ck, _v) {
                _ck(_v, 1, 0);
            }, function(_ck, _v) {
                _ck(_v, 0, 0, nodeValue(_v, 1).hostClasses, nodeValue(_v, 1).isStarting);
            });
        }
        var AppComponentNgFactory = createComponentFactory("aio-shell", app_component_AppComponent, View_AppComponent_Host_0, {}, {}, []), ELEMENT_MODULE_PATHS_TOKEN = new InjectionToken("aio/elements-map"), ELEMENT_MODULE_PATHS = new Map();
        function defer(observableFactory) {
            return new Observable_Observable(function(subscriber) {
                var input;
                try {
                    input = observableFactory();
                } catch (err) {
                    return void subscriber.error(err);
                }
                return (input ? from_from(input) : empty_empty()).subscribe(subscriber);
            });
        }
        [ {
            selector: "aio-announcement-bar",
            loadChildren: "./announcement-bar/announcement-bar.module#AnnouncementBarModule"
        }, {
            selector: "aio-api-list",
            loadChildren: "./api/api-list.module#ApiListModule"
        }, {
            selector: "aio-contributor-list",
            loadChildren: "./contributor/contributor-list.module#ContributorListModule"
        }, {
            selector: "aio-file-not-found-search",
            loadChildren: "./search/file-not-found-search.module#FileNotFoundSearchModule"
        }, {
            selector: "aio-resource-list",
            loadChildren: "./resource/resource-list.module#ResourceListModule"
        }, {
            selector: "aio-toc",
            loadChildren: "./toc/toc.module#TocModule"
        }, {
            selector: "code-example",
            loadChildren: "./code/code-example.module#CodeExampleModule"
        }, {
            selector: "code-tabs",
            loadChildren: "./code/code-tabs.module#CodeTabsModule"
        }, {
            selector: "live-example",
            loadChildren: "./live-example/live-example.module#LiveExampleModule"
        } ].forEach(function(route) {
            ELEMENT_MODULE_PATHS.set(route.selector, route.loadChildren);
        });
        var NEVER = new Observable_Observable(noop), ERR_SW_NOT_SUPPORTED = "Service workers are disabled or not supported by this browser", service_worker_NgswCommChannel = function() {
            function NgswCommChannel(serviceWorker) {
                if (this.serviceWorker = serviceWorker, serviceWorker) {
                    var controllerChanges = fromEvent(serviceWorker, "controllerchange").pipe(map_map(function() {
                        return serviceWorker.controller;
                    })), controllerWithChanges = concat(defer(function() {
                        return of(serviceWorker.controller);
                    }), controllerChanges);
                    this.worker = controllerWithChanges.pipe(filter(function(c) {
                        return !!c;
                    })), this.registration = this.worker.pipe(switchMap(function() {
                        return serviceWorker.getRegistration();
                    }));
                    var events = fromEvent(serviceWorker, "message").pipe(map_map(function(event) {
                        return event.data;
                    })).pipe(filter(function(event) {
                        return event && event.type;
                    })).pipe(multicast(new Subject_Subject()));
                    events.connect(), this.events = events;
                } else this.worker = this.events = this.registration = (message = ERR_SW_NOT_SUPPORTED, 
                defer(function() {
                    return throwError_throwError(new Error(message));
                }));
                var message;
            }
            return NgswCommChannel.prototype.postMessage = function(action, payload) {
                return this.worker.pipe(take(1), tap(function(sw) {
                    sw.postMessage(__assign({
                        action: action
                    }, payload));
                })).toPromise().then(function() {});
            }, NgswCommChannel.prototype.postMessageWithStatus = function(type, payload, nonce) {
                var waitForStatus = this.waitForStatus(nonce), postMessage = this.postMessage(type, payload);
                return Promise.all([ waitForStatus, postMessage ]).then(function() {});
            }, NgswCommChannel.prototype.generateNonce = function() {
                return Math.round(1e7 * Math.random());
            }, NgswCommChannel.prototype.eventsOfType = function(type) {
                return this.events.pipe(filter(function(event) {
                    return event.type === type;
                }));
            }, NgswCommChannel.prototype.nextEventOfType = function(type) {
                return this.eventsOfType(type).pipe(take(1));
            }, NgswCommChannel.prototype.waitForStatus = function(nonce) {
                return this.eventsOfType("STATUS").pipe(filter(function(event) {
                    return event.nonce === nonce;
                }), take(1), map_map(function(event) {
                    if (!event.status) throw new Error(event.error);
                })).toPromise();
            }, Object.defineProperty(NgswCommChannel.prototype, "isEnabled", {
                get: function() {
                    return !!this.serviceWorker;
                },
                enumerable: !0,
                configurable: !0
            }), NgswCommChannel;
        }(), service_worker_SwPush = function() {
            function SwPush(sw) {
                if (this.sw = sw, this.subscriptionChanges = new Subject_Subject(), !sw.isEnabled) return this.messages = NEVER, 
                this.notificationClicks = NEVER, void (this.subscription = NEVER);
                this.messages = this.sw.eventsOfType("PUSH").pipe(map_map(function(message) {
                    return message.data;
                })), this.notificationClicks = this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(map_map(function(message) {
                    return message.data;
                })), this.pushManager = this.sw.registration.pipe(map_map(function(registration) {
                    return registration.pushManager;
                }));
                var workerDrivenSubscriptions = this.pushManager.pipe(switchMap(function(pm) {
                    return pm.getSubscription();
                }));
                this.subscription = merge(workerDrivenSubscriptions, this.subscriptionChanges);
            }
            return Object.defineProperty(SwPush.prototype, "isEnabled", {
                get: function() {
                    return this.sw.isEnabled;
                },
                enumerable: !0,
                configurable: !0
            }), SwPush.prototype.requestSubscription = function(options) {
                var _this = this;
                if (!this.sw.isEnabled) return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
                for (var pushOptions = {
                    userVisibleOnly: !0
                }, key = this.decodeBase64(options.serverPublicKey.replace(/_/g, "/").replace(/-/g, "+")), applicationServerKey = new Uint8Array(new ArrayBuffer(key.length)), i = 0; i < key.length; i++) applicationServerKey[i] = key.charCodeAt(i);
                return pushOptions.applicationServerKey = applicationServerKey, this.pushManager.pipe(switchMap(function(pm) {
                    return pm.subscribe(pushOptions);
                }), take(1)).toPromise().then(function(sub) {
                    return _this.subscriptionChanges.next(sub), sub;
                });
            }, SwPush.prototype.unsubscribe = function() {
                var _this = this;
                return this.sw.isEnabled ? this.subscription.pipe(take(1), switchMap(function(sub) {
                    if (null === sub) throw new Error("Not subscribed to push notifications.");
                    return sub.unsubscribe().then(function(success) {
                        if (!success) throw new Error("Unsubscribe failed!");
                        _this.subscriptionChanges.next(null);
                    });
                })).toPromise() : Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
            }, SwPush.prototype.decodeBase64 = function(input) {
                return atob(input);
            }, SwPush;
        }(), service_worker_SwUpdate = function() {
            function SwUpdate(sw) {
                if (this.sw = sw, !sw.isEnabled) return this.available = NEVER, void (this.activated = NEVER);
                this.available = this.sw.eventsOfType("UPDATE_AVAILABLE"), this.activated = this.sw.eventsOfType("UPDATE_ACTIVATED");
            }
            return Object.defineProperty(SwUpdate.prototype, "isEnabled", {
                get: function() {
                    return this.sw.isEnabled;
                },
                enumerable: !0,
                configurable: !0
            }), SwUpdate.prototype.checkForUpdate = function() {
                if (!this.sw.isEnabled) return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
                var statusNonce = this.sw.generateNonce();
                return this.sw.postMessageWithStatus("CHECK_FOR_UPDATES", {
                    statusNonce: statusNonce
                }, statusNonce);
            }, SwUpdate.prototype.activateUpdate = function() {
                if (!this.sw.isEnabled) return Promise.reject(new Error(ERR_SW_NOT_SUPPORTED));
                var statusNonce = this.sw.generateNonce();
                return this.sw.postMessageWithStatus("ACTIVATE_UPDATE", {
                    statusNonce: statusNonce
                }, statusNonce);
            }, SwUpdate;
        }(), RegistrationOptions = function() {
            return function() {};
        }(), SCRIPT = new InjectionToken("NGSW_REGISTER_SCRIPT");
        function ngswAppInitializer(injector, script, options, platformId) {
            return function() {
                var app = injector.get(core_ApplicationRef);
                if (isPlatformBrowser(platformId) && "serviceWorker" in navigator && !1 !== options.enabled) {
                    var whenStable = app.isStable.pipe(filter(function(stable) {
                        return !!stable;
                    }), take(1)).toPromise();
                    navigator.serviceWorker.addEventListener("controllerchange", function() {
                        null !== navigator.serviceWorker.controller && navigator.serviceWorker.controller.postMessage({
                            action: "INITIALIZE"
                        });
                    }), whenStable.then(function() {
                        return navigator.serviceWorker.register(script, {
                            scope: options.scope
                        });
                    });
                }
            };
        }
        function ngswCommChannelFactory(opts, platformId) {
            return new service_worker_NgswCommChannel(isPlatformBrowser(platformId) && !1 !== opts.enabled ? navigator.serviceWorker : void 0);
        }
        var service_worker_ServiceWorkerModule = function() {
            function ServiceWorkerModule() {}
            var ServiceWorkerModule_1;
            return ServiceWorkerModule_1 = ServiceWorkerModule, ServiceWorkerModule.register = function(script, opts) {
                return void 0 === opts && (opts = {}), {
                    ngModule: ServiceWorkerModule_1,
                    providers: [ {
                        provide: SCRIPT,
                        useValue: script
                    }, {
                        provide: RegistrationOptions,
                        useValue: opts
                    }, {
                        provide: service_worker_NgswCommChannel,
                        useFactory: ngswCommChannelFactory,
                        deps: [ RegistrationOptions, PLATFORM_ID ]
                    }, {
                        provide: APP_INITIALIZER,
                        useFactory: ngswAppInitializer,
                        deps: [ Injector, SCRIPT, RegistrationOptions, PLATFORM_ID ],
                        multi: !0
                    } ]
                };
            }, ServiceWorkerModule;
        }();
        function interval_dispatch(state) {
            var subscriber = state.subscriber, counter = state.counter, period = state.period;
            subscriber.next(counter), this.schedule({
                subscriber: subscriber,
                counter: counter + 1,
                period: period
            }, period);
        }
        var sw_updates_service_SwUpdatesService = function() {
            function SwUpdatesService(appRef, logger, swu) {
                var period, scheduler, _this = this;
                this.logger = logger, this.swu = swu, this.checkInterval = 216e5, this.onDestroy = new Subject_Subject(), 
                swu.isEnabled ? (concat(appRef.isStable.pipe(first_first(function(v) {
                    return v;
                })), (period = this.checkInterval, void 0 === period && (period = 0), void 0 === scheduler && (scheduler = async_async), 
                (!isNumeric(period) || period < 0) && (period = 0), scheduler && "function" == typeof scheduler.schedule || (scheduler = async_async), 
                new Observable_Observable(function(subscriber) {
                    return subscriber.add(scheduler.schedule(interval_dispatch, period, {
                        subscriber: subscriber,
                        counter: 0,
                        period: period
                    })), subscriber;
                }))).pipe(tap(function() {
                    return _this.log("Checking for update...");
                }), takeUntil(this.onDestroy)).subscribe(function() {
                    return _this.swu.checkForUpdate();
                }), this.swu.available.pipe(tap(function(evt) {
                    return _this.log("Update available: " + JSON.stringify(evt));
                }), takeUntil(this.onDestroy)).subscribe(function() {
                    return _this.swu.activateUpdate();
                }), this.updateActivated = this.swu.activated.pipe(tap(function(evt) {
                    return _this.log("Update activated: " + JSON.stringify(evt));
                }), map_map(function(evt) {
                    return evt.current.hash;
                }), takeUntil(this.onDestroy))) : this.updateActivated = NEVER.pipe(takeUntil(this.onDestroy));
            }
            return SwUpdatesService.prototype.ngOnDestroy = function() {
                this.onDestroy.next();
            }, SwUpdatesService.prototype.log = function(message) {
                var timestamp = new Date().toISOString();
                this.logger.log("[SwUpdates - " + timestamp + "]: " + message);
            }, SwUpdatesService;
        }(), ga_service_GaService = function() {
            function GaService(window) {
                this.window = window, this.ga("create", environment.gaId, "auto");
            }
            return GaService.prototype.locationChanged = function(url) {
                this.sendPage(url);
            }, GaService.prototype.sendPage = function(url) {
                url !== this.previousUrl && (this.previousUrl = url, this.ga("set", "page", "/" + url), 
                this.ga("send", "pageview"));
            }, GaService.prototype.sendEvent = function(source, action, label, value) {
                this.ga("send", "event", source, action, label, value);
            }, GaService.prototype.ga = function() {
                for (var args = [], _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
                var gaFn = this.window.ga;
                gaFn && gaFn.apply(void 0, args);
            }, GaService;
        }(), ScrollSpiedElement = function() {
            function ScrollSpiedElement(element, index) {
                this.element = element, this.index = index, this.top = 0;
            }
            return ScrollSpiedElement.prototype.calculateTop = function(scrollTop, topOffset) {
                this.top = scrollTop + this.element.getBoundingClientRect().top - topOffset;
            }, ScrollSpiedElement;
        }(), scroll_spy_service_ScrollSpiedElementGroup = function() {
            function ScrollSpiedElementGroup(elements) {
                this.activeScrollItem = new ReplaySubject_ReplaySubject(1), this.spiedElements = elements.map(function(elem, i) {
                    return new ScrollSpiedElement(elem, i);
                });
            }
            return ScrollSpiedElementGroup.prototype.calibrate = function(scrollTop, topOffset) {
                this.spiedElements.forEach(function(spiedElem) {
                    return spiedElem.calculateTop(scrollTop, topOffset);
                }), this.spiedElements.sort(function(a, b) {
                    return b.top - a.top;
                });
            }, ScrollSpiedElementGroup.prototype.onScroll = function(scrollTop, maxScrollTop) {
                var activeItem;
                scrollTop + 1 >= maxScrollTop ? activeItem = this.spiedElements[0] : this.spiedElements.some(function(spiedElem) {
                    return spiedElem.top <= scrollTop && (activeItem = spiedElem, !0);
                }), this.activeScrollItem.next(activeItem || null);
            }, ScrollSpiedElementGroup;
        }(), scroll_spy_service_ScrollSpyService = function() {
            function ScrollSpyService(doc, scrollService) {
                this.doc = doc, this.scrollService = scrollService, this.spiedElementGroups = [], 
                this.onStopListening = new Subject_Subject(), this.resizeEvents = fromEvent(window, "resize").pipe(auditTime(300), takeUntil(this.onStopListening)), 
                this.scrollEvents = fromEvent(window, "scroll").pipe(auditTime(10), takeUntil(this.onStopListening));
            }
            return ScrollSpyService.prototype.spyOn = function(elements) {
                var _this = this;
                this.spiedElementGroups.length || (this.resizeEvents.subscribe(function() {
                    return _this.onResize();
                }), this.scrollEvents.subscribe(function() {
                    return _this.onScroll();
                }), this.onResize());
                var scrollTop = this.getScrollTop(), topOffset = this.getTopOffset(), maxScrollTop = this.lastMaxScrollTop, spiedGroup = new scroll_spy_service_ScrollSpiedElementGroup(elements);
                return spiedGroup.calibrate(scrollTop, topOffset), spiedGroup.onScroll(scrollTop, maxScrollTop), 
                this.spiedElementGroups.push(spiedGroup), {
                    active: spiedGroup.activeScrollItem.asObservable().pipe(distinctUntilChanged()),
                    unspy: function() {
                        return _this.unspy(spiedGroup);
                    }
                };
            }, ScrollSpyService.prototype.getContentHeight = function() {
                return this.doc.body.scrollHeight || Number.MAX_SAFE_INTEGER;
            }, ScrollSpyService.prototype.getScrollTop = function() {
                return window && window.pageYOffset || 0;
            }, ScrollSpyService.prototype.getTopOffset = function() {
                return this.scrollService.topOffset + 50;
            }, ScrollSpyService.prototype.getViewportHeight = function() {
                return this.doc.body.clientHeight || 0;
            }, ScrollSpyService.prototype.onResize = function() {
                var contentHeight = this.getContentHeight(), viewportHeight = this.getViewportHeight(), scrollTop = this.getScrollTop(), topOffset = this.getTopOffset();
                this.lastContentHeight = contentHeight, this.lastMaxScrollTop = contentHeight - viewportHeight, 
                this.spiedElementGroups.forEach(function(group) {
                    return group.calibrate(scrollTop, topOffset);
                });
            }, ScrollSpyService.prototype.onScroll = function() {
                this.lastContentHeight !== this.getContentHeight() && this.onResize();
                var scrollTop = this.getScrollTop(), maxScrollTop = this.lastMaxScrollTop;
                this.spiedElementGroups.forEach(function(group) {
                    return group.onScroll(scrollTop, maxScrollTop);
                });
            }, ScrollSpyService.prototype.unspy = function(spiedGroup) {
                spiedGroup.activeScrollItem.complete(), this.spiedElementGroups = this.spiedElementGroups.filter(function(group) {
                    return group !== spiedGroup;
                }), this.spiedElementGroups.length || this.onStopListening.next();
            }, ScrollSpyService;
        }(), reporting_error_handler_ReportingErrorHandler = function(_super) {
            function ReportingErrorHandler(window) {
                var _this = _super.call(this) || this;
                return _this.window = window, _this;
            }
            return __extends(ReportingErrorHandler, _super), ReportingErrorHandler.prototype.handleError = function(error) {
                try {
                    _super.prototype.handleError.call(this, error);
                } catch (e) {
                    this.reportError(e);
                }
                this.reportError(error);
            }, ReportingErrorHandler.prototype.reportError = function(error) {
                "string" == typeof error ? this.window.onerror(error) : this.window.onerror(error.message, void 0, void 0, void 0, error);
            }, ReportingErrorHandler;
        }(ErrorHandler), custom_elements_module_0 = ELEMENT_MODULE_PATHS, CustomElementsModule = function() {
            return function() {};
        }(), SwUpdatesModule = function() {
            return function() {};
        }(), SharedModule = function() {
            return function() {};
        }(), AppModuleNgFactory = createNgModuleFactory(AppModule, [ app_component_AppComponent ], function(_l) {
            return function(providers) {
                for (var providersByKey = {}, modules = [], isRoot = !1, i = 0; i < providers.length; i++) {
                    var provider = providers[i];
                    provider.token === APP_ROOT && !0 === provider.value && (isRoot = !0), 1073741824 & provider.flags && modules.push(provider.token), 
                    provider.index = i, providersByKey[tokenKey(provider.token)] = provider;
                }
                return {
                    factory: null,
                    providersByKey: providersByKey,
                    providers: providers,
                    modules: modules,
                    isRoot: isRoot
                };
            }([ moduleProvideDef(512, core_ComponentFactoryResolver, CodegenComponentFactoryResolver, [ [ 8, [ AppComponentNgFactory ] ], [ 3, core_ComponentFactoryResolver ], NgModuleRef ]), moduleProvideDef(5120, LOCALE_ID, _localeFactory, [ [ 3, LOCALE_ID ] ]), moduleProvideDef(4608, NgLocalization, common_NgLocaleLocalization, [ LOCALE_ID, [ 2, DEPRECATED_PLURAL_FN ] ]), moduleProvideDef(5120, SCHEDULER, zoneSchedulerFactory, [ NgZone ]), moduleProvideDef(4608, Compiler, Compiler, []), moduleProvideDef(5120, APP_ID, _appIdRandomProviderFactory, []), moduleProvideDef(5120, IterableDiffers, _iterableDiffersFactory, []), moduleProvideDef(5120, KeyValueDiffers, _keyValueDiffersFactory, []), moduleProvideDef(4608, DomSanitizer, platform_browser_DomSanitizerImpl, [ DOCUMENT ]), moduleProvideDef(6144, Sanitizer, null, [ DomSanitizer ]), moduleProvideDef(4608, HAMMER_GESTURE_CONFIG, HammerGestureConfig, []), moduleProvideDef(5120, EVENT_MANAGER_PLUGINS, function(p0_0, p0_1, p0_2, p1_0, p2_0, p2_1, p2_2, p2_3) {
                return [ new platform_browser_DomEventsPlugin(p0_0, p0_1, p0_2), new platform_browser_KeyEventsPlugin(p1_0), new platform_browser_HammerGesturesPlugin(p2_0, p2_1, p2_2, p2_3) ];
            }, [ DOCUMENT, NgZone, PLATFORM_ID, DOCUMENT, DOCUMENT, HAMMER_GESTURE_CONFIG, Console, [ 2, HAMMER_LOADER ] ]), moduleProvideDef(4608, EventManager, EventManager, [ EVENT_MANAGER_PLUGINS, NgZone ]), moduleProvideDef(135680, platform_browser_DomSharedStylesHost, platform_browser_DomSharedStylesHost, [ DOCUMENT ]), moduleProvideDef(4608, platform_browser_DomRendererFactory2, platform_browser_DomRendererFactory2, [ EventManager, platform_browser_DomSharedStylesHost ]), moduleProvideDef(5120, AnimationDriver, instantiateSupportedAnimationDriver, []), moduleProvideDef(5120, AnimationStyleNormalizer, instantiateDefaultStyleNormalizer, []), moduleProvideDef(4608, browser_AnimationEngine, animations_InjectableAnimationEngine, [ DOCUMENT, AnimationDriver, AnimationStyleNormalizer ]), moduleProvideDef(5120, RendererFactory2, instantiateRendererFactory, [ platform_browser_DomRendererFactory2, browser_AnimationEngine, NgZone ]), moduleProvideDef(6144, SharedStylesHost, null, [ platform_browser_DomSharedStylesHost ]), moduleProvideDef(4608, Testability, Testability, [ NgZone ]), moduleProvideDef(4608, AnimationBuilder, animations_BrowserAnimationBuilder, [ RendererFactory2, DOCUMENT ]), moduleProvideDef(4608, NgModuleFactoryLoader, core_SystemJsNgModuleLoader, [ Compiler, [ 2, SystemJsNgModuleLoaderConfig ] ]), moduleProvideDef(4608, elements_loader_ElementsLoader, elements_loader_ElementsLoader, [ NgModuleFactoryLoader, NgModuleRef, ELEMENT_MODULE_PATHS_TOKEN ]), moduleProvideDef(4608, HttpXsrfTokenExtractor, http_HttpXsrfCookieExtractor, [ DOCUMENT, PLATFORM_ID, XSRF_COOKIE_NAME ]), moduleProvideDef(4608, HttpXsrfInterceptor, HttpXsrfInterceptor, [ HttpXsrfTokenExtractor, XSRF_HEADER_NAME ]), moduleProvideDef(5120, HTTP_INTERCEPTORS, function(p0_0) {
                return [ p0_0 ];
            }, [ HttpXsrfInterceptor ]), moduleProvideDef(4608, BrowserXhr, BrowserXhr, []), moduleProvideDef(6144, XhrFactory, null, [ BrowserXhr ]), moduleProvideDef(4608, http_HttpXhrBackend, http_HttpXhrBackend, [ XhrFactory ]), moduleProvideDef(6144, HttpBackend, null, [ http_HttpXhrBackend ]), moduleProvideDef(4608, HttpHandler, HttpInterceptingHandler, [ HttpBackend, Injector ]), moduleProvideDef(4608, http_HttpClient, http_HttpClient, [ HttpHandler ]), moduleProvideDef(4608, logger_service_Logger, logger_service_Logger, [ ErrorHandler ]), moduleProvideDef(5120, service_worker_NgswCommChannel, ngswCommChannelFactory, [ RegistrationOptions, PLATFORM_ID ]), moduleProvideDef(4608, service_worker_SwUpdate, service_worker_SwUpdate, [ service_worker_NgswCommChannel ]), moduleProvideDef(135680, sw_updates_service_SwUpdatesService, sw_updates_service_SwUpdatesService, [ core_ApplicationRef, logger_service_Logger, service_worker_SwUpdate ]), moduleProvideDef(4608, service_worker_SwPush, service_worker_SwPush, [ service_worker_NgswCommChannel ]), moduleProvideDef(4608, ga_service_GaService, ga_service_GaService, [ WindowToken ]), moduleProvideDef(4608, LocationStrategy, common_PathLocationStrategy, [ PlatformLocation, [ 2, APP_BASE_HREF ] ]), moduleProvideDef(4608, common_Location, common_Location, [ LocationStrategy ]), moduleProvideDef(4608, location_service_LocationService, location_service_LocationService, [ ga_service_GaService, common_Location, PlatformLocation, sw_updates_service_SwUpdatesService ]), moduleProvideDef(4608, deployment_service_Deployment, deployment_service_Deployment, [ location_service_LocationService ]), moduleProvideDef(4608, document_service_DocumentService, document_service_DocumentService, [ logger_service_Logger, http_HttpClient, location_service_LocationService ]), moduleProvideDef(4608, icon_es5_MatIconRegistry, custom_icon_registry_CustomIconRegistry, [ http_HttpClient, DomSanitizer, [ 2, DOCUMENT ], SVG_ICONS ]), moduleProvideDef(4608, navigation_service_NavigationService, navigation_service_NavigationService, [ http_HttpClient, location_service_LocationService ]), moduleProvideDef(4608, scroll_service_ScrollService, scroll_service_ScrollService, [ DOCUMENT, PlatformLocation, common_ViewportScroller, common_Location ]), moduleProvideDef(4608, scroll_spy_service_ScrollSpyService, scroll_spy_service_ScrollSpyService, [ DOCUMENT, scroll_service_ScrollService ]), moduleProvideDef(4608, search_service_SearchService, search_service_SearchService, [ NgZone ]), moduleProvideDef(4608, toc_service_TocService, toc_service_TocService, [ DOCUMENT, DomSanitizer, scroll_spy_service_ScrollSpyService ]), moduleProvideDef(5120, CurrentDateToken, app_module_0, []), moduleProvideDef(1073742336, CommonModule, CommonModule, []), moduleProvideDef(1024, WindowToken, app_module_1, []), moduleProvideDef(512, ErrorHandler, reporting_error_handler_ReportingErrorHandler, [ WindowToken ]), moduleProvideDef(256, SCRIPT, "/ngsw-worker.js", []), moduleProvideDef(256, RegistrationOptions, {
                enabled: !0
            }, []), moduleProvideDef(1024, APP_INITIALIZER, function(p0_0, p1_0, p1_1, p1_2, p1_3) {
                return [ (coreTokens = p0_0, exportNgVar("probe", inspectNativeElement), exportNgVar("coreTokens", __assign({}, CORE_TOKENS, (coreTokens || []).reduce(function(prev, t) {
                    return prev[t.name] = t.token, prev;
                }, {}))), function() {
                    return inspectNativeElement;
                }), ngswAppInitializer(p1_0, p1_1, p1_2, p1_3) ];
                var coreTokens;
            }, [ [ 2, NgProbeToken ], Injector, SCRIPT, RegistrationOptions, PLATFORM_ID ]), moduleProvideDef(512, ApplicationInitStatus, ApplicationInitStatus, [ [ 2, APP_INITIALIZER ] ]), moduleProvideDef(131584, core_ApplicationRef, core_ApplicationRef, [ NgZone, Console, Injector, ErrorHandler, core_ComponentFactoryResolver, ApplicationInitStatus ]), moduleProvideDef(1073742336, ApplicationModule, ApplicationModule, [ core_ApplicationRef ]), moduleProvideDef(1073742336, platform_browser_BrowserModule, platform_browser_BrowserModule, [ [ 3, platform_browser_BrowserModule ] ]), moduleProvideDef(1073742336, BrowserAnimationsModule, BrowserAnimationsModule, []), moduleProvideDef(1073742336, CustomElementsModule, CustomElementsModule, []), moduleProvideDef(1073742336, HttpClientXsrfModule, HttpClientXsrfModule, []), moduleProvideDef(1073742336, HttpClientModule, HttpClientModule, []), moduleProvideDef(1073742336, BidiModule, BidiModule, []), moduleProvideDef(1073742336, core_es5_MatCommonModule, core_es5_MatCommonModule, [ [ 2, MATERIAL_SANITY_CHECKS ], [ 2, HAMMER_LOADER ] ]), moduleProvideDef(1073742336, PlatformModule, PlatformModule, []), moduleProvideDef(1073742336, MatRippleModule, MatRippleModule, []), moduleProvideDef(1073742336, MatButtonModule, MatButtonModule, []), moduleProvideDef(1073742336, MatIconModule, MatIconModule, []), moduleProvideDef(1073742336, MatProgressBarModule, MatProgressBarModule, []), moduleProvideDef(1073742336, ScrollingModule, ScrollingModule, []), moduleProvideDef(1073742336, MatSidenavModule, MatSidenavModule, []), moduleProvideDef(1073742336, MatToolbarModule, MatToolbarModule, []), moduleProvideDef(1073742336, SwUpdatesModule, SwUpdatesModule, []), moduleProvideDef(1073742336, SharedModule, SharedModule, []), moduleProvideDef(1073742336, service_worker_ServiceWorkerModule, service_worker_ServiceWorkerModule, []), moduleProvideDef(1073742336, AppModule, AppModule, []), moduleProvideDef(256, APP_ROOT, !0, []), moduleProvideDef(256, ANIMATION_MODULE_TYPE, "BrowserAnimations", []), moduleProvideDef(256, ELEMENT_MODULE_PATHS_TOKEN, custom_elements_module_0, []), moduleProvideDef(256, XSRF_COOKIE_NAME, "XSRF-TOKEN", []), moduleProvideDef(256, XSRF_HEADER_NAME, "X-XSRF-TOKEN", []), moduleProvideDef(1024, SVG_ICONS, function() {
                return [ {
                    name: "close",
                    svgSource: '<svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /><path d="M0 0h24v24H0z" fill="none" /></svg>'
                }, {
                    name: "insert_comment",
                    svgSource: '<svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /><path d="M0 0h24v24H0z" fill="none" /></svg>'
                }, {
                    name: "keyboard_arrow_right",
                    svgSource: '<svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z" /></svg>'
                }, {
                    name: "menu",
                    svgSource: '<svg focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" /></svg>'
                }, {
                    namespace: "logos",
                    name: "github",
                    svgSource: '<svg focusable="false" viewBox="0 0 51.8 50.4" xmlns="http://www.w3.org/2000/svg"><path d="M25.9,0.2C11.8,0.2,0.3,11.7,0.3,25.8c0,11.3,7.3,20.9,17.5,24.3c1.3,0.2,1.7-0.6,1.7-1.2c0-0.6,0-2.6,0-4.8c-7.1,1.5-8.6-3-8.6-3c-1.2-3-2.8-3.7-2.8-3.7c-2.3-1.6,0.2-1.6,0.2-1.6c2.6,0.2,3.9,2.6,3.9,2.6c2.3,3.9,6,2.8,7.5,2.1c0.2-1.7,0.9-2.8,1.6-3.4c-5.7-0.6-11.7-2.8-11.7-12.7c0-2.8,1-5.1,2.6-6.9c-0.3-0.7-1.1-3.3,0.3-6.8c0,0,2.1-0.7,7,2.6c2-0.6,4.2-0.9,6.4-0.9c2.2,0,4.4,0.3,6.4,0.9c4.9-3.3,7-2.6,7-2.6c1.4,3.5,0.5,6.1,0.3,6.8c1.6,1.8,2.6,4.1,2.6,6.9c0,9.8-6,12-11.7,12.6c0.9,0.8,1.7,2.4,1.7,4.7c0,3.4,0,6.2,0,7c0,0.7,0.5,1.5,1.8,1.2c10.2-3.4,17.5-13,17.5-24.3C51.5,11.7,40.1,0.2,25.9,0.2z" /></svg>'
                }, {
                    namespace: "logos",
                    name: "twitter",
                    svgSource: '<svg focusable="false" viewBox="0 0 50 59" xmlns="http://www.w3.org/2000/svg"><path d="M50,9.3c-1.8,0.8-3.8,1.4-5.9,1.6c2.1-1.3,3.7-3.3,4.5-5.7c-2,1.2-4.2,2-6.5,2.5c-1.9-2-4.5-3.2-7.5-3.2c-5.7,0-10.3,4.6-10.3,10.3c0,0.8,0.1,1.6,0.3,2.3C16.1,16.7,8.5,12.6,3.5,6.4c-0.9,1.5-1.4,3.3-1.4,5.2c0,3.6,1.8,6.7,4.6,8.5C5,20,3.4,19.6,2,18.8c0,0,0,0.1,0,0.1c0,5,3.5,9.1,8.2,10.1c-0.9,0.2-1.8,0.4-2.7,0.4c-0.7,0-1.3-0.1-1.9-0.2c1.3,4.1,5.1,7,9.6,7.1c-3.5,2.8-7.9,4.4-12.7,4.4c-0.8,0-1.6,0-2.4-0.1c4.5,2.9,9.9,4.6,15.7,4.6c18.9,0,29.2-15.6,29.2-29.2c0-0.4,0-0.9,0-1.3C46.9,13.2,48.6,11.4,50,9.3z" /></svg>'
                } ];
            }, []) ]);
        });
        environment.production && function() {
            if (_runModeLocked) throw new Error("Cannot enable prod mode after platform setup.");
            _devMode = !1;
        }(), platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
    }
}, [ [ 0, 0 ] ] ]);
//# sourceMappingURL=main.22c36d167cfa75ccbc50.js.map