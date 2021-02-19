import React, { useImperativeHandle, forwardRef, useRef, Ref, ForwardRefRenderFunction, useState, useCallback, HTMLAttributes } from 'react';
import { useForm } from 'react-hook-form';
import Dialog, { DialogRef } from '@/components/Dialog';
import Loading from '@/components/Loading';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel  from '@material-ui/core/InputLabel';
import { addRssSaved, editRssSaved } from '@/gists';
export interface FEED_SOURCE {
  title: string;
  url: string;
}
export interface AddRssRef {
  show: (formData?: FEED_SOURCE) => void;
  close: () => void;
}
export interface AddRssProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  $submit?: Function;
}



const AddRss: ForwardRefRenderFunction<DialogRef, AddRssProps> = ({
  $submit
}: AddRssProps, ref) => {
  const dialogRef: Ref<AddRssRef> = useRef(null);
  const { register, handleSubmit, reset } = useForm({});
  const [oldFeed, setOldFeed]: [FEED_SOURCE|null, Function] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('add'); // add, edit
  const onSubmit = useCallback(async (data: any) => {
    setLoading(true);
    let res;
    try {
      if (oldFeed) {
        res = await editRssSaved(data, oldFeed);
      } else {
        res = await addRssSaved(data);
      }
    } finally {
      setLoading(false);
    }
    if (res instanceof Error) {
      alert(res.message);
      return;
    }
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    if ($submit) {
      $submit();
    }
  }, [oldFeed, $submit]);
  useImperativeHandle(ref, () => {
    const df = dialogRef.current;
    return {
      show(formData?: FEED_SOURCE): void {
        if (df) {
          reset(formData || {});
          setType(formData ? 'edit' : 'add');
          setOldFeed(formData || null);
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
          <h1>{type === 'add' ? '添加' : '编辑' }订阅</h1>
          <section className="mini-feeder-form_item">
            <InputLabel>订阅源名称</InputLabel>
            <Input
              name="title"
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
