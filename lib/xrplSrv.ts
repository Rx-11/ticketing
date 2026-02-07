import * as xrpl from "xrpl";

const WS_URL = process.env.NEXT_PUBLIC_XRPL_WS || "wss://s.altnet.rippletest.net:51233";
const PLATFORM_SECRET = process.env.PLATFORM_SECRET;

export async function refundStake(walletAddress: string, amountXrp: string) {
    if (!PLATFORM_SECRET || !PLATFORM_SECRET.startsWith("s")) {
        throw new Error("PLATFORM_SECRET is not configured or is not a valid seed.");
    }

    const client = new xrpl.Client(WS_URL);
    await client.connect();

    try {
        const platformWallet = xrpl.Wallet.fromSeed(PLATFORM_SECRET);

        const payment: xrpl.Payment = {
            TransactionType: "Payment",
            Account: platformWallet.classicAddress,
            Destination: walletAddress,
            Amount: xrpl.xrpToDrops(amountXrp),
        };

        const response = await client.submitAndWait(payment, { wallet: platformWallet });
        const result = response.result as any;

        if (result.meta?.TransactionResult !== "tesSUCCESS") {
            throw new Error(`Refund failed: ${result.meta?.TransactionResult}`);
        }

        return result;
    } finally {
        await client.disconnect();
    }
}

export async function mintTicketNFT(walletAddress: string, eventId: string, tierId: string) {
    if (!PLATFORM_SECRET || !PLATFORM_SECRET.startsWith("s")) {
        throw new Error("PLATFORM_SECRET is not configured or is not a valid seed.");
    }

    const client = new xrpl.Client(WS_URL);
    await client.connect();

    try {
        const platformWallet = xrpl.Wallet.fromSeed(PLATFORM_SECRET);

        const metadata = `FEN|${eventId}|${tierId}|${Date.now()}`;
        const uri = Buffer.from(metadata).toString("hex").toUpperCase();

        const nftMint: xrpl.NFTokenMint = {
            TransactionType: "NFTokenMint",
            Account: platformWallet.classicAddress,
            NFTokenTaxon: 0,
            TransferFee: 0,
            Flags: xrpl.NFTokenMintFlags.tfTransferable,
            URI: uri,
        };

        const response = await client.submitAndWait(nftMint, { wallet: platformWallet });
        const result = response.result as any;

        if (result.meta?.TransactionResult !== "tesSUCCESS") {
            throw new Error(`NFT Mint failed: ${result.meta?.TransactionResult}`);
        }

        // Extract NFTokenID from metadata
        const affectedNodes = result.meta.AffectedNodes;
        let nftID = "";

        for (const node of affectedNodes) {
            const createdNode = node.CreatedNode;
            if (createdNode?.LedgerEntryType === "NFTokenPage") {
                // In a mint tx, the new token is in a new or modified page.
                // It's easier to find it in the non-null nftoken_id field if available in newer xrpl.js or just look for it.
            }
        }

        // Standard way: search for the NFT ID in the metadata
        // For simplicity in MVP, we can also query the account_nfts after minting
        // but let's try to find it in the affected nodes.
        // Actually, many developers just query account_nfts for the most recent one.

        const accountNfts = await client.request({
            command: "account_nfts",
            account: platformWallet.classicAddress,
            limit: 10
        });

        // Find the one with matching URI
        const mintedNft = accountNfts.result.account_nfts.find((n: any) => n.URI === uri);
        nftID = mintedNft ? mintedNft.NFTokenID : "";

        if (!nftID) {
            throw new Error("Failed to find minted NFTokenID");
        }

        return {
            hash: result.hash,
            nftID: nftID
        };
    } finally {
        await client.disconnect();
    }
}

export async function createNftSellOffer(walletAddress: string, nftID: string, amountXrp: string) {
    if (!PLATFORM_SECRET || !PLATFORM_SECRET.startsWith("s")) {
        throw new Error("PLATFORM_SECRET is not configured or is not a valid seed.");
    }

    const client = new xrpl.Client(WS_URL);
    await client.connect();

    try {
        const platformWallet = xrpl.Wallet.fromSeed(PLATFORM_SECRET);

        const offer: xrpl.NFTokenCreateOffer = {
            TransactionType: "NFTokenCreateOffer",
            Account: platformWallet.classicAddress,
            NFTokenID: nftID,
            Amount: xrpl.xrpToDrops(amountXrp),
            Destination: walletAddress,
            Flags: xrpl.NFTokenCreateOfferFlags.tfSellNFToken,
        };


        const response = await client.submitAndWait(offer, { wallet: platformWallet });
        const result = response.result as any;

        if (result.meta?.TransactionResult !== "tesSUCCESS") {
            throw new Error(`NFT Offer creation failed: ${result.meta?.TransactionResult}`);
        }

        return result;
    } finally {
        await client.disconnect();
    }
}

