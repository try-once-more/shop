# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]


### Fixed

- incorrect display of totals when incorrect quantity is entered [`8f79339`](https://github.com/try-once-more/shop/commit/8f793397b3840df39da73f6088fba9c28772eb7b)


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

