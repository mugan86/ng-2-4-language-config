import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**********************************************************************
 * Service to manage Angular App all global language.
 * By default, if user not select language, show users browser language
 **********************************************************************/

// Initialize constant to load languages codes, this codes uses to load assets/i18n directory json files
export const langCodes = ['en', 'es', 'eu'];

@Injectable()
export class LanguageConfigService {

    private selectLanguage: String;
    private translate: TranslateService;

    constructor(translate: TranslateService) {
        this.translate = translate;
        this.load();
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
        this.translate.addLangs(langCodes);
        this.selectLanguage = this.getLanguage();

        console.log(this.selectLanguage);

        // Check if exist selection in preferences
        if (this.selectLanguage === '') { // Not configure select language
            const browserLang = this.translate.getBrowserLang();
            this.selectLanguage = browserLang.match(/en|es|eu/) ? browserLang : 'es';
            this.change(String(this.selectLanguage));
        }

        this.useLanguage();
        return this.translate;
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
    private useLanguage() {
        this.translate.setDefaultLang(String(this.selectLanguage));
        this.translate.use(String(this.selectLanguage));
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
   * @params <language>
   * @description
   * Changes language preference for the whole app with select language (code: es, eu or en in this case)
   ************************************************************************************************************/
    change(language) {
        window.localStorage.setItem('selectLanguage', language);
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
