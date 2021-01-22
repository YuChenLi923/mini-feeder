import React, { useImperativeHandle, forwardRef, useRef, Ref, ForwardRefRenderFunction, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Dialog, { DialogRef } from '@/components/Dialog';
import Loading from '@/components/Loading';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel  from '@material-ui/core/InputLabel';
import { addRssSaved } from '@/gists';

export interface AddRssRef {
  show: () => void;
  close: () => void;
}


const AddRss: ForwardRefRenderFunction<DialogRef> = (props, ref) => {
  const dialogRef: Ref<AddRssRef> = useRef(null);
  const { register, handleSubmit, reset } = useForm({});
  const [loading, setLoading] = useState(false);
  const onSubmit = useCallback(async (data: any) => {
    setLoading(true);
    const res = await addRssSaved(data);
    setLoading(false);
    if (res instanceof Error) {
      alert(res.message);
      return;
    }
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, []);
  useImperativeHandle(ref, () => {
    const df = dialogRef.current;
    return {
      show(): void {
        if (df) {
          reset();
          df.show();
        }
      },
      close(): void {
        if (df) {
          df.close();
        }
      }
    };
  }, [reset]);
  return (
    <Dialog
      ref={dialogRef}
    >
      <Loading show={loading}>
        <form
          className="mini-feeder-setting"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1>添加订阅</h1>
          <section className="mini-feeder-form_item">
            <InputLabel>订阅源名称</InputLabel>
            <Input
              name="name"
              inputRef={register}
              className="mini-feeder-form_input"
            />
          </section>
          <section className="mini-feeder-form_item">
            <InputLabel>订阅源链接</InputLabel>
            <Input
              name="url"
              inputRef={register}
              className="mini-feeder-form_input"
              type="url"
              required
            />
          </section>
          <section className="mini-feeder-form_item center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              确定
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{marginLeft: 15}}
              onClick={() => dialogRef.current && dialogRef.current.close()}
            >
              取消
            </Button>
          </section>
        </form>
      </Loading>
    </Dialog>
  );
 }

 export default forwardRef(AddRss);
