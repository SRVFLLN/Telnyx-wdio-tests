# Tests for telnyx.com

Tests for telnyx.com implemented by webdriverIO.
## Setup

### Install software and check out the project

- Download and install Node.JS ( at least 16.X )
- Clone and checkout the github project
- Go to the terminal and execute ```npm ci``` inside the checked out folder

### How to run the tests on windows
- To run all test in both browsers execute ```npm run test:all```
- To run all test in one browser execute ```npm run tests:firefox``` or ```npm run tests:chrome``` (depending on which browser you need)
- Execute ```allure:generate``` for generate test reports (if you run all test before, you don't have to do it)
- To open reports execute ```allure:open```

#### Other commands
| COMMAND | DESCRIPTION |
|----------------|:---------:|
| npm run suite:voice-api | Run tests for [Voice API](https://telnyx.com/products/voice-api) page |
| npm run suite:au-sip | Run tests for [AU SIP Trunking](https://telnyx.com/products/voice-api) page |
| npm run suite:use-case | Run tests for **use-case section** on three pages: -[SMS API](https://telnyx.com/products/sms-api)    -[SIP Trunking](https://telnyx.com/products/sip-trunks)    -[Voice API](https://telnyx.com/products/voice-api) |
| npm run suite:faq | Run test suite for **faq section** on next pages: -[SMS API](https://telnyx.com/products/sms-api)    -[SIP Trunking](https://telnyx.com/products/sip-trunks)    -[Voice API](https://telnyx.com/products/voice-api)     -[AU SIP Trunking](https://telnyx.com/products/voice-api) |
| npm run suite:sip | Run tests for -[SIP Trunking](https://telnyx.com/products/sip-trunks) page |
| npm run spec:use-case | Run spec with **use-case section** tests |
| npm run spec:faq-links | Run spec with **faq section** tests |
