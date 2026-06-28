import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const FILES = {
  BIO001: "biology-full.pdf",
  BIO002: "biology2-full.pdf",
  CHE001: "chemistry-full.pdf",
  DNA001: "dna-full.pdf"
};

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success:false
    });
  }

  try {

    const { user_id, test_code } = req.body;

    if (!user_id || !test_code) {
      return res.status(400).json({
        success:false,
        message:"Missing Data"
      });
    }

    const { data: purchase } = await supabase
      .from("test_purchases")
      .select("*")
      .eq("user_id", user_id)
      .eq("test_code", test_code)
      .eq("status","paid")
      .maybeSingle();

    if (!purchase) {
      return res.status(403).json({
        success:false,
        message:"Purchase Required"
      });
    }

    const fileName = FILES[test_code];

    if(!fileName){

      return res.status(404).json({
        success:false,
        message:"File Not Found"
      });

    }

    const { data, error } =
      await supabase.storage
      .from("full-pdf")
      .createSignedUrl(fileName,300);

    if(error){

      return res.status(500).json({
        success:false,
        message:error.message
      });

    }

    return res.status(200).json({

      success:true,

      download:data.signedUrl

    });

  } catch(err){

    return res.status(500).json({

      success:false,

      message:err.message

    });

  }

}