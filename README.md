# FTR Platform Developer Coding Test

Based on `vite-create-app` template.

## Developer Guide [start-here]

The application was developed on a m1 mac pro, and may not work under windows.

### Pre-requisites

* node 20.18.x
* asdf (optional) - for managing tool versions
* Install all the project dependencies
```bash
npm install
```

### Running the application
```bash
npm run cli
```

```text
npm run cli

> ftr-coding-test@0.0.0 cli
> vite-node src/cli.ts

>> Please input the amount of time in seconds before emitting numbers and their frequency
15
>> Please enter the first number
10
>> Please enter the next number
10
>> Please enter the next number
8
>> FIB
>> Please enter the next number
h>> 10:2, 8:1
alt
>> timer halted
resume
>> timer resumed
8
>> FIB
>> Please enter the next number
10
>> Please enter the next number
33
>> Please enter the next number
>> 10:3, 8:2, 33:1
quit
>> 10:3, 8:2, 33:1
>> Thanks for playing
```

### Code Quality
Running lint over the project:
```bash
npm run lint
```

Running unit tests:
```bash
npm run test
```

Running unit tests with coverage:
```bash
npm run coverage
```

Reports will be stored in the [coverage](./coverage/index.html) folder.
## Part One

### Requirements
1. On startup the program will prompt the user for the number of seconds (X) between outputting the frequency of each number to the screen.
2. Every (X) seconds the program will display *in frequency descending order* the list of numbers and their frequency.
3. If the user enters "halt" the timer should pause
4. If the user enters "resume" the timer should resume
5. If the user enters a number that is one of the first 1000 numbers in the fibonacci sequence the system should alert "FIB"
6. If the user enters "quit" the application should output the numbers and their frequency a farewell message and finally terminate.

Questions/Assumptions:

(5) Fibonacci numbers get very long quickly - Rather than use a "number" type which will be quickly change from a signed 64 bit long to a
64 bit IEEE floating point number when the numbers get too big - all the number digits will be stored as a string as we don't need to do
any arithmetic operations on the numbers.

(5) Is "0" a valid fibonacci number for this application?

(6) The order of the number frequency is not detailed, I'm assuming frequency descending order.

## Part two

### Web version of the Application
* You have a new requirement to implement for your application: Its logic should stay exactly the same but it will need to have a different 
user interface.

Please describe how you would go about implementing this new UI in your application? Would you need to restructure your solution in any way?

### Answer
The main model would not have to change very much - we would just need to make sure that there is a singleton instance of the object which
is preserved across renders. This could be done using:
- React Context
- A top level hook (but state + actions would need to be prop drilled through multiple components)
- State library (like zustand) - this may have additional bonuses like being able to save state to local storage

Once we have the object available to our React components then we would have:
* A configuration component which allows you to set the update frequency (in seconds)
* A control component which allows you to halt/resume the timer
* A log console that shows all the events that have been triggered
* Because we are using events we can have multiple components listening to changes eg. a FIB icon that gets displayed whenever the 'validation' event 'FIB' is sent.


### Production Ready App
* You now need to make your application "production ready" and deploy it so it can be used by customers. Please describe the steps you'd need to take for this to happen

### Answer
Assuming we are deploying a web application to AWS then I would:
- Create a CI/CD pipeline for building a SPA webapp
  - Build the webapp 
  - Run all tests
  - Create an "artifact" that contains the app
- Use CDK to create the stack that this app uses:
  - S3 bucket for the webapp
  - Cloudfront configuration for the web app
  - Route53 entries for the domain name
- Use AWS cli to deploy the web artifact to the S3 bucket and invalidate the cloudfront cache
- Add daily job for scanning npm dependencies for vulnerabilities

The application itself should also be made production ready:
* HotJar (or similar analytics tools) for seeing how users make use of the application
* Sentry (or similar) for capturing client exceptions and making sure that we track them
* SEO if applicable
* If the application has a back end api then I would also ensure that we are tracking logs, spans, counters etc using an Open Telementry (OTEL) sidecar plugged into any monitoring tools used by the company

### Coding test review
* What did you think of about this coding test - is there anything you'd suggest in order to improve it?

I think that this test actually covers lots of the different disciplines that developers need to demonstrate while developing professionally
- Basic Architecture - understanding of SOLID Object Orientated Programming principals
- Requirements Gathering + Elaboration
- Actual Coding
- Asynchronous programming/Event programming
- Ability to deliver

During development I have focused on making the implementation as simple as needed to get the job done without spending additional effort. 
Initially I started with `vite-create-app` assuming that I would have a web front end, but found during development that the cli implementation was
the simplest way to demonstrate a working app.

Improvements:
- The requirements do not really make sense in a real world application, which makes it harder to talk about a production deployment. 
I personally don't like to over engineer solutions so it would help to have a use case that would highlight real value to a user. 
eg. Simulate a IOT device that measures temperature every 5 seconds - allow the user to start/stop monitoring display the temperature + sliding window of the last 5 temps etc.
- It would help to have a time cap on the project, when having to write 3-4 of these coding projects at the same time I try to keep all my work to under 4 hours


