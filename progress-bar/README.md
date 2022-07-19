# Progress Bar Demo

### Prerequisites

Candidate needs to have PC or Mac with Angular CLI installed globally, with ability to share screen. Candidate can use stackblitz.com to prepare environment if cannot use his own PC / Mac.

Time expected to complete this task: 45 minutes.

## Start

Please use Angular CLI to create new project (routing is not required).

## Input

soldProducts endpoint [GET] https://raw.githubusercontent.com/gbmeireles/json-storage/main/questions.json

```json
{
"data": [
{
"name": "Product 1",
"cost": 100
},
{
"name": "Product 2",
"cost": 125
},
{
"name": "Product 3",
"cost": 200
}
],
"totalValue": 1000
}
```

## Output

We need a [progress bar like this](https://getbootstrap.com/docs/4.1/components/progress/) which shows percentage of sold products vs totalValue.
Progress bar should have a label explaining progress i.e: "We already sold 35% of our products".

Please do not use bootstrap version of progress bar and create all css on your own.

## Extra

Add animation, change data dynamically.


swo-products · Apiary


A place where APIs are kept.

