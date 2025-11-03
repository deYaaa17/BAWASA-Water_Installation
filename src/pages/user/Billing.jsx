import BillingForm from '../../components/ui/BillingForm';
import ReceiptPrint from '../../components/ui/ReceiptPrint';

export default function Billing() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Billing Management</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <BillingForm />
        <ReceiptPrint />
      </div>
    </div>
  );
}