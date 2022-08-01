/*
 * @LastEditors: Necfol
 * @Date: 2022-07-26 22:12:05
 * @LastEditTime: 2022-08-01 23:32:12
 * @FilePath: /mercado-frontend/src/pages/upload/index.tsx
 */
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import JSZip from 'jszip'
import { OssClient } from '@/utils/oss/index'

import styles from './style.less'
import logoImage from '../../assets/logo.png'
import loginImage from '../../assets/login.png'

// const zip = new JSZip()
const ossClient = new OssClient({
})

function generateZipFile(
  zipName,
  files,
  options = { type: 'blob', compression: 'DEFLATE' }
) {
  return new Promise((resolve, reject) => {
    const zip = new JSZip()
    for (let i = 0; i < files.length; i++) { // 添加目录中包含的文件
      zip.file(files[i].webkitRelativePath, files[i])
    }
    zip.generateAsync(options).then(blob => { // 生成zip文件
      zipName = zipName || `${Date.now()}.zip`
      const zipFile = new File([blob], zipName, {
        type: 'application/zip'
      })
      resolve(zipFile)
    })
  })
}

export default () => {
  const onDrop = useCallback(async (acceptedFiles: any) => {
    // Do something with the files
    // console.log('>>>.acceptedFiles', acceptedFiles)
    console.log('>>>>>acceptedFiles', acceptedFiles)
    const webkitRelativePath = acceptedFiles[0].webkitRelativePath
    const zipFileName = `${webkitRelativePath.split('/')[0]}.zip`
    const fileList = await generateZipFile(zipFileName, acceptedFiles)
    console.log('>>>>fileList', fileList)
    // // 直接上传一个文件到oss上并返回上传信息
    ossClient.uploadFile(photoZip).then(res => {
      console.log(res.url)
    })
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
