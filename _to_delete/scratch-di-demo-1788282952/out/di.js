import { Component, inject, Injectable, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
// A plain value (a string) can't be a DI token by itself - classes can be
// tokens automatically, but primitives need an InjectionToken as their identity.
// Un valor simple (un string) no puede ser un token de DI por si solo - las
// clases pueden ser tokens automaticamente, pero los primitivos necesitan un
// InjectionToken como su identidad.
export const API_BASE_URL = new InjectionToken('API_BASE_URL');
export class ApiService {
    // Reading a non-class dependency via its InjectionToken.
    // Leyendo una dependencia que no es clase via su InjectionToken.
    baseUrl = inject(API_BASE_URL);
    getUsersUrl() {
        return `${this.baseUrl}/users`;
    }
    static ɵfac = function ApiService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ApiService)(); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
export class UserListComponent {
    api = inject(ApiService);
    url = this.api.getUsersUrl();
    static ɵfac = function UserListComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UserListComponent)(); };
    static ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: UserListComponent, selectors: [["app-user-list"]], features: [i0.ɵɵProvidersFeature([{ provide: API_BASE_URL, useValue: 'https://api.example.com' }])], decls: 2, vars: 1, template: function UserListComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵdomElementStart(0, "p");
            i0.ɵɵtext(1);
            i0.ɵɵdomElementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate(ctx.url);
        } }, encapsulation: 2 });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserListComponent, [{
        type: Component,
        args: [{
                selector: 'app-user-list',
                template: `<p>{{ url }}</p>`,
                // Component-level provider: only this component (and its children) see
                // this specific value - it does not affect any other component in the app.
                // Provider a nivel de componente: solo este componente (y sus hijos) ven
                // este valor especifico - no afecta a ningun otro componente de la app.
                providers: [{ provide: API_BASE_URL, useValue: 'https://api.example.com' }],
            }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(UserListComponent, { className: "UserListComponent", filePath: ".scratch-di-demo/di.ts", lineNumber: 30 }); })();
