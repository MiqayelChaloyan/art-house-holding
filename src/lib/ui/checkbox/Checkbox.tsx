import { useState } from 'react'
import styles from './styles.module.sass'

interface CheckboxProps {
  label?: string
  id?: string
  value?: boolean
  className?: string
  onChange: (value: any) => void
}

const Checkbox = ({ label, id, value, className, onChange }: CheckboxProps) => {
  return (
    <li className={className}>
      <input checked={value} id={id} type="checkbox" onChange={onChange} />
      {/* <span className={styles.checkmark}></span> */}
      <label htmlFor={id} style={{color: value ? '#F9CC48' : '#828282'}}>{label}</label>
    </li>
  );
};

export default Checkbox;