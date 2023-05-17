const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const cart=req.body.cart;
    const transformed=cart.map((item)=>({
        price_data:{
           currency:"usd",
           product_data:{
            name:item.title,
            images:[item.img]
           },
           unit_amount:item.total*100
        },
        quantity:item.qty,
    }     
    ))
    try {
      const session = await stripe.checkout.sessions.create({
        line_items:transformed,
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      });

      res.json({"sessionUrl":session.url});
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}