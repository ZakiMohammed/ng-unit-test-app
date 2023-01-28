# Unit Test App - Angular

Angular project for unit test session's sample.

Link: https://ng-unit-test.netlify.app/

# Setup Project
```
git clone https://github.com/ZakiMohammed/ng-unit-test-app.git

npm i
npm start
```

# Test Project

1. Test the project
```
npm test
npm run test
```

2. Test the project with code coverage
```
npm run test-coverage

// without watching
npm run test-coverage-no-watch
```

# Initialize
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
npm install @fortawesome/free-brands-svg-icons
npm install @fortawesome/angular-fontawesome@latest
```

Import `FontAwesomeModule` to `AppModule`:
```
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

...

@NgModule({
  declarations: [...],
  imports: [
    ...
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [...],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}

```

Usage:
```
<fa-icon icon="coffee"></fa-icon>
<fa-icon [icon]="['fab', 'angular']" size="lg"></fa-icon>
```

## Add Environment Files
```
ng g environments
```

## Add Karma Config File
```
ng generate config karma
```

Update `karma.conf.js` and add below properties to `coverageReporter`
```
coverageReporter: {
  reporters: [
    ...
    { type: 'lcovonly' },
  ],
  check: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  watermarks: {
    statements: [50, 80],
    functions: [50, 80],
    branches: [50, 80],
    lines: [50, 80],
  },
},
```
The `watermarks`, 50 to 90 shows color between RED and YELLOW