const xrpl = require('xrpl');
const fs = require('fs');
const path = require('path');

// Basic env parser
function parseEnv(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length === 2) {
            env[parts[0].trim()] = parts[1].trim();
        }
    });
    return env;
}

async function check() {
    const env = parseEnv(path.join(process.cwd(), '.env.local'));
    const wsUrl = env.NEXT_PUBLIC_XRPL_WS || 'wss://s.altnet.rippletest.net:51233';
    const platformSecret = env.PLATFORM_SECRET;
    const platformAddress = env.NEXT_PUBLIC_PLATFORM_RECEIVE_ADDRESS;

    if (!platformSecret) {
        console.error('PLATFORM_SECRET not found');
        return;
    }

    const client = new xrpl.Client(wsUrl);
    await client.connect();

    try {
        const wallet = xrpl.Wallet.fromSeed(platformSecret);
        console.log('Derived Platform Address:', wallet.classicAddress);
        console.log('Expected Platform Address:', platformAddress);

        if (wallet.classicAddress !== platformAddress) {
            console.error('❌ Address mismatch!');
        } else {
            console.log('✅ Address matches.');
        }

        const balance = await client.getXrpBalance(wallet.classicAddress);
        console.log('Platform Balance:', balance, 'XRP');

        if (Number(balance) < 20) {
            console.warn('⚠️ Balance is low. Minimum reserved on XRPL is 10 XRP + 2 per NFT/Object.');
        }

    } catch (e) {
        console.error('Error:', e);
    } finally {
        await client.disconnect();
    }
}

check();
