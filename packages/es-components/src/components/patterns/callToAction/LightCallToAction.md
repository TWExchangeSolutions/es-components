This component combines the `LightNotification` and a set of `Action` components. This component takes all the same props as [LightNotification](#lightnotification). It will replace any passed `isDismissable` prop and set it to `false`.

```jsx
const Action = require('./Action').default;

function firstAction() {
  console.log('first action fired');
}

function secondAction() {
  console.log('second action fired');
}

function thirdAction() {
  console.log('third action fired');
}

<LightCallToAction
  type="danger"
>
  <p>What what what!</p>
  <Action onClick={thirdAction}>Third</Action>
  <Action onClick={secondAction}>Second</Action>
  <Action onClick={firstAction} isPrimary>First</Action>
</LightCallToAction>
```