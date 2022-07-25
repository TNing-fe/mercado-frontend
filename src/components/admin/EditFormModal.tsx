import type { ReactNode, MutableRefObject } from 'react'
import type {
  FormComponentProps,
  ValidationRule,
  WrappedFormUtils
} from '@terminus/nusi/es/form'
import type { GetFieldDecoratorOptions } from '@terminus/nusi/es/form/Form'
import { useRef, useEffect } from 'react'
import { Modal, Form } from '@terminus/nusi'

export type EditFormModalProps = {
  modelId?: number;
  width?: number;
  title?: string;
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export type EditFormModalPropsEx = EditFormModalProps & {
  render: FormBodyRender;
  loadFormData: (modelId: number) => Promise<Object>;
  saveFormData: (
    modelId: number | undefined,
    values: Object,
  ) => Promise<{ success: boolean }>;
}

export type FormBodyRender = (helpers: EditFormRenderHelpers) => ReactNode

export type EditFormRenderHelpers = {
  form: WrappedFormUtils;
  field: FieldCreator;
}

export type FieldCreator = (
  name: string,
  label: string,
  rules?: ValidationRule[],
  options?: GetFieldDecoratorOptions,
) => (children: ReactNode) => ReactNode

const FormBody = ({
  form,
  formRef,
  render
}: FormComponentProps & {
  formRef: MutableRefObject<WrappedFormUtils | null>;
  render: FormBodyRender;
}) => {
  formRef.current = form
  const field: FieldCreator = (name, label, rules, options) => {
    return children => (
      <Form.Item label={label}>
        {form.getFieldDecorator(name, { rules, ...options })(children)}
      </Form.Item>
    )
  }

  return (
    <Form form={form} layout="vertical">
      {render({ form, field })}
    </Form>
  )
}

const WrappedFormBody = Form.create()(FormBody)

export const EditFormModal = ({
  modelId,
  width = 800,
  title,
  visible,
  render,
  onSuccess,
  onCancel,
  loadFormData,
  saveFormData
}: EditFormModalPropsEx) => {
  const ref = useRef(null)

  const handleOk = () => {
    const form: WrappedFormUtils = ref.current!
    form.validateFields(async (err, values) => {
      if (err) {
        return
      }

      const res = await saveFormData(modelId, values)
      if (res.success) {
        onSuccess()
      }
    })
  }

  useEffect(() => {
    if (!(modelId && visible)) {
      return
    }
    const load = async () => {
      const values: Record<string, any> = await loadFormData(modelId)
      const form = ref.current! as WrappedFormUtils
      const fd = getFormData(form, values)
      form.setFieldsValue(fd)
    }
    load().catch(e => {
      console.error(e)
    })
  }, [modelId, visible])

  return (
    <Modal
      visible={visible}
      title={title}
      width={width}
      onOk={handleOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <WrappedFormBody formRef={ref} render={render} />
    </Modal>
  )
}

export default EditFormModal

function getFormData(form: WrappedFormUtils, values: Record<string, unknown>) {
  const keys = Object.keys(form.getFieldsValue())
  return keys.reduce((acc, key) => {
    if (key in values) {
      acc[key] = values[key]
    }
    return acc
  }, {} as Record<string, any>)
}
