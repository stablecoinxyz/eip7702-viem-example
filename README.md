# EIP-7702 viem example

This is an example of how to use EIP-7702 to send 1 ETH to another EOA with viem.

## Setup

```bash
npm install
```

## Start anvil

```bash
npm run anvil
```

## Deploying the `BatchCallDelegation` contract

```bash
# use the second anvil account as the deployer
export PRIVATE_KEY=<private-key>
npm run deploy
```

## Running the example

```bash
npm run start
```

## Checking for results

```bash
cast balance <address>
```
