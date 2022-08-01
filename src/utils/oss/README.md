### ossClent Helper
结合ali-oss的sts授权机制，维护oss实例

> 注意事项：
> bucket须配置跨域规则允许项目所用的域名访问 [配置文档](https://help.aliyun.com/document_detail/32069.html?spm=a2c4g.11186623.6.945.162a5966BGGkcF)
> 本地开发时请使用 80 端口


调用示例
1. 后端sts授权方式

```
import { OssClient } from '@terminus/bricks/es';
import { getStsInfo } from './interface.bell';

async function getSts() {
  const data = await getStsInfo(); // 从接口获取sts授权信息，授权信息中应包含过期时间
  return {
    accessKeyId: data.accessKeyId,
    accessKeySecret: data.accessKeySecret,
    bucket: data.bucketName,
    endpoint: data.endpoint,
    requestId: data.requestId,
    stsToken: data.securityToken,
    expire: data.expiration,
    prefix: data.pathPrefix,
  };
}
// 获取到一个ossClientHelper实例
const ossClient = new OssClient(getSts);

// 封装一个上传并返回访问地址的方法
export async function upload(file) {
  const res = await ossClient.uploadFile(file);
  return res.url;
}

ossClient.getClient().then( oss => {
  // 此oss为ali-oss的oss实例
});
// 直接上传一个文件到oss上并返回上传信息
ossClient.upload(file).then(res=>{

  console.log(res.url);
});

```

2. 直接使用AK调用（生产请勿使用）

```
import { OssClient } from '@terminus/bricks/es';

const ossClient = new OssClient({
    region: 'oss-cn-beijing',
    accessKeyId: 'xxxxx',
    accessKeySecret: 'xxxxx',
    bucket: 'xxx',
  });

ossClient.getClient().then( oss => {
  // 此oss为ali-oss的oss实例
});
// 直接上传一个文件到oss上并返回上传信息
ossClient.upload(file).then(res=>{

  console.log(res.url);
});

```

oss实例[详情请参考](https://help.aliyun.com/document_detail/64041.html?spm=a2c4g.11186623.6.944.325279f8NnOtIx)
