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
      test_code,
      amount
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !test_code ||
      !amount
    ) {

      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });

    }

    const body =
      `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(body)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {

      return res.status(400).json({
        success: false,
        message: "Invalid payment signature"
      });

    }

    // Signature verified successfully
        // ===========================
    // PDF Mapping
    // ===========================

    const FILES = {

      BIO001: "biology-full.pdf",
      BIO002: "biology2-full.pdf",
      CHE001: "chemistry-full.pdf",
      DNA001: "dna-full.pdf"

    };

    const fileName = FILES[test_code];

    if (!fileName) {

      return res.status(404).json({

        success: false,

        message: "PDF not found"

      });

    }

    // ===========================
    // Generate Signed URL
    // ===========================

    const { data, error } = await supabase
      .storage
      .from("full-pdf")
      .createSignedUrl(fileName, 300);

    if (error) {

      console.error(error);

      return res.status(500).json({

        success: false,

        message: "Unable to generate download link"

      });

    }

    return res.status(200).json({

      success: true,

      downloadUrl: data.signedUrl

    });

  } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: err.message

    });

  }

}