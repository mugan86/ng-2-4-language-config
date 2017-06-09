import { NgModule, ModuleWithProviders  } from '@angular/core';

// To Translate imports
import { TranslateModule, TranslateLoader  } from '@ngx-translate/core';
import { createTranslateLoader } from './services/translate-loader.service';
import { Http } from '@angular/http';
import { LanguageConfigService } from './services/language-config.service';

@NgModule({
    imports: [
         TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
          }
        }),
    ]
})
export class LanguageConfigModule { 
  static forRoot(): ModuleWithProviders {
        return {ngModule: LanguageConfigModule, providers: [LanguageConfigService]};
    }
}