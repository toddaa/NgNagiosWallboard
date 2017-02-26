import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NagiosService {

    constructor(private http: Http) { }

    getNagiosData(baseUrl): Observable<any[]> {
        /*return this.http.get(this.baseUrl)
            .map(this.extractData)
            .catch(this.handleError);*/
        return Observable.interval(10000)
            //.flatMap(this.http.get(this.baseUrl)
            .flatMap(() => this.http.get(baseUrl))
            //.map(res => res.json())
            .map(this.extractData)
            .catch(this.handleError);
    }
    private extractData(res: Response) {
        let body = res.json();
        //console.log(body.content)

        var output = [];

        var totalOK: number;
        var totalWarn = 0;
        var totalCritical = 0;
        var totalUnknown = 0;

        var bad_output = [];
        var good_output = [];
        var x = 0;

        var warn = { 'class': 'bg-orange', 'icon': 'fa-exclamation-triangle' };
        var critical = { 'class': 'bg-red', 'icon': 'fa-times' };
        var ok = { 'class': 'bg-green', 'icon': 'fa-check' };
        var unknown = { 'class': 'bg-grey', 'icon': 'fa-question' };

        Object.keys(body.content).forEach(function (key) {

            var hostState = body.content[key].current_state;

            var serviceState = 0;
            var serviceIssues = [];
            Object.keys(body.content[key].services).forEach(function (skey) {
                //console.log(skey + ": " + body.content[key].services[skey].current_state)
                if (body.content[key].services[skey].current_state != 0) {
                    //item["description"] = 'Services Issue';
                    //serviceIssues = serviceIssues + (serviceIssues.length > 0 ? ", " : "") + skey;
                    var doIcare: any;
                    if (parseInt(body.content[key].services[skey].notifications_enabled) == 0
                        || parseInt(body.content[key].services[skey].problem_has_been_acknowledged) > 0
                        || parseInt(body.content[key].services[skey].scheduled_downtime_depth) > 0) {
                        doIcare = 0;
                    } else {
                        doIcare = 1;
                    }


                    var issue =
                        {
                            'serviceName': skey,
                            //'notifications': body.content[key].services[skey].notifications_enabled,
                            //'ack': body.content[key].services[skey].problem_has_been_acknowledged,
                            'care': doIcare
                        };
                    //console.log(issue);
                    serviceIssues.push(issue);

                    //console.log(key + " - " + skey + " - " + body.content[key].services[skey].current_state);

                    if (body.content[key].services[skey].current_state == "1") {
                        serviceState = 1;
                    } else if (body.content[key].services[skey].current_state == "2") {
                        serviceState = 2;
                    } else if (body.content[key].services[skey].current_state == "3") {
                        serviceState = 3;
                    }
                }
            });
            //console.log(serviceIssues.length)
            var item = {};
            item["id"] = x++;
            item["name"] = key;
            //item["config"] = { 'sizex': 1, 'sizey': (serviceIssues.length>1 ? 1.5 : 1) };

            if (serviceIssues.length > 3) {
                item["config"] = { 'sizex': 1, 'sizey': 1.5 };
            } else if (serviceIssues.length > 6) {
                item["config"] = { 'sizex': 1, 'sizey': 2 };
            } else if (serviceIssues.length > 9) {
                item["config"] = { 'sizex': 1, 'sizey': 2.5 };
            } else {
                item["config"] = { 'sizex': 1, 'sizey': 1 };
            }

            if (serviceState > 0) {
                //item["description"] = 'All Services OK';
                //console.log(serviceIssues);
                item["service_issues"] = serviceIssues;
                //item["statusCfg"] = this._getBoxMode(2);

                //console.log(key + " - " + serviceState);
                switch (serviceState) {
                    case 1: //WARN
                        item["statusCfg"] = warn;
                        totalWarn++;
                        break;
                    case 2: //CRITICAL
                        item["statusCfg"] = critical;
                        totalCritical++;
                        break;
                    case 3: //UNKNOWN
                        item["statusCfg"] = unknown;
                        totalUnknown++;
                        break;
                    case 0: //OK
                    default:
                        item["statusCfg"] = ok;
                        break;
                }



                //item["hoststate"] = body.content[key].current_state;
                //item[key] = body.content[key];
                //console.log(body.content[key].current_state)
                //console.log(item);
                bad_output.push(item);
            } else {
                item["statusCfg"] = ok;
                item["service_issues"] = ["All Services OK"];
                good_output.push(item);

            }
        });

        output.push(bad_output);
        output.push(good_output);

        //console.log(bad_output)
        totalOK = good_output.length;
        output.push(totalOK);
        output.push(totalWarn);
        output.push(totalCritical);
        output.push(totalUnknown);

        //console.log(output);
        return output || {};
    }
    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
