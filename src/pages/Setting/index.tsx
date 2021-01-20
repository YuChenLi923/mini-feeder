import React, { useImperativeHandle, forwardRef, useRef, Ref, ForwardRefRenderFunction } from 'react';
import { useForm } from 'react-hook-form';
import Dialog, { DialogRef } from '@/components/Dialog';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel  from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import './index.scss';

export interface SettingRef {
  show: () => void;
  close: () => void;
}


const Setting: ForwardRefRenderFunction<DialogRef> = (props, ref) => {
  const dialogRef: Ref<DialogRef> = useRef(null);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      saveLimit: 10,
      updateTime: '14:00',
      updateCycle: 1
    }
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  useImperativeHandle(ref, () => {
    const df = dialogRef.current;
    return {
      show(): void {
        if (df) {
          df.show(null);
        }
      },
      close(): void {
        if (df) {
          df.close();
        }
      }
    };
  }, []);
  return (
    <Dialog
      ref={dialogRef}
    >
      <form
        className="mini-feeder-setting"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>系统设置</h1>
        <section className="mini-feeder-setting_item">
          <InputLabel>更新周期</InputLabel>
          <Input
            name="updateCycle"
            inputRef={register}
            className="mini-feeder-setting_input"
            type="number"
            endAdornment={<InputAdornment position="end">天</InputAdornment>}
            inputProps={{
              min: 0
            }}
          />
        </section>
        <section className="mini-feeder-setting_item">
          <InputLabel >更新时间</InputLabel>
          <Input
            name="updateTime"
            type="time"
            inputRef={register}
            className="mini-feeder-setting_input"
          />
        </section>
        <section className="mini-feeder-setting_item">
          <InputLabel >存储限制</InputLabel>
          <Input
            name="saveLimit"
            type="num"
            inputRef={register}
            className="mini-feeder-setting_input"
            endAdornment={<InputAdornment position="end">条</InputAdornment>}
          />
        </section>
        <section className="mini-feeder-setting_item center">
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
    </Dialog>
  );
 }

 export default forwardRef(Setting);
