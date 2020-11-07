# UnitTestingInAngularTddScreencast

An attempt at following the video at https://www.youtube.com/watch?v=0LTnoURNGCA

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.5.

## Misc Notes

### 3 A's of Testing


| Index | Step    | Remarks                             | Example                           |
| ----- | ------- | ----------------------------------- | --------------------------------- |
| 1.    | Arrange | Set up the test case                | Configure app state, prep db, etc |
| 2.    | Act     | Perform behavior that is under test | Perform API call                  |
| 3.    | Assert  | Check if the expected occurs        |                                   |

### Red-Green-Refactor

Order in which code should be written:

| Index | Step     | Remarks                                                                   |
| ----- | -------- | ------------------------------------------------------------------------- |
| 1.    | Red      | Write a failing test                                                      |
| 2.    | Green    | Write the least / most simple code to make test pass (hardcode if needed) |
| 3.    | Refactor | Clean code                                                                |

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
