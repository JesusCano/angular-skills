import { Component } from '@angular/core';

@Component({
  selector: 'app-greeting2',
  template: `<h1>Hello, {{ name }}! Have a nice {{ dayPart }}.</h1>`,
})
export class Greeting2Component {
  name = 'Yisus';
  dayPart = 'morning';
}
