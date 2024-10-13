import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { ThumbsUp } from 'lucide-react';
import { FormInputs } from '../../types';

interface Page3Props {
  control: any;
  formData: Partial<FormInputs>;
  updateFormData: (data: Partial<FormInputs>) => void;
}

function Page3({ control, formData, updateFormData }: Page3Props) {
  const { formState: { errors }, watch } = useForm<FormInputs>({
    defaultValues: formData
  });

  const watchFields = watch();

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name) {
        updateFormData({ [name]: value[name as keyof FormInputs] });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, updateFormData]);

  return (
    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
      <div className="flex flex-col">
        <label className="leading-loose">1. 肩膀满意度</label>
        <div className="relative focus-within:text-gray-600 text-gray-400">
          <Controller
            name="shoulderSatisfaction"
            control={control}
            rules={{ required: "此项是必选项" }}
            render={({ field }) => (
              <select
                {...field}
                className="pl-10 px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              >
                <option value="">请选择</option>
                <option value="满意或比以前好">满意或比以前好</option>
                <option value="不满意或比以前更差">不满意或比以前更差</option>
              </select>
            )}
          />
          <ThumbsUp className="absolute left-3 top-2 h-6 w-6" />
        </div>
        {errors.shoulderSatisfaction && <span className="text-red-500 text-sm">{errors.shoulderSatisfaction.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">2. 舒适程度：手放松，置于身体两侧时，你的肩膀是否感到舒适？</label>
        <Controller
          name="shoulderComfort"
          control={control}
          rules={{ required: "此项是必选项" }}
          render={({ field }) => (
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...field}
                  value="是"
                  checked={field.value === "是"}
                  onChange={() => field.onChange("是")}
                  className="form-radio"
                />
                <span className="ml-2">是</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  {...field}
                  value="否"
                  checked={field.value === "否"}
                  onChange={() => field.onChange("否")}
                  className="form-radio"
                />
                <span className="ml-2">否</span>
              </label>
            </div>
          )}
        />
        {errors.shoulderComfort && <span className="text-red-500 text-sm">{errors.shoulderComfort.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">请为以下情况评分，0代表无问题，100代表问题严重：</label>
        <div className="space-y-2">
          {[
            { name: "painOrSpasm", label: "疼痛或抽搐" },
            { name: "weakness", label: "无力" },
            { name: "fatigue", label: "疲劳/缺乏耐力" },
            { name: "popping", label: "弹响" },
            { name: "stiffness", label: "僵硬" },
            { name: "neckDiscomfort", label: "肩部问题引起颈部肌肉不适" },
            { name: "instability", label: "肩部松弛或不稳" },
            { name: "compensation", label: "其他动作/姿势代偿肩膀活动" },
          ].map((item) => (
            <div key={item.name} className="flex items-center">
              <span className="w-1/2">{item.label}：</span>
              <Controller
                name={item.name as keyof FormInputs}
                control={control}
                rules={{ required: "此项是必填项", min: 0, max: 100 }}
                render={({ field }) => (
                  <input
                    type="number"
                    {...field}
                    className="w-16 px-2 py-1 border rounded"
                  />
                )}
              />
              <span className="ml-2">分</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">3. 关注度：请为以下情况评分，0代表不关注，100代表非常关注：</label>
        <div className="space-y-2">
          {[
            { name: "protectArm", label: "是否觉得需要在活动中保护手臂？" },
            { name: "fallConcern", label: "是否担心跌倒时伤到肩部？" },
            { name: "problemAwareness", label: "是否清楚您肩关节的问题？" },
            { name: "worsenConcern", label: "是否经常担心肩膀会变得更糟？" },
            { name: "emotionalImpact", label: "是否经常因为肩膀的问题感到失落？" },
          ].map((item) => (
            <div key={item.name} className="flex items-center">
              <span className="w-2/3">{item.label}</span>
              <Controller
                name={item.name as keyof FormInputs}
                control={control}
                rules={{ required: "此项是必填项", min: 0, max: 100 }}
                render={({ field }) => (
                  <input
                    type="number"
                    {...field}
                    className="w-16 px-2 py-1 border rounded"
                  />
                )}
              />
              <span className="ml-2">分</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page3;
