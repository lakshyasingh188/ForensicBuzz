import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {

  if (req.method !== "POST") {

    return res.status(405).json({
      success: false,
      message: "Method Not Allowed"
    });

  }

  try {

    const {

      razorpay_order_id,

      razorpay_payment_id,

      razorpay_signature,

      user_id,

      test_code,

      amount

    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !user_id ||
      !test_code
    ) {

      return res.status(400).json({

        success:false,

        message:"Missing required fields"

      });

    }

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature =
      crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body.toString())
      .digest("hex");
          // Verify Razorpay Signature
    if (expectedSignature !== razorpay_signature) {

      return res.status(400).json({
        success: false,
        message: "Invalid payment signature"
      });

    }

    // Check duplicate purchase
    const { data: existingPurchase } = await supabase
      .from("test_purchases")
      .select("id")
      .eq("user_id", user_id)
      .eq("test_code", test_code)
      .maybeSingle();

    if (existingPurchase) {

      return res.status(200).json({
        success: true,
        message: "Already Purchased"
      });

    }

    // Save Purchase
    const { error } = await supabase
      .from("test_purchases")
      .insert({
        user_id: user_id,
        test_code: test_code,
        amount: amount,
        payment_id: razorpay_payment_id,
        status: "paid"
      });

    if (error) {

      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Database Error"
      });

    }

    return res.status(200).json({

      success: true,

      message: "Payment Verified Successfully"

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: err.message

    });

  }

}