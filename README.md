# NgNagiosWallboard

Nagios Wallboard for higher traffic situations.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.4.

##Description

I needed a wallboard for a Nagios monitoring implementation.  There are a few good ones out there already, but none met my exact needs.  I simply wanted a *Go/No Go* status for each host.  I didn't want to see each service seperate.  This keeps things simple and only shows the hosts.  If the host is down it will visibly indicated.  If any of hosts services are down the host again will also be visibly indicated.  

The purpose for this was to put up the wallboard in high traffic areas so that passersby will notice possible issues and be able to take action.

##Dependencies

1.  Nagios configured with host and service checks
2.  Nagios API - https://github.com/zorkian/nagios-api

Once both requiremnts are met define the apiURL in the app.component.ts file


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
