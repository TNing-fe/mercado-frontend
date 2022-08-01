import OSS from 'ali-oss'
import { v4 as uuidv4 } from 'uuid'
import { isFunction } from '@terminus/mall-utils'

const REG = /.*(\.[^.]+)$/
const IMAGE_MIME_REG = /^image\//
export function isImage(file: File): boolean {
  return IMAGE_MIME_REG.test(file.type.toLowerCase())
}
interface OssConfig extends OSS.Options {
  expire?: number;
  prefix?: string;
}
interface UploadOption {
  needOriginName?: boolean;
}
interface MultiUploadOption extends OSS.MultipartUploadOptions, UploadOption { }
/**
 * 判断时长时增加了10分钟的冗余时间
 * @param getOSSConfig
 * @param config
 */

export class OssClient {
  private config!: () => Promise<OssConfig>

  private expire: number

  private client!: OSS

  private prefix: string = 'object'

  constructor(getOSSConfig: (() => Promise<OssConfig>) | OssConfig) {
    if (isFunction(getOSSConfig)) {
      this.config = getOSSConfig
      this.expire = 0
    } else {
      if (getOSSConfig.prefix) {
        this.prefix = getOSSConfig.prefix
      }

      this.client = new OSS(getOSSConfig)
      this.expire = -1
    }
  }

  async getClient() {
    if (this.client) {
      if (this.expire === -1 || this.expire > Date.now() + 300000) {
        return this.client
      }
    }

    const ossConfig = await this.config()
    this.client = new OSS(ossConfig)

    if (ossConfig.prefix) {
      this.prefix = ossConfig.prefix
    }

    if (ossConfig.expire) {
      this.expire = ossConfig.expire
    }

    return this.client
  }

  generatorPath(file: File) {
    return `${this.prefix}/${uuidv4()}${file.name.replace(REG, '$1')}`
  }

  generatorPathWithName(file: File) {
    return `${this.prefix}/${file.name}`
  }

  async uploadFile(file: File, option: UploadOption = {
    needOriginName: false
  }) {
    const client = await this.getClient()
    const path = option.needOriginName ? this.generatorPathWithName(file) : this.generatorPath(file)
    const result = await client.put(path, file)
    return result
  }

  async multipartUpload(file: File, options: MultiUploadOption = {
    partSize: 8388608,
    needOriginName: false
  }) {
    const client = await this.getClient()
    const path = options.needOriginName ?
      this.generatorPathWithName(file) : this.generatorPath(file)
    const result = await client.multipartUpload(path, file, options)
    return result
  }

  async uploadImage(file: File, option: UploadOption) {
    if (isImage(file)) {
      return this.uploadFile(file, option)
    }

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw '文件类型错误'
  }
}
