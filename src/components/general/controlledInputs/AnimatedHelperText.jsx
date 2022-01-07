import { FormHelperText } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnimatedHelperText({ error }) {
  return (
    <AnimatePresence>
      {error ? (
        <motion.div
          initial={{ x: -100, height: 0 }}
          animate={{
            x: 0,
            height: 'auto',
          }}
          exit={{
            x: -100,
            scale: 0,
            height: 0,
          }}
        >
          <FormHelperText error={error ? true : false}>
            {`${error ? 'Incorrect Entry' : 'No Error'}`}
          </FormHelperText>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
