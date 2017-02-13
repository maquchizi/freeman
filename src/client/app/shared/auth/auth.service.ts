import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class AuthService {

  /**
   * Creates a new AuthService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}



  /**
   * Returns a Request for the HTTP GET request for the JSON resource.
   *
   */
  public login(credentials: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://127.0.0.1:5000/auth/login', credentials, options)
                    .map(this.extractToken)
                    .catch(this.handleError);
  }

  public register(credentials: string) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post('http://127.0.0.1:5000/auth/register', credentials, options)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  private extractToken(res: Response) {
    let data = res.json();
    if (res.status === 200) {
      let token = data['access_token'];
      console.log(token);
      localStorage.setItem('access_token', token);
    }
  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

