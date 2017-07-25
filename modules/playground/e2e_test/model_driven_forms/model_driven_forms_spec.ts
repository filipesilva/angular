/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {verifyNoBrowserErrors} from 'e2e_util/e2e_util';
import {browser, by, element} from 'protractor';

describe('Model-Driven Forms', function() {

  afterEach(verifyNoBrowserErrors);

  const URL = 'all/playground/src/model_driven_forms/index.html';

  it('should display errors', function() {
    browser.get(URL);

    const form = element.all(by.css('form')).first();
    const input = element.all(by.css('#creditCard')).first();
    const firstName = element.all(by.css('#firstName')).first();

    input.sendKeys('invalid');
    firstName.click();

    // getInnerHtml is deprecated, using workaround in changelog
    // https://github.com/angular/protractor/blob/master/CHANGELOG.md#500
    expect(browser.executeScript('return arguments[0].innerHTML;', form))
        .toContain('is invalid credit card number');
  });
});
