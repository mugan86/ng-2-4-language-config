# Language Config Library in Angular 2/4

This library use @ngx-translate dependencies and its own service to manage the translations in the language selects that can be by configuration and in case it is not configured by default the language of the browser.

**if you use npm >= 5.0.0 must install @ngx-translate dependencies manually with:**
```ssh
$ npm install @ngx-translate/core
$ npm install @ngx-translate/http-loader
```

## Instructions to install and configure

### From github (beta version)
```ssh
$ npm install https://github.com/mugan86/ng-2-4-language-config.git#0.2.5
```
### From NPM (Stable version)
```ssh
$ npm install ng-2-4-language-config --save
```

and then from your Angular AppModule:
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
// Import our library
import { LanguageConfigModule } from 'ng-2-4-language-config';
 
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Specify my library as an import
    LanguageConfigModule.forRoot() // to load default values ['en', 'es'], 'es'
    // OR assign we want values (we must add langcode.json files in src/assets!!!)
    LanguageConfigModule.forRoot(['es', 'ca', 'pt', 'eu', 'en'], 'es')
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
```

then from your Angular AppComponent to use LanguageConfigService to load translate files:

```typescript

import { LanguageConfigService } from 'ng-2-4-language-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private langService: LanguageConfigService) {}
}
```

If you select want language:

```typescript

import { LanguageConfigService } from 'ng-2-4-language-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private langService: LanguageConfigService) {
    langService.useSelectLanguage('es'); //Load spanish language although i select from config basque
  }
}
```
Finally, we must add the translation files to the correct directory, which will be in ***src/assets/i18n/language-code.json***. For example for Spanish, we must add the file ***src/assets/i18n/es.json***.

## How to use it in the template?

Now having all this correctly configured, we visualize it in the layout making use of Pipe 'translate'

```html
{{ 'label' | translate}}
```

'label' is a one value that load from <language-code>.json

## License

***MIT © Anartz Mugika***

