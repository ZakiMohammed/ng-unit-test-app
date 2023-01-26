# Sandbox: Unit Test Mark 2

Sandbox project for unit test session's sample project

# Init
```
ng new ut-mark-2
```

# Dependencies

## Bulma
```
npm i bulma
```

Add `bulma.min.css` to `angular.json` file:
```
{
    "styles": [
        "node_modules/bulma/css/bulma.min.css",
        "src/styles.scss"
    ],
}
```

## FontAwesome
```
npm install @fortawesome/fontawesome-svg-core
npm install @fortawesome/free-solid-svg-icons
npm install @fortawesome/angular-fontawesome@latest
```

Import `FontAwesomeModule` to `AppModule`:
```
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

...

@NgModule({
  declarations: [
    ...
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
```

Usage:
```
<fa-icon icon="coffee"></fa-icon>
```