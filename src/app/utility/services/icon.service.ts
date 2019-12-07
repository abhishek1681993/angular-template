import { Injectable } from '@angular/core';

@Injectable()
export class IconService {
    _icons: Object = {
    };

    get icons(): any {
        return this._icons;
    }
}
