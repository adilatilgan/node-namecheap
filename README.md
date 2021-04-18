# NameCheap API library for JavaScript

Usage :
Add lib to your project
`npm install node-namecheap-api`

import Library and initialize Api Lib with required params **USER**, **API_KEY**, **CLIENT_ID** .


```
const { NameCheap } = require("node-namecheap-api");

const nameCheap = new NameCheap(
  process.env.NAMECHEAP_USER,
  process.env.NAMECHEAP_API_KEY,
  process.env.NAMECHEAP_CLIENT_IP,
  !process.env.development // should be true when production mode
);

nameCheap.domains.check(search)
  .then(response=>console.log(response))
	.catch(err=>{console.log(err)})

```

Only Domain search for now, adding more functionality while I move forward on my side project
