import { parseEther } from 'viem'
import { walletClient } from './config'
import { abi, contractAddress } from './contract'
import { privateKeyToAccount } from 'viem/accounts';
import { waitForTransactionReceipt } from 'viem/actions';

async function run() {
  console.log('walletClient', walletClient.account.address);

  // 0. Set up a sponsor (first anvil account)
  const sponsor = privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80');
  console.log('sponsor', sponsor.address);

  // 1. Authorize injection of the Contract's bytecode into our Account.
  const authorization = await walletClient.signAuthorization({
    contractAddress,
    sponsor, // sponsor is the account that will pay for the gas
  })
  console.log('authorization', authorization);

  // 2. Invoke the Contract's `execute` function to perform batch calls.
  const hash = await walletClient.writeContract({
    account: sponsor, // sponsor is the account that will pay for the gas
    abi,
    address: walletClient.account.address,
    functionName: 'execute',
    args: [[
      {
        data: '0x',
        to: '0x124b082e8DF36258198da4Caa3B39c7dFa64D9cE', 
        value: parseEther('1'), 
      }
    ]],
    authorizationList: [authorization],
    //                  ↑ 3. Pass the Authorization as an option.
  });

  // 3. Wait for the transaction to be mined
  const receipt = await waitForTransactionReceipt(walletClient, { hash });

  console.log('receipt', receipt);
}

run();