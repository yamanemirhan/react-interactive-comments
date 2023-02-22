import React from 'react';

import styles from './styles.module.scss';

function TextArea({ ...props }) {
  return <textarea rows={4} {...props} className={styles.textArea} />;
}

export { TextArea };
