/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {global} from './global';

// NOTE: keep the string value in sync with the global declaration and if access below.
export const ngJitModePropName = 'ngJitMode';

declare global {
  const ngJitMode: boolean;
}

/**
 * The `ngJitMode` global variable indicates that the compiler is running in JIT mode.
 * The Ivy compiler emits code like `ngJitMode && something()` that will only run when `ngJitMode`
 * exists in the global scope and is set to truthy.
 * The `if` below will set it to true if it's undefined.
 * However, on minified builds that use AOT we set a global definition on the minifier for
 * `ngJitMode` to already be defined as false. Thus this code is tree shaken and so are all the
 * `ngJitMode && something()` statements, as they evaluate to `false && something()` and the
 * minifier knows this will always be false.
 * We don't want to use `global[ngJitModePropName]` in the `if` because that would break
 * minifier identification of the definition.
 * NOTE: changes to the `ngJitMode` name must be synced with `compiler-cli/src/tooling.ts`.
 */
if (typeof ngJitMode === 'undefined') {
  // This property access is toplevel and runs when the module is loaded.
  // Generally speaking we don't want toplevel property accesses because they prevent the tree
  // shaker from shaking out the accessed object.
  // In this case however, the global object exists regardless and we really want to have a
  // side effect when importing this module, so it's ok to ignore the lint rule.
  // tslint:disable-next-line:no-toplevel-property-access
  global[ngJitModePropName] = true;
}
