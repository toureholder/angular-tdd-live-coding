import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';
import { User, UserService } from 'src/app/services/user.service';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let mockUserService: jasmine.SpyObj<UserService>;
  let template: HTMLElement;

  beforeEach(async () => {
    mockUserService = jasmine.createSpyObj('mockUserService', ['fetchUsers']);

    await TestBed.configureTestingModule({
      declarations: [UsersComponent],
      imports: [MatCardModule],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    template = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should load users', () => {
      // Given - User service returrns list of users observable
      const users: User[] = [
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
      ];

      mockUserService.fetchUsers.and.returnValue(of(users));

      // When
      component.ngOnInit();

      // Then - component users to equal user service list of users
      expect(component.users).toEqual(users);
    });
  });

  describe('ui tests', () => {
    it('should display an element for each user', () => {
      // Given - Users list
      component.users = [
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
      ];

      // When - Fixture detect changes
      fixture.detectChanges();

      // Then - Exepect and element for each user
      const userElements = template.querySelectorAll('[data-test="user-el"]');
      expect(userElements.length).toEqual(component.users.length);
    });
  });
});
