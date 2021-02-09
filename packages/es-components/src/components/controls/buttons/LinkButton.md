Additional props supplied to the LinkButton component will be passed to the underlying button element.

### LinkButton Style Types

```
const wait = () => new Promise(resolve => setTimeout(resolve, 2000));

<p>
  <LinkButton styleType="primary">Primary</LinkButton><br />
  <LinkButton styleType="success">Success</LinkButton><br />
  <LinkButton styleType="information">Info</LinkButton><br />
  <LinkButton styleType="warning">Warning</LinkButton><br />
  <LinkButton styleType="danger">Danger</LinkButton><br />
  <LinkButton styleType="danger" onClick={wait} showWhileRunning="Running...">Run A Task</LinkButton><br />
</p>
```

Use the `inherited` styleType in order to inherit colors from the parent.

```
<div style={{ color: "red" }}>
  <LinkButton styleType="inherited">I am red because of my parent!</LinkButton>
</div>
```
