import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FormInputs, PageProps } from '../../types';

function Page5({ control }: PageProps) {
  const { formState: { errors }, watch } = useForm<FormInputs>();

  return (
    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
      <div className="flex flex-col">
        <label className="leading-loose">1. 夜晚是否有肩痛？</label>
        <Controller
          name="nightPain"
          control={control}
          rules={{ required: "此项是必选项" }}
          render={({ field }) => (
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input type="radio" {...field} value="是" className="form-radio" />
                <span className="ml-2">是</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" {...field} value="否" className="form-radio" />
                <span className="ml-2">否</span>
              </label>
            </div>
          )}
        />
        {errors.nightPain && <span className="text-red-500 text-sm">{errors.nightPain.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">2. 能否侧卧睡觉？</label>
        <Controller
          name="sideSleepping"
          control={control}
          rules={{ required: "此项是必选项" }}
          render={({ field }) => (
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input type="radio" {...field} value="能" className="form-radio" />
                <span className="ml-2">能</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" {...field} value="不能" className="form-radio" />
                <span className="ml-2">不能</span>
              </label>
            </div>
          )}
        />
        {errors.sideSleepping && <span className="text-red-500 text-sm">{errors.sideSleepping.message}</span>}
      </div>

      <div className="flex flex-col">
        <label className="leading-loose">3. 过去1周内，肩膀问题对您的睡眠造成的困难程度：</label>
        <p className="text-sm text-gray-600">请在0至100的滑动条上标记您的睡眠困难程度，0代表无任何影响，100代表极度影响。</p>
        <div className="flex items-center mt-2">
          <span className="mr-2">睡眠困难程度：</span>
          <Controller
            name="sleepDifficulty"
            control={control}
            rules={{ required: "此项是必填项" }}
            render={({ field }) => (
              <input
                type="range"
                min="0"
                max="100"
                {...field}
                className="w-full"
              />
            )}
          />
          <span className="ml-2">{watch("sleepDifficulty") || 0}分</span>
        </div>
        {errors.sleepDifficulty && <span className="text-red-500 text-sm">{errors.sleepDifficulty.message}</span>}
      </div>
    </div>
  );
}

export default Page5;
