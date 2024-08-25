# Relying Party Frontend (for EUDI wallet)

This is a work-in-progress prototype providing a relying party frontend as counterpart for an EUDI wallet app.

Find an deployed instance at [https://staging.wallet.tice.software](https://staging.wallet.tice.software).

# Overview

## Context

This project has been developed as part of the [SPRIND EUDI Wallet Prototypes Challenge](https://www.sprind.org/de/challenges/eudi-wallet-prototypes). The approach is based on variant C of the [German Architecture Proposal](https://gitlab.opencode.de/bmi/eudi-wallet/eidas-2.0-architekturkonzept) (Version 2). In addition a Zero-Knowledge-Proof (ZKP)mechanism has been implemented in order for the wallet to disclose the credentials in a way that enables plausible deniability against third parties.

## Features

This frontend is a demo for what relying parties can do in the EUDI wallet scope. It provides a form to create all kinds of presentation requests, and you can choose to allow Zero-Knowledge proof for that presentation.

## Dependencies

To get the full functionality of this relying party demo app, the corresponding [backend](https://github.com/TICESoftware/RelyingParty) needs to be up and running.

## Apps

This demo relying party can be used by wallet apps using the OpenId4VP protocol. The ZKP is not yet part of that protocol, but is implemented in those wallet apps:

- [EUDI Wallet for Android](https://github.com/TICESoftware/WalletAndroid)
- [EUDI Wallet for iOS](https://github.com/TICESoftware/wallet-ios)

# Setup and requirements

### Configure environment variables

The API url for the backend can be configured via environment variable `NUXT_PUBLIC_API_URL`. To finish the whole presentation flow, the redirect address is sent to the apps. This can be configured using the environment variable `NUXT_PUBLIC_UI_URL`.

### Install dependencies

```bash
npm install
```

### Development server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

# Disclaimer

The software in this repository is still under development and not intended to be used in production.

# License

Copyright 2024 TICE GmbH

This project is licensed under the [Apache v2.0 License](LICENSE).
