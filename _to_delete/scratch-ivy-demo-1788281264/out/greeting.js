import { Component } from '@angular/core';
import * as i0 from "@angular/core";
export class GreetingComponent {
    name = 'Yisus';
    static ɵfac = function GreetingComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || GreetingComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: GreetingComponent, selectors: [["app-greeting"]], decls: 2, vars: 1, template: function GreetingComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "h1");
            i0.ɵɵtext(1);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1("Hello, ", ctx.name, "!");
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GreetingComponent, [{
        type: Component,
        args: [{
                selector: 'app-greeting',
                template: `<h1>Hello, {{ name }}!</h1>`,
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(GreetingComponent, { className: "GreetingComponent", filePath: ".scratch-ivy-demo/greeting.ts", lineNumber: 7 }); })();
