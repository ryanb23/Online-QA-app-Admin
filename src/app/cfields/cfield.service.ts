import { Injectable } from '@angular/core';
import { Cfield } from './cfield';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CfieldService {
    private cfieldsUrl = '/api/cfields';

    constructor (private http: Http) {}

    // get("/api/cfields")
    getCfields(): Promise<Cfield[]> {
      return this.http.get(this.cfieldsUrl)
                 .toPromise()
                 .then(response => response.json() as Cfield[])
                 .catch(this.handleError);
    }

    // post("/api/cfields")
    createCfield(newCfield: Cfield): Promise<Cfield> {
      return this.http.post(this.cfieldsUrl, newCfield)
                 .toPromise()
                 .then(response => response.json() as Cfield)
                 .catch(this.handleError);
    }

    // get("/api/cfields/:id") endpoint not used by Angular app
    getCfield(getCfieldId: String): Promise<Cfield> {
      return this.http.get(this.cfieldsUrl + '/:' + getCfieldId)
                 .toPromise()
                 .then(response => response.json() as Cfield)
                 .catch(this.handleError);
    }

    // delete("/api/cfields/:id")
    deleteCfield(delCfieldId: String): Promise<String> {
      return this.http.delete(this.cfieldsUrl + '/' + delCfieldId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/cfields/:id")
    updateCfield(putCfield: Cfield): Promise<Cfield> {
      var putUrl = this.cfieldsUrl + '/' + putCfield._id;
      return this.http.put(putUrl, putCfield)
                 .toPromise()
                 .then(response => response.json() as Cfield)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}