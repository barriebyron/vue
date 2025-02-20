# `@starport/client-js`

Implements a generic JS client wrapper for the Tendermint RPC, Tendermint WS and Cosmos REST APIs.

## Install

```
npm install client-js
```
## Usage

```
import Client from '@starport/client-js'

const client = new Client({
                  apiAddr: 'http://localhost:1317',        // Replace with Cosmos API node address
                  rpcAddr: 'http://localhost:26657',       // Replace with Tendermint RPC node address
                  wsAddr: 'ws://localhost:26657/websocket' // Replace with Tendermint WS node address
                });

```

The client implements EventEmitter and runs a periodic connectivity test so will emit the following events based on the connection state:

* 'api-status' : true/false
* 'rpc-status' : true/false
* 'ws-status' : true/false

You can listen for and handle those in your application in the standard way:

```
client.on('api-status', (status) => { 
  // Handle API status here
});
client.on('rpc-status', (status) => { 
  // Handle RPC status here
});
client.on('ws-status', (status) => { 
  // Handle WS status here
});
```

The client also provides methods to switch the nodes used in an existing instance:

```
client.switchAPI('<new_api_node_address>');
client.switchRPC('<new_rpc_node_address>');
client.switchWS('<new_ws_node_address>');
```

The client automatically subscribes to new block events and emits those for handling:

```
client.on('newblock',(block) => {
  //handle incoming block here
})
```

### Additional features

Client provides a `useSigner()` method to connect a signer/wallet implementing the CosmJS OfflineDirectSigner interface (https://cosmos.github.io/cosmjs/latest/proto-signing/interfaces/signer.offlinedirectsigner.html).

The resulting CosmJS signing client (https://cosmos.github.io/cosmjs/latest/stargate/classes/signingstargateclient.signingstargateclient-1.html) is accessible via the `.signingClient` property while the signer is accessible via the `.signer` property.

Using the client's `.switchRPC()` method mentioned above will reinstantiate the signing client appropriately.

```
const signer = await DirectSecp256k1HdWallet.fromMnemonic(mymnemonic) // or any other object implementing the OfflineDirectSigner interface

await client.useSigner(signer)

const [account] = await client.signer.getAccounts();

const recipient = "cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5";

const amount = {
  denom: "uatom",
  amount: "1",
};

const result = await client.signingClient.sendTokens(account.address, recipient, [amount], "Memo Message");
```

Finally, the client provides two querying methods for the cosmos API:

### query()

`.query(endpoint,queryparams)` 

A VERY basic wrapper around axios, so querying the bank module for an address's balances would be: 

```
let balances = await client.query('/cosmos/bank/v1beta1/balances/','cosmos1xv9tklw7d82sezh9haa573wufgy59vmwe6xxe5');
```
### request()

```
.request({
    body: body,
    path: path,
    query: query,
    method: method,
  })
```

A helper method compatible with the swagger-typescript-api API classes generated with the `--single-http-client` if you have generated API classes for your chain's endpoints via their swagger definitions.