import { Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**********************************************************************
 * Service to manage Angular App all global language.
 * By default, if user not select language, show users browser language
 **********************************************************************/
@Injectable()
export class LanguageConfigService {

    private selectLanguage: string;
    private translate: TranslateService;

    constructor(translate: TranslateService,
                    @Inject('languageCodes') private langCodes: string[],
                    @Inject('defaultLang') private defaultLang: string) {

        // If not exist langCodes in parameter of constructor
        // Initialize constant to load languages codes, this codes uses to load assets/i18n directory json files

        if (this.langCodes === undefined || this.langCodes.length === 0) {
            this.langCodes = ['en', 'es'];
            console.warn('You have not input the language codes that the application contains ' +
                            'to assign the translation files you will have. It is assigned "es" ' +
                            'and "en" for Spanish and English respectively');
        }
        if (this.defaultLang === undefined || this.defaultLang === '') {
            this.defaultLang = 'es';
            console.warn('You have not entered the default language. The Spanish language will be assigned.');
        }
        this.translate = translate;
        this.load();
    }

    /***********************************************************************************************************
   * @ngdoc method
   * @name useSelectLanguage()
   * @methodOf lang-config.service#method
   * @params <language: string, this.selectLanguage: string>
   * @description
   * Function to load language select from component. Not checked our config value and browser config
   ************************************************************************************************************/
    useSelectLanguage(language: string) {
        this.selectLanguage = language;
        this.useLanguage(this.selectLanguage);
    }

    /***********************************************************************************************************
   * @ngdoc method
   * @name load()
   * @methodOf lang-preferences#method
   * @params <this.translate: TranslateService, langCodes: string[], this.selectLanguage: string>
   * @description
   * Function to load language to use in Angular App. Automatically detect our browser language and save in local
   * preferences. If value store in preferences, load selection from localStorage
   ************************************************************************************************************/
    private load() {
        // Add Angular App all support languages
        this.translate.addLangs(this.langCodes);
        this.selectLanguage = this.getLanguage();

        console.log(this.selectLanguage);

        // Check if exist selection in preferences
        if (this.selectLanguage === '') { // Not configure select language
            const browserLang = this.translate.getBrowserLang();
            this.selectLanguage = browserLang.match(this.getMatchedFromLangCodes()) ? browserLang : this.defaultLang;
            this.change(String(this.selectLanguage));
        }

        this.useLanguage(this.selectLanguage);
        return this.translate;
    }

    private getMatchedFromLangCodes(): string {
        let index = 0;
        let matchString = '/';
        this.langCodes.map(langCode => {
            // If last lang code
            if ( this.langCodes.length - 1 === index) {
                matchString = matchString + langCode + '/';
            } else {
                matchString = matchString + langCode + '|';
            }
            index ++;
        });
        return matchString;
    }

    /***********************************************************************************************************
   * @ngdoc method
   * @name load()
   * @methodOf lang-preferences#method
   * @params <this.translate: TranslateService, langCodes: string[], this.selectLanguage: string>
   * @description
   * Function to load language to use in Angular App. Automatically detect our browser language and save in local
   * preferences. If value store in preferences, load selection from localStorage
   ************************************************************************************************************/
    private useLanguage(language: string) {
        this.translate.setDefaultLang(language);
        this.translate.use(language);
    }

    /***********************************************************************************************************
   * @ngdoc method
   * @name load()
   * @methodOf lang-preferences#method
   * @params <this.translate: TranslateService, langCodes: string[], this.selectLanguage: string>
   * @description
   * Function to load language to use in Angular App. Automatically detect our browser language and save in local
   * preferences. If value store in preferences, load selection from localStorage
   ************************************************************************************************************/
    private getLanguage() {
        const language = window.localStorage.getItem('selectLanguage');
        if (language === null || language === undefined || language === '' || language === '') {
          return '';
        }
        return language;
    }

    /***********************************************************************************************************
   * @ngdoc method
   * @name change()
   * @methodOf lang-preferences#method
   * @params <language: any>
   * @description
   * Changes language preference for the whole app with select language
   * (code: es, eu or en in this case). After set change language, load layout with new language
   ************************************************************************************************************/
    change(language: any) {
        window.localStorage.setItem('selectLanguage', language);
        this.load();
    }

    /***********************************************************************************************************
   * @ngdoc method
   * @name getStringByLabel()
   * @methodOf lang-preferences#method
   * @params <this.translate: TranslateService, text: string>
   * @description
   * Returns translated text depending on language set and select text id.
   ************************************************************************************************************/
    getStringByLabel(text: string): string {
        this.translate.get(text).subscribe((res: string) => {
            return res;
        });
        return '';
    }
}
