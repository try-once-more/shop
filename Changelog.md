# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]




## v1.0.5 - 2023-09-14

### Added

- AdminComponent,  OrdersComponent, ProductViewComponent, ADMIN_ROUTES, isAdminGuard, AuthService, [`237fd8c`](https://github.com/try-once-more/shop/commit/237fd8cc89014bf960b628a387312495daac80f5)
- cart path. Some functionality moved from CartListComponent to HeaderComponent. [`295cb09`](https://github.com/try-once-more/shop/commit/295cb09883e80b572a99a111e482f0d3b36fbc23)
- storage\recovery of all products and added to cart in\from localStorage [`4fc2b58`](https://github.com/try-once-more/shop/commit/4fc2b58c36752fadcebe0246d6e40678ea41fb37)
- productResolver, productTitleResolver and product/:productID path with dynamic title. [`c8d5f52`](https://github.com/try-once-more/shop/commit/c8d5f528e3e54ad0e56a8345eb278e604db70a77)
- bootstrap v5.3.1 and bootstrap-icons 1.10.5 [`952ccab`](https://github.com/try-once-more/shop/commit/952ccab9f30409d8136a89437c09bdf7cd8fdc6e)
- canDeactivateGuard [`bb59d34`](https://github.com/try-once-more/shop/commit/bb59d3431a8a93aa569354c18deb313e36b89f04)
- cart/order path to the router that uses ProcessOrderComponent and isCartEmptyGuard. [`4bae7dd`](https://github.com/try-once-more/shop/commit/4bae7dd818bc7bfdd39852f156521bcda0b9343f)
- route partitioning by areas [`b0d0d38`](https://github.com/try-once-more/shop/commit/b0d0d380de9edfed8714057ef3c1d531c2b498c3)
- ProcessOrderComponent [`ab07090`](https://github.com/try-once-more/shop/commit/ab0709065f36cf60a65befd328a18fc95688455c)
- view and edit buttons to ProductComponent [`c9c0a77`](https://github.com/try-once-more/shop/commit/c9c0a775435acde870876bcb4d95b9cd8fc20391)
- redirection to 404 and 403 [`cca7d94`](https://github.com/try-once-more/shop/commit/cca7d94f91afbc553ef1244570af5154f9758245)
- routing, products-list as default path [`946d19a`](https://github.com/try-once-more/shop/commit/946d19a1d1fcccf071203f9f3f637cf07ec8d5bf)
- isCartEmptyGuard [`f563f28`](https://github.com/try-once-more/shop/commit/f563f28323ac7e80bee0954a277c9fc3022016d7)
- navigation to admin page after login as admin [`dcf6c43`](https://github.com/try-once-more/shop/commit/dcf6c43daed8cdb3ada9077c9e9ef71c1d4b9054)

### Fixed

- cart-list component and it routing [`94a5c68`](https://github.com/try-once-more/shop/commit/94a5c68b17bde99e0aa79aad3476632ae654e56a)
- navigation to the previous page if isCartEmptyGuard denied access [`5f1f245`](https://github.com/try-once-more/shop/commit/5f1f245b2a24a43f588e0709f64e14939d41f9c9)

### Changed

- **Breaking change:** application to use bootstrap styles [`ac6d254`](https://github.com/try-once-more/shop/commit/ac6d2548667f59bba18576e42344617edefe0872)
- ProductViewComponent [`9a9b486`](https://github.com/try-once-more/shop/commit/9a9b48626e27a9e50d65dcb15599e470158da6b7)
- getProducts to observable [`47cb80f`](https://github.com/try-once-more/shop/commit/47cb80f8940273363dd5e17c8f3a4311e174821b)

## v1.0.4 - 2023-08-29

### Added

- OrderByPipe with the ability to sort any arrays by any properties, including properties of nested objects [`ec92e56`](https://github.com/try-once-more/shop/commit/ec92e5631d05868724d862feb216a7e0abe95a72)
- currency pipe to CartItemComponent, CartListComponent and ProductComponent [`efd1112`](https://github.com/try-once-more/shop/commit/efd111236fe831ab336430a622d2578ac2d3f872)
- uppercase pipe to CartItemComponent and ProductComponent [`5ff19fc`](https://github.com/try-once-more/shop/commit/5ff19fc26a1b538d3113d70dcc8488da0e12d5d3)
- DeepKeyOf&lt;T&gt; type [`3c06524`](https://github.com/try-once-more/shop/commit/3c0652419397302ddc55a3951de0a29db2c0c658)
- i18nPlural pipe to CartListComponent [`697353a`](https://github.com/try-once-more/shop/commit/697353a90cd8172bee16594012472bfef7454a58)

### Fixed

- increase and decrease in quantity [`8acc0ad`](https://github.com/try-once-more/shop/commit/8acc0ad4313ff27398777bc6e5d9d1bf721f7048)
- automatic update of the changelog when upgrading to a new version [`67bed7e`](https://github.com/try-once-more/shop/commit/67bed7e4fa91412173164f378ebecd6c511c8ad6)

### Changed

- appChangeStyle which allows change borders by pressing ctrl+click keys [`4fbca6e`](https://github.com/try-once-more/shop/commit/4fbca6e3fc6b789e539f6ab966ed7325af32b5d4)

## v1.0.3 - 2023-08-21

### Added

- ChangeStyleDirective which on click changes the border and on ctrl+scrolling changes the text size of the element [`e661b31`](https://github.com/try-once-more/shop/commit/e661b31bd6ca5720ac323872f0f45140014f8151)
- LocalStorageService [`b8d0ac4`](https://github.com/try-once-more/shop/commit/b8d0ac47968e0dc27b06a80354749b88ced492da)
- ConfigOptionsService [`dac45af`](https://github.com/try-once-more/shop/commit/dac45af7d2be8b90ba2c8fb9ae8d95d53ed3780d)
- ConstantsService [`859aa03`](https://github.com/try-once-more/shop/commit/859aa031ec14f39bbdcf87d6bac478c8e2ae0a21)
- GeneratorFactory, GeneratedStringToken. [`cde7f16`](https://github.com/try-once-more/shop/commit/cde7f16653b43e6c6b657e28fe2e8b9e289b7ee2)
- genID function [`18850ed`](https://github.com/try-once-more/shop/commit/18850ed2658160f3ade8786a039217c8e17dbef6)

### Fixed

- incorrect display of totals when incorrect quantity is entered [`8f79339`](https://github.com/try-once-more/shop/commit/8f793397b3840df39da73f6088fba9c28772eb7b)

### Changed

- modified CartService. getProducts method returns an Observable using the immutable approach. [`bd932be`](https://github.com/try-once-more/shop/commit/bd932beafb0c37edaabfd38e9810c96a91f12565)

## v1.0.2 - 2023-08-19

### Added

- Сart Item component [`3db16ea`](https://github.com/try-once-more/shop/commit/3db16ea7f165f834a24a4e3b200bcc1944ca481a)
- the ability to remove items from the cart [`4f962a7`](https://github.com/try-once-more/shop/commit/4f962a774c4dc3170d6f7bef45507ff27b3d7ed8)
- the ability to increase and decrease the quantity of product in the cart [`f2ed747`](https://github.com/try-once-more/shop/commit/f2ed747377a9117f15588b163b5c895878aa3990)
- Highlight directive [`bc83d3d`](https://github.com/try-once-more/shop/commit/bc83d3ded51d0b7f8af220df71b72f1220f331a2)
- current version to app title [`411cff3`](https://github.com/try-once-more/shop/commit/411cff366b674548e0ce4c6c3e31db81780e16ae)
- total cost of products added to the cart [`5daa00b`](https://github.com/try-once-more/shop/commit/5daa00bf6299e05ee4cf27e163b4b2a9cc3c911c)

### Fixed

- floating-point issue in cost [`f14df45`](https://github.com/try-once-more/shop/commit/f14df454f48eba36074d7575a084063ebdfd33cd)
- display in the cart only the categories of added products [`9ff5702`](https://github.com/try-once-more/shop/commit/9ff5702ebb1a1d7067facb31fb7c15b0bc9b0c96)

### Changed

- receiving and displaying added to cart products in the Cart List component [`b0fbd18`](https://github.com/try-once-more/shop/commit/b0fbd18a0dce9c8f8f4595ea2fde92d75abd24a0)
- the application became non-modular [`02a8163`](https://github.com/try-once-more/shop/commit/02a816352c2139beffdba9f8299dbeab968a6e0a)
- moved appTitle to App component [`8315857`](https://github.com/try-once-more/shop/commit/831585700e033e05928023030dcbb86b31b55ee3)

## v1.0.1 - 2023-08-09

### Added

- Task 1 implemetation [`f083124`](https://github.com/try-once-more/shop/commit/f08312484c7e8e8506458c12215dc8e836d21ffb)
- auto-changelog [`94386a6`](https://github.com/try-once-more/shop/commit/94386a6693e1f3fdc72bb93fa08eda5ef3f75e63)

### Fixed

- changelog generation [`9da9287`](https://github.com/try-once-more/shop/commit/9da928701cb325ab55101c7da943acddc04b48ef)

### Changed

- public CartService.totalQuantity field changed to readonly signal [`f3e39f1`](https://github.com/try-once-more/shop/commit/f3e39f1595ca48c179c5c37b68f2c3e5c4969a59)
- Moved productsService from CartService to CartListComponent to [`756a859`](https://github.com/try-once-more/shop/commit/756a859b69ad58628655033d639e10a6b38de091)

