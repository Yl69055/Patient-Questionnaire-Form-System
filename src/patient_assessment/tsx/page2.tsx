import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormInputs } from '../../types';

interface Page2Props {
  control: any;
  formData: Partial<FormInputs>;
  updateFormData: (data: Partial<FormInputs>) => void;
}

function Page2({ control, formData, updateFormData }: Page2Props) {
  const { formState: { errors }, watch, setValue } = useForm<FormInputs>({
    defaultValues: formData
  });

  const [showQuestion3, setShowQuestion3] = useState(false);

  const painFrequencyAndMedication = watch('painFrequencyAndMedication');

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name) {
        updateFormData({ [name]: value[name as keyof FormInputs] });
      }
      if (name === 'painFrequencyAndMedication') {
        setShowQuestion3(['a', 'b', 'c', 'd'].includes(value.painFrequencyAndMedication || ''));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData]);

  useEffect(() => {
    setShowQuestion3(['a', 'b', 'c', 'd'].includes(painFrequencyAndMedication || ''));
  }, [painFrequencyAndMedication]);

  return (
    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
      <div className="flex flex-col">
        <label className="leading-loose">1. 疼痛评级：</label>
        <p>请在下面的VAS图像上标记您的疼痛程度，0代表无疼痛，10代表难以忍受的疼痛（如生小孩时的疼痛）。</p>
        <div className="my-2">| 0 无疼痛 |———| 10 难以忍受的疼痛 |</div>
        <Controller
          name="painRating"
          control={control}
          rules={{ required: "此项是必选项" }}
          render={({ field }) => (
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                <label key={value} className="inline-flex items-center">
                  <input
                    type="radio"
                    {...field}
                    value={value}
                    checked={field.value === value}
                    onChange={() => field.onChange(value)}
                    className="form-radio"
                  />
                  <span className="ml-1">{value}</span>
                </label>
              ))}
            </div>
          )}
        />
        {errors.painRating && <span className="text-red-500 text-sm">{errors.painRating.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">2. 疼痛频率和止痛药使用：</label>
        <p>请选择适合您的描述：</p>
        <Controller
          name="painFrequencyAndMedication"
          control={control}
          rules={{ required: "此项是必选项" }}
          render={({ field }) => (
            <select
              {...field}
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              onChange={(e) => {
                field.onChange(e);
                setShowQuestion3(['a', 'b', 'c', 'd'].includes(e.target.value));
                if (!['a', 'b', 'c', 'd'].includes(e.target.value)) {
                  setValue('strongerPainKiller', undefined);
                  setValue('painKillerFrequency', undefined);
                  setValue('painKillerDosage', undefined);
                }
              }}
            >
              <option value="">请选择</option>
              <option value="a">a. 无法忍受的持续痛楚＋需使用强力镇痛药</option>
              <option value="b">b. 持续痛楚，但可忍受+偶尔使用强力镇痛药</option>
              <option value="c">c. 休息时无/偶尔疼痛 或 轻体力劳动致疼痛 或 经常使用非甾体镇痛药</option>
              <option value="d">d. 重体力后出现疼痛 或 偶尔服用非甾体镇痛药</option>
              <option value="e">e. 偶尔出现轻微疼痛</option>
              <option value="f">f. 无疼痛</option>
            </select>
          )}
        />
        {errors.painFrequencyAndMedication && <span className="text-red-500 text-sm">{errors.painFrequencyAndMedication.message}</span>}
      </div>

      {showQuestion3 && (
        <div className="flex flex-col">
          <label className="leading-loose">3. 疼痛药使用频率：</label>
          <div className="flex flex-col space-y-2">
            <div>
              <label className="inline-flex items-center">
                <span>a. 有无使用更强的止痛药？</span>
                <Controller
                  name="strongerPainKiller"
                  control={control}
                  rules={{ required: "此项是必选项" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="ml-2 px-2 py-1 border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    >
                      <option value="">请选择</option>
                      <option value="有">有</option>
                      <option value="无">无</option>
                    </select>
                  )}
                />
              </label>
              {errors.strongerPainKiller && <span className="text-red-500 text-sm">{errors.strongerPainKiller.message}</span>}
            </div>
            <div className="flex items-center space-x-2">
              <span>b. 如何服用？</span>
              <Controller
                name="painKillerFrequency"
                control={control}
                rules={{ required: "此项是必填项", min: 0 }}
                render={({ field }) => (
                  <input
                    type="number"
                    {...field}
                    className="px-2 py-1 border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="每天次数"
                  />
                )}
              />
              <span>次，每次</span>
              <Controller
                name="painKillerDosage"
                control={control}
                rules={{ required: "此项是必填项", min: 0 }}
                render={({ field }) => (
                  <input
                    type="number"
                    {...field}
                    className="px-2 py-1 border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    placeholder="片数"
                  />
                )}
              />
              <span>片</span>
            </div>
            {(errors.painKillerFrequency || errors.painKillerDosage) && <span className="text-red-500 text-sm">请填写完整的用药信息</span>}
          </div>
        </div>
      )}

      <div className="flex flex-col">
        <label className="leading-loose">4. 手臂或肩部有无刺痛感？</label>
        <Controller
          name="shoulderPain"
          control={control}
          rules={{ required: "此项是必选项" }}
          render={({ field }) => (
            <select
              {...field}
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            >
              <option value="">请选择</option>
              <option value="无">a. 无</option>
              <option value="轻微">b. 轻微</option>
              <option value="中等">c. 中等</option>
              <option value="严重">d. 严重</option>
              <option value="极度">e. 极度</option>
            </select>
          )}
        />
        {errors.shoulderPain && <span className="text-red-500 text-sm">{errors.shoulderPain.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">5. 举头活动时的肩部疼痛：</label>
        <Controller
          name="shoulderPainLifting"
          control={control}
          rules={{ required: "此项是必选项" }}
          render={({ field }) => (
            <select
              {...field}
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            >
              <option value="">请选择</option>
              <option value="无疼痛">a. 无疼痛</option>
              <option value="轻度痛">b. 轻度痛</option>
              <option value="中度痛">c. 中度痛</option>
              <option value="重度痛">d. 重度痛</option>
            </select>
          )}
        />
        {errors.shoulderPainLifting && <span className="text-red-500 text-sm">{errors.shoulderPainLifting.message}</span>}
      </div>
    </div>
  );
}

export default Page2;
