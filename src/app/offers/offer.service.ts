import { Injectable } from '@angular/core';
import { Offer } from './offer';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class OfferService {
    private offersUrl = '/api/offers';

    constructor (private http: Http) {}

    // get("/api/offers")
    getOffers(): Promise<Offer[]> {
      return this.http.get(this.offersUrl)
                 .toPromise()
                 .then(response => response.json() as Offer[])
                 .catch(this.handleError);
    }

    // post("/api/offers")
    createOffer(newOffer: Offer): Promise<Offer> {
      return this.http.post(this.offersUrl, newOffer)
                 .toPromise()
                 .then(response => response.json() as Offer)
                 .catch(this.handleError);
    }

    // get("/api/offers/:id") endpoint not used by Angular app

    // delete("/api/offers/:id")
    deleteOffer(delOfferId: String): Promise<String> {
      return this.http.delete(this.offersUrl + '/' + delOfferId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/offers/:id")
    updateOffer(putOffer: Offer): Promise<Offer> {
      var putUrl = this.offersUrl + '/' + putOffer._id;
      return this.http.put(putUrl, putOffer)
                 .toPromise()
                 .then(response => response.json() as Offer)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}