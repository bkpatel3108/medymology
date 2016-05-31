import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { MedymologyAppComponent } from '../app/medymology.component';

beforeEachProviders(() => [MedymologyAppComponent]);

describe('App: Medymology', () => {
  it('should create the app',
      inject([MedymologyAppComponent], (app: MedymologyAppComponent) => {
    expect(app).toBeTruthy();
  }));

  // it('should have as title \'medymology works!\'',
  //     inject([MedymologyAppComponent], (app: MedymologyAppComponent) => {
  //   expect(app.title).toEqual('medymology works!');
  // }));
});
