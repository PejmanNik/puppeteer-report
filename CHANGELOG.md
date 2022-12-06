# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]


# [3.1.0] - 2022-12-06

### Changed

- Add puppeteer-core to project dependencies
- Update type based on puppeteer >= v18.0.0


# [3.0.3] - 2022-06-08

### Changed

- Update local type based on puppeteer v14.3.0

# [3.0.2] - 2022-03-20

### Changed

- Update PDFOptions based on puppeteer v10.4.0

# [3.0.1] - 2021-06-19

### Fixed

- Fix blank page issue with long header/footer by [@emilos](https://github.com/emilos).
- Fix color issue with header/footer with adding `multiply` blend mode by [@emilos](https://github.com/emilos).

# [3.0.0] - 2021-05-09

### Removed

- Remove `puppeteer`/`puppeteer-core` from package dependencies

### Changed

- Drop support of `puppeteer`/`puppeteer-core` older than version 7.0.0
- Start using `puppeteer` built in types
- Change `pdf` method signature to remove `puppeteer` dependency

### Fixed

- Fully support of `puppeteer`/`puppeteer-core` >= 7.0.1 and < 10.0.0

# [2.0.5] - 2021-05-02

### Added

- Add support of puppeteer v9
- Add default export for package

# [2.0.4] - 2021-02-27

### Added

- Add support of puppeteer v8 by [@rafipiccolo](https://github.com/rafipiccolo)

# [2.0.3] - 2021-02-26

### Changed

- Update the readme file and add a sample for styling by [@emilos](https://github.com/emilos).
- Make the total page available before firing the change event.

# [2.0.2] - 2021-02-09

### Added

- Add support of puppeteer v6 and v7 by [@rafipiccolo](https://github.com/rafipiccolo).

# [2.0.1] - 2020-12-13

### Fixed

- Add support of scale properties

# [2.0.0] - 2020-10-13

### Added

- Add new dependency to puppeteer-core by [@federicojasson](https://github.com/federicojasson).
- Add eslint to the project.
- Add support of `chrome-aws-lambda` Thanks to [@federicojasson](https://github.com/federicojasson).
- Add support of replacing HTML header in page footer/title Thanks to [@federicojasson](https://github.com/federicojasson).

### Changed

- Change puppeteer as a dependency to peer dependencies by [@federicojasson](https://github.com/federicojasson).
- Update readme file

### Removed

- Remove bundle.js from npm package

## [1.1.0] - 2020-10-09

### Added

- Add a new `pdfPage` method to use custom puppeteer page instance

### Fixed

- Fix typo and improve readme

## [1.0.2] - 2020-10-03

### Added

- Init project
