import { TestBed } from '@angular/core/testing';

import { User, UserService } from './user.service';

import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('mockHttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: mockHttpClient }],
    });

    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#fetchUsers', () => {
    it('should make correct http request', () => {
      // When
      service.fetchUsers();

      // Then - Expect request to have been made
      expect(mockHttpClient.get).toHaveBeenCalledOnceWith(
        'https://reqres.in/api/users'
      );
    });

    it('should return a list of domain users observable', () => {
      // Given
      mockHttpClient.get.and.returnValue(
        of({
          page: 1,
          per_page: 6,
          total: 12,
          total_pages: 2,
          data: [
            {
              id: 1,
              email: 'george.bluth@reqres.in',
              first_name: 'George',
              last_name: 'Bluth',
              avatar: 'https://reqres.in/img/faces/1-image.jpg',
            },
            {
              id: 2,
              email: 'janet.weaver@reqres.in',
              first_name: 'Janet',
              last_name: 'Weaver',
              avatar: 'https://reqres.in/img/faces/2-image.jpg',
            },
            {
              id: 3,
              email: 'emma.wong@reqres.in',
              first_name: 'Emma',
              last_name: 'Wong',
              avatar: 'https://reqres.in/img/faces/3-image.jpg',
            },
            {
              id: 4,
              email: 'eve.holt@reqres.in',
              first_name: 'Eve',
              last_name: 'Holt',
              avatar: 'https://reqres.in/img/faces/4-image.jpg',
            },
            {
              id: 5,
              email: 'charles.morris@reqres.in',
              first_name: 'Charles',
              last_name: 'Morris',
              avatar: 'https://reqres.in/img/faces/5-image.jpg',
            },
            {
              id: 6,
              email: 'tracey.ramos@reqres.in',
              first_name: 'Tracey',
              last_name: 'Ramos',
              avatar: 'https://reqres.in/img/faces/6-image.jpg',
            },
          ],
          support: {
            url: 'https://reqres.in/#support-heading',
            text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
          },
        })
      );

      // When
      service.fetchUsers().subscribe((val: User[]) => {
        // Then
        expect(val).toEqual(
          jasmine.arrayContaining<User>([
            {
              id: 1,
              email: 'george.bluth@reqres.in',
              firstName: 'George',
              lastName: 'Bluth',
              avatarUrl: 'https://reqres.in/img/faces/1-image.jpg',
            },
            {
              id: 2,
              email: 'janet.weaver@reqres.in',
              firstName: 'Janet',
              lastName: 'Weaver',
              avatarUrl: 'https://reqres.in/img/faces/2-image.jpg',
            },
          ])
        );
      });
    });
  });
});
