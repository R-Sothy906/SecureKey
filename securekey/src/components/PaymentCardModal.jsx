
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PaymentCard from './PaymentCard';

const PaymentCardModal = ({ isOpen, onClose, amount }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 border-none bg-transparent shadow-none overflow-hidden" onInteractOutside={(e) => {
        // Prevent closing if clicked outside
        e.preventDefault();
      }}>
        <PaymentCard amount={amount} />
      </DialogContent>
    </Dialog>
  );
};

export default PaymentCardModal;
