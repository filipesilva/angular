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
function fillProperties(target, source) {
    for (var key in source) source.hasOwnProperty(key) && !target.hasOwnProperty(key) && (target[key] = source[key]);
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
var defaultScheduler = ("undefined" != typeof requestAnimationFrame && requestAnimationFrame || setTimeout).bind(_global);
function resolveWindow(element) {
    return {
        name: "window",
        target: element.ownerDocument.defaultView
    };
}
function resolveDocument(element) {
    return {
        name: "document",
        target: element.ownerDocument
    };
}
var INTERPOLATION_DELIMITER = "\ufffd";
function isPropMetadataString(str) {
    return str.indexOf(INTERPOLATION_DELIMITER) >= 0;
}
function maybeUnwrapFn(value) {
    return value instanceof Function ? value() : value;
}
var _renderCompCount = 0;
function defineComponent(componentDefinition) {
    var type = componentDefinition.type, typePrototype = type.prototype, declaredInputs = {}, def = {
        type: type,
        providersResolver: null,
        consts: componentDefinition.consts,
        vars: componentDefinition.vars,
        factory: componentDefinition.factory,
        template: componentDefinition.template || null,
        ngContentSelectors: componentDefinition.ngContentSelectors,
        hostBindings: componentDefinition.hostBindings || null,
        contentQueries: componentDefinition.contentQueries || null,
        declaredInputs: declaredInputs,
        inputs: null,
        outputs: null,
        exportAs: componentDefinition.exportAs || null,
        onChanges: null,
        onInit: typePrototype.ngOnInit || null,
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
    };
    return def._ = "" + {
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
    }, def;
}
function extractDirectiveDef(type) {
    return getComponentDef(type) || getDirectiveDef(type);
}
function extractPipeDef(type) {
    return getPipeDef(type);
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
var defineDirective = defineComponent;
function getComponentDef(type) {
    return type[NG_COMPONENT_DEF] || null;
}
function getDirectiveDef(type) {
    return type[NG_DIRECTIVE_DEF] || null;
}
function getPipeDef(type) {
    return type[NG_PIPE_DEF] || null;
}
function getNgModuleDef(type, throwNotFound) {
    var ngModuleDef = type[NG_MODULE_DEF] || null;
    if (!ngModuleDef && !0 === throwNotFound) throw new Error("Type " + stringify(type) + " does not have 'ngModuleDef' property.");
    return ngModuleDef;
}
var HOST = 0, TVIEW = 1, FLAGS = 2, PARENT = 3, NEXT = 4, QUERIES = 5, T_HOST = 6, BINDING_INDEX = 7, CLEANUP = 8, CONTEXT = 9, INJECTOR$1 = 10, RENDERER_FACTORY = 11, RENDERER = 12, SANITIZER = 13, CHILD_HEAD = 14, CHILD_TAIL = 15, CONTENT_QUERIES = 16, DECLARATION_VIEW = 17, PREORDER_HOOK_FLAGS = 18, HEADER_OFFSET = 20, TYPE = 1, ACTIVE_INDEX = 2, NATIVE = 7, VIEWS = 8, MONKEY_PATCH_KEY_NAME = "__ngContext__";
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
function getNativeByIndex(index, lView) {
    return unwrapRNode(lView[index + HEADER_OFFSET]);
}
function getNativeByTNode(tNode, hostView) {
    return unwrapRNode(hostView[tNode.index]);
}
function getTNode(index, view) {
    return view[TVIEW].data[index + HEADER_OFFSET];
}
function loadInternal(view, index) {
    return view[index + HEADER_OFFSET];
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
function viewAttachedToContainer(view) {
    return isLContainer(view[PARENT]);
}
function resetPreOrderHookFlags(lView) {
    lView[PREORDER_HOOK_FLAGS] = 0;
}
var elementDepthCount, TNODE = 8, PARENT_INJECTOR = 8, INJECTOR_BLOOM_PARENT_SIZE = 9, NO_PARENT_INJECTOR = -1, NodeInjectorFactory = function() {
    return function(factory, isViewProvider, injectImplementation) {
        this.factory = factory, this.resolving = !1, this.canSeeViewProviders = isViewProvider, 
        this.injectImpl = injectImplementation;
    };
}(), FactoryPrototype = NodeInjectorFactory.prototype;
function registerPreOrderHooks(directiveIndex, directiveDef, tView, nodeIndex, initialPreOrderHooksLength, initialPreOrderCheckHooksLength) {
    var onChanges = directiveDef.onChanges, onInit = directiveDef.onInit, doCheck = directiveDef.doCheck;
    initialPreOrderHooksLength >= 0 && (!tView.preOrderHooks || initialPreOrderHooksLength === tView.preOrderHooks.length) && (onChanges || onInit || doCheck) && (tView.preOrderHooks || (tView.preOrderHooks = [])).push(nodeIndex), 
    initialPreOrderCheckHooksLength >= 0 && (!tView.preOrderCheckHooks || initialPreOrderCheckHooksLength === tView.preOrderCheckHooks.length) && (onChanges || doCheck) && (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(nodeIndex), 
    onChanges && ((tView.preOrderHooks || (tView.preOrderHooks = [])).push(directiveIndex, onChanges), 
    (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(directiveIndex, onChanges)), 
    onInit && (tView.preOrderHooks || (tView.preOrderHooks = [])).push(-directiveIndex, onInit), 
    doCheck && ((tView.preOrderHooks || (tView.preOrderHooks = [])).push(directiveIndex, doCheck), 
    (tView.preOrderCheckHooks || (tView.preOrderCheckHooks = [])).push(directiveIndex, doCheck));
}
function registerPostOrderHooks(tView, tNode) {
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
}
function executePreOrderHooks(currentView, tView, checkNoChangesMode, currentNodeIndex) {
    checkNoChangesMode || executeHooks(currentView, tView.preOrderHooks, tView.preOrderCheckHooks, checkNoChangesMode, 0, void 0 !== currentNodeIndex ? currentNodeIndex : null);
}
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
var bindingsEnabled, currentDirectiveDef = null;
function setCurrentDirectiveDef(def) {
    currentDirectiveDef = def;
}
function getLView() {
    return core_lView;
}
var previousOrParentTNode, isParent, core_lView, activeHostContext = null, activeHostElementIndex = null;
function setActiveHost(host, index) {
    void 0 === index && (index = null), activeHostContext = host, activeHostElementIndex = index;
}
function getActiveHostContext() {
    return activeHostContext;
}
function getActiveHostElementIndex() {
    return activeHostElementIndex;
}
function restoreView(viewToRestore) {
    contextLView = viewToRestore;
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
var contextLView = null, checkNoChangesMode = !1;
function getCheckNoChangesMode() {
    return checkNoChangesMode;
}
function setCheckNoChangesMode(mode) {
    checkNoChangesMode = mode;
}
var bindingRootIndex = -1;
function setBindingRoot(value) {
    bindingRootIndex = value;
}
var currentQueryIndex = 0;
function getCurrentQueryIndex() {
    return currentQueryIndex;
}
function setCurrentQueryIndex(value) {
    currentQueryIndex = value;
}
function enterView(newView, hostTNode) {
    var oldView = core_lView;
    return newView && (bindingRootIndex = newView[TVIEW].bindingStartIndex), previousOrParentTNode = hostTNode, 
    isParent = !0, core_lView = contextLView = newView, oldView;
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
var NG_PROJECT_AS_ATTR_NAME = "ngProjectAs", RendererStyleFlags3 = function(RendererStyleFlags3) {
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
var CorePlayerHandler = function() {
    function CorePlayerHandler() {
        this._players = [];
    }
    return CorePlayerHandler.prototype.flushPlayers = function() {
        for (var i = 0; i < this._players.length; i++) {
            var player = this._players[i];
            player.parent || 0 !== player.state || player.play();
        }
        this._players.length = 0;
    }, CorePlayerHandler.prototype.queuePlayer = function(player) {
        this._players.push(player);
    }, CorePlayerHandler;
}(), ANIMATION_PROP_PREFIX = "@";
function createEmptyStylingContext(wrappedElement, sanitizer, initialStyles, initialClasses) {
    var context = [ wrappedElement || null, 0, [], initialStyles || [ null, null ], initialClasses || [ null, null ], [ 0, 0 ], [ 0 ], [ 0 ], null ];
    return allocateDirectiveIntoContext(context, null), context;
}
function allocateDirectiveIntoContext(context, directiveRef) {
    var dirs = context[2], i = dirs.length;
    return dirs.push(null, null, null, null), dirs[i + 0] = directiveRef, dirs[i + 2] = !1, 
    dirs[i + 3] = null, dirs[i + 1] = -1, i;
}
function getStylingContext(index, viewData) {
    for (var storageIndex = index, slotValue = viewData[storageIndex], wrapper = viewData; Array.isArray(slotValue); ) wrapper = slotValue, 
    slotValue = slotValue[HOST];
    if (value = wrapper, Array.isArray(value) && "number" == typeof value[TYPE]) return wrapper;
    var value, stylingTemplate = getTNode(index - HEADER_OFFSET, viewData).stylingTemplate;
    return wrapper !== viewData && (storageIndex = HOST), wrapper[storageIndex] = stylingTemplate ? function(element, templateStyleContext) {
        for (var context = templateStyleContext.slice(), i = 0; i < 9; i++) {
            var value = templateStyleContext[i];
            Array.isArray(value) && (context[i] = value.slice());
        }
        return context[0] = element, context[1] |= 16, context;
    }(slotValue, stylingTemplate) : createEmptyStylingContext(slotValue);
}
function isAnimationProp(name) {
    return name[0] === ANIMATION_PROP_PREFIX;
}
function hasClassInput(tNode) {
    return 0 != (8 & tNode.flags);
}
function hasStyleInput(tNode) {
    return 0 != (16 & tNode.flags);
}
function addPlayerInternal(playerContext, rootContext, element, player, playerContextIndex, ref) {
    return ref = ref || element, playerContextIndex ? playerContext[playerContextIndex] = player : playerContext.push(player), 
    !!player && (player.addEventListener(200, function() {
        var index = playerContext.indexOf(player);
        index && (index < playerContext[0] ? playerContext[index] = null : playerContext.splice(index, 1)), 
        player.destroy();
    }), (rootContext.playerHandler || (rootContext.playerHandler = new CorePlayerHandler())).queuePlayer(player, ref), 
    !0);
}
function setUpAttributes(native, attrs) {
    for (var renderer = getLView()[RENDERER], isProc = isProceduralRenderer(renderer), i = 0; i < attrs.length; ) {
        var value = attrs[i];
        if ("number" == typeof value) {
            if (0 !== value) break;
            i++;
            var namespaceURI = attrs[i++], attrName = attrs[i++], attrVal = attrs[i++];
            isProc ? renderer.setAttribute(native, attrName, attrVal, namespaceURI) : native.setAttributeNS(namespaceURI, attrName, attrVal);
        } else attrVal = attrs[++i], (attrName = value) !== NG_PROJECT_AS_ATTR_NAME && (isAnimationProp(attrName) ? isProc && renderer.setProperty(native, attrName, attrVal) : isProc ? renderer.setAttribute(native, attrName, attrVal) : native.setAttribute(attrName, attrVal)), 
        i++;
    }
    return i;
}
function attrsStylingIndexOf(attrs, startIndex) {
    for (var i = startIndex; i < attrs.length; i++) {
        var val = attrs[i];
        if (1 === val || 2 === val) return i;
    }
    return -1;
}
function isNameOnlyAttributeMarker(marker) {
    return 3 === marker || 4 === marker;
}
function hasParentInjector(parentLocation) {
    return parentLocation !== NO_PARENT_INJECTOR;
}
function getParentInjectorIndex(parentLocation) {
    return 32767 & parentLocation;
}
function getParentInjectorViewOffset(parentLocation) {
    return parentLocation >> 16;
}
function getParentInjectorView(location, startView) {
    for (var viewOffset = getParentInjectorViewOffset(location), parentView = startView; viewOffset > 0; ) parentView = parentView[DECLARATION_VIEW], 
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
function getRootContext(viewOrComponent) {
    return function(componentOrLView) {
        for (var lView = isLView(componentOrLView) ? componentOrLView : readPatchedLView(componentOrLView); lView && !(512 & lView[FLAGS]); ) lView = getLViewParent(lView);
        return lView;
    }(viewOrComponent)[CONTEXT];
}
var includeViewProviders = !0;
function setIncludeViewProviders(v) {
    var oldValue = includeViewProviders;
    return includeViewProviders = v, oldValue;
}
var BLOOM_MASK = 255, nextNgElementId = 0;
function getOrCreateNodeInjectorForNode(tNode, hostView) {
    var existingInjectorIndex = getInjectorIndex(tNode, hostView);
    if (-1 !== existingInjectorIndex) return existingInjectorIndex;
    var tView = hostView[TVIEW];
    tView.firstTemplatePass && (tNode.injectorIndex = hostView.length, insertBloom(tView.data, tNode), 
    insertBloom(hostView, null), insertBloom(tView.blueprint, null));
    var parentLoc = getParentInjectorLocation(tNode, hostView), parentIndex = getParentInjectorIndex(parentLoc), parentLView = getParentInjectorView(parentLoc, hostView), injectorIndex = tNode.injectorIndex;
    if (hasParentInjector(parentLoc)) for (var parentData = parentLView[TVIEW].data, i = 0; i < 8; i++) hostView[injectorIndex + i] = parentLView[parentIndex + i] | parentData[parentIndex + i];
    return hostView[injectorIndex + PARENT_INJECTOR] = parentLoc, injectorIndex;
}
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
function diPublicInInjector(injectorIndex, view, token) {
    !function(injectorIndex, tView, type) {
        var id = "string" != typeof type ? type[NG_ELEMENT_ID] : type.charCodeAt(0) || 0;
        null == id && (id = type[NG_ELEMENT_ID] = nextNgElementId++);
        var bloomBit = id & BLOOM_MASK, mask = 1 << bloomBit, b6 = 64 & bloomBit, b5 = 32 & bloomBit, tData = tView.data;
        128 & bloomBit ? b6 ? b5 ? tData[injectorIndex + 7] |= mask : tData[injectorIndex + 6] |= mask : b5 ? tData[injectorIndex + 5] |= mask : tData[injectorIndex + 4] |= mask : b6 ? b5 ? tData[injectorIndex + 3] |= mask : tData[injectorIndex + 2] |= mask : b5 ? tData[injectorIndex + 1] |= mask : tData[injectorIndex] |= mask;
    }(injectorIndex, view[TVIEW], token);
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
    var currentTView = lView[TVIEW], tNode = currentTView.data[injectorIndex + TNODE], injectableIdx = locateDirectiveOrProvider(tNode, lView, token, null == previousTView ? isComponent(tNode) && includeViewProviders : previousTView != currentTView && 3 === tNode.type, flags & InjectFlags.Host && hostTElementNode === tNode);
    return null !== injectableIdx ? getNodeInjectable(currentTView.data, lView, injectableIdx, tNode) : NOT_FOUND;
}
function locateDirectiveOrProvider(tNode, lView, token, canAccessViewProviders, isHostSpecialCase) {
    for (var nodeProviderIndexes = tNode.providerIndexes, tInjectables = lView[TVIEW].data, injectablesStart = 65535 & nodeProviderIndexes, directivesStart = tNode.directiveStart, cptViewProvidersCount = nodeProviderIndexes >> 16, endIndex = isHostSpecialCase ? injectablesStart + cptViewProvidersCount : tNode.directiveEnd, i = canAccessViewProviders ? injectablesStart : injectablesStart + cptViewProvidersCount; i < endIndex; i++) {
        var providerTokenOrDef = tInjectables[i];
        if (i < directivesStart && token === providerTokenOrDef || i >= directivesStart && providerTokenOrDef.type === token) return i;
    }
    if (isHostSpecialCase) {
        var dirDef = tInjectables[directivesStart];
        if (dirDef && isComponentDef(dirDef) && dirDef.type === token) return directivesStart;
    }
    return null;
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
function getInheritedFactory(type) {
    var factory = function(type) {
        var typeAny = type, def = getComponentDef(typeAny) || getDirectiveDef(typeAny) || getPipeDef(typeAny) || getInjectableDef(typeAny) || getInjectorDef(typeAny);
        return def && void 0 !== def.factory ? def.factory : null;
    }(Object.getPrototypeOf(type.prototype).constructor);
    return null !== factory ? factory : function(t) {
        return new t();
    };
}
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
}();
function throwMultipleComponentError(tNode) {
    throw new Error("Multiple components match node with tagname " + tNode.tagName);
}
var NO_CHANGE = {}, BoundPlayerFactory = function() {
    return function(fn, value) {
        this.fn = fn, this.value = value;
    };
}();
function initializeStaticContext(attrs, stylingStartIndex, directiveRef) {
    var context = createEmptyStylingContext();
    return patchContextWithStaticAttrs(context, attrs, stylingStartIndex, directiveRef), 
    context;
}
function patchContextWithStaticAttrs(context, attrs, attrsStylingStartIndex, directiveRef) {
    if (!(16 & context[1])) {
        var detectedIndex = getDirectiveRegistryValuesIndexOf(context[2], directiveRef || null);
        -1 === detectedIndex && (detectedIndex = allocateDirectiveIntoContext(context, directiveRef));
        for (var directiveIndex = detectedIndex / 4, initialClasses = null, initialStyles = null, mode = -1, i = attrsStylingStartIndex; i < attrs.length; i++) {
            var attr = attrs[i];
            "number" == typeof attr ? mode = attr : 1 == mode ? patchInitialStylingValue(initialClasses = initialClasses || context[4], attr, !0, directiveIndex) : 2 == mode && patchInitialStylingValue(initialStyles = initialStyles || context[3], attr, attrs[++i], directiveIndex);
        }
    }
}
function patchInitialStylingValue(initialStyling, prop, value, directiveOwnerIndex) {
    for (var i = 2; i < initialStyling.length; i += 3) if (initialStyling[i + 0] === prop) return void (allowValueChange(initialStyling[i + 1], value, initialStyling[i + 2], directiveOwnerIndex) && addOrUpdateStaticStyle(i, initialStyling, prop, value, directiveOwnerIndex));
    addOrUpdateStaticStyle(null, initialStyling, prop, value, directiveOwnerIndex);
}
function renderInitialClasses(element, context, renderer, startIndex) {
    for (var initialClasses = context[4], i = startIndex || 2; i < initialClasses.length; ) initialClasses[i + 1] && setClass(element, initialClasses[i + 0], !0, renderer, null), 
    i += 3;
    return i;
}
function renderInitialStyles(element, context, renderer, startIndex) {
    for (var initialStyles = context[3], i = startIndex || 2; i < initialStyles.length; ) {
        var value = initialStyles[i + 1];
        value && setStyle(element, initialStyles[i + 0], value, renderer, null), i += 3;
    }
    return i;
}
function getMatchingBindingIndex(context, bindingName, start, end) {
    for (var j = start; j < end; j += 4) if (getProp(context, j) === bindingName) return j;
    return -1;
}
function patchStylingMapIntoContext(context, directiveIndex, playerBuilderIndex, ctxStart, ctxEnd, props, values, cacheValue, entryIsClassBased) {
    for (var dirty = !1, cacheIndex = 1 + 4 * directiveIndex, cachedValues = context[entryIsClassBased ? 6 : 7], ownershipValuesStartIndex = cachedValues[cacheIndex + 1], existingCachedValueCount = cachedValues[cacheIndex + 3], valuesEntryShapeChange = 1 === cachedValues[cacheIndex + 0] || !(cachedValues[cacheIndex + 2] || !cacheValue), totalUniqueValues = 0, totalNewAllocatedSlots = 0, applyAllProps = !0 === values, ctxIndex = ctxStart, totalRemainingProperties = props.length; ctxIndex < ownershipValuesStartIndex; ) {
        var currentProp = getProp(context, ctxIndex);
        if (totalRemainingProperties) for (var i = 0; i < props.length; i++) if ((normalizedProp = (mapProp = props[i]) ? entryIsClassBased ? mapProp : hyphenate(mapProp) : null) && currentProp === normalizedProp) {
            var currentValue = getValue(context, ctxIndex), currentDirectiveIndex = getDirectiveIndexFromEntry(context, ctxIndex), value = !!applyAllProps || values[normalizedProp], currentFlag = getPointers(context, ctxIndex);
            hasValueChanged(currentFlag, currentValue, value) && allowValueChange(currentValue, value, currentDirectiveIndex, directiveIndex) && (setValue(context, ctxIndex, value), 
            setPlayerBuilderIndex(context, ctxIndex, playerBuilderIndex, directiveIndex), hasInitialValueChanged(context, currentFlag, value) && (setDirty(context, ctxIndex, !0), 
            dirty = !0)), props[i] = null, totalRemainingProperties--;
            break;
        }
        ctxIndex += 4;
    }
    if (totalRemainingProperties) {
        var sanitizer = entryIsClassBased ? null : getStyleSanitizer(context, directiveIndex);
        propertiesLoop: for (i = 0; i < props.length; i++) {
            var mapProp;
            if (mapProp = props[i]) {
                value = !!applyAllProps || values[mapProp];
                for (var normalizedProp = entryIsClassBased ? mapProp : hyphenate(mapProp), isInsideOwnershipArea = ctxIndex >= ownershipValuesStartIndex, j = ctxIndex; j < ctxEnd; j += 4) if (getProp(context, j) === normalizedProp) {
                    var distantCtxDirectiveIndex = getDirectiveIndexFromEntry(context, j), distantCtxPlayerBuilderIndex = getPlayerBuilderIndex(context, j), distantCtxValue = getValue(context, j), distantCtxFlag = getPointers(context, j);
                    allowValueChange(distantCtxValue, value, distantCtxDirectiveIndex, directiveIndex) && (isInsideOwnershipArea && (swapMultiContextEntries(context, ctxIndex, j), 
                    totalUniqueValues++), hasValueChanged(distantCtxFlag, distantCtxValue, value) && ((null === value || void 0 === value && value !== distantCtxValue) && (valuesEntryShapeChange = !0), 
                    setValue(context, ctxIndex, value), (null !== distantCtxValue || hasInitialValueChanged(context, distantCtxFlag, value)) && (setDirty(context, ctxIndex, !0), 
                    dirty = !0)), distantCtxDirectiveIndex === directiveIndex && playerBuilderIndex === distantCtxPlayerBuilderIndex || setPlayerBuilderIndex(context, ctxIndex, playerBuilderIndex, directiveIndex)), 
                    ctxIndex += 4;
                    continue propertiesLoop;
                }
                null != value && (valuesEntryShapeChange = !0, totalUniqueValues++, insertNewMultiProperty(context, isInsideOwnershipArea ? ctxIndex : ownershipValuesStartIndex + 4 * totalNewAllocatedSlots, entryIsClassBased, normalizedProp, 1 | prepareInitialFlag(context, normalizedProp, entryIsClassBased, sanitizer), value, directiveIndex, playerBuilderIndex), 
                totalNewAllocatedSlots++, ctxEnd += 4, ctxIndex += 4, dirty = !0);
            }
        }
    }
    for (;ctxIndex < ctxEnd; ) {
        valuesEntryShapeChange = !0;
        var ctxValue = getValue(context, ctxIndex), ctxFlag = getPointers(context, ctxIndex);
        getDirectiveIndexFromEntry(context, ctxIndex), null != ctxValue && (valuesEntryShapeChange = !0), 
        hasValueChanged(ctxFlag, ctxValue, null) && (setValue(context, ctxIndex, null), 
        hasInitialValueChanged(context, ctxFlag, ctxValue) && (setDirty(context, ctxIndex, !0), 
        dirty = !0), setPlayerBuilderIndex(context, ctxIndex, playerBuilderIndex, directiveIndex)), 
        ctxIndex += 4;
    }
    return function(context, directiveIndex, entryIsClassBased, cacheValue, startPosition, endPosition, totalValues, dirtyFutureValues) {
        var values = context[entryIsClassBased ? 6 : 7], index = 1 + 4 * directiveIndex;
        if (dirtyFutureValues) for (var nextStartPosition = startPosition + 4 * totalValues, i = index + 4; i < values.length; i += 4) values[i + 1] = nextStartPosition, 
        values[i + 0] = 1;
        values[index + 0] = 0, values[index + 1] = startPosition, values[index + 2] = cacheValue, 
        values[index + 3] = totalValues;
        var totalStylingEntries = totalValues;
        for (i = 1; i < index; i += 4) totalStylingEntries += values[i + 3];
        if (!entryIsClassBased) {
            var classCache = context[6], diffInStartPosition = endPosition - classCache[2];
            for (i = 1; i < classCache.length; i += 4) classCache[i + 1] += diffInStartPosition;
        }
        values[0] = totalStylingEntries;
    }(context, directiveIndex, entryIsClassBased, cacheValue, ownershipValuesStartIndex, ctxEnd, totalUniqueValues, valuesEntryShapeChange = valuesEntryShapeChange || existingCachedValueCount !== totalUniqueValues), 
    dirty && (setContextDirty(context, !0), setDirectiveDirty(context, directiveIndex, !0)), 
    totalNewAllocatedSlots;
}
function updateSingleStylingValue(context, offset, input, isClassBased, directiveRef, forceOverride) {
    var directiveIndex = getDirectiveIndexFromRegistry(context, directiveRef || null), singleIndex = function(context, directiveIndex, offset, isClassBased) {
        var singlePropOffsetRegistryIndex = context[2][4 * directiveIndex + 1], offsets = context[5];
        return offsets[singlePropOffsetRegistryIndex + 2 + (isClassBased ? offsets[singlePropOffsetRegistryIndex + 0] : 0) + offset];
    }(context, directiveIndex, offset, isClassBased), currValue = getValue(context, singleIndex), currFlag = getPointers(context, singleIndex), currDirective = getDirectiveIndexFromEntry(context, singleIndex), value = input instanceof BoundPlayerFactory ? input.value : input;
    if (hasValueChanged(currFlag, currValue, value) && (forceOverride || allowValueChange(currValue, value, currDirective, directiveIndex))) {
        var playerBuilder = input instanceof BoundPlayerFactory ? new ClassAndStylePlayerBuilder(input, context[0], 2 == (2 & currFlag) ? 1 : 2) : null, value_1 = playerBuilder ? input.value : input, currPlayerIndex = getPlayerBuilderIndex(context, singleIndex), playerBuildersAreDirty = !1, playerBuilderIndex = playerBuilder ? currPlayerIndex : 0;
        if (hasPlayerBuilderChanged(context, playerBuilder, currPlayerIndex)) {
            var newIndex = setPlayerBuilder(context, playerBuilder, currPlayerIndex);
            playerBuilderIndex = playerBuilder ? newIndex : 0, playerBuildersAreDirty = !0;
        }
        if ((playerBuildersAreDirty || currDirective !== directiveIndex) && setPlayerBuilderIndex(context, singleIndex, playerBuilderIndex, directiveIndex), 
        currDirective !== directiveIndex) {
            var prop = getProp(context, singleIndex), sanitizer = getStyleSanitizer(context, directiveIndex);
            !function(context, index, sanitizeYes) {
                sanitizer && sanitizer(prop) ? context[index] |= 4 : context[index] &= -5;
            }(context, singleIndex);
        }
        setValue(context, singleIndex, value_1);
        var indexForMulti = getMultiOrSingleIndex(currFlag), valueForMulti = getValue(context, indexForMulti);
        if (!valueForMulti || hasValueChanged(currFlag, valueForMulti, value_1)) {
            var multiDirty = !1, singleDirty = !0;
            !valueExists(value_1) && valueExists(valueForMulti) && (multiDirty = !0, singleDirty = !1), 
            setDirty(context, indexForMulti, multiDirty), setDirty(context, singleIndex, singleDirty), 
            setDirectiveDirty(context, directiveIndex, !0), setContextDirty(context, !0);
        }
        playerBuildersAreDirty && setContextPlayersDirty(context, !0);
    }
}
function setStyle(native, prop, value, renderer, sanitizer, store, playerBuilder) {
    value = sanitizer && value ? sanitizer(prop, value) : value, store || playerBuilder ? (store && store.setValue(prop, value), 
    playerBuilder && playerBuilder.setValue(prop, value)) : value ? (value = value.toString(), 
    isProceduralRenderer(renderer) ? renderer.setStyle(native, prop, value, RendererStyleFlags3.DashCase) : native.style.setProperty(prop, value)) : isProceduralRenderer(renderer) ? renderer.removeStyle(native, prop, RendererStyleFlags3.DashCase) : native.style.removeProperty(prop);
}
function setClass(native, className, add, renderer, store, playerBuilder) {
    store || playerBuilder ? (store && store.setValue(className, add), playerBuilder && playerBuilder.setValue(className, add)) : "" !== className && (add ? isProceduralRenderer(renderer) ? renderer.addClass(native, className) : native.classList.add(className) : isProceduralRenderer(renderer) ? renderer.removeClass(native, className) : native.classList.remove(className));
}
function setDirty(context, index, isDirtyYes) {
    var adjustedIndex = index >= 9 ? index + 0 : index;
    isDirtyYes ? context[adjustedIndex] |= 1 : context[adjustedIndex] &= -2;
}
function isDirty(context, index) {
    return 1 == (1 & context[index >= 9 ? index + 0 : index]);
}
function isClassBasedValue(context, index) {
    return 2 == (2 & context[index >= 9 ? index + 0 : index]);
}
function isSanitizable(context, index) {
    return 4 == (4 & context[index >= 9 ? index + 0 : index]);
}
function pointers(configFlag, staticIndex, dynamicIndex) {
    return 31 & configFlag | staticIndex << 5 | dynamicIndex << 19;
}
function getInitialValue(context, flag) {
    var index = getInitialIndex(flag);
    return (2 & flag ? context[4] : context[3])[index];
}
function getInitialIndex(flag) {
    return flag >> 5 & 16383;
}
function getMultiOrSingleIndex(flag) {
    var index = flag >> 19 & 16383;
    return index >= 9 ? index : -1;
}
function getMultiClassesStartIndex(context) {
    return context[6][2];
}
function getMultiStylesStartIndex(context) {
    return context[7][2];
}
function setProp(context, index, prop) {
    context[index + 1] = prop;
}
function setValue(context, index, value) {
    context[index + 2] = value;
}
function hasPlayerBuilderChanged(context, builder, index) {
    var playerContext = context[8];
    if (builder) {
        if (!playerContext || 0 === index) return !0;
    } else if (!playerContext) return !1;
    return playerContext[index] !== builder;
}
function setPlayerBuilder(context, builder, insertionIndex) {
    var playerContext = context[8] || (context[8] = [ 5, null, null, null, null ]);
    return insertionIndex > 0 ? playerContext[insertionIndex] = builder : (playerContext.splice(insertionIndex = playerContext[0], 0, builder, null), 
    playerContext[0] += 2), insertionIndex;
}
function setPlayerBuilderIndex(context, index, playerBuilderIndex, directiveIndex) {
    var value = function(directiveIndex, playerIndex) {
        return playerBuilderIndex << 16 | directiveIndex;
    }(directiveIndex);
    context[index + 3] = value;
}
function getPlayerBuilderIndex(context, index) {
    return context[index + 3] >> 16 & 65535;
}
function getPlayerBuilder(context, index) {
    var playerBuilderIndex = getPlayerBuilderIndex(context, index);
    if (playerBuilderIndex) {
        var playerContext = context[8];
        if (playerContext) return playerContext[playerBuilderIndex];
    }
    return null;
}
function setFlag(context, index, flag) {
    context[1 === index ? index : index + 0] = flag;
}
function getPointers(context, index) {
    return context[1 === index ? index : index + 0];
}
function getValue(context, index) {
    return context[index + 2];
}
function getProp(context, index) {
    return context[index + 1];
}
function setContextDirty(context, isDirtyYes) {
    setDirty(context, 1, isDirtyYes);
}
function setContextPlayersDirty(context, isDirtyYes) {
    isDirtyYes ? context[1] |= 8 : context[1] &= -9;
}
function swapMultiContextEntries(context, indexA, indexB) {
    if (indexA !== indexB) {
        var tmpValue = getValue(context, indexA), tmpProp = getProp(context, indexA), tmpFlag = getPointers(context, indexA), tmpPlayerBuilderIndex = getPlayerBuilderIndex(context, indexA), tmpDirectiveIndex = getDirectiveIndexFromEntry(context, indexA), flagA = tmpFlag, flagB = getPointers(context, indexB), singleIndexA = getMultiOrSingleIndex(flagA);
        singleIndexA >= 0 && setFlag(context, singleIndexA, pointers(_flag = getPointers(context, singleIndexA), getInitialIndex(_flag), indexB));
        var _flag, singleIndexB = getMultiOrSingleIndex(flagB);
        singleIndexB >= 0 && setFlag(context, singleIndexB, pointers(_flag = getPointers(context, singleIndexB), getInitialIndex(_flag), indexA)), 
        setValue(context, indexA, getValue(context, indexB)), setProp(context, indexA, getProp(context, indexB)), 
        setFlag(context, indexA, getPointers(context, indexB)), setPlayerBuilderIndex(context, indexA, getPlayerBuilderIndex(context, indexB), getDirectiveIndexFromEntry(context, indexB)), 
        setValue(context, indexB, tmpValue), setProp(context, indexB, tmpProp), setFlag(context, indexB, tmpFlag), 
        setPlayerBuilderIndex(context, indexB, tmpPlayerBuilderIndex, tmpDirectiveIndex);
    }
}
function insertNewMultiProperty(context, index, classBased, name, flag, value, directiveIndex, playerIndex) {
    var doShift = index < context.length;
    context.splice(index, 0, 1 | flag | (classBased ? 2 : 0), name, value, 0), setPlayerBuilderIndex(context, index, playerIndex, directiveIndex), 
    doShift && function(context, indexStartPosition) {
        for (var i = index + 4; i < context.length; i += 4) {
            var singleIndex = getMultiOrSingleIndex(getPointers(context, i));
            if (singleIndex > 0) {
                var initialIndexForSingle = getInitialIndex(getPointers(context, singleIndex));
                setFlag(context, singleIndex, pointers((isDirty(context, singleIndex) ? 1 : 0) | (isClassBasedValue(context, singleIndex) ? 2 : 0) | (isSanitizable(context, singleIndex) ? 4 : 0), initialIndexForSingle, i));
            }
        }
    }(context);
}
function valueExists(value, isClassBased) {
    return null !== value;
}
function prepareInitialFlag(context, prop, entryIsClassBased, sanitizer) {
    var initialIndex, flag = sanitizer && sanitizer(prop) ? 4 : 0;
    return entryIsClassBased ? (flag |= 2, initialIndex = getInitialStylingValuesIndexOf(context[4], prop)) : initialIndex = getInitialStylingValuesIndexOf(context[3], prop), 
    pointers(flag, initialIndex = initialIndex > 0 ? initialIndex + 1 : 0, 0);
}
function hasInitialValueChanged(context, flag, newValue) {
    var initialValue = getInitialValue(context, flag);
    return !initialValue || hasValueChanged(flag, initialValue, newValue);
}
function hasValueChanged(flag, a, b) {
    return !(2 & flag) && a && b && 4 & flag ? a.toString() !== b.toString() : a !== b;
}
var ClassAndStylePlayerBuilder = function() {
    function ClassAndStylePlayerBuilder(factory, _element, _type) {
        this._element = _element, this._type = _type, this._values = {}, this._dirty = !1, 
        this._factory = factory;
    }
    return ClassAndStylePlayerBuilder.prototype.setValue = function(prop, value) {
        this._values[prop] !== value && (this._values[prop] = value, this._dirty = !0);
    }, ClassAndStylePlayerBuilder.prototype.buildPlayer = function(currentPlayer, isFirstRender) {
        if (this._dirty) {
            var player = this._factory.fn(this._element, this._type, this._values, isFirstRender, currentPlayer || null);
            return this._values = {}, this._dirty = !1, player;
        }
    }, ClassAndStylePlayerBuilder;
}();
function getDirectiveIndexFromEntry(context, index) {
    return 65535 & context[index + 3];
}
function getDirectiveIndexFromRegistry(context, directiveRef) {
    var directiveIndex, dirs = context[2], index = getDirectiveRegistryValuesIndexOf(dirs, directiveRef);
    if (-1 === index) {
        directiveIndex = (index = dirs.length) > 0 ? index / 4 : 0, dirs.push(null, null, null, null), 
        dirs[index + 0] = directiveRef, dirs[index + 2] = !1, dirs[index + 1] = -1;
        var classesStartIndex = getMultiClassesStartIndex(context) || 9;
        registerMultiMapEntry(context, directiveIndex, !0, context.length), registerMultiMapEntry(context, directiveIndex, !1, classesStartIndex);
    } else directiveIndex = index > 0 ? index / 4 : 0;
    return directiveIndex;
}
function getDirectiveRegistryValuesIndexOf(directives, directive) {
    for (var i = 0; i < directives.length; i += 4) if (directives[i] === directive) return i;
    return -1;
}
function getInitialStylingValuesIndexOf(keyValues, key) {
    for (var i = 2; i < keyValues.length; i += 3) if (keyValues[i] === key) return i;
    return -1;
}
function getStyleSanitizer(context, directiveIndex) {
    var dirs = context[2];
    return dirs[4 * directiveIndex + 3] || dirs[3] || null;
}
function setDirectiveDirty(context, directiveIndex, dirtyYes) {
    context[2][4 * directiveIndex + 2] = dirtyYes;
}
function allowValueChange(currentValue, newValue, currentDirectiveOwner, newDirectiveOwner) {
    return null == currentValue || (null != newValue ? newDirectiveOwner <= currentDirectiveOwner : currentDirectiveOwner === newDirectiveOwner);
}
function getInitialClassNameValue(context) {
    var initialClassValues = context[4], className = initialClassValues[1];
    if (null === className) {
        className = "";
        for (var i = 2; i < initialClassValues.length; i += 3) initialClassValues[i + 1] && (className += (className.length ? " " : "") + initialClassValues[i]);
        initialClassValues[1] = className;
    }
    return className;
}
function readCachedMapValue(context, entryIsClassBased, directiveIndex) {
    return context[entryIsClassBased ? 6 : 7][1 + 4 * directiveIndex + 2] || null;
}
function isMultiValueCacheHit(context, entryIsClassBased, directiveIndex, newValue) {
    return !context[entryIsClassBased ? 6 : 7][1 + 4 * directiveIndex + 0] && (newValue === NO_CHANGE || readCachedMapValue(context, entryIsClassBased, directiveIndex) === newValue);
}
function hyphenate(value) {
    return value.replace(/[a-z][A-Z]/g, function(match) {
        return match.charAt(0) + "-" + match.charAt(1).toLowerCase();
    });
}
function registerMultiMapEntry(context, directiveIndex, entryIsClassBased, startPosition, count) {
    void 0 === count && (count = 0);
    var cachedValues = context[entryIsClassBased ? 6 : 7];
    if (directiveIndex > 0) for (var limit = 1 + 4 * directiveIndex; cachedValues.length < limit; ) cachedValues.push(0, startPosition, null, 0);
    cachedValues.push(0, startPosition, null, count);
}
function addOrUpdateStaticStyle(index, staticStyles, prop, value, directiveOwnerIndex) {
    return null === index && (index = staticStyles.length, staticStyles.push(null, null, null), 
    staticStyles[index + 0] = prop), staticStyles[index + 1] = value, staticStyles[index + 2] = directiveOwnerIndex, 
    index;
}
var NG_TEMPLATE_SELECTOR = "ng-template";
function isCssClassMatching(nodeClassAttrVal, cssClassToMatch) {
    var nodeClassesLen = nodeClassAttrVal.length, matchIndex = nodeClassAttrVal.indexOf(cssClassToMatch), matchEndIdx = matchIndex + cssClassToMatch.length;
    return !(-1 === matchIndex || matchIndex > 0 && " " !== nodeClassAttrVal[matchIndex - 1] || matchEndIdx < nodeClassesLen && " " !== nodeClassAttrVal[matchEndIdx]);
}
function hasTagAndTypeMatch(tNode, currentSelector, isProjectionMode) {
    return currentSelector === (0 !== tNode.type || isProjectionMode ? tNode.tagName : NG_TEMPLATE_SELECTOR);
}
function isNodeMatchingSelector(tNode, selector, isProjectionMode) {
    for (var mode = 4, nodeAttrs = tNode.attrs || [], nameOnlyMarkerIdx = function(nodeAttrs) {
        for (var i = 0; i < nodeAttrs.length; i++) if (isNameOnlyAttributeMarker(nodeAttrs[i])) return i;
        return nodeAttrs.length;
    }(nodeAttrs), skipToNextSelector = !1, i = 0; i < selector.length; i++) {
        var current = selector[i];
        if ("number" != typeof current) {
            if (!skipToNextSelector) if (4 & mode) {
                if (mode = 2 | 1 & mode, "" !== current && !hasTagAndTypeMatch(tNode, current, isProjectionMode) || "" === current && 1 === selector.length) {
                    if (isPositive(mode)) return !1;
                    skipToNextSelector = !0;
                }
            } else {
                var selectorAttrValue = 8 & mode ? current : selector[++i];
                if (8 & mode && tNode.stylingTemplate) {
                    if (!isCssClassMatching(readClassValueFromTNode(tNode), selectorAttrValue)) {
                        if (isPositive(mode)) return !1;
                        skipToNextSelector = !0;
                    }
                    continue;
                }
                var attrIndexInNode = findAttrIndexInNode(8 & mode ? "class" : current, nodeAttrs, 0 == tNode.type && tNode.tagName !== NG_TEMPLATE_SELECTOR, isProjectionMode);
                if (-1 === attrIndexInNode) {
                    if (isPositive(mode)) return !1;
                    skipToNextSelector = !0;
                    continue;
                }
                if ("" !== selectorAttrValue) {
                    var nodeAttrValue;
                    nodeAttrValue = attrIndexInNode > nameOnlyMarkerIdx ? "" : nodeAttrs[attrIndexInNode + 1];
                    var compareAgainstClassName = 8 & mode ? nodeAttrValue : null;
                    if (compareAgainstClassName && !isCssClassMatching(compareAgainstClassName, selectorAttrValue) || 2 & mode && selectorAttrValue !== nodeAttrValue) {
                        if (isPositive(mode)) return !1;
                        skipToNextSelector = !0;
                    }
                }
            }
        } else {
            if (!skipToNextSelector && !isPositive(mode) && !isPositive(current)) return !1;
            if (skipToNextSelector && isPositive(current)) continue;
            skipToNextSelector = !1, mode = current | 1 & mode;
        }
    }
    return isPositive(mode) || skipToNextSelector;
}
function isPositive(mode) {
    return 0 == (1 & mode);
}
function readClassValueFromTNode(tNode) {
    return tNode.stylingTemplate ? getInitialClassNameValue(tNode.stylingTemplate) : "";
}
function findAttrIndexInNode(name, attrs, isInlineTemplate, isProjectionMode) {
    if (null === attrs) return -1;
    var i = 0;
    if (isProjectionMode || !isInlineTemplate) {
        for (var bindingsMode = !1; i < attrs.length; ) {
            var maybeAttrName = attrs[i];
            if (maybeAttrName === name) return i;
            if (3 === maybeAttrName) bindingsMode = !0; else {
                if (4 === maybeAttrName) break;
                if (0 === maybeAttrName) {
                    i += 4;
                    continue;
                }
            }
            i += bindingsMode ? 1 : 2;
        }
        return -1;
    }
    return function(attrs, name) {
        var i = attrs.indexOf(4);
        if (i > -1) for (i++; i < attrs.length; ) {
            if (attrs[i] === name) return i;
            i++;
        }
        return -1;
    }(attrs, name);
}
function isNodeMatchingSelectorList(tNode, selector, isProjectionMode) {
    void 0 === isProjectionMode && (isProjectionMode = !1);
    for (var i = 0; i < selector.length; i++) if (isNodeMatchingSelector(tNode, selector[i], isProjectionMode)) return !0;
    return !1;
}
function matchingProjectionSelectorIndex(tNode, selectors, textSelectors) {
    for (var ngProjectAsAttrVal = function(tNode) {
        var nodeAttrs = tNode.attrs;
        if (null != nodeAttrs) {
            var ngProjectAsAttrIdx = nodeAttrs.indexOf(NG_PROJECT_AS_ATTR_NAME);
            if (0 == (1 & ngProjectAsAttrIdx)) return nodeAttrs[ngProjectAsAttrIdx + 1];
        }
        return null;
    }(tNode), i = 0; i < selectors.length; i++) if (ngProjectAsAttrVal === textSelectors[i] || null === ngProjectAsAttrVal && isNodeMatchingSelectorList(tNode, selectors[i], !0)) return i + 1;
    return 0;
}
var _CLEAN_PROMISE = Promise.resolve(null);
function refreshDescendantViews(lView) {
    var tView = lView[TVIEW], creationMode = isCreationMode(lView);
    if (tView.firstTemplatePass = !1, lView[BINDING_INDEX] = tView.bindingStartIndex, 
    !creationMode) {
        var checkNoChangesMode = getCheckNoChangesMode();
        executePreOrderHooks(lView, tView, checkNoChangesMode, void 0), function(lView) {
            for (var current = lView[CHILD_HEAD]; null !== current; current = current[NEXT]) if (current.length < HEADER_OFFSET && -1 === current[ACTIVE_INDEX]) for (var container = current, i = 0; i < container[VIEWS].length; i++) {
                var dynamicViewData = container[VIEWS][i];
                renderEmbeddedTemplate(dynamicViewData, dynamicViewData[TVIEW], dynamicViewData[CONTEXT]);
            }
        }(lView), refreshContentQueries(tView, lView), resetPreOrderHookFlags(lView), executeHooks(lView, tView.contentHooks, tView.contentCheckHooks, checkNoChangesMode, 1, void 0), 
        function(tView, viewData) {
            if (tView.expandoInstructions) {
                var bindingRootIndex = viewData[BINDING_INDEX] = tView.expandoStartIndex;
                setBindingRoot(bindingRootIndex);
                for (var currentDirectiveIndex = -1, currentElementIndex = -1, i = 0; i < tView.expandoInstructions.length; i++) {
                    var instruction = tView.expandoInstructions[i];
                    if ("number" == typeof instruction) {
                        if (instruction <= 0) {
                            currentElementIndex = -instruction;
                            var providerCount = tView.expandoInstructions[++i];
                            currentDirectiveIndex = bindingRootIndex += INJECTOR_BLOOM_PARENT_SIZE + providerCount;
                        } else bindingRootIndex += instruction;
                        setBindingRoot(bindingRootIndex);
                    } else {
                        if (null !== instruction) {
                            viewData[BINDING_INDEX] = bindingRootIndex;
                            var hostCtx = unwrapRNode(viewData[currentDirectiveIndex]);
                            setActiveHost(hostCtx, currentElementIndex), instruction(2, hostCtx, currentElementIndex), 
                            setActiveHost(null);
                        }
                        currentDirectiveIndex++;
                    }
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
    if (null != tView.contentQueries) {
        setCurrentQueryIndex(0);
        for (var i = 0; i < tView.contentQueries.length; i++) {
            var directiveDefIdx = tView.contentQueries[i];
            tView.data[directiveDefIdx].contentQueries(2, lView[directiveDefIdx], directiveDefIdx);
        }
    }
}
function elementCreate(name, overriddenRenderer) {
    var rendererToUse = overriddenRenderer || getLView()[RENDERER], namespace = _currentNamespace;
    return isProceduralRenderer(rendererToUse) ? rendererToUse.createElement(name, namespace) : null === namespace ? rendererToUse.createElement(name) : rendererToUse.createElementNS(namespace, name);
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
function assignTViewNodeToLView(tView, tParentNode, index, lView) {
    var tNode = tView.node;
    return null == tNode && (tView.node = tNode = createTNode(tParentNode, 2, index, null, null)), 
    lView[T_HOST] = tNode;
}
function renderEmbeddedTemplate(viewToRender, tView, context) {
    var oldView, _isParent = getIsParent(), _previousOrParentTNode = getPreviousOrParentTNode();
    if (512 & viewToRender[FLAGS]) tickRootContext(getRootContext(viewToRender)); else try {
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
function createDirectivesAndLocals(tView, lView, localRefs, localRefExtractor) {
    if (void 0 === localRefExtractor && (localRefExtractor = getNativeByTNode), bindingsEnabled) {
        var previousOrParentTNode = getPreviousOrParentTNode();
        tView.firstTemplatePass && function(tView, viewData, directives, tNode, localRefs) {
            var exportsMap = localRefs ? {
                "": -1
            } : null;
            if (directives) {
                initNodeFlags(tNode, tView.data.length, directives.length);
                for (var i = 0; i < directives.length; i++) (def = directives[i]).providersResolver && def.providersResolver(def);
                generateExpandoInstructionBlock(tView, tNode, directives.length);
                var initialPreOrderHooksLength = tView.preOrderHooks && tView.preOrderHooks.length || 0, initialPreOrderCheckHooksLength = tView.preOrderCheckHooks && tView.preOrderCheckHooks.length || 0, nodeIndex = tNode.index - HEADER_OFFSET;
                for (i = 0; i < directives.length; i++) {
                    var def, directiveDefIdx = tView.data.length;
                    baseResolveDirective(tView, viewData, def = directives[i], def.factory), saveNameToExportMap(tView.data.length - 1, def, exportsMap), 
                    registerPreOrderHooks(directiveDefIdx, def, tView, nodeIndex, initialPreOrderHooksLength, initialPreOrderCheckHooksLength);
                }
            }
            exportsMap && function(tNode, localRefs, exportsMap) {
                if (localRefs) for (var localNames = tNode.localNames = [], i = 0; i < localRefs.length; i += 2) {
                    var index = exportsMap[localRefs[i + 1]];
                    if (null == index) throw new Error("Export of name '" + localRefs[i + 1] + "' not found!");
                    localNames.push(localRefs[i], index);
                }
            }(tNode, localRefs, exportsMap);
        }(tView, lView, function(tView, viewData, tNode) {
            var registry = tView.directiveRegistry, matches = null;
            if (registry) for (var i = 0; i < registry.length; i++) {
                var def = registry[i];
                isNodeMatchingSelectorList(tNode, def.selectors, !1) && (matches || (matches = []), 
                diPublicInInjector(getOrCreateNodeInjectorForNode(getPreviousOrParentTNode(), viewData), viewData, def.type), 
                isComponentDef(def) ? (1 & tNode.flags && throwMultipleComponentError(tNode), tNode.flags = 1, 
                matches.unshift(def)) : matches.push(def));
            }
            return matches;
        }(tView, lView, previousOrParentTNode), previousOrParentTNode, localRefs || null), 
        function(tView, lView, tNode) {
            var start = tNode.directiveStart, end = tNode.directiveEnd;
            !tView.firstTemplatePass && start < end && getOrCreateNodeInjectorForNode(tNode, lView);
            for (var i = start; i < end; i++) {
                var def = tView.data[i];
                isComponentDef(def) && addComponentLogic(lView, tNode, def), postProcessDirective(lView, getNodeInjectable(tView.data, lView, i, tNode), def, i);
            }
        }(tView, lView, previousOrParentTNode), function(tView, viewData, tNode) {
            for (var end = tNode.directiveEnd, expando = tView.expandoInstructions, firstTemplatePass = tView.firstTemplatePass, i = tNode.directiveStart; i < end; i++) {
                var def = tView.data[i];
                def.hostBindings ? invokeHostBindingsInCreationMode(def, expando, viewData[i], tNode, firstTemplatePass) : firstTemplatePass && expando.push(null);
            }
        }(tView, lView, previousOrParentTNode), function(viewData, tNode, localRefExtractor) {
            var localNames = tNode.localNames;
            if (localNames) for (var localIndex = tNode.index + 1, i = 0; i < localNames.length; i += 2) {
                var index = localNames[i + 1], value = -1 === index ? localRefExtractor(tNode, viewData) : viewData[index];
                viewData[localIndex++] = value;
            }
        }(lView, previousOrParentTNode, localRefExtractor);
    }
}
function getOrCreateTView(templateFn, consts, vars, directives, pipes, viewQuery, schemas) {
    return templateFn.ngPrivateData || (templateFn.ngPrivateData = createTView(-1, templateFn, consts, vars, directives, pipes, viewQuery, schemas));
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
function generatePropertyAliases(tNode, direction) {
    var tView = getLView()[TVIEW], propStore = null, start = tNode.directiveStart, end = tNode.directiveEnd;
    if (end > start) for (var isInput = 0 === direction, defs = tView.data, i = start; i < end; i++) {
        var directiveDef = defs[i], propertyAliasMap = isInput ? directiveDef.inputs : directiveDef.outputs;
        for (var publicName in propertyAliasMap) if (propertyAliasMap.hasOwnProperty(publicName)) {
            var internalName = propertyAliasMap[publicName];
            (propStore = propStore || {}).hasOwnProperty(publicName) ? propStore[publicName].push(i, publicName, internalName) : propStore[publicName] = [ i, publicName, internalName ];
        }
    }
    return propStore;
}
function invokeHostBindingsInCreationMode(def, expando, directive, tNode, firstTemplatePass) {
    var previousExpandoLength = expando.length;
    setCurrentDirectiveDef(def);
    var elementIndex = tNode.index - HEADER_OFFSET;
    setActiveHost(directive, elementIndex), def.hostBindings(1, directive, elementIndex), 
    setActiveHost(null), setCurrentDirectiveDef(null), previousExpandoLength === expando.length && firstTemplatePass && expando.push(def.hostBindings);
}
function generateExpandoInstructionBlock(tView, tNode, directiveCount) {
    var elementIndex = -(tNode.index - HEADER_OFFSET), providerCount = tView.data.length - (65535 & tNode.providerIndexes);
    (tView.expandoInstructions || (tView.expandoInstructions = [])).push(elementIndex, providerCount, directiveCount);
}
function postProcessDirective(viewData, directive, def, directiveDefIdx) {
    var previousOrParentTNode = getPreviousOrParentTNode();
    postProcessBaseDirective(viewData, previousOrParentTNode, directive), previousOrParentTNode && previousOrParentTNode.attrs && function(directiveIndex, instance, def, tNode) {
        var initialInputData = previousOrParentTNode.initialInputs;
        (void 0 === initialInputData || directiveIndex >= initialInputData.length) && (initialInputData = function(directiveIndex, inputs, tNode) {
            var initialInputData = tNode.initialInputs || (tNode.initialInputs = []);
            initialInputData[directiveIndex] = null;
            for (var attrs = tNode.attrs, i = 0; i < attrs.length; ) {
                var attrName = attrs[i];
                if (0 !== attrName) {
                    if ("number" == typeof attrName) break;
                    var minifiedInputName = inputs[attrName], attrValue = attrs[i + 1];
                    void 0 !== minifiedInputName && (initialInputData[directiveIndex] || (initialInputData[directiveIndex] = [])).push(attrName, minifiedInputName, attrValue), 
                    i += 2;
                } else i += 4;
            }
            return initialInputData;
        }(directiveIndex, def.inputs, previousOrParentTNode));
        var initialInputs = initialInputData[directiveIndex];
        if (initialInputs) for (var setInput = def.setInput, i = 0; i < initialInputs.length; ) {
            var publicName = initialInputs[i++], privateName = initialInputs[i++], value = initialInputs[i++];
            setInput ? def.setInput(instance, value, publicName, privateName) : instance[privateName] = value;
        }
    }(directiveDefIdx, directive, def), viewData[TVIEW].firstTemplatePass && def.contentQueries && (previousOrParentTNode.flags |= 4), 
    isComponentDef(def) && (getComponentViewByIndex(previousOrParentTNode.index, viewData)[CONTEXT] = directive);
}
function postProcessBaseDirective(lView, previousOrParentTNode, directive) {
    var native = getNativeByTNode(previousOrParentTNode, lView);
    attachPatchData(directive, lView), native && attachPatchData(native, lView);
}
function queueComponentIndexForCheck(previousOrParentTNode) {
    var tView = getLView()[TVIEW];
    (tView.components || (tView.components = [])).push(previousOrParentTNode.index);
}
function saveNameToExportMap(index, def, exportsMap) {
    if (exportsMap) {
        if (def.exportAs) for (var i = 0; i < def.exportAs.length; i++) exportsMap[def.exportAs[i]] = index;
        def.template && (exportsMap[""] = index);
    }
}
function initNodeFlags(tNode, index, numberOfDirectives) {
    tNode.flags = 1 & tNode.flags, tNode.directiveStart = index, tNode.directiveEnd = index + numberOfDirectives, 
    tNode.providerIndexes = index;
}
function baseResolveDirective(tView, viewData, def, directiveFactory) {
    tView.data.push(def);
    var nodeInjectorFactory = new NodeInjectorFactory(directiveFactory, isComponentDef(def), null);
    tView.blueprint.push(nodeInjectorFactory), viewData.push(nodeInjectorFactory);
}
function addComponentLogic(lView, previousOrParentTNode, def) {
    var native = getNativeByTNode(previousOrParentTNode, lView), componentView = addToViewTree(lView, createLView(lView, getOrCreateTView(def.template, def.consts, def.vars, def.directiveDefs, def.pipeDefs, def.viewQuery, def.schemas), null, def.onPush ? 64 : 16, lView[previousOrParentTNode.index], previousOrParentTNode, lView[RENDERER_FACTORY], lView[RENDERER_FACTORY].createRenderer(native, def)));
    componentView[T_HOST] = previousOrParentTNode, lView[previousOrParentTNode.index] = componentView, 
    lView[TVIEW].firstTemplatePass && queueComponentIndexForCheck(previousOrParentTNode);
}
function createLContainer(hostNative, currentView, native, tNode, isForViewContainerRef) {
    return [ hostNative, !0, isForViewContainerRef ? -1 : 0, currentView, null, null, tNode, native, [] ];
}
function addToViewTree(lView, lViewOrLContainer) {
    return lView[CHILD_HEAD] ? lView[CHILD_TAIL][NEXT] = lViewOrLContainer : lView[CHILD_HEAD] = lViewOrLContainer, 
    lView[CHILD_TAIL] = lViewOrLContainer, lViewOrLContainer;
}
function markViewDirty(lView) {
    for (;lView; ) {
        lView[FLAGS] |= 64;
        var parent_2 = getLViewParent(lView);
        if (isRootView(lView) && !parent_2) return lView;
        lView = parent_2;
    }
    return null;
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
        throw handleError(view, error), error;
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
    viewQuery && (setCurrentQueryIndex(tView.viewQueryStartIndex), viewQuery(flags, component));
}
function storeBindingMetadata(lView, prefix, suffix) {
    void 0 === prefix && (prefix = ""), void 0 === suffix && (suffix = "");
    var tData = lView[TVIEW].data, lastBindingIndex = lView[BINDING_INDEX] - 1;
    return null == tData[lastBindingIndex] ? tData[lastBindingIndex] = INTERPOLATION_DELIMITER + prefix + INTERPOLATION_DELIMITER + suffix : null;
}
var CLEAN_PROMISE = _CLEAN_PROMISE;
function initializeTNodeInputs(tNode) {
    return tNode ? (void 0 === tNode.inputs && (tNode.inputs = generatePropertyAliases(tNode, 0)), 
    tNode.inputs) : null;
}
function getCleanup(view) {
    return view[CLEANUP] || (view[CLEANUP] = []);
}
function getTViewCleanup(view) {
    return view[TVIEW].cleanup || (view[TVIEW].cleanup = []);
}
function loadComponentRenderer(tNode, lView) {
    return lView[tNode.index][RENDERER];
}
function handleError(lView, error) {
    var injector = lView[INJECTOR$1], errorHandler = injector ? injector.get(ErrorHandler, null) : null;
    errorHandler && errorHandler.handleError(error);
}
function setInputsForProperty(lView, inputs, value) {
    for (var tView = lView[TVIEW], i = 0; i < inputs.length; ) {
        var index = inputs[i++], publicName = inputs[i++], privateName = inputs[i++], instance = lView[index], def = tView.data[index];
        def.setInput ? def.setInput(instance, value, publicName, privateName) : instance[privateName] = value;
    }
}
function applyOnCreateInstructions(tNode) {
    var fns;
    if (fns = tNode.onElementCreationFns) {
        for (var i = 0; i < fns.length; i++) fns[i]();
        tNode.onElementCreationFns = null;
    }
}
function allocHostVars(count) {
    var lView = getLView(), tView = lView[TVIEW];
    tView.firstTemplatePass && (function(tView, def, hostVars) {
        var expando = tView.expandoInstructions, length = expando.length;
        length >= 2 && expando[length - 2] === def.hostBindings ? expando[length - 1] = expando[length - 1] + hostVars : expando.push(def.hostBindings, hostVars);
    }(tView, currentDirectiveDef, count), function(tView, lView, totalHostVars) {
        for (var i = 0; i < totalHostVars; i++) lView.push(NO_CHANGE), tView.blueprint.push(NO_CHANGE), 
        tView.data.push(null);
    }(tView, lView, count));
}
function getLContainer(tNode, embeddedView) {
    var container = embeddedView[PARENT];
    return -1 === tNode.index ? isLContainer(container) ? container : null : container;
}
function getContainerRenderParent(tViewNode, view) {
    var container = getLContainer(tViewNode, view);
    return container ? nativeParentNode(view[RENDERER], container[NATIVE]) : null;
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
function addRemoveViewFromContainer(viewToWalk, insertMode, beforeNode) {
    var renderParent = getContainerRenderParent(viewToWalk[TVIEW].node, viewToWalk);
    renderParent && walkTNodeTree(viewToWalk, insertMode ? 0 : 1, viewToWalk[RENDERER], renderParent, beforeNode);
}
function insertView(lView, lContainer, index) {
    var views = lContainer[VIEWS];
    index > 0 && (views[index - 1][NEXT] = lView), index < views.length ? (lView[NEXT] = views[index], 
    views.splice(index, 0, lView)) : (views.push(lView), lView[NEXT] = null), lView[PARENT] = lContainer, 
    lView[QUERIES] && lView[QUERIES].insertView(index), lView[FLAGS] |= 128;
}
function detachView(lContainer, removeIndex) {
    var views = lContainer[VIEWS], viewToDetach = views[removeIndex];
    return removeIndex > 0 && (views[removeIndex - 1][NEXT] = viewToDetach[NEXT]), views.splice(removeIndex, 1), 
    addRemoveViewFromContainer(viewToDetach, !1), 128 & viewToDetach[FLAGS] && !(256 & viewToDetach[FLAGS]) && viewToDetach[QUERIES] && viewToDetach[QUERIES].removeView(), 
    viewToDetach[PARENT] = null, viewToDetach[NEXT] = null, viewToDetach[FLAGS] &= -129, 
    viewToDetach;
}
function destroyLView(view) {
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
        viewAttachedToContainer(view) && view[QUERIES] && view[QUERIES].removeView();
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
        var parent = function(tNode) {
            for (;null != tNode.parent && (4 === tNode.parent.type || 5 === tNode.parent.type); ) tNode = tNode.parent;
            return tNode;
        }(tNode).parent;
        if (null == parent) {
            var hostTNode = currentView[T_HOST];
            return 2 === hostTNode.type ? getContainerRenderParent(hostTNode, currentView) : function(currentView) {
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
                return getBeforeNodeForView(views.indexOf(lView), views, lContainer[NATIVE]);
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
function getBeforeNodeForView(index, views, containerNative) {
    if (index + 1 < views.length) {
        var view = views[index + 1], viewTNode = view[T_HOST];
        return viewTNode.child ? getNativeByTNode(viewTNode.child, view) : containerNative;
    }
    return containerNative;
}
function appendProjectedNode(projectedTNode, tProjectionNode, currentView, projectionView) {
    var native = getNativeByTNode(projectedTNode, projectionView);
    appendChild(native, tProjectionNode, currentView), attachPatchData(native, projectionView);
    var nodeOrContainer = projectionView[projectedTNode.index];
    if (0 === projectedTNode.type) for (var views = nodeOrContainer[VIEWS], i = 0; i < views.length; i++) addRemoveViewFromContainer(views[i], !0, nodeOrContainer[NATIVE]); else {
        if (4 === projectedTNode.type) for (var ngContainerChildTNode = projectedTNode.child; ngContainerChildTNode; ) appendProjectedNode(ngContainerChildTNode, tProjectionNode, currentView, projectionView), 
        ngContainerChildTNode = ngContainerChildTNode.next;
        isLContainer(nodeOrContainer) && appendChild(nodeOrContainer[NATIVE], tProjectionNode, currentView);
    }
}
function template(index, templateFn, consts, vars, tagName, attrs, localRefs, localRefExtractor) {
    var lView = getLView(), tView = lView[TVIEW], tContainerNode = function(index, tagName, attrs) {
        var lView = getLView(), adjustedIndex = index + HEADER_OFFSET, comment = lView[RENDERER].createComment(""), tNode = createNodeAtIndex(index, 0, comment, tagName, attrs), lContainer = lView[adjustedIndex] = createLContainer(lView[adjustedIndex], lView, comment, tNode);
        return appendChild(comment, tNode, lView), addToViewTree(lView, lContainer), tNode;
    }(index, tagName || null, attrs || null);
    tView.firstTemplatePass && (tContainerNode.tViews = createTView(-1, templateFn, consts, vars, tView.directiveRegistry, tView.pipeRegistry, null, null)), 
    createDirectivesAndLocals(tView, lView, localRefs, localRefExtractor), function(lView, tContainerNode) {
        var queries = lView[QUERIES];
        queries && (queries.addNode(tContainerNode), lView[tContainerNode.index][QUERIES] = queries.container());
    }(lView, tContainerNode), attachPatchData(getNativeByTNode(tContainerNode, lView), lView), 
    registerPostOrderHooks(tView, tContainerNode), setIsParent(!1);
}
function store(index, value) {
    var lView = getLView(), tView = lView[TVIEW], adjustedIndex = index + HEADER_OFFSET;
    adjustedIndex >= tView.data.length && (tView.data[adjustedIndex] = null, tView.blueprint[adjustedIndex] = null), 
    lView[adjustedIndex] = value;
}
function reference(index) {
    return loadInternal(contextLView, index);
}
function load(index) {
    return loadInternal(getLView(), index);
}
function directiveInject(token, flags) {
    return void 0 === flags && (flags = InjectFlags.Default), token = resolveForwardRef(token), 
    getOrCreateInjectable(getPreviousOrParentTNode(), getLView(), token, flags);
}
var BRAND = "__SANITIZER_TRUSTED_BRAND__", _devMode = !0, _runModeLocked = !1;
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
function sanitizeUrl(unsafeUrl) {
    var lView, value, sanitizer = (lView = getLView()) && lView[SANITIZER];
    return sanitizer ? sanitizer.sanitize(SecurityContext.URL, unsafeUrl) || "" : ("Url", 
    (value = unsafeUrl) instanceof String && "Url" === value[BRAND] ? unsafeUrl.toString() : _sanitizeUrl(renderStringify(unsafeUrl)));
}
function elementStart(index, name, attrs, localRefs) {
    var lView = getLView(), tView = lView[TVIEW], native = elementCreate(name), renderer = lView[RENDERER], tNode = createNodeAtIndex(index, 3, native, name, attrs || null), initialStylesIndex = 0, initialClassesIndex = 0;
    if (attrs && (function(tView, tNode, attrs, attrsStartIndex) {
        if (tView.firstTemplatePass && !tNode.stylingTemplate) {
            var stylingAttrsStartIndex = attrsStylingIndexOf(attrs, attrsStartIndex);
            stylingAttrsStartIndex >= 0 && (tNode.stylingTemplate = initializeStaticContext(attrs, stylingAttrsStartIndex));
        }
    }(tView, tNode, attrs, setUpAttributes(native, attrs)), tNode.stylingTemplate && (initialStylesIndex = renderInitialStyles(native, tNode.stylingTemplate, renderer), 
    initialClassesIndex = renderInitialClasses(native, tNode.stylingTemplate, renderer))), 
    appendChild(native, tNode, lView), createDirectivesAndLocals(tView, lView, localRefs), 
    0 === elementDepthCount && attachPatchData(native, lView), elementDepthCount++, 
    tView.firstTemplatePass) {
        var inputData = initializeTNodeInputs(tNode);
        inputData && inputData.hasOwnProperty("class") && (tNode.flags |= 8), inputData && inputData.hasOwnProperty("style") && (tNode.flags |= 16);
    }
    tNode.stylingTemplate && (renderInitialClasses(native, tNode.stylingTemplate, renderer, initialClassesIndex), 
    renderInitialStyles(native, tNode.stylingTemplate, renderer, initialStylesIndex));
    var currentQueries = lView[QUERIES];
    currentQueries && (currentQueries.addNode(tNode), lView[QUERIES] = currentQueries.clone()), 
    function(tView, tNode, lView) {
        if (function(tNode) {
            return 0 != (4 & tNode.flags);
        }(tNode)) for (var end = tNode.directiveEnd, directiveIndex = tNode.directiveStart; directiveIndex < end; directiveIndex++) {
            var def = tView.data[directiveIndex];
            def.contentQueries && def.contentQueries(1, lView[directiveIndex], directiveIndex);
        }
    }(tView, tNode, lView);
}
function elementEnd() {
    var previousOrParentTNode = getPreviousOrParentTNode();
    getIsParent() ? setIsParent(!1) : setPreviousOrParentTNode(previousOrParentTNode = previousOrParentTNode.parent), 
    previousOrParentTNode.onElementCreationFns && applyOnCreateInstructions(previousOrParentTNode);
    var lView = getLView(), currentQueries = lView[QUERIES];
    if (currentQueries && (lView[QUERIES] = currentQueries.parent), registerPostOrderHooks(getLView()[TVIEW], previousOrParentTNode), 
    elementDepthCount--, hasClassInput(previousOrParentTNode)) {
        var stylingContext = getStylingContext(previousOrParentTNode.index, lView);
        setInputsForProperty(lView, previousOrParentTNode.inputs.class, getInitialClassNameValue(stylingContext));
    }
    hasStyleInput(previousOrParentTNode) && (stylingContext = getStylingContext(previousOrParentTNode.index, lView), 
    setInputsForProperty(lView, previousOrParentTNode.inputs.style, function(context) {
        var initialStyleValues = stylingContext[3], styleString = initialStyleValues[1];
        if (null === styleString) {
            styleString = "";
            for (var i = 2; i < initialStyleValues.length; i += 3) {
                var value = initialStyleValues[i + 1];
                null !== value && (styleString += (styleString.length ? ";" : "") + initialStyleValues[i] + ":" + value);
            }
            initialStyleValues[1] = styleString;
        }
        return styleString;
    }()));
}
function core_element(index, name, attrs, localRefs) {
    elementStart(index, name, attrs, localRefs), elementEnd();
}
function elementAttribute(index, name, value, sanitizer, namespace) {
    if (value !== NO_CHANGE) {
        var lView = getLView(), renderer = lView[RENDERER], element_1 = getNativeByIndex(index, lView);
        if (null == value) isProceduralRenderer(renderer) ? renderer.removeAttribute(element_1, name, namespace) : element_1.removeAttribute(name); else {
            var tNode = getTNode(index, lView), strValue = null == sanitizer ? renderStringify(value) : sanitizer(value, tNode.tagName || "", name);
            isProceduralRenderer(renderer) ? renderer.setAttribute(element_1, name, strValue, namespace) : namespace ? element_1.setAttributeNS(namespace, name, strValue) : element_1.setAttribute(name, strValue);
        }
    }
}
function elementHostAttrs(attrs) {
    var tNode = getPreviousOrParentTNode(), stylingAttrsStartIndex = attrsStylingIndexOf(attrs, setUpAttributes(getNativeByTNode(tNode, getLView()), attrs));
    if (stylingAttrsStartIndex >= 0) {
        var directive = getActiveHostContext();
        tNode.stylingTemplate ? patchContextWithStaticAttrs(tNode.stylingTemplate, attrs, stylingAttrsStartIndex, directive) : tNode.stylingTemplate = initializeStaticContext(attrs, stylingAttrsStartIndex, directive);
    }
}
function getCurrentView() {
    return getLView();
}
function core_isPromise(obj) {
    return !!obj && "function" == typeof obj.then;
}
function listener(eventName, listenerFn, useCapture, eventTargetResolver) {
    void 0 === useCapture && (useCapture = !1), listenerInternal(eventName, listenerFn, useCapture, eventTargetResolver);
}
function componentHostSyntheticListener(eventName, listenerFn, useCapture, eventTargetResolver) {
    void 0 === useCapture && (useCapture = !1), listenerInternal(eventName, listenerFn, useCapture, eventTargetResolver, loadComponentRenderer);
}
function listenerInternal(eventName, listenerFn, useCapture, eventTargetResolver, loadRendererFn) {
    void 0 === useCapture && (useCapture = !1);
    var lView = getLView(), tNode = getPreviousOrParentTNode(), tView = lView[TVIEW], tCleanup = tView.firstTemplatePass && (tView.cleanup || (tView.cleanup = []));
    if (3 === tNode.type) {
        var native = getNativeByTNode(tNode, lView), resolved = eventTargetResolver ? eventTargetResolver(native) : {}, target = resolved.target || native, renderer = loadRendererFn ? loadRendererFn(tNode, lView) : lView[RENDERER], lCleanupIndex = (lCleanup = getCleanup(lView)).length, useCaptureOrSubIdx = useCapture;
        if (isProceduralRenderer(renderer)) {
            listenerFn = wrapListener(tNode, lView, listenerFn, !1);
            var cleanupFn = renderer.listen(resolved.name || target, eventName, listenerFn);
            lCleanup.push(listenerFn, cleanupFn), useCaptureOrSubIdx = lCleanupIndex + 1;
        } else listenerFn = wrapListener(tNode, lView, listenerFn, !0), target.addEventListener(eventName, listenerFn, useCapture), 
        lCleanup.push(listenerFn);
        tCleanup && tCleanup.push(eventName, eventTargetResolver ? function(_lView) {
            return eventTargetResolver(unwrapRNode(_lView[tNode.index])).target;
        } : tNode.index, lCleanupIndex, useCaptureOrSubIdx);
    }
    void 0 === tNode.outputs && (tNode.outputs = generatePropertyAliases(tNode, 1));
    var props, outputs = tNode.outputs;
    if (outputs && (props = outputs[eventName])) {
        var propsLength = props.length;
        if (propsLength) for (var lCleanup = getCleanup(lView), i = 0; i < propsLength; i += 3) {
            var subscription = lView[props[i]][props[i + 2]].subscribe(listenerFn), idx = lCleanup.length;
            lCleanup.push(listenerFn, subscription), tCleanup && tCleanup.push(eventName, tNode.index, idx, -(idx + 1));
        }
    }
}
function wrapListener(tNode, lView, listenerFn, wrapWithPreventDefault) {
    return function(e) {
        var startView = 1 & tNode.flags ? getComponentViewByIndex(tNode.index, lView) : lView;
        0 == (32 & lView[FLAGS]) && markViewDirty(startView);
        try {
            var result = listenerFn(e);
            return wrapWithPreventDefault && !1 === result && (e.preventDefault(), e.returnValue = !1), 
            result;
        } catch (error) {
            handleError(lView, error);
        }
    };
}
function nextContext(level) {
    return void 0 === level && (level = 1), function(level) {
        return void 0 === level && (level = 1), (contextLView = function(nestingLevel, currentView) {
            for (;nestingLevel > 0; ) currentView = currentView[DECLARATION_VIEW], nestingLevel--;
            return currentView;
        }(level, contextLView))[CONTEXT];
    }(level);
}
function projectionDef(selectors, textSelectors) {
    var componentNode = findComponentView(getLView())[T_HOST];
    if (!componentNode.projection) for (var projectionHeads = componentNode.projection = new Array(selectors ? selectors.length + 1 : 1).fill(null), tails = projectionHeads.slice(), componentChild = componentNode.child; null !== componentChild; ) {
        var bucketIndex = selectors ? matchingProjectionSelectorIndex(componentChild, selectors, textSelectors) : 0;
        tails[bucketIndex] ? tails[bucketIndex].projectionNext = componentChild : projectionHeads[bucketIndex] = componentChild, 
        tails[bucketIndex] = componentChild, componentChild = componentChild.next;
    }
}
function projection(nodeIndex, selectorIndex, attrs) {
    void 0 === selectorIndex && (selectorIndex = 0);
    var lView = getLView(), tProjectionNode = createNodeAtIndex(nodeIndex, 1, null, null, attrs || null);
    null === tProjectionNode.projection && (tProjectionNode.projection = selectorIndex), 
    setIsParent(!1), function appendProjectedNodes(lView, tProjectionNode, selectorIndex, componentView) {
        var projectedView = componentView[PARENT], nodeToProject = componentView[T_HOST].projection[selectorIndex];
        if (Array.isArray(nodeToProject)) appendChild(nodeToProject, tProjectionNode, lView); else for (;nodeToProject; ) 1 === nodeToProject.type ? appendProjectedNodes(lView, tProjectionNode, nodeToProject.projection, findComponentView(projectedView)) : (nodeToProject.flags |= 2, 
        appendProjectedNode(nodeToProject, tProjectionNode, lView, projectedView)), nodeToProject = nodeToProject.projectionNext;
    }(lView, tProjectionNode, selectorIndex, findComponentView(lView));
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
function bindingUpdated(lView, bindingIndex, value) {
    var a, b;
    return b = value, ((a = lView[bindingIndex]) == a || b == b) && a !== b && (lView[bindingIndex] = value, 
    !0);
}
function bind(value) {
    var lView = getLView(), bindingIndex = lView[BINDING_INDEX]++;
    return storeBindingMetadata(lView), bindingUpdated(lView, bindingIndex, value) ? value : NO_CHANGE;
}
function elementProperty(index, propName, value, sanitizer, nativeOnly) {
    elementPropertyInternal(index, propName, value, sanitizer, nativeOnly);
}
function componentHostSyntheticProperty(index, propName, value, sanitizer, nativeOnly) {
    elementPropertyInternal(index, propName, value, sanitizer, nativeOnly, loadComponentRenderer);
}
var ATTR_TO_PROP = {
    class: "className",
    for: "htmlFor",
    formaction: "formAction",
    innerHtml: "innerHTML",
    readonly: "readOnly",
    tabindex: "tabIndex"
};
function elementPropertyInternal(index, propName, value, sanitizer, nativeOnly, loadRendererFn) {
    if (value !== NO_CHANGE) {
        var inputData, dataValue, lView = getLView(), element = getNativeByIndex(index, lView), tNode = getTNode(index, lView);
        if (!nativeOnly && (inputData = initializeTNodeInputs(tNode)) && (dataValue = inputData[propName])) setInputsForProperty(lView, dataValue, value), 
        isComponent(tNode) && function(lView, viewIndex) {
            var childComponentLView = getComponentViewByIndex(index + HEADER_OFFSET, lView);
            16 & childComponentLView[FLAGS] || (childComponentLView[FLAGS] |= 64);
        }(lView); else if (3 === tNode.type) {
            !function(tNode, lView, propName, tData, nativeOnly) {
                var lastBindingIndex = lView[BINDING_INDEX] - 1, bindingMetadata = tData[lastBindingIndex];
                bindingMetadata[0] == INTERPOLATION_DELIMITER && (tData[lastBindingIndex] = propName + bindingMetadata, 
                nativeOnly || (-1 == tNode.propertyMetadataStartIndex && (tNode.propertyMetadataStartIndex = lastBindingIndex), 
                tNode.propertyMetadataEndIndex = lastBindingIndex + 1));
            }(tNode, lView, propName = ATTR_TO_PROP[propName] || propName, lView[TVIEW].data, nativeOnly);
            var renderer = loadRendererFn ? loadRendererFn(tNode, lView) : lView[RENDERER];
            value = null != sanitizer ? sanitizer(value, tNode.tagName || "", propName) : value, 
            isProceduralRenderer(renderer) ? renderer.setProperty(element, propName, value) : isAnimationProp(propName) || (element.setProperty ? element.setProperty(propName, value) : element[propName] = value);
        }
    }
}
function interpolation1(prefix, v0, suffix) {
    var lView = getLView(), different = bindingUpdated(lView, lView[BINDING_INDEX]++, v0);
    return storeBindingMetadata(lView, prefix, suffix), different ? prefix + renderStringify(v0) + suffix : NO_CHANGE;
}
function core_select(index) {
    var lView = getLView();
    executePreOrderHooks(lView, lView[TVIEW], getCheckNoChangesMode(), index);
}
function elementStyling(classBindingNames, styleBindingNames, styleSanitizer) {
    var tNode = getPreviousOrParentTNode();
    tNode.stylingTemplate || (tNode.stylingTemplate = createEmptyStylingContext()), 
    initElementStyling(tNode, classBindingNames, styleBindingNames, styleSanitizer, null);
}
function elementHostStyling(classBindingNames, styleBindingNames, styleSanitizer) {
    var tNode = getPreviousOrParentTNode();
    tNode.stylingTemplate || (tNode.stylingTemplate = createEmptyStylingContext());
    var directive = getActiveHostContext();
    allocateDirectiveIntoContext(tNode.stylingTemplate, directive), (tNode.onElementCreationFns = tNode.onElementCreationFns || []).push(function() {
        return initElementStyling(tNode, classBindingNames, styleBindingNames, styleSanitizer, directive);
    });
}
function initElementStyling(tNode, classBindingNames, styleBindingNames, styleSanitizer, directive) {
    !function(context, directiveRef, classBindingNames, styleBindingNames, styleSanitizer) {
        if (!(16 & context[1])) {
            var directiveIndex = function(context, directiveRef, styleSanitizer) {
                var directiveIndex, directiveRefs = context[2], nextOffsetInsertionIndex = context[5].length, detectedIndex = getDirectiveRegistryValuesIndexOf(directiveRefs, directiveRef);
                if (-1 === detectedIndex) detectedIndex = directiveRefs.length, directiveIndex = directiveRefs.length / 4, 
                allocateDirectiveIntoContext(context, directiveRef), directiveRefs[detectedIndex + 1] = nextOffsetInsertionIndex, 
                directiveRefs[detectedIndex + 3] = styleSanitizer || null; else {
                    if (directiveRefs[detectedIndex + 1] >= 0) return -1;
                    directiveIndex = detectedIndex / 4, directiveRefs[detectedIndex + 1] = nextOffsetInsertionIndex, 
                    directiveRefs[detectedIndex + 3] = styleSanitizer || null;
                }
                return directiveIndex;
            }(context, directive || null, styleSanitizer);
            if (-1 !== directiveIndex) {
                styleBindingNames && (styleBindingNames = function(entries) {
                    for (var newEntries = [], i = 0; i < entries.length; i++) newEntries.push(hyphenate(entries[i]));
                    return newEntries;
                }(styleBindingNames));
                var singlePropOffsetValues = context[5], totalCurrentClassBindings = singlePropOffsetValues[1], totalCurrentStyleBindings = singlePropOffsetValues[0], cachedClassMapValues = context[6], cachedStyleMapValues = context[7], stylesOffset = 4 * totalCurrentStyleBindings, singleClassesStartIndex = 9 + stylesOffset, multiStylesStartIndex = singleClassesStartIndex + 4 * totalCurrentClassBindings, multiClassesStartIndex = multiStylesStartIndex + stylesOffset, currentSinglePropsLength = singlePropOffsetValues.length;
                singlePropOffsetValues.push(styleBindingNames ? styleBindingNames.length : 0, classBindingNames ? classBindingNames.length : 0);
                var insertionOffset = 0, filteredStyleBindingNames = [];
                if (styleBindingNames && styleBindingNames.length) for (var i_1 = 0; i_1 < styleBindingNames.length; i_1++) {
                    var name_1 = styleBindingNames[i_1];
                    -1 == (singlePropIndex = getMatchingBindingIndex(context, name_1, 9, singleClassesStartIndex)) && (singlePropIndex = singleClassesStartIndex + insertionOffset, 
                    insertionOffset += 4, filteredStyleBindingNames.push(name_1)), singlePropOffsetValues.push(singlePropIndex);
                }
                var filteredClassBindingNames = [];
                if (classBindingNames && classBindingNames.length) for (var i_2 = 0; i_2 < classBindingNames.length; i_2++) {
                    var singlePropIndex, name_2 = classBindingNames[i_2];
                    -1 == (singlePropIndex = getMatchingBindingIndex(context, name_2, singleClassesStartIndex, multiStylesStartIndex)) ? (singlePropIndex = multiStylesStartIndex + insertionOffset, 
                    insertionOffset += 4, filteredClassBindingNames.push(name_2)) : singlePropIndex += 4 * filteredStyleBindingNames.length, 
                    singlePropOffsetValues.push(singlePropIndex);
                }
                var i = 2;
                if (filteredStyleBindingNames.length) for (;i < currentSinglePropsLength; ) {
                    var totalStyles = singlePropOffsetValues[i + 0], totalClasses = singlePropOffsetValues[i + 1];
                    if (totalClasses) for (var start = i + 2 + totalStyles, j = start; j < start + totalClasses; j++) singlePropOffsetValues[j] += 4 * filteredStyleBindingNames.length;
                    i += 2 + (totalStyles + totalClasses);
                }
                for (var totalNewEntries = filteredClassBindingNames.length + filteredStyleBindingNames.length, i_3 = 9; i_3 < context.length; i_3 += 4) {
                    var isMultiBased = i_3 >= multiStylesStartIndex, isClassBased = i_3 >= (isMultiBased ? multiClassesStartIndex : singleClassesStartIndex), flag = getPointers(context, i_3), staticIndex = getInitialIndex(flag), singleOrMultiIndex = getMultiOrSingleIndex(flag);
                    setFlag(context, i_3, pointers(flag, staticIndex, singleOrMultiIndex += isMultiBased ? isClassBased ? 4 * filteredStyleBindingNames.length : 0 : 4 * totalNewEntries + 4 * (isClassBased ? filteredStyleBindingNames.length : 0)));
                }
                for (var i_4 = 0; i_4 < 4 * filteredStyleBindingNames.length; i_4++) context.splice(multiClassesStartIndex, 0, null), 
                context.splice(singleClassesStartIndex, 0, null), singleClassesStartIndex++, multiStylesStartIndex++, 
                multiClassesStartIndex += 2;
                for (var i_5 = 0; i_5 < 4 * filteredClassBindingNames.length; i_5++) context.splice(multiStylesStartIndex, 0, null), 
                context.push(null), multiStylesStartIndex++, multiClassesStartIndex++;
                for (var initialClasses = context[4], initialStyles = context[3], i_6 = 0; i_6 < totalNewEntries; i_6++) {
                    var entryIsClassBased = i_6 >= filteredStyleBindingNames.length, adjustedIndex = entryIsClassBased ? i_6 - filteredStyleBindingNames.length : i_6, propName = entryIsClassBased ? filteredClassBindingNames[adjustedIndex] : filteredStyleBindingNames[adjustedIndex], multiIndex = void 0, singleIndex = void 0;
                    entryIsClassBased ? (multiIndex = multiClassesStartIndex + 4 * (totalCurrentClassBindings + adjustedIndex), 
                    singleIndex = singleClassesStartIndex + 4 * (totalCurrentClassBindings + adjustedIndex)) : (multiIndex = multiStylesStartIndex + 4 * (totalCurrentStyleBindings + adjustedIndex), 
                    singleIndex = 9 + 4 * (totalCurrentStyleBindings + adjustedIndex));
                    var initialValuesToLookup = entryIsClassBased ? initialClasses : initialStyles, indexForInitial = getInitialStylingValuesIndexOf(initialValuesToLookup, propName);
                    -1 === indexForInitial ? indexForInitial = addOrUpdateStaticStyle(null, initialValuesToLookup, propName, !entryIsClassBased && null, directiveIndex) + 1 : indexForInitial += 1;
                    var initialFlag = prepareInitialFlag(context, propName, entryIsClassBased, styleSanitizer || null);
                    setFlag(context, singleIndex, pointers(initialFlag, indexForInitial, multiIndex)), 
                    setProp(context, singleIndex, propName), setValue(context, singleIndex, null), setPlayerBuilderIndex(context, singleIndex, 0, directiveIndex), 
                    setFlag(context, multiIndex, pointers(initialFlag, indexForInitial, singleIndex)), 
                    setProp(context, multiIndex, propName), setValue(context, multiIndex, null), setPlayerBuilderIndex(context, multiIndex, 0, directiveIndex);
                }
                singlePropOffsetValues[1] = totalCurrentClassBindings + filteredClassBindingNames.length, 
                singlePropOffsetValues[0] = totalCurrentStyleBindings + filteredStyleBindingNames.length, 
                cachedClassMapValues[0] += filteredClassBindingNames.length, cachedStyleMapValues[0] += filteredStyleBindingNames.length;
                var newStylesSpaceAllocationSize = 4 * filteredStyleBindingNames.length, newClassesSpaceAllocationSize = 4 * filteredClassBindingNames.length, cachedStyleMapIndex = cachedStyleMapValues.length;
                registerMultiMapEntry(context, directiveIndex, !1, multiStylesStartIndex + 4 * totalCurrentStyleBindings, filteredStyleBindingNames.length);
                for (var i_7 = 1; i_7 < cachedStyleMapIndex; i_7 += 4) cachedStyleMapValues[i_7 + 1] += newClassesSpaceAllocationSize + newStylesSpaceAllocationSize;
                var cachedClassMapIndex = cachedClassMapValues.length;
                registerMultiMapEntry(context, directiveIndex, !0, multiClassesStartIndex + 4 * totalCurrentClassBindings, filteredClassBindingNames.length);
                for (var i_8 = 1; i_8 < cachedClassMapIndex; i_8 += 4) cachedClassMapValues[i_8 + 1] += 2 * newStylesSpaceAllocationSize + newClassesSpaceAllocationSize;
                setFlag(context, 1, pointers(0, 0, multiStylesStartIndex));
            }
        }
    }(tNode.stylingTemplate, 0, classBindingNames, styleBindingNames, styleSanitizer);
}
function elementHostStyleProp(styleIndex, value, suffix, forceOverride) {
    elementStylePropInternal(getActiveHostContext(), getActiveHostElementIndex(), styleIndex, value, suffix, forceOverride);
}
function elementStylePropInternal(directive, index, styleIndex, value, suffix, forceOverride) {
    var valueToAdd = null;
    null !== value && (valueToAdd = suffix ? renderStringify(value) + suffix : value), 
    function(context, offset, input, directiveRef, forceOverride) {
        updateSingleStylingValue(context, styleIndex, valueToAdd, !1, directive, forceOverride);
    }(getStylingContext(index + HEADER_OFFSET, getLView()), 0, 0, 0, forceOverride);
}
function elementClassProp(index, classIndex, value, forceOverride) {
    elementClassPropInternal(null, index, classIndex, value, forceOverride);
}
function elementHostClassProp(classIndex, value, forceOverride) {
    elementClassPropInternal(getActiveHostContext(), getActiveHostElementIndex(), classIndex, value, forceOverride);
}
function elementClassPropInternal(directive, index, classIndex, value, forceOverride) {
    var input = value instanceof BoundPlayerFactory ? value : function(value) {
        return "boolean" == typeof value ? value : !!value || null;
    }(value);
    !function(context, offset, input, directiveRef, forceOverride) {
        updateSingleStylingValue(context, classIndex, input, !0, directive, forceOverride);
    }(getStylingContext(index + HEADER_OFFSET, getLView()), 0, input, 0, forceOverride);
}
function elementStylingMap(index, classes, styles) {
    elementStylingMapInternal(null, index, classes, styles);
}
function elementHostStylingMap(classes, styles) {
    elementStylingMapInternal(getActiveHostContext(), getActiveHostElementIndex(), classes, styles);
}
function elementStylingMapInternal(directive, index, classes, styles) {
    var lView = getLView(), tNode = getTNode(index, lView), stylingContext = getStylingContext(index + HEADER_OFFSET, lView);
    if (!directive) {
        if (hasClassInput(tNode) && classes !== NO_CHANGE) {
            var initialClasses = getInitialClassNameValue(stylingContext), classInputVal = (initialClasses.length ? initialClasses + " " : "") + function(classes) {
                return classes && "string" != typeof classes && (classes = Object.keys(classes).join(" ")), 
                classes || "";
            }(classes);
            setInputsForProperty(lView, tNode.inputs.class, classInputVal), classes = NO_CHANGE;
        }
        if (hasStyleInput(tNode) && styles !== NO_CHANGE) {
            var initialStyles = getInitialClassNameValue(stylingContext), styleInputVal = (initialStyles.length ? initialStyles + " " : "") + function(styles) {
                var str = "";
                if (styles) for (var props = Object.keys(styles), i = 0; i < props.length; i++) {
                    var prop = props[i];
                    str += (i ? ";" : "") + prop + ":" + styles[prop];
                }
                return str;
            }(styles);
            setInputsForProperty(lView, tNode.inputs.style, styleInputVal), styles = NO_CHANGE;
        }
    }
    !function(context, classesInput, stylesInput, directiveRef) {
        var directiveIndex = getDirectiveIndexFromRegistry(context, directive || null);
        stylesInput = stylesInput || null;
        var ignoreAllClassUpdates = isMultiValueCacheHit(context, !0, directiveIndex, classesInput = classesInput || null), ignoreAllStyleUpdates = isMultiValueCacheHit(context, !1, directiveIndex, stylesInput);
        if (!ignoreAllClassUpdates || !ignoreAllStyleUpdates) {
            classesInput = classesInput === NO_CHANGE ? readCachedMapValue(context, !0, directiveIndex) : classesInput, 
            stylesInput = stylesInput === NO_CHANGE ? readCachedMapValue(context, !1, directiveIndex) : stylesInput;
            var element = context[0], classesPlayerBuilder = classesInput instanceof BoundPlayerFactory ? new ClassAndStylePlayerBuilder(classesInput, element, 1) : null, stylesPlayerBuilder = stylesInput instanceof BoundPlayerFactory ? new ClassAndStylePlayerBuilder(stylesInput, element, 2) : null, classesValue = classesPlayerBuilder ? classesInput.value : classesInput, stylesValue = stylesPlayerBuilder ? stylesInput.value : stylesInput, classNames = EMPTY_ARRAY$1, applyAllClasses = !1, playerBuildersAreDirty = !1, classesPlayerBuilderIndex = classesPlayerBuilder ? 1 : 0;
            hasPlayerBuilderChanged(context, classesPlayerBuilder, 1) && (setPlayerBuilder(context, classesPlayerBuilder, 1), 
            playerBuildersAreDirty = !0);
            var stylesPlayerBuilderIndex = stylesPlayerBuilder ? 3 : 0;
            hasPlayerBuilderChanged(context, stylesPlayerBuilder, 3) && (setPlayerBuilder(context, stylesPlayerBuilder, 3), 
            playerBuildersAreDirty = !0), ignoreAllClassUpdates || ("string" == typeof classesValue ? (classNames = classesValue.split(/\s+/), 
            applyAllClasses = !0) : classNames = classesValue ? Object.keys(classesValue) : EMPTY_ARRAY$1);
            var multiStylesStartIndex = getMultiStylesStartIndex(context), multiClassesStartIndex = getMultiClassesStartIndex(context), multiClassesEndIndex = context.length;
            if (!ignoreAllStyleUpdates) {
                var totalNewEntries = patchStylingMapIntoContext(context, directiveIndex, stylesPlayerBuilderIndex, multiStylesStartIndex, multiClassesStartIndex, stylesValue ? Object.keys(stylesValue) : EMPTY_ARRAY$1, stylesValue || EMPTY_OBJ, stylesInput, !1);
                totalNewEntries && (multiClassesStartIndex += 4 * totalNewEntries, multiClassesEndIndex += 4 * totalNewEntries);
            }
            ignoreAllClassUpdates || patchStylingMapIntoContext(context, directiveIndex, classesPlayerBuilderIndex, multiClassesStartIndex, multiClassesEndIndex, classNames, applyAllClasses || classesValue || EMPTY_OBJ, classesInput, !0), 
            playerBuildersAreDirty && setContextPlayersDirty(context, !0);
        }
    }(stylingContext, classes, styles);
}
function elementStylingApply(index) {
    elementStylingApplyInternal(null, index);
}
function elementHostStylingApply() {
    elementStylingApplyInternal(getActiveHostContext(), getActiveHostElementIndex());
}
function elementStylingApplyInternal(directive, index) {
    var rootContext, res_1, nothingScheduled, lView = getLView(), isFirstRender = 0 != (8 & lView[FLAGS]);
    (function(context, renderer, rootOrView, isFirstRender, classesStore, stylesStore, directiveRef) {
        var totalPlayersQueued = 0, targetDirectiveIndex = getDirectiveIndexFromRegistry(context, directive || null);
        if (function(context) {
            return isDirty(context, 1);
        }(context) && function(context, directiveIndex) {
            return context[2][4 * targetDirectiveIndex + 2];
        }(context)) {
            for (var flushPlayerBuilders = 8 & context[1], native = context[0], multiStartIndex = getMultiStylesStartIndex(context), stillDirty = !1, i = 9; i < context.length; i += 4) if (isDirty(context, i)) {
                var flag = getPointers(context, i), directiveIndex = getDirectiveIndexFromEntry(context, i);
                if (targetDirectiveIndex !== directiveIndex) {
                    stillDirty = !0;
                    continue;
                }
                var prop = getProp(context, i), value = getValue(context, i), styleSanitizer = 4 & flag ? getStyleSanitizer(context, directiveIndex) : null, playerBuilder = getPlayerBuilder(context, i), isClassBased = !!(2 & flag), valueToApply = value;
                i < multiStartIndex && !valueExists(valueToApply) && (valueToApply = getValue(context, getMultiOrSingleIndex(flag))), 
                valueExists(valueToApply) || (valueToApply = getInitialValue(context, flag)), (!isFirstRender || valueToApply) && (isClassBased ? setClass(native, prop, !!valueToApply, renderer, null, playerBuilder) : setStyle(native, prop, valueToApply, renderer, styleSanitizer, null, playerBuilder)), 
                setDirty(context, i, !1);
            }
            if (flushPlayerBuilders) {
                var rootContext = Array.isArray(rootOrView) ? getRootContext(rootOrView) : rootOrView, playerContext = context[8], playersStartIndex = playerContext[0];
                for (i = 1; i < playersStartIndex; i += 2) {
                    var builder = playerContext[i], playerInsertionIndex = i + 1, oldPlayer = playerContext[playerInsertionIndex];
                    if (builder) {
                        var player = builder.buildPlayer(oldPlayer, isFirstRender);
                        void 0 !== player && (null != player && addPlayerInternal(playerContext, rootContext, native, player, playerInsertionIndex) && totalPlayersQueued++, 
                        oldPlayer && oldPlayer.destroy());
                    } else oldPlayer && oldPlayer.destroy();
                }
                setContextPlayersDirty(context, !1);
            }
            setDirectiveDirty(context, targetDirectiveIndex, !1), setContextDirty(context, stillDirty);
        }
        return totalPlayersQueued;
    })(getStylingContext(index + HEADER_OFFSET, lView), lView[RENDERER], lView, isFirstRender) > 0 && (nothingScheduled = 0 === (rootContext = getRootContext(lView)).flags, 
    rootContext.flags |= 2, nothingScheduled && rootContext.clean == _CLEAN_PROMISE && (rootContext.clean = new Promise(function(r) {
        return res_1 = r;
    }), rootContext.scheduler(function() {
        if (1 & rootContext.flags && (rootContext.flags &= -2, tickRootContext(rootContext)), 
        2 & rootContext.flags) {
            rootContext.flags &= -3;
            var playerHandler = rootContext.playerHandler;
            playerHandler && playerHandler.flushPlayers();
        }
        rootContext.clean = _CLEAN_PROMISE, res_1(null);
    })));
}
function core_text(index, value) {
    var lView = getLView(), textNative = function(value, renderer) {
        return isProceduralRenderer(renderer) ? renderer.createText(renderStringify(value)) : renderer.createTextNode(renderStringify(value));
    }(value, lView[RENDERER]), tNode = createNodeAtIndex(index, 3, textNative, null, null);
    setIsParent(!1), appendChild(textNative, tNode, lView);
}
function textBinding(index, value) {
    if (value !== NO_CHANGE) {
        var lView = getLView(), element = getNativeByIndex(index, lView), renderer = lView[RENDERER];
        isProceduralRenderer(renderer) ? renderer.setValue(element, renderStringify(value)) : element.textContent = renderStringify(value);
    }
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
    var rootTView = readPatchedLView(component)[TVIEW], dirIndex = rootTView.data.length - 1;
    registerPreOrderHooks(dirIndex, def, rootTView, -1, -1, -1), registerPostOrderHooks(rootTView, {
        directiveStart: dirIndex,
        directiveEnd: dirIndex + 1
    });
}
var SimpleChange = function() {
    function SimpleChange(previousValue, currentValue, firstChange) {
        this.previousValue = previousValue, this.currentValue = currentValue, this.firstChange = firstChange;
    }
    return SimpleChange.prototype.isFirstChange = function() {
        return this.firstChange;
    }, SimpleChange;
}();
function NgOnChangesFeature() {
    return NgOnChangesFeatureImpl.ngInherit = !0, NgOnChangesFeatureImpl;
}
function NgOnChangesFeatureImpl(definition) {
    definition.type.prototype.ngOnChanges && (definition.setInput = ngOnChangesSetInput, 
    definition.onChanges = function() {
        var simpleChangesStore = getSimpleChangesStore(this), current = simpleChangesStore && simpleChangesStore.current;
        if (current) {
            var previous = simpleChangesStore.previous;
            if (previous === EMPTY_OBJ) simpleChangesStore.previous = current; else for (var key in current) previous[key] = current[key];
            simpleChangesStore.current = null, this.ngOnChanges(current);
        }
    });
}
function ngOnChangesSetInput(instance, value, publicName, privateName) {
    var simpleChangesStore = getSimpleChangesStore(instance) || function(instance, store) {
        return instance[SIMPLE_CHANGES_STORE] = {
            previous: EMPTY_OBJ,
            current: null
        };
    }(instance), current = simpleChangesStore.current || (simpleChangesStore.current = {}), previous = simpleChangesStore.previous, declaredName = this.declaredInputs[publicName], previousChange = previous[declaredName];
    current[declaredName] = new SimpleChange(previousChange && previousChange.currentValue, value, previous === EMPTY_OBJ), 
    instance[privateName] = value;
}
var SIMPLE_CHANGES_STORE = "__ngSimpleChanges__";
function getSimpleChangesStore(instance) {
    return instance[SIMPLE_CHANGES_STORE] || null;
}
function InheritDefinitionFeature(definition) {
    for (var superType = Object.getPrototypeOf(definition.type.prototype).constructor, _loop_1 = function() {
        var e_1, _a, superDef = void 0;
        if (isComponentDef(definition)) superDef = superType.ngComponentDef || superType.ngDirectiveDef; else {
            if (superType.ngComponentDef) throw new Error("Directives cannot inherit Components");
            superDef = superType.ngDirectiveDef;
        }
        var baseDef = superType.ngBaseDef;
        if (baseDef || superDef) {
            var writeableDef = definition;
            writeableDef.inputs = maybeUnwrapEmpty(definition.inputs), writeableDef.declaredInputs = maybeUnwrapEmpty(definition.declaredInputs), 
            writeableDef.outputs = maybeUnwrapEmpty(definition.outputs);
        }
        if (baseDef && (fillProperties(definition.inputs, baseDef.inputs), fillProperties(definition.declaredInputs, baseDef.declaredInputs), 
        fillProperties(definition.outputs, baseDef.outputs)), superDef) {
            var prevHostBindings_1 = definition.hostBindings, superHostBindings_1 = superDef.hostBindings;
            superHostBindings_1 && (definition.hostBindings = prevHostBindings_1 ? function(rf, ctx, elementIndex) {
                superHostBindings_1(rf, ctx, elementIndex), prevHostBindings_1(rf, ctx, elementIndex);
            } : superHostBindings_1);
            var prevViewQuery_1 = definition.viewQuery, superViewQuery_1 = superDef.viewQuery;
            superViewQuery_1 && (definition.viewQuery = prevViewQuery_1 ? function(rf, ctx) {
                superViewQuery_1(rf, ctx), prevViewQuery_1(rf, ctx);
            } : superViewQuery_1);
            var prevContentQueries_1 = definition.contentQueries, superContentQueries_1 = superDef.contentQueries;
            superContentQueries_1 && (definition.contentQueries = prevContentQueries_1 ? function(rf, ctx, directiveIndex) {
                superContentQueries_1(rf, ctx, directiveIndex), prevContentQueries_1(rf, ctx, directiveIndex);
            } : superContentQueries_1), fillProperties(definition.inputs, superDef.inputs), 
            fillProperties(definition.declaredInputs, superDef.declaredInputs), fillProperties(definition.outputs, superDef.outputs), 
            definition.afterContentChecked = definition.afterContentChecked || superDef.afterContentChecked, 
            definition.afterContentInit = definition.afterContentInit || superDef.afterContentInit, 
            definition.afterViewChecked = definition.afterViewChecked || superDef.afterViewChecked, 
            definition.afterViewInit = definition.afterViewInit || superDef.afterViewInit, definition.doCheck = definition.doCheck || superDef.doCheck, 
            definition.onDestroy = definition.onDestroy || superDef.onDestroy, definition.onInit = definition.onInit || superDef.onInit;
            var features = superDef.features;
            if (features) try {
                for (var features_1 = __values(features), features_1_1 = features_1.next(); !features_1_1.done; features_1_1 = features_1.next()) {
                    var feature = features_1_1.value;
                    feature && feature.ngInherit && feature(definition);
                }
            } catch (e_1_1) {
                e_1 = {
                    error: e_1_1
                };
            } finally {
                try {
                    features_1_1 && !features_1_1.done && (_a = features_1.return) && _a.call(features_1);
                } finally {
                    if (e_1) throw e_1.error;
                }
            }
        } else {
            var superPrototype = superType.prototype;
            superPrototype && (definition.afterContentChecked = definition.afterContentChecked || superPrototype.ngAfterContentChecked, 
            definition.afterContentInit = definition.afterContentInit || superPrototype.ngAfterContentInit, 
            definition.afterViewChecked = definition.afterViewChecked || superPrototype.ngAfterViewChecked, 
            definition.afterViewInit = definition.afterViewInit || superPrototype.ngAfterViewInit, 
            definition.doCheck = definition.doCheck || superPrototype.ngDoCheck, definition.onDestroy = definition.onDestroy || superPrototype.ngOnDestroy, 
            definition.onInit = definition.onInit || superPrototype.ngOnInit, superPrototype.ngOnChanges && NgOnChangesFeature()(definition));
        }
        superType = Object.getPrototypeOf(superType);
    }; superType; ) _loop_1();
}
function maybeUnwrapEmpty(value) {
    return value === EMPTY_OBJ ? {} : value === EMPTY_ARRAY$1 ? [] : value;
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
            var factory = providerToFactory(provider, ngModuleType, providers);
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
function providerToFactory(provider, ngModuleType, providers) {
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
function resolveProvider$1(provider, tInjectables, lInjectablesBlueprint, isComponent, isViewProvider) {
    if (provider = resolveForwardRef(provider), Array.isArray(provider)) for (var i = 0; i < provider.length; i++) resolveProvider$1(provider[i], tInjectables, lInjectablesBlueprint, isComponent, isViewProvider); else {
        var lView = getLView(), token = isTypeProvider(provider) ? provider : resolveForwardRef(provider.provide), providerFactory = providerToFactory(provider), tNode = getPreviousOrParentTNode(), beginIndex = 65535 & tNode.providerIndexes, endIndex = tNode.directiveStart, cptViewProvidersCount = tNode.providerIndexes >> 16;
        if (provider.useClass || isTypeProvider(provider)) {
            var ngOnDestroy = (provider.useClass || provider).prototype.ngOnDestroy;
            if (ngOnDestroy) {
                var tView = lView[TVIEW];
                (tView.destroyHooks || (tView.destroyHooks = [])).push(tInjectables.length, ngOnDestroy);
            }
        }
        if (isTypeProvider(provider) || !provider.multi) {
            var factory = new NodeInjectorFactory(providerFactory, isViewProvider, directiveInject), existingFactoryIndex = indexOf(token, tInjectables, isViewProvider ? beginIndex : beginIndex + cptViewProvidersCount, endIndex);
            -1 == existingFactoryIndex ? (diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, lView), lView, token), 
            tInjectables.push(token), tNode.directiveStart++, tNode.directiveEnd++, isViewProvider && (tNode.providerIndexes += 65536), 
            lInjectablesBlueprint.push(factory), lView.push(factory)) : (lInjectablesBlueprint[existingFactoryIndex] = factory, 
            lView[existingFactoryIndex] = factory);
        } else {
            var existingProvidersFactoryIndex = indexOf(token, tInjectables, beginIndex + cptViewProvidersCount, endIndex), existingViewProvidersFactoryIndex = indexOf(token, tInjectables, beginIndex, beginIndex + cptViewProvidersCount), doesViewProvidersFactoryExist = existingViewProvidersFactoryIndex >= 0 && lInjectablesBlueprint[existingViewProvidersFactoryIndex];
            isViewProvider && !doesViewProvidersFactoryExist || !isViewProvider && !(existingProvidersFactoryIndex >= 0 && lInjectablesBlueprint[existingProvidersFactoryIndex]) ? (diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, lView), lView, token), 
            factory = function(factoryFn, index, isViewProvider, isComponent, f) {
                var factory = new NodeInjectorFactory(factoryFn, isViewProvider, directiveInject);
                return factory.multi = [], factory.index = index, factory.componentProviders = 0, 
                multiFactoryAdd(factory, f, isComponent && !isViewProvider), factory;
            }(isViewProvider ? multiViewProvidersFactoryResolver : multiProvidersFactoryResolver, lInjectablesBlueprint.length, isViewProvider, isComponent, providerFactory), 
            !isViewProvider && doesViewProvidersFactoryExist && (lInjectablesBlueprint[existingViewProvidersFactoryIndex].providerFactory = factory), 
            tInjectables.push(token), tNode.directiveStart++, tNode.directiveEnd++, isViewProvider && (tNode.providerIndexes += 65536), 
            lInjectablesBlueprint.push(factory), lView.push(factory)) : multiFactoryAdd(lInjectablesBlueprint[isViewProvider ? existingViewProvidersFactoryIndex : existingProvidersFactoryIndex], providerFactory, !isViewProvider && isComponent), 
            !isViewProvider && isComponent && doesViewProvidersFactoryExist && lInjectablesBlueprint[existingViewProvidersFactoryIndex].componentProviders++;
        }
    }
}
function multiFactoryAdd(multiFactory, factory, isComponentProvider) {
    multiFactory.multi.push(factory), isComponentProvider && multiFactory.componentProviders++;
}
function indexOf(item, arr, begin, end) {
    for (var i = begin; i < end; i++) if (arr[i] === item) return i;
    return -1;
}
function multiProvidersFactoryResolver(_, tData, lData, tNode) {
    return multiResolve(this.multi, []);
}
function multiViewProvidersFactoryResolver(_, tData, lData, tNode) {
    var result, factories = this.multi;
    if (this.providerFactory) {
        var componentCount = this.providerFactory.componentProviders, multiProviders = getNodeInjectable(tData, lData, this.providerFactory.index, tNode);
        multiResolve(factories, result = multiProviders.slice(0, componentCount));
        for (var i = componentCount; i < multiProviders.length; i++) result.push(multiProviders[i]);
    } else multiResolve(factories, result = []);
    return result;
}
function multiResolve(factories, result) {
    for (var i = 0; i < factories.length; i++) result.push((0, factories[i])());
    return result;
}
function ProvidersFeature(providers, viewProviders) {
    return void 0 === viewProviders && (viewProviders = []), function(definition) {
        definition.providersResolver = function(def, processProvidersFn) {
            return function(def, providers, viewProviders) {
                var tView = getLView()[TVIEW];
                if (tView.firstTemplatePass) {
                    var isComponent = isComponentDef(def);
                    resolveProvider$1(viewProviders, tView.data, tView.blueprint, isComponent, !0), 
                    resolveProvider$1(providers, tView.data, tView.blueprint, isComponent, !1);
                }
            }(def, processProvidersFn ? processProvidersFn(providers) : providers, viewProviders);
        };
    };
}
var R3ElementRef, R3TemplateRef, R3ViewContainerRef, core_ComponentRef = function() {
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
}(), core_ViewRef = function() {
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
        destroyLView(this._lView);
    }, ViewRef.prototype.onDestroy = function(callback) {
        var view, cleanupFn;
        cleanupFn = callback, getCleanup(view = this._lView).push(cleanupFn), view[TVIEW].firstTemplatePass && getTViewCleanup(view).push(view[CLEANUP].length - 1, null);
    }, ViewRef.prototype.markForCheck = function() {
        markViewDirty(this._lView);
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
}(core_ViewRef);
function createElementRef(ElementRefToken, tNode, view) {
    return R3ElementRef || (R3ElementRef = function(_super) {
        function ElementRef_() {
            return null !== _super && _super.apply(this, arguments) || this;
        }
        return __extends(ElementRef_, _super), ElementRef_;
    }(ElementRefToken)), new R3ElementRef(getNativeByTNode(tNode, view));
}
function createTemplateRef(TemplateRefToken, ElementRefToken, hostTNode, hostView) {
    if (R3TemplateRef || (R3TemplateRef = function(_super) {
        function TemplateRef_(_declarationParentView, elementRef, _tView, _hostLContainer, _injectorIndex) {
            var _this = _super.call(this) || this;
            return _this._declarationParentView = _declarationParentView, _this.elementRef = elementRef, 
            _this._tView = _tView, _this._hostLContainer = _hostLContainer, _this._injectorIndex = _injectorIndex, 
            _this;
        }
        return __extends(TemplateRef_, _super), TemplateRef_.prototype.createEmbeddedView = function(context, container, index) {
            var lView = function(tView, context, declarationView, queries, injectorIndex) {
                var _isParent = getIsParent(), _previousOrParentTNode = getPreviousOrParentTNode();
                setIsParent(!0), setPreviousOrParentTNode(null);
                var lView = createLView(declarationView, tView, context, 16, null, null);
                return lView[DECLARATION_VIEW] = declarationView, queries && (lView[QUERIES] = queries.createView()), 
                assignTViewNodeToLView(tView, null, -1, lView), tView.firstTemplatePass && (tView.node.injectorIndex = injectorIndex), 
                setIsParent(_isParent), setPreviousOrParentTNode(_previousOrParentTNode), lView;
            }(this._tView, context, this._declarationParentView, this._hostLContainer[QUERIES], this._injectorIndex);
            container && insertView(lView, container, index), renderEmbeddedTemplate(lView, this._tView, context);
            var viewRef = new core_ViewRef(lView, context, -1);
            return viewRef._tViewNode = lView[T_HOST], viewRef;
        }, TemplateRef_;
    }(TemplateRefToken)), 0 === hostTNode.type) {
        var hostContainer = hostView[hostTNode.index];
        return new R3TemplateRef(hostView, createElementRef(ElementRefToken, hostTNode, hostView), hostTNode.tViews, hostContainer, hostTNode.injectorIndex);
    }
    return null;
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
}(), ChangeDetectorRef = function() {
    function ChangeDetectorRef() {}
    return ChangeDetectorRef.__NG_ELEMENT_ID__ = function() {
        return SWITCH_CHANGE_DETECTOR_REF_FACTORY();
    }, ChangeDetectorRef;
}(), SWITCH_CHANGE_DETECTOR_REF_FACTORY = function() {
    return function(hostTNode, hostView, context) {
        if (isComponent(hostTNode)) {
            var componentIndex = hostTNode.directiveStart, componentView = getComponentViewByIndex(hostTNode.index, hostView);
            return new core_ViewRef(componentView, null, componentIndex);
        }
        if (3 === hostTNode.type || 0 === hostTNode.type || 4 === hostTNode.type) {
            var hostComponentView = findComponentView(hostView);
            return new core_ViewRef(hostComponentView, hostComponentView[CONTEXT], -1);
        }
        return null;
    }(getPreviousOrParentTNode(), getLView());
}, keyValDiff = [ new DefaultKeyValueDifferFactory() ], defaultIterableDiffers = new IterableDiffers([ new DefaultIterableDifferFactory() ]), defaultKeyValueDiffers = new KeyValueDiffers(keyValDiff), TemplateRef = function() {
    function TemplateRef() {}
    return TemplateRef.__NG_ELEMENT_ID__ = function() {
        return SWITCH_TEMPLATE_REF_FACTORY(TemplateRef, ElementRef);
    }, TemplateRef;
}(), SWITCH_TEMPLATE_REF_FACTORY = function(TemplateRefToken, ElementRefToken) {
    return createTemplateRef(TemplateRefToken, ElementRefToken, getPreviousOrParentTNode(), getLView());
}, ViewContainerRef = function() {
    function ViewContainerRef() {}
    return ViewContainerRef.__NG_ELEMENT_ID__ = function() {
        return SWITCH_VIEW_CONTAINER_REF_FACTORY(ViewContainerRef, ElementRef);
    }, ViewContainerRef;
}(), SWITCH_VIEW_CONTAINER_REF_FACTORY = function(ViewContainerRefToken, ElementRefToken) {
    return function(ViewContainerRefToken, ElementRefToken, hostTNode, hostView) {
        var lContainer;
        R3ViewContainerRef || (R3ViewContainerRef = function(_super) {
            function ViewContainerRef_(_lContainer, _hostTNode, _hostView) {
                var _this = _super.call(this) || this;
                return _this._lContainer = _lContainer, _this._hostTNode = _hostTNode, _this._hostView = _hostView, 
                _this._viewRefs = [], _this;
            }
            return __extends(ViewContainerRef_, _super), Object.defineProperty(ViewContainerRef_.prototype, "element", {
                get: function() {
                    return createElementRef(ElementRefToken, this._hostTNode, this._hostView);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ViewContainerRef_.prototype, "injector", {
                get: function() {
                    return new NodeInjector(this._hostTNode, this._hostView);
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
                get: function() {
                    var parentLocation = getParentInjectorLocation(this._hostTNode, this._hostView), parentView = getParentInjectorView(parentLocation, this._hostView), parentTNode = function(location, startView, startTNode) {
                        if (startTNode.parent && -1 !== startTNode.parent.injectorIndex) {
                            for (var injectorIndex = startTNode.parent.injectorIndex, parentTNode_1 = startTNode.parent; null != parentTNode_1.parent && injectorIndex == parentTNode_1.injectorIndex; ) parentTNode_1 = parentTNode_1.parent;
                            return parentTNode_1;
                        }
                        for (var viewOffset = getParentInjectorViewOffset(location), parentView = startView, parentTNode = startView[T_HOST]; viewOffset > 1; ) parentTNode = (parentView = parentView[DECLARATION_VIEW])[T_HOST], 
                        viewOffset--;
                        return parentTNode;
                    }(parentLocation, this._hostView, this._hostTNode);
                    return hasParentInjector(parentLocation) && null != parentTNode ? new NodeInjector(parentTNode, parentView) : new NodeInjector(null, this._hostView);
                },
                enumerable: !0,
                configurable: !0
            }), ViewContainerRef_.prototype.clear = function() {
                for (;this._lContainer[VIEWS].length; ) this.remove(0);
            }, ViewContainerRef_.prototype.get = function(index) {
                return this._viewRefs[index] || null;
            }, Object.defineProperty(ViewContainerRef_.prototype, "length", {
                get: function() {
                    return this._lContainer[VIEWS].length;
                },
                enumerable: !0,
                configurable: !0
            }), ViewContainerRef_.prototype.createEmbeddedView = function(templateRef, context, index) {
                var adjustedIdx = this._adjustIndex(index), viewRef = templateRef.createEmbeddedView(context || {}, this._lContainer, adjustedIdx);
                return viewRef.attachToViewContainerRef(this), this._viewRefs.splice(adjustedIdx, 0, viewRef), 
                viewRef;
            }, ViewContainerRef_.prototype.createComponent = function(componentFactory, index, injector, projectableNodes, ngModuleRef) {
                var contextInjector = injector || this.parentInjector;
                !ngModuleRef && null == componentFactory.ngModule && contextInjector && (ngModuleRef = contextInjector.get(NgModuleRef, null));
                var componentRef = componentFactory.create(contextInjector, projectableNodes, void 0, ngModuleRef);
                return this.insert(componentRef.hostView, index), componentRef;
            }, ViewContainerRef_.prototype.insert = function(viewRef, index) {
                if (viewRef.destroyed) throw new Error("Cannot insert a destroyed View in a ViewContainer!");
                var lView = viewRef._lView, adjustedIdx = this._adjustIndex(index);
                return viewAttachedToContainer(lView) ? this.move(viewRef, adjustedIdx) : (insertView(lView, this._lContainer, adjustedIdx), 
                addRemoveViewFromContainer(lView, !0, getBeforeNodeForView(adjustedIdx, this._lContainer[VIEWS], this._lContainer[NATIVE])), 
                viewRef.attachToViewContainerRef(this), this._viewRefs.splice(adjustedIdx, 0, viewRef), 
                viewRef);
            }, ViewContainerRef_.prototype.move = function(viewRef, newIndex) {
                if (viewRef.destroyed) throw new Error("Cannot move a destroyed View in a ViewContainer!");
                var index = this.indexOf(viewRef);
                return -1 !== index && this.detach(index), this.insert(viewRef, newIndex), viewRef;
            }, ViewContainerRef_.prototype.indexOf = function(viewRef) {
                return this._viewRefs.indexOf(viewRef);
            }, ViewContainerRef_.prototype.remove = function(index) {
                var lContainer, removeIndex, view, adjustedIdx = this._adjustIndex(index, -1);
                view = (lContainer = this._lContainer)[VIEWS][removeIndex = adjustedIdx], detachView(lContainer, removeIndex), 
                destroyLView(view), this._viewRefs.splice(adjustedIdx, 1);
            }, ViewContainerRef_.prototype.detach = function(index) {
                var adjustedIdx = this._adjustIndex(index, -1), view = detachView(this._lContainer, adjustedIdx);
                return null != this._viewRefs.splice(adjustedIdx, 1)[0] ? new core_ViewRef(view, view[CONTEXT], -1) : null;
            }, ViewContainerRef_.prototype._adjustIndex = function(index, shift) {
                return void 0 === shift && (shift = 0), null == index ? this._lContainer[VIEWS].length + shift : index;
            }, ViewContainerRef_;
        }(ViewContainerRefToken));
        var slotValue = hostView[hostTNode.index];
        if (isLContainer(slotValue)) (lContainer = slotValue)[ACTIVE_INDEX] = -1; else {
            var commentNode = hostView[RENDERER].createComment("");
            if (isRootView(hostView)) {
                var renderer = hostView[RENDERER], hostNative = getNativeByTNode(hostTNode, hostView);
                nativeInsertBefore(renderer, nativeParentNode(renderer, hostNative), commentNode, function(renderer, node) {
                    return isProceduralRenderer(renderer) ? renderer.nextSibling(node) : node.nextSibling;
                }(renderer, hostNative));
            } else appendChild(commentNode, hostTNode, hostView);
            hostView[hostTNode.index] = lContainer = createLContainer(slotValue, hostView, commentNode, hostTNode, !0), 
            addToViewTree(hostView, lContainer);
        }
        return new R3ViewContainerRef(lContainer, hostTNode, hostView);
    }(ViewContainerRefToken, ElementRefToken, getPreviousOrParentTNode(), getLView());
}, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR = {}, ComponentFactoryResolver$1 = function(_super) {
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
        var elementOrSelector, defaultRenderer, isInternalRootView = void 0 === rootSelectorOrNode, rootViewInjector = (ngModule = ngModule || this.ngModule) ? function(rootViewInjector, moduleInjector) {
            return {
                get: function(token, notFoundValue, flags) {
                    var value = rootViewInjector.get(token, NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR, flags);
                    return value !== NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR || notFoundValue === NOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR ? value : moduleInjector.get(token, notFoundValue, flags);
                }
            };
        }(injector, ngModule.injector) : injector, rendererFactory = rootViewInjector.get(RendererFactory2, domRendererFactory3), sanitizer = rootViewInjector.get(Sanitizer, null), hostRNode = isInternalRootView ? elementCreate(this.selector, rendererFactory.createRenderer(null, this.componentDef)) : (elementOrSelector = rootSelectorOrNode, 
        defaultRenderer = rendererFactory.createRenderer(null, null), "string" == typeof elementOrSelector ? isProceduralRenderer(defaultRenderer) ? defaultRenderer.selectRootElement(elementOrSelector) : defaultRenderer.querySelector(elementOrSelector) : elementOrSelector), rootFlags = this.componentDef.onPush ? 576 : 528, rootContext = isInternalRootView ? createRootContext() : rootViewInjector.get(ROOT_CONTEXT), renderer = rendererFactory.createRenderer(hostRNode, this.componentDef);
        rootSelectorOrNode && hostRNode && (isProceduralRenderer(renderer) ? renderer.setAttribute(hostRNode, "ng-version", VERSION.full) : hostRNode.setAttribute("ng-version", VERSION.full));
        var component, tElementNode, rootLView = createLView(null, createTView(-1, null, 1, 0, null, null, null, null), rootContext, rootFlags, null, null, rendererFactory, renderer, sanitizer, rootViewInjector), oldLView = enterView(rootLView, null);
        try {
            var componentView = function(rNode, def, rootView, rendererFactory, renderer, sanitizer) {
                isParent = !1, previousOrParentTNode = null, elementDepthCount = 0, bindingsEnabled = !0;
                var tView = rootView[TVIEW], tNode = createNodeAtIndex(0, 3, hostRNode, null, null), componentView = createLView(rootView, getOrCreateTView(def.template, def.consts, def.vars, def.directiveDefs, def.pipeDefs, def.viewQuery, def.schemas), null, def.onPush ? 64 : 16, rootView[HEADER_OFFSET], tNode, rendererFactory, renderer, void 0);
                return tView.firstTemplatePass && (diPublicInInjector(getOrCreateNodeInjectorForNode(tNode, rootView), rootView, def.type), 
                tNode.flags = 1, initNodeFlags(tNode, rootView.length, 1), queueComponentIndexForCheck(tNode)), 
                rootView[HEADER_OFFSET] = componentView;
            }(0, this.componentDef, rootLView, rendererFactory, renderer);
            tElementNode = getTNode(0, rootLView), projectableNodes && (tElementNode.projection = projectableNodes.map(function(nodesforSlot) {
                return Array.from(nodesforSlot);
            })), component = function(componentView, componentDef, rootView, rootContext, hostFeatures) {
                var tView = rootView[TVIEW], component = function(tView, viewData, def) {
                    var rootTNode = getPreviousOrParentTNode();
                    tView.firstTemplatePass && (def.providersResolver && def.providersResolver(def), 
                    generateExpandoInstructionBlock(tView, rootTNode, 1), baseResolveDirective(tView, viewData, def, def.factory));
                    var directive = getNodeInjectable(tView.data, viewData, viewData.length - 1, rootTNode);
                    return postProcessBaseDirective(viewData, rootTNode, directive), directive;
                }(tView, rootView, componentDef);
                rootContext.components.push(component), componentView[CONTEXT] = component, hostFeatures && hostFeatures.forEach(function(feature) {
                    return feature(component, componentDef);
                }), componentDef.contentQueries && componentDef.contentQueries(1, component, rootView.length - 1);
                var rootTNode = getPreviousOrParentTNode();
                if (tView.firstTemplatePass && componentDef.hostBindings && (invokeHostBindingsInCreationMode(componentDef, tView.expandoInstructions, component, rootTNode, tView.firstTemplatePass), 
                rootTNode.onElementCreationFns && applyOnCreateInstructions(rootTNode)), rootTNode.stylingTemplate) {
                    var native = componentView[HOST];
                    renderInitialClasses(native, rootTNode.stylingTemplate, componentView[RENDERER]), 
                    renderInitialStyles(native, rootTNode.stylingTemplate, componentView[RENDERER]);
                }
                return component;
            }(componentView, this.componentDef, rootLView, rootContext, [ LifecycleHooksFeature ]), 
            addToViewTree(rootLView, componentView), refreshDescendantViews(rootLView);
        } finally {
            leaveView(oldLView);
        }
        var componentRef = new ComponentRef$1(this.componentType, component, createElementRef(ElementRef, tElementNode, rootLView), rootLView, tElementNode);
        return isInternalRootView && (componentRef.hostView._tViewNode.child = tElementNode), 
        componentRef;
    }, ComponentFactory;
}(core_ComponentFactory), ComponentRef$1 = function(_super) {
    function ComponentRef(componentType, instance, location, _rootLView, _tNode) {
        var _this = _super.call(this) || this;
        return _this.location = location, _this._rootLView = _rootLView, _this._tNode = _tNode, 
        _this.destroyCbs = [], _this.instance = instance, _this.hostView = _this.changeDetectorRef = new core_RootViewRef(_rootLView), 
        _this.hostView._tViewNode = assignTViewNodeToLView(_rootLView[TVIEW], null, -1, _rootLView), 
        _this.componentType = componentType, _this;
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
}(core_NgModuleFactory);
function pureFunction1(slotOffset, pureFn, exp, thisArg) {
    var lView = getLView(), bindingIndex = bindingRootIndex + slotOffset;
    return bindingUpdated(lView, bindingIndex, exp) ? function(lView, bindingIndex, value) {
        return lView[bindingIndex] = value;
    }(lView, bindingIndex + 1, thisArg ? pureFn.call(thisArg, exp) : pureFn(exp)) : function(lView, bindingIndex) {
        return lView[bindingIndex];
    }(lView, bindingIndex + 1);
}
var core_EventEmitter = function(_super) {
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
}(), LQueries_ = function() {
    function LQueries_(parent, shallow, deep) {
        this.parent = parent, this.shallow = shallow, this.deep = deep;
    }
    return LQueries_.prototype.track = function(queryList, predicate, descend, read) {
        descend ? this.deep = createQuery(this.deep, queryList, predicate, null != read ? read : null) : this.shallow = createQuery(this.shallow, queryList, predicate, null != read ? read : null);
    }, LQueries_.prototype.clone = function() {
        return new LQueries_(this, null, this.deep);
    }, LQueries_.prototype.container = function() {
        var shallowResults = copyQueriesToContainer(this.shallow), deepResults = copyQueriesToContainer(this.deep);
        return shallowResults || deepResults ? new LQueries_(this, shallowResults, deepResults) : null;
    }, LQueries_.prototype.createView = function() {
        var shallowResults = copyQueriesToView(this.shallow), deepResults = copyQueriesToView(this.deep);
        return shallowResults || deepResults ? new LQueries_(this, shallowResults, deepResults) : null;
    }, LQueries_.prototype.insertView = function(index) {
        insertView$1(index, this.shallow), insertView$1(index, this.deep);
    }, LQueries_.prototype.addNode = function(tNode) {
        add(this.deep, tNode), add(this.shallow, tNode);
    }, LQueries_.prototype.removeView = function() {
        removeView$1(this.shallow), removeView$1(this.deep);
    }, LQueries_;
}();
function copyQueriesToContainer(query) {
    for (var result = null; query; ) {
        var containerValues = [];
        query.values.push(containerValues), result = {
            next: result,
            list: query.list,
            predicate: query.predicate,
            values: containerValues,
            containerValues: null
        }, query = query.next;
    }
    return result;
}
function copyQueriesToView(query) {
    for (var result = null; query; ) result = {
        next: result,
        list: query.list,
        predicate: query.predicate,
        values: [],
        containerValues: query.values
    }, query = query.next;
    return result;
}
function insertView$1(index, query) {
    for (;query; ) query.containerValues.splice(index, 0, query.values), query.values.length && query.list.setDirty(), 
    query = query.next;
}
function removeView$1(query) {
    for (;query; ) {
        var containerValues = query.containerValues, viewValuesIdx = containerValues.indexOf(query.values);
        containerValues.splice(viewValuesIdx, 1)[0].length && query.list.setDirty(), query = query.next;
    }
}
function getIdxOfMatchingSelector(tNode, selector) {
    var localNames = tNode.localNames;
    if (localNames) for (var i = 0; i < localNames.length; i += 2) if (localNames[i] === selector) return localNames[i + 1];
    return null;
}
function queryByReadToken(read, tNode, currentView) {
    var factoryFn = read[NG_ELEMENT_ID];
    if ("function" == typeof factoryFn) return factoryFn();
    var matchingIdx = locateDirectiveOrProvider(tNode, currentView, read, !1, !1);
    return null !== matchingIdx ? getNodeInjectable(currentView[TVIEW].data, currentView, matchingIdx, tNode) : null;
}
function queryByTemplateRef(templateRefToken, tNode, currentView, read) {
    var templateRefResult = templateRefToken[NG_ELEMENT_ID]();
    return read ? templateRefResult ? queryByReadToken(read, tNode, currentView) : null : templateRefResult;
}
function queryRead(tNode, currentView, read, matchingIdx) {
    return read ? queryByReadToken(read, tNode, currentView) : matchingIdx > -1 ? getNodeInjectable(currentView[TVIEW].data, currentView, matchingIdx, tNode) : function(tNode, currentView) {
        return 3 === tNode.type || 4 === tNode.type ? createElementRef(ElementRef, tNode, currentView) : 0 === tNode.type ? createTemplateRef(TemplateRef, ElementRef, tNode, currentView) : null;
    }(tNode, currentView);
}
function add(query, tNode) {
    for (var currentView = getLView(); query; ) {
        var predicate = query.predicate, type = predicate.type;
        if (type) {
            var result = null;
            type === TemplateRef ? result = queryByTemplateRef(type, tNode, currentView, predicate.read) : null !== (matchingIdx = locateDirectiveOrProvider(tNode, currentView, type, !1, !1)) && (result = queryRead(tNode, currentView, predicate.read, matchingIdx)), 
            null !== result && addMatch(query, result);
        } else for (var selector = predicate.selector, i = 0; i < selector.length; i++) {
            var matchingIdx;
            null !== (matchingIdx = getIdxOfMatchingSelector(tNode, selector[i])) && null !== (result = queryRead(tNode, currentView, predicate.read, matchingIdx)) && addMatch(query, result);
        }
        query = query.next;
    }
}
function addMatch(query, matchingValue) {
    query.values.push(matchingValue), query.list.setDirty();
}
function createPredicate(predicate, read) {
    var isArray = Array.isArray(predicate);
    return {
        type: isArray ? null : predicate,
        selector: isArray ? predicate : null,
        read: read
    };
}
function createQuery(previous, queryList, predicate, read) {
    return {
        next: previous,
        list: queryList,
        predicate: createPredicate(predicate, read),
        values: queryList._valuesTree,
        containerValues: null
    };
}
function core_query(predicate, descend, read) {
    var lView = getLView(), queryList = new QueryList(), queries = lView[QUERIES] || (lView[QUERIES] = new LQueries_(null, null, null));
    return queryList._valuesTree = [], queryList._static = !1, queries.track(queryList, predicate, descend, read), 
    function(lView, context, cleanupFn) {
        var lCleanup = getCleanup(lView);
        lCleanup.push(context), lView[TVIEW].firstTemplatePass && getTViewCleanup(lView).push(cleanupFn, lCleanup.length - 1);
    }(lView, queryList, queryList.destroy), queryList;
}
function queryRefresh(queryList) {
    var queryListImpl = queryList, creationMode = isCreationMode();
    return !(!queryList.dirty || creationMode !== queryListImpl._static || (queryList.reset(queryListImpl._valuesTree || []), 
    queryList.notifyOnChanges(), 0));
}
function viewQuery(predicate, descend, read) {
    var tView = getLView()[TVIEW];
    tView.firstTemplatePass && tView.expandoStartIndex++;
    var index = getCurrentQueryIndex(), viewQuery = core_query(predicate, descend, read);
    return store(index - HEADER_OFFSET, viewQuery), setCurrentQueryIndex(index + 1), 
    viewQuery;
}
function loadViewQuery() {
    var index = getCurrentQueryIndex();
    return setCurrentQueryIndex(index + 1), load(index - HEADER_OFFSET);
}
function contentQuery(directiveIndex, predicate, descend, read) {
    var lView = getLView(), tView = lView[TVIEW], contentQuery = core_query(predicate, descend, read);
    if ((lView[CONTENT_QUERIES] || (lView[CONTENT_QUERIES] = [])).push(contentQuery), 
    tView.firstTemplatePass) {
        var tViewContentQueries = tView.contentQueries || (tView.contentQueries = []);
        directiveIndex !== (tView.contentQueries.length ? tView.contentQueries[tView.contentQueries.length - 1] : -1) && tViewContentQueries.push(directiveIndex);
    }
    return contentQuery;
}
function loadContentQuery() {
    var lView = getLView(), index = getCurrentQueryIndex();
    return setCurrentQueryIndex(index + 1), lView[CONTENT_QUERIES][index];
}
function templateRefExtractor(tNode, currentView) {
    return createTemplateRef(TemplateRef, ElementRef, tNode, currentView);
}
var NgModuleFactoryLoader = function() {
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
var trace, core_events, PLATFORM_INITIALIZER = new InjectionToken("Platform Initializer"), PLATFORM_ID = new InjectionToken("Platform ID"), APP_BOOTSTRAP_LISTENER = new InjectionToken("appBootstrapListener"), Console = function() {
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
    }, (TestabilityRegistry = __decorate([ __metadata("design:paramtypes", []) ], TestabilityRegistry)).ngInjectableDef = defineInjectable({
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
        this.isStable = merge(isCurrentlyStable, isStable.pipe(share()));
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
    }, SystemJsNgModuleLoader.ngInjectableDef = defineInjectable({
        token: SystemJsNgModuleLoader,
        factory: function(t) {
            return new (t || SystemJsNgModuleLoader)(inject(Compiler), inject(SystemJsNgModuleLoaderConfig, 8));
        },
        providedIn: null
    }), SystemJsNgModuleLoader;
}();
function checkNotEmpty(value, modulePath, exportName) {
    if (!value) throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
    return value;
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
}()