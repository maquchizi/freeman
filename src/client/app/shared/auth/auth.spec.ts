import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions, HttpModule } from '@angular/http';
import { TestBed, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

export function main() {
  describe('Auth Service', () => {
    let nameListService: AuthService;
    let mockBackend: MockBackend;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
            deps: [MockBackend, BaseRequestOptions]
          }
        ],
        imports: [HttpModule]
      });
    });


    it('should return an Observable when login gets called', async(() => {
      expect(TestBed.get(AuthService).login(this.data)).toEqual(jasmine.any(Observable));
    }));


    it('should return an Observable when register gets called', async(() => {
      expect(TestBed.get(AuthService).register(this.data)).toEqual(jasmine.any(Observable));
    }));


    it('should return access token on login', async(() => {
      let authService = TestBed.get(AuthService);
      let mockBackend = TestBed.get(MockBackend);
      let postData = JSON.stringify({'email':'admin@admin.com', 'password':'password'});
      let mockLoginResponse = JSON.stringify({'access_token': 'this-is-the-access-token'});

      mockBackend.connections.subscribe((conn: any) => {
        conn.mockRespond(new Response(new ResponseOptions({ body: mockLoginResponse })));
      });
      authService.login(postData).subscribe((data:any) => {
        expect(data.access_token).toEqual('this-is-the-access-token');
      });
    }));


    it('should return access token on register', async(() => {
      let authService = TestBed.get(AuthService);
      let mockBackend = TestBed.get(MockBackend);
      let postData = JSON.stringify({'email':'admin@admin.com', 'password':'password'});
      let mockLoginResponse = JSON.stringify({'access_token': 'this-is-the-access-token'});

      mockBackend.connections.subscribe((conn: any) => {
        conn.mockRespond(new Response(new ResponseOptions({ body: mockLoginResponse })));
      });
      authService.register(postData).subscribe((data:any) => {
        expect(data.access_token).toEqual('this-is-the-access-token');
      });
    }));
  });
}
