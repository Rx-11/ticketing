import { Wallet } from "xrpl";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function verify() {
  const secret = process.env.TESTNET_SECRET;
  const expectedAddress = process.env.TESTNET_ADDRESS;

  if (!secret) {
    console.error("TESTNET_SECRET not found in .env.local");
    return;
  }

  try {
    const wallet = Wallet.fromSeed(secret);
    console.log("Derived Address:", wallet.classicAddress);
    console.log("Expected Address:", expectedAddress);

    if (wallet.classicAddress === expectedAddress) {
      console.log("✅ SUCCESS: The secret matches the expected address.");
    } else {
      console.log("❌ FAILURE: The secret does NOT match the expected address.");
    }
  } catch (error) {
    console.error("❌ ERROR: Invalid secret format.", error);
  }
}

verify();
