import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormInputs } from '../../types';

interface Page2Props {
  control: any;
}

function Page2({ control }: Page2Props) {
  const { formState: { errors }, watch } = useForm<FormInputs>();
  const painFrequency = watch('painFrequency');

  return (
    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
      <div className="flex flex-col">
        <label className="leading-loose">疼痛程度（0-10分）</label>
        <Controller
          name="painLevel"
          control={control}
          rules={{ required: "此项是必填项", min: 0, max: 10 }}
          render={({ field }) => (
            <input
              type="number"
              {...field}
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
              placeholder="请输入0-10之间的数字"
            />
          )}
        />
        {errors.painLevel && <span className="text-red-500 text-sm">{errors.painLevel.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">疼痛频率</label>
        <Controller
          name="painFrequency"
          control={control}
          rules={{ required: "此项是必选项" }}
          render={({ field }) => (
            <select
              {...field}
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            >
              <option value="">请选择</option>
              <option value="每天">每天</option>
              <option value="每周">每周</option>
              <option value="每月">每月</option>
              <option value="偶尔">偶尔</option>
            </select>
          )}
        />
        {errors.painFrequency && <span className="text-red-500 text-sm">{errors.painFrequency.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">是否需要更强的止痛药</label>
        <Controller
          name="strongerPainKiller"
          control={control}
          rules={{ required: "此项是必选项" }}
          render={({ field }) => (
            <select
              {...field}
              className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
            >
              <option value="">请选择</option>
              <option value="有">有</option>
              <option value="无">无</option>
            </select>
          )}
        />
        {errors.strongerPainKiller && <span className="text-red-500 text-sm">{errors.strongerPainKiller.message}</span>}
      </div>

      {painFrequency && painFrequency !== '偶尔' && (
        <>
          <div className="flex flex-col">
            <label className="leading-loose">止痛药使用频率（每周次数）</label>
            <Controller
              name="painKillerFrequency"
              control={control}
              rules={{ required: "此项是必填项", min: 0 }}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="请输入每周使用次数"
                />
              )}
            />
            {errors.painKillerFrequency && <span className="text-red-500 text-sm">{errors.painKillerFrequency.message}</span>}
          </div>

          <div className="flex flex-col">
            <label className="leading-loose">止痛药使用剂量（毫克/次）</label>
            <Controller
              name="painKillerDosage"
              control={control}
              rules={{ required: "此项是必填项", min: 0 }}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                  placeholder="请输入每次使用剂量（毫克）"
                />
              )}
            />
            {errors.painKillerDosage && <span className="text-red-500 text-sm">{errors.painKillerDosage.message}</span>}
          </div>
        </>
      )}

      <div className="flex flex-col">
        <label className="leading-loose">肩部疼痛程度</label>
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
              <option value="无">无</option>
              <option value="轻微">轻微</option>
              <option value="中等">中等</option>
              <option value="严重">严重</option>
              <option value="极度">极度</option>
            </select>
          )}
        />
        {errors.shoulderPain && <span className="text-red-500 text-sm">{errors.shoulderPain.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">抬高手臂时的肩部疼痛</label>
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
              <option value="无疼痛">无疼痛</option>
              <option value="轻度痛">轻度痛</option>
              <option value="中度痛">中度痛</option>
              <option value="重度痛">重度痛</option>
            </select>
          )}
        />
        {errors.shoulderPainLifting && <span className="text-red-500 text-sm">{errors.shoulderPainLifting.message}</span>}
      </div>
    </div>
  );
}

export default Page2;
