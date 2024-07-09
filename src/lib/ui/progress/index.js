import React, { useEffect } from 'react';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

import { ArianAMU } from '@/lib/constants/font';

import cn from 'classnames';

import styles from './styles.module.sass';


const ProgressItem = ({ value = 1, quantity = '100' }) => {
  const count = useMotionValue(value)
  const rounded = useTransform(count, latest => Math.round(latest))

  useEffect(() => {
    const animation = animate(count, quantity, { duration: 10 });

    return animation.stop;
  }, []);

  return <motion.div className={cn(styles.percent, ArianAMU.className)}>{rounded}</motion.div>
};


export default React.memo(ProgressItem);








