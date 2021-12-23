import InputListLayout from './InputListLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { InputContext } from './BudgetContext';
import { useContext } from 'react';

export default function InputListAnimation({ inputList = 'incomeList' }) {
  const { values } = useContext(InputContext);
  return (
    <AnimatePresence initial={false}>
      {values?.[inputList].map((inputItem, inputIndex) => {
        return (
          <motion.div
            key={`${inputList}-${inputIndex}`}
            initial={{ x: -100, height: 0, marginBottom: 0 }}
            animate={{
              x: 0,
              height: 'auto',
              marginBottom: '16px',
            }}
            exit={{
              opacity: 0,
              x: -100,
              scale: 0,
              height: 0,
              marginBottom: 0,
            }}
          >
            <InputListLayout inputList={inputList} inputIndex={inputIndex} />
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}
