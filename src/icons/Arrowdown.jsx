import { motion } from 'framer-motion';

const variants = {
  initial: {
    opacity: 0,
    rotate: 90,
    origin: 0,
  },
  open: { opacity: 1, rotate: 0, origin: 0 },
  closed: {
    opacity: 1,
    rotate: 180,
    origin: 0,
  },
};

export default function Arrowdown({ isSorted = null, isSortedDesc = null }) {
  return (
    <motion.svg
      animate={isSorted ? (isSortedDesc ? 'open' : 'closed') : 'initial'}
      variants={variants}
      width="9"
      height="15"
      viewBox="0 0 77 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M38.5325 0.665924C48.9978 77.5888 40.1914 171.346 31.7126 88.1565C33.5354 59.935 33.0439 24.9142 38.5325 0.665924V0.665924Z"
        fill="white"
      />
      <path
        d="M76.3181 83.1184C64.0301 90.8598 51.4758 103.742 38.8397 114.064C-18.5043 53.832 -4.02497 96.7376 35.8086 125.614C48.24 124.734 69.4778 90.2454 76.3181 83.1184Z"
        fill="white"
      />
    </motion.svg>
  );
}
