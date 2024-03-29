import Stripe from 'stripe';

const apiKey = "sk_test_51Lm9uTSDuW2CVm6epR9jGHQSKJxoTRQMYbqWUbpPepWBANAkxEGfzCoOSA5uK7LEkUtUEkQbtHtFrWyUWERnBjp200xkLcmZ6H";


const stripe = new Stripe (process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {


  if (req.method === 'POST') {
    try {
      const paramss = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
      
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/em6msvo0/production/').replace('-webp', '.webp');

          return {
            price_data: { 
              currency: 'inr',
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }

      // Create Checkout Sessions from body params.
      const sesssion = await stripe.checkout.sessions.create(paramss);

      res.status(200).json(sesssion);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}