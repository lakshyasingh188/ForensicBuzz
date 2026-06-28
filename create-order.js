import Razorpay from "razorpay";

console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("KEY SECRET EXISTS:", !!process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {

    const {
      amount,
      testCode,
      title
    } = req.body;

    if (!amount || !testCode || !title) {

      return res.status(400).json({
        success: false,
        message: "Missing Required Fields",
      });

    }

    const options = {
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: testCode,
      notes: {
        title,
        testCode,
      },
    };
        const order = await razorpay.orders.create(options);

    return res.status(200).json({

      success: true,

      orderId: order.id,

      amount: order.amount,

      currency: order.currency,

      receipt: order.receipt,

      notes: order.notes,

      key: process.env.RAZORPAY_KEY_ID

    });

  } catch (error) {

    console.error("Create Order Error:", error);

    return res.status(500).json({

      success: false,

      message: "Unable to create order.",

      error: error.message

    });

  }

}