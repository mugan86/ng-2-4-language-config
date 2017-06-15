import { NgModule, ModuleWithProviders  } from '@angular/core';

// To Translate imports
import { TranslateModule, TranslateLoader  } from '@ngx-translate/core';
import { createTranslateLoader } from './services/translate-loader.service';
import { Http } from '@angular/http';

// Provider to manage language configuration to use Translations
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
    ],
    exports: [
         TranslateModule
    ]
})
export class LanguageConfigModule {
  static forRoot(languageCodes?: string[], defaultLang?: string): ModuleWithProviders {
        return {ngModule: LanguageConfigModule,
                    providers: [LanguageConfigService,
                                {provide: 'languageCodes', useValue: languageCodes},
                                { provide: 'defaultLang', useValue: defaultLang}
        ]};
    }
}
