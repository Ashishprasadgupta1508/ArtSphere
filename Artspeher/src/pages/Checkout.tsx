import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { createOrder } from '../firebase';
import { useAuthStore } from '../store/useAuthStore';

export default function Checkout() {
  const { id: creatorId } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = useAuthStore((s) => s.currentUser);

  const incoming = (location.state as any) || {};
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const amount = incoming.amount || incoming.budget || 'Custom';
  const description = incoming.description || '';

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/auth/login');
      return;
    }

    setIsProcessing(true);
    // simulate payment processing delay
    setTimeout(async () => {
      const order = {
        creatorId: creatorId || incoming.creatorId || null,
        buyerId: currentUser.uid,
        buyerEmail: currentUser.email,
        amount,
        paymentMethod,
        description,
        status: 'paid',
        createdAt: new Date().toISOString(),
      } as Record<string, any>;

      try {
        const orderId = await createOrder(order);
        setIsProcessing(false);
        navigate(`/dashboard`, { replace: true });
        alert('Payment successful! Order ID: ' + orderId);
      } catch (err) {
        console.error('Order creation failed', err);
        setIsProcessing(false);
        alert('Failed to create order. Please try again.');
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="rounded-xl border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Pay the creator to secure the project and get started.</p>
        <div className="mt-4">
          <div className="mb-4">
            <label className="block text-xs font-medium text-muted-foreground">Amount</label>
            <div className="text-lg font-semibold">{amount}</div>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-muted-foreground">Description</label>
            <div className="text-sm">{description}</div>
          </div>

          <form onSubmit={handlePay} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Payment Method</label>
              <div className="mt-2 flex gap-2">
                <button type="button" onClick={() => setPaymentMethod('card')} className={`px-3 py-2 rounded-md border ${paymentMethod==='card' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>Card</button>
                <button type="button" onClick={() => setPaymentMethod('upi')} className={`px-3 py-2 rounded-md border ${paymentMethod==='upi' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>UPI</button>
                <button type="button" onClick={() => setPaymentMethod('paypal')} className={`px-3 py-2 rounded-md border ${paymentMethod==='paypal' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>PayPal</button>
              </div>
            </div>

            <div>
              <button disabled={isProcessing} type="submit" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow disabled:opacity-50">
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
