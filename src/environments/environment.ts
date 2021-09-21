// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  dogsUrl: 'https://localhost:44331/api/Pet',
  noticeUrl: 'https://localhost:44331/api/notice',
  petShopUrl: 'https://localhost:44331/api/product',
  loginUrl: 'https://localhost:44331/api/auth/login',
  updatePass: 'https://localhost:44331/api/auth/User/',
  users: 'https://localhost:44331/api/auth',
  Url: 'https://localhost:44331',
  ImportPhotoPets: '../../../../assets/Pets/',
  ImportPhotoNotices: '../../../../assets/Notices/',
  ImportPhotoProducts: '../../../../assets/PetShop/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
