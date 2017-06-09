import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { Http } from '@angular/http';

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
