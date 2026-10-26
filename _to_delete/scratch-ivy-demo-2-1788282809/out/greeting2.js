import { Component } from '@angular/core';
import * as i0 from "@angular/core";
export class Greeting2Component {
    name = 'Yisus';
    dayPart = 'morning';
    static ɵfac = function Greeting2Component_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || Greeting2Component)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: Greeting2Component, selectors: [["app-greeting2"]], decls: 2, vars: 2, template: function Greeting2Component_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "h1");
            i0.ɵɵtext(1);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate2("Hello, ", ctx.name, "! Have a nice ", ctx.dayPart, ".");
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Greeting2Component, [{
        type: Component,
        args: [{
                selector: 'app-greeting2',
                template: `<h1>Hello, {{ name }}! Have a nice {{ dayPart }}.</h1>`,
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(Greeting2Component, { className: "Greeting2Component", filePath: ".scratch-ivy-demo-2/greeting2.ts", lineNumber: 7 }); })();
