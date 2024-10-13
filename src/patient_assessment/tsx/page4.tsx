import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormInputs, PageProps } from '../../types';

interface Page4Props extends PageProps {
  formData: Partial<FormInputs>;
  updateFormData: (data: Partial<FormInputs>) => void;
}

function Page4({ control, formData, updateFormData }: Page4Props) {
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
        <label className="leading-loose">1. 关于日常生活：</label>
        <p className="text-sm text-gray-600">请为以下活动的能力评分，0代表完全不能，100代表完全可以：</p>
        <div className="space-y-2 mt-2">
          {[
            { name: "dailyWork", label: "完成正常的日常工作" },
            { name: "routineSports", label: "参与常规运动" },
            { name: "leisureActivities", label: "参加休闲活动" },
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
        <label className="leading-loose">2. 活动影响：</label>
        <div className="space-y-2 mt-2">
          <div className="flex items-center">
            <span className="w-2/3">在过去1周内，您的手臂/肩部/手部问题对您与家人、朋友、邻居或团体的交往影响程度：</span>
            <Controller
              name="socialImpact"
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
        </div>
        <div className="mt-2">
          <label className="leading-loose">过去1周，由于手臂、肩膀、手部问题，您的工作或其他日常活动受到的限制：</label>
          <Controller
            name="workLimitation"
            control={control}
            rules={{ required: "此项是必选项" }}
            render={({ field }) => (
              <div className="mt-2">
                {["没有限制", "轻微限制", "中等限制", "非常限制", "严重限制"].map((option) => (
                  <label key={option} className="inline-flex items-center mr-4">
                    <input
                      type="radio"
                      {...field}
                      value={option}
                      checked={field.value === option}
                      onChange={() => field.onChange(option)}
                      className="form-radio"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            )}
          />
          {errors.workLimitation && <span className="text-red-500 text-sm">{errors.workLimitation.message}</span>}
        </div>
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">3. 日常活动能力：</label>
        <p className="text-sm text-gray-600">请为以下活动评分，0代表完全不能做，100代表没有困难下能够自如做到：</p>
        <div className="space-y-2 mt-2">
          {[
            { name: "wearCoat", label: "穿上外套" },
            { name: "washBack", label: "洗背/胸罩/放手入背部衣服内" },
            { name: "useToilet", label: "上厕所" },
            { name: "combHair", label: "梳头" },
            { name: "reachHighShelf", label: "拿高架子上的物品" },
            { name: "putCoinOnShelf", label: "能否把硬币放到肩同高的架子上" },
            { name: "liftWeight", label: "提起重物（500g，4.5kg，9kg）" },
            { name: "throwBallLow", label: "手低于肩膀时，把网球抛出18米外" },
            { name: "throwBallHigh", label: "手高于头时，把网球抛出18米外" },
            { name: "reachBehind", label: "患侧手放到另一侧肩膀后面" },
          ].map((item) => (
            <div key={item.name} className="flex items-center">
              <span className="w-2/3">{item.label}：</span>
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
        <label className="leading-loose">4. 日常活动与限制：</label>
        {[
          { name: "openBottle", label: "拧开已经拧紧或新的玻璃瓶盖" },
          { name: "heavyHousework", label: "繁重的家务劳动" },
          { name: "carryBags", label: "拎购物袋或文件箱" },
          { name: "cutFood", label: "用刀切食物" },
        ].map((item) => (
          <div key={item.name} className="mt-2">
            <label className="leading-loose">{item.label}：</label>
            <Controller
              name={item.name as keyof FormInputs}
              control={control}
              rules={{ required: "此项是必选项" }}
              render={({ field }) => (
                <div className="mt-2">
                  {["没困难", "有点困难", "明显困难但能做到", "非常困难", "不能"].map((option) => (
                    <label key={option} className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        {...field}
                        value={option}
                        checked={field.value === option}
                        onChange={() => field.onChange(option)}
                        className="form-radio"
                      />
                      <span className="ml-2">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            />
            {errors[item.name as keyof FormInputs] && <span className="text-red-500 text-sm">{errors[item.name as keyof FormInputs]?.message}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page4;
