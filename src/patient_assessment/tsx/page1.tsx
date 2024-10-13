import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { User, Phone, Activity, Hand, Crosshair } from 'lucide-react';
import { FormInputs } from '../../types';

interface Page1Props {
  control: any;
  formData: Partial<FormInputs>;
  updateFormData: (data: Partial<FormInputs>) => void;
}

function Page1({ control, formData, updateFormData }: Page1Props) {
  const { formState: { errors }, watch } = useForm<FormInputs>({
    defaultValues: formData
  });

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
        <label className="leading-loose">姓名</label>
        <div className="relative focus-within:text-gray-600 text-gray-400">
          <Controller
            name="patientName"
            control={control}
            rules={{ required: "姓名是必填项" }}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="请输入姓名"
              />
            )}
          />
          <User className="absolute left-3 top-2 h-6 w-6" />
        </div>
        {errors.patientName && <span className="text-red-500 text-sm">{errors.patientName.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">性别</label>
        <div className="relative focus-within:text-gray-600 text-gray-400">
          <Controller
            name="gender"
            control={control}
            rules={{ required: "性别是必选项" }}
            render={({ field }) => (
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    {...field} 
                    value="男" 
                    checked={field.value === "男"}
                    onChange={() => field.onChange("男")}
                    className="form-radio" 
                  />
                  <span className="ml-2">男</span>
                </label>
                <label className="inline-flex items-center">
                  <input 
                    type="radio" 
                    {...field} 
                    value="女" 
                    checked={field.value === "女"}
                    onChange={() => field.onChange("女")}
                    className="form-radio" 
                  />
                  <span className="ml-2">女</span>
                </label>
              </div>
            )}
          />
        </div>
        {errors.gender && <span className="text-red-500 text-sm">{errors.gender.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">年龄</label>
        <div className="relative focus-within:text-gray-600 text-gray-400">
          <Controller
            name="age"
            control={control}
            rules={{ required: "年龄是必填项", min: 0, max: 120 }}
            render={({ field }) => (
              <input
                type="number"
                {...field}
                className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="请输入年龄"
              />
            )}
          />
        </div>
        {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">惯用手</label>
        <div className="relative focus-within:text-gray-600 text-gray-400">
          <Controller
            name="dominantHand"
            control={control}
            rules={{ required: "惯用手是必选项" }}
            render={({ field }) => (
              <select
                {...field}
                className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              >
                <option value="">请选择惯用手</option>
                <option value="左手">左手</option>
                <option value="右手">右手</option>
                <option value="双手">双手</option>
              </select>
            )}
          />
          <Hand className="absolute left-3 top-2 h-6 w-6" />
        </div>
        {errors.dominantHand && <span className="text-red-500 text-sm">{errors.dominantHand.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">受伤侧</label>
        <div className="relative focus-within:text-gray-600 text-gray-400">
          <Controller
            name="injurySide"
            control={control}
            rules={{ required: "受伤侧是必选项" }}
            render={({ field }) => (
              <select
                {...field}
                className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              >
                <option value="">请选择受伤侧</option>
                <option value="左侧">左侧</option>
                <option value="右侧">右侧</option>
                <option value="无">无</option>
              </select>
            )}
          />
          <Crosshair className="absolute left-3 top-2 h-6 w-6" />
        </div>
        {errors.injurySide && <span className="text-red-500 text-sm">{errors.injurySide.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">联系电话</label>
        <div className="relative focus-within:text-gray-600 text-gray-400">
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: "联系电话是必填项" }}
            render={({ field }) => (
              <input
                type="tel"
                {...field}
                className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                placeholder="请输入联系电话"
              />
            )}
          />
          <Phone className="absolute left-3 top-2 h-6 w-6" />
        </div>
        {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">是否有运动生活方式</label>
        <div className="relative focus-within:text-gray-600 text-gray-400">
          <Controller
            name="sportLifestyle"
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
          <Activity className="absolute left-3 top-2 h-6 w-6" />
        </div>
        {errors.sportLifestyle && <span className="text-red-500 text-sm">{errors.sportLifestyle.message}</span>}
      </div>

      {/* 新添加的运动相关问题 */}
      <div className="flex flex-col">
        <label className="leading-loose">7. 参与运动的程度：</label>
        <div className="relative focus-within:text-gray-600 text-gray-400">
          <Controller
            name="sportLevel"
            control={control}
            rules={{ required: "参与运动的程度是必选项" }}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                {['竞技性运动', '休闲运动', '不参加运动'].map((option) => (
                  <label key={option} className="inline-flex items-center">
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
        </div>
        {errors.sportLevel && <span className="text-red-500 text-sm">{errors.sportLevel.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">8. 您的运动类型是：</label>
        <div className="relative focus-within:text-gray-600 text-gray-400">
          <Controller
            name="sportType"
            control={control}
            rules={{ required: "运动类型是必选项" }}
            render={({ field }) => (
              <div className="flex flex-col space-y-2">
                {[
                  { value: '接触性运动', label: '接触性运动（如：篮球、足球）' },
                  { value: '强力过顶运动', label: '强力过顶运动（如：排球、网球）' },
                  { value: '无', label: '无' }
                ].map((option) => (
                  <label key={option.value} className="inline-flex items-center">
                    <input
                      type="radio"
                      {...field}
                      value={option.value}
                      checked={field.value === option.value}
                      onChange={() => field.onChange(option.value)}
                      className="form-radio"
                    />
                    <span className="ml-2">{option.label}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </div>
        {errors.sportType && <span className="text-red-500 text-sm">{errors.sportType.message}</span>}
      </div>
    </div>
  );
}

export default Page1;
