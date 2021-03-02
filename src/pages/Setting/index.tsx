import React, { useImperativeHandle, forwardRef, useRef, Ref, ForwardRefRenderFunction, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import Dialog, { DialogRef } from '@/components/Dialog';
import Loading from '@/components/Loading';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel  from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { editSystemConfig, getSystemConfig } from '@/gists';
import './index.scss';

export interface SettingRef {
  show: () => void;
  close: () => void;
}


const Setting: ForwardRefRenderFunction<DialogRef> = (props, ref) => {
  const dialogRef: Ref<DialogRef> = useRef(null);
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data: any) => {
    const df = dialogRef.current;
    setLoading(true);
    const editSuccess = await editSystemConfig(data);
    setLoading(false);
    if (!editSuccess) {
      alert('编辑失败,请稍后重试');
    }
    if (df) {
      df.close();
    }
  };
  const queryConfig = useCallback(async () => {
    const config = await getSystemConfig();
    reset(config);
  }, [reset]);
  useImperativeHandle(ref, () => {
    const df = dialogRef.current;
    return {
      show(): void {
        if (df) {
          df.show(null);
          queryConfig();
        }
      },
      close(): void {
        if (df) {
          df.close();
        }
      }
    };
  }, [queryConfig]);

  return (
    <Dialog
      ref={dialogRef}
    >
      <Loading show={loading}>
        <form
          className="mini-feeder-setting"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1>系统设置</h1>
          <section className="mini-feeder-setting_item">
            <InputLabel>更新周期</InputLabel>
            <Input
              required
              name="updateCycle"
              inputRef={register}
              className="mini-feeder-setting_input"
              type="number"
              endAdornment={<InputAdornment position="end">天</InputAdornment>}
              inputProps={{ min: 0 }}
            />
          </section>
          <section className="mini-feeder-setting_item">
            <InputLabel >更新时间</InputLabel>
            <Input
              required
              name="updateTime"
              type="time"
              inputRef={register}
              className="mini-feeder-setting_input"
            />
          </section>
          <section className="mini-feeder-setting_item">
            <InputLabel>存储限制</InputLabel>
            <Input
              required
              name="saveLimit"
              type="number"
              inputRef={register}
              className="mini-feeder-setting_input"
              endAdornment={<InputAdornment position="end">条</InputAdornment>}
              inputProps={{ min: 1}}
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
      </Loading>
    </Dialog>
  );
 }

 export default forwardRef(Setting);
