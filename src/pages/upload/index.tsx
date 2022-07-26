import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import styles from './style.less'
import logoImage from '../../assets/logo.png'
import loginImage from '../../assets/login.png'

export default () => {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    console.log('>>>.acceptedFiles', acceptedFiles)
  }, [])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    maxFiles: 20
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <img src={logoImage} alt="" />
      </div>
      <div className={styles.formWrap} {...getRootProps()}>
        <img src={loginImage} alt="" />
        <input {...getInputProps()} directory="" webkitdirectory="" type="file" />
      </div>
    </div>
  )
}
